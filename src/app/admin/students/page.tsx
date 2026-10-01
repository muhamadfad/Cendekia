import { prisma } from "@/lib/prisma";
import { Plus, Edit2, Trash2, Search, Download, Filter } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function StudentMasterDataPage() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      class: true
    },
    orderBy: { user: { name: 'asc' } }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Master Data Siswa</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola data induk siswa sesuai standar Dapodik (NISN, NIK, dll).</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-slate-200">
            <Download className="w-4 h-4" /> Export
          </button>
          <Link href="/admin/students/create" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Tambah Siswa Baru
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari nama atau NISN..." 
              className="pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-full"
            />
          </div>
          <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-300 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter Kelas
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">NISN / NIS</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">L/P</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Kelas Saat Ini</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Data</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {students.map((student) => {
                // Determine if Dapodik data is complete (mock logic)
                const isComplete = student.nisn && student.gender && student.birthPlace;
                
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900">{student.user.name}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">{student.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-700 font-medium">{student.nisn}</div>
                      <div className="text-xs text-slate-400">{student.nis || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {student.gender === 'L' ? 'Laki-laki' : student.gender === 'P' ? 'Perempuan' : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold border border-blue-100">
                        {student.class?.name || 'Belum Masuk Rombel'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isComplete ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Lengkap
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium border border-amber-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Tidak Lengkap
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4" title="Edit Data Dapodik">
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Hapus">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {students.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                    Tidak ada data siswa ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
