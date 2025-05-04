"use client"

import { useState } from "react"
import { WoodenButton } from "@/components/ui/wooden-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Crown, Egg, Utensils } from "lucide-react"

export default function ButtonAnimationsPage() {
  const [clickCount, setClickCount] = useState<Record<string, number>>({
    green: 0,
    yellow: 0,
    blue: 0,
  })

  const handleClick = (button: string) => {
    setClickCount((prev) => ({
      ...prev,
      [button]: (prev[button] || 0) + 1,
    }))
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">Buton Animasyonları</h1>
        <p className="text-muted-foreground">Beslesene oyunu için gelişmiş animasyonlu buton örnekleri</p>
      </div>

      <Tabs defaultValue="pulse">
        <TabsList className="mb-4">
          <TabsTrigger value="pulse">Nabız Animasyonu</TabsTrigger>
          <TabsTrigger value="flash">Tıklama Animasyonu</TabsTrigger>
          <TabsTrigger value="combined">Kombinasyon</TabsTrigger>
          <TabsTrigger value="examples">Oyun Örnekleri</TabsTrigger>
        </TabsList>

        <TabsContent value="pulse" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nabız Animasyonu (Subtle Pulse)</CardTitle>
              <CardDescription>
                Butonlar hafifçe nabız gibi atar, kullanıcının dikkatini çekmek için idealdir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <WoodenButton variant="tailwind-green" animation="pulse">
                  Yeşil Nabız
                </WoodenButton>
                <WoodenButton variant="tailwind-yellow" animation="pulse-yellow">
                  Sarı Nabız
                </WoodenButton>
                <WoodenButton variant="blue" animation="pulse-blue">
                  Mavi Nabız
                </WoodenButton>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Nasıl Çalışır:</strong> Buton hafifçe büyür ve etrafında renkli bir gölge oluşur, sonra
                  normale döner. Bu döngü sürekli devam eder.
                </p>
                <p>
                  <strong>Kullanım:</strong> <code>animation="pulse"</code>, <code>animation="pulse-yellow"</code> veya{" "}
                  <code>animation="pulse-blue"</code> prop'unu ekleyin.
                </p>
                <p>
                  <strong>İdeal Kullanım Alanları:</strong> Önemli eylemler, yeni özellikler, kullanıcının dikkatini
                  çekmek istediğiniz butonlar.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flash" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tıklama Animasyonu (Click Flash)</CardTitle>
              <CardDescription>Butonlar tıklandığında daha belirgin bir görsel geri bildirim sağlar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <WoodenButton variant="tailwind-green" animation="flash" onClick={() => handleClick("green")}>
                  Tıkla ({clickCount.green || 0})
                </WoodenButton>
                <WoodenButton variant="tailwind-yellow" animation="flash" onClick={() => handleClick("yellow")}>
                  Tıkla ({clickCount.yellow || 0})
                </WoodenButton>
                <WoodenButton variant="blue" animation="flash" onClick={() => handleClick("blue")}>
                  Tıkla ({clickCount.blue || 0})
                </WoodenButton>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Nasıl Çalışır:</strong> Buton tıklandığında küçülür ve koyulaşır, sonra hızla normale döner.
                </p>
                <p>
                  <strong>Kullanım:</strong> <code>animation="flash"</code> prop'unu ekleyin.
                </p>
                <p>
                  <strong>İdeal Kullanım Alanları:</strong> Sık tıklanan butonlar, oyun içi eylemler, kullanıcıya
                  tıklamanın işe yaradığını göstermek istediğiniz durumlar.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="combined" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kombinasyon Animasyonları</CardTitle>
              <CardDescription>Nabız ve tıklama animasyonlarını birleştirme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <WoodenButton
                  variant="tailwind-green"
                  animation="pulse"
                  className="active:animate-click-flash"
                  onClick={() => handleClick("green")}
                >
                  Yeşil Kombo ({clickCount.green || 0})
                </WoodenButton>
                <WoodenButton
                  variant="tailwind-yellow"
                  animation="pulse-yellow"
                  className="active:animate-click-flash"
                  onClick={() => handleClick("yellow")}
                >
                  Sarı Kombo ({clickCount.yellow || 0})
                </WoodenButton>
                <WoodenButton
                  variant="blue"
                  animation="pulse-blue"
                  className="active:animate-click-flash"
                  onClick={() => handleClick("blue")}
                >
                  Mavi Kombo ({clickCount.blue || 0})
                </WoodenButton>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Nasıl Çalışır:</strong> Buton sürekli nabız animasyonu gösterir ve tıklandığında flash
                  animasyonu da çalışır.
                </p>
                <p>
                  <strong>Kullanım:</strong> <code>animation="pulse"</code> prop'unu ve{" "}
                  <code>className="active:animate-click-flash"</code> ekleyin.
                </p>
                <p>
                  <strong>İdeal Kullanım Alanları:</strong> Çok önemli eylemler, ana oyun mekanikleri, kullanıcının
                  kesinlikle fark etmesini istediğiniz butonlar.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Oyun İçi Örnekler</CardTitle>
              <CardDescription>Beslesene oyunu için animasyonlu buton örnekleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <WoodenButton variant="tailwind-green" animation="pulse">
                  <Utensils className="h-4 w-4 mr-2" />
                  Hepsini Besle
                </WoodenButton>
                <WoodenButton variant="tailwind-yellow" animation="pulse-yellow">
                  <Egg className="h-4 w-4 mr-2" />
                  Yumurtaları Topla
                </WoodenButton>
                <WoodenButton variant="blue" animation="flash">
                  Geliştir <ChevronRight className="h-4 w-4 ml-1" />
                </WoodenButton>
                <WoodenButton variant="yellow" animation="pulse-yellow">
                  <Crown className="h-4 w-4 mr-1" /> Premium
                </WoodenButton>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Kullanım Önerileri:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Nabız Animasyonu:</strong> "Hepsini Besle", "Yumurtaları Topla" gibi ana eylemler için
                    kullanın
                  </li>
                  <li>
                    <strong>Tıklama Animasyonu:</strong> "Besle", "Topla" gibi sık kullanılan eylemler için kullanın
                  </li>
                  <li>
                    <strong>Premium Butonlar:</strong> "Premium" veya özel teklifler için nabız animasyonu kullanın
                  </li>
                  <li>
                    <strong>Geliştirme Butonları:</strong> "Geliştir" gibi ilerleme butonları için tıklama animasyonu
                    kullanın
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
