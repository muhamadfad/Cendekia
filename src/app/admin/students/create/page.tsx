import { prisma } from "@/lib/prisma";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createStudent } from "../actions";

export const dynamic = 'force-dynamic';

export default async function CreateStudentPage() {
  const classes = await prisma.class.findMany({
    orderBy: [{ gradeLevel: 'asc' }, { name: 'asc' }]
  });

  return (
    <div className="p-8">
      <Link href="/admin/students" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Data Siswa
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Tambah Siswa Baru</h1>
        <p className="text-sm text-slate-500 mt-1">Lengkapi data profil dan informasi akademik siswa.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm max-w-3xl">
        <form action={createStudent} className="p-6 space-y-6">
          
          <div>
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Informasi Akun (Login)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                <input type="text" name="name" required className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Cth: Budi Santoso" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" required className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="budi@sekolah.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password Default <span className="text-red-500">*</span></label>
                <input type="text" name="password" required defaultValue="siswa123" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Data Akademik (Dapodik)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">NISN <span className="text-red-500">*</span></label>
                <input type="text" name="nisn" required className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="10 Digit Angka" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Kelamin</label>
                <select name="gender" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Plotting Rombel Awal</label>
                <select name="classId" className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                  <option value="UNASSIGNED">-- Belum Masuk Rombel --</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} (Tingkat {c.gradeLevel})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Link href="/admin/students" className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-semibold hover:bg-slate-50 transition-colors">
              Batal
            </Link>
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              <Save className="w-4 h-4" /> Simpan Data Siswa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
