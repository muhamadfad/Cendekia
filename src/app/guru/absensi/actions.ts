"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";

export async function saveBulkAttendance(formData: FormData) {
  const targetDate = new Date();
  const studentIds = formData.getAll("studentIds") as string[];

  const startOfDay = dayjs(targetDate).startOf("day").toDate();
  const endOfDay = dayjs(targetDate).endOf("day").toDate();

  for (const studentId of studentIds) {
    const status = (formData.get(`status-${studentId}`) as any) || "PRESENT";
    const notes = (formData.get(`notes-${studentId}`) as string) || "";

    const existing = await prisma.attendance.findFirst({
      where: {
        studentId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existing) {
      await prisma.attendance.update({
        where: { id: existing.id },
        data: {
          status: status as any,
          notes,
        },
      });
    } else {
      await prisma.attendance.create({
        data: {
          studentId,
          date: targetDate,
          status: status as any,
          notes,
        },
      });
    }
  }

  revalidatePath("/guru/absensi");
}
