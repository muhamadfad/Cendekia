import { Users, GraduationCap, BookOpen, Activity, ArrowUpRight, DollarSign, ShieldAlert, Calendar, Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const totalClasses = await prisma.class.count();
  const totalStudents = await prisma.student.count();
  const totalTeachers = await prisma.teacher.count();

  // Financial Stats (Simulasi SPP bulan ini)
  const allPayments = await prisma.payment.findMany();
  const paidPayments = allPayments.filter(p => p.status === 'PAID');
  const pendingPayments = allPayments.filter(p => p.status === 'PENDING');
  
  const totalPendapatan = paidPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalTunggakan = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);

  // Discipline Stats
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

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Command Center</h1>
          <p className="text-slate-500 text-sm mt-1">Pantauan real-time operasional sekolah, keuangan, dan kesiswaan.</p>
        </div>
        <div className="text-sm font-semibold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-md shadow-sm">
          {dayjs().format('dddd, DD MMMM YYYY')}
        </div>
      </div>

      {/* METRICS ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pemasukan SPP</h3>
            <Wallet className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-slate-900">Rp {(totalPendapatan / 1000000).toFixed(1)}Jt</p>
            <p className="text-emerald-600 text-xs font-bold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" /> 84% Lunas
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tunggakan SPP</h3>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-slate-900">Rp {(totalTunggakan / 1000000).toFixed(1)}Jt</p>
            <p className="text-amber-600 text-xs font-bold mt-1">
              {pendingPayments.length} Tagihan Pending
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Siswa Aktif</h3>
            <GraduationCap className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-slate-900">{totalStudents}</p>
            <p className="text-slate-500 text-xs font-medium mt-1">
              Terbagi dalam {totalClasses} Kelas
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tenaga Pendidik</h3>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-white mb-1">{totalTeachers} Guru</p>
            <p className="text-emerald-400 text-xs font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Sistem Normal
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: Pelanggaran & Tatib */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500" /> Insiden & Pelanggaran Terbaru (BK)
              </h2>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200">
                {recentViolations.length} Kasus Aktif
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {recentViolations.map(v => (
                <div key={v.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex flex-col items-center justify-center font-bold text-xs">
                      {dayjs(v.date).format('DD')}
                      <span className="text-[9px] font-medium leading-none">{dayjs(v.date).format('MMM')}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{v.student.user.name}</p>
                      <p className="text-xs text-slate-500">{v.student.class?.name} ? Pelapor: {v.reportedBy}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded">
                      {v.title}
                    </span>
                    <span className="text-[10px] font-bold text-red-600 mt-1">+{v.points} Poin</span>
                  </div>
                </div>
              ))}
              {recentViolations.length === 0 && (
                <div className="p-8 text-center text-sm text-slate-500 font-medium">Belum ada catatan pelanggaran.</div>
              )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Agenda & Keuangan */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" /> Agenda Terdekat
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {upcomingEvents.map(evt => (
                <div key={evt.id} className="flex gap-3">
                  <div className={`w-1.5 h-auto shrink-0 rounded-full ${evt.isHoliday ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{evt.title}</h4>
                    <p className="text-xs text-slate-500">{dayjs(evt.startDate).format('DD MMMM YYYY')}</p>
                  </div>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-xs text-slate-500 text-center">Tidak ada agenda dalam waktu dekat.</p>
              )}
            </div>
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 w-full text-center">Lihat Kalender Penuh &rarr;</button>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-lg p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
            <h3 className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">Tagihan Bulan Ini</h3>
            <p className="text-3xl font-bold mb-4">{(paidPayments.length / (paidPayments.length + pendingPayments.length) * 100).toFixed(0)}% <span className="text-sm font-medium text-indigo-200">Terkumpul</span></p>
            <div className="w-full bg-indigo-900 rounded-full h-1.5 mb-2">
              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(paidPayments.length / (paidPayments.length + pendingPayments.length) * 100)}%` }}></div>
            </div>
            <p className="text-xs text-indigo-100">{paidPayments.length} dari {paidPayments.length + pendingPayments.length} Siswa telah melunasi SPP.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
