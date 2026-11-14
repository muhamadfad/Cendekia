import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function setup() {
  const password = await bcrypt.hash('password123', 10);

  // 1. Admin
  await prisma.user.upsert({
    where: { email: 'admin@cendekia.sch.id' },
    update: { password, role: 'ADMIN', name: 'Administrator Cendekia' },
    create: { email: 'admin@cendekia.sch.id', name: 'Administrator Cendekia', password, role: 'ADMIN' }
  });

  // 2. Guru & Wali Kelas
  let teacherUser = await prisma.user.upsert({
    where: { email: 'guru@cendekia.sch.id' },
    update: { password, role: 'TEACHER', name: 'Drs. Budi Santoso, M.Pd.' },
    create: { email: 'guru@cendekia.sch.id', name: 'Drs. Budi Santoso, M.Pd.', password, role: 'TEACHER' }
  });
  let teacher = await prisma.teacher.findFirst({ where: { userId: teacherUser.id } });
  if (!teacher) {
    teacher = await prisma.teacher.create({ data: { userId: teacherUser.id, nip: '197508122000031001' } });
  }

  // 3. Class X IPA 1
  let cls = await prisma.class.findFirst({ where: { name: 'X IPA 1' } });
  if (!cls) {
    cls = await prisma.class.create({ data: { name: 'X IPA 1', gradeLevel: 10, homeroomTeacherId: teacher.id } });
  } else {
    await prisma.class.update({ where: { id: cls.id }, data: { homeroomTeacherId: teacher.id } });
  }

  // 4. Orang Tua
  let parentUser = await prisma.user.upsert({
    where: { email: 'orangtua@cendekia.sch.id' },
    update: { password, role: 'PARENT', name: 'H. Joko Widodo, S.E. (Wali Murid)' },
    create: { email: 'orangtua@cendekia.sch.id', name: 'H. Joko Widodo, S.E. (Wali Murid)', password, role: 'PARENT' }
  });
  let parent = await prisma.parent.findFirst({ where: { userId: parentUser.id } });
  if (!parent) {
    parent = await prisma.parent.create({ data: { userId: parentUser.id, phone: '081234567890' } });
  }

  // 5. Siswa
  let studentUser = await prisma.user.upsert({
    where: { email: 'siswa@cendekia.sch.id' },
    update: { password, role: 'STUDENT', name: 'Ahmad Fauzi' },
    create: { email: 'siswa@cendekia.sch.id', name: 'Ahmad Fauzi', password, role: 'STUDENT' }
  });
  let student = await prisma.student.findFirst({ where: { userId: studentUser.id } });
  if (!student) {
    student = await prisma.student.create({
      data: {
        userId: studentUser.id,
        nisn: '0081234567',
        nis: '20261001',
        classId: cls.id,
        gender: 'L',
        parentId: parent.id,
        parentName: 'H. Joko Widodo, S.E.',
        parentPhone: '081234567890'
      }
    });
  } else {
    await prisma.student.update({ where: { id: student.id }, data: { classId: cls.id, parentId: parent.id } });
  }

  console.log('AKUN_READY');
}

setup().finally(() => prisma.$disconnect());
