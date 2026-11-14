import { prisma } from "@/lib/prisma";
import { Save, BookOpen, Calculator, Search } from "lucide-react";
import Link from "next/link";
import { saveStudentGrades } from "./actions";

export const dynamic = 'force-dynamic';

export default async function GuruNilaiPage({ searchParams }: { searchParams: Promise<{ selected?: string, ta?: string, sem?: string }> }) {
  const resolvedParams = await searchParams;
  const selectedParam = resolvedParams.selected;
  
  const activeTA = resolvedParams.ta || "2026/2027";
  const activeSem = resolvedParams.sem || "1"; 

  const teacher = await prisma.teacher.findFirst({
    include: {
      user: true,
      homeroomedClasses: true,
    }
  });

  if (!teacher) return <div className="p-8 text-sm text-slate-500">Data Guru tidak ditemukan</div>;

  const schedules = await prisma.schedule.findMany({
    where: { teacherId: teacher.id },
    include: { class: true, subject: true }
  });

  const teachingAssignments: any[] = [];
  const seen = new Set();
  schedules.forEach(sch => {
    const key = `${sch.classId}-${sch.subjectId}`;
    if (!seen.has(key)) {
      seen.add(key);
      teachingAssignments.push({ cls: sch.class, sub: sch.subject, key });
    }
  });

  const activeAssignment = selectedParam 
    ? teachingAssignments.find(a => a.key === selectedParam) 
    : teachingAssignments[0];

  const students = activeAssignment ? await prisma.student.findMany({
    where: { classId: activeAssignment.cls.id },
    include: { 
      user: true,
      grades: {
        where: { 
          subjectId: activeAssignment.sub.id, 
          academicYear: activeTA, 
          semester: parseInt(activeSem, 10) 
        }
      }
    },
    orderBy: { user: { name: 'asc' } }
  }) : [];

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Buku Nilai Akademik Siswa</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Tahun Ajaran: <span className="font-semibold text-slate-800">{activeTA}</span> &bull; Semester: <span className="font-semibold text-slate-800">{activeSem} (Ganjil)</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Class Selection list */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Penugasan Kelas</div>
          {teachingAssignments.map((assignment, idx) => {
            const isActive = activeAssignment?.key === assignment.key;
            return (
              <Link 
                href={`/guru/nilai?selected=${assignment.key}&ta=${activeTA}&sem=${activeSem}`}
                key={idx} 
                className={`p-3 border rounded-lg transition-all block ${isActive ? 'bg-slate-900 border-slate-900 text-white shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'}`}
              >
                <div className={`text-[13px] font-semibold ${isActive ? 'text-white' : 'text-slate-900'}`}>{assignment.cls.name}</div>
                <div className={`text-[11px] mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{assignment.sub.name}</div>
              </Link>
            );
          })}
        </div>

        {/* Grade Form */}
        <div className="lg:col-span-3">
          {activeAssignment ? (
            <form action={saveStudentGrades} className="bg-white border border-slate-200 rounded-lg shadow-sm">
              <input type="hidden" name="subjectId" value={activeAssignment.sub.id} />
              <input type="hidden" name="academicYear" value={activeTA} />
              <input type="hidden" name="semester" value={activeSem} />

              <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <div>
                  <h2 className="text-[13px] font-semibold text-slate-900">
                    Input Nilai: {activeAssignment.cls.name} &bull; {activeAssignment.sub.name}
                  </h2>
                  <p className="text-[11px] text-slate-500">Skala penilaian 0 - 100.</p>
                </div>
                <button 
                  type="submit" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> Simpan Nilai
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[5%]">No</th>
                      <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[40%]">Nama Siswa</th>
                      <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">NISN</th>
                      <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%] text-center">Nilai Akhir (0-100)</th>
                      <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%] text-center">Predikat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((student, idx) => {
                      const grade = student.grades[0]?.score ?? '';
                      const scoreNum = typeof grade === 'number' ? grade : parseFloat(grade as string);
                      let predikat = '-';
                      if (!isNaN(scoreNum)) {
                        if (scoreNum >= 90) predikat = 'A (Sangat Baik)';
                        else if (scoreNum >= 80) predikat = 'B (Baik)';
                        else if (scoreNum >= 75) predikat = 'C (Cukup)';
                        else predikat = 'D (Kurang)';
                      }

                      return (
                        <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-2.5 text-[13px] text-slate-500">{idx + 1}</td>
                          <td className="px-4 py-2.5">
                            <input type="hidden" name="studentIds" value={student.id} />
                            <div className="text-[13px] font-semibold text-slate-900">{student.user.name}</div>
                            <div className="text-[11px] text-slate-500">{student.user.email}</div>
                          </td>
                          <td className="px-4 py-2.5 text-[13px] text-slate-700 font-mono">
                            {student.nisn}
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <input 
                              type="number" 
                              name={`score-${student.id}`}
                              defaultValue={grade}
                              min="0"
                              max="100"
                              step="0.1"
                              placeholder="0"
                              className="w-24 text-center px-2 py-1 text-[13px] font-semibold border border-slate-200 rounded focus:border-slate-400 outline-none"
                            />
                          </td>
                          <td className="px-4 py-2.5 text-center text-[12px] font-medium text-slate-600">
                            {predikat}
                          </td>
                        </tr>
                      );
                    })}

                    {students.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-[13px] text-slate-500">
                          Belum ada siswa terdaftar di kelas ini.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          ) : (
            <div className="bg-white border border-slate-200 p-8 text-center rounded-lg text-slate-500 text-[13px]">
              Pilih kelas di sebelah kiri untuk mengisi nilai.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
