import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  selected?: boolean;
}

interface Question {
  id: string;
  text: string;
  explanation?: string;
  options: Option[];
  selectedAnswer?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
}

interface AttemptDetails {
  questions: Question[];
  answers: Record<string, string>;
  startedAt: string;
  completedAt?: string;
}

export async function POST(
  request: Request,
  { params }: { params: { id: string; attemptId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { answers, timeSpent } = body;

    // Get the quiz attempt
    const attempt = await prisma.quizAttempt.findUnique({
      where: { id: params.attemptId },
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

    // Verify ownership
    if (attempt.userId !== session.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Calculate score and prepare attempt details
    let score = 0;
    const currentDetails = attempt.attemptDetails as unknown as AttemptDetails;
    const attemptDetails = {
      ...currentDetails,
      questions: currentDetails.questions.map(question => {
        const selectedOptionId = answers[question.id];
        const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
        const isCorrect = selectedOption?.isCorrect || false;
        
        if (isCorrect) {
          score++;
        }

        return {
          ...question,
          options: question.options.map(option => ({
            ...option,
            selected: option.id === selectedOptionId
          })),
          selectedAnswer: selectedOptionId,
          correctAnswer: question.options.find(opt => opt.isCorrect)?.id,
          isCorrect
        };
      }),
      answers,
      completedAt: new Date().toISOString()
    } as Prisma.JsonObject;

    // Update the attempt
    const updatedAttempt = await prisma.quizAttempt.update({
      where: { id: params.attemptId },
      data: {
        score,
        timeSpent,
        attemptDetails
      }
    });

    return NextResponse.json({
      id: updatedAttempt.id,
      score,
      totalQuestions: currentDetails.questions.length,
      timeSpent
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 