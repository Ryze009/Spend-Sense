import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-foreground p-4">
      <AlertCircle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg text-muted-foreground mb-6">Page not found</p>
      <Link href="/">
        <div className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer">
          Return to Dashboard
        </div>
      </Link>
    </div>
  );
}
