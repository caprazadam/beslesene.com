"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export function AdminGameSettings() {
  const { toast } = useToast()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const handleSaveSettings = () => {
    // Here you would implement the actual save logic
    setShowSuccessAlert(true)

    // Show toast notification
    toast({
      title: "Settings saved",
      description: "Game settings have been updated successfully.",
    })

    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {showSuccessAlert && (
        <Alert
          variant="default"
          className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
        >
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Game settings have been updated successfully.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="economy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="economy">Economy</TabsTrigger>
          <TabsTrigger value="gameplay">Gameplay</TabsTrigger>
          <TabsTrigger value="upgrades">Upgrades</TabsTrigger>
        </TabsList>

        <TabsContent value="economy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Economy Settings</CardTitle>
              <CardDescription>
                Configure in-game economy parameters like prices, exchange rates, and rewards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Currency Settings</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bescoin-exchange-rate">BesCoin Exchange Rate (1 BesCoin = $)</Label>
                    <Input id="bescoin-exchange-rate" type="number" defaultValue="0.10" step="0.01" />
                    <p className="text-sm text-muted-foreground">The real-world value of one BesCoin in USD.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="min-withdrawal">Minimum Withdrawal (BesCoins)</Label>
                    <Input id="min-withdrawal" type="number" defaultValue="1000" />
                    <p className="text-sm text-muted-foreground">Minimum amount of BesCoins required for withdrawal.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Item Pricing</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="egg-price">Egg Price (BesCoins)</Label>
                    <Input id="egg-price" type="number" defaultValue="10" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="premium-egg-price">Premium Egg Price (BesCoins)</Label>
                    <Input id="premium-egg-price" type="number" defaultValue="25" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feed-price">Feed Price (BesCoins per unit)</Label>
                    <Input id="feed-price" type="number" defaultValue="5" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="premium-feed-price">Premium Feed Price (BesCoins per unit)</Label>
                    <Input id="premium-feed-price" type="number" defaultValue="12" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Rewards</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="daily-reward">Daily Reward (BesCoins)</Label>
                    <Input id="daily-reward" type="number" defaultValue="100" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referral-reward">Referral Reward (BesCoins)</Label>
                    <Input id="referral-reward" type="number" defaultValue="200" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-reward-multiplier">Task Reward Multiplier</Label>
                    <Input id="task-reward-multiplier" type="number" defaultValue="1.0" step="0.1" />
                    <p className="text-sm text-muted-foreground">Multiplier applied to all task rewards.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="gameplay" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gameplay Settings</CardTitle>
              <CardDescription>Configure gameplay mechanics, difficulty, and progression.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Chicken Parameters</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="egg-production-rate">Egg Production Rate (hours)</Label>
                    <Input id="egg-production-rate" type="number" defaultValue="4" />
                    <p className="text-sm text-muted-foreground">
                      Average time in hours for a chicken to produce an egg.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feed-consumption-rate">Feed Consumption Rate (hours)</Label>
                    <Input id="feed-consumption-rate" type="number" defaultValue="6" />
                    <p className="text-sm text-muted-foreground">
                      Average time in hours for a chicken to consume one unit of feed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chicken-happiness-decay">Happiness Decay Rate (% per day)</Label>
                    <Input id="chicken-happiness-decay" type="number" defaultValue="10" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chicken-health-decay">Health Decay Rate (% per day without feed)</Label>
                    <Input id="chicken-health-decay" type="number" defaultValue="15" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Game Difficulty</h3>
                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="difficulty-slider">Overall Difficulty</Label>
                      <span className="text-sm">Medium</span>
                    </div>
                    <Slider id="difficulty-slider" defaultValue={[50]} max={100} step={1} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Affects multiple gameplay parameters like resource scarcity and challenges.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="tutorial-mode" />
                  <Label htmlFor="tutorial-mode">Enable Tutorial Mode for New Players</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="offline-progress" defaultChecked />
                  <Label htmlFor="offline-progress">Enable Offline Progress</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Progression</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="xp-multiplier">XP Gain Multiplier</Label>
                    <Input id="xp-multiplier" type="number" defaultValue="1.0" step="0.1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level-up-formula">Level Up XP Formula</Label>
                    <Input id="level-up-formula" defaultValue="1000 * level * 1.5" />
                    <p className="text-sm text-muted-foreground">Formula to calculate XP needed for next level.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upgrades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade Settings</CardTitle>
              <CardDescription>Configure upgrade costs, effects, and availability.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Coop Upgrades</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coop-capacity-cost">Coop Capacity Upgrade Cost (BesCoins)</Label>
                    <Input id="coop-capacity-cost" type="number" defaultValue="500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coop-capacity-effect">Capacity Increase per Level</Label>
                    <Input id="coop-capacity-effect" type="number" defaultValue="3" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coop-comfort-cost">Coop Comfort Upgrade Cost (BesCoins)</Label>
                    <Input id="coop-comfort-cost" type="number" defaultValue="350" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coop-comfort-effect">Happiness Boost per Level (%)</Label>
                    <Input id="coop-comfort-effect" type="number" defaultValue="10" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Automation Upgrades</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="auto-feed-cost">Auto-Feeding Upgrade Cost (BesCoins)</Label>
                    <Input id="auto-feed-cost" type="number" defaultValue="800" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auto-collect-cost">Auto-Collection Upgrade Cost (BesCoins)</Label>
                    <Input id="auto-collect-cost" type="number" defaultValue="1000" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="enable-auto-upgrades" defaultChecked />
                  <Label htmlFor="enable-auto-upgrades">Enable Automation Upgrades</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Upgrade Level Requirements</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coop2-unlock-level">Coop 2 Unlock Level</Label>
                    <Input id="coop2-unlock-level" type="number" defaultValue="7" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coop3-unlock-level">Coop 3 Unlock Level</Label>
                    <Input id="coop3-unlock-level" type="number" defaultValue="10" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auto-feed-unlock-level">Auto-Feeding Unlock Level</Label>
                    <Input id="auto-feed-unlock-level" type="number" defaultValue="4" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auto-collect-unlock-level">Auto-Collection Unlock Level</Label>
                    <Input id="auto-collect-unlock-level" type="number" defaultValue="6" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
