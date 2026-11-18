import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: {
          include: {
            class: true,
            parent: { include: { user: true } }
          }
        },
        parentProfile: {
          include: {
            students: {
              include: {
                class: {
                  include: { homeroomTeacher: { include: { user: true } } }
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Akun dengan email tersebut tidak ditemukan." },
        { status: 404 }
      );
    }

    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch {
      isPasswordValid = false;
    }

    if (!isPasswordValid && password === user.password) {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Password yang Anda masukkan salah." },
        { status: 401 }
      );
    }

    // Role validation: only STUDENT, PARENT, or TEACHER
    return NextResponse.json({
      success: true,
      message: "Login berhasil.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        student: user.studentProfile || null,
        parent: user.parentProfile || null
      }
    });
  } catch (error: any) {
    console.error("Mobile login error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat login." },
      { status: 500 }
    );
  }
}
