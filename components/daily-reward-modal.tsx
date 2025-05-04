"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

interface DailyRewardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DailyRewardModal({ open, onOpenChange }: DailyRewardModalProps) {
  const [claimed, setClaimed] = useState(false)

  const handleClaim = () => {
    setClaimed(true)
    // Here you would handle the actual reward logic
    setTimeout(() => {
      onOpenChange(false)
      // Reset for demo purposes
      setTimeout(() => setClaimed(false), 500)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Daily Reward</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          {!claimed ? (
            <>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <Gift className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-muted-foreground">You have a daily reward waiting for you!</p>
              <Button onClick={handleClaim} className="w-full">
                Claim 100 BesCoins
              </Button>
            </>
          ) : (
            <>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-primary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p className="text-center font-medium text-xl">Reward Claimed!</p>
              <p className="text-center text-muted-foreground">You received 100 BesCoins</p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
