import { prisma } from "@/lib/prisma";
import { Plus, Calendar as CalendarIcon, Flag, BookOpen, MapPin, Search } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function AcademicCalendarPage() {
  const events = await prisma.academicCalendar.findMany({
    orderBy: { startDate: 'asc' }
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'NATIONAL_HOLIDAY': return <Flag className="w-5 h-5 text-red-500" />;
      case 'SCHOOL_HOLIDAY': return <MapPin className="w-5 h-5 text-amber-500" />;
      case 'EXAM': return <BookOpen className="w-5 h-5 text-indigo-500" />;
      default: return <CalendarIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getEventBg = (type: string) => {
    switch (type) {
      case 'NATIONAL_HOLIDAY': return 'bg-red-50 border-red-200';
      case 'SCHOOL_HOLIDAY': return 'bg-amber-50 border-amber-200';
      case 'EXAM': return 'bg-indigo-50 border-indigo-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kalender Akademik</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola hari libur nasional, libur semester, dan jadwal ujian sekolah.</p>
        </div>
        <Link href="/admin/calendar/create" className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-md text-[13px] font-medium"><Plus className="w-3.5 h-3.5" /> Tambah Agenda</Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="flex gap-4">
            <select className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500">
              <option>Semua Tipe Agenda</option>
              <option>Libur Nasional</option>
              <option>Libur Sekolah</option>
              <option>Jadwal Ujian</option>
            </select>
          </div>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari agenda..." className="pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm focus:border-blue-500 outline-none w-full" />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {events.map((evt) => {
            const isSingleDay = dayjs(evt.startDate).isSame(dayjs(evt.endDate), 'day');
            return (
              <div key={evt.id} className="p-5 flex items-start gap-5 hover:bg-slate-50 transition-colors">
                <div className={`w-14 h-14 shrink-0 rounded-lg border flex flex-col items-center justify-center ${getEventBg(evt.type)}`}>
                  <p className="text-xs font-bold text-slate-500 uppercase">{dayjs(evt.startDate).format('MMM')}</p>
                  <p className="text-lg font-black text-slate-900 leading-none">{dayjs(evt.startDate).format('DD')}</p>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getEventIcon(evt.type)}
                    <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                    {evt.isHoliday && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase tracking-wider ml-2">Hari Libur</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{evt.description}</p>
                  
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" /> 
                      {isSingleDay 
                        ? dayjs(evt.startDate).format('dddd, DD MMMM YYYY') 
                        : `${dayjs(evt.startDate).format('DD MMM YYYY')} - ${dayjs(evt.endDate).format('DD MMM YYYY')}`
                      }
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-semibold px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors">Hapus</button>
                </div>
              </div>
            );
          })}

          {events.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center">
              <CalendarIcon className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">Belum ada kalender akademik yang dijadwalkan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
