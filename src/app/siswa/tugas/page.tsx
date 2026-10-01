import { FileText, Clock, Upload, CheckCircle2, PlayCircle, BookOpen, Download, HelpCircle, AlertTriangle } from "lucide-react";

export default function SiswaTugasPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ruang Belajar Interaktif</h1>
          <p className="text-sm text-slate-500 mt-1">Akses modul materi, kerjakan kuis CBT, dan kumpulkan tugas Anda di sini.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-md text-xs font-bold text-indigo-700">
            2 Kuis Aktif
          </div>
          <div className="px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-md text-xs font-bold text-amber-700">
            1 Tugas Tertunda
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI (Kuis & Tugas) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION KUIS & CBT */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <PlayCircle className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-bold text-slate-800">Kuis & Ujian (CBT)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CBT Card 1 */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm relative overflow-hidden group hover:border-rose-300 transition-colors">
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">LIVE</div>
                <h3 className="font-bold text-slate-900 mb-1">Ulangan Harian 1: Dinamika Newton</h3>
                <p className="text-xs font-bold text-rose-600 mb-3 uppercase tracking-wide">Fisika</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> 20 Soal (PG)</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 45 Menit</span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md text-xs font-semibold transition-colors">
                  Mulai Ujian Sekarang
                </button>
              </div>

              {/* CBT Card 2 */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">HARI INI</div>
                <h3 className="font-bold text-slate-900 mb-1">Kuis Singkat: Tenses & Grammar</h3>
                <p className="text-xs font-bold text-indigo-600 mb-3 uppercase tracking-wide">Bahasa Inggris</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> 10 Soal (PG)</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 15 Menit</span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-xs font-semibold transition-colors">
                  Mulai Kuis
                </button>
              </div>
            </div>
          </section>

          {/* SECTION TUGAS */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800">Tugas Mandiri & Terstruktur</h2>
            </div>
            <div className="space-y-3">
              {/* Urgent Task */}
              <div className="bg-white rounded-lg p-5 border border-slate-200 border-l-4 border-l-amber-500 flex items-start gap-4">
                <div className="p-2 bg-amber-50 rounded-md shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Latihan Trigonometri Dasar</h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">Matematika Wajib • Budi Guru, S.Pd</p>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">SISA 5 JAM</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-2 mb-3">
                    Kerjakan soal latihan LKS halaman 45-47 bagian A dan B. Kumpulkan dalam format PDF (Maksimal 5MB).
                  </p>
                  <button className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold transition-colors shadow-sm">
                    <Upload className="w-3.5 h-3.5" /> Unggah Tugas
                  </button>
                </div>
              </div>

              {/* Completed Task */}
              <div className="bg-white rounded-lg p-5 border border-slate-200 border-l-4 border-l-emerald-500 flex items-start gap-4 opacity-80">
                <div className="p-2 bg-emerald-50 rounded-md shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Laporan Praktikum Titrasi Asam Basa</h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">Kimia • Dr. Hendra</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded flex items-center gap-1">
                      NILAI: 92/100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* KOLOM KANAN (Modul Materi) */}
        <div className="lg:col-span-1">
          <section className="bg-slate-900 rounded-xl p-6 text-white h-full shadow-lg border border-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold">Modul Pembelajaran</h2>
            </div>
            
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Materi dan presentasi terbaru yang diunggah oleh guru Anda untuk dipelajari sebelum ujian.
            </p>

            <div className="space-y-3">
              {/* Modul 1 */}
              <div className="bg-white/10 border border-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors cursor-pointer group">
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">Modul 4: Hukum Newton</h4>
                <p className="text-[11px] text-slate-400 mt-1 mb-3">Fisika • PDF (2.4 MB)</p>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded text-xs font-bold transition-colors">
                    <BookOpen className="w-3.5 h-3.5" /> Baca
                  </button>
                  <button className="px-3 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Modul 2 */}
              <div className="bg-white/10 border border-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors cursor-pointer group">
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">Slide Presentasi Tenses</h4>
                <p className="text-[11px] text-slate-400 mt-1 mb-3">Bahasa Inggris • PPTX (5.1 MB)</p>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white py-1.5 rounded text-xs font-bold transition-colors">
                    <BookOpen className="w-3.5 h-3.5" /> Baca
                  </button>
                  <button className="px-3 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center transition-colors">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Modul 3 */}
              <div className="bg-white/10 border border-white/10 p-3 rounded-lg hover:bg-white/15 transition-colors cursor-pointer group">
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">Video: Sejarah Kemerdekaan</h4>
                <p className="text-[11px] text-slate-400 mt-1 mb-3">Sejarah • MP4 / Tautan</p>
                <div className="flex gap-2">
                  <button className="w-full flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white py-1.5 rounded text-xs font-bold transition-colors">
                    <PlayCircle className="w-3.5 h-3.5" /> Tonton Video
                  </button>
                </div>
              </div>

            </div>
            
            <button className="w-full mt-6 py-2 border border-slate-700 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
              Lihat Semua Modul
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
