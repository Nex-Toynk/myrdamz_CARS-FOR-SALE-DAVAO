import { notFound } from "next/navigation";
import { getRelatedVehicles, getVehicleById, inventory } from "../../data/vehicles";
import ProductPageClient from "./product-page-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return inventory.map((vehicle) => ({
    id: vehicle.id
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Myrdams Cars for Sales Davao"
    };
  }

  return {
    title: `${vehicle.name} | Myrdams Cars for Sales Davao`,
    description: `${vehicle.name} listed at ${vehicle.price.toLocaleString("en-PH")} PHP. ${vehicle.description}`
  };
}

export default async function VehicleProductPage({ params }) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return <ProductPageClient vehicle={vehicle} related={getRelatedVehicles(vehicle)} />;
}
