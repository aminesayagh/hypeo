
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export async function I18nProvider({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const messages = await getMessages();

    return <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>;
}
