import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function addSchedules() {
  console.log('Seeding schedules for Guru Budi...');
  
  const teacher = await prisma.teacher.findFirst({ where: { user: { email: "guru@sekolah.com" } }});
  const kelas = await prisma.class.findFirst({ where: { name: "X IPA 1" }});
  const math = await prisma.subject.findFirst({ where: { name: "Matematika Wajib" }});
  const physics = await prisma.subject.findFirst({ where: { name: "Fisika" }});

  if (!teacher || !kelas || !math) return console.log("Missing data");

  // Make Budi the homeroom teacher
  await prisma.class.update({
    where: { id: kelas.id },
    data: { homeroomTeacherId: teacher.id }
  });

  // Clear old schedules
  await prisma.schedule.deleteMany({});

  // Budi teaches Math and Physics to X IPA 1
  await prisma.schedule.createMany({
    data: [
      { classId: kelas.id, subjectId: math.id, teacherId: teacher.id, dayOfWeek: 1, startTime: "07:15", endTime: "08:45" },
      { classId: kelas.id, subjectId: physics.id, teacherId: teacher.id, dayOfWeek: 2, startTime: "09:00", endTime: "10:30" }
    ]
  });

  console.log('Done mapping schedules and homeroom!');
}
addSchedules().finally(() => prisma.$disconnect());
