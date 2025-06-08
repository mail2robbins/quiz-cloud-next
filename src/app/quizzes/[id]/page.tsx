'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

export default function TakeQuiz({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setQuiz(data);
          setTimeLeft(data.timeLimit * 60); // Convert minutes to seconds
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [params.id]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/quizzes/${params.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          timeSpent: quiz?.timeLimit * 60 - timeLeft,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/quizzes/${params.id}/result?score=${result.score}`);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <div className="text-2xl font-mono bg-gray-100 px-4 py-2 rounded">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{
              width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {quiz.questions[currentQuestion].text}
        </h2>
        <div className="space-y-3">
          {quiz.questions[currentQuestion].options.map((option) => (
            <label
              key={option.id}
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name={`question-${quiz.questions[currentQuestion].id}`}
                value={option.id}
                checked={answers[quiz.questions[currentQuestion].id] === option.id}
                onChange={() =>
                  handleAnswer(quiz.questions[currentQuestion].id, option.id)
                }
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3">{option.text}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0}
          className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
} 