"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, ArrowRight, CheckCircle2, Info } from "lucide-react"
import { MarketItemCard } from "@/components/market/market-item-card"
import { InventoryItem } from "@/components/market/inventory-item"
import { MarketCategorySelector } from "@/components/market/market-category-selector"

export default function MarketPage() {
  const [activeCategory, setActiveCategory] = useState("chickens")
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{
    title: string
    description: string
    action: () => void
    item?: any
  } | null>(null)

  // Show feedback message
  const displayFeedback = (message: string, type: "success" | "error" | "info") => {
    setFeedbackMessage(message)
    setFeedbackType(type)
    setShowFeedbackMessage(true)
    setTimeout(() => {
      setShowFeedbackMessage(false)
    }, 3000)
  }

  // Handle buy item
  const handleBuyItem = (item: any) => {
    setConfirmAction({
      title: `${item.name} Satın Al`,
      description: `${item.name} ürününü ${item.price} BesCoin karşılığında satın almak istediğinize emin misiniz?`,
      action: () => {
        // Here you would implement the actual purchase logic
        displayFeedback(`${item.name} başarıyla satın alındı!`, "success")
        setShowConfirmDialog(false)
      },
      item,
    })
    setShowConfirmDialog(true)
  }

  // Handle sell item
  const handleSellItem = (item: any) => {
    setConfirmAction({
      title: `${item.name} Sat`,
      description: `${item.name} ürününü ${item.sellPrice} BesCoin karşılığında satmak istediğinize emin misiniz?`,
      action: () => {
        // Here you would implement the actual selling logic
        displayFeedback(`${item.name} başarıyla satıldı!`, "success")
        setShowConfirmDialog(false)
      },
      item,
    })
    setShowConfirmDialog(true)
  }

  // Sample buy items data
  const buyItems = {
    chickens: [
      {
        id: 1,
        name: "Manisa Tavuğu",
        description: "Yüksek yumurta verimi, orta seviye yem tüketimi",
        price: 500,
        image: "/placeholder.svg?key=ibu80",
        stats: {
          eggProduction: 4,
          feedConsumption: 2,
          lifespan: 3,
        },
      },
      {
        id: 2,
        name: "Anadolu Tavuğu",
        description: "Orta yumurta verimi, düşük yem tüketimi",
        price: 350,
        image: "/placeholder.svg?key=bpeam",
        stats: {
          eggProduction: 3,
          feedConsumption: 1,
          lifespan: 4,
        },
      },
      {
        id: 3,
        name: "Beyaz Tavuk",
        description: "Düşük yumurta verimi, çok düşük yem tüketimi",
        price: 200,
        image: "/placeholder.svg?key=hkm04",
        stats: {
          eggProduction: 2,
          feedConsumption: 1,
          lifespan: 5,
        },
      },
      {
        id: 4,
        name: "Premium Tavuk",
        description: "Çok yüksek yumurta verimi, yüksek yem tüketimi",
        price: 1000,
        image: "/placeholder.svg?key=07m57",
        stats: {
          eggProduction: 5,
          feedConsumption: 3,
          lifespan: 4,
        },
        badge: "Premium",
      },
    ],
    roosters: [
      {
        id: 5,
        name: "Denizli Horozu",
        description: "Tavuk üretkenliğini artırır, orta seviye yem tüketimi",
        price: 750,
        image: "/placeholder.svg?key=kixfu",
        stats: {
          boost: 2,
          feedConsumption: 2,
          lifespan: 4,
        },
      },
      {
        id: 6,
        name: "Premium Horoz",
        description: "Tavuk üretkenliğini çok artırır, yüksek yem tüketimi",
        price: 1500,
        image: "/placeholder.svg?key=7ptiq",
        stats: {
          boost: 3,
          feedConsumption: 3,
          lifespan: 5,
        },
        badge: "Premium",
      },
    ],
    feed: [
      {
        id: 7,
        name: "Standart Yem",
        description: "Temel tavuk yemi, 10 öğün",
        price: 100,
        image: "/placeholder.svg?key=3t1xc",
        quantity: 10,
      },
      {
        id: 8,
        name: "Premium Yem",
        description: "Yumurta verimini artıran premium yem, 10 öğün",
        price: 250,
        image: "/placeholder.svg?height=120&width=120&query=Premium chicken feed",
        quantity: 10,
        badge: "Premium",
      },
      {
        id: 9,
        name: "Toplu Yem",
        description: "Ekonomik toplu yem paketi, 50 öğün",
        price: 400,
        image: "/placeholder.svg?height=120&width=120&query=Bulk chicken feed",
        quantity: 50,
        badge: "Ekonomik",
      },
    ],
    coops: [
      {
        id: 10,
        name: "Kümes Genişletme",
        description: "Kümes kapasitesini 3 tavuk daha artırır",
        price: 2000,
        image: "/placeholder.svg?height=120&width=120&query=Chicken coop expansion",
      },
      {
        id: 11,
        name: "Premium Kümes",
        description: "Tavukların mutluluğunu ve yumurta verimini artırır",
        price: 5000,
        image: "/placeholder.svg?height=120&width=120&query=Premium chicken coop",
        badge: "Premium",
      },
    ],
  }

  // Sample inventory items data
  const inventoryItems = [
    {
      id: 1,
      name: "Yumurta",
      description: "Taze tavuk yumurtası",
      quantity: 24,
      sellPrice: 10,
      image: "/placeholder.svg?height=80&width=80&query=Chicken egg",
    },
    {
      id: 2,
      name: "Premium Yumurta",
      description: "Premium tavuklardan elde edilen yumurta",
      quantity: 8,
      sellPrice: 25,
      image: "/placeholder.svg?height=80&width=80&query=Premium chicken egg",
      badge: "Premium",
    },
    {
      id: 3,
      name: "Manisa Tavuğu",
      description: "Fazla tavuklarınızı satabilirsiniz",
      quantity: 2,
      sellPrice: 250,
      image: "/placeholder.svg?key=u7tyt",
    },
    {
      id: 4,
      name: "Anadolu Tavuğu",
      description: "Fazla tavuklarınızı satabilirsiniz",
      quantity: 1,
      sellPrice: 175,
      image: "/placeholder.svg?key=57zig",
    },
  ]

  return (
    <div className="relative space-y-4 pb-16">
      {/* Market Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Market</h1>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          1,250 BesCoin
        </Badge>
      </div>

      {/* Market Tabs */}
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-10">
          <TabsTrigger value="buy">Satın Al</TabsTrigger>
          <TabsTrigger value="sell">Sat</TabsTrigger>
          <TabsTrigger value="exchange">BesCoin</TabsTrigger>
        </TabsList>

        {/* Buy Tab */}
        <TabsContent value="buy" className="space-y-4">
          <MarketCategorySelector activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
              {buyItems[activeCategory as keyof typeof buyItems].map((item) => (
                <MarketItemCard key={item.id} item={item} onBuy={handleBuyItem} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Sell Tab */}
        <TabsContent value="sell" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Envanteriniz</CardTitle>
              <CardDescription>Satmak istediğiniz öğeleri seçin</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-320px)]">
                <div className="divide-y">
                  {inventoryItems.map((item) => (
                    <InventoryItem key={item.id} item={item} onSell={handleSellItem} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exchange Tab */}
        <TabsContent value="exchange" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>BesCoin Dönüşümü</CardTitle>
              <CardDescription>BesCoin'lerinizi gerçek paraya dönüştürün</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">B</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mevcut Bakiye</p>
                    <p className="text-2xl font-bold">1,250 BesCoin</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Tahmini Değer</p>
                  <p className="text-lg font-medium">₺125.00</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-blue-500/10 text-blue-700 rounded-lg">
                <Info className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  BesCoin'lerinizi gerçek paraya dönüştürmek için minimum 1,000 BesCoin bakiyeniz olmalıdır. Dönüşüm
                  oranı: 10 BesCoin = ₺1.00
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="coin-amount" className="text-sm font-medium">
                    BesCoin Miktarı
                  </label>
                  <Input id="coin-amount" type="number" placeholder="1000" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Alacağınız Tutar</label>
                  <div className="h-10 flex items-center px-3 mt-1 border rounded-md bg-muted/30">₺100.00</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Link href="/withdrawal" className="w-full">
                <Button className="w-full">
                  Para Çekme Sayfasına Git
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground text-center">
                Para çekme işlemleri 24 saat içinde işleme alınır ve banka hesabınıza aktarılır.
              </p>
            </CardFooter>
          </Card>
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
            {confirmAction.item && (
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <Image
                  src={confirmAction.item.image || "/placeholder.svg"}
                  alt={confirmAction.item.name}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <div>
                  <h4 className="font-medium">{confirmAction.item.name}</h4>
                  <p className="text-sm text-muted-foreground">{confirmAction.item.description}</p>
                </div>
              </div>
            )}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                İptal
              </Button>
              <Button onClick={confirmAction.action}>Onayla</Button>
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
