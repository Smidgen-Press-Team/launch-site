// PRODUCT CONFIGURATION
export interface ProductOption {
  id: string; // Shopify Product ID
  label: string; // e.g., "Filigree" or "Typography"
}

export interface BookConfig {
  vol: string;
  title: string;
  subtitle: string;
  options: ProductOption[];
}

export const PRODUCT_CONFIG: {
  sewn: BookConfig[];
  hardcover: BookConfig[];
  hardcover_dj: BookConfig[];
  paperback: BookConfig[];
  ebooks: { id: string; vol: string; title: string; subtitle: string }[];
} = {
  sewn: [
    {
      vol: "1",
      title: "Home Education",
      subtitle:
        "Sewn binding with dust jacket. Ships October 2026. EPUB and PDF included free",
      options: [
        { id: "gid://shopify/Product/10502195380502", label: "Filigree" },
        { id: "gid://shopify/Product/10514334056726", label: "Typography" },
      ],
    },
    {
      vol: "2",
      title: "Parents and Children",
      subtitle:
        "Sewn binding with dust jacket. Ships October 2026. EPUB and PDF included free",
      options: [
        { id: "gid://shopify/Product/10522072514838", label: "Filigree" },
        { id: "gid://shopify/Product/10502200819990", label: "Typography" },
      ],
    },
    {
      vol: "3",
      title: "School Education",
      subtitle:
        "Sewn binding with dust jacket. Ships October 2026. EPUB and PDF included free",
      options: [
        { id: "gid://shopify/Product/10522074284310", label: "Filigree" },
        { id: "gid://shopify/Product/10502202523926", label: "Typography" },
      ],
    },
    {
      vol: "6",
      title: "Philosophy of Education",
      subtitle:
        "Sewn binding with dust jacket. Ships October 2026. EPUB and PDF included free",
      options: [
        { id: "gid://shopify/Product/10522076021014", label: "Filigree" },
        { id: "gid://shopify/Product/10502203015446", label: "Typography" },
      ],
    },
  ],
  hardcover: [
    {
      vol: "1",
      title: "Home Education",
      subtitle: "Glued hardcover (No Dust Jacket) · Ships summer 2026",
      options: [{ id: "gid://shopify/Product/10502373376278", label: "" }],
    },
    {
      vol: "2",
      title: "Parents and Children",
      subtitle: "Glued hardcover (No Dust Jacket) · Ships summer 2026",
      options: [{ id: "gid://shopify/Product/10502377537814", label: "" }],
    },
    {
      vol: "6",
      title: "Philosophy of Education",
      subtitle: "Glued hardcover (No Dust Jacket) · Ships summer 2026",
      options: [{ id: "gid://shopify/Product/10504612938006", label: "" }],
    },
    {
      vol: "3",
      title: "School Education",
      subtitle: "Glued hardcover (No Dust Jacket) · Ships summer 2026",
      options: [{ id: "gid://shopify/Product/10504611528982", label: "" }],
    },
  ],
  hardcover_dj: [
    {
      vol: "1",
      title: "Home Education",
      subtitle:
        "Glued binding with dust jacket. Ships July 2026. EPUB and PDF included free.",
      options: [{ id: "gid://shopify/Product/10502203212054", label: "" }],
    },
    {
      vol: "2",
      title: "Parents and Children",
      subtitle:
        "Glued binding with dust jacket. Ships July 2026. EPUB and PDF included free.",
      options: [{ id: "gid://shopify/Product/10502350962966", label: "" }],
    },
    {
      vol: "3",
      title: "School Education",
      subtitle:
        "Glued binding with dust jacket. Ships July 2026. EPUB and PDF included free.",
      options: [{ id: "gid://shopify/Product/10504417345814", label: "" }],
    },
    {
      vol: "6",
      title: "Philosophy of Education",
      subtitle:
        "Glued binding with dust jacket. Ships July 2026. EPUB and PDF included free.",
      options: [{ id: "gid://shopify/Product/10504419541270", label: "" }],
    },
  ],
  paperback: [
    {
      vol: "1",
      title: "Home Education",
      subtitle: "Ships July 2026. EPUB and PDF included free.",
      options: [{ id: "gid://shopify/Product/10502342607126", label: "" }],
    },
    {
      vol: "2",
      title: "Parents and Children",
      subtitle: "Ships July 2026. EPUB and PDF included free.",
      options: [{ id: "gid://shopify/Product/10502354698518", label: "" }],
    },
    {
      vol: "3",
      title: "School Education",
      subtitle: "Ships July 2026. EPUB and PDF included free.",
      options: [{ id: "gid://shopify/Product/10504614183190", label: "" }],
    },
    {
      vol: "6",
      title: "Philosophy of Education",
      subtitle: "Ships July 2026. EPUB and PDF included free.",
      options: [{ id: "gid://shopify/Product/10504617722134", label: "" }],
    },
  ],
  ebooks: [
    {
      id: "gid://shopify/Product/10504626241814",
      vol: "2 & 3",
      title: "Volume 2 & 3 (Kindle/EPUB)",
      subtitle: "Kindle/EPUB",
    },
    {
      id: "gid://shopify/Product/10504630993174",
      vol: "1 & 6",
      title: "Volume 1 & 6 (Kindle/EPUB)",
      subtitle: "Kindle/EPUB",
    },
    {
      id: "gid://shopify/Product/10504632664342",
      vol: "1, 2, 3, & 6",
      title: "Volumes 1, 2, 3, & 6 (Kindle/EPUB)",
      subtitle: "Kindle/EPUB",
    },
  ],
};

export const TITLE_CONFIG: Record<string, string> = {
  "gid://shopify/Product/10502195380502":
    "Home Education - Sewn binding (Filigree)",
  "gid://shopify/Product/10514334056726":
    "Home Education - Sewn binding (Typography)",
  "gid://shopify/Product/10522072514838":
    "Parents and Children - Sewn binding (Filigree)",
  "gid://shopify/Product/10502200819990":
    "Parents and Children - Sewn binding (Typography)",
  "gid://shopify/Product/10522074284310":
    "School Education - Sewn binding (Filigree)",
  "gid://shopify/Product/10502202523926":
    "School Education - Sewn binding (Typography)",
  "gid://shopify/Product/10522076021014":
    "Philosophy of Education - Sewn binding (Filigree)",
  "gid://shopify/Product/10502203015446":
    "Philosophy of Education - Sewn binding",
  "gid://shopify/Product/10502203212054":
    "Home Education - Hardcover with Dust Jacket",
  "gid://shopify/Product/10502350962966":
    "Parents and Children - Hardcover with Dust Jacket",
  "gid://shopify/Product/10502373376278":
    "Home Education - Hardcover (No Dust Jacket)",
  "gid://shopify/Product/10502377537814":
    "Parents and Children - Hardcover (No Dust Jacket)",
  "gid://shopify/Product/10502342607126": "Home Education - Paperback",
  "gid://shopify/Product/10502354698518": "Parents and Children - Paperback",
  "gid://shopify/Product/10504626241814": "Volume 2 & 3 (Kindle/EPUB)",
  "gid://shopify/Product/10504630993174": "Volume 1 & 6 (Kindle/EPUB)",
  "gid://shopify/Product/10504632664342": "Volumes 1, 2, 3, & 6 (Kindle/EPUB)",
  "gid://shopify/Product/10504417345814":
    "School Education - Hardcover with Dust Jacket",
  "gid://shopify/Product/10504419541270":
    "Philosophy of Education - Hardcover with Dust Jacket",
  "gid://shopify/Product/10504612938006":
    "Philosophy of Education - Hardcover (No Dust Jacket)",
  "gid://shopify/Product/10504611528982":
    "School Education - Hardcover (No Dust Jacket)",
  "gid://shopify/Product/10504614183190": "School Education - Paperback",
  "gid://shopify/Product/10504617722134": "Philosophy of Education - Paperback",
};

export const ALL_PRODUCT_IDS = [
  ...PRODUCT_CONFIG.sewn.flatMap((p) => p.options.map((o) => o.id)),
  ...PRODUCT_CONFIG.hardcover.flatMap((p) => p.options.map((o) => o.id)),
  ...PRODUCT_CONFIG.paperback.flatMap((p) => p.options.map((o) => o.id)),
  ...PRODUCT_CONFIG.hardcover_dj.flatMap((p) => p.options.map((o) => o.id)),
  ...PRODUCT_CONFIG.ebooks.map((p) => p.id),
];

export const PRICES_QUERY = `
  query getPrices($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        featuredImage {
          url
          altText
          width
          height
        }
        variants(first: 1) {
          nodes {
            id
            price {
              amount
              currencyCode
            }
            availableForSale
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;
