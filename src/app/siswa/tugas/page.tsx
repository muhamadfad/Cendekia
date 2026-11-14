import { prisma } from "@/lib/prisma";
import { BookOpen, FileText, Clock, ExternalLink, PlayCircle, CheckCircle2, Send, HelpCircle } from "lucide-react";
import { submitAssignment, submitCbtExam } from "./actions";

export const dynamic = 'force-dynamic';

export default async function SiswaTugasPage({ searchParams }: { searchParams: Promise<{ examId?: string }> }) {
  const resolvedParams = await searchParams;
  const activeExamId = resolvedParams.examId;

  // Get demo student session
  const student = await prisma.student.findFirst({
    include: {
      user: true,
      class: true,
      assignmentSubmissions: true,
      examResults: true
    }
  });

  if (!student || !student.classId) {
    return (
      <div className="p-8 max-w-[1200px] mx-auto">
        <div className="bg-white border border-slate-200 p-12 text-center rounded-lg shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Belum Terdaftar di Kelas</h2>
          <p className="text-[13px] text-slate-500">Akun siswa Anda belum di-plot ke rombel aktif.</p>
        </div>
      </div>
    );
  }

  // If taking CBT Exam
  if (activeExamId) {
    const exam = await prisma.exam.findUnique({
      where: { id: activeExamId },
      include: { subject: true, questions: true }
    });

    if (!exam) return <div className="p-8 text-sm text-slate-500">Ujian tidak ditemukan.</div>;

    const previousResult = await prisma.examResult.findFirst({
      where: { examId: activeExamId, studentId: student.id }
    });

    return (
      <div className="p-8 max-w-[800px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
          <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-4">
            <div>
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wide">Computer Based Test (CBT)</span>
              <h1 className="text-lg font-semibold text-slate-900 mt-1">{exam.title}</h1>
              <p className="text-[12px] text-slate-500 mt-0.5">Mata Pelajaran: {exam.subject.name} &bull; Durasi: {exam.durationMinutes} Menit</p>
            </div>
            {previousResult && (
              <div className="text-right">
                <span className="text-[11px] text-slate-500 font-semibold block">Skor Terakhir:</span>
                <span className="text-xl font-bold text-emerald-600">{previousResult.score} / 100</span>
              </div>
            )}
          </div>

          <form action={submitCbtExam} className="space-y-6">
            <input type="hidden" name="examId" value={exam.id} />
            <input type="hidden" name="studentId" value={student.id} />

            {exam.questions.map((q, idx) => {
              const options: string[] = q.options ? JSON.parse(q.options) : [];
              const letters = ['A', 'B', 'C', 'D', 'E'];

              return (
                <div key={q.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[13px] font-bold text-slate-700">{idx + 1}.</span>
                    <p className="text-[13px] text-slate-900 font-medium leading-relaxed">{q.questionText}</p>
                  </div>

                  <div className="space-y-2 pl-5">
                    {options.map((opt, oIdx) => {
                      const letter = letters[oIdx];
                      return (
                        <label key={oIdx} className="flex items-center gap-2.5 p-2 bg-white rounded border border-slate-200 hover:border-slate-300 cursor-pointer text-[12px]">
                          <input type="radio" name={`question-${q.id}`} value={letter} required className="accent-slate-900" />
                          <span className="font-bold text-slate-600">{letter}.</span>
                          <span className="text-slate-800">{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="pt-4 border-t flex justify-end gap-3">
              <a href="/siswa/tugas" className="px-4 py-2 border border-slate-200 text-slate-700 text-[13px] font-medium rounded-md hover:bg-slate-50">
                Batal
              </a>
              <button type="submit" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-medium rounded-md shadow-sm">
                Kirim Lembar Jawaban
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Main Siswa E-Learning View
  const materials = await prisma.material.findMany({
    where: { classId: student.classId },
    include: { subject: true, teacher: { include: { user: true } } },
    orderBy: { createdAt: 'desc' }
  });

  const assignments = await prisma.assignment.findMany({
    where: { classId: student.classId },
    include: {
      subject: true,
      teacher: { include: { user: true } },
      submissions: { where: { studentId: student.id } }
    },
    orderBy: { createdAt: 'desc' }
  });

  const exams = await prisma.exam.findMany({
    where: { classId: student.classId },
    include: {
      subject: true,
      questions: true,
      results: { where: { studentId: student.id } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Ruang Belajar Digital Siswa</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Kelas: <span className="font-semibold text-slate-800">{student.class?.name || '-'}</span> &bull; Akses materi modul, tugas mandiri, dan ujian online.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Assignments & Exams */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ujian CBT Section */}
          <section className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <PlayCircle className="w-4 h-4 text-rose-600" />
              <h2 className="text-[13px] font-semibold text-slate-900">Ujian Online / Kuis (CBT)</h2>
            </div>

            <div className="space-y-3">
              {exams.map(ex => {
                const result = ex.results[0];
                return (
                  <div key={ex.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 flex justify-between items-center">
                    <div>
                      <div className="text-[11px] font-bold text-rose-600 uppercase">{ex.subject.name}</div>
                      <h3 className="text-[14px] font-semibold text-slate-900 mt-0.5">{ex.title}</h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span><Clock className="w-3 h-3 inline mr-1" />{ex.durationMinutes} Menit</span>
                        <span>&bull;</span>
                        <span><HelpCircle className="w-3 h-3 inline mr-1" />{ex.questions.length} Soal Pilihan Ganda</span>
                      </div>
                    </div>

                    <div>
                      {result ? (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block uppercase font-bold">Nilai Anda:</span>
                          <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                            {result.score} / 100
                          </span>
                        </div>
                      ) : (
                        <a 
                          href={`/siswa/tugas?examId=${ex.id}`} 
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-medium rounded-md shadow-sm transition-colors"
                        >
                          Kerjakan Sekarang
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}

              {exams.length === 0 && (
                <div className="text-center py-6 text-slate-400 text-[12px]">
                  Tidak ada ujian atau kuis CBT aktif saat ini.
                </div>
              )}
            </div>
          </section>

          {/* Tugas Mandiri Section */}
          <section className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-blue-600" />
              <h2 className="text-[13px] font-semibold text-slate-900">Penugasan & Praktikum</h2>
            </div>

            <div className="space-y-4">
              {assignments.map(a => {
                const sub = a.submissions[0];
                return (
                  <div key={a.id} className="p-4 border border-slate-200 rounded-lg bg-white space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[11px] font-bold text-blue-600 uppercase">{a.subject.name}</div>
                        <h3 className="text-[14px] font-semibold text-slate-900 mt-0.5">{a.title}</h3>
                        <p className="text-[12px] text-slate-600 mt-1">{a.description}</p>
                        <div className="text-[11px] text-amber-700 font-medium mt-1">
                          Deadline: {new Date(a.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      {sub && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Sudah Dikumpulkan
                        </span>
                      )}
                    </div>

                    {/* Submission Result / Feedback if graded */}
                    {sub?.score !== null && sub?.score !== undefined && (
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[12px] space-y-1">
                        <div className="flex justify-between">
                          <span className="font-semibold text-slate-700">Nilai Guru:</span>
                          <span className="font-bold text-emerald-700">{sub.score} / 100</span>
                        </div>
                        {sub.feedback && (
                          <div className="text-slate-600 italic">&quot;{sub.feedback}&quot;</div>
                        )}
                      </div>
                    )}

                    {/* Upload / Form Kumpulkan Tugas */}
                    <form action={submitAssignment} className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2 items-end sm:items-center">
                      <input type="hidden" name="assignmentId" value={a.id} />
                      <input type="hidden" name="studentId" value={student.id} />
                      
                      <div className="flex-1 w-full space-y-1">
                        <input 
                          type="text" 
                          name="content" 
                          defaultValue={sub?.content || ''} 
                          placeholder="Catatan pengerjaan atau jawaban teks..." 
                          className="w-full px-2.5 py-1 text-[12px] border border-slate-200 rounded outline-none focus:border-slate-400" 
                        />
                        <input 
                          type="url" 
                          name="fileUrl" 
                          defaultValue={sub?.fileUrl || ''} 
                          placeholder="Tautan Google Drive / Dokumen PDF (opsional)..." 
                          className="w-full px-2.5 py-1 text-[12px] border border-slate-200 rounded outline-none focus:border-slate-400" 
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-medium rounded shadow-sm whitespace-nowrap"
                      >
                        {sub ? 'Perbarui Tugas' : 'Kumpulkan Tugas'}
                      </button>
                    </form>
                  </div>
                );
              })}

              {assignments.length === 0 && (
                <div className="text-center py-6 text-slate-400 text-[12px]">
                  Tidak ada penugasan terbuka untuk kelas Anda.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (1 Col): Modul Pembelajaran */}
        <div className="space-y-4">
          <section className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <h2 className="text-[13px] font-semibold text-slate-900">Modul & Bahan Ajar</h2>
            </div>

            <div className="space-y-3">
              {materials.map(m => (
                <div key={m.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50/50 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {m.subject.name}
                  </span>
                  <h4 className="text-[13px] font-semibold text-slate-900 mt-1">{m.title}</h4>
                  {m.content && <p className="text-[11px] text-slate-600 line-clamp-2">{m.content}</p>}
                  {m.fileUrl && (
                    <a href={m.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline pt-1">
                      <ExternalLink className="w-3 h-3" /> Unduh / Baca Materi
                    </a>
                  )}
                </div>
              ))}

              {materials.length === 0 && (
                <div className="text-center py-6 text-slate-400 text-[12px]">
                  Belum ada modul materi yang diunggah guru.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
