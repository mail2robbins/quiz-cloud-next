import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  selected?: boolean;
}

interface Question {
  id: string;
  text: string;
  explanation?: string;
  options: Option[];
  order: number;
}

interface AttemptDetails {
  questions: Question[];
  answers: Record<string, string>;
  startedAt: string;
}

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

    // Shuffle the questions array and ensure uniqueness by id
    const shuffledQuestions = [];
    const seenIds = new Set();
    for (const q of allQuestions.sort(() => Math.random() - 0.5)) {
      if (!seenIds.has(q.id)) {
        shuffledQuestions.push(q);
        seenIds.add(q.id);
      }
      if (shuffledQuestions.length === questionCount) break;
    }
    console.log('Selected questions:', shuffledQuestions.length);

    // Create the quiz attempt
    console.log('Creating quiz attempt...');
    const attemptDetails: AttemptDetails = {
      questions: shuffledQuestions.map((question, index) => {
        // Shuffle options for each question
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
        
        return {
          id: question.id,
          text: question.text,
          explanation: question.explanation || undefined,
          order: index,
          options: shuffledOptions.map(option => ({
            id: option.id,
            text: option.text,
            isCorrect: option.isCorrect,
            selected: false
          }))
        };
      }),
      answers: {},
      startedAt: new Date().toISOString()
    };

    const attemptData = {
      userId: user.id,
      quizId: params.id,
      score: 0,
      timeSpent: 0,
      totalQuestions: questionCount,
      correctAnswers: 0,
      attemptDetails: attemptDetails as unknown as Prisma.JsonObject
    };
    console.log('Attempt data:', JSON.stringify(attemptData, null, 2));

    const attempt = await prisma.quizAttempt.create({
      data: attemptData
    });
    console.log('Quiz attempt created:', attempt.id);

    // Return the same shuffled questions and options to the client
    const response = { 
      attemptId: attempt.id,
      questions: attemptDetails.questions.map(q => ({
        id: q.id,
        text: q.text,
        explanation: q.explanation,
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