import { prisma } from "@/lib/prisma";
import { Users, CheckCircle, XCircle, Search, Save, History, Clock } from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function GuruAbsensiPage() {
  const teacher = await prisma.teacher.findFirst({
    include: {
      user: true,
      schedules: {
        include: {
          subject: true,
          class: {
            include: {
              students: { include: { user: true } }
            }
          }
        }
      }
    }
  });

  if (!teacher || teacher.schedules.length === 0) {
    return (
      <div className="p-8">
        <div className="bg-white border border-slate-200 p-12 text-center rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Belum ada Jadwal</h2>
          <p className="text-slate-500">Anda belum ditugaskan mengajar di kelas manapun, sehingga tidak dapat mengisi absensi.</p>
        </div>
      </div>
    );
  }

  // Get the first scheduled class as default to display
  const activeSchedule = teacher.schedules[0];
  const students = activeSchedule.class.students;
  
  // Today's attendance records for this class
  const today = dayjs().startOf('day').toDate();
  const attendances = await prisma.attendance.findMany({
    where: {
      date: {
        gte: today,
        lt: dayjs().add(1, 'day').startOf('day').toDate()
      },
      student: { classId: activeSchedule.classId }
    }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Input Kehadiran (Absensi)</h1>
          <p className="text-sm text-slate-500 mt-1">
            Mata Pelajaran: <span className="font-bold text-slate-700">{activeSchedule.subject.name}</span> — Kelas: <span className="font-bold text-slate-700">{activeSchedule.class.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-md shadow-sm">
            <Clock className="w-4 h-4 text-slate-400" />
            {dayjs().format('dddd, DD MMMM YYYY')}
          </span>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
            <Save className="w-4 h-4" /> Simpan Kehadiran
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="flex gap-4">
            <select className="px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-indigo-500">
              {teacher.schedules.map(sch => (
                <option key={sch.id} value={sch.id}>
                  {sch.class.name} - {sch.subject.name} ({sch.startTime})
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari nama siswa..." className="pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm focus:border-indigo-500 outline-none w-full" />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">NISN</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Kehadiran</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {students.map((student, idx) => {
                // Check if recorded
                const recorded = attendances.find(a => a.studentId === student.id);
                
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900">{student.user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-600">{student.nisn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center items-center gap-2">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name={`status-${student.id}`} defaultChecked={recorded?.status === 'PRESENT' || !recorded} className="w-4 h-4 text-emerald-600 accent-emerald-600" />
                          <span className="text-xs font-bold text-slate-700">Hadir</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer ml-3">
                          <input type="radio" name={`status-${student.id}`} defaultChecked={recorded?.status === 'EXCUSED'} className="w-4 h-4 text-blue-600 accent-blue-600" />
                          <span className="text-xs font-bold text-slate-700">Izin/Sakit</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer ml-3">
                          <input type="radio" name={`status-${student.id}`} defaultChecked={recorded?.status === 'ABSENT'} className="w-4 h-4 text-red-600 accent-red-600" />
                          <span className="text-xs font-bold text-slate-700">Alpa</span>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="text" 
                        defaultValue={recorded?.notes || ''}
                        placeholder="Opsional..." 
                        className="w-full px-3 py-1.5 border border-slate-300 rounded text-sm focus:border-indigo-500 outline-none bg-slate-50 focus:bg-white" 
                      />
                    </td>
                  </tr>
                );
              })}
              
              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                    Belum ada siswa yang terdaftar di kelas ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
