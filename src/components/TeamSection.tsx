import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Shield, Briefcase, Star, BadgeCheck } from "lucide-react";
import { getActiveTeam, type CertificationProof } from "@/data/team";
import CertificateViewer from "@/components/CertificateViewer";

const TeamSection = () => {
  const team = getActiveTeam();
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerMember, setViewerMember] = useState<{ name: string; certs: CertificationProof[] } | null>(null);

  const openViewer = (name: string, certs: CertificationProof[]) => {
    setViewerMember({ name, certs });
    setViewerOpen(true);
  };

  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Meet Our <span className="font-serif-accent text-accent">Expert Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Licensed, certified, and background-checked professionals with decades of
            combined locksmith experience serving Cleveland and surrounding communities.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="neu-card rounded-2xl overflow-hidden group"
              itemScope
              itemType="https://schema.org/Person"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.photoUrl}
                  alt={`${member.name} — ${member.role} at Xcel Locksmith Cleveland`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  itemProp="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="skeu-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                    <Briefcase className="w-3 h-3 text-accent" />
                    <span className="text-accent">{member.experience}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold" itemProp="name">{member.name}</h3>
                <p className="text-accent text-sm font-semibold mb-3" itemProp="jobTitle">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3" itemProp="description">
                  {member.bio}
                </p>

                {/* Certifications */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Award className="w-3 h-3" /> Certifications
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {member.certifications.map((cert, ci) => (
                      <span
                        key={ci}
                        className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent font-medium"
                      >
                        {cert.name}
                      </span>
                    ))}
                  </div>
                  {/* View Proof button */}
                  <button
                    onClick={() => openViewer(member.name, member.certifications)}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-sm"
                  >
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verify Certifications
                  </button>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Star className="w-3 h-3" /> Specialties
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((spec, si) => (
                      <span
                        key={si}
                        className="text-[10px] px-2 py-1 rounded-full neu-card-pressed font-medium text-foreground"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { icon: Shield, text: "All Technicians Licensed & Insured" },
            { icon: Award, text: "ALOA Certified Professionals" },
            { icon: Star, text: "Background Checked & Vetted" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="skeu-badge flex items-center gap-2 rounded-full px-5 py-2.5">
              <Icon className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Certificate viewer dialog */}
      {viewerMember && (
        <CertificateViewer
          memberName={viewerMember.name}
          certifications={viewerMember.certs}
          open={viewerOpen}
          onOpenChange={setViewerOpen}
        />
      )}
    </section>
  );
};

export default TeamSection;
