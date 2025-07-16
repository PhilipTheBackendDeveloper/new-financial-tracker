"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, DollarSign, Calendar, Tag, FileText } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { apiClient } from "@/lib/api"

type Page = "signin" | "dashboard" | "add-expense" | "add-budget" | "budget-settings" | "reports"

interface AddExpenseProps {
  onNavigate: (page: Page) => void
}

export function AddExpense({ onNavigate }: AddExpenseProps) {
  const { user } = useAuth()
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [note, setNote] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setError("")
    setSuccess("")

    // Validation
    if (!amount || !category || !date) {
      setError("Please fill in all required fields")
      return
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setLoading(true)

    try {
      const response = await apiClient.addExpense(user.uid, {
        amount: Number(amount),
        category,
        date,
        note: note.trim(),
      })

      if (response.success) {
        setSuccess("Expense added successfully!")

        // Reset form
        setAmount("")
        setCategory("")
        setNote("")
        setDate(new Date().toISOString().split("T")[0])

        // Navigate back after a short delay
        setTimeout(() => {
          onNavigate("dashboard")
        }, 1500)
      } else {
        throw new Error(response.error || "Failed to add expense")
      }
    } catch (error: any) {
      setError(error.message || "Failed to add expense")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" onClick={() => onNavigate("dashboard")} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-red-600" />
            <span>Add New Expense</span>
          </CardTitle>
          <CardDescription>Record a new expense to track your spending</CardDescription>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Amount *</span>
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
                disabled={loading}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span>Category *</span>
              </Label>
              <Select value={category} onValueChange={setCategory} disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Date *</span>
              </Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={loading} />
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label htmlFor="note" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Note (Optional)</span>
              </Label>
              <Textarea
                id="note"
                placeholder="Add a note about this expense..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                disabled={loading}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>{loading ? "Adding Expense..." : "Add Expense"}</span>
              </Button>
              <Button type="button" variant="outline" onClick={() => onNavigate("dashboard")} disabled={loading}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
