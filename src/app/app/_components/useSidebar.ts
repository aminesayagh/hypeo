"use client";

import { useCallback, useEffect, useState } from "react";

interface UseSidebarOptions {
  defaultExpanded?: boolean;
  persistKey?: string;
}

export function useSidebar({ 
  defaultExpanded = false, 
  persistKey = "hypeo-sidebar-expanded" 
}: UseSidebarOptions = {}) {
  // --------------------------------------------------
  // Sidebar State
  // --------------------------------------------------
  
  const [sidebar_expanded, sidebar_setExpanded] = useState(defaultExpanded);
  const [sidebar_mounted, sidebar_setMounted] = useState(false);

  // --------------------------------------------------
  // Persistence
  // --------------------------------------------------
  
  const persistence_load = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(persistKey);
        if (stored !== null) {
          return JSON.parse(stored);
        }
      } catch (error) {
        console.warn("Failed to load sidebar state from localStorage:", error);
      }
    }
    return defaultExpanded;
  }, [persistKey, defaultExpanded]);

  const persistence_save = useCallback((expanded: boolean) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(persistKey, JSON.stringify(expanded));
      } catch (error) {
        console.warn("Failed to save sidebar state to localStorage:", error);
      }
    }
  }, [persistKey]);

  const persistence = {
    load: persistence_load,
    save: persistence_save,
  };

  // --------------------------------------------------
  // Effects
  // --------------------------------------------------
  
  // Load persisted state on mount
  useEffect(() => {
    const persistedState = persistence.load();
    console.log("Persisted State", persistedState);
    sidebar_setExpanded(persistedState);
    sidebar_setMounted(true);
  }, []);

  // Save state changes
  useEffect(() => {
    if (sidebar_mounted) {
      persistence.save(sidebar_expanded);
    }
  }, [sidebar_expanded, sidebar_mounted, persistence]);

  // --------------------------------------------------
  // Handlers
  // --------------------------------------------------
  
  const sidebar_toggle = useCallback(() => {
    console.log("Toggle");
    sidebar_setExpanded(prev => !prev);
  }, []);

  const sidebar_expand = useCallback(() => {
    sidebar_setExpanded(true);
  }, []);

  const sidebar_collapse = useCallback(() => {
    sidebar_setExpanded(false);
  }, []);

  // --------------------------------------------------
  // Return Object
  // --------------------------------------------------
  
  const sidebar = {
    expanded: sidebar_expanded,
    setExpanded: sidebar_setExpanded,
    mounted: sidebar_mounted,
    toggle: sidebar_toggle,
    expand: sidebar_expand,
    collapse: sidebar_collapse,
  };

  return sidebar;
}