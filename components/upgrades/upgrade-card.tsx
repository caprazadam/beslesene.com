"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lock, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UpgradeCardProps {
  upgrade: {
    id: number
    name: string
    description: string
    currentLevel: number
    maxLevel: number
    cost: number
    levelRequired: number
    benefits: string[]
    image: string
  }
  onUpgrade: (upgrade: any) => void
  playerLevel: number
  playerBesCoin: number
}

export function UpgradeCard({ upgrade, onUpgrade, playerLevel, playerBesCoin }: UpgradeCardProps) {
  const progress = (upgrade.currentLevel / upgrade.maxLevel) * 100
  const isMaxLevel = upgrade.currentLevel >= upgrade.maxLevel
  const canAfford = playerBesCoin >= upgrade.cost
  const meetsLevelRequirement = playerLevel >= upgrade.levelRequired
  const canUpgrade = !isMaxLevel && canAfford && meetsLevelRequirement

  return (
    <Card className={isMaxLevel ? "border-green-500/30 bg-green-50/30 dark:bg-green-950/10" : ""}>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{upgrade.name}</CardTitle>
          <Badge
            variant="outline"
            className={
              isMaxLevel
                ? "bg-green-500/10 text-green-600 border-green-200"
                : "bg-blue-500/10 text-blue-700 border-blue-200"
            }
          >
            {isMaxLevel ? "Maksimum" : `Seviye ${upgrade.currentLevel}/${upgrade.maxLevel}`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0 flex items-center justify-center bg-muted/30 rounded-md p-2 w-full sm:w-auto">
            <Image
              src={upgrade.image || "/placeholder.svg"}
              alt={upgrade.name}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="space-y-2 flex-1">
            <p className="text-sm text-muted-foreground">{upgrade.description}</p>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>İlerleme</span>
                <span>
                  {upgrade.currentLevel}/{upgrade.maxLevel}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-1 mt-2">
              <p className="text-xs font-medium">Faydalar:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                {upgrade.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center mr-2">
            <span className="text-xs text-white font-bold">B</span>
          </div>
          <span className={`font-bold ${!canAfford && !isMaxLevel ? "text-red-500" : ""}`}>{upgrade.cost}</span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  onClick={() => onUpgrade(upgrade)}
                  disabled={!canUpgrade}
                  variant={isMaxLevel ? "outline" : "default"}
                  className={isMaxLevel ? "cursor-default" : ""}
                >
                  {isMaxLevel ? (
                    "Maksimum Seviye"
                  ) : !meetsLevelRequirement ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Seviye {upgrade.levelRequired}
                    </>
                  ) : !canAfford ? (
                    <>
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Yetersiz BesCoin
                    </>
                  ) : (
                    "Geliştir"
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            {!canUpgrade && !isMaxLevel && (
              <TooltipContent>
                {!meetsLevelRequirement
                  ? `Bu geliştirme için seviye ${upgrade.levelRequired} gerekiyor`
                  : !canAfford
                    ? "Yeterli BesCoin'iniz yok"
                    : ""}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}
