import { prisma } from "@/lib/prisma";
import { Plus, MoreHorizontal, Search, Users, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteClass } from "./actions";

export const dynamic = 'force-dynamic';

export default async function ClassManagementPage() {
  const classes = await prisma.class.findMany({
    include: {
      students: true,
      homeroomTeacher: { include: { user: true } } // Fix: Use homeroomTeacher relation
    },
    orderBy: [
      { gradeLevel: 'asc' },
      { name: 'asc' }
    ]
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Data Rombongan Belajar (Kelas)</h1>
          <p className="text-[13px] text-slate-500 mt-1">Kelola daftar kelas, kapasitas siswa, dan penugasan wali kelas.</p>
        </div>
        <Link href="/admin/classes/create" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Tambah Kelas
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari kelas atau wali kelas..." 
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[13px] focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none w-full transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] text-slate-700 outline-none hover:bg-slate-50">
              <option>Semua Tingkat</option>
              <option>Tingkat 10</option>
              <option>Tingkat 11</option>
              <option>Tingkat 12</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">Nama Kelas</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%]">Tingkat</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[35%]">Wali Kelas</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">Kapasitas</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[10%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="text-[13px] font-medium text-slate-900">{cls.name}</div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[13px] text-slate-600">
                      Tingkat {cls.gradeLevel}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    {cls.homeroomTeacher ? (
                      <div className="text-[13px] font-medium text-slate-700">{cls.homeroomTeacher.user.name}</div>
                    ) : (
                      <div className="flex items-center gap-2 text-[13px] text-slate-500 italic">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div> Belum Ditugaskan
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="text-[13px] text-slate-600 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> {cls.students.length} Siswa
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors bg-slate-50 border border-slate-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {classes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[13px] text-slate-500">
                    Belum ada data rombongan belajar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center text-[12px] text-slate-500">
          <span>Menampilkan {classes.length} kelas</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded hover:bg-slate-200 disabled:opacity-50">Prev</button>
            <button className="px-2 py-1 rounded hover:bg-slate-200 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
