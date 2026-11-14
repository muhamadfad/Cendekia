"use server";
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
