"use client"

import { HeroUIProvider as HeroUIProviderPrimitive } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export function HeroUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProviderPrimitive>
      <ToastProvider />
      {children}
    </HeroUIProviderPrimitive>
  );
}
