import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const quizId = params.id;
  const { title, description, category, timeLimit, questions } = await req.json();

  // Upsert category by name
  const categoryRecord = await prisma.category.upsert({
    where: { name: category },
    update: {},
    create: { name: category },
  });

  // Update quiz and replace all questions/options
  const quiz = await prisma.quiz.update({
    where: { id: quizId },
    data: {
      title,
      description,
      categoryId: categoryRecord.id,
      timeLimit,
      questions: {
        deleteMany: {},
        create: questions.map((q: any) => ({
          text: q.text,
          options: {
            create: q.options.map((o: any) => ({
              text: o.text,
              isCorrect: o.isCorrect,
            })),
          },
        })),
      },
    },
    include: {
      questions: { include: { options: true } },
      category: true,
    },
  });

  return NextResponse.json(quiz);
} 