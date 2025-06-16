import { I18nProvider } from '../i18n/Provider';
import { NextThemesProvider } from '../nextThemes/Provider';
import { HeroUIProvider } from '../heroUI/Provider'; 
import { NuqsAdapter } from '../nuqs/NuqsAdapter';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <I18nProvider>
      <NextThemesProvider>
        <HeroUIProvider>
          <NuqsAdapter> 
            {children}
          </NuqsAdapter>
        </HeroUIProvider>
      </NextThemesProvider>
  </I18nProvider>
}
