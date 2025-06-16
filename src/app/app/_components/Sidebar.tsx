"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence, type Easing } from "motion/react";
import { Button } from "@/components/button";
import { Tooltip } from "@/components/tooltip";
import { 
  Menu, 
  X, 
  Home, 
  Settings, 
  Users, 
  FileText, 
  BarChart3,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { clsx } from "clsx";
import { Logo } from "@/components/logo";
import { Text } from "@/components/text";

interface SidebarProps {
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function Sidebar({ 
  expanded = false, 
  onToggle = () => {},
  className 
}: SidebarProps) {
  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------
  
  const sidebar_config = {
    collapsedWidth: 75,
    expandedWidth: 240,
    animationDuration: 0.3,
    animationEase: [0.25, 0.1, 0.25, 1] as unknown as Easing,
  };

  // --------------------------------------------------
  // Navigation Items
  // --------------------------------------------------
  
  const navigation_items = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/app/dashboard",
      active: true,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      href: "/app/users",
      active: false,
    },
    {
      id: "analytics",
      label: "Analytics", 
      icon: BarChart3,
      href: "/app/analytics",
      active: false,
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      href: "/app/documents",
      active: false,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/app/settings",
      active: false,
    },
  ];

  const navigation = {
    items: navigation_items,
  };

  // --------------------------------------------------
  // Toggle Handler
  // --------------------------------------------------
  
  const toggle_handleClick = useCallback(() => {
    onToggle?.();
  }, [onToggle]);

  const toggle = {
    handleClick: toggle_handleClick,
  };

  // --------------------------------------------------
  // Navigation Item Handlers
  // --------------------------------------------------
  
  const navigationItem_handleClick = useCallback((item: typeof navigation_items[0]) => {
    console.log("Navigate to:", item.href);
    // Add your navigation logic here
  }, []);

  const navigationItem = {
    handleClick: navigationItem_handleClick,
  };

  // --------------------------------------------------
  // Logo Markup
  // --------------------------------------------------
  const logo_markup = (
    <div className="flex items-center justify-start p-4 w-full">
      <Logo href="/app" hasText={expanded} size="md" variant="default" />
    </div>
  );

  const logo = {
    markup: logo_markup,
  };

  // --------------------------------------------------
  // Toggle Button Markup
  // --------------------------------------------------
  
  const toggleButton_markup = (
    <div className="p-4">
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onPress={toggle.handleClick}
        aria-label="Toggle sidebar"
        color="primary"
      >
        {expanded ? (
          <ChevronLeft className="size-5" />
        ) : (
          <ChevronRight className="size-5" />
        )}
      </Button>
    </div>
  );

  const toggleButton = {
    markup: toggleButton_markup,
  };

  // --------------------------------------------------
  // Navigation Items Markup
  // --------------------------------------------------
  
  const navigationItems_markup = (
    <nav className="flex-1 px-4 pb-4">
      <ul className="space-y-2">
        {navigation.items.map((item) => {
          const Icon = item.icon;
          
          const navigationItemContent = (
            <motion.li key={item.id}>
              <Button
                variant={item.active ? "solid" : "light"}
                color={item.active ? "primary" : "default"}
                className={clsx(
                  "w-full justify-start h-12 transition-all duration-200",
                  {
                    "px-3": !expanded,
                    "px-4": expanded,
                  }
                )}
                onPress={() => navigationItem.handleClick(item)}
                isIconOnly={!expanded}
                startContent={<Icon className="size-5 flex-shrink-0" />}
              >
                {expanded && <Text degree="inherit">{item.label}</Text>}
              </Button>
            </motion.li>
          );

          // Show tooltip when collapsed
          if (!expanded) {
            return (
              <Tooltip
                key={item.id}
                content={item.label}
                placement="right"
                delay={500}
              >
                {navigationItemContent}
              </Tooltip>
            );
          }

          return navigationItemContent;
        })}
      </ul>
    </nav>
  );

  const navigationItems = {
    markup: navigationItems_markup,
  };

  // --------------------------------------------------
  // Sidebar Markup
  // --------------------------------------------------
  
  const sidebar_markup = (
    <motion.aside
      animate={{
        width: expanded ? sidebar_config.expandedWidth : sidebar_config.collapsedWidth,
      }}
      transition={{
        duration: sidebar_config.animationDuration,
        ease: sidebar_config.animationEase as unknown as Easing,
      }}
      className={clsx(
        "relative flex flex-col bg-background-level-1/20 border-r border-background-level-3 h-full overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {logo.markup}
        <div className="border-t border-gray-200 dark:border-gray-800" />
        {navigationItems.markup}
        <div className="border-t border-gray-200 dark:border-gray-800" />
        {toggleButton.markup}
      </div>
    </motion.aside>
  );

  const sidebar = {
    config: sidebar_config,
    navigation,
    toggle,
    navigationItem,
    logo,
    toggleButton,
    navigationItems,
    markup: sidebar_markup,
  };

  return sidebar.markup;
}