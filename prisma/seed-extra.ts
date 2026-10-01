import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  console.log('Menyiapkan Data Keuangan dan Kedisiplinan...')

  const students = await prisma.student.findMany();
  
  if (students.length === 0) {
    console.log('Belum ada data siswa. Lewati seeder.');
    return;
  }

  // Hapus data lama
  await prisma.payment.deleteMany({});
  await prisma.violation.deleteMany({});

  console.log('Menyuntikkan Pembayaran SPP...');
  for (const student of students) {
    // 80% lunas, 20% nunggak
    const isPaid = Math.random() > 0.2;
    
    await prisma.payment.create({
      data: {
        id: uuidv4(),
        studentId: student.id,
        amount: 350000,
        month: 'Juli',
        year: 2026,
        status: isPaid ? 'PAID' : 'PENDING',
        paymentDate: isPaid ? new Date() : null,
      }
    });

    if (isPaid) {
      await prisma.payment.create({
        data: {
          id: uuidv4(),
          studentId: student.id,
          amount: 350000,
          month: 'Agustus',
          year: 2026,
          status: Math.random() > 0.4 ? 'PAID' : 'PENDING',
          paymentDate: Math.random() > 0.4 ? new Date() : null,
        }
      });
    }
  }

  console.log('Menyuntikkan Catatan Pelanggaran...');
  const violationTypes = [
    { title: 'Terlambat lebih dari 15 menit', points: 5 },
    { title: 'Tidak menggunakan atribut seragam lengkap', points: 5 },
    { title: 'Membolos pada jam pelajaran', points: 15 },
    { title: 'Merokok di lingkungan sekolah', points: 50 },
    { title: 'Berkelahi / Tawuran', points: 100 },
  ];

  const teachers = await prisma.teacher.findMany({ include: { user: true } });
  
  // Randomize some violations
  for (let i = 0; i < 15; i++) {
    const student = students[Math.floor(Math.random() * students.length)];
    const teacher = teachers[Math.floor(Math.random() * teachers.length)];
    const violation = violationTypes[Math.floor(Math.random() * violationTypes.length)];
    
    // Random date in the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    await prisma.violation.create({
      data: {
        id: uuidv4(),
        studentId: student.id,
        title: violation.title,
        points: violation.points,
        date: date,
        reportedBy: teacher ? teacher.user.name : 'Admin System'
      }
    });
  }

  console.log('Data tambahan berhasil disuntikkan!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
