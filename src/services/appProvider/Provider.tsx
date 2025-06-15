import { I18nProvider } from '../i18n/Provider';
import { NextThemesProvider } from '../nextThemes/Provider';
import { HeroUIProvider } from '../heroUI/Provider'; 

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <I18nProvider>
      <NextThemesProvider>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </NextThemesProvider>
  </I18nProvider>
}
