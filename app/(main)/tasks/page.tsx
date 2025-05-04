"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, AlertCircle, BarChart3, FileText, Users, ArrowRight, Gift } from "lucide-react"
import { TaskCard } from "@/components/tasks/task-card"
import { TaskInfoModal } from "@/components/tasks/task-info-modal"
import Link from "next/link"

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

export default function TasksPage() {
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskInfo, setShowTaskInfo] = useState(false)

  // Sample tasks data
  const tasks: Task[] = [
    {
      id: "survey-1",
      title: "Oyun Alışkanlıkları Anketi",
      description: "Oyun oynama alışkanlıklarınız hakkında kısa bir anket. Görüşleriniz bizim için değerli!",
      type: "survey",
      estimatedTime: 5,
      reward: {
        type: "bescoin",
        amount: 100,
      },
      status: "available",
      provider: "SurveyPartner",
      url: "#",
    },
    {
      id: "survey-2",
      title: "Kullanıcı Deneyimi Anketi",
      description: "Beslesene.com'daki deneyiminiz hakkında geri bildirim verin ve ödül kazanın.",
      type: "feedback",
      estimatedTime: 3,
      reward: {
        type: "bescoin",
        amount: 75,
      },
      status: "available",
      provider: "FeedbackPro",
      url: "#",
    },
    {
      id: "survey-3",
      title: "Pazar Araştırması",
      description: "Alışveriş alışkanlıklarınız hakkında kısa bir anket. Yanıtlarınız tamamen anonim kalacaktır.",
      type: "survey",
      estimatedTime: 8,
      reward: {
        type: "bescoin",
        amount: 150,
      },
      status: "in-progress",
      provider: "MarketInsights",
      url: "#",
    },
    {
      id: "survey-4",
      title: "Reklam İzle",
      description: "Kısa bir video izleyerek hemen BesCoin kazanın!",
      type: "watch",
      estimatedTime: 1,
      reward: {
        type: "bescoin",
        amount: 25,
      },
      status: "available",
      provider: "AdPartner",
      url: "#",
    },
    {
      id: "survey-5",
      title: "Yeni Oyun Dene",
      description: "Yeni bir mobil oyunu deneyin ve görüşlerinizi paylaşın.",
      type: "play",
      estimatedTime: 10,
      reward: {
        type: "bescoin",
        amount: 200,
      },
      status: "available",
      provider: "GamePromo",
      url: "#",
    },
    {
      id: "survey-6",
      title: "Sosyal Medya Anketi",
      description: "Sosyal medya kullanımınız hakkında sorular.",
      type: "survey",
      estimatedTime: 4,
      reward: {
        type: "feed",
        amount: 5,
      },
      status: "completed",
      provider: "SocialSurveys",
      url: "#",
    },
    {
      id: "survey-7",
      title: "Haftalık Memnuniyet Anketi",
      description: "Bu haftaki oyun deneyiminizi değerlendirin.",
      type: "feedback",
      estimatedTime: 2,
      reward: {
        type: "bescoin",
        amount: 50,
      },
      status: "expired",
      expiresAt: "2023-05-01",
      provider: "GameFeedback",
      url: "#",
    },
  ]

  // Filter tasks by status
  const availableTasks = tasks.filter((task) => task.status === "available")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed" || task.status === "expired")

  // Show feedback message
  const displayFeedback = (message: string, type: "success" | "error" | "info") => {
    setFeedbackMessage(message)
    setFeedbackType(type)
    setShowFeedbackMessage(true)
    setTimeout(() => {
      setShowFeedbackMessage(false)
    }, 3000)
  }

  // Handle starting a task
  const handleStartTask = (task: Task) => {
    setSelectedTask(task)
    setShowTaskInfo(true)
  }

  // Handle task confirmation
  const handleConfirmTask = () => {
    if (!selectedTask) return

    // In a real app, this would navigate to the external survey or task
    displayFeedback(`"${selectedTask.title}" görevine yönlendiriliyorsunuz...`, "info")
    setShowTaskInfo(false)

    // Simulate opening in a new tab
    // In a real app, you would use window.open(selectedTask.url, '_blank')
    console.log(`Opening task URL: ${selectedTask.url}`)
  }

  return (
    <div className="space-y-4 pb-16">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Mini Görevler</h1>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          {availableTasks.length} Yeni Görev
        </Badge>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-sm">Görevleri tamamlayarak BesCoin kazanın!</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Anketleri doldurarak, geri bildirim vererek ve diğer mini görevleri tamamlayarak ekstra BesCoin
              kazanabilirsiniz. Tüm ödemeler anında hesabınıza aktarılır.
            </p>
          </div>
        </div>
      </Card>

      {/* Friend Invite Card */}
      <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-100 dark:border-amber-900 overflow-hidden relative">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-2">
            <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">Arkadaşlarını Davet Et ve Kazan!</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Her arkadaşın için 200 BesCoin kazanabilirsin. Hemen davet et!
            </p>
          </div>
          <Link
            href="/invite"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            Davet Et
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Gift className="h-20 w-20 text-amber-900 dark:text-amber-300" />
        </div>
      </Card>

      {/* Tasks Tabs */}
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-10">
          <TabsTrigger value="available" className="relative">
            Mevcut
            {availableTasks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {availableTasks.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="in-progress">Devam Eden</TabsTrigger>
          <TabsTrigger value="completed">Tamamlanan</TabsTrigger>
        </TabsList>

        {/* Available Tasks */}
        <TabsContent value="available" className="mt-4 space-y-3">
          {availableTasks.length > 0 ? (
            availableTasks.map((task) => (
              <TaskCard key={task.id} task={task} onStartTask={() => handleStartTask(task)} />
            ))
          ) : (
            <div className="text-center py-8">
              <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Şu anda mevcut görev yok</h3>
              <p className="text-sm text-muted-foreground">
                Yakında yeni görevler eklenecektir. Daha sonra tekrar kontrol edin.
              </p>
            </div>
          )}
        </TabsContent>

        {/* In Progress Tasks */}
        <TabsContent value="in-progress" className="mt-4 space-y-3">
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task} onStartTask={() => handleStartTask(task)} />
            ))
          ) : (
            <div className="text-center py-8">
              <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                <BarChart3 className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Devam eden görev yok</h3>
              <p className="text-sm text-muted-foreground">Şu anda devam etmekte olan bir göreviniz bulunmuyor.</p>
            </div>
          )}
        </TabsContent>

        {/* Completed Tasks */}
        <TabsContent value="completed" className="mt-4 space-y-3">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onStartTask={() => handleStartTask(task)} />
            ))
          ) : (
            <div className="text-center py-8">
              <div className="bg-muted inline-flex rounded-full p-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Henüz tamamlanan görev yok</h3>
              <p className="text-sm text-muted-foreground">Görevleri tamamladıkça burada listeleneceklerdir.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Task Info Modal */}
      {selectedTask && (
        <TaskInfoModal
          task={selectedTask}
          isOpen={showTaskInfo}
          onClose={() => setShowTaskInfo(false)}
          onConfirm={handleConfirmTask}
        />
      )}

      {/* Feedback Message */}
      {showFeedbackMessage && (
        <div
          className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in-up ${
            feedbackType === "success"
              ? "bg-green-500 text-white"
              : feedbackType === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          {feedbackType === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : feedbackType === "error" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Clock className="h-4 w-4" />
          )}
          <span>{feedbackMessage}</span>
        </div>
      )}
    </div>
  )
}
