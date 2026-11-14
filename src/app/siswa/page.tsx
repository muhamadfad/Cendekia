import { BookOpen, Award, CheckCircle, Clock, CalendarIcon as Calendar, Flag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function SiswaDashboard() {
  const student = await prisma.student.findFirst({
    include: {
      user: true,
      class: {
        include: {
          schedules: { include: { subject: true } }
        }
      },
      grades: true
    }
  });

  if (!student) return <div>Data Siswa tidak ditemukan</div>;

  // Hitung jumlah mata pelajaran unik dari jadwal
  const uniqueSubjects = new Set(student.class?.schedules.map(s => s.subjectId) || []);
  const totalMapel = uniqueSubjects.size;

  // Render agenda hari ini dari jadwal kelas
  const todaySchedules = student.class?.schedules.slice(0, 3) || [];

  // Ambil agenda kalender akademik terdekat
  const upcomingEvents = await prisma.academicCalendar.findMany({
    where: { startDate: { gte: new Date('2026-08-01') } }, // Simulasi waktu saat ini
    orderBy: { startDate: 'asc' },
    take: 2
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Ruang Belajar</h1>
        <p className="text-sm text-slate-500 mt-1">Siap belajar hari ini? Ini ringkasan kelas dan tugasmu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Mata Pelajaran</h3>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-slate-900">{totalMapel}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Peringkat Kelas</h3>
            <Award className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-slate-900">-</p>
            <p className="text-xs text-slate-400 mt-1">Belum ada penilaian akhir</p>
          </div>
        </div>

        <div className="bg-indigo-900 border border-indigo-800 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-indigo-300 text-xs font-semibold uppercase tracking-wider">Tugas Selesai</h3>
            <CheckCircle className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-white mb-1">0</p>
            <div className="w-full bg-indigo-950 rounded-full h-1.5 mt-2">
              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Jadwal Hari Ini</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {todaySchedules.map((schedule) => (
              <div key={schedule.id} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors">
                <div className="w-16 shrink-0 border-r border-slate-200">
                  <p className="text-sm font-bold text-slate-900">{schedule.startTime}</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">{schedule.endTime}</p>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800">{schedule.subject.name}</h4>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Ruang Belajar
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {todaySchedules.length === 0 && (
              <div className="p-8 text-center text-sm text-slate-500">
                Tidak ada jadwal pelajaran hari ini. Selamat istirahat!
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Tenggat Waktu Dekat</h2>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded border border-dashed border-slate-200">
                <CheckCircle className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-sm font-medium text-slate-600">Tidak ada tugas yang mendesak.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Agenda Sekolah</h2>
            <div className="space-y-4">
              {upcomingEvents.map(evt => (
                <div key={evt.id} className="flex gap-3">
                  <div className={`w-10 h-10 shrink-0 rounded flex items-center justify-center ${evt.isHoliday ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                    {evt.isHoliday ? <Flag className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{evt.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{dayjs(evt.startDate).format('DD MMM YYYY')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
