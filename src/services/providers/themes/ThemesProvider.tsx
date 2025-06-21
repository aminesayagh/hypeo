import { ThemeProvider } from "next-themes";

export function ThemesProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      storageKey="theme"
      disableTransitionOnChange={false} // Enable smooth CSS transitions
      enableColorScheme={false} // Disable to prevent conflicts with CSS
    >
      {children}
    </ThemeProvider>
  )
}