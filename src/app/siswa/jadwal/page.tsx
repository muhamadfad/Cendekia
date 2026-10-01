import { prisma } from "@/lib/prisma";
import { Calendar, Clock, MapPin, User, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SiswaJadwalPage() {
  // Ambil siswa pertama (sebagai simulasi user yang sedang login)
  const student = await prisma.student.findFirst({
    include: {
      class: {
        include: {
          schedules: {
            include: {
              subject: true,
              teacher: { include: { user: true } }
            }
          }
        }
      }
    }
  });

  if (!student || !student.class) {
    return (
      <div className="p-8">
        <div className="bg-white border border-slate-200 p-12 text-center rounded-lg shadow-sm">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Jadwal</h2>
          <p className="text-slate-500">Anda belum ditempatkan dalam kelas. Silakan hubungi admin.</p>
        </div>
      </div>
    );
  }

  // Kelompokkan jadwal berdasarkan hari
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const rawSchedules = student.class.schedules;
  
  // Create grouped schedule
  const groupedSchedule = days.map(dayName => {
    return {
      day: dayName,
      classes: rawSchedules
        .filter(s => s.dayOfWeek === dayName.toLowerCase())
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
    };
  });

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jadwal Pelajaran</h1>
          <p className="text-sm text-slate-500 mt-1">Kelas <span className="font-bold text-indigo-600">{student.class.name}</span> - Tahun Ajaran 2026/2027</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {groupedSchedule.map((scheduleDay, idx) => (
          <div key={idx} className="flex flex-col">
            <div className="bg-indigo-600 text-white p-3 rounded-t-lg font-bold text-center text-sm tracking-wider uppercase">
              {scheduleDay.day}
            </div>
            
            <div className="bg-slate-50 border-x border-b border-slate-200 rounded-b-lg flex-1 p-3 space-y-3">
              {scheduleDay.classes.map((cls, cIdx) => (
                <div key={cIdx} className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm hover:border-indigo-300 transition-colors group">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mb-2 bg-indigo-50 w-fit px-2 py-0.5 rounded border border-indigo-100">
                    <Clock className="w-3.5 h-3.5" />
                    {cls.startTime} - {cls.endTime}
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-sm mb-3 group-hover:text-indigo-600 transition-colors">
                    {cls.subject.name}
                  </h3>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{cls.teacher.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Ruang {cls.roomId || student.class.name}
                    </div>
                  </div>
                </div>
              ))}
              
              {scheduleDay.classes.length === 0 && (
                <div className="text-center p-6 text-slate-400 text-xs font-semibold">
                  Tidak ada jadwal
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
