const API_BASE_URL = "http://localhost:5000"

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  // Health check
  async healthCheck() {
    return this.request("/health")
  }

  // Expense endpoints
  async getExpenses(userId: string, month?: string) {
    const params = month ? `?month=${month}` : ""
    return this.request(`/api/users/${userId}/expenses${params}`)
  }

  async addExpense(
    userId: string,
    expense: {
      amount: number
      category: string
      date: string
      note?: string
    },
  ) {
    return this.request(`/api/users/${userId}/expenses`, {
      method: "POST",
      body: JSON.stringify(expense),
    })
  }

  async updateExpense(
    userId: string,
    expenseId: string,
    expense: {
      amount?: number
      category?: string
      date?: string
      note?: string
    },
  ) {
    return this.request(`/api/users/${userId}/expenses/${expenseId}`, {
      method: "PUT",
      body: JSON.stringify(expense),
    })
  }

  async deleteExpense(userId: string, expenseId: string) {
    return this.request(`/api/users/${userId}/expenses/${expenseId}`, {
      method: "DELETE",
    })
  }

  // Budget endpoints
  async getBudgets(userId: string, month?: string) {
    const params = month ? `?month=${month}` : ""
    return this.request(`/api/users/${userId}/budgets${params}`)
  }

  async setBudget(
    userId: string,
    budget: {
      amount: number
      month: string
      category?: string
    },
  ) {
    return this.request(`/api/users/${userId}/budgets`, {
      method: "POST",
      body: JSON.stringify(budget),
    })
  }

  async deleteBudget(userId: string, budgetId: string) {
    return this.request(`/api/users/${userId}/budgets/${budgetId}`, {
      method: "DELETE",
    })
  }

  // Analytics endpoints
  async getSummary(userId: string, month: string) {
    return this.request(`/api/summary/${userId}/${month}`)
  }

  async getReport(userId: string, month: string) {
    return this.request(`/api/report/${userId}/${month}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
