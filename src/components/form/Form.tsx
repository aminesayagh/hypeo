'use client'
import { FormProvider } from 'react-hook-form'
import {
  Form as HeroForm,
  type FormProps as HeroFormProps,
} from '@heroui/react'
import type { UseFormReturn, FieldValues } from 'react-hook-form'

interface FormProps<T extends FieldValues = FieldValues>
  extends React.HTMLAttributes<HTMLFormElement> {
  methods: UseFormReturn<T>
}

export default function Form<T extends FieldValues = FieldValues>({
  children,
  methods,
  ...props
}: FormProps<T> & HeroFormProps) {
  return (
    <FormProvider {...methods}>
      <HeroForm {...props}>{children}</HeroForm>
    </FormProvider>
  )
}
