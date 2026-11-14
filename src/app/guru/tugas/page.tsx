import { prisma } from "@/lib/prisma";
import { BookOpen, FileText, Plus, Trash2, CheckCircle2, Clock, Calendar, ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";
import { createMaterial, createAssignment, gradeSubmission, deleteMaterial, deleteAssignment } from "./actions";

export const dynamic = 'force-dynamic';

export default async function GuruTugasPage({ searchParams }: { searchParams: Promise<{ selected?: string, tab?: string }> }) {
  const resolvedParams = await searchParams;
  const selectedParam = resolvedParams.selected;
  const currentTab = resolvedParams.tab || "materi";

  const teacher = await prisma.teacher.findFirst({
    include: { user: true }
  });

  if (!teacher) return <div className="p-8 text-sm text-slate-500">Data Guru tidak ditemukan</div>;

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

  const materials = activeAssignment ? await prisma.material.findMany({
    where: { classId: activeAssignment.cls.id, subjectId: activeAssignment.sub.id },
    orderBy: { createdAt: 'desc' }
  }) : [];

  const assignments = activeAssignment ? await prisma.assignment.findMany({
    where: { classId: activeAssignment.cls.id, subjectId: activeAssignment.sub.id },
    include: {
      submissions: {
        include: { student: { include: { user: true } } }
      }
    },
    orderBy: { createdAt: 'desc' }
  }) : [];

  const exams = activeAssignment ? await prisma.exam.findMany({
    where: { classId: activeAssignment.cls.id, subjectId: activeAssignment.sub.id },
    include: {
      questions: true,
      results: { include: { student: { include: { user: true } } } }
    },
    orderBy: { createdAt: 'desc' }
  }) : [];

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Manajemen E-Learning & Tugas</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Kelola modul pembelajaran digital, penugasan siswa, dan ujian CBT.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Class Selector */}
        <div className="lg:col-span-1 space-y-2">
          <div className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Pilih Rombel</div>
          {teachingAssignments.map((assignment, idx) => {
            const isActive = activeAssignment?.key === assignment.key;
            return (
              <Link 
                href={`/guru/tugas?selected=${assignment.key}&tab=${currentTab}`}
                key={idx} 
                className={`p-3 border rounded-lg transition-all block ${isActive ? 'bg-slate-900 border-slate-900 text-white shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'}`}
              >
                <div className={`text-[13px] font-semibold ${isActive ? 'text-white' : 'text-slate-900'}`}>{assignment.cls.name}</div>
                <div className={`text-[11px] mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{assignment.sub.name}</div>
              </Link>
            );
          })}
        </div>

        {/* Right Column: LMS Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeAssignment ? (
            <>
              {/* Tabs */}
              <div className="flex items-center gap-1 border-b border-slate-200">
                <Link 
                  href={`/guru/tugas?selected=${activeAssignment.key}&tab=materi`}
                  className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-colors ${currentTab === 'materi' ? 'border-slate-900 text-slate-900 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  Modul & Materi ({materials.length})
                </Link>
                <Link 
                  href={`/guru/tugas?selected=${activeAssignment.key}&tab=tugas`}
                  className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-colors ${currentTab === 'tugas' ? 'border-slate-900 text-slate-900 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  Penugasan Siswa ({assignments.length})
                </Link>
                <Link 
                  href={`/guru/tugas?selected=${activeAssignment.key}&tab=cbt`}
                  className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-colors ${currentTab === 'cbt' ? 'border-slate-900 text-slate-900 font-semibold' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                >
                  Ujian Online / CBT ({exams.length})
                </Link>
              </div>

              {/* TAB 1: MATERI */}
              {currentTab === 'materi' && (
                <div className="space-y-6">
                  {/* Form Tambah Materi */}
                  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-[13px] font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-slate-700" /> Upload Materi Belajar Baru
                    </h3>
                    <form action={createMaterial} className="space-y-3">
                      <input type="hidden" name="classId" value={activeAssignment.cls.id} />
                      <input type="hidden" name="subjectId" value={activeAssignment.sub.id} />
                      <input type="hidden" name="teacherId" value={teacher.id} />

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Judul Materi / Bab</label>
                        <input type="text" name="title" required placeholder="Contoh: Bab 3 - Termodinamika & Gas Ideal" className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none focus:border-slate-400" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ringkasan / Instruksi</label>
                        <textarea name="content" rows={2} placeholder="Penjelasan singkat materi untuk siswa..." className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none focus:border-slate-400"></textarea>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tautan File Dokumen / Video (Google Drive / YouTube / Cloud)</label>
                        <input type="url" name="fileUrl" placeholder="https://..." className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none focus:border-slate-400" />
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button type="submit" className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-medium rounded-md shadow-sm">
                          Terbitkan Materi
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List Materi */}
                  <div className="space-y-3">
                    {materials.map(m => (
                      <div key={m.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="text-[14px] font-semibold text-slate-900">{m.title}</h4>
                          {m.content && <p className="text-[12px] text-slate-600 leading-relaxed">{m.content}</p>}
                          {m.fileUrl && (
                            <a href={m.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-blue-600 hover:underline pt-1">
                              <ExternalLink className="w-3.5 h-3.5" /> Buka Lampiran Materi
                            </a>
                          )}
                        </div>
                        <form action={deleteMaterial.bind(null, m.id)}>
                          <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors" title="Hapus Materi">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    ))}
                    {materials.length === 0 && (
                      <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-400 text-[13px]">
                        Belum ada materi pembelajaran yang diunggah untuk kelas ini.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: TUGAS */}
              {currentTab === 'tugas' && (
                <div className="space-y-6">
                  {/* Form Tambah Tugas */}
                  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-[13px] font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-slate-700" /> Terbitkan Tugas Baru
                    </h3>
                    <form action={createAssignment} className="space-y-3">
                      <input type="hidden" name="classId" value={activeAssignment.cls.id} />
                      <input type="hidden" name="subjectId" value={activeAssignment.sub.id} />
                      <input type="hidden" name="teacherId" value={teacher.id} />

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Judul Tugas</label>
                        <input type="text" name="title" required placeholder="Contoh: Tugas Mandiri Resensi Artikel Ilmiah" className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none focus:border-slate-400" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Deskripsi Petunjuk Pengerjaan</label>
                        <textarea name="description" rows={2} placeholder="Jelaskan kriteria dan format pengumpulan..." className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none focus:border-slate-400"></textarea>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Batas Waktu Pengumpulan (Deadline)</label>
                        <input type="datetime-local" name="dueDate" required className="w-full px-3 py-1.5 text-[13px] border border-slate-200 rounded-md outline-none focus:border-slate-400" />
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button type="submit" className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-medium rounded-md shadow-sm">
                          Buat Tugas
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* List Tugas & Submissions */}
                  <div className="space-y-4">
                    {assignments.map(a => (
                      <div key={a.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-[14px] font-semibold text-slate-900">{a.title}</h4>
                            <p className="text-[12px] text-slate-600 mt-1">{a.description}</p>
                            <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                              <span className="inline-flex items-center gap-1 font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                <Clock className="w-3 h-3" /> Deadline: {new Date(a.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span>&bull;</span>
                              <span>{a.submissions.length} Siswa Mengumpulkan</span>
                            </div>
                          </div>
                          <form action={deleteAssignment.bind(null, a.id)}>
                            <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors" title="Hapus Tugas">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        </div>

                        {/* Submissions Section */}
                        {a.submissions.length > 0 && (
                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            <div className="text-[12px] font-semibold text-slate-700">Hasil Pengumpulan Tugas:</div>
                            {a.submissions.map(sub => (
                              <form key={sub.id} action={gradeSubmission} className="bg-slate-50 p-3 rounded-md border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <input type="hidden" name="submissionId" value={sub.id} />
                                <div className="space-y-0.5">
                                  <div className="text-[13px] font-semibold text-slate-900">{sub.student.user.name}</div>
                                  <div className="text-[11px] text-slate-500">Teks: {sub.content || '-'}</div>
                                  {sub.fileUrl && (
                                    <a href={sub.fileUrl} target="_blank" rel="noreferrer" className="text-[11px] text-blue-600 hover:underline flex items-center gap-1">
                                      <ExternalLink className="w-3 h-3" /> Lihat Lampiran Tugas
                                    </a>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                  <input 
                                    type="number" 
                                    name="score" 
                                    defaultValue={sub.score || ''} 
                                    placeholder="Nilai (0-100)" 
                                    required 
                                    className="w-24 px-2 py-1 text-[12px] font-semibold border border-slate-200 rounded bg-white text-center" 
                                  />
                                  <input 
                                    type="text" 
                                    name="feedback" 
                                    defaultValue={sub.feedback || ''} 
                                    placeholder="Komentar / Feedback..." 
                                    className="px-2 py-1 text-[12px] border border-slate-200 rounded bg-white w-48" 
                                  />
                                  <button type="submit" className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-medium rounded shadow-sm">
                                    Beri Nilai
                                  </button>
                                </div>
                              </form>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {assignments.length === 0 && (
                      <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-400 text-[13px]">
                        Belum ada tugas yang diterbitkan.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: CBT / UJIAN */}
              {currentTab === 'cbt' && (
                <div className="space-y-4">
                  {exams.map(ex => (
                    <div key={ex.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-[14px] font-semibold text-slate-900">{ex.title}</h4>
                          <p className="text-[12px] text-slate-600 mt-1">{ex.description}</p>
                          <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Durasi: {ex.durationMinutes} Menit</span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {ex.questions.length} Soal</span>
                            <span>&bull;</span>
                            <span>{ex.results.length} Siswa Sudah Mengikuti</span>
                          </div>
                        </div>
                      </div>

                      {/* Results summary */}
                      {ex.results.length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                          <div className="text-[12px] font-semibold text-slate-700 mb-2">Rekap Nilai Siswa:</div>
                          <div className="divide-y divide-slate-100">
                            {ex.results.map(res => (
                              <div key={res.id} className="py-1.5 flex justify-between items-center text-[12px]">
                                <span className="font-medium text-slate-800">{res.student.user.name}</span>
                                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  Skor: {res.score}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {exams.length === 0 && (
                    <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-slate-400 text-[13px]">
                      Belum ada paket CBT aktif untuk kelas ini.
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white border border-slate-200 p-8 text-center rounded-lg text-slate-500 text-[13px]">
              Pilih kelas di sebelah kiri untuk melihat materi dan tugas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
