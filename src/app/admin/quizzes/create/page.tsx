'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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
    let categoryId = selectedCategoryId;
    if (categoryMode === 'new' && newCategoryName.trim()) {
      // Create new category
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      if (res.ok) {
        const created = await res.json();
        categoryId = created.id;
      } else {
        alert('Failed to create category');
        return;
      }
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
          category: categoryId,
          timeLimit,
          questions,
        }),
      });
      if (response.ok) {
        router.push('/admin/quizzes');
      } else {
        throw new Error('Failed to create quiz');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  if (session?.user?.role !== 'ADMIN') {
    return <div>Access denied</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={categoryMode === 'select' ? selectedCategoryId : '__new__'}
            onChange={handleCategoryChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time Limit (minutes)
          </label>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="1"
            required
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Questions</h2>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="border p-4 rounded-md">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Question {questionIndex + 1}
                </label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(questionIndex, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
    </div>
  );
} 