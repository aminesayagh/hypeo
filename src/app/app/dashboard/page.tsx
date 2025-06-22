'use client'

import { useTranslations } from 'next-intl'
import { Text } from '@/components/text'
import { Button } from '@/components/button'
import { Card, CardBody, CardHeader } from '@/components/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
} from '@/components/table'
import { Avatar } from '@/components/avatar'
import { Chip } from '@/components/chip'
import {
  ChartBarIcon,
  Users,
  UserX,
  UserPen,
  Handshake,
  DollarSign,
  Target,
  UserSearch,
  Clock,
  CalendarClock,
  Upload,
  Eye,
  CreditCard,
  Award,
  DeleteIcon,
  EyeIcon,
  EditIcon,
} from '@/components/icon'
import {
  parseDate,
} from '@internationalized/date'
import { Tooltip } from '@/components/tooltip'
import { Pagination } from '@heroui/react'
import { useMemo, useState } from 'react'
import { useViewMode } from '@/services/foundations/view-modes/useViewMode'
import { Box } from '@/components/box'

export default function DashboardPage() {
  // --------------------------------------------------
  // Internationalization
  // --------------------------------------------------

  const t = useTranslations('pages.dashboard')

  // --------------------------------------------------
  // View Mode
  // --------------------------------------------------

  const viewMode = useViewMode()

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
      <div className='flex flex-row gap-2'>
        <Button
          variant='solid'
          size='md'
          className='font-semibold'
          color='primary'
        >
          {t('actions.export')}
        </Button>
      </div>
    </div>
  )

  // --------------------------------------------------
  // Statics
  // --------------------------------------------------
  
  const statics_allData = [
    {
      type: 'business',
      title: t('statics.titles.numberOfCampaigns'),
      value: '12',
      icon: <ChartBarIcon />,
    },
    {
      type: 'business',
      title: t('statics.titles.activeAccounts'),
      value: '5',
      icon: <Users />,
    },
    {
      type: 'business',
      title: t('statics.titles.onHoldAccounts'),
      value: '2',
      icon: <UserX />,
    },
    {
      type: 'business',
      title: t('statics.titles.inDraftAccounts'),
      value: '6',
      icon: <UserPen />,
    },
    {
      type: 'creator',
      title: t('statics.titles.totalCollaborations'),
      value: '12',
      icon: <Handshake />,
    },
    {
      type: 'creator',
      title: t('statics.titles.revenueGenerated'),
      value: '500$',
      icon: <DollarSign />,
    },
    {
      type: 'creator',
      title: t('statics.titles.pendingOpportunities'),
      value: '2',
      icon: <Target />,
    },
    {
      type: 'creator',
      title: t('statics.titles.pendingMatchings'),
      value: '6',
      icon: <UserSearch />,
    },
    {
      type: 'creator',
      title: t('statics.titles.submissionDeadline'),
      value: '3Days',
      icon: <Clock />,
    },
    {
      type: 'creator',
      title: t('statics.titles.publicationDeadline'),
      value: 'May 4, 2025',
      icon: <CalendarClock />,
    },
    {
      type: 'creator',
      title: t('statics.titles.contentToSubmit'),
      value: '4',
      icon: <Upload />,
    },
    {
      type: 'creator',
      title: t('statics.titles.contentToPublish'),
      value: '8',
      icon: <Eye />,
    },
    {
      type: 'creator',
      title: t('statics.titles.pendingPayments'),
      value: '9',
      icon: <CreditCard />,
    },
    {
      type: 'creator',
      title: t('statics.titles.hypeoScore'),
      value: '90',
      icon: <Award />,
    },
  ]

  const statics_filtered = useMemo(() => {
    return statics_allData.filter(item => item.type === viewMode.current)
  }, [viewMode.current])

  const statics_business = useMemo(() => {
    return statics_allData.filter(item => item.type === 'business')
  }, [])

  const statics_creator = useMemo(() => {
    return statics_allData.filter(item => item.type === 'creator')
  }, [])

  const statics_renderCards = (items: typeof statics_allData) => (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {items.map(item => (
        <Card
          key={item.title}
          className='flex flex-col items-start gap-2 p-4 hover:transition-shadow hover:duration-300 hover:shadow-sm'
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

  const statics_markup = (
    <div className='relative'>
      <Box active={viewMode.isBusiness}>
        {statics_renderCards(statics_business)}
      </Box>
      <Box active={viewMode.isCreator}>
        {statics_renderCards(statics_creator)}
      </Box>
    </div>
  )

  const statics = {
    allData: statics_allData,
    filtered: statics_filtered,
    business: statics_business,
    creator: statics_creator,
    renderCards: statics_renderCards,
    markup: statics_markup,
  }

  // --------------------------------------------------
  // Campaigns List
  // --------------------------------------------------

  const campaignsList_columns = [
    { name: 'BRAND', uid: 'brand' },
    { name: 'DATE', uid: 'date' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ]

  const campaignsList_data = [
    {
      id: 1,
      key: "1",
      brand: {
        name: 'Hyundai',
        logo: 'https://hypeo-prod.vercel.app/fake/hyundai.png',
      },
      name: 'Lancement du Nouveau Tucson 2025',
      startDate: '2025-03-10',
      endDate: '2025-05-01',
      status: 'upcoming',
      category: 'automotive',
      budget: 50000,
      description: 'Campagne de lancement pour le nouveau modèle Tucson 2025',
    },
    {
      id: 2,
      key: '2',
      brand: {
        name: 'Garnier',
        logo: 'https://hypeo-prod.vercel.app/fake/garnier.png',
      },
      name: 'Beauté Naturelle - Gamme Éclat 2025',
      startDate: '2025-02-01',
      endDate: '2025-03-15',
      status: 'active',
      category: 'beauty',
      budget: 35000,
      description:
        'Promotion de la nouvelle gamme de produits beauté naturelle',
    },
    {
      id: 3,
      key: '3',
      brand: {
        name: 'Signal',
        logo: 'https://hypeo-prod.vercel.app/fake/signal.png',
      },
      name: 'Sourire Parfait - Challenge Santé Dentaire',
      startDate: '2025-04-05',
      endDate: '2025-05-30',
      status: 'upcoming',
      category: 'health',
      budget: 25000,
      description:
        "Challenge sur les réseaux sociaux pour promouvoir l'hygiène dentaire",
    },
    {
      id: 4,
      key: '4',
      brand: {
        name: 'Pampers',
        logo: 'https://hypeo-prod.vercel.app/fake/pampers.png',
      },
      name: 'Douceur et Protection pour Bébé',
      startDate: '2025-01-15',
      endDate: '2025-02-28',
      status: 'completed',
      category: 'baby_care',
      budget: 40000,
      description: 'Campagne de sensibilisation aux soins pour bébés',
    },
    {
      id: 5,
      key: '5',
      brand: {
        name: 'Coca Cola',
        logo: 'https://hypeo-prod.vercel.app/fake/coca-cola.png',
      },
      name: 'Moments de Partage Ramadan 2025',
      startDate: '2025-02-10',
      endDate: '2025-04-01',
      status: 'active',
      category: 'beverages',
      budget: 75000,
      description:
        'Campagne spéciale Ramadan axée sur le partage et la convivialité',
    },
    {
      id: 6,
      key: '6',
      brand: {
        name: 'Yassir',
        logo: 'https://hypeo-prod.vercel.app/fake/yassir.jpg',
      },
      name: "Campagne d'App Install - 2025",
      startDate: '2025-01-20',
      endDate: '2025-03-05',
      status: 'active',
      category: 'technology',
      budget: 60000,
      description:
        "Campagne d'acquisition d'utilisateurs pour l'application mobile",
    },
    {
      id: 7,
      key: '7',
      brand: {
        name: 'Hôtel Ibis Nouacer',
        logo: 'https://hypeo-prod.vercel.app/fake/ibis.png',
      },
      name: 'Séjour Business & Loisirs 2025',
      startDate: '2025-03-01',
      endDate: '2025-04-20',
      status: 'upcoming',
      category: 'hospitality',
      budget: 30000,
      description: "Promotion des offres business et loisirs de l'hôtel",
    },
    {
      id: 8,
      key: '8',
      brand: {
        name: 'Pickers',
        logo: 'https://hypeo-prod.vercel.app/fake/pickers.png',
      },
      name: 'Goûtez la Street Food Authentique',
      startDate: '2024-12-10',
      endDate: '2025-01-30',
      status: 'completed',
      category: 'food',
      budget: 20000,
      description: 'Campagne de promotion de la street food authentique',
    },
    {
      id: 9,
      key: '9',
      brand: {
        name: 'Trident',
        logo: 'https://hypeo-prod.vercel.app/fake/trident.png',
      },
      name: 'Fraîcheur Infinie - Défi 30 Jours',
      startDate: '2025-02-25',
      endDate: '2025-04-10',
      status: 'upcoming',
      category: 'oral_care',
      budget: 18000,
      description:
        'Défi de 30 jours pour promouvoir la fraîcheur bucco-dentaire',
    },
    {
      id: 10,
      key: '10',
      brand: {
        name: 'Sidi Ali',
        logo: 'https://hypeo-prod.vercel.app/fake/sidiali.png',
      },
      name: 'Hydratation et Bien-être au Quotidien',
      startDate: '2025-01-05',
      endDate: '2025-02-15',
      status: 'completed',
      category: 'beverages',
      budget: 32000,
      description:
        "Campagne de sensibilisation à l'importance de l'hydratation",
    },
  ]

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const [pagination_page, pagination_setPage] = useState(1)
  const pagination_config = {
    rowsPerPage: 5,
  }

  const items = useMemo(() => {
    const start = (pagination_page - 1) * pagination_config.rowsPerPage
    const end = start + pagination_config.rowsPerPage
    return campaignsList_data.slice(start, end)
  }, [pagination_page, pagination_config.rowsPerPage])

  const pagination_markup = (
    <div className='flex w-full justify-center'>
      <Pagination
        isCompact
        showControls
        showShadow
        color='primary'
        page={pagination_page}
        total={Math.ceil(campaignsList_data.length / pagination_config.rowsPerPage)}
        onChange={pagination_setPage}
      />
    </div>
  )

  const campaignsList_markup = (
    <Table
      isHeaderSticky
      selectionMode='multiple'
      aria-label='Campaigns List Table'
      color='primary'
      bottomContent={pagination_markup}
      classNames={{
        base: 'bg-background-level-3',
      }}
    >
      <TableHeader columns={campaignsList_columns}>
        {column => (
          <TableColumn key={column.uid} align='start'>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {item => (
          <TableRow key={item.name}>
            <TableCell>
              <div className='group flex flex-row items-center gap-4'>
                <Avatar
                  src={item.brand.logo}
                  alt={item.brand.name}
                  size='lg'
                  radius='sm'
                />
                <div className='flex flex-col items-start gap-1'>
                  <Text variant='bodySm' degree='100'>
                    {item.brand.name}
                  </Text>
                  <Text variant='bodyXs' degree='200'>
                    {item.name}
                  </Text>
                </div>
              </div>
            </TableCell>
            <TableCell>
              {parseDate(item.startDate).toLocaleString()} -{' '}
              {parseDate(item.endDate).toLocaleString()}
            </TableCell>
            <TableCell>
              <Chip
                className='text-xs font-semibold uppercase'
                color={
                  item.status === 'active'
                    ? 'warning'
                    : item.status === 'upcoming'
                      ? 'danger'
                      : 'success'
                }
                variant='flat'
              >
                {item.status}
              </Chip>
            </TableCell>
            <TableCell>
              <div className='flex flex-row gap-4'>
                <Tooltip content='Details'>
                  <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                    <EyeIcon />
                  </span>
                </Tooltip>
                <Tooltip content='Edit user'>
                  <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip
                  color='danger'
                  content='Delete user'
                  placement='bottom'
                >
                  <span className='cursor-pointer text-lg text-danger active:opacity-50'>
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )

  // --------------------------------------------------
  // Campaigns
  // --------------------------------------------------

  const campaigns_markup = (
    <Card className='p-4'>
      <CardHeader>
        <Text variant='headingXl' degree='100'>
          {t('campaigns.title')}
        </Text>
      </CardHeader>
      <CardBody className='p-0'>{campaignsList_markup}</CardBody>
    </Card>
  )
  return (
    <div className='flex flex-col gap-4'>
      {header_markup}
      {statics.markup}
      {campaigns_markup}
      <div className='h-24'></div>
    </div>
  )
}
