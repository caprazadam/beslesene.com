"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertCircle,
  CreditCard,
  Crown,
  HelpCircle,
  Languages,
  LogOut,
  Mail,
  Moon,
  Shield,
  Sun,
  User,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValues({
      ...passwordValues,
      [e.target.id]: e.target.value,
    })
  }

  // Handle password update
  const handleUpdatePassword = () => {
    // Validate passwords
    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      toast({
        title: "Şifreler eşleşmiyor",
        description: "Lütfen yeni şifrenizi doğru girdiğinizden emin olun.",
        variant: "destructive",
      })
      return
    }

    if (passwordValues.newPassword.length < 8) {
      toast({
        title: "Şifre çok kısa",
        description: "Şifreniz en az 8 karakter uzunluğunda olmalıdır.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Şifre güncellendi",
        description: "Şifreniz başarıyla güncellendi.",
      })
      setPasswordValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1500)
  }

  // Handle logout
  const handleLogout = () => {
    setIsLoading(true)

    // Simulate logout process
    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }

  // Handle withdrawal navigation
  const handleWithdrawalNavigation = () => {
    router.push("/withdrawal")
  }

  // Handle premium navigation
  const handlePremiumNavigation = () => {
    router.push("/premium")
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">Hesap ayarlarınızı ve tercihlerinizi yönetin.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Hesap</TabsTrigger>
          <TabsTrigger value="preferences">Tercihler</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>Profil bilgilerinizi görüntüleyin ve güncelleyin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Kullanıcı Adı</Label>
                      <Input id="username" value="BesPlayer123" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <div className="flex items-center gap-2">
                        <Input id="email" value="user@example.com" readOnly />
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        E-posta adresinizi değiştirmek için destek ekibimizle iletişime geçin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto" onClick={handleWithdrawalNavigation}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Para Çekme
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-200 to-yellow-400 hover:from-amber-300 hover:to-yellow-500 text-amber-900 border-amber-300 hover:border-amber-400"
                  onClick={handlePremiumNavigation}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Premium Üyelik
                </Button>
              </div>
              <Button variant="destructive" className="w-full sm:w-auto" onClick={handleLogout} disabled={isLoading}>
                <LogOut className="mr-2 h-4 w-4" />
                {isLoading ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Oyun İstatistikleri</CardTitle>
              <CardDescription>Oyun içi istatistiklerinizi görüntüleyin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Seviye</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Toplam Yumurta</p>
                  <p className="text-2xl font-bold">1,250</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Toplam BesCoin</p>
                  <p className="text-2xl font-bold">3,500</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Kayıt Tarihi</p>
                  <p className="text-2xl font-bold">15.04.2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bildirimler</CardTitle>
              <CardDescription>Bildirim tercihlerinizi yönetin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Oyun Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Günlük ödüller ve etkinlikler hakkında bildirimler alın.
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">E-posta Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Önemli güncellemeler ve promosyonlar hakkında e-postalar alın.
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing">Pazarlama Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Özel teklifler ve kampanyalar hakkında bildirimler alın.
                  </p>
                </div>
                <Switch id="marketing" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Görünüm ve Ses</CardTitle>
              <CardDescription>Oyun görünümü ve ses ayarlarını özelleştirin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme">Tema</Label>
                  <p className="text-sm text-muted-foreground">Açık veya koyu tema seçin.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <Switch id="theme" />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound">Ses Efektleri</Label>
                  <p className="text-sm text-muted-foreground">Oyun ses efektlerini açın veya kapatın.</p>
                </div>
                <Switch id="sound" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="language">Dil</Label>
                  <p className="text-sm text-muted-foreground">Tercih ettiğiniz dili seçin.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Türkçe</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Şifre Değiştir</CardTitle>
              <CardDescription>Hesabınızın güvenliği için şifrenizi düzenli olarak değiştirin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordValues.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Yeni Şifre</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordValues.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordValues.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {passwordValues.newPassword &&
                  passwordValues.confirmPassword &&
                  passwordValues.newPassword !== passwordValues.confirmPassword && (
                    <p className="text-sm text-destructive flex items-center mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Şifreler eşleşmiyor
                    </p>
                  )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleUpdatePassword}
                disabled={
                  isLoading ||
                  !passwordValues.currentPassword ||
                  !passwordValues.newPassword ||
                  !passwordValues.confirmPassword ||
                  passwordValues.newPassword !== passwordValues.confirmPassword
                }
              >
                {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hesap Güvenliği</CardTitle>
              <CardDescription>Hesabınızın güvenlik ayarlarını yönetin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>İki Faktörlü Doğrulama</Label>
                  <p className="text-sm text-muted-foreground">Hesabınıza ekstra güvenlik katmanı ekleyin.</p>
                </div>
                <Button variant="outline">Etkinleştir</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Oturum Açma Geçmişi</Label>
                  <p className="text-sm text-muted-foreground">Son oturum açma etkinliklerinizi görüntüleyin.</p>
                </div>
                <Button variant="outline">Görüntüle</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bağlı Cihazlar</Label>
                  <p className="text-sm text-muted-foreground">Hesabınıza bağlı tüm cihazları yönetin.</p>
                </div>
                <Button variant="outline">Yönet</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Yardıma mı ihtiyacınız var?{" "}
            <a href="#" className="text-primary underline">
              Destek Merkezi
            </a>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Hesabınız güvende</span>
        </div>
      </div>
    </div>
  )
}
