import { Construction } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
        <Construction className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Modul Segera Hadir</h1>
      <p className="text-slate-500 max-w-md">Modul ini sedang dalam tahap pengembangan dan akan segera tersedia pada pembaruan sistem berikutnya.</p>
    </div>
  );
}
