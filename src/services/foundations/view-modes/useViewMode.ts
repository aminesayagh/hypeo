"use client";

import { useCallback, useMemo } from 'react';
import { useQueryState } from 'nuqs';

// --------------------------------------------------
// Mode Types
// --------------------------------------------------

export type ViewMode = 'business' | 'creator';

// --------------------------------------------------
// Mode Configuration
// --------------------------------------------------

const mode_config = {
  defaultMode: 'business' as ViewMode,
  validModes: ['business', 'creator'] as const,
  storageKey: 'viewMode',
};

// --------------------------------------------------
// Custom Hook: useViewMode
// --------------------------------------------------

export function useViewMode() {
  // --------------------------------------------------
  // State Management with nuqs
  // --------------------------------------------------
  
  const [mode_current, mode_setCurrent] = useQueryState(
    mode_config.storageKey,
    {
      defaultValue: mode_config.defaultMode,
      parse: (value: string): ViewMode => {
        return mode_config.validModes.includes(value as ViewMode) 
          ? (value as ViewMode) 
          : mode_config.defaultMode;
      },
      serialize: (value: ViewMode) => value,
      history: 'replace', // Don't create browser history entries
      shallow: false, // Allow cross-component updates
    }
  );

  // --------------------------------------------------
  // Mode Operations
  // --------------------------------------------------
  
  const mode_toggle = useCallback(() => {
    const newMode = mode_current === 'business' ? 'creator' : 'business';
    mode_setCurrent(newMode);
  }, [mode_current, mode_setCurrent]);

  const mode_setBusiness = useCallback(() => {
    mode_setCurrent('business');
  }, [mode_setCurrent]);

  const mode_setCreator = useCallback(() => {
    mode_setCurrent('creator');
  }, [mode_setCurrent]);

  const mode_set = useCallback((newMode: ViewMode) => {
    if (mode_config.validModes.includes(newMode)) {
      mode_setCurrent(newMode);
    }
  }, [mode_setCurrent]);

  // --------------------------------------------------
  // Mode Helpers
  // --------------------------------------------------
  
  const mode_isBusiness = useMemo(() => mode_current === 'business', [mode_current]);
  const mode_isCreator = useMemo(() => mode_current === 'creator', [mode_current]);

  // --------------------------------------------------
  // Mode Display Info
  // --------------------------------------------------
  
  const mode_displayInfo = useMemo(() => ({
    business: {
      label: 'Business',
      icon: '🏢',
    },
    creator: {
      label: 'Creator',
      icon: '🎨',
    },
  }), []);

  const mode_currentInfo = useMemo(() => 
    mode_displayInfo[mode_current], 
    [mode_current, mode_displayInfo]
  );

  // --------------------------------------------------
  // Return Hook Interface
  // --------------------------------------------------
  
  const viewMode = {
    // Current state
    current: mode_current,
    currentInfo: mode_currentInfo,
    
    // State setters
    setCurrent: mode_setCurrent,
    set: mode_set,
    setBusiness: mode_setBusiness,
    setCreator: mode_setCreator,
    toggle: mode_toggle,
    
    // State helpers
    isBusiness: mode_isBusiness,
    isCreator: mode_isCreator,
    
    // Configuration
    config: mode_config,
    displayInfo: mode_displayInfo,
  };

  return viewMode;
}