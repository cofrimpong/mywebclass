# Performance Optimization Decisions

Based on reference: [kaw393939/eaikw](https://github.com/kaw393939/eaikw)  
**Lighthouse Performance Score: 99-100/100**

## Performance Goals Achieved

- **First Contentful Paint (FCP):** 1.4s
- **Largest Contentful Paint (LCP):** 1.4s  
- **Cumulative Layout Shift (CLS):** 0.003
- **Time to Interactive (TTI):** < 2.5s
- **Total Blocking Time (TBT):** < 200ms

---

## 1. Static Site Generation (SSG)

### Why Eleventy?

**Decision:** Use Eleventy for static site generation

**Benefits:**
- Pre-rendered HTML at build time
- No server-side processing needed
- Instant page loads (served from CDN)
- Better security (no backend vulnerabilities)
- Cheaper hosting (static file hosting is free/cheap)

**Build Strategy:**
```bash
# Development (with live reload)
npm run dev
# Output: _site/ directory with hot reload

# Production (optimized)
npm run build:prod
# Output: Minified HTML, optimized assets
```

**Performance gain:** ~50-80% faster than server-rendered sites

---

## 2. Font Loading Optimization

### Async Font Loading

**Problem:** Web fonts block page rendering (FOIT - Flash of Invisible Text)

**Solution:** Async font loading with system font fallback

```html
<head>
  <!-- Preconnect to font CDN (DNS resolution) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload for priority -->
  <link 
    rel="preload" 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
    as="style"
  >
  
  <!-- Load async (non-blocking) -->
  <link 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
    rel="stylesheet" 
    media="print" 
    onload="this.media='all'"
  >
  
  <!-- Fallback for no-JS -->
  <noscript>
    <link 
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
      rel="stylesheet"
    >
  </noscript>
</head>
```

**CSS fallback stack:**
```css
body {
  font-family: 
    'Inter',           /* Custom font */
    'system-ui',       /* System default */
    '-apple-system',   /* macOS/iOS */
    'BlinkMacSystemFont', /* Chrome on macOS */
    'Segoe UI',        /* Windows */
    sans-serif;        /* Generic fallback */
}
```

**Performance gain:**
- FCP improvement: ~0.5-1s
- No FOIT (text visible immediately with fallback)
- `font-display: swap` prevents invisible text

---

## 3. CSS Optimization

### Strategy: Tailwind CSS with PurgeCSS

**Build process:**
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true },
        minifyFontValues: { removeQuotes: false }
      }]
    })
  ]
}
```

**Results:**
- Development: ~300KB CSS
- Production (purged): ~10-15KB CSS
- **95% reduction in CSS file size**

### Critical CSS Inlining

```html
<!-- Option 1: Preload external CSS -->
<link rel="preload" href="/css/main.css" as="style">
<link rel="stylesheet" href="/css/main.css">

<!-- Option 2: Inline critical CSS (for above-fold) -->
<style>
  /* Critical styles for header, hero */
  header { /* ... */ }
  .hero { /* ... */ }
</style>
<link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
```

**Performance gain:** LCP improves by 0.3-0.8s

---

## 4. JavaScript Optimization

### Minimal JavaScript Approach

**Philosophy:** Use vanilla JavaScript, no frameworks

**Example: Mobile menu (vanilla JS)**
```javascript
// /src/js/main.js
const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');

menuButton?.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !isExpanded);
  mobileMenu.classList.toggle('hidden');
});

// Total JS: ~2KB minified
```

**Compare to frameworks:**
- React: ~40KB (min+gzip)
- Vue: ~30KB (min+gzip)
- Vanilla: ~2KB
- **95% smaller bundle**

### Defer Non-Critical JavaScript

```html
<!-- Defer: Download in parallel, execute after HTML parsed -->
<script src="/js/main.js" defer></script>

<!-- Async: Download and execute ASAP (for analytics) -->
<script src="/js/analytics.js" async></script>

<!-- Inline critical JS (rarely needed) -->
<script>
  // Theme switcher, etc.
</script>
```

**Performance gain:** TBT reduced by 100-200ms

---

## 5. Image Optimization

### Multi-Format Strategy

**Format decisions:**
- **WebP:** Modern browsers (90%+ support)
- **AVIF:** Newer, better compression (limited support)
- **JPG/PNG:** Fallback for old browsers

```html
<picture>
  <source 
    srcset="/images/hero.avif" 
    type="image/avif"
  >
  <source 
    srcset="/images/hero.webp" 
    type="image/webp"
  >
  <img 
    src="/images/hero.jpg" 
    alt="Hero image"
    width="1200"
    height="600"
    loading="lazy"
    decoding="async"
  >
</picture>
```

### Eleventy Image Plugin

```javascript
// .eleventy.js
import Image from "@11ty/eleventy-img";

eleventyConfig.addShortcode("image", async function(src, alt, sizes = "100vw") {
  const metadata = await Image(src, {
    widths: [400, 800, 1200],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/images/",
    urlPath: "/images/"
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
});
```

**Usage in templates:**
```njk
{% image "src/images/hero.jpg", "Hero image", "(min-width: 1024px) 1200px, 100vw" %}
```

**Performance gain:**
- 50-80% file size reduction (WebP vs JPG)
- Responsive images save bandwidth on mobile

### Lazy Loading

```html
<!-- Native lazy loading -->
<img 
  src="/images/below-fold.jpg" 
  loading="lazy"    <!-- Only load when near viewport -->
  decoding="async"  <!-- Decode off main thread -->
>

<!-- Above-fold images: eager loading -->
<img 
  src="/images/hero.jpg" 
  loading="eager"   <!-- Load immediately -->
>
```

**Performance gain:** Initial page load 30-50% faster

---

## 6. Caching Strategy

### HTTP Caching Headers

**For static assets (CSS, JS, images):**
```
Cache-Control: public, max-age=31536000, immutable
# 1 year cache, file won't change (use cache busting)
```

**For HTML pages:**
```
Cache-Control: public, max-age=3600, must-revalidate
# 1 hour cache, check for updates
```

**Implementation (Nginx):**
```nginx
# nginx.conf
location ~* \.(jpg|jpeg|png|webp|avif|svg|css|js|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location / {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

### Cache Busting

**Strategy:** Content hash in filename

```javascript
// Example with esbuild
esbuild.build({
  entryPoints: ['src/js/main.js'],
  bundle: true,
  minify: true,
  entryNames: '[name].[hash]',  // main.a1b2c3d4.js
  outdir: '_site/js'
});
```

**Template reference:**
```html
<link rel="stylesheet" href="/css/main.{{ cssHash }}.css">
<script src="/js/main.{{ jsHash }}.js" defer></script>
```

---

## 7. Minification & Compression

### HTML Minification

```javascript
// .eleventy.js
import htmlmin from "html-minifier-terser";

eleventyConfig.addTransform("htmlmin", function(content) {
  if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    });
  }
  return content;
});
```

**Results:**
- ~20-30% HTML file size reduction
- Faster parsing

### Gzip/Brotli Compression

**Server configuration (Nginx):**
```nginx
# Gzip
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;

# Brotli (better compression than gzip)
brotli on;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

**Compression comparison:**
| File | Original | Gzip | Brotli |
|------|----------|------|--------|
| main.css | 100KB | 20KB | 15KB |
| main.js | 50KB | 12KB | 9KB |

**Performance gain:** 70-85% transfer size reduction

---

## 8. DNS & Connection Optimization

### Resource Hints

```html
<head>
  <!-- DNS Prefetch: Resolve domain early -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  
  <!-- Preconnect: DNS + TCP + TLS handshake -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload: High-priority resource -->
  <link rel="preload" href="/css/main.css" as="style">
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Prefetch: Low-priority, likely next navigation -->
  <link rel="prefetch" href="/blog/">
</head>
```

**Performance gain:**
- DNS: 20-100ms saved
- Preconnect: 100-300ms saved
- Preload: 200-500ms saved (for critical resources)

---

## 9. Build Performance

### Eleventy Build Optimization

```javascript
// .eleventy.js
export default async function(eleventyConfig) {
  // Disable .gitignore parsing (faster)
  eleventyConfig.setUseGitIgnore(false);
  
  // Incremental builds (watch mode)
  eleventyConfig.setWatchThrottleWaitTime(100);
  
  // Passthrough copy (no processing)
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}
```

**Build times:**
- Development (incremental): ~100-200ms
- Production (full): ~2-5s
- **90% faster than full rebuilds**

---

## 10. CDN Strategy

### GitHub Pages + Cloudflare

**Setup:**
1. Build static site → `_site/`
2. Deploy to GitHub Pages
3. Add Cloudflare in front (free plan)

**Benefits:**
- **Edge caching** - Content served from nearest location
- **DDoS protection** - Cloudflare's network
- **SSL/TLS** - Free HTTPS
- **HTTP/2** - Multiplexing, faster loading

**Performance gain:**
- TTFB (Time to First Byte): 50-200ms (vs 500-1000ms without CDN)
- Global latency: <100ms from anywhere

### CDN Configuration

```yaml
# Cloudflare Page Rules
/*
  Cache Level: Standard
  Browser Cache TTL: 4 hours
  Edge Cache TTL: 1 day
  
/images/*
  Cache Level: Cache Everything
  Edge Cache TTL: 1 month
  
/css/*
/js/*
  Cache Level: Cache Everything
  Edge Cache TTL: 1 year
```

---

## 11. Monitoring & Measurement

### Performance Budget

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      staticDistDir: './_site',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        
        // Resource budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 50000 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 20000 }],
        'resource-summary:image:size': ['error', { maxNumericValue: 200000 }],
      },
    },
  },
};
```

### Real User Monitoring (RUM)

```html
<!-- Web Vitals tracking -->
<script type="module">
import { onCLS, onFID, onLCP } from 'https://unpkg.com/web-vitals@3/dist/web-vitals.js';

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  const body = JSON.stringify(metric);
  navigator.sendBeacon('/analytics', body);
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
</script>
```

---

## 12. Performance Checklist

### Pre-Launch Audit

- [ ] **Lighthouse Score** - 90+ in all categories
- [ ] **Core Web Vitals**
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] **Assets**
  - [ ] Images optimized (WebP, lazy loading)
  - [ ] CSS minified and purged (< 20KB)
  - [ ] JS minified and deferred (< 50KB)
  - [ ] Fonts async loaded
- [ ] **Caching**
  - [ ] HTTP cache headers configured
  - [ ] CDN enabled
  - [ ] Compression enabled (gzip/brotli)
- [ ] **HTML**
  - [ ] Minified in production
  - [ ] Resource hints added
  - [ ] No render-blocking resources
- [ ] **Mobile**
  - [ ] Responsive images with srcset
  - [ ] Touch targets 44x44px minimum
  - [ ] No horizontal scrolling

---

## Performance Optimization Priority

| Priority | Optimization | Impact | Effort |
|----------|--------------|--------|--------|
| 🔴 Critical | Static site generation | High | Low |
| 🔴 Critical | Image optimization | High | Medium |
| 🔴 Critical | Async fonts | High | Low |
| 🟡 High | CSS purging/minification | Medium | Low |
| 🟡 High | CDN setup | High | Medium |
| 🟡 High | Lazy loading images | Medium | Low |
| 🟢 Medium | JavaScript minification | Low | Low |
| 🟢 Medium | Resource hints | Low | Low |
| 🔵 Low | HTTP/2 server push | Low | High |

---

## Key Takeaways

1. **Static generation** is the single biggest performance win
2. **Images** are usually the largest performance bottleneck
3. **Fonts** should load async with system font fallbacks
4. **CSS** should be purged and minified (Tailwind + PostCSS)
5. **JavaScript** should be minimal and deferred
6. **CDN** dramatically improves global performance
7. **Compression** (Brotli) reduces transfer sizes 70-85%
8. **Caching** strategy is critical for repeat visitors
9. **Monitoring** ensures performance doesn't regress
10. **Budget** prevents bloat over time

## Quick Wins (< 1 hour)

1. Add `loading="lazy"` to below-fold images
2. Defer JavaScript with `defer` attribute
3. Async load web fonts
4. Add `width` and `height` to images (prevent CLS)
5. Minify HTML in production
6. Enable gzip/brotli compression
7. Add resource hints (`preconnect`, `dns-prefetch`)
8. Convert images to WebP format

These optimizations typically result in:
- **20-40% faster page loads**
- **50-70% smaller page size**
- **90+ Lighthouse scores**
