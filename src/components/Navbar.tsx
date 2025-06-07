"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, Home, Plus, Trophy, User, Menu as MenuIcon, X as CloseIcon } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/quizzes", label: "Home", icon: <Home className="mr-2 h-4 w-4" /> },
    { href: "/quizzes/create", label: "Create Quiz", icon: <Plus className="mr-2 h-4 w-4" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <Trophy className="mr-2 h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="glass shadow-lg border-b border-white/10 dark:border-white/10 backdrop-blur-md transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <span className="bg-primary text-white rounded-lg p-1 flex items-center justify-center shadow-md">
              <Brain className="h-6 w-6" />
            </span>
            <span className="hidden sm:inline-block tracking-tight">QuizMaster</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Theme Toggle & User */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-quizzes" className="flex items-center">
                      <Brain className="mr-2 h-4 w-4" />
                      My Quizzes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/api/auth/signout" className="flex items-center text-red-600">
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
            {/* Mobile menu button */}
            <button
              className="ml-2 flex md:hidden items-center justify-center rounded-md p-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-0 right-0 w-3/4 max-w-xs h-full glass shadow-xl flex flex-col gap-4 p-6 animate-in slide-in-from-right-20 border-l border-white/10 dark:border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary text-white rounded-lg p-1 flex items-center justify-center shadow-md">
                <Brain className="h-6 w-6" />
              </span>
              <span className="font-bold text-lg tracking-tight">QuizMaster</span>
            </div>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="mt-4 border-t pt-4 flex flex-col gap-2">
              <ThemeToggle />
              {session ? (
                <Link href="/profile" className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </Link>
              ) : (
                <Button asChild variant="outline" size="sm" className="w-full" onClick={() => setMobileOpen(false)}>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 