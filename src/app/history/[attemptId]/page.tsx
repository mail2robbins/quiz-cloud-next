'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';

interface QuizAttempt {
  id: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  attemptDetails: {
    questions: Array<{
      id: string;
      text: string;
      explanation: string | null;
      order: number;
      options: Array<{
        id: string;
        text: string;
        isCorrect: boolean;
        selected: boolean;
      }>;
    }>;
    submittedAt: string;
    answers: Record<string, string>;
  };
  quiz: {
    title: string;
    category: {
      name: string;
    };
  };
}

export default function HistoryDetailPage({
  params
}: {
  params: { attemptId: string }
}) {
  const router = useRouter();
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const response = await fetch(`/api/history/${params.attemptId}`);
        if (!response.ok) {
          throw new Error('Failed to load attempt details');
        }
        const data = await response.json();
        setAttempt(data);
      } catch (error) {
        console.error('Error fetching attempt:', error);
        setError('Failed to load attempt details');
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [params.attemptId]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error || !attempt) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            {error || 'Failed to load attempt details'}
          </h1>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(attempt.timeSpent / 60);
  const seconds = attempt.timeSpent % 60;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="max-w-3xl mx-auto">
        {/* Quiz Info */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{attempt.quiz.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Category: {attempt.quiz.category.name}
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {attempt.correctAnswers}/{attempt.totalQuestions}
              </div>
              <div className="text-sm text-gray-500">Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {attempt.totalQuestions > 0 ? Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-500">Percentage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-500">Time Spent</div>
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {attempt.attemptDetails.questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">
                Question {index + 1}
              </h3>
              <p className="mb-4">{question.text}</p>
              
              {/* All Options */}
              <div className="space-y-2 mb-4">
                <div className="font-medium mb-2">All Options:</div>
                {question.options.map((option) => (
                  <div
                    key={option.id}
                    className={`p-3 rounded-lg border ${
                      option.selected
                        ? option.isCorrect
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        : option.isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        {option.selected && '✓ '}
                        {option.isCorrect && !option.selected && '✓ '}
                      </span>
                      {option.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected and Correct Answers */}
              <div className="space-y-2">
                {question.options.some(o => o.selected) && (
                  <div
                    className={`p-3 rounded-lg ${
                      question.options.find(o => o.selected)?.isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="font-medium">Your Answer:</div>
                    <div>{question.options.find(o => o.selected)?.text}</div>
                  </div>
                )}
                {question.options.some(o => o.selected) && !question.options.find(o => o.selected)?.isCorrect && (
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="font-medium">Correct Answer:</div>
                    <div>{question.options.find(o => o.isCorrect)?.text}</div>
                  </div>
                )}
                {question.explanation && (
                  <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="font-medium">Explanation:</div>
                    <div>{question.explanation}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => router.push('/history')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to History
          </button>
        </div>
      </div>
    </div>
  );
} 