import { useViewMode, type ViewMode } from '@/services/foundations/view-modes/useViewMode'
import { Select, SelectItem, type SelectedItems, type Selection } from '@heroui/react'
import { useCallback, useMemo, useState, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

// --------------------------------------------------
// ModeSelector Interface
// --------------------------------------------------

interface ViewModeSelectorProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined'
}

export function ViewModeSelector({
  size = 'sm',
  variant = 'bordered',
  className = '',
}: ViewModeSelectorProps) {
  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------
  const pathname = usePathname();
  const [navigation_isPending, navigation_startTransition] = useTransition();

  const modeSelector_config = {
    size,
    variant,
    isPending: navigation_isPending,
    startTransition: navigation_startTransition,
  }

  // --------------------------------------------------
  // Internationalization
  // --------------------------------------------------
  const t = useTranslations('navigation');
  const locale = useLocale();

  // --------------------------------------------------
  // View Mode Hook
  // --------------------------------------------------

  const viewMode = useViewMode()

  // --------------------------------------------------
  // Mode Options
  // --------------------------------------------------

  const mode_options = useMemo(
    () => [
      {
        key: 'business',
        label: t('viewMode.business'),
        description: 'Business dashboard and analytics',
        icon: '🏢',
        value: 'business' as ViewMode,
      },
      {
        key: 'creator',
        label: t('viewMode.creator'),
        description: 'Creator tools and content management',
        icon: '🎨',
        value: 'creator' as ViewMode,
      },
    ],
    [t]
  )

  const mode = {
    options: mode_options,
    current: viewMode.current,
  }

  // --------------------------------------------------
  // Mode Options Markup
  // --------------------------------------------------

  const modeOptions_markup = mode.options.map(option => (
    <SelectItem
      key={option.key}
      color='primary'
      className='ring-primary'
      startContent={<span className='text-base'>{option.icon}</span>}
    >
      {option.label}
    </SelectItem>
  ))

  const modeOptions = {
    markup: modeOptions_markup,
  }

  // --------------------------------------------------
  // Render Value Function
  // --------------------------------------------------

  const renderValue_function = useCallback(
    (items: SelectedItems<object>) => {
      const selectedItem = Array.from(items)[0] as unknown as { key: string }
      const option = mode.options.find(opt => opt.key === selectedItem.key)

      if (!option) return null

      return (
        <div className='flex items-center gap-2'>
          <span className='text-base'>{option.icon}</span>
          <span className='text-sm font-medium'>{option.label}</span>
        </div>
      )
    },
    [mode.options]
  )

  const renderValue = {
    function: renderValue_function,
  }

  
  // --------------------------------------------------
  // Selection State
  // --------------------------------------------------
  const [selection_active, selection_setActive] = useState(false);
  
  const selection_handleChange = useCallback((keys: Selection) => {
    const selectedKey = Array.from(keys)[0] as string;
    
    if (selectedKey && selectedKey !== locale) {
      modeSelector_config.startTransition(() => {
        viewMode.setCurrent(selectedKey as ViewMode);
      });
    }
  }, [locale, pathname, viewMode, modeSelector_config.startTransition]);

  const selection_handleOpenChange = useCallback((isOpen: boolean) => {
    selection_setActive(isOpen);
  }, []);

  const selection = {
    active: selection_active,
    setActive: selection_setActive,
    handleChange: selection_handleChange,
    handleOpenChange: selection_handleOpenChange,
  };

  // --------------------------------------------------
  // ModeSelector Markup
  // --------------------------------------------------
  const modeSelector_markup = (
    <Select
      className={className}
      variant={modeSelector_config.variant}
      classNames={{
        base: 'min-w-[140px]',
        trigger: 'py-4',
      }}
      size={modeSelector_config.size}
      selectedKeys={[mode.current]}
      onSelectionChange={selection.handleChange}
      onOpenChange={selection.handleOpenChange}
      labelPlacement='outside-left'
      aria-label='Select dashboard view mode'
      renderValue={renderValue.function}
    >
      {modeOptions.markup}
    </Select>
  )

  const modeSelector = {
    markup: modeSelector_markup,
  }

  return modeSelector.markup
}
