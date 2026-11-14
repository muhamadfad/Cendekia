import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding complete ecosystem...');

  // 1. Get or create Teacher
  let teacher = await prisma.teacher.findFirst({
    include: { user: true }
  });

  if (!teacher) {
    const user = await prisma.user.create({
      data: {
        name: 'Drs. Budi Santoso, M.Pd.',
        email: 'guru@cendekia.sch.id',
        password: 'password123',
        role: 'TEACHER',
      }
    });
    teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        nip: '197508122000031001'
      },
      include: { user: true }
    });
  }

  // 2. Get or create Class
  let cls = await prisma.class.findFirst({
    where: { name: 'X IPA 1' },
    include: { students: { include: { user: true } } }
  });

  if (!cls) {
    cls = await prisma.class.create({
      data: {
        name: 'X IPA 1',
        gradeLevel: 10,
        homeroomTeacherId: teacher.id
      },
      include: { students: { include: { user: true } } }
    });
  } else if (!cls.homeroomTeacherId) {
    await prisma.class.update({
      where: { id: cls.id },
      data: { homeroomTeacherId: teacher.id }
    });
  }

  // 3. Get or create Subject
  let subject = await prisma.subject.findFirst({
    where: { name: 'Fisika' }
  });
  if (!subject) {
    subject = await prisma.subject.create({
      data: { name: 'Fisika', code: 'FIS-10' }
    });
  }

  let math = await prisma.subject.findFirst({
    where: { name: 'Matematika' }
  });
  if (!math) {
    math = await prisma.subject.create({
      data: { name: 'Matematika', code: 'MAT-10' }
    });
  }

  // Ensure schedule exists
  const existingSchedule = await prisma.schedule.findFirst({
    where: { classId: cls.id, subjectId: subject.id, teacherId: teacher.id }
  });
  if (!existingSchedule) {
    await prisma.schedule.create({
      data: {
        classId: cls.id,
        subjectId: subject.id,
        teacherId: teacher.id,
        dayOfWeek: 1, // Senin
        startTime: '07:30',
        endTime: '09:00'
      }
    });
  }

  // Ensure Student exists
  let student = await prisma.student.findFirst({
    include: { user: true }
  });
  if (!student) {
    const studentUser = await prisma.user.create({
      data: {
        name: 'Ahmad Fauzi',
        email: 'siswa@cendekia.sch.id',
        password: 'password123',
        role: 'STUDENT'
      }
    });
    student = await prisma.student.create({
      data: {
        userId: studentUser.id,
        nisn: '0081234567',
        nis: '20261001',
        classId: cls.id,
        gender: 'L',
        parentName: 'H. Joko Widodo, S.E.',
        parentPhone: '081234567890'
      },
      include: { user: true }
    });
  } else if (!student.classId) {
    await prisma.student.update({
      where: { id: student.id },
      data: { classId: cls.id }
    });
  }

  // 4. Create Parent Profile
  let parentUser = await prisma.user.findFirst({
    where: { email: 'orangtua@cendekia.sch.id' }
  });
  if (!parentUser) {
    parentUser = await prisma.user.create({
      data: {
        name: 'H. Joko Widodo, S.E. (Wali Murid)',
        email: 'orangtua@cendekia.sch.id',
        password: 'password123',
        role: 'PARENT'
      }
    });
  }

  let parent = await prisma.parent.findFirst({
    where: { userId: parentUser.id }
  });
  if (!parent) {
    parent = await prisma.parent.create({
      data: {
        userId: parentUser.id,
        phone: '081234567890',
        address: 'Jl. Merdeka No. 45, Jakarta Selatan'
      }
    });
  }

  // Link student to parent
  await prisma.student.update({
    where: { id: student.id },
    data: { parentId: parent.id }
  });

  // 5. Create E-Learning Materials
  const existingMaterial = await prisma.material.findFirst({
    where: { classId: cls.id, subjectId: subject.id }
  });
  if (!existingMaterial) {
    await prisma.material.createMany({
      data: [
        {
          title: 'Bab 1: Vektor dan Kinematika Gerak Lurus',
          content: 'Materi pengantar vektor satuan, resultan vektor, serta aplikasi GLB dan GLBB dalam kehidupan sehari-hari.',
          fileUrl: 'https://example.com/modul-vektor.pdf',
          classId: cls.id,
          subjectId: subject.id,
          teacherId: teacher.id
        },
        {
          title: 'Bab 2: Hukum Dinamika Gerak Newton (I, II, III)',
          content: 'Konsep inersia, percepatan sebanding dengan gaya neto, aksi-reaksi dan gaya gesek statis/kinetis.',
          fileUrl: 'https://example.com/modul-hukum-newton.pdf',
          classId: cls.id,
          subjectId: subject.id,
          teacherId: teacher.id
        }
      ]
    });
  }

  // 6. Create Assignments & Submissions
  let assignment = await prisma.assignment.findFirst({
    where: { classId: cls.id, subjectId: subject.id }
  });
  if (!assignment) {
    assignment = await prisma.assignment.create({
      data: {
        title: 'Tugas Praktikum Analisis Gerak Menggelinding',
        description: 'Lakukan pengamatan benda silinder menggelinding pada bidang miring. Buat laporan PDF maksimal 3 halaman lengkap dengan diagram gaya bebas dan perhitungannya.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 hari ke depan
        maxScore: 100,
        classId: cls.id,
        subjectId: subject.id,
        teacherId: teacher.id
      }
    });

    // Create Submission for the student
    await prisma.assignmentSubmission.create({
      data: {
        assignmentId: assignment.id,
        studentId: student.id,
        fileUrl: 'https://example.com/laporan_praktikum_ahmad.pdf',
        content: 'Berikut adalah laporan praktikum fisika saya untuk modul gerak menggelinding.',
        score: 92,
        feedback: 'Analisis gaya gesek sangat baik dan sistematis. Pertahankan!',
        status: 'GRADED'
      }
    });
  }

  // 7. Create CBT Exam & Questions
  let exam = await prisma.exam.findFirst({
    where: { classId: cls.id, subjectId: subject.id }
  });
  if (!exam) {
    exam = await prisma.exam.create({
      data: {
        title: 'Ulangan Harian 1: Dinamika Newton & Vektor',
        description: 'Ujian Berbasis Komputer (CBT) Waktu 45 menit. Pilih satu jawaban yang paling tepat.',
        durationMinutes: 45,
        classId: cls.id,
        subjectId: subject.id,
        teacherId: teacher.id
      }
    });

    await prisma.question.createMany({
      data: [
        {
          examId: exam.id,
          questionText: 'Sebuah balok bermassa 5 kg ditarik dengan gaya 20 N pada lantai licin. Berapakah percepatan balok tersebut?',
          options: JSON.stringify(['2 m/s²', '4 m/s²', '5 m/s²', '10 m/s²']),
          correctAnswer: 'B',
          points: 25
        },
        {
          examId: exam.id,
          questionText: 'Hukum Newton yang menjelaskan tentang kelembaman (inersia) suatu benda adalah...',
          options: JSON.stringify(['Hukum I Newton', 'Hukum II Newton', 'Hukum III Newton', 'Hukum Gravitasi']),
          correctAnswer: 'A',
          points: 25
        },
        {
          examId: exam.id,
          questionText: 'Gaya normal yang bekerja pada benda di bidang datar sebanding dengan...',
          options: JSON.stringify(['Berat benda', 'Percepatan gravitasi dikali 2', 'Gaya gesek statis', 'Nol']),
          correctAnswer: 'A',
          points: 25
        },
        {
          examId: exam.id,
          questionText: 'Satuan Standar Internasional (SI) untuk besaran Gaya adalah...',
          options: JSON.stringify(['Joule', 'Watt', 'Newton', 'Pascal']),
          correctAnswer: 'C',
          points: 25
        }
      ]
    });

    // Seed exam result
    await prisma.examResult.create({
      data: {
        examId: exam.id,
        studentId: student.id,
        score: 100
      }
    });
  }

  // 8. Homeroom Note
  const existingNote = await prisma.homeroomNote.findFirst({
    where: { studentId: student.id, classId: cls.id }
  });
  if (!existingNote) {
    await prisma.homeroomNote.create({
      data: {
        studentId: student.id,
        classId: cls.id,
        semester: 1,
        academicYear: '2026/2027',
        spiritualScore: 'Sangat Baik',
        socialScore: 'Sangat Baik',
        notes: 'Ananda Ahmad Fauzi menunjukkan kepemimpinan yang baik di kelas, aktif bertanya dalam pelajaran eksakta, dan memiliki disiplin yang tinggi. Pertahankan prestasinya!',
        rank: 1
      }
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
