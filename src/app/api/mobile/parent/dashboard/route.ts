import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parentId = searchParams.get("parentId");

    let parent = null;
    if (parentId) {
      parent = await prisma.parent.findUnique({
        where: { id: parentId },
        include: {
          user: true,
          students: {
            include: {
              user: true,
              class: {
                include: { homeroomTeacher: { include: { user: true } } }
              },
              attendances: { orderBy: { date: 'desc' }, take: 10 },
              violations: { orderBy: { date: 'desc' } },
              grades: { include: { subject: true } },
              payments: { orderBy: [{ year: 'desc' }, { month: 'desc' }] },
              homeroomNotes: true
            }
          }
        }
      });
    } else {
      parent = await prisma.parent.findFirst({
        include: {
          user: true,
          students: {
            include: {
              user: true,
              class: {
                include: { homeroomTeacher: { include: { user: true } } }
              },
              attendances: { orderBy: { date: 'desc' }, take: 10 },
              violations: { orderBy: { date: 'desc' } },
              grades: { include: { subject: true } },
              payments: { orderBy: [{ year: 'desc' }, { month: 'desc' }] },
              homeroomNotes: true
            }
          }
        }
      });
    }

    // Fallback if no parent profile
    const student = parent?.students[0] || await prisma.student.findFirst({
      include: {
        user: true,
        class: {
          include: { homeroomTeacher: { include: { user: true } } }
        },
        attendances: { orderBy: { date: 'desc' }, take: 10 },
        violations: { orderBy: { date: 'desc' } },
        grades: { include: { subject: true } },
        payments: { orderBy: [{ year: 'desc' }, { month: 'desc' }] },
        homeroomNotes: true
      }
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Data binaan siswa tidak ditemukan." },
        { status: 404 }
      );
    }

    // Check today's attendance
    const today = dayjs().startOf('day').toDate();
    const todayAttendance = student.attendances.find(a => dayjs(a.date).isSame(dayjs(), 'day'));

    const pendingPayments = student.payments.filter(p => p.status === 'PENDING');
    const totalPending = pendingPayments.reduce((acc, c) => acc + c.amount, 0);
    const totalViolations = student.violations.reduce((acc, v) => acc + v.points, 0);

    return NextResponse.json({
      success: true,
      data: {
        parentName: parent?.user.name || student.parentName || "Bapak/Ibu Wali Murid",
        student: {
          id: student.id,
          name: student.user.name,
          nisn: student.nisn,
          class: student.class?.name || '-',
          homeroomTeacher: student.class?.homeroomTeacher?.user.name || 'Drs. Budi Santoso',
          homeroomPhone: "0812-9876-5432"
        },
        todayAttendance: {
          status: todayAttendance?.status || 'PRESENT',
          date: dayjs().format('dddd, DD MMMM YYYY')
        },
        violations: {
          totalPoints: totalViolations,
          records: student.violations.map(v => ({
            id: v.id,
            title: v.title,
            points: v.points,
            date: v.date
          }))
        },
        finance: {
          totalPending,
          pendingMonths: pendingPayments.map(p => `${p.month} ${p.year}`),
          virtualAccount: "8872-0081-2345"
        },
        upcomingMeeting: {
          title: "Rapat Pleno Komite & Evaluasi Hasil Belajar",
          date: "Sabtu, 20 Desember 2026",
          time: "09:00 - 11:30 WIB",
          zoomUrl: "https://zoom.us/join",
          meetingId: "842 1928 3341",
          passcode: "cendekia26"
        }
      }
    });
  } catch (error: any) {
    console.error("Parent dashboard API error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data dashboard orang tua." },
      { status: 500 }
    );
  }
}
