import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
    });

    return NextResponse.json(attempts);
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 