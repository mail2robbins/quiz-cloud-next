'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingOverlay from '@/components/LoadingOverlay';

interface Question {
  text: string;
  options: { text: string; isCorrect: boolean }[];
}

interface Category { id: string; name: string; }

export default function CreateQuiz() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [timeLimit, setTimeLimit] = useState(30); // in minutes
  const [questions, setQuestions] = useState<Question[]>([
    { text: '', options: [{ text: '', isCorrect: false }] },
  ]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMode, setCategoryMode] = useState<'select' | 'new'>('select');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: [{ text: '', isCorrect: false }] },
    ]);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ text: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const updateQuestion = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    text: string,
    isCorrect: boolean
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = { text, isCorrect };
    setQuestions(newQuestions);
  };

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch {}
    };
    fetchCategories();
  }, []);

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
    if (submitting) return;
    setSubmitting(true);

    // Check if all questions have a correct answer
    const questionsWithoutCorrectAnswer = questions.filter(
      (q) => !q.options.some((o) => o.isCorrect)
    );
    if (questionsWithoutCorrectAnswer.length > 0) {
      setModalMessage(`Please select a correct answer for all questions.`);
      setSubmitting(false);
      return;
    }

    setError('');
    setSuccess('');
    let categoryName = '';
    if (categoryMode === 'new' && newCategoryName.trim()) {
      categoryName = newCategoryName.trim();
    } else if (categoryMode === 'select') {
      const selected = categories.find((c) => c.id === selectedCategoryId);
      categoryName = selected ? selected.name : '';
    }
    if (!categoryName) {
      setError('Please select or enter a category.');
      return;
    }
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          category: categoryName,
          timeLimit,
          questions,
        }),
      });
      if (response.ok) {
        setSuccess('Quiz created successfully!');
        setTitle('');
        setDescription('');
        setCategoryMode('select');
        setSelectedCategoryId('');
        setNewCategoryName('');
        setTimeLimit(30);
        setQuestions([{ text: '', options: [{ text: '', isCorrect: false }] }]);
      } else {
        let errorMsg = 'Failed to create quiz';
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
      setError('Failed to create quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (session?.user?.role !== 'ADMIN') {
    return <div>Access denied</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {submitting && <LoadingOverlay />}
      <h1 className="text-3xl font-bold mb-6">Create New Quiz</h1>
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Description
          </label>
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Time Limit (minutes)
          </label>
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
            <div key={questionIndex} className="border p-4 rounded-md">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Question {questionIndex + 1}
                </label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(questionIndex, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) =>
                        updateOption(
                          questionIndex,
                          optionIndex,
                          e.target.value,
                          option.isCorrect
                        )
                      }
                      className="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder={`Option ${optionIndex + 1}`}
                      required
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(e) =>
                          updateOption(
                            questionIndex,
                            optionIndex,
                            option.text,
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Correct</span>
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(questionIndex)}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
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
            Create Quiz
          </button>
        </div>
      </form>
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 