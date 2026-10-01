import { prisma } from "@/lib/prisma";
import { Plus, Search, Calendar, Users, Edit2, Trash2 } from "lucide-react";
import { ContextFilter } from "@/components/ContextFilter";
import Link from "next/link";
import { deleteSchedule } from "./actions";

export const dynamic = 'force-dynamic';

export default async function AdminSchedulesPage({ searchParams }: { searchParams: Promise<{ ta?: string, sem?: string }> }) {
  const resolvedParams = await searchParams;
  const activeTA = resolvedParams.ta || "2026/2027";
  const activeSem = resolvedParams.sem || "1";

  // Fetch all schedules from DB
  const schedules = await prisma.schedule.findMany({
    include: {
      teacher: { include: { user: true } },
      class: true,
      subject: true
    },
    orderBy: [
      { class: { name: 'asc' } },
      { dayOfWeek: 'asc' },
      { startTime: 'asc' }
    ]
  });

  // Group schedules by class for better viewing
  const groupedSchedules = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.class.name]) {
      acc[schedule.class.name] = [];
    }
    acc[schedule.class.name].push(schedule);
    return acc;
  }, {} as Record<string, typeof schedules>);

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Jadwal Pelajaran</h1>
          <p className="text-[13px] text-slate-500 mt-1">Kelola *plotting* jadwal mengajar Guru, Mata Pelajaran, dan Kelas.</p>
        </div>
        <ContextFilter defaultTA={activeTA} defaultSem={activeSem} />
      </div>

      <div className="flex justify-between items-center mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border border-slate-200">
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari kelas, guru, atau mapel..." 
            className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[13px] focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none w-full transition-all"
          />
        </div>
        <Link 
          href="/admin/schedules/create" 
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Plotting Jadwal Baru
        </Link>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSchedules).map(([className, classSchedules]) => (
          <div key={className} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-500" /> Kelas {className}
              </h3>
              <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                {classSchedules.length} Sesi Aktif
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/30">
                    <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">Hari & Jam</th>
                    <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[30%]">Mata Pelajaran</th>
                    <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[30%]">Guru Pengampu</th>
                    <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[20%]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classSchedules.map((schedule) => {
                    // Normalize day string
                    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                    // The DB schema says dayOfWeek is Int, 1 = Monday. Let's adjust index safely:
                    const dayName = days[schedule.dayOfWeek % 7] || schedule.dayOfWeek.toString();
                    
                    return (
                      <tr key={schedule.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-2.5">
                          <div className="text-[13px] font-semibold text-slate-900">{dayName}</div>
                          <div className="text-[12px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" /> {schedule.startTime} - {schedule.endTime}
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="text-[13px] font-medium text-slate-700">
                            {schedule.subject.name}
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="text-[13px] font-medium text-slate-900">{schedule.teacher.user.name}</div>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <div className="flex justify-end gap-1">
                            <Link 
                              href={`/admin/schedules/${schedule.id}/edit`}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors inline-block"
                              title="Edit Jadwal"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <form action={deleteSchedule.bind(null, schedule.id)}>
                              <button 
                                type="submit" 
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Hapus Jadwal"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {Object.keys(groupedSchedules).length === 0 && (
          <div className="text-center p-12 bg-white border border-slate-200 rounded-lg text-slate-500 shadow-sm">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-[13px]">Belum ada plotting jadwal pelajaran.</p>
          </div>
        )}
      </div>
    </div>
  );
}
