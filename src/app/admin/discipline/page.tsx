import { prisma } from "@/lib/prisma";
import { Search, Plus, AlertOctagon, ShieldAlert, FileText, Filter } from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function DisciplinePage() {
  const violations = await prisma.violation.findMany({
    include: {
      student: { include: { user: true, class: true } }
    },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bimbingan Konseling & Pelanggaran</h1>
          <p className="text-sm text-slate-500 mt-1">Catat dan pantau poin kedisiplinan siswa (Tatib).</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Input Pelanggaran Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="col-span-1 md:col-span-2 bg-slate-900 rounded-lg p-5 flex flex-col justify-between border border-slate-800">
          <div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Kasus Bulan Ini</h3>
            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold text-white">42</span>
              <span className="text-sm font-medium text-red-400 bg-red-400/10 px-2 py-0.5 rounded flex items-center gap-1 mb-1">
                +15% dari bulan lalu
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Peringatan Keras (SP)</h3>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-slate-900">8 Siswa</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Sesi Konseling Aktif</h3>
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-auto">
            <p className="text-2xl font-bold text-slate-900">14 Sesi</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 px-3 py-1.5 rounded hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" /> Filter Kelas
            </button>
          </div>
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari nama siswa atau pelanggaran..." className="pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm focus:border-red-500 outline-none w-full" />
          </div>
        </div>

        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Siswa</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Jenis Pelanggaran</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Poin</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Pelapor (Guru)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {violations.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                  {dayjs(v.date).format('DD MMM YYYY')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-900">{v.student.user.name}</div>
                  <div className="text-xs text-slate-500">{v.student.class?.name || '-'}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-800">{v.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center justify-center px-2 py-1 bg-red-50 text-red-700 font-bold text-xs rounded border border-red-200">
                    +{v.points}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {v.reportedBy}
                </td>
              </tr>
            ))}

            {violations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <AlertOctagon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 font-medium">Belum ada catatan pelanggaran yang diinput.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
