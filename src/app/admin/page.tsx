import { 
  Users, GraduationCap, BookOpen, Activity, ArrowUpRight, DollarSign, 
  ShieldAlert, Calendar, Wallet, CheckCircle, Clock, AlertCircle, 
  FileText, FileCheck, ArrowRight, Sparkles, Server, MessageSquare, ExternalLink
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import 'dayjs/locale/id';
import Link from "next/link";

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const totalClasses = await prisma.class.count();
  const totalStudents = await prisma.student.count();
  const totalTeachers = await prisma.teacher.count();

  // Financial Stats
  const allPayments = await prisma.payment.findMany();
  const paidPayments = allPayments.filter(p => p.status === 'PAID');
  const pendingPayments = allPayments.filter(p => p.status === 'PENDING');
  
  const totalPendapatan = paidPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalTunggakan = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const paymentPercentage = allPayments.length > 0 
    ? Math.round((paidPayments.length / allPayments.length) * 100) 
    : 0;

  // Recent Payments Feed
  const recentPayments = await prisma.payment.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      student: {
        include: { user: true, class: true }
      }
    }
  });

  // Discipline Stats (BK)
  const recentViolations = await prisma.violation.findMany({
    take: 4,
    orderBy: { date: 'desc' },
    include: { student: { include: { class: true, user: true } } }
  });

  // Upcoming Calendar
  const upcomingEvents = await prisma.academicCalendar.findMany({
    where: { startDate: { gte: new Date('2026-08-01') } },
    take: 3,
    orderBy: { startDate: 'asc' }
  });

  // Classes & Student Distribution
  const classesList = await prisma.class.findMany({
    include: {
      homeroomTeacher: { include: { user: true } },
      _count: { select: { students: true } }
    },
    orderBy: { name: 'asc' }
  });

  // CBT Exams & Questions
  const totalExams = await prisma.exam.count();
  const totalQuestions = await prisma.question.count();
  const recentExams = await prisma.exam.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      subject: true,
      class: true,
      _count: { select: { questions: true, results: true } }
    }
  });

  // Today's Attendance Overview
  const today = dayjs().startOf('day').toDate();
  const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();
  const todayAttendances = await prisma.attendance.findMany({
    where: { date: { gte: today, lt: tomorrow } }
  });
  const presentToday = todayAttendances.filter(a => a.status === 'PRESENT').length;
  const absentToday = todayAttendances.filter(a => a.status === 'ABSENT').length;
  const excusedToday = todayAttendances.filter(a => a.status === 'EXCUSED' || a.status === 'LATE').length;

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* 1. EXECUTIVE HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-2.5 py-0.5 rounded-full">
                Tahun Ajaran 2026/2027 Ganjil
              </span>
              <span className="text-xs text-slate-300 font-medium">
                • {dayjs().format('dddd, DD MMMM YYYY')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Command Center Eksekutif Sekolah
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Pusat kendali otomatisasi operasional sekolah: akademik Kurikulum Merdeka, ujian CBT mandiri, keuangan SPP massal, dan monitoring kehadiran real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <p className="text-xs font-bold text-white leading-none">Sistem Cendekia Normal</p>
              <p className="text-[10px] text-emerald-300 font-medium mt-0.5">Database & WA Gateway Siap</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO QUICK ACTIONS COMMAND BAR */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Aksi Cepat & Navigasi Modul Utama (1-Klik)
            </h2>
          </div>
          <span className="text-xs text-slate-500">Pintas operasional harian sekolah</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <Link
            href="/admin/attendance"
            className="group bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl p-3.5 flex flex-col items-center text-center transition-all shadow-sm hover:shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 leading-tight">Presensi Siswa</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Harian & WA</span>
          </Link>

          <Link
            href="/admin/finance"
            className="group bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded-xl p-3.5 flex flex-col items-center text-center transition-all shadow-sm hover:shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 leading-tight">Tagihan SPP</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Generate Massal</span>
          </Link>

          <Link
            href="/admin/exams"
            className="group bg-white hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 rounded-xl p-3.5 flex flex-col items-center text-center transition-all shadow-sm hover:shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 leading-tight">Ujian CBT</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Bank Soal</span>
          </Link>

          <Link
            href="/guru/walikelas"
            className="group bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl p-3.5 flex flex-col items-center text-center transition-all shadow-sm hover:shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 leading-tight">E-Rapor Digital</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Kurikulum Merdeka</span>
          </Link>

          <Link
            href="/admin/discipline"
            className="group bg-white hover:bg-red-50/50 border border-slate-200 hover:border-red-300 rounded-xl p-3.5 flex flex-col items-center text-center transition-all shadow-sm hover:shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 leading-tight">Konseling BK</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Poin Disiplin</span>
          </Link>

          <Link
            href="/admin/calendar"
            className="group bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-xl p-3.5 flex flex-col items-center text-center transition-all shadow-sm hover:shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 leading-tight">Kalender Agenda</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Jadwal Sekolah</span>
          </Link>

          <Link
            href="/orangtua"
            className="group bg-white hover:bg-sky-50/50 border border-slate-200 hover:border-sky-300 rounded-xl p-3.5 flex flex-col items-center text-center transition-all shadow-sm hover:shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 leading-tight">Portal Ortu</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Live Monitor</span>
          </Link>

          <Link
            href="/siswa"
            className="group bg-white hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 rounded-xl p-3.5 flex flex-col items-center text-center transition-all shadow-sm hover:shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 leading-tight">Portal Siswa</span>
            <span className="text-[10px] text-slate-500 mt-0.5">LMS & Tugas</span>
          </Link>
        </div>
      </div>

      {/* 3. PRIMARY METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pemasukan SPP</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">
              Rp {(totalPendapatan / 1000000).toFixed(1)} <span className="text-sm font-semibold text-slate-500">Juta</span>
            </p>
            <div className="mt-2 flex items-center justify-between text-xs font-medium">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {paymentPercentage}% Terkumpul
              </span>
              <span className="text-slate-500">{paidPayments.length} Tagihan Lunas</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tunggakan & Piutang</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">
              Rp {(totalTunggakan / 1000000).toFixed(1)} <span className="text-sm font-semibold text-slate-500">Juta</span>
            </p>
            <div className="mt-2 flex items-center justify-between text-xs font-medium">
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {pendingPayments.length} Tagihan Tertunda
              </span>
              <Link href="/admin/finance" className="text-indigo-600 hover:text-indigo-800 font-bold">
                Tagih &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Kehadiran Siswa Hari Ini</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">
              {totalStudents > 0 ? (((totalStudents - absentToday) / totalStudents) * 100).toFixed(1) : 100}%
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>{totalStudents - absentToday} Hadir</span>
              <span>{absentToday} Alpa</span>
              <span>{excusedToday} Izin/Sakit</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Siswa & Guru Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">
              {totalStudents} <span className="text-sm font-semibold text-slate-500">Siswa</span>
            </p>
            <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>{totalClasses} Rombel Kelas</span>
              <span className="text-indigo-600 font-bold">{totalTeachers} Guru Pengajar</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT GRID (2 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI (2/3): Transaksi SPP & Rombel Siswa */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Table: Transaksi Pembayaran SPP Terbaru */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-emerald-600" /> Arus Pembayaran SPP Terkini
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Catatan transaksi pembayaran siswa terbaru yang masuk ke sistem.</p>
              </div>
              <Link 
                href="/admin/finance" 
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                Lihat Semua &rarr;
              </Link>
            </div>

            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-3">Nama Siswa</th>
                    <th className="px-6 py-3">Kelas</th>
                    <th className="px-6 py-3">Bulan</th>
                    <th className="px-6 py-3">Nominal</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentPayments.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-slate-900">
                        {p.student.user.name}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-600 font-medium">
                        {p.student.class?.name || "-"}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-600">
                        {p.month} {p.year}
                      </td>
                      <td className="px-6 py-3.5 text-xs font-bold text-slate-800">
                        Rp {p.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          p.status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {p.status === 'PAID' ? 'LUNAS' : 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentPayments.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                        Belum ada riwayat transaksi pembayaran.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grid: Rombongan Belajar (Rombel) & Kehadiran Kelas */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" /> Status Rombongan Belajar (Rombel)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Kapasitas siswa dan wali kelas pembina per rombel.</p>
              </div>
              <Link href="/admin/classes" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                Kelola Kelas &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {classesList.map(c => (
                <div key={c.id} className="border border-slate-200 rounded-xl p-4 hover:border-indigo-300 transition-all bg-slate-50/40">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                    <span className="text-[11px] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded text-indigo-600">
                      {c._count.students} Siswa
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    Wali: <span className="font-medium text-slate-700">{c.homeroomTeacher?.user.name || "Belum Ditentukan"}</span>
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Aktif
                    </span>
                    <Link href={`/admin/attendance`} className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                      Presensi &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CBT & E-Learning Stats */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-purple-600" /> Ujian CBT & Bank Soal Mandiri
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Mesin ujian berbasis komputer dan evaluasi belajar siswa.</p>
              </div>
              <Link href="/admin/exams" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                Kelola Bank Soal &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-purple-50/50 border border-purple-100 rounded-lg p-4">
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Total Ujian CBT</span>
                <p className="text-xl font-black text-purple-900 mt-1">{totalExams} Sesi Ujian</p>
                <p className="text-xs text-purple-600 mt-0.5">Penilaian otomatis instan</p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Bank Soal Terdaftar</span>
                <p className="text-xl font-black text-blue-900 mt-1">{totalQuestions} Butir Soal</p>
                <p className="text-xs text-blue-600 mt-0.5">Acak soal & opsi jawaban</p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Metode Ujian</span>
                <p className="text-xl font-black text-emerald-900 mt-1">100% Paperless</p>
                <p className="text-xs text-emerald-600 mt-0.5">Hemat biaya fotokopi kertas</p>
              </div>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (1/3): Insiden BK, Kalender & Infrastruktur */}
        <div className="space-y-6">
          
          {/* Card: Disiplin & BK */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500" /> Catatan Disiplin & BK Terbaru
              </h2>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                {recentViolations.length} Kasus Aktif
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {recentViolations.map(v => (
                <div key={v.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-50 text-red-700 border border-red-200 rounded-full flex flex-col items-center justify-center font-bold text-xs shrink-0">
                      {dayjs(v.date).format('DD')}
                      <span className="text-[8px] font-medium leading-none">{dayjs(v.date).format('MMM')}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{v.student.user.name}</p>
                      <p className="text-[11px] text-slate-500">{v.student.class?.name} • Pelapor: {v.reportedBy}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {v.title}
                    </span>
                    <span className="text-[10px] font-bold text-red-600 mt-0.5">+{v.points} Poin</span>
                  </div>
                </div>
              ))}
              {recentViolations.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500">Belum ada catatan pelanggaran siswa.</div>
              )}
            </div>
            <div className="px-5 py-2.5 border-t border-slate-100 bg-slate-50 text-center">
              <Link href="/admin/discipline" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                Buka Buku Saku BK Lengkap &rarr;
              </Link>
            </div>
          </div>

          {/* Card: Agenda Terdekat */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" /> Agenda Kalender Sekolah
              </h2>
              <Link href="/admin/calendar" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
                Lihat &rarr;
              </Link>
            </div>
            <div className="p-5 space-y-3.5">
              {upcomingEvents.map(evt => (
                <div key={evt.id} className="flex gap-3">
                  <div className={`w-1.5 h-auto shrink-0 rounded-full ${evt.isHoliday ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{evt.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{dayjs(evt.startDate).format('DD MMMM YYYY')}</p>
                  </div>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-4">Tidak ada agenda dalam waktu dekat.</p>
              )}
            </div>
          </div>

          {/* Card: Status Infrastruktur Sistem */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Status Infrastruktur Sekolah
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Database Engine</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> MySQL 8.4 Active
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Arsitektur ERP</span>
                <span className="text-white font-medium">Next.js 15 Full-Stack</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span className="text-slate-400">Notifikasi WhatsApp</span>
                <span className="text-emerald-400 font-semibold">1-Klik Siap Pakai</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">Backup Otomatis</span>
                <span className="text-indigo-300 font-medium">Tersinkronisasi Cloud</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
