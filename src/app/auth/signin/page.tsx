import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import SignInComponent from "./SignInComponent";
import { ClientSafeProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  
  // Redirect if already signed in
  if (session) {
    redirect("/");
  }

  // Get providers from auth options directly
  const providers = authOptions.providers.map(provider => ({
    id: provider.id,
    name: provider.name,
    type: provider.type,
    signinUrl: `/api/auth/signin/${provider.id}`,
    callbackUrl: `/api/auth/callback/${provider.id}`,
  }));

  const providersObject: Record<string, ClientSafeProvider> = providers.reduce((acc, provider) => {
    acc[provider.id] = provider;
    return acc;
  }, {} as Record<string, ClientSafeProvider>);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="glass p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Sign in to access your account and continue your learning journey
            </p>
          </div>
          <div className="mt-8">
            <SignInComponent providers={providersObject} />
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 