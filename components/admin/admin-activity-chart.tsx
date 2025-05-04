"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function AdminActivityChart() {
  // Sample data for the chart
  const data = [
    { date: "May 1", users: 2400 },
    { date: "May 2", users: 2210 },
    { date: "May 3", users: 2290 },
    { date: "May 4", users: 2000 },
    { date: "May 5", users: 2181 },
    { date: "May 6", users: 2500 },
    { date: "May 7", users: 2100 },
    { date: "May 8", users: 2290 },
    { date: "May 9", users: 2350 },
    { date: "May 10", users: 2600 },
    { date: "May 11", users: 2450 },
    { date: "May 12", users: 2380 },
    { date: "May 13", users: 2550 },
    { date: "May 14", users: 2620 },
    { date: "May 15", users: 2700 },
    { date: "May 16", users: 2850 },
    { date: "May 17", users: 2900 },
    { date: "May 18", users: 3000 },
    { date: "May 19", users: 2950 },
    { date: "May 20", users: 3050 },
    { date: "May 21", users: 3150 },
    { date: "May 22", users: 3200 },
    { date: "May 23", users: 3300 },
    { date: "May 24", users: 3400 },
    { date: "May 25", users: 3500 },
    { date: "May 26", users: 3450 },
    { date: "May 27", users: 3600 },
    { date: "May 28", users: 3700 },
    { date: "May 29", users: 3800 },
    { date: "May 30", users: 3900 },
  ]

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[1]}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-sm">{payload[0].payload.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Users</span>
                      <span className="font-bold text-sm">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          activeDot={{ r: 6, style: { fill: "hsl(var(--primary))" } }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
