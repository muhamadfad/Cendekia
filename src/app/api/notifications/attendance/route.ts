import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentIdParam = searchParams.get("studentId");

    let student = null;
    if (studentIdParam) {
      student = await prisma.student.findUnique({
        where: { id: studentIdParam },
        include: { user: true, class: true },
      });
    }

    if (!student) {
      student = await prisma.student.findFirst({
        include: { user: true, class: true },
      });
    }

    if (!student) {
      return NextResponse.json({ success: false, hasAttendance: false });
    }

    const todayStart = dayjs().startOf("day").toDate();
    const todayEnd = dayjs().endOf("day").toDate();

    const attendance = await prisma.attendance.findFirst({
      where: {
        studentId: student.id,
        date: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      orderBy: { date: "desc" },
    });

    if (!attendance) {
      return NextResponse.json({
        success: true,
        hasAttendance: false,
        studentName: student.user.name,
      });
    }

    const statusLabel =
      attendance.status === "PRESENT"
        ? "Hadir di Sekolah"
        : attendance.status === "EXCUSED"
        ? "Izin / Sakit"
        : "Belum Masuk Kelas (Alpa)";

    return NextResponse.json({
      success: true,
      hasAttendance: true,
      attendance: {
        id: attendance.id,
        status: attendance.status,
        statusLabel,
        studentName: student.user.name,
        className: student.class?.name || "Kelas",
        date: dayjs(attendance.date).format("dddd, DD MMMM YYYY"),
        time: dayjs(attendance.date).format("HH:mm") + " WIB",
        notes: attendance.notes || null,
      },
    });
  } catch (error: any) {
    console.error("Attendance notification API error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
