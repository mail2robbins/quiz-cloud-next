'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../app/providers';
import { motion } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { User } from 'lucide-react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <header className="py-6">
      <nav className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Modern App
          </h1>
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>

          {!session ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn()}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Sign In
            </motion.button>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu((v) => !v)}
                className="focus:outline-none"
                aria-haspopup="true"
                aria-expanded={showMenu}
              >
                <Avatar className="w-9 h-9 cursor-pointer border-2 border-indigo-500">
                  <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || 'User'} />
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="font-semibold text-gray-900 dark:text-white">{session.user?.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{session.user?.email}</div>
                  </div>
                  <button
                    onClick={() => { setShowMenu(false); signOut(); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
} 