import { prisma } from "@/lib/prisma";
import { Edit2, Save, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ContextFilter } from "@/components/ContextFilter";

export const dynamic = 'force-dynamic';

export default async function GuruNilaiPage({ searchParams }: { searchParams: Promise<{ selected?: string, ta?: string, sem?: string }> }) {
  const resolvedParams = await searchParams;
  const selectedParam = resolvedParams.selected;
  
  // Default values for Academic Context
  const activeTA = resolvedParams.ta || "2026/2027";
  const activeSem = resolvedParams.sem || "1"; 

  // In a real app, this comes from getServerSession()
  const teacher = await prisma.teacher.findFirst({
    include: {
      user: true,
      homeroomedClasses: true,
    }
  });

  if (!teacher) return <div>Data Guru tidak ditemukan</div>;

  // 1. Find all classes and subjects this teacher teaches (via Schedule)
  // Note: In a fully scaled DB, schedules would also be tied to a specific Academic Year & Semester.
  const schedules = await prisma.schedule.findMany({
    where: { teacherId: teacher.id },
    include: { class: true, subject: true }
  });

  // Extract unique Class + Subject combinations
  const teachingAssignments = [];
  const seen = new Set();
  schedules.forEach(sch => {
    const key = `${sch.classId}-${sch.subjectId}`;
    if (!seen.has(key)) {
      seen.add(key);
      teachingAssignments.push({ cls: sch.class, sub: sch.subject, key });
    }
  });

  // Determine active assignment
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
          semester: parseInt(activeSem) 
        }
      }
    },
    orderBy: { user: { name: 'asc' } }
  }) : [];

  return (
    <div className="p-8">
      {/* Header & Global Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Input Nilai Siswa</h1>
          <p className="text-sm text-slate-500 mt-1">Sistem otomatis menampilkan kelas berdasarkan Jadwal Pelajaran Anda.</p>
        </div>
        
        <ContextFilter defaultTA={activeTA} defaultSem={activeSem} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar: Teaching Assignments */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kelas Anda</h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">{teachingAssignments.length} Mapel</span>
          </div>
          
          {teachingAssignments.map((assignment, idx) => {
            const isActive = activeAssignment?.key === assignment.key;
            return (
              <Link 
                href={`/guru/nilai?selected=${assignment.key}&ta=${activeTA}&sem=${activeSem}`}
                key={idx} 
                className={`p-4 border rounded-lg cursor-pointer transition-all block group ${isActive ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'}`}
              >
                <h4 className={`font-bold transition-colors ${isActive ? 'text-emerald-900' : 'text-slate-700 group-hover:text-emerald-700'}`}>{assignment.cls.name}</h4>
                <p className={`text-xs mt-1 transition-colors ${isActive ? 'text-emerald-700' : 'text-slate-500 group-hover:text-emerald-600'}`}>{assignment.sub.name}</p>
              </Link>
            );
          })}

          {teacher.homeroomedClasses.length > 0 && (
            <div className="mt-4 p-4 border border-indigo-200 bg-indigo-50/50 rounded-lg">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Tugas Tambahan</h4>
              <p className="text-sm font-bold text-indigo-800">Wali Kelas: {teacher.homeroomedClasses[0].name}</p>
              <Link href="/guru/walikelas" className="mt-3 w-full py-1.5 bg-indigo-600 text-white text-xs font-medium rounded hover:bg-indigo-700 transition-colors flex items-center justify-center">
                Kelola Rapor Kelas
              </Link>
            </div>
          )}
        </div>

        {/* Right Area: Grade Input Table */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
          {activeAssignment ? (
            <>
              {/* Context Header for Table */}
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-800">{activeAssignment.cls.name} - {activeAssignment.sub.name}</h3>
                  <p className="text-xs font-semibold text-emerald-600 mt-1">
                    Tahun Ajaran {activeTA} • Semester {activeSem === "1" ? "Ganjil" : "Genap"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-md flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {students.length} Siswa Terdaftar
                  </span>
                  <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-md text-xs font-bold transition-colors shadow-sm">
                    <Save className="w-3.5 h-3.5" /> Simpan Perubahan
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Siswa</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">NISN</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Nilai Akhir</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {students.map((student) => {
                      const existingGrade = student.grades[0]?.score || '';
                      return (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-slate-800">{student.user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-xs text-slate-500">{student.nisn}</div>
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-center">
                            <input 
                              type="number" 
                              defaultValue={existingGrade}
                              placeholder="0-100"
                              className="w-20 px-3 py-1.5 text-center text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            />
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-center">
                            <button title="Beri Catatan Khusus" className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
             <div className="p-10 text-center text-slate-500 flex flex-col items-center">
               <FileText className="w-10 h-10 text-slate-300 mb-3" />
               <p>Anda belum memiliki jadwal mengajar yang terdaftar di sistem.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
