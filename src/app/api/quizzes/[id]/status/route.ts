import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { isActive } = body;

    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'isActive must be a boolean value' },
        { status: 400 }
      );
    }

    // First check if the quiz exists
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: params.id },
    });

    if (!existingQuiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // Update the quiz status
    const updatedQuiz = await prisma.quiz.update({
      where: { id: params.id },
      data: {
        isActive: isActive,
      },
      include: {
        category: true,
        _count: {
          select: {
            questions: true,
            attempts: true,
          },
        },
      },
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.error('Error updating quiz status:', error);
    return NextResponse.json(
      { error: 'Failed to update quiz status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 