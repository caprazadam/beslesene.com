"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, AlertCircle, FileText, MessageSquare, Play, Eye } from "lucide-react"

// Task types
type TaskStatus = "available" | "in-progress" | "completed" | "expired"
type TaskType = "survey" | "feedback" | "watch" | "play"

interface Task {
  id: string
  title: string
  description: string
  type: TaskType
  estimatedTime: number // in minutes
  reward: {
    type: "bescoin" | "feed"
    amount: number
  }
  status: TaskStatus
  expiresAt?: string
  provider: string
  url: string
}

interface TaskInfoModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function TaskInfoModal({ task, isOpen, onClose, onConfirm }: TaskInfoModalProps) {
  // Get task icon based on type
  const getTaskIcon = () => {
    switch (task.type) {
      case "survey":
        return <FileText className="h-5 w-5" />
      case "feedback":
        return <MessageSquare className="h-5 w-5" />
      case "watch":
        return <Eye className="h-5 w-5" />
      case "play":
        return <Play className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Get task type text
  const getTaskTypeText = () => {
    switch (task.type) {
      case "survey":
        return "Anket"
      case "feedback":
        return "Geri Bildirim"
      case "watch":
        return "Video İzle"
      case "play":
        return "Oyun Dene"
      default:
        return "Görev"
    }
  }

  // Get task background color
  const getTaskBgColor = () => {
    switch (task.type) {
      case "survey":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      case "feedback":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "watch":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      case "play":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${getTaskBgColor()}`}>{getTaskIcon()}</div>
            <DialogTitle>{task.title}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm">{task.description}</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Görev Türü</span>
              <span className="font-medium">{getTaskTypeText()}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Tahmini Süre</span>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{task.estimatedTime} dakika</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Sağlayıcı</span>
              <span>{task.provider}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Ödül</span>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center mr-1">
                  <span className="text-[10px] text-white font-bold">{task.reward.type === "bescoin" ? "B" : "F"}</span>
                </div>
                <span className="font-medium">
                  {task.reward.amount} {task.reward.type === "bescoin" ? "BesCoin" : "Yem"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-md p-3 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-300">
              <p>
                Bu görevi tamamlamak için harici bir sağlayıcıya yönlendirileceksiniz. Görevi tamamladıktan sonra
                otomatik olarak ödülünüz hesabınıza eklenecektir.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Vazgeç
          </Button>
          <Button onClick={onConfirm}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Göreve Başla
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
