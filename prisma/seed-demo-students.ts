import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding extra demo students...')

  // Find X IPA 1
  const classXIPA1 = await prisma.class.findFirst({
    where: { name: 'X IPA 1' }
  })

  if (!classXIPA1) {
    console.log('Class X IPA 1 not found')
    return
  }

  // Create 5 more students
  const newStudents = [
    { name: 'Andi Saputra', email: 'andi@siswa.com', nisn: '0012345680' },
    { name: 'Budi Santoso', email: 'budi@siswa.com', nisn: '0012345681' },
    { name: 'Citra Lestari', email: 'citra@siswa.com', nisn: '0012345682' },
    { name: 'Dewi Anggraini', email: 'dewi@siswa.com', nisn: '0012345683' },
    { name: 'Eko Prasetyo', email: 'eko@siswa.com', nisn: '0012345684' }
  ]

  for (const s of newStudents) {
    const existingUser = await prisma.user.findUnique({ where: { email: s.email } })
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: s.email,
          name: s.name,
          password: 'password123',
          role: 'STUDENT',
          studentProfile: {
            create: {
              nisn: s.nisn,
              classId: classXIPA1.id
            }
          }
        }
      })
      console.log(`Created ${s.name}`)
    }
  }

  // Find Fisika Subject and Matematika Wajib
  const fisika = await prisma.subject.findFirst({ where: { name: 'Fisika' } })
  const matematika = await prisma.subject.findFirst({ where: { name: 'Matematika Wajib' } })

  if (fisika && matematika) {
    const allStudents = await prisma.student.findMany({ where: { classId: classXIPA1.id } })
    for (const student of allStudents) {
      // Create grades if they don't exist
      for (const subj of [fisika, matematika]) {
        const existingGrade = await prisma.grade.findFirst({
          where: { studentId: student.id, subjectId: subj.id }
        })
        if (!existingGrade) {
          await prisma.grade.create({
            data: {
              studentId: student.id,
              subjectId: subj.id,
              score: Math.floor(Math.random() * (95 - 75 + 1) + 75), // Random between 75 and 95
              semester: 1,
              academicYear: '2026/2027'
            }
          })
        }
      }
    }
    console.log('Grades seeded.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
