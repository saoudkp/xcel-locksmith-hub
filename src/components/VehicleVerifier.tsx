import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { vehicleMakes, VehicleMake, VehicleModel } from "@/data/vehicles";

const VehicleVerifier = () => {
  const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);

  return (
    <section id="vehicle-verifier" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Vehicle <span className="text-accent">Compatibility</span> Check
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select your vehicle make and model to verify which automotive locksmith services we support.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8">
          {/* Make Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-3">Select Vehicle Make</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {vehicleMakes.map((make) => (
                <button
                  key={make.id}
                  onClick={() => { setSelectedMake(make); setSelectedModel(null); }}
                  className={`touch-target px-3 py-3 rounded-lg text-sm font-medium transition-all border ${
                    selectedMake?.id === make.id
                      ? "bg-accent text-accent-foreground border-accent"
                      : "glass-card border-border hover:bg-secondary text-foreground"
                  }`}
                >
                  {make.name}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          <AnimatePresence>
            {selectedMake && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <label className="block text-sm font-semibold text-foreground mb-3">Select Model</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedMake.models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      className={`touch-target px-3 py-3 rounded-lg text-sm font-medium transition-all border ${
                        selectedModel?.id === model.id
                          ? "bg-accent text-accent-foreground border-accent"
                          : "glass-card border-border hover:bg-secondary text-foreground"
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {selectedModel && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-xl p-6 border border-accent/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-6 h-6 text-accent" />
                  <h3 className="font-display text-xl font-bold">
                    {selectedMake?.name} {selectedModel.name}
                  </h3>
                </div>
                {selectedModel.supportedServices.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">✅ Full service support available:</p>
                    {selectedModel.supportedServices.map((svc, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        {svc}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p>Custom consultation needed. Call us for your specific vehicle requirements.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default VehicleVerifier;
