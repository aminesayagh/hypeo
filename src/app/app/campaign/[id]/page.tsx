'use client'

import { Text } from '@/components/typo'
import { Breadcrumbs, BreadcrumbItem } from '@/components/breadcrumbs'
import { Link, Tab } from '@heroui/react'
import { Tabs } from '@/components/tabs'
import Overview from './_components/Overview'
import Negociation from './_components/Negociation'
import Reports from './_components/Reports'
import Payment from './_components/Payment'
import Contracts from './_components/Contracts'
import Workflow from './_components/Workflow'
import Content from './_components/Content'
import { useTranslations } from 'next-intl'

export default function CampaignPage() {
  const t = useTranslations('pages.campaign')
  // --------------------------------------------------
  // Header
  // --------------------------------------------------
  const header_breadcrumbsMarkup = (
    <Breadcrumbs variant='solid'>
      <BreadcrumbItem>
        <Link href='/app/dashboard'>
          <Text variant='bodyXs' degree='200' as='p'>
            {t('breadcrumbs.dashboard')}
          </Text>
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href='/app/campaign'>
          <Text variant='bodyXs' degree='200' as='p'>
            {t('breadcrumbs.campaign')}
          </Text>
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text variant='bodyXs' degree='200' className='font-semibold' as='p'>
          {t('title')}
        </Text>
      </BreadcrumbItem>
    </Breadcrumbs>
  )

  const header_markup = (
    <div className='flex flex-col items-start justify-between gap-4'>
      <div className='flex flex-col gap-2'>
        {header_breadcrumbsMarkup}
        <Text as='h1' preset='modalTitle'>
          {t('title')}
        </Text>
      </div>
    </div>
  )

  // --------------------------------------------------
  // View Content
  // --------------------------------------------------
  const viewContent_OverviewMarkup = <Overview />

  const viewContent_NegociationMarkup = <Negociation />

  const viewContent_ContractsMarkup = <Contracts />

  const viewContent_WorkflowMarkup = <Workflow />

  const viewContent_ContentMarkup = <Content />

  const viewContent_PaymentMarkup = <Payment />

  const viewContent_ReportsMarkup = <Reports />

  const viewContent = {
    overview: viewContent_OverviewMarkup,
    negociation: viewContent_NegociationMarkup,
    contracts: viewContent_ContractsMarkup,
    workflow: viewContent_WorkflowMarkup,
    content: viewContent_ContentMarkup,
    payment: viewContent_PaymentMarkup,
    reports: viewContent_ReportsMarkup,
  }

  // --------------------------------------------------
  // Tab Navigation
  // --------------------------------------------------
  const tabNavigation_items = [
    {
      id: 'overview',
      label: 'Overview',
      content: viewContent.overview,
    },
    {
      id: 'media',
      label: 'Negociation',
      content: viewContent.negociation,
    },
    {
      id: 'analytics',
      label: 'Contracts',
      content: viewContent.contracts,
    },

    {
      id: 'workflow',
      label: 'Workflow',
      content: viewContent.workflow,
    },
    {
      id: 'content',
      label: 'Content',
      content: viewContent.content,
    },
    {
      id: 'payment',
      label: 'Payment',
      content: viewContent.payment,
    },
    {
      id: 'reports',
      label: 'Reports',
      content: viewContent.reports,
    },
  ]

  const tabNavigation_markup = (
    <div className='flex w-full flex-col'>
      <Tabs
        variant='bordered'
        color='primary'
        size='sm'
        className='flex w-full flex-col'
        aria-label='Campaign Navigation'
        items={tabNavigation_items.map(item => ({
          key: item.id,
          title: item.label,
          content: item.content,
          className: 'font-semibold',
        }))}
      >
        {item => (
          <Tab
            key={item.key}
            title={item.title}
            className='w-full font-semibold'
          >
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  )

  const tabNavigation = {
    markup: tabNavigation_markup,
  }

  return (
    <section className='flex flex-col gap-4 py-6 pl-6 pr-8'>
      {header_markup}

      <div className='flex flex-row gap-2'>{tabNavigation.markup}</div>
    </section>
  )
}
