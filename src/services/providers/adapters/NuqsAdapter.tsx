'use client'
import { NuqsAdapter as NuqsAdapterComponent } from "nuqs/adapters/next/app";

export function NuqsAdapter({ children }: { children: React.ReactNode }) {
  return (
        <NuqsAdapterComponent>
      {children}
    </NuqsAdapterComponent>
  )
}