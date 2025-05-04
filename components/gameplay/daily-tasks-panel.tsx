"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  reward: string
}

export function DailyTasksPanel() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Tüm tavukları besle",
      description: "Çiftliğindeki tüm tavukları besle",
      completed: false,
      reward: "50 BesCoin",
    },
    {
      id: 2,
      title: "5 yumurta topla",
      description: "5 adet yumurta topla",
      completed: true,
      reward: "30 BesCoin",
    },
    {
      id: 3,
      title: "Marketten bir ürün satın al",
      description: "Marketten herhangi bir ürün satın al",
      completed: false,
      reward: "20 BesCoin",
    },
    {
      id: 4,
      title: "Bir tavuğu seviye atla",
      description: "Herhangi bir tavuğu seviye atla",
      completed: false,
      reward: "100 BesCoin",
    },
    {
      id: 5,
      title: "Arkadaşını davet et",
      description: "Oyuna bir arkadaşını davet et",
      completed: false,
      reward: "200 BesCoin",
    },
  ])

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progress = (completedTasks / totalTasks) * 100

  const toggleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed }
        }
        return task
      }),
    )
  }

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card>
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Günlük Görevler</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Küçült" : "Genişlet"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>İlerleme</span>
            <span>
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-3">
                <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                <div className="space-y-1 flex-1">
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </label>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                </div>
                <div className="flex items-center text-xs font-medium text-amber-500">
                  <Gift className="h-3 w-3 mr-1" />
                  {task.reward}
                </div>
              </div>
            ))}
          </div>
        )}

        {completedTasks === totalTasks && (
          <Button className="w-full mt-4">
            <Gift className="h-4 w-4 mr-2" />
            Ödülü Topla (500 BesCoin)
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
