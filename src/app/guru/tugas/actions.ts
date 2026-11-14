"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createMaterial(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const classId = formData.get("classId") as string;
  const subjectId = formData.get("subjectId") as string;
  const teacherId = formData.get("teacherId") as string;

  await prisma.material.create({
    data: {
      title,
      content,
      fileUrl: fileUrl || null,
      classId,
      subjectId,
      teacherId,
    },
  });

  revalidatePath("/guru/tugas");
}

export async function createAssignment(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDateStr = formData.get("dueDate") as string;
  const classId = formData.get("classId") as string;
  const subjectId = formData.get("subjectId") as string;
  const teacherId = formData.get("teacherId") as string;

  await prisma.assignment.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDateStr),
      classId,
      subjectId,
      teacherId,
    },
  });

  revalidatePath("/guru/tugas");
}

export async function gradeSubmission(formData: FormData) {
  const submissionId = formData.get("submissionId") as string;
  const score = parseFloat(formData.get("score") as string);
  const feedback = formData.get("feedback") as string;

  await prisma.assignmentSubmission.update({
    where: { id: submissionId },
    data: {
      score,
      feedback,
      status: "GRADED",
    },
  });

  revalidatePath("/guru/tugas");
}

export async function deleteMaterial(id: string) {
  await prisma.material.delete({ where: { id } });
  revalidatePath("/guru/tugas");
}

export async function deleteAssignment(id: string) {
  await prisma.assignment.delete({ where: { id } });
  revalidatePath("/guru/tugas");
}
