'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';

interface QuizResult {
  attemptId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  questions: Array<{
    id: string;
    text: string;
    selectedOption: {
      id: string;
      text: string;
      isCorrect: boolean;
    };
    correctOption: {
      id: string;
      text: string;
    };
  }>;
}

export default function QuizResultsPage({
  params
}: {
  params: { id: string; attemptId: string }
}) {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/quizzes/${params.id}/attempt/${params.attemptId}/results`);
        if (!response.ok) {
          throw new Error('Failed to load quiz results');
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching results:', error);
        setError('Failed to load quiz results');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [params.id, params.attemptId]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error || !result) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            {error || 'Failed to load quiz results'}
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

  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const minutes = Math.floor(result.timeSpent / 60);
  const seconds = result.timeSpent % 60;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="max-w-3xl mx-auto">
        {/* Score Summary */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {result.score}/{result.totalQuestions}
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
          {result.questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">
                Question {index + 1}
              </h3>
              <p className="mb-4">{question.text}</p>
              <div className="space-y-2">
                <div
                  className={`p-3 rounded-lg ${
                    question.selectedOption.isCorrect
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="font-medium">Your Answer:</div>
                  <div>{question.selectedOption.text}</div>
                </div>
                {!question.selectedOption.isCorrect && (
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="font-medium">Correct Answer:</div>
                    <div>{question.correctOption.text}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => router.push('/quizzes')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Quizzes
          </button>
          <button
            onClick={() => router.push(`/quizzes/${params.id}`)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 