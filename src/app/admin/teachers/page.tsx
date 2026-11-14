import { prisma } from "@/lib/prisma";
import { Plus, Edit2, Trash2, Search, Download } from "lucide-react";
import Link from "next/link";
import { deleteTeacher } from "./actions";

export const dynamic = 'force-dynamic';

export default async function TeacherMasterDataPage() {
  const teachers = await prisma.teacher.findMany({
    include: {
      user: true,
      schedules: {
        include: { subject: true }
      }
    },
    orderBy: { user: { name: 'asc' } }
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Master Data Guru</h1>
          <p className="text-[13px] text-slate-500 mt-1">Kelola data kepegawaian dan penugasan mengajar guru.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <Link href="/admin/teachers/create" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Tambah Guru
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari nama atau NIP..." 
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none w-full transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[25%]">Nama Lengkap</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%]">NIP</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">Email</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[30%]">Mata Pelajaran (Diampu)</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[10%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((teacher) => {
                const subjects = Array.from(new Set(teacher.schedules.map(s => s.subject.name)));
                
                return (
                  <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] font-medium text-slate-900">{teacher.user.name}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] text-slate-700">{teacher.nip || '-'}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] text-slate-600">{teacher.user.email}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {subjects.length > 0 ? subjects.map((sub, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200">
                            {sub}
                          </span>
                        )) : (
                          <span className="text-[12px] text-slate-400 italic">Belum ada jadwal</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit Data">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <form action={deleteTeacher.bind(null, teacher.id)}>
                          <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {teachers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[13px] text-slate-500">
                    Tidak ada data guru ditemukan.
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
