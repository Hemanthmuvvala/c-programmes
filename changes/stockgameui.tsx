import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, TrendingDown, Info, BarChart2, 
  RefreshCw, Zap, BookOpen, DollarSign 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Stock {
  id: number;
  name: string;
  price: number;
  change: number;
  owned: number;
  hint: string;
  sector: string;
  risk: "Low" | "Medium" | "High";
}

// Tips to help users learn stock trading concepts
const TRADING_TIPS = [
  "Diversify your portfolio across different sectors to reduce risk",
  "Higher risk stocks may offer greater potential returns, but also greater potential losses",
  "Watch market trends before making investment decisions",
  "Consider the long-term potential of a company, not just daily price movements",
  "Pay attention to sector performance as sectors often move together"
];

export const StockGame = () => {
  const { toast } = useToast();
  const [coins, setCoins] = useState(1000);
  const [investAmount, setInvestAmount] = useState("");
  const [dayCount, setDayCount] = useState(1);
  const [netWorth, setNetWorth] = useState(1000);
  const [tipIndex, setTipIndex] = useState(0);
  
  // Enhanced stock data with educational elements
  const [stocks, setStocks] = useState<Stock[]>([
    { 
      id: 1, 
      name: "TechCorp", 
      price: 150, 
      change: 2.5, 
      owned: 0,
      hint: "Strong tech sector performance and new product launches make this a potential growth stock.",
      sector: "Technology",
      risk: "Medium"
    },
    { 
      id: 2, 
      name: "EcoEnergy", 
      price: 75, 
      change: -1.2, 
      owned: 0,
      hint: "Despite recent dips, renewable energy sector shows promise for long-term growth.",
      sector: "Energy",
      risk: "High"
    },
    { 
      id: 3, 
      name: "HealthCare Plus", 
      price: 200, 
      change: 3.8, 
      owned: 0,
      hint: "Healthcare sector is defensive and shows steady growth potential.",
      sector: "Healthcare",
      risk: "Low"
    },
    { 
      id: 4, 
      name: "Global Finance", 
      price: 120, 
      change: -0.8, 
      owned: 0,
      hint: "Financial sector may benefit from rising interest rates.",
      sector: "Finance",
      risk: "Medium"
    },
  ]);

  // Calculate net worth whenever stocks or coins change
  useEffect(() => {
    const stocksValue = stocks.reduce((total, stock) => {
      return total + (stock.owned * stock.price);
    }, 0);
    setNetWorth(coins + stocksValue);
  }, [stocks, coins]);

  // Rotate through tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % TRADING_TIPS.length);
    }, 10000);
    return () => clearInterval(tipInterval);
  }, []);

  const handleBuy = (stock: Stock) => {
    const amount = Number(investAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
        variant: "destructive",
      });
      return;
    }

    if (amount > coins) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough coins for this investment",
        variant: "destructive",
      });
      return;
    }

    const sharesToBuy = Math.floor(amount / stock.price);
    if (sharesToBuy === 0) {
      toast({
        title: "Amount too low",
        description: `Minimum investment required: ${stock.price} coins`,
        variant: "destructive",
      });
      return;
    }

    const totalCost = sharesToBuy * stock.price;
    setCoins((prev) => prev - totalCost);
    setStocks((prev) =>
      prev.map((s) =>
        s.id === stock.id ? { ...s, owned: s.owned + sharesToBuy } : s
      )
    );
    setInvestAmount("");

    toast({
      title: "Investment successful!",
      description: `Bought ${sharesToBuy} shares of ${stock.name}`,
    });

    // Educational feedback based on risk level
    if (stock.risk === "High") {
      toast({
        title: "Learning Note",
        description: "You invested in a high-risk stock. These can be volatile but may offer higher returns.",
        duration: 5000,
      });
    }
  };

  const handleSell = (stock: Stock) => {
    if (stock.owned <= 0) {
      toast({
        title: "No shares to sell",
        description: "You don't own any shares of this stock",
        variant: "destructive",
      });
      return;
    }

    const sellValue = stock.owned * stock.price;
    setCoins(prev => prev + sellValue);
    
    // Calculate profit/loss for educational feedback
    const originalValue = stock.owned * (stock.price / (1 + stock.change/100));
    const profitLoss = sellValue - originalValue;
    
    setStocks(prev =>
      prev.map(s => s.id === stock.id ? { ...s, owned: 0 } : s)
    );

    toast({
      title: profitLoss >= 0 ? "Profit Made!" : "Loss Taken",
      description: `Sold ${stock.owned} shares for ${sellValue.toFixed(2)} coins (${profitLoss >= 0 ? "+" : ""}${profitLoss.toFixed(2)})`,
      variant: profitLoss >= 0 ? "default" : "destructive",
    });
  };

  const simulateMarket = () => {
    // More realistic market simulation with sector correlation
    const sectorTrends = {
      "Technology": (Math.random() * 10 - 4) / 100,
      "Energy": (Math.random() * 10 - 4) / 100,
      "Healthcare": (Math.random() * 8 - 3) / 100,
      "Finance": (Math.random() * 9 - 4) / 100,
    };

    setStocks((prev) =>
      prev.map((stock) => {
        // Base sector movement + individual stock movement
        const sectorChange = sectorTrends[stock.sector as keyof typeof sectorTrends];
        
        // Risk affects volatility
        const volatilityFactor = 
          stock.risk === "High" ? 1.5 : 
          stock.risk === "Medium" ? 1 : 0.7;
          
        const individualChange = (Math.random() * 6 - 3) / 100 * volatilityFactor;
        const totalChange = sectorChange + individualChange;
        
        const newPrice = Math.max(1, stock.price * (1 + totalChange));
        return {
          ...stock,
          price: Number(newPrice.toFixed(2)),
          change: Number((totalChange * 100).toFixed(2)),
        };
      })
    );
    
    setDayCount(prev => prev + 1);
    
    // Random market event for learning
    if (Math.random() > 0.7) {
      const events = [
        "Tech sector rallies on new innovation news!",
        "Energy stocks affected by regulatory changes",
        "Healthcare stocks steady as demand remains consistent",
        "Financial sector responds to interest rate concerns"
      ];
      toast({
        title: "Market News",
        description: events[Math.floor(Math.random() * events.length)],
        duration: 5000,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg border shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Stock Market Simulator</h2>
          <p className="text-sm text-indigo-600 dark:text-indigo-300">Day {dayCount} | Learn as you trade</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-green-600 dark:text-green-400">
            Net Worth: {netWorth.toFixed(2)} 🪙
          </div>
          <div className="text-sm">Available: {coins.toFixed(2)} 🪙</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 border border-indigo-100 dark:border-indigo-900">
        <div className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-amber-500" />
          <span className="text-sm italic">Tip: {TRADING_TIPS[tipIndex]}</span>
        </div>
      </div>

      <Tabs defaultValue="market" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="market">
            <BarChart2 className="h-4 w-4 mr-2" /> Market
          </TabsTrigger>
          <TabsTrigger value="learn">
            <BookOpen className="h-4 w-4 mr-2" /> Learning Center
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="space-y-4">
          <div className="flex gap-4 items-center mb-4">
            <Input
              type="number"
              placeholder="Enter investment amount"
              value={investAmount}
              onChange={(e) => setInvestAmount(e.target.value)}
              className="max-w-[200px]"
            />
            <Button 
              onClick={simulateMarket}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Next Trading Day
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stocks.map((stock) => (
              <Card 
                key={stock.id}
                className={`border-l-4 ${stock.change >= 0 ? "border-l-green-500" : "border-l-red-500"}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {stock.name}
                      <Badge 
                        variant="outline" 
                        className={
                          stock.risk === "High" ? "border-red-400 text-red-600 dark:text-red-400" : 
                          stock.risk === "Medium" ? "border-amber-400 text-amber-600 dark:text-amber-400" : 
                          "border-green-400 text-green-600 dark:text-green-400"
                        }
                      >
                        {stock.risk} Risk
                      </Badge>
                    </CardTitle>
                    <span
                      className={`flex items-center ${
                        stock.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(stock.change)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Sector: {stock.sector}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 p-0">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{stock.hint}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">{stock.price.toFixed(2)} 🪙</span>
                    <span>
                      {stock.owned > 0 && (
                        <span className="text-indigo-600 dark:text-indigo-400">
                          Owned: {stock.owned} ({(stock.owned * stock.price).toFixed(2)} 🪙)
                        </span>
                      )}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                    onClick={() => handleBuy(stock)}
                    disabled={!investAmount || Number(investAmount) > coins}
                  >
                    <DollarSign className="h-4 w-4 mr-1" /> Buy
                  </Button>
                  {stock.owned > 0 && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleSell(stock)}
                    >
                      Sell All
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learn">
          <Card>
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              <CardTitle>Stock Market Basics</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Understanding Risk Levels</h3>
                <p className="mb-2">Stocks in our simulator have three risk levels:</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Badge variant="outline" className="border-green-400 text-green-600 dark:text-green-400 mr-2">Low Risk</Badge>
                    <span>More stable prices, typically lower returns but safer investments</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="border-amber-400 text-amber-600 dark:text-amber-400 mr-2">Medium Risk</Badge>
                    <span>Moderate price fluctuations with balanced risk/reward</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="border-red-400 text-red-600 dark:text-red-400 mr-2">High Risk</Badge>
                    <span>Larger price swings, potential for higher returns but also bigger losses</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Market Sectors</h3>
                <p className="mb-2">Stocks in the same sector often move together based on sector-specific news and trends:</p>
                <ul className="space-y-1">
                  <li><span className="font-medium">Technology:</span> Companies focused on software, hardware, and digital services</li>
                  <li><span className="font-medium">Energy:</span> Companies involved in energy production and distribution</li>
                  <li><span className="font-medium">Healthcare:</span> Medical services, pharmaceuticals, and healthcare providers</li>
                  <li><span className="font-medium">Finance:</span> Banks, investment firms, and financial service providers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Trading Strategy Tips</h3>
                <ul className="space-y-1">
                  <li>Diversify your investments across different sectors and risk levels</li>
                  <li>Watch for market news that might affect specific sectors</li>
                  <li>Consider selling stocks that have gained significant value to lock in profits</li>
                  <li>Track your portfolio performance over time to refine your strategy</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
