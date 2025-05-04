"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import { UpgradeCard } from "@/components/upgrades/upgrade-card"
import { CoopStatusCard } from "@/components/upgrades/coop-status-card"

export default function UpgradesPage() {
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{
    title: string
    description: string
    action: () => void
    upgrade?: any
    cost?: number
  } | null>(null)

  // Player data
  const playerLevel = 5
  const playerBesCoin = 1250

  // Show feedback message
  const displayFeedback = (message: string, type: "success" | "error" | "info") => {
    setFeedbackMessage(message)
    setFeedbackType(type)
    setShowFeedbackMessage(true)
    setTimeout(() => {
      setShowFeedbackMessage(false)
    }, 3000)
  }

  // Handle upgrade
  const handleUpgrade = (upgrade: any) => {
    // Check if player has enough BesCoin
    if (playerBesCoin < upgrade.cost) {
      displayFeedback("Yeterli BesCoin'iniz yok!", "error")
      return
    }

    // Check if player meets level requirement
    if (playerLevel < upgrade.levelRequired) {
      displayFeedback(`Bu geliştirme için seviye ${upgrade.levelRequired} gerekiyor!`, "error")
      return
    }

    setConfirmAction({
      title: `${upgrade.name} Geliştir`,
      description: `${upgrade.name} geliştirmesini ${upgrade.cost} BesCoin karşılığında yapmak istediğinize emin misiniz?`,
      action: () => {
        // Here you would implement the actual upgrade logic
        displayFeedback(`${upgrade.name} başarıyla geliştirildi!`, "success")
        setShowConfirmDialog(false)
      },
      upgrade,
      cost: upgrade.cost,
    })
    setShowConfirmDialog(true)
  }

  // Coop upgrades data
  const coopUpgrades = [
    {
      id: 1,
      name: "Kümes Kapasitesi",
      description: "Kümesinizdeki maksimum tavuk sayısını artırır",
      currentLevel: 2,
      maxLevel: 5,
      cost: 500,
      levelRequired: 3,
      benefits: ["Her seviye +3 tavuk kapasitesi ekler", "Daha fazla yumurta üretimi sağlar"],
      image: "/placeholder.svg?key=vwn7g",
    },
    {
      id: 2,
      name: "Kümes Konforu",
      description: "Tavukların mutluluğunu ve yumurta verimini artırır",
      currentLevel: 1,
      maxLevel: 5,
      cost: 350,
      levelRequired: 2,
      benefits: ["Her seviye tavuk mutluluğunu %10 artırır", "Yumurta üretim hızını artırır"],
      image: "/placeholder.svg?key=oi9ud",
    },
    {
      id: 3,
      name: "Otomatik Besleme",
      description: "Tavukları otomatik olarak besler",
      currentLevel: 0,
      maxLevel: 3,
      cost: 800,
      levelRequired: 4,
      benefits: [
        "Seviye 1: 12 saatte bir otomatik besleme",
        "Seviye 2: 8 saatte bir otomatik besleme",
        "Seviye 3: 4 saatte bir otomatik besleme",
      ],
      image: "/placeholder.svg?key=hf019",
    },
    {
      id: 4,
      name: "Yumurta Toplayıcı",
      description: "Yumurtaları otomatik olarak toplar",
      currentLevel: 0,
      maxLevel: 3,
      cost: 1000,
      levelRequired: 6,
      benefits: [
        "Seviye 1: 12 saatte bir otomatik toplama",
        "Seviye 2: 8 saatte bir otomatik toplama",
        "Seviye 3: 4 saatte bir otomatik toplama",
      ],
      image: "/placeholder.svg?key=mqwvx",
    },
  ]

  // Storage upgrades data
  const storageUpgrades = [
    {
      id: 5,
      name: "Yem Deposu",
      description: "Depolayabileceğiniz maksimum yem miktarını artırır",
      currentLevel: 1,
      maxLevel: 5,
      cost: 400,
      levelRequired: 2,
      benefits: ["Her seviye +50 yem kapasitesi ekler", "Daha az sıklıkta yem satın almanızı sağlar"],
      image: "/placeholder.svg?key=lmu9h",
    },
    {
      id: 6,
      name: "Yumurta Deposu",
      description: "Depolayabileceğiniz maksimum yumurta sayısını artırır",
      currentLevel: 2,
      maxLevel: 5,
      cost: 450,
      levelRequired: 3,
      benefits: ["Her seviye +30 yumurta kapasitesi ekler", "Daha az sıklıkta yumurta satmanızı sağlar"],
      image: "/placeholder.svg?key=t2wft",
    },
    {
      id: 7,
      name: "Soğuk Hava Deposu",
      description: "Yumurtaların tazeliğini korur ve değerini artırır",
      currentLevel: 0,
      maxLevel: 3,
      cost: 1200,
      levelRequired: 7,
      benefits: [
        "Seviye 1: Yumurtaların değerini %10 artırır",
        "Seviye 2: Yumurtaların değerini %20 artırır",
        "Seviye 3: Yumurtaların değerini %30 artırır",
      ],
      image: "/placeholder.svg?key=jt1o0",
    },
  ]

  // Production upgrades data
  const productionUpgrades = [
    {
      id: 8,
      name: "Tavuk Genetiği",
      description: "Tavukların yumurta üretim verimini artırır",
      currentLevel: 1,
      maxLevel: 5,
      cost: 600,
      levelRequired: 4,
      benefits: ["Her seviye yumurta üretimini %15 artırır", "Daha kaliteli yumurtalar üretir"],
      image: "/placeholder.svg?height=120&width=120&query=Chicken genetics research",
    },
    {
      id: 9,
      name: "Premium Yem Formülü",
      description: "Özel yem formülü ile tavukların verimini artırır",
      currentLevel: 0,
      maxLevel: 3,
      cost: 750,
      levelRequired: 5,
      benefits: [
        "Seviye 1: Yumurta üretimini %10 artırır",
        "Seviye 2: Yumurta üretimini %20 artırır",
        "Seviye 3: Yumurta üretimini %30 artırır",
      ],
      image: "/placeholder.svg?height=120&width=120&query=Premium chicken feed formula",
    },
    {
      id: 10,
      name: "Tavuk Sağlığı",
      description: "Tavukların sağlığını ve ömrünü artırır",
      currentLevel: 1,
      maxLevel: 3,
      cost: 500,
      levelRequired: 3,
      benefits: [
        "Seviye 1: Tavuk ömrünü %20 artırır",
        "Seviye 2: Tavuk ömrünü %40 artırır",
        "Seviye 3: Tavuk ömrünü %60 artırır",
      ],
      image: "/placeholder.svg?height=120&width=120&query=Chicken health improvement",
    },
  ]

  // Coop status data
  const coopStatus = [
    {
      id: 1,
      name: "Kümes 1",
      capacity: {
        current: 6,
        max: 6,
      },
      chickens: 5,
      efficiency: 85,
      image: "/placeholder.svg?height=80&width=80&query=Chicken coop building",
    },
    {
      id: 2,
      name: "Kümes 2",
      capacity: {
        current: 0,
        max: 6,
      },
      chickens: 0,
      efficiency: 0,
      locked: true,
      unlockLevel: 7,
      image: "/placeholder.svg?height=80&width=80&query=Locked chicken coop building",
    },
    {
      id: 3,
      name: "Kümes 3",
      capacity: {
        current: 0,
        max: 9,
      },
      chickens: 0,
      efficiency: 0,
      locked: true,
      unlockLevel: 10,
      image: "/placeholder.svg?height=80&width=80&query=Premium chicken coop building",
    },
  ]

  return (
    <div className="relative space-y-4 pb-16">
      {/* Upgrades Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Geliştirmeler</h1>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          1,250 BesCoin
        </Badge>
      </div>

      {/* Coop Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coopStatus.map((coop) => (
          <CoopStatusCard key={coop.id} coop={coop} playerLevel={playerLevel} />
        ))}
      </div>

      {/* Upgrades Tabs */}
      <Tabs defaultValue="coop" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-10">
          <TabsTrigger value="coop">Kümes</TabsTrigger>
          <TabsTrigger value="storage">Depolama</TabsTrigger>
          <TabsTrigger value="production">Üretim</TabsTrigger>
        </TabsList>

        {/* Coop Upgrades Tab */}
        <TabsContent value="coop" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coopUpgrades.map((upgrade) => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                onUpgrade={handleUpgrade}
                playerLevel={playerLevel}
                playerBesCoin={playerBesCoin}
              />
            ))}
          </div>
        </TabsContent>

        {/* Storage Upgrades Tab */}
        <TabsContent value="storage" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storageUpgrades.map((upgrade) => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                onUpgrade={handleUpgrade}
                playerLevel={playerLevel}
                playerBesCoin={playerBesCoin}
              />
            ))}
          </div>
        </TabsContent>

        {/* Production Upgrades Tab */}
        <TabsContent value="production" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productionUpgrades.map((upgrade) => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                onUpgrade={handleUpgrade}
                playerLevel={playerLevel}
                playerBesCoin={playerBesCoin}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        {confirmAction && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{confirmAction.title}</DialogTitle>
              <DialogDescription>{confirmAction.description}</DialogDescription>
            </DialogHeader>
            {confirmAction.upgrade && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <Image
                    src={confirmAction.upgrade.image || "/placeholder.svg"}
                    alt={confirmAction.upgrade.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div>
                    <h4 className="font-medium">{confirmAction.upgrade.name}</h4>
                    <p className="text-sm text-muted-foreground">{confirmAction.upgrade.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 text-blue-700 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Geliştirme Faydaları
                  </h4>
                  <ul className="space-y-1 text-sm list-disc pl-5">
                    {confirmAction.upgrade.benefits.map((benefit: string, index: number) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium">Maliyet:</span>
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                      <span className="text-xs text-white font-bold">B</span>
                    </div>
                    <span className="font-bold">{confirmAction.cost}</span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                İptal
              </Button>
              <Button onClick={confirmAction.action}>Geliştir</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Feedback Message */}
      {showFeedbackMessage && (
        <div
          className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in-up ${
            feedbackType === "success"
              ? "bg-green-500 text-white"
              : feedbackType === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          {feedbackType === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : feedbackType === "error" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <span>{feedbackMessage}</span>
        </div>
      )}
    </div>
  )
}
