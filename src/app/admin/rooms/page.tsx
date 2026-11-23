import { Building2, CheckCircle2, Users, Monitor, BookOpen, ShieldCheck, Plus, Sparkles } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function RoomsPage() {
  const rooms = [
    { name: "Lab Komputer 1 (CBT Center)", code: "LAB-CBT-01", type: "Laboratorium Komputer", capacity: "42 Unit PC", condition: "Sangat Baik (AC, LAN Gigabit)", status: "Tersedia" },
    { name: "Lab Komputer 2 (Multimedia)", code: "LAB-MM-02", type: "Laboratorium Multimedia", capacity: "38 Unit PC", condition: "Baik (AC, Projector)", status: "Tersedia" },
    { name: "Laboratorium IPA Terpadu", code: "LAB-IPA-01", type: "Laboratorium Sains", capacity: "40 Siswa", condition: "Lengkap (Mikroskop, Kit Kimia)", status: "Digunakan" },
    { name: "Perpustakaan & E-Library", code: "PERPUS-01", type: "Perpustakaan Digital", capacity: "60 Pembaca", condition: "Sangat Baik (WiFi, Tab E-Book)", status: "Tersedia" },
    { name: "Ruang Kelas X IPA 1", code: "RK-X-01", type: "Ruang Kelas Teori", capacity: "36 Siswa", condition: "Baik (Smart TV 55\", Kipas)", status: "KBM Aktif" },
    { name: "Ruang Kelas X IPA 2", code: "RK-X-02", type: "Ruang Kelas Teori", capacity: "36 Siswa", condition: "Baik (Smart TV 55\", Kipas)", status: "KBM Aktif" },
    { name: "Ruang Kelas XI IPA 1", code: "RK-XI-01", type: "Ruang Kelas Teori", capacity: "35 Siswa", condition: "Baik (Projector)", status: "KBM Aktif" },
    { name: "Ruang Kelas XII IPA 1", code: "RK-XII-01", type: "Ruang Kelas Teori", capacity: "34 Siswa", condition: "Baik (Projector)", status: "KBM Aktif" },
    { name: "Ruang Bimbingan Konseling", code: "BK-01", type: "Ruang Konseling Khusus", capacity: "6 Orang", condition: "Privasi Terjaga (Kedap Suara)", status: "Tersedia" },
    { name: "Aula Graha Cendekia", code: "AULA-01", type: "Auditorium Serbaguna", capacity: "500 Kursi", condition: "Sound System & Panggung Lengkap", status: "Tersedia" },
    { name: "Ruang Unit Kesehatan (UKS)", code: "UKS-01", type: "Kesehatan Medis", capacity: "4 Ranjang Pasien", condition: "Obat-obatan Standar Lengkap", status: "Standby" },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
              Inventaris Sarana & Prasarana
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ruangan & Fasilitas Sekolah</h1>
          <p className="text-sm text-slate-500 mt-0.5">Pendataan kapasitas dan status kesiapan fasilitas fisik untuk menunjang kegiatan belajar mengajar.</p>
        </div>
      </div>

      {/* Grid Fasilitas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rooms.map((r, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.code}</span>
                <h3 className="font-bold text-slate-900 text-base">{r.name}</h3>
                <p className="text-xs text-indigo-600 font-medium">{r.type}</p>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                r.status === 'Tersedia' || r.status === 'Standby'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}>
                {r.status}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Kapasitas:</span>
                <span className="font-semibold text-slate-800">{r.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kondisi & Fasilitas:</span>
                <span className="font-medium text-slate-700">{r.condition}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
