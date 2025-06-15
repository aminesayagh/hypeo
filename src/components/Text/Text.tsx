import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { fontStyles } from './style';
import { cn } from '@/services/classes';

// --------------------------------------------------
// Text Component Types
// --------------------------------------------------

type TextVariantProps = VariantProps<typeof fontStyles>;

interface BaseTextProps {
  children: React.ReactNode;
  className?: string;
}

type TextProps<T extends React.ElementType = 'span'> = BaseTextProps &
  TextVariantProps & {
    as?: T;
  } & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseTextProps>;

// --------------------------------------------------
// Utility Functions
// --------------------------------------------------

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
  variant,
  fontWeight,
  degree,
  alignment,
  breakWord,
  truncate,
  as,
  ...props
}, ref) => {
  const Element = as || getDefaultElement(variant);
  
  const text_className = cn(
    fontStyles({
      variant,
      fontWeight,
      degree,
      alignment,
      breakWord,
      truncate,
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
