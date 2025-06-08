"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingOverlay from '@/components/LoadingOverlay';

interface Quiz {
  id: string;
  title: string;
  category: { name: string };
  _count: { questions: number; attempts: number };
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

  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      router.replace("/");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const [quizRes, catRes] = await Promise.all([
          fetch(`/api/quizzes${selectedCategory ? `?category=${selectedCategory}` : ''}`),
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
  }, [session, router, selectedCategory]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    try {
      const res = await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setQuizzes((prev) => prev.filter((q) => q.id !== id));
      } else {
        setError('Failed to delete quiz');
      }
    } catch (e) {
      setError('Failed to delete quiz');
    }
  };

  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {loading && <LoadingOverlay />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Quizzes</h1>
        <Link
          href="/admin/quizzes/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Create Quiz
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
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : quizzes.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400">No quizzes found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-md shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Title</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Questions</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Attempts</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Created</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100 font-medium">{quiz.title}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{quiz.category?.name}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{quiz._count.questions}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{quiz._count.attempts}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{new Date(quiz.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <Link
                      href={`/admin/quizzes/${quiz.id}/edit`}
                      className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 