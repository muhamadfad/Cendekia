import { prisma } from "@/lib/prisma";
import { FileText, Plus, Users, Clock, CheckCircle, BookOpen, FileQuestion, Upload, MoreVertical, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { ContextFilter } from "@/components/ContextFilter";

export const dynamic = 'force-dynamic';

export default async function GuruTugasPage({ searchParams }: { searchParams: Promise<{ selected?: string, ta?: string, sem?: string }> }) {
  const resolvedParams = await searchParams;
  const selectedParam = resolvedParams.selected;
  
  const activeTA = resolvedParams.ta || "2026/2027";
  const activeSem = resolvedParams.sem || "1";

  // Ambil sesi guru
  const teacher = await prisma.teacher.findFirst({
    include: { user: true }
  });

  if (!teacher) return <div>Data Guru tidak ditemukan</div>;

  // Ambil jadwal mengajar untuk merender daftar kelas
  const schedules = await prisma.schedule.findMany({
    where: { teacherId: teacher.id },
    include: { class: true, subject: true }
  });

  const teachingAssignments: any[] = [];
  const seen = new Set();
  schedules.forEach(sch => {
    const key = `${sch.classId}-${sch.subjectId}`;
    if (!seen.has(key)) {
      seen.add(key);
      teachingAssignments.push({ cls: sch.class, sub: sch.subject, key });
    }
  });

  const activeAssignment = selectedParam 
    ? teachingAssignments.find(a => a.key === selectedParam) 
    : teachingAssignments[0];

  return (
    <div className="p-8 flex flex-col h-full">
      {/* Header & Global Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen E-Learning</h1>
          <p className="text-sm text-slate-500 mt-1">Pilih kelas terlebih dahulu untuk mengelola Modul, CBT, dan Tugas.</p>
        </div>
        <ContextFilter defaultTA={activeTA} defaultSem={activeSem} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start flex-1 min-h-0">
        
        {/* Left Sidebar: Pilih Kelas */}
        <div className="xl:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-8 h-full">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pilih Kelas & Mapel</h3>
          </div>
          
          {teachingAssignments.map((assignment, idx) => {
            const isActive = activeAssignment?.key === assignment.key;
            return (
              <Link 
                href={`/guru/tugas?selected=${assignment.key}&ta=${activeTA}&sem=${activeSem}`}
                key={idx} 
                className={`p-4 border rounded-lg cursor-pointer transition-all block group ${isActive ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm'}`}
              >
                <h4 className={`font-bold transition-colors ${isActive ? 'text-emerald-900' : 'text-slate-700 group-hover:text-emerald-700'}`}>{assignment.cls.name}</h4>
                <p className={`text-xs mt-1 transition-colors ${isActive ? 'text-emerald-700' : 'text-slate-500 group-hover:text-emerald-600'}`}>{assignment.sub.name}</p>
              </Link>
            );
          })}

          {teachingAssignments.length === 0 && (
             <div className="p-6 text-center border border-dashed border-slate-300 rounded-lg text-slate-500 bg-slate-50">
               Belum ada jadwal mengajar.
             </div>
          )}
        </div>

        {/* Right Area: Konten Kelas Terpilih */}
        <div className="xl:col-span-3 flex flex-col h-full overflow-y-auto pb-8">
          {activeAssignment ? (
            <div className="space-y-6">
              
              {/* Context Header Kelas */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{activeAssignment.cls.name} - {activeAssignment.sub.name}</h2>
                  <p className="text-xs font-semibold text-emerald-600 mt-1">Tahun Ajaran {activeTA} • Semester {activeSem === "1" ? "Ganjil" : "Genap"}</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md text-xs font-bold transition-colors shadow-sm">
                    <Upload className="w-4 h-4 text-slate-400" /> Upload Modul Baru
                  </button>
                  <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-xs font-bold transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Buat Kuis / Tugas
                  </button>
                </div>
              </div>

              {/* Konten E-Learning */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Modul Pembelajaran */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" /> Modul Materi
                    </h2>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="p-5 flex items-start justify-between hover:bg-slate-50 group transition-colors">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Bab 1: Pendahuluan Materi</h4>
                        <span className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-red-500" /> PDF (2.4 MB)</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-700"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                    <div className="p-5 flex items-start justify-between hover:bg-slate-50 group transition-colors">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Video: Latihan Soal Pembahasan</h4>
                        <span className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-indigo-500" /> MP4 (15.2 MB)</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-700"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                {/* Tugas Terstruktur */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" /> Tugas Terstruktur
                    </h2>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="border border-slate-200 rounded-lg p-4 bg-white relative overflow-hidden group hover:border-emerald-300 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-slate-800">Tugas Mandiri 1</h4>
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded border border-red-100 flex items-center gap-1"><Clock className="w-3 h-3" /> Besok</span>
                      </div>
                      <div className="flex justify-between items-center text-xs mt-3">
                        <span className="font-semibold text-slate-500">Batas Waktu: 12 Nov, 23:59</span>
                        <span className="font-bold text-emerald-600">Dikumpulkan: 18/32</span>
                      </div>
                      <button className="w-full mt-3 py-1.5 text-xs font-bold bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 rounded transition-colors">
                        Koreksi Jawaban
                      </button>
                    </div>
                  </div>
                </div>

                {/* Kuis CBT */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden lg:col-span-2">
                  <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <FileQuestion className="w-4 h-4 text-amber-500" /> Ulangan & Kuis CBT
                    </h2>
                  </div>
                  <div className="p-5 flex flex-col md:flex-row gap-4">
                    <div className="border border-slate-200 p-4 rounded-lg hover:border-amber-300 transition-colors flex-1 bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded uppercase tracking-wider border border-amber-200">Ulangan Harian</span>
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Sedang Berjalan</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">UH 1: {activeAssignment.sub.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">20 Pilihan Ganda • Waktu: 45 Menit</p>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                        <div className="text-xs font-bold text-slate-600">Selesai: 24/32 Siswa</div>
                        <button className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded transition-colors">Monitor Ujian</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-300 rounded-lg bg-slate-50/50">
               <LayoutTemplate className="w-12 h-12 text-slate-300 mb-3" />
               <p className="font-medium text-slate-600">Pilih kelas di samping</p>
               <p className="text-sm mt-1">Untuk mulai mengelola Modul dan Tugas.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
