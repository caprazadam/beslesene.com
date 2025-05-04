"use client"

import { Button } from "@/components/ui/button"
import { Egg, Home, ShoppingBag } from "lucide-react"

interface MarketCategorySelectorProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export function MarketCategorySelector({ activeCategory, setActiveCategory }: MarketCategorySelectorProps) {
  const categories = [
    { id: "chickens", name: "Tavuklar", icon: <Egg className="h-4 w-4" /> },
    { id: "roosters", name: "Horozlar", icon: <Egg className="h-4 w-4" /> },
    { id: "feed", name: "Yemler", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "coops", name: "Kümesler", icon: <Home className="h-4 w-4" /> },
  ]

  return (
    <div className="flex overflow-x-auto pb-2 gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          className="flex-shrink-0"
          onClick={() => setActiveCategory(category.id)}
        >
          {category.icon}
          <span className="ml-2">{category.name}</span>
        </Button>
      ))}
    </div>
  )
}
