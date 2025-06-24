import { Navbar, NavbarContent } from '@heroui/react'
import { SearchInput } from '@/components/search-input'
import { ThemeChange } from '@/services/components/themes/ThemeChange'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@/components/dropdown'
import { User } from '@/components/user'
import { useTranslations } from 'next-intl'
import { LogOut, User as UserIcon, Settings } from '@/components/icon'
import { LanguageSelector } from '@/services/components/internationalization/LanguageSelector'
import { ViewModeSelector } from '@/services/components/view-modes/ViewModeSelector'
import { DividerLevel1 } from '@/components/divider'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/button'
import { useCallback } from 'react'
import { Logo } from '@/components/logo'

const MenuIcon = () => {
  return (
    <svg
      className='size-[20px]'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.29701 5.2338C3.52243 4.27279 4.27279 3.52243 5.2338 3.29701V3.29701C6.06663 3.10165 6.93337 3.10165 7.7662 3.29701V3.29701C8.72721 3.52243 9.47757 4.27279 9.70299 5.2338V5.2338C9.89835 6.06663 9.89835 6.93337 9.70299 7.7662V7.7662C9.47757 8.72721 8.72721 9.47757 7.7662 9.70299V9.70299C6.93337 9.89835 6.06663 9.89835 5.2338 9.70299V9.70299C4.27279 9.47757 3.52243 8.72721 3.29701 7.7662V7.7662C3.10166 6.93337 3.10166 6.06663 3.29701 5.2338V5.2338Z'
        fill='var(--foreground)'
        stroke='var(--foreground)'
      />
      <path
        d='M3.29701 16.2338C3.52243 15.2728 4.27279 14.5224 5.2338 14.297V14.297C6.06663 14.1017 6.93337 14.1017 7.7662 14.297V14.297C8.72721 14.5224 9.47757 15.2728 9.70299 16.2338V16.2338C9.89835 17.0666 9.89835 17.9334 9.70299 18.7662V18.7662C9.47757 19.7272 8.72721 20.4776 7.7662 20.703V20.703C6.93337 20.8983 6.06663 20.8983 5.2338 20.703V20.703C4.27279 20.4776 3.52243 19.7272 3.29701 18.7662V18.7662C3.10166 17.9334 3.10166 17.0666 3.29701 16.2338V16.2338Z'
        fill='var(--foreground)'
        stroke='var(--foreground)'
      />
      <path
        d='M14.297 5.2338C14.5224 4.27279 15.2728 3.52243 16.2338 3.29701V3.29701C17.0666 3.10165 17.9334 3.10165 18.7662 3.29701V3.29701C19.7272 3.52243 20.4776 4.27279 20.703 5.2338V5.2338C20.8983 6.06663 20.8983 6.93337 20.703 7.7662V7.7662C20.4776 8.72721 19.7272 9.47757 18.7662 9.70299V9.70299C17.9334 9.89835 17.0666 9.89835 16.2338 9.70299V9.70299C15.2728 9.47757 14.5224 8.72721 14.297 7.7662V7.7662C14.1017 6.93337 14.1017 6.06663 14.297 5.2338V5.2338Z'
        fill='var(--foreground)'
        stroke='var(--foreground)'
      />
      <path
        d='M14.297 16.2338C14.5224 15.2728 15.2728 14.5224 16.2338 14.297V14.297C17.0666 14.1017 17.9334 14.1017 18.7662 14.297V14.297C19.7272 14.5224 20.4776 15.2728 20.703 16.2338V16.2338C20.8983 17.0666 20.8983 17.9334 20.703 18.7662V18.7662C20.4776 19.7272 19.7272 20.4776 18.7662 20.703V20.703C17.9334 20.8983 17.0666 20.8983 16.2338 20.703V20.703C15.2728 20.4776 14.5224 19.7272 14.297 18.7662V18.7662C14.1017 17.9334 14.1017 17.0666 14.297 16.2338V16.2338Z'
        fill='var(--foreground)'
        stroke='var(--foreground)'
      />
    </svg>
  )
}

interface HeaderProps {
  height: number
  left: number
  onMenuToggle?: () => void
  showMenuToggle?: boolean
}

export function Header({
  height,
  left,
  onMenuToggle,
  showMenuToggle = false,
}: HeaderProps) {
  const router = useRouter()

  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------
  const t = useTranslations('navigation')

  // --------------------------------------------------
  // Mobile Menu Button
  // --------------------------------------------------

  const mobileMenuButton_handleToggle = useCallback(() => {
    onMenuToggle?.()
  }, [onMenuToggle])

  const mobileMenuButton_markup = showMenuToggle ? (
    <Button
      isIconOnly
      variant='light'
      onPress={mobileMenuButton_handleToggle}
      className='lg:hidden'
      aria-label='Toggle menu'
    >
      <MenuIcon />
    </Button>
  ) : null

  const mobileMenuButton = {
    handleToggle: mobileMenuButton_handleToggle,
    markup: mobileMenuButton_markup,
  }

  // --------------------------------------------------
  // Logo
  // --------------------------------------------------

  const logo_markup = showMenuToggle ? (
    <div className='flex items-center lg:hidden'>
      <Logo href='/app' hasText={false} size='sm' variant='default' />
    </div>
  ) : null

  const logo = {
    markup: logo_markup,
  }

  // --------------------------------------------------
  // Search feature
  // --------------------------------------------------
  const search_markup = (
    <div className='hidden max-w-2xl sm:block'>
      <SearchInput />
    </div>
  )

  const search = {
    markup: search_markup,
  }

  // --------------------------------------------------
  // Options feature
  // --------------------------------------------------
  const options_markup = (
    <div className='flex items-center gap-4'>
      <ViewModeSelector />
      <LanguageSelector />
      <ThemeChange
        classNames={{
          icon: 'size-[20px]',
          button: 'cursor-pointer',
        }}
      />
    </div>
  )
  const options = {
    markup: options_markup,
  }

  // --------------------------------------------------
  // User profile feature
  // --------------------------------------------------
  const userProfile_markup = (
    <div className='flex items-center gap-2'>
      <Dropdown placement='bottom-end' aria-label='User Profile'>
        <DropdownTrigger>
          <User
            as='button'
            avatarProps={{
              isBordered: true,
              src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            }}
            className='transition-transform'
            description='@tonyreichert'
            name='Mohamed'
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='User Profile Menu'>
          <DropdownSection title={t('user.account')}>
            <DropdownItem
              key='profile'
              onPress={() => {
                router.push('/app/profile')
              }}
              startContent={<UserIcon size={16} />}
            >
              {t('user.profile')}
            </DropdownItem>
            <DropdownItem
              key='settings'
              onPress={() => {
                router.push('/app/settings')
              }}
              startContent={<Settings size={16} />}
            >
              {t('user.settings')}
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key='logout'
            color='danger'
            startContent={<LogOut size={16} />}
            onPress={() => {
              router.push('/auth/logout')
            }}
          >
            {t('user.logout')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )

  const userProfile = {
    markup: userProfile_markup,
  }

  return (
    <Navbar
      aria-label='Header'
      height={height}
      maxWidth='full'
      isBordered
      className='fixed right-0 top-0 w-full'
      style={{ left: left, width: `calc(100% - ${left}px)` }}
    >
      <NavbarContent className='flex-1' justify='start'>
        <div className='flex items-center gap-3'>
          {logo.markup}
          {mobileMenuButton.markup}
        </div>
        {search.markup}
      </NavbarContent>
      <NavbarContent className='flex-1' justify='end'>
        <div className='hidden items-center gap-4 sm:flex'>
          {options.markup}
        </div>
        <DividerLevel1
          className='hidden h-full sm:block'
          orientation='vertical'
        />
        {userProfile.markup}
      </NavbarContent>
    </Navbar>
  )
}
