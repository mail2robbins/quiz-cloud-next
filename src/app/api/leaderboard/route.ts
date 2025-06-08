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
    const { searchParams } = new URL(req.url);
    const timeFrame = searchParams.get('timeFrame') || 'all';

    const startDate = new Date();
    if (timeFrame === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (timeFrame === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else {
      startDate.setFullYear(2000); // All time
    }

    const leaderboard = await prisma.user.findMany({
      where: {
        quizAttempts: {
          some: {
            startedAt: {
              gte: startDate,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        quizAttempts: {
          where: {
            startedAt: {
              gte: startDate,
            },
          },
          select: {
            score: true,
          },
        },
      },
      orderBy: {
        quizAttempts: {
          _count: 'desc',
        },
      },
      take: 100,
    });

    const formattedLeaderboard = leaderboard
      .map((user) => {
        const totalScore = user.quizAttempts.reduce(
          (sum, attempt) => sum + attempt.score,
          0
        );
        const averageScore =
          totalScore / (user.quizAttempts.length || 1);

        return {
          user: {
            id: user.id,
            name: user.name,
            image: user.image,
          },
          totalScore,
          quizzesTaken: user.quizAttempts.length,
          averageScore,
        };
      })
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 10);

    return NextResponse.json(formattedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 