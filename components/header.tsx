"use client"

import { Wallet } from "lucide-react"

interface HeaderProps {
  balance: number
  userName?: string
}

export function Header({ balance, userName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">
            فرصتي<span className="text-gold">.IQ</span>
          </h1>
        </div>

        {/* User Info & Wallet */}
        <div className="flex items-center gap-4">
          {userName && (
            <span className="text-sm text-muted-foreground hidden sm:block">
              مرحباً، {userName}
            </span>
          )}
          
          {/* Wallet Badge */}
          <div className="flex items-center gap-2 rounded-full bg-success px-4 py-2 text-success-foreground shadow-sm">
            <Wallet className="h-4 w-4" />
            <span className="font-semibold text-sm">
              {balance.toLocaleString()} د.ع
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
