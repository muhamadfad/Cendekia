import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createStudent } from "../actions";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function CreateStudentPage() {
  const classes = await prisma.class.findMany({ orderBy: { name: 'asc' } });

  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <Link href="/admin/students" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Data Siswa
      </Link>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Tambah Siswa Baru</h1>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <form action={createStudent} className="p-6 space-y-4">
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">NISN</label><input type="text" name="nisn" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Nama Lengkap</label><input type="text" name="name" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Email</label><input type="email" name="email" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1">Plot Kelas (Opsional)</label>
            <select name="classId" className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px] bg-slate-50">
              <option value="">-- Biarkan Kosong --</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="pt-4 border-t flex justify-end gap-3"><button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium text-white bg-slate-900 shadow-sm"><Save className="w-4 h-4" /> Simpan</button></div>
        </form>
      </div>
    </div>
  );
}
