import { partners } from "@/components/partners/partners-data";

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
    category: "The Beginning",
    title: "1994 – The Beginning",
    description: "A village-rooted initiative focused on rural development with focus on promotion of Village & Khadi Industries and Handicrafts.",
    image: "/images/bsgss/legacy-page-assets/44-homepage-aboutus.jpg",
    imageAlt: "Foundational village handloom and craft outreach",
    location: "Bisnouli village, Dadri Tehsil, Uttar Pradesh",
  },
  {
    id: "2000s",
    year: "2000s",
    category: "Expanding Livelihoods & Healthcare",
    title: "2000s – Expanding Livelihoods and Healthcare",
    description: "Strengthened efforts in sustainable livelihood generation and community healthcare, with an expanding presence in Delhi and Punjab supported by Govt grant-in-aid schemes / programmes.",
    image: "/images/bsgss/gallery-training/185-tal1.jpeg",
    imageAlt: "Women vocational training and healthcare initiatives",
    location: "Delhi, Punjab & Uttar Pradesh",
  },
  {
    id: "2010s",
    year: "2010s",
    category: "Broadening Reach & Impact",
    title: "2010s – Broadening Reach and Impact",
    description: "Expanded sustainable livelihood and healthcare initiatives, strengthening the organisation’s presence across Uttar Pradesh, Punjab, and Haryana, with a growing emphasis on Govt. grant-in-aid schemes and CSR programmes of PSUs.",
    image: "/images/bsgss/healthcare-camps/150-camp3.jpeg",
    imageAlt: "Healthcare screening camps and PSU CSR initiatives",
    location: "Uttar Pradesh, Punjab & Haryana",
  },
  {
    id: "2020s",
    year: "2020s",
    category: "Scaling Impact & Outreach",
    title: "2020s – Scaling Impact and Outreach",
    description: "Further expanded sustainable livelihood and community healthcare programmes, extending the organisation’s reach across Uttar Pradesh, Haryana, Chhattisgarh, and Uttarakhand, with an increased emphasis on CSR partnerships with PSUs.",
    image: "/images/bsgss/gallery-events/355-1-1.jpg",
    imageAlt: "Institutional scale and community self-reliance",
    location: "Uttar Pradesh, Haryana, Chhattisgarh & Uttarakhand",
  },
];

export interface IndiaStateProgram {
  state: string;
  districts: string[];
  villages: number | null;
  programs: number;
}

const stateLabels = [
  "Uttar Pradesh",
  "Delhi",
  "Punjab",
  "Haryana",
  "Chhattisgarh",
  "Rajasthan",
  "Uttarakhand",
] as const;

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z]/g, "");

const aliases: Record<string, string> = {
  delhi: "delhi",
  nctofdelhi: "delhi",
  orissa: "odisha",
  uttaranchal: "uttarakhand",
  uttarakhand: "uttarakhand",
  rajsthan: "rajasthan",
  rajasthan: "rajasthan",
};

export function normaliseStateName(name: string) {
  const cleaned = normalise(name);
  return aliases[cleaned] ?? cleaned;
}

function stateFromLocation(location: string) {
  return stateLabels.find((state) => normaliseStateName(location).includes(normaliseStateName(state)));
}

export const stateProgramRecords: Record<string, { districts: string[]; villages: number; programs: number }> = {
  "Uttar Pradesh": {
    districts: ["Gautam Buddha Nagar", "Ghaziabad", "Meerut", "Prayagraj"],
    villages: 50,
    programs: 23,
  },
  "Delhi": {
    districts: ["Central Delhi", "South Delhi", "South East Delhi", "East Delhi"],
    villages: 40,
    programs: 12,
  },
  "Punjab": {
    districts: ["Gurdaspur", "Amritsar", "Pathankot"],
    villages: 45,
    programs: 8,
  },
  "Haryana": {
    districts: ["Nuh (Mewat)", "Gurugram", "Faridabad", "Palwal"],
    villages: 85,
    programs: 18,
  },
  "Chhattisgarh": {
    districts: ["Bastar", "Raipur"],
    villages: 30,
    programs: 6,
  },
  "Rajasthan": {
    districts: ["Gangapur City", "Sawai Madhopur", "Alwar"],
    villages: 40,
    programs: 8,
  },
  "Uttarakhand": {
    districts: ["Dehradun", "Haridwar"],
    villages: 25,
    programs: 5,
  },
};

export const indiaProgramData: IndiaStateProgram[] = stateLabels.map((state) => {
  const customRecord = stateProgramRecords[state];
  if (customRecord) {
    return {
      state,
      districts: customRecord.districts,
      villages: customRecord.villages,
      programs: customRecord.programs,
    };
  }

  const records = partners.filter((partner) => partner.locations.some((location) => stateFromLocation(location) === state));
  const districts = [...new Set(records.flatMap((partner) => partner.locations.filter((location) => stateFromLocation(location) === state).map((location) => location.split(",")[0]!)))].sort();

  return { state, districts, villages: 30, programs: records.length || 5 };
});

export const indiaProgrammeTotals = {
  states: 7,
  districts: 22,
  villages: 350,
};

export function getIndiaStateProgram(stateName: string) {
  const target = normaliseStateName(stateName);
  return indiaProgramData.find((state) => normaliseStateName(state.state) === target);
}

/**
 * BSGSS public-site content registry.
 *
 * Edit copy, labels, media paths and internal routes here. Page components
 * should render these values rather than owning editorial text themselves.
 */
export const links = {
  home: "/", about: "/about", story: "/about/our-story", management: "/management", legal: "/about/legal-status", partners: "/about/partners",
  work: "/our-work", activities: "/activities", programmes: "/activities/key-programmes", gallery: "/activities/gallery", videos: "/activities/videos", media: "/activities/work-in-media", products: "/activities/shg-products", government: "/activities-under-state-central-government",
  impact: "/impact", support: "/support", join: "/join-us", contact: "/contact",
} as const;

export const content = {
  site: {
    description: "BSGSS is a voluntary organisation empowering communities through education, healthcare, skill development and women's empowerment.",
    footerDescription: "A voluntary organisation advancing education, healthcare, skills and women’s empowerment through practical, community-led development since 1994.",
    youtubeUrl: "https://www.youtube.com/@BISNOULISANSTHAN",
    developerCredit: "Developed by Star Computer Solutions & Infosys",
    developerUrl: "https://www.scsi.in/",
    email: "bisnoulisansthan@gmail.com",
    website: "https://bisnoulisansthan.in",
    social: {
      youtube: "https://www.youtube.com/@BISNOULISANSTHAN",
      facebook: "https://www.facebook.com/bisnoulisansthan/",
      instagram: "https://www.instagram.com/bisnoulisansthan/",
      twitter: "https://twitter.com/bisnoulisansthan",
      linkedin: "https://www.linkedin.com/company/bisnouli-sarvodaya-gramodyog-sewa-sansthan/",
      whatsapp: "https://wa.me/919871324838?text=Hello%20BSGSS,%20I%20would%20like%20to%20connect%20regarding%20community%20programmes",
    },
  },
  home: {
    metadataTitle: "Community development since 1994",
    hero: {
      badge: "Established in 1994 | Registration No. 226/1994-95, dated 15-06-1994 | 30+ Years of Service",
      eyebrow: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan",
      title: "Empowering communities. Creating opportunities.",
      text: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS) ,a non-governmental organisation with over three decades of experience in community development, is working to improve the lives of underprivileged and vulnerable sections of the society across Uttar Pradesh, Delhi, Punjab, Haryana, Chhattisgarh, Rajasthan, and Uttarakhand. Its key focus areas include women’s empowerment, awareness generation, skill development, sustainable livelihoods, community healthcare with the overarching aim of fostering inclusive growth and bringing about lasting and meaningful positive change in people’s lives.",
      supportCta: "Support our work",
      aboutCta: "About BSGSS",
      slides: ["/images/bsgss/banners/589-banner-1.webp", "/images/bsgss/banners/590-banner-2.webp", "/images/bsgss/banners/592-banner-3.webp", "/images/bsgss/banners/593-untitled-4.webp"],
    },
    government: { eyebrow: "Public-purpose programmes", title: "Government-supported work, made practical at community level.", text: "Awareness, education, health and livelihood activity helps communities understand public support, strengthen local groups and access services.", cta: "Learn about the programmes", overviewEyebrow: "Activities under State & Central Government", overviewTitle: "Connecting people with knowledge, services and opportunity.", overviewText: "BSGSS has implemented community-based initiatives supported through Central and State Government schemes, combining outreach with training, awareness, health and livelihood support in Uttar Pradesh and neighbouring states.", overviewCta: "Read more" },
    about: { eyebrow: "About us", title: "A practical commitment to dignity and self-reliance.", text: "Founded in Bisnouli village, Dadri Tehsil, BSGSS is a registered voluntary organisation. Its community-led work brings together education, healthcare, vocational training, micro-finance and support for women so that families can create sustainable futures." },
    programmes: [
      {
        title: "Education & digital literacy",
        text: "Supporting learning opportunities and practical digital skills for children, young people and families.",
        image: "/images/bsgss/education/156-class7.jpeg",
        imageAlt: "Children learning together in a BSGSS education class",
      },
      {
        title: "Healthcare initiatives",
        text: "Mobile clinics, free health check-up camps, immunisation, nutrition drives and health awareness programmes.",
        image: "/images/bsgss/healthcare-camps/149-camp1.jpeg",
        imageAlt: "Community healthcare camp supported by BSGSS",
      },
      {
        title: "Skills & livelihoods",
        text: "Vocational training in tailoring, computer literacy, beauty culture, English communication and entrepreneurship.",
        image: "/images/bsgss/gallery-training/185-tal1.jpeg",
        imageAlt: "Women taking part in BSGSS vocational skills training",
      },
      {
        title: "Women’s empowerment",
        text: "Action for Micro-Finance and Rehabilitation (AMAR), self-help groups and income-generation opportunities.",
        image: "/images/bsgss/gallery-community/254-whatsapp-image-2025-10-09-at-16-49-29-e802fef2-1.jpg",
        imageAlt: "Women participating in a BSGSS community programme",
      },
    ],
    impact: {
      eyebrow: "Our reach and measurable outcomes",
      title: "Progress that is practical and people-centred.",
      cta: "Explore our impact",
      stats: [
        { number: "50 Lac +", label: "Underprivileged Lives Empowered" },
        { number: "20 Lac +", label: "Patients Screened & Treated" },
        { number: "36,000 +", label: "Women Certified in Livelihoods" },
      ],
    },
    management: { eyebrow: "Message from the Management", title: "Dignity, justice and equal opportunity guide our work.", text: "BSGSS leadership is focused on practical, sustainable solutions that support women, families and communities to build healthier, more self-reliant futures.", cta: "Read leadership messages" },
  },
  about: {
    metadataTitle: "About BSGSS", title: "Building self-reliant communities since 1994.", eyebrow: "About BSGSS",
    introduction: ["Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS) is a registered voluntary organisation founded in Bisnouli village, Dadri Tehsil, Uttar Pradesh. We foster sustainable socio-economic development through education, healthcare, vocational training and women’s empowerment.", "Working across Uttar Pradesh, Delhi, Punjab and Haryana, BSGSS brings together professionals, local partners and volunteers to help underprivileged communities build capability, confidence and economic independence."],
    images: { skills: "/images/bsgss/other-source-assets/233-1.jpg", health: "/images/bsgss/gallery-jac/161-jac3.jpg" },
    journey: { eyebrow: "Our journey", title: "From village-rooted self-reliance to wider community action.", heading: "A practical idea, carried forward by people.", body: ["BSGSS began with a vision to empower rural communities by promoting village and cottage industries and strengthening self-reliance among underprivileged groups. Socially conscious leaders and activists came together around a shared aim: inclusive growth that could be sustained locally.", "Over time, the organisation expanded its work under the guidance of Shri Vijay Kumar Jha (Ex-IPS) and Smt. Nandita Bakshi (Ex-IRS), establishing an administrative office in New Delhi and building community-development programmes with broader reach.", "Today, the same commitment shapes BSGSS work across learning, health, livelihoods, women’s agency and community participation."] },
    mission: { eyebrow: "Our mission", title: "Create positive change through practical, sustainable and community-driven solutions.", text: "Our mission is to bring positive change to the lives of poor and marginalised people. We focus on empowering women, enabling access to quality healthcare, promoting education and skill training, and encouraging micro-finance for economic independence." },
    missionCards: [
      { title: "Access & wellbeing", text: "Supporting communities with healthcare outreach, awareness and pathways to essential services." },
      { title: "Agency & opportunity", text: "Building skills, livelihoods and stronger opportunities for women and families." },
    ],
    explore: [
      { title: "Our story", text: "Discover the journey from a village-rooted idea to practical community development.", href: links.story },
      { title: "Management", text: "Read messages from the leadership guiding BSGSS community work.", href: links.management },
      { title: "Legal status", text: "Access registrations, certificates and public compliance documents.", href: links.legal },
      { title: "Our partners", text: "Recognising CSR and government partners in social development through the years.", href: links.partners },
      { title: "Our work", text: "Explore the programmes that connect education, health, skills and women’s empowerment.", href: links.work },
    ],
  },
  impact: {
    metadataTitle: "Impact", title: "Our impact", lead: "Change is most durable when it is useful, local and carried forward by the community.", eyebrow: "How we measure progress", heading: "Beyond a one-time intervention.", text: "BSGSS looks for practical outcomes: people informed, skills applied, services reached, and communities better able to shape their own futures.",
    outcomes: [["Learning", "More access to learning support, digital exposure and skills that can expand a young person’s choices."], ["Wellbeing", "Health camps and awareness activities help communities access information and preventive support closer to home."], ["Livelihoods", "Vocational learning and local enterprise support turn capability into routes towards income and independence."], ["Women’s agency", "Women’s groups and economic participation create stronger voices, networks and financial resilience."]],
  },
  activities: {
    metadataTitle: "Activities", title: "Activities", lead: "A view into BSGSS programmes, training, community outreach and women-led enterprise.",
    keyProgrammes: {
      metadataTitle: "Our Key Programmes",
      title: "Our Key Programmes",
      lead: "Practical programmes that connect health, livelihoods and community opportunity.",
      eyebrow: "What BSGSS delivers",
      heading: "Community support that meets people where they are.",
      text: "BSGSS combines community participation with practical support so that people can access essential services, develop skills and create more secure futures.",
      programmes: [
        { title: "Action for Micro-Finance and Rehabilitation (AMAR)", text: "Fostering self-sufficiency through self-help groups, micro-credit support and income-generation opportunities.", image: "/images/bsgss/healthcare-camps/151-camp4.jpeg", focus: "Women’s agency & livelihoods" },
        { title: "Healthcare Initiatives", text: "Running mobile clinics, free health check-up camps, immunisation and nutrition drives, and health awareness programmes across rural areas.", image: "/images/bsgss/education/146-class1.jpeg", focus: "Care closer to home" },
        { title: "Skill Development and Vocational Training", text: "Providing training in tailoring, computer literacy, beauty culture, English communication and entrepreneurship to enhance employability.", image: "/images/bsgss/gallery-training/147-tal5-scaled.jpeg", focus: "Skills for independence" },
      ],
    },
    photoGallery: {
      metadataTitle: "Photo Gallery",
      title: "Photo Gallery",
      lead: "A visual record of BSGSS programmes, people and community participation.",
      source: "https://bisnoulisansthan.in/gallery/",
      images: [1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map((number) => ({
        title: `BSGSS community activity ${number}`,
        src: `https://bisnoulisansthan.in/wp-content/uploads/2025/10/${number}.jpg`,
      })),
    },
    media: { metadataTitle: "Work in Media", title: "Work in Media", lead: "A collection of public media clippings featuring BSGSS community activities, campaigns and health outreach.", eyebrow: "Public coverage", heading: "Community work, recognised in the public record.", text: "These source clippings document public coverage of BSGSS-supported activities. They include reporting on health outreach, cleanliness campaigns and local community programmes. Open any clipping to read it at full size.", archiveEyebrow: "Media archive", archiveHeading: "Selected press clippings" },
    videos: [
      { id: "_NJEaW31PMQ", title: "JAN AROYAM MASK" },
      { id: "vOO9N5JYFy0", title: "PETRONET JA ULETA NUH" },
      { id: "YOicrIqGGQo", title: "HPCL JA KHORBASAI" },
      { id: "h6d9CXXnE-k", title: "GAIL BHOGIPUR NUH" },
      { id: "QMWCDNWPAvI", title: "IREDA JA DHULAWAT" },
      { id: "fu9TA2eaPqQ", title: "BHEL Sangail 17 02 2022" },
      { id: "6MaEG1t6bBA", title: "IGL JA KHORA COLONY" },
      { id: "6lVxgjEB8NA", title: "NTPC JA BAJEDA" },
      { id: "BJcqWcy-Kq4", title: "NMDC SKILL NUH" },
      { id: "fJzsBb8MSkc", title: "NMDC DAIRY LOAN DISTRIBUTION" },
      { id: "o7HRdlULgH4", title: "ONGC JA ALDUKA" },
      { id: "y4ev0vZPp7A", title: "NTPC SKILL KHORA" },
      { id: "VE3l7vK20t8", title: "BPCL SWACHHATA PAKHWADA KHORA" },
      { id: "naLTm0TLDhI", title: "BPCL SWACHHATA PAKHWADA GURDASPUR" },
      { id: "IheB4x_ThC4", title: "BPCL JAN AROGYAM KHORA COLONY" },
      { id: "C4B4k2lgheo", title: "IRCON SKILL KHORA" },
      { id: "2G9Xs6SQt2M", title: "IRCON SKILL KHORA" },
      { id: "PCewFDAH_js", title: "IRCON KANWARSIKA" },
      { id: "_SNsmlEd_Cs", title: "IRCON KHORA" },
      { id: "dvqKpspfooo", title: "RITES JA KHORA COLONY" },
      { id: "1yEAAwlhP1U", title: "RITES KHORA" },
      { id: "_R8qd6Je8UI", title: "RITES HILALPUR CANCER CAMP" },
      { id: "QZ7IWq9LRyA", title: "RITES HILALPUR" },
    ],
    videoGallery: { metadataTitle: "Video Gallery", title: "Video Gallery", lead: "Watch BSGSS community outreach, health camps and programme activities.", eyebrow: "Watch BSGSS in action", heading: "Community stories, directly from the field.", youtubeCta: "Open YouTube" },
    clippings: [
      { image: "191-whatsapp-image-2025-10-09-at-15-55-32-c60ee022.jpg", outlet: "Dainik Bhaskar", title: "Cleanliness fortnight campaign in Noida" }, { image: "192-whatsapp-image-2025-10-09-at-15-55-32-dd874b0a.jpg", outlet: "Veer Arjun", title: "Joint cleanliness campaign in Noida" }, { image: "193-whatsapp-image-2025-10-09-at-15-55-33-3c50f567.jpg", outlet: "Jagat Kranti", title: "Free health camp in Bastar" }, { image: "194-whatsapp-image-2025-10-09-at-15-55-33-532afc9f.jpg", outlet: "Media coverage", title: "BSGSS community programme" }, { image: "196-whatsapp-image-2025-10-09-at-16-49-28-cc32c34a.jpg", outlet: "Media coverage", title: "Community outreach activity" }, { image: "198-whatsapp-image-2025-10-09-at-16-49-29-e802fef2.jpg", outlet: "Media coverage", title: "BSGSS programme coverage" }, { image: "200-whatsapp-image-2025-10-09-at-16-49-32-aab7df99.jpg", outlet: "Media coverage", title: "Community-development initiative" }, { image: "201-whatsapp-image-2025-10-09-at-16-49-34-40e80876.jpg", outlet: "Media coverage", title: "Local community activity" }, { image: "202-whatsapp-image-2025-10-09-at-16-49-35-5e1b9a12.jpg", outlet: "Media coverage", title: "BSGSS field work" }, { image: "203-whatsapp-image-2025-10-09-at-16-49-35-618e38b6.jpg", outlet: "Media coverage", title: "Community support programme" }, { image: "204-whatsapp-image-2025-10-09-at-16-49-35-fd267bae.jpg", outlet: "Media coverage", title: "Public-interest initiative" }, { image: "205-whatsapp-image-2025-10-09-at-16-49-36-3cba5966.jpg", outlet: "Media coverage", title: "BSGSS in the media" }, { image: "206-whatsapp-image-2025-10-09-at-16-49-36-d00f56ee.jpg", outlet: "Media coverage", title: "Community programme coverage" },
    ],
  },
  story: {
    metadataTitle: "Our Story",
    title: "Our Story",
    lead: "The journey of Bisnouli Sarvodaya Gramodyog Sewa Sansthan since 1994.",
    eyebrow: "Our journey",
    heading: "A journey of practical change, shaped with communities.",
    heroDescription: "Since 1994, BSGSS has worked alongside people across North India to turn access to learning, health and livelihoods into lasting opportunity.",
    heroImage: "/images/bsgss/banners/589-banner-1.webp",
  },
  join: {
    metadataTitle: "Join Us & Volunteer",
    title: "Join Us",
    lead: "Bring your time, skills, ideas or institutional support to empower rural communities and advance women's self-reliance.",
    eyebrow: "Get Involved with BSGSS",
    heading: "Choose how you would like to contribute.",
    description: "Whether you want to volunteer on the ground, explore student internships, establish a CSR partnership, or share vocational skills, BSGSS welcomes your participation.",
    emailSubject: "Joining BSGSS",
    roles: [
      {
        id: "volunteer",
        label: "Volunteer (Field & Community Outreach)",
        shortTitle: "Volunteer",
        badge: "Grassroots Support",
        suggestedSubject: "Volunteering Interest — Field Outreach & Community Support",
        suggestedMessage: "I would like to volunteer my time with BSGSS. I am interested in supporting community education drives, health camps, or women's empowerment initiatives on the ground. Please connect me with upcoming programmes.",
        description: "Contribute your time to grassroots camps, literacy activities, and community drives.",
      },
      {
        id: "internship",
        label: "Student & Academic Internship",
        shortTitle: "Internship",
        badge: "Students & Youth",
        suggestedSubject: "Student Internship Application — Social Sector Exposure",
        suggestedMessage: "I am applying for an internship opportunity with BSGSS. I want to contribute to programme documentation, field coordination, and community learning while building practical social sector experience.",
        description: "Build hands-on social work experience in field coordination, research, and documentation.",
      },
      {
        id: "csr_partner",
        label: "Corporate CSR & Institutional Partner",
        shortTitle: "CSR Partnership",
        badge: "Organisations & CSR",
        suggestedSubject: "CSR Collaboration & Institutional Project Enquiry",
        suggestedMessage: "We represent an organisation interested in exploring CSR partnership and grant-in-aid opportunities with BSGSS in healthcare, women's skill development, or rural livelihoods. We would like to discuss potential alignment.",
        description: "Partner with BSGSS on compliant, impactful CSR programmes with full reporting and audit transparency.",
      },
      {
        id: "trainer",
        label: "Vocational Trainer & Skills Mentor",
        shortTitle: "Skill Mentor",
        badge: "Knowledge Sharing",
        suggestedSubject: "Vocational Training & Skill Mentorship Collaboration",
        suggestedMessage: "I would like to contribute my vocational skills (tailoring, cutting, digital literacy, beauty culture, or entrepreneurship) to train rural women and young people towards financial independence.",
        description: "Teach and mentor women and youth in vocational crafts, digital tools, and micro-business skills.",
      },
      {
        id: "supporter",
        label: "Resource & Community Supporter",
        shortTitle: "Supporter",
        badge: "Resource Contribution",
        suggestedSubject: "Community Support & Resource Contribution",
        suggestedMessage: "I would like to support BSGSS with learning materials, health resources, technical tools, or donor contributions to strengthen community programmes.",
        description: "Contribute learning materials, health supplies, or resources for rural community centres.",
      },
      {
        id: "other",
        label: "General Community Contributor",
        shortTitle: "General",
        badge: "Collaborate",
        suggestedSubject: "General Collaboration Enquiry with BSGSS",
        suggestedMessage: "I would like to connect with the BSGSS team to discuss how my background and ideas can support your mission.",
        description: "Connect with our team to explore customised ways to participate and support our mission.",
      },
    ],
  },
  contact: {
    metadataTitle: "Contact BSGSS",
    title: "Contact Us",
    lead: "Get in touch with Bisnouli Sarvodaya Gramodyog Sewa Sansthan for partnerships, volunteer registration, CSR collaborations or general enquiries.",
    eyebrow: "Get in touch",
    heading: "Start a conversation with our team.",
    subheading: "Have a question, want to volunteer, or interested in exploring a social development partnership? Send us a message and our team will get back to you shortly.",
    form: {
      title: "Contact us",
      subtitle: "Send us a message and we will get back to you shortly.",
      nameLabel: "Your name",
      emailLabel: "Your email",
      phoneLabel: "Phone number (optional)",
      subjectLabel: "Subject",
      messageLabel: "Your message (optional)",
      submitButton: "Submit",
      submittingButton: "Submitting...",
      successTitle: "Thank you!",
      successMessage: "Your message has been received. Our team will review your enquiry and respond shortly.",
    },
    officeNoida: {
      title: "Registered Office · Noida",
      address: "B-180, Sector-31, NOIDA, Uttar Pradesh, PIN- 201301",
    },
    officeDelhi: {
      title: "Administrative Office · New Delhi",
      address: "A-171, Ground Floor, Defence Colony, New Delhi, PIN- 110024",
    },
    hours: "Monday – Saturday: 9:30 AM to 6:00 PM IST",
    timingLabel: "Working hours",
  },
  support: {
    metadataTitle: "Support Us",
    title: "Support Us",
    lead: "Your contribution can help strengthen education, healthcare, livelihoods and women’s empowerment.",
    eyebrow: "Make a contribution",
    heading: "Support community-led development with BSGSS.",
    text: "Every contribution helps BSGSS advance practical community work across healthcare, learning, livelihoods and women’s empowerment.",
    bankName: "Indian Bank",
    branchName: "Defence Colony",
    accountType: "Current Account",
    accountName: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan",
    accountNumber: "791575829",
    ifsc: "IDIB000D008",
    bankTitle: "Bank transfer details (NEFT / RTGS / IMPS)",
    contactCta: "Contact us about your contribution",
    upiEyebrow: "UPI donation",
    upiText: "Scan and pay with any BHIM UPI app.",
    assurance: "For institutional partnerships, CSR support or contribution records, please contact BSGSS directly.",
    qrImage: "/images/bsgss/donations/463-upi-1768134444982.png",
  },
  legalStatus: {
    metadataTitle: "Legal Status & Statutory Documents",
    title: "Legal status & public documents",
    lead: "A transparent library of BSGSS registrations, certificates, statutory filings and public compliance records.",
    eyebrow: "Statutory Transparency",
    heading: "Compliance, Governance & Public Accountability",
    summaryText: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS) maintains strict compliance with statutory regulations governing voluntary and charitable organisations in India. All institutional records, tax exemptions, and government registrations are published openly for our partners, donors, and communities.",
    summaryDownloadUrl: "/documents/legal/legal-status-summary.pdf",
    credentials: [
      {
        title: "Societies Registration",
        number: "226/1994-95",
        authority: "Registrar of Societies, Uttar Pradesh",
        act: "Societies Registration Act XXI of 1860",
        date: "15 June 1994",
        status: "Active & In Good Standing",
        tag: "Foundational Registration",
      },
      {
        title: "MCA CSR-1 Registration",
        number: "CSR00001405",
        authority: "Ministry of Corporate Affairs, Govt of India",
        act: "Section 135, Companies Act, 2013",
        date: "09 April 2021",
        status: "Eligible for CSR Projects",
        tag: "CSR Eligible",
      },
      {
        title: "Income Tax 12A Registration",
        number: "AAATB7832ME20214",
        authority: "Income Tax Department, Govt of India",
        act: "Section 12A / 12AB, Income Tax Act, 1961",
        date: "Registered Non-Profit",
        status: "Income Tax Exemption Granted",
        tag: "Tax Exemption",
      },
      {
        title: "Income Tax 80G Approval",
        number: "AAATB7832MF20214",
        authority: "Directorate of Income Tax (Exemptions)",
        act: "Section 80G(5)(vi), Income Tax Act, 1961",
        date: "Perpetual / Renewed",
        status: "50% Tax Deduction for Donors",
        tag: "Donor Tax Benefit",
      },
      {
        title: "NITI Aayog NGO Darpan",
        number: "DL/2016/0111645",
        authority: "NITI Aayog, Government of India",
        act: "Central Voluntary Sector Portal",
        date: "Verified Online",
        status: "Central Govt Portal Verified",
        tag: "Govt Verified",
      },
      {
        title: "Permanent Account Number (PAN)",
        number: "AAATB7832M",
        authority: "Income Tax Department, Govt of India",
        act: "Statutory Tax Identification",
        date: "Permanent",
        status: "Valid Entity Status",
        tag: "Tax Identity",
      },
      {
        title: "Tax Deduction Account (TAN)",
        number: "MRTB01498A",
        authority: "Income Tax Department, Govt of India",
        act: "TDS Compliance Record",
        date: "Permanent",
        status: "Active TDS Compliance",
        tag: "TDS Filing",
      },
      {
        title: "Goods & Services Tax (GSTIN)",
        number: "07AAATB7832M1ZH",
        authority: "Central Board of Indirect Taxes & Customs",
        act: "Central Goods and Services Tax Act",
        date: "Active",
        status: "Registered Filer",
        tag: "GST Registered",
      },
    ],
    documents: [
      {
        title: "BSGSS Comprehensive Organisational Profile",
        tag: "Official Profile",
        category: "overview",
        href: "/documents/bsgss-organisational-profile.pdf",
        previewImage: "/images/documents/legal/bsgss-organisational-profile.jpg",
        fileType: "PDF",
        fileSize: "3.9 MB",
        description: "Official 48-page comprehensive organisational profile dossier featuring statutory registrations, founder members, board of advisors, 22 PSU CSR projects, training centers, SHG handicrafts, and Doordarshan media coverage.",
      },
      {
        title: "Legal Status Summary Dossier",
        tag: "Overview",
        category: "overview",
        href: "/documents/legal/legal-status-summary.pdf",
        previewImage: "/images/documents/legal/legal-status-summary.jpg",
        fileType: "PDF",
        fileSize: "151 KB",
        description: "Consolidated reference document containing BSGSS registration history, 12A, 80G, CSR-1, NGO Darpan, PAN, and banking credentials in one dossier.",
      },
      {
        title: "BSGSS Society Registration Certificate",
        tag: "Registration",
        category: "registration",
        href: "/documents/legal/bsgss-registration-certificate.pdf",
        previewImage: "/images/documents/legal/bsgss-registration-certificate.jpg",
        fileType: "PDF",
        fileSize: "385 KB",
        description: "Official registration certificate issued under the Societies Registration Act XXI of 1860 by the Registrar of Societies, Uttar Pradesh.",
      },
      {
        title: "MCA CSR-1 Registration Certificate",
        tag: "CSR Eligible",
        category: "csr",
        href: "/documents/legal/bsgss-csr-1-registration.pdf",
        previewImage: "/images/documents/legal/bsgss-csr-1-registration.jpg",
        fileType: "PDF",
        fileSize: "2.1 MB",
        description: "Statutory registration for undertaking corporate social responsibility initiatives, registered with the Ministry of Corporate Affairs (MCA).",
      },
      {
        title: "Income Tax 12A Registration Order",
        tag: "Tax Exemption",
        category: "tax",
        href: "/documents/legal/bsgss-12a-certificate.pdf",
        previewImage: "/images/documents/legal/bsgss-12a-certificate.jpg",
        fileType: "PDF",
        fileSize: "191 KB",
        description: "Statutory order of registration granted under Section 12A / 12AB of the Income Tax Act, 1961 granting exemption on charitable surplus.",
      },
      {
        title: "Income Tax 80G Tax-Exemption Approval",
        tag: "Donation Benefit",
        category: "tax",
        href: "/documents/legal/bsgss-80g-certificate.pdf",
        previewImage: "/images/documents/legal/bsgss-80g-certificate.jpg",
        fileType: "PDF",
        fileSize: "188 KB",
        description: "Statutory approval under Section 80G(5)(vi) of the Income Tax Act, 1961 enabling individual and corporate donors to claim 50% tax deductions.",
      },
      {
        title: "NITI Aayog NGO Darpan Registration",
        tag: "NGO Darpan",
        category: "registration",
        href: "/documents/legal/bsgss-ngo-darpan-registration.pdf",
        previewImage: "/images/documents/legal/bsgss-ngo-darpan-registration.jpg",
        fileType: "PDF",
        fileSize: "1.5 MB",
        description: "Official confirmation acknowledging BSGSS on the Government of India NITI Aayog NGO Darpan portal (Unique ID: DL/2016/0111645).",
      },
      {
        title: "GST Registration Certificate",
        tag: "GSTIN",
        category: "tax",
        href: "/documents/legal/bsgss-gst-registration.pdf",
        previewImage: "/images/documents/legal/bsgss-gst-registration.jpg",
        fileType: "PDF",
        fileSize: "187 KB",
        description: "Goods and Services Tax Registration Certificate issued by the Government of India (GSTIN: 07AAATB7832M1ZH).",
      },
      {
        title: "Government of India MCA Record",
        tag: "MCA Notification",
        category: "csr",
        href: "/documents/legal/govt-of-india-moca.pdf",
        previewImage: "/images/documents/legal/govt-of-india-moca.jpg",
        fileType: "PDF",
        fileSize: "1.3 MB",
        description: "Ministry of Corporate Affairs documentation and regulatory correspondence published by BSGSS for institutional due diligence.",
      },
    ],
    governanceHighlights: [
      {
        title: "Annual Independent Audit",
        description: "Accounts are independently audited by licensed Chartered Accountants annually and submitted to statutory regulators.",
      },
      {
        title: "Statutory Filings Up to Date",
        description: "Annual returns, income tax filings, and society renewal documentation are maintained in full compliance.",
      },
      {
        title: "Institutional Due Diligence Ready",
        description: "Full compliance documentation and audited financial statements are readily provided to CSR partners and grant institutions.",
      },
    ],
  },
} as const;
