import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const { answers, timeSpent } = body;

    // Get the quiz with questions and correct options
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
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

    // Calculate score and prepare attempt details
    let correctAnswers = 0;
    const attemptDetails = quiz.questions.map(question => {
      const userAnswer = answers[question.id];
      const selectedOption = userAnswer 
        ? question.options.find(o => o.id === userAnswer)
        : null;
      
      const isCorrect = selectedOption?.isCorrect || false;
      if (isCorrect) correctAnswers++;

      return {
        questionId: question.id,
        questionText: question.text,
        options: question.options.map(option => ({
          optionId: option.id,
          optionText: option.text,
          isCorrect: option.isCorrect,
          isSelected: option.id === selectedOption?.id
        }))
      };
    });

    // Calculate percentage score
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    // Create quiz attempt with complete details
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId: id,
        userId: session.user.id,
        score,
        timeSpent,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        attemptDetails
      }
    });

    return NextResponse.json({ score, attemptId: attempt.id });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 