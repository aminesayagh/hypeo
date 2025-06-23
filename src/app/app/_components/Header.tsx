  import {
  Navbar,
  NavbarContent,
} from '@heroui/react'
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

export function Header({ height, left }: { height: number; left: number }) {
  const router = useRouter()

  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------
  const t = useTranslations('navigation')

  // --------------------------------------------------
  // Search feature
  // --------------------------------------------------
  const search_markup = (
    <div className='max-w-2xl'>
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
      <ThemeChange classNames={{
        icon: 'size-[20px]',
        button: 'cursor-pointer',
      }} />
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
            <DropdownItem key='profile' onPress={() => {
              router.push('/app/profile')
            }} startContent={<UserIcon size={16} />}>
              {t('user.profile')}
            </DropdownItem>
            <DropdownItem key='settings' onPress={() => {
              router.push('/app/settings')
            }} startContent={<Settings size={16} />}>
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
        {search.markup}
      </NavbarContent>
      <NavbarContent className='flex-1' justify='end'>
        {options.markup}
        <DividerLevel1 className='h-full' orientation="vertical" />
        {userProfile.markup}
      </NavbarContent>
    </Navbar>
  )
}
