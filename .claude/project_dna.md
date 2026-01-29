# Chicago Food Club - Project DNA

This document defines the brand identity, visual standards, and business goals for the Chicago Food Club. **All code changes must maintain consistency with these guidelines.**

---

## 1. Visual Identity

### Color Palette

| Role | Hex Code | Usage |
|------|----------|-------|
| **Primary Gold** | `#C8A76F` | CTAs, buttons, accents, tagline text |
| **Gold Variant** | `#BFA268` | Button hover states, secondary accents |
| **Gold Hover** | `#c7a462` | Link underlines, active states |
| **Waterfall Gold** | `#CEB27C` | Animated gradient effects |
| **Dark Heading** | `#212121` | H1, H2, primary headings |
| **Body Text** | `#404040` | Paragraph text, descriptions |
| **White** | `#FFFFFF` | Primary backgrounds, text on dark |
| **Cream Background** | `#FBF3E4` | Section backgrounds (benefits, forms) |
| **Off-White** | `#F9F8F5` | Alternate section backgrounds |
| **Black Overlay** | `rgba(0,0,0,0.6)` | Hero image overlay |

### Typography

| Element | Font Family | Weight | Notes |
|---------|-------------|--------|-------|
| **Headings** | `Playfair Display` | 600-900 | Serif, elegant, used for H1-H3 |
| **Body/UI** | `Montserrat` | 400-700 | Sans-serif, clean, used for nav, paragraphs, buttons |

**Import URL:**
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;600;700;800;900&display=swap');
```

**Tailwind Utility Classes:**
- `.font-playfair` - Playfair Display
- `.font-montserrat` - Montserrat

### Spacing & Layout

| Element | Value |
|---------|-------|
| Max content width | `max-w-4xl` to `max-w-6xl` |
| Section padding | `px-6 py-12` (mobile), `md:px-16` (desktop) |
| Button padding | `px-6 py-3` (standard), `px-4 py-2` (compact) |
| Grid gap | `gap-6` to `gap-10` |
| Border radius | None on buttons (sharp edges), `rounded-md` on cards |

### Button Styles

**Primary CTA (Gold):**
```css
bg-[#c8a76f] hover:bg-black text-white font-semibold px-6 py-3
```

**Secondary CTA (Outline):**
```css
border border-white text-white hover:bg-white hover:text-black px-6 py-3
```

**Link Hover Effect:**
```css
/* Underline animation on hover */
.absolute left-0 -bottom-1 h-[2px] w-0 bg-[#c7a462] transition-all group-hover:w-full
```

### Component Patterns

- **Section Headers:** Uppercase tagline (`tracking-widest text-[#c8a76f]`) + Large Playfair heading
- **Cards:** White background, subtle shadow, cream accent borders (`border-[#EDE9E0]`)
- **Forms:** Cream background (`#FBF3E4`), white inputs, gold focus rings

---

## 2. Voice & Tone

### Brand Personality

| Attribute | Description |
|-----------|-------------|
| **Exclusive** | "Invitation-only", "Curated", "Selective membership" |
| **Sophisticated** | "Distinguished company", "Exceptional dining" |
| **Warm & Welcoming** | "Warm gathering of cool people", "Find your tribe" |
| **Professional** | Targets professionals, industry leaders, tastemakers |
| **Passionate** | "Food lovers", "Culinary enthusiasts" |

### Key Messaging Phrases

Use these phrases to maintain brand consistency:

- "Chicago's Exclusive Culinary Society"
- "Exceptional Dining & Distinguished Company"
- "Invitation-only community"
- "Meaningful connections"
- "Extraordinary culinary experiences"
- "Unforgettable moments around the table"
- "Find your tribe"
- "Curated culinary adventures"

### Writing Style Guidelines

1. **Headlines:** Use Playfair Display, title case, evoke exclusivity
2. **Taglines:** ALL CAPS, tracking-widest, gold color, short (3-5 words)
3. **Body copy:** Montserrat, sentence case, warm but professional
4. **CTAs:** Action-oriented ("Become a Member", "Join Our Community", "Discover More")

### Avoid

- Casual slang or overly informal language
- Generic restaurant/food clichés
- Discount or sale-focused messaging
- Overly technical jargon

---

## 3. Business Goals

### Primary Objectives

1. **Drive Member Signups**
   - Prominent "Join Now" CTAs throughout the site
   - Compelling membership benefits section
   - Streamlined application form

2. **Build Exclusive Community**
   - Curated membership (application review process)
   - Member directory for networking
   - Members-only content and events

3. **Professional Networking**
   - Target audience: Professionals, industry leaders, tastemakers
   - Connect members through shared culinary interests
   - Host intimate dinners and exclusive events

4. **Curate Exceptional Experiences**
   - Priority reservations at partner restaurants
   - Private events, chef's tables, tastings
   - Culinary education (masterclasses, workshops)

### Target Audience

- Young professionals in Chicago
- Food enthusiasts with disposable income
- Industry leaders and tastemakers
- People seeking meaningful social connections
- Professionals interested in networking through shared interests

### Success Metrics (Implied)

- Membership application submissions
- Application approval rate
- Member engagement (event attendance)
- Member retention
- Directory activity

---

## 4. Technical Constraints

### Must Preserve

- Existing member login functionality
- Events calendar integration (Google Calendar iframe)
- Member directory feature
- Email notification system
- Profile picture uploads (Supabase Storage)

### Do Not Break

- JWT authentication flow
- Redux state persistence
- CORS configuration for production domains
- Database schema (users, membership_requests tables)

---

## Quick Reference Card

```
COLORS:
  Gold Primary:    #C8A76F
  Dark Text:       #212121
  Body Text:       #404040
  Cream BG:        #FBF3E4

FONTS:
  Headings:        Playfair Display (serif)
  Body:            Montserrat (sans-serif)

VOICE:
  Exclusive | Sophisticated | Warm | Professional

CTAs:
  "Become a Member" | "Join Our Community" | "Discover More"
```
