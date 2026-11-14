import { prisma } from "@/lib/prisma";
import { CheckCircle2, Clock, AlertTriangle, CreditCard, Printer, ShieldCheck } from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function SiswaFinancePage() {
  const student = await prisma.student.findFirst({
    include: {
      user: true,
      class: true,
      payments: {
        orderBy: [{ year: 'desc' }, { month: 'desc' }]
      }
    }
  });

  if (!student) return <div className="p-8 text-sm text-slate-500">Data Siswa tidak ditemukan</div>;

  const payments = student.payments;
  const pendingPayments = payments.filter(p => p.status === 'PENDING');
  const paidPayments = payments.filter(p => p.status === 'PAID');
  const totalPending = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Kewajiban Biaya Pendidikan (SPP)</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Nama: <span className="font-semibold text-slate-800">{student.user.name}</span> &bull; NISN: <span className="font-semibold text-slate-800">{student.nisn}</span> &bull; Kelas: <span className="font-semibold text-slate-800">{student.class?.name || '-'}</span>
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Tunggakan SPP</span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            Rp {totalPending.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {pendingPayments.length > 0 ? `${pendingPayments.length} bulan belum diselesaikan` : 'Semua tagihan lunas'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Status Rekening Siswa</span>
          <div className="flex items-center gap-1.5 text-[14px] font-semibold text-emerald-700 mt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            {pendingPayments.length === 0 ? 'Tertib Administrasi' : 'Menunggu Pelunasan'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Bebas administrasi akademik</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Metode Pembayaran Resmi</span>
          <div className="text-[13px] font-mono font-semibold text-slate-800 mt-1">
            VA Bank Mandiri: 8872-0081-2345
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Atas Nama: YAYASAN CENDEKIA</div>
        </div>
      </div>

      {/* Billing History Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h2 className="text-[13px] font-semibold text-slate-900">Riwayat & Jadwal Tagihan SPP Bulanan</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[25%]">Periode Tagihan</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[25%]">Nominal</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 w-[25%]">Status Pembayaran</th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-500 text-right w-[25%]">Kwitansi / Bukti</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map(p => {
                const isPaid = p.status === 'PAID';
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="text-[13px] font-semibold text-slate-900">{p.month} {p.year}</div>
                      <div className="text-[11px] text-slate-500">SPP Reguler Siswa</div>
                    </td>
                    <td className="px-4 py-2.5 text-[13px] font-semibold text-slate-900 font-mono">
                      Rp {p.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-2.5">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Lunas ({p.paymentDate ? dayjs(p.paymentDate).format('DD/MM/YYYY') : 'Terkonfirmasi'})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="w-3.5 h-3.5" /> Menunggu Pembayaran
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {isPaid ? (
                        <button 
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded shadow-sm transition-colors"
                        >
                          <Printer className="w-3 h-3" /> Cetak Kwitansi
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Belum tersedia</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {payments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[13px] text-slate-500">
                    Belum ada riwayat tagihan SPP yang tercatat.
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
