'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function QuizResult() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz Completed!</h1>
        
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-indigo-100">
            <span className="text-4xl font-bold text-indigo-600">
              {score}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-600">
            {Number(score) >= 70
              ? 'Great job! You passed the quiz!'
              : 'Keep practicing! You can do better next time.'}
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              href="/quizzes"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Browse More Quizzes
            </Link>
            <Link
              href="/history"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 