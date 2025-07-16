"use client"

import { LogOut, BarChart3, Home, Settings, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { User as FirebaseUser } from "firebase/auth"

type Page = "signin" | "dashboard" | "add-expense" | "add-budget" | "budget-settings" | "reports"

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  onSignOut: () => void
  user: FirebaseUser
}

export function Navigation({ currentPage, onNavigate, onSignOut, user }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard" as Page, label: "Dashboard", icon: Home },
    { id: "budget-settings" as Page, label: "Budget Settings", icon: Settings },
    { id: "reports" as Page, label: "Reports", icon: BarChart3 },
  ]

  const getUserDisplayName = () => {
    if (user.isAnonymous) {
      return "Anonymous User"
    }
    return user.displayName || user.email || "User"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="Finance Tracker Logo"
              className="h-8 w-8 rounded-lg bg-blue-600"
            />
            <span className="text-xl font-bold text-gray-900">Finance Tracker</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </div>

          {/* User Info & Sign Out */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{getUserDisplayName()}</span>
            </div>
            <Button
              variant="ghost"
              onClick={onSignOut}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {/* User Info */}
            <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
              <User className="h-4 w-4" />
              <span>{getUserDisplayName()}</span>
            </div>

            {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}

            {/* Sign Out */}
            <Button
              variant="ghost"
              onClick={onSignOut}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
