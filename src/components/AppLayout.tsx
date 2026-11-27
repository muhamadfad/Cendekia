import Link from "next/link";
import { 
  Search, Bell, LogOut, LayoutDashboard, Calendar, FileText, 
  Award, Bot, CheckCircle2, Users, GraduationCap, Wallet, Settings 
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  userName: string;
  userSubtitle: string;
  userAvatarText: string;
  themeColor: 'blue' | 'emerald' | 'indigo' | 'slate';
}

export function AppLayout({ 
  children, 
  sidebar, 
  userName, 
  userSubtitle, 
  userAvatarText,
  themeColor
}: AppLayoutProps) {
  
  // Dynamic color classes based on theme
  const getThemeClasses = () => {
    switch(themeColor) {
      case 'emerald': return { textHover: 'group-hover:text-emerald-600', bgAvatar: 'bg-emerald-600', ringAvatar: 'group-hover:ring-emerald-100', focusRing: 'focus:border-emerald-500 focus:ring-emerald-500' };
      case 'indigo': return { textHover: 'group-hover:text-indigo-600', bgAvatar: 'bg-indigo-600', ringAvatar: 'group-hover:ring-indigo-100', focusRing: 'focus:border-indigo-500 focus:ring-indigo-500' };
      case 'blue': return { textHover: 'group-hover:text-blue-600', bgAvatar: 'bg-blue-600', ringAvatar: 'group-hover:ring-blue-100', focusRing: 'focus:border-blue-500 focus:ring-blue-500' };
      default: return { textHover: 'group-hover:text-slate-900', bgAvatar: 'bg-slate-900', ringAvatar: 'group-hover:ring-slate-200', focusRing: 'focus:border-slate-500 focus:ring-slate-500' };
    }
  };

  const t = getThemeClasses();

  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex font-sans text-slate-900">
      {/* Desktop Sidebar (Hidden on mobile) */}
      <div className="hidden md:block shrink-0 h-full">
        {sidebar}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            {/* Mobile Branding / User summary */}
            <div className="md:hidden flex items-center gap-2.5">
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-white text-xs ${t.bgAvatar}`}>
                {userAvatarText}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">{userName}</div>
                <div className="text-[10px] text-slate-500 leading-none">{userSubtitle}</div>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block relative w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari data, menu, atau informasi..." 
                className={`pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:bg-white outline-none transition-all w-full text-slate-700 placeholder-slate-400 focus:ring-1 ${t.focusRing}`} 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            
            <div className="hidden md:flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <div className={`text-sm font-semibold text-slate-800 leading-none mb-1 transition-colors ${t.textHover}`}>{userName}</div>
                <div className="text-[11px] text-slate-500 leading-none">{userSubtitle}</div>
              </div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white text-sm ring-2 ring-transparent transition-all ${t.bgAvatar} ${t.ringAvatar}`}>
                {userAvatarText}
              </div>
            </div>

            <div className="hidden md:block w-px h-6 bg-slate-200 mx-1"></div>
            <Link 
              href="/" 
              title="Keluar / Logout"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all flex items-center justify-center"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </div>

        {/* Mobile Bottom Navigation Bar (Contextual by Role/Theme) */}
        {themeColor === 'indigo' && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around z-40 px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
            <Link href="/siswa" className="flex flex-col items-center justify-center text-[10px] font-semibold text-indigo-700 gap-1">
              <LayoutDashboard className="w-5 h-5 text-indigo-600" />
              <span>Beranda</span>
            </Link>
            <Link href="/siswa/jadwal" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <Calendar className="w-5 h-5 text-slate-400" />
              <span>Jadwal</span>
            </Link>
            <Link href="/siswa/tugas" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <FileText className="w-5 h-5 text-slate-400" />
              <span>Tugas</span>
            </Link>
            <Link href="/siswa/rapor" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <Award className="w-5 h-5 text-slate-400" />
              <span>Rapor</span>
            </Link>
            <Link href="/siswa/ai" className="flex flex-col items-center justify-center text-[10px] font-semibold text-indigo-600 gap-1">
              <Bot className="w-5 h-5 text-indigo-600" />
              <span>EduBot</span>
            </Link>
          </nav>
        )}

        {themeColor === 'emerald' && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around z-40 px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
            <Link href="/guru" className="flex flex-col items-center justify-center text-[10px] font-semibold text-emerald-700 gap-1">
              <LayoutDashboard className="w-5 h-5 text-emerald-600" />
              <span>Beranda</span>
            </Link>
            <Link href="/guru/presensi" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <CheckCircle2 className="w-5 h-5 text-slate-400" />
              <span>Presensi</span>
            </Link>
            <Link href="/guru/nilai" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <Award className="w-5 h-5 text-slate-400" />
              <span>Nilai</span>
            </Link>
            <Link href="/guru/jadwal" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <Calendar className="w-5 h-5 text-slate-400" />
              <span>Jadwal</span>
            </Link>
            <Link href="/guru/ai" className="flex flex-col items-center justify-center text-[10px] font-semibold text-emerald-600 gap-1">
              <Bot className="w-5 h-5 text-emerald-600" />
              <span>AI Guru</span>
            </Link>
          </nav>
        )}

        {themeColor === 'slate' && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around z-40 px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
            <Link href="/admin" className="flex flex-col items-center justify-center text-[10px] font-semibold text-slate-900 gap-1">
              <LayoutDashboard className="w-5 h-5 text-slate-900" />
              <span>Beranda</span>
            </Link>
            <Link href="/admin/master-data" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <Users className="w-5 h-5 text-slate-400" />
              <span>Data</span>
            </Link>
            <Link href="/admin/akademik" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <GraduationCap className="w-5 h-5 text-slate-400" />
              <span>Akademik</span>
            </Link>
            <Link href="/admin/finance" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <Wallet className="w-5 h-5 text-slate-400" />
              <span>Keuangan</span>
            </Link>
            <Link href="/admin/settings" className="flex flex-col items-center justify-center text-[10px] font-medium text-slate-500 hover:text-slate-900 gap-1">
              <Settings className="w-5 h-5 text-slate-400" />
              <span>Sistem</span>
            </Link>
          </nav>
        )}
      </main>
    </div>
  );
}
