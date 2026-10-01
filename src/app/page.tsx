import Link from "next/link";
import { BookOpen, Users, Shield, ArrowRight, GraduationCap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Cendekia</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Beranda</a>
            <a href="#portals" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Portals</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Tentang Kami</a>
          </nav>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg">
            Masuk Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-16">
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Transformasi Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Sekolah Modern
            </span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform manajemen sekolah terpadu yang menghubungkan siswa, guru, dan administrasi dalam satu ekosistem digital yang cerdas dan efisien.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login?role=siswa" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
              Mulai Sekarang <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#portals" className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm">
              Lihat Fitur
            </a>
          </div>
        </section>

        {/* Portals Section */}
        <section id="portals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Portal Akses Terintegrasi</h2>
            <p className="text-slate-500 mt-3 text-lg">Pilih portal masuk sesuai dengan peran Anda di sekolah</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                <BookOpen className="h-7 w-7 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Portal Siswa</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Akses materi pembelajaran, cek jadwal kelas, kumpulkan tugas, dan lihat nilai e-rapor dengan mudah.
              </p>
              <Link href="/login?role=siswa" className="text-indigo-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Masuk sebagai Siswa <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Teacher Card */}
            <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                <Users className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Portal Guru</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Manajemen kelas digital, absensi real-time, input nilai otomatis, dan distribusi materi ajar.
              </p>
              <Link href="/login?role=guru" className="text-emerald-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Masuk sebagai Guru <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Admin Card */}
            <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Shield className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Portal Admin</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Pusat kendali data master, manajemen pengguna, pengaturan akademik, dan laporan sekolah.
              </p>
              <Link href="/login?role=admin" className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Masuk sebagai Admin <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-slate-300" />
            <span className="text-xl font-bold text-slate-200">Cendekia</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Sistem Manajemen Sekolah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
