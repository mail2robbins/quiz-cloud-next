const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  // Upsert categories
  const generalCategory = await prisma.category.upsert({
    where: { name: 'General' },
    update: {},
    create: {
      name: 'General',
      description: 'General knowledge questions',
    },
  })

  const scienceCategory = await prisma.category.upsert({
    where: { name: 'Science' },
    update: {},
    create: {
      name: 'Science',
      description: 'Science-related questions',
    },
  })

  const historyCategory = await prisma.category.upsert({
    where: { name: 'History' },
    update: {},
    create: {
      name: 'History',
      description: 'History-related questions',
    },
  })

  // Create quizzes
  const generalQuiz = await prisma.quiz.create({
    data: {
      title: 'General Knowledge',
      description: 'Test your knowledge of various topics',
      categoryId: generalCategory.id,
      createdBy: 'system',
      questions: {
        create: [
          {
            text: 'What is the capital of France?',
            options: {
              create: [
                { text: 'London', isCorrect: false },
                { text: 'Paris', isCorrect: true },
                { text: 'Berlin', isCorrect: false },
                { text: 'Madrid', isCorrect: false },
              ],
            },
          },
          {
            text: 'Which planet is known as the Red Planet?',
            options: {
              create: [
                { text: 'Venus', isCorrect: false },
                { text: 'Mars', isCorrect: true },
                { text: 'Jupiter', isCorrect: false },
                { text: 'Saturn', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  })

  const scienceQuiz = await prisma.quiz.create({
    data: {
      title: 'Science Quiz',
      description: 'Questions about physics, chemistry, and biology',
      categoryId: scienceCategory.id,
      createdBy: 'system',
      questions: {
        create: [
          {
            text: 'What is the chemical symbol for water?',
            options: {
              create: [
                { text: 'H2O', isCorrect: true },
                { text: 'CO2', isCorrect: false },
                { text: 'O2', isCorrect: false },
                { text: 'H2', isCorrect: false },
              ],
            },
          },
          {
            text: 'What is the hardest natural substance on Earth?',
            options: {
              create: [
                { text: 'Gold', isCorrect: false },
                { text: 'Iron', isCorrect: false },
                { text: 'Diamond', isCorrect: true },
                { text: 'Platinum', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  })

  const historyQuiz = await prisma.quiz.create({
    data: {
      title: 'History Quiz',
      description: 'Test your knowledge of world history',
      categoryId: historyCategory.id,
      createdBy: 'system',
      questions: {
        create: [
          {
            text: 'In which year did World War II end?',
            options: {
              create: [
                { text: '1943', isCorrect: false },
                { text: '1944', isCorrect: false },
                { text: '1945', isCorrect: true },
                { text: '1946', isCorrect: false },
              ],
            },
          },
          {
            text: 'Who was the first President of the United States?',
            options: {
              create: [
                { text: 'Thomas Jefferson', isCorrect: false },
                { text: 'John Adams', isCorrect: false },
                { text: 'George Washington', isCorrect: true },
                { text: 'Benjamin Franklin', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('Database has been seeded. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 