import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
) {

  const id = (await request.json()).id;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find the quiz to copy
    const quiz = await prisma.quiz.findUnique({
      where: { id: id },
      include: {
        questions: {
          include: { options: true }
        }
      }
    });
    if (!quiz) {
      return new NextResponse('Quiz not found', { status: 404 });
    }

    // Create the new quiz
    const newQuiz = await prisma.quiz.create({
      data: {
        title: quiz.title + ' (Copy)',
        description: quiz.description,
        categoryId: quiz.categoryId,
        createdBy: session.user.id,
        isPublic: quiz.isPublic,
        timeLimit: quiz.timeLimit,
        isActive: quiz.isActive,
        questions: {
          create: quiz.questions.map((q: any) => ({
            text: q.text,
            explanation: q.explanation,
            options: {
              create: q.options.map((o: any) => ({
                text: o.text,
                isCorrect: o.isCorrect
              }))
            }
          }))
        }
      }
    });

    return NextResponse.json({ newQuizId: newQuiz.id });
  } catch (error) {
    console.error('Error copying quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 