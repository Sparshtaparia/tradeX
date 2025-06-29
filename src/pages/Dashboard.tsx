
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { TrendingUp, TrendingDown, DollarSign, BarChart, Bell, MessageCircle } from "lucide-react";

const Dashboard = () => {
  const [portfolioStats] = useState({
    totalValue: 0,
    dayChange: 0,
    dayChangePercent: 0,
    totalGainLoss: 0,
    totalGainLossPercent: 0
  });

  const [recentTrades] = useState([]);
  const [aiInsights] = useState([
    {
      id: 1,
      type: "recommendation",
      title: "Market Analysis Ready",
      message: "Connect your portfolio to get personalized AI recommendations",
      time: "2 minutes ago",
      priority: "medium"
    },
    {
      id: 2,
      type: "alert",
      title: "Welcome to TradeAI Pro",
      message: "Start by adding your first trade or exploring market data",
      time: "5 minutes ago",
      priority: "low"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-gray-300">Welcome back! Here's your trading overview.</p>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card glow-border hover-glow animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Portfolio Value</p>
                    <p className="text-2xl font-bold text-white">
                      ₹{portfolioStats.totalValue.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-trading-gold" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Day's Change</p>
                    <p className={`text-2xl font-bold ${portfolioStats.dayChange >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                      {portfolioStats.dayChange >= 0 ? '+' : ''}₹{Math.abs(portfolioStats.dayChange).toLocaleString('en-IN')}
                    </p>
                  </div>
                  {portfolioStats.dayChange >= 0 ? 
                    <TrendingUp className="h-8 w-8 text-trading-green" /> : 
                    <TrendingDown className="h-8 w-8 text-trading-red" />
                  }
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Total Return</p>
                    <p className={`text-2xl font-bold ${portfolioStats.totalGainLoss >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                      {portfolioStats.totalGainLoss >= 0 ? '+' : ''}₹{Math.abs(portfolioStats.totalGainLoss).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <BarChart className="h-8 w-8 text-trading-gold" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Active Trades</p>
                    <p className="text-2xl font-bold text-white">{recentTrades.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-trading-gold" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="glass-card glow-border animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-trading-gold">Recent Trades</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your latest trading activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentTrades.length === 0 ? (
                    <div className="text-center py-12">
                      <BarChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-300 mb-2">No trades yet</h3>
                      <p className="text-gray-400 mb-4">Start by adding your first trade to see it here</p>
                      <Button className="bg-gradient-gold text-trading-dark hover:opacity-90">
                        Add First Trade
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentTrades.map((trade, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-trading-card/30">
                          {/* Trade details would go here */}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Insights & Notifications */}
            <div className="space-y-6">
              <Card className="glass-card glow-border animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-trading-gold flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.map((insight) => (
                      <div key={insight.id} className="p-4 rounded-lg bg-trading-card/30 border border-trading-gold/20">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white">{insight.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            insight.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            insight.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {insight.priority}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{insight.message}</p>
                        <p className="text-gray-400 text-xs">{insight.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card glow-border animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-trading-gold flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <MessageCircle className="h-12 w-12 text-trading-gold mx-auto mb-4" />
                    <p className="text-gray-300 mb-4">Ask me about market trends, trading strategies, or get personalized recommendations!</p>
                    <Button className="bg-gradient-gold text-trading-dark hover:opacity-90">
                      Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
