import { prisma } from "@/lib/prisma";
import { Users, GraduationCap, CheckCircle2, Clock, AlertTriangle, ShieldAlert, Phone, Mail, Award, ArrowUpRight, Video, Calendar } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function OrangTuaDashboardPage() {
  // Get parent and linked student
  const parent = await prisma.parent.findFirst({
    include: {
      user: true,
      students: {
        include: {
          user: true,
          class: {
            include: { homeroomTeacher: { include: { user: true } } }
          },
          attendances: { orderBy: { date: 'desc' }, take: 10 },
          grades: { include: { subject: true }, take: 5 },
          violations: { orderBy: { date: 'desc' } },
          payments: { orderBy: [{ year: 'desc' }, { month: 'desc' }] },
          homeroomNotes: { take: 1 }
        }
      }
    }
  });

  // Fallback to demo student if parent record isn't seeded yet
  const student = parent?.students[0] || await prisma.student.findFirst({
    include: {
      user: true,
      class: {
        include: { homeroomTeacher: { include: { user: true } } }
      },
      attendances: { orderBy: { date: 'desc' }, take: 10 },
      grades: { include: { subject: true }, take: 5 },
      violations: { orderBy: { date: 'desc' } },
      payments: { orderBy: [{ year: 'desc' }, { month: 'desc' }] },
      homeroomNotes: { take: 1 }
    }
  });

  if (!student) {
    return (
      <div className="p-8 text-center text-slate-500 text-[13px]">
        Data siswa binaan belum terdaftar di sistem.
      </div>
    );
  }

  // Today's attendance
  const today = dayjs().startOf('day').toDate();
  const todayAttendance = student.attendances.find(a => dayjs(a.date).isSame(dayjs(), 'day'));

  // Pending payments
  const pendingPayments = student.payments.filter(p => p.status === 'PENDING');
  const totalPending = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);

  // Violations
  const totalViolationPoints = student.violations.reduce((acc, v) => acc + v.points, 0);

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pemantauan Akademik & Karakter Anak</span>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight mt-0.5">
            Selamat Datang, {parent?.user.name || student.parentName || 'Bapak/Ibu Wali Murid'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-md shadow-sm text-[12px] font-medium text-slate-700">
            Siswa: <span className="font-bold text-slate-900">{student.user.name}</span> ({student.class?.name || 'X IPA 1'})
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Kehadiran Hari Ini */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Presensi Hari Ini</span>
          <div className="flex items-center gap-2 mt-1">
            {todayAttendance?.status === 'PRESENT' || !todayAttendance ? (
              <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hadir di Sekolah
              </span>
            ) : todayAttendance.status === 'EXCUSED' ? (
              <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-blue-700">
                <Clock className="w-4 h-4 text-blue-600" /> Izin / Sakit
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-rose-700">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Belum Masuk Kelas
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">{dayjs().format('dddd, DD MMMM YYYY')}</p>
        </div>

        {/* Kedisiplinan & Poin BK */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Poin Pelanggaran (BK)</span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {totalViolationPoints} <span className="text-[12px] font-normal text-slate-500">Poin</span>
          </div>
          <div className="text-[11px] text-slate-500">
            {totalViolationPoints === 0 ? 'Tertib tanpa pelanggaran' : `${student.violations.length} catatan pelanggaran tercatat`}
          </div>
        </div>

        {/* Tagihan SPP */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Tunggakan SPP</span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            Rp {totalPending.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500">
            {pendingPayments.length === 0 ? 'Semua tagihan lunas' : `${pendingPayments.length} bulan belum lunas`}
          </div>
        </div>

        {/* Wali Kelas */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Wali Kelas</span>
          <div className="text-[13px] font-bold text-slate-900 mt-1 truncate">
            {student.class?.homeroomTeacher?.user.name || 'Drs. Budi Santoso'}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400" /> 0812-9876-5432
          </div>
        </div>
      </div>

      {/* Smart Meeting Banner for Parents */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-l-blue-600">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Video className="w-3.5 h-3.5" /> Rapat Online & Konsultasi Rapor Terjadwal
          </div>
          <h3 className="text-[14px] font-bold text-slate-900 mt-1">
            Rapat Pleno Komite & Evaluasi Hasil Belajar Semester Ganjil
          </h3>
          <p className="text-[12px] text-slate-500">
            Sabtu, 20 Desember 2026 &bull; Pukul 09:00 - 11:30 WIB &bull; Dihadiri Kepala Sekolah, Wali Kelas, dan Wali Murid.
          </p>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
            Meeting ID: 842 1928 3341 &bull; Passcode: cendekia26
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a 
            href="https://zoom.us/join" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-colors shadow-sm"
          >
            <Video className="w-4 h-4" /> Masuk Zoom Meeting
          </a>
        </div>
      </div>

      {/* Main Grid: Rekap Nilai & Rekap Kehadiran */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri: Capaian Nilai Terbaru */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-700" />
              <h2 className="text-[13px] font-semibold text-slate-900">Perkembangan Nilai Akademik</h2>
            </div>
            <Link href="/siswa/rapor" className="text-[12px] font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
              Lihat E-Rapor Lengkap <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {student.grades.map(g => (
              <div key={g.id} className="py-2.5 flex justify-between items-center text-[12px]">
                <div>
                  <div className="font-semibold text-slate-900">{g.subject.name}</div>
                  <div className="text-[11px] text-slate-500">Nilai Semester {g.semester} &bull; {g.academicYear}</div>
                </div>
                <div className="text-right">
                  <span className="text-[14px] font-bold text-slate-900">{g.score}</span>
                  <div className="text-[10px] font-medium text-slate-500">
                    {g.score >= 80 ? 'Baik' : 'Cukup'}
                  </div>
                </div>
              </div>
            ))}

            {student.grades.length === 0 && (
              <div className="py-6 text-center text-slate-400 text-[12px]">
                Belum ada data nilai yang dipublikasikan.
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Riwayat Presensi & Kedisiplinan */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-700" />
              <h2 className="text-[13px] font-semibold text-slate-900">Riwayat Presensi Terbaru</h2>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {student.attendances.slice(0, 5).map(a => (
              <div key={a.id} className="py-2.5 flex justify-between items-center text-[12px]">
                <div>
                  <div className="font-semibold text-slate-900">
                    {dayjs(a.date).format('dddd, DD MMMM YYYY')}
                  </div>
                  {a.notes && <div className="text-[11px] text-slate-500 italic">&quot;{a.notes}&quot;</div>}
                </div>
                <div>
                  {a.status === 'PRESENT' ? (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Hadir
                    </span>
                  ) : a.status === 'EXCUSED' ? (
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Izin / Sakit
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Alpa
                    </span>
                  )}
                </div>
              </div>
            ))}

            {student.attendances.length === 0 && (
              <div className="py-6 text-center text-slate-400 text-[12px]">
                Belum ada riwayat absensi tercatat.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
