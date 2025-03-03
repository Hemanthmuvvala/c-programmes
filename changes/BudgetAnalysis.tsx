import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { PiggyBank, TrendingUp, Shield } from "lucide-react";

export const BudgetAnalysis = () => {
  const { toast } = useToast();
  const [monthlySavings, setMonthlySavings] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAnalysis = () => {
    if (!monthlySavings || Number(monthlySavings) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid monthly savings amount",
        variant: "destructive",
      });
      return;
    }

    setShowSuggestions(true);
  };

  const getSuggestions = () => {
    const savings = Number(monthlySavings);
    const emergencyFund = savings * 0.3;
    const investments = savings * 0.5;
    const insurance = savings * 0.2;

    return [
      {
        title: "Emergency Fund",
        amount: emergencyFund,
        description: "Keep this in a high-yield savings account for emergencies",
        icon: <PiggyBank className="h-6 w-6 text-blue-500" />, 
      },
      {
        title: "Stock Market Investment",
        amount: investments,
        description: "Consider index funds or blue-chip stocks for long-term growth",
        icon: <TrendingUp className="h-6 w-6 text-green-500" />, 
      },
      {
        title: "Insurance Coverage",
        amount: insurance,
        description: "Allocate this for term life and health insurance premiums",
        icon: <Shield className="h-6 w-6 text-purple-500" />, 
      }
    ];
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Budget Analysis & Investment Suggestions</h2>
      
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Monthly Savings Amount (₹)
        </label>
        <div className="flex gap-4">
          <Input
            type="number"
            value={monthlySavings}
            onChange={(e) => setMonthlySavings(e.target.value)}
            placeholder="Enter your monthly savings amount"
            className="max-w-xs"
          />
          <Button onClick={handleAnalysis}>
            Analyze
          </Button>
        </div>
      </div>

      {showSuggestions && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Investment Suggestions</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getSuggestions().map((suggestion, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  {suggestion.icon}
                  <h4 className="font-semibold">{suggestion.title}</h4>
                </div>
                <p className="text-2xl font-bold mb-2">
                  ₹{suggestion.amount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {suggestion.description}
                </p>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Additional Recommendations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Start investing early in the month to maximize returns</li>
              <li>• Consider increasing emergency fund during uncertain times</li>
              <li>• Review and rebalance your portfolio quarterly</li>
              <li>• Consider tax-saving investment options</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
