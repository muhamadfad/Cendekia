import { prisma } from "@/lib/prisma";
import { Search, Download, Plus, MoreHorizontal, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function FinancePage() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      class: true,
      payments: {
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
        take: 1
      }
    },
    orderBy: { user: { name: 'asc' } }
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Pembayaran SPP</h1>
          <p className="text-[13px] text-slate-500 mt-1">Kelola pencatatan SPP bulanan siswa dan riwayat transaksi.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Buat Tagihan
          </button>
        </div>
      </div>

      {/* Vercel-like dense summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <p className="text-[12px] font-medium text-slate-500 mb-1">Total Kas Bulan Ini</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Rp 45.5M</h3>
            <span className="text-[11px] font-medium text-emerald-600 mb-1.5">+12.5%</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <p className="text-[12px] font-medium text-slate-500 mb-1">Menunggu Konfirmasi</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">12</h3>
            <span className="text-[11px] font-medium text-slate-500 mb-1.5">Transaksi</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <p className="text-[12px] font-medium text-slate-500 mb-1">Tunggakan SPP Aktif</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">38</h3>
            <span className="text-[11px] font-medium text-red-600 mb-1.5">Siswa</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari siswa atau NISN..." 
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[13px] focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none w-full transition-all" 
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] text-slate-700 outline-none hover:bg-slate-50">
              <option>Semua Kelas</option>
              <option>Kelas X</option>
              <option>Kelas XI</option>
              <option>Kelas XII</option>
            </select>
            <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] text-slate-700 outline-none hover:bg-slate-50">
              <option>Semua Status</option>
              <option>Lunas</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[30%]">Siswa</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%]">Kelas</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[25%]">Status Tagihan (Terakhir)</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%]">Nominal</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[15%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const lastPayment = student.payments[0];
                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] font-medium text-slate-900">{student.user.name}</div>
                      <div className="text-[12px] text-slate-500">{student.nisn}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] text-slate-600">{student.class?.name || '-'}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      {lastPayment ? (
                        <div className="flex items-center gap-1.5">
                          {lastPayment.status === 'PAID' ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-[13px] text-slate-700">Lunas ({lastPayment.month} {lastPayment.year})</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                              <span className="text-[13px] text-slate-700">Pending ({lastPayment.month} {lastPayment.year})</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                          <span className="text-[13px] text-slate-700">Belum ada data</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] font-medium text-slate-700">
                        {lastPayment ? `Rp ${lastPayment.amount.toLocaleString('id-ID')}` : '-'}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <Link 
                        href={`/admin/finance/${student.id}`}
                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors bg-slate-50 border border-slate-100 inline-block"
                        title="Lihat Detail SPP"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[13px] text-slate-500">
                    Tidak ada data siswa ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center text-[12px] text-slate-500">
          <span>Menampilkan {students.length} data</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded hover:bg-slate-200 disabled:opacity-50">Prev</button>
            <button className="px-2 py-1 rounded hover:bg-slate-200 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
