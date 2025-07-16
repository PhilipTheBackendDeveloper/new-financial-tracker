"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

interface MonthSelectorProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function MonthSelector({ value, onValueChange, placeholder = "Select month", className }: MonthSelectorProps) {
  const currentYear = new Date().getFullYear()
  const months = []

  // Generate months for current year and next year
  for (let year = currentYear; year <= currentYear + 1; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthValue = `${year}-${month.toString().padStart(2, "0")}`
      const monthLabel = new Date(year, month - 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
      months.push({ value: monthValue, label: monthLabel })
    }
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month.value} value={month.value}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
