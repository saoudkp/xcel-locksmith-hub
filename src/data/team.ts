export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  certifications: string[];
  specialties: string[];
  photoUrl: string;
  isActive: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Marcus Johnson",
    role: "Master Locksmith & Owner",
    experience: "18+ years",
    bio: "Marcus founded Xcel Locksmith after earning his Master Locksmith certification from ALOA. He specializes in high-security installations and has personally completed over 15,000 service calls across Greater Cleveland.",
    certifications: ["ALOA Certified Master Locksmith (CML)", "SAVTA Safe Technician", "Ohio Licensed Locksmith"],
    specialties: ["High-Security Locks", "Safe Opening", "Master Key Systems"],
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    isActive: true,
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Lead Automotive Specialist",
    experience: "12+ years",
    bio: "David is our go-to automotive locksmith, trained in transponder programming, smart key systems, and ignition repair for all major vehicle brands. He carries equipment for over 200 vehicle models in his service van.",
    certifications: ["ALOA Certified Automotive Locksmith", "Lishi Tool Certified", "Ohio Licensed Locksmith"],
    specialties: ["Transponder Programming", "Smart Key Systems", "Ignition Repair"],
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    isActive: true,
  },
  {
    id: "t3",
    name: "Sarah Williams",
    role: "Commercial Security Consultant",
    experience: "10+ years",
    bio: "Sarah designs and implements commercial security solutions for businesses ranging from small offices to large warehouses. She's an expert in access control systems, master key hierarchies, and code compliance.",
    certifications: ["ALOA Certified Professional Locksmith (CPL)", "Access Control Specialist", "Ohio Licensed Locksmith"],
    specialties: ["Access Control", "Master Key Design", "Security Audits"],
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
    isActive: true,
  },
  {
    id: "t4",
    name: "James Rodriguez",
    role: "Emergency Response Lead",
    experience: "8+ years",
    bio: "James leads our 24/7 emergency response team, specializing in residential and commercial lockouts. Known for his calm demeanor and lightning-fast response times, he's helped thousands of Cleveland residents get back inside safely.",
    certifications: ["ALOA Certified Registered Locksmith (CRL)", "First Aid & CPR Certified", "Ohio Licensed Locksmith"],
    specialties: ["Emergency Lockouts", "Lock Repair", "Residential Security"],
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    isActive: true,
  },
];

export const getActiveTeam = () => teamMembers.filter(m => m.isActive);
