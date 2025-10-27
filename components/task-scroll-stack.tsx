"use client"

import type { Todo } from "@/app/page"
import ScrollStack, { ScrollStackItem } from "./scroll-stack"
import TaskCard from "./task-card"
import "./task-scroll-stack.css"

interface TaskScrollStackProps {
  todos: Todo[]
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
}

export default function TaskScrollStack({ todos, onToggleTodo, onDeleteTodo }: TaskScrollStackProps) {
  if (todos.length === 0) {
    return null
  }

  return (
    <div className="task-scroll-stack-container">
      <ScrollStack
        className="task-scroll-stack"
        itemDistance={20}
        itemScale={0.02}
        itemStackDistance={15}
        stackPosition="15%"
        scaleEndPosition="5%"
        baseScale={0.92}
        rotationAmount={0}
        blurAmount={0}
        useWindowScroll={false}
      >
        {todos.map((todo) => (
          <ScrollStackItem key={todo.id} itemClassName="task-scroll-stack-card">
            <TaskCard todo={todo} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  )
}
