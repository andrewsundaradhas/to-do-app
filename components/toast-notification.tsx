"use client"

import { Check, AlertCircle } from "lucide-react"

interface ToastNotificationProps {
  message: string
  type: "success" | "error"
}

export default function ToastNotification({ message, type }: ToastNotificationProps) {
  return (
    <div className="fixed bottom-6 right-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
          type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}
