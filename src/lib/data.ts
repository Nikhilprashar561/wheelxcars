export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG";
export type TransmissionType = "Manual" | "Automatic" | "CVT" | "DCT";
export type BodyType = "Sedan" | "SUV" | "Hatchback" | "MPV" | "Coupe" | "Convertible" | "Pickup";

export function formatPrice(price: number): string {
  if (price >= 100) {
    return `₹${(price / 100).toFixed(2)} Cr`;
  }
  return `₹${price.toFixed(2)} Lakh`;
}

export function formatEMI(emi: number): string {
  return `₹${emi.toLocaleString("en-IN")}/mo`;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number; // in Lakhs
  emi?: number; // per month in rupees
  fuel: FuelType;
  transmission: TransmissionType;
  registration: string;
  mileage?: string;
  bodyType?: BodyType;
  images: string[];
  featured?: boolean;
  newArrival?: boolean;
  description?: string;
  owners?: number;
  color?: string;
  engineCC?: number;
}

export const CARS: Car[] = [
  {
    id: "1",
    slug: "2023-toyota-hyryder-s-at-neodrive",
    brand: "Toyota",
    model: "Hyryder",
    variant: "S AT NeoDrive",
    year: 2023,
    price: 9.75,
    emi: 17230,
    fuel: "Hybrid",
    transmission: "Automatic",
    registration: "DL",
    mileage: "27,400 km",
    bodyType: "SUV",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80",
    ],
    featured: true,
    newArrival: true,
    description: "The Toyota Hyryder combines efficient hybrid technology with a premium SUV experience. This well-maintained example features low mileage and full service history.",
    owners: 1,
    color: "Entice Silver",
    engineCC: 1490,
  },
  {
    id: "2",
    slug: "2022-bmw-3-series-330i-m-sport",
    brand: "BMW",
    model: "3 Series",
    variant: "330i M Sport",
    year: 2022,
    price: 8.50,
    emi: 15020,
    fuel: "Petrol",
    transmission: "Automatic",
    registration: "MH",
    mileage: "18,200 km",
    bodyType: "Sedan",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80",
      "https://images.unsplash.com/photo-1617531653332-bd46c16f7d3f?w=1200&q=80",
    ],
    featured: true,
    description: "A breathtaking example of German engineering. The 330i M Sport delivers an uncompromising driving experience with its twin-scroll turbocharged engine.",
    owners: 1,
    color: "Alpine White",
    engineCC: 1998,
  },
  {
    id: "3",
    slug: "2023-mercedes-c-class-c200",
    brand: "Mercedes-Benz",
    model: "C-Class",
    variant: "C200 Avantgarde",
    year: 2023,
    price: 9.20,
    emi: 16260,
    fuel: "Petrol",
    transmission: "Automatic",
    registration: "KA",
    mileage: "9,800 km",
    bodyType: "Sedan",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80",
    ],
    featured: true,
    newArrival: true,
    description: "An almost-new Mercedes C-Class with a stunning MBUX infotainment system, ambient lighting, and the latest driver assistance suite.",
    owners: 1,
    color: "Obsidian Black",
    engineCC: 1496,
  },
  {
    id: "4",
    slug: "2021-audi-a6-matrix",
    brand: "Audi",
    model: "A6",
    variant: "2.0 TFSI Technology",
    year: 2021,
    price: 7.90,
    emi: 13950,
    fuel: "Petrol",
    transmission: "Automatic",
    registration: "DL",
    mileage: "32,500 km",
    bodyType: "Sedan",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80",
    ],
    featured: true,
    description: "The Audi A6 in Technology spec brings Matrix LED headlights, Virtual Cockpit, and quattro all-wheel drive in a sophisticated executive package.",
    owners: 1,
    color: "Floret Silver",
    engineCC: 1984,
  },
  {
    id: "5",
    slug: "2022-hyundai-tucson-platinum",
    brand: "Hyundai",
    model: "Tucson",
    variant: "Platinum AWD",
    year: 2022,
    price: 8.75,
    emi: 15460,
    fuel: "Petrol",
    transmission: "Automatic",
    registration: "MH",
    mileage: "21,000 km",
    bodyType: "SUV",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=80",
      "https://images.unsplash.com/photo-1614026480418-bd11fdb9fa06?w=1200&q=80",
    ],
    featured: false,
    newArrival: true,
    description: "The all-new Tucson with its parametric design language and fully-digital cockpit redefines what a family SUV can feel like.",
    owners: 1,
    color: "Titan Grey",
    engineCC: 2000,
  },
  {
    id: "6",
    slug: "2020-volvo-xc90-inscription",
    brand: "Volvo",
    model: "XC90",
    variant: "T8 Inscription",
    year: 2020,
    price: 6.50,
    emi: 11490,
    fuel: "Hybrid",
    transmission: "Automatic",
    registration: "GJ",
    mileage: "41,200 km",
    bodyType: "SUV",
    images: [
      "https://images.unsplash.com/photo-1612218023516-e12fa47d659e?w=1200&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80",
    ],
    featured: false,
    description: "Volvo's flagship 7-seater SUV in T8 plug-in hybrid form. Bowers & Wilkins audio, Nappa leather, and crystal gear shifter.",
    owners: 1,
    color: "Crystal White",
    engineCC: 1969,
  },
  {
    id: "7",
    slug: "2023-kia-seltos-gtx-plus",
    brand: "Kia",
    model: "Seltos",
    variant: "GTX+ DCT",
    year: 2023,
    price: 9.40,
    emi: 16610,
    fuel: "Petrol",
    transmission: "DCT",
    registration: "RJ",
    mileage: "14,300 km",
    bodyType: "SUV",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
    ],
    featured: false,
    newArrival: true,
    description: "The Kia Seltos in top GTX+ trim features a panoramic sunroof, Bose sound system, and a powerful 1.4T engine.",
    owners: 1,
    color: "Glacier White Pearl",
    engineCC: 1353,
  },
  {
    id: "8",
    slug: "2021-tata-safari-adventure-plus",
    brand: "Tata",
    model: "Safari",
    variant: "Adventure Plus",
    year: 2021,
    price: 7.25,
    emi: 12810,
    fuel: "Diesel",
    transmission: "Automatic",
    registration: "PB",
    mileage: "36,700 km",
    bodyType: "SUV",
    images: [
      "https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=1200&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
    ],
    featured: false,
    description: "The iconic Tata Safari returns stronger than ever. This Adventure Plus brings 6-seater captain chair comfort with rugged diesel capability.",
    owners: 1,
    color: "Orcus White",
    engineCC: 1956,
  },
];

export const FEATURED_CARS = CARS.filter((c) => c.featured);
export const NEW_ARRIVAL_CARS = CARS.filter((c) => c.newArrival);

export function getCarBySlug(slug: string): Car | undefined {
  return CARS.find((c) => c.slug === slug);
}

export const BRANDS = [...new Set(CARS.map((c) => c.brand))].sort();
export const FUEL_TYPES: FuelType[] = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
export const TRANSMISSION_TYPES: TransmissionType[] = ["Manual", "Automatic", "CVT", "DCT"];
export const BODY_TYPES: BodyType[] = ["Sedan", "SUV", "Hatchback", "MPV", "Coupe"];
