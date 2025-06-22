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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { parseDate } from '@internationalized/date'
import { Tooltip } from '@/components/tooltip'
import { Pagination } from '@heroui/react'
import { useMemo, useState } from 'react'
import { useViewMode } from '@/services/foundations/view-modes/useViewMode'
import { Box } from '@/components/box'
import type { Selection, SortDescriptor } from '@heroui/react'
import { ChevronDownIcon, PlusIcon, SearchIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/input'

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : ''
}

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
    { name: 'BRAND', uid: 'brand', sortable: true },
    { name: 'DATE', uid: 'date', sortable: true },
    { name: 'STATUS', uid: 'status', sortable: true },
    { name: 'ACTIONS', uid: 'actions', sortable: false },
  ]

  const campaignsList_data = [
    {
      id: 1,
      key: '1',
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

  const statusOptions = ['active', 'upcoming', 'completed']

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const [pagination_page, pagination_setPage] = useState(1)
  const [pagination_rowsPerPage, pagination_setRowsPerPage] = useState(5)

  const pagination_handleRowsPerPage = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    pagination_setRowsPerPage(parseInt(e.target.value))
    pagination_setPage(1)
  }

  const pagination_markup = (
    <Pagination
      isCompact
      showControls
      showShadow
      color='primary'
      page={pagination_page}
      total={Math.ceil(campaignsList_data.length / pagination_rowsPerPage)}
      onChange={pagination_setPage}
    />
  )

  const pagination = {
    page: pagination_page,
    setPage: pagination_setPage,
    rowsPerPage: pagination_rowsPerPage,
    setRowsPerPage: pagination_setRowsPerPage,
  }

  // --------------------------------------------------
  // Search
  // --------------------------------------------------
  const [search_value, search_setValue] = useState('')
  const search_hasSearchFilter = Boolean(search_value)

  const search_handleClear = () => {
    search_setValue('')
    pagination.setPage(1)
  }

  const search_handleValueChange = (value?: string) => {
    if (value) {
      search_setValue(value)
      pagination.setPage(1)
    } else {
      search_setValue('')
    }
  }

  const search_markup = (
    <Input
      isClearable
      className='w-full sm:max-w-[44%]'
      placeholder='Search by name...'
      startContent={<SearchIcon />}
      value={search_value}
      onClear={() => search_handleClear()}
      onValueChange={search_handleValueChange}
    />
  )

  // --------------------------------------------------
  // Data
  // -------------------------------------------------

  const [data_sortDescriptor, data_setSortDescriptor] =
    useState<SortDescriptor>({
      column: 'name',
      direction: 'ascending',
    })

  const [data_selectedKeys, data_setSelectedKeys] = useState<Selection>(
    new Set([])
  )
  const INITIAL_VISIBLE_COLUMNS = ['brand', 'date', 'status', 'actions']
  const [data_visibleColumns, data_setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [data_statusFilter, data_setStatusFilter] = useState<Selection>(
    'all'
  )

  const data_headerColumns = useMemo(() => {
    if (data_visibleColumns === 'all') return campaignsList_columns
    return campaignsList_columns.filter(column =>
      Array.from(data_visibleColumns).includes(column.uid)
    )
  }, [data_visibleColumns])

  const data_filtered = useMemo(() => {
    let filteredData = [...campaignsList_data]

    if (search_hasSearchFilter) {
      filteredData = filteredData.filter(item =>
        item.name.toLowerCase().includes(search_value.toLowerCase())
      )
    }
    if (
      data_statusFilter !== 'all' &&
      Array.from(data_statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter(item =>
        Array.from(data_statusFilter).includes(item.status)
      )
    }

    return filteredData
  }, [search_hasSearchFilter, search_value, data_statusFilter])

  const data_pagesCount = useMemo(() => {
    return Math.ceil(data_filtered.length / pagination.rowsPerPage)
  }, [data_filtered, pagination.rowsPerPage])

  const data_paginated = useMemo(() => {
    const start = (pagination.page - 1) * pagination.rowsPerPage
    const end = start + pagination.rowsPerPage
    return data_filtered.slice(start, end)
  }, [data_filtered, pagination.page, pagination.rowsPerPage])

  const data_sorted = useMemo(() => {
    return [...data_paginated].sort((a, b) => {
      const first = a[data_sortDescriptor.column as keyof typeof a]
      const second = b[data_sortDescriptor.column as keyof typeof b]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return data_sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [data_paginated, data_sortDescriptor])

  const data = {
    sortDescriptor: data_sortDescriptor,
    setSortDescriptor: data_setSortDescriptor,
    result: data_sorted,
    visibleColumns: data_visibleColumns,
    statusFilter: data_statusFilter,
    selectedKeys: data_selectedKeys,
    setSelectedKeys: data_setSelectedKeys,
    setVisibleColumns: data_setVisibleColumns,
    setStatusFilter: data_setStatusFilter,
  }

  // --------------------------------------------------
  // Campaigns List
  // --------------------------------------------------
  const campaignsList_totalMarkup = (
    <Text variant='bodySm' degree='100'>
      Total {campaignsList_data.length} campaigns
    </Text>
  )

  const campaignsList_rowPerPageMarkup = (
    <label className='flex items-center text-small text-default-400'>
      Rows per page:
      <select
        className='bg-transparent text-small text-default-400 outline-none'
        onChange={pagination_handleRowsPerPage}
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
      </select>
    </label>
  )

  const campaignsList_topListMarkup = (
    <div className='flex flex-col gap-4'>
      <div className='flex items-end justify-between gap-3'>
        {search_markup}
        <div className='flex gap-3'>
          <Dropdown>
            <DropdownTrigger>
              <Button variant='flat' endContent={<ChevronDownIcon />}>
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label='Table Filter'
              closeOnSelect={false}
              selectionMode='multiple'
              selectedKeys={data.statusFilter}
              onSelectionChange={data.setStatusFilter}
            >
              {statusOptions.map(option => (
                <DropdownItem key={option}>{capitalize(option)}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button endContent={<ChevronDownIcon />} variant='flat'>
                Columns
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              disallowEmptySelection
              aria-label='Table Columns'
              closeOnSelect={false}
              selectedKeys={data.visibleColumns}
              selectionMode='multiple'
              onSelectionChange={data.setVisibleColumns}
            >
              {campaignsList_columns.map(column => (
                <DropdownItem key={column.uid}>
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            variant='solid'
            size='md'
            endContent={<PlusIcon />}
            color='primary'
          >
            Add Campaign
          </Button>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        {campaignsList_totalMarkup}
        {campaignsList_rowPerPageMarkup}
      </div>
    </div>
  )

  const campaignsList_footerMarkup = (
    <div className='flex w-full flex-row items-center justify-between'>
      <div className='flex-1'>
        <Text variant='bodySm' degree='100' className='text-foreground-level-1'>
          {data_selectedKeys === 'all'
            ? 'All items selected'
            : `${data_selectedKeys.size} of ${data_filtered.length} selected`}
        </Text>
      </div>
      {pagination_markup}
      <div className='flex-1'></div>
    </div>
  )

  const campaignsList_renderCell = (
    item: (typeof campaignsList_data)[0],
    columnKey: string
  ) => {
    switch (columnKey) {
      case 'brand':
        return (
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
        )
      case 'date':
        return (
          <div className='flex flex-col items-start gap-1'>
            <Text variant='bodySm' degree='100'>
              {item.startDate}
            </Text>
          </div>
        )
      case 'status':
        return (
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
        )
      case 'actions':
        return (
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
            <Tooltip color='danger' content='Delete user' placement='bottom'>
              <span className='cursor-pointer text-lg text-danger active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return null
    }
  }

  const campaignsList_markup = (
    <Table
      isHeaderSticky
      aria-label='Campaigns List Table'
      selectionMode='multiple'
      color='primary'
      bottomContent={campaignsList_footerMarkup}
      bottomContentPlacement='outside'
      topContent={campaignsList_topListMarkup}
      topContentPlacement='outside'
      sortDescriptor={data.sortDescriptor}
      onSortChange={data.setSortDescriptor}
      selectedKeys={data.selectedKeys}
      onSelectionChange={data.setSelectedKeys}
      classNames={{
        base: 'bg-transparent p-1',
      }}
    >
      <TableHeader columns={data_headerColumns}>
        {column => (
          <TableColumn
            key={column.uid}
            align='start'
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent='No campaigns found' items={data.result}>
        {item => (
          <TableRow key={item.name}>
            {(columnKey: string | number) => (
              <TableCell key={columnKey}>
                {campaignsList_renderCell(item, columnKey as string)}
              </TableCell>
            )}
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
      <CardBody className='flex flex-col gap-2'>
        {campaignsList_markup}
      </CardBody>
    </Card>
  )
  return (
    <div className='flex flex-col gap-4 py-6 pl-6 pr-8'>
      {header_markup}
      {statics.markup}
      {campaigns_markup}
      <div className='h-24'></div>
    </div>
  )
}
