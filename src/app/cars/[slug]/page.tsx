import { notFound } from "next/navigation";
import { CARS } from "@/lib/data";
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
    title: `${car.year} ${car.brand} ${car.model} in ${car.city} (₹${car.price} Lakh)`,
    description: `${car.year} ${car.brand} ${car.model} (${car.variant}) located in ${car.city}, ${car.locality}. Multi-point inspected with ${car.mileage || "verified mileage"}. Price: ₹${car.price} Lakh.`,
    openGraph: {
      title: `${car.year} ${car.brand} ${car.model} | WheelxCars Tricity`,
      description: `${car.variant} · ${car.city} · ${car.fuel} · ₹${car.price} Lakh`,
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
    name: `${car.year} ${car.brand} ${car.model}`,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    model: car.model,
    modelDate: car.year.toString(),
    vehicleTransmission: car.transmission,
    fuelType: car.fuel,
    itemCondition: "https://schema.org/UsedCondition",
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.kmDriven || 50000,
      unitCode: "KMT",
    },
    offers: {
      "@type": "Offer",
      price: (car.price * 100000).toString(),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      areaServed: {
        "@type": "AdministrativeArea",
        name: `${car.city}, Punjab/Haryana/Chandigarh`,
      },
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
