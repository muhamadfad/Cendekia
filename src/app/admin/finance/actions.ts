'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markAsPaid(paymentId: string, studentId: string) {
  await prisma.payment.update({
    where: { id: paymentId },
    data: { 
      status: 'PAID',
      paymentDate: new Date()
    }
  });
  revalidatePath('/admin/finance/' + studentId);
  revalidatePath('/admin/finance');
}

export async function generateBulkInvoices(formData: FormData) {
  const month = formData.get("month") as string;
  const year = parseInt(formData.get("year") as string, 10);
  const amount = parseFloat(formData.get("amount") as string) || 350000;

  if (!month || isNaN(year)) return;

  const students = await prisma.student.findMany();

  for (const student of students) {
    const existing = await prisma.payment.findFirst({
      where: {
        studentId: student.id,
        month,
        year
      }
    });

    if (!existing) {
      await prisma.payment.create({
        data: {
          studentId: student.id,
          month,
          year,
          amount,
          status: 'PENDING'
        }
      });
    }
  }

  revalidatePath('/admin/finance');
}
