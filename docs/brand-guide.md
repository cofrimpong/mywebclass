# Brand Guide - MyWebClass.org

## Brand Overview

### Mission Statement
MyWebClass.org is a digital museum of web design, teaching design history through authentic, high-fidelity examples that students can study, submit to, and learn from.

### Vision
To become the definitive educational resource for understanding design styles through live, interactive web demonstrations—bridging historical design movements with modern web development.

### Brand Values
- **Authenticity** - Every design style is historically accurate
- **Accessibility** - Design education for everyone
- **Clarity** - Complex concepts explained simply
- **Excellence** - High standards for submissions and content
- **Community** - Students, instructors, and designers learning together

### Brand Personality
- **Tone:** Knowledgeable but approachable
- **Voice:** Educational, clear, enthusiastic
- **Style:** Modern yet respectful of design history
- **Emotion:** Inspiring, trustworthy, professional

---

## Logo & Identity

### Primary Logo
```
┌─────────────────────────────┐
│                             │
│   MyWebClass.org            │
│   ━━━━━━━━━━━━━             │
│   Design Styles Museum      │
│                             │
└─────────────────────────────┘
```

**Specifications:**
- **Typeface:** Inter (Display), sans-serif
- **Weight:** 700 (Bold) for "MyWebClass.org"
- **Weight:** 400 (Regular) for tagline
- **Size Ratio:** 2:1 (wordmark to tagline)
- **Line Element:** Swiss-inspired horizontal rule

### Logo Variations

**Primary (Dark on Light):**
- Black text (#000000)
- White or light gray background (#FFFFFF or #F5F5F5)

**Inverted (Light on Dark):**
- White text (#FFFFFF)
- Black or dark background (#0A0A0F)

**Monochrome:**
- Single color variations for special use cases

### Clear Space
Minimum clear space around logo: **X** (where X = height of "M" in MyWebClass)

### Minimum Size
- Digital: 180px wide
- Print: 1.5 inches wide

### Incorrect Usage (Don't)
- ❌ Don't rotate the logo
- ❌ Don't change typeface
- ❌ Don't add effects (shadows, gradients, outlines)
- ❌ Don't distort proportions
- ❌ Don't place on busy backgrounds

---

## Color Palette

### Primary Colors

**Neutral Black**
- HEX: `#000000`
- RGB: `0, 0, 0`
- Usage: Body text, headings, borders
- Accessibility: AAA on white

**Pure White**
- HEX: `#FFFFFF`
- RGB: `255, 255, 255`
- Usage: Backgrounds, negative space
- Accessibility: AAA with black text

**Accent Blue** (Primary CTA)
- HEX: `#0057B8`
- RGB: `0, 87, 184`
- Usage: Links, primary buttons, highlights
- Accessibility: AA on white

### Secondary Colors

**Light Gray** (Backgrounds)
- HEX: `#F5F5F5`
- RGB: `245, 245, 245`
- Usage: Card backgrounds, subtle sections

**Medium Gray** (Secondary Text)
- HEX: `#666666`
- RGB: `102, 102, 102`
- Usage: Captions, metadata, secondary info

**Dark Gray** (Borders)
- HEX: `#CCCCCC`
- RGB: `204, 204, 204`
- Usage: Dividers, card outlines, subtle borders

### Accent Colors (Style-Specific)

Used **only** within design style demo pages:

**Bauhaus Red**
- HEX: `#E1000F`
- Usage: Bauhaus demo accents only

**Bauhaus Yellow**
- HEX: `#FFD500`
- Usage: Bauhaus demo accents only

**Neo-Futurism Cyan**
- HEX: `#00D4FF`
- Usage: Neo-Futurism demo accents only

**Neo-Futurism Purple**
- HEX: `#8A2BE2`
- Usage: Neo-Futurism demo accents only

### Color Accessibility

All color combinations meet **WCAG AA** minimum:
- Black on White: AAA ✅
- Blue (#0057B8) on White: AA ✅
- Medium Gray on White: AA ✅

---

## Typography

### Primary Typeface: Inter

**Rationale:** Modern, readable, excellent web performance, open-source

**Weights Used:**
- **400** - Regular (body text)
- **500** - Medium (subheadings, emphasis)
- **700** - Bold (headings, strong emphasis)
- **900** - Black (hero text, major headings)

**Font Loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
```

### Fallback Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```

### Type Scale

**Hero Heading (H1)**
- Size: `clamp(2.5rem, 6vw, 4rem)` (40-64px)
- Weight: 900
- Line Height: 1.1
- Letter Spacing: -0.02em
- Usage: Page titles, hero sections

**Section Heading (H2)**
- Size: `clamp(1.75rem, 4vw, 2.5rem)` (28-40px)
- Weight: 700
- Line Height: 1.2
- Letter Spacing: -0.01em
- Usage: Major sections

**Subsection Heading (H3)**
- Size: `clamp(1.25rem, 3vw, 1.75rem)` (20-28px)
- Weight: 700
- Line Height: 1.3
- Letter Spacing: 0
- Usage: Cards, subsections

**Body Text**
- Size: `1rem` (16px)
- Weight: 400
- Line Height: 1.6
- Letter Spacing: 0
- Usage: Paragraphs, descriptions

**Small Text**
- Size: `0.875rem` (14px)
- Weight: 400
- Line Height: 1.5
- Usage: Captions, metadata, dates

### Typography Best Practices
- Maximum line length: **65-75 characters**
- Minimum body text size: **16px**
- Headings use sentence case (not ALL CAPS except for specific style demos)
- Links underlined or clearly distinguished from body text

---

## Components

### Buttons

**Primary Button**
```css
background: #0057B8;
color: #FFFFFF;
padding: 0.75rem 1.5rem;
border-radius: 4px;
font-weight: 500;
border: none;
```
Hover: Darken 10%

**Secondary Button**
```css
background: #FFFFFF;
color: #0057B8;
border: 2px solid #0057B8;
padding: 0.75rem 1.5rem;
border-radius: 4px;
font-weight: 500;
```
Hover: Background #F5F5F5

**Text Button**
```css
background: transparent;
color: #0057B8;
text-decoration: underline;
font-weight: 500;
```
Hover: Color darken 10%

### Cards

**Gallery Card**
```css
background: #FFFFFF;
border: 1px solid #CCCCCC;
border-radius: 8px;
padding: 1.5rem;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
transition: transform 0.2s, box-shadow 0.2s;
```
Hover: `transform: translateY(-4px)` + increased shadow

**Submission Card**
```css
background: #F5F5F5;
border-left: 4px solid #0057B8;
padding: 1.5rem;
border-radius: 4px;
```

### Forms

**Input Fields**
```css
border: 2px solid #CCCCCC;
border-radius: 4px;
padding: 0.75rem 1rem;
font-size: 1rem;
background: #FFFFFF;
```
Focus: Border color #0057B8, outline 2px

**Labels**
```css
font-weight: 500;
margin-bottom: 0.5rem;
color: #000000;
```

### Navigation

**Header Navigation**
```css
background: #FFFFFF;
border-bottom: 1px solid #CCCCCC;
padding: 1.5rem 2rem;
```

**Nav Links**
```css
color: #000000;
font-weight: 500;
text-decoration: none;
padding: 0.5rem 1rem;
```
Hover: color #0057B8
Active: underline or bold

---

## Spacing System

### Base Unit: 8px

**Spacing Scale:**
- `0.25rem` (4px) - Tiny gap
- `0.5rem` (8px) - Small gap
- `1rem` (16px) - Medium gap
- `1.5rem` (24px) - Large gap
- `2rem` (32px) - XL gap
- `3rem` (48px) - Section spacing
- `4rem` (64px) - Major section spacing

### Layout Grid
- **Desktop:** 12-column grid, 1200px max-width
- **Tablet:** 8-column grid, 768px max-width
- **Mobile:** Single column, 100% width with 1rem padding

---

## Imagery

### Photography Style
- **Clean** - Minimal backgrounds, good contrast
- **Modern** - Contemporary feel, not vintage unless historically relevant
- **Diverse** - Represent variety of design work
- **High-quality** - Sharp, well-lit, professional

### Screenshots
- **Aspect Ratio:** 16:9 preferred
- **Format:** PNG or WebP
- **Optimization:** Compress for web (< 200KB)
- **Alt Text:** Always include descriptive alt text

### Icons
- **Style:** Outline or simple fills
- **Size:** 24x24px standard
- **Color:** Match text color or accent blue
- **Library:** Heroicons or similar open-source

---

## Voice & Tone Guidelines

### Writing Principles

**Be Clear**
- Use simple, direct language
- Define technical terms
- Short sentences and paragraphs
- Active voice preferred

**Be Educational**
- Explain "why" not just "what"
- Provide context and examples
- Link to additional resources
- Encourage exploration

**Be Encouraging**
- Celebrate student work
- Provide constructive feedback
- Use positive language
- Inspire creativity

### Example Copy

**❌ Don't say:**
> "This submission was rejected because it doesn't meet the requirements for Bauhaus design."

**✅ Do say:**
> "Thanks for your submission! To better match Bauhaus principles, try using primary colors (red, blue, yellow) and geometric shapes. Check out our Bauhaus demo for reference."

**❌ Don't say:**
> "Swiss design utilizes asymmetric layouts with a high degree of typographic precision."

**✅ Do say:**
> "Swiss design uses clean grids and precise typography to create clear, organized layouts. Think of it as the design equivalent of a perfectly organized desk."

---

## Accessibility Standards

### WCAG AA Compliance (Minimum)

**Color Contrast**
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- All current palette combinations meet this ✅

**Keyboard Navigation**
- All interactive elements reachable via Tab
- Focus indicators visible (2px outline)
- Skip links to main content

**Screen Readers**
- Semantic HTML (header, nav, main, footer)
- ARIA labels where needed
- Alt text on all images
- Form labels associated with inputs

**Responsive Design**
- Text scales with viewport
- No horizontal scrolling
- Touch targets minimum 44x44px
- Readable at 200% zoom

---

## Brand Applications

### Website
- Clean, minimal aesthetic
- Focus on content over decoration
- Fast loading (< 2s)
- Mobile-first approach

### Email Communications
- Plain text or simple HTML
- MyWebClass.org branding in header
- Clear call-to-action buttons
- Footer with links to privacy policy

### Social Media
- Use primary logo
- Educational, helpful content
- Share student work (with permission)
- Link back to site

### Print Materials (if needed)
- Business cards with logo + URL
- Posters for classrooms
- Style reference guides as PDFs

---

## Do's and Don'ts

### Visual Design

**Do:**
- ✅ Use plenty of whitespace
- ✅ Maintain consistent spacing
- ✅ Keep layouts clean and organized
- ✅ Use the established color palette
- ✅ Optimize images for web

**Don't:**
- ❌ Use decorative elements unnecessarily
- ❌ Mix too many typefaces
- ❌ Use low-contrast color combinations
- ❌ Create cluttered layouts
- ❌ Ignore mobile experience

### Content

**Do:**
- ✅ Write clear, concise copy
- ✅ Explain design concepts simply
- ✅ Include historical context
- ✅ Credit sources and creators
- ✅ Proofread before publishing

**Don't:**
- ❌ Use jargon without explanation
- ❌ Make assumptions about knowledge level
- ❌ Copy content without attribution
- ❌ Use condescending language
- ❌ Overwhelm with too much text

---

## File Naming Conventions

### Images
- `lowercase-with-hyphens.png`
- `style-name-screenshot-01.png`
- `bauhaus-example-hero.jpg`

### Documents
- `UPPERCASE_WITH_UNDERSCORES.md`
- `BRAND_GUIDE.md`
- `AI_USAGE.md`

### Code
- `kebab-case.css`
- `camelCase.js`
- `PascalCase` for components

---

## Contact & Resources

### Brand Assets Repository
`/src/assets/brand/`
- Logo files (SVG, PNG)
- Color swatches
- Typography specimens

### Questions or Clarifications
Contact: [instructor email]
GitHub Issues: [repo link]

### External Resources
- Inter Typeface: https://rsms.me/inter/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Coolors Palette: [link to MyWebClass palette]

---

**Version:** 1.0  
**Last Updated:** December 10, 2025  
**Maintained by:** MyWebClass.org Team
