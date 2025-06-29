
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Brain, 
  Shield, 
  Zap, 
  BarChart3, 
  Bot,
  Star,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Target,
  Smartphone,
  Globe
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-trading-gold" />,
      title: "AI-Powered Insights",
      description: "Get personalized stock recommendations and market analysis powered by advanced AI algorithms."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-trading-gold" />,
      title: "Real-Time Market Data",
      description: "Access live Indian stock market data with comprehensive charts and technical indicators."
    },
    {
      icon: <Bot className="w-8 h-8 text-trading-gold" />,
      title: "Smart Trading Assistant",
      description: "Chat with our AI assistant for instant market insights and trading strategies."
    },
    {
      icon: <Shield className="w-8 h-8 text-trading-gold" />,
      title: "Portfolio Management",
      description: "Track your investments, analyze performance, and get personalized recommendations."
    },
    {
      icon: <Zap className="w-8 h-8 text-trading-gold" />,
      title: "Lightning Fast",
      description: "Execute trades and get market updates in real-time with our optimized platform."
    },
    {
      icon: <Target className="w-8 h-8 text-trading-gold" />,
      title: "Risk Management",
      description: "Advanced risk analysis tools to help you make informed investment decisions."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Day Trader",
      location: "Mumbai",
      rating: 5,
      comment: "TradeAI Pro has completely transformed my trading strategy. The AI insights are incredibly accurate and have helped me increase my portfolio by 35% in just 3 months.",
      avatar: "RK"
    },
    {
      name: "Priya Sharma",
      role: "Investment Advisor",
      location: "Delhi",
      rating: 5,
      comment: "As an investment advisor, I recommend TradeAI Pro to all my clients. The real-time market analysis and portfolio management features are outstanding.",
      avatar: "PS"
    },
    {
      name: "Amit Patel",
      role: "Software Engineer",
      location: "Bangalore",
      rating: 5,
      comment: "I was new to trading, but TradeAI Pro's AI assistant guided me through everything. Now I'm making consistent profits while learning along the way.",
      avatar: "AP"
    },
    {
      name: "Sneha Gupta",
      role: "Business Owner",
      location: "Hyderabad",
      rating: 5,
      comment: "The portfolio tracking and risk management features have given me confidence in my investments. Highly recommended for serious investors.",
      avatar: "SG"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Users" },
    { number: "₹100Cr+", label: "Assets Tracked" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Market Coverage" }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹0",
      period: "Forever",
      features: [
        "Basic market data",
        "5 AI insights per day",
        "Portfolio tracking",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "₹499",
      period: "per month",
      features: [
        "Real-time market data",
        "Unlimited AI insights",
        "Advanced portfolio analytics",
        "Priority support",
        "Custom alerts",
        "Risk management tools"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹1,999",
      period: "per month",
      features: [
        "Everything in Pro",
        "Multi-account management",
        "Custom API access",
        "Dedicated account manager",
        "Advanced reporting",
        "White-label options"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-trading-dark/80 backdrop-blur-md border-b border-trading-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-trading-gold transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-trading-gold transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-trading-gold transition-colors">Reviews</a>
              <Link to="/auth" className="text-gray-300 hover:text-trading-gold transition-colors">Sign In</Link>
            </nav>
            <Link to="/auth">
              <Button className="bg-gradient-gold text-trading-dark hover:opacity-90 font-semibold">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-trading-gold/20 text-trading-gold border-trading-gold/30">
              🚀 India's #1 AI Trading Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 leading-tight">
              Trade Smarter with
              <br />
              <span className="text-white">AI-Powered</span> Insights
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionize your trading experience with advanced AI recommendations, real-time market analysis, 
              and intelligent portfolio management. Join thousands of successful traders using TradeAI Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-gold text-trading-dark hover:opacity-90 font-semibold text-lg px-8 py-4">
                  Start Trading Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-trading-gold text-trading-gold hover:bg-trading-gold hover:text-trading-dark text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-trading-card/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Powerful Features for Smart Trading
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of trading with our comprehensive suite of AI-powered tools and features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-trading-card/10">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of successful traders who trust TradeAI Pro for their investment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center text-trading-dark font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Choose Your Trading Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core AI features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`glass-card glow-border hover-glow animate-slide-up relative ${plan.popular ? 'border-trading-gold/50 scale-105' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-gold text-trading-dark font-semibold px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold gradient-text mb-1">{plan.price}</div>
                    <div className="text-gray-400">{plan.period}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-trading-green mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth">
                    <Button className={`w-full ${plan.popular ? 'bg-gradient-gold text-trading-dark hover:opacity-90' : 'border-trading-gold text-trading-gold hover:bg-trading-gold hover:text-trading-dark'}`} variant={plan.popular ? 'default' : 'outline'}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-trading-gold/10 to-trading-gold/5">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the AI trading revolution today. Start with our free plan and experience the power of intelligent investing.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-gold text-trading-dark hover:opacity-90 font-semibold text-lg px-12 py-4">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-trading-dark border-t border-trading-gold/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo size="md" />
              <p className="text-gray-400 mt-4">
                India's most advanced AI-powered trading platform. Trade smarter, not harder.
              </p>
            </div>
            <div>
              <h4 className="text-trading-gold font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-trading-gold transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">API</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-trading-gold font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-trading-gold transition-colors">About</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-trading-gold font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-trading-gold transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-trading-gold transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-trading-gold/20 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TradeAI Pro. All rights reserved. Made with ❤️ for Indian traders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
