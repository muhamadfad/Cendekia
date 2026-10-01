"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createStudent(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nisn = formData.get("nisn") as string;
  const gender = formData.get("gender") as string;
  const classId = formData.get("classId") as string;

  if (!name || !email || !password || !nisn) {
    throw new Error("Missing required fields");
  }

  // 1. Create the User (Role STUDENT)
  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      name,
      email,
      password, // In real app, hash this!
      role: "STUDENT",
    }
  });

  // 2. Create the Student profile
  await prisma.student.create({
    data: {
      id: uuidv4(),
      userId: user.id,
      nisn,
      gender,
      classId: classId !== "UNASSIGNED" ? classId : null,
    }
  });

  revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function deleteStudent(studentId: string, userId: string) {
  // Delete student profile first
  await prisma.student.delete({
    where: { id: studentId }
  });
  // Delete user account
  await prisma.user.delete({
    where: { id: userId }
  });

  revalidatePath("/admin/students");
}
