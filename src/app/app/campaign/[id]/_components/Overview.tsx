'use client'

import { Avatar, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import Text from '@/components/text'
import {
  CreditCard,
  FileText,
  Globe,
  UserCheck,
  UserPlus,
  Wallet,
} from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/button'
import { useTranslations } from 'next-intl'

export default function Overview() {
  const t = useTranslations('pages.campaign.overview')

  const header_markup = (
    <div className='flex flex-row items-center justify-between'>
        <div>
        <Text preset='modalTitle' as='h2'>
            {t('title')}
        </Text>
        </div>
        <div className='flex flex-row gap-2'>
            <Button color='primary'>
                {t('actions.viewScript')}
            </Button>
            <Button color='secondary' >    
                {t('actions.viewRecord')}
            </Button>
        </div>
    </div>
  )

  const header = {
    markup: header_markup,
  }

  // --------------------------------------------------
  // Statics
  // --------------------------------------------------

  const statics_allData = useMemo(
    () => [
      {
        title: 'Invited',
        value: '20',

        icon: <UserPlus />,
      },
      {
        title: 'Accepted',
        value: '5',
        icon: <UserCheck />,
      },
      {
        title: 'Drafted',
        value: '3',
        icon: <FileText />,
      },
      {
        title: 'Published',
        value: '10',
        icon: <Globe />,
      },
      {
        title: 'Paid',
        value: '6',
        icon: <CreditCard />,
      },
      {
        title: 'Budget',
        value: '250$',
        icon: <Wallet />,
      },
    ],
    []
  )

  const statics_markup = (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {statics_allData.map(item => (
        <Card
          key={item.title}
          className='flex flex-col items-start gap-2 p-4 hover:shadow-sm hover:transition-shadow hover:duration-300'
          isHoverable
          shadow='sm'
        >
          <CardBody className='group flex flex-col items-start gap-10'>
            <div className='flex flex-row items-center gap-4'>
              <div className='flex size-10 flex-row items-center justify-center rounded-md bg-background-level-2 p-3 shadow-sm hover:transition-colors hover:duration-300 group-hover:bg-primary-500 group-hover:text-black'>
                {item.icon}
              </div>
              <Text
                variant='bodySm'
                degree='100'
                className='text-foreground-level-1'
              >
                {item.title}
              </Text>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <Text variant='heading2xl' degree='100'>
                {item.value}
              </Text>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )

  const statics = {
    allData: statics_allData,
    markup: statics_markup,
  }

  // --------------------------------------------------
  // Influencers
  // --------------------------------------------------

  const influencers_allData = useMemo(
    () => [
      {
        image:
          'https://hypeo-prod.vercel.app/_next/image?url=https%3A%2F%2Ffavikon-medias.s3.eu-west-3.amazonaws.com%2Fin%2F177962118.jpg&w=128&q=75',
        name: 'Doujablk',
        tag: 'Content Delivery',
      },
      {
        image:
          'https://hypeo-prod.vercel.app/_next/image?url=https%3A%2F%2Ffavikon-medias.s3.eu-west-3.amazonaws.com%2Fin%2F5385827988.jpg&w=128&q=75',
        name: 'SR Signature By SAHAR & RAJA',
        tag: 'Waiting for Content',
      },
      {
        image:
          'https://hypeo-prod.vercel.app/_next/image?url=https%3A%2F%2Ffavikon-medias.s3.eu-west-3.amazonaws.com%2Fin%2F4234044224.jpg&w=128&q=75',
        name: 'Imad Elmohamadi',
        tag: 'Content Delivery',
      },
      {
        image:
          'https://hypeo-prod.vercel.app/_next/image?url=https%3A%2F%2Ffavikon-medias.s3.eu-west-3.amazonaws.com%2Fin%2F584266241.jpg&w=64&q=75',
        name: 'El Mehdi Foullane',
        tag: 'Waiting for Content',
      },
    ],
    []
  )

  const influencers_markup = (
    <div className='flex flex-col gap-4'>
      {influencers_allData.map(item => (
        <div key={item.name} className='flex flex-row items-center gap-2'>
          <Avatar src={item.image} alt={item.name} size='sm' />
          <div className='flex-1'>
            <Text
              variant='bodySm'
              degree='100'
              className='text-foreground-level-1'
            >
              {item.name}
            </Text>
          </div>
          <Chip
            color={item.tag === 'Content Delivery' ? 'success' : 'warning'}
            variant='flat'
            size='sm'
            className='text-xs font-semibold uppercase text-foreground-level-1'
          >
            {item.tag}
          </Chip>
        </div>
      ))}
    </div>
  )

  const influencers = {
    allData: influencers_allData,
    markup: influencers_markup,
  }

  return (
    <div className='mb-20 flex flex-col gap-4'>
      {header.markup}
      {statics.markup}
      <div className='grid grid-cols-2 gap-4'>
        <Card className='p-4'>
          <CardHeader>
            <Text preset='modalTitle'>{t('influencers.title')}</Text>
          </CardHeader>
          <CardBody>{influencers.markup}</CardBody>
        </Card>
        <Card>
          <CardBody></CardBody>
        </Card>
      </div>
    </div>
  )
}
