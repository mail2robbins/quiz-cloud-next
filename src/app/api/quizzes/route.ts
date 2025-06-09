import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, category, timeLimit, questions } = body;

    // Create category if it doesn't exist
    const categoryRecord = await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });

    // Create quiz with questions and options
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        categoryId: categoryRecord.id,
        timeLimit,
        createdBy: session.user.id,
        questions: {
          create: questions.map((question: any) => ({
            text: question.text,
            options: {
              create: question.options.map((option: any) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
        _count: {
          select: {
            questions: true,
            attempts: {
              where: {
                userId: session.user.id,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quizzes', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 