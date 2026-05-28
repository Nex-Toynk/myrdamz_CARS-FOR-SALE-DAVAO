import staticVehicles from "./static-vehicles.json";

export const inventory = staticVehicles;

export const vehicleBodyTypes = [
  "SUV",
  "Crossover",
  "MPV/AUV",
  "Sedan",
  "Hatchback",
  "Pickup",
  "Van",
  "Sports Car",
  "Commercial"
];

export const bodyTypes = ["All", ...vehicleBodyTypes];
export const fuels = ["All", "Diesel", "Gasoline", "Hybrid"];
export const transmissions = ["All", "Automatic", "Manual"];

export function getAssetPath(src) {
  if (!src || /^(https?:|data:|blob:)/.test(src)) return src;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${path}`;
}

export function getVehicleById(id) {
  return inventory.find((vehicle) => vehicle.id === id);
}

export function getRelatedVehicles(vehicle, count = 3) {
  return inventory
    .filter((item) => item.id !== vehicle.id)
    .sort((a, b) => {
      const aScore = Number(a.type === vehicle.type) + Number(a.fuel === vehicle.fuel);
      const bScore = Number(b.type === vehicle.type) + Number(b.fuel === vehicle.fuel);
      return bScore - aScore;
    })
    .slice(0, count);
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  })
    .format(value)
    .replace("PHP", "PHP ");
}

export function formatMileage(value) {
  return `${new Intl.NumberFormat("en-PH").format(value)} km`;
}
