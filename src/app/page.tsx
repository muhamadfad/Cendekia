"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, Users, BookOpen, Award, Calendar, Phone, Mail, 
  MapPin, ChevronRight, ArrowRight, Clock, Building2, Bell, 
  FileText, CheckCircle2, Search, ExternalLink, LogIn, Sparkles,
  ChevronDown, Image as ImageIcon, ShieldCheck, HeartHandshake, Eye
} from "lucide-react";

export default function Sman1RahaStylePortal() {
  const currentYear = new Date().getFullYear();
  const [activeSlide, setActiveSlide] = useState(0);

  // Sliders persis seperti SMAN 1 Raha
  const slides = [
    {
      title: "SMAN 2 WATOPUTE CERDAS & BERWIBAWA",
      subtitle: "Mewujudkan Generasi Unggul, Berakhlak Mulia, dan Siap Berkompetisi di Era Digital",
      badge: "SEKOLAH PENGGERAK",
      bg: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80"
    },
    {
      title: "TRANSFORMASI DIGITAL SEKOLAH (SI KOLA)",
      subtitle: "Implementasi Sistem Informasi Akademik Terpadu, Presensi Digital & E-Rapor Kurikulum Merdeka",
      badge: "DIGITALISASI SEKOLAH",
      bg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
    }
  ];

  // Berita & Pengumuman (Sesuai Referensi SMAN 1 Raha)
  const featuredNews = {
    title: "SAMBUTAN KEPALA SEKOLAH: Transformasi Digital Pendidikan di SMA Negeri 2 Watopute",
    category: "PENGUMUMAN RESMI",
    date: "23 November 2026",
    author: "Humas SMAN 2 Watopute",
    summary: "Memasuki era keterbukaan informasi, pemanfaatan teknologi digital melalui portal SI KOLA menjadi tonggak penting dalam transparansi akademik dan peningkatan mutu pembelajaran siswa di Kabupaten Muna.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
  };

  const newsList = [
    {
      id: 1,
      title: "Siswa SMAN 2 Watopute Siap Berkompetisi pada Ajang Porseni & Lomba Cepat Tepat Tingkat Kabupaten Muna",
      category: "Kesiswaan",
      date: "20 November 2026",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Peluncuran Portal Digital 'SI KOLA' SMA Negeri 2 Watopute Menuju Sekolah Digital Mandiri",
      category: "Teknologi",
      date: "15 November 2026",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Pembekalan Jalur Seleksi SNBP & SNBT 2027 Bersama Ikatan Alumni Kampus Sulawesi Tenggara",
      category: "Akademik",
      date: "10 November 2026",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Prestasi Terbaik (Persis Section 'Prestasi Terbaik' SMAN 1 Raha)
  const prestasiList = [
    {
      title: "Juara 1 Lomba Vokal Grup & Paduan Suara",
      event: "Festival Seni Siswa SMA/SMK se-Sulawesi Tenggara",
      year: "Tahun 2026",
      badge: "Tingkat Provinsi"
    },
    {
      title: "Juara Umum Perkemahan Pramuka Penegak",
      event: "Giat Prestasi Kwarcab Gerakan Pramuka Muna",
      year: "Tahun 2026",
      badge: "Tingkat Kabupaten"
    },
    {
      title: "Medali Perak Olimpiade Sains Geografi & Biologi",
      event: "Kompetisi Sains Madrasah & SMA Regional Sultra",
      year: "Tahun 2026",
      badge: "Tingkat Regional"
    }
  ];

  // Galeri Foto (Persis SMAN 1 Raha: Kegiatan Pramuka, Piket Guru, Guru BK, dll)
  const galleryList = [
    { title: "Kegiatan Pramuka Gugus Depan", count: "12 Foto", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" },
    { title: "Tenaga Pendidik & Kependidikan", count: "18 Guru", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80" },
    { title: "Piket Guru & Apel Pagi Harian", count: "8 Foto", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80" },
    { title: "Layanan Bimbingan Konseling (BK)", count: "6 Foto", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80" },
    { title: "Laboratorium Komputer & CBT", count: "10 Foto", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" },
    { title: "Porseni & Ekstrakurikuler Siswa", count: "15 Foto", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80" },
  ];

  // Mitra Sekolah (Persis Logo Telkomsel, BNN, Ruangguru, Kemdikbud)
  const partners = [
    "Dinas Pendidikan Provinsi Sulawesi Tenggara",
    "Kementerian Pendidikan Dasar & Menengah",
    "Badan Narkotika Nasional (BNN) Kabupaten Muna",
    "Telkomsel Indonesia (Digital Education)"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-800 antialiased selection:bg-indigo-600 selection:text-white">
      {/* 1. TOP BAR DINAS */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              Kec. Watopute, Kab. Muna, Sulawesi Tenggara 93652
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              info@sman2watopute.sch.id
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-400">NPSN: <strong>4040XXXX</strong></span>
            <span className="text-slate-600">•</span>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
              Akreditasi A
            </span>
            <Link 
              href="/admin" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1 rounded transition-colors flex items-center gap-1"
            >
              <LogIn className="w-3 h-3" /> Login SI KOLA
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR & MEGA MENU ENGINE (SEPERTI SMAN 1 RAHA) */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo Sekolah */}
          <Link href="/" className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-900 to-slate-900 flex items-center justify-center text-amber-300 font-black shadow-md border-2 border-indigo-700 shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                SMA NEGERI 2 WATOPUTE
              </span>
              <span className="text-[11px] font-bold text-indigo-700 tracking-wider uppercase mt-1 block">
                SI KOLA • Digitalisasi Sekolah Muna
              </span>
            </div>
          </Link>

          {/* Nav Menus */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-slate-700">
            <a href="#" className="text-indigo-600">Beranda</a>
            
            {/* Dropdown Profil */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                Profil Sekolah <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all">
                <a href="#sambutan" className="block px-3 py-2 rounded-lg text-xs hover:bg-indigo-50 hover:text-indigo-600">Sambutan Kepala Sekolah</a>
                <a href="#profil" className="block px-3 py-2 rounded-lg text-xs hover:bg-indigo-50 hover:text-indigo-600">Visi &amp; Misi</a>
                <a href="#fasilitas" className="block px-3 py-2 rounded-lg text-xs hover:bg-indigo-50 hover:text-indigo-600">Sarana &amp; Prasarana (Sarpras)</a>
              </div>
            </div>

            <a href="#berita" className="hover:text-indigo-600 transition-colors">Berita &amp; Agenda</a>
            <a href="#prestasi" className="hover:text-indigo-600 transition-colors">Prestasi</a>
            <a href="#galeri" className="hover:text-indigo-600 transition-colors">Galeri Foto</a>
            <a href="#lokasi" className="hover:text-indigo-600 transition-colors">Temukan Kami</a>
          </nav>

          {/* CTA SIAKAD */}
          <div className="flex items-center gap-3">
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Portal SIAKAD</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SLIDER SECTION (PERSIS SMANSARA CERDAS & BERWIBAWA) */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div 
          className="relative min-h-[460px] sm:min-h-[540px] flex items-center bg-cover bg-center transition-all duration-1000"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 0.4) 100%), url('${slides[activeSlide].bg}')` 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div className="max-w-3xl space-y-4">
              <span className="inline-block bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md">
                {slides[activeSlide].badge}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                {slides[activeSlide].title}
              </h2>
              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                {slides[activeSlide].subtitle}
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <a 
                  href="#berita"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Jelajahi Berita &amp; Kegiatan &rarr;
                </a>
                <Link 
                  href="/admin" 
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all"
                >
                  Akses SI KOLA Guru
                </Link>
              </div>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {slides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveSlide(i)}
                className={`w-3 h-3 rounded-full transition-all ${activeSlide === i ? 'bg-indigo-400 w-8' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* 4. STAT COUNTER (SECTION DARK PY-10 SEPERTI SMAN 1 RAHA) */}
        <div className="bg-slate-900 border-t border-slate-800 py-8 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-2 border-r border-slate-800 last:border-0">
              <p className="text-3xl sm:text-4xl font-black text-white">140</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Siswa Terdaftar</p>
            </div>
            <div className="p-2 border-r border-slate-800 last:border-0">
              <p className="text-3xl sm:text-4xl font-black text-indigo-400">18</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Guru &amp; Tenaga Pendidik</p>
            </div>
            <div className="p-2 border-r border-slate-800 last:border-0">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">6</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Rombongan Belajar</p>
            </div>
            <div className="p-2">
              <p className="text-3xl sm:text-4xl font-black text-amber-400">100%</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Kurikulum Merdeka</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BERITA & PENGUMUMAN (PERSIS TATA LETAK SMAN 1 RAHA) */}
      <section id="berita" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                Kabar Terkini
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Berita &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Pengumuman</span>
              </h2>
            </div>
            <span className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer">
              Semua Berita <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Big News (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-64 sm:h-80 overflow-hidden relative">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                  {featuredNews.category}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-indigo-200 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {featuredNews.date} • {featuredNews.author}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold leading-snug text-white">
                    {featuredNews.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {featuredNews.summary}
                </p>
                <span className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
                  Baca Selengkapnya &rarr;
                </span>
              </div>
            </div>

            {/* List News (Right 5 Cols) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {newsList.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex gap-4 group cursor-pointer"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{item.category}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRESTASI TERBAIK (PERSIS SMAN 1 RAHA) */}
      <section id="prestasi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Kebanggaan Lembaga
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Prestasi Terbaik Siswa
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Catatan torehan prestasi akademik, seni, dan kepramukaan siswa SMA Negeri 2 Watopute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prestasiList.map((p, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-amber-400 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                  {p.badge}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-3 mb-1 group-hover:text-indigo-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4">{p.event}</p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>{p.year}</span>
                  <span className="text-indigo-600 font-bold flex items-center gap-1">Detail &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALERI FOTO (PERSIS SEPERTI SMAN 1 RAHA) */}
      <section id="galeri" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                Dokumentasi
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Galeri Foto Kegiatan
              </h2>
            </div>
            <span className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1">
              Lihat Semua Album Galeri &rarr;
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryList.map((g, i) => (
              <div 
                key={i} 
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer bg-slate-900"
              >
                <img 
                  src={g.image} 
                  alt={g.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white mb-2 inline-block">
                    {g.count}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold leading-tight group-hover:text-amber-300 transition-colors">
                    {g.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SAMBUTAN KEPALA SEKOLAH (PERSIS SECTION DARK "CERDAS DAN BERWIBAWA" SMAN 1 RAHA) */}
      <section id="sambutan" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="relative inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80" 
                  alt="Kepala Sekolah SMA Negeri 2 Watopute" 
                  className="w-56 h-68 sm:w-64 sm:h-80 object-cover rounded-2xl border-4 border-indigo-500/40 shadow-2xl mx-auto" 
                />
                <div className="mt-3">
                  <h3 className="text-lg font-bold text-white">Pimpinan SMAN 2 Watopute</h3>
                  <p className="text-xs text-indigo-300 font-semibold">Kepala Sekolah</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Sambutan Kepala Sekolah
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Cerdas dan Berwibawa
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <em>Assalamu’alaikum Warahmatullahi Wabarakatuh. Salam sejahtera bagi kita semua.</em>
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas segala rahmat dan karunia-Nya sehingga website resmi <strong>SI KOLA SMA Negeri 2 Watopute</strong> dapat hadir sebagai sarana informasi, komunikasi, dan publikasi sekolah di era transformasi digital.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Pendidikan adalah investasi peradaban. Di SMA Negeri 2 Watopute, kami berkomitmen memberikan layanan pembelajaran terbaik, membangun karakter Profil Pelajar Pancasila, dan mencetak lulusan yang siap berkontribusi bagi kemajuan Kabupaten Muna dan bangsa Indonesia.
              </p>
              <div className="pt-2">
                <p className="text-sm font-bold text-amber-300">SMA NEGERI 2 WATOPUTE</p>
                <p className="text-xs text-slate-400">Kecamatan Watopute, Kabupaten Muna, Sulawesi Tenggara</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TEMUKAN KAMI (PERSIS SECTION "TEMUKAN KAMI" SMAN 1 RAHA) */}
      <section id="lokasi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Lokasi &amp; Kontak
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Temukan Kami
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kunjungi kampus SMA Negeri 2 Watopute atau hubungi kontak sekretariat resmi kami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Alamat Kampus:</span>
                  <p className="font-semibold text-slate-800 text-sm">
                    Kecamatan Watopute, Kabupaten Muna, Provinsi Sulawesi Tenggara, Kode Pos 93652.
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Telepon &amp; WhatsApp:</span>
                  <p className="font-semibold text-slate-800 text-sm">(0402) 282XXXX / 0812-XXXX-XXXX</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Email Resmi:</span>
                  <p className="font-semibold text-indigo-700 text-sm">info@sman2watopute.sch.id</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Jam Pelayanan Tata Usaha:</span>
                  <p className="font-semibold text-slate-800 text-sm">Senin – Sabtu: 07.15 – 14.30 WITA</p>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="lg:col-span-7 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 h-72 sm:h-80 flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <MapPin className="w-10 h-10 text-indigo-600 mb-2 opacity-80" />
              <h4 className="font-bold text-slate-800 text-base">Peta Lokasi SMA Negeri 2 Watopute</h4>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Kecamatan Watopute, Kabupaten Muna, Sulawesi Tenggara (Terhubung langsung ke Google Maps).
              </p>
              <Link 
                href="https://maps.google.com" 
                target="_blank" 
                className="mt-4 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow"
              >
                Buka di Google Maps &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. MITRA SEKOLAH (PERSIS SECTION "MITRA SEKOLAH" SMAN 1 RAHA) */}
      <section className="py-14 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Mitra Kerjasama Pendidikan &amp; Transformasi Digital
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-slate-300 text-xs font-semibold">
            {partners.map((partner, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl">
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FOOTER LENGKAP PERSIS SMAN 1 RAHA */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-sm">SMAN 2 WATOPUTE</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sekolah Menengah Atas Negeri di Kabupaten Muna, Provinsi Sulawesi Tenggara. Berkomitmen menghadirkan pendidikan berdaya saing dan berkarakter.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Menu Cepat</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#sambutan" className="hover:text-white transition-colors">Sambutan Kepala Sekolah</a></li>
              <li><a href="#berita" className="hover:text-white transition-colors">Berita &amp; Agenda</a></li>
              <li><a href="#prestasi" className="hover:text-white transition-colors">Prestasi Siswa</a></li>
              <li><a href="#galeri" className="hover:text-white transition-colors">Galeri Foto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Layanan Digital</h4>
            <ul className="space-y-2">
              <li><Link href="/admin" className="text-indigo-400 hover:underline">Portal SI KOLA (SIAKAD)</Link></li>
              <li><Link href="/guru" className="hover:text-white transition-colors">Portal Dewan Guru</Link></li>
              <li><Link href="/guru/walikelas" className="hover:text-white transition-colors">E-Rapor Kurikulum Merdeka</Link></li>
              <li><Link href="/admin/attendance" className="hover:text-white transition-colors">Presensi Harian Digital</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Kontak Sekolah</h4>
            <p className="text-slate-400">Kec. Watopute, Kab. Muna, Sulawesi Tenggara</p>
            <p className="text-slate-400 mt-1">Email: info@sman2watopute.sch.id</p>
            <p className="text-slate-400 mt-1">Telepon: (0402) 282XXXX</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-500">
          <p>© {currentYear} SMA Negeri 2 Watopute. Hak Cipta Dilindungi.</p>
          <p>Terhubung ke Ekosistem SI KOLA • Kabupaten Muna</p>
        </div>
      </footer>
    </div>
  );
}
