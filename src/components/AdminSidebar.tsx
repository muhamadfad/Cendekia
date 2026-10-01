"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, BookOpen, LogOut, GraduationCap, Settings, Bookmark,
  Building, Calendar, FileCheck, Award, TrendingUp
} from "lucide-react";

const menuGroups = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard }
    ]
  },
  {
    title: "Master Data",
    items: [
      { name: "Master Data Siswa", href: "/admin/students", icon: Users },
      { name: "Master Data Guru", href: "/admin/teachers", icon: Users },
      { name: "Data Kelas", href: "/admin/classes", icon: BookOpen },
      { name: "Mata Pelajaran", href: "/admin/subjects", icon: Bookmark },
      { name: "Ruangan & Fasilitas", href: "/admin/rooms", icon: Building },
    ]
  },
  {
    title: "Akademik",
    items: [
      { name: "Jadwal Pelajaran", href: "/admin/schedules", icon: Calendar },
      { name: "Ujian & Bank Soal", href: "/admin/exams", icon: FileCheck },
      { name: "Rekap Nilai Siswa", href: "/admin/grades", icon: Award },
      { name: "Kenaikan Kelas", href: "/admin/promotions", icon: TrendingUp },
    ]
  },
  {
    title: "Kesiswaan & BK",
    items: [
      { name: "Poin Pelanggaran", href: "/admin/discipline", icon: Bookmark },
    ]
  },
  {
    title: "Keuangan & SPP",
    items: [
      { name: "Pembayaran SPP", href: "/admin/finance", icon: Building },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 flex flex-col z-20 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="h-14 flex items-center px-6 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900 p-1.5 rounded-md">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900">Cendekia</span>
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
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-[13px] ${
                      isActive 
                        ? "bg-slate-900 text-white font-medium shadow-md shadow-slate-900/10" 
                        : "text-slate-500 font-medium hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? "text-slate-300" : "text-slate-400"}`} /> 
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="px-4 pt-4 pb-20 border-t border-slate-200 shrink-0 bg-slate-50/50">
        <nav className="space-y-1">
          <Link 
            href="/admin/settings" 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-[13px] ${
              pathname === "/admin/settings" 
                ? "bg-slate-900 text-white font-medium shadow-md shadow-slate-900/10" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <Settings className={`w-4 h-4 ${pathname === "/admin/settings" ? "text-slate-300" : "text-slate-400"}`} /> 
            Pengaturan Sistem
          </Link>
        </nav>
      </div>
    </aside>
  );
}
