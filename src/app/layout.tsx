import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import Providers from '@/components/Providers';
import { ThemeProvider } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QuizCloud',
  description: 'A journey of knowledge and discovery',
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Header />
              <main className="py-6">{children}</main>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
} 