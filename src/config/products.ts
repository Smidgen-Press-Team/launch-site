// PRODUCT CONFIGURATION
export const PRODUCT_CONFIG = {
  sewn: [
    {
      id: "gid://shopify/Product/10502195380502",
      vol: "1",
      title: "Home Education",
      subtitle: "Sewn binding · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10502200819990",
      vol: "2",
      title: "Parents and Children",
      subtitle: "Sewn binding · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10502202523926",
      vol: "3",
      title: "School Education",
      subtitle: "Sewn binding · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10502203015446",
      vol: "6",
      title: "Philosophy of Education",
      subtitle: "Sewn binding · Ships summer 2026",
    },
  ],
  hardcover: [
    {
      id: "gid://shopify/Product/10502373376278",
      vol: "1",
      title: "Home Education",
      subtitle: "Glued hardcover (No Dust Jacket) · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10502377537814",
      vol: "2",
      title: "Parents and Children",
      subtitle: "Glued hardcover (No Dust Jacket) · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10504612938006",
      vol: "6",
      title: "Philosophy of Education",
      subtitle: "Glued hardcover (No Dust Jacket) · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10504611528982",
      vol: "3",
      title: "School Education",
      subtitle: "Glued hardcover (No Dust Jacket) · Ships summer 2026",
    },
  ],
  hardcover_dj: [
    {
      id: "gid://shopify/Product/10502203212054",
      vol: "1",
      title: "Home Education",
      subtitle: "Glued hardcover with Dust Jacket · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10502350962966",
      vol: "2",
      title: "Parents and Children",
      subtitle: "Glued hardcover with Dust Jacket · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10504417345814",
      vol: "3",
      title: "School Education",
      subtitle: "Glued hardcover with Dust Jacket · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10504419541270",
      vol: "6",
      title: "Philosophy of Education",
      subtitle: "Glued hardcover with Dust Jacket · Ships summer 2026",
    },
  ],
  paperback: [
    {
      id: "gid://shopify/Product/10502342607126",
      vol: "1",
      title: "Home Education",
      subtitle: "Paperback · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10502354698518",
      vol: "2",
      title: "Parents and Children",
      subtitle: "Paperback · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10504614183190",
      vol: "3",
      title: "School Education",
      subtitle: "Paperback · Ships summer 2026",
    },
    {
      id: "gid://shopify/Product/10504617722134",
      vol: "6",
      title: "Philosophy of Education",
      subtitle: "Paperback · Ships summer 2026",
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
  "gid://shopify/Product/10502195380502": "Home Education - Sewn binding",
  "gid://shopify/Product/10502200819990": "Parents and Children - Sewn binding",
  "gid://shopify/Product/10502202523926": "School Education - Sewn binding",
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
};

export const ALL_PRODUCT_IDS = [
  ...PRODUCT_CONFIG.sewn.map((p) => p.id),
  ...PRODUCT_CONFIG.hardcover.map((p) => p.id),
  ...PRODUCT_CONFIG.paperback.map((p) => p.id),
  ...PRODUCT_CONFIG.hardcover_dj.map((p) => p.id),
  ...PRODUCT_CONFIG.ebooks.map((p) => p.id),
];

export const PRICES_QUERY = `
  query getPrices($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        variants(first: 1) {
          nodes {
            id
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;
