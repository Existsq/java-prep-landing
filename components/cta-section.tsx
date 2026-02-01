import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-16 lg:py-20 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-foreground p-12 md:p-16 text-center overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-background mb-4 text-balance">
              Ready to ace your Java interview?
            </h2>
            <p className="text-background/70 text-lg max-w-xl mx-auto mb-8">
              Start practicing today with our free tier. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 bg-background text-foreground hover:bg-background/90">
                Start Free Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 px-8 bg-transparent border-background/30 text-background hover:bg-background/10 hover:border-background"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
