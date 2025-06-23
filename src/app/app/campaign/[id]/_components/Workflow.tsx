'use client'

import { Text } from '@/components/text'
import { useTranslations } from 'next-intl'

export default function Workflow() {
  const t = useTranslations('pages.campaign.workflow')

  const header_markup = (
    <div className='flex flex-row items-center justify-between'>
      <Text preset='modalTitle' as='h2'>{t('title')}</Text>
    </div>
  )

  const header = {    
    markup: header_markup,
  }

  return <div className='mb-20 flex flex-col gap-4'>{header.markup}</div>
}
