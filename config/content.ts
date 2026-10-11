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
  },
  home: {
    metadataTitle: "Community development since 1994",
    hero: { eyebrow: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan", title: "Empowering communities. Creating opportunities.", text: "Since 1994, BSGSS has worked with underprivileged families across Uttar Pradesh, Delhi, Haryana and Punjab through education, healthcare, skills and women’s empowerment.", supportCta: "Support our work", aboutCta: "About BSGSS", slides: ["/images/bsgss/banners/589-banner-1.webp", "/images/bsgss/banners/590-banner-2.webp", "/images/bsgss/banners/592-banner-3.webp", "/images/bsgss/banners/593-untitled-4.webp"] },
    government: { eyebrow: "Public-purpose programmes", title: "Government-supported work, made practical at community level.", text: "Awareness, education, health and livelihood activity helps communities understand public support, strengthen local groups and access services.", cta: "Learn about the programmes", overviewEyebrow: "Activities under State & Central Government", overviewTitle: "Connecting people with knowledge, services and opportunity.", overviewText: "BSGSS has implemented community-based initiatives supported through Central and State Government schemes, combining outreach with training, awareness, health and livelihood support in Uttar Pradesh and neighbouring states.", overviewCta: "Read more" },
    about: { eyebrow: "About us", title: "A practical commitment to dignity and self-reliance.", text: "Founded in Bisnouli village, Dadri Tehsil, BSGSS is a registered voluntary organisation. Its community-led work brings together education, healthcare, vocational training, micro-finance and support for women so that families can create sustainable futures." },
    programmes: [
      { title: "Education & digital literacy", text: "Supporting learning opportunities and practical digital skills for children, young people and families." },
      { title: "Healthcare initiatives", text: "Mobile clinics, free health check-up camps, immunisation, nutrition drives and health awareness programmes." },
      { title: "Skills & livelihoods", text: "Vocational training in tailoring, computer literacy, beauty culture, English communication and entrepreneurship." },
      { title: "Women’s empowerment", text: "Action for Micro-Finance and Rehabilitation (AMAR), self-help groups and income-generation opportunities." },
    ],
    impact: { eyebrow: "Our reach and measurable outcomes", title: "Progress that is practical and people-centred.", cta: "Explore our impact", stats: [{ number: "50,000+", label: "individuals reached across North India" }, { number: "30,000+", label: "patients treated and counselled" }, { number: "5,000+", label: "women trained in 60+ villages" }] },
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
      { id: "_SNsmlEd_Cs", title: "RITES · J.A. Khora Colony" }, { id: "PCewFDAH_js", title: "RITES · Khora community activity" }, { id: "2G9Xs6SQt2M", title: "RITES · Hilalpur cancer camp" }, { id: "C4B4k2lgheo", title: "RITES · Hilalpur community outreach" }, { id: "_NJEaW31PMQ", title: "BSGSS programme highlights" },
    ],
    videoGallery: { metadataTitle: "Video Gallery", title: "Video Gallery", lead: "Watch BSGSS community outreach, health camps and programme activities.", eyebrow: "Watch BSGSS in action", heading: "Community stories, directly from the field.", youtubeCta: "Open YouTube" },
    clippings: [
      { image: "191-whatsapp-image-2025-10-09-at-15-55-32-c60ee022.jpg", outlet: "Dainik Bhaskar", title: "Cleanliness fortnight campaign in Noida" }, { image: "192-whatsapp-image-2025-10-09-at-15-55-32-dd874b0a.jpg", outlet: "Veer Arjun", title: "Joint cleanliness campaign in Noida" }, { image: "193-whatsapp-image-2025-10-09-at-15-55-33-3c50f567.jpg", outlet: "Jagat Kranti", title: "Free health camp in Bastar" }, { image: "194-whatsapp-image-2025-10-09-at-15-55-33-532afc9f.jpg", outlet: "Media coverage", title: "BSGSS community programme" }, { image: "196-whatsapp-image-2025-10-09-at-16-49-28-cc32c34a.jpg", outlet: "Media coverage", title: "Community outreach activity" }, { image: "198-whatsapp-image-2025-10-09-at-16-49-29-e802fef2.jpg", outlet: "Media coverage", title: "BSGSS programme coverage" }, { image: "200-whatsapp-image-2025-10-09-at-16-49-32-aab7df99.jpg", outlet: "Media coverage", title: "Community-development initiative" }, { image: "201-whatsapp-image-2025-10-09-at-16-49-34-40e80876.jpg", outlet: "Media coverage", title: "Local community activity" }, { image: "202-whatsapp-image-2025-10-09-at-16-49-35-5e1b9a12.jpg", outlet: "Media coverage", title: "BSGSS field work" }, { image: "203-whatsapp-image-2025-10-09-at-16-49-35-618e38b6.jpg", outlet: "Media coverage", title: "Community support programme" }, { image: "204-whatsapp-image-2025-10-09-at-16-49-35-fd267bae.jpg", outlet: "Media coverage", title: "Public-interest initiative" }, { image: "205-whatsapp-image-2025-10-09-at-16-49-36-3cba5966.jpg", outlet: "Media coverage", title: "BSGSS in the media" }, { image: "206-whatsapp-image-2025-10-09-at-16-49-36-d00f56ee.jpg", outlet: "Media coverage", title: "Community programme coverage" },
    ],
  },
  join: { metadataTitle: "Join Us", title: "Join Us", lead: "Bring your time, skills, ideas or support to a community-led mission for a more inclusive and self-reliant society.", emailSubject: "Joining BSGSS" },
  support: { metadataTitle: "Support Us", title: "Support Us", lead: "Your contribution can help strengthen education, healthcare, livelihoods and women’s empowerment.", eyebrow: "Make a contribution", heading: "Support community-led development with BSGSS.", text: "Every contribution helps BSGSS advance practical community work across healthcare, learning, livelihoods and women’s empowerment.", accountName: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan", accountNumber: "791575829", ifsc: "IDIB000D008", bankTitle: "Bank transfer details", contactCta: "Contact us about your contribution", upiEyebrow: "UPI donation", upiText: "Scan and pay with any BHIM UPI app.", assurance: "For institutional partnerships, CSR support or contribution records, please contact BSGSS directly.", qrImage: "/images/bsgss/donations/463-upi-1768134444982.png" },
} as const;
