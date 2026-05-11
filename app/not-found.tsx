import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center">
      <div className="container-tight text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          404 · route not found
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">
          <span className="text-gradient">This page slipped the index.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist — but everything you
          probably wanted is one click away.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">
              Go home <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
