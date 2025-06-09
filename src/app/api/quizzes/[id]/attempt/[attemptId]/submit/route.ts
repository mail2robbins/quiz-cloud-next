import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(
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
          include: {
            questions: {
              include: {
                options: true
              }
            }
          }
        }
      }
    });

    if (!attempt) {
      return new NextResponse('Quiz attempt not found', { status: 404 });
    }

    // Get the submitted answers
    const { answers } = await request.json();
    if (!answers || typeof answers !== 'object') {
      return new NextResponse('Invalid answers format', { status: 400 });
    }

    // Calculate score and create answer records
    let score = 0;
    const answerRecords = [];

    for (const [questionId, selectedOptionId] of Object.entries(answers)) {
      const question = attempt.quiz.questions.find(q => q.id === questionId);
      if (!question) continue;

      const selectedOption = question.options.find(o => o.id === selectedOptionId);
      if (!selectedOption) continue;

      const isCorrect = selectedOption.isCorrect;
      if (isCorrect) score++;

      answerRecords.push({
        quizAttemptId: attempt.id,
        questionId,
        selectedOptionId,
        isCorrect
      });
    }

    // Update the quiz attempt with the score and create answer records
    const updatedAttempt = await prisma.$transaction([
      prisma.quizAttempt.update({
        where: { id: attempt.id },
        data: {
          score,
          timeSpent: Math.floor((Date.now() - new Date(attempt.createdAt).getTime()) / 1000),
          attemptDetails: {
            ...attempt.attemptDetails,
            submittedAt: new Date().toISOString(),
            answers
          }
        }
      }),
      ...answerRecords.map(answer => 
        prisma.answer.create({
          data: answer
        })
      )
    ]);

    return NextResponse.json({
      attemptId: updatedAttempt[0].id,
      score,
      totalQuestions: attempt.quiz.questions.length,
      timeSpent: updatedAttempt[0].timeSpent
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 