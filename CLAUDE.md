# AI Code Generation - Naming Convention Specification

## Overview
This document defines naming conventions and structural patterns for generating clean, maintainable React code based on proven patterns from high-quality codebases.

## Core Naming Convention Rules

### **CRITICAL: Feature Prefix Consistency Rule**
**Every declaration within a feature section MUST use the EXACT same feature prefix. This ensures clean navigation in editor outlines and logical grouping.**

### 1. **Component State Pattern**
```javascript
// Pattern: [feature]_[property], [feature]_[setter]
const [loading_active, loading_setActive] = useState(false);
const [modal_active, modal_setActive] = useState(false);
const [toast_active, toast_setActive] = useState(false);
```

**Rule**: Use underscore separation for compound state names with descriptive suffixes.

### 2. **Handler Function Pattern**
```javascript
// Pattern: [feature]_handle[Action]
const userMenu_handleLogout = useCallback(() => {
  signOut();
}, []);

const userMenu_handleRefresh = useCallback(() => {
  // refresh logic here
}, []);
```

**Rule**: ALL handlers within a feature must use the SAME feature prefix. Never mix prefixes like `userMenu_handleLogout` and `menu_handleClose` - use consistent `userMenu_` for all related handlers.

### 3. **Toggle Function Pattern**
```javascript
// Pattern: [feature]_toggle[Suffix?]
const modal_toggleActive = useCallback(() => {
  modal_setActive(modal_active => !modal_active);
}, []);

const navigation_mobile_toggle = useCallback(() => {
  navigation_mobile_setActive(prev => !prev);
}, []);
```

**Rule**: Use `toggle` for boolean state switching functions.

### 4. **Markup/Component Pattern**
```javascript
// Pattern: [feature]_markup
const toast_markup = toast_active ? (
  <Toast onDismiss={toast_toggle} content="Changes saved" />
) : null;

const navigation_markup = (
  <Navigation location={navigation_location.pathname}>
    {/* content */}
  </Navigation>
);
```

**Rule**: All JSX components should end with `_markup` suffix.

### 5. **Feature Object Aggregation Pattern**
```javascript
const modal = {
  active: modal_active,
  setActive: modal_setActive,
  toggleActive: modal_toggleActive,
  markup: modal_markup,
};

const search = {
  active: search_active,
  value: search_value,
  field: {
    handleChange: search_field_handleChange,
    markup: search_field_markup,
  },
  results: {
    handleDismiss: search_results_handleDismiss,
    markup: search_results_markup,
  },
};
```

**Rule**: Group related functionality into feature objects with consistent property names.

## Structural Organization Rules

### 6. **Comment Section Dividers**
```javascript
// --------------------------------------------------
// Feature Name
// --------------------------------------------------
```

**Rule**: Use consistent comment blocks to separate logical sections.

### 7. **Configuration Objects**
```javascript
const logo_config = {
  width: 86,
  topBarSource: "...",
  contextualSaveBarSource: "...",
  accessibilityLabel: "Shopify",
};
```

**Rule**: Configuration objects should end with `_config` suffix.

### 8. **Nested Feature Hierarchy**
```javascript
const feature = {
  // Direct properties
  active: feature_active,
  
  // Sub-features as nested objects
  mobile: {
    active: feature_mobile_active,
    toggle: feature_mobile_toggle,
  },
  
  // Always include markup at appropriate level
  markup: feature_markup,
};
```

**Rule**: Use nested objects for sub-features while maintaining the same naming patterns.

## Specific Naming Patterns

### 9. **Action Arrays**
```javascript
const userMenu_actions = [
  {
    items: [
      { content: "Action 1" },
      { content: "Action 2", onAction: handler },
    ],
  },
];
```

**Rule**: Action collections should end with `_actions`.

### 10. **Location/Route Handling**
```javascript
const navigation_location = useLocation();
```

**Rule**: Location objects should include `_location` suffix.

### 11. **Mobile Variants**
```javascript
const [navigation_mobile_active, navigation_mobile_setActive] = useState(false);
```

**Rule**: Mobile-specific states should include `_mobile_` in the name.

## Code Generation Guidelines

### For AI Systems:
1. **Always start with feature identification** - determine the main feature being implemented
2. **Choose ONE consistent feature prefix** - use it for ALL related declarations
3. **Follow the underscore convention** - never use camelCase for compound feature names
4. **Maintain consistent suffixes**:
   - `_active` for boolean states
   - `_setActive` for boolean setters
   - `_toggle` for boolean togglers
   - `_handle[Action]` for event handlers
   - `_markup` for JSX components
   - `_config` for configuration objects
   - `_ref` for useRef declarations

5. **Group related functionality** into feature objects
6. **Use comment dividers** for each major feature section
7. **Implement proper useCallback** for all handler functions
8. **Follow the conditional markup pattern** for optional components
9. **CRITICAL: Ensure all declarations in a feature section share the same prefix**

### Required Imports Pattern:
```javascript
import { useCallback, useRef, useState } from "react";
// Other imports...
```

### Function Component Structure:
1. Props destructuring
2. Configuration objects
3. Feature sections (separated by comments)
4. Return statement

### **Corrected File Handlers Example:**
```javascript
// --------------------------------------------------
// File Handlers
// --------------------------------------------------

// ✅ CORRECT - All use same prefix 'fileHandlers_'
const fileHandlers_handleSelect = useCallback(() => {
  fileHandlers_inputRef.current?.click();
}, []);

const fileHandlers_handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  
  await fileHandlers_handleUpload(file);
  
  // Reset input
  if (fileHandlers_inputRef.current) {
    fileHandlers_inputRef.current.value = '';
  }
}, [fileHandlers_handleUpload]);

const fileHandlers_handleRemove = useCallback((fileToRemove: UploadedFile) => {
  const updatedFiles = uploadedFiles.filter(file => file.key !== fileToRemove.key);
  onFilesChange(updatedFiles);
}, [uploadedFiles, onFilesChange]);

const fileHandlers_inputRef = useRef<HTMLInputElement>(null);
```

### **Bad Example (Your Current Code):**
```javascript
// ❌ WRONG - Mixed prefixes make navigation difficult
const fileSelect_handleClick = useCallback(() => {
  fileInput_ref.current?.click();
}, []);

const fileInput_handleChange = useCallback(async (e) => {
  // Different prefix 'fileInput_' instead of 'fileSelect_'
}, []);

const fileRemove_handleClick = useCallback((fileToRemove) => {
  // Another different prefix 'fileRemove_' 
}, []);
```

❌ **Don't mix feature prefixes within the same logical section**
```javascript
// Wrong - Mixed prefixes destroy navigation grouping
const fileSelect_handleClick = useCallback(/*...*/);
const fileInput_handleChange = useCallback(/*...*/);
const fileRemove_handleClick = useCallback(/*...*/);

// Correct - Consistent prefix enables easy navigation
const fileHandlers_handleSelect = useCallback(/*...*/);
const fileHandlers_handleChange = useCallback(/*...*/);
const fileHandlers_handleRemove = useCallback(/*...*/);
```

❌ **Don't use camelCase for compound features**
```javascript
// Wrong
const [modalActive, setModalActive] = useState(false);

// Correct
const [modal_active, modal_setActive] = useState(false);
```

❌ **Don't mix naming conventions**
```javascript
// Wrong - inconsistent naming
const modalToggle = useCallback(/*...*/);
const userMenuHandleLogout = useCallback(/*...*/);

// Correct - consistent naming
const modal_toggle = useCallback(/*...*/);
const userMenu_handleLogout = useCallback(/*...*/);
```

❌ **Don't forget feature object aggregation**
```javascript
// Wrong - scattered variables
// modal_active, modal_setActive, modal_markup spread throughout

// Correct - organized in feature object
const modal = {
  active: modal_active,
  setActive: modal_setActive,
  markup: modal_markup,
};
```

## Validation Checklist

Before considering code complete, verify:
- [ ] All declarations within a feature section use the SAME prefix
- [ ] All state variables follow `[feature]_[property]` pattern
- [ ] All handlers follow `[feature]_handle[Action]` pattern
- [ ] All markup variables end with `_markup`
- [ ] All refs follow `[feature]_[element]Ref` pattern
- [ ] Feature objects are properly structured
- [ ] Comment dividers separate each feature section
- [ ] useCallback is used for all handlers
- [ ] Consistent indentation and formatting
- [ ] Editor outline shows clean grouping by feature prefix

## Editor Navigation Benefits

When following consistent prefixes:
```
Component Outline:
├── fileHandlers_handleChange
├── fileHandlers_handleRemove  
├── fileHandlers_handleSelect
├── fileHandlers_inputRef
├── modal_active
├── modal_setActive
├── modal_toggle
├── userMenu_actions
├── userMenu_handleLogout
└── userMenu_markup
```

This creates logical grouping in your editor's outline/symbol navigation, making code much easier to navigate and understand.

This specification ensures generated code maintains the same high quality and consistency as the reference implementation.

# Next.js Service Naming Convention Guide

*Inspired by "The Standard" by Hassan Habib, adapted for Next.js Frontend Development*

## Overview

This naming convention provides a standardized approach to organizing services in Next.js applications, ensuring maintainability, scalability, and team consistency while maintaining the quality standards of enterprise-level software architecture.

## Core Principles

### 1. **Service-First Architecture**
- Everything is organized as a service with clear boundaries
- Each service owns its complete functionality within its folder
- Services are self-contained and focused on a single responsibility

### 2. **Three-Layer Architecture**
```
src/services/
├── providers/     # Foundation layer - Configuration & Setup
├── foundations/   # Business Logic layer - Core functionality  
└── components/    # Presentation layer - UI components
```

### 3. **Consistent Naming Patterns**
- Interfaces: `I[ServiceName]Service.ts`
- Implementations: `[ServiceName]Service.ts`
- Types: `[serviceName].types.ts`
- Components: `[FeatureName]Selector.tsx` or `[FeatureName]Manager.tsx`

## Service Categories

### **Providers** (Foundation Layer)
Configuration and setup services that establish the application environment.

**Purpose**: Initialize and configure external libraries, contexts, and global settings.

**Naming Pattern**: `[LibraryName]Provider.tsx`

**Examples**:
```
providers/
├── app/
│   └── AppProvider.tsx
├── heroui/
│   └── HeroUIProvider.tsx
├── themes/
│   └── ThemesProvider.tsx
└── adapters/
    └── NuqsAdapter.tsx
```

### **Foundations** (Business Logic Layer)
Core business logic services that handle data processing, state management, and feature implementation.

**Purpose**: Implement feature-specific logic, data transformations, and business rules.

**Naming Pattern**: 
- Interface: `I[ServiceName]Service.ts`
- Implementation: `[ServiceName]Service.ts`
- Types: `[serviceName].types.ts`

**Examples**:
```
foundations/
├── internationalization/
│   ├── IInternationalizationService.ts
│   ├── InternationalizationService.ts
│   ├── internationalization.types.ts
│   ├── request.ts
│   ├── routing.ts
│   └── userLocale.ts
├── themes/
│   ├── IThemeService.ts
│   ├── ThemeService.ts
│   ├── theme.types.ts
│   └── useThemeMounted.tsx
└── uploads/
    ├── IUploadService.ts
    ├── UploadService.ts
    ├── upload.types.ts
    ├── handler.ts
    ├── route.ts
    └── use-upload-file.ts
```

### **Components** (Presentation Layer)
UI components that expose service functionality to users.

**Purpose**: Provide user interfaces for service interactions.

**Naming Pattern**: `[FeatureName][ComponentType].tsx`

**Examples**:
```
components/
├── internationalization/
│   └── LanguageSelector.tsx
├── themes/
│   └── ThemeSelector.tsx
└── view-modes/
    └── ViewModeSelector.tsx
```

## File Naming Conventions

### **Interface Files** (`I[ServiceName]Service.ts`)
Define the contract for service implementations.

```typescript
// IInternationalizationService.ts
export interface IInternationalizationService {
  getCurrentLocale(): string;
  setLocale(locale: string): void;
  translate(key: string, params?: Record<string, any>): string;
}
```

### **Service Implementation Files** (`[ServiceName]Service.ts`)
Implement the service interface with actual business logic.

```typescript
// InternationalizationService.ts
export class InternationalizationService implements IInternationalizationService {
  getCurrentLocale(): string {
    // Implementation
  }
  
  setLocale(locale: string): void {
    // Implementation
  }
  
  translate(key: string, params?: Record<string, any>): string {
    // Implementation
  }
}
```

### **Type Definition Files** (`[serviceName].types.ts`)
Define TypeScript types and interfaces specific to the service.

```typescript
// internationalization.types.ts
export interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
}

export interface TranslationParams {
  [key: string]: string | number;
}

export type SupportedLocale = 'en' | 'fr' | 'es' | 'ar';
```

### **Component Files** (`[FeatureName][ComponentType].tsx`)
UI components that interact with services.

```typescript
// LanguageSelector.tsx
import { IInternationalizationService } from '../../foundations/internationalization';

export const LanguageSelector: React.FC = () => {
  // Component implementation
};
```

## Folder Structure Rules

### **1. Service Ownership**
Each service folder contains ALL related functionality:
- Core service files (interface, implementation, types)
- Utility functions and helpers
- Service-specific hooks
- Configuration files
- Related components (if tightly coupled)

### **2. Folder Naming**
- Use **kebab-case** for multi-word folder names: `view-modes`, `file-uploads`
- Use **singular** form for service names: `theme`, `authentication`
- Use **plural** form only for collections: `components`, `providers`

### **3. File Organization Priority**
```
service-folder/
├── I[ServiceName]Service.ts      # 1. Interface (contract)
├── [ServiceName]Service.ts       # 2. Implementation
├── [serviceName].types.ts        # 3. Type definitions
├── [specific-functionality].ts   # 4. Specific utilities
└── use[ServiceName].tsx          # 5. React hooks (if needed)
```

## Practical Examples

### **Theme Service Structure**
```
foundations/themes/
├── IThemeService.ts              # Interface definition
├── ThemeService.ts               # Core implementation
├── theme.types.ts                # Type definitions
├── useThemeMounted.tsx           # React hook
└── themeConstants.ts             # Constants and configs
```

### **Upload Service Structure**
```
foundations/uploads/
├── IUploadService.ts             # Interface definition
├── UploadService.ts              # Core implementation  
├── upload.types.ts               # Type definitions
├── handler.ts                    # Upload handler logic
├── route.ts                      # API route configuration
└── use-upload-file.ts            # React hook for uploads
```

### **SEO Service Structure**
```
foundations/seo/
├── ISeoService.ts                # Interface definition
├── SeoService.ts                 # Core implementation
├── seo.types.ts                  # Type definitions
└── metadata.ts                   # Metadata generation utilities
```

## Implementation Guidelines

### **1. Service Interface Design**
```typescript
// Always define clear, focused interfaces
export interface IThemeService {
  // Properties
  readonly currentTheme: Theme;
  readonly availableThemes: Theme[];
  
  // Methods
  setTheme(theme: Theme): void;
  toggleTheme(): void;
  getSystemTheme(): Theme;
}
```

### **2. Service Implementation**
```typescript
// Implement interfaces with clear, testable methods
export class ThemeService implements IThemeService {
  private _currentTheme: Theme = 'light';
  
  get currentTheme(): Theme {
    return this._currentTheme;
  }
  
  setTheme(theme: Theme): void {
    this._currentTheme = theme;
    this.persistTheme(theme);
    this.applyTheme(theme);
  }
  
  private persistTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
  }
  
  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
```

### **3. Type Definitions**
```typescript
// Define comprehensive, reusable types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
```

## Best Practices

### **1. Single Responsibility**
Each service should handle one specific concern:
- ✅ `ThemeService` - manages application themes only
- ✅ `InternationalizationService` - handles translations only
- ❌ `UIService` - too broad, handles multiple concerns

### **2. Clear Dependencies**
Make service dependencies explicit:
```typescript
export class UploadService implements IUploadService {
  constructor(
    private readonly storageService: IStorageService,
    private readonly notificationService: INotificationService
  ) {}
}
```

### **3. Consistent Export Patterns**
```typescript
// Always export both interface and implementation
export { IThemeService } from './IThemeService';
export { ThemeService } from './ThemeService';
export type * from './theme.types';
```

### **4. Documentation Standards**
```typescript
/**
 * Service responsible for managing application themes
 * Handles theme switching, persistence, and system theme detection
 */
export interface IThemeService {
  /**
   * Sets the application theme and persists the choice
   * @param theme - The theme to apply ('light', 'dark', or 'system')
   */
  setTheme(theme: Theme): void;
}
```

## Migration Guide

### **From Current Structure**
```typescript
// Old structure
src/services/i18n/Provider.tsx
src/services/nextThemes/ThemeChange.tsx

// New structure  
src/services/providers/internationalization/InternationalizationProvider.tsx
src/services/components/themes/ThemeSelector.tsx
```

### **Step-by-Step Migration**
1. **Create new folder structure** following the naming conventions
2. **Move files** to appropriate locations with new names
3. **Update imports** throughout the application
4. **Add interface definitions** for each service
5. **Create type definition files** for complex services
6. **Update export/import statements** to use new paths

## Common Patterns

### **Provider Pattern**
```typescript
// providers/themes/ThemesProvider.tsx
export const ThemesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const themeService = new ThemeService();
  
  return (
    <ThemeContext.Provider value={themeService}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### **Hook Pattern**
```typescript
// foundations/themes/useTheme.ts
export const useTheme = (): IThemeService => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemesProvider');
  }
  return context;
};
```

### **Service Factory Pattern**
```typescript
// foundations/serviceFactory.ts
export class ServiceFactory {
  static createThemeService(): IThemeService {
    return new ThemeService();
  }
  
  static createInternationalizationService(): IInternationalizationService {
    return new InternationalizationService();
  }
}
```

This naming convention ensures consistency, maintainability, and professional quality in your Next.js applications while remaining practical for frontend development needs.


# Perfect Component Code.

```tsx
import { useCallback, useRef, useState } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";

import {
  ActionList,
  ContextualSaveBar,
  FormLayout,
  Frame,
  Layout,
  LegacyCard,
  Loading,
  Navigation,
  Modal,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer, 
  TextField,
  Toast,
  TopBar,
} from "@shopify/polaris";
import { HomeIcon, OrderIcon, ChevronRightIcon } from "@shopify/polaris-icons";

import { useEtalonViews } from "./Views";
import { useStore } from "./Store";

export function AppFrame({ user, signOut }) {
  // --------------------------------------------------
  // Logo
  // --------------------------------------------------
  const logo_config = {
    width: 86,
    topBarSource:
      "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
    contextualSaveBarSource:
      "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
    accessibilityLabel: "Shopify",
  };

  const logo = {
    config: logo_config,
  };

  // --------------------------------------------------
  // Store
  // --------------------------------------------------

  const store = useStore();

  // --------------------------------------------------
  // Etalon fields
  // --------------------------------------------------

  const etalon = useEtalonViews(store);

  // --------------------------------------------------
  // Loading progress bar
  // --------------------------------------------------

  const [loading_active, loading_setActive] = useState(false);
  const loading_markup = loading_active ? <Loading /> : null;
  const loading_toggle = useCallback(
    () => loading_setActive(loading_active => !loading_active),
    [],
  );

  const loading = {
    active: loading_active,
    setActive: loading_setActive,

    toggle: loading_toggle,

    markup: loading_markup,
  };

  // --------------------------------------------------
  // Toast
  // --------------------------------------------------

  const [toast_active, toast_setActive] = useState(false);
  const toast_toggle = useCallback(
    () => toast_setActive(toast_active => !toast_active),
    [],
  );
  const toast_markup = toast_active ? (
    <Toast onDismiss={toast_toggle} content="Changes saved" />
  ) : null;

  const toast = {
    active: toast_active,
    setActive: toast_setActive,

    toggle: toast_toggle,

    markup: toast_markup,
  };

  // --------------------------------------------------
  // Modal
  // --------------------------------------------------

  const [modal_active, modal_setActive] = useState(false);

  const modal_toggleActive = useCallback(
    () => modal_setActive(modal_active => !modal_active),
    [],
  );

  const modal_markup = (
    <Modal
      open={modal_active}
      onClose={modal_toggleActive}
      title="Modal title"
      primaryAction={{
        content: "Action",
        onAction: modal_toggleActive,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Label"
            value="value"
            onChange={() => {}}
            autoComplete="off"
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );

  const modal = {
    active: modal_active,
    setActive: modal_setActive,

    toggleActive: modal_toggleActive,

    markup: modal_markup,
  };

  // --------------------------------------------------
  // TopBar - User Menu
  // --------------------------------------------------

  const [userMenu_active, userMenu_setActive] = useState(false);

  const userMenu_handleLogout = useCallback(() => {
    signOut();
  }, []);

  const userMenu_actions = [
    {
      items: [
        {
          content: user?.name,
          helpText: user?.email,
          disabled: true,
        },
      ],
    },
    {
      items: [
        { content: "Manage Account" },
        { content: "Logout", onAction: userMenu_handleLogout },
      ],
    },
  ];
  const userMenu_toggle = useCallback(
    () => userMenu_setActive(userMenu_active => !userMenu_active),
    [],
  );

  const userMenu_markup = (
    <TopBar.UserMenu
      actions={userMenu_actions}
      name="_companyName"
      detail={user.name}
      avatar={user.image}
      initials={user.initials}
      open={userMenu_active}
      onToggle={userMenu_toggle}
    />
  );

  const userMenu = {
    actions: userMenu_actions,

    active: userMenu_active,
    setActive: userMenu_setActive,

    toggle: userMenu_toggle,
    _handleLogout: userMenu_handleLogout,

    markup: userMenu_markup,
  };

  // --------------------------------------------------
  // Topbar - Search
  // --------------------------------------------------

  const [search_active, search_setActive] = useState(false);
  const [search_value, search_setValue] = useState("");

  const search_field_handleChange = useCallback((value: string) => {
    search_setValue(value);
    search_setActive(value.length > 0);
  }, []);

  const search_field_markup = (
    <TopBar.SearchField
      onChange={search_field_handleChange}
      value={search_value}
      placeholder="Search"
    />
  );

  const search_results_handleDismiss = useCallback(() => {
    search_setActive(false);
    search_setValue("");
  }, []);

  const search_results_markup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const search = {
    active: search_active,
    setActive: search_setActive,
    value: search_value,
    setValue: search_setValue,

    field: {
      handleChange: search_field_handleChange,
      markup: search_field_markup,
    },

    results: {
      handleDismiss: search_results_handleDismiss,
      markup: search_results_markup,
    },
  };

  // --------------------------------------------------
  // Topbar - Navigation
  // --------------------------------------------------
  const navigation_location = useLocation();

  const [navigation_mobile_active, navigation_mobile_setActive] =
    useState(false);

  const navigation_mobile_toggle = useCallback(
    () =>
      navigation_mobile_setActive(
        navigation_mobile_active => !navigation_mobile_active,
      ),
    [],
  );

  const navigation_markup = (
    <Navigation location={navigation_location.pathname}>
      <Navigation.Section
        separator
        title="Section 1"
        action={{
          icon: ChevronRightIcon,
          accessibilityLabel: "Contact support",
          onClick: () => {},
        }}
        items={[
          {
            label: "Home",
            icon: HomeIcon,
            exactMatch: true,
            url: "/",
          },
          {
            label: "Etalons",
            icon: OrderIcon,
            url: "/etalons",
          },
          {
            label: "Tasks",
            icon: OrderIcon,
            url: "/tasks",
          },
          {
            label: "Products",
            url: "/products",
            icon: OrderIcon,
            subNavigationItems: [
              {
                label: "Inventory",
                url: "/inventory",
              },
              {
                label: "Submenu 1.3 - Modal",
                onClick: modal.toggleActive,
                url: null, //will not change the url, undocumented feature
              },
            ],
          },
          {
            label: "Menu 2 - Loading",
            icon: OrderIcon,
            onClick: loading.toggle,
          },
        ]}
      />
    </Navigation>
  );

  const navigation = {
    mobile: {
      active: navigation_mobile_active,
      setActive: navigation_mobile_setActive,

      toggle: navigation_mobile_toggle,
    },

    markup: navigation_markup,
  };

  // --------------------------------------------------
  // Top Bar - Contextual Save Bar
  // --------------------------------------------------

  const saveBar_handleSave = useCallback(() => {
    store.ref.current.etalon = etalon.fields;
    store.setIsUnsaved(false);
    toast.setActive(true);
  }, [etalon.fields.fullName, etalon.fields.email]);

  const saveBar_handleDiscard = useCallback(() => {
    etalon.setFields({
      ...store.ref.current.etalon,
    });
    store.setIsUnsaved(false);
  }, []);

  const saveBar_markup = store.isUnsaved ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: saveBar_handleSave,
      }}
      discardAction={{
        onAction: saveBar_handleDiscard,
      }}
    />
  ) : null;

  const saveBar = {
    handleSave: saveBar_handleSave,
    handleDiscard: saveBar_handleDiscard,
    markup: saveBar_markup,
  };

  // --------------------------------------------------
  // Top Bar
  // --------------------------------------------------

  const topBar_markup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenu.markup}
      searchResultsVisible={search.active}
      searchResults={search.results.markup}
      searchField={search.field.markup}
      onSearchResultsDismiss={search.results.handleDismiss}
      onNavigationToggle={navigation.mobile.toggle}
    />
  );

  const topBar = {
    markup: topBar_markup,
  };

  // --------------------------------------------------
  // Page
  // --------------------------------------------------

  const page_loadingMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );

  const page_contentMarkup = (
    <Page title="Etalon">
      <Layout>
        <Layout.AnnotatedSection
          title="Etalon details"
          description="Etalons can use this to update Etalon information."
        >
          <LegacyCard sectioned>
            <Outlet />
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );

  const page = {
    loadingMarkup: page_loadingMarkup,
    contentMarkup: page_contentMarkup,
  };

  // --------------------------------------------------
  // Frame
  // --------------------------------------------------

  const appFrame_markup = (
    <Frame
      logo={logo.config}
      topBar={topBar.markup}
      navigation={navigation.markup}
      showMobileNavigation={navigation.mobile.active}
      onNavigationDismiss={navigation.mobile.toggle}
    >
      {saveBar.markup}
      {loading.markup}
      {loading.active ? page.loadingMarkup : page.contentMarkup}
      {toast.markup}
      {modal.markup}
    </Frame>
  );

  const appFrame = {
    markup: appFrame_markup,
  };

  return appFrame.markup;
}
```