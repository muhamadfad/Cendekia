"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSchedule(id: string) {
  try {
    await prisma.schedule.delete({
      where: { id }
    });
    revalidatePath("/admin/schedules");
  } catch (error) {
    console.error("Gagal menghapus jadwal:", error);
    throw new Error("Gagal menghapus jadwal");
  }
}

export async function editSchedule(id: string, formData: FormData) {
  const classId = formData.get('classId') as string;
  const subjectId = formData.get('subjectId') as string;
  const teacherId = formData.get('teacherId') as string;
  const dayOfWeek = parseInt(formData.get('dayOfWeek') as string, 10);
  const startTime = formData.get('startTime') as string;
  const endTime = formData.get('endTime') as string;

  if (!classId || !subjectId || !teacherId || isNaN(dayOfWeek) || !startTime || !endTime) {
    throw new Error('Mohon lengkapi semua field jadwal.');
  }

  await prisma.schedule.update({
    where: { id },
    data: { classId, subjectId, teacherId, dayOfWeek, startTime, endTime }
  });

  revalidatePath('/admin/schedules');
}

