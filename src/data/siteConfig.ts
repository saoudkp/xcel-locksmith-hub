/**
 * Centralized site configuration — mirrors future admin API response shape.
 * When backend is deployed, replace static values with API calls.
 * Layout/theme stays constant regardless of content changes.
 */

export interface SiteConfig {
  brand: BrandConfig;
  navigation: NavItem[];
  sections: SectionConfig[];
  contact: ContactConfig;
  seo: SEOConfig;
}

export interface BrandConfig {
  name: string;
  tagline: string;
  logoUrl: string; // Admin-uploadable
  phoneNumber: string;
  phoneDisplay: string;
  responseTime: string;
}

export interface NavItem {
  id: string;
  href: string;
  label: string;
  isActive: boolean;
  order: number;
}

export interface SectionConfig {
  id: string;
  type: "hero" | "services" | "vehicle-verifier" | "quote" | "gallery" | "reviews" | "map" | "faq" | "visitor-counter";
  isActive: boolean;
  order: number;
  /** Section heading — admin editable, layout stays fixed */
  heading?: string;
  subheading?: string;
}

export interface ContactConfig {
  phone: string;
  phoneDisplay: string;
  email?: string;
  address: string;
  hours: string;
}

export interface SEOConfig {
  siteTitle: string;
  siteDescription: string;
  ogImage?: string;
}

/* ───── Default Config (static, replaced by API later) ───── */

export const defaultNavItems: NavItem[] = [
  { id: "nav-services", href: "#services", label: "Services", isActive: true, order: 1 },
  { id: "nav-gallery", href: "#gallery", label: "Gallery", isActive: true, order: 2 },
  { id: "nav-vehicle", href: "#vehicle-verifier", label: "Vehicle Check", isActive: true, order: 3 },
  { id: "nav-quote", href: "#quote", label: "Free Quote", isActive: true, order: 4 },
  { id: "nav-reviews", href: "#reviews", label: "Reviews", isActive: true, order: 5 },
  { id: "nav-area", href: "#service-area", label: "Service Area", isActive: true, order: 6 },
  { id: "nav-faq", href: "#faq", label: "FAQ", isActive: true, order: 7 },
];

export const defaultSections: SectionConfig[] = [
  { id: "hero", type: "hero", isActive: true, order: 1, heading: "Cleveland's Fastest", subheading: "24/7 Emergency Locksmith" },
  { id: "services", type: "services", isActive: true, order: 2, heading: "Complete Locksmith Services" },
  { id: "vehicle-verifier", type: "vehicle-verifier", isActive: true, order: 3, heading: "Vehicle Compatibility Check" },
  { id: "quote", type: "quote", isActive: true, order: 4, heading: "Get a Free Quote in Seconds" },
  { id: "gallery", type: "gallery", isActive: true, order: 5, heading: "Before & After Gallery" },
  { id: "reviews", type: "reviews", isActive: true, order: 6, heading: "What Our Customers Say" },
  { id: "map", type: "map", isActive: true, order: 7, heading: "Our Service Area" },
  { id: "faq", type: "faq", isActive: true, order: 8, heading: "Frequently Asked Questions" },
  { id: "visitor-counter", type: "visitor-counter", isActive: true, order: 9 },
];

export const defaultBrand: BrandConfig = {
  name: "Xcel Locksmith",
  tagline: "Cleveland's most trusted 24/7 locksmith",
  logoUrl: "", // Uses imported asset
  phoneNumber: "tel:+12165551234",
  phoneDisplay: "(216) 555-1234",
  responseTime: "20–30 Min",
};

export const defaultContact: ContactConfig = {
  phone: "tel:+12165551234",
  phoneDisplay: "(216) 555-1234",
  address: "Cleveland, OH & surrounding areas",
  hours: "Open 24/7/365",
};

/** Helper: get sorted active items */
export const getActiveNav = (items: NavItem[] = defaultNavItems) =>
  items.filter(n => n.isActive).sort((a, b) => a.order - b.order);

export const getActiveSections = (sections: SectionConfig[] = defaultSections) =>
  sections.filter(s => s.isActive).sort((a, b) => a.order - b.order);
