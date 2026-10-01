import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function GuruJadwalPage() {
  const schedule = [
    { day: "Senin", classes: [
      { time: "07:15 - 08:45", name: "Matematika Wajib", room: "Ruang 101", className: "X IPA 1" },
      { time: "09:00 - 10:30", name: "Matematika Peminatan", room: "Ruang 203", className: "XI IPA 2" }
    ]},
    { day: "Selasa", classes: [
      { time: "08:45 - 10:15", name: "Matematika Wajib", room: "Ruang 102", className: "X IPA 2" },
      { time: "11:00 - 12:30", name: "Matematika Lanjut", room: "Ruang 301", className: "XII IPA 1" }
    ]},
    { day: "Rabu", classes: [] },
    { day: "Kamis", classes: [
      { time: "07:15 - 08:45", name: "Matematika Wajib", room: "Ruang 101", className: "X IPA 1" }
    ]},
    { day: "Jumat", classes: [
      { time: "09:00 - 10:30", name: "Matematika Lanjut", room: "Ruang 302", className: "XII IPA 2" }
    ]},
  ];

  return (
    <div className="p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <Calendar className="w-8 h-8 text-emerald-600" />
          Jadwal Mengajar
        </h2>
        <p className="text-lg text-slate-500 font-medium mt-2">Jadwal tatap muka Anda untuk minggu ini.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {schedule.map((dayData, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className={`p-4 text-center font-bold ${dayData.classes.length > 0 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {dayData.day}
            </div>
            <div className="p-4 flex-1 flex flex-col gap-4 bg-slate-50/50">
              {dayData.classes.length > 0 ? (
                dayData.classes.map((cls, cIdx) => (
                  <div key={cIdx} className="bg-white border border-emerald-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 group-hover:w-2 transition-all"></div>
                    <p className="text-sm font-black text-slate-800 mb-1">{cls.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> {cls.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-emerald-500" /> {cls.className}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {cls.room}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-10 opacity-70">
                  <Calendar className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium">Tidak ada jadwal</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
