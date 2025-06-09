import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { attemptId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const attempt = await prisma.quizAttempt.findUnique({
      where: {
        id: params.attemptId,
        userId: session.user.id, // Ensure user can only access their own attempts
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            description: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      return new NextResponse('Attempt not found', { status: 404 });
    }

    return NextResponse.json(attempt);
  } catch (error) {
    console.error('Error fetching attempt details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attempt details', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 