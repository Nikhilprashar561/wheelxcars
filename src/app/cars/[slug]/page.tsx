import { notFound } from "next/navigation";
import { CARS, formatPrice } from "@/lib/data";
import { CarDetailClient } from "./CarDetailClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CARS.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = CARS.find((c) => c.slug === slug);
  if (!car) return {};
  return {
    title: `${car.year} ${car.brand} ${car.model} ${car.variant} (${car.mileage}) | WheelxCars`,
    description: `${car.year} ${car.brand} ${car.model} (${car.variant}) in ${car.color}. 1st Owner, ${car.mileage}, Diesel Manual. Verified pre-owned listing at WheelxCars.`,
    openGraph: {
      title: `${car.year} ${car.brand} ${car.model} | WheelxCars`,
      description: `${car.variant} • ${car.mileage} • ${car.fuel} • ${car.color}`,
      images: car.images.slice(0, 1),
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = CARS.find((c) => c.slug === slug);
  if (!car) notFound();

  // JSON-LD Vehicle structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.year} ${car.brand} ${car.model} ${car.variant}`,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    model: car.model,
    modelDate: car.year.toString(),
    vehicleTransmission: car.transmission,
    fuelType: car.fuel,
    color: car.color,
    itemCondition: "https://schema.org/UsedCondition",
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.kmDriven || 71000,
      unitCode: "KMT",
    },
    offers: {
      "@type": "Offer",
      price: car.price ? (car.price * 100000).toString() : "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarDetailClient slug={slug} />
    </>
  );
}
