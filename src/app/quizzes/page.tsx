import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Layout } from '@/components/layout'
import Link from 'next/link'

// This would typically come from your database
const quizzes = [
  {
    id: '1',
    title: 'General Knowledge',
    description: 'Test your knowledge of various topics',
    category: 'General',
    questionCount: 10,
  },
  {
    id: '2',
    title: 'Science Quiz',
    description: 'Questions about physics, chemistry, and biology',
    category: 'Science',
    questionCount: 15,
  },
  {
    id: '3',
    title: 'History Quiz',
    description: 'Test your knowledge of world history',
    category: 'History',
    questionCount: 12,
  },
]

export default function QuizzesPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Available Quizzes</h1>
        <p className="text-muted-foreground">Choose a quiz to start testing your knowledge</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Category: {quiz.category}</span>
                <span>•</span>
                <span>{quiz.questionCount} questions</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/quizzes/${quiz.id}`} className="w-full">
                <Button className="w-full">Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  )
} 