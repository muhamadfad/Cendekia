import { prisma } from "@/lib/prisma";
import { Download, Award, FileText, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function RaporPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedSemesterId = resolvedParams.id; // format: "2026/2027|1"

  const student = await prisma.student.findFirst({
    include: {
      user: true,
      class: true,
    }
  });

  if (!student) return <div>Data Siswa Tidak Ditemukan</div>;

  // Fetch ALL grades to group them for the menu
  const allGrades = await prisma.grade.findMany({
    where: { studentId: student.id },
    include: { subject: true },
    orderBy: [
      { academicYear: 'desc' },
      { semester: 'desc' },
      { subject: { name: 'asc' } }
    ]
  });

  const semestersSet = new Set<string>();
  allGrades.forEach(g => semestersSet.add(`${g.academicYear}|${g.semester}`));
  const availableSemesters = Array.from(semestersSet).sort().reverse();

  const getPredikat = (score: number) => {
    if (score >= 90) return { letter: 'A', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 85) return { letter: 'B+', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (score >= 80) return { letter: 'B', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    if (score >= 70) return { letter: 'C', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { letter: 'D', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  // VIEW 1: LIST OF SEMESTERS
  if (!selectedSemesterId) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">E-Rapor & Transkrip</h1>
            <p className="text-sm text-slate-500 mt-1">Pilih tahun ajaran dan semester untuk melihat detail nilai.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-center mb-8">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Profil Siswa</p>
          <div className="flex items-center gap-4 mb-1">
            <div className="text-lg font-bold text-slate-900">{student.user.name}</div>
            <div className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
              {student.class?.name || "Belum ada kelas"}
            </div>
          </div>
          <p className="text-xs font-medium text-slate-500">NISN: {student.nisn}</p>
        </div>

        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Daftar Semester Tersedia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableSemesters.length === 0 && (
            <div className="col-span-full bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500">
              Belum ada data nilai.
            </div>
          )}
          {availableSemesters.map(key => {
            const [year, sem] = key.split('|');
            const semNum = parseInt(sem);
            const semName = `Semester ${semNum === 1 ? 'Ganjil' : 'Genap'} ${year}`;
            
            // Calculate avg for this specific semester
            const semGrades = allGrades.filter(g => g.academicYear === year && g.semester === semNum);
            const avg = (semGrades.reduce((a, b) => a + b.score, 0) / semGrades.length).toFixed(1);

            return (
              <Link key={key} href={`/siswa/rapor?id=${encodeURIComponent(key)}`} className="group bg-white border border-slate-200 hover:border-indigo-500 rounded-lg p-5 transition-all hover:shadow-md flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{semName}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Rata-rata: <span className="font-semibold text-indigo-600">{avg}</span></p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // VIEW 2: DETAILS FOR SELECTED SEMESTER
  const [activeYear, activeSemStr] = selectedSemesterId.split('|');
  const activeSemester = parseInt(activeSemStr);
  
  const filteredGrades = allGrades.filter(g => g.academicYear === activeYear && g.semester === activeSemester);
  const averageScore = (filteredGrades.reduce((a, b) => a + b.score, 0) / filteredGrades.length).toFixed(1);

  // SIMULASI DRAFT: Anggap saja Semester Ganjil 2026/2027 masih belum di-publish oleh Wali Kelas
  const isDraft = activeSemester === 1 && activeYear === "2026/2027";

  return (
    <div className="p-8">
      <Link href="/siswa/rapor" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Semester
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Detail Nilai</h1>
          <p className="text-sm text-slate-500 mt-1">Semester {activeSemester === 1 ? 'Ganjil' : 'Genap'} {activeYear}</p>
        </div>
        <button 
          disabled={isDraft}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDraft ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          <Download className="w-4 h-4" /> Unduh Rapor (PDF)
        </button>
      </div>

      {isDraft ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 className="text-xl font-bold text-amber-900 mb-2">Nilai Belum Dirilis</h2>
          <p className="text-amber-700 max-w-lg">
            Nilai untuk semester ini sedang dalam tahap penilaian oleh Guru Mata Pelajaran dan belum diterbitkan oleh Wali Kelas. 
            Silakan cek kembali pada tanggal pembagian rapor.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-white flex justify-between items-center mb-8 max-w-sm">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Rata-rata Semester</p>
              <h3 className="text-4xl font-bold">{averageScore}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-md border border-white/10">
              <Award className="w-8 h-8 text-indigo-300" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/2">Mata Pelajaran</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Nilai Akhir</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Predikat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredGrades.map(grade => {
                  const pred = getPredikat(grade.score);
                  return (
                    <tr key={grade.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-semibold text-slate-800">{grade.subject.name}</td>
                      <td className="px-6 py-5 text-sm text-center font-bold text-indigo-600">{grade.score.toFixed(1)}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-2 py-1 border rounded text-xs font-bold ${pred.color}`}>
                          {pred.letter}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
