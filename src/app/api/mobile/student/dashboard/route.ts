import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    let student = null;
    if (studentId) {
      student = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
          user: true,
          class: {
            include: {
              homeroomTeacher: { include: { user: true } },
              schedules: {
                include: { subject: true, teacher: { include: { user: true } } }
              }
            }
          },
          attendances: { orderBy: { date: 'desc' }, take: 10 },
          grades: { include: { subject: true } },
          payments: { orderBy: [{ year: 'desc' }, { month: 'desc' }] },
          assignmentSubmissions: true,
          examResults: true
        }
      });
    } else {
      // Fallback first student
      student = await prisma.student.findFirst({
        include: {
          user: true,
          class: {
            include: {
              homeroomTeacher: { include: { user: true } },
              schedules: {
                include: { subject: true, teacher: { include: { user: true } } }
              }
            }
          },
          attendances: { orderBy: { date: 'desc' }, take: 10 },
          grades: { include: { subject: true } },
          payments: { orderBy: [{ year: 'desc' }, { month: 'desc' }] },
          assignmentSubmissions: true,
          examResults: true
        }
      });
    }

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Data siswa tidak ditemukan." },
        { status: 404 }
      );
    }

    // Today's classes
    const dayOfWeek = dayjs().day(); // 0 is Sunday, 1 is Monday ...
    const todaySchedules = student.class?.schedules.filter(s => s.dayOfWeek === dayOfWeek) || [];

    // Active assignments in class
    const assignments = await prisma.assignment.findMany({
      where: { classId: student.classId || "" },
      include: {
        subject: true,
        submissions: { where: { studentId: student.id } }
      },
      orderBy: { dueDate: 'asc' },
      take: 5
    });

    // Active CBT exams in class
    const exams = await prisma.exam.findMany({
      where: { classId: student.classId || "" },
      include: {
        subject: true,
        results: { where: { studentId: student.id } }
      },
      take: 3
    });

    // SPP Summary
    const pendingPayments = student.payments.filter(p => p.status === 'PENDING');
    const totalPending = pendingPayments.reduce((acc, c) => acc + c.amount, 0);

    return NextResponse.json({
      success: true,
      data: {
        student: {
          id: student.id,
          name: student.user.name,
          email: student.user.email,
          nisn: student.nisn,
          class: student.class?.name || '-',
          homeroomTeacher: student.class?.homeroomTeacher?.user.name || '-'
        },
        todaySchedules,
        assignments: assignments.map(a => ({
          id: a.id,
          title: a.title,
          subject: a.subject.name,
          dueDate: a.dueDate,
          isSubmitted: a.submissions.length > 0,
          score: a.submissions[0]?.score || null
        })),
        exams: exams.map(e => ({
          id: e.id,
          title: e.title,
          subject: e.subject.name,
          duration: e.durationMinutes,
          isCompleted: e.results.length > 0,
          score: e.results[0]?.score || null
        })),
        finance: {
          totalPending,
          pendingCount: pendingPayments.length,
          virtualAccount: "8872-0081-2345"
        }
      }
    });
  } catch (error: any) {
    console.error("Student dashboard API error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data dashboard siswa." },
      { status: 500 }
    );
  }
}
