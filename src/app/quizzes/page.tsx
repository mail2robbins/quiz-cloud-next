'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LoadingOverlay from '@/components/LoadingOverlay';

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  category: {
    id: string;
    name: string;
  };
  _count: {
    questions: number;
    attempts: number;
  };
}

export default function QuizList() {
  const { data: session, status } = useSession();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = `/api/auth/signin?callbackUrl=/quizzes`;
    }
  }, [status]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          `/api/quizzes${selectedCategory ? `?category=${selectedCategory}` : ''}`
        );
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(data.map((quiz: Quiz) => quiz.category.name))
          ) as string[];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [selectedCategory]);

  if (status === 'loading' || loading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Available Quizzes</h1>
        {session?.user?.role === 'ADMIN' && (
          <Link
            href="/admin/quizzes/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Quiz
          </Link>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Filter by Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg flex flex-col"
          >
            <div className="px-4 py-5 sm:p-6 flex-grow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {quiz.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{quiz.description}</p>
              <div className="mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  {quiz.category.name}
                </span>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {quiz._count.questions} questions
                </span>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {quiz._count.attempts} {quiz._count.attempts === 1 ? 'attempt' : 'attempts'}
                </span>
              </div>
            </div>
            <div className="px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                href={`/quizzes/${quiz.id}`}
                className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Start Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No quizzes available.</p>
          {session?.user?.role === 'ADMIN' && (
            <Link
              href="/admin/quizzes/create"
              className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Create your first quiz
            </Link>
          )}
        </div>
      )}
    </div>
  );
} 