import Link from "next/link";
import { 
  GraduationCap, Users, BookOpen, Award, Calendar, Phone, Mail, 
  MapPin, ChevronRight, ArrowRight, Clock, Building2, Bell, 
  FileText, CheckCircle2, Search, ExternalLink, LogIn, Sparkles
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default function Sman2WatoputePortal() {
  const currentYear = new Date().getFullYear();

  // Data Berita & Artikel Terkini Sekolah
  const newsList = [
    {
      id: 1,
      title: "Peringatan Hari Guru Nasional & Gelar Apresiasi Pendidik Inspiratif di SMAN 2 Watopute",
      category: "Kegiatan",
      date: "20 November 2026",
      summary: "Keluarga besar SMA Negeri 2 Watopute menyelenggarakan upacara khidmat peringatan Hari Guru dilanjutkan penyerahan piagam apresiasi guru berdedikasi.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      title: "Sosialisasi Jalur Masuk SNBP & SNBT 2027 Bersama Ikatan Alumni untuk Siswa Kelas XII",
      category: "Akademik",
      date: "14 November 2026",
      summary: "Memberikan pembekalan strategi pemilihan program studi dan kiat sukses lolos seleksi masuk perguruan tinggi negeri bagi siswa angkatan 2026/2027.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      title: "Tim Pramuka SMAN 2 Watopute Raih Juara Umum Lomba Keterampilan Penegak se-Kabupaten Muna",
      category: "Prestasi",
      date: "05 November 2026",
      summary: "Kontingen Gugus Depan SMAN 2 Watopute berhasil memborong piala pada ajang perkemahan tahunan penegak dengan disiplin dan kekompakan tinggi.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80",
    }
  ];

  // Agenda Kegiatan Sekolah
  const upcomingAgendas = [
    { day: "28", month: "NOV", title: "Penilaian Akhir Semester (PAS) Ganjil TA 2026/2027", time: "07.30 - 12.00 WITA" },
    { day: "12", month: "DES", title: "Porseni Antar-Kelas & Pameran Karya P5 Kurikulum Merdeka", time: "08.00 - 14.00 WITA" },
    { day: "19", month: "DES", title: "Pembagian Buku Laporan Hasil Belajar (E-Rapor Ganjil)", time: "08.30 - 11.30 WITA" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-800 selection:bg-blue-800 selection:text-white">
      {/* 1. TOP HEADER DINAS & KONTAK */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Watopute, Kabupaten Muna, Sulawesi Tenggara 93652
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              (0402) 282XXXX / 0812-XXXX-XXXX
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="bg-blue-900/80 text-blue-200 border border-blue-700/60 px-2 py-0.5 rounded font-bold">
              NPSN: 4040XXXX
            </span>
            <span className="bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-2 py-0.5 rounded font-bold">
              Akreditasi A
            </span>
            <Link 
              href="/admin" 
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-2.5 py-0.5 rounded flex items-center gap-1 transition-all"
            >
              <LogIn className="w-3 h-3" /> Login SIAKAD
            </Link>
          </div>
        </div>
      </div>

      {/* 2. LOGO BRANDING RESMI (KOP BESAR SEPERTI SMAN 1 RAHA) */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* Logo Lambang Pendidikan Tut Wuri Handayani / Lambang Sekolah */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-900 text-white flex items-center justify-center font-black shadow-md border-2 border-amber-400 shrink-0 mx-auto">
              <GraduationCap className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-blue-900">
                Pemerintah Provinsi Sulawesi Tenggara • Dinas Pendidikan &amp; Kebudayaan
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight mt-0.5">
                SMA NEGERI 2 WATOPUTE
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Mencetak Insan Unggul, Berakhlak Mulia, Berprestasi, dan Berbudaya
              </p>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="hidden lg:flex items-center gap-6 text-right">
            <div className="border-r border-slate-200 pr-6">
              <p className="text-[10px] uppercase font-bold text-slate-400">Kurikulum</p>
              <p className="text-sm font-bold text-slate-800">Kurikulum Merdeka</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Portal Siswa &amp; Guru</p>
              <Link href="/admin" className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 justify-end">
                Akses SIAKAD Sekolah &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RUNNING TEXT / TICKER INFORMASI */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shrink-0">
            PENGUMUMAN
          </span>
          <div className="overflow-hidden whitespace-nowrap text-slate-200 text-xs">
            Selamat Datang di Website Resmi SMA Negeri 2 Watopute • Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Segera Dibuka • Jadwal Penilaian Akhir Semester Ganjil Dimulai Akhir Bulan Ini.
          </div>
        </div>
      </div>

      {/* 4. MAIN NAVBAR */}
      <nav className="bg-slate-800 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center overflow-x-auto py-2.5 gap-1 sm:gap-2 text-xs sm:text-sm font-semibold">
            <a href="#" className="bg-blue-700 text-white px-3.5 py-1.5 rounded transition-colors whitespace-nowrap">Beranda</a>
            <a href="#sambutan" className="text-slate-200 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors whitespace-nowrap">Sambutan Kepala Sekolah</a>
            <a href="#profil" className="text-slate-200 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors whitespace-nowrap">Visi &amp; Misi</a>
            <a href="#berita" className="text-slate-200 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors whitespace-nowrap">Kabar Sekolah</a>
            <a href="#fasilitas" className="text-slate-200 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors whitespace-nowrap">Fasilitas</a>
            <a href="#ekstrakurikuler" className="text-slate-200 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors whitespace-nowrap">Ekstrakurikuler</a>
            <a href="#ppdb" className="text-amber-300 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors whitespace-nowrap font-bold">Info PPDB 2026</a>
          </div>

          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-1.5 rounded transition-all shrink-0 ml-4 shadow"
          >
            <LogIn className="w-3.5 h-3.5" /> Portal SIAKAD
          </Link>
        </div>
      </nav>

      {/* 5. HERO SLIDER BANNER RESMI SEKOLAH */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div 
          className="relative min-h-[380px] sm:min-h-[460px] flex items-center bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.75) 50%, rgba(15, 23, 42, 0.5) 100%), url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80')` 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
            <div className="max-w-2xl space-y-4">
              <span className="inline-block bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                Tahun Ajaran 2026/2027
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                Selamat Datang di Portal Resmi <br />
                <span className="text-amber-300">SMA Negeri 2 Watopute</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                Wadah pendidikan terpercaya di Kecamatan Watopute, Kabupaten Muna. Membina 140 peserta didik berprestasi akademik, terampil, dan berkarakter Profil Pelajar Pancasila.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#ppdb"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-lg transition-all"
                >
                  Pendaftaran Siswa Baru (PPDB) &rarr;
                </a>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all"
                >
                  Portal Guru &amp; SIAKAD
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Stat Banner */}
        <div className="bg-blue-950 border-t border-blue-900 py-4 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="border-r border-blue-900/80 last:border-0 p-2">
              <p className="text-2xl sm:text-3xl font-black text-amber-300">140</p>
              <p className="text-xs text-slate-300 font-semibold mt-0.5">Siswa Terdaftar</p>
            </div>
            <div className="border-r border-blue-900/80 last:border-0 p-2">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">18</p>
              <p className="text-xs text-slate-300 font-semibold mt-0.5">Guru &amp; Tenaga Pendidik</p>
            </div>
            <div className="border-r border-blue-900/80 last:border-0 p-2">
              <p className="text-2xl sm:text-3xl font-black text-blue-300">6</p>
              <p className="text-xs text-slate-300 font-semibold mt-0.5">Rombongan Belajar (Rombel)</p>
            </div>
            <div className="p-2">
              <p className="text-2xl sm:text-3xl font-black text-purple-300">100%</p>
              <p className="text-xs text-slate-300 font-semibold mt-0.5">Kelulusan &amp; Berkarakter</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SAMBUTAN KEPALA SEKOLAH (FORMAT KORAN SEKOLAH RESMI) */}
      <section id="sambutan" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            {/* Foto Kepsek */}
            <div className="lg:col-span-4 text-center">
              <div className="inline-block relative">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80" 
                  alt="Kepala Sekolah SMA Negeri 2 Watopute" 
                  className="w-52 h-64 sm:w-60 sm:h-72 object-cover rounded-xl shadow-lg border-4 border-white mx-auto"
                />
                <div className="mt-3">
                  <h4 className="font-bold text-slate-900 text-base">Kepala Sekolah</h4>
                  <p className="text-xs text-blue-800 font-semibold">SMA Negeri 2 Watopute</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Kabupaten Muna, Sulawesi Tenggara</p>
                </div>
              </div>
            </div>

            {/* Narasi Sambutan */}
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-700 rounded-full"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-800">Sambutan Kepala Sekolah</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                "Bersama Membangun Masa Depan Generasi Muda Muna yang Berilmu dan Berakhlak Mulia"
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <em>Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera untuk Kita Semua.</em>
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Kuasa. Selamat datang di laman resmi <strong>SMA Negeri 2 Watopute</strong>. Kehadiran website ini merupakan wujud keterbukaan informasi publik dan komitmen kami dalam meningkatkan mutu layanan pendidikan bagi masyarakat di Kecamatan Watopute dan sekitarnya.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dengan dukungan dewan guru yang berdedikasi serta fasilitas belajar yang terus kami lengkapi, kami bertekad membimbing seluruh 140 peserta didik kami untuk mencapai potensi terbaiknya, baik dalam prestasi akademik maupun pembinaan budi pekerti luhur.
              </p>
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-800">Keluarga Besar SMAN 2 Watopute</p>
                <p className="text-[11px] text-slate-500">Watopute, Kabupaten Muna</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BERITA TERKINI & AGENDA SEKOLAH (2 KOLOM RESMI) */}
      <section id="berita" className="py-14 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Kolom Kiri: Berita Sekolah Terkini (8 Kolom) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b-2 border-blue-900">
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-700" /> Kabar &amp; Berita Sekolah
                </h3>
                <span className="text-xs text-blue-700 font-bold hover:underline cursor-pointer">Lihat Arsip Berita &rarr;</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {newsList.map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="h-40 overflow-hidden relative">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-blue-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-[11px] text-slate-400 font-medium mb-1.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.date}
                        </p>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-blue-700 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-1">
                      <span className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer">
                        Baca Selengkapnya &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Kanan: Agenda & Pengumuman Penting (4 Kolom) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="pb-3 border-b-2 border-blue-900">
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-700" /> Agenda Kegiatan
                </h3>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                {upcomingAgendas.map((agenda, idx) => (
                  <div key={idx} className="flex gap-3.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0 items-start">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded-lg flex flex-col items-center justify-center shrink-0 font-bold shadow-sm">
                      <span className="text-sm leading-none">{agenda.day}</span>
                      <span className="text-[9px] uppercase tracking-wider text-amber-300 font-bold">{agenda.month}</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs leading-snug hover:text-blue-700 transition-colors">
                        {agenda.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {agenda.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Box Info PPDB Mini */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 rounded-xl shadow-md border border-blue-800">
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded uppercase tracking-wider">
                  PPDB 2026/2027
                </span>
                <h4 className="text-base font-bold mt-2 text-white">Pendaftaran Siswa Baru</h4>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  Layanan informasi pendaftaran peserta didik baru SMA Negeri 2 Watopute telah dibuka.
                </p>
                <a
                  href="#ppdb"
                  className="mt-3.5 inline-block text-xs font-bold text-amber-300 hover:underline"
                >
                  Lihat Syarat &amp; Alur Pendaftaran &rarr;
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. SARANA FASILITAS & EKSTRAKURIKULER */}
      <section id="fasilitas" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded border border-blue-200">
              Sarana Belajar
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">Fasilitas Kampus Sekolah</h3>
            <p className="text-xs text-slate-500 mt-1">Dukungan sarana prasarana yang menunjang kegiatan kurikuler dan ekstrakurikuler.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-slate-200 rounded-xl p-4 text-center bg-slate-50 hover:bg-white hover:shadow transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-2.5">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Laboratorium Komputer</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Ujian CBT &amp; ANBK Mandiri</p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 text-center bg-slate-50 hover:bg-white hover:shadow transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Perpustakaan</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Buku Teks Kurikulum Merdeka</p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 text-center bg-slate-50 hover:bg-white hover:shadow transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2.5">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Lab IPA Terpadu</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Praktikum Fisika &amp; Biologi</p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 text-center bg-slate-50 hover:bg-white hover:shadow transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mx-auto mb-2.5">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Lapangan Olahraga</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Voli, Futsal &amp; Upacara</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PORTAL SIAKAD AKSES CEPAT DEWAN GURU */}
      <section className="bg-slate-900 text-white py-10 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black shrink-0">
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Akses Internal Sekolah</span>
              <h4 className="text-base sm:text-lg font-bold text-white">Sistem Informasi Akademik (SIAKAD) SMAN 2 Watopute</h4>
              <p className="text-xs text-slate-300">Khusus dewan guru dan wali kelas untuk pengelolaan presensi harian dan cetak E-Rapor resmi.</p>
            </div>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-lg transition-all shrink-0"
          >
            Masuk Command Center SIAKAD &rarr;
          </Link>
        </div>
      </section>

      {/* 10. FOOTER RESMI SEKOLAH */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-4 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-850">
          <div>
            <h5 className="font-bold text-white text-sm mb-2">SMA NEGERI 2 WATOPUTE</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sekolah Menengah Atas Negeri di bawah naungan Dinas Pendidikan dan Kebudayaan Provinsi Sulawesi Tenggara.
            </p>
            <p className="text-xs text-slate-500 mt-2">NPSN: 4040XXXX • Akreditasi A</p>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm mb-2">Alamat &amp; Kontak</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kecamatan Watopute, Kabupaten Muna, Sulawesi Tenggara 93652.
            </p>
            <p className="text-xs text-slate-400 mt-1">Telepon: (0402) 282XXXX</p>
            <p className="text-xs text-slate-400">Email: info@sman2watopute.sch.id</p>
          </div>

          <div>
            <h5 className="font-bold text-white text-sm mb-2">Tautan Terkait</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="https://kemdikbud.go.id" target="_blank" className="hover:text-white transition-colors">Kementerian Pendidikan Dasar &amp; Menengah</a></li>
              <li><a href="https://sman1-raha.sch.id" target="_blank" className="hover:text-white transition-colors">Referensi: SMAN 1 Raha</a></li>
              <li><Link href="/admin" className="text-amber-400 hover:underline">Login SIAKAD Guru &amp; Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {currentYear} SMA Negeri 2 Watopute. Hak Cipta Dilindungi Undang-Undang.</p>
          <p>Website Resmi Sekolah • Dikembangkan untuk Kemajuan Pendidikan Muna</p>
        </div>
      </footer>
    </div>
  );
}
