"use client"

import { WoodenButton } from "@/components/ui/wooden-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Egg } from "lucide-react"

export default function ButtonExamplesPage() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">Buton Örnekleri</h1>
        <p className="text-muted-foreground">Paylaşılan buton örneklerinin WoodenButton bileşeni ile uygulanması</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tailwind Sınıfları ve WoodenButton Karşılaştırması</CardTitle>
          <CardDescription>Ham Tailwind sınıfları ile WoodenButton bileşeninin karşılaştırması</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Besle Buton Örneği */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Besle Butonu</h3>

            <div className="space-y-2">
              <p className="text-sm font-medium">1. Ham Tailwind Sınıfları ile:</p>
              <div className="p-4 border rounded-md bg-gray-50">
                <button className="py-2 px-4 rounded-lg shadow-sm font-semibold transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 hover:brightness-110 active:scale-95 active:brightness-90 bg-green-500 text-white focus:ring-green-400 flex items-center">
                  <Utensils className="h-4 w-4 mr-2" />
                  Besle
                </button>
              </div>
              <div className="p-4 border rounded-md bg-gray-50 overflow-x-auto">
                <pre className="text-xs text-gray-700">
                  {`<button className="py-2 px-4 rounded-lg shadow-sm font-semibold transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 hover:brightness-110 active:scale-95 active:brightness-90 bg-green-500 text-white focus:ring-green-400">
  Besle
</button>`}
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">2. WoodenButton Bileşeni ile:</p>
              <div className="p-4 border rounded-md bg-gray-50">
                <WoodenButton variant="tailwind-green">
                  <Utensils className="h-4 w-4 mr-2" />
                  Besle
                </WoodenButton>
              </div>
              <div className="p-4 border rounded-md bg-gray-50 overflow-x-auto">
                <pre className="text-xs text-gray-700">
                  {`<WoodenButton variant="tailwind-green">
  <Utensils className="h-4 w-4 mr-2" />
  Besle
</WoodenButton>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Topla Buton Örneği */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Topla Butonu</h3>

            <div className="space-y-2">
              <p className="text-sm font-medium">1. Ham Tailwind Sınıfları ile:</p>
              <div className="p-4 border rounded-md bg-gray-50">
                <button className="py-2 px-4 rounded-lg shadow-sm font-semibold transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 hover:brightness-110 active:scale-95 active:brightness-90 bg-yellow-500 text-gray-800 focus:ring-yellow-400 flex items-center">
                  <Egg className="h-4 w-4 mr-2" />
                  Topla
                </button>
              </div>
              <div className="p-4 border rounded-md bg-gray-50 overflow-x-auto">
                <pre className="text-xs text-gray-700">
                  {`<button className="py-2 px-4 rounded-lg shadow-sm font-semibold transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 hover:brightness-110 active:scale-95 active:brightness-90 bg-yellow-500 text-gray-800 focus:ring-yellow-400">
  Topla
</button>`}
                </pre>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">2. WoodenButton Bileşeni ile:</p>
              <div className="p-4 border rounded-md bg-gray-50">
                <WoodenButton variant="tailwind-yellow">
                  <Egg className="h-4 w-4 mr-2" />
                  Topla
                </WoodenButton>
              </div>
              <div className="p-4 border rounded-md bg-gray-50 overflow-x-auto">
                <pre className="text-xs text-gray-700">
                  {`<WoodenButton variant="tailwind-yellow">
  <Egg className="h-4 w-4 mr-2" />
  Topla
</WoodenButton>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Avantajlar */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">WoodenButton Bileşeninin Avantajları</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Daha Kısa ve Okunabilir Kod:</strong> Uzun Tailwind sınıfları yerine basit varyant isimleri
              </li>
              <li>
                <strong>Tutarlılık:</strong> Tüm butonlar aynı temel stili ve davranışı paylaşır
              </li>
              <li>
                <strong>Kolay Güncelleme:</strong> Stil değişiklikleri tek bir yerde yapılabilir
              </li>
              <li>
                <strong>Ahşap Doku:</strong> Otomatik olarak ahşap doku eklenir
              </li>
              <li>
                <strong>Boyut Varyantları:</strong> <code>size="sm"</code>, <code>size="lg"</code> gibi boyut
                seçenekleri
              </li>
              <li>
                <strong>TypeScript Desteği:</strong> Otomatik tamamlama ve tip kontrolü
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
