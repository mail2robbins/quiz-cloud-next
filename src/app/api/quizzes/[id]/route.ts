import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        questions: {
          include: {
            options: true
          }
        },
        _count: {
          select: {
            questions: true,
            attempts: true
          }
        }
      }
    });

    if (!quiz) {
      return new NextResponse('Quiz not found', { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

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

    // If only isActive is present, handle status update
    if (Object.keys(body).length === 1 && body.isActive !== undefined) {
      if (typeof body.isActive !== 'boolean') {
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
          isActive: body.isActive,
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
    }

    // Otherwise, handle full quiz update
    const { title, description, category, timeLimit, questions } = body;
    if (!title || !category || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find or create the category
    let categoryRecord = await prisma.category.findFirst({ where: { name: category } });
    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({ data: { name: category } });
    }

    // Update the quiz
    const updatedQuiz = await prisma.quiz.update({
      where: { id: params.id },
      data: {
        title,
        description,
        categoryId: categoryRecord.id,
        timeLimit,
        questions: {
          deleteMany: {}, // Remove all old questions/options
          create: questions.map((q: any) => ({
            text: q.text,
            options: {
              create: q.options.map((o: any) => ({
                text: o.text,
                isCorrect: o.isCorrect
              }))
            }
          }))
        }
      },
      include: {
        category: true,
        questions: { include: { options: true } },
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
    console.error('Error updating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to update quiz - The quiz is already in use. Please create a copy of the quiz and make changes.', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Soft delete by setting isActive to false
    const quiz = await prisma.quiz.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json(quiz);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
} 