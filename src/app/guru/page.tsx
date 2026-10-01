import { Users, BookOpen, Clock, CheckCircle, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function GuruDashboard() {
  const teacher = await prisma.teacher.findFirst({
    include: {
      schedules: {
        include: {
          class: {
            include: {
              students: true
            }
          },
          subject: true
        }
      }
    }
  });

  if (!teacher) return <div>Data Guru tidak ditemukan</div>;

  // Hitung jumlah kelas yang unik (karena 1 kelas bisa muncul 2x di jadwal beda hari)
  const uniqueClasses = new Set(teacher.schedules.map(s => s.classId));
  const totalClasses = uniqueClasses.size;

  // Hitung total siswa dari kelas-kelas unik tersebut
  let totalStudents = 0;
  const seenClasses = new Set();
  teacher.schedules.forEach(s => {
    if (!seenClasses.has(s.classId)) {
      totalStudents += s.class.students.length;
      seenClasses.add(s.classId);
    }
  });

  // Hitung Jam Mengajar (misal setiap jadwal = 2 jam)
  const jamMengajar = teacher.schedules.length * 2;

  // Render agenda hari ini (hanya maksimal 3 jadwal pertama dari database)
  const todaySchedules = teacher.schedules.slice(0, 3);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Utama</h1>
        <p className="text-sm text-slate-500 mt-1">Ringkasan aktivitas akademik dan jadwal mengajar Anda hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Stat Cards - Crisp & Enterprise */}
        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 rounded text-emerald-600 border border-emerald-100">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kelas Diajar</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-slate-900 leading-none">{totalClasses}</p>
            <span className="text-xs font-bold text-slate-400">Rombel</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded text-blue-600 border border-blue-100">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Siswa</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-slate-900 leading-none">{totalStudents}</p>
            <span className="text-xs font-bold text-slate-400">Siswa Aktif</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 rounded text-amber-600 border border-amber-100">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jam Mengajar</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-slate-900 leading-none">{jamMengajar}</p>
            <span className="text-xs font-bold text-slate-400">Jam / Minggu</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-50 rounded text-indigo-600 border border-indigo-100">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tugas Terkoreksi</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-slate-900 leading-none">0</p>
            <span className="text-xs font-bold text-slate-400">/ 0 Tugas</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jadwal Hari Ini */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h2 className="text-sm font-bold text-slate-800">Agenda Hari Ini</h2>
            <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              Lihat Semua <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {todaySchedules.map((schedule) => (
              <div key={schedule.id} className="p-5 flex items-start gap-5 hover:bg-slate-50 transition-colors">
                <div className="w-16 shrink-0 border-r border-slate-200">
                  <p className="text-sm font-bold text-slate-900">{schedule.startTime}</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{schedule.endTime}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{schedule.subject.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">Kelas {schedule.class.name}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">Ruang {schedule.roomId || 'Umum'}</span>
                  </div>
                </div>
              </div>
            ))}
            {todaySchedules.length === 0 && (
              <div className="p-8 text-center text-sm text-slate-500">
                Tidak ada jadwal mengajar yang ditemukan hari ini.
              </div>
            )}
          </div>
        </div>

        {/* Aktivitas Tertunda */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <h2 className="text-sm font-bold text-slate-800">Tugas Belum Dikoreksi</h2>
          </div>
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Semua Beres!</h3>
            <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
              Tidak ada tugas tertunda yang membutuhkan koreksi hari ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
