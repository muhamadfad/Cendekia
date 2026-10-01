import { CheckCircle2, TrendingUp, Users, AlertCircle } from "lucide-react";

export default function PromotionsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Transisi Tahun Ajaran Baru</h1>
        <p className="text-sm text-slate-500 mt-1">Eksekusi kenaikan kelas secara massal berdasarkan keputusan final Wali Kelas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Tahun Ini</span>
          </div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Siswa Naik Kelas</p>
          <h3 className="text-3xl font-bold text-slate-900">1,245 <span className="text-sm font-medium text-slate-400">Siswa</span></h3>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 rounded-lg">
              <Users className="w-6 h-6 text-rose-600" />
            </div>
            <span className="px-2.5 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">Perhatian</span>
          </div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Siswa Tinggal Kelas</p>
          <h3 className="text-3xl font-bold text-slate-900">12 <span className="text-sm font-medium text-slate-400">Siswa</span></h3>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Validasi</span>
          </div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Keputusan Wali Kelas</p>
          <h3 className="text-3xl font-bold text-slate-900">100% <span className="text-sm font-medium text-emerald-500">Lengkap</span></h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
            <TrendingUp className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Siap Dieksekusi</h2>
          <p className="text-slate-600 max-w-lg mb-8">
            Semua Wali Kelas telah menginput keputusan "Naik / Tinggal Kelas" di laporan Rapor Semester Genap. 
            Sistem siap mengeksekusi perpindahan seluruh siswa ke tingkat kelas berikutnya secara otomatis.
          </p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-2xl w-full text-left mb-8 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">Apa yang akan terjadi?</h4>
              <ul className="text-sm text-slate-600 mt-2 space-y-1 list-disc list-inside">
                <li>Siswa kelas 10 & 11 yang dinyatakan naik akan otomatis berubah menjadi kelas 11 & 12.</li>
                <li>Siswa kelas 12 yang dinyatakan lulus akan otomatis masuk ke arsip Alumni.</li>
                <li>Siswa yang tinggal kelas akan dipertahankan di tingkatan yang sama.</li>
                <li>Tahun ajaran aktif akan berubah menjadi <strong>2027/2028</strong>.</li>
              </ul>
            </div>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-lg shadow-md transition-all flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" /> Proses Kenaikan Kelas & Tahun Ajaran Baru
          </button>
        </div>
      </div>
    </div>
  );
}
