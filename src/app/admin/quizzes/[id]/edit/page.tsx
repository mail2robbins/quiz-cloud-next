"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingOverlay from '@/components/LoadingOverlay';
import Link from "next/link";
import { Trash2 } from 'lucide-react';

interface Option {
  id?: string;
  text: string;
  isCorrect: boolean;
}
interface Question {
  id?: string;
  text: string;
  options: Option[];
}
interface Category {
  id: string;
  name: string;
}

export default function EditQuiz() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const quizId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMode, setCategoryMode] = useState<'select' | 'new'>('select');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      router.replace("/");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const [quizRes, catRes] = await Promise.all([
          fetch(`/api/quizzes/${quizId}`),
          fetch('/api/categories'),
        ]);
        if (quizRes.ok && catRes.ok) {
          const quiz = await quizRes.json();
          const cats = await catRes.json();
          setTitle(quiz.title);
          setDescription(quiz.description || '');
          setTimeLimit(quiz.timeLimit || 30);
          setQuestions(
            quiz.questions.map((q: any) => ({
              id: q.id,
              text: q.text,
              options: q.options.map((o: any) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect }))
            }))
          );
          setCategories(cats);
          setSelectedCategoryId(quiz.category?.id || '');
        }
      } catch (e) {
        setError('Failed to load quiz or categories');
      } finally {
        setLoading(false);
      }
    };
    if (quizId) fetchData();
  }, [session, router, quizId]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '__new__') {
      setCategoryMode('new');
      setSelectedCategoryId('');
    } else {
      setCategoryMode('select');
      setSelectedCategoryId(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    let categoryName = '';
    if (categoryMode === 'new' && newCategoryName.trim()) {
      categoryName = newCategoryName.trim();
    } else if (categoryMode === 'select') {
      const selected = categories.find((c) => c.id === selectedCategoryId);
      categoryName = selected ? selected.name : '';
    }
    if (!categoryName) {
      setError('Please select or enter a category.');
      setSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`/api/quizzes/${quizId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category: categoryName,
          timeLimit,
          questions,
        }),
      });
      if (response.ok) {
        setSuccess('Quiz updated successfully!');
        // Optionally redirect after a delay
        // setTimeout(() => router.push('/admin/quizzes'), 1500);
      } else {
        let errorMsg = 'Failed to update quiz';
        try {
          const data = await response.json();
          if (data && data.error) errorMsg = data.error;
          else if (typeof data === 'string') errorMsg = data;
        } catch (e) {
          errorMsg = response.statusText || errorMsg;
        }
        setError(errorMsg);
      }
    } catch (error) {
      setError('Failed to update quiz');
    } finally {
      setSubmitting(false);
    }
  };

  // Handlers for questions and options
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: [{ text: '', isCorrect: false }] },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestionText = (index: number, text: string) => {
    setQuestions(
      questions.map((q, i) => (i === index ? { ...q, text } : q))
    );
  };

  const addOption = (qIdx: number) => {
    setQuestions(
      questions.map((q, i) =>
        i === qIdx
          ? { ...q, options: [...q.options, { text: '', isCorrect: false }] }
          : q
      )
    );
  };

  const removeOption = (qIdx: number, oIdx: number) => {
    setQuestions(
      questions.map((q, i) =>
        i === qIdx
          ? { ...q, options: q.options.filter((_, j) => j !== oIdx) }
          : q
      )
    );
  };

  const updateOptionText = (qIdx: number, oIdx: number, text: string) => {
    setQuestions(
      questions.map((q, i) =>
        i === qIdx
          ? {
              ...q,
              options: q.options.map((o, j) =>
                j === oIdx ? { ...o, text } : o
              ),
            }
          : q
      )
    );
  };

  const setCorrectOption = (qIdx: number, oIdx: number) => {
    setQuestions(
      questions.map((q, i) =>
        i === qIdx
          ? {
              ...q,
              options: q.options.map((o, j) => ({
                ...o,
                isCorrect: j === oIdx,
              })),
            }
          : q
      )
    );
  };

  if (loading) return <LoadingOverlay />;
  if (session?.user?.role !== "ADMIN") return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {submitting && <LoadingOverlay />}
      <h1 className="text-3xl font-bold mb-6">Edit Quiz</h1>
      {success && <div className="mb-4 text-green-600 dark:text-green-400">{success}</div>}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
          <select
            value={categoryMode === 'select' ? selectedCategoryId : '__new__'}
            onChange={handleCategoryChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required={categoryMode === 'select'}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
            <option value="__new__">Add new category...</option>
          </select>
          {categoryMode === 'new' && (
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name"
              className="mt-2 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Time Limit (minutes)</label>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            min="1"
            required
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Questions</h2>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="border p-4 rounded-md mb-4">
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">
                  Question {questionIndex + 1}
                </label>
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="ml-auto text-red-500 hover:text-red-700 text-xs p-1"
                  title="Remove Question"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={question.text}
                onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />
              <div className="mt-4 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => updateOptionText(questionIndex, optionIndex, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder={`Option ${optionIndex + 1}`}
                      required
                    />
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={option.isCorrect}
                        onChange={() => setCorrectOption(questionIndex, optionIndex)}
                        className="text-indigo-600 focus:ring-indigo-500"
                        name={`correct-${questionIndex}`}
                      />
                      <span className="ml-1 text-xs text-gray-600 dark:text-gray-300">Correct</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeOption(questionIndex, optionIndex)}
                      className="text-red-400 hover:text-red-600 text-xs p-1"
                      disabled={question.options.length <= 1}
                      title="Remove Option"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(questionIndex)}
                  className="text-sm text-indigo-600 hover:text-indigo-500 mt-2"
                >
                  Add Option
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Add Question
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
      <div className="mt-6">
        <Link href="/admin/quizzes" className="text-indigo-600 dark:text-indigo-400 hover:underline">Back to Quizzes</Link>
      </div>
    </div>
  );
} 