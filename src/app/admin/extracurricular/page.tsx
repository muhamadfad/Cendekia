import { Award, Users, Calendar, Clock, MapPin, CheckCircle, Plus } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function ExtracurricularPage() {
  const activities = [
    {
      name: "Pramuka Gugus Depan (Wajib)",
      code: "ESKUL-01",
      category: "Kepemimpinan & Karakter",
      mentor: "La Ode Sudirman, S.Pd",
      schedule: "Jumat, 15.30 - 17.30 WITA",
      location: "Lapangan Utama SMAN 2 Watopute",
      membersCount: 140,
      achievements: "Juara Umum Perkemahan Penegak Kwarcab Muna 2026"
    },
    {
      name: "Paskibra Sekolah",
      code: "ESKUL-02",
      category: "Kedisiplinan & Bela Negara",
      mentor: "Wa Ode Nurhayati, S.Pd",
      schedule: "Selasa & Kamis, 16.00 - 17.30 WITA",
      location: "Halaman Upacara Bendera",
      membersCount: 28,
      achievements: "Pasukan Pengibar Bendera HUT RI Tingkat Kecamatan Watopute"
    },
    {
      name: "Palang Merah Remaja (PMR / UKS)",
      code: "ESKUL-03",
      category: "Kesehatan & Kemanusiaan",
      mentor: "Siti Rahmawati, S.Kep",
      schedule: "Rabu, 15.30 - 17.00 WITA",
      location: "Ruang Unit Kesehatan Sekolah (UKS)",
      membersCount: 22,
      achievements: "Pelayanan Medis Pertama di Kegiatan Porseni Sekolah"
    },
    {
      name: "Olahraga Bola Voli & Futsal",
      code: "ESKUL-04",
      category: "Olahraga Prestasi",
      mentor: "Arfan Hidayat, S.Pd",
      schedule: "Senin & Sabtu, 16.00 - 17.45 WITA",
      location: "Lapangan Olahraga Kampus",
      membersCount: 35,
      achievements: "Semifinalis Turnamen Voli Pelajar se-Kabupaten Muna"
    },
    {
      name: "Seni Tari & Budaya Tradisional Muna",
      code: "ESKUL-05",
      category: "Seni & Kearifan Lokal",
      mentor: "Hasnah, S.Sn",
      schedule: "Rabu, 15.00 - 17.00 WITA",
      location: "Aula Serbaguna Graha Cendekia",
      membersCount: 18,
      achievements: "Tari Persembahan Penyambutan Tamu Dinas Pendidikan Sultra"
    },
    {
      name: "Kerohanian Islam (Rohis)",
      code: "ESKUL-06",
      category: "Kerohanian & Akhlak",
      mentor: "Ustadz Mansyur, S.Pd.I",
      schedule: "Kamis, 15.30 - 17.00 WITA",
      location: "Musholla Sekolah",
      membersCount: 40,
      achievements: "Penyelenggara Peringatan Maulid Nabi & Isra Mi'raj Sekolah"
    },
    {
      name: "English Conversation Club",
      code: "ESKUL-07",
      category: "Bahasa & Literasi Global",
      mentor: "Dra. Rosmini",
      schedule: "Sabtu, 09.00 - 11.00 WITA",
      location: "Laboratorium Bahasa & Multimedia",
      membersCount: 16,
      achievements: "Finalis Lomba Pidato Bahasa Inggris Pelajar Sultra"
    },
    {
      name: "Klub Komputer & Literasi Digital",
      code: "ESKUL-08",
      category: "Teknologi & Vokasional",
      mentor: "Faisal, S.Kom",
      schedule: "Sabtu, 13.00 - 15.00 WITA",
      location: "Laboratorium Komputer CBT",
      membersCount: 20,
      achievements: "Pengelola Mading Digital & Dokumentasi Media Sekolah"
    }
  ];

  return (
    <div className="p-8 max-w-[1500px] mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded border border-indigo-200">
            Kesiswaan &amp; Pengembangan Karakter
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Ekstrakurikuler Siswa</h1>
        <p className="text-sm text-slate-500 mt-0.5">Pendataan 8 cabang ekstrakurikuler, pembina pendamping, jadwal latihan, dan capaian prestasi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((act, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.code}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {act.membersCount} Siswa
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base leading-snug">{act.name}</h3>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">{act.category}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">Pembina Pendamping:</span>
                  <span className="font-semibold text-slate-800">{act.mentor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Jadwal &amp; Tempat:</span>
                  <span className="font-medium text-slate-700">{act.schedule}</span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">{act.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Prestasi Unggulan:</span>
              <p className="text-xs font-semibold text-emerald-700 bg-emerald-50/70 border border-emerald-200 p-2 rounded">
                🏆 {act.achievements}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
