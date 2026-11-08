type Span = { _type: "span"; _key: string; text: string; marks: string[] };

export type SeedBlock =
  | {
      _type: "block";
      _key: string;
      style: "normal" | "h2" | "h3" | "blockquote";
      listItem?: "bullet" | "number";
      level?: number;
      markDefs: [];
      children: Span[];
    }
  | { _type: "callout"; _key: string; text: string };

let keyCounter = 0;
const key = () => `seed${(keyCounter++).toString(36)}`;

const span = (text: string): Span => ({ _type: "span", _key: key(), text, marks: [] });

const p = (text: string): SeedBlock => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [span(text)] });

const h2 = (text: string): SeedBlock => ({ _type: "block", _key: key(), style: "h2", markDefs: [], children: [span(text)] });

const bullets = (items: string[]): SeedBlock[] =>
  items.map((text) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [span(text)],
  }));

const callout = (text: string): SeedBlock => ({ _type: "callout", _key: key(), text });

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

export const seedCategories = [
  { slug: "artificial-intelligence", title: "Artificial Intelligence", description: "Practical, evidence-based writing on using AI well and safely." },
  { slug: "digital-markets", title: "Digital Markets", description: "How digital markets work, with risk and evidence first." },
  { slug: "connectivity", title: "Community Connectivity", description: "Community Wi-Fi, affordable access and how networks work." },
  { slug: "company-updates", title: "Company updates", description: "News about YoungAfrican as the company is established." },
];

export const seedAuthors = [
  { slug: "youngafrican-research", name: "YoungAfrican Research", role: "Markets research and education team" },
  { slug: "youngafrican-networks", name: "YoungAfrican Networks", role: "Connectivity team" },
  { slug: "youngafrican-team", name: "YoungAfrican Team", role: "Company updates" },
];

export type SeedInsight = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  authorSlug: string;
  featured: boolean;
  cover: { url: string; alt: string };
  related: string[];
  body: SeedBlock[];
};

export const seedInsights: SeedInsight[] = [
  {
    slug: "risk-before-reward",
    title: "Risk before reward: how to think about a trade before you take it",
    excerpt:
      "Most losses in digital markets come from poor risk management rather than poor ideas. Here is a simple framework for sizing positions and defining when you are wrong.",
    categorySlug: "digital-markets",
    authorSlug: "youngafrican-research",
    featured: true,
    cover: { url: unsplash("photo-1611974789855-9c2a0a7236a3"), alt: "Candlestick chart on a dark screen" },
    related: ["reading-candlestick-charts"],
    body: [
      p(
        "Crypto-assets can move ten or twenty percent in a day. That volatility attracts people looking for quick gains, but it is also why so many new traders lose money quickly. The difference between a reckless trade and a considered one is rarely the idea itself. It is what you decide before you press the button.",
      ),
      h2("Start with what you can afford to lose"),
      p(
        "Before looking at any chart, decide how much of your capital you are prepared to risk on a single trade. Many experienced traders keep this to a small percentage of their trading account, so that a run of losses does not end their ability to keep learning.",
      ),
      h2("Define where the idea is wrong"),
      p(
        "Every trade should have an invalidation point: a price or condition that tells you the original reasoning no longer holds. Writing it down in advance removes the temptation to move the goalposts once the market turns against you.",
      ),
      ...bullets([
        "Entry: the condition that justifies opening the position.",
        "Invalidation: the level at which you accept the idea was wrong.",
        "Position size: derived from the distance between entry and invalidation, and the amount you are willing to risk.",
        "Review: a journal entry recording what happened and why.",
      ]),
      h2("Not trading is a valid decision"),
      p(
        "Unclear conditions, thin liquidity or emotional pressure are all good reasons to stay out. Protecting capital keeps you in the game long enough to benefit from genuinely good opportunities.",
      ),
      callout(
        "This article is for educational purposes only and is not financial advice. Crypto-assets are high risk and you can lose all of the money you invest.",
      ),
    ],
  },
  {
    slug: "reading-candlestick-charts",
    title: "Reading candlestick charts: a plain-language introduction",
    excerpt:
      "Candlesticks compress a lot of information into a small shape. Learn what the body, wicks and colours tell you, and where their limits are.",
    categorySlug: "digital-markets",
    authorSlug: "youngafrican-research",
    featured: false,
    cover: { url: unsplash("photo-1590283603385-17ffb3a7f29f"), alt: "Screen showing a cryptocurrency price chart" },
    related: ["risk-before-reward"],
    body: [
      p(
        "A candlestick summarises price movement over a fixed period, such as one hour or one day. Each candle shows four prices: where the period opened, where it closed, and the highest and lowest points reached in between.",
      ),
      h2("Body and wicks"),
      p(
        "The thick body spans the open and close. The thin lines above and below, called wicks or shadows, reach to the high and low. A long upper wick shows that buyers pushed price up but could not hold it there.",
      ),
      h2("Context matters more than single candles"),
      p(
        "Individual candle patterns are popular on social media, but on their own they are weak signals. They become more meaningful alongside volume, the wider trend and important price levels.",
      ),
      ...bullets([
        "Check the timeframe before drawing any conclusion.",
        "Compare volume with recent averages.",
        "Look at where the candle forms relative to recent highs and lows.",
        "Treat patterns as probabilities, never certainties.",
      ]),
      callout("Educational content only. Past price behaviour does not guarantee future results."),
    ],
  },
  {
    slug: "how-community-wifi-works",
    title: "How community Wi-Fi works, from backhaul to the last metre",
    excerpt:
      "A shared internet connection is more than a router on a pole. We explain the building blocks of a community network and what makes one reliable.",
    categorySlug: "connectivity",
    authorSlug: "youngafrican-networks",
    featured: false,
    cover: { url: unsplash("photo-1533664488202-6af66d26c44a"), alt: "Silhouetted telecommunication towers at sunset" },
    related: ["introducing-youngafrican"],
    body: [
      p(
        "Community Wi-Fi brings an internet connection to many people at once, often in places where individual fixed connections are expensive or unavailable. A reliable network depends on getting several layers right.",
      ),
      h2("Backhaul: where the internet comes from"),
      p(
        "Backhaul is the upstream connection that links the community network to the wider internet. It might be fibre, a licensed wireless link or a cellular connection. Its capacity sets the ceiling for everyone downstream.",
      ),
      h2("Distribution and access"),
      p(
        "From the backhaul, point-to-point or point-to-multipoint radios carry the connection across distance, and access points provide the Wi-Fi that phones and laptops actually join. Placement, height and line of sight matter as much as the equipment.",
      ),
      h2("Management keeps it fair"),
      ...bullets([
        "Bandwidth controls stop a few heavy users from slowing everyone else.",
        "Voucher or account systems make access simple and accountable.",
        "Monitoring spots faults before users have to report them.",
        "Power planning, including backup, keeps the network online during outages.",
      ]),
    ],
  },
  {
    slug: "introducing-youngafrican",
    title: "Introducing YoungAfrican",
    excerpt:
      "Why we are building a technology company around connectivity and digital markets, and what we are working on as we get established.",
    categorySlug: "company-updates",
    authorSlug: "youngafrican-team",
    featured: false,
    cover: { url: unsplash("photo-1675756261486-09bd1e0f6c8a"), alt: "View over Kampala on a bright day with clouds" },
    related: ["how-community-wifi-works"],
    body: [
      p(
        "YoungAfrican is being established in Uganda around two areas we know well: connecting communities to reliable internet, and helping people understand digital markets with discipline and honesty.",
      ),
      p(
        "We are currently completing the steps required to formally establish the company and to confirm the registration and licensing requirements that apply to our services. We will publish updates here as each step is completed.",
      ),
      h2("What comes next"),
      ...bullets([
        "Completing company registration.",
        "Confirming regulatory requirements for each service line.",
        "Opening enquiries for site surveys and education sessions.",
      ]),
    ],
  },
];
