import { IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { locales, defaultLocale, type Locale } from "./internationalization.types";
import { getUserLocale } from "./userLocale";

const requestConfig = getRequestConfig(async () => {
  let locale = await getUserLocale();

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../../../messages/${locale}.json`)).default as Record<
      string,
      string
    >,
    now: new Date(),
    onError: error => {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.error(
          `Missing message for key "${error}" in locale "${locale}"`
        );
      } else {
        console.error("An error occurred while processing the request", error);
      }
    },
    getMessageFallback: ({ namespace, key, error }) => {
      const path = [namespace, key].filter(part => part != null).join(".");

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `${path} is not yet translated`;
      } else {
        return `An error occurred while processing the request for ${path}`;
      }
    }
  };
});

export default requestConfig;
