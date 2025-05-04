"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CreditCard, HelpCircle, Info, CheckCircle2, Clock, ArrowRight, Wallet } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Import custom CSS for animations and responsive design
import "./withdrawal.css"

interface Transaction {
  id: string
  date: string
  amount: number
  status: "pending" | "completed" | "rejected"
  method: string
}

export default function WithdrawalPage() {
  const { toast } = useToast()
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("")
  const [convertedAmount, setConvertedAmount] = useState<number>(0)
  const [paymentMethod, setPaymentMethod] = useState<string>("bank")
  const [bankName, setBankName] = useState<string>("")
  const [accountName, setAccountName] = useState<string>("")
  const [accountNumber, setAccountNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string>("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info")

  // User balance and conversion rate
  const userBalance = 12500
  const conversionRate = 0.01 // 1 BesCoin = 0.01 TL/EUR/USD
  const minimumWithdrawal = 1000

  // Sample transaction history
  const transactions: Transaction[] = [
    {
      id: "TX123456",
      date: "2023-05-15",
      amount: 5000,
      status: "completed",
      method: "Bank Transfer",
    },
    {
      id: "TX123457",
      date: "2023-04-10",
      amount: 3000,
      status: "completed",
      method: "PayPal",
    },
    {
      id: "TX123458",
      date: "2023-03-05",
      amount: 2000,
      status: "rejected",
      method: "Bank Transfer",
    },
    {
      id: "TX123459",
      date: "2023-06-01",
      amount: 4000,
      status: "pending",
      method: "PayPal",
    },
  ]

  // Calculate converted amount when withdrawal amount changes
  useEffect(() => {
    const numericAmount = Number.parseFloat(withdrawalAmount) || 0
    setConvertedAmount(numericAmount * conversionRate)
  }, [withdrawalAmount])

  // Handle withdrawal amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "")
    setWithdrawalAmount(value)
  }

  // Handle quick amount selection
  const handleQuickAmount = (amount: number) => {
    if (amount <= userBalance) {
      setWithdrawalAmount(amount.toString())
    } else {
      displayFeedback("Yetersiz bakiye", "error")
    }
  }

  // Handle max amount selection
  const handleMaxAmount = () => {
    setWithdrawalAmount(userBalance.toString())
  }

  // Display feedback message
  const displayFeedback = (message: string, type: "success" | "error" | "info") => {
    setFeedbackMessage(message)
    setFeedbackType(type)
    setShowFeedback(true)
    setTimeout(() => {
      setShowFeedback(false)
    }, 3000)
  }

  // Handle withdrawal submission
  const handleSubmitWithdrawal = () => {
    // Validate withdrawal amount
    const amount = Number.parseFloat(withdrawalAmount)
    if (!amount || amount < minimumWithdrawal) {
      displayFeedback(`Minimum çekim tutarı ${minimumWithdrawal} BesCoin'dir`, "error")
      return
    }

    if (amount > userBalance) {
      displayFeedback("Yetersiz bakiye", "error")
      return
    }

    // Validate payment method details
    if (paymentMethod === "bank") {
      if (!bankName || !accountName || !accountNumber) {
        displayFeedback("Lütfen tüm banka bilgilerini doldurun", "error")
        return
      }
    } else if (paymentMethod === "paypal") {
      if (!email) {
        displayFeedback("Lütfen PayPal e-posta adresinizi girin", "error")
        return
      }
    }

    // Submit withdrawal request
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Para çekme talebi gönderildi",
        description: `${amount} BesCoin çekim talebiniz işleme alındı.`,
      })

      // Reset form
      setWithdrawalAmount("")
      setBankName("")
      setAccountName("")
      setAccountNumber("")
      setEmail("")
    }, 1500)
  }

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "status-badge-completed"
      case "pending":
        return "status-badge-pending"
      case "rejected":
        return "status-badge-rejected"
      default:
        return ""
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="status-icon" />
      case "pending":
        return <Clock className="status-icon" />
      case "rejected":
        return <AlertCircle className="status-icon" />
      default:
        return null
    }
  }

  return (
    <div className="withdrawal-container">
      <h1 className="withdrawal-title">Para Çekme</h1>

      <Card className="balance-card">
        <CardHeader className="balance-card-header">
          <CardTitle>Bakiye</CardTitle>
          <CardDescription>Çekim için mevcut bakiyeniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="balance-display">
            <div className="balance-info">
              <div className="coin-icon">
                <span>B</span>
              </div>
              <div>
                <p className="balance-label">BesCoins</p>
                <p className="balance-amount">{userBalance.toLocaleString()}</p>
              </div>
            </div>
            <div className="balance-value">
              <p className="value-label">Tahmini Değer</p>
              <p className="value-amount">{(userBalance * conversionRate).toLocaleString()} ₺</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="withdraw" className="withdrawal-tabs">
        <TabsList className="withdrawal-tabs-list">
          <TabsTrigger value="withdraw">Para Çek</TabsTrigger>
          <TabsTrigger value="history">İşlem Geçmişi</TabsTrigger>
        </TabsList>

        <TabsContent value="withdraw" className="withdrawal-tab-content">
          <Card>
            <CardHeader>
              <CardTitle>Para Çekme Formu</CardTitle>
              <CardDescription>BesCoin'lerinizi gerçek paraya dönüştürün</CardDescription>
            </CardHeader>
            <CardContent className="withdrawal-form">
              <div className="info-box">
                <Info className="info-icon" />
                <p>
                  BesCoin'lerinizi gerçek paraya dönüştürmek için minimum {minimumWithdrawal} BesCoin bakiyeniz
                  olmalıdır. Dönüşüm oranı: {conversionRate * 1000} ₺ = 1000 BesCoin
                </p>
              </div>

              <div className="form-group">
                <Label htmlFor="withdrawal-amount">Çekilecek Miktar (BesCoin)</Label>
                <div className="amount-input-container">
                  <Input
                    id="withdrawal-amount"
                    type="text"
                    value={withdrawalAmount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="amount-input"
                  />
                  <Button variant="outline" size="sm" onClick={handleMaxAmount} className="max-button">
                    Maksimum
                  </Button>
                </div>
                <div className="quick-amounts">
                  {[1000, 2500, 5000, 10000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmount(amount)}
                      className="quick-amount-button"
                    >
                      {amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <Label>Alacağınız Tutar</Label>
                <div className="converted-amount">
                  <span>{convertedAmount.toLocaleString()} ₺</span>
                </div>
              </div>

              <Separator className="form-separator" />

              <div className="form-group">
                <Label>Ödeme Yöntemi</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="payment-method-group">
                  <div className="payment-method-option">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="payment-method-label">
                      <CreditCard className="payment-icon" />
                      <span>Banka Havalesi</span>
                    </Label>
                  </div>
                  <div className="payment-method-option">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="payment-method-label">
                      <Wallet className="payment-icon" />
                      <span>PayPal</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "bank" ? (
                <div className="payment-details">
                  <div className="form-group">
                    <Label htmlFor="bank-name">Banka Adı</Label>
                    <Input
                      id="bank-name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Banka Adı"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="account-name">Hesap Sahibi</Label>
                    <Input
                      id="account-name"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      placeholder="Ad Soyad"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="account-number">IBAN</Label>
                    <Input
                      id="account-number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                    />
                  </div>
                </div>
              ) : (
                <div className="payment-details">
                  <div className="form-group">
                    <Label htmlFor="paypal-email">PayPal E-posta Adresi</Label>
                    <Input
                      id="paypal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="withdrawal-footer">
              <div className="withdrawal-notes">
                <HelpCircle className="help-icon" />
                <p>
                  Para çekme işlemleri her ayın 1. ve 15. günü işleme alınır ve 3-5 iş günü içinde hesabınıza aktarılır.
                </p>
              </div>
              <Button
                onClick={handleSubmitWithdrawal}
                disabled={isSubmitting || !withdrawalAmount || Number.parseFloat(withdrawalAmount) < minimumWithdrawal}
                className="submit-button"
              >
                {isSubmitting ? "İşleniyor..." : "Para Çekme Talebi Gönder"}
                <ArrowRight className="button-icon" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="withdrawal-tab-content">
          <Card>
            <CardHeader>
              <CardTitle>İşlem Geçmişi</CardTitle>
              <CardDescription>Önceki para çekme işlemleriniz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="transaction-history">
                {transactions.length > 0 ? (
                  <div className="transaction-list">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="transaction-item">
                        <div className="transaction-info">
                          <div className="transaction-primary">
                            <span className="transaction-id">{transaction.id}</span>
                            <span className="transaction-date">
                              {new Date(transaction.date).toLocaleDateString("tr-TR")}
                            </span>
                          </div>
                          <div className="transaction-secondary">
                            <span className="transaction-method">{transaction.method}</span>
                          </div>
                        </div>
                        <div className="transaction-details">
                          <div className="transaction-amount">
                            <div className="coin-icon small">
                              <span>B</span>
                            </div>
                            <span>{transaction.amount.toLocaleString()}</span>
                          </div>
                          <div className={`status-badge ${getStatusBadgeClass(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span>
                              {transaction.status === "completed"
                                ? "Tamamlandı"
                                : transaction.status === "pending"
                                  ? "İşlemde"
                                  : "Reddedildi"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-transactions">
                    <p>Henüz işlem geçmişiniz bulunmamaktadır.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feedback Message */}
      {showFeedback && (
        <div className={`feedback-message ${feedbackType}`}>
          {feedbackType === "success" ? (
            <CheckCircle2 className="feedback-icon" />
          ) : feedbackType === "error" ? (
            <AlertCircle className="feedback-icon" />
          ) : (
            <Info className="feedback-icon" />
          )}
          <span>{feedbackMessage}</span>
        </div>
      )}
    </div>
  )
}
