import { useEffect, useState } from "react";
import axios from "axios";
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
  symbol: string;
  name: string;
  price: number;
  change: number;
  owned: number;
}

const API_KEY = "67b99dfe161f63.90439827"; // Replace with your Alpha Vantage API key
const STOCK_SYMBOLS = ["AAPL", "GOOGL", "TSLA", "MSFT"];

export const StockGame = () => {
  const { toast } = useToast();
  const [coins, setCoins] = useState(1000);
  const [investAmount, setInvestAmount] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Fetch every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStockData = async () => {
    try {
      const responses = await Promise.all(
        STOCK_SYMBOLS.map((symbol) =>
          axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
          )
        )
      );

      const newStocks = responses.map((res) => {
        const data = res.data["Global Quote"];
        return {
          symbol: data["01. symbol"],
          name: data["01. symbol"],
          price: parseFloat(data["05. price"]),
          change: parseFloat(data["10. change percent"].replace("%", "")),
          owned: 0,
        };
      });

      setStocks(newStocks);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch stock data. Try again later.",
        variant: "destructive",
      });
    }
  };

  const handleBuy = (stock: Stock) => {
    const amount = Number(investAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Enter a valid investment amount",
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
        s.symbol === stock.symbol ? { ...s, owned: s.owned + sharesToBuy } : s
      )
    );
    setInvestAmount("");

    toast({
      title: "Investment successful!",
      description: `Bought ${sharesToBuy} shares of ${stock.name}`,
    });
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
          <Button onClick={fetchStockData}>Refresh Stocks</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
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
                        <p>Real-time stock market data from Alpha Vantage.</p>
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
