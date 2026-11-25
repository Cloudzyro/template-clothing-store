// Store details, navigation, size guide, lookbook and FAQ.

export const site = {
  name: "Arden Vale",
  tagline: "Clothes cut in Halden, Oregon",
  description:
    "Arden Vale is a small clothing shop and workroom in Halden, Oregon. Coats, knits, shirts and dresses in natural cloth, made in small runs and repaired for free.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, ""),
  email: "hello@ardenvale.example",
  phone: "(541) 555-0148",
  address: {
    street: "418 Calder Street",
    city: "Halden",
    region: "OR",
    postal: "97412",
  },
  hours: [
    { days: "Tuesday to Friday", time: "11 am to 6 pm" },
    { days: "Saturday", time: "10 am to 5 pm" },
    { days: "Sunday and Monday", time: "Closed, workroom only" },
  ],
  announcement: "Free shipping on US orders over $150. Free repairs for as long as you own the piece.",
  /** Optional single checkout link for mixed bags (for example one Stripe Payment Link with several products). */
  storeCheckoutUrl: "",
  nav: [
    { href: "/shop/", label: "Shop" },
    { href: "/collections/", label: "Collections" },
    { href: "/lookbook/", label: "Lookbook" },
    { href: "/contact/", label: "Visit" },
  ],
  home: {
    headline: "Coats, knits and shirts, cut in small runs in Halden",
    intro:
      "We design and sew in the room behind the shop. Each piece comes in a run of sixty or fewer, in cloth from mills we can drive to.",
    featured: "wren-coat",
    featuredColor: "Camel",
    story: {
      title: "Made behind the counter",
      body: [
        "Arden Vale started in 2019 as a two person alterations shop. We still do alterations, and everything we make has a little extra in the seams so it can be let out, taken in or mended.",
        "Bring any Arden Vale piece back and we'll repair it for free, for as long as you own it.",
      ],
    },
    notes: [
      { title: "Free repairs", body: "Holes, seams, buttons and zips, fixed in the workroom for as long as you own the piece." },
      { title: "Hemmed to fit", body: "Trousers arrive unhemmed. Send us your inseam at checkout and we'll finish them for free." },
      { title: "30 day returns", body: "Unworn pieces can come back within 30 days. Return shipping in the US is on us." },
    ],
  },
  footer: {
    note: "A clothing shop and workroom in Halden, Oregon. All names, products and addresses on this site are fictional.",
  },
  faq: [
    {
      q: "How do sizes run?",
      a: "Most pieces are true to size. Each product page has a fit note and a size guide in inches. If you're between sizes, write to us with your measurements and we'll tell you honestly.",
    },
    {
      q: "Do you hem trousers?",
      a: "Yes. Trousers are left unhemmed at a 36 inch inseam. Add your inseam in the checkout notes and we'll finish them before they ship, at no charge.",
    },
    {
      q: "How do free repairs work?",
      a: "Email us a photo of the damage. We'll send a prepaid label, repair the piece in our workroom and post it back, usually within two weeks.",
    },
    {
      q: "Where do you ship?",
      a: "Across the US, and to Canada for a flat $18. Orders leave the workroom within two business days.",
    },
  ],
};

export type SizeChart = { title: string; unit: string; columns: string[]; rows: string[][]; note: string };

export const sizeCharts: Record<"tops" | "bottoms" | "one", SizeChart> = {
  tops: {
    title: "Tops, knits, coats and dresses",
    unit: "inches",
    columns: ["Size", "Chest", "Waist", "Hip"],
    rows: [
      ["XS", "32 to 34", "26 to 28", "34 to 36"],
      ["S", "34 to 36", "28 to 30", "36 to 38"],
      ["M", "37 to 39", "31 to 33", "39 to 41"],
      ["L", "40 to 42", "34 to 36", "42 to 44"],
      ["XL", "43 to 46", "37 to 40", "45 to 48"],
    ],
    note: "Measure around the fullest part of your chest and hips, and around your natural waist, with the tape level and snug.",
  },
  bottoms: {
    title: "Trousers and skirts",
    unit: "inches",
    columns: ["Size", "Waist", "Hip", "Inseam"],
    rows: [
      ["26", "26", "36", "36, unhemmed"],
      ["28", "28", "38", "36, unhemmed"],
      ["30", "30", "40", "36, unhemmed"],
      ["32", "32", "42", "36, unhemmed"],
      ["34", "34", "44", "36, unhemmed"],
      ["36", "36", "46", "36, unhemmed"],
    ],
    note: "Sizes are the waist in inches. Trousers come unhemmed, so add your inseam at checkout and we'll finish them.",
  },
  one: {
    title: "One size",
    unit: "inches",
    columns: ["Piece", "Length", "Width"],
    rows: [["Brae wool scarf", "79", "14"]],
    note: "Accessories come in one size.",
  },
};

export type Look = {
  slug: string;
  title: string;
  caption: string;
  tone: string;
  pieces: { product: string; color: string }[];
};

export const lookbook = {
  title: "Fall and winter 2026",
  intro:
    "Five looks from this season, shot in the workroom on a cold week in October. Every piece links to the shop.",
  looks: [
    {
      slug: "first-frost",
      title: "First frost",
      caption: "The Wren in camel over an oat crewneck and stone trousers.",
      tone: "#e6ddd0",
      pieces: [
        { product: "wren-coat", color: "Camel" },
        { product: "merrow-crewneck", color: "Oat" },
        { product: "calder-pleated-trouser", color: "Stone" },
      ],
    },
    {
      slug: "workroom",
      title: "Workroom",
      caption: "A rust overshirt, bone tee and tobacco cord for the days we're cutting cloth.",
      tone: "#ddd6ca",
      pieces: [
        { product: "field-overshirt", color: "Rust" },
        { product: "lowe-heavy-tee", color: "Bone" },
        { product: "wide-wale-cord", color: "Tobacco" },
      ],
    },
    {
      slug: "late-supper",
      title: "Late supper",
      caption: "The Marlo slip in garnet with a fog cardigan over the shoulders.",
      tone: "#e3d9d6",
      pieces: [
        { product: "marlo-slip-dress", color: "Garnet" },
        { product: "tamsin-cardigan", color: "Fog" },
      ],
    },
    {
      slug: "market-day",
      title: "Market day",
      caption: "Indigo chore jacket, sky poplin shirt and charcoal trousers.",
      tone: "#d9dde0",
      pieces: [
        { product: "hollis-chore-jacket", color: "Indigo" },
        { product: "pell-poplin-shirt", color: "Sky" },
        { product: "calder-pleated-trouser", color: "Charcoal" },
      ],
    },
    {
      slug: "river-walk",
      title: "River walk",
      caption: "The Juniper in sage with an oxblood scarf.",
      tone: "#dfe0d6",
      pieces: [
        { product: "juniper-shirt-dress", color: "Sage" },
        { product: "brae-wool-scarf", color: "Oxblood" },
      ],
    },
  ] satisfies Look[],
};
