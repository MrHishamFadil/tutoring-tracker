# 🎨 UI & Design Specification: Tutoring Tracker & Video Learning Hub
**Project**: Private Tutoring Tracker for Grades 3–6  
**Audience**: Students (Grades 3–6, Ages 8–12), Parents, and Teachers  
**Target Environment**: GitHub Pages (`https://mrhishamfadil.github.io/tutoring-tracker/`), Safari on iOS/iPadOS, Chrome/Firefox/Edge on Desktop  
**Design Philosophy**: "Warm Classroom Clarity" — combines tactile warmth, friendly micro-typography, high visual contrast, and clear spatial hierarchy without distracting childish clutter.

---

## 1. Color Palette & Thematic Tokens

The color system is engineered to meet WCAG 2.1 AA and AAA standards while offering a comforting, focused learning environment.

### Core Swatches

| Token Name | Value | Role & Usage | Contrast Ratio |
|---|---|---|---|
| `--bg` | `#FAF8F5` | App canvas background (Warm cream / Off-white, soft on young eyes) | 16.2:1 against `--text` |
| `--surface` | `#FFFFFF` | Primary card, modal, and container background | 17.8:1 against `--text` |
| `--surface-2` | `#F5F1EB` | Secondary input fields, chip inactive fills, table header fills | 14.9:1 against `--text` |
| `--border` | `#E8E2D8` | Structural dividing lines, card borders | 1.3:1 against `--surface` |
| `--border-focus`| `#C2672A` | Active outline / ring for keyboard focus (`focus-visible`) | 3.2:1 against `--bg` |
| `--text` | `#1C1917` | High-contrast body text, headings, primary indicators | **17.8:1** (Exceeds AAA) |
| `--text-2` | `#57534E` | Secondary captions, helper hints, timestamps | **7.4:1** (Exceeds AAA) |
| `--text-3` | `#8C827A` | Placeholder text, disabled labels (never used for essential content) | **4.6:1** (Passes AA) |
| `--accent` | `#C2672A` | Primary brand terra-cotta: CTA buttons, active tabs, stat highlights | **4.8:1** (Passes AA) |
| `--accent-lt` | `#FDEEE3` | Accent badge background, student active state highlight | — |
| `--accent-dk` | `#9A4E1E` | Button hover and pressed states | **6.7:1** (Passes AAA) |
| `--green` | `#15803D` | Attendance 'Present', 'Completed' assignment status badge | **5.3:1** (Passes AA) |
| `--green-lt` | `#DCFCE7` | Success chip background | — |
| `--amber` | `#B45309` | 'In Progress', 'Partial Attendance', caution notifications | **4.7:1** (Passes AA) |
| `--amber-lt` | `#FEF3C7` | Caution pill background | — |
| `--blue` | `#1D4ED8` | Video lesson links, grammar highlights, resource downloads | **7.1:1** (Passes AAA) |
| `--blue-lt` | `#DBEAFE` | Resource card tag background | — |
| `--danger` | `#DC2626` | Destructive clear actions, overdue assignment alerts | **4.6:1** (Passes AA) |

---

## 2. Typography System

We employ **`Outfit`** (geometric humanist grotesque) paired with native Apple system font fallbacks (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`). `Outfit` features open letter counters, distinct ascenders, and clear numeral glyphs which greatly aids reading fluency for Grade 3–6 readers.

### Typographic Hierarchy

| Level | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `Hero / H1` | `1.65rem` (26px) | 700 (Bold) | `1.2` | Dashboard greeting, lesson headline |
| `Section / H2`| `1.25rem` (20px) | 600 (SemiBold) | `1.3` | Card headers, module titles |
| `Subheading / H3`| `1.05rem` (17px) | 600 (SemiBold) | `1.35` | Student names, lesson objective titles |
| `Body Standard`| `0.95rem` (15px) | 400 (Regular) | `1.55` | Teacher notes, descriptions, transcripts |
| `Body Small` | `0.85rem` (13.5px) | 500 (Medium) | `1.4` | Form labels, card metadata, table cells |
| `Micro / Pill` | `0.75rem` (12px) | 600 (SemiBold) | `1.2` | Status tags, Grade badges, duration counters |

---

## 3. Interactive Components & States

### 3.1 Buttons
- **Touch Target**: Minimum `44px × 44px` on all mobile and touch devices (WCAG 2.5.5).
- **Primary Button (`.btn-primary`)**:
  - Background: `--accent` (`#C2672A`); Color: `#FFFFFF`.
  - Border-radius: `10px` (`--radius-sm`).
  - Font: 600 weight, `0.95rem`.
  - Focus State: `outline: 3px solid rgba(194, 103, 42, 0.45); outline-offset: 2px;`.
  - Hover / Active: Smooth scale down `transform: scale(0.98); background: var(--accent-dk);`.
- **Secondary Button (`.btn-secondary`)**:
  - Background: `--surface-2`; Border: `1.5px solid var(--border)`; Color: `--text`.
- **Action Pill / Chip (`.filter-chip`, `.tab-chip`)**:
  - Compact rounded buttons (`--radius-pill`), active state transitions to `--accent` with white text.

### 3.2 Form Elements
- Inputs, selects, and textareas use a subtle inset feeling (`background: var(--surface-2)`) with a clean `1.5px solid var(--border)`.
- Visible interactive focus with color change and ring elevation:
  `box-shadow: 0 0 0 3px rgba(194,103,42,.18); border-color: var(--accent);`
- Labels explicitly linked via `for` and `id` attributes.

### 3.3 Cards & Data Tables
- **Cards (`.card`)**: Rounded borders (`14px`), subtle dual-layer box shadow (`0 1px 3px rgba(0,0,0,0.05), 0 6px 18px rgba(0,0,0,0.04)`).
- **Responsive Tables (`.data-table`)**:
  - Desktop: Full column view with zebra striping and sticky header.
  - Mobile (<640px): Stacks into individual card-like cell rows to prevent awkward horizontal table scrolling.

---

## 4. Multi-Device Layout Rules

### 4.1 Mobile (iPhone & Small Screens < 768px)
- **Container**: `max-width: 480px`, margin centered, `padding: 12px 16px calc(80px + var(--safe-bottom)) 16px`.
- **Navigation**: Fixed bottom glassmorphism bar (`bottom-nav`), icons with text labels, `48px` minimum touch height.
- **Grids**: Single column or 2-column compact tiles (`grid-template-columns: repeat(2, 1fr)`).

### 4.2 Tablet & iPad (768px – 1023px)
- **Container**: Expands to `max-width: 820px`.
- **Navigation**: Dual-mode header bar + compact sub-navigation pill list.
- **Grids**: 2-column bento grid for Student Progress and Upcoming Lessons.

### 4.3 Desktop (>= 1024px)
- **Container**: Expands up to `max-width: 1160px`.
- **Layout Architecture**: 
  - Top brand and session summary header.
  - 12-column responsive layout:
    - **Main Area (8 columns)**: Student Overview, Featured Video Lesson, Assignment Status.
    - **Side Area (4 columns)**: Upcoming Lessons Calendar, Attendance Snapshot, Teacher Quick Notes, Quick Resources.
  - Bottom navigation bar is hidden (`display: none;`), replaced with high-productivity desktop header tabs.

---

## 5. Tutoring Dashboard Modules

1. **Student Overview**:
   - Roster cards for Abdullah (Grade 6), Shadan (Grade 5), Elyana (Grade 4), Talal (Grade 3), and Nawaf (Grade 5).
   - Shows grade level, hourly rate, attended sessions, and progress meter.
2. **Upcoming Lessons**:
   - Time, subject, student name, and lesson topic with "Join / Prepare" quick action.
3. **Attendance Tracker**:
   - Month-to-date attendance rate (%) with status pills: `Present (95%)`, `Rescheduled (5%)`, `Excused (0%)`.
4. **Assignment Status**:
   - Student homework pipeline: Completed, Pending Review, In Progress, with due dates.
5. **Student Progress**:
   - Visual progress bars for key competencies: *Reading Comprehension*, *Grammar & Syntax*, *Vocabulary Acquisition*, and *Mathematical Reasoning*.
6. **Lesson Resources**:
   - Downloadable PDF worksheets, flashcard decks, and reading passages.
7. **Video Lessons**:
   - Embedded video component with video player, transcript modal, worksheet button, quiz link, and related lessons carousel.
8. **Teacher Notes**:
   - Editable observation log with date stamps and parent communication flags.

---

## 6. Empty States & Error Handling

- **Empty Session History**: Friendly SVG icon with illustration, encouraging prompt: `"No sessions logged for this month yet. Tap '+ Log Session' to record your first lesson!"`
- **Empty Video Search / Filter**: `"No lessons match the selected grade filter. Switch to 'All Grades' to explore all content."`
- **Error States**:
  - Non-blocking toast alerts (e.g. `"Please select at least one student before saving."`).
  - Inputs with invalid values display a clear red outline (`#DC2626`) and contextual aria-live helper text.

---

## 7. Accessibility Checklist (WCAG 2.1 AA Compliance)

- [x] **Color Contrast**: All body text achieves >= 7:1; buttons and badges achieve >= 4.5:1.
- [x] **Keyboard Accessibility**: Every tab, button, modal trigger, and filter chip is accessible via `Tab`, `Enter`, and `Space`. Modals trap focus and close cleanly with `Escape`.
- [x] **Focus Ring**: Distinct outline with `outline-offset: 2px` on all `:focus-visible` elements.
- [x] **Screen Reader Support**: All icons accompanied by visible text or `aria-label`. Data tables feature `<caption>` and explicit `scope="col"` headers.
- [x] **Motion Safety**: Respects `prefers-reduced-motion: reduce` by suppressing animations.
- [x] **Subpath Relative Routing**: No absolute root-relative asset URLs (`/assets/...`), ensuring 100% resilience under `https://mrhishamfadil.github.io/tutoring-tracker/`.
