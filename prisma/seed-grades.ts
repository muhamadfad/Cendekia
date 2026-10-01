import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function addGrades() {
  console.log('Seeding subjects and grades...');
  
  const subjects = ['Matematika Wajib', 'Fisika', 'Bahasa Indonesia'];
  const createdSubjects = [];
  
  for (const name of subjects) {
    let sub = await prisma.subject.findFirst({ where: { name } });
    if (!sub) {
      sub = await prisma.subject.create({ data: { name } });
    }
    createdSubjects.push(sub);
  }
  
  const student = await prisma.student.findFirst({ where: { nisn: '0012345678' } });
  if (!student) {
    console.log("No student found");
    return;
  }

  // Clear existing grades
  await prisma.grade.deleteMany({});

  // Add Grades for Ganjil 2026/2027
  await prisma.grade.createMany({
    data: [
      { studentId: student.id, subjectId: createdSubjects[0].id, score: 89.5, semester: 1, academicYear: '2026/2027' },
      { studentId: student.id, subjectId: createdSubjects[1].id, score: 93.0, semester: 1, academicYear: '2026/2027' },
      { studentId: student.id, subjectId: createdSubjects[2].id, score: 86.2, semester: 1, academicYear: '2026/2027' }
    ]
  });

  // Add Grades for Genap 2026/2027 (so we can test filtering)
  await prisma.grade.createMany({
    data: [
      { studentId: student.id, subjectId: createdSubjects[0].id, score: 92.0, semester: 2, academicYear: '2026/2027' },
      { studentId: student.id, subjectId: createdSubjects[1].id, score: 95.0, semester: 2, academicYear: '2026/2027' },
      { studentId: student.id, subjectId: createdSubjects[2].id, score: 89.0, semester: 2, academicYear: '2026/2027' }
    ]
  });

  console.log('Done seeding grades!');
}
addGrades().finally(() => prisma.$disconnect());
