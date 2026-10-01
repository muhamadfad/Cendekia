import Link from "next/link";
import { Search, Bell, LogOut } from "lucide-react";

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
      {sidebar}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar (Crisp & Minimal - SINGLE SOURCE OF TRUTH) */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari data, menu, atau informasi..." 
              className={`pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:bg-white outline-none transition-all w-full text-slate-700 placeholder-slate-400 focus:ring-1 ${t.focusRing}`} 
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <div className={`text-sm font-semibold text-slate-800 leading-none mb-1 transition-colors ${t.textHover}`}>{userName}</div>
                <div className="text-[11px] text-slate-500 leading-none">{userSubtitle}</div>
              </div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white text-sm ring-2 ring-transparent transition-all ${t.bgAvatar} ${t.ringAvatar}`}>
                {userAvatarText}
              </div>
            </div>

            <div className="w-px h-6 bg-slate-200 mx-1"></div>
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
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
