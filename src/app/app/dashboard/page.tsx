'use client'

import { useTranslations } from 'next-intl'
import { Text } from '@/components/typo'
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
  ModalBody,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { Modal, ModalContent } from '@/components/modal'
import { Tooltip } from '@/components/tooltip'
import { Pagination } from '@/components/pagination'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useViewMode } from '@/services/foundations/view-modes/useViewMode'
import { Box } from '@/components/box'
import type { Selection, SortDescriptor } from '@heroui/react'
import {
  ChevronDownIcon,
  EllipsisVertical,
  GridIcon,
  ListIcon,
  SearchIcon,
} from 'lucide-react'
import { Input } from '@/components/input'
import {
  Form,
  Input as FormInput,
  Select as FormSelect,
  DateRangePicker as FormDateRangePicker,
  SelectItem as FormSelectItem,
  Textarea as FormTextarea,
  Button as FormButton,
} from '@/components/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseDate } from '@internationalized/date'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  // --------------------------------------------------
  // Internationalization
  // --------------------------------------------------
  const t = useTranslations('pages.dashboard')
  const router = useRouter()

  // --------------------------------------------------
  // View Mode
  // --------------------------------------------------
  const viewMode = useViewMode()

  // --------------------------------------------------
  // Hydration Mounted
  // --------------------------------------------------
  const [hydration_isMounted, hydration_setIsMounted] = useState(false)

  useEffect(() => {
    hydration_setIsMounted(true)
  }, [])

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

  const statics_allData = useMemo(
    () => [
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
    ],
    [t]
  )

  const statics_filtered = useMemo(() => {
    return statics_allData.filter(item => item.type === viewMode.current)
  }, [statics_allData, viewMode.current])

  const statics_business = useMemo(() => {
    return statics_allData.filter(item => item.type === 'business')
  }, [statics_allData])

  const statics_creator = useMemo(() => {
    return statics_allData.filter(item => item.type === 'creator')
  }, [statics_allData])

  const statics_renderCards = (items: typeof statics_allData) => (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {items.map(item => (
        <Card
          key={item.title}
          className='flex flex-col items-start gap-2 p-2 hover:shadow-sm hover:transition-shadow hover:duration-300 sm:p-4'
          isHoverable
          shadow='sm'
        >
          <CardBody className='group flex flex-col items-start gap-6 sm:gap-10'>
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
  // Campaigns View Mode
  // --------------------------------------------------
  const [campaignsViewMode_current, campaignsViewMode_setCurrent] = useState<
    'table' | 'grid'
  >('table')

  const campaignsViewMode_handleTableSelect = useCallback(() => {
    campaignsViewMode_setCurrent('table')
  }, [])

  const campaignsViewMode_handleGridSelect = useCallback(() => {
    campaignsViewMode_setCurrent('grid')
  }, [])

  const campaignsViewMode = {
    current: campaignsViewMode_current,
    setCurrent: campaignsViewMode_setCurrent,
    isTable: campaignsViewMode_current === 'table',
    isGrid: campaignsViewMode_current === 'grid',
    handleTableSelect: campaignsViewMode_handleTableSelect,
    handleGridSelect: campaignsViewMode_handleGridSelect,
  }

  

  // --------------------------------------------------
  // Add Campaign Form
  // --------------------------------------------------
  const addCampaignForm_schema = z.object({
    brandName: z.string().min(1),
    brandLogo: z.string().min(1).url(),
    campaignName: z.string().min(1),
    dateRange: z.object({
      start: z.string(),
      end: z.string(),
    }),
    status: z.enum(['active', 'upcoming', 'completed']),
    description: z.string().min(1),
  })

  const addCampaignForm_methods = useForm({
    defaultValues: {
      brandName: '',
      brandLogo: '',
      campaignName: '',
      dateRange: {
        start: parseDate('2025-03-10').toString(),
        end: parseDate('2025-05-01').toString(),
      },
      status: 'upcoming' as 'active' | 'upcoming' | 'completed',
      description: '',
    },
    resolver: zodResolver(addCampaignForm_schema),
  })

  const addCampaignForm_onSubmit = (
    data: z.infer<typeof addCampaignForm_schema>
  ) => {
    console.log('data', data)
    addCampaignForm_methods.reset()
  }

  const addCampaignForm_markup = (onClose: () => void) => (
    <Form
      methods={addCampaignForm_methods}
      onSubmit={addCampaignForm_methods.handleSubmit(addCampaignForm_onSubmit)}
      className='flex flex-col gap-2'
    >
      <FormInput
        aria-label='Brand Name'
        name='brandName'
        label='Brand Name'
        isRequired
        size='sm'
        autoFocus
      />
      <FormInput
        aria-label='Brand Logo'
        name='brandLogo'
        label='Brand Logo'
        type='url'
        isRequired
      />
      <FormInput
        aria-label='Campaign Name'
        name='campaignName'
        label='Campaign Name'
        isRequired
      />
      <FormDateRangePicker
        aria-label='Date Range'
        name='dateRange'
        label='Date Range'
        isRequired
      />
      <FormSelect aria-label='Status' name='status' label='Status' size='sm'>
        <FormSelectItem key='active' aria-label='Active'>
          <span className='absolute left-2 top-1/3 block size-2 rounded-full bg-blue-500' />
          <Text variant='bodySm' degree='100' className='pl-6'>
            {t('campaign_status.active')}
          </Text>
        </FormSelectItem>
        <FormSelectItem key='upcoming' aria-label='Upcoming'>
          <span className='absolute left-2 top-1/3 block size-2 rounded-full bg-warning-500' />
          <Text variant='bodySm' degree='100' className='pl-6'>
            {t('campaign_status.upcoming')}
          </Text>
        </FormSelectItem>
        <FormSelectItem key='completed' aria-label='Completed'>
          <span className='absolute left-2 top-1/3 block size-2 rounded-full bg-success-500' />
          <Text variant='bodySm' degree='100' className='pl-6'>
            {t('campaign_status.completed')}
          </Text>
        </FormSelectItem>
      </FormSelect>
      <FormTextarea
        aria-label='Description'
        name='description'
        label='Description'
        rows={4}
        placeholder='Enter description'
      />
      <div className='flex w-full flex-row justify-end gap-2 pb-6 pt-2'>
        <Button
          color='secondary'
          variant='bordered'
          onPress={() => {
            addCampaignForm_methods.reset()
            onClose()
          }}
        >
          {t('actions.cancel')}
        </Button>
        <FormButton
          color='primary'
          onPress={() => {
            // if the form is valid, submit the form
            if (addCampaignForm_methods.formState.isValid) {
              setTimeout(() => {
                onClose()
              }, 2000)
            } else {
              console.log('form is invalid')
            }
          }}
        >
          {t('actions.addCampaign')}
        </FormButton>
      </div>
    </Form>
  )

  const addCampaignForm = {
    markup: addCampaignForm_markup,
  }

  // --------------------------------------------------
  // Add Campaign Modal
  // --------------------------------------------------
  const {
    isOpen: addCampaign_isOpen,
    onOpen: addCampaign_onOpen,
    onOpenChange: addCampaign_onOpenChange,
  } = useDisclosure()

  const addCampaignModal_buttonMarkup = (
    <Button
      variant='solid'
      size='md'
      color='primary'
      aria-label='Add Campaign'
      onPress={addCampaign_onOpen}
    >
      {t('actions.addCampaign')}
    </Button>
  )

  const addCampaignModal_modalMarkup = (
    <Modal isOpen={addCampaign_isOpen} onOpenChange={addCampaign_onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1 pt-12'>
              <Text as='h4' preset='modalTitle'>
                {t('actions.addCampaign')}
              </Text>
            </ModalHeader>
            <ModalBody>{addCampaignForm.markup(onClose)}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )

  const addCampaignModal = {
    buttonMarkup: addCampaignModal_buttonMarkup,
    modalMarkup: addCampaignModal_modalMarkup,
  }

  // --------------------------------------------------
  // Delete Campaign Modal
  // --------------------------------------------------
  
  const {
    isOpen: deleteCampaign_isOpen,
    onOpen: deleteCampaign_onOpen,
    onOpenChange: deleteCampaign_onOpenChange,
  } = useDisclosure()

  // --------------------------------------------------
  // Delete Campaign State
  // --------------------------------------------------
  
  const [deleteCampaign_selectedCampaign, deleteCampaign_setSelectedCampaign] = useState<(typeof tableStructure.data)[0] | null>(null)

  const deleteCampaign_handleSelect = useCallback((campaign: (typeof tableStructure.data)[0]) => {
    deleteCampaign_setSelectedCampaign(campaign)
    deleteCampaign_onOpen()
  }, [deleteCampaign_onOpen])

  const deleteCampaign = {
    selectedCampaign: deleteCampaign_selectedCampaign,
    setSelectedCampaign: deleteCampaign_setSelectedCampaign,
    handleSelect: deleteCampaign_handleSelect,
  }

  // --------------------------------------------------
  // Delete Campaign Form
  // --------------------------------------------------
  
  const deleteCampaignForm_schema = z.object({
    confirmationText: z.string().refine((value) => value === 'DELETE', {
      message: 'You must type "DELETE" to confirm',
    }),
    reason: z.string().min(1, 'Please provide a reason for deletion'),
  })

  const deleteCampaignForm_methods = useForm({
    defaultValues: {
      confirmationText: '',
      reason: '',
    },
    resolver: zodResolver(deleteCampaignForm_schema),
  })

  const deleteCampaignForm_onSubmit = useCallback((data: z.infer<typeof deleteCampaignForm_schema>) => {
    console.log('Delete campaign data:', data)
    console.log('Campaign to delete:', deleteCampaign.selectedCampaign)
    
    // Here you would typically call an API to delete the campaign
    deleteCampaignForm_methods.reset()
    deleteCampaign.setSelectedCampaign(null)
  }, [deleteCampaign, deleteCampaignForm_methods])

  const deleteCampaignForm_markup = (onClose: () => void) => (
    <Form
      methods={deleteCampaignForm_methods}
      onSubmit={deleteCampaignForm_methods.handleSubmit(deleteCampaignForm_onSubmit)}
      className='flex flex-col gap-4'
    >
      {deleteCampaign.selectedCampaign && (
        <div className='rounded-lg bg-danger-50 border border-danger-200 p-4'>
          <div className='flex items-center gap-3 mb-3'>
            <Avatar
              src={deleteCampaign.selectedCampaign.brand.logo}
              alt={deleteCampaign.selectedCampaign.brand.name}
              size='sm'
              radius='sm'
            />
            <div>
              <Text variant='bodySm' degree='100' className='font-medium'>
                {deleteCampaign.selectedCampaign.brand.name}
              </Text>
              <Text variant='bodyXs' degree='200'>
                {deleteCampaign.selectedCampaign.name}
              </Text>
            </div>
          </div>
          <Text variant='bodyXs' degree='300' className='text-danger-700'>
            This action cannot be undone. This will permanently delete the campaign and all associated data.
          </Text>
        </div>
      )}

      <FormTextarea
        aria-label='Reason for deletion'
        name='reason'
        label='Reason for deletion'
        placeholder='Please explain why you are deleting this campaign...'
        rows={3}
        isRequired
      />

      <FormInput
        aria-label='Confirmation'
        name='confirmationText'
        label='Type "DELETE" to confirm'
        placeholder='DELETE'
        isRequired
      />

      <div className='flex w-full flex-row justify-end gap-2 pb-6 pt-2'>
        <Button
          color='secondary'
          variant='bordered'
          onPress={() => {
            deleteCampaignForm_methods.reset()
            deleteCampaign.setSelectedCampaign(null)
            onClose()
          }}
        >
          {t('actions.cancel')}
        </Button>
        <FormButton
          color='danger'
          onPress={() => {
            if (deleteCampaignForm_methods.formState.isValid) {
              setTimeout(() => {
                onClose()
              }, 1000)
            }
          }}
        >
          {t('actions.delete')}
        </FormButton>
      </div>
    </Form>
  )

  const deleteCampaignForm = {
    markup: deleteCampaignForm_markup,
  }

  const deleteCampaignModal_modalMarkup = (
    <Modal isOpen={deleteCampaign_isOpen} onOpenChange={deleteCampaign_onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1 pt-12'>
              <Text as='h4' preset='modalTitle' className='text-danger'>
                Delete Campaign
              </Text>
            </ModalHeader>
            <ModalBody>{deleteCampaignForm.markup(onClose)}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )

  const deleteCampaignModal = {
    modalMarkup: deleteCampaignModal_modalMarkup,
  }

  // --------------------------------------------------
  // table structure List
  // --------------------------------------------------

  const tableStructure_columns = [
    { name: 'BRAND', uid: 'brand', sortable: true },
    { name: 'DATE', uid: 'date', sortable: true },
    { name: 'STATUS', uid: 'status', sortable: true },
    { name: 'ACTIONS', uid: 'actions', sortable: false },
  ]

  const tableStructure_data = [
    {
      id: 'campaign-1',
      key: '1',
      brand: {
        name: 'Hyundai',
        logo: 'https://hypeo-prod.vercel.app/fake/hyundai.png',
      },
      name: 'Lancement du Nouveau Tucson 2025',
      startDate: parseDate('2025-03-10'),
      endDate: parseDate('2025-05-01'),
      status: 'upcoming',
      category: 'automotive',
      budget: 50000,
      description: 'Campagne de lancement pour le nouveau modèle Tucson 2025',
    },
    {
      id: 'campaign-2',
      key: '2',
      brand: {
        name: 'Garnier',
        logo: 'https://hypeo-prod.vercel.app/fake/garnier.png',
      },
      name: 'Beauté Naturelle - Gamme Éclat 2025',
      startDate: parseDate('2025-02-01'),
      endDate: parseDate('2025-03-15'),
      status: 'active',
      category: 'beauty',
      budget: 35000,
      description:
        'Promotion de la nouvelle gamme de produits beauté naturelle',
    },
    {
      id: 'campaign-3',
      key: '3',
      brand: {
        name: 'Signal',
        logo: 'https://hypeo-prod.vercel.app/fake/signal.png',
      },
      name: 'Sourire Parfait - Challenge Santé Dentaire',
      startDate: parseDate('2025-04-05'),
      endDate: parseDate('2025-05-30'),
      status: 'upcoming',
      category: 'health',
      budget: 25000,
      description:
        "Challenge sur les réseaux sociaux pour promouvoir l'hygiène dentaire",
    },
    {
      id: 'campaign-4',
      key: '4',
      brand: {
        name: 'Pampers',
        logo: 'https://hypeo-prod.vercel.app/fake/pampers.png',
      },
      name: 'Douceur et Protection pour Bébé',
      startDate: parseDate('2025-01-15'),
      endDate: parseDate('2025-02-28'),
      status: 'completed',
      category: 'baby_care',
      budget: 40000,
      description: 'Campagne de sensibilisation aux soins pour bébés',
    },
    {
      id: 'campaign-5',
      key: '5',
      brand: {
        name: 'Coca Cola',
        logo: 'https://hypeo-prod.vercel.app/fake/coca-cola.png',
      },
      name: 'Moments de Partage Ramadan 2025',
      startDate: parseDate('2025-02-10'),
      endDate: parseDate('2025-04-01'),
      status: 'active',
      category: 'beverages',
      budget: 75000,
      description:
        'Campagne spéciale Ramadan axée sur le partage et la convivialité',
    },
    {
      id: 'campaign-6',
      key: '6',
      brand: {
        name: 'Yassir',
        logo: 'https://hypeo-prod.vercel.app/fake/yassir.jpg',
      },
      name: "Campagne d'App Install - 2025",
      startDate: parseDate('2025-01-20'),
      endDate: parseDate('2025-03-05'),
      status: 'active',
      category: 'technology',
      budget: 60000,
      description:
        "Campagne d'acquisition d'utilisateurs pour l'application mobile",
    },
    {
      id: 'campaign-7',
      key: '7',
      brand: {
        name: 'Hôtel Ibis Nouacer',
        logo: 'https://hypeo-prod.vercel.app/fake/ibis.png',
      },
      name: 'Séjour Business & Loisirs 2025',
      startDate: parseDate('2025-03-01'),
      endDate: parseDate('2025-04-20'),
      status: 'upcoming',
      category: 'hospitality',
      budget: 30000,
      description: "Promotion des offres business et loisirs de l'hôtel",
    },
    {
      id: 'campaign-8',
      key: '8',
      brand: {
        name: 'Pickers',
        logo: 'https://hypeo-prod.vercel.app/fake/pickers.png',
      },
      name: 'Goûtez la Street Food Authentique',
      startDate: parseDate('2024-12-10'),
      endDate: parseDate('2025-01-30'),
      status: 'completed',
      category: 'food',
      budget: 20000,
      description: 'Campagne de promotion de la street food authentique',
    },
    {
      id: 'campaign-9',
      key: '9',
      brand: {
        name: 'Trident',
        logo: 'https://hypeo-prod.vercel.app/fake/trident.png',
      },
      name: 'Fraîcheur Infinie - Défi 30 Jours',
      startDate: parseDate('2025-02-25'),
      endDate: parseDate('2025-04-10'),
      status: 'upcoming',
      category: 'oral_care',
      budget: 18000,
      description:
        'Défi de 30 jours pour promouvoir la fraîcheur bucco-dentaire',
    },
    {
      id: 'campaign-10',
      key: '10',
      brand: {
        name: 'Sidi Ali',
        logo: 'https://hypeo-prod.vercel.app/fake/sidiali.png',
      },
      name: 'Hydratation et Bien-être au Quotidien',
      startDate: parseDate('2025-01-05'),
      endDate: parseDate('2025-02-15'),
      status: 'completed',
      category: 'beverages',
      budget: 32000,
      description:
        "Campagne de sensibilisation à l'importance de l'hydratation",
    },
  ]

  const tableStructure_statusOptions = ['active', 'upcoming', 'completed']

  const tableStructure = {
    columns: tableStructure_columns,
    data: tableStructure_data,
    statusOptions: tableStructure_statusOptions,
  }

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
      total={Math.ceil(tableStructure_data.length / pagination_rowsPerPage)}
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
      aria-label='Search'
      className='w-full sm:max-w-[35%]'
      placeholder='Search by name...'
      startContent={<SearchIcon />}
      value={search_value}
      onClear={() => search_handleClear()}
      onValueChange={search_handleValueChange}
    />
  )

  const search = {
    value: search_value,
    hasSearchFilter: search_hasSearchFilter,
    setValue: search_setValue,
    handleClear: search_handleClear,
    handleValueChange: search_handleValueChange,
    markup: search_markup,
  }

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
  const [data_statusFilter, data_setStatusFilter] = useState<Selection>('all')

  const data_headerColumns = useMemo(() => {
    if (data_visibleColumns === 'all') return tableStructure.columns

    return tableStructure.columns.filter(column =>
      Array.from(data_visibleColumns).includes(column.uid)
    )
  }, [data_visibleColumns, tableStructure.columns])

  const data_filtered = useMemo(() => {
    let filteredData = [...tableStructure.data]

    // search filter
    if (search.hasSearchFilter) {
      console.log('search filter', filteredData, search.value)
      filteredData = filteredData.filter(
        item =>
          item.name.toLowerCase().includes(search.value.toLowerCase()) ||
          item.brand.name.toLowerCase().includes(search.value.toLowerCase()) ||
          item.description.toLowerCase().includes(search.value.toLowerCase()) ||
          item.category.toLowerCase().includes(search.value.toLowerCase())
      )
    }

    // status filter
    if (
      data_statusFilter !== 'all' &&
      Array.from(data_statusFilter).length !==
        tableStructure.statusOptions.length
    ) {
      filteredData = filteredData.filter(item =>
        Array.from(data_statusFilter).includes(item.status)
      )
    }

    return filteredData
  }, [
    search.hasSearchFilter,
    search.value,
    data_statusFilter,
    tableStructure.data,
    tableStructure.statusOptions,
  ])

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
      let column = []
      switch (data_sortDescriptor.column) {
        case 'brand':
          column = ['brand', 'name']
          break
        case 'date':
          column = ['startDate']
          break
        case 'status':
          column = ['status']
          break
        case 'actions':
          column = ['actions']
          break
        default:
          column = ['name']
          break
      }
      let first = a[column[0] as keyof typeof a]
      let second = b[column[0] as keyof typeof b]
      for (let i = 1; i < column.length; i++) {
        first = first[column[i] as keyof typeof first]
        second = second[column[i] as keyof typeof second]
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0

      return data_sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [data_paginated, data_sortDescriptor])

  const data = {
    filtered: data_filtered,
    pagesCount: data_pagesCount,
    paginated: data_paginated,
    sorted: data_sorted,
    sortDescriptor: data_sortDescriptor,
    result: data_sorted,
    visibleColumns: data_visibleColumns,
    statusFilter: data_statusFilter,
    selectedKeys: data_selectedKeys,
    // setters
    setSortDescriptor: data_setSortDescriptor,
    setSelectedKeys: data_setSelectedKeys,
    setVisibleColumns: data_setVisibleColumns,
    setStatusFilter: data_setStatusFilter,
  }

  // --------------------------------------------------
  // Campaigns List
  // --------------------------------------------------
  const campaignsList_totalMarkup = (
    <Text variant='bodySm' degree='100'>
      Total {tableStructure.data.length} campaigns
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
      <div className='flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end'>
        {search.markup}
        <div className='flex gap-2'>
          <Dropdown aria-label='Table Filter'>
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
              {tableStructure.statusOptions.map(option => (
                <DropdownItem key={option} className='capitalize'>
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown aria-label='Table Columns'>
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
              {tableStructure.columns.map(column => (
                <DropdownItem key={column.uid} className='capitalize'>
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {addCampaignModal.buttonMarkup}
          {addCampaignModal.modalMarkup}
          {deleteCampaignModal.modalMarkup}
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
          {data.selectedKeys === 'all'
            ? 'All items selected'
            : `${data.selectedKeys.size} of ${data.filtered.length} selected`}
        </Text>
      </div>
      {pagination_markup}
      <div className='hidden flex-1 md:block'></div>
    </div>
  )

  const campaignsList_renderCell = (
    item: (typeof tableStructure.data)[0],
    columnKey: string
  ) => {
    switch (columnKey) {
      case 'brand':
        return (
          <div className='group flex min-w-60 flex-row items-center gap-4'>
            <div className='min-w-fit'>
              <Avatar
                src={item.brand.logo}
                alt={item.brand.name}
                size='lg'
                radius='sm'
              />
            </div>
            <div className='flex flex-1 flex-col items-start gap-1'>
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
          <div className='flex min-w-28 flex-col items-start gap-1'>
            <Text variant='bodySm' degree='100'>
              {item.startDate.toString()}
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
            <Tooltip content='Details' aria-label='Details'>
              <Link
                href={`/app/campaign/${item.key}`}
                className='cursor-pointer text-lg text-default-400 active:opacity-50'
              >
                <EyeIcon />
              </Link>
            </Tooltip>
            <Tooltip content='Edit user' aria-label='Edit user'>
              <span
                aria-label='Edit user'
                title='Edit user'
                className='cursor-pointer text-lg text-default-400 active:opacity-50'
                onClick={() => {
                  addCampaign_onOpen()
                }}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip
              color='danger'
              content='Delete campaign'
              placement='bottom'
              aria-label='Delete campaign'
            >
              <span
                aria-label='Delete campaign'
                title='Delete campaign'
                className='cursor-pointer text-lg text-danger active:opacity-50'
                onClick={() => {
                  deleteCampaign.handleSelect(item)
                }}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return null
    }
  }

  const campaignsList_markup = hydration_isMounted ? (
    <Table
      isHeaderSticky
      aria-label='Campaigns List Table'
      selectionMode='multiple'
      color='primary'
      // Header Content
      topContent={campaignsList_topListMarkup}
      topContentPlacement='outside'
      // Footer Content
      bottomContent={campaignsList_footerMarkup}
      bottomContentPlacement='outside'
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
            aria-label={column.name}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={hydration_isMounted}
        emptyContent='No campaigns found'
        items={data.result}
        aria-label='Campaigns List Table Body'
      >
        {item => (
          <TableRow key={item.key}>
            {(columnKey: string | number) => (
              <TableCell key={columnKey}>
                {campaignsList_renderCell(item, columnKey as string)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  ) : (
    <Loading />
  )

  const campaignsList = {
    markup: campaignsList_markup,
  }

  // --------------------------------------------------
  // Campaigns Grid
  // --------------------------------------------------
  const campaignsGrid_renderCard = (item: (typeof tableStructure.data)[0]) => (
    <Card
      key={item.key}
      className='group flex flex-col gap-4 p-2 hover:shadow-md hover:transition-shadow hover:duration-300'
      isHoverable
      isPressable
      onPress={() => {
        router.push(`/app/campaign/${item.key}`)
      }}
      shadow='sm'
    >
      <CardHeader className='flex flex-row items-center justify-between gap-4 pb-2'>
        <div className='flex flex-row items-center gap-3'>
          <Avatar
            src={item.brand.logo}
            alt={item.brand.name}
            size='lg'
            radius='sm'
          />
          <div className='flex flex-col items-start gap-0'>
            <Text variant='bodySm' degree='100' className='font-semibold'>
              {item.brand.name}
            </Text>
            <Text variant='bodyXs' degree='200'>
              {item.category.replace('_', ' ')}
            </Text>
          </div>
        </div>
        <div>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant='light'
                size='sm'
                className='text-default-400 hover:text-black dark:hover:text-white'
              >
                <EllipsisVertical className='size-4' />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                if (key === 'delete-campaign') {
                  deleteCampaign.handleSelect(item)
                }
              }}
            >
              <DropdownItem key='view-details'>
                <div className='flex flex-row items-center gap-2' onClick={() => {
                  router.push(`/app/campaign/${item.key}`)
                }}>
                  <EyeIcon className='size-4' />
                  <Text variant='bodyXs' degree='200'>
                    View Details
                  </Text>
                </div>
              </DropdownItem>
              <DropdownItem key='edit-campaign'>
                <div className='flex flex-row items-center gap-2' onClick={() => {
                  addCampaign_onOpen()
                }}>
                  <EditIcon className='size-4' />
                  <Text variant='bodyXs' degree='200'>
                    Edit Campaign
                  </Text>
                </div>
              </DropdownItem>
              <DropdownItem key='delete-campaign'>
                <div className='flex flex-row items-center gap-2' onClick={() => {
                  deleteCampaign.handleSelect(item)
                }}>
                  <DeleteIcon className='size-4' />
                  <Text variant='bodyXs' degree='200' className='text-danger'>
                    Delete Campaign
                  </Text>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>

      <CardBody className='flex flex-col gap-4 pt-0'>
        <div className='flex flex-col gap-1'>
          <Text
            variant='bodySm'
            degree='100'
            className='line-clamp-2 font-medium'
          >
            {item.name}
          </Text>
          <Text variant='bodyXs' degree='300' className='line-clamp-3'>
            {item.description}
          </Text>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex flex-row items-center justify-between'>
            <Text variant='bodyXs' degree='200'>
              Start Date
            </Text>
            <Text variant='bodyXs' degree='100'>
              {item.startDate.toString()}
            </Text>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <Text variant='bodyXs' degree='200'>
              End Date
            </Text>
            <Text variant='bodyXs' degree='100'>
              {item.endDate.toString()}
            </Text>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <Text variant='bodyXs' degree='200'>
              Budget
            </Text>
            <Text variant='bodyXs' degree='100' className='font-medium'>
              ${item.budget.toLocaleString()}
            </Text>
          </div>
        </div>
      </CardBody>
    </Card>
  )

  const campaignsGrid_topListMarkup = (
    <div className='flex flex-col gap-4'>
      <div className='flex items-end justify-between gap-3'>
        {search.markup}
        <div className='flex gap-3'>
          <Dropdown aria-label='Table Filter'>
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
              {tableStructure.statusOptions.map(option => (
                <DropdownItem key={option} className='capitalize'>
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {addCampaignModal.buttonMarkup}
          {addCampaignModal.modalMarkup}
          {deleteCampaignModal.modalMarkup}
        </div>
      </div>
      <div className='flex items-center justify-between'>
        {campaignsList_totalMarkup}
        {campaignsList_rowPerPageMarkup}
      </div>
    </div>
  )

  const campaignsGrid_contentMarkup = (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {data.result.map(item => campaignsGrid_renderCard(item))}
    </div>
  )

  const campaignsGrid_emptyMarkup = (
    <div className='flex flex-col items-center justify-center gap-4 py-12'>
      <div className='flex size-16 items-center justify-center rounded-full bg-background-level-2'>
        <SearchIcon className='size-6 text-foreground-level-3' />
      </div>
      <div className='flex flex-col items-center gap-2'>
        <Text variant='bodySm' degree='100'>
          No campaigns found
        </Text>
        <Text variant='bodyXs' degree='300'>
          Try adjusting your search or filter criteria
        </Text>
      </div>
    </div>
  )

  const campaignsGrid_footerMarkup = (
    <div className='flex w-full flex-row items-center justify-center gap-4 pt-6'>
      {pagination_markup}
    </div>
  )

  const campaignsGrid_markup = (
    <div className='flex flex-col gap-6'>
      {campaignsGrid_topListMarkup}
      {data.result.length > 0 ? (
        <>
          {campaignsGrid_contentMarkup}
          {campaignsGrid_footerMarkup}
        </>
      ) : (
        campaignsGrid_emptyMarkup
      )}
    </div>
  )

  const campaignsGrid = {
    markup: campaignsGrid_markup,
  }

  // --------------------------------------------------
  // Campaigns
  // --------------------------------------------------

  const campaigns_markup = (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-between'>
        <Text variant='headingXl' degree='100'>
          {t('campaigns.title')}
        </Text>
        <div className='flex flex-1 flex-row justify-end gap-2'>
          <Button
            variant={campaignsViewMode.isTable ? 'solid' : 'flat'}
            endContent={<ListIcon className='size-4' />}
            isIconOnly
            color='default'
            onPress={campaignsViewMode.handleTableSelect}
            aria-label='Table View'
          />
          <Button
            variant={campaignsViewMode.isGrid ? 'solid' : 'flat'}
            endContent={<GridIcon className='size-4' />}
            isIconOnly
            color='default'
            onPress={campaignsViewMode.handleGridSelect}
            aria-label='Grid View'
          />
        </div>
      </div>
      <div className='fle gap-2 sm:flex-col'>
        <Box active={campaignsViewMode.isTable}>{campaignsList.markup}</Box>
        <Box active={campaignsViewMode.isGrid}>{campaignsGrid.markup}</Box>
      </div>
    </div>
  )

  return (
    <div className='flex flex-col gap-12 py-6 pl-6 pr-8 sm:gap-4'>
      {header_markup}
      {statics.markup}
      {campaigns_markup}
      <div className='h-24'></div>
    </div>
  )
}
