"use client"

import type React from "react"

import { useState } from "react"
import TodoItem from "./todo-item"
import type { Todo } from "@/app/page"

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onReorderTodos: (todos: Todo[]) => void
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onReorderTodos }: TodoListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null)

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = todos.findIndex((t) => t.id === draggedId)
    const targetIndex = todos.findIndex((t) => t.id === targetId)

    const newTodos = [...todos]
    const [draggedTodo] = newTodos.splice(draggedIndex, 1)
    newTodos.splice(targetIndex, 0, draggedTodo)

    onReorderTodos(newTodos)
    setDraggedId(null)
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          draggable
          onDragStart={() => handleDragStart(todo.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(todo.id)}
          className="transition-opacity duration-200"
        >
          <TodoItem
            todo={todo}
            onToggle={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
            isDragging={draggedId === todo.id}
          />
        </div>
      ))}
    </div>
  )
}
