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

      // Fix default marker icons
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

      const redIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:14px;height:14px;background:#E31B23;border:2px solid #fff;border-radius:50%;box-shadow:0 0 8px rgba(227,27,35,0.6);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      activeLocations.forEach((loc) => {
        L.marker([loc.lat, loc.lng], { icon: redIcon })
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
    <section id="service-area" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Our <span className="text-accent">Service Area</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Serving Cleveland and 24 surrounding communities with fast 20–30 minute response times.
          </p>
        </motion.div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div ref={mapRef} className="w-full h-[400px] md:h-[500px]" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {activeLocations.map((loc) => (
            <span key={loc.id} className="glass-card px-3 py-1.5 rounded-full text-xs text-silver-light">
              {loc.cityName}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
