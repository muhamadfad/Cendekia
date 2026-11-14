import { prisma } from "@/lib/prisma";
import { Plus, Edit2, Trash2, Search, Download } from "lucide-react";
import Link from "next/link";
import { deleteStudent } from "./actions";

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
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Master Data Siswa</h1>
          <p className="text-[13px] text-slate-500 mt-1">Kelola data induk siswa sesuai standar Dapodik (NISN, NIK, dll).</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <Link href="/admin/students/create" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Tambah Siswa
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari nama atau NISN..." 
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none w-full transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">NISN</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[35%]">Nama Lengkap</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">Kelas</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%]">Status</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[10%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="text-[13px] font-medium text-slate-700">{student.nisn}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="text-[13px] font-semibold text-slate-900">{student.user.name}</div>
                    <div className="text-[12px] text-slate-500">{student.user.email}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[13px] text-slate-700">
                      {student.class ? student.class.name : <span className="italic text-slate-400">Belum di-plot</span>}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Aktif
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Data">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <form action={deleteStudent.bind(null, student.id)}>
                        <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              
              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[13px] text-slate-500">
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
