import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeding database...");

  const passwordHash = await bcrypt.hash("rahasia123", 10);

  // 1. Buat Akun Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@sekolah.com" },
    update: {},
    create: {
      email: "admin@sekolah.com",
      password: passwordHash,
      name: "Administrator",
      role: "ADMIN",
    },
  });
  console.log("✅ Admin berhasil dibuat:", admin.email);

  // 2. Buat Akun Guru
  const guru = await prisma.user.upsert({
    where: { email: "guru@sekolah.com" },
    update: {},
    create: {
      email: "guru@sekolah.com",
      password: passwordHash,
      name: "Budi Guru, S.Pd",
      role: "TEACHER",
      teacherProfile: {
        create: {
          nip: "198001012010011001",
        }
      }
    },
  });
  console.log("✅ Guru berhasil dibuat:", guru.email);

  // 3. Buat Kelas
  const kelas = await prisma.class.create({
    data: {
      name: "X IPA 1",
      gradeLevel: 10,
    }
  });

  // 4. Buat Akun Siswa
  const siswa = await prisma.user.upsert({
    where: { email: "siswa@sekolah.com" },
    update: {},
    create: {
      email: "siswa@sekolah.com",
      password: passwordHash,
      name: "Siswa Teladan",
      role: "STUDENT",
      studentProfile: {
        create: {
          nisn: "0012345678",
          classId: kelas.id,
        }
      }
    },
  });
  console.log("✅ Siswa berhasil dibuat:", siswa.email);

  console.log("✨ Seeding selesai! Anda bisa login dengan password: rahasia123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
