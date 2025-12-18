# Information Architecture - MyWebClass.org

## Site Structure

```
MyWebClass.org
├── Home (/)
│   ├── Hero section
│   ├── Design style overview
│   └── Call-to-action (Browse gallery / Submit)
│
├── Gallery (/gallery/)
│   ├── All design submissions
│   ├── Filter by style
│   └── Search functionality
│
├── Style Detail Pages (/styles/{style}/)
│   ├── Bauhaus (/styles/bauhaus/)
│   ├── Minimalism (/styles/minimalism/)
│   ├── Neo-Futurism (/styles/neo-futurism/)
│   │
│   └── Each includes:
│       ├── Live demo
│       ├── Description
│       ├── Historical background
│       ├── Color & typography rules
│       └── Authenticity explanation
│
├── Submission Form (/submission/)
│   ├── Student information
│   ├── Design style selection
│   ├── Demo URL
│   ├── Screenshot upload
│   └── Authenticity writeup
│
├── Review Page (/review/)
│   └── Instructor dashboard (CMS-powered)
│
└── Blog (future)
    └── Design education articles
```

---

## Page Hierarchy

### Level 1: Primary Navigation
- Home
- Gallery
- Submit

### Level 2: Content Pages
- Individual style demos (Bauhaus, Minimalism, Neo-Futurism)
- Submission form
- Review dashboard (instructor-only)

### Level 3: Utility Pages
- Sitemap
- Robots.txt
- Privacy Policy (future)
- About (future)

---

## Content Model

### Design Styles
```
┌─────────────────────┐
│   designStyle       │
├─────────────────────┤
│ - title             │
│ - slug              │
│ - description       │
│ - historicalBg      │
│ - colorPalette      │
│ - typography        │
│ - sampleImages      │
│ - submissions[] ─┐  │
└─────────────────┼───┘
                  │
         ┌────────┘
         ↓
┌─────────────────────┐
│ gallerySubmission   │
├─────────────────────┤
│ - name              │
│ - email             │
│ - url               │
│ - screenshot        │
│ - description       │
│ - style (ref)       │
│ - status            │
│ - submittedDate     │
└─────────────────────┘
```

### Articles (Future)
```
┌─────────────────────┐
│     article         │
├─────────────────────┤
│ - title             │
│ - slug              │
│ - content           │
│ - author (ref)      │
│ - publishedDate     │
│ - category          │
└─────────────────────┘
         │
         ↓
┌─────────────────────┐
│      author         │
├─────────────────────┤
│ - name              │
│ - bio               │
│ - image             │
└─────────────────────┘
```

---

## User Flows

### Student Submission Flow
```
Homepage
   ↓
Gallery (browse examples)
   ↓
Style Detail (study requirements)
   ↓
[External: Build demo]
   ↓
Submission Form
   ↓
Confirmation Screen
   ↓
[Wait for review]
   ↓
Email Notification (approved/rejected)
   ↓
Live in Gallery
```

### Instructor Review Flow
```
Email/Discord Notification
   ↓
Review Dashboard (/review/)
   ↓
View Submission Details
   ↓
Check Demo Live Site
   ↓
Approve / Reject / Request Changes
   ↓
Submission Status Updated
   ↓
Student Notified
```

### Visitor Learning Flow
```
Homepage
   ↓
Gallery (browse styles)
   ↓
Style Detail Page
   ↓
Read Educational Content
   ↓
View Live Demo
   ↓
[Optional: Submit own work]
```

---

## Navigation Structure

### Primary Navigation (Header)
```
┌────────────────────────────────────────┐
│  MyWebClass.org  |  Gallery  |  Submit │
└────────────────────────────────────────┘
```

### Footer Navigation
```
┌────────────────────────────────────────┐
│ Styles:                                │
│  • Bauhaus                             │
│  • Minimalism                          │
│  • Neo-Futurism                        │
│                                        │
│ Resources:                             │
│  • About                               │
│  • Privacy Policy                      │
│  • Contact                             │
│                                        │
│ © 2025 MyWebClass.org                  │
└────────────────────────────────────────┘
```

---

## Content Strategy

### Homepage
**Goal:** Introduce concept, showcase styles, encourage exploration

**Key Elements:**
- Hero: "Learn Design History Through Real Examples"
- 3 featured design styles with thumbnails
- "Browse Gallery" CTA
- "Submit Your Work" CTA

### Gallery Page
**Goal:** Display all submissions, enable discovery

**Key Elements:**
- Grid of submission cards
- Filter by style
- Search by keyword (future)
- Sort by date/popularity (future)

### Style Detail Pages
**Goal:** Educate about specific design movement

**Key Elements:**
- Live, full-page demo (immersive experience)
- Educational sidebar/modal:
  - Description (what it is)
  - Historical background (where it came from)
  - Rules (how to do it)
  - Authenticity explanation (why this demo works)

### Submission Form
**Goal:** Collect student work with necessary metadata

**Key Fields:**
- Name (text)
- Email (email)
- Design Style (dropdown)
- Demo URL (url)
- Screenshot (file upload)
- Explanation (textarea)

**Validation:**
- All fields required
- URL must be valid
- Image < 2MB
- Explanation > 100 characters

---

## Taxonomy & Metadata

### Design Styles Taxonomy
- **Primary Styles:** Bauhaus, Minimalism, Neo-Futurism
- **Future Styles:** Swiss/International, Brutalism, Flat Design, Memphis, Art Deco

### Content Tags (Future)
- Historical period (1920s, 1960s, 2000s, etc.)
- Visual characteristics (geometric, colorful, minimal)
- Use cases (corporate, editorial, experimental)

### Metadata for SEO
- Page title format: `{Style Name} - MyWebClass.org`
- Meta description: Historical context + "View authentic demo"
- Open Graph images: Screenshots of each style
- Schema.org: Organization + BlogPosting (articles)

---

## Search & Discovery

### Current
- Browse all submissions in gallery
- Direct links to style pages from navigation

### Future Enhancements
- Search bar (keyword search)
- Filter by style, date, status
- Sort by newest, popular, featured
- Related submissions (same style)
- Tag-based browsing

---

## Accessibility Navigation

### Keyboard Navigation
- Tab order: Skip link → Logo → Nav links → Main content
- All interactive elements keyboard accessible
- Focus indicators visible

### Screen Reader Navigation
- Semantic landmarks (header, nav, main, footer)
- Heading hierarchy (H1 → H2 → H3)
- ARIA labels on navigation ("Primary navigation")
- Alt text on all images

### Skip Links
- "Skip to main content" (first tab stop)
- "Skip to navigation" (if needed)

---

## Responsive Breakpoints

### Desktop (1200px+)
- Multi-column gallery grid (3-4 columns)
- Side-by-side content layouts
- Full navigation in header

### Tablet (768px - 1199px)
- 2-column gallery grid
- Stacked content sections
- Full navigation in header

### Mobile (< 768px)
- Single column gallery
- Fully stacked layouts
- Hamburger menu (if navigation expands)
- Touch-friendly targets (44px min)

---

## URL Structure

### Current URLs
```
/                         → Homepage
/gallery/                 → Gallery listing
/styles/bauhaus/          → Bauhaus demo
/styles/minimalism/       → Minimalism demo
/styles/neo-futurism/     → Neo-Futurism demo
/submission/              → Submission form
/review/                  → Instructor review (protected)
/sitemap.xml              → XML sitemap
/robots.txt               → Robots directives
```

### Future URLs
```
/blog/                    → Blog listing
/blog/{slug}/             → Individual articles
/about/                   → About page
/privacy/                 → Privacy policy
/search/?q={query}        → Search results
```

---

## CMS Content Types (Sanity)

### Published Schemas
1. **designStyle** - Design movement definitions
2. **gallerySubmission** - Student work submissions
3. **article** - Educational blog posts
4. **author** - Content authors

### Workflow States
- **Draft** - Being created
- **Submitted** - Awaiting review (students)
- **Under Review** - Being evaluated (instructor)
- **Approved** - Published publicly
- **Rejected** - Not accepted (with feedback)

---

## Performance Considerations

### Critical Path
1. HTML (inline critical CSS if possible)
2. Main CSS file (preloaded)
3. Content rendering
4. Images (lazy loaded below fold)
5. Analytics (deferred)

### Code Splitting
- Global CSS for all pages
- Inline CSS for style demos (self-contained)
- No JavaScript required for core functionality

---

## Future Expansion

### Potential New Sections
- **/resources/** - Design history resources
- **/tutorials/** - How-to guides
- **/challenges/** - Design competitions
- **/community/** - User profiles & discussions

### Potential New Features
- User accounts (student profiles)
- Commenting on submissions
- Upvoting popular submissions
- Collections/playlists
- Email newsletter
- RSS feed for blog

---

**Version:** 1.0  
**Last Updated:** December 10, 2025  
**Next Review:** After user testing
