# Accessibility Strategies

Based on reference: [kaw393939/eaikw](https://github.com/kaw393939/eaikw)  
**Lighthouse Accessibility Score: 91-100%**

## Core Principles

1. **Semantic HTML** - Use correct elements for their purpose
2. **ARIA when needed** - Enhance semantics, don't replace them
3. **Keyboard navigation** - All interactive elements accessible via keyboard
4. **Focus management** - Visible focus indicators
5. **Screen reader support** - Meaningful labels and alt text

---

## 1. Semantic HTML Structure

### Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | Site Name</title>
</head>
<body>
  <header>
    <nav aria-label="Primary navigation">
      <!-- Navigation items -->
    </nav>
  </header>
  
  <main id="main-content">
    <!-- Primary page content -->
  </main>
  
  <footer>
    <!-- Footer content -->
  </footer>
</body>
</html>
```

**Why this matters:**
- Screen readers use landmarks to navigate
- `<header>`, `<nav>`, `<main>`, `<footer>` are landmark elements
- Helps users skip to main content

---

## 2. Navigation Patterns

### Accessible Navigation Menu

```html
<nav aria-label="Primary navigation">
  <ul>
    <li>
      <a 
        href="/" 
        aria-current="page"    <!-- Indicates current page -->
        class="active"
      >
        Home
      </a>
    </li>
    <li>
      <a href="/blog/">Blog</a>
    </li>
    <li>
      <a href="/about/">About</a>
    </li>
  </ul>
</nav>
```

**Best practices:**
- Use `aria-current="page"` on current page link
- Use `<nav>` element with descriptive `aria-label`
- Use list elements (`<ul>`, `<li>`) for structure

### Mobile Menu (Hamburger)

```html
<!-- Toggle Button -->
<button 
  type="button"
  class="menu-button"
  aria-expanded="false"           <!-- Indicates menu state -->
  aria-controls="mobile-menu"     <!-- Links to controlled element -->
  aria-label="Toggle navigation menu"  <!-- Descriptive label -->
>
  <span class="sr-only">Menu</span>  <!-- Screen reader text -->
  <svg aria-hidden="true"><!-- Icon --></svg>
</button>

<!-- Mobile Menu -->
<div 
  id="mobile-menu"
  class="hidden"
  role="dialog"                   <!-- Treat as modal -->
  aria-modal="true"               <!-- Traps focus -->
  aria-label="Navigation menu"
>
  <nav>
    <!-- Menu items -->
  </nav>
  
  <button 
    type="button"
    aria-label="Close navigation menu"
  >
    Close
  </button>
</div>
```

**JavaScript requirements:**
```javascript
const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  
  // Toggle state
  menuButton.setAttribute('aria-expanded', !isExpanded);
  mobileMenu.classList.toggle('hidden');
  
  // Trap focus when open
  if (!isExpanded) {
    mobileMenu.querySelector('a, button').focus();
  }
});
```

---

## 3. Focus Management

### Visible Focus Indicators

```css
/* Never remove focus outline without replacement! */
button:focus,
a:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Tailwind utility pattern */
.focus-visible {
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2;
}
```

**HTML implementation:**
```html
<button class="
  px-4 py-2 
  bg-primary-600 
  text-white 
  rounded
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary-500 
  focus:ring-offset-2
">
  Click Me
</button>
```

### Skip to Main Content Link

```html
<body>
  <!-- Skip link (hidden until focused) -->
  <a 
    href="#main-content" 
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white"
  >
    Skip to main content
  </a>
  
  <header>
    <!-- Navigation -->
  </header>
  
  <main id="main-content" tabindex="-1">
    <!-- Content -->
  </main>
</body>
```

**CSS for screen-reader only content:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

## 4. Images & Media

### Image Alt Text Strategy

```html
<!-- Meaningful images: Descriptive alt text -->
<img 
  src="/images/team-meeting.jpg" 
  alt="Five team members collaborating around a whiteboard during project planning session"
>

<!-- Decorative images: Empty alt -->
<img 
  src="/images/decoration.svg" 
  alt=""
  aria-hidden="true"
>

<!-- Complex images: Use figure with caption -->
<figure>
  <img 
    src="/chart.png" 
    alt="Bar chart showing 45% increase in user engagement from Q1 to Q2 2025"
  >
  <figcaption>
    Quarterly user engagement growth
  </figcaption>
</figure>

<!-- Logo images -->
<img 
  src="/logo.svg" 
  alt="MyWebClass.org logo"
  width="200"
  height="50"
>
```

**Alt text guidelines:**
- **Meaningful images:** Describe what's important about the image
- **Decorative images:** Use empty alt (`alt=""`)
- **Text in images:** Include that text in alt
- **Charts/graphs:** Describe the key data/trend
- **Length:** 100-125 characters ideal

### Reference Document

See `IMAGE_ALT_TEXT_GUIDE.md` in references for:
- 20+ examples of good alt text
- 10+ examples to avoid
- Context-specific strategies
- Testing procedures

---

## 5. Forms

### Accessible Form Patterns

```html
<form>
  <!-- Text Input with Explicit Label -->
  <div>
    <label for="email">
      Email Address
      <span aria-label="required">*</span>
    </label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required
      aria-required="true"
      aria-describedby="email-hint"
    >
    <p id="email-hint" class="text-sm text-neutral-600">
      We'll never share your email
    </p>
  </div>
  
  <!-- Error State -->
  <div>
    <label for="password">Password</label>
    <input 
      type="password" 
      id="password" 
      name="password"
      aria-invalid="true"
      aria-describedby="password-error"
    >
    <p id="password-error" role="alert" class="text-red-600">
      Password must be at least 8 characters
    </p>
  </div>
  
  <!-- Select Dropdown -->
  <div>
    <label for="design-style">Design Style</label>
    <select 
      id="design-style" 
      name="style" 
      required
      aria-required="true"
    >
      <option value="">Choose a style...</option>
      <option value="bauhaus">Bauhaus</option>
      <option value="minimalism">Minimalism</option>
    </select>
  </div>
  
  <!-- File Upload -->
  <div>
    <label for="screenshot">Screenshot</label>
    <input 
      type="file" 
      id="screenshot" 
      name="screenshot"
      accept="image/*"
      aria-describedby="screenshot-hint"
    >
    <p id="screenshot-hint">
      Accepted formats: JPG, PNG, WebP
    </p>
  </div>
  
  <!-- Submit Button -->
  <button 
    type="submit"
    class="px-6 py-2 bg-primary-600 text-white rounded focus:ring-2"
  >
    Submit
  </button>
  
  <!-- Status Message -->
  <div 
    role="status" 
    aria-live="polite" 
    aria-atomic="true"
  >
    <!-- Success/error messages appear here -->
  </div>
</form>
```

**Key attributes:**
- `for` + `id` - Links label to input
- `aria-required` - Indicates required fields
- `aria-invalid` - Indicates validation errors
- `aria-describedby` - Links to hint/error text
- `role="alert"` - Announces errors immediately
- `aria-live="polite"` - Announces status updates

---

## 6. ARIA Patterns

### When to Use ARIA

**Rule of thumb:** Use semantic HTML first, ARIA second

```html
<!-- ❌ Bad: Using ARIA when HTML element exists -->
<div role="button" tabindex="0" onclick="...">
  Click me
</div>

<!-- ✅ Good: Use native button -->
<button type="button" onclick="...">
  Click me
</button>

<!-- ✅ Good: ARIA enhances semantic HTML -->
<button 
  type="button"
  aria-expanded="false"
  aria-controls="dropdown-menu"
>
  Options
</button>
```

### Common ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Provides accessible name | `<button aria-label="Close dialog">✕</button>` |
| `aria-labelledby` | References another element for label | `<div aria-labelledby="section-heading">` |
| `aria-describedby` | Additional description | `<input aria-describedby="hint-text">` |
| `aria-current` | Current item in set | `<a aria-current="page">Home</a>` |
| `aria-expanded` | Expandable element state | `<button aria-expanded="false">` |
| `aria-controls` | Element controlled by this one | `<button aria-controls="menu-id">` |
| `aria-hidden` | Hide from screen readers | `<span aria-hidden="true">🎨</span>` |
| `aria-live` | Announce dynamic changes | `<div aria-live="polite">Status...</div>` |

### Live Regions

```html
<!-- Form submission status -->
<div 
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="status-message"
>
  <!-- JS updates this with success/error messages -->
</div>

<!-- Loading indicator -->
<div 
  role="status"
  aria-live="polite"
  aria-busy="true"
>
  Loading content...
</div>
```

**`aria-live` values:**
- `off` - Don't announce (default)
- `polite` - Announce when user is idle
- `assertive` - Announce immediately (use sparingly!)

---

## 7. Color & Contrast

### WCAG AA Requirements

- **Normal text:** 4.5:1 contrast ratio
- **Large text (18px+):** 3:1 contrast ratio
- **UI components:** 3:1 contrast ratio

### Safe Color Combinations

```css
/* ✅ Good contrast examples */
.text-white-on-primary {
  background: #2563eb;  /* Primary blue */
  color: #ffffff;        /* White */
  /* Ratio: 8.6:1 - Passes AAA */
}

.text-dark-on-light {
  background: #f5f5f5;   /* Light gray */
  color: #171717;        /* Almost black */
  /* Ratio: 16.1:1 - Passes AAA */
}

/* ❌ Poor contrast - fails WCAG */
.bad-contrast {
  background: #cccccc;   /* Light gray */
  color: #999999;        /* Medium gray */
  /* Ratio: 2.8:1 - Fails */
}
```

### Don't Rely on Color Alone

```html
<!-- ❌ Bad: Color is only indicator -->
<span style="color: red;">Error</span>
<span style="color: green;">Success</span>

<!-- ✅ Good: Use icon + text + color -->
<span class="text-red-600">
  <svg aria-hidden="true"><!-- Error icon --></svg>
  <span>Error:</span> Invalid input
</span>

<span class="text-green-600">
  <svg aria-hidden="true"><!-- Success icon --></svg>
  <span>Success:</span> Saved
</span>
```

---

## 8. Headings & Document Structure

### Proper Heading Hierarchy

```html
<main>
  <h1>Page Title</h1>          <!-- Only one h1 per page -->
  
  <section>
    <h2>Main Section</h2>
    <p>Content...</p>
    
    <h3>Subsection</h3>
    <p>More content...</p>
    
    <h3>Another Subsection</h3>
    <p>More content...</p>
  </section>
  
  <section>
    <h2>Another Main Section</h2>
    <!-- Don't skip levels (h2 to h4) -->
    <h3>Subsection</h3>
  </section>
</main>
```

**Rules:**
- One `<h1>` per page
- Don't skip levels (h1 → h3)
- Use semantic heading levels, not for styling

---

## 9. Tables

### Accessible Data Tables

```html
<table>
  <caption>Student Submissions by Design Style</caption>
  <thead>
    <tr>
      <th scope="col">Style</th>
      <th scope="col">Submissions</th>
      <th scope="col">Approved</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Bauhaus</th>
      <td>12</td>
      <td>8</td>
    </tr>
    <tr>
      <th scope="row">Minimalism</th>
      <td>15</td>
      <td>11</td>
    </tr>
  </tbody>
</table>
```

**Key elements:**
- `<caption>` - Table description
- `<th scope="col">` - Column headers
- `<th scope="row">` - Row headers
- Helps screen readers navigate

---

## 10. Testing Checklist

### Manual Tests

- [ ] Tab through entire page - all interactive elements reachable
- [ ] Focus indicators visible on all interactive elements
- [ ] No keyboard traps (can't tab out)
- [ ] Skip to main content link works
- [ ] Form labels clearly associated with inputs
- [ ] Error messages announced and linked to fields
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Images have appropriate alt text
- [ ] Headings follow logical hierarchy
- [ ] ARIA attributes used correctly

### Automated Tools

```bash
# Lighthouse (built into Chrome DevTools)
# Run: DevTools > Lighthouse > Accessibility

# axe DevTools (browser extension)
# https://www.deque.com/axe/devtools/

# WAVE (browser extension)
# https://wave.webaim.org/extension/
```

### Screen Reader Testing

**Recommended screen readers:**
- **Windows:** NVDA (free), JAWS
- **Mac:** VoiceOver (built-in)
- **Mobile:** iOS VoiceOver, Android TalkBack

**Basic screen reader commands:**

| Action | Windows (NVDA) | Mac (VoiceOver) |
|--------|----------------|-----------------|
| Start/Stop | Ctrl+Alt+N | Cmd+F5 |
| Next item | ↓ | VO+→ |
| Previous item | ↑ | VO+← |
| Read all | Numpad+ | VO+A |
| Navigate headings | H | VO+Cmd+H |
| Navigate links | K | VO+Cmd+L |

---

## Key Takeaways

1. **Semantic HTML first** - Use the right element for the job
2. **Keyboard navigation** - Everything accessible via keyboard
3. **Focus indicators** - Always visible, never remove without replacement
4. **ARIA enhances, not replaces** - Use semantic HTML when possible
5. **Alt text matters** - Descriptive for meaningful images, empty for decorative
6. **Forms need labels** - Every input explicitly labeled
7. **Color contrast** - Meet WCAG AA minimum (4.5:1)
8. **Test with real users** - Automated tools catch ~30% of issues

## Common Mistakes to Avoid

| Mistake | Fix |
|---------|-----|
| `<div>` as button | Use `<button>` |
| Missing alt text | Add `alt=""` or descriptive text |
| Removing focus outline | Add visible alternative |
| Color-only indicators | Add text/icons |
| Skipping heading levels | Use proper hierarchy |
| Generic link text ("click here") | Use descriptive text |
| No keyboard access | Ensure all features keyboard-accessible |
