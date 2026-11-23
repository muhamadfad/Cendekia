import { prisma } from "@/lib/prisma";
import { 
  FileCheck, BookOpen, Clock, Users, Plus, Award, CheckCircle2, 
  HelpCircle, ChevronRight, Sparkles, AlertCircle
} from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import 'dayjs/locale/id';

dayjs.locale('id');
export const dynamic = 'force-dynamic';

export default async function AdminExamsPage() {
  const exams = await prisma.exam.findMany({
    include: {
      subject: true,
      class: true,
      teacher: { include: { user: true } },
      questions: true,
      results: {
        include: {
          student: { include: { user: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const totalExams = exams.length;
  const totalQuestions = exams.reduce((acc, curr) => acc + curr.questions.length, 0);
  const totalSubmissions = exams.reduce((acc, curr) => acc + curr.results.length, 0);

  return (
    <div className="p-8 max-w-[1500px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded border border-purple-200">
              Computer Based Test (CBT) Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Ujian Online &amp; Bank Soal</h1>
          <p className="text-sm text-slate-500 mt-0.5">Penyelenggaraan ujian paperless dengan pengacakan soal, timer otomatis, dan penilaian instan.</p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sesi Ujian</span>
            <FileCheck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{totalExams} <span className="text-xs font-normal text-slate-500">Sesi Ujian</span></p>
          <p className="text-xs text-slate-500 mt-1">Ujian Harian, PTS, dan PAS</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Butir Soal Terdaftar</span>
            <HelpCircle className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{totalQuestions} <span className="text-xs font-normal text-slate-500">Soal Pilihan Ganda</span></p>
          <p className="text-xs text-slate-500 mt-1">Tersimpan aman dalam bank soal</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Lembar Jawaban Terkoreksi</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-600">{totalSubmissions} <span className="text-xs font-normal text-slate-500">Siswa Telah Dinilai</span></p>
          <p className="text-xs text-slate-500 mt-1">Nilai terhitung otomatis oleh sistem</p>
        </div>
      </div>

      {/* Daftar Sesi Ujian */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-slate-900">Daftar Sesi Ujian Aktif &amp; Bank Soal</h2>

        {exams.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <FileCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Belum Ada Sesi Ujian Dibuat</h3>
            <p className="text-xs text-slate-500 mt-1">Ujian dapat dibuat oleh dewan guru pengajar melalui Portal Guru.</p>
          </div>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              {/* Header Ujian */}
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {exam.subject.name}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Kelas: {exam.class.name}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Durasi: {exam.durationMinutes} Menit
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{exam.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{exam.description || "Ujian Computer Based Test (CBT) Kurikulum Merdeka"}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-500 block">Guru Pembuat:</span>
                  <span className="text-xs font-bold text-slate-800">{exam.teacher.user.name}</span>
                </div>
              </div>

              {/* Rincian Soal dalam Ujian */}
              <div className="p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Daftar Butir Soal Terdaftar ({exam.questions.length} Butir Soal)
                </h4>

                <div className="space-y-4">
                  {exam.questions.map((q, idx) => {
                    let options: string[] = [];
                    try {
                      options = q.options ? JSON.parse(q.options) : [];
                    } catch {
                      options = [];
                    }

                    return (
                      <div key={q.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/30">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <p className="text-sm font-semibold text-slate-800">
                            <span className="text-indigo-600 font-bold mr-1.5">{idx + 1}.</span>
                            {q.questionText}
                          </p>
                          <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded shrink-0">
                            Kunci: {q.correctAnswer} ({q.points} Poin)
                          </span>
                        </div>

                        {options.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100 text-xs">
                            {options.map((opt, optIdx) => {
                              const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                              const isCorrect = letter === q.correctAnswer;
                              return (
                                <div 
                                  key={optIdx} 
                                  className={`p-2 rounded border ${
                                    isCorrect 
                                      ? 'bg-emerald-50/70 border-emerald-300 font-semibold text-emerald-900' 
                                      : 'bg-white border-slate-200 text-slate-700'
                                  }`}
                                >
                                  <span className="font-bold mr-1.5">{letter}.</span> {opt}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Hasil Pengerjaan Siswa */}
                {exam.results.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Hasil Pengerjaan Siswa ({exam.results.length} Siswa Selesai)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold">
                            <th className="pb-2">Nama Siswa</th>
                            <th className="pb-2">Waktu Selesai</th>
                            <th className="pb-2 text-right">Skor Akhir</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {exam.results.map(r => (
                            <tr key={r.id}>
                              <td className="py-2.5 font-bold text-slate-900">{r.student.user.name}</td>
                              <td className="py-2.5 text-slate-500">{dayjs(r.submittedAt).format('DD MMM YYYY, HH:mm')} WITA</td>
                              <td className="py-2.5 text-right font-black text-emerald-600">{r.score} / 100</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
