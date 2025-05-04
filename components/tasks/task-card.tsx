"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, FileText, MessageSquare, Play, Eye } from "lucide-react"

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

interface TaskCardProps {
  task: Task
  onStartTask: () => void
}

export function TaskCard({ task, onStartTask }: TaskCardProps) {
  // Get task icon based on type
  const getTaskIcon = () => {
    switch (task.type) {
      case "survey":
        return <FileText className="h-4 w-4" />
      case "feedback":
        return <MessageSquare className="h-4 w-4" />
      case "watch":
        return <Eye className="h-4 w-4" />
      case "play":
        return <Play className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
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

  // Get status badge
  const getStatusBadge = () => {
    switch (task.status) {
      case "available":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900"
          >
            Mevcut
          </Badge>
        )
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900"
          >
            Devam Ediyor
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-900"
          >
            Tamamlandı
          </Badge>
        )
      case "expired":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900"
          >
            Süresi Doldu
          </Badge>
        )
      default:
        return null
    }
  }

  // Get action button
  const getActionButton = () => {
    switch (task.status) {
      case "available":
        return (
          <Button onClick={onStartTask} size="sm" className="w-full sm:w-auto">
            Katıl
          </Button>
        )
      case "in-progress":
        return (
          <Button onClick={onStartTask} size="sm" variant="outline" className="w-full sm:w-auto">
            Devam Et
          </Button>
        )
      case "completed":
        return (
          <Button disabled size="sm" variant="outline" className="w-full sm:w-auto opacity-50">
            <CheckCircle2 className="h-4 w-4 mr-1" /> Tamamlandı
          </Button>
        )
      case "expired":
        return (
          <Button disabled size="sm" variant="outline" className="w-full sm:w-auto opacity-50">
            Süresi Doldu
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Card
      className={`p-4 transition-all ${
        task.status === "available"
          ? "border-l-4 border-l-green-500 dark:border-l-green-700"
          : task.status === "in-progress"
            ? "border-l-4 border-l-blue-500 dark:border-l-blue-700"
            : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Task Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`p-1 rounded-md ${
                task.type === "survey"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  : task.type === "feedback"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : task.type === "watch"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              }`}
            >
              {getTaskIcon()}
            </div>
            <h3 className="font-medium text-sm">{task.title}</h3>
            {getStatusBadge()}
          </div>

          <p className="text-xs text-muted-foreground mb-2">{task.description}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{task.estimatedTime} dakika</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{getTaskTypeText()}</span>
            </div>
            <div className="flex items-center">
              <span>Sağlayıcı: {task.provider}</span>
            </div>
          </div>
        </div>

        {/* Task Reward and Action */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-2 sm:mt-0">
          <div className="flex items-center bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-md">
            <div className="h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center mr-1">
              <span className="text-[10px] text-white font-bold">{task.reward.type === "bescoin" ? "B" : "F"}</span>
            </div>
            <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
              +{task.reward.amount} {task.reward.type === "bescoin" ? "BesCoin" : "Yem"}
            </span>
          </div>

          {getActionButton()}
        </div>
      </div>
    </Card>
  )
}
