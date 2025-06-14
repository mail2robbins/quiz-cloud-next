import { PrismaClient } from '@prisma/client';
import historyBase from './historyQuestionsBase';
import scienceBase from './scienceQuestionsBase';
import generalBase from './generalKnowledgeQuestionsBase';

console.log('historyBase:', Array.isArray(historyBase), historyBase && historyBase.length);
console.log('scienceBase:', Array.isArray(scienceBase), scienceBase && scienceBase.length);
console.log('generalBase:', Array.isArray(generalBase), generalBase && generalBase.length);

const prismaClient = new PrismaClient();

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
  await prismaClient.quizAttempt.deleteMany();
  await prismaClient.answer.deleteMany();
  await prismaClient.option.deleteMany();
  await prismaClient.question.deleteMany();
  await prismaClient.quiz.deleteMany();
  await prismaClient.category.deleteMany();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  // Create categories
  const historyCategory = await prismaClient.category.create({
    data: {
      name: 'History',
      description: 'Questions about world history and historical events'
    }
  });

  const scienceCategory = await prismaClient.category.create({
    data: {
      name: 'Science',
      description: 'Questions about various scientific disciplines'
    }
  });

  const generalCategory = await prismaClient.category.create({
    data: {
      name: 'General Knowledge',
      description: 'Questions about various topics including geography, culture, and current events'
    }
  });

  // Create History Quiz
  // Upsert admin user (no password field)
  await prismaClient.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN' },
    create: {
      email: adminEmail,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  
  const historyQuiz = await prismaClient.quiz.create({
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
  const scienceQuiz = await prismaClient.quiz.create({
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
  const generalQuiz = await prismaClient.quiz.create({
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
    await prismaClient.$disconnect();
  }); 