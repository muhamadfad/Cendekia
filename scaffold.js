const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 1. TEACHERS
ensureDir('src/app/admin/teachers/create');
fs.writeFileSync('src/app/admin/teachers/actions.ts', `"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTeacher(formData: FormData) {
  const nip = formData.get("nip") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const user = await prisma.user.create({
    data: { name, email, role: "TEACHER", password: "password123" }
  });
  await prisma.teacher.create({ data: { userId: user.id, nip } });
  revalidatePath("/admin/teachers");
  redirect("/admin/teachers");
}

export async function deleteTeacher(id: string) {
  const teacher = await prisma.teacher.findUnique({ where: { id } });
  if (teacher) {
    await prisma.teacher.delete({ where: { id } });
    await prisma.user.delete({ where: { id: teacher.userId } });
  }
  revalidatePath("/admin/teachers");
}
`);

fs.writeFileSync('src/app/admin/teachers/create/page.tsx', `import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createTeacher } from "../actions";
export const dynamic = 'force-dynamic';
export default function CreateTeacherPage() {
  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <Link href="/admin/teachers" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Data Guru
      </Link>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Tambah Guru Baru</h1>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <form action={createTeacher} className="p-6 space-y-4">
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Nama Lengkap</label><input type="text" name="name" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Email</label><input type="email" name="email" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">NIP</label><input type="text" name="nip" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div className="pt-4 border-t flex justify-end gap-3"><button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium text-white bg-slate-900 shadow-sm"><Save className="w-4 h-4" /> Simpan</button></div>
        </form>
      </div>
    </div>
  );
}
`);

// 2. SUBJECTS
ensureDir('src/app/admin/subjects/create');
fs.writeFileSync('src/app/admin/subjects/actions.ts', `"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSubject(formData: FormData) {
  const code = formData.get("code") as string;
  const name = formData.get("name") as string;
  await prisma.subject.create({ data: { code, name } });
  revalidatePath("/admin/subjects");
  redirect("/admin/subjects");
}
export async function deleteSubject(id: string) {
  await prisma.subject.delete({ where: { id } });
  revalidatePath("/admin/subjects");
}
`);

fs.writeFileSync('src/app/admin/subjects/create/page.tsx', `import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createSubject } from "../actions";
export const dynamic = 'force-dynamic';
export default function CreateSubjectPage() {
  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <Link href="/admin/subjects" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Link>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Tambah Mata Pelajaran</h1>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <form action={createSubject} className="p-6 space-y-4">
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Kode Mapel</label><input type="text" name="code" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div><label className="block text-[12px] font-semibold text-slate-700 mb-1">Nama Mapel</label><input type="text" name="name" required className="w-full px-3 py-2 rounded-md border border-slate-200 focus:border-slate-400 outline-none text-[13px]" /></div>
          <div className="pt-4 border-t flex justify-end gap-3"><button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium text-white bg-slate-900 shadow-sm"><Save className="w-4 h-4" /> Simpan</button></div>
        </form>
      </div>
    </div>
  );
}
`);

// 3. STUDENTS Actions Update
ensureDir('src/app/admin/students/create');
fs.writeFileSync('src/app/admin/students/actions.ts', `"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStudent(formData: FormData) {
  const nisn = formData.get("nisn") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const classId = formData.get("classId") as string;

  const user = await prisma.user.create({
    data: { name, email, role: "STUDENT", password: "password123" }
  });
  await prisma.student.create({ data: { userId: user.id, nisn, classId: classId || null } });
  revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function deleteStudent(id: string) {
  const student = await prisma.student.findUnique({ where: { id } });
  if (student) {
    await prisma.student.delete({ where: { id } });
    await prisma.user.delete({ where: { id: student.userId } });
  }
  revalidatePath("/admin/students");
}
`);
