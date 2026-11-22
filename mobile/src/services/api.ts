// Konfigurasi IP Backend Cendekia
// Menggunakan IP lokal komputer agar bisa diakses langsung oleh HP fisik di jaringan WiFi yang sama
export const BASE_API_URL = "http://192.168.50.49:3000";

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
    return {
      success: false,
      message: "Gagal terhubung ke server sekolah. Pastikan ponsel Anda terhubung ke jaringan yang sama.",
    };
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
    console.error("Student dashboard API error:", error);
    return {
      success: false,
      message: "Gagal memuat data akademik siswa dari server.",
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
    console.error("Parent dashboard API error:", error);
    return {
      success: false,
      message: "Gagal memuat data monitoring wali murid dari server.",
    };
  }
}
