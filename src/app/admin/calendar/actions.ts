"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const type = formData.get("type") as string;

  await prisma.academicCalendar.create({
    data: { 
      title, 
      description, 
      startDate: new Date(startDate), 
      endDate: new Date(endDate), 
      type: type as any 
    }
  });
  revalidatePath("/admin/calendar");
  redirect("/admin/calendar");
}

export async function deleteEvent(id: string) {
  await prisma.academicCalendar.delete({ where: { id } });
  revalidatePath("/admin/calendar");
}
