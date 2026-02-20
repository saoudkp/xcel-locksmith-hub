export interface VehicleMake {
  id: string;
  name: string;
  models: VehicleModel[];
}

export interface VehicleModel {
  id: string;
  name: string;
  supportedServices: string[];
}

const allAutoServices = [
  "Car Lockout Services",
  "Car Key Replacement",
  "Transponder Key Programming",
  "Remote Key Fob Programming",
  "Ignition Repair & Replacement",
  "Ignition Key Cutting & Rebuilding",
  "Broken Key Extraction",
  "Key Decoding & VIN Key Generation",
  "Automotive Lock Rekeying",
];

const makeModels = (name: string, models: string[]): VehicleMake => ({
  id: name.toLowerCase().replace(/\s/g, "-"),
  name,
  models: models.map(m => ({ id: `${name.toLowerCase()}-${m.toLowerCase().replace(/\s/g, "-")}`, name: m, supportedServices: allAutoServices })),
});

export const vehicleMakes: VehicleMake[] = [
  makeModels("Chevrolet", ["Silverado", "Malibu", "Impala", "Cruze", "Equinox", "Tahoe", "Suburban", "Camaro", "Corvette"]),
  makeModels("GMC", ["Sierra", "Yukon", "Acadia", "Terrain", "Canyon"]),
  makeModels("Cadillac", ["Escalade", "CTS", "ATS", "XT4", "XT5", "XT6"]),
  makeModels("Buick", ["Encore", "Enclave", "LaCrosse", "Regal"]),
  makeModels("Ford", ["F-150", "Escape", "Explorer", "Fusion", "Mustang", "Ranger"]),
  makeModels("Lincoln", ["Navigator", "MKZ", "Corsair", "Aviator"]),
  makeModels("Chrysler", ["300", "Pacifica", "Voyager"]),
  makeModels("Dodge", ["Charger", "Challenger", "Durango", "Ram"]),
  makeModels("Jeep", ["Wrangler", "Grand Cherokee", "Cherokee", "Compass", "Renegade"]),
  makeModels("Ram", ["1500", "2500", "3500", "ProMaster"]),
];
