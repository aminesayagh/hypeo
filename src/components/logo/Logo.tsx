import { motion, AnimatePresence, type Variants } from "motion/react"
import Link from "next/link"

// --------------------------------------------------
// Logo Sub-components
// --------------------------------------------------

interface LogoSubComponentProps {
  className?: string;
}

function LogoText({ className = "" }: LogoSubComponentProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 287 67" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <path d="M9.66211 8.62308C11.3188 8.62326 12.6621 9.96634 12.6621 11.6231V23.8535H26.3789V11.6231C26.3789 9.96622 27.7221 8.62308 29.3789 8.62308H36.04C37.6969 8.62308 39.04 9.96622 39.04 11.6231V49.2842C39.04 50.9411 37.6969 52.2842 36.04 52.2842H29.3789C27.7221 52.2842 26.3789 50.9411 26.3789 49.2842V34.0078H12.6621V49.2842C12.6621 50.9409 11.3188 52.284 9.66211 52.2842H3C1.34315 52.2842 0 50.9411 0 49.2842V11.6231C2.00379e-06 9.96622 1.34315 8.62308 3 8.62308H9.66211Z" fill="currentColor"/>
      <path d="M52.9238 14.7154C54.1433 14.7155 55.2419 15.4542 55.7021 16.5835L63.9092 36.7232L72.1172 16.5835C72.5774 15.4541 73.6758 14.7154 74.8955 14.7154H82.5654C83.9857 14.7156 84.953 16.1549 84.417 17.4703L65.1982 64.6324C64.7379 65.7617 63.6395 66.4995 62.4199 66.4996H54.75C53.3297 66.4996 52.3618 65.061 52.8974 63.7457L57.5781 52.2593L43.4014 17.4703C42.8653 16.1549 43.8335 14.7154 45.2539 14.7154H52.9238Z" fill="currentColor"/>
      <path d="M110.791 13.7C120.697 13.7002 128.728 22.5648 128.728 33.4998C128.728 44.4349 120.697 53.2994 110.791 53.2996C106.567 53.2995 102.973 51.6876 100.239 48.992V60.408C100.239 62.0901 98.8218 63.4538 97.0738 63.4539H91.7974C90.0495 63.4537 88.6325 62.0901 88.6324 60.408V17.7615C88.6325 16.0794 90.0494 14.7158 91.7974 14.7156H94.4947C95.7139 14.7156 96.8125 15.4538 97.273 16.5828L98.6128 19.868C101.473 16.0689 105.67 13.7001 110.791 13.7ZM108.68 24.8689C104.018 24.8691 100.24 28.7334 100.24 33.4998C100.24 38.2663 104.018 42.1305 108.68 42.1307C113.342 42.1304 117.122 38.2663 117.122 33.4998C117.122 28.7334 113.342 24.8692 108.68 24.8689Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M152.469 13.7C163.249 13.7 171.989 21.5494 171.989 32.4846C171.989 33.4365 172.023 33.5197 171.886 35.2282C171.804 36.2614 170.936 37.0538 169.9 37.0538H144.555C144.555 40.1 148.571 43.1461 153.524 43.1461C157.045 43.1461 159.861 42.0721 161.448 40.0567C161.886 39.501 162.746 39.3605 163.232 39.8749L167.668 44.5759C167.997 44.9248 168.034 45.46 167.738 45.837C164.161 50.3853 158.65 53.3 152.469 53.3C141.688 53.3 132.949 44.4352 132.949 33.5C132.949 22.5648 141.688 13.7 152.469 13.7ZM152.469 23.3462C148.776 23.3462 145.61 25.3769 145.61 28.9308H159.327C159.327 25.3769 156.162 23.3462 152.469 23.3462Z" fill="currentColor"/>
      <path d="M196.785 13.7C208.148 13.7 217.36 22.5647 217.36 33.4998C217.36 44.435 208.148 53.2996 196.785 53.2996C185.421 53.2995 176.21 44.435 176.21 33.4998C176.21 22.5647 185.421 13.7001 196.785 13.7ZM196.785 23.8543C191.832 23.8544 187.816 28.1725 187.816 33.4998C187.816 38.8272 191.832 43.1462 196.785 43.1463C201.738 43.1463 205.754 38.8272 205.754 33.4998C205.753 28.1725 201.738 23.8543 196.785 23.8543Z" fill="currentColor"/>
      <path d="M252.718 8.62308C253.124 8.62308 253.49 8.8681 253.644 9.24319L271.176 51.92C271.446 52.578 270.963 53.2998 270.251 53.2998H260.516C260.121 53.2997 259.764 53.0676 259.603 52.7071L256.892 46.6201C256.731 46.2595 256.374 46.0275 255.979 46.0274H241.082C240.687 46.0274 240.329 46.2594 240.168 46.6201L237.457 52.7071C237.297 53.0676 236.939 53.2998 236.544 53.2998H226.809C226.097 53.2998 225.614 52.578 225.884 51.92L243.417 9.24319C243.571 8.86811 243.937 8.62308 244.342 8.62308H252.718ZM249.462 25.5606C249.131 24.7114 247.93 24.7114 247.599 25.5606L244.202 34.2735C243.947 34.9291 244.431 35.6367 245.135 35.6367H251.926C252.63 35.6366 253.113 34.929 252.858 34.2735L249.462 25.5606Z" fill="currentColor"/>
      <rect x="274.338" y="15.7308" width="12.6618" height="37.5692" rx="2" fill="currentColor"/>
      <rect x="274.338" y="0.5" width="12.6618" height="11.1692" rx="2" fill="currentColor"/>
    </motion.svg>
  )
}

function LogoIcon({ className = "" }: LogoSubComponentProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 73 71" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <path d="M12.5 46C19.4036 46 25 51.5964 25 58.5C25 65.4036 19.4036 71 12.5 71C5.59644 71 0 65.4036 0 58.5C0 51.5964 5.59644 46 12.5 46ZM13 0C19.6274 0 25 5.37258 25 12V21C25 27.6274 30.3726 33 37 33H61C67.6274 33 73 38.3726 73 45V59C73 65.6274 67.6274 71 61 71H60C53.3726 71 48 65.6274 48 59V49C48 42.9249 43.0751 38 37 38H12C5.37258 38 0 32.6274 0 26V12C0 5.37258 5.37258 0 12 0H13ZM60.5 0C67.4036 0 73 5.59644 73 12.5C73 19.4036 67.4036 25 60.5 25C53.5964 25 48 19.4036 48 12.5C48 5.59644 53.5964 0 60.5 0Z" fill="currentColor"/>
    </motion.svg>
  )
}

// --------------------------------------------------
// Logo Component Interface
// --------------------------------------------------

export interface LogoProps {
  hasText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'compact' | 'stacked';
  animate?: boolean;
  className?: string;
  href?: string; // Simple href prop for linking
}

// --------------------------------------------------
// Logo Component
// --------------------------------------------------

export function Logo({
  hasText = true,
  size = 'md',
  variant = 'default',
  animate = true,
  className = '',
  href,
}: LogoProps) {
  
  // --------------------------------------------------
  // Size Configuration
  // --------------------------------------------------
  
  const logo_sizes = {
    sm: {
      icon: 'w-6 h-6',      // 24px icon
      text: 'h-3',          // 12px text height
      gap: 'gap-1.5',       // 6px gap
    },
    md: {
      icon: 'w-8 h-8',      // 32px icon  
      text: 'h-4',          // 16px text height
      gap: 'gap-2',         // 8px gap
    },
    lg: {
      icon: 'w-12 h-12',    // 48px icon
      text: 'h-6',          // 24px text height
      gap: 'gap-3',         // 12px gap
    },
    xl: {
      icon: 'w-16 h-16',    // 64px icon
      text: 'h-8',          // 32px text height
      gap: 'gap-4',         // 16px gap
    },
  };

  // --------------------------------------------------
  // Animation Variants
  // --------------------------------------------------
  
  const container_variants = {
    expanded: {
      width: 'auto',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      }
    },
    compact: {
      width: 'auto',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    }
  };

  const text_variants = {
    hidden: {
      opacity: 0,
      width: 0,
      x: -20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      width: 'auto',
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  const icon_variants = {
    stable: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    emphasized: {
      scale: hasText ? 1 : 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // --------------------------------------------------
  // Logo Content Function
  // --------------------------------------------------
  
  const renderLogoContent = () => {
    if (variant === 'stacked') {
      return (
        <motion.div
          className={`flex flex-col items-center ${logo_sizes[size].gap} ${className}`}
          variants={animate ? container_variants as Variants : {}}
          animate={hasText ? 'expanded' : 'compact'}
        >
          <motion.div
            className={`${logo_sizes[size].icon} text-primary flex-shrink-0`}
            variants={animate ? icon_variants as Variants : {}}
            animate="emphasized"
          >
            <LogoIcon className="w-full h-full" />
          </motion.div>
          
          <AnimatePresence mode="wait">
            {hasText && (
              <motion.div
                className={`${logo_sizes[size].text} text-primary overflow-hidden`}
                variants={animate ? text_variants as Variants : {}}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
              >
                <LogoText className="w-full h-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    if (variant === 'compact') {
      return (
        <motion.div
          className={`inline-flex items-center ${className}`}
          whileHover={animate ? { scale: 1.02 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            className={`${logo_sizes[size].icon} text-primary flex-shrink-0`}
            variants={animate ? icon_variants as Variants : {}}
            animate="emphasized"
          >
            <LogoIcon className="w-full h-full" />
          </motion.div>
          
          <AnimatePresence>
            {hasText && (
              <motion.div
                className={`ml-2 ${logo_sizes[size].text} text-primary overflow-hidden`}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                <LogoText className="w-full h-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    // Default variant
    return (
      <motion.div
        className={`flex items-center ${logo_sizes[size].gap} ${className}`}
        variants={animate ? container_variants as Variants : {}}
        animate={hasText ? 'expanded' : 'compact'}
        layout
      >
        <motion.div
          className={`${logo_sizes[size].icon} text-primary flex-shrink-0`}
          variants={animate ? icon_variants as Variants : {}}
          animate="emphasized"
        >
          <LogoIcon className="w-full h-full" />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {hasText && (
            <motion.div
              className={`${logo_sizes[size].text} text-primary overflow-hidden`}
              variants={animate ? text_variants as Variants : {}}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
            >
              <LogoText className="w-full h-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // --------------------------------------------------
  // Render with optional Link wrapper
  // --------------------------------------------------
  
  if (href) {
    return (
      <Link 
        href={href}
        className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded"
      >
        {renderLogoContent()}
      </Link>
    );
  }

  return renderLogoContent();
}
