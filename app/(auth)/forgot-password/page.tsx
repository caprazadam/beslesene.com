"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Lütfen geçerli bir e-posta adresi girin.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      // In a real app, this would be an API call to request password reset
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      toast({
        title: "Şifre sıfırlama bağlantısı gönderildi",
        description: "E-posta adresinize bir şifre sıfırlama bağlantısı gönderdik.",
      })
    } catch (err) {
      setError("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
      toast({
        title: "Hata",
        description: "Şifre sıfırlama bağlantısı gönderilemedi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Image
            src="/placeholder.svg?key=5whx0"
            alt="Beslesene.com"
            width={240}
            height={80}
            className="mx-auto mb-4"
            priority
          />
        </div>

        <Card className="w-full shadow-lg border-primary/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Şifremi Unuttum</CardTitle>
            <CardDescription className="text-center">
              Şifrenizi sıfırlamak için e-posta adresinizi girin
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="E-posta adresiniz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gönderiliyor
                    </>
                  ) : (
                    "Şifre Sıfırlama Bağlantısı Gönder"
                  )}
                </Button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4 space-y-4">
                <CheckCircle className="h-16 w-16 text-primary mx-auto" />
                <h3 className="text-lg font-medium">Bağlantı Gönderildi!</h3>
                <p className="text-muted-foreground">
                  E-posta adresinize bir şifre sıfırlama bağlantısı gönderdik. Lütfen gelen kutunuzu kontrol edin.
                </p>
                <p className="text-sm text-muted-foreground">
                  E-posta gelmediyse, spam klasörünüzü kontrol edin veya tekrar deneyin.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                >
                  Farklı bir e-posta dene
                </Button>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Link
              href="/login"
              className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Giriş sayfasına dön
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
