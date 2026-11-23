import Link from "next/link";
import { 
  GraduationCap, Users, BookOpen, Award, Calendar, Phone, Mail, 
  MapPin, CheckCircle, ArrowRight, Sparkles, Building2, ShieldCheck, 
  Clock, ChevronRight, FileText, Compass, HeartHandshake, LogIn
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default function SchoolProfilePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* 1. TOP INFORMATION BAR (KOP RESMI DAERAH) */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              Kec. Watopute, Kabupaten Muna, Sulawesi Tenggara
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              info@sman2watopute.sch.id
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-indigo-950 text-indigo-300 border border-indigo-800/80 px-2 py-0.5 rounded text-[11px] font-bold">
              NPSN: 4040XXXX • Terakreditasi
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-[11px] text-slate-400">TA 2026/2027</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-700 to-slate-900 flex items-center justify-center text-white shadow-md shadow-indigo-900/20">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                SMAN 2 WATOPUTE
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1 block">
                Kabupaten Muna • Sulawesi Tenggara
              </span>
            </div>
          </Link>

          {/* Nav Menus */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#beranda" className="hover:text-indigo-600 transition-colors">Beranda</a>
            <a href="#sambutan" className="hover:text-indigo-600 transition-colors">Sambutan</a>
            <a href="#profil" className="hover:text-indigo-600 transition-colors">Profil &amp; Visi</a>
            <a href="#jurusan" className="hover:text-indigo-600 transition-colors">Jurusan</a>
            <a href="#fasilitas" className="hover:text-indigo-600 transition-colors">Fasilitas</a>
            <a href="#ekstrakurikuler" className="hover:text-indigo-600 transition-colors">Ekstrakurikuler</a>
            <a href="#ppdb" className="hover:text-indigo-600 transition-colors">PPDB 2026</a>
          </nav>

          {/* Action CTA: Portal Akademik / SIAKAD */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Portal SIAKAD</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION DENGAN CITRA SEKOLAH ELEGAN */}
      <section id="beranda" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-indigo-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-200 mb-6 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Selamat Datang di Portal Resmi Sekolah
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
            Mewujudkan Generasi Cerdas, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
              Berkarakter, &amp; Berakhlak Mulia
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            SMA Negeri 2 Watopute berkomitmen menghadirkan pendidikan berkualitas, lingkungan belajar yang aman dan asri, serta pembinaan prestasi akademik dan non-akademik berlandaskan Kurikulum Merdeka.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#ppdb"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Info PPDB 2026/2027
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#profil"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all"
            >
              Profil &amp; Visi Sekolah
            </a>
          </div>

          {/* Quick Real Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
            <div className="p-3 border-r border-white/10 last:border-0">
              <p className="text-3xl font-black text-indigo-300">140</p>
              <p className="text-xs text-slate-300 mt-1 font-medium">Siswa Terdaftar</p>
            </div>
            <div className="p-3 border-r border-white/10 last:border-0">
              <p className="text-3xl font-black text-emerald-300">18</p>
              <p className="text-xs text-slate-300 mt-1 font-medium">Guru &amp; Tenaga Pendidik</p>
            </div>
            <div className="p-3 border-r border-white/10 last:border-0">
              <p className="text-3xl font-black text-amber-300">6</p>
              <p className="text-xs text-slate-300 mt-1 font-medium">Rombongan Belajar (Rombel)</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-black text-sky-300">100%</p>
              <p className="text-xs text-slate-300 mt-1 font-medium">Kurikulum Merdeka</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SAMBUTAN KEPALA SEKOLAH */}
      <section id="sambutan" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Foto Kepsek Avatar Card */}
            <div className="md:col-span-5 text-center">
              <div className="relative inline-block">
                <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-2xl bg-gradient-to-tr from-slate-800 to-indigo-900 border-4 border-white shadow-2xl flex flex-col items-center justify-center p-6 text-white text-center mx-auto">
                  <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-4">
                    <GraduationCap className="w-12 h-12 text-indigo-300" />
                  </div>
                  <h4 className="font-bold text-base leading-tight text-white">Kepala Sekolah</h4>
                  <p className="text-xs text-indigo-200 mt-0.5">SMA Negeri 2 Watopute</p>
                  <span className="text-[10px] text-slate-300 mt-2 bg-white/10 px-2 py-0.5 rounded">
                    NIP. 19740512XXXXXXXXXX
                  </span>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                  Pimpinan Lembaga
                </div>
              </div>
            </div>

            {/* Pesan Sambutan */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-md">
                Kata Sambutan
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Membangun Generasi Emas dari Bumi Watopute
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                <em>Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera untuk Kita Semua.</em>
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa. Selamat datang di laman resmi <strong>SMA Negeri 2 Watopute</strong>. Keberadaan website ini merupakan wujud transparansi informasi dan komitmen kami dalam menyajikan pelayanan pendidikan yang modern, terbuka, dan akuntabel bagi seluruh masyarakat Kabupaten Muna.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Di era digital ini, kami terus berikhtiar mendidik putra-putri daerah agar tidak hanya unggul dalam ilmu pengetahuan dan teknologi, namun juga memiliki budi pekerti yang luhur serta siap bersaing melanjutkan ke perguruan tinggi maupun dunia kerja.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Pimpinan SMA Negeri 2 Watopute</p>
                  <p className="text-xs text-slate-500">Kec. Watopute, Kabupaten Muna</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISI, MISI & TUJUAN */}
      <section id="profil" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
              Profil Lembaga
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
              Visi &amp; Misi Pendidikan
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Pedoman arah pengembangan akademik dan pembentukan karakter peserta didik di SMAN 2 Watopute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Visi Sekolah</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2 mb-4 leading-snug">
                  "Terwujudnya Peserta Didik yang Berakhlak Mulia, Unggul dalam Prestasi, Mandiri, dan Berwawasan Lingkungan."
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menjadi pusat pembelajaran yang mengedepankan kearifan lokal, kedisiplinan tinggi, serta pemanfaatan teknologi digital untuk masa depan siswa yang cemerlang.
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Misi Sekolah</span>
              <ul className="mt-4 space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span>Menanamkan nilai-nilai keimanan, ketaqwaan, dan budi pekerti luhur dalam kehidupan sehari-hari di sekolah.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span>Melaksanakan pembelajaran aktif, inovatif, dan berpusat pada siswa sesuai prinsip Kurikulum Merdeka.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <span>Mengembangkan minat, bakat, dan potensi siswa melalui kegiatan ekstrakurikuler serta bimbingan intensif.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                  <span>Menciptakan lingkungan sekolah yang bersih, hijau, sehat, dan ramah anak.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROGRAM PEMINATAN / JURUSAN */}
      <section id="jurusan" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              Peminatan Akademik
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
              Program Pilihan Belajar Siswa
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Struktur pembelajaran Kurikulum Merdeka yang memberikan ruang eksplorasi mata pelajaran sesuai cita-cita masa depan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5 font-black text-lg">
                IPA
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Peminatan Matematika &amp; Ilmu Alam (MIPA)</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Fokus pendalaman sains, logika matematika, biologi, fisika, dan kimia. Mempersiapkan siswa melanjutkan ke fakultas teknik, kedokteran, pertanian, dan sains terapan.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">Matematika Lanjut</span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">Biologi</span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">Fisika</span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">Kimia</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 font-black text-lg">
                IPS
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Peminatan Ilmu-Ilmu Sosial (IPS)</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Fokus analisis sosial, ekonomi kemasyarakatan, geografi, dan sosiologi. Mempersiapkan siswa melanjutkan ke fakultas hukum, ekonomi, ilmu komunikasi, dan pendidikan.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">Ekonomi</span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">Sosiologi</span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">Geografi</span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded">Sejarah Pilihan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SARANA & FASILITAS SEKOLAH */}
      <section id="fasilitas" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
              Sarana &amp; Prasarana
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
              Fasilitas Penunjang Pembelajaran
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Lingkungan fisik yang memadai untuk menunjang kenyamanan kegiatan belajar mengajar harian siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Laboratorium Komputer</h4>
              <p className="text-xs text-slate-600">Dilengkapi jaringan komputer untuk pelaksanaan asesmen nasional (ANBK) dan pembelajaran TIK.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Perpustakaan Sekolah</h4>
              <p className="text-xs text-slate-600">Koleksi buku teks pelajaran Kurikulum Merdeka, buku fiksi/pengetahuan umum, dan ruang baca tenang.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Laboratorium IPA Terpadu</h4>
              <p className="text-xs text-slate-600">Peralatan praktikum fisika, kimia, dan biologi untuk menunjang eksperimen ilmiah siswa.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Lapangan Olahraga Serbaguna</h4>
              <p className="text-xs text-slate-600">Fasilitas olahraga upacara bendera, lapangan voli, futsal, dan kegiatan senam kebugaran.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Ruang Bimbingan Konseling</h4>
              <p className="text-xs text-slate-600">Layanan konseling akademik dan bimbingan karir masa depan siswa dalam suasana yang nyaman.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-1">Musholla &amp; Ruang Ibadah</h4>
              <p className="text-xs text-slate-600">Tempat ibadah sholat berjamaah serta pembinaan akhlak dan kegiatan kerohanian siswa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EKSTRAKURIKULER SISWA */}
      <section id="ekstrakurikuler" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              Minat &amp; Bakat
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
              Ekstrakurikuler Siswa
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Wadah penyaluran bakat, kepemimpinan, dan kebersamaan di luar jam belajar formal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <span className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center mx-auto mb-2 text-xs">PRM</span>
              <h4 className="font-bold text-slate-900 text-sm">Pramuka Wajib</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Kepemimpinan &amp; Dasa Dharma</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <span className="w-10 h-10 rounded-full bg-red-100 text-red-700 font-black flex items-center justify-center mx-auto mb-2 text-xs">PAS</span>
              <h4 className="font-bold text-slate-900 text-sm">Paskibra Sekolah</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Disiplin &amp; Baris-Berbaris</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <span className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-black flex items-center justify-center mx-auto mb-2 text-xs">PMR</span>
              <h4 className="font-bold text-slate-900 text-sm">PMR / UKS</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Kesehatan &amp; Pertolongan Pertama</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center mx-auto mb-2 text-xs">VOL</span>
              <h4 className="font-bold text-slate-900 text-sm">Olahraga &amp; Bola Voli</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Kebugaran &amp; Prestasi Lomba</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <span className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-black flex items-center justify-center mx-auto mb-2 text-xs">SEN</span>
              <h4 className="font-bold text-slate-900 text-sm">Seni &amp; Tari Tradisional</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Pelestarian Budaya Muna</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center mx-auto mb-2 text-xs">ROH</span>
              <h4 className="font-bold text-slate-900 text-sm">Kerohanian Islam (Rohis)</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Kajian &amp; Sholat Berjamaah</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center mx-auto mb-2 text-xs">ENG</span>
              <h4 className="font-bold text-slate-900 text-sm">English Club</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Percakapan Bahasa Inggris</p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
              <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-black flex items-center justify-center mx-auto mb-2 text-xs">TIK</span>
              <h4 className="font-bold text-slate-900 text-sm">Klub Komputer &amp; Desain</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Literasi Digital Siswa</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INFORMASI PPDB 2026/2027 */}
      <section id="ppdb" className="py-20 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-300 mb-4">
            Penerimaan Peserta Didik Baru (PPDB)
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
            Pendaftaran Siswa Baru Tahun Ajaran 2026/2027
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Bergabunglah bersama keluarga besar SMA Negeri 2 Watopute. Dapatkan pengalaman belajar yang inspiratif, didampingi guru-guru berdedikasi, dan fasilitas yang siap menunjang masa depan Anda.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-10 text-xs">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <span className="font-bold text-indigo-300 block mb-1">Syarat Pendaftaran</span>
              <p className="text-slate-300">Fotokopi Ijazah/SKL SMP, Kartu Keluarga (KK), Akta Kelahiran, dan Pas Foto 3x4.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <span className="font-bold text-emerald-300 block mb-1">Jalur Pendaftaran</span>
              <p className="text-slate-300">Jalur Zonasi Watopute &amp; Sekitarnya, Jalur Afirmasi, dan Jalur Prestasi Akademik/Non-Akademik.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <span className="font-bold text-amber-300 block mb-1">Bebas Biaya Pendaftaran</span>
              <p className="text-slate-300">Proses pendaftaran peserta didik baru tidak dipungut biaya pendaftaran (Gratis).</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://wa.me/6281234567890?text=Halo%20Admin%20PPDB%20SMAN%202%20Watopute%2C%20saya%20ingin%20konsultasi%20pendaftaran%20siswa%20baru."
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              Hubungi Panitia PPDB via WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* 10. PINTU AKSES PORTAL SIAKAD SEKOLAH */}
      <section className="py-12 bg-indigo-50 border-t border-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-indigo-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Sistem Informasi Akademik Terpadu
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Portal Guru &amp; Administrasi SMAN 2 Watopute
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Akses modul presensi digital kelas, rekapitulasi nilai, dan cetak E-Rapor Kurikulum Merdeka resmi.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Link
                href="/admin"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Masuk Command Center
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER SEKOLAH */}
      <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-base font-bold text-white tracking-tight">SMAN 2 WATOPUTE</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sekolah Menengah Atas Negeri di lingkungan Dinas Pendidikan dan Kebudayaan Provinsi Sulawesi Tenggara. Berdedikasi mencetak insan cerdas berkarakter.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Tautan Cepat</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#sambutan" className="hover:text-white transition-colors">Sambutan Kepala Sekolah</a></li>
                <li><a href="#profil" className="hover:text-white transition-colors">Visi &amp; Misi</a></li>
                <li><a href="#jurusan" className="hover:text-white transition-colors">Program Peminatan</a></li>
                <li><a href="#ppdb" className="hover:text-white transition-colors">Pendaftaran PPDB 2026</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Layanan Digital</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/admin" className="hover:text-white transition-colors">Portal SIAKAD Admin</Link></li>
                <li><Link href="/guru" className="hover:text-white transition-colors">Portal Dewan Guru</Link></li>
                <li><Link href="/guru/walikelas" className="hover:text-white transition-colors">E-Rapor Kurikulum Merdeka</Link></li>
                <li><Link href="/admin/attendance" className="hover:text-white transition-colors">Presensi Harian Siswa</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Sekretariat Sekolah</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">
                Kecamatan Watopute, Kabupaten Muna, Provinsi Sulawesi Tenggara, Kode Pos 93652.
              </p>
              <p className="text-xs text-slate-300 font-semibold">
                Email: info@sman2watopute.sch.id
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {currentYear} SMA Negeri 2 Watopute. All rights reserved.</p>
            <p className="text-slate-500">Website Profil Resmi Sekolah • Dikembangkan oleh Tim Pengembang IT</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
