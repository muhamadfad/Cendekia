import { prisma } from "@/lib/prisma";
import { CheckCircle2, Clock, AlertTriangle, Wallet } from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function SiswaFinancePage() {
  const student = await prisma.student.findFirst({
    include: {
      payments: {
        orderBy: [{ year: 'desc' }, { month: 'desc' }]
      }
    }
  });

  if (!student) return <div>Data Siswa tidak ditemukan</div>;

  const payments = student.payments;
  const pendingPayments = payments.filter(p => p.status === 'PENDING');
  const totalPending = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Riwayat Pembayaran SPP</h1>
        <p className="text-sm text-slate-500 mt-1">Cek tagihan dan riwayat pembayaran Anda di sini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-indigo-200 text-sm font-semibold">Total Tunggakan SPP</p>
              <h2 className="text-3xl font-bold">Rp {totalPending.toLocaleString('id-ID')}</h2>
            </div>
          </div>
          {pendingPayments.length > 0 ? (
            <button className="w-full mt-2 bg-white text-indigo-600 hover:bg-slate-50 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm relative z-10">
              Bayar Sekarang via Virtual Account
            </button>
          ) : (
            <div className="w-full mt-2 bg-emerald-500/20 text-emerald-50 border border-emerald-400/30 py-2.5 rounded-lg font-bold text-sm text-center relative z-10">
              Semua Tagihan Sudah Lunas!
            </div>
          )}
        </div>
      </div>

      <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Rincian Tagihan (Tahun Ajaran 2026/2027)</h2>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Bulan Tagihan</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nominal</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal Bayar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">
                  {payment.month} {payment.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                  Rp {payment.amount.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.status === 'PAID' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> LUNAS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5" /> BELUM DIBAYAR
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">
                  {payment.paymentDate ? dayjs(payment.paymentDate).format('DD MMM YYYY, HH:mm') : '-'}
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <p className="text-sm text-slate-500 font-medium">Belum ada tagihan SPP yang di-generate.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
