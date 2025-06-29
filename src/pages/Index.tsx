
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { 
  ArrowRight, 
  TrendingUp, 
  Brain, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Star,
  CheckCircle,
  Target,
  Globe,
  Smartphone,
  Clock,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get intelligent market analysis and trading recommendations powered by advanced AI algorithms.",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Market Data",
      description: "Access live market data, price movements, and technical indicators for informed trading decisions.",
      color: "text-green-400"
    },
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Bank-grade security with encryption and multi-factor authentication to protect your investments.",
      color: "text-purple-400"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive charts, technical analysis tools, and portfolio performance tracking.",
      color: "text-orange-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our optimized infrastructure and real-time processing.",
      color: "text-yellow-400"
    },
    {
      icon: Smartphone,
      title: "Mobile Trading",
      description: "Trade on the go with our responsive design and mobile-optimized interface.",
      color: "text-pink-400"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Day Trader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      content: "TradeX has revolutionized my trading experience. The AI insights have helped me make more informed decisions and increased my profits by 40%.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Investment Analyst",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c792?w=60&h=60&fit=crop&crop=face",
      content: "The real-time data and advanced analytics tools are exactly what I needed. The platform is intuitive and powerful at the same time.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Portfolio Manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      content: "Security and reliability are paramount in trading. TradeX delivers both while providing cutting-edge features that give me an edge.",
      rating: 5
    },
    {
      name: "Sneha Reddy",
      role: "Retail Investor",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      content: "As a beginner, I was intimidated by trading. TradeX's AI assistant guided me through every step, and now I'm confident in my investments.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Traders" },
    { number: "₹2.5Cr+", label: "Daily Trading Volume" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "4.9/5", label: "User Rating" }
  ];

  const benefits = [
    "Zero brokerage fees for the first 3 months",
    "24/7 AI-powered trading assistant",
    "Advanced risk management tools",
    "Real-time market alerts and notifications",
    "Comprehensive portfolio analytics",
    "Educational resources and webinars",
    "Priority customer support",
    "Mobile app with full trading capabilities"
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-trading-gold/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <Logo size="lg" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <span className="gradient-text">AI-Powered</span>
              <br />
              Trading Platform
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Experience the future of trading with our advanced AI algorithms, real-time market data, and intelligent insights designed for the Indian stock market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-gold text-trading-dark hover:opacity-90 text-lg px-8 py-4">
                  Start Trading Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/markets">
                <Button size="lg" variant="outline" className="border-trading-gold text-trading-gold hover:bg-trading-gold hover:text-trading-dark text-lg px-8 py-4">
                  View Markets
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-trading-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to succeed in the Indian stock market, powered by cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                  <CardTitle className="text-trading-gold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold gradient-text mb-6">
                Why Choose TradeX?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of successful traders who trust TradeX for their investment journey
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-trading-green flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Card className="glass-card glow-border p-8">
                <div className="text-center">
                  <Award className="w-16 h-16 text-trading-gold mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Award-Winning Platform</h3>
                  <p className="text-gray-300 mb-6">
                    Recognized as the "Best AI Trading Platform" by Indian Financial Technology Awards 2024
                  </p>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 text-trading-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Rated 4.9/5 by over 10,000 users</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-trading-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">What Our Traders Say</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real stories from real traders who've transformed their financial future with TradeX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-trading-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="glass-card glow-border max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Stay Ahead of the Market
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get daily market insights, trading tips, and exclusive AI-powered recommendations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400 flex-1"
                />
                <Button className="bg-gradient-gold text-trading-dark hover:opacity-90">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Join 25,000+ traders receiving our daily insights
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-trading-gold/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful traders who've already made the switch to AI-powered trading
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-gold text-trading-dark hover:opacity-90 text-lg px-8 py-4">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-trading-dark border-t border-trading-gold/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" />
              <p className="text-gray-400 mt-4">
                The most advanced AI-powered trading platform for the Indian stock market.
              </p>
            </div>
            <div>
              <h3 className="text-trading-gold font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <Link to="/markets" className="block text-gray-400 hover:text-trading-gold">Markets</Link>
                <Link to="/ai-insights" className="block text-gray-400 hover:text-trading-gold">AI Insights</Link>
                <Link to="/portfolio" className="block text-gray-400 hover:text-trading-gold">Portfolio</Link>
                <Link to="/dashboard" className="block text-gray-400 hover:text-trading-gold">Dashboard</Link>
              </div>
            </div>
            <div>
              <h3 className="text-trading-gold font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-trading-gold">About Us</a>
                <a href="#" className="block text-gray-400 hover:text-trading-gold">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-trading-gold">Press</a>
                <a href="#" className="block text-gray-400 hover:text-trading-gold">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="text-trading-gold font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-trading-gold">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-trading-gold">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-trading-gold">Risk Disclosure</a>
                <a href="#" className="block text-gray-400 hover:text-trading-gold">Compliance</a>
              </div>
            </div>
          </div>
          <div className="border-t border-trading-gold/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TradeX. All rights reserved. Securities trading involves risk and you may lose money.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
