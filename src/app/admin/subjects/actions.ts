"use server";
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
