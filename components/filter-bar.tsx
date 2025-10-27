"use client"

interface FilterBarProps {
  currentFilter: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void
}

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  const filters = [
    { value: "all" as const, label: "All" },
    { value: "active" as const, label: "Active" },
    { value: "completed" as const, label: "Completed" },
  ]

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
            currentFilter === filter.value
              ? "bg-blue-500 text-white shadow-md"
              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
