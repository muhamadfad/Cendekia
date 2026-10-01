import { Settings, Save, School, Globe, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Pengaturan Sistem</h1>
          <p className="text-[13px] text-slate-500 mt-1">Konfigurasi identitas sekolah dan parameter aplikasi.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors shadow-sm">
          <Save className="w-3.5 h-3.5" /> Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation / Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden shadow-sm">
            <button className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-50 border-l-2 border-slate-900 text-slate-900 font-semibold text-[13px] text-left">
              <School className="w-3.5 h-3.5" /> Identitas Sekolah
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border-l-2 border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium text-[13px] text-left transition-colors">
              <Globe className="w-3.5 h-3.5" /> Konfigurasi Web
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border-l-2 border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium text-[13px] text-left transition-colors">
              <Shield className="w-3.5 h-3.5" /> Keamanan
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">Profil Institusi</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1">Nama Sekolah</label>
                <input type="text" defaultValue="SMA Cendekia" className="w-full px-3 py-1.5 rounded border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1">NPSN</label>
                  <input type="text" defaultValue="20212345" className="w-full px-3 py-1.5 rounded border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-slate-700 mb-1">Jenjang Pendidikan</label>
                  <select defaultValue="SMA" className="w-full px-3 py-1.5 rounded border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white cursor-pointer">
                    <option value="SD">SD (Sekolah Dasar)</option>
                    <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                    <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                    <option value="SMK">SMK (Sekolah Menengah Kejuruan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1">Alamat Lengkap</label>
                <textarea rows={2} defaultValue="Jl. Pendidikan No. 123, Jakarta Selatan" className="w-full px-3 py-1.5 rounded border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">Tahun Akademik Berjalan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1">Tahun Ajaran</label>
                <select defaultValue="2026/2027" className="w-full px-3 py-1.5 rounded border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white cursor-pointer">
                  <option value="2026/2027">2026/2027</option>
                  <option value="2027/2028">2027/2028</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-700 mb-1">Semester</label>
                <select defaultValue="Ganjil" className="w-full px-3 py-1.5 rounded border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all text-[13px] text-slate-900 bg-slate-50 focus:bg-white cursor-pointer">
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
