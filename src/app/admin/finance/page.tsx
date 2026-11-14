import { prisma } from "@/lib/prisma";
import { Search, Download, Plus, MoreHorizontal, CheckCircle2, AlertTriangle, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/id';
import { generateBulkInvoices } from "./actions";

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

  const allPayments = await prisma.payment.findMany();
  const totalPaid = allPayments.filter(p => p.status === 'PAID').reduce((acc, c) => acc + c.amount, 0);
  const totalPending = allPayments.filter(p => p.status === 'PENDING').reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header & Bulk Billing Form */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Manajemen Keuangan & SPP Siswa</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Kelola penerbitan tagihan massal, status pembayaran, dan riwayat transaksi kas.</p>
        </div>
        
        {/* Bulk invoice generation form */}
        <form action={generateBulkInvoices} className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-lg shadow-sm">
          <select name="month" defaultValue={dayjs().format('MMMM')} className="px-2.5 py-1 text-[12px] font-medium border border-slate-200 rounded outline-none bg-slate-50">
            {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select name="year" defaultValue={2026} className="px-2.5 py-1 text-[12px] font-medium border border-slate-200 rounded outline-none bg-slate-50">
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
          <input type="hidden" name="amount" value="350000" />
          <button type="submit" className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1 rounded text-[12px] font-medium shadow-sm transition-colors whitespace-nowrap">
            <Plus className="w-3.5 h-3.5" /> Terbitkan SPP Massal
          </button>
        </form>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Total Pemasukan Kas SPP</p>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Rp {totalPaid.toLocaleString('id-ID')}
          </h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Pembayaran terverifikasi</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Total Piutang / Tunggakan</p>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Rp {totalPending.toLocaleString('id-ID')}
          </h3>
          <p className="text-[11px] text-rose-600 font-medium mt-1">Menunggu penyelesaian</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Tarif Standar SPP Bulanan</p>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Rp 350.000 <span className="text-[12px] font-normal text-slate-500">/ siswa</span>
          </h3>
          <p className="text-[11px] text-slate-500 mt-1">Standar Jenjang SMA</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari nama atau NISN..." 
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none w-full transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">NISN</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[30%]">Nama Siswa</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[15%]">Kelas</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[20%]">Status SPP Terakhir</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const latestPayment = student.payments[0];
                const isPaid = latestPayment?.status === 'PAID';

                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] font-mono text-slate-700">{student.nisn}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] font-semibold text-slate-900">{student.user.name}</div>
                      <div className="text-[11px] text-slate-500">{student.user.email}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-[13px] text-slate-700">{student.class?.name || '-'}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      {latestPayment ? (
                        <div className="flex items-center gap-1.5">
                          {isPaid ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> Lunas ({latestPayment.month})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              <AlertTriangle className="w-3 h-3" /> Tunggakan ({latestPayment.month})
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Belum ada tagihan</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <Link 
                        href={`/admin/finance/${student.id}`}
                        className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded shadow-sm transition-colors"
                      >
                        Detail & Bayar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
