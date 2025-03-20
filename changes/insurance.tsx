import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Heart, Home, Car, Check } from "lucide-react";

interface InsurancePlan {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  premium: number;
  coverage: string;
  icon: JSX.Element;
  recommendation: string;
}

export const Insurance = () => {
  const { toast } = useToast();

  const insurancePlans: InsurancePlan[] = [
    {
      id: 1,
      name: "Comprehensive Health Insurance",
      description: "Complete health coverage for you and your family",
      benefits: [
        "Covers hospitalization expenses",
        "Includes pre and post hospitalization costs",
        "Cashless treatment at network hospitals",
        "Annual health checkup",
      ],
      premium: 1200,
      coverage: "₹5,00,000",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      recommendation: "Highly recommended for families",
    },
    {
      id: 2,
      name: "Term Life Insurance",
      description: "Secure your family's future",
      benefits: [
        "High coverage at low premium",
        "Tax benefits under Section 80C",
        "Rider options available",
        "Critical illness coverage",
      ],
      premium: 800,
      coverage: "₹1,00,00,000",
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      recommendation: "Essential for primary earning members",
    },
    {
      id: 3,
      name: "Home Insurance",
      description: "Protect your home and belongings",
      benefits: [
        "Covers natural disasters",
        "Content insurance included",
        "Theft protection",
        "Third-party liability",
      ],
      premium: 600,
      coverage: "₹50,00,000",
      icon: <Home className="h-6 w-6 text-green-500" />,
      recommendation: "Recommended for homeowners",
    },
    {
      id: 4,
      name: "Vehicle Insurance",
      description: "Comprehensive coverage for your vehicle",
      benefits: [
        "Third-party liability",
        "Own damage coverage",
        "24/7 roadside assistance",
        "No claim bonus",
      ],
      premium: 400,
      coverage: "₹15,00,000",
      icon: <Car className="h-6 w-6 text-purple-500" />,
      recommendation: "Mandatory for vehicle owners",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass dark:glass-dark rounded-lg border shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Insurance Plans</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {insurancePlans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              {plan.icon}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
            </div>
            
            <p className="text-muted-foreground mb-4">{plan.description}</p>
            
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Key Benefits:</div>
              <ul className="space-y-2">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Monthly Premium</div>
                <div className="text-2xl font-bold">₹{plan.premium}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Coverage</div>
                <div className="text-lg font-semibold">{plan.coverage}</div>
              </div>
            </div>
            
            <div className="mb-4 p-2 bg-muted rounded-lg">
              <div className="text-sm font-medium">Recommendation:</div>
              <div className="text-sm text-muted-foreground">{plan.recommendation}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
