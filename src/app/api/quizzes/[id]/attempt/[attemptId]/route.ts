import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string; attemptId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the quiz attempt
    const attempt = await prisma.quizAttempt.findUnique({
      where: {
        id: params.attemptId,
        userId: session.user.id,
        quizId: params.id
      },
      include: {
        quiz: {
          select: {
            timeLimit: true
          }
        }
      }
    });

    if (!attempt) {
      return new NextResponse('Quiz attempt not found', { status: 404 });
    }

    // Get the questions and options from the attempt details
    const attemptDetails = attempt.attemptDetails as any;
    const questions = attemptDetails.questions || [];

    return NextResponse.json({
      id: attempt.id,
      timeLimit: attempt.quiz.timeLimit * 60, // Convert minutes to seconds
      questions: questions.map((q: any) => ({
        id: q.id,
        text: q.text,
        options: q.options.map((o: any) => ({
          id: o.id,
          text: o.text,
          isCorrect: o.isCorrect
        }))
      }))
    });
  } catch (error) {
    console.error('Error fetching quiz attempt:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 