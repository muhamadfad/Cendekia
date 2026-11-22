import { prisma } from "@/lib/prisma";
import { Users, CheckCircle, XCircle, Search, Save, Clock, Calendar, MessageSquare, Smartphone, ShieldCheck } from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/id';
import { saveBulkAttendance } from "./actions";

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function GuruAbsensiPage({ searchParams }: { searchParams: Promise<{ scheduleId?: string }> }) {
  const resolvedParams = await searchParams;
  const scheduleId = resolvedParams.scheduleId;

  const teacher = await prisma.teacher.findFirst({
    include: {
      user: true,
      schedules: {
        include: {
          subject: true,
          class: {
            include: {
              students: { include: { user: true, parent: { include: { user: true } } }, orderBy: { user: { name: 'asc' } } }
            }
          }
        }
      }
    }
  });

  if (!teacher || teacher.schedules.length === 0) {
    return (
      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="bg-white border border-slate-200 p-12 text-center rounded-lg shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Belum Ada Jadwal Mengajar</h2>
          <p className="text-[13px] text-slate-500">Anda belum ditugaskan mengajar di kelas manapun.</p>
        </div>
      </div>
    );
  }

  const activeSchedule = (scheduleId && teacher.schedules.find(s => s.id === scheduleId)) || teacher.schedules[0];
  const students = activeSchedule.class.students;

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
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Presensi Siswa Harian</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Mata Pelajaran: <span className="font-semibold text-slate-800">{activeSchedule.subject.name}</span> &bull; Kelas: <span className="font-semibold text-slate-800">{activeSchedule.class.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 text-[12px] font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {dayjs().format('dddd, DD MMMM YYYY')}
          </span>
        </div>
      </div>

      {/* Zero Cost Notification Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-lg p-3 text-[12px] text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Smart Realtime Notification (Bebas Biaya API / 0% Beban Server):</strong> Status kehadiran otomatis tersinkronisasi detik ini juga ke portal HP orang tua. Anda juga dapat mengirim pemberitahuan resmi via WhatsApp 1-klik tanpa biaya kuota per pesan.
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-white border border-emerald-300 px-2.5 py-1 rounded-md shrink-0 shadow-xs">
          <Smartphone className="w-3 h-3 text-emerald-600" /> Sinkronisasi HP Aktif
        </span>
      </div>

      {/* Main Container */}
      <form action={saveBulkAttendance} className="bg-white border border-slate-200 rounded-lg shadow-sm">
        {/* Filter bar */}
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-slate-500">Pilih Jadwal:</span>
            <select 
              defaultValue={activeSchedule.id}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-800 outline-none focus:border-slate-400"
            >
              {teacher.schedules.map(sch => (
                <option key={sch.id} value={sch.id}>
                  {sch.class.name} - {sch.subject.name} ({sch.startTime} - {sch.endTime})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="submit" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" /> Simpan Kehadiran
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[5%]">No</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[26%]">Nama Siswa</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[14%]">NISN</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-center w-[23%]">Status Presensi</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[18%]">Catatan Guru</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-center w-[14%]">Notif WA Ortu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student, idx) => {
                const recorded = attendances.find(a => a.studentId === student.id);
                const currentStatus = recorded ? recorded.status : 'PRESENT';
                const parentPhone = student.parentPhone || student.parent?.phone || '081234567890';
                const cleanPhone = parentPhone.replace(/^0/, '62').replace(/\D/g, '');
                const waMessage = encodeURIComponent(
                  `Yth. Bapak/Ibu Wali Murid dari ${student.user.name},\n\nKami menginformasikan status presensi harian siswa (${dayjs().format('dddd, DD MMMM YYYY')}):\n• Mata Pelajaran: ${activeSchedule.subject.name}\n• Rombel: ${activeSchedule.class.name}\n• Status Kehadiran: ${currentStatus === 'PRESENT' ? 'HADIR' : currentStatus === 'EXCUSED' ? 'IZIN / SAKIT' : 'BELUM MASUK KELAS (ALPA)'}\n${recorded?.notes ? `• Keterangan: ${recorded.notes}\n` : ''}\nSalam hormat,\n${teacher.user.name} (Guru Pengajar Cendekia)`
                );

                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5 text-[13px] text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-2.5">
                      <input type="hidden" name="studentIds" value={student.id} />
                      <div className="text-[13px] font-semibold text-slate-900">{student.user.name}</div>
                      <div className="text-[11px] text-slate-500">{student.user.email}</div>
                    </td>
                    <td className="px-4 py-2.5 text-[13px] text-slate-700 font-mono">
                      {student.nisn}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex justify-center items-center gap-3">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-[12px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-1 rounded">
                          <input type="radio" name={`status-${student.id}`} value="PRESENT" defaultChecked={currentStatus === 'PRESENT'} className="accent-emerald-600" />
                          Hadir
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-[12px] font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-1 rounded">
                          <input type="radio" name={`status-${student.id}`} value="EXCUSED" defaultChecked={currentStatus === 'EXCUSED'} className="accent-blue-600" />
                          Izin/Sakit
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-[12px] font-medium text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-1 rounded">
                          <input type="radio" name={`status-${student.id}`} value="ABSENT" defaultChecked={currentStatus === 'ABSENT'} className="accent-rose-600" />
                          Alpa
                        </label>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <input 
                        type="text" 
                        name={`notes-${student.id}`}
                        defaultValue={recorded?.notes || ''}
                        placeholder="Keterangan sakit/izin..." 
                        className="w-full px-2.5 py-1 text-[12px] border border-slate-200 rounded outline-none focus:border-slate-400 bg-white"
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${waMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                          currentStatus === 'ABSENT'
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300'
                            : currentStatus === 'EXCUSED'
                            ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                        }`}
                        title="Kirim notifikasi langsung ke WhatsApp orang tua (Gratis & Tanpa Beban Server)"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Kirim WA</span>
                      </a>
                    </td>
                  </tr>
                );
              })}

              {students.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[13px] text-slate-500">
                    Belum ada siswa terdaftar di rombel ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}
