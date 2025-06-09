import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Starting quiz attempt for quiz ID:', params.id);
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      console.log('No session found');
      return new NextResponse('Unauthorized', { status: 401 });
    }
    console.log('User authenticated:', session.user.id);

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      console.log('User not found in database:', session.user.id);
      return new NextResponse('User not found', { status: 404 });
    }
    console.log('User verified in database');

    const body = await request.json();
    console.log('Request body:', body);
    const { questionCount } = body;

    // Get the quiz and verify it exists
    console.log('Fetching quiz...');
    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });

    if (!quiz) {
      console.log('Quiz not found');
      return new NextResponse('Quiz not found', { status: 404 });
    }
    console.log('Quiz found:', { id: quiz.id, questionCount: quiz._count.questions });

    // Validate question count
    if (!questionCount || questionCount < 1 || questionCount > quiz._count.questions) {
      console.log('Invalid question count:', questionCount);
      return new NextResponse('Invalid question count', { status: 400 });
    }

    // Get all questions for this quiz
    console.log('Fetching questions...');
    const allQuestions = await prisma.question.findMany({
      where: { quizId: params.id },
      include: {
        options: true
      }
    });

    if (allQuestions.length === 0) {
      console.log('No questions found for quiz');
      return new NextResponse('No questions found for this quiz', { status: 400 });
    }
    console.log('Found questions:', allQuestions.length);

    // Shuffle the questions array
    const shuffledQuestions = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, questionCount);
    console.log('Selected questions:', shuffledQuestions.length);

    // Create the quiz attempt
    console.log('Creating quiz attempt...');
    const attemptData = {
      userId: user.id, // Use the verified user ID
      quizId: params.id,
      score: 0,
      timeSpent: 0,
      attemptDetails: {
        questions: shuffledQuestions.map((question, index) => ({
          id: question.id,
          text: question.text,
          order: index,
          options: question.options.map(option => ({
            id: option.id,
            text: option.text,
            isCorrect: option.isCorrect,
            selected: false
          }))
        }))
      }
    };
    console.log('Attempt data:', JSON.stringify(attemptData, null, 2));

    const attempt = await prisma.quizAttempt.create({
      data: attemptData
    });
    console.log('Quiz attempt created:', attempt.id);

    const response = { 
      attemptId: attempt.id,
      questions: shuffledQuestions.map(q => ({
        id: q.id,
        text: q.text,
        options: q.options.map(o => ({
          id: o.id,
          text: o.text,
          isCorrect: o.isCorrect
        }))
      }))
    };
    console.log('Sending response...');

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error starting quiz:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 