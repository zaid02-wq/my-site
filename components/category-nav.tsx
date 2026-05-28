"use client"

import { Button } from "@/components/ui/button"
import { Star, Monitor, Palette, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryNavProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: "الكل", label: "الكل", icon: LayoutGrid },
  { id: "حاسبات", label: "حاسبات", icon: Monitor },
  { id: "تصميم", label: "تصميم", icon: Palette },
  { id: "طلبات خاصة", label: "طلبات خاصة", icon: Star, isSpecial: true },
]

export function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <section className="flex flex-wrap items-center gap-3">
      {categories.map((category) => {
        const Icon = category.icon
        const isActive = activeCategory === category.id
        
        return (
          <Button
            key={category.id}
            variant={isActive ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "gap-2 rounded-full px-6 h-11 font-medium transition-all",
              category.isSpecial && !isActive && "border-gold text-gold hover:bg-gold/10 hover:text-gold",
              category.isSpecial && isActive && "bg-gold text-gold-foreground hover:bg-gold/90",
              !category.isSpecial && isActive && "bg-primary text-primary-foreground",
              !category.isSpecial && !isActive && "bg-card border-border text-foreground hover:bg-secondary"
            )}
          >
            <Icon className={cn(
              "h-4 w-4",
              category.isSpecial && "fill-current"
            )} />
            {category.label}
          </Button>
        )
      })}
    </section>
  )
}
