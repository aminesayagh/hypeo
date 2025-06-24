'use client'
import { Logo } from '@/components/logo'
import Image from 'next/image'

import { LanguageSelector } from '@/services/components/internationalization/LanguageSelector'
import { ThemeChange } from '@/services/components/themes/ThemeChange'
import { Text } from '@/components/typo'
import {
  Form,
  Input as FormInput,
  Button as FormButton,
  Checkbox as FormCheckbox,
  Password as FormPassword,
} from '@/components/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { DividerLevel1 } from '@/components/divider'
import { Card, CardBody } from '@/components/card'
import { GoogleIcon } from '@/components/icon'
import { useTranslations } from 'next-intl';

export default function Home() {
  const router = useRouter()
  const t = useTranslations('pages.auth')

  // --------------------------------------------------
  // Content Header
  // --------------------------------------------------
  const contentHeader_markup = (
    <div className='flex flex-row items-center justify-between gap-2'>
      <div>
        <Logo href='/' hasText={false} size='md' variant='default' />
      </div>
      <div className='flex flex-row items-center gap-6'>
        <ThemeChange />
        <LanguageSelector />
      </div>
    </div>
  )

  const contentHeader = {
    markup: contentHeader_markup,
  }

  // --------------------------------------------------
  // Content Body
  // --------------------------------------------------

  const contentBody_headerMarkup = (
    <div className='flex flex-col gap-4'>
      <Text preset='sectionTitle' as='h1'>
        {t('title')}
      </Text>
      <Text preset='paragraph' as='p'>
        {t('description')}
      </Text>
    </div>
  )

  const contentBody_formSchema = z
    .object({
      firstName: z
        .string({
          required_error: t('form.firstName.required'),
        })
        .min(1, { message: t('form.firstName.required') }),
      lastName: z
        .string({
          required_error: t('form.lastName.required'),
        })
        .min(1, { message: t('form.lastName.required') }),
      email: z
        .string({
          required_error: t('form.email.required'),
        })
        .email({ message: t('form.email.invalid') }),
      password: z
        .string({
          required_error: t('form.password.required'),
        })
        .min(8, { message: t('form.password.min') }),
      repeatPassword: z
        .string({
          required_error: t('form.repeatPassword.required'),
        })
        .min(8, { message: t('form.repeatPassword.min') }),
      terms: z.boolean().refine(data => data === true, {
        message: 'You must agree to the terms and conditions',
      }),
    })
    .refine(data => data.password === data.repeatPassword, {
      path: ['repeatPassword'],
      message: 'Passwords do not match',
    })

  type contentBody_formSchemaType = z.infer<typeof contentBody_formSchema>

  const contentBody_formMethods = useForm<contentBody_formSchemaType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      terms: false,
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(contentBody_formSchema),
  })

  const contentBody_onSubmit = (data: contentBody_formSchemaType) => {
    console.log(data)
    router.push('/app/dashboard')
  }

  const contentBody_formMarkup = (
    <div>
      <Form
        methods={contentBody_formMethods}
        onSubmit={contentBody_formMethods.handleSubmit(contentBody_onSubmit)}
        className='grid grid-cols-2 gap-4'
      >
        <FormInput
          name='firstName'
          label={t('form.firstName.label')}
          className='col-span-1'
          size='md'
        />
        <FormInput
          name='lastName'
          label={t('form.lastName.label')}
          className='col-span-1'
          size='md'
        />
        <FormInput
          name='email'
          label={t('form.email.label')}
          className='col-span-2'
          size='md'
        />
        <FormPassword
          name='password'
          label={t('form.password.label')}
          className='col-span-2'
          size='md'
        />
        <FormPassword
          name='repeatPassword'
          label={t('form.repeatPassword.label')}
          className='col-span-2'
          size='md'
        />
        <FormCheckbox
          name='terms'
          label={t('form.terms.label')}
          className='col-span-2'
          size='md'
        />
        <FormButton className='col-span-2 uppercase font-semibold tracking-wider' size='lg'>{t('actions.signUp')}</FormButton>
      </Form>
    </div>
  )

  const contentBody_dividerMarkup = (
    <div className='relative flex w-full flex-col gap-4 h-0'>
      <DividerLevel1 />
      <div className='relative -top-7 w-full'>
        <Text
          preset='paragraph'
          as='p'
          alignment='center'
          className='mx-auto w-fit !text-sm bg-background-level-2 px-4 pb-0.5'
        >
          {t('or')}
        </Text>
      </div>
    </div>
  )

  const contentBody_providerMarkup = (
    <div className='flex flex-col gap-4'>
      <Card
        isPressable
        onPress={() => {
          router.push('/app/dashboard')
        }}
        className='border border-white/20 bg-background-level-2'
      >
        <CardBody className='flex w-full flex-row items-center justify-center gap-4 py-4'>
          <GoogleIcon />
          <Text preset='paragraph' as='p' fontWeight='medium'>
            {t('provider.google')}
          </Text>
        </CardBody>
      </Card>
    </div>
  )

  const contentBody_markup = (
    <div className='flex flex-col gap-8'>
      {contentBody_headerMarkup}
      {contentBody_formMarkup}
      {contentBody_dividerMarkup}
      {contentBody_providerMarkup}
    </div>
  )

  const contentBody = {
    markup: contentBody_markup,
  }

  // --------------------------------------------------
  // Content Footer
  // --------------------------------------------------

  const contentFooter_markup = (
    <div className='w-full flex flex-col items-center justify-center'>
      <Text variant='bodyXs' as='p' degree='300' className='flex flex-row gap-1'>
        {t.raw('footer.description').map((para: string, index: number) => {
          return (
            <span key={index}>
              {para}
              {index < t.raw('footer.description').length - 1 && ' '}
            </span>
          )
        })}
      </Text>
    </div>
  )

  const contentFooter = {
    markup: contentFooter_markup,
  }

  // --------------------------------------------------
  // Page Content
  // --------------------------------------------------

  const pageContent_markup = (
    <div className='flex h-full max-w-xl w-full flex-col justify-between gap-6 py-6'>
      <div>{contentHeader.markup}</div>
      <div>{contentBody.markup}</div>
      <div>{contentFooter.markup}</div>
    </div>
  )

  const pageContent = {
    markup: pageContent_markup,
  }

  // --------------------------------------------------
  // Big Image
  // --------------------------------------------------

  const bigImage_markup = (
    <div className='relative h-full w-full overflow-hidden rounded-2xl min-h-96'>
      <Image src='/hypeo-cover.jpg' alt='Hypeo' fill className='object-cover h-full' />
    </div>
  )

  const bigImage = {
    markup: bigImage_markup,
  }

  return (
    <div className='grid min-h-screen grid-cols-1 gap-4 bg-background-level-2 p-6 md:grid-cols-5 xl:grid-cols-2'>
      <div className='flex flex-col items-center justify-center col-span-3 xl:col-span-1'>
        {pageContent.markup}
      </div>
      <div className='flex flex-col items-center justify-center col-span-2 xl:col-span-1'>
        {bigImage.markup}
      </div>
    </div>
  )
}
