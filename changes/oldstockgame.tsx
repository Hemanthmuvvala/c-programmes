
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Stock {
  id: number;
  name: string;
  price: number;
  change: number;
  owned: number;
  hint: string;
}

export const StockGame = () => {
  const { toast } = useToast();
  const [coins, setCoins] = useState(1000);
  const [investAmount, setInvestAmount] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([
    { 
      id: 1, 
      name: "TechCorp", 
      price: 150, 
      change: 2.5, 
      owned: 0,
      hint: "Strong tech sector performance and new product launches make this a potential growth stock."
    },
    { 
      id: 2, 
      name: "EcoEnergy", 
      price: 75, 
      change: -1.2, 
      owned: 0,
      hint: "Despite recent dips, renewable energy sector shows promise for long-term growth."
    },
    { 
      id: 3, 
      name: "HealthCare Plus", 
      price: 200, 
      change: 3.8, 
      owned: 0,
      hint: "Healthcare sector is defensive and shows steady growth potential."
    },
    { 
      id: 4, 
      name: "Global Finance", 
      price: 120, 
      change: -0.8, 
      owned: 0,
      hint: "Financial sector may benefit from rising interest rates."
    },
  ]);

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
  };

  const simulateMarket = () => {
    setStocks((prev) =>
      prev.map((stock) => {
        const randomChange = (Math.random() * 10 - 5) / 100;
        const newPrice = stock.price * (1 + randomChange);
        return {
          ...stock,
          price: Number(newPrice.toFixed(2)),
          change: Number((randomChange * 100).toFixed(2)),
        };
      })
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Stock Market Game</h2>
        <div className="text-lg font-semibold">
          Available Coins: {coins.toFixed(2)} 🪙
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex gap-4 items-center mb-4">
          <Input
            type="number"
            placeholder="Enter investment amount"
            value={investAmount}
            onChange={(e) => setInvestAmount(e.target.value)}
            className="max-w-[200px]"
          />
          <Button onClick={simulateMarket}>Simulate Market Change</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stocks.map((stock) => (
            <div
              key={stock.id}
              className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{stock.name}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{stock.hint}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
              <div className="flex justify-between items-center mb-2">
                <span>Price: {stock.price.toFixed(2)} 🪙</span>
                <span>Owned: {stock.owned}</span>
              </div>
              <Button
                className="w-full"
                onClick={() => handleBuy(stock)}
                disabled={!investAmount || Number(investAmount) > coins}
              >
                Buy
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
