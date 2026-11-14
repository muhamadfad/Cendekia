"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveHomeroomReview(formData: FormData) {
  const studentId = formData.get("studentId") as string;
  const classId = formData.get("classId") as string;
  const semester = parseInt((formData.get("semester") as string) || "1", 10);
  const academicYear = (formData.get("academicYear") as string) || "2026/2027";
  const spiritualScore = formData.get("spiritualScore") as string;
  const socialScore = formData.get("socialScore") as string;
  const notes = formData.get("notes") as string;
  const rankStr = formData.get("rank") as string;
  const rank = rankStr ? parseInt(rankStr, 10) : null;

  const existing = await prisma.homeroomNote.findFirst({
    where: {
      studentId,
      classId,
      semester,
      academicYear,
    },
  });

  if (existing) {
    await prisma.homeroomNote.update({
      where: { id: existing.id },
      data: {
        spiritualScore,
        socialScore,
        notes,
        rank,
      },
    });
  } else {
    await prisma.homeroomNote.create({
      data: {
        studentId,
        classId,
        semester,
        academicYear,
        spiritualScore,
        socialScore,
        notes,
        rank,
      },
    });
  }

  revalidatePath("/guru/walikelas");
}
