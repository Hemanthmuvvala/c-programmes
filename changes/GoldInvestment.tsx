import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface GoldPrice {
  date: string;
  price: number;
}

export const GoldInvestment = () => {
  const { toast } = useToast();
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState("Loading...");

  // Sample historical data
  const goldPriceData: GoldPrice[] = [
    { date: "Jan", price: 1950 },
    { date: "Feb", price: 1980 },
    { date: "Mar", price: 2020 },
    { date: "Apr", price: 2000 },
    { date: "May", price: 2035 },
    { date: "Jun", price: 2050.75 },
  ];

  // Fetch gold price from API
  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
          headers: {
            "x-access-token": "goldapi-uur4619m7fgnueu-io", // Replace with your API key
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gold price");
        }

        const data = await response.json();
        setCurrentPrice(data.price);
        setPriceChange(data.ch); // Assuming 'ch' is the price change percentage

        // Call recommendation logic after fetching the new price
        calculateRecommendation(data.price);
      } catch (error) {
        console.error("Error fetching gold price:", error);
      }
    };

    fetchGoldPrice();
  }, []);

  // AI-based recommendation logic using Simple Linear Regression
  const calculateRecommendation = (latestPrice: number) => {
    const prices = goldPriceData.map((data) => data.price);
    const indices = goldPriceData.map((_, index) => index);

    // Calculate trend using simple regression (y = mx + c)
    const n = prices.length;
    const sumX = indices.reduce((a, b) => a + b, 0);
    const sumY = prices.reduce((a, b) => a + b, 0);
    const sumXY = indices.reduce((sum, x, i) => sum + x * prices[i], 0);
    const sumXX = indices.reduce((sum, x) => sum + x * x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    
    // Predict next month's price
    const predictedPrice = prices[prices.length - 1] + slope;

    // Decide recommendation
    setRecommendation(predictedPrice > latestPrice ? "Buy" : "Don't Buy");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gold Investment Analysis</h2>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            Current Price: ${currentPrice ? currentPrice.toFixed(2) : "Loading..."}
          </span>
          {priceChange !== null && (
            <span className={`flex items-center ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {priceChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {Math.abs(priceChange)}%
            </span>
          )}
        </div>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={goldPriceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#FFD700" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Investment Recommendation Section */}
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="text-xl font-semibold mb-2">AI-Based Investment Recommendation</h3>
        <div className={`text-lg ${recommendation === "Buy" ? "text-green-500" : "text-red-500"}`}>
          {recommendation}
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-card">
        <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Strong demand from central banks</li>
          <li>• Geopolitical tensions supporting prices</li>
          <li>• Technical indicators showing bullish trends</li>
        </ul>
      </div>
    </div>
  );
};
