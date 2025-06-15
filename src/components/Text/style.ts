import { cva } from 'class-variance-authority'

export const fontStyles = cva('', {
  variants: {
    variant: {
      heading3xl: 'text-1000',
      heading2xl: 'text-900',
      headingXl: 'text-800',
      headingLg: 'text-750',
      headingMd: 'text-700',
      headingSm: 'text-600',
      headingXs: 'text-550',
      bodyXs: 'text-450',
      bodySm: 'text-400',
      bodyMd: 'text-350',
      bodyLg: 'text-325',
    },
    fontWeight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    degree: {
      '100': 'text-foreground-level-1',
      '200': 'text-foreground-level-2',
      '300': 'text-foreground-level-3',
      '400': 'text-foreground-level-4',
    },
    alignment: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
      justify: 'text-justify',
    },
    breakWord: {
      true: 'break-words',
      false: 'break-normal',
    },
    truncate: {
      true: 'truncate',
      false: 'break-normal',
    },
  },
  defaultVariants: {
    variant: 'bodyMd',
    fontWeight: 'medium',
    degree: '100',
    alignment: 'start',
    breakWord: false,
    truncate: false,
  },
});
