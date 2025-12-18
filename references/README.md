# Reference Documentation Index

Reference repository: [kaw393939/eaikw](https://github.com/kaw393939/eaikw)

## Overview

This `/references` folder contains comprehensive documentation extracted from a production-ready Eleventy portfolio site that achieves:
- **100/100 Lighthouse SEO score**
- **99-100/100 Performance score**
- **91-100/100 Accessibility score**
- **100/100 Best Practices score**

All patterns and strategies documented here are based on real-world implementations that have been tested and optimized for production use.

---

## Documentation Structure

### 1. [Eleventy Configuration Patterns](./ELEVENTY_CONFIG_PATTERNS.md)

**Topics covered:**
- Core configuration structure
- Static file handling (passthrough copy)
- Essential plugins (RSS, HTML base)
- Collections pattern for content organization
- Date filters for blogs
- Content utility filters (excerpt, limit, currentYear)
- Pagination navigation filters
- Markdown configuration with anchors
- Performance optimization settings
- Complete directory configuration

**Use this when:**
- Setting up a new Eleventy project
- Creating content collections
- Building blog functionality
- Adding utility filters

---

### 2. [CSS Architecture](./CSS_ARCHITECTURE.md)

**Topics covered:**
- Design system with CSS custom properties
- Tailwind CSS configuration and optimization
- Utility class patterns for layouts
- Responsive design (mobile-first)
- Component patterns (cards, buttons, navigation)
- Print stylesheet strategy
- Font loading optimization
- Performance best practices

**Use this when:**
- Setting up Tailwind CSS
- Creating design tokens
- Building responsive components
- Optimizing CSS for production

---

### 3. [Accessibility Strategies](./ACCESSIBILITY_STRATEGIES.md)

**Topics covered:**
- Semantic HTML structure
- Accessible navigation patterns
- Focus management
- ARIA attributes and when to use them
- Form accessibility
- Image alt text strategy
- Color contrast requirements
- Keyboard navigation
- Screen reader support
- Testing procedures

**Use this when:**
- Building accessible forms
- Creating navigation menus
- Writing image alt text
- Testing accessibility compliance
- Fixing accessibility issues

---

### 4. [SEO Metadata Approach](./SEO_METADATA_APPROACH.md)

**Topics covered:**
- HTML document structure
- Meta tags (title, description, Open Graph, Twitter Cards)
- Schema.org structured data (BlogPosting, Organization, Breadcrumb)
- Sitemap and robots.txt generation
- Image SEO optimization
- Keywords strategy
- Internal linking patterns
- URL structure best practices
- RSS feed for SEO
- Performance impact on SEO
- Testing tools and checklist

**Use this when:**
- Optimizing pages for search engines
- Adding structured data
- Creating blog posts
- Setting up sitemaps
- Improving click-through rates

---

### 5. [Performance Decisions](./PERFORMANCE_DECISIONS.md)

**Topics covered:**
- Static site generation benefits
- Font loading optimization
- CSS optimization (Tailwind + PurgeCSS)
- JavaScript minimization strategy
- Image optimization (formats, lazy loading, responsive)
- Caching strategies
- Minification and compression
- DNS and connection optimization
- CDN strategy
- Build performance
- Monitoring and budgets

**Use this when:**
- Optimizing page load speed
- Reducing bundle sizes
- Setting up CDN
- Achieving high Lighthouse scores
- Creating performance budgets

---

## Quick Reference

### Common Tasks

| Task | Documentation |
|------|---------------|
| Set up Eleventy project | [Eleventy Config](./ELEVENTY_CONFIG_PATTERNS.md) |
| Create blog with pagination | [Eleventy Config](./ELEVENTY_CONFIG_PATTERNS.md) - Collections & Filters |
| Style with Tailwind CSS | [CSS Architecture](./CSS_ARCHITECTURE.md) |
| Make site accessible | [Accessibility Strategies](./ACCESSIBILITY_STRATEGIES.md) |
| Optimize for SEO | [SEO Metadata](./SEO_METADATA_APPROACH.md) |
| Improve page speed | [Performance Decisions](./PERFORMANCE_DECISIONS.md) |
| Add structured data | [SEO Metadata](./SEO_METADATA_APPROACH.md) - Schema.org |
| Optimize images | [Performance Decisions](./PERFORMANCE_DECISIONS.md) - Image Optimization |
| Write alt text | [Accessibility Strategies](./ACCESSIBILITY_STRATEGIES.md) - Images & Media |
| Create accessible forms | [Accessibility Strategies](./ACCESSIBILITY_STRATEGIES.md) - Forms |

---

## Lighthouse Score Breakdown

**From reference repository:**

| Page | Performance | Accessibility | Best Practices | SEO | Avg |
|------|-------------|---------------|----------------|-----|-----|
| Homepage | 99% | 91% | 100% | 100% | 97.5% |
| Blog Index | 100% | 96% | 100% | 100% | 99% |
| Blog Post | 99% | 96% | 100% | 100% | 98.75% |
| Projects | 99% | 96% | 100% | 100% | 98.75% |
| About | 100% | 100% | 100% | 100% | 100% |

**Average across all pages:** 99.25% Performance, 95.8% Accessibility, 100% Best Practices, 100% SEO

---

## Technology Stack

**From reference repository:**

| Category | Technology | Version |
|----------|-----------|---------|
| Static Site Generator | Eleventy | 3.x |
| Templating | Nunjucks | Latest |
| CSS Framework | Tailwind CSS | 3.x |
| CSS Processing | PostCSS | Latest |
| JavaScript | Vanilla JS | ES6+ |
| Containerization | Docker | Latest |
| CI/CD | GitHub Actions | Latest |
| Hosting | GitHub Pages + Cloudflare | N/A |

---

## Key Performance Metrics

**From reference repository:**

### Core Web Vitals
- **First Contentful Paint (FCP):** 1.4s
- **Largest Contentful Paint (LCP):** 1.4s
- **Cumulative Layout Shift (CLS):** 0.003
- **Time to Interactive (TTI):** < 2.5s
- **Total Blocking Time (TBT):** < 200ms

### Resource Sizes (Production)
- **HTML:** ~15-25KB (minified)
- **CSS:** ~10-15KB (purged + minified)
- **JavaScript:** ~2-5KB (vanilla, minified)
- **Images:** WebP format, lazy loaded
- **Total Page Weight:** ~100-200KB (first load)

---

## Implementation Priorities

### Phase 1: Foundation (Week 1)
1. Set up Eleventy configuration
2. Configure Tailwind CSS
3. Create base layout with semantic HTML
4. Set up content collections

### Phase 2: Content & SEO (Week 2)
1. Add meta tags and structured data
2. Create sitemap and robots.txt
3. Implement image optimization
4. Set up RSS feed

### Phase 3: Accessibility (Week 3)
1. Add ARIA attributes where needed
2. Ensure keyboard navigation
3. Add skip links
4. Test with screen readers
5. Verify color contrast

### Phase 4: Performance (Week 4)
1. Optimize font loading
2. Implement lazy loading
3. Set up caching headers
4. Enable compression
5. Configure CDN

### Phase 5: Testing & Launch (Week 5)
1. Run Lighthouse audits
2. Test on real devices
3. Check all links
4. Validate HTML/CSS
5. Deploy to production

---

## Additional Resources

### Reference Repository Files

Located in `/references/eaikw/`:

- **`.eleventy.js`** - Full Eleventy configuration
- **`tailwind.config.js`** - Complete Tailwind setup
- **`src/_layouts/base.njk`** - Base HTML template
- **`SEO_IMPLEMENTATION_SUMMARY.md`** - Detailed SEO changes
- **`LIGHTHOUSE_AUDIT_REPORT.md`** - Full performance audit
- **`IMAGE_ALT_TEXT_GUIDE.md`** - Comprehensive alt text guide

### External Documentation

- [Eleventy Official Docs](https://www.11ty.dev/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org Reference](https://schema.org/)
- [Web.dev Performance](https://web.dev/performance/)
- [Google Search Central](https://developers.google.com/search)

---

## Using This Documentation

### For New Projects

1. Read [Eleventy Config Patterns](./ELEVENTY_CONFIG_PATTERNS.md) first
2. Set up your CSS architecture using [CSS Architecture](./CSS_ARCHITECTURE.md)
3. Build with accessibility in mind using [Accessibility Strategies](./ACCESSIBILITY_STRATEGIES.md)
4. Optimize as you go with [Performance Decisions](./PERFORMANCE_DECISIONS.md)
5. Add SEO last using [SEO Metadata](./SEO_METADATA_APPROACH.md)

### For Existing Projects

1. Run Lighthouse audit to identify issues
2. Use relevant documentation to fix specific problems
3. Prioritize: Performance → Accessibility → SEO
4. Test after each major change
5. Monitor metrics over time

### For Learning

1. Clone the reference repository
2. Explore the code while reading documentation
3. Build small test projects implementing patterns
4. Gradually integrate into your main project
5. Customize patterns for your specific needs

---

## Contributing

If you find errors or have improvements:
1. Check the [reference repository](https://github.com/kaw393939/eaikw) for updates
2. Test changes against Lighthouse scores
3. Document your findings
4. Update relevant documentation files

---

## Version History

- **v1.0** (Dec 10, 2025) - Initial documentation from reference repository
  - Eleventy 3.x patterns
  - Tailwind CSS 3.x configuration
  - WCAG 2.1 accessibility strategies
  - Schema.org structured data
  - Core Web Vitals optimization

---

## License

Documentation based on [kaw393939/eaikw](https://github.com/kaw393939/eaikw) repository.

Reference code and documentation patterns are provided for educational purposes.
