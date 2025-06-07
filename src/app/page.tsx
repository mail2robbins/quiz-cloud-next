'use client';

import React from 'react';
import { Header } from '../components/Header';
import { motion } from 'framer-motion';


export default function Home() {

return (
  <div className="min-h-screen">
    <Header />
    
    <div className="mt-12 space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Modern App
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A beautiful, responsive web application built with Next.js
        </p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Feature {item}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);
}