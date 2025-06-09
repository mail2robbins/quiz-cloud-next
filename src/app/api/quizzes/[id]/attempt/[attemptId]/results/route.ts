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

    // Get the quiz attempt with answers
    const attempt = await prisma.quizAttempt.findUnique({
      where: {
        id: params.attemptId,
        userId: session.user.id,
        quizId: params.id
      },
      include: {
        answers: {
          include: {
            question: {
              include: {
                options: true
              }
            },
            selectedOption: true
          }
        }
      }
    });

    if (!attempt) {
      return new NextResponse('Quiz attempt not found', { status: 404 });
    }

    // Get the correct options for each question
    const questions = await prisma.question.findMany({
      where: {
        quizId: params.id
      },
      include: {
        options: true
      }
    });

    // Map the results
    const results = {
      attemptId: attempt.id,
      score: attempt.score,
      totalQuestions: questions.length,
      timeSpent: attempt.timeSpent,
      questions: attempt.answers.map(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        const correctOption = question?.options.find(o => o.isCorrect);

        return {
          id: answer.questionId,
          text: answer.question.text,
          selectedOption: {
            id: answer.selectedOptionId,
            text: answer.selectedOption.text,
            isCorrect: answer.isCorrect
          },
          correctOption: correctOption ? {
            id: correctOption.id,
            text: correctOption.text
          } : null
        };
      })
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 