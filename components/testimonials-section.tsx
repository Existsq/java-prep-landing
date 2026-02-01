const testimonials = [
  {
    quote: "JavaPrep helped me land my dream job at Google. The AI mock interviews were incredibly realistic and prepared me for tough behavioral questions.",
    author: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar: "SC",
  },
  {
    quote: "The comprehensive coverage of Spring Framework questions was exactly what I needed. I went from struggling with dependency injection to acing my interview.",
    author: "Marcus Rodriguez",
    role: "Senior Developer at Amazon",
    avatar: "MR",
  },
  {
    quote: "Best investment I made for my career. The system design section alone is worth the subscription. Landed offers from 3 FAANG companies.",
    author: "Priya Sharma",
    role: "Tech Lead at Meta",
    avatar: "PS",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-20 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-sm mb-4">{"// Testimonials"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by 50,000+ developers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join the community of developers who transformed their interview performance.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 bg-card border border-border rounded-lg"
            >
              <blockquote className="text-foreground mb-6 leading-relaxed">
                {'"'}{testimonial.quote}{'"'}
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-medium text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{testimonial.author}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
