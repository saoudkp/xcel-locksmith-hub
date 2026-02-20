export type ServiceCategory = "residential" | "commercial" | "automotive";

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  startingPrice: number;
  icon: string;
  isActive: boolean;
}

export const services: Service[] = [
  // Residential (10)
  { id: "r1", title: "House Lockout Services", slug: "house-lockout-services", category: "residential", shortDescription: "Locked out? We'll get you back inside fast — no damage to your locks or door.", startingPrice: 45, icon: "Home", isActive: true },
  { id: "r2", title: "Lock Installation & Replacement", slug: "lock-installation-replacement", category: "residential", shortDescription: "Upgrade your home security with professional lock installation and replacement.", startingPrice: 65, icon: "ShieldCheck", isActive: true },
  { id: "r3", title: "Lock Repair", slug: "lock-repair", category: "residential", shortDescription: "Fix damaged, stuck, or broken locks — restored to full working order.", startingPrice: 40, icon: "Wrench", isActive: true },
  { id: "r4", title: "Lock Rekeying", slug: "lock-rekeying", category: "residential", shortDescription: "New keys for existing locks. Perfect after moving in or losing a key.", startingPrice: 35, icon: "Key", isActive: true },
  { id: "r5", title: "Key Duplication & Spare Keys", slug: "key-duplication-spare-keys", category: "residential", shortDescription: "Fast, accurate key copies for every door in your home.", startingPrice: 5, icon: "Copy", isActive: true },
  { id: "r6", title: "High-Security Locks", slug: "high-security-locks", category: "residential", shortDescription: "Pick-resistant, drill-resistant locks for maximum home protection.", startingPrice: 120, icon: "Lock", isActive: true },
  { id: "r7", title: "Smart Lock Installation", slug: "smart-lock-installation", category: "residential", shortDescription: "Keyless entry, remote access, and smart home integration.", startingPrice: 150, icon: "Smartphone", isActive: true },
  { id: "r8", title: "Deadbolt Installation & Repair", slug: "deadbolt-installation-repair", category: "residential", shortDescription: "Reinforce your doors with heavy-duty deadbolts.", startingPrice: 55, icon: "ShieldCheck", isActive: true },
  { id: "r9", title: "Mailbox & Gate Locks", slug: "mailbox-gate-locks", category: "residential", shortDescription: "Secure your mailbox, gates, and outdoor access points.", startingPrice: 30, icon: "Mail", isActive: true },
  { id: "r10", title: "Master Key Systems", slug: "master-key-systems-residential", category: "residential", shortDescription: "One key for multiple locks — convenient and secure.", startingPrice: 85, icon: "KeyRound", isActive: true },

  // Commercial (10)
  { id: "c1", title: "Commercial Lockout Services", slug: "commercial-lockout-services", category: "commercial", shortDescription: "Emergency business access — get your team back to work ASAP.", startingPrice: 65, icon: "Building", isActive: true },
  { id: "c2", title: "Business Lock Installation & Repair", slug: "business-lock-installation-repair", category: "commercial", shortDescription: "Grade-1 commercial locks for storefronts, offices, and warehouses.", startingPrice: 85, icon: "Building2", isActive: true },
  { id: "c3", title: "Commercial Rekeying", slug: "commercial-rekeying", category: "commercial", shortDescription: "Rekey all business locks after employee turnover or security breach.", startingPrice: 45, icon: "KeyRound", isActive: true },
  { id: "c4", title: "Master Key System Design", slug: "master-key-system-design", category: "commercial", shortDescription: "Custom master key hierarchies for multi-level access control.", startingPrice: 150, icon: "Network", isActive: true },
  { id: "c5", title: "Access Control Systems", slug: "access-control-systems", category: "commercial", shortDescription: "Electronic keypads, card readers, and biometric entry systems.", startingPrice: 250, icon: "Fingerprint", isActive: true },
  { id: "c6", title: "High-Security Commercial Locks", slug: "high-security-commercial-locks", category: "commercial", shortDescription: "Maximum-security hardware for high-value commercial properties.", startingPrice: 175, icon: "ShieldCheck", isActive: true },
  { id: "c7", title: "Office & Storefront Locks", slug: "office-storefront-locks", category: "commercial", shortDescription: "Professional lock solutions for every commercial door type.", startingPrice: 75, icon: "Store", isActive: true },
  { id: "c8", title: "Panic Bars & Exit Devices", slug: "panic-bars-exit-devices", category: "commercial", shortDescription: "Code-compliant emergency exit hardware installation.", startingPrice: 200, icon: "DoorOpen", isActive: true },
  { id: "c9", title: "File Cabinet & Desk Locks", slug: "file-cabinet-desk-locks", category: "commercial", shortDescription: "Secure sensitive documents and equipment.", startingPrice: 35, icon: "Archive", isActive: true },
  { id: "c10", title: "Key Control & Restricted Keys", slug: "key-control-restricted-keys", category: "commercial", shortDescription: "Patented key systems that can't be duplicated without authorization.", startingPrice: 95, icon: "Ban", isActive: true },

  // Automotive (9)
  { id: "a1", title: "Car Lockout Services", slug: "car-lockout-services", category: "automotive", shortDescription: "Locked out of your car? We'll get you back on the road in minutes.", startingPrice: 55, icon: "Car", isActive: true },
  { id: "a2", title: "Car Key Replacement", slug: "car-key-replacement", category: "automotive", shortDescription: "Lost all your car keys? We cut and program new ones on-site.", startingPrice: 120, icon: "Key", isActive: true },
  { id: "a3", title: "Transponder Key Programming", slug: "transponder-key-programming", category: "automotive", shortDescription: "Chip key programming for modern vehicles — fraction of dealer cost.", startingPrice: 95, icon: "Cpu", isActive: true },
  { id: "a4", title: "Remote Key Fob Programming", slug: "remote-key-fob-programming", category: "automotive", shortDescription: "Program remotes and smart fobs for keyless entry and push-start.", startingPrice: 75, icon: "Radio", isActive: true },
  { id: "a5", title: "Ignition Repair & Replacement", slug: "ignition-repair-replacement", category: "automotive", shortDescription: "Fix stuck, worn, or broken ignitions — no tow needed.", startingPrice: 110, icon: "Zap", isActive: true },
  { id: "a6", title: "Ignition Key Cutting & Rebuilding", slug: "ignition-key-cutting-rebuilding", category: "automotive", shortDescription: "Precision-cut ignition keys and full cylinder rebuilds.", startingPrice: 85, icon: "Scissors", isActive: true },
  { id: "a7", title: "Broken Key Extraction", slug: "broken-key-extraction", category: "automotive", shortDescription: "Safely remove broken key fragments from locks and ignitions.", startingPrice: 50, icon: "Unplug", isActive: true },
  { id: "a8", title: "Key Decoding & VIN Key Generation", slug: "key-decoding-vin-key-generation", category: "automotive", shortDescription: "Generate keys from your VIN when all keys are lost.", startingPrice: 100, icon: "ScanLine", isActive: true },
  { id: "a9", title: "Automotive Lock Rekeying", slug: "automotive-lock-rekeying", category: "automotive", shortDescription: "Rekey your vehicle locks for added security after theft or loss.", startingPrice: 65, icon: "KeyRound", isActive: true },
];

export const getServicesByCategory = (cat: ServiceCategory) => services.filter(s => s.category === cat && s.isActive);
export const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug && s.isActive);
