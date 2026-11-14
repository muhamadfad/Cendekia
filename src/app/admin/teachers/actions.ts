"use server";
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
