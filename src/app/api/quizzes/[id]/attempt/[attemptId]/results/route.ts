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
      where: { id: params.attemptId },
      include: {
        quiz: {
          include: {
            category: true
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

    // Verify ownership
    if (attempt.userId !== session.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Use only the questions from attemptDetails
    const attemptDetails = attempt.attemptDetails as any;

    const formattedAttempt = {
      ...attempt,
      attemptDetails: {
        ...attemptDetails,
        // questions: attemptDetails.questions (already correct subset)
      }
    };

    return NextResponse.json(formattedAttempt);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 