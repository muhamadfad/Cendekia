import { prisma } from "@/lib/prisma";
import { CheckCircle2, FileEdit, Printer, AlertCircle, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { ContextFilter } from "@/components/ContextFilter";

export const dynamic = 'force-dynamic';

export default async function WaliKelasPage({ searchParams }: { searchParams: Promise<{ studentId?: string, ta?: string, sem?: string }> }) {
  const resolvedParams = await searchParams;
  const activeStudentId = resolvedParams.studentId;
  const activeTA = resolvedParams.ta || "2026/2027";
  const activeSem = resolvedParams.sem || "1";

  // Mock login session
  const teacher = await prisma.teacher.findFirst({
    include: { user: true, homeroomedClasses: true }
  });

  // Simulasi validasi historis (di real app, kita cek relasi wali kelas berdasarkan Tahun Ajaran)
  const isWaliKelasInThisPeriod = teacher?.homeroomedClasses && teacher.homeroomedClasses.length > 0;

  if (!teacher || !isWaliKelasInThisPeriod) {
    return (
      <div className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manajemen Rapor Kelas</h1>
            <p className="text-sm text-slate-500 mt-1">Anda tidak menjabat sebagai Wali Kelas pada periode ini.</p>
          </div>
          <ContextFilter defaultTA={activeTA} defaultSem={activeSem} />
        </div>
        <div className="p-10 text-center text-slate-500 bg-white border border-slate-200 rounded-lg shadow-sm">
          <p>Anda tidak terdaftar sebagai Wali Kelas pada Tahun Ajaran {activeTA} Semester {activeSem === "1" ? "Ganjil" : "Genap"}.</p>
        </div>
      </div>
    );
  }

  const homeroomClass = teacher.homeroomedClasses[0];
  const TOTAL_SUBJECTS = 14;

  // Jika sedang mode Evaluasi Detail Siswa
  if (activeStudentId) {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(activeStudentId) },
      include: { user: true, grades: { include: { subject: true }, where: { academicYear: activeTA, semester: parseInt(activeSem) } } }
    });

    if (!student) return <div>Siswa tidak ditemukan</div>;

    const subjectsSubmitted = new Set(student.grades.map(g => g.subjectId)).size;
    const isComplete = subjectsSubmitted >= TOTAL_SUBJECTS;
    const averageScore = student.grades.length > 0 
      ? (student.grades.reduce((a, b) => a + b.score, 0) / student.grades.length).toFixed(1) 
      : 0;

    return (
      <div className="p-8">
        <Link href={`/guru/walikelas?ta=${activeTA}&sem=${activeSem}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Kelas
        </Link>

        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Evaluasi Rapor: {student.user.name}</h1>
            <p className="text-sm text-slate-500 mt-1">
              NISN: {student.nisn} | Kelas: {homeroomClass.name} | <span className="font-semibold text-emerald-600">T.A {activeTA} ({activeSem === "1" ? "Ganjil" : "Genap"})</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Rata-Rata Nilai</div>
            <div className="text-3xl font-black text-emerald-600">{averageScore}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri: Tabel Nilai Guru Mapel */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm h-max">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800">Rekap Nilai Mata Pelajaran</h3>
              <span className="text-xs font-semibold text-slate-500">{subjectsSubmitted}/{TOTAL_SUBJECTS} Mapel Terkumpul</span>
            </div>
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Mata Pelajaran</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Nilai</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Predikat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {student.grades.map(grade => {
                  const p = grade.score >= 90 ? 'A' : grade.score >= 80 ? 'B' : grade.score >= 70 ? 'C' : 'D';
                  const c = p === 'A' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : p === 'B' ? 'text-blue-600 bg-blue-50 border-blue-200' : p === 'C' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-red-600 bg-red-50 border-red-200';
                  return (
                    <tr key={grade.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 text-sm font-semibold text-slate-700">{grade.subject.name}</td>
                      <td className="px-5 py-3 text-sm text-center font-bold">{grade.score}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`px-2 py-0.5 border rounded text-xs font-bold ${c}`}>{p}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Kolom Kanan: Input Wali Kelas */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-sm font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <FileEdit className="w-4 h-4" /> Form Catatan Wali Kelas
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-800 mb-1.5 uppercase tracking-wide">Sikap Spiritual & Sosial</label>
                  <textarea rows={2} className="w-full p-2.5 bg-white border border-emerald-200 rounded-md text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none" placeholder="Contoh: Sangat baik dalam berdoa dan..."></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-800 mb-1.5 uppercase tracking-wide">Catatan Akademik (Saran)</label>
                  <textarea rows={3} className="w-full p-2.5 bg-white border border-emerald-200 rounded-md text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none" placeholder="Contoh: Pertahankan prestasimu di semester depan..."></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-red-700 mb-1.5 uppercase tracking-wide">Keputusan Akhir ({activeSem === "2" ? "Kenaikan Kelas" : "Semester Ganjil"})</label>
                  <select 
                    className="w-full p-2.5 bg-white border border-red-300 rounded-md text-sm font-bold text-slate-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    disabled={!isComplete}
                  >
                    {activeSem === "1" ? (
                      <>
                        <option value="">-- Melanjutkan ke Semester 2 --</option>
                        <option value="lanjut">BERHAK MELANJUTKAN</option>
                      </>
                    ) : (
                      <>
                        <option value="">-- Pilih Keputusan (Wajib) --</option>
                        <option value="naik">NAIK KELAS (Ke Tingkat Berikutnya)</option>
                        <option value="tinggal">TINGGAL KELAS (Menetap)</option>
                      </>
                    )}
                  </select>
                  {!isComplete && (
                    <p className="text-[10px] text-red-600 mt-1 font-medium">*Keputusan dapat diisi setelah semua nilai masuk.</p>
                  )}
                </div>
              </div>

              <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                <Save className="w-4 h-4" /> Simpan Evaluasi Siswa
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Default (Daftar Kelas)
  const students = await prisma.student.findMany({
    where: { classId: homeroomClass.id },
    include: {
      user: true,
      grades: { where: { academicYear: activeTA, semester: parseInt(activeSem) } }
    },
    orderBy: { user: { name: 'asc' } }
  });

  return (
    <div className="p-8">
      {/* Header & Context Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Rapor Kelas</h1>
          <p className="text-sm text-slate-500 mt-1">
            Wali Kelas: <span className="font-semibold text-slate-700">{teacher.user.name}</span> | Kelas: <span className="font-bold text-emerald-600">{homeroomClass.name}</span>
          </p>
        </div>
        
        <ContextFilter defaultTA={activeTA} defaultSem={activeSem} />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8 flex flex-col md:flex-row md:justify-between md:items-center shadow-sm gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Pengaturan Rilis Rapor (Otomatis / Manual)</h3>
          <p className="text-xs text-slate-500 mt-1">Nilai yang diinput Guru Mapel tidak akan tampil sebelum Anda mem-validasi dan menset tanggal rilis.</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Jadwal Rilis Otomatis:</label>
            <input type="date" defaultValue="2026-06-20" className="px-3 py-1.5 border border-slate-300 rounded text-sm text-slate-700 outline-none focus:border-emerald-500" />
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-md text-sm font-bold transition-colors shadow-sm">
            Simpan Jadwal
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Daftar Siswa Perwalian</h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-0.5">Tahun Ajaran {activeTA} • Semester {activeSem === "1" ? "Ganjil" : "Genap"}</p>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Status Rapor: DRAFT</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Siswa</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Progres Nilai Mapel</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Evaluasi Akhir</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi Wali Kelas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {students.map((student) => {
                const subjectsSubmitted = new Set(student.grades.map(g => g.subjectId)).size;
                const isComplete = subjectsSubmitted >= TOTAL_SUBJECTS;
                const percentage = Math.min(100, Math.round((subjectsSubmitted / TOTAL_SUBJECTS) * 100));

                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-800">{student.user.name}</div>
                      <div className="text-xs text-slate-500">{student.nisn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-200 rounded-full h-2 max-w-[150px]">
                          <div 
                            className={`h-2 rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600">
                          {subjectsSubmitted}/{TOTAL_SUBJECTS} Mapel
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold border border-slate-200">
                        Menunggu Evaluasi
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link 
                          href={`/guru/walikelas?studentId=${student.id}&ta=${activeTA}&sem=${activeSem}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-xs font-bold rounded transition-all shadow-sm"
                        >
                          <FileEdit className="w-3.5 h-3.5" /> Evaluasi & Catatan
                        </Link>
                      </div>
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
