import { prisma } from "@/lib/prisma";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createSchedule } from "./actions";

export const dynamic = 'force-dynamic';

export default async function CreateSchedulePage() {
  const classes = await prisma.class.findMany({ orderBy: { name: 'asc' } });
  const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' } });
  const teachers = await prisma.teacher.findMany({ include: { user: true }, orderBy: { user: { name: 'asc' } } });

  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <Link href="/admin/schedules" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Jadwal
      </Link>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Plotting Jadwal Baru</h1>
        <p className="text-[13px] text-slate-500 mt-1">Isi formulir di bawah ini untuk mengatur sesi jadwal mengajar.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <form action={createSchedule} className="p-6 space-y-6">
          <div className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Kelas (Rombel)</label>
                <select name="classId" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white cursor-pointer">
                  <option value="">-- Pilih Kelas --</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name} (Tingkat {c.gradeLevel})</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Mata Pelajaran</label>
                <select name="subjectId" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white cursor-pointer">
                  <option value="">-- Pilih Mata Pelajaran --</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Guru Pengampu</label>
              <select name="teacherId" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white cursor-pointer">
                <option value="">-- Pilih Guru --</option>
                {teachers.map(t => <option key={t.id} value={t.id}>{t.user.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Hari</label>
                <select name="dayOfWeek" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white cursor-pointer">
                  <option value="1">Senin</option>
                  <option value="2">Selasa</option>
                  <option value="3">Rabu</option>
                  <option value="4">Kamis</option>
                  <option value="5">Jumat</option>
                  <option value="6">Sabtu</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Jam Mulai</label>
                <input type="time" name="startTime" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">Jam Selesai</label>
                <input type="time" name="endTime" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white" />
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Link href="/admin/schedules" className="px-4 py-2 rounded-md text-[13px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
              Batal
            </Link>
            <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm">
              <Save className="w-4 h-4" /> Simpan Jadwal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
