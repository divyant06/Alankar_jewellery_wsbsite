export interface MockProduct {
  id: string;
  name: string;
  imageUrl: string;
  baseWeight: number;
  baseMakingCharge: number;
  stoneCost: number;
  category: "Rings" | "Necklaces" | "Bracelets" | "Earrings" | "Pendants";
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "prod_1",
    name: "Classic Gold Bracelet",
    imageUrl: "/assets/bracelet-1.jpeg",
    baseWeight: 14.5,
    baseMakingCharge: 850,
    stoneCost: 0,
    category: "Bracelets",
  },
  {
    id: "prod_2",
    name: "Elegant Diamond Earrings",
    imageUrl: "/assets/earing-1.jpeg",
    baseWeight: 8.2,
    baseMakingCharge: 1200,
    stoneCost: 15000,
    category: "Earrings",
  },
  {
    id: "prod_3",
    name: "Royal Heritage Necklace",
    imageUrl: "/assets/necklace-1.jpeg",
    baseWeight: 32.0,
    baseMakingCharge: 750,
    stoneCost: 25000,
    category: "Necklaces",
  },
  {
    id: "prod_4",
    name: "Minimalist Solitaire Pendant",
    imageUrl: "/assets/pendant-1.jpeg",
    baseWeight: 4.1,
    baseMakingCharge: 1100,
    stoneCost: 45000,
    category: "Pendants",
  },
];
