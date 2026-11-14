"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, ClipboardCheck, Award, FileText, CheckSquare, GraduationCap } from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  isSpecial?: boolean;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: "Menu Akademik",
    items: [
      { name: "Dashboard", href: "/guru", icon: LayoutDashboard },
      { name: "Jadwal Mengajar", href: "/guru/jadwal", icon: Calendar },
      { name: "Manajemen Tugas", href: "/guru/tugas", icon: ClipboardCheck },
      { name: "Input Nilai & Rapor", href: "/guru/nilai", icon: FileText },
      { name: "Manajemen Rapor (Wali Kelas)", href: "/guru/walikelas", icon: Award },
    ]
  },
  {
    title: "Administrasi",
    items: [
      { name: "Smart Absensi (QR)", href: "/guru/absensi", icon: CheckSquare, isSpecial: true },
    ]
  }
];

export function GuruSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 flex flex-col z-20 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="h-14 flex items-center px-6 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-600 p-1.5 rounded-md shadow-sm">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">Portal Guru</span>
        </div>
      </div>
      
      <div className="px-4 py-6 flex-1 overflow-y-auto pb-20">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-8">
            <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{group.title}</p>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-[13px] ${
                      item.isSpecial 
                        ? (isActive ? "bg-emerald-600 text-white font-medium shadow-md shadow-emerald-600/20" : "bg-emerald-50/50 text-emerald-700 font-medium hover:bg-emerald-100/50")
                        : (isActive 
                            ? "bg-slate-900 text-white font-medium shadow-md shadow-slate-900/10" 
                            : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100")
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? "text-slate-100" : (item.isSpecial ? "text-emerald-600" : "text-slate-400")}`} /> 
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
