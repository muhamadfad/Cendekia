import { ReactNode } from "react";
import Link from "next/link";
import { Users, GraduationCap, Clock, Wallet, ShieldAlert, LogOut, ChevronRight } from "lucide-react";

export default function OrangTuaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col justify-between shrink-0 h-screen sticky top-0">
        <div>
          {/* Logo */}
          <div className="h-16 px-6 border-b border-slate-200 flex items-center gap-2.5">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              C
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm tracking-tight leading-none">Cendekia</div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">Portal Wali Murid</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            <Link 
              href="/orangtua" 
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium bg-slate-100 text-slate-900 transition-colors"
            >
              <Users className="w-4 h-4 text-slate-600" /> Dashboard Pantau Anak
            </Link>
            <Link 
              href="/siswa/rapor" 
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-slate-400" /> E-Rapor Digital
            </Link>
            <Link 
              href="/siswa/finance" 
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <Wallet className="w-4 h-4 text-slate-400" /> Tagihan & SPP
            </Link>
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-200">
          <div className="p-3 bg-slate-50 rounded-md border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-semibold text-slate-900">Pusat Bantuan Sekolah</div>
            <div>Hotline Tata Usaha:</div>
            <div className="font-mono text-slate-800">021-7890-1234</div>
          </div>
          <Link href="/login" className="flex items-center gap-2 mt-3 text-[12px] font-medium text-slate-500 hover:text-rose-600 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Keluar Sesi
          </Link>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm tracking-tight leading-none">Cendekia Mobile</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">Portal Wali Murid</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/siswa/finance" className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[11px] font-semibold flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5" /> SPP
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around z-40 px-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <Link href="/orangtua" className="flex flex-col items-center justify-center text-[10px] font-semibold text-slate-900 gap-1">
          <Users className="w-5 h-5 text-slate-900" />
          <span>Pantau</span>
        </Link>
        <Link href="/siswa/rapor" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
          <GraduationCap className="w-5 h-5 text-slate-400" />
          <span>E-Rapor</span>
        </Link>
        <Link href="/siswa/finance" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
          <Wallet className="w-5 h-5 text-slate-400" />
          <span>SPP</span>
        </Link>
        <Link href="/login" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-rose-600 gap-1">
          <LogOut className="w-5 h-5 text-slate-400" />
          <span>Keluar</span>
        </Link>
      </nav>
    </div>
  );
}
