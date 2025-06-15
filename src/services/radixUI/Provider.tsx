import { Theme } from "@radix-ui/themes";

export function RadixUIProvider({ children }: { children: React.ReactNode }) {
  return <Theme>{children}</Theme>
}