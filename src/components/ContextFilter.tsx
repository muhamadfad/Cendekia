"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

export function ContextFilter({ defaultTA, defaultSem }: { defaultTA: string, defaultSem: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleContextChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 px-2 text-slate-500 border-r border-slate-200">
        <Filter className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Konteks:</span>
      </div>
      
      <select 
        className="text-sm font-bold text-slate-800 bg-transparent outline-none cursor-pointer hover:text-emerald-600 transition-colors"
        value={defaultTA}
        onChange={(e) => handleContextChange('ta', e.target.value)}
      >
        <option value="2026/2027">T.A 2026/2027</option>
        <option value="2025/2026">T.A 2025/2026</option>
        <option value="2024/2025">T.A 2024/2025</option>
      </select>

      <div className="w-px h-4 bg-slate-300"></div>

      <select 
        className="text-sm font-bold text-slate-800 bg-transparent outline-none cursor-pointer hover:text-emerald-600 transition-colors"
        value={defaultSem}
        onChange={(e) => handleContextChange('sem', e.target.value)}
      >
        <option value="1">Semester Ganjil</option>
        <option value="2">Semester Genap</option>
      </select>
    </div>
  );
}
