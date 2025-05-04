"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Medal, Crown } from "lucide-react"

// CSS for custom styling and responsiveness
import "./leaderboard.css"

interface Player {
  id: number
  rank: number
  username: string
  level: number
  besCoins: number
  avatarUrl: string
  isCurrentUser: boolean
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("global")
  const [currentUserRank, setCurrentUserRank] = useState<Player | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)

  // Update window width on resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    setWindowWidth(window.innerWidth)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Sample data for global leaderboard
  const globalLeaderboard: Player[] = [
    {
      id: 1,
      rank: 1,
      username: "TopPlayer123",
      level: 42,
      besCoins: 98765,
      avatarUrl: "/placeholder.svg?key=mrzi0",
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      username: "GameMaster",
      level: 39,
      besCoins: 87654,
      avatarUrl: "/placeholder.svg?key=g93oo",
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      username: "ProGamer",
      level: 37,
      besCoins: 76543,
      avatarUrl: "/placeholder.svg?key=prim3",
      isCurrentUser: false,
    },
    {
      id: 4,
      rank: 4,
      username: "LegendaryUser",
      level: 35,
      besCoins: 65432,
      avatarUrl: "/placeholder.svg?key=66l0b",
      isCurrentUser: false,
    },
    {
      id: 5,
      rank: 5,
      username: "ChampionX",
      level: 33,
      besCoins: 54321,
      avatarUrl: "/placeholder.svg?key=rb0ng",
      isCurrentUser: false,
    },
    {
      id: 6,
      rank: 6,
      username: "ElitePlayer",
      level: 31,
      besCoins: 43210,
      avatarUrl: "/placeholder.svg?key=y59v9",
      isCurrentUser: false,
    },
    {
      id: 7,
      rank: 7,
      username: "VictoryKing",
      level: 29,
      besCoins: 32109,
      avatarUrl: "/placeholder.svg?key=uaop4",
      isCurrentUser: false,
    },
    {
      id: 8,
      rank: 8,
      username: "UltimateGamer",
      level: 27,
      besCoins: 21098,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user UltimateGamer",
      isCurrentUser: false,
    },
    {
      id: 9,
      rank: 9,
      username: "MasterOfGames",
      level: 25,
      besCoins: 19876,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user MasterOfGames",
      isCurrentUser: false,
    },
    {
      id: 10,
      rank: 10,
      username: "SkillfulOne",
      level: 23,
      besCoins: 18765,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user SkillfulOne",
      isCurrentUser: false,
    },
    {
      id: 11,
      rank: 11,
      username: "GamerPro",
      level: 21,
      besCoins: 17654,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user GamerPro",
      isCurrentUser: false,
    },
    {
      id: 12,
      rank: 12,
      username: "BesPlayer123",
      level: 19,
      besCoins: 16543,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user BesPlayer123",
      isCurrentUser: true,
    },
    {
      id: 13,
      rank: 13,
      username: "FarmKing",
      level: 18,
      besCoins: 15432,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user FarmKing",
      isCurrentUser: false,
    },
    {
      id: 14,
      rank: 14,
      username: "EggMaster",
      level: 17,
      besCoins: 14321,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user EggMaster",
      isCurrentUser: false,
    },
    {
      id: 15,
      rank: 15,
      username: "ChickenLord",
      level: 16,
      besCoins: 13210,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user ChickenLord",
      isCurrentUser: false,
    },
  ]

  // Sample data for friends leaderboard
  const friendsLeaderboard: Player[] = [
    {
      id: 1,
      rank: 1,
      username: "Friend1",
      level: 28,
      besCoins: 54321,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user Friend1",
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      username: "Friend2",
      level: 25,
      besCoins: 43210,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user Friend2",
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      username: "BesPlayer123",
      level: 19,
      besCoins: 16543,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user BesPlayer123",
      isCurrentUser: true,
    },
    {
      id: 4,
      rank: 4,
      username: "Friend4",
      level: 17,
      besCoins: 21098,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user Friend4",
      isCurrentUser: false,
    },
    {
      id: 5,
      rank: 5,
      username: "Friend5",
      level: 15,
      besCoins: 19876,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user Friend5",
      isCurrentUser: false,
    },
  ]

  // Sample data for weekly leaderboard
  const weeklyLeaderboard: Player[] = [
    {
      id: 1,
      rank: 1,
      username: "WeeklyChamp",
      level: 30,
      besCoins: 45678,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user WeeklyChamp",
      isCurrentUser: false,
    },
    {
      id: 2,
      rank: 2,
      username: "WeeklyPro",
      level: 28,
      besCoins: 34567,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user WeeklyPro",
      isCurrentUser: false,
    },
    {
      id: 3,
      rank: 3,
      username: "WeeklyMaster",
      level: 26,
      besCoins: 23456,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user WeeklyMaster",
      isCurrentUser: false,
    },
    {
      id: 4,
      rank: 4,
      username: "WeeklyKing",
      level: 24,
      besCoins: 12345,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user WeeklyKing",
      isCurrentUser: false,
    },
    {
      id: 5,
      rank: 5,
      username: "BesPlayer123",
      level: 19,
      besCoins: 9876,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user BesPlayer123",
      isCurrentUser: true,
    },
    {
      id: 6,
      rank: 6,
      username: "WeeklyLegend",
      level: 18,
      besCoins: 8765,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user WeeklyLegend",
      isCurrentUser: false,
    },
    {
      id: 7,
      rank: 7,
      username: "WeeklyHero",
      level: 17,
      besCoins: 7654,
      avatarUrl: "/placeholder.svg?height=40&width=40&query=user WeeklyHero",
      isCurrentUser: false,
    },
  ]

  // Find current user's rank based on active tab
  useEffect(() => {
    let leaderboard: Player[] = []

    switch (activeTab) {
      case "global":
        leaderboard = globalLeaderboard
        break
      case "friends":
        leaderboard = friendsLeaderboard
        break
      case "weekly":
        leaderboard = weeklyLeaderboard
        break
      default:
        leaderboard = globalLeaderboard
    }

    const currentUser = leaderboard.find((player) => player.isCurrentUser)
    setCurrentUserRank(currentUser || null)
  }, [activeTab])

  // Get the appropriate leaderboard data based on active tab
  const getLeaderboardData = () => {
    switch (activeTab) {
      case "global":
        return globalLeaderboard
      case "friends":
        return friendsLeaderboard
      case "weekly":
        return weeklyLeaderboard
      default:
        return globalLeaderboard
    }
  }

  // Get rank icon based on position
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="rank-icon rank-first" />
      case 2:
        return <Medal className="rank-icon rank-second" />
      case 3:
        return <Medal className="rank-icon rank-third" />
      default:
        return <span className="rank-number">{rank}</span>
    }
  }

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Sıralama</h1>

      <Tabs defaultValue="global" className="leaderboard-tabs" onValueChange={setActiveTab}>
        <TabsList className="leaderboard-tabs-list">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="friends">Arkadaşlar</TabsTrigger>
          <TabsTrigger value="weekly">Haftalık</TabsTrigger>
        </TabsList>

        {["global", "friends", "weekly"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="leaderboard-tab-content">
            {/* Current User Rank Card */}
            {currentUserRank && (
              <Card className="current-user-card">
                <CardHeader className="current-user-header">
                  <CardTitle>Sıralamanız</CardTitle>
                </CardHeader>
                <CardContent className="current-user-content">
                  <div className="current-user-rank">
                    <div className="rank-badge">{getRankIcon(currentUserRank.rank)}</div>
                  </div>
                  <div className="current-user-info">
                    <Avatar className="current-user-avatar">
                      <AvatarImage
                        src={currentUserRank.avatarUrl || "/placeholder.svg"}
                        alt={currentUserRank.username}
                      />
                      <AvatarFallback>
                        <User className="avatar-fallback-icon" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="current-user-details">
                      <span className="current-user-name">{currentUserRank.username}</span>
                      <span className="current-user-level">Seviye {currentUserRank.level}</span>
                    </div>
                  </div>
                  <div className="current-user-coins">
                    <div className="coin-icon"></div>
                    <span className="coin-amount">{currentUserRank.besCoins.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Leaderboard Table */}
            <Card className="leaderboard-card">
              <CardContent className="leaderboard-content">
                <div className="leaderboard-table-container">
                  <table className="leaderboard-table">
                    <thead>
                      <tr>
                        <th className="rank-column">Sıra</th>
                        <th className="player-column">Oyuncu</th>
                        <th className="level-column">Seviye</th>
                        <th className="coins-column">BesCoin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getLeaderboardData().map((player) => (
                        <tr key={player.id} className={player.isCurrentUser ? "current-user-row" : ""}>
                          <td className="rank-column">
                            <div className="rank-badge">{getRankIcon(player.rank)}</div>
                          </td>
                          <td className="player-column">
                            <div className="player-info">
                              <Avatar className="player-avatar">
                                <AvatarImage src={player.avatarUrl || "/placeholder.svg"} alt={player.username} />
                                <AvatarFallback>
                                  <User className="avatar-fallback-icon" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="player-name">{player.username}</span>
                            </div>
                          </td>
                          <td className="level-column">
                            <span className="player-level">{player.level}</span>
                          </td>
                          <td className="coins-column">
                            <div className="player-coins">
                              <div className="coin-icon"></div>
                              <span className="coin-amount">{player.besCoins.toLocaleString()}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
