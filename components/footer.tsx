import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Topics", href: "#topics" },
    { label: "Pricing", href: "#pricing" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Support", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const socialLinks = [
  { label: "GitHub", href: "#", icon: Github },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Twitter", href: "#", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-card/40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* Main content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <img
                src="/logo.jpg"
                alt="JavaPrep"
                className="w-9 h-9 rounded-lg object-contain ring-1 ring-border/50 group-hover:ring-foreground/20 transition-colors"
              />
              <span className="font-bold text-xl text-foreground tracking-tight">
                JavaPrep
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Master Java interviews with confidence. Built by engineers, for engineers.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border bg-background/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-background/80 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/90 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/80">
          <p className="text-xs text-muted-foreground/80 font-mono">
            © {new Date().getFullYear()} JavaPrep. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground/80 hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
