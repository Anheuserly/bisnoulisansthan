export interface ShgProduct {
  slug: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  leadTime: string;
}

export function slugifyProduct(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const SHG_PRODUCTS: ShgProduct[] = [
  {
    slug: "shawls",
    name: "Shawls",
    tag: "Traditional Woolens",
    description:
      "Warm, handcrafted shawls available in a variety of colours and textures, showcasing traditional artisan craftsmanship.",
    image: "/images/bsgss/shg-products/Shawl_01.jpg",
    leadTime: "Crafted on Order & Ready Stock",
  },
  {
    slug: "woollen-stoles",
    name: "Woollen Stoles",
    tag: "Everyday Elegance",
    description:
      "Soft woollen stoles available in multiple colours, created by self-help group artisans.",
    image: "/images/bsgss/shg-products/Woollen_Stole_01.jpg",
    leadTime: "Available in Multiple Colours",
  },
  {
    slug: "woollen-shawls",
    name: "Woollen Shawls",
    tag: "Winter Collection",
    description:
      "Traditional woollen shawls combining warmth, comfort and skilled textile craftsmanship.",
    image: "/images/bsgss/shg-products/Woollen_Shawl_01.jpg",
    leadTime: "Crafted on Order & Ready Stock",
  },
  {
    slug: "woollen-mufflers",
    name: "Woollen Mufflers",
    tag: "Winter Warmth",
    description:
      "Comfortable woollen mufflers featuring practical designs and traditional textile finishes.",
    image: "/images/bsgss/shg-products/Woollen_Muffler_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    slug: "silk-stoles",
    name: "Silk Stoles",
    tag: "Artisan Accessories",
    description:
      "Decorative silk stoles featuring distinctive colours, patterns and traditional craftsmanship.",
    image: "/images/bsgss/shg-products/Silk_Stole_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    slug: "madhubani-cushion-covers",
    name: "Madhubani Cushion Covers",
    tag: "Ethnic Home Decor",
    description:
      "Decorative cushion covers featuring colourful Madhubani-inspired designs for traditional and contemporary interiors.",
    image: "/images/bsgss/shg-products/Madhubani_Cushion_Cover_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    slug: "bed-covers-with-pillow-covers",
    name: "Bed Covers with Pillow Covers",
    tag: "Bedroom Collection",
    description:
      "Coordinated bed and pillow covers featuring traditional patterns and decorative textile details.",
    image: "/images/bsgss/shg-products/Bed_Cover_with_Pillow_Cover_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    slug: "pillow-covers",
    name: "Pillow Covers",
    tag: "Textile Essentials",
    description:
      "Decorative pillow covers with colourful fabrics and traditional printed or woven patterns.",
    image: "/images/bsgss/shg-products/Pillow_Cover_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    slug: "table-runners",
    name: "Table Runners",
    tag: "Dining & Table Decor",
    description:
      "Handcrafted table runners featuring intricate traditional patterns to enhance dining tables and living spaces.",
    image: "/images/bsgss/shg-products/Table_Runner_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    slug: "sets-of-cushion-covers",
    name: "Sets of Cushion Covers",
    tag: "Coordinated Home Decor",
    description:
      "Coordinated cushion cover sets with colourful decorative designs for living rooms and hospitality spaces.",
    image: "/images/bsgss/shg-products/Set_of_Cushion_Covers_01.jpg",
    leadTime: "Sets Available",
  },
  {
    slug: "madhubani-silk-sarees",
    name: "Madhubani Silk Sarees",
    tag: "Traditional Indian Wear",
    description:
      "Colourful silk sarees featuring Madhubani-inspired artwork and traditional decorative motifs.",
    image: "/images/bsgss/shg-products/Madhubani_Silk_Saree_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    slug: "hand-painted-ties",
    name: "Hand-Painted Ties",
    tag: "Artisan Fashion",
    description:
      "Distinctive hand-painted ties featuring artistic patterns and colourful designs for a unique formal accessory.",
    image: "/images/bsgss/shg-products/Hand_painted_Tie_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    slug: "woollen-carpets",
    name: "Woollen Carpets",
    tag: "Artisan Floor Decor",
    description:
      "Decorative woollen carpets featuring intricate patterns and traditional textile styling.",
    image: "/images/bsgss/shg-products/Woollen_Carpet_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    slug: "madhubani-pen-holders",
    name: "Madhubani Pen Holders",
    tag: "Handcrafted Desk Accessories",
    description:
      "Colourful handcrafted pen holders decorated with traditional Madhubani-inspired artwork for desks and workspaces.",
    image: "/images/bsgss/shg-products/Madhubani_Pen_Holder_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    slug: "madhubani-wall-hangings",
    name: "Madhubani Wall Hangings",
    tag: "Traditional Wall Art",
    description:
      "Decorative wall hangings showcasing vibrant folk-art styling and handcrafted artistic details.",
    image: "/images/bsgss/shg-products/Wall_Hanging_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    slug: "madhubani-trays",
    name: "Madhubani Trays",
    tag: "Artisan Serveware",
    description:
      "Decorative handcrafted trays featuring colourful artwork, suitable for serving and display.",
    image: "/images/bsgss/shg-products/Madhubani_Tray_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    slug: "madhubani-boxes",
    name: "Madhubani Boxes",
    tag: "Decorative Storage",
    description:
      "Handcrafted decorative boxes featuring colourful Madhubani-inspired patterns for storing keepsakes and accessories.",
    image: "/images/bsgss/shg-products/Madhubani_Box_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    slug: "madhubani-jewellery-boxes",
    name: "Madhubani Jewellery Boxes",
    tag: "Artisan Gift Collection",
    description:
      "Decorative jewellery boxes featuring traditional artwork, designed for organising and presenting personal accessories.",
    image: "/images/bsgss/shg-products/Madhubani_Jewellery_Box_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    slug: "madhubani-tissue-boxes",
    name: "Madhubani Tissue Boxes",
    tag: "Artistic Home Accessories",
    description:
      "Decorative tissue boxes with colourful handcrafted patterns that add a traditional artistic touch to interiors.",
    image: "/images/bsgss/shg-products/Madhubani_Tissue_Box_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    slug: "madhubani-coaster-sets",
    name: "Madhubani Coaster Sets",
    tag: "Table Accessories",
    description:
      "Artistic coaster sets featuring colourful folk-art motifs, ideal for dining tables, offices and gifting.",
    image: "/images/bsgss/shg-products/Madhubani_Coaster_Set_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    slug: "madhubani-paintings",
    name: "Madhubani Paintings",
    tag: "Traditional Folk Art",
    description:
      "Decorative Madhubani paintings showcasing expressive folk-art motifs, vibrant colours and traditional artistic styles.",
    image: "/images/bsgss/shg-products/Madhubani_Painting_01.jpg",
    leadTime: "Multiple Artwork Designs Available",
  },
  {
    slug: "madhubani-wall-clocks",
    name: "Madhubani Wall Clocks",
    tag: "Functional Art",
    description:
      "Decorative wall clocks featuring colourful Madhubani-inspired artwork that combines everyday utility with artistic design.",
    image: "/images/bsgss/shg-products/Wall_Clock_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    slug: "madhubani-lampshades",
    name: "Madhubani Lampshades",
    tag: "Artistic Lighting",
    description:
      "Colourful decorative lampshades featuring traditional Madhubani-inspired patterns for distinctive interior styling.",
    image: "/images/bsgss/shg-products/Lampshade_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    slug: "ladies-clutch-purses-and-spectacles-cases",
    name: "Ladies' Clutch Purses & Spectacles Cases",
    tag: "Handcrafted Accessories",
    description:
      "Coordinated handcrafted accessories featuring practical storage and refined finishes.",
    image:
      "/images/bsgss/shg-products/Ladies_Clutch_Purse_Spectacles_Case_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    slug: "clutch-purses",
    name: "Clutch Purses",
    tag: "Everyday Accessories",
    description:
      "Compact clutch purses featuring clean designs and practical storage for everyday essentials.",
    image: "/images/bsgss/shg-products/Clutch_Purse_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    slug: "spectacles-cases",
    name: "Spectacles Cases",
    tag: "Protective Accessories",
    description:
      "Compact spectacles cases designed to help protect eyewear while maintaining a simple, practical appearance.",
    image: "/images/bsgss/shg-products/Spectacles_Case_01.jpg",
    leadTime: "Subject to Availability",
  },
];

export function getProductBySlug(slug: string): ShgProduct | undefined {
  return SHG_PRODUCTS.find((p) => p.slug === slug);
}
