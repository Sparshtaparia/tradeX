
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { Plus, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const { toast } = useToast();
  const [trades, setTrades] = useState([]);
  const [showAddTrade, setShowAddTrade] = useState(false);
  const [tradeForm, setTradeForm] = useState({
    symbol: "",
    name: "",
    type: "buy",
    quantity: "",
    price: "",
    date: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setTradeForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tradeForm.symbol || !tradeForm.quantity || !tradeForm.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newTrade = {
      id: Date.now(),
      ...tradeForm,
      quantity: parseInt(tradeForm.quantity),
      price: parseFloat(tradeForm.price),
      totalValue: parseInt(tradeForm.quantity) * parseFloat(tradeForm.price),
      date: tradeForm.date || new Date().toISOString().split('T')[0]
    };

    setTrades(prev => [newTrade, ...prev]);
    setTradeForm({
      symbol: "",
      name: "",
      type: "buy",
      quantity: "",
      price: "",
      date: "",
      notes: ""
    });
    setShowAddTrade(false);

    toast({
      title: "Trade Added",
      description: `Successfully added ${tradeForm.type} order for ${tradeForm.symbol}`,
    });
  };

  const handleDeleteTrade = (id: number) => {
    setTrades(prev => prev.filter(trade => trade.id !== id));
    toast({
      title: "Trade Deleted",
      description: "Trade has been removed from your portfolio",
    });
  };

  const calculatePortfolioStats = () => {
    const totalInvested = trades
      .filter(trade => trade.type === 'buy')
      .reduce((sum, trade) => sum + trade.totalValue, 0);
    
    const totalSold = trades
      .filter(trade => trade.type === 'sell')
      .reduce((sum, trade) => sum + trade.totalValue, 0);

    return {
      totalInvested,
      totalSold,
      netPosition: totalInvested - totalSold,
      totalTrades: trades.length
    };
  };

  const stats = calculatePortfolioStats();

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">Portfolio Manager</h1>
                <p className="text-gray-300">Track your trades and investment decisions</p>
              </div>
              <Button 
                onClick={() => setShowAddTrade(!showAddTrade)}
                className="mt-4 md:mt-0 bg-gradient-gold text-trading-dark hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Trade
              </Button>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card glow-border hover-glow animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Total Invested</p>
                    <p className="text-2xl font-bold text-white">
                      ₹{stats.totalInvested.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-trading-gold" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Total Sold</p>
                    <p className="text-2xl font-bold text-trading-green">
                      ₹{stats.totalSold.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-trading-green" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Net Position</p>
                    <p className={`text-2xl font-bold ${stats.netPosition >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                      ₹{Math.abs(stats.netPosition).toLocaleString('en-IN')}
                    </p>
                  </div>
                  {stats.netPosition >= 0 ? 
                    <TrendingUp className="h-8 w-8 text-trading-green" /> : 
                    <TrendingDown className="h-8 w-8 text-trading-red" />
                  }
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card glow-border hover-glow animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Total Trades</p>
                    <p className="text-2xl font-bold text-white">{stats.totalTrades}</p>
                  </div>
                  <Edit className="h-8 w-8 text-trading-gold" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Trade Form */}
          {showAddTrade && (
            <Card className="glass-card glow-border mb-8 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-trading-gold">Add New Trade</CardTitle>
                <CardDescription className="text-gray-300">
                  Record your trading activity and thoughts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTrade} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="symbol" className="text-trading-gold">Stock Symbol *</Label>
                      <Input
                        id="symbol"
                        placeholder="e.g., RELIANCE.NS"
                        value={tradeForm.symbol}
                        onChange={(e) => handleInputChange('symbol', e.target.value)}
                        className="bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-trading-gold">Company Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Reliance Industries"
                        value={tradeForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-trading-gold">Trade Type *</Label>
                      <Select value={tradeForm.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger className="bg-trading-card border-trading-gold/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-trading-card border-trading-gold/30">
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="sell">Sell</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-trading-gold">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Number of shares"
                        value={tradeForm.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        className="bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-trading-gold">Price per Share (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="Price per share"
                        value={tradeForm.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-trading-gold">Trade Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={tradeForm.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="bg-trading-card border-trading-gold/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-trading-gold">Trading Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Your thoughts, strategy, or reasons for this trade..."
                      value={tradeForm.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="bg-trading-card border-trading-gold/30 text-white placeholder:text-gray-400 min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-gradient-gold text-trading-dark hover:opacity-90">
                      Add Trade
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddTrade(false)}
                      className="border-trading-gold text-trading-gold hover:bg-trading-gold hover:text-trading-dark"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Trades List */}
          <Card className="glass-card glow-border animate-fade-in">
            <CardHeader>
              <CardTitle className="text-trading-gold">Trade History</CardTitle>
              <CardDescription className="text-gray-300">
                Your recorded trades and investment decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trades.length === 0 ? (
                <div className="text-center py-12">
                  <Edit className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No trades recorded yet</h3>
                  <p className="text-gray-400 mb-4">Start by adding your first trade to track your portfolio</p>
                  <Button 
                    onClick={() => setShowAddTrade(true)}
                    className="bg-gradient-gold text-trading-dark hover:opacity-90"
                  >
                    Add First Trade
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {trades.map((trade, index) => (
                    <div 
                      key={trade.id} 
                      className="p-6 rounded-lg bg-trading-card/30 border border-trading-gold/20 hover-glow animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-xl font-bold text-trading-gold">{trade.symbol}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              trade.type === 'buy' 
                                ? 'bg-trading-green/20 text-trading-green' 
                                : 'bg-trading-red/20 text-trading-red'
                            }`}>
                              {trade.type.toUpperCase()}
                            </span>
                          </div>
                          {trade.name && <p className="text-gray-300 mb-2">{trade.name}</p>}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Quantity:</span>
                              <span className="ml-2 text-white">{trade.quantity}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Price:</span>
                              <span className="ml-2 text-white">₹{trade.price.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Total:</span>
                              <span className="ml-2 text-white">₹{trade.totalValue.toLocaleString('en-IN')}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Date:</span>
                              <span className="ml-2 text-white">{trade.date}</span>
                            </div>
                          </div>
                          {trade.notes && (
                            <div className="mt-3 p-3 bg-trading-dark/50 rounded-lg">
                              <span className="text-gray-400 text-sm">Notes: </span>
                              <span className="text-gray-300 text-sm">{trade.notes}</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTrade(trade.id)}
                            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
