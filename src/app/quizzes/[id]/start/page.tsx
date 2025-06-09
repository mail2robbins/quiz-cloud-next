'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/components/LoadingOverlay';

interface Quiz {
  id: string;
  title: string;
  _count: {
    questions: number;
  };
}

export default function StartQuiz({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        console.log('Fetching quiz:', params.id);
        const response = await fetch(`/api/quizzes/${params.id}`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to load quiz: ${errorText}`);
        }

        const data = await response.json();
        console.log('Quiz data:', data);
        
        if (!data || !data._count || typeof data._count.questions !== 'number') {
          throw new Error('Invalid quiz data received');
        }

        setQuiz(data);
        // Set default question count to min(10, total questions)
        setQuestionCount(Math.min(10, data._count.questions));
      } catch (error) {
        console.error('Error in fetchQuiz:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while loading the quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.id]);

  const handleStartQuiz = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/quizzes/${params.id}/attempt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionCount }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to start quiz: ${errorText}`);
      }

      const { attemptId } = await response.json();
      router.push(`/quizzes/${params.id}/attempt/${attemptId}`);
    } catch (error) {
      console.error('Error in handleStartQuiz:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while starting the quiz');
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error || !quiz) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            {error || 'Failed to load quiz'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please try again or contact support if the problem persists.
          </p>
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">{quiz.title}</h1>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="mb-6">
            <label htmlFor="questionCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Questions
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                id="questionCount"
                min="1"
                max={quiz._count.questions}
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="flex-grow"
              />
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100 min-w-[3rem] text-center">
                {questionCount}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Choose between 1 and {quiz._count.questions} questions
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleStartQuiz}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 