"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSchedule(formData: FormData) {
  const classId = formData.get("classId") as string;
  const subjectId = formData.get("subjectId") as string;
  const teacherId = formData.get("teacherId") as string;
  const dayOfWeek = parseInt(formData.get("dayOfWeek") as string, 10);
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;

  if (!classId || !subjectId || !teacherId || isNaN(dayOfWeek) || !startTime || !endTime) {
    throw new Error("Mohon lengkapi semua field jadwal.");
  }

  await prisma.schedule.create({
    data: {
      classId,
      subjectId,
      teacherId,
      dayOfWeek,
      startTime,
      endTime
    }
  });

  revalidatePath("/admin/schedules");
  redirect("/admin/schedules");
}
