/**
 * BSGSS Homepage & Website Customizer Configuration
 * Controls section ordering, visibility, collage imagery, live typing headlines, and ambient music soundscapes.
 */

export type HomepageSectionId =
  | "hero"
  | "live_ticker"
  | "photo_collage"
  | "about"
  | "programmes"
  | "media_showcase"
  | "government"
  | "impact_stats"
  | "india_map"
  | "partners"
  | "management"
  | "support_cta";

export type SectionConfig = {
  id: HomepageSectionId;
  name: string;
  category: "hero" | "media" | "content" | "impact" | "partners" | "action";
  enabled: boolean;
  order: number;
  description: string;
};

export type CollagePhotoItem = {
  id: string;
  src: string;
  title: string;
  category: string;
  tag: string;
  caption: string;
  year?: string;
  tilt: "-rotate-2" | "-rotate-1" | "rotate-0" | "rotate-1" | "rotate-2";
  featured?: boolean;
};

export type AmbientTrackPreset = {
  id: string;
  name: string;
  genre: string;
  description: string;
  audioUrl?: string; // Optional remote MP3/stream; falls back to Web Audio soothing synthesizer
};

export type AmbientAudioConfig = {
  enabled: boolean;
  trackId: string;
  customUrl: string;
  defaultVolume: number; // 0.05 to 1.0 (default 0.25)
  clickSounds: boolean;
};

export type LiveTypingConfig = {
  eyebrow: string;
  phrases: string[];
  statusText: string;
};

export type CustomizerImagesConfig = {
  heroSlides: string[];
  collagePhotos: CollagePhotoItem[];
};

export type CustomizerSettings = {
  sections: SectionConfig[];
  audio: AmbientAudioConfig;
  typing: LiveTypingConfig;
  images: CustomizerImagesConfig;
};

export const AMBIENT_TRACK_PRESETS: AmbientTrackPreset[] = [
  {
    id: "santoor-serenity",
    name: "Gramodyog Santoor Serenity",
    genre: "Acoustic Santoor & Tanpura Drone",
    description: "Gentle acoustic Kashmiri santoor plucks layered with deep calming tanpura resonance, designed specifically for peaceful rural reflection.",
    audioUrl: "/audio/gramodyog-santoor-serenity.m4a",
  },
  {
    id: "kashmiri-santur",
    name: "Kashmiri Santur & Hypnotic Tanpura",
    genre: "Santur, Tanpura & Atmospheric Strings",
    description: "Exquisite Kashmiri santur strokes layered over a deep hypnotic tanpura drone and subtle atmospheric strings.",
    audioUrl: "/audio/kashmiri-santur-tanpura.m4a",
  },
  {
    id: "sitar-sunset",
    name: "Sitar Sunset Serenity",
    genre: "Meditative Classical Sitar",
    description: "Slow, contemplative acoustic sitar phrases with calming sympathetic string decay, perfect for peaceful reflection.",
    audioUrl: "/audio/sitar-sunset-serenity.m4a",
  },
  {
    id: "sitar-raga",
    name: "Classical Sitar Morning Alaap",
    genre: "Indian Classical Sitar",
    description: "Contemplative morning raga played on traditional acoustic sitar with delicate sympathetic string resonance.",
    audioUrl: "/audio/sitar-serenity-raga.mp3",
  },
  {
    id: "ananda-sitar",
    name: "Ananda Sitar Harmony",
    genre: "Uplifting Indian Sitar",
    description: "Joyful, melodious sitar cadence bringing gentle optimism, warmth, and dignity to community engagement.",
    audioUrl: "/audio/ananda-sitar-harmony.m4a",
  },
  {
    id: "veena-sitar",
    name: "Saraswati Veena & Sitar Jugalbandi",
    genre: "Classical String Duet",
    description: "Sacred acoustic conversation between the South Indian Saraswati Veena and traditional North Indian Sitar.",
    audioUrl: "/audio/veena-sitar-jugalbandi.m4a",
  },
  {
    id: "raga-yaman",
    name: "Evening Raga Yaman Alaap",
    genre: "Kalyan Thaat Classical Raga",
    description: "The quintessential twilight raga of peace, patience, and devotion played with pristine classical authenticity.",
    audioUrl: "/audio/raga-yaman-alaap.m4a",
  },
  {
    id: "sarod-serenity",
    name: "Classical Sarod Serenity (Raga Bhairav)",
    genre: "Acoustic Sarod Solo",
    description: "Meditative metallic glides of the classical Indian Sarod on steel strings in the dawn raga Bhairav.",
    audioUrl: "/audio/classical-sarod-serenity.m4a",
  },
  {
    id: "sarvodaya-flute",
    name: "Bansuri Dawn Meditation",
    genre: "Meditative Indian Bamboo Flute",
    description: "Peaceful morning bamboo flute melody capturing the tranquility of Indian village dawns.",
    audioUrl: "/audio/bansuri-meditation.mp3",
  },
  {
    id: "carnatic-flute",
    name: "Carnatic Wind Serenity",
    genre: "Classical Indian Flute",
    description: "Acoustic 8-hole bamboo flute playing contemplative phrases for deep relaxation.",
    audioUrl: "/audio/carnatic-flute-serenity.mp3",
  },
  {
    id: "dakshin-venu",
    name: "Dakshin Venu Flute Alaap",
    genre: "Devotional South Indian Flute",
    description: "Traditional bamboo flute playing devotional South Indian gamaka phrases in peaceful stillness.",
    audioUrl: "/audio/dakshin-venu-flute.m4a",
  },
  {
    id: "sacred-om-drone",
    name: "Sacred Om (136.1 Hz) & Tanpura Drone",
    genre: "Cosmic Drone & Tanpura Plucks",
    description: "Continuous cosmic fundamental drone tuned to the sacred 136.1 Hz frequency layered with rhythmic Tanpura plucks.",
    audioUrl: "/audio/sacred-om-tanpura-drone.m4a",
  },
  {
    id: "peaceful-piano",
    name: "Sarvodaya Hope Piano & Strings",
    genre: "Warm Ambient Piano Pad",
    description: "Soothing acoustic felt piano arpeggios over warm atmospheric orchestral strings, creating an uplifting and dignified ambiance.",
    audioUrl: "/audio/peaceful-ambient-piano.m4a",
  },
  {
    id: "tranquil-piano",
    name: "Tranquil Dawn Piano & Synth Pad",
    genre: "Minimalist Ambient Piano",
    description: "Minimalist soothing piano notes floating softly over warm atmospheric synth pads for deep mental calm.",
    audioUrl: "/audio/tranquil-dawn-piano.m4a",
  },
  {
    id: "himalayan-spiritual",
    name: "Himalayan Spiritual Breeze",
    genre: "Spatial New Age Ambiance",
    description: "Calm spatial soundscape with ethereal harmonic chords inspiring hope, service, and quiet stillness.",
    audioUrl: "/audio/himalayan-spiritual-breeze.m4a",
  },
  {
    id: "gramin-sunset",
    name: "Gramin Sunset Folk Acoustic",
    genre: "Warm Acoustic Guitar & Strings",
    description: "Nostalgic, heartfelt acoustic fingerpicking capturing the quiet beauty of rural Indian villages at dusk.",
    audioUrl: "/audio/gramin-sunset-acoustic.m4a",
  },
  {
    id: "vedic-temple-chimes",
    name: "Vedic Temple Chimes & Singing Bowls",
    genre: "Resonant Singing Bowls",
    description: "Pure harmonic singing bowl frequencies and temple chime overtones creating a serene contemplative sanctuary.",
    audioUrl: "/audio/vedic-temple-chimes.m4a",
  },
  {
    id: "bamboo-zen-chimes",
    name: "Bamboo Zen Wind Chimes",
    genre: "Organic Wind Percussion",
    description: "Delicate natural bamboo tubes gently swaying in the breeze, producing soft wooden acoustic intervals.",
    audioUrl: "/audio/bamboo-zen-wind-chimes.m4a",
  },
  {
    id: "himalayan-rain",
    name: "Himalayan Monsoon Rain & Stream",
    genre: "Natural Water & Raindrops",
    description: "Gentle natural rain falling on lush leaves with the distant soothing murmur of a mountain stream.",
    audioUrl: "/audio/himalayan-monsoon-stream.m4a",
  },
  {
    id: "morning-forest-birds",
    name: "Morning Forest Sunrise & Birds",
    genre: "Natural Forest Soundscape",
    description: "Authentic dawn chorus of songbirds singing amidst a gentle morning forest breeze.",
    audioUrl: "/audio/morning-forest-birds.m4a",
  },
  {
    id: "custom-stream",
    name: "Custom Hosted Audio / MP3 Stream",
    genre: "External Audio URL",
    description: "Provide your own hosted MP3 or audio stream URL.",
  },
];

export const DEFAULT_CUSTOMIZER_SETTINGS: CustomizerSettings = {
  sections: [
    {
      id: "hero",
      name: "Hero Banner Carousel",
      category: "hero",
      enabled: true,
      order: 1,
      description: "Full-width photographic slideshow with primary mission statement and support links.",
    },
    {
      id: "live_ticker",
      name: "Live Mission & Typing Ticker",
      category: "content",
      enabled: true,
      order: 2,
      description: "Interactive typewriter text showcasing dynamic mission statements with real-time operational pulse.",
    },
    {
      id: "photo_collage",
      name: "Stylish Collage Exhibition",
      category: "media",
      enabled: true,
      order: 3,
      description: "Magazine-style asymmetric photo collage showcasing authentic grassroots field operations.",
    },
    {
      id: "about",
      name: "About BSGSS Story & Scope",
      category: "content",
      enabled: true,
      order: 4,
      description: "The founding story since 1994, village roots, and 4 trust highlight cards.",
    },
    {
      id: "programmes",
      name: "Key Development Programmes",
      category: "content",
      enabled: true,
      order: 5,
      description: "Education, healthcare, skills training, and women empowerment pathways.",
    },
    {
      id: "media_showcase",
      name: "Community Action & Video Showcase",
      category: "media",
      enabled: true,
      order: 6,
      description: "Interactive tabs featuring photo moments, YouTube videos, and newspaper press clippings.",
    },
    {
      id: "government",
      name: "State & Central Govt Activities",
      category: "impact",
      enabled: true,
      order: 7,
      description: "Institutional public-purpose initiatives and government-aligned grassroots programmes.",
    },
    {
      id: "impact_stats",
      name: "Verified Impact Numbers",
      category: "impact",
      enabled: true,
      order: 8,
      description: "Key verifiable metrics: 50,000+ reached, 30,000+ patients treated, 5,000+ women trained.",
    },
    {
      id: "india_map",
      name: "Interactive India Operations Map",
      category: "impact",
      enabled: true,
      order: 9,
      description: "Interactive SVG map highlighting the 5 states and active districts of BSGSS presence.",
    },
    {
      id: "partners",
      name: "CSR Partnerships & Logo Marquee",
      category: "partners",
      enabled: true,
      order: 10,
      description: "Institutional CSR collaborators with interactive scrolling logo wall.",
    },
    {
      id: "management",
      name: "Leadership & Governance",
      category: "content",
      enabled: true,
      order: 11,
      description: "Profiles and guiding messages from Chairperson and CEO.",
    },
    {
      id: "support_cta",
      name: "Support & Contribution Banner",
      category: "action",
      enabled: true,
      order: 12,
      description: "Encouraging call to action with direct links to UPI, bank transfer, and 80G tax exemptions.",
    },
  ],
  audio: {
    enabled: true,
    trackId: "santoor-serenity",
    customUrl: "",
    defaultVolume: 0.22,
    clickSounds: true,
  },
  typing: {
    eyebrow: "LIVE SARVODAYA MOVEMENT · ACTIVE ACROSS 5 STATES",
    phrases: [
      "Empowering 1,00,000+ rural women through skill training & economic self-reliance.",
      "Conducting free cancer screenings & preventive medical care in 350+ villages.",
      "Nurturing sustainable livelihoods with Khadi, embroidery & Self Help Groups.",
      "Delivering transparent, verified grassroots change alongside 30+ CSR partners.",
      "Serving communities with dedication, dignity & equal opportunity since 1994.",
    ],
    statusText: "Field Operations Active in Delhi NCR · Haryana · UP · Punjab · Rajasthan",
  },
  images: {
    heroSlides: [
      "/images/bsgss/banners/589-banner-1.webp",
      "/images/bsgss/banners/590-banner-2.webp",
      "/images/bsgss/banners/592-banner-3.webp",
      "/images/bsgss/banners/593-untitled-4.webp",
    ],
    collagePhotos: [
      {
        id: "c1",
        src: "/images/bsgss/gallery-community/203-whatsapp-image-2025-10-09-at-16-49-35-618e38b6.jpg",
        title: "Women Vocational Center",
        category: "Skill Development",
        tag: "Delhi NCR",
        caption: "Hands-on garment cutting and professional stitching training for rural young women.",
        year: "Active Hub",
        tilt: "-rotate-1",
        featured: true,
      },
      {
        id: "c2",
        src: "/images/bsgss/healthcare-camps/149-camp1.jpeg",
        title: "Mobile Health & Cancer Screening",
        category: "Healthcare",
        tag: "Rural Outreach",
        caption: "Specialist doctors providing free consultations, cancer diagnostics, and essential medicines.",
        year: "Field Clinic",
        tilt: "rotate-2",
      },
      {
        id: "c3",
        src: "/images/bsgss/gallery-training/185-tal1.jpeg",
        title: "Master Tailoring Class",
        category: "Empowerment",
        tag: "Self Reliance",
        caption: "Certification in apparel construction leading to micro-enterprise incubation.",
        year: "Vocational Batch",
        tilt: "-rotate-2",
      },
      {
        id: "c4",
        src: "/images/bsgss/gallery-community/200-whatsapp-image-2025-10-09-at-16-49-32-aab7df99.jpg",
        title: "Village Women Council",
        category: "Social Justice",
        tag: "Community Action",
        caption: "Participatory village meetings where women decide local priorities and development plans.",
        year: "Grassroots Circle",
        tilt: "rotate-1",
      },
      {
        id: "c5",
        src: "/images/bsgss/gallery-community/196-whatsapp-image-2025-10-09-at-16-49-28-cc32c34a.jpg",
        title: "Youth Digital & Life Skills",
        category: "Education",
        tag: "Digital Literacy",
        caption: "Introducing basic computer operations, typing, and digital tools to first-generation learners.",
        year: "Learning Lab",
        tilt: "-rotate-1",
      },
      {
        id: "c6",
        src: "/images/bsgss/healthcare-camps/150-camp3.jpeg",
        title: "Specialist Medical Consultations",
        category: "Wellness",
        tag: "Free Medicines",
        caption: "Direct healthcare access for elder villagers and mothers in remote districts.",
        year: "Health Camp",
        tilt: "rotate-2",
      },
    ],
  },
};
