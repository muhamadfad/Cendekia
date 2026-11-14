"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitAssignment(formData: FormData) {
  const assignmentId = formData.get("assignmentId") as string;
  const studentId = formData.get("studentId") as string;
  const content = formData.get("content") as string;
  const fileUrl = formData.get("fileUrl") as string;

  const existing = await prisma.assignmentSubmission.findFirst({
    where: { assignmentId, studentId }
  });

  if (existing) {
    await prisma.assignmentSubmission.update({
      where: { id: existing.id },
      data: {
        content,
        fileUrl: fileUrl || null,
        submittedAt: new Date(),
        status: "SUBMITTED"
      }
    });
  } else {
    await prisma.assignmentSubmission.create({
      data: {
        assignmentId,
        studentId,
        content,
        fileUrl: fileUrl || null,
        status: "SUBMITTED"
      }
    });
  }

  revalidatePath("/siswa/tugas");
}

export async function submitCbtExam(formData: FormData) {
  const examId = formData.get("examId") as string;
  const studentId = formData.get("studentId") as string;

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: { questions: true }
  });

  if (!exam) throw new Error("Ujian tidak ditemukan");

  let totalScore = 0;
  const totalQuestions = exam.questions.length;

  for (const q of exam.questions) {
    const studentAnswer = formData.get(`question-${q.id}`) as string;
    if (studentAnswer && studentAnswer.toUpperCase() === q.correctAnswer.toUpperCase()) {
      totalScore += q.points;
    }
  }

  // Normalize or clamp to 100
  const normalizedScore = totalQuestions > 0 ? Math.min(100, Math.round(totalScore)) : 100;

  const existing = await prisma.examResult.findFirst({
    where: { examId, studentId }
  });

  if (existing) {
    await prisma.examResult.update({
      where: { id: existing.id },
      data: { score: normalizedScore, submittedAt: new Date() }
    });
  } else {
    await prisma.examResult.create({
      data: {
        examId,
        studentId,
        score: normalizedScore
      }
    });
  }

  revalidatePath("/siswa/tugas");
}
