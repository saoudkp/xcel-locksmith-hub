import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getActiveLocations } from "@/data/locations";
import "leaflet/dist/leaflet.css";

const ServiceAreaMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const activeLocations = getActiveLocations();

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [41.45, -81.75],
        zoom: 10,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const keyIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="filter:drop-shadow(0 0 6px rgba(59,130,246,0.6));font-size:24px;line-height:1;">🔑</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      activeLocations.forEach((loc) => {
        L.marker([loc.lat, loc.lng], { icon: keyIcon })
          .addTo(map)
          .bindPopup(`<strong>${loc.cityName}</strong><br/>Xcel Locksmith serves this area`);
      });

      mapInstance.current = map;
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="service-area" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsla(218,46%,20%,0.15)_0%,_transparent_70%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Our <span className="font-serif-accent text-accent">Service Area</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Serving Cleveland and 24 surrounding communities with fast 20–30 minute response times.
          </p>
        </motion.div>

        <div className="neu-card rounded-2xl overflow-hidden">
          <div ref={mapRef} className="w-full h-[400px] md:h-[500px]" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {activeLocations.map((loc) => (
            <span key={loc.id} className="skeu-badge px-3 py-1.5 rounded-full text-xs text-foreground font-medium">
              {loc.cityName}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
