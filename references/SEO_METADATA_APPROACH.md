# SEO Metadata Approach

Based on reference: [kaw393939/eaikw](https://github.com/kaw393939/eaikw)  
**Lighthouse SEO Score: 100/100**

## Core SEO Strategy

1. **Semantic HTML** - Proper document structure
2. **Meta tags** - Title, description, Open Graph, Twitter Cards
3. **Structured data** - Schema.org JSON-LD
4. **Sitemap & robots.txt** - Crawlability
5. **Performance** - Fast loading affects rankings

---

## 1. HTML Document Structure

### Base Template (`src/_layouts/base.njk`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Title (50-60 characters ideal) -->
  <title>{% if title %}{{ title }} | {% endif %}{{ site.title }}</title>
  
  <!-- Meta Description (150-160 characters) -->
  <meta 
    name="description" 
    content="{{ description or site.description }}"
  >
  
  <!-- Canonical URL (prevent duplicate content) -->
  <link 
    rel="canonical" 
    href="{{ page.url | url | absoluteUrl(site.url) }}"
  >
  
  <!-- Open Graph (social media) -->
  <meta property="og:title" content="{% if title %}{{ title }}{% else %}{{ site.title }}{% endif %}">
  <meta property="og:description" content="{{ description or site.description }}">
  <meta property="og:url" content="{{ page.url | url | absoluteUrl(site.url) }}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="{{ site.url }}/images/og-default.jpg">
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{% if title %}{{ title }}{% else %}{{ site.title }}{% endif %}">
  <meta name="twitter:description" content="{{ description or site.description }}">
  <meta name="twitter:image" content="{{ site.url }}/images/og-default.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  {{ content | safe }}
</body>
</html>
```

---

## 2. Homepage SEO

### File: `src/index.njk`

```yaml
---
layout: base.njk
title: "MyWebClass.org | Design Education Platform"
description: "Learn design principles through interactive galleries, student submissions, and expert-curated content. Explore Bauhaus, Minimalism, Neo-Futurism and more."
---
```

**Homepage meta description best practices:**
- Include primary keywords
- Show value proposition
- Mention key features/benefits
- 150-160 characters
- Compelling call-to-action feel

**Example from reference:**
```
Director of Enterprise AI at NJIT building the future of AI education. 
23 years experience, 10,000+ students. Honest conversations about AI's 
real impact on jobs, education, and society.
```

---

## 3. Blog Post SEO

### Post Frontmatter

```yaml
---
layout: post.njk
title: "Understanding Bauhaus Design Principles"
description: "Explore the revolutionary Bauhaus movement that shaped modern design with its focus on form, function, and simplicity."
date: 2025-12-10
keywords: "Bauhaus, design principles, modernism, form follows function, design education"
tags:
  - blog
  - design-history
  - bauhaus
author: "Your Name"
image: "/images/blog/bauhaus-principles.jpg"
imageAlt: "Geometric shapes demonstrating Bauhaus design principles with primary colors and bold typography"
---
```

### Post Template with Schema.org

```html
<!-- src/_layouts/post.njk -->
{% extends "base.njk" %}

{% block head %}
<!-- Article-specific meta -->
<meta property="og:type" content="article">
<meta property="og:article:published_time" content="{{ date | dateToISO }}">
<meta property="og:article:author" content="{{ author }}">
{% if image %}
<meta property="og:image" content="{{ site.url }}{{ image }}">
<meta name="twitter:image" content="{{ site.url }}{{ image }}">
{% endif %}

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ title }}",
  "description": "{{ description }}",
  "author": {
    "@type": "Person",
    "name": "{{ author or site.author.name }}"
  },
  "datePublished": "{{ date | dateToISO }}",
  "dateModified": "{{ updated or date | dateToISO }}",
  "publisher": {
    "@type": "Organization",
    "name": "{{ site.title }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ site.url }}/images/logo.png"
    }
  },
  {% if image %}
  "image": {
    "@type": "ImageObject",
    "url": "{{ site.url }}{{ image }}",
    "width": 1200,
    "height": 630
  },
  {% endif %}
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ page.url | url | absoluteUrl(site.url) }}"
  },
  {% if keywords %}
  "keywords": "{{ keywords }}",
  {% endif %}
  {% if tags %}
  "articleSection": "{{ tags[1] or 'General' }}"
  {% endif %}
}
</script>

<!-- Breadcrumb Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{ site.url }}/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "{{ site.url }}/blog/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{ title }}",
      "item": "{{ page.url | url | absoluteUrl(site.url) }}"
    }
  ]
}
</script>
{% endblock %}

{% block content %}
<article>
  <header>
    <h1>{{ title }}</h1>
    <time datetime="{{ date | dateToISO }}">
      {{ date | readableDate }}
    </time>
  </header>
  
  <div class="prose">
    {{ content | safe }}
  </div>
</article>
{% endblock %}
```

---

## 4. Schema.org Structured Data

### Organization Schema

```html
<!-- Add to base layout footer -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MyWebClass.org",
  "url": "https://mywebclass.org",
  "logo": "https://mywebclass.org/images/logo.png",
  "description": "Design education platform for learning modern design principles",
  "sameAs": [
    "https://twitter.com/mywebclass",
    "https://github.com/mywebclass"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@mywebclass.org",
    "contactType": "General Inquiry"
  }
}
</script>
```

### WebSite Schema (for search box)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MyWebClass.org",
  "url": "https://mywebclass.org",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://mywebclass.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### Person Schema (for author pages)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "url": "https://mywebclass.org/about/",
  "image": "https://mywebclass.org/images/avatar.jpg",
  "jobTitle": "Design Educator",
  "worksFor": {
    "@type": "Organization",
    "name": "MyWebClass.org"
  },
  "sameAs": [
    "https://twitter.com/yourhandle",
    "https://linkedin.com/in/yourprofile"
  ]
}
</script>
```

---

## 5. Sitemap & Robots

### Sitemap Template (`src/sitemap.njk`)

```njk
---
permalink: /sitemap.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {%- for page in collections.all %}
  {%- if not page.data.excludeFromSitemap %}
  <url>
    <loc>{{ page.url | url | absoluteUrl(site.url) }}</loc>
    <lastmod>{{ page.date | dateToISO }}</lastmod>
    <changefreq>{% if '/blog/' in page.url %}weekly{% else %}monthly{% endif %}</changefreq>
    <priority>{% if page.url == '/' %}1.0{% elif '/blog/' in page.url %}0.8{% else %}0.5{% endif %}</priority>
  </url>
  {%- endif %}
  {%- endfor %}
</urlset>
```

### Robots.txt (`src/robots.njk`)

```njk
---
permalink: /robots.txt
eleventyExcludeFromCollections: true
---
User-agent: *
Allow: /

Sitemap: {{ site.url }}/sitemap.xml
```

**To exclude pages from sitemap:**
```yaml
---
title: Admin Page
excludeFromSitemap: true
---
```

---

## 6. Image SEO

### Image Optimization Checklist

- [ ] **Alt text** - Descriptive, 100-125 characters
- [ ] **File names** - Descriptive, kebab-case (e.g., `bauhaus-design-example.jpg`)
- [ ] **File size** - Compressed (use WebP, optimized JPG/PNG)
- [ ] **Dimensions** - Appropriate size (don't serve 4000px image for 400px display)
- [ ] **Lazy loading** - `loading="lazy"` for below-fold images
- [ ] **Width/height** - Prevent layout shift

### Example Implementation

```html
<img 
  src="/images/bauhaus-design-example.webp"
  alt="Bauhaus poster featuring geometric shapes in primary colors with bold sans-serif typography"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
>
```

### Open Graph Images

**Dimensions:** 1200x630px  
**Format:** JPG or PNG  
**Size:** < 1MB

```html
<meta property="og:image" content="{{ site.url }}/images/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="MyWebClass.org - Design Education Platform">
```

---

## 7. Keywords Strategy

### Keyword Research & Implementation

**Where to place keywords:**
1. Page title (most important)
2. Meta description
3. H1 heading
4. First paragraph
5. Subheadings (H2, H3)
6. Image alt text
7. URL slug
8. Internal link anchor text

### Example: Blog Post Optimization

```yaml
---
# URL: /blog/bauhaus-design-principles/
title: "Bauhaus Design Principles: Form Follows Function"  # Keyword in title
description: "Learn the core Bauhaus design principles that revolutionized modern architecture and graphic design. Explore form, function, and minimalism."  # Keywords naturally
keywords: "Bauhaus, design principles, form follows function, minimalism, modern design, Bauhaus movement"
---
```

```markdown
# Bauhaus Design Principles: Form Follows Function

The **Bauhaus movement** revolutionized modern design with its emphasis 
on **form follows function**. This article explores the core **Bauhaus 
principles** that continue to influence contemporary design.

## The Foundation of Bauhaus Design

The Bauhaus school, founded in 1919 by Walter Gropius, introduced 
**minimalist design principles** that prioritized functionality...
```

**Keyword density:** 1-2% (natural, not forced)

---

## 8. Internal Linking Strategy

### Linking Best Practices

```html
<!-- ❌ Bad: Generic anchor text -->
<a href="/blog/bauhaus/">Click here</a> to learn about Bauhaus.

<!-- ✅ Good: Descriptive anchor text -->
Learn about <a href="/blog/bauhaus/">Bauhaus design principles</a> and 
their influence on modern architecture.

<!-- ✅ Good: Contextual internal links -->
<p>
  The <a href="/gallery/bauhaus/">Bauhaus gallery</a> showcases student 
  submissions that demonstrate these <a href="/blog/bauhaus-principles/">
  core principles</a> in action.
</p>
```

### Related Posts Component

```html
<!-- In blog post template -->
{% if relatedPosts %}
<aside class="related-posts">
  <h2>Related Reading</h2>
  <ul>
    {% for post in relatedPosts %}
    <li>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
      <p>{{ post.data.description }}</p>
    </li>
    {% endfor %}
  </ul>
</aside>
{% endif %}
```

---

## 9. URL Structure

### SEO-Friendly URLs

```
✅ Good URLs:
/blog/bauhaus-design-principles/
/gallery/minimalism/
/projects/student-portfolio/
/about/

❌ Bad URLs:
/blog/post.php?id=123
/page?category=design&style=bauhaus
/article_2025_12_10_v2
```

**Best practices:**
- Use hyphens (not underscores)
- Keep it short (3-5 words max)
- Include primary keyword
- Lowercase only
- No special characters

### Eleventy Permalink Configuration

```yaml
---
# Auto-generate from title
title: "Bauhaus Design Principles"
# Results in: /blog/bauhaus-design-principles/

# Or specify custom
permalink: "/gallery/{{ title | slugify }}/"
---
```

---

## 10. RSS Feed for SEO

### RSS Template (`src/feed.njk`)

```njk
---
permalink: /feed.xml
eleventyExcludeFromCollections: true
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ site.title }}</title>
  <subtitle>{{ site.description }}</subtitle>
  <link href="{{ site.url }}/feed.xml" rel="self"/>
  <link href="{{ site.url }}/"/>
  <updated>{{ collections.blog[0].date | dateToISO }}</updated>
  <id>{{ site.url }}/</id>
  <author>
    <name>{{ site.author.name }}</name>
    <email>{{ site.author.email }}</email>
  </author>
  
  {%- for post in collections.blog | limit(20) %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ post.url | url | absoluteUrl(site.url) }}"/>
    <updated>{{ post.date | dateToISO }}</updated>
    <id>{{ post.url | url | absoluteUrl(site.url) }}</id>
    <content type="html">{{ post.templateContent | htmlToAbsoluteUrls(site.url) }}</content>
  </entry>
  {%- endfor %}
</feed>
```

**Add to `<head>`:**
```html
<link 
  rel="alternate" 
  type="application/atom+xml" 
  title="{{ site.title }} Feed" 
  href="/feed.xml"
>
```

---

## 11. Performance & SEO

### Core Web Vitals

**Largest Contentful Paint (LCP):** < 2.5s  
**First Input Delay (FID):** < 100ms  
**Cumulative Layout Shift (CLS):** < 0.1

### Quick Wins

```html
<!-- Preload critical resources -->
<link rel="preload" href="/css/main.css" as="style">
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- Async non-critical CSS -->
<link 
  rel="stylesheet" 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" 
  media="print" 
  onload="this.media='all'"
>

<!-- Image optimization -->
<img 
  src="/images/hero.webp" 
  width="1200" 
  height="600"
  loading="lazy"
  decoding="async"
>

<!-- Minimize render-blocking JS -->
<script src="/js/main.js" defer></script>
```

---

## 12. SEO Testing Checklist

### Pre-Launch Checks

- [ ] **Title tags** - Unique, 50-60 chars, keyword-rich
- [ ] **Meta descriptions** - Unique, 150-160 chars, compelling
- [ ] **Headings** - Proper hierarchy (H1 → H2 → H3)
- [ ] **Images** - Alt text, optimized file sizes
- [ ] **Internal links** - Descriptive anchor text
- [ ] **URLs** - SEO-friendly, descriptive
- [ ] **Mobile-friendly** - Responsive design
- [ ] **Page speed** - LCP < 2.5s
- [ ] **Sitemap** - Generated and submitted to Google
- [ ] **Robots.txt** - Properly configured
- [ ] **Canonical tags** - Prevent duplicate content
- [ ] **Schema markup** - BlogPosting, Organization, Breadcrumb
- [ ] **HTTPS** - Secure connection
- [ ] **404 page** - Helpful, links to home/sitemap

### Testing Tools

```bash
# Google Search Console
https://search.google.com/search-console

# Lighthouse (Chrome DevTools)
F12 > Lighthouse > Run Audit

# Rich Results Test (structured data)
https://search.google.com/test/rich-results

# Mobile-Friendly Test
https://search.google.com/test/mobile-friendly

# PageSpeed Insights
https://pagespeed.web.dev/
```

---

## Key Takeaways

1. **Title & description** are most important meta tags
2. **Schema.org JSON-LD** helps search engines understand content
3. **Keywords** should be natural, not forced (1-2% density)
4. **Internal linking** distributes page authority
5. **Image optimization** includes alt text, compression, sizing
6. **URL structure** should be clean and descriptive
7. **Performance affects rankings** - optimize Core Web Vitals
8. **Sitemap & robots.txt** ensure proper crawling
9. **Mobile-first** is critical for rankings
10. **Regular content updates** signal active site

## Quick Reference: Meta Tags Priority

| Meta Tag | Priority | Character Limit |
|----------|----------|-----------------|
| `<title>` | Critical | 50-60 |
| `<meta name="description">` | Critical | 150-160 |
| `og:title` | High | 60-90 |
| `og:description` | High | 150-200 |
| `og:image` | High | 1200x630px |
| `keywords` | Low | 10-15 keywords max |
| `author` | Medium | N/A |
| `canonical` | Critical | N/A |
