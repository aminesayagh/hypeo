"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, type Easing } from "motion/react";
import { clsx } from "clsx";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "./useSidebar";  
import { Header } from "./Header";
import { ResizablePanel } from "@/components/resizable";
import { DividerLevel1 } from "@/components/divider";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------
  const layout_config = {
    sidebarCollapsedWidth: 75,
    sidebarExpandedWidth: 240,
    animationDuration: 0.3,
    animationEase: [0.25, 0.1, 0.25, 1],
    headerHeight: 64,
    breakpoint: 1024
  };

  // --------------------------------------------------
  // Sidebar State with Persistence
  // --------------------------------------------------
  
  const sidebar = useSidebar({ 
    defaultExpanded: false,
    persistKey: "hypeo-sidebar-expanded"
  });

  // --------------------------------------------------
  // Mobile Menu State
  // --------------------------------------------------
  
  const [mobileMenu_active, mobileMenu_setActive] = useState(false);
  
  const mobileMenu_toggle = useCallback(() => {
    mobileMenu_setActive(prev => !prev);
  }, []);

  const mobileMenu_close = useCallback(() => {
    mobileMenu_setActive(false);
  }, []);

  const mobileMenu = {
    active: mobileMenu_active,
    setActive: mobileMenu_setActive,
    toggle: mobileMenu_toggle,
    close: mobileMenu_close,
  };

  // --------------------------------------------------
  // Keyboard Shortcuts
  // --------------------------------------------------
  
  const keyboard_handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Toggle sidebar with Ctrl/Cmd + B
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault();
      sidebar.toggle();
    }
    
    // Close mobile menu with Escape
    if (event.key === 'Escape' && mobileMenu.active) {
      mobileMenu.close();
    }
  }, [sidebar, mobileMenu]);

  const keyboard = {
    handleKeyDown: keyboard_handleKeyDown,
  };

  // --------------------------------------------------
  // Effects
  // --------------------------------------------------
  
  // Keyboard shortcuts
  useEffect(() => {
    document.addEventListener('keydown', keyboard.handleKeyDown);
    return () => {
      document.removeEventListener('keydown', keyboard.handleKeyDown);
    };
  }, [keyboard]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= layout_config.breakpoint) {
        mobileMenu.close();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenu, layout_config.breakpoint]);

  // --------------------------------------------------
  // Responsive Calculations
  // --------------------------------------------------
  
  const responsive_sidebarWidth = sidebar.expanded 
    ? layout_config.sidebarExpandedWidth 
    : layout_config.sidebarCollapsedWidth;

  const responsive_contentWidth = `calc(100vw - ${responsive_sidebarWidth}px)`;

  const responsive = {
    sidebarWidth: responsive_sidebarWidth,
    contentWidth: responsive_contentWidth,
  };

  // --------------------------------------------------
  // Header Markup
  // --------------------------------------------------
  
  const header_markup = (
      <Header 
        height={layout_config.headerHeight}
        left={responsive.sidebarWidth}
      />
  );

  const header = {
    markup: header_markup,
  };

  // --------------------------------------------------
  // Desktop Sidebar Markup
  // --------------------------------------------------
  
  const desktopSidebar_markup = (
    <div className="hidden lg:flex fixed left-0 top-0 h-full z-40">
      <Sidebar
        expanded={sidebar.expanded}
        onToggle={sidebar.toggle}
      />
      <DividerLevel1 className='h-full' orientation="vertical" />
    </div>
  );

  const desktopSidebar = {
    markup: desktopSidebar_markup,
  };

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
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
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
            className="lg:hidden fixed left-0 top-0 h-full z-50"
          >
            <Sidebar
              expanded={true}
              onToggle={mobileMenu.close}
              className="w-64"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  const mobileSidebar = {
    markup: mobileSidebar_markup,
  };

  // --------------------------------------------------
  // Main Content Markup
  // --------------------------------------------------
  
  const mainContent_markup = (
    <main
      className="p-6 h-full"
      style={{
        minHeight: `calc(100vh - ${layout_config.headerHeight}px)`,
      }}
    >
      {children}
    </main>
  );

  const mainContent = {
    markup: mainContent_markup,
  };

  // --------------------------------------------------
  // App Layout Markup
  // --------------------------------------------------
  
  const appLayout_markup = (
    <div className={clsx("relative min-h-screen overflow-hidden", className)}>
      {/* Desktop sidebar */}
      {desktopSidebar.markup}
      
      {/* Mobile sidebar */}
      {mobileSidebar.markup}
      {/* Header */}
      <ResizablePanel className="w-full relative h-full" style={{ width: responsive.contentWidth, left: responsive.sidebarWidth }}>
        {header.markup}
        {/* Main content */}
        <motion.div className="w-full h-full" style={{
          marginTop: layout_config.headerHeight,
        }}>
          {mainContent.markup}
        </motion.div>
      </ResizablePanel>
      
    </div>
  );

  const appLayout = {
    config: layout_config,
    sidebar,
    mobileMenu,
    keyboard,
    responsive,
    markup: appLayout_markup,
  };

  return appLayout.markup;
}