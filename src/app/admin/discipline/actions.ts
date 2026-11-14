"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createViolation(formData: FormData) {
  const studentId = formData.get("studentId") as string;
  const description = formData.get("description") as string;
  const point = parseInt(formData.get("point") as string, 10);

  await prisma.violation.create({
    data: {
      studentId,
      title: description,
      points: point,
      reportedBy: "Guru BK / Kesiswaan"
    }
  });
  revalidatePath("/admin/discipline");
  redirect("/admin/discipline");
}

export async function deleteViolation(id: string) {
  await prisma.violation.delete({ where: { id } });
  revalidatePath("/admin/discipline");
}
