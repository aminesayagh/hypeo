import { ThemeProvider } from "next-themes";

export function NextThemesProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      storageKey="theme"
      disableTransitionOnChange={false} // Smooth transitions
    >
      {children}
    </ThemeProvider>
  )
}