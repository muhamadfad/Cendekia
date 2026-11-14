const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ==========================================
// 1. CLASSES (ROMBEL)
// ==========================================
ensureDir('src/app/admin/classes/create');
fs.writeFileSync('src/app/admin/classes/actions.ts', `"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createClass(formData: FormData) {
  const name = formData.get("name") as string;
  const gradeLevel = parseInt(formData.get("gradeLevel") as string, 10);
  const homeroomTeacherId = formData.get("homeroomTeacherId") as string;

  await prisma.class.create({
    data: { name, gradeLevel, homeroomTeacherId: homeroomTeacherId || null }
  });
  revalidatePath("/admin/classes");
  redirect("/admin/classes");
}

export async function deleteClass(id: string) {
  await prisma.class.delete({ where: { id } });
  revalidatePath("/admin/classes");
}
`);

fs.writeFileSync('src/app/admin/classes/create/page.tsx', `import { ArrowLeft, Save } from "lucide-react";
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
`);

// ==========================================
// 2. DISCIPLINE (VIOLATIONS)
// ==========================================
ensureDir('src/app/admin/discipline/create');
fs.writeFileSync('src/app/admin/discipline/actions.ts', `"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createViolation(formData: FormData) {
  const studentId = formData.get("studentId") as string;
  const description = formData.get("description") as string;
  const point = parseInt(formData.get("point") as string, 10);

  await prisma.violation.create({
    data: { studentId, description, point }
  });
  revalidatePath("/admin/discipline");
  redirect("/admin/discipline");
}

export async function deleteViolation(id: string) {
  await prisma.violation.delete({ where: { id } });
  revalidatePath("/admin/discipline");
}
`);

fs.writeFileSync('src/app/admin/discipline/create/page.tsx', `import { ArrowLeft, Save } from "lucide-react";
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
`);

// ==========================================
// 3. CALENDAR
// ==========================================
ensureDir('src/app/admin/calendar/create');
fs.writeFileSync('src/app/admin/calendar/actions.ts', `"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const type = formData.get("type") as string;

  await prisma.academicCalendar.create({
    data: { title, description, startDate: new Date(startDate), endDate: new Date(endDate), type }
  });
  revalidatePath("/admin/calendar");
  redirect("/admin/calendar");
}

export async function deleteEvent(id: string) {
  await prisma.academicCalendar.delete({ where: { id } });
  revalidatePath("/admin/calendar");
}
`);

fs.writeFileSync('src/app/admin/calendar/create/page.tsx', `import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createEvent } from "../actions";

export const dynamic = 'force-dynamic';

export default function CreateEventPage() {
  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <Link href="/admin/calendar" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Kalender
      </Link>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Tambah Agenda Sekolah</h1>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <form action={createEvent} className="p-6 space-y-4">
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Judul Agenda</label><input type="text" name="title" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Deskripsi</label><textarea name="description" className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]"></textarea></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Tanggal Mulai</label><input type="date" name="startDate" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
            <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Tanggal Selesai</label><input type="date" name="endDate" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1">Tipe Agenda</label>
            <select name="type" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px] bg-slate-50">
              <option value="HOLIDAY">Libur Nasional / Sekolah</option>
              <option value="EXAM">Ujian Sekolah</option>
              <option value="EVENT">Event Sekolah (Lomba, Pensi)</option>
            </select>
          </div>
          <div className="pt-4 border-t flex justify-end gap-3"><button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium text-white bg-slate-900 shadow-sm"><Save className="w-4 h-4" /> Simpan</button></div>
        </form>
      </div>
    </div>
  );
}
`);
