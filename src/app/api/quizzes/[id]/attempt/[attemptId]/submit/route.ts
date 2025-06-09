import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma, QuizAttempt } from '@prisma/client';

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
  selectedAnswer?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
}

interface AttemptDetails {
  questions: Question[];
  answers: Record<string, string>;
  startedAt: string;
  completedAt?: string;
}

export async function POST(
  request: Request,
  { params }: { params: { id: string; attemptId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { answers, timeSpent } = await request.json();

    // Get the quiz attempt
    const attempt = await prisma.quizAttempt.findUnique({
      where: { id: params.attemptId },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                options: true
              }
            }
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

    // Create Answer records for each question
    const answerPromises = Object.entries(answers).map(async ([questionId, selectedOptionId]) => {
      const question = attempt.quiz.questions.find(q => q.id === questionId);
      const selectedOption = question?.options.find(o => o.id === selectedOptionId);
      
      if (!question || !selectedOption) {
        throw new Error(`Invalid question or option: ${questionId}, ${selectedOptionId}`);
      }

      return prisma.answer.create({
        data: {
          quizAttemptId: attempt.id,
          questionId,
          selectedOptionId: selectedOptionId as string,
          isCorrect: selectedOption.isCorrect
        }
      });
    });

    // Wait for all answers to be created
    const createdAnswers = await Promise.all(answerPromises);

    // Calculate total questions and correct answers
    const totalQuestions = createdAnswers.length;
    const correctAnswers = createdAnswers.filter(answer => answer.isCorrect).length;

    // Calculate score
    const score = totalQuestions > 0 
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

    // Get current attempt details
    const currentDetails = attempt.attemptDetails as unknown as AttemptDetails;

    // Update attempt details with selected options
    const updatedDetails: AttemptDetails = {
      ...currentDetails,
      questions: currentDetails.questions.map(question => ({
        ...question,
        options: question.options.map(option => ({
          ...option,
          selected: answers[question.id] === option.id
        }))
      })),
      answers,
      completedAt: new Date().toISOString()
    };

    // Update the attempt with the calculated values and updated details
    const updatedAttempt = await prisma.quizAttempt.update({
      where: { id: params.attemptId },
      data: {
        score,
        timeSpent,
        totalQuestions,
        correctAnswers,
        attemptDetails: updatedDetails as unknown as Prisma.JsonObject
      } as Prisma.QuizAttemptUpdateInput,
      include: {
        answers: {
          include: {
            question: true,
            selectedOption: true
          }
        }
      }
    });

    return NextResponse.json(updatedAttempt);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 