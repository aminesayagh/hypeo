import { I18nProvider } from '@/services/providers/internationalization/I18nProvider'
import { ThemesProvider } from '@/services/providers/themes/ThemesProvider'
import { HeroUIProvider } from '@/services/providers/heroui/HeroUIProvider'
import { NuqsAdapter } from '@/services/providers/adapters/NuqsAdapter'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ThemesProvider>
        <HeroUIProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </HeroUIProvider>
      </ThemesProvider>
    </I18nProvider>
  )
}
