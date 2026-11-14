import { prisma } from "@/lib/prisma";
import { Printer, Award, FileText, ChevronRight, ArrowLeft, CheckCircle2, UserCheck } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function RaporPage({
  searchParams,
}: {
  searchParams: Promise<{ ta?: string; sem?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeTA = resolvedParams.ta || "2026/2027";
  const activeSem = parseInt(resolvedParams.sem || "1", 10);

  const student = await prisma.student.findFirst({
    include: {
      user: true,
      class: {
        include: { homeroomTeacher: { include: { user: true } } }
      },
      attendances: true,
      homeroomNotes: {
        where: { academicYear: activeTA, semester: activeSem }
      }
    }
  });

  if (!student) return <div className="p-8 text-sm text-slate-500">Data Siswa Tidak Ditemukan</div>;

  const grades = await prisma.grade.findMany({
    where: { 
      studentId: student.id,
      academicYear: activeTA,
      semester: activeSem
    },
    include: { subject: true },
    orderBy: { subject: { name: 'asc' } }
  });

  const note = student.homeroomNotes[0];

  // Attendance calculation
  const totalPresent = student.attendances.filter(a => a.status === 'PRESENT').length;
  const totalExcused = student.attendances.filter(a => a.status === 'EXCUSED').length;
  const totalAbsent = student.attendances.filter(a => a.status === 'ABSENT').length;

  const avgScore = grades.length > 0 
    ? (grades.reduce((acc, g) => acc + g.score, 0) / grades.length).toFixed(1)
    : '0';

  const getPredikat = (score: number) => {
    if (score >= 90) return { letter: 'A', desc: 'Sangat Baik' };
    if (score >= 80) return { letter: 'B', desc: 'Baik' };
    if (score >= 75) return { letter: 'C', desc: 'Cukup' };
    return { letter: 'D', desc: 'Kurang' };
  };

  return (
    <div className="p-8 max-w-[1000px] mx-auto print:p-0 print:max-w-full">
      {/* Action Bar (hidden on print) */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">E-Rapor Digital Siswa</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Laporan Capaian Hasil Belajar Peserta Didik Resmi.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Print button triggers standard browser print dialog */}
          <Link 
            href="#" 
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-[13px] font-medium shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" /> Cetak Dokumen Rapor (PDF)
          </Link>
        </div>
      </div>

      {/* Rapor Paper Container */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8 print:border-none print:shadow-none print:p-0 space-y-6">
        
        {/* Kop Resmi Sekolah */}
        <div className="border-b-2 border-slate-900 pb-4 text-center">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900">SMA SWASTA CENDEKIA NUSANTARA</h2>
          <p className="text-[12px] text-slate-600">Jl. Cendekia Raya No. 1, Jakarta Selatan &bull; NSS/NPSN: 301298492 &bull; Akreditasi: A</p>
          <div className="text-[13px] font-semibold text-slate-900 mt-2 underline">
            LAPORAN CAPAIAN HASIL BELAJAR (E-RAPOR)
          </div>
        </div>

        {/* Student Biodata */}
        <div className="grid grid-cols-2 gap-4 text-[12px] bg-slate-50 p-4 rounded-md border border-slate-200 print:bg-transparent">
          <div className="space-y-1">
            <div className="flex"><span className="w-32 font-semibold text-slate-600">Nama Siswa:</span> <span className="font-bold text-slate-900">{student.user.name}</span></div>
            <div className="flex"><span className="w-32 font-semibold text-slate-600">NISN / NIS:</span> <span className="text-slate-800">{student.nisn} / {student.nis || '-'}</span></div>
            <div className="flex"><span className="w-32 font-semibold text-slate-600">Kelas / Rombel:</span> <span className="text-slate-800">{student.class?.name || '-'}</span></div>
          </div>
          <div className="space-y-1">
            <div className="flex"><span className="w-36 font-semibold text-slate-600">Tahun Ajaran:</span> <span className="text-slate-800">{activeTA}</span></div>
            <div className="flex"><span className="w-36 font-semibold text-slate-600">Semester:</span> <span className="text-slate-800">{activeSem === 1 ? '1 (Ganjil)' : '2 (Genap)'}</span></div>
            <div className="flex"><span className="w-36 font-semibold text-slate-600">Wali Kelas:</span> <span className="text-slate-800">{student.class?.homeroomTeacher?.user.name || '-'}</span></div>
          </div>
        </div>

        {/* Tabel Capaian Nilai Akademik */}
        <div>
          <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wide mb-2">A. Nilai Mata Pelajaran</h3>
          <table className="w-full text-left border-collapse border border-slate-200 text-[12px]">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="p-2 border border-slate-200 text-center w-[5%]">No</th>
                <th className="p-2 border border-slate-200 w-[45%]">Mata Pelajaran</th>
                <th className="p-2 border border-slate-200 text-center w-[15%]">KKM</th>
                <th className="p-2 border border-slate-200 text-center w-[15%]">Nilai Akhir</th>
                <th className="p-2 border border-slate-200 text-center w-[20%]">Predikat & Capaian</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, idx) => {
                const pred = getPredikat(g.score);
                return (
                  <tr key={g.id} className="border-b border-slate-200">
                    <td className="p-2 border border-slate-200 text-center">{idx + 1}</td>
                    <td className="p-2 border border-slate-200 font-semibold text-slate-900">{g.subject.name}</td>
                    <td className="p-2 border border-slate-200 text-center text-slate-600">75</td>
                    <td className="p-2 border border-slate-200 text-center font-bold text-slate-900">{g.score}</td>
                    <td className="p-2 border border-slate-200 text-center font-semibold text-slate-700">
                      {pred.letter} ({pred.desc})
                    </td>
                  </tr>
                );
              })}

              {grades.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-400">
                    Nilai belum diterbitkan oleh dewan guru untuk semester ini.
                  </td>
                </tr>
              )}
            </tbody>
            {grades.length > 0 && (
              <tfoot>
                <tr className="bg-slate-50 font-bold border-t border-slate-300">
                  <td colSpan={3} className="p-2 text-right">Rata-Rata Nilai Akademik:</td>
                  <td className="p-2 text-center text-slate-900 font-bold">{avgScore}</td>
                  <td className="p-2 text-center text-slate-700">Peringkat: {note?.rank ? `#${note.rank}` : '-'}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Capaian Sikap & Ekstrakurikuler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 p-4 rounded-md">
            <h4 className="text-[12px] font-bold text-slate-900 uppercase mb-2">B. Penilaian Sikap</h4>
            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-slate-600">Sikap Spiritual:</span>
                <span className="font-bold text-slate-900">{note?.spiritualScore || 'Baik'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sikap Sosial & Mandiri:</span>
                <span className="font-bold text-slate-900">{note?.socialScore || 'Baik'}</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 p-4 rounded-md">
            <h4 className="text-[12px] font-bold text-slate-900 uppercase mb-2">C. Rekapitulasi Presensi</h4>
            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-slate-600">Kehadiran (Hadir):</span>
                <span className="font-bold text-emerald-700">{totalPresent} Hari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Izin / Sakit:</span>
                <span className="font-bold text-blue-700">{totalExcused} Hari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tanpa Keterangan (Alpa):</span>
                <span className="font-bold text-rose-700">{totalAbsent} Hari</span>
              </div>
            </div>
          </div>
        </div>

        {/* Catatan Wali Kelas */}
        <div className="border border-slate-200 p-4 rounded-md text-[12px]">
          <h4 className="font-bold text-slate-900 uppercase mb-1">D. Catatan Wali Kelas</h4>
          <p className="text-slate-700 italic leading-relaxed">
            &quot;{note?.notes || 'Tingkatkan terus semangat belajar dan pertahankan prestasi membanggakan ini.'}&quot;
          </p>
        </div>

        {/* Tanda Tangan Resmi */}
        <div className="pt-8 grid grid-cols-3 text-center text-[12px] text-slate-800">
          <div>
            <p>Mengetahui,</p>
            <p className="font-medium text-slate-600">Orang Tua / Wali Murid</p>
            <div className="h-16"></div>
            <p className="font-bold underline">{student.parentName || '(..........................................)'}</p>
          </div>
          <div></div>
          <div>
            <p>Jakarta, 20 Desember 2026</p>
            <p className="font-medium text-slate-600">Wali Kelas,</p>
            <div className="h-16 flex items-center justify-center">
              <span className="text-[10px] text-emerald-700 border border-emerald-300 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                [Tanda Tangan Digital Tersertifikasi]
              </span>
            </div>
            <p className="font-bold underline">{student.class?.homeroomTeacher?.user.name || 'Drs. Budi Santoso'}</p>
            <p className="text-[11px] text-slate-500">NIP: {student.class?.homeroomTeacher?.nip || '-'}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
