"use client";

import Link from "next/link";
import { Brain } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <nav className="h-16 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="font-extrabold">QuizMaster</span>
        </Link>
      </nav>
    </header>
  );
} 