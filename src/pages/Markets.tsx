
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

const Markets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock data for demonstration - replace with actual API call
  const mockMarketData = [
    {
      symbol: "RELIANCE.NS",
      name: "Reliance Industries Ltd",
      price: 2456.75,
      change: 45.30,
      changePercent: 1.88,
      volume: 1234567,
      high: 2470.00,
      low: 2420.50
    },
    {
      symbol: "TCS.NS", 
      name: "Tata Consultancy Services",
      price: 3890.20,
      change: -23.45,
      changePercent: -0.60,
      volume: 987654,
      high: 3920.00,
      low: 3875.30
    },
    {
      symbol: "HDFCBANK.NS",
      name: "HDFC Bank Limited",
      price: 1678.90,
      change: 12.85,
      changePercent: 0.77,
      volume: 2345678,
      high: 1685.00,
      low: 1665.40
    },
    {
      symbol: "INFY.NS",
      name: "Infosys Limited",
      price: 1823.45,
      change: -8.70,
      changePercent: -0.47,
      volume: 1456789,
      high: 1835.20,
      low: 1815.60
    },
    {
      symbol: "ICICIBANK.NS",
      name: "ICICI Bank Limited", 
      price: 1245.60,
      change: 18.90,
      changePercent: 1.54,
      volume: 3456789,
      high: 1250.30,
      low: 1230.80
    }
  ];

  const fetchMarketData = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Here you would use the actual Indian stock market API
      // const response = await fetch('https://api.example.com/stocks', {
      //   headers: {
      //     'Authorization': 'Bearer sk-live-DHD8chim4wQcPJwKaF7W9xjj7vmA3F3qirlIq0AY'
      //   }
      // });
      
      // For now, using mock data
      setTimeout(() => {
        setMarketData(mockMarketData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError("Failed to fetch market data. Please try again.");
      setLoading(false);
      console.error("Market data fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const filteredData = marketData.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">Live Markets</h1>
                <p className="text-gray-300">Real-time Indian stock market data</p>
              </div>
              <Button 
                onClick={fetchMarketData}
                disabled={loading}
                className="mt-4 md:mt-0 bg-gradient-gold text-trading-dark hover:opacity-90"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Search */}
          <Card className="glass-card glow-border mb-8 animate-slide-up">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search stocks by name or symbol..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400 focus:border-trading-gold"
                />
              </div>
            </CardContent>
          </Card>

          {/* Market Data */}
          {error && (
            <Card className="glass-card border-red-500 mb-8">
              <CardContent className="p-6 text-center">
                <p className="text-red-400">{error}</p>
                <Button 
                  onClick={fetchMarketData} 
                  className="mt-4 bg-gradient-gold text-trading-dark hover:opacity-90"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-6 bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((stock, index) => (
                <Card 
                  key={stock.symbol} 
                  className="glass-card glow-border hover-glow transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-trading-gold text-lg">{stock.symbol}</CardTitle>
                    <CardDescription className="text-gray-300 text-sm">
                      {stock.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">
                          ₹{stock.price.toFixed(2)}
                        </span>
                        <div className={`flex items-center space-x-1 ${
                          stock.change >= 0 ? 'text-trading-green' : 'text-trading-red'
                        }`}>
                          {stock.change >= 0 ? 
                            <TrendingUp className="w-4 h-4" /> : 
                            <TrendingDown className="w-4 h-4" />
                          }
                          <span className="font-semibold">
                            {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className={`text-center py-2 px-3 rounded-lg ${
                        stock.changePercent >= 0 
                          ? 'bg-trading-green/20 text-trading-green' 
                          : 'bg-trading-red/20 text-trading-red'
                      }`}>
                        <span className="font-semibold">
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">High:</span>
                          <span className="ml-2 text-white">₹{stock.high.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Low:</span>
                          <span className="ml-2 text-white">₹{stock.low.toFixed(2)}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400">Volume:</span>
                          <span className="ml-2 text-white">{stock.volume.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-gold text-trading-dark hover:opacity-90 font-semibold">
                        Add to Watchlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredData.length === 0 && !loading && !error && (
            <Card className="glass-card glow-border">
              <CardContent className="p-12 text-center">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">No stocks found</h3>
                <p className="text-gray-400">Try adjusting your search terms</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Markets;
