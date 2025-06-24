"use client"

import { Select, SelectItem, type SelectedItems, type Selection } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { FlagAmerica, FlagFrench } from '@/components/icon'
import { useLocale } from 'next-intl'
import { useCallback, useMemo, useTransition, useState } from 'react'
import { setUserLocale } from '@/services/foundations/internationalization/userLocale';

export function LanguageSelector() {
  // --------------------------------------------------
  // Internationalization
  // --------------------------------------------------
  const t = useTranslations('navigation')
  const locale = useLocale()

  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

  const [navigation_isPending, navigation_startTransition] = useTransition()

  const navigation = {
    isPending: navigation_isPending,
    startTransition: navigation_startTransition,
  }

  // --------------------------------------------------
  // Language Options
  // --------------------------------------------------

  const language_options = useMemo(
    () => [
      {
        key: 'en',
        label: t('language.en'),
        icon: FlagAmerica,
        locale: 'en' as const,
      },
      {
        key: 'fr',
        label: t('language.fr'),
        icon: FlagFrench,
        locale: 'fr' as const,
      },
    ],
    [t]
  )

  const language = {
    options: language_options,
    current: locale,
  }
  
  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------
  
  const loading_active = navigation.isPending;
  
  const loading = {
    active: loading_active,
  };

  // --------------------------------------------------
  // Render Value
  // --------------------------------------------------
  
  const function_renderValue = useCallback((value: SelectedItems) => {
    const selectedItem = Array.from(value)[0] as { key: string };
    const option = language.options.find((option) => option.key === selectedItem?.key);

    if (!option) return <p>No option found</p>;

    const Icon = option.icon;

    return <Icon />
  }, [language.options]);

  const renderValue = function_renderValue;

  // --------------------------------------------------
  // Selection State
  // --------------------------------------------------
  
  const [selection_active, selection_setActive] = useState(false);
  
  const selection_handleChange = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0] as string;
    
    if (selectedKey && selectedKey !== locale) {
      navigation.startTransition(() => {
        setUserLocale(selectedKey as 'en' | 'fr');
      });
    }
  }

  const selection_handleOpenChange = (isOpen: boolean) => {
    selection_setActive(isOpen);
  }

  const selection = {
    active: selection_active,
    setActive: selection_setActive,
    handleChange: selection_handleChange,
    handleOpenChange: selection_handleOpenChange,
  }

  return (
    <Select
      className='min-w-[68px]'
      variant='flat'
      classNames={{
        base: 'min-w-[68px]',
        trigger: 'min-w-[68px] py-5',
        popoverContent: 'min-w-[140px]',
        listbox: 'min-w-[130px]',
      }}
      size='sm'
      selectedKeys={[language.current]}
      onSelectionChange={selection.handleChange}
      onOpenChange={selection.handleOpenChange}
      isOpen={selection.active}
      isLoading={loading.active}
      disableSelectorIconRotation={loading.active}
      renderValue={renderValue}
      aria-label="Language Selector Button"
    >
      {language.options.map((option) => (
        <SelectItem key={option.key} color='primary' className='ring-primary' startContent={<option.icon />}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  )
}
