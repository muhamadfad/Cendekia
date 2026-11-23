import Link from "next/link";
import { 
  GraduationCap, Users, Shield, ArrowRight, BookOpen, Wallet, 
  CheckCircle2, Sparkles, Smartphone, Video, FileText, FileCheck, 
  Check, Star, ShieldCheck, Activity, Zap, Clock, TrendingUp,
  Award, MessageSquare, ChevronRight, Play, HeartHandshake
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white py-2 px-4 text-center text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Update 2026</span>
          <span>Dukungan Penuh Format <strong>E-Rapor Kurikulum Merdeka</strong> &amp; <strong>Smart Hybrid Meeting (Zoom/Meet 0% Server)</strong></span>
          <ArrowRight className="w-3.5 h-3.5 opacity-80" />
        </div>
      </div>

      {/* 2. NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-slate-900 p-2 rounded-xl shadow-md shadow-slate-900/10">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900">CENDEKIA</span>
              <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase tracking-widest bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-200">
                School ERP &amp; LMS
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#fitur" className="hover:text-indigo-600 transition-colors">Fitur Unggulan</a>
            <a href="#portals" className="hover:text-indigo-600 transition-colors">4 Portal Terpadu</a>
            <a href="#komparasi" className="hover:text-indigo-600 transition-colors">Keunggulan &amp; ROI</a>
            <a href="#hybrid" className="hover:text-indigo-600 transition-colors">Smart Hybrid Zoom</a>
            <a href="#mobile" className="hover:text-indigo-600 transition-colors">Aplikasi Mobile</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/admin" 
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/70 px-3.5 py-2 rounded-lg transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Demo Command Center
            </Link>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg"
            >
              Masuk Portal
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-200/40 via-blue-100/30 to-purple-100/30 blur-3xl -z-10 rounded-full"></div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-700 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Transformasi Digital Pendidikan Indonesia 2026
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
            Ekosistem Cerdas <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
              Manajemen Sekolah Modern
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Satu platform terpadu yang menghubungkan <strong>Manajemen Sekolah</strong>, <strong>Dewan Guru</strong>, <strong>Siswa</strong>, dan <strong>Orang Tua</strong>: Presensi Digital 30 detik, CBT Ujian Mandiri, E-Rapor Kurikulum Merdeka otomatis, hingga Tagihan SPP Massal sekali klik.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/admin" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-xl text-sm font-bold shadow-xl shadow-slate-900/20 hover:scale-[1.02] transition-all"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              Buka Command Center Admin
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a 
              href="#portals" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-7 py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all"
            >
              Pilih 4 Portal Masuk
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-lg shadow-slate-200/50">
            <div className="text-center p-2 border-r border-slate-100 last:border-0">
              <p className="text-2xl sm:text-3xl font-black text-indigo-600">4 Portal</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Admin, Guru, Siswa, Ortu</p>
            </div>
            <div className="text-center p-2 border-r border-slate-100 last:border-0">
              <p className="text-2xl sm:text-3xl font-black text-emerald-600">100%</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Paperless &amp; Hemat Kertas</p>
            </div>
            <div className="text-center p-2 border-r border-slate-100 last:border-0">
              <p className="text-2xl sm:text-3xl font-black text-blue-600">&lt; 30 Detik</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Presensi 1 Kelas + WA Ortu</p>
            </div>
            <div className="text-center p-2">
              <p className="text-2xl sm:text-3xl font-black text-purple-600">0% Beban</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Bandwidth Zoom Hybrid</p>
            </div>
          </div>
        </div>

        {/* 4. PRODUCT UI SHOWCASE (HERO MOCKUP) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-slate-200 to-slate-400/40 shadow-2xl">
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
              {/* Window Header */}
              <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                    https://cendekia.sch.id/admin/command-center
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live System
                  </span>
                </div>
              </div>

              {/* Window Body: Interactive Preview */}
              <div className="p-6 bg-slate-900 text-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pemasukan SPP</span>
                    <p className="text-2xl font-black text-white mt-1">Rp 47.8 Jt</p>
                    <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">84% Lunas Bulan Ini</span>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Kehadiran Siswa</span>
                    <p className="text-2xl font-black text-white mt-1">97.4%</p>
                    <span className="text-[11px] text-indigo-400 font-semibold mt-1 inline-block">124 Hadir • 3 Izin/Sakit</span>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Ujian CBT Mandiri</span>
                    <p className="text-2xl font-black text-white mt-1">100% Online</p>
                    <span className="text-[11px] text-purple-400 font-semibold mt-1 inline-block">Koreksi Otomatis Instan</span>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">E-Rapor Merdeka</span>
                    <p className="text-2xl font-black text-white mt-1">Siap Cetak</p>
                    <span className="text-[11px] text-blue-400 font-semibold mt-1 inline-block">Standar Format Resmi A4</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-indigo-950/50 border border-indigo-500/30 rounded-xl gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Ingin Menjelajahi Seluruh Fitur Secara Langsung?</h4>
                      <p className="text-xs text-slate-300">Semua modul telah siap digunakan tanpa perlu konfigurasi rumit.</p>
                    </div>
                  </div>
                  <Link 
                    href="/admin" 
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0"
                  >
                    Buka Dashboard Sekarang &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4 PORTAL TERPADU SECTION */}
      <section id="portals" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
              Arsitektur Multirole Terintegrasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Empat Portal Khusus Sesuai Peran Anda
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Setiap pihak di sekolah memiliki antarmuka khusus yang dirancang efisien, intuitif, dan responsif dari layar laptop hingga ponsel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Portal Admin */}
            <div className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Pusat Kendali</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Portal Administrator</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Manajemen master data siswa, guru, rombel kelas, jadwal, tagihan SPP massal sekali klik, dan audit arus kas sekolah.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Penerbitan SPP Massal</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Rekap Nilai &amp; Kenaikan Kelas</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Buku Saku Pelanggaran BK</li>
                </ul>
              </div>
              <Link 
                href="/admin" 
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
              >
                Masuk Command Center <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. Portal Guru */}
            <div className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Akademik &amp; KBM</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Portal Dewan Guru</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Presensi harian instan 30 detik + WA ortu, buku nilai otomatis, cetak E-Rapor Kurikulum Merdeka A4, dan distribusi materi tugas.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Presensi 30 Detik + WA</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Cetak E-Rapor Format Resmi A4</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Koreksi Tugas &amp; Nilai Instan</li>
                </ul>
              </div>
              <Link 
                href="/guru" 
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/10"
              >
                Masuk Portal Guru <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3. Portal Siswa */}
            <div className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">E-Learning Siswa</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Portal Siswa</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Mengikuti ujian CBT berwaktu (anti-contek &amp; auto-save), mengumpulkan tugas sekolah dengan batas waktu, dan melihat rekap capaian rapor.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Ujian CBT Timer Mandiri</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unduh Materi &amp; Upload Tugas</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Jadwal Pelajaran Digital</li>
                </ul>
              </div>
              <Link 
                href="/siswa" 
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/10"
              >
                Masuk Portal Siswa <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4. Portal Orang Tua */}
            <div className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">Sinergi Keluarga</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Portal Orang Tua</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Pantau kehadiran anak hari ini (alert alpa merah jika bolos), riwayat SPP &amp; kwitansi, poin sanksi BK, serta rapat daring Zoom 1-klik.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Status Kehadiran Hari Ini</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Rapat Zoom Ortu 1-Klik</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Kartu SPP &amp; Poin Disiplin BK</li>
                </ul>
              </div>
              <Link 
                href="/orangtua" 
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/10"
              >
                Masuk Portal Orang Tua <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FITUR UNGGULAN (BENTO GRID STYLE) */}
      <section id="fitur" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              Modul Esensial Sekolah
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Menuntaskan Segala Kerumitan Operasional Sekolah
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Setiap fitur dibuat bukan sekadar pajangan, melainkan solusi langsung atas krisis kertas, lembur guru, dan kebocoran dana SPP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Presensi Digital 30 Detik + WA Ortu</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guru absen 1 kelas hanya dengan menandai siswa yang tidak hadir (default hadir semua). Dilengkapi tombol 1-klik kirim notifikasi WhatsApp ke wali murid tanpa biaya API server.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Mass Billing SPP &amp; Kartu SPP Digital</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Terbitkan tagihan SPP ke 1.000 siswa dalam 1 kali klik. Kwitansi otomatis tercetak rapi, arus kas sekolah transparan, dan tunggakan terpantau secara real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ujian CBT Mandiri &amp; Nilai Instan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penyelenggaraan ujian bebas kertas (paperless). Sistem mengacak butir soal dan opsi, menyimpan jawaban tiap detik (auto-save), serta menghitung nilai seketika ujian selesai.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">E-Rapor Kurikulum Merdeka Siap Cetak A4</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pangkas lembur akhir semester dari 3 minggu jadi 1 hari. Konversi skor angka ke predikat otomatis, catatan karakter Profil Pelajar Pancasila, dan cetak PDF resmi.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Buku Saku Disiplin &amp; Konseling BK</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pencatatan pelanggaran siswa berbasis akumulasi poin objektif. Mencegah perdebatan dengan orang tua karena rekam jejak pembinaan tersimpan rapi dan sah secara kronologis.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">PWA Ultra-Ringan &amp; Hemat Kuota</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aplikasi dapat dipasang ke layar beranda HP dalam 1 ketukan tanpa memakan memori ratusan MB. Berjalan sangat cepat bahkan pada smartphone entry-level dan sinyal minim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SMART HYBRID ZOOM SECTION */}
      <section id="hybrid" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full">
                Inovasi Arsitektur Cerdas
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-5 tracking-tight leading-tight">
                Rapat Virtual &amp; Bagi Rapor Online <br />
                <span className="text-emerald-400">Nol Biaya Server &amp; 0% Beban Bandwidth</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                Bila sekolah membuat server rapat video sendiri, biaya server membengkak puluhan juta per bulan dan server rawan tumbang. CENDEKIA mengintegrasikan rapat video langsung ke cloud Zoom dan Google Meet resmi dengan tautan 1-klik di Portal Orang Tua.
              </p>

              <div className="space-y-3.5 mb-8 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>Orang tua pekerja dapat hadir rapat komite dari mana saja tanpa hambatan macet.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>Tingkat partisipasi rapat dan konsultasi evaluasi belajar tembus 95%.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>Infrastruktur server sekolah tetap ringan, stabil, dan bebas biaya tambahan.</span>
                </div>
              </div>

              <Link
                href="/orangtua"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
              >
                <Video className="w-4 h-4" />
                Lihat Tampilan Rapat di Portal Ortu &rarr;
              </Link>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-5">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-indigo-400" />
                  <span className="font-bold text-sm">Konsultasi Rapor Daring (Zoom)</span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                  Sedang Berlangsung
                </span>
              </div>

              <div className="bg-slate-900 rounded-xl p-5 mb-5 border border-slate-750">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Wali Kelas Pembina</span>
                  <span className="text-white font-semibold">Drs. Ahmad Fauzi, M.Pd</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span>Topik Bahasan</span>
                  <span className="text-white font-semibold">Evaluasi Capaian Rapor Siswa</span>
                </div>
                <div className="w-full bg-slate-800 rounded-lg p-3 text-center border border-slate-700">
                  <p className="text-[11px] text-slate-400 mb-2">ID Rapat: 892 4410 2911 • Passcode: 123456</p>
                  <span className="inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg">
                    <Play className="w-3.5 h-3.5 fill-white" /> Gabung Rapat Zoom Sekarang
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 text-center italic">
                Video streaming dialihkan langsung ke server global Zoom. Beban server sekolah = 0%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BEFORE VS AFTER COMPARISON TABLE */}
      <section id="komparasi" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              Return on Investment (ROI)
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Sekolah Konvensional vs Berbasis Cendekia
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Perbandingan nyata efisiensi biaya, waktu operasional, dan kepuasan orang tua.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Aspek Operasional</th>
                  <th className="py-4 px-6 bg-slate-800 text-red-300">Cara Lama (Konvensional)</th>
                  <th className="py-4 px-6 bg-indigo-900 text-emerald-300">Dengan CENDEKIA ERP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">Presensi Harian Siswa</td>
                  <td className="py-4 px-6 text-slate-600">Makan 15 menit/jam pelajaran, rawan titip absen, ortu tidak tahu anak bolos.</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold bg-emerald-50/40">30 detik per kelas, langsung ternotifikasi ke WA orang tua.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">Ujian PTS, PAS, &amp; Harian</td>
                  <td className="py-4 px-6 text-slate-600">Biaya fotokopi lembar soal Rp 15–30 juta/tahun, koreksi manual berhari-hari.</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold bg-emerald-50/40">100% Paperless, hemat jutaan rupiah, skor keluar seketika.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">Penyusunan Rapor Siswa</td>
                  <td className="py-4 px-6 text-slate-600">Guru lembur begadang 2–3 minggu membuka puluhan Excel, rawan salah rumus.</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold bg-emerald-50/40">Tuntas 1–2 hari, predikat terhitung otomatis, siap cetak A4.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">Penagihan &amp; Kas SPP</td>
                  <td className="py-4 px-6 text-slate-600">Tulis kwitansi manual berhari-hari, uang rawan dipakai anak, banyak penunggak.</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold bg-emerald-50/40">Generate tagihan massal 1-klik, kartu SPP digital, piutang turun 75%.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">Rapat &amp; Konsultasi Wali Murid</td>
                  <td className="py-4 px-6 text-slate-600">Wali murid sering tidak hadir karena macet, biaya cetak surat undangan fisik.</td>
                  <td className="py-4 px-6 text-emerald-800 font-semibold bg-emerald-50/40">Rapat hybrid Zoom 1-klik, kehadiran 95%, beban server sekolah 0%.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. BIG FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-8 h-8 text-indigo-300" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-5 leading-tight">
            Siap Membawa Sekolah Anda <br />
            Menuju Era Digital yang Sebenarnya?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Bebaskan guru dari beban administrasi, ciptakan transparansi keuangan bagi yayasan, dan berikan ketenangan batin bagi orang tua siswa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/admin" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Mulai Uji Coba Command Center
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              href="/login" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all"
            >
              Halaman Login Pengguna
            </Link>
          </div>
        </div>
      </section>

      {/* 10. COMPREHENSIVE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">CENDEKIA</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Platform Enterprise School ERP &amp; LMS terpadu di Indonesia. Menghadirkan efisiensi administrasi, transparansi keuangan, dan prestasi akademik.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Portal Akses</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/admin" className="hover:text-white transition-colors">Portal Admin &amp; TU</Link></li>
                <li><Link href="/guru" className="hover:text-white transition-colors">Portal Dewan Guru</Link></li>
                <li><Link href="/siswa" className="hover:text-white transition-colors">Portal Siswa</Link></li>
                <li><Link href="/orangtua" className="hover:text-white transition-colors">Portal Orang Tua</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Modul Utama</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/admin/attendance" className="hover:text-white transition-colors">Presensi Digital Siswa</Link></li>
                <li><Link href="/admin/finance" className="hover:text-white transition-colors">Smart Finance &amp; SPP</Link></li>
                <li><Link href="/admin/exams" className="hover:text-white transition-colors">Ujian CBT Mandiri</Link></li>
                <li><Link href="/guru/walikelas" className="hover:text-white transition-colors">E-Rapor Kurikulum Merdeka</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Standar Kepatuhan</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Sesuai standar panduan Kurikulum Merdeka Kemendikbudristek RI dan format cetak dokumen resmi A4.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                <ShieldCheck className="w-3.5 h-3.5" /> Data Aman &amp; Terenkripsi
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {currentYear} CENDEKIA. All rights reserved. Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white transition-colors">Syarat &amp; Ketentuan</a>
              <a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
