# CSS Architecture & Utility Patterns

Based on reference: [kaw393939/eaikw](https://github.com/kaw393939/eaikw)

## Architecture Overview

**Approach:** Tailwind CSS + Custom CSS Variables (Swiss Design System)

### Tech Stack
- **Tailwind CSS 3.x** - Utility-first framework
- **CSS Custom Properties** - Design tokens
- **PostCSS** - Processing pipeline
- **Print Stylesheet** - Separate print media CSS

---

## 1. Design System Foundation

### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Swiss Design Color Palette */
  --swiss-white: #FFFFFF;
  --swiss-black: #000000;
  --swiss-red: #FF0000;
  
  /* Spacing Scale */
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  
  /* Typography Scale */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  
  /* Layout */
  --max-width: 1440px;
  --content-width: 65ch;
  --nav-height: 64px;
}
```

**Why this matters:**
- Single source of truth for design values
- Easy theme switching
- Consistent spacing/sizing
- Better than hardcoded values

---

## 2. Tailwind Configuration

### File: `tailwind.config.js`

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,njk,md}",
    "./src/_layouts/**/*.njk",
    "./src/_data/**/*.js"
  ],
  
  // Prevent purging of dynamic classes
  safelist: ["sticky", "top-0", "z-50"],
  
  theme: {
    extend: {
      // Custom color palette
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        neutral: {
          50: "#fafafa",
          900: "#171717",
        },
      },
      
      // Font stacks with fallbacks
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      
      // Typography plugin configuration
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.neutral.900"),
            a: {
              color: theme("colors.primary.600"),
              "&:hover": {
                color: theme("colors.primary.700"),
              },
            },
            // Remove default quote marks from inline code
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      }),
    },
  },
  
  plugins: [
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/container-queries"),
  ],
};
```

---

## 3. Utility Class Patterns

### Layout Classes

```html
<!-- Sticky Header -->
<header class="sticky top-0 z-50">

<!-- Max-width Container -->
<div class="max-w-7xl mx-auto px-4">

<!-- Flex Layouts -->
<div class="flex items-center justify-between">
<div class="flex flex-col gap-4">

<!-- Grid Layouts -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Typography Classes

```html
<!-- Headings -->
<h1 class="text-4xl md:text-5xl font-bold tracking-tight">
<h2 class="text-3xl font-semibold">
<h3 class="text-2xl font-medium">

<!-- Body Text -->
<p class="text-base leading-relaxed text-neutral-700">
<p class="text-lg font-light">

<!-- Special Text -->
<span class="text-xs uppercase tracking-wider font-bold">
<span class="font-mono text-sm">
```

### Spacing Utilities

```html
<!-- Margin/Padding -->
<div class="mt-8 mb-12 px-4 py-6">
<section class="space-y-4">    <!-- Vertical spacing between children -->
<div class="gap-6">            <!-- Gap in flex/grid -->

<!-- Responsive Spacing -->
<div class="p-4 md:p-6 lg:p-8">
```

### Color & Background

```html
<!-- Text Colors -->
<p class="text-neutral-900">
<span class="text-primary-600 hover:text-primary-700">

<!-- Backgrounds -->
<div class="bg-white">
<div class="bg-neutral-50">
<div class="bg-gradient-to-r from-primary-500 to-primary-700">
```

### Interactive States

```html
<!-- Hover Effects -->
<button class="hover:bg-primary-700 transition-colors duration-200">
<a class="hover:underline hover:text-primary-600">

<!-- Focus States (Accessibility) -->
<button class="focus:outline-none focus:ring-2 focus:ring-primary-500">
<input class="focus:border-primary-500 focus:ring-1">

<!-- Active States -->
<button class="active:scale-95 transition-transform">
```

---

## 4. Responsive Design Patterns

### Mobile-First Approach

```html
<!-- Base: Mobile, then add breakpoints -->
<div class="
  text-base          /* mobile */
  md:text-lg         /* tablet */
  lg:text-xl         /* desktop */
  xl:text-2xl        /* large desktop */
">
```

### Breakpoint Reference

| Breakpoint | Min Width | Use Case |
|------------|-----------|----------|
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small desktops |
| `xl:` | 1280px | Large desktops |
| `2xl:` | 1536px | Extra large screens |

### Hide/Show at Breakpoints

```html
<!-- Mobile menu button: show on mobile, hide on desktop -->
<button class="lg:hidden">

<!-- Desktop nav: hide on mobile, show on desktop -->
<nav class="hidden lg:flex">

<!-- Conditional columns -->
<div class="grid grid-cols-1 lg:grid-cols-3">
```

---

## 5. Component Patterns

### Card Component

```html
<article class="
  bg-white 
  border border-neutral-200 
  rounded-lg 
  p-6 
  shadow-sm 
  hover:shadow-md 
  transition-shadow 
  duration-200
">
  <h3 class="text-xl font-semibold mb-2">Card Title</h3>
  <p class="text-neutral-600 leading-relaxed">Card content...</p>
</article>
```

### Button Styles

```html
<!-- Primary Button -->
<button class="
  bg-primary-600 
  hover:bg-primary-700 
  text-white 
  font-semibold 
  py-2 px-4 
  rounded 
  transition-colors 
  duration-200
">
  Click Me
</button>

<!-- Secondary Button -->
<button class="
  bg-transparent 
  border-2 border-primary-600 
  text-primary-600 
  hover:bg-primary-50
  font-semibold 
  py-2 px-4 
  rounded
">
  Secondary
</button>
```

### Navigation Link

```html
<a class="
  font-bold 
  uppercase 
  tracking-wider 
  text-sm 
  text-neutral-900 
  hover:text-primary-600 
  transition-colors 
  duration-200
  relative
  before:absolute 
  before:bottom-0 
  before:left-0 
  before:w-0 
  before:h-0.5 
  before:bg-primary-600 
  before:transition-all
  hover:before:w-full
">
  Link Text
</a>
```

---

## 6. Print Stylesheet Pattern

### File: `src/css/print.css`

```css
@media print {
  /* Hide non-essential elements */
  .no-print,
  nav,
  footer,
  button {
    display: none !important;
  }
  
  /* Optimize for printing */
  body {
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    background: #fff;
  }
  
  /* Prevent page breaks */
  h1, h2, h3 {
    page-break-after: avoid;
  }
  
  /* Show link URLs */
  a[href]:after {
    content: " (" attr(href) ")";
  }
}
```

**Load separately:**
```html
<link rel="stylesheet" href="/css/print.css" media="print">
```

---

## 7. Performance Optimization

### Font Loading Strategy

```html
<head>
  <!-- Preconnect to font CDN -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Async font loading -->
  <link 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
    rel="stylesheet" 
    media="print" 
    onload="this.media='all'"
  >
  
  <!-- Fallback for no-JS -->
  <noscript>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </noscript>
</head>
```

**Benefits:**
- Non-blocking font loads
- Prevents layout shift
- System font fallback

---

## Key Takeaways

### Best Practices

1. **Use CSS Custom Properties** for design tokens
2. **Mobile-first** responsive design
3. **Utility-first** with Tailwind
4. **Component patterns** for consistency
5. **Performance** - async fonts, minimal CSS
6. **Accessibility** - focus states, proper contrast
7. **Print support** - separate stylesheet

### Common Utility Combinations

| Use Case | Classes |
|----------|---------|
| Centered container | `max-w-7xl mx-auto px-4` |
| Card | `bg-white border rounded-lg p-6 shadow-sm` |
| Flex center | `flex items-center justify-center` |
| Hover effect | `transition-colors duration-200 hover:bg-primary-700` |
| Focus ring | `focus:outline-none focus:ring-2 focus:ring-primary-500` |
| Text truncate | `truncate` or `line-clamp-3` |
| Sticky header | `sticky top-0 z-50` |
