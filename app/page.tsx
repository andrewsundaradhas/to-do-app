"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import TaskInput from "@/components/task-input"
import FilterBar from "@/components/filter-bar"
import TodoList from "@/components/todo-list"
import ToastNotification from "@/components/toast-notification"
import DarkVeil from "@/components/dark-veil"
import LaserFlow from "@/components/laser-flow"

export interface Todo {
  id: string
  title: string
  completed: boolean
  priority?: "high" | "medium" | "low"
  dueDate?: string
  tags?: string[]
  createdAt: Date
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [darkMode, setDarkMode] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [showCardSwap, setShowCardSwap] = useState(false)

  // Load todos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
    }
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const addTodo = (title: string, priority?: "high" | "medium" | "low", dueDate?: string, tags?: string[]) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      dueDate,
      tags,
      createdAt: new Date(),
    }
    setTodos([newTodo, ...todos])
    setToast({ message: `Task Added: "${title}"`, type: "success" })
    setShowCardSwap(true)
    setTimeout(() => setToast(null), 3000)
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const reorderTodos = (newTodos: Todo[]) => {
    setTodos(newTodos)
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="fixed inset-0 z-0">
        <DarkVeil
          hueShift={darkMode ? 240 : 200}
          noiseIntensity={0.15}
          scanlineIntensity={0.08}
          speed={0.3}
          warpAmount={0.02}
        />
        <div className="absolute inset-0 opacity-50">
          <LaserFlow
            horizontalBeamOffset={0.25}
            verticalBeamOffset={0.12}
            color={darkMode ? "#60a5fa" : "#3b82f6"}
            wispDensity={0.8}
            fogIntensity={0.4}
          />
        </div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 z-20"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="w-full max-w-4xl">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-white dark:text-white mb-2">My Tasks</h1>
            <p className="text-slate-300 dark:text-slate-400">Stay organized and productive</p>
          </div>

          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 space-y-4">
            <TaskInput onAddTodo={addTodo} />

            <FilterBar currentFilter={filter} onFilterChange={setFilter} />

            <div className={filteredTodos.length > 0 ? "border-t border-slate-200 dark:border-slate-700 pt-4" : ""}>
              <h2 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
                Task List
              </h2>
              {filteredTodos.length > 0 ? (
                <div className="max-h-60 overflow-y-auto">
                  <TodoList
                    todos={filteredTodos}
                    onToggleTodo={toggleTodo}
                    onDeleteTodo={deleteTodo}
                    onReorderTodos={reorderTodos}
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 dark:text-slate-500 text-sm">
                    {filter === "completed" && "No completed tasks yet"}
                    {filter === "active" && "No active tasks. Great job!"}
                    {filter === "all" && "No tasks yet. Add one to get started!"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {toast && <ToastNotification message={toast.message} type={toast.type} />}
      </main>
    </div>
  )
}
