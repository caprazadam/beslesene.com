"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

interface MarketItemProps {
  item: {
    id: number
    name: string
    description: string
    price: number
    image: string
    stats?: {
      eggProduction?: number
      feedConsumption?: number
      lifespan?: number
      boost?: number
    }
    quantity?: number
    badge?: string
  }
  onBuy: (item: any) => void
}

export function MarketItemCard({ item, onBuy }: MarketItemProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{item.name}</CardTitle>
          {item.badge && (
            <Badge
              variant="outline"
              className={
                item.badge === "Premium"
                  ? "bg-amber-500/10 text-amber-600 border-amber-200"
                  : "bg-green-500/10 text-green-600 border-green-200"
              }
            >
              {item.badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0 flex items-center justify-center bg-muted/30 rounded-md p-2 w-full sm:w-auto">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <div className="space-y-2 flex-1">
            <p className="text-sm text-muted-foreground">{item.description}</p>

            {item.stats && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {item.stats.eggProduction && (
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-xs text-muted-foreground">Yumurta</span>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            i < (item.stats?.eggProduction || 0) ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {item.stats.boost && (
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-xs text-muted-foreground">Verim</span>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            i < (item.stats?.boost || 0) ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {item.stats.feedConsumption && (
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-xs text-muted-foreground">Yem</span>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            i < (item.stats?.feedConsumption || 0) ? "bg-amber-500" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {item.stats.lifespan && (
                  <div className="flex flex-col items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-xs text-muted-foreground">Ömür</span>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            i < (item.stats?.lifespan || 0) ? "bg-blue-500" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {item.quantity && (
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200">
                  {item.quantity} öğün
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center mr-2">
            <span className="text-xs text-white font-bold">B</span>
          </div>
          <span className="font-bold">{item.price}</span>
        </div>
        <Button onClick={() => onBuy(item)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Satın Al
        </Button>
      </CardFooter>
    </Card>
  )
}
