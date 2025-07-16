"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MonthSelector } from "@/components/month-selector"
import { BarChart3, PieChart, TrendingUp, Award, Calendar, DollarSign, AlertTriangle, Target } from "lucide-react"

export function Reports() {
  const [selectedMonth, setSelectedMonth] = useState("2024-01")

  // Mock insights data with budget information
  const insights = {
    topCategory: "Food & Dining",
    topCategoryAmount: 850.5,
    avgDailySpending: 82.35,
    budgetUtilization: 81.7,
    savingsThisMonth: 549.25,
    overBudgetCategories: 3,
    totalOverspend: 150.75,
  }

  const categoryBreakdown = [
    {
      category: "Food & Dining",
      amount: 850.5,
      budget: 800,
      percentage: 34.7,
      color: "bg-blue-500",
      status: "over",
    },
    {
      category: "Shopping",
      amount: 680.0,
      budget: 600,
      percentage: 27.8,
      color: "bg-purple-500",
      status: "over",
    },
    {
      category: "Transportation",
      amount: 420.25,
      budget: 400,
      percentage: 17.1,
      color: "bg-green-500",
      status: "over",
    },
    {
      category: "Entertainment",
      amount: 300.0,
      budget: 500,
      percentage: 12.2,
      color: "bg-orange-500",
      status: "under",
    },
    {
      category: "Utilities",
      amount: 200.0,
      budget: 250,
      percentage: 8.2,
      color: "bg-red-500",
      status: "under",
    },
  ]

  const getBudgetStatusMessage = () => {
    if (insights.overBudgetCategories > 0) {
      return {
        type: "warning" as const,
        message: `You exceeded budget in ${insights.overBudgetCategories} categories with total overspend of $${insights.totalOverspend.toFixed(2)}`,
      }
    }
    return {
      type: "success" as const,
      message: "Excellent! You stayed within budget across all categories this month.",
    }
  }

  const budgetStatus = getBudgetStatusMessage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Analyze your spending patterns and budget performance</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <MonthSelector value={selectedMonth} onValueChange={setSelectedMonth} className="w-[180px]" />
        </div>
      </div>

      {/* Budget Status Alert */}
      <Alert
        className={`mb-8 ${budgetStatus.type === "warning" ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}`}
      >
        <div className="flex items-center space-x-2">
          {budgetStatus.type === "warning" ? (
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          ) : (
            <Target className="h-4 w-4 text-green-600" />
          )}
          <AlertDescription className={budgetStatus.type === "warning" ? "text-orange-800" : "text-green-800"}>
            {budgetStatus.message}
          </AlertDescription>
        </div>
      </Alert>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{insights.topCategory}</div>
            <p className="text-xs text-muted-foreground">${insights.topCategoryAmount.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Daily Spending</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">${insights.avgDailySpending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per day this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <TrendingUp
              className={`h-4 w-4 ${insights.budgetUtilization > 90 ? "text-red-600" : insights.budgetUtilization > 75 ? "text-orange-600" : "text-green-600"}`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-lg font-bold ${insights.budgetUtilization > 90 ? "text-red-600" : insights.budgetUtilization > 75 ? "text-orange-600" : "text-green-600"}`}
            >
              {insights.budgetUtilization}%
            </div>
            <p className="text-xs text-muted-foreground">Of total budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <DollarSign
              className={`h-4 w-4 ${insights.overBudgetCategories > 0 ? "text-red-600" : "text-green-600"}`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-lg font-bold ${insights.overBudgetCategories > 0 ? "text-red-600" : "text-green-600"}`}
            >
              {insights.overBudgetCategories > 0 ? `${insights.overBudgetCategories} Over` : "All Good"}
            </div>
            <p className="text-xs text-muted-foreground">
              {insights.overBudgetCategories > 0 ? "Categories over budget" : "All within budget"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Breakdown with Budget Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Spending vs Budget by Category</span>
            </CardTitle>
            <CardDescription>Detailed breakdown with budget performance</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryBreakdown.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <PieChart className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No spending data</h3>
                <p className="text-gray-600 text-center">
                  Add some expenses to see your spending breakdown and budget analysis.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium">{item.category}</span>
                        {item.status === "over" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">${item.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          Budget: ${item.budget.toLocaleString()} ({item.percentage}%)
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.status === "over" ? "bg-red-500" : item.color}`}
                        style={{ width: `${Math.min((item.amount / item.budget) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs">
                      {item.status === "over" ? (
                        <span className="text-red-600 font-medium">
                          ${(item.amount - item.budget).toFixed(2)} over budget
                        </span>
                      ) : (
                        <span className="text-green-600">${(item.budget - item.amount).toFixed(2)} under budget</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monthly Trend Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Budget Performance Trend</span>
            </CardTitle>
            <CardDescription>Track your budget adherence over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Budget performance chart will appear here</p>
                <p className="text-xs text-gray-500 mt-1">Connect to your backend to see real data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Spending Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Budget & Spending Insights</CardTitle>
          <CardDescription>AI-powered insights about your spending habits and budget performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-medium text-red-900 mb-2 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Budget Alert</span>
                </h3>
                <p className="text-sm text-red-800">
                  You exceeded your Food & Dining budget by $50.50. Consider meal planning or cooking at home more often
                  to stay within budget.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-900 mb-2 flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Budget Success</span>
                </h3>
                <p className="text-sm text-green-800">
                  Great job staying under budget for Entertainment and Utilities! You saved $200 in Entertainment this
                  month.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-medium text-orange-900 mb-2">⚠️ Watch Out</h3>
                <p className="text-sm text-orange-800">
                  Your Shopping expenses are trending 25% higher than your budget. Consider setting spending alerts or
                  reviewing your shopping habits.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">💡 Optimization Tip</h3>
                <p className="text-sm text-blue-800">
                  Based on your spending pattern, you could reallocate $100 from Entertainment to Food & Dining budget
                  for better balance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
