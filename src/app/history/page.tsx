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
  };
  score: number;
  startedAt: string;
  completedAt: string;
  timeSpent: number;
}

export default function QuizHistory() {
  const { data: session } = useSession();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/quizzes/history');
        if (response.ok) {
          const data = await response.json();
          setAttempts(data);
        }
      } catch (error) {
        console.error('Error fetching quiz history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Quiz History</h1>
      
      {attempts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">You haven't taken any quizzes yet.</p>
          <Link
            href="/quizzes"
            className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Browse Available Quizzes
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {attempts.map((attempt) => (
              <li key={attempt.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/quizzes/${attempt.quiz.id}`}
                        className="text-lg font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 truncate"
                      >
                        {attempt.quiz.title}
                      </Link>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Started: {formatDate(attempt.startedAt)}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                      <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Score: {attempt.score}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Time: {formatTimeSpent(attempt.timeSpent)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 