import { ReactNode } from "react";
import Link from "next/link";
import { Users, GraduationCap, Clock, Wallet, ShieldAlert, LogOut, ChevronRight } from "lucide-react";

export default function OrangTuaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
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
        <div className="p-4 border-t border-slate-200 pb-20">
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
