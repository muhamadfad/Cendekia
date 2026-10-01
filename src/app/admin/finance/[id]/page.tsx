import { prisma } from "@/lib/prisma";
import { ArrowLeft, CheckCircle2, AlertTriangle, Printer, Plus } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function FinanceDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  
  const student = await prisma.student.findUnique({
    where: { id: resolvedParams.id },
    include: {
      user: true,
      class: true,
      payments: {
        orderBy: [{ year: 'desc' }, { month: 'desc' }]
      }
    }
  });

  if (!student) {
    return <div className="p-8">Data siswa tidak ditemukan.</div>;
  }

  const payments = student.payments;
  const paidPayments = payments.filter(p => p.status === 'PAID');
  const pendingPayments = payments.filter(p => p.status === 'PENDING');
  
  const totalPaid = paidPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <Link href="/admin/finance" className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar SPP
      </Link>

      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{student.user.name}</h1>
          <p className="text-[13px] text-slate-500 mt-1">NISN: {student.nisn} &bull; Kelas: {student.class?.name || '-'}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            <Printer className="w-4 h-4" /> Cetak Tagihan
          </button>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-md text-[13px] font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Buat Tagihan Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[12px] font-medium text-slate-500 mb-1">Total Lunas (Tahun Ini)</p>
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Rp {totalPaid.toLocaleString('id-ID')}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[12px] font-medium text-slate-500 mb-1">Total Tunggakan</p>
            <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Rp {totalPending.toLocaleString('id-ID')}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <h2 className="text-[14px] font-bold text-slate-900 mb-4">Riwayat Tagihan & Pembayaran</h2>
      
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500 w-[20%]">Periode</th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500 w-[20%]">Nominal</th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500 w-[25%]">Status</th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500 w-[20%]">Tanggal Pembayaran</th>
              <th className="px-5 py-3 text-[12px] font-medium text-slate-500 text-right w-[15%]">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-3 text-[13px] font-semibold text-slate-900">
                  {payment.month} {payment.year}
                </td>
                <td className="px-5 py-3 text-[13px] text-slate-600">
                  Rp {payment.amount.toLocaleString('id-ID')}
                </td>
                <td className="px-5 py-3">
                  {payment.status === 'PAID' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Lunas
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5" /> Belum Dibayar
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 text-[13px] text-slate-500">
                  {payment.paymentDate ? dayjs(payment.paymentDate).format('DD MMM YYYY, HH:mm') : '-'}
                </td>
                <td className="px-5 py-3 text-right">
                  {payment.status === 'PENDING' && (
                    <button className="text-[12px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded transition-colors shadow-sm">
                      Tandai Lunas
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-[13px] text-slate-500">
                  Tidak ada catatan tagihan untuk siswa ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
