import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      questions: {
        include: {
          options: true,
        },
      },
    },
  });
  if (!quiz) {
    return new NextResponse('Quiz not found', { status: 404 });
  }
  return NextResponse.json(quiz);
} 