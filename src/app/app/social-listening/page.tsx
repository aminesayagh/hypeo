"use client";

import { Text } from "@/components/typo";
import { useTranslations } from "next-intl";

export default function SocialListeningPage() {
  const t = useTranslations('pages.socialListening')

  // --------------------------------------------------
  // Header
  // --------------------------------------------------

  const header_markup = (
    <div className='flex flex-row items-start justify-between'>
      <div className='flex flex-col gap-2'>
        <Text as='h1' preset='sectionTitle'>
          {t('title')}
        </Text>
        <Text variant='bodyMd' degree='300'>
          {t('description')}
        </Text>
      </div>
    </div>
  )

  const header = {
    markup: header_markup,
  }

  return (
    <div className='flex flex-col gap-12 py-6 pl-6 pr-8 sm:gap-4'>
      {header.markup}
      <div className='h-24'></div>
    </div>
  );
}