import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { answers, timeSpent } = body;

    // Get the quiz with questions and correct options
    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
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

    // Calculate score
    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;

    for (const question of quiz.questions) {
      const selectedOptionId = answers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(
          (option) => option.id === selectedOptionId
        );
        if (selectedOption?.isCorrect) {
          correctAnswers++;
        }
      }
    }

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Create quiz attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId: params.id,
        score,
        timeSpent,
        answers: {
          create: Object.entries(answers).map(([questionId, optionId]) => ({
            questionId,
            selectedOptionId: optionId as string,
            isCorrect: quiz.questions
              .find((q) => q.id === questionId)
              ?.options.find((o) => o.id === optionId)?.isCorrect || false,
          })),
        },
      },
    });

    return NextResponse.json({ score, attemptId: attempt.id });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 