import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { QuizAttempt } from '@prisma/client';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const timeFrame = searchParams.get('timeFrame') || 'all';

    // Calculate the date range based on timeFrame
    const now = new Date();
    let startDate: Date | undefined;

    switch (timeFrame) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        startDate = undefined; // 'all' time frame
    }

    // Get all users with their quiz attempts
    const users = await prisma.user.findMany({
      where: {
        quizAttempts: startDate ? {
          some: {
            updatedAt: {
              gte: startDate,
            },
          },
        } : undefined,
      },
      select: {
        id: true,
        name: true,
        image: true,
        quizAttempts: {
          where: startDate ? {
            updatedAt: {
              gte: startDate,
            },
          } : undefined,
          select: {
            score: true,
            updatedAt: true,
          },
        },
      },
    });

    // Calculate leaderboard entries
    const leaderboard = users
      .map(user => {
        const attempts = user.quizAttempts;
        const totalScore = attempts.reduce((sum: number, attempt: { score: number }) => sum + attempt.score, 0);
        const averageScore = attempts.length > 0 ? totalScore / attempts.length : 0;
        const latestAttempt = attempts.length > 0 
          ? attempts.reduce((latest: { updatedAt: Date }, current: { updatedAt: Date }) => 
              current.updatedAt > latest.updatedAt ? current : latest
            ).updatedAt
          : new Date();

        return {
          user: {
            id: user.id,
            name: user.name || 'Anonymous',
            image: user.image,
          },
          totalScore,
          quizzesTaken: attempts.length,
          averageScore,
          date: latestAttempt.toISOString(),
        };
      })
      .filter(entry => entry.quizzesTaken > 0) // Only include users who have taken quizzes
      .sort((a, b) => b.averageScore - a.averageScore) // Sort by average score
      .slice(0, 100); // Limit to top 100

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 