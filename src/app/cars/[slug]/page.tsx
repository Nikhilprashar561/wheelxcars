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
    title: `${car.year} ${car.brand} ${car.model} ${car.variant} | WheelxCars`,
    description: car.description || `Buy the ${car.year} ${car.brand} ${car.model} from WheelxCars. Inspected, verified and priced transparently at ₹${car.price} Lakh.`,
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = CARS.find((c) => c.slug === slug);
  if (!car) notFound();
  return <CarDetailClient slug={slug} />;
}
