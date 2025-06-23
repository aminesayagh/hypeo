'use client'

import { useCallback } from 'react'
import { motion, AnimatePresence, type Easing } from 'motion/react'
import { Button } from '@/components/button'
import { Tooltip } from '@/components/tooltip'
import {
  LayoutDashboard,
  Sparkles,
  Bot,
  Search,
  Users,
  Headphones,
  Plus,
  Store,
  MessageCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from '@/components/icon'
import { clsx } from 'clsx'
import { Logo } from '@/components/logo'
import { Text } from '@/components/text'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { DividerLevel1 } from '@/components/divider'

interface SidebarProps {
  expanded?: boolean
  onToggle?: () => void
  className?: string
}

export function Sidebar({
  expanded = false,
  onToggle,
  className,
}: SidebarProps) {
  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------

  const sidebar_config = {
    collapsedWidth: 75,
    expandedWidth: 240,
    animationDuration: 0.3,
    animationEase: [0.25, 0.1, 0.25, 1] as unknown as Easing,
  }

  // --------------------------------------------------
  // Internationalization
  // --------------------------------------------------

  const t = useTranslations('navigation.sidebar')

  // --------------------------------------------------
  // Navigation & Routing
  // --------------------------------------------------

  const router = useRouter()
  const pathname = usePathname()

  // --------------------------------------------------
  // Navigation Items Configuration
  // --------------------------------------------------

  const navigation_items = [
    // Hypeo AI Section
    {
      section: 'hypeoAi',
      items: [
        {
          id: 'dashboard',
          label: t('dashboard'),
          icon: LayoutDashboard,
          href: '/app/dashboard',
        },
        {
          id: 'newAiCampaign',
          label: t('newAiCampaign'),
          icon: Sparkles,
          href: '/app/new-ai-campaign',
        },
        {
          id: 'aiManager',
          label: t('aiManager'),
          icon: Bot,
          href: '/app/ai-manager',
        },
        {
          id: 'discovery',
          label: t('discovery'),
          icon: Search,
          href: '/app/discovery',
        },
        {
          id: 'crm',
          label: t('crm'),
          icon: Users,
          href: '/app/crm',
        },
        {
          id: 'socialListening',
          label: t('socialListening'),
          icon: Headphones,
          href: '/app/social-listening',
        },
      ],
    },
    // Marketplace Section
    {
      section: 'marketplace',
      items: [
        {
          id: 'addProduct',
          label: t('addProduct'),
          icon: Plus,
          href: '/app/add-product',
        },
        {
          id: 'myMarketplace',
          label: t('myMarketplace'),
          icon: Store,
          href: '/app/my-marketplace',
        },
        {
          id: 'messagerie',
          label: t('messagerie'),
          icon: MessageCircle,
          href: '/app/messagerie',
        },
        {
          id: 'support',
          label: t('support'),
          icon: HelpCircle,
          href: '/app/support',
        },
      ],
    },
  ]

  const navigation = {
    items: navigation_items,
  }

  // --------------------------------------------------
  // Toggle Handler
  // --------------------------------------------------

  const toggle_handleClick = useCallback(() => {
    onToggle?.()
  }, [onToggle])

  const toggle = {
    handleClick: toggle_handleClick,
  }

  // --------------------------------------------------
  // Navigation Item Handlers
  // --------------------------------------------------

  const navigationItem_handleClick = useCallback(
    (item: { href: string }) => {
      router.push(item.href)
    },
    [router]
  )

  const navigationItem_isActive = useCallback(
    (href: string) => {
      return pathname === href
    },
    [pathname]
  )

  const navigationItem = {
    handleClick: navigationItem_handleClick,
    isActive: navigationItem_isActive,
  }

  // --------------------------------------------------
  // Logo Markup
  // --------------------------------------------------

  const logo_markup = (
    <div className='flex w-full items-center justify-start p-4 pl-[24px]'>
      <Logo href='/app' hasText={expanded} size='md' variant='default' />
    </div>
  )

  const logo = {
    markup: logo_markup,
  }

  // --------------------------------------------------
  // Toggle Button Markup
  // --------------------------------------------------

  const toggleButton_markup = (
    <div className='p-4'>
      <Button
        isIconOnly
        variant='flat'
        size='sm'
        onPress={toggle.handleClick}
        aria-label='Toggle sidebar'
      >
        {expanded ? (
          <ChevronLeft className='size-5' />
        ) : (
          <ChevronRight className='size-5' />
        )}
      </Button>
    </div>
  )

  const toggleButton = {
    markup: toggleButton_markup,
  }

  // --------------------------------------------------
  // Section Header Markup
  // --------------------------------------------------

  const sectionHeader_markup = (sectionKey: string) => (
    <div className='flex flex-row items-center gap-0 h-8'>
      <AnimatePresence mode='wait'>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{
              duration: sidebar_config.animationDuration / 2,
            }}
            className='w-full px-4'
          >
            <Text variant='bodyXs' degree='300' className='text-nowrap'>
              {t(`sections.${sectionKey}`)}
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
      <DividerLevel1 className='h-px' />
    </div>
  )

  const sectionHeader = {
    markup: sectionHeader_markup,
  }

  // --------------------------------------------------
  // Navigation Items Markup
  // --------------------------------------------------

  const navigationItems_markup = (
    <nav className='flex-1 px-4 pb-4 flex flex-col gap-2'>
      {navigation.items.map((section, sectionIndex) => (
        <div key={section.section} className=''>
          {sectionIndex > 0 && sectionHeader.markup(section.section)}

          <motion.ul className='space-y-1'>
            {section.items.map(item => {
              const Icon = item.icon
              const isActive = navigationItem.isActive(item.href)

              const navigationItemContent = (
                <motion.li key={item.id}>
                  <Button
                    variant={isActive ? 'flat' : 'light'}
                    color={isActive ? 'primary' : 'default'}
                    className={clsx(
                      'h-12 w-full justify-start transition-all duration-200',
                      {
                        'px-3': !expanded,
                        'px-4': expanded,
                      }
                    )}
                    onPress={() => navigationItem.handleClick(item)}
                  >
                    <div className='flex min-w-0 items-center space-x-3'>
                      <Icon className='h-5 w-5 flex-shrink-0' />
                      <AnimatePresence>
                        {expanded && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{
                              duration: sidebar_config.animationDuration,
                              delay: expanded ? 0.1 : 0,
                            }}
                            className='truncate whitespace-nowrap text-sm'
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </Button>
                </motion.li>
              )

              // Show tooltip when collapsed
              if (!expanded) {
                return (
                  <Tooltip
                    key={item.id}
                    content={item.label}
                    placement='right'
                    delay={500}
                  >
                    {navigationItemContent}
                  </Tooltip>
                )
              }

              return navigationItemContent
            })}
          </motion.ul>
        </div>
      ))}
    </nav>
  )

  const navigationItems = {
    markup: navigationItems_markup,
  }

  // --------------------------------------------------
  // Sidebar Markup
  // --------------------------------------------------

  const sidebar_markup = (
    <motion.aside
      animate={{
        width: expanded
          ? sidebar_config.expandedWidth
          : sidebar_config.collapsedWidth,
      }}
      transition={{
        duration: sidebar_config.animationDuration,
        ease: sidebar_config.animationEase as unknown as Easing,
      }}
      className={clsx(
        'bg-background-level-1/20 relative flex h-full flex-col overflow-hidden',
        className
      )}
    >
      <div className='flex h-full flex-col'>
        {logo.markup}
        <DividerLevel1 className='mb-2 h-px' />
        {navigationItems.markup}
        <DividerLevel1 className='my-2 h-px' />
        {toggleButton.markup}
      </div>
    </motion.aside>
  )

  const sidebar = {
    config: sidebar_config,
    navigation,
    toggle,
    navigationItem,
    logo,
    toggleButton,
    sectionHeader,
    navigationItems,
    markup: sidebar_markup,
  }

  return sidebar.markup
}
