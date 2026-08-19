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
  registration: string; // e.g. "PB 01", "PB 03", "HR 96", "JH"
  registrationPlace?: string;
  location?: string;
  mileage: string; // e.g. "26,000 Km"
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
  // 1. Mahindra Thar LX 4x4 (2022)
  {
    id: "mahindra-thar-lx-4x4-2022",
    slug: "mahindra-thar-lx-4x4-2022",
    brand: "Mahindra",
    model: "Thar",
    variant: "LX 4x4 Hard Top",
    year: 2022,
    price: 14.50,
    priceText: "₹14.50 Lakh",
    emi: 28400,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "26,000 Km",
    kmDriven: 26000,
    owners: "1st Owner",
    color: "Aquamarine",
    registration: "Verified",
    registrationPlace: "Tricity / North India",
    bodyType: "SUV",
    featured: true,
    newArrival: true,
    description: "2022 Mahindra Thar LX 4x4 Hard Top in stunning Aquamarine. Powered by mHawk 130 Turbo Diesel with 6-speed manual 4x4 transfer case. Features custom deep-dish multi-spoke Fuel sport alloy wheels, wide all-terrain off-road tires, hard-top roof, touchscreen infotainment, and electronic roll cage stability. Single hand driven, immaculate condition.",
    images: [
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/775261313_4453132388307698_6747876319747383786_n.jpg?stp=dst-jpg_tt6&cstp=mx1240x2772&ctp=s1240x2772&_nc_cat=109&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=xkj7Qd18IZ4Q7kNvwEtriya&_nc_oc=Ado8Rf79VSAuNky4U5EYoz0rJBBFFlT3r701QkGvgZDqycD7wbtfIkEM-c7blk5uKq8&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=VPNIi9Xouqi5FbIorFG-HA&_nc_ss=7b2a8&oh=00_AQHVFDd9tR-mubNQaTYGachxNDOQYtpMpMKIYRHdDTEB2Q&oe=6A8B211D",
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/775156571_4453132261641044_4959840427745693285_n.jpg?stp=dst-jpg_tt6&cstp=mx1240x2772&ctp=s1240x2772&_nc_cat=101&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=NP2mjcbmpE4Q7kNvwHbn73r&_nc_oc=AdqqaI3k14CQP3TgA0Zp1nhfBfdMFb4OYMZIs0oRbZvfFgY6SaYaLw6Ard9bySBiE7c&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=f5MDehHcknpAfsz-bSoHvg&_nc_ss=7b2a8&oh=00_AQEXpvUr3Mjly36i2zTWUy1269YVyiWrIOVhuOQFoydRjw&oe=6A8B0B4C",
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/775442161_4453131584974445_2858911896660845988_n.jpg?stp=dst-jpg_tt6&cstp=mx1240x2772&ctp=s1240x2772&_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=Tiyvd0Qlo8AQ7kNvwHpzUMa&_nc_oc=Adpa-OaSt08Mv36f3D7ASz5nkPuGB61MgRbSspf5_rTGIb1JpikOkz7Ds-V8gxu5-l0&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=Z0SFr9peAuVQfgxUWBrt6w&_nc_ss=7b2a8&oh=00_AQGyKouIUnxlw1zjuqI_8DFaE6xBF3HR-k5wHXlF0IYFyQ&oe=6A8B2FE7",
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/777570588_4453132308307706_2487763890460519246_n.jpg?stp=dst-jpg_tt6&cstp=mx1240x2772&ctp=s1240x2772&_nc_cat=107&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=TP3M7Vp8UaAQ7kNvwGkn3u0&_nc_oc=AdrbxyDO_5B5F51eNVaHgx6tRXWcsBnTGKbDL_DlR7wtVgWSVSyUZGlsR6zBodRqSQg&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=kGlkj2FWGi_zzf2W0lciQg&_nc_ss=7b2a8&oh=00_AQGg_M6Ry8Q7Cd-Pe2K38oJ7PIhGM9RWTh6_AFULe9KmOA&oe=6A8B0FDE",
    ],
    featuresList: [
      {
        category: "Off-Road & Performance",
        items: [
          { name: "Shift-on-Fly 4x4 System with Low Range", value: true },
          { name: "Custom Deep-Dish Fuel Alloy Wheels", value: true },
          { name: "Wide All-Terrain Radial Tires", value: true },
          { name: "Factory Molded Hard Top Roof", value: true },
          { name: "Rear Tailgate Mounted Spare Wheel", value: true },
        ],
      },
      {
        category: "Comfort & Cabin",
        items: [
          { name: "Air Conditioning with Heater", value: "Yes" },
          { name: "Power Steering", value: true },
          { name: "Power Windows", value: "Front" },
          { name: "Keyless Central Locking", value: true },
          { name: "Touchscreen Infotainment System", value: true },
        ],
      },
      {
        category: "Safety & Off-Road Protection",
        items: [
          { name: "Electronic Stability Program (ESP)", value: true },
          { name: "Built-in Roll Cage Protection", value: true },
          { name: "Dual Front Airbags", value: true },
          { name: "Anti-lock Braking System (ABS)", value: true },
          { name: "Reverse Parking Sensors", value: true },
        ],
      },
    ],
  },

  // 2. Hyundai Grand i10 Magna CNG (2018)
  {
    id: "hyundai-grand-i10-cng-2018",
    slug: "hyundai-grand-i10-cng-2018",
    brand: "Hyundai",
    model: "Grand i10",
    variant: "1.2 Magna (CNG)",
    year: 2018,
    price: 4.15,
    priceText: "₹4.15 Lakh",
    emi: 8150,
    fuel: "CNG",
    transmission: "Manual",
    mileage: "54,000 Km",
    kmDriven: 54000,
    owners: "1st Owner",
    color: "Pure White",
    location: "Mona Greens, Zirakpur",
    registration: "PB 01",
    registrationPlace: "PB 01 (Chandigarh / Punjab)",
    bodyType: "Hatchback",
    featured: true,
    newArrival: true,
    description: "Hyundai Grand i10 in Pure White with approved dual-fuel CNG & Petrol setup. Features high fuel efficiency, front power windows, power steering, central locking, body-colored ORVMs, and cascading front grille. Verified registration PB 01C 0764, inspected and in ready-to-drive condition.",
    images: [
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/778061216_2855635558126352_4009559534661350761_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=105&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=ClfUjHduM0MQ7kNvwFXAt7k&_nc_oc=AdpChYcTqlCQkqgTVWc9FtQSZ3kvBUk2dtQIDcd5yFcSi5P0h7rjefG2UQ7GBHZPkm0&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=bwEGXMYl-t0XyIrGZgoVkA&_nc_ss=7b2a8&oh=00_AQEqoKpJjOAiQ1fuWTMsjXolwQkHh8F2i7EC9lp3u2fg3A&oe=6A8B1646",
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/775377429_2855635568126351_3183882611473441044_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=DbpX35ZsCaMQ7kNvwGASdYz&_nc_oc=Adpzm6AKiYgdxLrtWuF_jUmjgclF2KZm8G7c1-4Tdf0D27-OxXjTm_4Sn9gxjc-PlpI&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=2hu0gBbppdSou1y3fCoCUQ&_nc_ss=7b2a8&oh=00_AQGE8EYFCHfg9eI_g7FFW62Wv-uED92AAcCgVl6qxPeyzg&oe=6A8B0B55",
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/779082801_2855635571459684_5287055672755050324_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=108&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=D9czAtfZoxUQ7kNvwG2uou3&_nc_oc=AdrjzkypV8vEUoF3K8U2xl6fpqKL8RO3EU3EMgBpbzNi8CGIY-iO83EjdASUzFD3OHg&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=B60yy3WGSWhgQpETMNS7rA&_nc_ss=7b2a8&oh=00_AQE0Nf4Ge1KklZz1bkhD3Ju2YxxdYhhdS0rzO2yl4ZnZGQ&oe=6A8B0E00",
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/778427574_2855635554793019_8771024168661550314_n.jpg?stp=dst-jpg_tt6&cstp=mx1536x2048&ctp=s1536x2048&_nc_cat=107&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=cWwRvXCFeBQQ7kNvwEAud2h&_nc_oc=AdqkcER5_LDES1a_n2x1lmDfPPBdtNJfA_KLo1ULhvOtny-HdHOQpU4k-3fbXtIAyDI&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=X0snCk8IdZK5IWZxaxU99Q&_nc_ss=7b2a8&oh=00_AQEkK3t82PfD46pX6VMj7E6g7iGbF3Tp8eAKcEe8ZG5Ugw&oe=6A8B1BD8",
      "https://scontent.fixc3-1.fna.fbcdn.net/v/t39.30808-6/775261040_2855635561459685_8032583673498875324_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=s2048x1536&_nc_cat=104&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=AQ9xgIvKyxYQ7kNvwGk-T-l&_nc_oc=AdqSJesF9xBhxciwRlqozBgACLXfrrpZq91ZLmr9tsCPi0OqkhvHciTosF6eDT53IAs&_nc_zt=23&_nc_ht=scontent.fixc3-1.fna&_nc_gid=kKmsIeZK5AgJpD6voJgQqQ&_nc_ss=7b2a8&oh=00_AQFsUCkFblbIbJpXxIlJGmLqWuQkt_cWK5sCwNTuVwh0nA&oe=6A8B0227",
    ],
    featuresList: [
      {
        category: "Economy & Fuel",
        items: [
          { name: "Dual-Fuel CNG + Petrol Kit", value: true },
          { name: "Ultra-High Mileage Running Cost", value: true },
          { name: "Manual 5-Speed Transmission", value: true },
        ],
      },
      {
        category: "Comfort & Convenience",
        items: [
          { name: "Air Conditioning with Climate Blower", value: "Yes" },
          { name: "Electric Power Steering", value: true },
          { name: "Front Power Windows", value: true },
          { name: "Central Locking System", value: true },
          { name: "Internally Adjustable Mirrors", value: true },
        ],
      },
      {
        category: "Safety & Exterior",
        items: [
          { name: "Cascading Hexagonal Front Grille", value: true },
          { name: "High-Mounted Stop Lamp", value: true },
          { name: "Immobilizer Security System", value: true },
        ],
      },
    ],
  },

  // 3. Maruti Suzuki Swift RS (2021)
  {
    id: "maruti-swift-rs-2021",
    slug: "maruti-suzuki-swift-rs-2021",
    brand: "Maruti Suzuki",
    model: "Swift",
    variant: "RS Sport Edition",
    year: 2021,
    price: 5.95,
    priceText: "₹5.95 Lakh",
    emi: 11650,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "38,000 Km",
    kmDriven: 38000,
    owners: "1st Owner",
    color: "Metallic Silver",
    registration: "Verified",
    registrationPlace: "Tricity / North India",
    bodyType: "Hatchback",
    featured: true,
    newArrival: true,
    description: "Maruti Suzuki Swift RS Sport Edition in Metallic Silver. Features sport aerodynamic body kit, projector headlamps with LED DRLs, front fog lamps, multi-spoke sport alloy wheels, rear roof spoiler, and sports exhaust tip. Well maintained single-hand driven vehicle with complete documentation.",
    images: [
      "/cars/maruti-swift-rs/swift-1.jpg",
      "/cars/maruti-swift-rs/swift-2.jpg",
      "/cars/maruti-swift-rs/swift-3.jpg",
      "/cars/maruti-swift-rs/swift-4.jpg",
    ],
    featuresList: [
      {
        category: "Sport & Exterior",
        items: [
          { name: "RS Aerodynamic Body Kit", value: true },
          { name: "Front Projector Headlamps & DRLs", value: true },
          { name: "Front Fog Lamps with Chrome Bezels", value: true },
          { name: "Sport Multi-Spoke Alloy Wheels", value: true },
          { name: "Rear Roof Spoiler & Sport Tip", value: true },
        ],
      },
      {
        category: "Comfort & Convenience",
        items: [
          { name: "Automatic Climate Control AC", value: true },
          { name: "Electric Power Steering", value: true },
          { name: "All 4 Power Windows", value: true },
          { name: "Electrically Adjustable ORVMs", value: true },
          { name: "Push Button Start / Keyless Entry", value: true },
        ],
      },
      {
        category: "Safety & Security",
        items: [
          { name: "Dual Front Airbags", value: true },
          { name: "Anti-lock Braking System (ABS + EBD)", value: true },
          { name: "Reverse Parking Sensors", value: true },
          { name: "Engine Immobilizer", value: true },
        ],
      },
      {
        category: "Vehicle Overview",
        items: [
          { name: "Year of Make", value: "2021" },
          { name: "Fuel & Transmission", value: "Petrol · Manual" },
          { name: "Mileage Recorded", value: "38,000 Km" },
          { name: "Ownership", value: "1st Owner" },
          { name: "Color", value: "Metallic Silver" },
        ],
      },
    ],
  },

  // 4. Maruti Suzuki Swift 1.3 VDi DDiS (2015)
  {
    id: "maruti-swift-vdi-2015",
    slug: "maruti-suzuki-swift-vdi-2015",
    brand: "Maruti Suzuki",
    model: "Swift",
    variant: "1.3 VDi DDiS",
    year: 2015,
    price: 3.65,
    priceText: "₹3.65 Lakh",
    emi: 7150,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "68,000 Km",
    kmDriven: 68000,
    owners: "1st Owner",
    color: "Silky Silver",
    registration: "PB 03",
    registrationPlace: "PB 03 (Punjab)",
    bodyType: "Hatchback",
    featured: true,
    newArrival: true,
    description: "Maruti Suzuki Swift VDi Diesel equipped with the legendary 1.3L DDiS turbocharged diesel engine in Silky Silver. Registered in Punjab (PB03AW2189). Features power steering, front & rear power windows, air conditioning, central locking, and fog lamps. Excellent mechanical condition and high fuel economy.",
    images: [
      "/cars/maruti-swift-vdi/swift-vdi-1.jpg",
      "/cars/maruti-swift-vdi/swift-vdi-2.jpg",
    ],
    featuresList: [
      {
        category: "Vehicle Overview",
        items: [
          { name: "Year & Model", value: "2015 Maruti Swift" },
          { name: "Variant", value: "1.3 VDi DDiS" },
          { name: "Fuel & Transmission", value: "Diesel · Manual" },
          { name: "Mileage Recorded", value: "68,000 Km" },
          { name: "Ownership", value: "1st Owner" },
          { name: "Color", value: "Silky Silver" },
          { name: "Registration", value: "PB 03 (Punjab)" },
        ],
      },
      {
        category: "Comfort & Convenience",
        items: [
          { name: "Air Conditioning with Heater", value: "Yes" },
          { name: "Power Steering", value: true },
          { name: "Power Windows", value: "Front & Rear" },
          { name: "Central Locking", value: true },
          { name: "Internally Adjustable Mirrors", value: true },
        ],
      },
      {
        category: "Safety & Security",
        items: [
          { name: "Front Fog Lamps", value: true },
          { name: "Security Alarm & Immobilizer", value: true },
          { name: "Rear Door Child Locks", value: true },
        ],
      },
    ],
  },

  // 5. Hyundai Creta SX (O) Petrol (2016)
  {
    id: "hyundai-creta-sx-o-2016",
    slug: "hyundai-creta-sx-o-2016",
    brand: "Hyundai",
    model: "Creta",
    variant: "SX (O) Petrol",
    year: 2016,
    price: 4.95,
    priceText: "₹4.95 Lakh",
    emi: 9700,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "75,000 Km",
    kmDriven: 75000,
    owners: "Verified",
    color: "Phantom Black",
    location: "SAS Nagar Mohali, Mohali",
    registration: "HR 26",
    registrationPlace: "HR 26C (Haryana)",
    postingDate: "19-AUG-26",
    bodyType: "SUV",
    featured: true,
    newArrival: true,
    description: "2016 Hyundai Creta SX(O) Petrol in Phantom Black finish with push button start, fully loaded top model car. Registered HR 26C (HR26CT2879). Features diamond-cut alloy wheels, projector headlamps with LED position lamps, touchscreen infotainment system with GPS navigation, automatic climate control, reverse parking camera, electrically folding ORVMs, and smart key with keyless entry. Exchange and finance available.",
    images: [
      "/cars/creta/creta1.png",
      "/cars/creta/creta2.png",
      "/cars/creta/creta3.png",
      "/cars/creta/creta4.png",
      "/cars/creta/creta5.png",
    ],
    featuresList: [
      {
        category: "Top Model Features",
        items: [
          { name: "Push Button Start / Stop", value: true },
          { name: "Smart Key with Keyless Entry", value: true },
          { name: "Diamond-Cut Alloy Wheels", value: true },
          { name: "Projector Headlamps & DRLs", value: true },
          { name: "Cornering Headlamps", value: true },
        ],
      },
      {
        category: "Comfort & Convenience",
        items: [
          { name: "Automatic Climate Control AC", value: true },
          { name: "Power Steering with Tilt Adjustment", value: true },
          { name: "All 4 Power Windows", value: true },
          { name: "Electrically Folding & Adjustable ORVMs", value: true },
          { name: "Rear AC Vents", value: true },
        ],
      },
      {
        category: "Infotainment & Connectivity",
        items: [
          { name: "Touchscreen Infotainment System", value: true },
          { name: "GPS Navigation System", value: true },
          { name: "Bluetooth & AUX / USB Connectivity", value: true },
          { name: "Steering Mounted Audio Controls", value: true },
        ],
      },
      {
        category: "Safety & Security",
        items: [
          { name: "Dual Front Airbags", value: true },
          { name: "Anti-lock Braking System (ABS + EBD)", value: true },
          { name: "Reverse Parking Camera & Sensors", value: true },
          { name: "Rear Defogger & Wiper", value: true },
          { name: "Engine Immobilizer", value: true },
        ],
      },
      {
        category: "Additional Details",
        items: [
          { name: "Exterior Color", value: "Phantom Black" },
          { name: "Registration", value: "HR 26C (Haryana)" },
          { name: "Exchange Facility", value: "Yes" },
          { name: "Finance Facility", value: "Yes" },
          { name: "Location", value: "SAS Nagar Mohali, Mohali" },
          { name: "Posting Date", value: "19-AUG-26" },
        ],
      },
    ],
    detailedFeatures: {
      abs: true,
      antiTheftDevice: true,
      parkingSensors: true,
      adjustableSteering: true,
      airConditioning: "Automatic Climate Control",
      powerSteering: true,
      powerWindows: "All 4",
      cruiseControl: false,
      auxCompatibility: true,
      bluetooth: true,
      radio: true,
      usbCompatibility: true,
      navigationSystem: true,
    },
  },

  // 6. Hyundai Grand i10 Asta 1.2 Kappa VTVT (O) (2019)
  {
    id: "hyundai-grand-i10-asta-2019",
    slug: "hyundai-grand-i10-asta-2019",
    brand: "Hyundai",
    model: "Grand i10",
    variant: "Asta 1.2 Kappa VTVT (O)",
    year: 2019,
    price: 4.25,
    priceText: "₹4.25 Lakh",
    emi: 8350,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "59,000 Km",
    kmDriven: 59000,
    owners: "1st Owner",
    color: "Silver",
    location: "Sector 52, Chandigarh",
    registration: "CH 01",
    registrationPlace: "CH (Chandigarh)",
    makeMonth: "November",
    insuranceType: "Comprehensive",
    postingDate: "22-MAY-26",
    bodyType: "Hatchback",
    featured: true,
    newArrival: true,
    description: "2019 Hyundai Grand i10 Asta 1.2 Kappa VTVT (O) top model in Silver. 1st Owner vehicle with 59,000 km recorded. Certified non-accidental with available complete service history. Features 4 Airbags, ABS, Cruise Control, Touchscreen with Navigation & Bluetooth, Reverse Parking Camera & Sensors, New Battery, New Tyres, Remote Central Locking, and Active Comprehensive Insurance.",
    images: [
      "/cars/hyundai/hyundai1.png",
      "/cars/hyundai/hyundai2.png",
      "/cars/hyundai/hyundai3.png",
      "/cars/hyundai/hyundai4.png",
      "/cars/hyundai/hyundai5.png",
    ],
    featuresList: [
      {
        category: "Safety & Security",
        items: [
          { name: "4 Airbags Protection", value: true },
          { name: "Anti-lock Braking System (ABS)", value: true },
          { name: "Anti-Theft Device", value: true },
          { name: "Reverse Parking Camera", value: true },
          { name: "Rear Parking Sensors", value: true },
          { name: "Remote Controlled Central Lock System", value: true },
        ],
      },
      {
        category: "Comfort & Convenience",
        items: [
          { name: "Cruise Control", value: true },
          { name: "Air Conditioning with Heater", value: "Yes" },
          { name: "Power Steering & Adjustable Steering", value: true },
          { name: "Front Power Windows", value: true },
        ],
      },
      {
        category: "Connectivity & Entertainment",
        items: [
          { name: "Touchscreen Navigation System", value: true },
          { name: "Bluetooth & AUX Compatibility", value: true },
          { name: "USB Compatibility", value: true },
          { name: "AM/FM Radio", value: true },
        ],
      },
      {
        category: "Condition & Verification",
        items: [
          { name: "Vehicle Certified", value: "Yes" },
          { name: "Accidental History", value: "No" },
          { name: "Battery Condition", value: "New" },
          { name: "Tyre Condition", value: "New" },
          { name: "Service History", value: "Available" },
          { name: "Insurance Type", value: "Comprehensive" },
          { name: "Make Month", value: "November" },
          { name: "Exchange & Finance", value: "Available" },
        ],
      },
    ],
    detailedFeatures: {
      abs: true,
      antiTheftDevice: true,
      parkingSensors: true,
      adjustableSteering: true,
      airConditioning: "With Heater",
      powerSteering: true,
      powerWindows: "Front",
      cruiseControl: true,
      auxCompatibility: true,
      bluetooth: true,
      radio: true,
      usbCompatibility: true,
      navigationSystem: true,
    },
  },

  // 7. Tata Safari 2.0 Kryotec XZ Plus 6S Adventure (2022)
  {
    id: "tata-safari-xz-plus-adventure-2022",
    slug: "tata-safari-xz-plus-adventure-2022",
    brand: "Tata",
    model: "Safari",
    variant: "2.0 Kryotec XZ Plus 6S Adventure",
    year: 2022,
    price: 16.95,
    priceText: "₹16.95 Lakh",
    emi: 33200,
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: "43,000 Km",
    kmDriven: 43000,
    owners: "1st Owner",
    color: "White",
    location: "Sector 21A, Chandigarh",
    registration: "CH 01",
    registrationPlace: "CH (Chandigarh)",
    makeMonth: "January",
    insuranceType: "Comprehensive",
    postingDate: "14-AUG-26",
    bodyType: "SUV",
    featured: true,
    newArrival: true,
    description: "2022 Tata Safari 2.0 Kryotec XZ Plus 6S Adventure Automatic in White. Car is all original, single hand driven, immaculate and well maintained. Fully insured with complete company authorized service records and under manufacturer warranty. 1st Owner vehicle with both original smart keys. Features panoramic sunroof, 6-seater captain seats, adventure black alloy wheels, premium touch infotainment, reverse camera, and full safety suite. Exchange and finance available.",
    images: [
      "/cars/safari/safari1.png",
      "/cars/safari/safari2.png",
      "/cars/safari/safari3.png",
      "/cars/safari/safari4.png",
      "/cars/safari/safari5.png",
    ],
    featuresList: [
      {
        category: "Adventure Edition & Exterior",
        items: [
          { name: "Panoramic Sunroof", value: true },
          { name: "Adventure Signature Alloy Wheels", value: true },
          { name: "Projector Xenon HID Headlamps & LED DRLs", value: true },
          { name: "Roof Rails & Signature Safari Grille", value: true },
          { name: "Color", value: "White" },
        ],
      },
      {
        category: "Performance & Transmission",
        items: [
          { name: "2.0L Kryotec Turbocharged Diesel Engine", value: true },
          { name: "6-Speed Automatic Transmission", value: true },
          { name: "Multi Drive Modes (Eco, City, Sport)", value: true },
          { name: "ESP Terrain Response Modes", value: true },
        ],
      },
      {
        category: "Luxury & Cabin Comfort",
        items: [
          { name: "6-Seater Layout with Captain Seats", value: true },
          { name: "Automatic Climate Control AC with Rear Vents", value: true },
          { name: "Electronic Power Steering & Tilt/Telescopic", value: true },
          { name: "All 4 Power Windows", value: true },
          { name: "Push Button Start / Stop with Both Smart Keys", value: true },
        ],
      },
      {
        category: "Safety & Security",
        items: [
          { name: "6 Airbags Protection", value: true },
          { name: "Electronic Stability Program (ESP) & ABS", value: true },
          { name: "Reverse Parking Camera & Sensors", value: true },
          { name: "Hill Hold & Hill Descent Control", value: true },
          { name: "Disc Brakes on All 4 Wheels", value: true },
        ],
      },
      {
        category: "Documentation & Verification",
        items: [
          { name: "Ownership", value: "1st Owner" },
          { name: "Accidental History", value: "No (All Original)" },
          { name: "Service History", value: "Available (Company Record)" },
          { name: "Warranty Status", value: "Under Warranty" },
          { name: "Insurance Type", value: "Comprehensive Active" },
          { name: "Make Month", value: "January" },
          { name: "Registration", value: "CH (Chandigarh)" },
          { name: "Exchange & Finance", value: "Available" },
        ],
      },
    ],
    detailedFeatures: {
      abs: true,
      antiTheftDevice: true,
      parkingSensors: true,
      adjustableSteering: true,
      airConditioning: "Automatic Climate Control",
      powerSteering: true,
      powerWindows: "All 4",
      cruiseControl: true,
      auxCompatibility: true,
      bluetooth: true,
      radio: true,
      usbCompatibility: true,
      navigationSystem: true,
    },
  },
];

export const FEATURED_CARS = CARS.filter((c) => c.featured);
export const NEW_ARRIVAL_CARS = CARS.filter((c) => c.newArrival);

export function getCarBySlug(slug: string): Car | undefined {
  return CARS.find((c) => c.slug === slug);
}

export const BRANDS = [...new Set(CARS.map((c) => c.brand))].sort();
export const LOCATIONS = ["Chandigarh", "Mohali", "Panchkula", "Zirakpur", "Kharar", "Other"];
export const FUEL_TYPES: FuelType[] = ["Diesel", "Petrol", "CNG", "Electric", "Hybrid"];
export const TRANSMISSION_TYPES: TransmissionType[] = ["Manual", "Automatic", "AMT", "CVT", "DCT"];
export const BODY_TYPES: BodyType[] = ["SUV", "Hatchback", "Sedan", "MUV", "Luxury"];
