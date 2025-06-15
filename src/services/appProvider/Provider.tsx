import { I18nProvider } from '../i18n/Provider';
import { RadixUIProvider } from '../radixUI/Provider';
import { NextThemesProvider } from '../nextThemes/Provider';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <I18nProvider>
    <RadixUIProvider>
      <NextThemesProvider>
        {children}
      </NextThemesProvider>
    </RadixUIProvider>
  </I18nProvider>
}
