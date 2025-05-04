"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, ShoppingCart, ArrowUpCircle, Trophy, Settings, User, FileText } from "lucide-react"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header (Top Bar) */}
      <header className="sticky top-0 z-10 border-b bg-background p-3 flex justify-between items-center">
        {/* Left: User Profile */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Username</span>
            <span className="text-xs text-muted-foreground">Level 5</span>
          </div>
        </div>

        {/* Right: Currency Display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="text-xs text-white font-bold">B</span>
            </div>
            <span className="text-sm font-medium">1,250</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-xs text-white font-bold">F</span>
            </div>
            <span className="text-sm font-medium">350</span>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-auto p-4">{children}</main>

      {/* Bottom Navigation Bar */}
      <nav className="sticky bottom-0 z-10 border-t bg-background">
        <div className="flex justify-around">
          <NavItem href="/" icon={<Home className="h-5 w-5" />} label="Ana Sayfa" isActive={pathname === "/"} />
          <NavItem
            href="/market"
            icon={<ShoppingCart className="h-5 w-5" />}
            label="Market"
            isActive={pathname === "/market"}
          />
          <NavItem
            href="/upgrades"
            icon={<ArrowUpCircle className="h-5 w-5" />}
            label="Geliştirmeler"
            isActive={pathname === "/upgrades"}
          />
          <NavItem
            href="/leaderboard"
            icon={<Trophy className="h-5 w-5" />}
            label="Sıralama"
            isActive={pathname === "/leaderboard"}
          />
          <NavItem
            href="/tasks"
            icon={<FileText className="h-5 w-5" />}
            label="Görevler"
            isActive={pathname === "/tasks"}
          />
          <NavItem
            href="/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Ayarlar"
            isActive={pathname === "/settings"}
          />
        </div>
      </nav>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center py-2 px-3 ${
        isActive ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}
