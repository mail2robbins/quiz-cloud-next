import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface QuizCardProps {
  quiz: {
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
  };
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {quiz.title}
          </h3>
          {quiz.description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {quiz.description}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {quiz._count.questions} questions
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {quiz._count.attempts} {quiz._count.attempts === 1 ? 'attempt' : 'attempts'}
            </span>
          </div>
          <Link
            href={`/quizzes/${quiz.id}`}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </Card>
  );
} 