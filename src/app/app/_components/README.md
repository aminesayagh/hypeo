# Animated Sidebar Layout

A complete sidebar layout solution with smooth animations using Framer Motion, built following the established naming conventions.

## Features

- ✅ **Smooth Animations** - Framer Motion powered with customizable easing
- ✅ **Responsive Design** - Mobile-first with desktop sidebar and mobile overlay
- ✅ **State Persistence** - Sidebar state saved to localStorage
- ✅ **Keyboard Shortcuts** - Ctrl/Cmd + B to toggle, Escape to close mobile menu
- ✅ **Accessibility** - ARIA labels, focus management, and screen reader support
- ✅ **Dark Mode Support** - Automatic theme adaptation
- ✅ **TypeScript** - Full type safety
- ✅ **Clean Architecture** - Following established naming conventions

## Installation

The components are already created in your project structure:

```
src/app/app/_components/
├── Sidebar.tsx          # Main sidebar component
├── AppLayout.tsx        # Layout wrapper with header and content
├── useSidebar.ts        # Custom hook for sidebar state management
└── index.ts             # Component exports
```

## Basic Usage

### Simple Layout

```typescript
import { AppLayout } from "./_components";

export default function AppPage() {
  return (
    <AppLayout>
      <div>Your page content here</div>
    </AppLayout>
  );
}
```

### Custom Sidebar Hook

```typescript
import { useSidebar } from "./_components";

function MyComponent() {
  const sidebar = useSidebar({
    defaultExpanded: true,
    persistKey: "my-sidebar-state"
  });

  return (
    <div>
      <button onClick={sidebar.toggle}>
        {sidebar.expanded ? "Collapse" : "Expand"}
      </button>
      <p>Sidebar is {sidebar.expanded ? "expanded" : "collapsed"}</p>
    </div>
  );
}
```

## Configuration

### Sidebar Dimensions

The sidebar uses these exact dimensions as requested:

- **Expanded**: 240px width
- **Collapsed**: 75px width
- **Animation Duration**: 0.3s with custom easing

### Animation Settings

```typescript
const layout_config = {
  sidebarCollapsedWidth: 75,
  sidebarExpandedWidth: 240,
  animationDuration: 0.3,
  animationEase: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier
  headerHeight: 64,
};
```

### Responsive Breakpoints

- **Desktop** (lg+): Fixed sidebar with toggle
- **Mobile** (<lg): Overlay sidebar with backdrop

## Keyboard Shortcuts

- **Ctrl/Cmd + B**: Toggle sidebar
- **Escape**: Close mobile menu

## Components

### 1. AppLayout

Main layout wrapper that manages sidebar state and content area.

**Props:**
```typescript
interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}
```

**Features:**
- Automatic content area resizing
- Responsive header
- Mobile menu overlay
- Keyboard shortcuts
- State persistence

### 2. Sidebar

The animated sidebar component with navigation items.

**Props:**
```typescript
interface SidebarProps {
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
}
```

**Features:**
- Smooth width animations
- Icon tooltips when collapsed
- Active navigation state
- Logo with text animation
- Toggle button

### 3. useSidebar Hook

Custom hook for managing sidebar state with persistence.

**Parameters:**
```typescript
interface UseSidebarOptions {
  defaultExpanded?: boolean;
  persistKey?: string;
}
```

**Returns:**
```typescript
{
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  mounted: boolean;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
}
```

## Customization

### Navigation Items

Edit the navigation items in `Sidebar.tsx`:

```typescript
const navigation_items = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/app/dashboard",
    active: true,
  },
  // Add more items...
];
```

### Styling

The components use Tailwind CSS. Customize appearance by:

```typescript
// Custom width values
const layout_config = {
  sidebarCollapsedWidth: 80,  // Change from 75px
  sidebarExpandedWidth: 260,  // Change from 240px
};

// Custom animation duration
const layout_config = {
  animationDuration: 0.5,     // Slower animation
};

// Custom class names
<AppLayout className="custom-layout">
  <Sidebar className="custom-sidebar" />
</AppLayout>
```

### Theme Customization

The components automatically adapt to your theme. Customize colors by modifying the Tailwind classes:

```typescript
// In Sidebar.tsx - change background colors
className="bg-white dark:bg-gray-900"

// In AppLayout.tsx - change header appearance  
className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
```

## Animation Details

### Sidebar Width Animation

```typescript
<motion.aside
  animate={{
    width: expanded ? 240 : 75,
  }}
  transition={{
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1],
  }}
>
```

### Content Area Animation

```typescript
<motion.main
  animate={{
    width: `calc(100vw - ${sidebarWidth}px)`,
    marginLeft: sidebarWidth,
  }}
  transition={{
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1],
  }}
>
```

### Text Fade Animation

```typescript
<AnimatePresence>
  {expanded && (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      Navigation Text
    </motion.span>
  )}
</AnimatePresence>
```

## Mobile Behavior

### Desktop (≥1024px)
- Fixed sidebar with smooth width animation
- Content area automatically adjusts width
- Keyboard shortcuts enabled

### Mobile (<1024px)
- Hamburger menu in header
- Full-width overlay sidebar
- Backdrop with blur effect
- Touch/click outside to close

## State Persistence

The sidebar state is automatically saved to localStorage:

```typescript
// Default key: "hypeo-sidebar-expanded"
// Custom key example:
const sidebar = useSidebar({
  persistKey: "my-app-sidebar"
});
```

## Accessibility

- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Screen reader** compatible
- **Focus management** for mobile menu
- **High contrast** support

## Browser Support

- All modern browsers
- Mobile Safari
- Chrome, Firefox, Safari, Edge
- Requires JavaScript enabled

## Performance

- **Optimized animations** with GPU acceleration
- **Minimal re-renders** with useCallback
- **Lightweight** bundle size
- **Smooth 60fps** animations

The solution provides a professional, smooth sidebar experience that perfectly matches your requirements of 75px collapsed, 240px expanded, with seamless content area animation using Framer Motion.
