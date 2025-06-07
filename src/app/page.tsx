import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Brain, Trophy, Users } from 'lucide-react'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  // Fetch featured quizzes
  const featuredQuizzes = await prisma.quiz.findMany({
    take: 3,
    where: { isPublic: true },
    include: {
      category: true,
      _count: {
        select: { attempts: true }
      }
    },
    orderBy: {
      attempts: {
        _count: 'desc'
      }
    }
  })

  // Fetch categories
  const categories = await prisma.category.findMany({
    take: 4,
    include: {
      _count: {
        select: { quizzes: true }
      }
    }
  })

  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="w-full flex justify-center px-2 sm:px-4 md:px-0">
        <div className="glass w-full max-w-3xl px-4 sm:px-8 py-10 sm:py-14 text-center flex flex-col items-center gap-6 shadow-lg animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2">
            Test Your Knowledge with <span className="text-primary">Interactive Quizzes</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-4">
            Challenge yourself with our curated collection of quizzes. Learn, compete, and track your progress as you master new topics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            {session ? (
              <Button asChild size="lg" className="w-full sm:w-auto transition-all">
                <Link href="/quizzes">
                  Browse Quizzes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="w-full sm:w-auto transition-all">
                <Link href="/auth/signin">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Quizzes Section */}
      <section className="container mx-auto px-2 sm:px-4 md:px-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Featured Quizzes</h2>
          <Button variant="ghost" asChild className="w-full sm:w-auto">
            <Link href="/quizzes" className="flex items-center justify-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="glass neumorph flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium px-2 py-1 rounded bg-primary/10">
                    {quiz.category.name}
                  </span>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {quiz._count.attempts}
                  </span>
                </div>
                <CardTitle className="text-base sm:text-lg font-semibold mb-1">{quiz.title}</CardTitle>
                <CardDescription className="mb-2">{quiz.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full transition-all">
                  <Link href={`/quizzes/${quiz.id}`}>Take Quiz</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-2 sm:px-4 md:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Explore Categories</h2>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.id} className="glass neumorph group relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg font-semibold mb-1">{category.name}</CardTitle>
                <CardDescription className="mb-2">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {category._count.quizzes} quizzes available
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="w-full transition-all">
                  <Link href={`/quizzes?category=${category.id}`}>
                    Browse Category <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-2 sm:px-4 md:px-0">
        <div className="rounded-2xl glass p-6 sm:p-10 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 shadow-lg">
          <div className="flex flex-col items-center text-center gap-2">
            <Brain className="mb-2 h-10 w-10 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold">Learn & Improve</h3>
            <p className="text-sm text-muted-foreground">
              Track your progress and improve your knowledge with detailed feedback
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Trophy className="mb-2 h-10 w-10 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold">Compete & Win</h3>
            <p className="text-sm text-muted-foreground">
              Challenge yourself and compete with others on the leaderboard
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Users className="mb-2 h-10 w-10 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold">Join Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with other learners and share your quiz results
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
