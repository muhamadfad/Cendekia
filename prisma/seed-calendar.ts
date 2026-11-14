import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  console.log('Menyiapkan Kalender Akademik...')

  // Hapus data lama
  await prisma.academicCalendar.deleteMany({});

  const events = [
    {
      title: 'Tahun Baru Masehi',
      description: 'Libur Nasional Tahun Baru',
      startDate: new Date('2026-01-01T00:00:00.000Z'),
      endDate: new Date('2026-01-01T23:59:59.000Z'),
      type: 'NATIONAL_HOLIDAY',
      isHoliday: true
    },
    {
      title: 'Libur Semester Ganjil',
      description: 'Libur panjang akhir semester ganjil bagi seluruh siswa.',
      startDate: new Date('2026-12-15T00:00:00.000Z'),
      endDate: new Date('2026-12-31T23:59:59.000Z'),
      type: 'SCHOOL_HOLIDAY',
      isHoliday: true
    },
    {
      title: 'Ujian Akhir Semester (UAS)',
      description: 'UAS untuk seluruh tingkatan kelas X, XI, XII.',
      startDate: new Date('2026-12-01T00:00:00.000Z'),
      endDate: new Date('2026-12-10T23:59:59.000Z'),
      type: 'EXAM',
      isHoliday: false
    },
    {
      title: 'Porseni (Pekan Olahraga & Seni)',
      description: 'Kegiatan lomba antar kelas setelah UAS.',
      startDate: new Date('2026-12-11T00:00:00.000Z'),
      endDate: new Date('2026-12-14T23:59:59.000Z'),
      type: 'ACTIVITY',
      isHoliday: false
    },
    {
      title: 'Hari Kemerdekaan RI',
      description: 'Upacara bendera wajib bagi seluruh perangkat sekolah.',
      startDate: new Date('2026-08-17T00:00:00.000Z'),
      endDate: new Date('2026-08-17T23:59:59.000Z'),
      type: 'NATIONAL_HOLIDAY',
      isHoliday: true
    }
  ];

  for (const evt of events) {
    await prisma.academicCalendar.create({
      data: {
        id: uuidv4(),
        ...evt,
        type: evt.type as any
      }
    });
  }

  console.log('Kalender Akademik berhasil disuntikkan!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
