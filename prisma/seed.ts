const { PrismaClient } = require('@prisma/client');
const historyBase = require('./historyQuestionsBase').historyQuestionsBase;
const scienceBase = require('./scienceQuestionsBase').scienceQuestionsBase;
const generalBase = require('./generalKnowledgeQuestionsBase').generalKnowledgeQuestionsBase;

console.log('historyBase:', Array.isArray(historyBase), historyBase && historyBase.length);
console.log('scienceBase:', Array.isArray(scienceBase), scienceBase && scienceBase.length);
console.log('generalBase:', Array.isArray(generalBase), generalBase && generalBase.length);

const prisma = new PrismaClient();

interface Question {
  text: string;
  options: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;
}

/**
 * Helper to generate placeholder questions
 * @param {Array<{text: string, options: Array<{text: string, isCorrect: boolean}>, explanation: string}>} baseQuestions
 * @param {string} category
 */
function generateQuestions(baseQuestions: Question[], category: string): Question[] {
  const questions = [...baseQuestions];
  for (let i = baseQuestions.length + 1; i <= 100; i++) {
    questions.push({
      text: `${category} Placeholder Question #${i}`,
      options: [
        { text: `${category} Option A`, isCorrect: i % 4 === 1 },
        { text: `${category} Option B`, isCorrect: i % 4 === 2 },
        { text: `${category} Option C`, isCorrect: i % 4 === 3 },
        { text: `${category} Option D`, isCorrect: i % 4 === 0 },
      ],
      explanation: `This is a placeholder explanation for ${category} question #${i}.`
    });
  }
  return questions;
}


const historyQuestions = generateQuestions(historyBase, 'History');
const scienceQuestions = generateQuestions(scienceBase, 'Science');
const generalQuestions = generateQuestions(generalBase, 'General');

async function main() {
  // Clear existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.category.deleteMany();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  // Create categories
  const historyCategory = await prisma.category.create({
    data: {
      name: 'History',
      description: 'Questions about world history and historical events'
    }
  });

  const scienceCategory = await prisma.category.create({
    data: {
      name: 'Science',
      description: 'Questions about various scientific disciplines'
    }
  });

  const generalCategory = await prisma.category.create({
    data: {
      name: 'General Knowledge',
      description: 'Questions about various topics including geography, culture, and current events'
    }
  });

  // Create History Quiz
   // Upsert admin user (no password field)
   await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN' },
    create: {
      email: adminEmail,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  
  const historyQuiz = await prisma.quiz.create({
    data: {
      title: 'World History Quiz',
      description: 'Test your knowledge of world history from ancient civilizations to modern times',
      categoryId: historyCategory.id,
      timeLimit: 30,
      createdBy: 'system',
      questions: {
        create: historyQuestions.map(q => ({
          text: q.text,
          explanation: q.explanation,
          options: {
            create: q.options
          }
        }))
      }
    }
  });

  // Create Science Quiz
  const scienceQuiz = await prisma.quiz.create({
    data: {
      title: 'General Science Quiz',
      description: 'Test your knowledge of physics, chemistry, biology, and astronomy',
      categoryId: scienceCategory.id,
      timeLimit: 30,
      createdBy: 'system',
      questions: {
        create: scienceQuestions.map(q => ({
          text: q.text,
          explanation: q.explanation,
          options: {
            create: q.options
          }
        }))
      }
    }
  });

  // Create General Knowledge Quiz
  const generalQuiz = await prisma.quiz.create({
    data: {
      title: 'General Knowledge Quiz',
      description: 'Test your knowledge of various topics including geography, culture, and current events',
      categoryId: generalCategory.id,
      timeLimit: 30,
      createdBy: 'system',
      questions: {
        create: generalQuestions.map(q => ({
          text: q.text,
          explanation: q.explanation,
          options: {
            create: q.options
          }
        }))
      }
    }
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 