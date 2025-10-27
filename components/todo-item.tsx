"use client"

import { useState } from "react"
import { Trash2, Calendar } from "lucide-react"
import type { Todo } from "@/app/page"

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  isDragging: boolean
}

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
}

const tagColors = [
  "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
  "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
  "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300",
  "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300",
]

export default function TodoItem({ todo, onToggle, onDelete, isDragging }: TodoItemProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleToggle = () => {
    if (!todo.completed) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 500)
    }
    onToggle()
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div
      className={`group relative px-4 py-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200 cursor-pointer ${
        isDragging ? "opacity-50 scale-105 shadow-lg" : "hover:shadow-md"
      } ${todo.completed ? "bg-slate-50 dark:bg-slate-800" : ""}`}
      onClick={handleToggle}
    >
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `ping 0.5s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Custom Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <div
            className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
              todo.completed
                ? "bg-blue-500 border-blue-500"
                : "border-slate-300 dark:border-slate-500 hover:border-blue-400"
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {/* Priority Dot */}
            {todo.priority && <div className={`w-2 h-2 rounded-full ${priorityColors[todo.priority]}`} />}

            {/* Task Title */}
            <p
              className={`text-base font-medium transition-all duration-200 ${
                todo.completed ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-900 dark:text-white"
              }`}
            >
              {todo.title}
            </p>
          </div>

          {/* Metadata */}
          {(todo.dueDate || todo.tags) && (
            <div className="flex items-center gap-2 flex-wrap mt-2">
              {todo.dueDate && (
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar size={12} />
                  {formatDate(todo.dueDate)}
                </div>
              )}

              {/* Tags */}
              {todo.tags && todo.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {todo.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${tagColors[idx % tagColors.length]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="flex-shrink-0 p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
