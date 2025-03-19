import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart2 } from "lucide-react";

interface StockData {
  name: string;
  currentPrice: number;
  predictedPrice: number;
  change: number;
  confidenceLevel: number;
  recommendation: string;
}

export const StockInvestmentData = () => {
  const { toast } = useToast();
  
  // Sample stock data with predicted prices and confidence levels
  // This will be replaced with your ML model API data
  const topStocks: StockData[] = [
    { name: "AMAZN", currentPrice: 180.50, predictedPrice: 185.20, change: 2.5, confidenceLevel: 87, recommendation: "Buy" },
    { name: "GOOGLE", currentPrice: 45.75, predictedPrice: 46.50, change: 1.8, confidenceLevel: 72, recommendation: "Hold" },
    { name: "APPL", currentPrice: 92.30, predictedPrice: 91.85, change: -0.5, confidenceLevel: 85, recommendation: "Buy" },
    { name: "TSLA", currentPrice: 210.25, predictedPrice: 216.98, change: 3.2, confidenceLevel: 78, recommendation: "Buy" },
  ];

  // Transform data for the bar chart
  const chartData = topStocks.map(stock => ({
    name: stock.name,
    "Current Price": stock.currentPrice,
    "Predicted Price": stock.predictedPrice,
    "Confidence": stock.confidenceLevel,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg animate-fade-up">
      <h2 className="text-2xl font-bold mb-6">Stock Market Predictions</h2>

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
            {topStocks.map((stock) => (
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
          <h3 className="text-xl font-semibold mb-2">Prediction Insights</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Our AI model predicts stock movements for the next trading day based on historical patterns,
              market sentiment, and technical indicators. Confidence level indicates the model's certainty.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
              <h4 className="font-medium mb-2">How to interpret:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High confidence (80%+): Strong prediction signal</li>
                <li>• Medium confidence (60-80%): Moderate prediction signal</li>
                <li>• Low confidence (below 60%): Consider additional analysis</li>
                <li>• Predictions are updated daily before market open</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
