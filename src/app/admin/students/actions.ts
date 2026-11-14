"use server";
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
