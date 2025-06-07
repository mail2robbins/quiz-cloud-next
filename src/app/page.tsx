import { Button } from '@/components/ui/button'
import { Layout } from '@/components/layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to TriviaVerse</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Test your knowledge with our interactive quizzes
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/quizzes">
            <Button size="lg">Start Quiz</Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
