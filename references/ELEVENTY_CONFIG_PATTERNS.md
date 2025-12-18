# Eleventy Configuration Patterns

Based on reference: [kaw393939/eaikw](https://github.com/kaw393939/eaikw)

## Core Configuration Structure

### File: `.eleventy.js`

```javascript
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";

export default async function (eleventyConfig) {
  // Essential patterns covered below
}
```

## 1. Static File Handling (Passthrough Copy)

**Pattern:** Copy assets without processing

```javascript
// Images and assets
eleventyConfig.addPassthroughCopy({ "src/images": "images" });
eleventyConfig.addPassthroughCopy("src/assets");

// Favicons
eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

// Special CSS (e.g., print stylesheets)
eleventyConfig.addPassthroughCopy({ "src/css/print.css": "css/print.css" });

// Deployment files
eleventyConfig.addPassthroughCopy("CNAME");
```

**Why this matters:**
- Keeps build pipeline clean
- Separates processed vs. static content
- Maintains proper output structure

---

## 2. Essential Plugins

```javascript
// HTML base URL handling (critical for deployment)
eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

// RSS feed generation
eleventyConfig.addPlugin(pluginRss);
```

**Best Practice:**
- Always use `EleventyHtmlBasePlugin` for deployment flexibility
- RSS plugin needed for blog features

---

## 3. Collections Pattern

**Purpose:** Organize content by type

```javascript
// Blog posts collection
eleventyConfig.addCollection("blog", function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
});

// Projects collection
eleventyConfig.addCollection("projects", function (collectionApi) {
  return collectionApi.getFilteredByGlob("src/projects/*.md").reverse();
});
```

**Pattern explanation:**
- `.getFilteredByGlob()` - Select files by pattern
- `.reverse()` - Newest first (for blogs)
- Returns array of page objects

---

## 4. Date Filters (Critical for Blogs)

### Readable Date Display

```javascript
eleventyConfig.addFilter("readableDate", function (date) {
  if (!date) return "Date not available";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";
  
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
```

### ISO Date for Schema.org

```javascript
eleventyConfig.addFilter("dateToISO", function (date) {
  if (!date) return new Date().toISOString();
  const d = new Date(date);
  if (isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
});
```

**Best Practice:**
- Always validate dates (null checks, NaN checks)
- Provide fallback values
- Use ISO format for structured data

---

## 5. Content Utility Filters

### Excerpt Generation

```javascript
eleventyConfig.addFilter("excerpt", function (content) {
  const excerpt = content.replace(/(<([^>]+)>)/gi, "").substring(0, 200);
  return excerpt + (excerpt.length >= 200 ? "..." : "");
});
```

**Usage:** Blog listing pages, meta descriptions

### Array Limiting

```javascript
eleventyConfig.addFilter("limit", function (array, limit) {
  return array.slice(0, limit);
});
```

**Usage:** "Recent posts", "Featured projects"

### Current Year

```javascript
eleventyConfig.addFilter("currentYear", function () {
  return new Date().getFullYear();
});
```

**Usage:** Copyright notices, "© 2025"

---

## 6. Pagination Navigation Filters

### Previous Post

```javascript
eleventyConfig.addFilter("getPreviousCollectionItem", function (collection, page) {
  if (!collection || !page) return null;
  const index = collection.findIndex((item) => item.url === page.url);
  return index > 0 ? collection[index - 1] : null;
});
```

### Next Post

```javascript
eleventyConfig.addFilter("getNextCollectionItem", function (collection, page) {
  if (!collection || !page) return null;
  const index = collection.findIndex((item) => item.url === page.url);
  return index < collection.length - 1 ? collection[index + 1] : null;
});
```

**Usage:** "← Previous Post" / "Next Post →" links

---

## 7. Markdown Configuration

```javascript
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

const markdownLib = markdownIt({
  html: true,
  breaks: false,
  linkify: true,
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.headerLink(),
  level: [2, 3],
});

eleventyConfig.setLibrary("md", markdownLib);
```

**Features enabled:**
- Automatic heading anchors
- Clickable headers
- Better navigation

---

## 8. Performance Optimization

```javascript
// Don't use .gitignore for file watching (faster)
eleventyConfig.setUseGitIgnore(false);
```

---

## 9. Complete Directory Configuration

```javascript
return {
  dir: {
    input: "src",
    output: "_site",
    includes: "_includes",
    layouts: "_layouts",
    data: "_data",
  },
  templateFormats: ["md", "njk", "html"],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
```

---

## Key Takeaways

1. **Always validate input** in filters (dates, arrays, strings)
2. **Use collections** to organize content types
3. **Add plugins** for common features (RSS, base URLs)
4. **Create utility filters** for reusable transformations
5. **Configure markdown** for better content rendering
6. **Optimize performance** with proper settings

## Common Patterns Summary

| Pattern | Use Case | Priority |
|---------|----------|----------|
| Passthrough Copy | Static assets | High |
| Collections | Content organization | High |
| Date Filters | Blog timestamps | High |
| Excerpt Filter | Previews/meta | High |
| Pagination Filters | Post navigation | Medium |
| Markdown Config | Content rendering | Medium |
| Performance tweaks | Build speed | Low |
