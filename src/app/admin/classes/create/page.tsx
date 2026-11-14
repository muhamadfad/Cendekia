import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createClass } from "../actions";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function CreateClassPage() {
  const teachers = await prisma.teacher.findMany({ include: { user: true } });
  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <Link href="/admin/classes" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Kelas
      </Link>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Tambah Rombel Baru</h1>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <form action={createClass} className="p-6 space-y-4">
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Nama Kelas</label><input type="text" name="name" required placeholder="Contoh: X IPA 1" className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1">Tingkat Kelas</label>
            <select name="gradeLevel" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px] bg-slate-50">
              <option value="10">Tingkat 10</option>
              <option value="11">Tingkat 11</option>
              <option value="12">Tingkat 12</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1">Wali Kelas (Opsional)</label>
            <select name="homeroomTeacherId" className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px] bg-slate-50">
              <option value="">-- Belum Ditugaskan --</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.user.name}</option>)}
            </select>
          </div>
          <div className="pt-4 border-t flex justify-end gap-3"><button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium text-white bg-slate-900 shadow-sm"><Save className="w-4 h-4" /> Simpan</button></div>
        </form>
      </div>
    </div>
  );
}
