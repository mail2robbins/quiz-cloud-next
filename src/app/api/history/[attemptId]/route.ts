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
            category: true
          }
        }
      }
    });

    if (!attempt) {
      return new NextResponse('Quiz attempt not found', { status: 404 });
    }

    return NextResponse.json(attempt);
  } catch (error) {
    console.error('Error fetching attempt:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 