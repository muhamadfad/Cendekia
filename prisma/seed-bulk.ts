import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  console.log('Memulai injeksi data besar (Bulk Seeding)...')

  // 1. Pastikan Kelas-kelas tambahan ada
  const classNames = [
    { name: 'X IPA 1', gradeLevel: 10 },
    { name: 'X IPA 2', gradeLevel: 10 },
    { name: 'X IPA 3', gradeLevel: 10 },
    { name: 'X IPS 1', gradeLevel: 10 },
    { name: 'XI IPA 1', gradeLevel: 11 },
    { name: 'XI IPA 2', gradeLevel: 11 }
  ];

  const dbClasses = [];
  for (const c of classNames) {
    let existing = await prisma.class.findFirst({ where: { name: c.name } });
    if (!existing) {
      existing = await prisma.class.create({ data: { name: c.name, gradeLevel: c.gradeLevel } });
      console.log(`Dibuat Kelas Baru: ${c.name}`);
    }
    dbClasses.push(existing);
  }

  // 2. Data Master Nama (Indonesia)
  const firstNames = ["Ahmad", "Budi", "Siti", "Ayu", "Putra", "Dewi", "Rizky", "Rina", "Reza", "Nisa", "Kevin", "Dinda", "Fajar", "Lestari", "Hendra", "Indah", "Tegar", "Rara", "Gilang", "Vina", "Arif", "Intan"];
  const lastNames = ["Saputra", "Wijaya", "Pratama", "Santoso", "Kusuma", "Hidayat", "Setiawan", "Nugroho", "Sari", "Lestari", "Putri", "Mahendra", "Wahyudi", "Ramadhan"];

  // 3. Generate 120 Siswa (20 per kelas)
  console.log('Sedang memproses 120 siswa...');
  for (const cls of dbClasses) {
    for (let i = 0; i < 20; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const fullName = `${fName} ${lName}`;
      const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${Math.floor(Math.random() * 1000)}@siswa.com`;
      const nisn = `00${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const existing = await prisma.user.findUnique({ where: { email } });
      if (!existing) {
        await prisma.user.create({
          data: {
            id: uuidv4(),
            email,
            name: fullName,
            password: 'password123',
            role: 'STUDENT',
            studentProfile: {
              create: {
                id: uuidv4(),
                nisn,
                gender: Math.random() > 0.5 ? 'L' : 'P',
                classId: cls.id
              }
            }
          }
        });
      }
    }
    console.log(`  -> 20 Siswa ditambahkan ke ${cls.name}`);
  }

  // 4. Pastikan Mata Pelajaran ada
  const subjects = [
    { name: 'Matematika Wajib' },
    { name: 'Bahasa Indonesia' },
    { name: 'Bahasa Inggris' },
    { name: 'Fisika' },
    { name: 'Kimia' },
    { name: 'Biologi' }
  ];

  const dbSubjects = [];
  for (const s of subjects) {
    let existing = await prisma.subject.findFirst({ where: { name: s.name } });
    if (!existing) {
      existing = await prisma.subject.create({ data: { name: s.name } });
    }
    dbSubjects.push(existing);
  }

  // 5. Acak Nilai untuk semua siswa di Semester Ganjil 2026/2027
  console.log('Menyuntikkan nilai acak...');
  const allStudents = await prisma.student.findMany();
  for (const student of allStudents) {
    for (const subj of dbSubjects) {
      const existingGrade = await prisma.grade.findFirst({
        where: { studentId: student.id, subjectId: subj.id }
      });
      if (!existingGrade) {
        await prisma.grade.create({
          data: {
            studentId: student.id,
            subjectId: subj.id,
            score: Math.floor(Math.random() * (98 - 72 + 1) + 72),
            semester: 1,
            academicYear: '2026/2027'
          }
        });
      }
    }
  }

  console.log('Bulk Seeding Selesai!');
  console.log(`Total Siswa saat ini: ${allStudents.length}`);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
