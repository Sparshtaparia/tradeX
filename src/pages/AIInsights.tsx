
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Brain, Send, TrendingUp, TrendingDown, AlertTriangle, Bot, User, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
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

const AIInsights = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI trading assistant. I can help you analyze stocks, provide market insights, and suggest trading strategies. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('reliance') || lowerMessage.includes('ril')) {
      return "📈 **Reliance Industries Analysis:**\n\nBased on current market trends:\n- **Price**: ₹2,456.75 (+0.96%)\n- **Recommendation**: HOLD\n- **Target**: ₹2,650 (next 3 months)\n- **Support**: ₹2,300\n\n**Key Factors:**\n• Strong Q3 results expected\n• Oil prices stabilizing\n• Jio monetization improving\n\n*Confidence: 78%*";
    }
    
    if (lowerMessage.includes('tcs') || lowerMessage.includes('tata consultancy')) {
      return "💻 **TCS Stock Outlook:**\n\nCurrent Analysis:\n- **Price**: ₹3,789.20 (-1.19%)\n- **Recommendation**: BUY on dips\n- **Target**: ₹4,100 (6 months)\n- **Stop Loss**: ₹3,500\n\n**Reasons:**\n• Strong order book growth\n• Dollar revenue acceleration\n• Digital transformation deals\n\n*Confidence: 82%*";
    }

    if (lowerMessage.includes('market') && lowerMessage.includes('tomorrow')) {
      return "🔮 **Tomorrow's Market Outlook:**\n\n**NIFTY Prediction**: Likely to open flat to positive\n**Key Levels**: 22,400 (Support) | 22,600 (Resistance)\n\n**Sectors to Watch:**\n• Banking (+ve bias)\n• IT (mixed signals)\n• Auto (cautious)\n\n**Events**: No major announcements expected\n\n*Trade with caution and proper risk management*";
    }

    if (lowerMessage.includes('buy') || lowerMessage.includes('invest')) {
      return "💡 **Investment Recommendations:**\n\n**Top Picks for This Week:**\n\n1. **HDFC Bank** - Strong fundamentals\n2. **Asian Paints** - Seasonal demand\n3. **Wipro** - Undervalued IT play\n\n**Strategy**: SIP approach recommended\n**Risk Level**: Medium\n**Time Horizon**: 6-12 months\n\n*Always diversify and invest only what you can afford to lose*";
    }

    // Default responses for common queries
    const responses = [
      "I'd be happy to help with that! For specific stock analysis, please mention the company name. I can provide insights on price targets, technical analysis, and market sentiment.",
      "Based on current market conditions, I suggest focusing on quality stocks with strong fundamentals. Would you like me to analyze any particular sector?",
      "The Indian market is showing mixed signals today. Banking stocks are outperforming while IT is under pressure. What specific area interests you?",
      "For better investment decisions, consider your risk appetite and time horizon. Would you like a customized portfolio suggestion based on your profile?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to get AI response");
    } finally {
      setIsTyping(false);
    }
  };

  const fetchInsights = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching insights:', error);
    } else {
      setInsights(data || []);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [user]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'BUY': return <TrendingUp className="h-4 w-4 text-trading-green" />;
      case 'SELL': return <TrendingDown className="h-4 w-4 text-trading-red" />;
      case 'HOLD': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'ALERT': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <Brain className="h-4 w-4 text-trading-gold" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'BUY': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'SELL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HOLD': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ALERT': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-trading-gold/20 text-trading-gold border-trading-gold/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-2 flex items-center">
              <Brain className="w-10 h-10 mr-3 text-trading-gold" />
              AI Trading Insights
            </h1>
            <p className="text-gray-300">Get personalized recommendations and market analysis powered by AI</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Chat Assistant */}
            <div className="lg:col-span-2">
              <Card className="glass-card glow-border h-[600px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-trading-gold flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    AI Trading Assistant
                    <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Ask me anything about stocks, market trends, or trading strategies
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot 
                            ? 'bg-trading-card border border-trading-gold/20' 
                            : 'bg-gradient-gold text-trading-dark'
                        }`}>
                          <div className="flex items-start space-x-2">
                            {message.isBot ? (
                              <Bot className="w-4 h-4 mt-1 text-trading-gold flex-shrink-0" />
                            ) : (
                              <User className="w-4 h-4 mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className={`text-sm ${message.isBot ? 'text-white' : 'text-trading-dark'} whitespace-pre-wrap`}>
                                {message.content}
                              </p>
                              <p className={`text-xs mt-2 ${message.isBot ? 'text-gray-400' : 'text-trading-dark/70'}`}>
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-trading-card border border-trading-gold/20 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4 text-trading-gold" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-trading-gold rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-trading-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-trading-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me about stocks, market trends, or get trading advice..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400 focus:border-trading-gold"
                    />
                    <Button 
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-gradient-gold text-trading-dark hover:opacity-90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights Panel */}
            <div className="space-y-6">
              <Card className="glass-card glow-border">
                <CardHeader>
                  <CardTitle className="text-trading-gold">Recent Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insights.length === 0 ? (
                      <div className="text-center py-8">
                        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No insights yet</p>
                        <p className="text-sm text-gray-500">Start chatting with the AI to get personalized insights</p>
                      </div>
                    ) : (
                      insights.map((insight) => (
                        <div key={insight.id} className="p-4 rounded-lg bg-trading-card/30 border border-trading-gold/20">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getInsightIcon(insight.insight_type)}
                              <Badge className={getInsightColor(insight.insight_type)}>
                                {insight.insight_type}
                              </Badge>
                            </div>
                            {insight.confidence_score && (
                              <span className="text-xs text-gray-400">
                                {insight.confidence_score}% confidence
                              </span>
                            )}
                          </div>
                          <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                          <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
                          {insight.symbol && (
                            <p className="text-xs text-trading-gold">Symbol: {insight.symbol}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(insight.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card glow-border">
                <CardHeader>
                  <CardTitle className="text-trading-gold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setInputMessage("What are the top stock picks for this week?")}
                    className="w-full justify-start bg-trading-card/50 border border-trading-gold/30 text-white hover:bg-trading-gold hover:text-trading-dark"
                  >
                    📈 Weekly Stock Picks
                  </Button>
                  <Button 
                    onClick={() => setInputMessage("Should I buy or sell tomorrow?")}
                    className="w-full justify-start bg-trading-card/50 border border-trading-gold/30 text-white hover:bg-trading-gold hover:text-trading-dark"
                  >
                    🔮 Tomorrow's Market Outlook
                  </Button>
                  <Button 
                    onClick={() => setInputMessage("Analyze RELIANCE stock for me")}
                    className="w-full justify-start bg-trading-card/50 border border-trading-gold/30 text-white hover:bg-trading-gold hover:text-trading-dark"
                  >
                    🔍 Stock Analysis
                  </Button>
                  <Button 
                    onClick={() => setInputMessage("What's the current market sentiment?")}
                    className="w-full justify-start bg-trading-card/50 border border-trading-gold/30 text-white hover:bg-trading-gold hover:text-trading-dark"
                  >
                    📊 Market Sentiment
                  </Button>
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
