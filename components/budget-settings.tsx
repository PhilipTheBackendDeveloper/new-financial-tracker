"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MonthSelector } from "@/components/month-selector"
import { ArrowLeft, Settings, DollarSign, Tag, Trash2, Edit, Plus } from "lucide-react"

type Page = "signin" | "dashboard" | "add-expense" | "add-budget" | "budget-settings" | "reports"

interface BudgetSettingsProps {
  onNavigate: (page: Page) => void
}

interface Budget {
  id: string
  category: string
  amount: number
  month: string
}

export function BudgetSettings({ onNavigate }: BudgetSettingsProps) {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "1", category: "Food & Dining", amount: 800, month: "2024-01" },
    { id: "2", category: "Transportation", amount: 400, month: "2024-01" },
    { id: "3", category: "Shopping", amount: 600, month: "2024-01" },
  ])

  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    month: new Date().toISOString().slice(0, 7),
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Other",
  ]

  const handleAddBudget = async () => {
    setError("")
    setSuccess("")

    if (!newBudget.category || !newBudget.amount || !newBudget.month) {
      setError("Please fill in all fields")
      return
    }

    if (isNaN(Number(newBudget.amount)) || Number(newBudget.amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    // Check if budget already exists for this category and month
    const existingBudget = budgets.find((b) => b.category === newBudget.category && b.month === newBudget.month)

    if (existingBudget) {
      setError("Budget already exists for this category and month")
      return
    }

    setLoading(true)

    setTimeout(() => {
      const budget: Budget = {
        id: Date.now().toString(),
        category: newBudget.category,
        amount: Number(newBudget.amount),
        month: newBudget.month,
      }

      setBudgets([...budgets, budget])
      setNewBudget({ category: "", amount: "", month: new Date().toISOString().slice(0, 7) })
      setSuccess("Budget added successfully!")
      setLoading(false)

      setTimeout(() => setSuccess(""), 3000)
    }, 1000)
  }

  const handleUpdateBudget = async (id: string, amount: number) => {
    setLoading(true)

    setTimeout(() => {
      setBudgets(budgets.map((b) => (b.id === id ? { ...b, amount } : b)))
      setIsEditing(null)
      setSuccess("Budget updated successfully!")
      setLoading(false)

      setTimeout(() => setSuccess(""), 3000)
    }, 500)
  }

  const handleDeleteBudget = async (id: string) => {
    setLoading(true)

    setTimeout(() => {
      setBudgets(budgets.filter((b) => b.id !== id))
      setSuccess("Budget deleted successfully!")
      setLoading(false)

      setTimeout(() => setSuccess(""), 3000)
    }, 500)
  }

  const getMonthLabel = (monthValue: string) => {
    const [year, month] = monthValue.split("-")
    return new Date(Number.parseInt(year), Number.parseInt(month) - 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  const groupedBudgets = budgets.reduce(
    (acc, budget) => {
      if (!acc[budget.month]) {
        acc[budget.month] = []
      }
      acc[budget.month].push(budget)
      return acc
    },
    {} as Record<string, Budget[]>,
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" onClick={() => onNavigate("dashboard")} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Settings className="h-8 w-8 text-blue-600" />
            <span>Budget Settings</span>
          </h1>
          <p className="text-gray-600 mt-2">Set and manage your monthly budgets by category</p>
        </div>

        {/* Add New Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-green-600" />
              <span>Add New Budget</span>
            </CardTitle>
            <CardDescription>Set a spending limit for a specific category and month</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="new-category" className="flex items-center space-x-2">
                  <Tag className="h-4 w-4" />
                  <span>Category</span>
                </Label>
                <Select
                  value={newBudget.category}
                  onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-amount" className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Amount</span>
                </Label>
                <Input
                  id="new-amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-month">Month</Label>
                <MonthSelector
                  value={newBudget.month}
                  onValueChange={(value) => setNewBudget({ ...newBudget, month: value })}
                  placeholder="Select month"
                />
              </div>
            </div>

            <Button onClick={handleAddBudget} disabled={loading} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>{loading ? "Adding Budget..." : "Add Budget"}</span>
            </Button>
          </CardContent>
        </Card>

        {/* Existing Budgets */}
        <div className="space-y-6">
          {Object.keys(groupedBudgets).length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Settings className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No budgets set</h3>
                <p className="text-gray-600 text-center">
                  Start by adding your first budget above to track your spending limits.
                </p>
              </CardContent>
            </Card>
          ) : (
            Object.entries(groupedBudgets)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([month, monthBudgets]) => (
                <Card key={month}>
                  <CardHeader>
                    <CardTitle className="text-xl">{getMonthLabel(month)}</CardTitle>
                    <CardDescription>
                      Total Budget: ${monthBudgets.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthBudgets.map((budget) => (
                        <div
                          key={budget.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-blue-500 rounded-full" />
                            <div>
                              <h4 className="font-medium text-gray-900">{budget.category}</h4>
                              <p className="text-sm text-gray-600">Monthly limit</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            {isEditing === budget.id ? (
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  step="0.01"
                                  defaultValue={budget.amount}
                                  className="w-24"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      const target = e.target as HTMLInputElement
                                      handleUpdateBudget(budget.id, Number(target.value))
                                    }
                                    if (e.key === "Escape") {
                                      setIsEditing(null)
                                    }
                                  }}
                                  autoFocus
                                />
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const input = document.querySelector(
                                      `input[defaultValue="${budget.amount}"]`,
                                    ) as HTMLInputElement
                                    handleUpdateBudget(budget.id, Number(input.value))
                                  }}
                                >
                                  Save
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setIsEditing(null)}>
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <>
                                <span className="text-lg font-bold text-gray-900">
                                  ${budget.amount.toLocaleString()}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setIsEditing(budget.id)}
                                    className="flex items-center space-x-1"
                                  >
                                    <Edit className="h-3 w-3" />
                                    <span>Edit</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeleteBudget(budget.id)}
                                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                    <span>Delete</span>
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      </div>
    </div>
  )
}
