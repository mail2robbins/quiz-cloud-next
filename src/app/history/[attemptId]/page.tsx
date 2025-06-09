'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';

interface QuizAttempt {
  id: string;
  score: number;
  timeSpent: number;
  attemptDetails: {
    questions: Array<{
      id: string;
      text: string;
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

  const percentage = Math.round((attempt.score / attempt.attemptDetails.questions.length) * 100);
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
                {attempt.score}/{attempt.attemptDetails.questions.length}
              </div>
              <div className="text-sm text-gray-500">Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {percentage}%
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
          {attempt.attemptDetails.questions.map((question, index) => {
            const selectedOptionId = attempt.attemptDetails.answers[question.id];
            const selectedOption = question.options.find(o => o.id === selectedOptionId);
            const correctOption = question.options.find(o => o.isCorrect);

            return (
              <div
                key={question.id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">
                  Question {index + 1}
                </h3>
                <p className="mb-4">{question.text}</p>
                <div className="space-y-2">
                  {selectedOption && (
                    <div
                      className={`p-3 rounded-lg ${
                        selectedOption.isCorrect
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                      }`}
                    >
                      <div className="font-medium">Your Answer:</div>
                      <div>{selectedOption.text}</div>
                    </div>
                  )}
                  {selectedOption && !selectedOption.isCorrect && correctOption && (
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <div className="font-medium">Correct Answer:</div>
                      <div>{correctOption.text}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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