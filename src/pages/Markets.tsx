
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { TrendingUp, TrendingDown, Search, Star, Plus, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Indian Stock Market Data
const INDIAN_MARKETS = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 2456.75,
    change: 23.45,
    changePercent: 0.96,
    volume: "12.5M",
    marketCap: "16.6L Cr",
    sector: "Oil & Gas"
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3789.20,
    change: -45.80,
    changePercent: -1.19,
    volume: "8.2M",
    marketCap: "13.8L Cr",
    sector: "IT Services"
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    price: 1654.30,
    change: 18.75,
    changePercent: 1.15,
    volume: "15.6M",
    marketCap: "12.5L Cr",
    sector: "Banking"
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    price: 1789.45,
    change: -12.30,
    changePercent: -0.68,
    volume: "9.8M",
    marketCap: "7.4L Cr",
    sector: "IT Services"
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    price: 1098.60,
    change: 34.20,
    changePercent: 3.21,
    volume: "18.9M",
    marketCap: "7.7L Cr",
    sector: "Banking"
  },
  {
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever Ltd",
    price: 2234.80,
    change: -8.45,
    changePercent: -0.38,
    volume: "4.2M",
    marketCap: "5.2L Cr",
    sector: "FMCG"
  },
  {
    symbol: "ITC",
    name: "ITC Ltd",
    price: 456.75,
    change: 12.30,
    changePercent: 2.77,
    volume: "25.6M",
    marketCap: "5.7L Cr",
    sector: "FMCG"
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 789.20,
    change: 28.45,
    changePercent: 3.74,
    volume: "32.1M",
    marketCap: "7.0L Cr",
    sector: "Banking"
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd",
    price: 1245.60,
    change: -15.80,
    changePercent: -1.25,
    volume: "11.2M",
    marketCap: "6.8L Cr",
    sector: "Telecom"
  },
  {
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank",
    price: 1876.45,
    change: 45.20,
    changePercent: 2.47,
    volume: "7.8M",
    marketCap: "3.7L Cr",
    sector: "Banking"
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro Ltd",
    price: 3456.80,
    change: 67.45,
    changePercent: 1.99,
    volume: "5.9M",
    marketCap: "4.9L Cr",
    sector: "Construction"
  },
  {
    symbol: "HCLTECH",
    name: "HCL Technologies Ltd",
    price: 1567.30,
    change: -23.45,
    changePercent: -1.47,
    volume: "6.7M",
    marketCap: "4.2L Cr",
    sector: "IT Services"
  },
  {
    symbol: "ASIANPAINT",
    name: "Asian Paints Ltd",
    price: 2987.65,
    change: 38.90,
    changePercent: 1.32,
    volume: "3.4M",
    marketCap: "2.9L Cr",
    sector: "Paints"
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India Ltd",
    price: 10876.45,
    change: -145.30,
    changePercent: -1.32,
    volume: "2.1M",
    marketCap: "3.3L Cr",
    sector: "Automobile"
  },
  {
    symbol: "WIPRO",
    name: "Wipro Ltd",
    price: 567.80,
    change: 12.45,
    changePercent: 2.24,
    volume: "14.5M",
    marketCap: "3.1L Cr",
    sector: "IT Services"
  }
];

const Markets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [selectedSector, setSelectedSector] = useState("All");
  const { user } = useAuth();

  const sectors = ["All", ...new Set(INDIAN_MARKETS.map(stock => stock.sector))];

  const filteredStocks = INDIAN_MARKETS.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "All" || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const addToWatchlist = async (symbol: string, companyName: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('watchlist')
        .insert([
          {
            user_id: user.id,
            symbol,
            company_name: companyName
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          toast.error("Stock already in watchlist");
        } else {
          toast.error("Failed to add to watchlist");
        }
      } else {
        setWatchlist([...watchlist, symbol]);
        toast.success("Added to watchlist");
      }
    } catch (error) {
      toast.error("Failed to add to watchlist");
    }
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('watchlist')
        .select('symbol')
        .eq('user_id', user.id);

      if (data) {
        setWatchlist(data.map(item => item.symbol));
      }
    };

    fetchWatchlist();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-2">Indian Stock Market</h1>
            <p className="text-gray-300">Live market data and real-time insights</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400 focus:border-trading-gold"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {sectors.map(sector => (
                <Button
                  key={sector}
                  variant={selectedSector === sector ? "default" : "outline"}
                  onClick={() => setSelectedSector(sector)}
                  className={selectedSector === sector 
                    ? "bg-gradient-gold text-trading-dark" 
                    : "border-trading-gold/30 text-gray-300 hover:bg-trading-gold hover:text-trading-dark"
                  }
                >
                  {sector}
                </Button>
              ))}
            </div>
          </div>

          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card glow-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">NIFTY 50</p>
                    <p className="text-2xl font-bold text-white">22,456.75</p>
                    <p className="text-trading-green">+234.50 (+1.06%)</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-trading-green" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card glow-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">SENSEX</p>
                    <p className="text-2xl font-bold text-white">74,123.45</p>
                    <p className="text-trading-green">+456.78 (+0.62%)</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-trading-green" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glow-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">BANK NIFTY</p>
                    <p className="text-2xl font-bold text-white">45,678.90</p>
                    <p className="text-trading-red">-123.45 (-0.27%)</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-trading-red" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stocks Table */}
          <Card className="glass-card glow-border">
            <CardHeader>
              <CardTitle className="text-trading-gold">Market Stocks</CardTitle>
              <CardDescription className="text-gray-300">
                Real-time stock prices and market data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="space-y-4">
                  {filteredStocks.map((stock, index) => (
                    <div key={stock.symbol} className="flex items-center justify-between p-4 rounded-lg bg-trading-card/30 border border-trading-gold/20 hover:border-trading-gold/50 transition-all">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-white">{stock.symbol}</h3>
                            <Badge variant="outline" className="text-xs border-trading-gold/30 text-gray-400">
                              {stock.sector}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{stock.name}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-white">₹{stock.price.toLocaleString('en-IN')}</p>
                          <p className={`text-sm ${stock.change >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                            {stock.change >= 0 ? '+' : ''}₹{Math.abs(stock.change).toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                          </p>
                        </div>

                        <div className="text-right text-sm text-gray-400">
                          <p>Vol: {stock.volume}</p>
                          <p>MCap: {stock.marketCap}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToWatchlist(stock.symbol, stock.name)}
                            disabled={watchlist.includes(stock.symbol)}
                            className="border-trading-gold/30 text-gray-300 hover:bg-trading-gold hover:text-trading-dark"
                          >
                            {watchlist.includes(stock.symbol) ? <Star className="h-4 w-4 fill-current" /> : <Star className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-gold text-trading-dark hover:opacity-90"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Markets;
