"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Toast = {
  id: number;
  title: string;
  description?: string;
  variant?: "success" | "error";
};

type ToastContext = { push: (t: Omit<Toast, "id">) => void };

const ToastCtx = createContext<ToastContext | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    return {
      push: () => {
        /* noop on server */
      },
    } as ToastContext;
  }
  return ctx;
}

let externalPush: ToastContext["push"] | null = null;
export function toast(t: Omit<Toast, "id">) {
  externalPush?.(t);
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback<ToastContext["push"]>((t) => {
    const id = Date.now() + Math.random();
    setToasts((s) => [...s, { ...t, id }]);
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id));
    }, 4500);
  }, []);

  useEffect(() => {
    externalPush = push;
    return () => {
      externalPush = null;
    };
  }, [push]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[180] flex w-[min(360px,calc(100vw-3rem))] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto glass-strong flex items-start gap-3 rounded-xl p-3.5 shadow-lg"
          >
            {t.variant === "error" ? (
              <XCircle className="mt-0.5 h-4 w-4 flex-none text-red-400" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{t.title}</p>
              {t.description ? (
                <p className="mt-0.5 text-xs text-muted-foreground">{t.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() =>
                setToasts((s) => s.filter((x) => x.id !== t.id))
              }
              className="rounded-md p-1 text-muted-foreground transition hover:bg-accent hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
