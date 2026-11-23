import { prisma } from "@/lib/prisma";
import { UserCheck, Users, Calendar, ArrowRight, MessageSquare, AlertCircle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function AdminAttendancePage() {
  const today = dayjs().startOf('day').toDate();
  const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();

  // Fetch classes with student counts & homeroom teacher
  const classes = await prisma.class.findMany({
    include: {
      homeroomTeacher: { include: { user: true } },
      students: {
        include: {
          user: true,
          parent: { include: { user: true } },
          attendances: {
            where: {
              date: { gte: today, lt: tomorrow }
            }
          }
        }
      }
    },
    orderBy: { name: 'asc' }
  });

  const totalStudents = await prisma.student.count();
  
  // Total attendances today
  const todayAttendances = await prisma.attendance.findMany({
    where: { date: { gte: today, lt: tomorrow } },
    include: { student: { include: { user: true, class: true, parent: { include: { user: true } } } } }
  });

  const presentCount = todayAttendances.filter(a => a.status === 'PRESENT').length;
  const sickCount = todayAttendances.filter(a => a.status === 'EXCUSED' || a.status === 'LATE').length;
  const absentCount = todayAttendances.filter(a => a.status === 'ABSENT').length;

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Monitoring Kehadiran Siswa
            </span>
            <span className="text-xs font-semibold text-slate-500">• {dayjs().format('dddd, DD MMMM YYYY')}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Presensi & Kehadiran Digital</h1>
          <p className="text-sm text-slate-500 mt-0.5">Pantauan status presensi harian seluruh rombel kelas dan sinkronisasi notifikasi wali murid.</p>
        </div>

        <Link
          href="/guru/absensi"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all shadow-indigo-600/20"
        >
          <UserCheck className="w-4 h-4" />
          Buka Lembar Presensi Guru & WA
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Siswa Terdaftar</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalStudents} <span className="text-xs font-normal text-slate-500">Siswa</span></p>
          <p className="text-xs text-slate-500 mt-1">Terbagi dalam {classes.length} rombel kelas</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Hadir Hari Ini</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            {totalStudents > 0 ? ((totalStudents - absentCount - sickCount) / totalStudents * 100).toFixed(1) : 100}%
          </p>
          <p className="text-xs text-slate-500 mt-1">{totalStudents - absentCount - sickCount} siswa tercatat hadir</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Izin & Sakit</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600">{sickCount} <span className="text-xs font-normal text-slate-500">Siswa</span></p>
          <p className="text-xs text-slate-500 mt-1">Disertai surat dokter / izin wali</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Alpa (Tanpa Keterangan)</span>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">{absentCount} <span className="text-xs font-normal text-slate-500">Siswa</span></p>
          <p className="text-xs text-slate-500 mt-1">Perlu konfirmasi ke wali murid</p>
        </div>
      </div>

      {/* Grid Kelas */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Status Presensi Rombongan Belajar (Rombel)</h2>
            <p className="text-xs text-slate-500 mt-0.5">Pilih rombel untuk melihat atau menginput absensi harian kelas.</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
            {classes.length} Rombel Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map(c => {
            const studentCount = c.students.length;
            return (
              <div key={c.id} className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all bg-slate-50/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                    <p className="text-xs text-slate-500">Wali Kelas: {c.homeroomTeacher?.user.name || "Belum Ditentukan"}</p>
                  </div>
                  <span className="text-xs font-bold bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                    {studentCount} Siswa
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Siap Absensi
                  </span>
                  <Link
                    href={`/guru/absensi`}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Input Presensi &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert Ketidakhadiran */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Daftar Siswa Tidak Hadir / Butuh Perhatian Hari Ini
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {todayAttendances.filter(a => a.status !== 'PRESENT').length} Siswa Terdata
          </span>
        </div>

        <div className="p-6">
          {todayAttendances.filter(a => a.status !== 'PRESENT').length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-bold text-slate-800">Semua Siswa Tercatat Hadir / Belum Ada Laporan Alpa</p>
              <p className="text-xs text-slate-500 mt-1">Kehadiran sekolah dalam kondisi tertib dan optimal hari ini.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                    <th className="pb-3">Siswa</th>
                    <th className="pb-3">Kelas</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Keterangan</th>
                    <th className="pb-3">Wali Murid</th>
                    <th className="pb-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todayAttendances.filter(a => a.status !== 'PRESENT').map(att => (
                    <tr key={att.id} className="hover:bg-slate-50">
                      <td className="py-3 font-semibold text-slate-900">{att.student.user.name}</td>
                      <td className="py-3 text-slate-600">{att.student.class?.name}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          att.status === 'ABSENT' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {att.status === 'ABSENT' ? 'ALPA' : 'IZIN/SAKIT'}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-slate-500">{att.notes || "Tanpa keterangan"}</td>
                      <td className="py-3 text-xs text-slate-600">
                        {att.student.parent?.user.name || att.student.parentName || "-"} ({att.student.parent?.phone || att.student.parentPhone || "-"})
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={`https://wa.me/${(att.student.parent?.phone || att.student.parentPhone || "").replace(/[^0-9]/g, '')}?text=Halo%20Bapak%2FIbu%2C%20mengonfirmasi%20kehadiran%20putra%2Fputri%20Anda%20${encodeURIComponent(att.student.user.name)}%20di%20sekolah%20hari%20ini.`}
                          target="_blank"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded text-xs font-semibold"
                        >
                          <MessageSquare className="w-3 h-3" /> Chat WA
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
