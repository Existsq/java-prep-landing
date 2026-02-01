import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with Java interview prep.",
    features: [
      "50 core Java questions",
      "Basic code editor",
      "Community access",
      "Progress tracking",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious candidates preparing for top companies.",
    features: [
      "500+ interview questions",
      "AI mock interviews",
      "Detailed explanations",
      "Video solutions",
      "Priority support",
      "Certificate of completion",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For teams and bootcamps preparing multiple candidates.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Admin dashboard",
      "Custom learning paths",
      "Analytics & reporting",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-16 lg:py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-card text-xs font-mono text-muted-foreground mb-6">
            PRICING
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your preparation needs. Cancel anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative p-8 border transition-colors",
                plan.highlighted
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border hover:border-foreground/30"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background text-foreground text-xs font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={cn(
                  "text-xl font-bold mb-2",
                  plan.highlighted ? "text-background" : "text-foreground"
                )}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={cn(
                    "text-4xl font-bold",
                    plan.highlighted ? "text-background" : "text-foreground"
                  )}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? "text-background/70" : "text-muted-foreground"}>
                    {plan.period}
                  </span>
                </div>
                <p className={cn(
                  "text-sm",
                  plan.highlighted ? "text-background/70" : "text-muted-foreground"
                )}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={cn(
                      "h-4 w-4 shrink-0",
                      plan.highlighted ? "text-background" : "text-foreground"
                    )} />
                    <span className={cn(
                      "text-sm",
                      plan.highlighted ? "text-background" : "text-foreground"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full",
                  plan.highlighted 
                    ? "bg-background text-foreground hover:bg-background/90" 
                    : ""
                )}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
