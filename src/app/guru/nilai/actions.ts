"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveStudentGrades(formData: FormData) {
  const subjectId = formData.get("subjectId") as string;
  const academicYear = (formData.get("academicYear") as string) || "2026/2027";
  const semester = parseInt((formData.get("semester") as string) || "1", 10);
  const studentIds = formData.getAll("studentIds") as string[];

  for (const studentId of studentIds) {
    const scoreStr = formData.get(`score-${studentId}`) as string;
    if (scoreStr !== null && scoreStr !== undefined && scoreStr !== "") {
      const score = parseFloat(scoreStr);
      if (!isNaN(score)) {
        // Upsert grade
        const existing = await prisma.grade.findFirst({
          where: {
            studentId,
            subjectId,
            semester,
            academicYear,
          },
        });

        if (existing) {
          await prisma.grade.update({
            where: { id: existing.id },
            data: { score },
          });
        } else {
          await prisma.grade.create({
            data: {
              studentId,
              subjectId,
              score,
              semester,
              academicYear,
              type: "RAPOR",
            },
          });
        }
      }
    }
  }

  revalidatePath("/guru/nilai");
}
