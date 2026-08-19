export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG";
export type TransmissionType = "Manual" | "Automatic" | "AMT" | "CVT" | "DCT";
export type BodyType = "Sedan" | "SUV" | "Hatchback" | "MUV" | "Coupe" | "Luxury";

export interface CarFeatures {
  // Safety & Security
  abs?: boolean;
  antiTheftDevice?: boolean;
  parkingSensors?: boolean;

  // Comfort & Convenience
  adjustableSteering?: boolean;
  airConditioning?: string;
  powerSteering?: boolean;
  powerWindows?: string;
  cruiseControl?: boolean;

  // Connectivity & Entertainment
  auxCompatibility?: boolean;
  bluetooth?: boolean;
  radio?: boolean;
  usbCompatibility?: boolean;
  navigationSystem?: boolean;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price?: number; // Only if price is provided; undefined = Price on Request
  priceText?: string;
  emi?: number;
  fuel: FuelType;
  transmission: TransmissionType;
  registration: string; // e.g. "JH", "HR 96"
  registrationPlace?: string;
  location?: string;
  mileage: string; // e.g. "71,000 Km"
  kmDriven?: number;
  bodyType: BodyType;
  color?: string;
  makeMonth?: string;
  insuranceType?: string;
  owners?: number | string;
  postingDate?: string;
  images: string[];
  featured?: boolean;
  newArrival?: boolean;
  description?: string;
  featuresList?: {
    category: string;
    items: { name: string; value?: string | boolean }[];
  }[];
  detailedFeatures?: CarFeatures;
}

export function formatPrice(priceInLakhs?: number): string {
  if (priceInLakhs === undefined || priceInLakhs === null || isNaN(priceInLakhs) || priceInLakhs <= 0) {
    return "Price on Request";
  }
  if (priceInLakhs >= 100) {
    return `₹${(priceInLakhs / 100).toFixed(2)} Cr`;
  }
  return `₹${priceInLakhs.toFixed(2)} Lakh`;
}

export function formatEMI(emi?: number): string {
  if (!emi) return "";
  return `₹${emi.toLocaleString("en-IN")}/mo`;
}

// -------------------------------------------------------------
// SINGLE SOURCE OF TRUTH: REAL VEHICLE INVENTORY
// -------------------------------------------------------------
export const CARS: Car[] = [
  {
    id: "hyundai-i20-2019-sportz",
    slug: "hyundai-i20-2019-sportz",
    brand: "Hyundai",
    model: "i20",
    variant: "1.2 Sportz",
    year: 2019,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "85,000 Km",
    kmDriven: 85000,
    owners: "3rd Owner",
    color: "Grey",
    location: "Pahlwan, Uchana",
    registration: "HR 96",
    registrationPlace: "HR 96 (Haryana)",
    bodyType: "Hatchback",
    priceText: "Price on Request",
    featured: true,
    newArrival: true,
    postingDate: "02-AUG-26",
    description: "Well-maintained Hyundai i20 Sportz from 2019. Diesel fuel type, manual transmission with 85,000 km driven. Third owner vehicle in great condition for its age. Located at Pahlwan, Uchana.",
    images: [
      "/cars/hyundai-i20/i20-1.jpg",
    ],
    featuresList: [
      {
        category: "Vehicle Overview",
        items: [
          { name: "Year & Model", value: "2019 Hyundai i20" },
          { name: "Variant", value: "1.2 Sportz" },
          { name: "Fuel & Gearbox", value: "Diesel · Manual" },
          { name: "Mileage Recorded", value: "85,000 Km" },
          { name: "Ownership", value: "3rd Owner" },
          { name: "Color", value: "Grey" },
          { name: "Registration", value: "HR 96" },
          { name: "Location", value: "Pahlwan, Uchana" },
          { name: "Posting Date", value: "02-AUG-26" },
        ],
      },
      {
        category: "Comfort & Convenience",
        items: [
          { name: "Air Conditioning", value: "Yes" },
          { name: "Power Steering", value: true },
          { name: "Power Windows", value: "Front & Rear" },
          { name: "Central Locking", value: true },
        ],
      },
      {
        category: "Safety & Security",
        items: [
          { name: "Reverse Parking Sensors", value: true },
          { name: "Anti-lock Braking (ABS)", value: true },
          { name: "Dual Front Airbags", value: true },
          { name: "Rear Defogger", value: true },
        ],
      },
    ],
  },
  {
    id: "mahindra-bolero-2018-zlx",
    slug: "mahindra-bolero-2018",
    brand: "Mahindra",
    model: "Bolero",
    variant: "1.5 Power Plus ZLX",
    year: 2018,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "71,000 Km",
    kmDriven: 71000,
    owners: "1st Owner",
    color: "Green",
    makeMonth: "September",
    insuranceType: "Comprehensive",
    registration: "JH",
    registrationPlace: "JH",
    bodyType: "SUV",
    priceText: "Price on Request",
    featured: true,
    newArrival: true,
    description: "2018 Mahindra Bolero 1.5 Power Plus ZLX in Green. Single owner (1st Owner), diesel manual transmission with genuine 71,000 Km driven. Features comprehensive insurance, power windows, automatic climate control AC, navigation system, and reverse parking sensors. Verified single-hand driven vehicle.",
    images: [
      "/cars/mahindra-bolero/bolero-1.jpg",
      "/cars/mahindra-bolero/bolero-2.jpg",
      "/cars/mahindra-bolero/bolero-3.jpg",
    ],
    detailedFeatures: {
      abs: true,
      antiTheftDevice: true,
      parkingSensors: true,
      adjustableSteering: true,
      airConditioning: "Automatic Climate Control",
      powerSteering: true,
      powerWindows: "Front & Rear",
      cruiseControl: true,
      auxCompatibility: true,
      bluetooth: true,
      radio: true,
      usbCompatibility: true,
      navigationSystem: true,
    },
    featuresList: [
      {
        category: "Safety & Security",
        items: [
          { name: "Anti-lock Braking System (ABS)", value: true },
          { name: "Anti Theft Device", value: true },
          { name: "Reverse Parking Sensors", value: true },
        ],
      },
      {
        category: "Comfort & Convenience",
        items: [
          { name: "Air Conditioning", value: "Automatic Climate Control" },
          { name: "Adjustable Steering Column", value: true },
          { name: "Power Steering", value: true },
          { name: "Power Windows", value: "Front & Rear" },
          { name: "Cruise Control", value: true },
        ],
      },
      {
        category: "Connectivity & Entertainment",
        items: [
          { name: "Navigation System", value: true },
          { name: "Bluetooth Connectivity", value: true },
          { name: "USB Compatibility", value: true },
          { name: "Aux Compatibility", value: true },
          { name: "AM/FM Radio", value: true },
        ],
      },
      {
        category: "Vehicle Overview",
        items: [
          { name: "Color", value: "Green" },
          { name: "Make Month", value: "September 2018" },
          { name: "Insurance Type", value: "Comprehensive" },
          { name: "Registration State / Place", value: "JH" },
        ],
      },
    ],
  },
];

export const FEATURED_CARS = CARS.filter((c) => c.featured);
export const NEW_ARRIVAL_CARS = CARS.filter((c) => c.newArrival);

export function getCarBySlug(slug: string): Car | undefined {
  return CARS.find((c) => c.slug === slug);
}

export const BRANDS = [...new Set(CARS.map((c) => c.brand))].sort();
export const LOCATIONS = ["Chandigarh", "Mohali", "Panchkula", "Zirakpur", "Kharar", "Other"];
export const FUEL_TYPES: FuelType[] = ["Diesel", "Petrol", "Electric", "Hybrid", "CNG"];
export const TRANSMISSION_TYPES: TransmissionType[] = ["Manual", "Automatic", "AMT", "CVT", "DCT"];
export const BODY_TYPES: BodyType[] = ["SUV", "Hatchback", "Sedan", "MUV", "Luxury"];
