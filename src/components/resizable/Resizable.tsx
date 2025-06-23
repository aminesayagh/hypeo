"use client";

import { motion, AnimatePresence, type Variants, type MotionStyle } from "motion/react";
import { useRef, useCallback, useMemo, useEffect, useState, isValidElement, Children } from "react";
import { clsx } from "clsx";

// --------------------------------------------------
// ResizablePanel Interface
// --------------------------------------------------

interface ResizablePanelProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  contentKey?: string | number; // Stable key for content identification
  disabled?: boolean; // Disable animations for performance
  style?: React.CSSProperties;
}

// --------------------------------------------------
// ResizablePanel Component
// --------------------------------------------------

export function ResizablePanel({
  children,
  duration = 0.2, // Faster for dashboard usage
  className,
  contentKey,
  style,
  disabled = false,
}: ResizablePanelProps) {
  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------
  
  const panel_config = {
    duration,
    disabled,
    easingFunction: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
  };

  // --------------------------------------------------
  // Measurement State
  // --------------------------------------------------
  
  const [measurement_height, measurement_setHeight] = useState<number | null>(null);
  const measurement_ref = useRef<HTMLDivElement>(null);
  
  const measurement_updateHeight = useCallback(() => {
    if (measurement_ref.current) {
      const newHeight = measurement_ref.current.scrollHeight;
      measurement_setHeight(newHeight);
    }
  }, []);

  const measurement = {
    height: measurement_height,
    setHeight: measurement_setHeight,
    ref: measurement_ref,
    updateHeight: measurement_updateHeight,
  };

  // --------------------------------------------------
  // Content Key Management
  // --------------------------------------------------
  const contentKey_stable = useMemo(() => {
    if (contentKey !== undefined) {
      return String(contentKey);
    }
    
    // Simple content hash for performance (much faster than JSON.stringify)
    if (typeof children === "string") {
      return children;
    }
    
    if (isValidElement(children) && children.key) {
      return String(children.key);
    }
    
    // Fallback to a simple hash based on content length/type
    return `content-${typeof children}-${Children.count(children)}`;
  }, [children, contentKey]);

  const contentKey_manager = {
    stable: contentKey_stable,
  };

  // --------------------------------------------------
  // Animation Variants
  // --------------------------------------------------
  
  const animation_variants = useMemo(() => ({
    initial: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0,
      }
    },
    animate: {
      opacity: 1,
      height: measurement.height || "auto",
      transition: {
        duration: panel_config.disabled ? 0 : panel_config.duration,
        ease: panel_config.easingFunction,
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: panel_config.disabled ? 0 : panel_config.duration * 0.75, // Faster exit
        ease: panel_config.easingFunction,
      }
    }
  }), [measurement.height, panel_config]);

  const animation = {
    variants: animation_variants,
  };

  // --------------------------------------------------
  // Effects
  // --------------------------------------------------
  
  // Measure height on content changes
  useEffect(() => {
    measurement.updateHeight();
  }, [children, measurement]);

  // ResizeObserver for dynamic height updates
  useEffect(() => {
    if (!measurement_ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      measurement.updateHeight();
    });

    resizeObserver.observe(measurement_ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [measurement]);

  // --------------------------------------------------
  // Container Classes
  // --------------------------------------------------
  
  const container_classes = useMemo(() => 
    clsx(
      "relative w-full overflow-hidden",
      className
    ), 
    [className]
  );

  const content_classes = useMemo(() =>
    clsx(
      "relative w-full",
      {
        "transition-none": panel_config.disabled,
      }
    ),
    [panel_config.disabled]
  );

  const container = {
    classes: container_classes,
  };

  const content = {
    classes: content_classes,
  };

  // --------------------------------------------------
  // Render Optimization
  // --------------------------------------------------
  
  // Skip animation wrapper if disabled
  if (panel_config.disabled) {
    return (
      <div className={container.classes}>
        <div ref={measurement.ref} className={content.classes}>
          {children}
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ResizablePanel Markup
  // --------------------------------------------------
  
  const resizablePanel_markup = (
    <motion.div className={container.classes} style={style as MotionStyle}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={contentKey_manager.stable}
          variants={animation.variants as unknown as Variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="overflow-hidden"
        >
          <div ref={measurement.ref} className={content.classes}>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );

  const resizablePanel = {
    config: panel_config,
    measurement,
    contentKey: contentKey_manager,
    animation,
    container,
    content,
    markup: resizablePanel_markup,
  };

  return resizablePanel.markup;
}