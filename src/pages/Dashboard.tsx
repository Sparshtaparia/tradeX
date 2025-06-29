
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { TrendingUp, TrendingDown, DollarSign, BarChart, Bell, MessageCircle, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface PortfolioSummary {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}

interface Trade {
  id: string;
  symbol: string;
  company_name: string;
  trade_type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total_amount: number;
  trade_date: string;
  created_at: string;
}

interface AIInsight {
  id: string;
  symbol?: string;
  insight_type: 'BUY' | 'SELL' | 'HOLD' | 'ALERT';
  title: string;
  description: string;
  confidence_score?: number;
  created_at: string;
  is_read: boolean;
}

const Dashboard = () => {
  const [portfolioStats, setPortfolioStats] = useState<PortfolioSummary>({
    totalValue: 0,
    dayChange: 0,
    dayChangePercent: 0,
    totalGainLoss: 0,
    totalGainLossPercent: 0
  });

  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPortfolioData();
      fetchRecentTrades();
      fetchAIInsights();
    }
  }, [user]);

  const fetchPortfolioData = async () => {
    if (!user) return;

    const { data: portfolio } = await supabase
      .from('portfolio')
      .select('*')
      .eq('user_id', user.id);

    if (portfolio && portfolio.length > 0) {
      const totalValue = portfolio.reduce((sum, holding) => sum + (holding.current_value || 0), 0);
      const totalInvested = portfolio.reduce((sum, holding) => sum + holding.total_invested, 0);
      const totalGainLoss = totalValue - totalInvested;
      const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

      setPortfolioStats({
        totalValue,
        dayChange: 0, // This would be calculated based on previous day's data
        dayChangePercent: 0,
        totalGainLoss,
        totalGainLossPercent
      });
    }
  };

  const fetchRecentTrades = async () => {
    if (!user) return;

    const { data: trades } = await supabase
      .from('trades')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (trades) {
      setRecentTrades(trades);
    }
  };

  const fetchAIInsights = async () => {
    if (!user) return;

    const { data: insights } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (insights) {
      setAiInsights(insights);
    }
  };

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
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Trade
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentTrades.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between p-4 rounded-lg bg-trading-card/30 border border-trading-gold/20">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${trade.trade_type === 'BUY' ? 'bg-trading-green' : 'bg-trading-red'}`}></div>
                            <div>
                              <p className="font-medium text-white">{trade.symbol}</p>
                              <p className="text-sm text-gray-400">{trade.company_name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${trade.trade_type === 'BUY' ? 'text-trading-green' : 'text-trading-red'}`}>
                              {trade.trade_type} {trade.quantity}
                            </p>
                            <p className="text-sm text-gray-400">₹{trade.price.toLocaleString('en-IN')}</p>
                          </div>
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
                    {aiInsights.length === 0 ? (
                      <div className="text-center py-6">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-300 mb-2">No insights yet</p>
                        <p className="text-sm text-gray-400">AI insights will appear here as you use the platform</p>
                      </div>
                    ) : (
                      aiInsights.map((insight) => (
                        <div key={insight.id} className="p-4 rounded-lg bg-trading-card/30 border border-trading-gold/20">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-white">{insight.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              insight.insight_type === 'BUY' ? 'bg-green-500/20 text-green-400' :
                              insight.insight_type === 'SELL' ? 'bg-red-500/20 text-red-400' :
                              insight.insight_type === 'HOLD' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {insight.insight_type}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{insight.description}</p>
                          <p className="text-gray-400 text-xs">{new Date(insight.created_at).toLocaleDateString()}</p>
                        </div>
                      ))
                    )}
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
