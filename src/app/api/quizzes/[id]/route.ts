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
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

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

    // First, delete all existing questions and their options
    await prisma.question.deleteMany({
      where: { quizId: id }
    });

    // Then update the quiz with new questions and options
    const quiz = await prisma.quiz.update({
      where: { id },
      data: {
        title,
        description,
        categoryId: categoryRecord.id,
        timeLimit,
        questions: {
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
        questions: {
          include: {
            options: true,
          },
        },
        category: true,
      },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to update quiz - This quiz is already in use', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = params;
  try {
    // First delete all related records
    await prisma.answer.deleteMany({
      where: {
        question: {
          quizId: id
        }
      }
    });

    await prisma.option.deleteMany({
      where: {
        question: {
          quizId: id
        }
      }
    });

    await prisma.question.deleteMany({
      where: {
        quizId: id
      }
    });

    await prisma.quizAttempt.deleteMany({
      where: {
        quizId: id
      }
    });

    // Finally delete the quiz
    await prisma.quiz.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json(
      { error: 'Failed to delete quiz - This quiz is already in use', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 