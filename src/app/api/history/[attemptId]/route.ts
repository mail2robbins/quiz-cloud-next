import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { attemptId: string } }
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
        userId: session.user.id
      },
      include: {
        quiz: {
          include: {
            category: true,
            questions: {
              include: {
                options: true
              }
            }
          }
        },
        answers: {
          include: {
            question: true,
            selectedOption: true
          }
        }
      }
    });

    if (!attempt) {
      return new NextResponse('Quiz attempt not found', { status: 404 });
    }

    // Create a map of selected options for quick lookup
    const selectedOptionsMap = attempt.answers.reduce((acc, answer) => {
      acc[answer.questionId] = answer.selectedOptionId;
      return acc;
    }, {} as Record<string, string>);

    // Format the response to include attempt details
    const formattedAttempt = {
      ...attempt,
      attemptDetails: {
        questions: attempt.quiz.questions.map(question => ({
          id: question.id,
          text: question.text,
          explanation: question.explanation,
          order: 0,
          options: question.options.map(option => ({
            id: option.id,
            text: option.text,
            isCorrect: option.isCorrect,
            selected: selectedOptionsMap[question.id] === option.id
          }))
        })),
        answers: attempt.answers.reduce((acc, answer) => ({
          ...acc,
          [answer.question.id]: answer.selectedOption.id
        }), {}),
        submittedAt: attempt.updatedAt.toISOString()
      }
    };

    return NextResponse.json(formattedAttempt);
  } catch (error) {
    console.error('Error fetching attempt:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 