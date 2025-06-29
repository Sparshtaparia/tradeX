
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Eye, MessageCircle, Send, Sparkles, Target, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface AIInsight {
  id: string;
  symbol?: string;
  insight_type: 'BUY' | 'SELL' | 'HOLD' | 'ALERT';
  title: string;
  description: string;
  confidence_score?: number;
  created_at: string;
  is_read: boolean;
  user_id: string;
}

interface AIResponse {
  type: 'BUY' | 'SELL' | 'HOLD' | 'ALERT';
  title: string;
  description: string;
  confidence: number;
  symbol?: string;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'ai', content: string, timestamp: Date}>>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI trading assistant. I can help you with market analysis, trading strategies, stock recommendations, and portfolio optimization. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchInsights();
    }
  }, [user]);

  const fetchInsights = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching insights:', error);
      return;
    }

    if (data) {
      // Type assertion to ensure proper typing
      const typedInsights = data.map(insight => ({
        ...insight,
        insight_type: insight.insight_type as 'BUY' | 'SELL' | 'HOLD' | 'ALERT'
      }));
      setInsights(typedInsights);
    }
  };

  const generateAIResponse = (message: string): AIResponse => {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced AI responses with more context
    const responses = {
      market: {
        type: 'ALERT' as const,
        title: 'Market Analysis',
        description: 'Current market conditions show mixed signals. Nifty 50 is showing consolidation around 19,800 levels. Banking sector looks strong with PSU banks outperforming. IT sector facing headwinds due to global uncertainties.',
        confidence: 78,
      },
      reliance: {
        type: 'BUY' as const,
        title: 'Reliance Industries - Strong Buy',
        description: 'RIL is showing strong fundamentals with improving refining margins and robust retail growth. Target: ₹2,650. Stop Loss: ₹2,350. The company\'s digital initiatives and green energy push make it attractive for long-term investors.',
        confidence: 85,
        symbol: 'RELIANCE.NS'
      },
      tcs: {
        type: 'HOLD' as const,
        title: 'TCS - Hold with Caution',
        description: 'TCS maintains leadership in IT services but faces margin pressure. Q3 results showed decent growth but commentary on discretionary spending remains cautious. Hold existing positions.',
        confidence: 72,
        symbol: 'TCS.NS'
      },
      adani: {
        type: 'SELL' as const,
        title: 'Adani Stocks - Reduce Exposure',
        description: 'Adani group stocks remain volatile with high debt concerns. Recommend reducing exposure and waiting for better entry points. Focus on fundamentally strong companies.',
        confidence: 80,
        symbol: 'ADANIENT.NS'
      },
      portfolio: {
        type: 'ALERT' as const,
        title: 'Portfolio Optimization',
        description: 'Your portfolio shows good diversification. Consider adding defensive stocks like FMCG and Pharma. Reduce concentration in single sectors. Rebalance quarterly for optimal returns.',
        confidence: 88,
      },
      strategy: {
        type: 'ALERT' as const,
        title: 'Trading Strategy Recommendation',
        description: 'For current market conditions, recommend a balanced approach: 60% equity, 25% debt, 15% alternatives. Use SIP for regular investments and keep 10% cash for opportunities.',
        confidence: 82,
      }
    };

    // Determine response based on message content
    if (lowerMessage.includes('market') || lowerMessage.includes('nifty')) {
      return responses.market;
    } else if (lowerMessage.includes('reliance') || lowerMessage.includes('ril')) {
      return responses.reliance;
    } else if (lowerMessage.includes('tcs') || lowerMessage.includes('tata')) {
      return responses.tcs;
    } else if (lowerMessage.includes('adani')) {
      return responses.adani;
    } else if (lowerMessage.includes('portfolio')) {
      return responses.portfolio;
    } else if (lowerMessage.includes('strategy') || lowerMessage.includes('invest')) {
      return responses.strategy;
    } else {
      return {
        type: 'ALERT',
        title: 'General Trading Advice',
        description: 'Always do your own research before investing. Consider your risk tolerance and investment horizon. Diversify your portfolio and don\'t put all eggs in one basket. Stay updated with market news and company fundamentals.',
        confidence: 75,
      };
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(async () => {
      const aiResponse = generateAIResponse(newMessage);
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: `**${aiResponse.title}**\n\n${aiResponse.description}\n\n*Confidence: ${aiResponse.confidence}%*`,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Save as insight
      const { error } = await supabase
        .from('ai_insights')
        .insert({
          user_id: user.id,
          symbol: aiResponse.symbol,
          insight_type: aiResponse.type,
          title: aiResponse.title,
          description: aiResponse.description,
          confidence_score: aiResponse.confidence,
        });

      if (!error) {
        fetchInsights();
      }
    }, 1500);
  };

  const quickActions = [
    { label: "Market Analysis", icon: BarChart3, message: "Give me current market analysis" },
    { label: "Portfolio Review", icon: Target, message: "Review my portfolio and suggest improvements" },
    { label: "Stock Recommendations", icon: TrendingUp, message: "Suggest some good stocks to buy now" },
    { label: "Risk Assessment", icon: AlertTriangle, message: "Help me assess my investment risk" },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-2">AI Trading Assistant</h1>
            <p className="text-gray-300">Get intelligent insights and personalized trading recommendations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="glass-card glow-border h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="text-trading-gold flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Chat Assistant
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Ask me anything about trading, stocks, or market analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[350px]">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-trading-gold text-trading-dark'
                              : 'bg-trading-card text-white'
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-trading-card text-white p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-trading-gold rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-trading-gold rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-trading-gold rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-sm">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <Button
                          key={action.label}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setNewMessage(action.message);
                            handleSendMessage();
                          }}
                          className="border-trading-gold/30 text-trading-gold hover:bg-trading-gold/10"
                        >
                          <action.icon className="w-4 h-4 mr-1" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ask me about stocks, market trends, or trading strategies..."
                      className="flex-1 bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isTyping}
                      className="bg-gradient-gold text-trading-dark hover:opacity-90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights Panel */}
            <div>
              <Card className="glass-card glow-border mb-6">
                <CardHeader>
                  <CardTitle className="text-trading-gold flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Recent Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {insights.length === 0 ? (
                      <div className="text-center py-8">
                        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-300 mb-2">No insights yet</p>
                        <p className="text-sm text-gray-400">Start chatting to get AI insights</p>
                      </div>
                    ) : (
                      insights.map((insight) => (
                        <div key={insight.id} className="p-4 rounded-lg bg-trading-card/30 border border-trading-gold/20">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {insight.insight_type === 'BUY' && <TrendingUp className="w-4 h-4 text-trading-green" />}
                              {insight.insight_type === 'SELL' && <TrendingDown className="w-4 h-4 text-trading-red" />}
                              {insight.insight_type === 'HOLD' && <Eye className="w-4 h-4 text-trading-gold" />}
                              {insight.insight_type === 'ALERT' && <AlertTriangle className="w-4 h-4 text-trading-gold" />}
                              <Badge variant={
                                insight.insight_type === 'BUY' ? 'default' :
                                insight.insight_type === 'SELL' ? 'destructive' :
                                'secondary'
                              }>
                                {insight.insight_type}
                              </Badge>
                            </div>
                            {insight.confidence_score && (
                              <span className="text-xs text-gray-400">{insight.confidence_score}%</span>
                            )}
                          </div>
                          <h4 className="font-medium text-white mb-2">{insight.title}</h4>
                          <p className="text-gray-300 text-sm mb-2">{insight.description}</p>
                          {insight.symbol && (
                            <p className="text-trading-gold text-sm font-medium">Symbol: {insight.symbol}</p>
                          )}
                          <p className="text-gray-400 text-xs mt-2">
                            {new Date(insight.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    )}
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

export default AIInsights;
