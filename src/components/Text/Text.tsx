import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { fontStyles, textPresets, type TextPreset } from './style';

// --------------------------------------------------
// Text Component Types
// --------------------------------------------------

type TextVariantProps = VariantProps<typeof fontStyles>;

interface BaseTextProps {
  children: React.ReactNode;
  className?: string;
  preset?: TextPreset;
}

type TextProps<T extends React.ElementType = 'span'> = BaseTextProps &
  TextVariantProps & {
    as?: T;
  } & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseTextProps>;

// --------------------------------------------------
// Utility Functions
// --------------------------------------------------

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

const getDefaultElement = (variant?: TextVariantProps['variant']): React.ElementType => {
  if (!variant) return 'span';
  
  if (variant.startsWith('heading')) {
    const headingMap: Record<string, React.ElementType> = {
      heading3xl: 'h1',
      heading2xl: 'h1',
      headingXl: 'h2',
      headingLg: 'h3',
      headingMd: 'h4',
      headingSm: 'h5',
      headingXs: 'h6',
    };
    return headingMap[variant] || 'h1';
  }
  
  return 'p';
};

// --------------------------------------------------
// Text Component
// --------------------------------------------------

export const Text = React.forwardRef<
  HTMLElement,
  TextProps
>(({
  children,
  className,
  preset,
  variant,
  fontWeight,
  degree,
  alignment,
  transform,
  style,
  lineHeight,
  letterSpacing,
  breakWord,
  truncate,
  whitespace,
  as,
  ...props
}, ref) => {
  // Apply preset if provided, but allow individual props to override
  const presetConfig = preset ? textPresets[preset] : null;
  
  const Element = as || getDefaultElement(variant || presetConfig?.variant);
  
  const text_className = cn(
    fontStyles({
      variant: variant || presetConfig?.variant,
      fontWeight: fontWeight || presetConfig?.fontWeight,
      degree: degree || presetConfig?.degree,
      alignment,
      transform: transform,
      style: style,
      lineHeight,
      letterSpacing: letterSpacing,
      breakWord,
      truncate,
      whitespace,
    }),
    className
  );

  return (
    <Element
      ref={ref}
      className={text_className}
      {...props}
    >
      {children}
    </Element>
  );
});

Text.displayName = 'Text';
