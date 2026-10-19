# BSGSS Website Design & Architecture Standards (Enterprise Directive)
**Standard Version:** 6.0.0-PRO-ENTERPRISE  
**Audience:** All Engineering Agents, Designers, and Control Centre Administrators  
**Organization:** Bisnouli Sarvodaya Gramodyog Sewa Sansthan (Established 1994)  
**Effective Date:** 19 October 2026  

---

## 1. Core Directives & Zero-Tolerance Constraints

### Directive 1: Universal Zero-Tolerance on Colored Icon Boxes Across ALL Pages
* **Rule:** Custom colored icons placed inside square, circular, or rounded-rectangular colored backgrounds (e.g., `bg-brand-50 text-brand-700`, `bg-brand-100`, `bg-emerald-50`, `bg-green-100`, `border-emerald-200`, `rounded-full bg-teal-100`, etc.) are **strictly prohibited across EVERY page** of the website (Contact, About, Our Work, Activities, Legal Status, Transparency, Support, etc.).
* **Rationale:** A 32-year-old statutory institution commands solemn trust, transparency, and dignity. Artificial colored icon bubbles create an amateurish template look that distracts from authentic field photography and verified statutory accomplishments.
* **Standard Implementation:** Use clean, monochromatic SVG icons (`text-ink`, `text-slate-900`, or `text-ink-muted`) rendered without any background container box or colored square. Typography and documentary evidence lead the visual presentation.

### Directive 2: Universal Cardless & Borderless Architecture ("No Visible Side Borders / Boxed Cards")
* **Rule:** Content items across **ALL pages** must **never** be enclosed in boxed cards with visible side borders (`border` or `border-x`), heavy rounded box outlines, or elevated floating card drop shadows.
* **Rationale:** Enclosing every piece of information in separate rectangular boxes causes visual fragmentation, clutter, and an outdated "dashboard card" appearance.
* **Standard Implementation:**
  * Content items exist directly under the parent section with open, seamless spatial breathing room.
  * Side borders (`border-x` or full `border`) are completely omitted.
  * Structural division is achieved through clean vertical gutters and delicate top hairline borders (`border-t border-line pt-5` or `border-t-2 border-brand-850 pt-6`).
  * The background blends seamlessly into the parent section surface rather than forming isolated white floating boxes.

### Directive 3: Expansive Viewport Coverage (No Excessive Side Margins)
* **Rule:** Layout containers must span according to modern wide-screen standards. The archaic `max-w-6xl` (1152px) constraint is deprecated in favor of **`max-w-7xl` (1280px)** or **`max-w-[90rem]` (1440px)** with responsive padding:
  * Mobile (< 640px): `px-4`
  * Tablet (640px – 1024px): `px-6`
  * Desktop (1024px – 1280px): `px-8`
  * Ultra-Wide (≥ 1280px): `xl:px-12`
* **Rationale:** Unnecessary left and right margins on modern 1440px+ displays make the website look shrunken and boxed-in. Proper coverage provides a grand, authoritative presence matching global institutions (UN, Gates Foundation, BBC).

### Directive 4: High-Visibility Typography & Contrast Standard
* **Rule:** Section headings and narrative copy must never be small, faint, or low-contrast.
* **Standard Scale:**
  * **Section Main Titles:** `font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]`. Small or muted titles (`text-xl` or `text-2xl` for primary headings) are forbidden.
  * **Lead Section Paragraphs:** `text-base sm:text-lg lg:text-xl text-slate-800 font-normal leading-relaxed`. Faint, washed-out text (e.g. `text-slate-400` or `text-xs text-ink-muted` on primary intros) is replaced with dark, accessible, high-clarity typography.
  * **Section Eyebrows / Badges:** Crisp uppercase tracking (`text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700`).

### Directive 6: Zero Pulsing Dots & Pill Chip Outlines on Eyebrows
* **Rule:** Section eyebrows and trust indicators must **not** contain pulsing/static colored dots (`animate-pulse bg-brand-600`, `animate-ping bg-emerald-500`) or rounded pill chip enclosures (`rounded-full border border-brand-200 bg-white`).
* **Standard Implementation:** Plain, confident, bold uppercase tracking typography:
  `text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700`
* **Rationale:** Plain, clean uppercase eyebrows provide a more authoritative, modern, and mature aesthetic than novelty chip pills or distracting blinking dots.

### Directive 7: Enlarged Logos & Balanced Equalized Footer Columns
* **Rule:** 
  * Header and footer logos must be prominent and easily readable across mobile and desktop.
  * Footer navigation lists must never have one excessively long column (e.g. 14 items) while others have 5–6 items. The items must be distributed evenly across balanced columns so that all footer columns sit on the same line and maintain identical height.
* **Standard Implementation:**
  * Header Logo: `w-[15rem] sm:w-[18rem] md:w-[21rem] xl:w-[24rem]` with adjustable size controls.
  * Footer Logo: Inverted card with `w-[26rem] sm:w-[32rem] md:w-[38rem] max-w-full`.
  * Footer Columns: Split long link lists into balanced groups ("Explore", "Programmes & Media", "Get Involved", "Contact & Office"), each with 6 concise links.

### Directive 8: High-Definition Video Gallery Theater Mode
* **Rule:** Video embeds on `/activities/videos` and homepage media showcases must maintain a modern dark theater player frame, high-contrast active state indicators, auto-play progression, and responsive aspect-ratio containment (`aspect-video`) with clean typography.

### Directive 9: Dedicated WhatsApp Placement (Quick Actions & Contact Page Only)
* **Rule:** WhatsApp action must be placed directly inside the floating Quick Actions menu (under "Email BSGSS") and on the Contact page (`/contact`) direct channels. It is **strictly prohibited from Header navigation buttons and Footer direct channels**.
* **Standard Implementation:**
  * Header & Footer: Free of WhatsApp buttons or links.
  * Floating Quick Actions: Prominently located directly beneath "Email BSGSS" linking to `https://wa.me/{number}`.
  * Contact Page: Open editorial direct reach item with clean monochromatic icon and phone number display.

### Directive 10: Two Dedicated Addresses (Registered & Admin Offices)
* **Rule:** The website must distinguish and present both official addresses clearly:
  * **Registered Office (Statutory Village Seat):** Bisnouli Village, Tehsil Dadri, UP (founded 1994).
  * **Head & Administrative Office (Executive & CSR Hub):** B-180, Sector–31, Noida, UP.
* **Standard Implementation:** Fully editable from the Admin Control Centre (`/admin/customize` under "Offices & WhatsApp Setup") and reflected dynamically on `/contact` and in the global footer.

### Directive 11: Hierarchical Role-Based Access Control (RBAC)
* **Rule:** Top-level administrators (`super_admin`) have root authority to:
  * Add new team members and assign explicit roles (`super_admin`, `admin`, `editor`).
  * Modify existing user roles dynamically.
  * Activate / deactivate accounts or permanently remove team members.
  * Super admins are protected against accidental self-demotion or self-deletion.

---

## 2. Section-by-Section Standards

| Section | Headline Standard | Body Copy Standard | Container Width | Structural Layout |
| :--- | :--- | :--- | :--- | :--- |
| **Header & Nav** | Logo: Large & Prominent | WhatsApp Action & Support CTA | `max-w-[94rem]` | Fluid desktop bar with quick actions, WhatsApp link, mega menu, and enlarged crest. |
| **Hero & Trust Strip** | `text-4xl sm:text-5xl lg:text-6xl font-black` | `text-lg sm:text-xl text-white/95` | `max-w-7xl` | Full-width photographic gallery with trust certification ribbon. |
| **About Us** | `text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900` | `text-base sm:text-lg lg:text-xl text-slate-800` | `max-w-7xl` | 2-column narrative + documentary photo, 4 borderless highlight columns with hairlines. Plain bold eyebrow (no chip, no dot). |
| **Key Programmes** | `text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900` | `text-sm sm:text-base text-slate-700` | `max-w-7xl` | Open editorial showcase; 4 fluid columns, full bleed aspect ratios, no boxy card outlines. |
| **Government Initiatives** | `text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900` | `text-base sm:text-lg text-slate-700` | `max-w-7xl` | Fluid 2-column layout without enclosed card boxes or colored icon boxes. |
| **Impact Counters** | `text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900` | `text-xs sm:text-sm text-slate-600` | `max-w-7xl` | High-impact live numbers, clean category indicators, borderless grid with subtle top accents. |
| **CSR Partnerships** | `text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900` | `text-base sm:text-lg text-slate-700` | `max-w-7xl` | Clean stats row + infinite floating logo marquee. No boxed card containers. |
| **Leadership** | `text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900` | `text-sm sm:text-base text-slate-700` | `max-w-7xl` | Editorial portrait and quote layout with interactive modal speech reader. |
| **Video Gallery** | `text-2xl sm:text-3xl font-black text-slate-900` | `text-xs sm:text-sm text-slate-600` | `max-w-7xl` | High-definition theater player + responsive synchronized playlist sidebar. |
| **Contact Page** | Dual Office Cards | Registered & Admin Hubs | `max-w-6xl` | Displays both Registered and Admin offices with Google Maps directions, WhatsApp card, and contact form. |
| **Footer** | Equalized 6-link columns | Both offices & direct channels | `max-w-7xl` | Inverted brand-900 surface, extra-large logo emblem, equal column line heights. |

---

## 3. Implementation Verification Checklist

- [x] All custom colored icon bubbles/circles removed from homepage and navigation menus.
- [x] No visible boxed cards with side borders on About highlights, Programmes, Government, or Partners.
- [x] Left/right margins expanded to `max-w-7xl` with modern responsive padding across all sections.
- [x] About Us title and paragraph upgraded to standard bold sizes with high contrast.
- [x] All section titles standardized to prominent, confident sizes (`text-3xl sm:text-4xl lg:text-5xl`).
- [x] Blue pulsing dots and pill chip borders removed across section eyebrows in favor of clean bold typography.
- [x] Logo enlarged across header (`size="large"`) and footer (`size="xlarge"`).
- [x] Footer link lists redistributed into balanced, equal-height columns ("Explore", "Programmes & Media", "Get Involved").
- [x] Video player and playlist upgraded to theater layout with responsive aspect ratios and active highlight states.
- [x] WhatsApp direct action button added into Header action cluster, floating quick actions, and footer.
- [x] Dual address architecture implemented for Registered Office (Bisnouli) and Admin Office (Noida), editable from Admin Studio.
- [x] Role-Based Access Control (RBAC) implemented in Admin Panel allowing Super Admins to add users, change roles, and manage permissions.
- [x] Admin Customizer Studio equipped with "Texts & Copy", "Header, Nav & Footer Size", and "Offices & WhatsApp Setup" tabs backed by PostgreSQL.
