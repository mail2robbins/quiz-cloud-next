"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingOverlay from '@/components/LoadingOverlay';
import ConfirmationDialog from '@/components/ConfirmationDialog';

interface Quiz {
  id: string;
  title: string;
  description: string | null;
  category: {
    name: string;
  };
  _count: {
    questions: number;
    attempts: number;
  };
  isActive: boolean;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminQuizzes() {
  const { data: session } = useSession();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  }>({ open: false, message: '', onConfirm: () => {} });
  const [alertModal, setAlertModal] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: '' });

  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      router.replace("/");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const [quizRes, catRes] = await Promise.all([
          fetch('/api/admin/quiz'),
          fetch('/api/categories'),
        ]);
        if (quizRes.ok && catRes.ok) {
          const quizData = await quizRes.json();
          const catData = await catRes.json();
          setQuizzes(quizData);
          setCategories(catData);
        }
      } catch (e) {
        setError('Failed to load quizzes or categories');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session, router]);

  const handleStatusChange = async (id: string, isActive: boolean) => {
    const action = isActive ? 'activate' : 'deactivate';
    setConfirmModal({
      open: true,
      message: `Are you sure you want to ${action} this quiz?`,
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/quizzes/${id}/status`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isActive }),
          });

          if (response.ok) {
            const updatedQuiz = await response.json();
            setQuizzes(quizzes.map(quiz => 
              quiz.id === id ? updatedQuiz : quiz
            ));
          } else {
            const error = await response.json();
            setAlertModal({ open: true, message: `Failed to ${action} quiz: ${error.error || ''}` });
          }
        } catch (error) {
          setAlertModal({ open: true, message: `Error ${action}ing quiz.` });
        }
      }
    });
  };

  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <Link
          href="/admin/quiz/create"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Quiz
        </Link>
      </div>
      <div className="mb-6 flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <ConfirmationDialog
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ ...confirmModal, open: false })}
        onConfirm={() => {
          confirmModal.onConfirm();
          setConfirmModal({ ...confirmModal, open: false });
        }}
        title="Confirm Action"
        message={confirmModal.message}
      />
      <ConfirmationDialog
        isOpen={alertModal.open}
        onClose={() => setAlertModal({ ...alertModal, open: false })}
        onConfirm={() => setAlertModal({ ...alertModal, open: false })}
        title="Notice"
        message={alertModal.message}
        confirmText="OK"
        cancelText=""
      />
      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">No quizzes found.</div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Questions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Attempts
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {quizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {quiz.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {quiz.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {quiz._count.questions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {quiz._count.attempts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        quiz.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {quiz.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex space-x-3">
                        <Link
                          href={`/admin/quiz/${quiz.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleStatusChange(quiz.id, !quiz.isActive)}
                          className={`${
                            quiz.isActive 
                              ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                              : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                          }`}
                        >
                          {quiz.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={async () => {
                            setConfirmModal({
                              open: true,
                              message: 'Are you sure you want to copy this quiz?',
                              onConfirm: async () => {
                                try {
                                  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5001';
                                  const res = await fetch(`${baseUrl}/api/admin/quiz/copy`, { method: 'POST', body: JSON.stringify({id: quiz.id}) });
                                  if (res.ok) {
                                    const data = await res.json();
                                    router.push(`/admin/quiz/${data.newQuizId}/edit`);
                                  } else {
                                    setAlertModal({ open: true, message: 'Failed to copy quiz' });
                                  }
                                } catch (e) {
                                  setAlertModal({ open: true, message: 'Failed to copy quiz' });
                                }
                              }
                            });
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Copy
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 