'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";
import type { ClientSafeProvider } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SignInComponentProps {
  providers: Record<string, ClientSafeProvider>;
}

export default function SignInComponent({ providers }: SignInComponentProps) {
  return (
    <div className="space-y-4">
      {Object.values(providers).map((provider: ClientSafeProvider) => (
        <div key={provider.name} className="animate-fade-in-up">
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="group relative flex w-full items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-3 text-base font-medium text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              {provider.name === "Google" && (
                <FcGoogle className="h-5 w-5" />
              )}
              {provider.name === "GitHub" && (
                <FaGithub className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              )}
            </span>
            <span className="flex-1 text-center">
              Continue with {provider.name}
            </span>
          </button>
        </div>
      ))}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={() => signIn(providers.google.id, { callbackUrl: "/" })}
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
} 