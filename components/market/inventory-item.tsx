"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

interface InventoryItemProps {
  item: {
    id: number
    name: string
    description: string
    quantity: number
    sellPrice: number
    image: string
    badge?: string
  }
  onSell: (item: any, quantity: number) => void
}

export function InventoryItem({ item, onSell }: InventoryItemProps) {
  const [sellQuantity, setSellQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (sellQuantity > 1) {
      setSellQuantity(sellQuantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (sellQuantity < item.quantity) {
      setSellQuantity(sellQuantity + 1)
    }
  }

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} width={60} height={60} className="rounded-md" />
          {item.badge && (
            <Badge
              variant="outline"
              className={`absolute -top-2 -right-2 ${
                item.badge === "Premium"
                  ? "bg-amber-500/10 text-amber-600 border-amber-200"
                  : "bg-green-500/10 text-green-600 border-green-200"
              }`}
            >
              {item.badge}
            </Badge>
          )}
        </div>
        <div>
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <div className="flex items-center mt-1">
            <div className="h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center mr-1">
              <span className="text-[10px] text-white font-bold">B</span>
            </div>
            <span className="text-sm font-medium">{item.sellPrice} / adet</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Badge variant="outline" className="bg-muted/50">
          Stok: {item.quantity}
        </Badge>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={decreaseQuantity}
            disabled={sellQuantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <div className="h-8 px-3 flex items-center justify-center border-y bg-background">
            <span className="text-sm font-medium">{sellQuantity}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={increaseQuantity}
            disabled={sellQuantity >= item.quantity}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="ml-2 h-8" onClick={() => onSell(item, sellQuantity)}>
            Sat
          </Button>
        </div>
      </div>
    </div>
  )
}
