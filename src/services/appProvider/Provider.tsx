import { I18nProvider } from "../i18n/Provider";
import { PolarisProvider } from "../polaris/Provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <I18nProvider>
            <PolarisProvider>
                {children}
            </PolarisProvider>
        </I18nProvider>
    )
}