"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Crown, Zap, ShieldCheck, Gift, Clock, X, ChevronRight, Star } from "lucide-react"
import { motion } from "framer-motion"

// Mock data - would come from API in production
const PREMIUM_STATUS = {
  isPremium: false,
  expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  tier: "monthly",
}

export default function PremiumPage() {
  const [isPremium, setIsPremium] = useState(PREMIUM_STATUS.isPremium)
  const [selectedPlan, setSelectedPlan] = useState("monthly")
  const [isClient, setIsClient] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const handlePurchase = () => {
    // This would integrate with a payment gateway in production
    alert("Bu işlem ödeme sayfasına yönlendirecektir.")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/80 to-primary p-6 text-primary-foreground shadow-lg"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />

        <div className="relative flex items-center gap-3 mb-4">
          <Crown className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Premium Üyelik</h1>
        </div>

        <p className="relative max-w-md text-primary-foreground/90 mb-6">
          Premium üyelik ile daha hızlı ilerleyin, özel içeriklere erişin ve reklamlardan kurtulun!
        </p>

        {isPremium ? (
          <div className="relative inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            <ShieldCheck className="h-4 w-4" />
            <span>Premium üyeliğiniz {formatDate(PREMIUM_STATUS.expiryDate)} tarihine kadar aktif</span>
          </div>
        ) : (
          <Button onClick={handlePurchase} size="lg" variant="secondary" className="relative font-semibold">
            Hemen Premium Ol
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </motion.div>

      {/* Benefits Section */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        <h2 className="text-xl font-semibold">Premium Avantajları</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <motion.div variants={item}>
            <BenefitCard
              icon={<Zap className="h-5 w-5 text-amber-500" />}
              title="2x Daha Hızlı İlerleme"
              description="Tüm aktivitelerden 2 kat daha fazla BesCoins kazanın"
            />
          </motion.div>

          <motion.div variants={item}>
            <BenefitCard
              icon={<X className="h-5 w-5 text-red-500" />}
              title="Reklamsız Deneyim"
              description="Oyun içi reklamları tamamen kaldırın"
            />
          </motion.div>

          <motion.div variants={item}>
            <BenefitCard
              icon={<Gift className="h-5 w-5 text-purple-500" />}
              title="Günlük Premium Ödüller"
              description="Her gün özel premium ödüller kazanın"
            />
          </motion.div>

          <motion.div variants={item}>
            <BenefitCard
              icon={<Clock className="h-5 w-5 text-blue-500" />}
              title="Daha Hızlı Yenileme"
              description="Tavuk kümesi ve diğer kaynaklar daha hızlı yenilenir"
            />
          </motion.div>

          <motion.div variants={item}>
            <BenefitCard
              icon={<Star className="h-5 w-5 text-yellow-500" />}
              title="Özel Premium Eşyalar"
              description="Sadece premium üyelere özel eşyalara erişin"
            />
          </motion.div>

          <motion.div variants={item}>
            <BenefitCard
              icon={<ShieldCheck className="h-5 w-5 text-green-500" />}
              title="Öncelikli Destek"
              description="Müşteri desteğinde öncelik kazanın"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Üyelik Planları</h2>

        <Tabs defaultValue="monthly" value={selectedPlan} onValueChange={setSelectedPlan} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="monthly">Aylık</TabsTrigger>
            <TabsTrigger value="yearly">Yıllık</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <PricingCard
              title="Aylık Premium"
              price="₺49.99"
              period="/ay"
              features={["Reklamsız deneyim", "2x daha hızlı ilerleme", "Günlük premium ödüller", "Öncelikli destek"]}
              onPurchase={handlePurchase}
              highlight={false}
            />
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <PricingCard
              title="Yıllık Premium"
              price="₺479.88"
              period="/yıl"
              discount="₺39.99/ay - %20 Tasarruf"
              features={[
                "Reklamsız deneyim",
                "2x daha hızlı ilerleme",
                "Günlük premium ödüller",
                "Öncelikli destek",
                "Özel premium eşyalar",
                "VIP etkinliklere erişim",
              ]}
              onPurchase={handlePurchase}
              highlight={true}
            />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Sıkça Sorulan Sorular</h2>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Premium üyeliğimi nasıl iptal edebilirim?</h3>
              <p className="text-sm text-muted-foreground">
                Hesap ayarlarınızdan istediğiniz zaman premium üyeliğinizi iptal edebilirsiniz. İptal ettiğinizde, ödeme
                döneminizin sonuna kadar premium avantajlardan yararlanmaya devam edersiniz.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Premium üyelik hangi ödeme yöntemlerini destekliyor?</h3>
              <p className="text-sm text-muted-foreground">
                Kredi kartı, banka kartı ve mobil ödeme yöntemlerini destekliyoruz. Tüm ödemeler güvenli bir şekilde
                işlenir.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Premium üyeliğimi yükseltebilir miyim?</h3>
              <p className="text-sm text-muted-foreground">
                Aylık üyelikten yıllık üyeliğe istediğiniz zaman yükseltme yapabilirsiniz. Yükseltme yaptığınızda, kalan
                aylık üyelik süreniz için ödediğiniz miktar, yıllık üyelik ücretinden düşülür.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <Card className="h-full overflow-hidden border-l-4 border-l-primary transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 rounded-full bg-primary/10 p-2">{icon}</div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PricingCardProps {
  title: string
  price: string
  period: string
  discount?: string
  features: string[]
  onPurchase: () => void
  highlight: boolean
}

function PricingCard({ title, price, period, discount, features, onPurchase, highlight }: PricingCardProps) {
  return (
    <Card className={`overflow-hidden transition-all ${highlight ? "border-2 border-primary shadow-lg" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {highlight && <Badge className="bg-primary/10 text-primary hover:bg-primary/20">En Popüler</Badge>}
        </div>
        {discount && <CardDescription>{discount}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={onPurchase} className="w-full" variant={highlight ? "default" : "outline"}>
          {highlight ? "Şimdi Abone Ol" : "Seç"}
        </Button>
      </CardFooter>
    </Card>
  )
}
