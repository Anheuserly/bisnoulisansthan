export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  location: string;
}

export const storyMilestones: StoryMilestone[] = [
  {
    id: "1994",
    year: "1994",
    category: "Foundation",
    title: "A village-rooted beginning",
    description: "BSGSS was founded in Bisnouli village, Dadri Tehsil, with a simple belief: communities thrive when people have access to opportunity, practical support and a voice in their own development.",
    image: "/images/bsgss/banners/30-aboutpage-hero.jpg",
    imageAlt: "BSGSS community programme participants",
    location: "Bisnouli, Uttar Pradesh",
  },
  {
    id: "community",
    year: "1990s",
    category: "Community development",
    title: "Turning participation into progress",
    description: "The work grew around the day-to-day priorities of families: education, health awareness, village industries and greater economic participation for women.",
    image: "/images/bsgss/gallery-community/191-whatsapp-image-2025-10-09-at-15-55-32-c60ee022.jpg",
    imageAlt: "A BSGSS community programme",
    location: "North India",
  },
  {
    id: "skills",
    year: "2000s",
    category: "Skills and livelihoods",
    title: "Capability that opens doors",
    description: "Vocational learning and digital literacy created practical pathways for young people and women to build confidence, apply skills and explore routes towards income generation.",
    image: "/images/bsgss/gallery-training/185-tal1.jpeg",
    imageAlt: "BSGSS vocational training activity",
    location: "Programme communities",
  },
  {
    id: "health",
    year: "2010s",
    category: "Health access",
    title: "Bringing care closer to home",
    description: "Community health camps and awareness programmes helped bring information, preventive support and essential health services closer to people who need them.",
    image: "/images/bsgss/healthcare-camps/149-camp1.jpeg",
    imageAlt: "BSGSS healthcare camp",
    location: "Community outreach",
  },
  {
    id: "today",
    year: "Today",
    category: "Shared futures",
    title: "Self-reliance in motion",
    description: "Today, BSGSS connects education, healthcare, skills, women’s empowerment and institutional partnerships - keeping community dignity and long-term self-reliance at the centre.",
    image: "/images/bsgss/gallery-events/355-1-1.jpg",
    imageAlt: "BSGSS event and community engagement",
    location: "Uttar Pradesh, Delhi, Haryana and Punjab",
  },
];
