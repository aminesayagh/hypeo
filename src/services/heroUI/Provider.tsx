"use client"

import { HeroUIProvider as HeroUIProviderPrimitive } from "@heroui/react";

export function HeroUIProvider({ children }: { children: React.ReactNode }) {
  return <HeroUIProviderPrimitive>{children}</HeroUIProviderPrimitive>
}
