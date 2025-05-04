"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Share2,
  Copy,
  Mail,
  MessageSquare,
  Gift,
  Users,
  CheckCircle2,
  Clock,
  Award,
  Facebook,
  Twitter,
  Instagram,
  Send,
  Smartphone,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data for invited friends
const INVITED_FRIENDS = [
  { id: 1, name: "Ahmet Yılmaz", joinDate: "28 Nisan 2023", status: "completed", level: 7, reward: 200 },
  { id: 2, name: "Ayşe Demir", joinDate: "15 Mart 2023", status: "completed", level: 6, reward: 200 },
  { id: 3, name: "Mehmet Kaya", joinDate: "2 Mayıs 2023", status: "in-progress", level: 3, reward: 200 },
  { id: 4, name: "Zeynep Çelik", joinDate: "10 Mayıs 2023", status: "in-progress", level: 2, reward: 200 },
]

export default function InvitePage() {
  const [referralLink, setReferralLink] = useState("https://beslesene.com/ref/user123")
  const [referralCode, setReferralCode] = useState("USER123")
  const [email, setEmail] = useState("")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("link")
  const [totalEarned, setTotalEarned] = useState(0)

  // Calculate total earned from completed referrals
  useEffect(() => {
    const earned = INVITED_FRIENDS.filter((friend) => friend.status === "completed").reduce(
      (sum, friend) => sum + friend.reward,
      0,
    )
    setTotalEarned(earned)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Kopyalandı!",
      description: "Davet bağlantısı panoya kopyalandı.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEmailInvite = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Davet Gönderildi!",
      description: `${email} adresine davet e-postası gönderildi.`,
    })
    setEmail("")
  }

  const shareVia = (platform: string) => {
    // In a real app, this would open the native share dialog or redirect to the platform
    toast({
      title: `${platform} ile Paylaş`,
      description: "Paylaşım ekranı açılıyor...",
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Arkadaşlarını Davet Et</h1>
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 border-amber-200"
          >
            <Award className="h-4 w-4" />
            <span>{totalEarned} BesCoin Kazanıldı</span>
          </Badge>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="pb-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Davet Et ve Kazan!
            </CardTitle>
            <CardDescription className="text-purple-100">
              Arkadaşlarını davet et, birlikte oynayın ve ödüller kazanın
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-100">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="h-5 w-5 text-purple-500" />
                <p className="text-center font-medium text-gray-800">
                  Her arkadaşın için <span className="text-purple-600 font-bold">200 BesCoin</span> kazan!
                </p>
              </div>
              <p className="text-sm text-center text-gray-600 mb-2">
                Davet ettiğin arkadaşın 5. seviyeye ulaştığında ödülün otomatik olarak hesabına eklenecek.
              </p>
              <div className="flex justify-center">
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                  Sınırsız davet hakkı!
                </Badge>
              </div>
            </div>

            <Tabs defaultValue="link" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="link">Davet Bağlantısı</TabsTrigger>
                <TabsTrigger value="code">Davet Kodu</TabsTrigger>
              </TabsList>

              <TabsContent value="link" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="referral-link">Davet Bağlantın</Label>
                  <div className="flex">
                    <Input
                      id="referral-link"
                      value={referralLink}
                      readOnly
                      className="rounded-r-none border-r-0 bg-white"
                    />
                    <Button
                      variant="default"
                      className="rounded-l-none bg-purple-600 hover:bg-purple-700"
                      onClick={() => copyToClipboard(referralLink)}
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="ml-2 hidden sm:inline">{copied ? "Kopyalandı" : "Kopyala"}</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Hızlı Paylaşım</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 flex flex-col items-center py-3 h-auto"
                      onClick={() => shareVia("WhatsApp")}
                    >
                      <MessageSquare className="h-5 w-5 text-green-600 mb-1" />
                      <span className="text-xs">WhatsApp</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex flex-col items-center py-3 h-auto"
                      onClick={() => shareVia("Facebook")}
                    >
                      <Facebook className="h-5 w-5 text-blue-600 mb-1" />
                      <span className="text-xs">Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex flex-col items-center py-3 h-auto"
                      onClick={() => shareVia("Twitter")}
                    >
                      <Twitter className="h-5 w-5 text-blue-400 mb-1" />
                      <span className="text-xs">Twitter</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex flex-col items-center py-3 h-auto"
                      onClick={() => shareVia("Instagram")}
                    >
                      <Instagram className="h-5 w-5 text-pink-600 mb-1" />
                      <span className="text-xs">Instagram</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex flex-col items-center py-3 h-auto"
                      onClick={() => shareVia("Email")}
                    >
                      <Mail className="h-5 w-5 text-red-500 mb-1" />
                      <span className="text-xs">E-posta</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex flex-col items-center py-3 h-auto"
                      onClick={() => shareVia("More")}
                    >
                      <Share2 className="h-5 w-5 text-gray-600 mb-1" />
                      <span className="text-xs">Diğer</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="referral-code">Davet Kodun</Label>
                  <div className="flex">
                    <Input
                      id="referral-code"
                      value={referralCode}
                      readOnly
                      className="rounded-r-none border-r-0 text-center font-mono text-lg tracking-wider bg-white"
                    />
                    <Button
                      variant="default"
                      className="rounded-l-none bg-purple-600 hover:bg-purple-700"
                      onClick={() => copyToClipboard(referralCode)}
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span className="ml-2 hidden sm:inline">{copied ? "Kopyalandı" : "Kopyala"}</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Arkadaşların kayıt olurken bu kodu kullanabilir
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => shareVia("SMS")}
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>SMS ile Gönder</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => shareVia("Messenger")}
                  >
                    <Send className="h-4 w-4" />
                    <span>Mesajla Gönder</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              E-posta ile Davet Et
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleEmailInvite}>
              <div className="space-y-2">
                <Label htmlFor="friend-email">Arkadaşının E-posta Adresi</Label>
                <div className="flex">
                  <Input
                    id="friend-email"
                    type="email"
                    placeholder="arkadas@ornek.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-r-none"
                  />
                  <Button type="submit" className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                    Davet Gönder
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Davet Ettiğin Arkadaşlar
            </CardTitle>
            <CardDescription>Toplam {INVITED_FRIENDS.length} arkadaşını davet ettin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {INVITED_FRIENDS.length > 0 ? (
                INVITED_FRIENDS.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">Katıldı: {friend.joinDate}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <div className="flex items-center">
                        <Badge
                          variant="outline"
                          className={`
                            ${
                              friend.status === "completed"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-amber-100 text-amber-800 border-amber-200"
                            }
                          `}
                        >
                          {friend.status === "completed" ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Tamamlandı
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Seviye {friend.level}/5
                            </>
                          )}
                        </Badge>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p
                          className={`font-medium ${friend.status === "completed" ? "text-green-600" : "text-amber-600"}`}
                        >
                          {friend.status === "completed" ? `+${friend.reward}` : `0/${friend.reward}`} BesCoin
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">Henüz davet ettiğin bir arkadaşın yok.</p>
                  <p className="text-sm">Hemen arkadaşlarını davet et ve BesCoin kazan!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold text-purple-800">Nasıl Çalışır?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                    1
                  </div>
                  <p>Davet bağlantını veya kodunu arkadaşlarınla paylaş</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                    2
                  </div>
                  <p>Arkadaşların Beslesene.com'a kaydolsun</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2">
                    3
                  </div>
                  <p>Arkadaşın 5. seviyeye ulaştığında 200 BesCoin kazan</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
