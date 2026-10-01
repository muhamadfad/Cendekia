import { prisma } from "@/lib/prisma";
import { Download, Award, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminGradesPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedSemesterId = resolvedParams.id; // format: "2026/2027|1"

  const students = await prisma.student.findMany({
    include: {
      user: true,
      class: true,
      grades: true
    }
  });

  const semestersSet = new Set<string>();
  students.forEach(student => {
    student.grades.forEach(grade => {
      semestersSet.add(`${grade.academicYear}|${grade.semester}`);
    });
  });
  const availableSemesters = Array.from(semestersSet).sort().reverse();

  // VIEW 1: MASTER LIST
  if (!selectedSemesterId) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Rekap Nilai Siswa</h1>
            <p className="text-sm text-slate-500 mt-1">Pilih semester untuk melihat peringkat dan rata-rata siswa.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <Download className="w-4 h-4" /> Export Seluruh Data (CSV)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableSemesters.length === 0 && (
            <div className="col-span-full bg-white border border-slate-200 rounded-lg p-8 text-center text-slate-500">
              Belum ada data nilai akademik.
            </div>
          )}
          {availableSemesters.map(key => {
            const [year, sem] = key.split('|');
            const semNum = parseInt(sem);
            const semName = `Semester ${semNum === 1 ? 'Ganjil' : 'Genap'} ${year}`;
            
            // Count how many students have grades in this semester
            let count = 0;
            students.forEach(s => {
              if (s.grades.some(g => g.academicYear === year && g.semester === semNum)) {
                count++;
              }
            });

            return (
              <Link key={key} href={`/admin/grades?id=${encodeURIComponent(key)}`} className="group bg-white border border-slate-200 hover:border-blue-500 rounded-lg p-5 transition-all hover:shadow-md flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{semName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Berisi <span className="font-semibold text-blue-600">{count}</span> Siswa</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // VIEW 2: DETAIL TABLE
  const [activeYear, activeSemStr] = selectedSemesterId.split('|');
  const activeSemester = parseInt(activeSemStr);
  const semesterName = `Semester ${activeSemester === 1 ? 'Ganjil' : 'Genap'} ${activeYear}`;

  const activeStudents = students
    .map(student => {
      const semGrades = student.grades.filter(g => g.academicYear === activeYear && g.semester === activeSemester);
      return {
        ...student,
        semGrades,
        avgScore: semGrades.length > 0 ? (semGrades.reduce((a, b) => a + b.score, 0) / semGrades.length) : null
      };
    })
    .filter(student => student.semGrades.length > 0)
    .sort((a, b) => (b.avgScore || 0) - (a.avgScore || 0));

  return (
    <div className="p-8">
      <Link href="/admin/grades" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Semester
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{semesterName}</h1>
          <p className="text-sm text-slate-500 mt-1">Peringkat dan rata-rata nilai siswa pada semester ini.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <Download className="w-4 h-4" /> Export CSV ({activeYear.replace('/', '-')})
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Peringkat</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Siswa</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kelas</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Rata-rata Nilai</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {activeStudents.map((student, idx) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${idx < 3 ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-slate-100 text-slate-600'}`}>
                    {idx + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-800">{student.user.name}</div>
                  <div className="text-xs text-slate-500">{student.nisn}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium border border-slate-200">
                    {student.class?.name || 'Unassigned'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-sm font-bold text-blue-600">
                    {student.avgScore?.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
