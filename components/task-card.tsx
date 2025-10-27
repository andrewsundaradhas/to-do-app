"use client"

import type { Todo } from "@/app/page"
import { Trash2, CheckCircle2, Circle } from "lucide-react"
import { format } from "date-fns"

interface TaskCardProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ todo, onToggle, onDelete }: TaskCardProps) {
  const priorityColors = {
    high: "bg-red-500/20 text-red-600 dark:text-red-400",
    medium: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    low: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-3">
        {/* Priority Dot */}
        <div
          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
            todo.priority === "high" ? "bg-red-500" : todo.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"
          }`}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => onToggle(todo.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Toggle task"
            >
              {todo.completed ? <CheckCircle2 size={20} className="text-green-500" /> : <Circle size={20} />}
            </button>
            <h3
              className={`text-sm font-medium ${
                todo.completed
                  ? "line-through text-slate-400 dark:text-slate-500"
                  : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {todo.title}
            </h3>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-2 ml-7">
            {todo.priority && (
              <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[todo.priority]}`}>{todo.priority}</span>
            )}
            {todo.dueDate && (
              <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                {format(new Date(todo.dueDate), "MMM d")}
              </span>
            )}
            {todo.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs text-blue-600 dark:text-blue-400 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
