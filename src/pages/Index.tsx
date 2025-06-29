
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { TrendingUp, Brain, Shield, BarChart, Zap, Users } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get intelligent trading recommendations powered by DeepSeek V3 for smarter investment decisions."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Market Data",
      description: "Access live Indian stock market data with comprehensive analysis and trends."
    },
    {
      icon: Shield,
      title: "Portfolio Protection",
      description: "Advanced risk management tools to protect and optimize your investment portfolio."
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Detailed analytics and reports to track your trading performance and growth."
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Get real-time alerts on market movements and AI-generated trading opportunities."
    },
    {
      icon: Users,
      title: "Community Insights",
      description: "Learn from a community of traders and share insights for better decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The Future of{" "}
              <span className="gradient-text">AI Trading</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Experience next-generation portfolio management with AI-powered insights, 
              real-time Indian market data, and intelligent trading recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="bg-gradient-gold hover:opacity-90 text-trading-dark font-semibold px-8 py-4 text-lg animate-glow"
                >
                  Start Trading Smart
                </Button>
              </Link>
              <Link to="/markets">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-trading-gold text-trading-gold hover:bg-trading-gold hover:text-trading-dark px-8 py-4 text-lg"
                >
                  Explore Markets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">TradeAI Pro</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leverage cutting-edge AI technology to make informed trading decisions 
              and maximize your investment potential in the Indian stock market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass-card hover-glow transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-trading-dark" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-trading-gold">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-trading-gold/10 to-trading-gold-light/10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of traders who are already using AI to make smarter investment decisions. 
              Start your journey with TradeAI Pro today.
            </p>
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-gradient-gold hover:opacity-90 text-trading-dark font-semibold px-12 py-4 text-xl animate-glow"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-trading-gold/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-trading-dark" />
            </div>
            <span className="text-xl font-bold gradient-text">TradeAI Pro</span>
          </div>
          <p className="text-gray-400">
            © 2024 TradeAI Pro. All rights reserved. | Empowering traders with AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
