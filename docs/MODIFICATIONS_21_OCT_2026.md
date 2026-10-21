# BSGSS Website Modifications & Institutional Profile Documentation
**Date of Release**: 21 October 2026  
**Document Ref**: `docs/MODIFICATIONS_21_OCT_2026.md`  
**Organisation**: Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS)  
**Project**: `bisnoulisansthan`  
**Scope**: Full Implementation of PDF Directives (Pages 1–8), Integration of Official 48-Page Organisational Profile, Complete Admin Panel Customization & Dynamic Footer/Contact Synchronization.

---

## 1. Executive Summary

This document serves as the authoritative blueprint and change log for the comprehensive overhaul executed across the Bisnouli Sarvodaya Gramodyog Sewa Sansthan (`bisnoulisansthan`) Next.js platform on 21 October 2026.

### Key Objectives Accomplished:
1. **Dynamic Office & Contact Binding**: Fully integrated the Registered Office and Administrative Office addresses, contact telephone numbers, and email IDs across both the website Footer and the Contact page, ensuring direct two-way synchronization from the Admin Panel (`/admin/customize`).
2. **Next.js Revalidation & Cache Invalidation**: Eliminated stale rendering by adding server-side cache purges (`revalidatePath("/", "layout")`, `revalidatePath("/contact")`, `revalidatePath("/")`) and dynamic execution to ensure edits made in the admin studio reflect immediately site-wide without requiring manual rebuilds or page refreshes.
3. **Hero Section Precision (PDF Page 1)**: Integrated the exact establishment rail badge (`Established in 1994 | Registration No. 226/1994-95, dated 15-06-1994 | 30+ Years of Service`) and the approved narrative covering all 7 states (UP, Delhi, Punjab, Haryana, Chhattisgarh, Rajasthan, Uttarakhand).
4. **Impact Metric Counters (PDF Page 2)**: Updated verified hero metric cards to the exact figures requested: `50 Lac +` Underprivileged Lives Empowered, `20 Lac +` Patients Screened & Treated, and `36,000 +` Women Certified in Livelihoods.
5. **Grassroots Map & Telemetry (PDF Pages 3, 5, 6)**: Streamlined the interactive map to focus purely on Indian grassroots presence across `7 states`, `20+ districts`, `350+ villages`, and `35 CSR PSU Partners`. Completely removed foreign locations and disconnected global quick-select pills.
6. **State Field Statistics Card Labels (PDF Page 4)**: Aligned the telemetry labels in the map cockpit to `Covered Districts`, `CSR Projects Undertaken` (e.g. 23 for UP), and `Villages Covered` (`50+`).
7. **Chronology of Growth (PDF Page 7)**: Structured the organisation's 30-year evolution into four distinct eras (1994 The Beginning, 2000s Expanding Livelihoods & Healthcare, 2010s Broadening Reach & Impact, and 2020s Scaling Impact & Outreach).
8. **Admin Studio Management**: Extended the Admin Customizer (`components/admin/WebsiteCustomizerStudio.tsx`) with GUI controls for Hero text, 6 Impact Cards, Grassroots Telemetry counters, 4-Era Story Milestones, and both Statutory Offices.
9. **Full Organisational Profile Ingestion**: Synthesized the complete 48-page statutory profile into the institutional records, cataloging governance members, founder patrons, advisors, 22 PSU CSR partnerships, SHG products, and 37 video documentation archives.

---

## 2. Complete Institutional Profile (48-Page Document Synthesis)

### 2.1 Legal & Statutory Registration Profile
- **Legal Entity Name**: Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS)
- **Nature of Entity**: Non-Governmental Voluntary Organisation / Registered Society
- **Governing Statute**: Societies Registration Act XXI of 1860
- **Registration Number**: 226/1994-95
- **Date of Registration**: 15 June 1994
- **Permanent Account Number (PAN)**: `AAATB7832M`
- **Income Tax Exemption Status**: Registered under Section 12A / 12AB and Section 80G(5)(vi) of the Income Tax Act, 1961
- **NITI Aayog NGO Darpan Unique ID**: `DL/2016/0111645`
- **Goods and Services Tax Identification Number (GSTIN)**: `07AAATB7832M1ZH`
- **Ministry of Corporate Affairs (MCA) CSR Registration**: Form CSR-1, Registration Number `CSR00001405`, dated 09 April 2021

### 2.2 Official Offices & Communication Coordinates
- **Registered Office (Statutory Village Seat)**:
  - Address: B-180, Sector-31, Noida, Gautam Buddha Nagar, Uttar Pradesh – 201301
  - Telephone: 011-46548002, 011-46548003
- **Administrative Office (Executive Coordination Hub)**:
  - Address: A-171, Ground Floor, Defence Colony, New Delhi – 110024
  - Telephone: +91-11-46548002, +91-11-46548003
  - Mobile (CEO): +91 93505 07520
- **Official Email**: `bisnoulisansthan@gmail.com`, `bsgssindia@yahoo.co.in`
- **Official Websites**: `https://bisnoulisansthan.in` | `www.bsgssindia.org`
- **Permanent Field Project Offices**:
  1. **Delhi**: Central & South Delhi field operational desks
  2. **Punjab**: Gurdaspur & Pathankot regional centers
  3. **Uttar Pradesh**: Ghaziabad & Meerut program offices
  4. **Haryana**: Nuh (Mewat) Aspirational District project bases

---

### 2.3 Leadership, Governance & Advisory Board

#### Founder Members & Executive Patrons
1. **Mr. Vijay Kumar Jha, IPS (Retd.)** – Patron & Co-Founder
   - Former Indian Police Service officer providing strategic direction, institutional ethics, and public safety alignment.
2. **Ms. Nandita Bakshi, Ex-IRS** – Chief Executive Officer & Co-Founder
   - Former Indian Revenue Service officer leading executive operations, women's self-help federation, and grassroots execution.

#### Board of Advisors
1. **Mr. Pravin Srivastava, IAS (Retd.)** – Senior Governance & Administrative Advisor
2. **Dr. Kripa Shanker Gupta, MBBS, MD** – Chief Medical & Public Health Advisor

#### Executive Operations Directors
1. **Mr. J. N. Rai** – Director (Projects)
2. **Mr. Anup Kumar** – Director (Operations & Field Implementation)
3. **Mr. Aniyan T. R** – Project Co-ordinator

#### Statutory Governing Body Members (Society Act)
| Sl. No. | Name | Designation |
| :---: | :--- | :--- |
| 1 | **Mr. Lokendra Sharma** | President |
| 2 | **Ms. Suja Devassy** | Secretary |
| 3 | **Mr. Jadu Ray** | Vice-President |
| 4 | **Mr. Ganesh Jha** | Treasurer |
| 5 | **Mr. K. Dasan** | Member |
| 6 | **Mr. Mahendra Kumar** | Member |
| 7 | **Ms. Shanti Ray** | Member |

---

### 2.4 Vision, Mission & Strategic Focus Areas

- **Vision**: To uplift underprivileged and marginalized sections of society, integrating them into the mainstream of socio-economic progress through community self-reliance and women's economic sovereignty.
- **Mission**: Create positive, measurable, and sustainable change through grassroots solutions focused on preventive healthcare, livelihood generation, quality education, and micro-finance.
- **Implementation Strategy**:
  - Participatory Rural Appraisal (PRA) & baseline household surveys.
  - Social mobilization and Self-Help Group (SHG) formation.
  - Multi-stakeholder partnerships with Central/State Govt bodies and Public Sector Undertakings (PSUs).
  - Continuous impact assessment and post-project sustainability mechanisms.
- **Seven Core Focus Areas**:
  1. Women Empowerment & Self-Reliance
  2. Primary Healthcare, Family Welfare & Mobile Oncology Screening
  3. Vocational Training & Skill Development
  4. SHG Micro-Finance, Thrift & Credit (AMAR initiative)
  5. Market Linkages for Rural Handicrafts & Khadi Products
  6. Remedial Education & Digital Literacy
  7. Youth Development & Cultural Values

---

### 2.5 Major CSR Partnerships & Completed Projects Portfolio

BSGSS has executed verifiable public-interest projects in collaboration with 22 premier Public Sector Undertakings and corporate entities:

1. **IRCON International Limited (IRCON)**:
   - *Locations*: Dorangla Block (Gurdaspur, Punjab), Narot Jaimal Singh (Pathankot, Punjab), Khora Colony (Ghaziabad, UP), Kanwarsika & Indri (Nuh, Haryana), Noor Nagar (Meerut, UP).
   - *Tenure*: 2017–2024.
   - *Interventions*: Jan Arogyam healthcare clinics, pathology diagnostics, cutting & tailoring training, computer literacy, and English communication for over 1,500 women and rural residents.
2. **RITES Limited**:
   - *Locations*: Khora Colony (Ghaziabad, UP), Saraswati Vihar (Ghaziabad, UP), Chhapera, Hilalpur & Uleta (Nuh Aspirational District, Haryana).
   - *Tenure*: 2018–2024.
   - *Interventions*: Mobile medical screening vans, Jan Arogyam health clinics, cancer screening camps in association with the Indian Cancer Society, and women's tailoring guilds (over 1,200 beneficiaries).
3. **REC Limited & REC Power Development (RECPDCL)**:
   - *Locations*: Prayagraj, Agra, Varanasi, Gorakhpur, Haridwar, Chitrakoot, Deoghar, Delhi, Amritsar (Punjab), and Vill. Parthala (Noida).
   - *Tenure*: 2018–2024.
   - *Interventions*: Installation and operation of 20 Smart Water ATMs at public iconic religious and heritage locations, 5 Water ATMs in Amritsar (Jallianwala Bagh, Attari Border), and Jan Arogyam clinic operations.
4. **Bharat Petroleum Corporation Limited (BPCL)**:
   - *Locations*: Prem Vihar & Khora Colony (Ghaziabad), Harola Sector-5 (Noida), Gangoli & Indri (Nuh, Haryana), Dorangla & Paniar (Gurdaspur, Punjab).
   - *Tenure*: 2020–2024.
   - *Interventions*: Jan Arogyam clinics, skill training extensions, Swachhata Pakhwada sanitation drives, and Covid relief kit distributions to 800+ households.
5. **GAIL (India) Limited**:
   - *Locations*: Daburji & Taragarh (Gurdaspur & Pathankot, Punjab), Kangarka & Bhogipur (Nuh, Haryana), Khora Colony (Ghaziabad).
   - *Tenure*: 2020–2024.
   - *Interventions*: Sustainable livelihood training in apparel design, beauty culture, and computer applications; Jan Arogyam clinics.
6. **Oil & Natural Gas Corporation (ONGC)**:
   - *Locations*: Nuh Block & Vill. Alduka (Haryana), Mangal Bazar Road (Khora Colony, Ghaziabad).
   - *Tenure*: 2021–2023.
   - *Interventions*: Dairy development training and micro-enterprise loans in collaboration with Punjab National Bank; Jan Arogyam clinics.
7. **Hindustan Petroleum Corporation Limited (HPCL)**:
   - *Locations*: Vill. Khorbasai & Bhirawati, Atta, Rahuka (Nuh, Haryana), Khora Colony (Ghaziabad).
   - *Tenure*: 2021–2024.
   - *Interventions*: Jan Arogyam healthcare clinics, dairy development for 130 women.
8. **National Thermal Power Corporation (NTPC & NVVN)**:
   - *Locations*: Vill. Bajeda (Nuh, Haryana), Prem Vihar & Madhu Vihar (Khora Colony, Ghaziabad).
   - *Tenure*: 2021–2024.
   - *Interventions*: Community health clinics, skill development in beauty culture and computing.
9. **NMDC Limited**:
   - *Locations*: Indri & Nuh Blocks (Aspirational District Nuh, Haryana).
   - *Tenure*: 2019–2020.
   - *Interventions*: Dairy development for 700 women and tailoring training for 120 women (820 total).
10. **Rail Vikas Nigam Limited (RVNL)**:
    - *Locations*: Sultanpur Lodhi (Kapurthala, Punjab), Village Basai (Noida, UP), Khora Colony (Ghaziabad).
    - *Tenure*: 2019–2024.
    - *Interventions*: Public Water ATMs and hand-washing stations; Jan Arogyam healthcare clinics.
11. **Airports Authority of India (AAI)**:
    - *Locations*: Vill. Chharora (Taoru, Nuh, Haryana), Prem Vihar (Khora Colony, Ghaziabad).
    - *Tenure*: 2022–2024.
    - *Interventions*: Jan Arogyam diagnostic labs and OPD healthcare.
12. **Other Premier Partners**:
    - **Engineers India Limited (EIL)**: Clinic in Karan Vihar, Khora Colony.
    - **Indraprastha Gas Limited (IGL)**: Health clinics in Nithari Village (Noida) & Indira Vihar (Ghaziabad).
    - **Petronet LNG Limited**: Jan Arogyam clinic in Vill. Uleta (Nuh).
    - **IREDA**: Clinic in Vill. Dhulawat (Taoru, Nuh).
    - **BHEL**: Sangail Village health clinic, dispensary & nutrition education.
    - **ALIMCO**: Assistive health services in Vill. Sangail (Nuh).
    - **MUDRA**: Sustainable livelihood and micro-enterprises in Alduka & Ghaziabad.
    - **NMDFC**: Comprehensive multi-specialty health camps across Bhirawati, Gangoli, and Sangail.
    - **Max India Limited**: Water ATMs and sanitation in Sultanpur Lodhi.

---

### 2.6 Skill Development & SHG Artisanal Catalog
- **Certified Beneficiaries**: 18,723 individuals equipped with vocational certificates across North India.
- **Micro-Finance (AMAR)**: Action for Micro-Finance and Rehabilitation has seeded hundreds of women-run self-help groups with thrift & credit systems.
- **Handicrafts & Artisanal Range**:
  - *Madhubani Paintings & Home Decor*: Hand-painted trays, pen holders, lamps, kettles, paper bowls, memory boxes, envelopes.
  - *Textiles & Apparel*: Pure silk ties, hand-embroidered silk stoles, Madhubani hand-painted sarees, Kashmiri shawls, cushion covers, bed cover sets, table runners.
  - *Leather Goods*: Men's leather wallets, visiting card holders, passport cases, ladies' clutch purses, leather briefcases, and executive office bags.
  - *Institutional Marketing*: Products supplied to Indian Airlines, ITDC, CRPF, national trade fairs at Pragati Maidan (EPCH), Dilli Haat, and Indian embassies in the United States, Germany, and Australia.

---

### 2.7 Video Documentation & Doordarshan News Coverage Archive
The profile catalogs 37 national broadcast segments and verified video reports:
1. MUDRA Livelihood Programme in Nuh (`JY59V4PtW3o`)
2. AIC-supported Diagnostics in Kangarka & Uleta (`8EhaFuz-7N8`)
3. RVNL Vocational Training Khora Colony (`SJed1b7CqY8`)
4. NVVN Jan Arogyam Khora Colony (`LA-gu3CKuXI`)
5. AAI Jan Arogyam Clinic Khora Colony (`QtMxm_YkZ3w`)
6. IRCON Jan Arogyam Kanwarsika (`zHK1ZXJIXqE`)
7. IRCON Vocational Training Khora Colony (`KrgLLBAqvPg`)
8. IGL Jan Arogyam Clinic Khora Colony (`6omjyCGMUM4`)
9. HPCL Free Health Camp Khorbasai (`04WTYvDbY60`)
10. BPCL Swachhata Pakhwada Khora Colony (`olgs9U5OAmc`)
11. Petronet LNG Health Camp Uleta (`0AybXAiIDJs`)
12. RITES Jan Arogyam Khora Colony (`Kq4ibSOzBlk`)
13. IREDA Jan Arogyam Dhulawat (`qlqHytBxTXI`)
14. ONGC Health Camp Alduka (`CZV8R13YH9I`)
15. RITES Oncology & Cancer Camp Hilalpur (`4cFG62DyJHM`)
16. BHEL Health Camp Sangail (`1pQbXI3D908`)
17. GAIL Health Camp Bhogipur (`YgwtASIIMV4`)
18. ONGC & PNB Loan Distribution Nuh (`PLjpBDYuhtA`)
19. RITES Cancer Screening Hilalpur (`6LJgpAIxfWE`)
20. BPCL Jan Arogyam Gangoli (`F_sunUDC4wk`)
21. NTPC Jan Arogyam Bajeda (`sVc1WHRh6R8`)
22. BHEL Free Health Camp Nuh (`VMPBVBT7Lc8`)
23. BPCL Swachhata Pakhwada 2021 (`W3IrqS31B_4`)
24. RITES Cancer Screening Hilalpur 2021 (`CgwVCccKAMs`)
25. NMDC Dairy Loan Distribution (`m4yB0GG8gb4`)
26. NMDC PNB Dairy Distribution (`CaEmXnUuS0s`)
27. BPCL Swachhata Pakhwada Gurdaspur (`Y_LWChs17xE`)
28. BPCL Swachhata Pakhwada Nuh (`I6Vfa6x0mhw`)
29. BPCL Jan Arogyam Khora Colony 2020 (`e6LCOCEbMpI`)
30. RITES Health Camp Hilalpur (`5iWniMkP-nk`)
31. RITES Health Camp Hilalpur May 2020 (`ywlMbLSY-DY`)
32. REC Valedictory Ceremony Khora Colony (`Y1OyJ8dW7R4`)
33. RITES Skill Training Chhappera (`HK4FTo9MlTg`)
34. IRCON Valedictory Khora Colony (`0W_ffeMrYx0`)
35. RITES Valedictory Khora Colony (`u_uSQLLeT_M`)
36. NMDC Skill Training Launch Nuh (`tobs4HNgYFk`)
37. IRCON Skill Launch Khora Colony (`6_Y-siwP900`)

---

## 3. Detailed Record of Modifications Implemented

### 3.1 Dynamic Footer & Contact Synchronization
- **Issue Reported**: Modifications made in the admin panel reflected on the Contact page but were ignored or statically frozen in the website Footer.
- **Root Cause**:
  1. The footer rendered values without an explicit Next.js cache revalidation trigger when the customizer was updated in PostgreSQL.
  2. The marketing layout lacked `force-dynamic` execution, causing static build optimization to serve stale layout renders.
  3. Direct phone and email links on the contact page were pointing to static `site.contact` fallbacks rather than dynamic `customizer.offices` references.
- **Remediation**:
  1. Added `revalidatePath("/", "layout")`, `revalidatePath("/")`, and `revalidatePath("/contact")` inside `app/api/admin/customize/route.ts` upon both `save` and `reset` actions.
  2. Exported `export const dynamic = "force-dynamic"` in `app/(marketing)/layout.tsx`.
  3. Bound `components/layout/Footer.tsx` directly to `customizer.offices.registeredOffice` and `customizer.offices.adminOffice`, rendering line 1, line 2, city, state, PIN, phone numbers, and Google Maps destination URLs dynamically.
  4. Updated `app/(marketing)/contact/page.tsx` to bind direct contact reach channels dynamically to `offices.adminOffice.phone || offices.registeredOffice.phone` and `offices.adminOffice.email || offices.registeredOffice.email`.

### 3.2 Homepage Hero Section (PDF Page 1)
- **Component**: `components/home/HomeHero.tsx` & `app/(marketing)/page.tsx`
- **Config**: Added `texts.hero` to `CustomizerSettings` with fields: `badge`, `eyebrow`, `title`, `text`, `supportCta`, `aboutCta`.
- **Default Copy**:
  - *Badge*: `"Established in 1994 | Registration No. 226/1994-95, dated 15-06-1994 | 30+ Years of Service"`
  - *Eyebrow*: `"Grassroots Community Development"`
  - *Title*: `"Empowering communities. Creating opportunities."`
  - *Narrative*: `"Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS) ,a non-governmental organisation with over three decades of experience in community development, is working to improve the lives of underprivileged and vulnerable sections of the society across Uttar Pradesh, Delhi, Punjab, Haryana, Chhattisgarh, Rajasthan, and Uttarakhand. Its key focus areas include women’s empowerment, awareness generation, skill development, sustainable livelihoods, community healthcare with the overarching aim of fostering inclusive growth and bringing about lasting and meaningful positive change in people’s lives."`
  - *Support CTA*: `"Support our work"`
  - *About CTA*: `"About BSGSS"`

### 3.3 Impact Metric Counters (PDF Page 2)
- **Component**: `components/home/HomeImpactCounters.tsx`
- **Config**: Extended `customizer.impactMetrics` with exact audited metrics:
  1. `50 Lac +` – Underprivileged Lives Empowered (Across Northern states through integrated grassroots programs)
  2. `20 Lac +` – Patients Screened & Treated (Free diagnostic oncology, eye checkups & essential medicines)
  3. `36,000 +` – Women Certified in Livelihoods (Vocational tailoring, computer literacy & self-help banking)
  4. `350+` – Village Panchayats Mobilized (Active field deployment across North India clusters)
  5. `35+` – Central & State PSU Alliances (Compliant CSR partnerships under Schedule VII)
  6. `30+` – Years of Unbroken Public Service (Continuous grassroots execution since June 1994)

### 3.4 Interactive Grassroots Map & Telemetry (PDF Pages 3, 4, 5, 6)
- **Component**: `components/impact/InteractiveIndiaMap.tsx`
- **Modifications**:
  1. *National Focus*: Defaulted map view to India Grassroots Network.
  2. *Removed Foreign Locations*: Purged foreign hubs (New York, London, Dubai, Singapore, Sydney) from `data/global-program-data.ts` and map quick-select navigation as instructed on Pages 5 & 6.
  3. *Seven Verified States*: Active state selector now supports:
     - Uttar Pradesh
     - Delhi
     - Punjab
     - Haryana
     - Chhattisgarh
     - Rajasthan
     - Uttarakhand
  4. *Telemetry Cockpit Metrics*:
     - `7 STATES COVERED`
     - `20+ DISTRICTS` (or `6 ACTIVE DISTRICTS` in primary cluster)
     - `350+ VILLAGES`
     - `35 CSR PSU PARTNERS`
  5. *State Field Statistics Labels*:
     - `4 COVERED DISTRICTS` (UP)
     - `23 CSR PROJECTS UNDERTAKEN` (UP)
     - `50+ VILLAGES COVERED` (UP)

### 3.5 Four-Era Chronology of Growth & Our Story Page (PDF Page 7)
- **Components**: `app/(marketing)/about/our-story/page.tsx`, `components/about/StoryExperience.tsx`, `components/about/StoryHero.tsx`, & `config/content.ts`
- **Chronology Title**: Configured exact title `"Chronology of Growth & Development"` on the timeline rail and static view.
- **Timeline Items**: Synchronized with both year and title tags (`1994 – The Beginning`, `2000s – Expanding Livelihoods and Healthcare`, `2010s – Broadening Reach and Impact`, `2020s – Scaling Impact and Outreach`).
- **Story Page Layout**: Added a dedicated comprehensive 4-era timeline grid on `/about/our-story` along with a direct **Download Profile Dossier (PDF)** action button in the hero and section banner.
- **Eras Configured**:
  1. **1994 – The Beginning**: A village-rooted initiative focused on rural development with focus on promotion of Village & Khadi Industries and Handicrafts.
  2. **2000s – Expanding Livelihoods and Healthcare**: Strengthened efforts in sustainable livelihood generation and community healthcare, with an expanding presence in Delhi and Punjab supported by Govt grant-in-aid schemes / programmes.
  3. **2010s – Broadening Reach and Impact**: Expanded sustainable livelihood and healthcare initiatives, strengthening the organisation’s presence across Uttar Pradesh, Punjab, and Haryana, with a growing emphasis on Govt. grant-in-aid schemes and CSR programmes of PSUs.
  4. **2020s – Scaling Impact and Outreach**: Further expanded sustainable livelihood and community healthcare programmes, extending the organisation’s reach across Uttar Pradesh, Haryana, Chhattisgarh, and Uttarakhand, with an increased emphasis on CSR partnerships with PSUs.

### 3.6 Admin Customizer Studio Enhancements
- **Component**: `components/admin/WebsiteCustomizerStudio.tsx`
- **New Admin Studio Capabilities**:
  1. *Texts Tab*: Added GUI controls for Hero Section (Badge rail, Eyebrow, Title, Narrative text, Action CTAs) and all 6 Impact Counter Cards (Target, Suffix, Label, Sublabel).
  2. *Footprint Tab*: Added live telemetry controls for `statesCount`, `districtsCount`, `villagesCount`, and `csrPartnersCount`.
  3. *Offices Tab*: Comprehensive controls for Registered Office and Administrative Office (Line 1, Line 2, City, State, PIN, Phone, Email, Google Maps Destination URL) and WhatsApp action configuration.
  4. *Story Tab*: Full visual management of the 4 Chronology milestones.
  5. *Cache Purge Action*: Instant live publishing to the production site.

---

## 4. Verification & Testing Log

- **TypeScript Compilation**: All types verified with strict TypeScript checks.
- **Next.js Turbopack Build**: Clean compilation across all application routes.
- **Database Integrity**: PostgreSQL persistence in `site_settings` under key `site_customizer` verified with automatic JSON serialization and schema fallback.
- **Dual Display Verification**: Confirmed identical address, phone, and email information across the public footer (`components/layout/Footer.tsx`) and the contact page (`app/(marketing)/contact/page.tsx`).
- **Official Profile Public Asset**: Placed the 48-page dossier at `/documents/bsgss-organisational-profile.pdf` with cover preview `/images/documents/legal/bsgss-organisational-profile.jpg`.
- **Public Website Download Points**: Surfaced direct PDF view/download links across the Document Library (`/about/legal-status`), the About Us hero action strip (`/about`), the Governance & Management page (`/management`), and the global site Footer (`components/layout/Footer.tsx`).
