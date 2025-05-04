"use client"

import { useState } from "react"
import { WoodenButton } from "@/components/ui/wooden-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronRight, Crown, ShoppingCart, Star } from "lucide-react"

export default function ButtonDemoPage() {
  const [loading, setLoading] = useState(false)

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">Ahşap Stil Buton Tasarımı (Palet 3)</h1>
        <p className="text-muted-foreground">
          Beslesene oyunu için ahşap/doğal dokulu, çizgi film tarzına uygun ve Palet 3 renklerini kullanan standart
          buton tasarımları.
        </p>
      </div>

      <Tabs defaultValue="variants">
        <TabsList className="mb-4">
          <TabsTrigger value="variants">Renk Varyantları</TabsTrigger>
          <TabsTrigger value="sizes">Boyut Varyantları</TabsTrigger>
          <TabsTrigger value="states">Buton Durumları</TabsTrigger>
          <TabsTrigger value="examples">Örnek Kullanımlar</TabsTrigger>
          <TabsTrigger value="tailwind">Tailwind Renkler</TabsTrigger>
        </TabsList>

        <TabsContent value="variants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Renk Varyantları</CardTitle>
              <CardDescription>Palet 3 renklerini kullanan farklı buton varyantları</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <WoodenButton variant="default">Gri Kahve (Varsayılan)</WoodenButton>
              <WoodenButton variant="green">Koyu Yeşil</WoodenButton>
              <WoodenButton variant="blue">Derin Mavi</WoodenButton>
              <WoodenButton variant="pink">Pastel Pembe</WoodenButton>
              <WoodenButton variant="yellow">Açık Sarı</WoodenButton>
              <WoodenButton variant="outline">Çerçeveli</WoodenButton>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tailwind" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tailwind Renk Varyantları</CardTitle>
              <CardDescription>Standart Tailwind renklerini kullanan buton varyantları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <WoodenButton variant="tailwind-green">Tailwind Yeşil</WoodenButton>
                <WoodenButton variant="tailwind-yellow">Tailwind Sarı</WoodenButton>
                <WoodenButton variant="tailwind-stone">Tailwind Stone</WoodenButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Tailwind Yeşil Renk Özellikleri:</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">bg-green-500</code>: Yeşil arka plan
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">text-white</code>: Beyaz metin
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">focus:ring-green-400</code>: Odaklanma
                      halkası rengi
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Tailwind Sarı Renk Özellikleri:</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">bg-yellow-500</code>: Sarı arka plan
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">text-gray-800</code>: Koyu gri metin
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">focus:ring-yellow-400</code>: Odaklanma
                      halkası rengi
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Tailwind Stone Renk Özellikleri:</p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">bg-stone-200</code>: Açık nötr arka plan
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">text-stone-700</code>: Koyu nötr metin
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">focus:ring-stone-400</code>: Odaklanma
                    halkası rengi
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">hover:bg-stone-300</code>: Fare üzerine
                    gelince arka plan rengi
                  </li>
                  <li>
                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">active:bg-stone-400</code>: Tıklandığında
                    arka plan rengi
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sizes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Boyut Varyantları</CardTitle>
              <CardDescription>Farklı boyutlarda butonlar</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <WoodenButton size="sm">Küçük</WoodenButton>
              <WoodenButton size="default">Normal</WoodenButton>
              <WoodenButton size="lg">Büyük</WoodenButton>
              <WoodenButton size="icon">
                <Star className="h-5 w-5" />
              </WoodenButton>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="states" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Buton Durumları</CardTitle>
              <CardDescription>Butonların farklı durumları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2">
                  <WoodenButton>Normal</WoodenButton>
                  <span className="text-xs text-muted-foreground">Normal</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <WoodenButton disabled>Devre Dışı</WoodenButton>
                  <span className="text-xs text-muted-foreground">Devre Dışı</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <WoodenButton onClick={handleLoadingClick} disabled={loading}>
                    {loading ? "Yükleniyor..." : "Yükleme Durumu"}
                  </WoodenButton>
                  <span className="text-xs text-muted-foreground">Yükleme</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Not:</strong> Hover ve Active durumları için butonların üzerine gelin veya tıklayın.
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>
                    <strong>Hover:</strong> Buton hafifçe büyür ve parlar
                  </li>
                  <li>
                    <strong>Active/Pressed:</strong> Buton basılmış gibi görünür (alt kenarlık kaybolur, üst kenarlık
                    oluşur)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Örnek Kullanımlar</CardTitle>
              <CardDescription>Oyun içinde kullanılabilecek buton örnekleri</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <WoodenButton variant="green">
                <Check className="h-4 w-4 mr-1" /> Topla
              </WoodenButton>
              <WoodenButton variant="blue">
                Geliştir <ChevronRight className="h-4 w-4 ml-1" />
              </WoodenButton>
              <WoodenButton variant="default">
                <ShoppingCart className="h-4 w-4 mr-1" /> Satın Al
              </WoodenButton>
              <WoodenButton variant="pink">Tamam</WoodenButton>
              <WoodenButton variant="outline">İptal</WoodenButton>
              <WoodenButton variant="yellow">
                <Crown className="h-4 w-4 mr-1" /> Premium
              </WoodenButton>
              <WoodenButton variant="tailwind-stone">Nötr Buton</WoodenButton>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
