'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LoadingOverlay from '@/components/LoadingOverlay';

interface QuizAttempt {
  id: string;
  quiz: {
    id: string;
    title: string;
    description: string;
    category: {
      name: string;
    };
  };
  score: number;
  createdAt: string;
  timeSpent: number;
  attemptDetails: {
    questionId: string;
    questionText: string;
    options: {
      optionId: string;
      optionText: string;
      isCorrect: boolean;
      isSelected: boolean;
    }[];
  }[];
}

export default function QuizAttemptDetails({ params }: { params: { attemptId: string } }) {
  const { data: session } = useSession();
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttemptDetails = async () => {
      try {
        const response = await fetch(`/api/quizzes/attempts/${params.attemptId}`);
        if (response.ok) {
          const data = await response.json();
          setAttempt(data);
        }
      } catch (error) {
        console.error('Error fetching attempt details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttemptDetails();
  }, [params.attemptId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTimeSpent = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!attempt) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Attempt not found.</p>
          <Link
            href="/history"
            className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Back to History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/history"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          ← Back to History
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {attempt.quiz.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {attempt.quiz.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {attempt.quiz.category.name}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {attempt.score}%
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Time Spent</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatTimeSpent(attempt.timeSpent)}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Attempted on {formatDate(attempt.createdAt)}
        </p>
      </div>

      <div className="space-y-6">
        {attempt.attemptDetails.map((detail, index) => (
          <div
            key={detail.questionId}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Question {index + 1}: {detail.questionText}
            </h3>
            <div className="space-y-3">
              {detail.options.map((option) => (
                <div
                  key={option.optionId}
                  className={`p-3 rounded-lg border ${
                    option.isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : option.isSelected
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-gray-900 dark:text-gray-100">
                    {option.optionText}
                    {option.isCorrect && (
                      <span className="ml-2 text-green-600 dark:text-green-400">
                        ✓ Correct
                      </span>
                    )}
                    {option.isSelected && !option.isCorrect && (
                      <span className="ml-2 text-red-600 dark:text-red-400">
                        ✗ Your Answer
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 