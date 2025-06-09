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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const body = await request.json();
    const { title, description, category, timeLimit, questions } = body;

    // Upsert category by name
    const categoryRecord = await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });

    // Update quiz and replace all questions/options
    const quiz = await prisma.quiz.update({
      where: { id },
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
  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json({ error: 'Failed to update quiz' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // Logic to delete the quiz
  // For example, delete from your database
  // await prisma.quiz.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 