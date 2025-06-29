
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { MessageCircle, Brain, Send, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

const AIInsights = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      message: "Hello! I'm your AI trading assistant powered by DeepSeek V3. I can help you with market analysis, trading strategies, and investment recommendations. What would you like to know?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const insights = [
    {
      type: "opportunity",
      title: "Market Opportunity Detected",
      message: "Banking sector showing strong momentum. Consider positions in HDFC Bank and ICICI Bank.",
      confidence: 85,
      icon: TrendingUp,
      color: "text-trading-green"
    },
    {
      type: "warning",
      title: "Risk Alert",
      message: "High volatility expected in IT sector due to global uncertainties. Monitor positions carefully.",
      confidence: 92,
      icon: AlertTriangle,
      color: "text-trading-red"
    },
    {
      type: "recommendation",
      title: "Portfolio Rebalancing",
      message: "Consider reducing exposure to energy sector and increasing allocation to financials.",
      confidence: 78,
      icon: Lightbulb,
      color: "text-trading-gold"
    }
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      message: currentMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response (replace with actual DeepSeek API call)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        message: generateAIResponse(currentMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (userMessage: string) => {
    // This would be replaced with actual DeepSeek API call
    const responses = [
      "Based on current market trends and your query, I recommend monitoring the sectors you mentioned closely. The Indian market is showing positive momentum in banking and pharma sectors.",
      "That's an interesting question about market timing. Generally, it's better to focus on fundamental analysis rather than trying to time the market perfectly. Would you like me to analyze any specific stocks?",
      "For long-term investing in the Indian market, consider diversifying across sectors like IT, banking, and consumer goods. The current valuations in these sectors look attractive.",
      "Market volatility is normal and can present opportunities. I suggest maintaining a balanced portfolio and avoiding emotional decisions. What's your investment timeline?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickQuestions = [
    "Should I buy or sell tomorrow?",
    "What are the top stocks to watch?",
    "How is my portfolio performing?",
    "Market outlook for next week?"
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-2">AI Insights</h1>
            <p className="text-gray-300">Get intelligent trading recommendations powered by AI</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Insights Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="glass-card glow-border animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-trading-gold flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Current Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg bg-trading-card/30 border border-trading-gold/20 animate-fade-in"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="flex items-start space-x-3">
                        <insight.icon className={`w-5 h-5 mt-1 ${insight.color}`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                          <p className="text-gray-300 text-sm mb-2">{insight.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Confidence</span>
                            <span className={`text-xs font-medium ${insight.color}`}>
                              {insight.confidence}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card glow-border animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-trading-gold">Quick Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start border-trading-gold/30 text-gray-300 hover:bg-trading-gold hover:text-trading-dark transition-all"
                      onClick={() => setCurrentMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="glass-card glow-border h-[600px] flex flex-col animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-trading-gold flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    AI Trading Assistant
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Powered by DeepSeek V3 - Ask me anything about trading and investments
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-gradient-gold text-trading-dark'
                              : 'bg-trading-card/50 text-white border border-trading-gold/20'
                          }`}
                        >
                          <p className="text-sm mb-1">{message.message}</p>
                          <span className={`text-xs ${
                            message.type === 'user' ? 'text-trading-dark/70' : 'text-gray-400'
                          }`}>
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-trading-card/50 text-white border border-trading-gold/20 p-4 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-trading-gold rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-trading-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-trading-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask me about market trends, stocks to buy, trading strategies..."
                      className="flex-1 bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400 focus:border-trading-gold"
                      disabled={isTyping}
                    />
                    <Button 
                      type="submit" 
                      disabled={isTyping || !currentMessage.trim()}
                      className="bg-gradient-gold text-trading-dark hover:opacity-90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
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
