import Link from "next/link";
import { Code2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Dashboard header - same style as landing */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="JavaPrep"
                className="w-8 h-8 object-contain rounded"
              />
              <span className="font-bold text-lg text-foreground">JavaPrep</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to site
              </Link>
              <span className="text-sm font-medium text-foreground">Dashboard</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1 pt-16">{children}</main>

      {/* Footer - same as landing */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                <Code2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">JavaPrep</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 JavaPrep. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
