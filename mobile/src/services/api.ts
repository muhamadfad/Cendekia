// Konfigurasi IP Backend Cendekia
// Untuk Android Emulator gunakan http://10.0.2.2:3000
// Untuk HP Fisik via WiFi gunakan IP komputer (misal: http://192.168.1.X:3000)
export const BASE_API_URL = "http://10.0.2.2:3000";

export async function loginApi(email: string, password: string) {
  try {
    const res = await fetch(`${BASE_API_URL}/api/mobile/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    console.error("Login API error:", error);
    // Fallback demo data if offline or network error
    if (email.includes("siswa")) {
      return {
        success: true,
        data: {
          id: "demo-siswa",
          name: "Ahmad Fauzi",
          email: "siswa@cendekia.sch.id",
          role: "STUDENT",
        },
      };
    } else {
      return {
        success: true,
        data: {
          id: "demo-ortu",
          name: "H. Joko Widodo, S.E.",
          email: "orangtua@cendekia.sch.id",
          role: "PARENT",
        },
      };
    }
  }
}

export async function getStudentDashboard(studentId?: string) {
  try {
    const url = studentId
      ? `${BASE_API_URL}/api/mobile/student/dashboard?studentId=${studentId}`
      : `${BASE_API_URL}/api/mobile/student/dashboard`;
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    return {
      success: true,
      data: {
        student: {
          name: "Ahmad Fauzi",
          nisn: "0081234567",
          class: "X IPA 1",
          homeroomTeacher: "Drs. Budi Santoso",
        },
        todaySchedules: [
          { id: "1", subject: { name: "Fisika" }, startTime: "07:30", endTime: "09:00" },
          { id: "2", subject: { name: "Matematika" }, startTime: "09:15", endTime: "10:45" },
        ],
        assignments: [
          { id: "a1", title: "Praktikum Vektor", subject: "Fisika", dueDate: "2026-12-25", isSubmitted: true, score: 92 },
        ],
        exams: [
          { id: "e1", title: "Ulangan Harian 1 Newton", subject: "Fisika", duration: 45, isCompleted: true, score: 100 },
        ],
        finance: {
          totalPending: 0,
          pendingCount: 0,
          virtualAccount: "8872-0081-2345",
        },
      },
    };
  }
}

export async function getParentDashboard(parentId?: string) {
  try {
    const url = parentId
      ? `${BASE_API_URL}/api/mobile/parent/dashboard?parentId=${parentId}`
      : `${BASE_API_URL}/api/mobile/parent/dashboard`;
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    return {
      success: true,
      data: {
        parentName: "H. Joko Widodo, S.E.",
        student: {
          name: "Ahmad Fauzi",
          nisn: "0081234567",
          class: "X IPA 1",
          homeroomTeacher: "Drs. Budi Santoso",
          homeroomPhone: "0812-9876-5432",
        },
        todayAttendance: {
          status: "PRESENT",
          date: "Rabu, 18 November 2026",
        },
        violations: {
          totalPoints: 0,
          records: [],
        },
        finance: {
          totalPending: 350000,
          pendingMonths: ["Juli 2026"],
          virtualAccount: "8872-0081-2345",
        },
        upcomingMeeting: {
          title: "Rapat Pleno Komite & Evaluasi Rapor",
          date: "Sabtu, 20 Desember 2026",
          time: "09:00 - 11:30 WIB",
          zoomUrl: "https://zoom.us/join",
          meetingId: "842 1928 3341",
          passcode: "cendekia26",
        },
      },
    };
  }
}
