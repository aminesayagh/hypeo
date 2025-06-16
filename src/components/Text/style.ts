import { cva, type VariantProps } from 'class-variance-authority'

export const fontStyles = cva('', {
  variants: {
    variant: {
      // Hero/Display Headings - Uses CSS custom properties
      heading3xl: 'text-1000 leading-display tracking-display',
      heading2xl: 'text-900 leading-display tracking-display',
      
      // Large Headings
      headingXl: 'text-800 leading-heading tracking-heading',
      headingLg: 'text-750 leading-heading tracking-heading',
      headingMd: 'text-700 leading-title tracking-title',
      
      // Medium Headings
      headingSm: 'text-600 leading-normal tracking-normal',
      headingXs: 'text-550 leading-normal tracking-normal',
      
      // Body Text - Optimized for readability
      bodyLg: 'text-325 leading-comfortable tracking-normal',
      bodyMd: 'text-350 leading-body tracking-normal',
      bodySm: 'text-400 leading-body tracking-normal',
      bodyXs: 'text-450 leading-body tracking-body',
    },
    fontWeight: {
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    degree: {
      inherit: 'text-inherit',
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
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    style: {
      normal: 'not-italic',
      italic: 'italic',
    },
    // Override line height when needed
    lineHeight: {
      display: 'leading-display',
      heading: 'leading-heading',
      title: 'leading-title',
      normal: 'leading-normal',
      body: 'leading-body',
      comfortable: 'leading-comfortable',
      // Tailwind defaults for compatibility
      tight: 'leading-tight',
      snug: 'leading-snug',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
    // Override letter spacing when needed
    letterSpacing: {
      display: 'tracking-display',
      heading: 'tracking-heading',
      title: 'tracking-title',
      normal: 'tracking-normal',
      body: 'tracking-body',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      // Tailwind defaults for compatibility
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      widest: 'tracking-widest',
    },
    breakWord: {
      true: 'break-words',
      false: 'break-normal',
    },
    truncate: {
      true: 'truncate',
      false: 'overflow-visible',
    },
    whitespace: {
      normal: 'whitespace-normal',
      nowrap: 'whitespace-nowrap',
      pre: 'whitespace-pre',
      'pre-line': 'whitespace-pre-line',
      'pre-wrap': 'whitespace-pre-wrap',
    },
  },
  defaultVariants: {
    variant: 'bodyMd',
    fontWeight: 'regular',
    degree: '100',
    alignment: 'start',
    transform: 'none',
    style: 'normal',
    breakWord: false,
    truncate: false,
    whitespace: 'normal',
  },
});

// --------------------------------------------------
// Preset Combinations for Common Use Cases
// --------------------------------------------------

export const textPresets = {
  // Headlines
  hero: {
    variant: 'heading3xl' as const,
    fontWeight: 'bold' as const,
    degree: '100' as const,
    transform: 'capitalize' as const,
  },
  pageTitle: {
    variant: 'heading2xl' as const,
    fontWeight: 'semibold' as const,
    degree: '100' as const,
    transform: 'capitalize' as const,
  },
  sectionTitle: {
    variant: 'headingXl' as const,
    fontWeight: 'semibold' as const,
    degree: '100' as const,
    transform: 'capitalize' as const,
  },
  
  // Body content
  paragraph: {
    variant: 'bodyMd' as const,
    fontWeight: 'regular' as const,
    degree: '100' as const,
  },
  lead: {
    variant: 'bodyLg' as const,
    fontWeight: 'regular' as const,
    degree: '200' as const,
  },
  caption: {
    variant: 'bodyXs' as const,
    fontWeight: 'regular' as const,
    degree: '300' as const,
  },
  
  // UI elements
  button: {
    variant: 'bodySm' as const,
    fontWeight: 'medium' as const,
    degree: '100' as const,
  },
  label: {
    variant: 'bodySm' as const,
    fontWeight: 'medium' as const,
    degree: '200' as const,
  },
  code: {
    variant: 'bodySm' as const,
    fontFamily: 'mono' as const,
    fontWeight: 'regular' as const,
    degree: '200' as const,
  },
  
  // Special cases
  overline: {
    variant: 'bodyXs' as const,
    fontWeight: 'semibold' as const,
    transform: 'uppercase' as const,
    letterSpacing: 'wider' as const,
    degree: '300' as const,
  },
  quote: {
    variant: 'bodyLg' as const,
    style: 'italic' as const,
    fontWeight: 'regular' as const,
    degree: '200' as const,
  },
} as const;

// --------------------------------------------------
// Helper Types
// --------------------------------------------------

export type TextVariantProps = VariantProps<typeof fontStyles>;
export type TextVariant = TextVariantProps['variant'];
export type TextPreset = keyof typeof textPresets;
