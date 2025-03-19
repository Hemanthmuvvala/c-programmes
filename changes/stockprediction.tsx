import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Your API URL
const API_URL = "http://localhost:8000"; // Change to your actual API URL

export const StockInvestmentData = () => {
  const { toast } = useToast();
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("ensemble");
  
  // List of stock symbols to track
  const stockSymbols = ["AMAZN", "GOOGLE", "APPL", "TSLA"];
  
  // Transform data for the bar chart
  const chartData = stockData.map(stock => ({
    name: stock.name,
    "Current Price": stock.currentPrice,
    "Predicted Price": stock.predictedPrice,
    "Confidence": stock.confidenceLevel,
  }));

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbols: stockSymbols,
          model_type: selectedModel
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      setStockData(data.predictions);
      
      toast({
        title: "Predictions Updated",
        description: `Using ${selectedModel.toUpperCase()} model - ${new Date().toLocaleTimeString()}`,
      });
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch prediction data",
        variant: "destructive",
      });
      // Use sample data as fallback
      setStockData([
        { name: "AMAZN", currentPrice: 180.50, predictedPrice: 185.20, change: 2.5, confidenceLevel: 87, recommendation: "Buy" },
        { name: "GOOGLE", currentPrice: 45.75, predictedPrice: 46.50, change: 1.8, confidenceLevel: 72, recommendation: "Hold" },
        { name: "APPL", currentPrice: 92.30, predictedPrice: 91.85, change: -0.5, confidenceLevel: 85, recommendation: "Buy" },
        { name: "TSLA", currentPrice: 210.25, predictedPrice: 216.98, change: 3.2, confidenceLevel: 78, recommendation: "Buy" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPredictions();
    // Set up interval to refresh data every 5 minutes
    const intervalId = setInterval(fetchPredictions, 5 * 60 * 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedModel]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Stock Market Predictions</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lstm">LSTM</SelectItem>
              <SelectItem value="gru">GRU</SelectItem>
              <SelectItem value="xgboost">XGBoost</SelectItem>
              <SelectItem value="ensemble">Ensemble</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPredictions}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="Current Price" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="Predicted Price" fill="#4C1D95" />
            <Bar yAxisId="right" dataKey="Confidence" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-4">Tomorrow's Stock Predictions</h3>
          <div className="space-y-4">
            {stockData.map((stock) => (
              <div key={stock.name} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{stock.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Current: ${stock.currentPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium">
                      Predicted: ${stock.predictedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
                  <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-700">
                    {stock.confidenceLevel}% confidence
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      stock.recommendation === "Buy"
                        ? "bg-green-100 text-green-700"
                        : stock.recommendation === "Sell"
                        ? "bg-red-100 text-red-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {stock.recommendation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-2">Model Information</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Predictions are generated using {selectedModel === "ensemble" ? "a combination of" : "the"} {selectedModel.toUpperCase()} 
              {selectedModel === "ensemble" ? " models (LSTM, GRU, XGBoost)" : " model"} trained on historical market data.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
              <h4 className="font-medium mb-2">Model Characteristics:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {selectedModel === "lstm" && (
                  <>
                    <li>• LSTM: Long Short-Term Memory neural network</li>
                    <li>• Excellent at capturing long-term dependencies</li>
                    <li>• Good for time series with complex patterns</li>
                  </>
                )}
                {selectedModel === "gru" && (
                  <>
                    <li>• GRU: Gated Recurrent Unit neural network</li>
                    <li>• Efficient variation of LSTM with fewer parameters</li>
                    <li>• Good performance with less training data</li>
                  </>
                )}
                {selectedModel === "xgboost" && (
                  <>
                    <li>• XGBoost: Gradient boosting decision trees</li>
                    <li>• Excellent at handling structured/tabular data</li>
                    <li>• Robust to outliers and missing values</li>
                  </>
                )}
                {selectedModel === "ensemble" && (
                  <>
                    <li>• Ensemble: Combines LSTM, GRU, and XGBoost</li>
                    <li>• Higher accuracy through model diversity</li>
                    <li>• More stable predictions across market conditions</li>
                  </>
                )}
                <li>• Last updated: {new Date().toLocaleString()}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
