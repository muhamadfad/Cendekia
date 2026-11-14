import { prisma } from "@/lib/prisma";
import { CheckCircle2, FileEdit, Printer, AlertCircle, ArrowLeft, Save, Star } from "lucide-react";
import Link from "next/link";
import { saveHomeroomReview } from "./actions";

export const dynamic = 'force-dynamic';

export default async function WaliKelasPage({ searchParams }: { searchParams: Promise<{ studentId?: string, ta?: string, sem?: string }> }) {
  const resolvedParams = await searchParams;
  const activeStudentId = resolvedParams.studentId;
  const activeTA = resolvedParams.ta || "2026/2027";
  const activeSem = resolvedParams.sem || "1";

  const teacher = await prisma.teacher.findFirst({
    include: { user: true, homeroomedClasses: true }
  });

  if (!teacher || teacher.homeroomedClasses.length === 0) {
    return (
      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="bg-white border border-slate-200 p-12 text-center rounded-lg shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Bukan Wali Kelas</h2>
          <p className="text-[13px] text-slate-500">Anda tidak terdaftar sebagai wali kelas aktif pada periode ini.</p>
        </div>
      </div>
    );
  }

  const homeroomClass = teacher.homeroomedClasses[0];

  // If viewing/editing individual student
  if (activeStudentId) {
    const student = await prisma.student.findUnique({
      where: { id: activeStudentId },
      include: { 
        user: true, 
        grades: { 
          include: { subject: true }, 
          where: { academicYear: activeTA, semester: parseInt(activeSem, 10) } 
        },
        homeroomNotes: {
          where: { academicYear: activeTA, semester: parseInt(activeSem, 10) }
        },
        attendances: true
      }
    });

    if (!student) return <div className="p-8 text-sm text-slate-500">Siswa tidak ditemukan</div>;

    const note = student.homeroomNotes[0];
    const avgScore = student.grades.length > 0 
      ? (student.grades.reduce((acc, g) => acc + g.score, 0) / student.grades.length).toFixed(1)
      : '0';

    return (
      <div className="p-8 max-w-[900px] mx-auto">
        <Link href="/guru/walikelas" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Rombel
        </Link>

        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <div>
              <h2 className="text-[14px] font-semibold text-slate-900">{student.user.name}</h2>
              <p className="text-[12px] text-slate-500">NISN: {student.nisn} &bull; Rombel: {homeroomClass.name}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Rata-Rata Nilai</span>
              <div className="text-[16px] font-bold text-slate-900">{avgScore}</div>
            </div>
          </div>

          <form action={saveHomeroomReview} className="p-6 space-y-4">
            <input type="hidden" name="studentId" value={student.id} />
            <input type="hidden" name="classId" value={homeroomClass.id} />
            <input type="hidden" name="academicYear" value={activeTA} />
            <input type="hidden" name="semester" value={activeSem} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Predikat Sikap Spiritual</label>
                <select name="spiritualScore" defaultValue={note?.spiritualScore || 'Sangat Baik'} className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none bg-slate-50 focus:bg-white">
                  <option value="Sangat Baik">Sangat Baik</option>
                  <option value="Baik">Baik</option>
                  <option value="Cukup">Cukup</option>
                  <option value="Kurang">Kurang</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Predikat Sikap Sosial</label>
                <select name="socialScore" defaultValue={note?.socialScore || 'Sangat Baik'} className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none bg-slate-50 focus:bg-white">
                  <option value="Sangat Baik">Sangat Baik</option>
                  <option value="Baik">Baik</option>
                  <option value="Cukup">Cukup</option>
                  <option value="Kurang">Kurang</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Peringkat Kelas (Ranking)</label>
                <input 
                  type="number" 
                  name="rank" 
                  defaultValue={note?.rank || ''} 
                  placeholder="Contoh: 1" 
                  className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none bg-slate-50 focus:bg-white" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Catatan Perkembangan Siswa (Tercetak di E-Rapor)</label>
              <textarea 
                name="notes" 
                rows={4} 
                defaultValue={note?.notes || ''}
                placeholder="Tuliskan apresiasi, motivasi belajar, dan saran pengembangan diri..." 
                className="w-full px-3 py-2 text-[13px] border border-slate-200 rounded-md outline-none focus:border-slate-400"
              ></textarea>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-medium rounded-md shadow-sm">
                <Save className="w-4 h-4" /> Simpan Catatan Rapor
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Homeroom overview
  const students = await prisma.student.findMany({
    where: { classId: homeroomClass.id },
    include: {
      user: true,
      grades: { where: { academicYear: activeTA, semester: parseInt(activeSem, 10) } },
      homeroomNotes: { where: { academicYear: activeTA, semester: parseInt(activeSem, 10) } }
    },
    orderBy: { user: { name: 'asc' } }
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Manajemen Wali Kelas ({homeroomClass.name})</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Pantau kesiapan nilai rapor, sikap spiritual/sosial, dan catatan akhir semester.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[5%]">No</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[35%]">Nama Siswa</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%]">NISN</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%] text-center">Rata-Rata Nilai</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%] text-center">Status Catatan</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student, idx) => {
                const note = student.homeroomNotes[0];
                const avgScore = student.grades.length > 0 
                  ? (student.grades.reduce((acc, g) => acc + g.score, 0) / student.grades.length).toFixed(1)
                  : '-';

                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5 text-[13px] text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] font-semibold text-slate-900">{student.user.name}</div>
                      <div className="text-[11px] text-slate-500">{student.user.email}</div>
                    </td>
                    <td className="px-4 py-2.5 text-[13px] text-slate-700 font-mono">
                      {student.nisn}
                    </td>
                    <td className="px-4 py-2.5 text-center text-[13px] font-semibold text-slate-900">
                      {avgScore}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {note?.notes ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Sudah Diisi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Belum Diisi
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <Link 
                        href={`/guru/walikelas?studentId=${student.id}&ta=${activeTA}&sem=${activeSem}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[12px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors shadow-sm"
                      >
                        <FileEdit className="w-3.5 h-3.5" /> Evaluasi Rapor
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
