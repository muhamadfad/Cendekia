import { prisma } from "@/lib/prisma";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteSubject } from "./actions";

export const dynamic = 'force-dynamic';

export default async function SubjectManagementPage() {
  const subjects = await prisma.subject.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Mata Pelajaran</h1>
          <p className="text-[13px] text-slate-500 mt-1">Kelola daftar mata pelajaran kurikulum sekolah.</p>
        </div>
        <Link href="/admin/subjects/create" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Tambah Mapel
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%]">Kode</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[45%]">Nama Mata Pelajaran</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">Status</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[20%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="text-[13px] font-medium text-slate-700">{subject.code || '-'}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="text-[13px] font-semibold text-slate-900">{subject.name}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Aktif
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <form action={deleteSubject.bind(null, subject.id)}>
                        <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              
              {subjects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[13px] text-slate-500">
                    Belum ada data mata pelajaran.
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
