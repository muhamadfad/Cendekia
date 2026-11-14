import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createViolation } from "../actions";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function CreateViolationPage() {
  const students = await prisma.student.findMany({ include: { user: true, class: true }, orderBy: { user: { name: 'asc' } } });
  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <Link href="/admin/discipline" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke BK
      </Link>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Catat Pelanggaran Siswa</h1>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <form action={createViolation} className="p-6 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1">Siswa Pelanggar</label>
            <select name="studentId" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px] bg-slate-50">
              <option value="">-- Pilih Siswa --</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.user.name} ({s.class?.name || 'Tanpa Kelas'})</option>)}
            </select>
          </div>
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Deskripsi Pelanggaran</label><input type="text" name="description" required placeholder="Contoh: Terlambat masuk kelas" className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Poin Hukuman (Pengurangan)</label><input type="number" name="point" required placeholder="5" className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div className="pt-4 border-t flex justify-end gap-3"><button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium text-white bg-red-600 shadow-sm"><Save className="w-4 h-4" /> Catat Pelanggaran</button></div>
        </form>
      </div>
    </div>
  );
}
