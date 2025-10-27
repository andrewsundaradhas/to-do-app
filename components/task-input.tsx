"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

interface TaskInputProps {
  onAddTodo: (title: string, priority?: "high" | "medium" | "low", dueDate?: string, tags?: string[]) => void
}

export default function TaskInput({ onAddTodo }: TaskInputProps) {
  const [input, setInput] = useState("")
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium")
  const [dueDate, setDueDate] = useState("")
  const [tags, setTags] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
      onAddTodo(input, priority, dueDate || undefined, tagArray.length > 0 ? tagArray : undefined)
      setInput("")
      setPriority("medium")
      setDueDate("")
      setTags("")
      setShowAdvanced(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600 focus-within:border-blue-400 focus-within:bg-white dark:focus-within:bg-slate-700 transition-all duration-200">
        <Plus size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
        />
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-0.5 rounded transition-colors"
        >
          {showAdvanced ? "Hide" : "More"}
        </button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="grid grid-cols-3 gap-2 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-0.5">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
              className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded text-slate-900 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-0.5">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-0.5">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="work, urgent..."
              className="w-full px-2 py-1 text-xs bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
        </div>
      )}

      {input.trim() && (
        <button
          type="submit"
          className="w-full px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Add Task
        </button>
      )}
    </form>
  )
}
