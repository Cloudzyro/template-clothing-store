// Every product, collection and colorway in the store lives here.
// Pages, filters, the sitemap and the lookbook read from this file.

export type Garment =
  | "coat"
  | "jacket"
  | "shirt"
  | "knit"
  | "cardigan"
  | "tee"
  | "trousers"
  | "skirt"
  | "dress"
  | "slip"
  | "scarf";

export type Sizing = "tops" | "bottoms" | "one";

export type ColorFamily = "black" | "grey" | "white" | "brown" | "red" | "green" | "blue";

export type Colorway = {
  name: string;
  hex: string;
  family: ColorFamily;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
};

export type Product = {
  slug: string;
  name: string;
  collection: string;
  garment: Garment;
  price: number;
  colors: Colorway[];
  sizes: string[];
  sizing: Sizing;
  fit: string;
  description: string;
  details: string[];
  fabric: string;
  care: string;
  /** Hosted checkout link (Stripe Payment Links, Paddle, Lemon Squeezy or similar). */
  paymentLink: string;
  /** Optional links per option, keyed like "Camel", "M" or "Camel / M". */
  variantLinks?: Record<string, string>;
  /** Date it arrived in the shop, used for "Newest" sorting. */
  added: string;
};

export const collections: Collection[] = [
  {
    slug: "outerwear",
    name: "Outerwear",
    description: "Coats and jackets in boiled wool and waxed cotton, cut with room for a sweater underneath.",
  },
  {
    slug: "knitwear",
    name: "Knitwear",
    description: "Lambswool and merino knits from a family mill, finished by hand at the cuffs and hem.",
  },
  {
    slug: "shirts-and-tops",
    name: "Shirts and tops",
    description: "Poplin, flannel and heavy jersey. Shirts with real horn buttons and tees that keep their shape.",
  },
  {
    slug: "trousers-and-skirts",
    name: "Trousers and skirts",
    description: "Pleated wool, wide wale cord and a bias-cut skirt, all with a little extra in the seams for altering.",
  },
  {
    slug: "dresses",
    name: "Dresses",
    description: "A shirt dress for every day and a slip dress for the evenings, both lined in cotton voile.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "Scarves woven on the same looms as our coat cloth, from the offcuts we refuse to waste.",
  },
];

const SIZES_TOPS = ["XS", "S", "M", "L", "XL"];
const SIZES_BOTTOMS = ["26", "28", "30", "32", "34", "36"];

const link = (id: string) => `https://buy.stripe.com/test_ardenvale_${id}`;

export const products: Product[] = [
  {
    slug: "wren-coat",
    name: "Wren coat",
    collection: "outerwear",
    garment: "coat",
    price: 420,
    colors: [
      { name: "Camel", hex: "#a67c52", family: "brown" },
      { name: "Charcoal", hex: "#34353a", family: "grey" },
      { name: "Oxblood", hex: "#6b2230", family: "red" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "Relaxed through the body, falls just below the knee. Take your usual size.",
    description:
      "A single-breasted coat in boiled wool that keeps its line in the rain. The shoulder is soft, the lapel is wide enough to turn up, and the pockets sit where your hands want them.",
    details: ["Three horn buttons", "Deep welt pockets", "Half lined in cotton twill", "Back vent"],
    fabric: "92% boiled wool, 8% nylon. Woven in Oregon.",
    care: "Dry clean only. Brush after wearing.",
    paymentLink: link("wren"),
    added: "2026-10-28",
  },
  {
    slug: "hollis-chore-jacket",
    name: "Hollis chore jacket",
    collection: "outerwear",
    garment: "jacket",
    price: 245,
    colors: [
      { name: "Indigo", hex: "#2f3e5c", family: "blue" },
      { name: "Moss", hex: "#5d6648", family: "green" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "Boxy and slightly cropped. Size down for a closer fit.",
    description:
      "A workwear jacket in waxed cotton canvas with three patch pockets and a corduroy collar. It softens and marks with wear, which is the point.",
    details: ["Corduroy collar", "Three patch pockets", "Brass shank buttons", "Unlined"],
    fabric: "100% cotton canvas with a light wax finish.",
    care: "Wipe clean. Rewax once a year.",
    paymentLink: link("hollis"),
    added: "2026-09-14",
  },
  {
    slug: "merrow-crewneck",
    name: "Merrow crewneck",
    collection: "knitwear",
    garment: "knit",
    price: 168,
    colors: [
      { name: "Oat", hex: "#d8ccb4", family: "white" },
      { name: "Bottle", hex: "#2f4a3a", family: "green" },
      { name: "Navy", hex: "#232c45", family: "blue" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "True to size with a slightly dropped shoulder.",
    description:
      "A lambswool crewneck knitted on old hand frames, so it has a little more give than most. Warm enough on its own in October, thin enough under the Wren in January.",
    details: ["Fully fashioned shoulders", "Ribbed collar, cuffs and hem", "Linked seams"],
    fabric: "100% lambswool.",
    care: "Hand wash cold and dry flat.",
    paymentLink: link("merrow"),
    added: "2026-10-30",
  },
  {
    slug: "tamsin-cardigan",
    name: "Tamsin cardigan",
    collection: "knitwear",
    garment: "cardigan",
    price: 185,
    colors: [
      { name: "Oxblood", hex: "#6b2230", family: "red" },
      { name: "Fog", hex: "#a9aaa6", family: "grey" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "Close fitting at the waist. Size up to layer over a shirt.",
    description:
      "A V-neck cardigan in fine merino with seven mother of pearl buttons. It sits at the hip and works open over a dress or buttoned on its own.",
    details: ["Seven shell buttons", "Ribbed placket", "Two hidden pockets"],
    fabric: "100% extra fine merino.",
    care: "Hand wash cold and dry flat.",
    paymentLink: link("tamsin"),
    added: "2026-11-06",
  },
  {
    slug: "pell-poplin-shirt",
    name: "Pell poplin shirt",
    collection: "shirts-and-tops",
    garment: "shirt",
    price: 128,
    colors: [
      { name: "Chalk", hex: "#f1efe8", family: "white" },
      { name: "Sky", hex: "#b9c8d8", family: "blue" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "Straight cut with a longer back hem for tucking in.",
    description:
      "A crisp cotton poplin shirt with a soft collar that doesn't need stays. The kind of shirt you buy once and then again in the other color.",
    details: ["Horn buttons", "Single chest pocket", "Split back yoke"],
    fabric: "100% organic cotton poplin.",
    care: "Machine wash cold. Iron while slightly damp.",
    paymentLink: link("pell"),
    added: "2026-08-22",
  },
  {
    slug: "field-overshirt",
    name: "Field overshirt",
    collection: "shirts-and-tops",
    garment: "shirt",
    price: 158,
    colors: [
      { name: "Rust", hex: "#8a4a2f", family: "brown" },
      { name: "Olive", hex: "#5b5a3a", family: "green" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "Roomy enough to wear as a light jacket. Take your usual size.",
    description:
      "A brushed flannel overshirt, heavier than a shirt and lighter than a jacket. Two flap pockets, a straight hem and sleeves that roll up and stay there.",
    details: ["Two flap pockets", "Corozo buttons", "Brushed on both sides"],
    fabric: "100% cotton flannel, 310 gsm.",
    care: "Machine wash cold. Line dry.",
    paymentLink: link("field"),
    added: "2026-10-02",
  },
  {
    slug: "lowe-heavy-tee",
    name: "Lowe heavy tee",
    collection: "shirts-and-tops",
    garment: "tee",
    price: 58,
    colors: [
      { name: "Bone", hex: "#e9e3d6", family: "white" },
      { name: "Black", hex: "#1d1d1d", family: "black" },
      { name: "Clay", hex: "#a0654a", family: "brown" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "Boxy with a short sleeve that hits mid bicep.",
    description:
      "A heavyweight jersey tee with a tight, narrow collar that won't sag after a summer of washing.",
    details: ["Taped shoulder seams", "Narrow ribbed collar", "Pre-shrunk"],
    fabric: "100% cotton jersey, 240 gsm.",
    care: "Machine wash cold. Tumble dry low.",
    paymentLink: link("lowe"),
    added: "2026-07-15",
  },
  {
    slug: "calder-pleated-trouser",
    name: "Calder pleated trouser",
    collection: "trousers-and-skirts",
    garment: "trousers",
    price: 178,
    colors: [
      { name: "Charcoal", hex: "#34353a", family: "grey" },
      { name: "Stone", hex: "#b8ae9c", family: "brown" },
    ],
    sizes: SIZES_BOTTOMS,
    sizing: "bottoms",
    fit: "High rise with a full leg and a single forward pleat. Sizes are waist in inches.",
    description:
      "A wool flannel trouser with a single pleat and side adjusters instead of belt loops. Left unhemmed at 36 inches so your tailor can finish it.",
    details: ["Side adjusters", "Single forward pleat", "Unfinished hem", "Extra seam allowance"],
    fabric: "100% wool flannel.",
    care: "Dry clean. Steam between wears.",
    paymentLink: link("calder"),
    added: "2026-09-30",
  },
  {
    slug: "wide-wale-cord",
    name: "Wide wale cord",
    collection: "trousers-and-skirts",
    garment: "trousers",
    price: 165,
    colors: [
      { name: "Tobacco", hex: "#6e4b2e", family: "brown" },
      { name: "Navy", hex: "#232c45", family: "blue" },
    ],
    sizes: SIZES_BOTTOMS,
    sizing: "bottoms",
    fit: "Mid rise with a straight leg. Sizes are waist in inches.",
    description:
      "An eight wale corduroy trouser, garment dyed so the color sits a little differently on every pair.",
    details: ["Button fly", "Two back pockets", "Garment dyed"],
    fabric: "100% cotton corduroy.",
    care: "Machine wash cold inside out.",
    paymentLink: link("cord"),
    added: "2026-11-02",
  },
  {
    slug: "isla-midi-skirt",
    name: "Isla midi skirt",
    collection: "trousers-and-skirts",
    garment: "skirt",
    price: 148,
    colors: [
      { name: "Ink", hex: "#1f2430", family: "black" },
      { name: "Oxblood", hex: "#6b2230", family: "red" },
    ],
    sizes: SIZES_BOTTOMS,
    sizing: "bottoms",
    fit: "Sits at the natural waist and falls to mid calf. Sizes are waist in inches.",
    description:
      "A bias-cut midi in washed satin that moves when you walk. A side zip and a hidden elastic panel at the back.",
    details: ["Bias cut", "Side zip", "Elastic back waist"],
    fabric: "100% washed viscose satin.",
    care: "Hand wash cold. Hang to dry.",
    paymentLink: link("isla"),
    added: "2026-10-12",
  },
  {
    slug: "juniper-shirt-dress",
    name: "Juniper shirt dress",
    collection: "dresses",
    garment: "dress",
    price: 215,
    colors: [
      { name: "Sage", hex: "#8b9a7e", family: "green" },
      { name: "Ink", hex: "#1f2430", family: "black" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "Relaxed with a self tie belt. Take your usual size.",
    description:
      "A long shirt dress in cotton twill with a full button front and a belt you can lose. Pockets, of course.",
    details: ["Full button front", "Self tie belt", "Side seam pockets"],
    fabric: "100% cotton twill.",
    care: "Machine wash cold.",
    paymentLink: link("juniper"),
    added: "2026-08-30",
  },
  {
    slug: "marlo-slip-dress",
    name: "Marlo slip dress",
    collection: "dresses",
    garment: "slip",
    price: 190,
    colors: [
      { name: "Garnet", hex: "#5e1f2a", family: "red" },
      { name: "Black", hex: "#1d1d1d", family: "black" },
    ],
    sizes: SIZES_TOPS,
    sizing: "tops",
    fit: "Close at the bust, easy through the hip. Straps adjust.",
    description:
      "A bias-cut slip dress in heavy satin with adjustable straps. Wear it alone in summer or over a Lowe tee the rest of the year.",
    details: ["Adjustable straps", "Bias cut", "Lined bodice"],
    fabric: "100% washed viscose satin.",
    care: "Hand wash cold. Hang to dry.",
    paymentLink: link("marlo"),
    added: "2026-11-08",
  },
  {
    slug: "brae-wool-scarf",
    name: "Brae wool scarf",
    collection: "accessories",
    garment: "scarf",
    price: 78,
    colors: [
      { name: "Oxblood", hex: "#6b2230", family: "red" },
      { name: "Fog", hex: "#a9aaa6", family: "grey" },
      { name: "Camel", hex: "#a67c52", family: "brown" },
    ],
    sizes: ["One size"],
    sizing: "one",
    fit: "79 by 14 inches, long enough to wrap twice.",
    description:
      "A brushed wool scarf woven from the ends of our coat cloth, finished with a short twisted fringe.",
    details: ["Twisted fringe", "Brushed finish", "Made from mill offcuts"],
    fabric: "100% wool.",
    care: "Hand wash cold and dry flat.",
    paymentLink: link("brae"),
    added: "2026-10-20",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const productsIn = (collection: string) => products.filter((p) => p.collection === collection);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
