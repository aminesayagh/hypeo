'use client'
import Input, { type UInputProps } from './Input'
import { type FieldValues } from 'react-hook-form'
import { useState } from 'react'
import { EyeSlashFilledIcon, EyeFilledIcon } from '../icon/password'

 function Password<T extends FieldValues>({ ...props }: UInputProps<T>) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      endContent={
        <button
          aria-label='toggle password visibility'
          className='focus:outline-none'
          type='button'
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
          ) : (
            <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
          )}
        </button>
      }
      {...props}
    />
  )
}

export default Password;