import { notFound } from "next/navigation";
import { inventory } from "../../data/vehicles";
import ProductPageClient from "./product-page-client";

export const dynamicParams = false;

function getRelatedVehicles(vehicle, inventory, count = 3) {
  return inventory
    .filter((item) => item.id !== vehicle.id)
    .sort((a, b) => {
      const aScore = Number(a.type === vehicle.type) + Number(a.fuel === vehicle.fuel);
      const bScore = Number(b.type === vehicle.type) + Number(b.fuel === vehicle.fuel);
      return bScore - aScore;
    })
    .slice(0, count);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const vehicle = inventory.find((item) => item.id === id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Myrdamz Cars for Sales Davao"
    };
  }

  return {
    title: `${vehicle.name} | Myrdamz Cars for Sales Davao`,
    description: `${vehicle.name} listed at ${vehicle.price.toLocaleString("en-PH")} PHP. ${vehicle.description}`
  };
}

export default async function VehicleProductPage({ params }) {
  const { id } = await params;
  const vehicle = inventory.find((item) => item.id === id);

  if (!vehicle) {
    notFound();
  }

  return <ProductPageClient vehicle={vehicle} related={getRelatedVehicles(vehicle, inventory)} />;
}

export function generateStaticParams() {
  return inventory.map((vehicle) => ({ id: vehicle.id }));
}
