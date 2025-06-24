'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, type Easing } from 'motion/react'
import { clsx } from 'clsx'
import { Sidebar } from './Sidebar'
import { useSidebar } from './useSidebar'
import { Header } from './Header'
import { ResizablePanel } from '@/components/resizable'
import { DividerLevel1 } from '@/components/divider'

interface AppLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AppLayout({ children, className }: AppLayoutProps) {
  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------
  const layout_config = {
    sidebarCollapsedWidth: 75,
    sidebarExpandedWidth: 240,
    animationDuration: 0.3,
    animationEase: [0.25, 0.1, 0.25, 1]  as Easing,
    headerHeight: 64,
    breakpoint: 1024,
  }

  // --------------------------------------------------
  // Sidebar State with Persistence
  // --------------------------------------------------

  const sidebar = useSidebar({
    defaultExpanded: false,
    persistKey: 'hypeo-sidebar-expanded',
  })

  // --------------------------------------------------
  // Responsive State
  // --------------------------------------------------
  const [responsive_isMobile, responsive_setIsMobile] = useState(false)

  const responsive_checkMobile = () => {
    const isMobile = window.innerWidth < layout_config.breakpoint
    responsive_setIsMobile(isMobile)
  }

  const responsive = {
    isMobile: responsive_isMobile,
    setIsMobile: responsive_setIsMobile,
    checkMobile: responsive_checkMobile,
  }

  // --------------------------------------------------
  // Layout Calculations
  // --------------------------------------------------

  const layout_sidebarWidth = responsive.isMobile
    ? 0
    : sidebar.expanded
      ? layout_config.sidebarExpandedWidth
      : layout_config.sidebarCollapsedWidth

  const layout_contentWidth = responsive.isMobile
    ? `100vw`
    : `calc(100vw - ${layout_sidebarWidth}px)`

  const layout_contentLeft = responsive.isMobile ? 0 : layout_sidebarWidth

  const layout = {
    sidebarWidth: layout_sidebarWidth,
    contentWidth: layout_contentWidth,
    contentLeft: layout_contentLeft,
  }

  // --------------------------------------------------
  // Mobile Menu State
  // --------------------------------------------------

  const [mobileMenu_active, mobileMenu_setActive] = useState(false)

  const mobileMenu_toggle = useCallback(() => {
    mobileMenu_setActive(prev => !prev)
  }, [])

  const mobileMenu_close = useCallback(() => {
    mobileMenu_setActive(false)
  }, [])

  const mobileMenu = {
    active: mobileMenu_active,
    setActive: mobileMenu_setActive,
    toggle: mobileMenu_toggle,
    close: mobileMenu_close,
  }

  // --------------------------------------------------
  // Keyboard Shortcuts
  // --------------------------------------------------

  const keyboard_handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Toggle sidebar with Ctrl/Cmd + B (desktop only)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'b' &&
        !responsive.isMobile
      ) {
        event.preventDefault()
        sidebar.toggle()
      }

      // Toggle mobile menu with Ctrl/Cmd + B (mobile only)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === 'b' &&
        responsive.isMobile
      ) {
        event.preventDefault()
        mobileMenu.toggle()
      }
      // Close mobile menu with Escape
      if (event.key === 'Escape' && mobileMenu.active) {
        mobileMenu.close()
      }
    },
    [sidebar, mobileMenu, responsive.isMobile]
  )

  const keyboard = {
    handleKeyDown: keyboard_handleKeyDown,
  }

  // --------------------------------------------------
  // Effects
  // --------------------------------------------------

  // Initialize responsive state
  useEffect(() => {
    responsive.checkMobile()
  }, [responsive.checkMobile])

  // Keyboard shortcuts
  useEffect(() => {
    document.addEventListener('keydown', keyboard.handleKeyDown)
    return () => {
      document.removeEventListener('keydown', keyboard.handleKeyDown)
    }
  }, [keyboard])

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      responsive.checkMobile()

      // Close mobile menu when switching to desktop
      if (window.innerWidth >= layout_config.breakpoint) {
        mobileMenu.close()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileMenu, layout_config.breakpoint, responsive.checkMobile])

  // --------------------------------------------------
  // Header Markup
  // --------------------------------------------------

  const header_markup = (
    <Header
      height={layout_config.headerHeight}
      left={layout.sidebarWidth}
      onMenuToggle={mobileMenu.toggle}
      showMenuToggle={responsive.isMobile}
    />
  )

  const header = {
    markup: header_markup,
  }

  // --------------------------------------------------
  // Desktop Sidebar Markup
  // --------------------------------------------------

  const desktopSidebar_markup = (
    <div className='fixed left-0 top-0 z-40 hidden h-full lg:flex'>
      <Sidebar
        expanded={sidebar.expanded || false}
        onToggle={sidebar.toggle}
        collapsedWidth={layout_config.sidebarCollapsedWidth}
        expandedWidth={layout_config.sidebarExpandedWidth}
        animationDuration={layout_config.animationDuration}
        animationEase={layout_config.animationEase}
      />
      <DividerLevel1 className='h-full' orientation='vertical' />
    </div>
  )

  const desktopSidebar = {
    markup: desktopSidebar_markup,
  }

  // --------------------------------------------------
  // Mobile Sidebar Markup
  // --------------------------------------------------

  const mobileSidebar_markup = (
    <AnimatePresence>
      {mobileMenu.active && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-40 bg-black/50 lg:hidden'
            onClick={mobileMenu.close}
          />

          {/* Mobile sidebar */}
          <motion.div
            initial={{ x: -layout_config.sidebarExpandedWidth }}
            animate={{ x: 0 }}
            exit={{ x: -layout_config.sidebarExpandedWidth }}
            transition={{
              duration: layout_config.animationDuration,
              ease: layout_config.animationEase as unknown as Easing,
            }}
            className='fixed left-0 top-0 z-50 h-full lg:hidden'
          >
            <Sidebar
              expanded={true}
              onToggle={mobileMenu.close}
              className='w-64'
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  const mobileSidebar = {
    markup: mobileSidebar_markup,
  }

  // --------------------------------------------------
  // Main Content Markup
  // --------------------------------------------------

  const mainContent_markup = (
    <motion.main
      className='h-full'
      style={{
        minHeight: `calc(100vh - ${layout_config.headerHeight}px)`,
      }}
    >
      {children}
    </motion.main>
  )

  const mainContent = {
    markup: mainContent_markup,
  }

  // --------------------------------------------------
  // App Layout Markup
  // --------------------------------------------------

  const appLayout_markup = (
    <div className={clsx('relative min-h-screen overflow-hidden', className)}>
      {/* Desktop sidebar */}
      {desktopSidebar.markup}

      {/* Mobile sidebar */}
      {mobileSidebar.markup}
      {/* Header */}
      <ResizablePanel
        className='relative min-h-screen w-full'
        style={{
          width: layout.contentWidth,
          left: layout.contentLeft,
        }}
      >
        {header.markup}
        {/* Main content */}
        <motion.div
          className='h-full w-full'
          style={{
            marginTop: layout_config.headerHeight,
          }}
        >
          {mainContent.markup}
        </motion.div>
      </ResizablePanel>
    </div>
  )

  const appLayout = {
    config: layout_config,
    sidebar,
    mobileMenu,
    keyboard,
    responsive,
    layout,
    markup: appLayout_markup,
  }

  return appLayout.markup
}
