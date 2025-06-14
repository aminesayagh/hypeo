'use client';

import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import frTranslations from '@shopify/polaris/locales/fr.json';

export function PolarisProvider({ children }: { children: React.ReactNode }) {
  return <AppProvider i18n={[
    enTranslations,
    frTranslations,
  ]} >{children}</AppProvider>;
}
