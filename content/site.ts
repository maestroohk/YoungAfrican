export const site = {
  name: "YoungAfrican",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Community Wi-Fi and market education from Uganda",
  description:
    "YoungAfrican is a Ugandan technology company in formation, building affordable community Wi-Fi hotspots and offering honest market research and financial education.",
  location: "Uganda",
  status: "Company in formation",
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
  },
  social: [
    { label: "LinkedIn", href: "" },
    { label: "X", href: "" },
    { label: "Instagram", href: "" },
  ],
};

export const nav = [
  { label: "Community Wi-Fi", href: "/internet-solutions" },
  { label: "Markets", href: "/crypto-markets" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const legalNotice =
  "YoungAfrican is being established in Uganda. Services that need registration or a licence will only be offered once it is in place. Nothing on this site is financial advice.";

export const about = {
  intro:
    "We are a small Ugandan company in formation working on two things that widen opportunity: affordable Wi-Fi where people gather, and honest education about how financial markets work.",
  mission: "Make internet access more affordable, and market knowledge more honest, for the communities that need both.",
  vision: "A Uganda where the place you live does not decide how much you can learn, build or take part in.",
  pillars: [
    {
      title: "Knowledge",
      text: "Plain explanations of how financial markets work, including the risks that are usually left out.",
    },
    {
      title: "Opportunity",
      text: "Research skills and habits that help people make their own decisions instead of following tips.",
    },
    {
      title: "Access",
      text: "Shared Wi-Fi hotspots that make getting online cheaper for people who cannot afford a home connection.",
    },
  ],
};

export const founder = {
  headline: "Curiosity across disciplines. A commitment to making opportunity more accessible.",
  role: "Founder",
  story: [
    "YoungAfrican’s founder is a practising pharmacist. Pharmacy rewards careful reading, attention to detail and responsibility towards the people who rely on your advice, and those habits carry over into everything else he does.",
    "Alongside that work he taught himself to trade. The lasting value was not any single trade but the learning around it: studying how markets move, reading research critically and seeing how much risk people take on when they enter markets without guidance. That is why YoungAfrican’s market work is built on research and education rather than promises.",
    "The same conviction shapes the connectivity work. Education and information only create opportunity when people can reach them, and in many rural and underserved communities the cost of getting online is still a barrier. Shared Wi-Fi hotspots are a practical way to bring that cost down.",
    "What ties these interests together is continuous learning: the belief that curiosity, applied across disciplines and shared openly, makes opportunity more accessible. YoungAfrican is how he is putting that belief into practice.",
  ],
  interests: [
    { label: "Healthcare", text: "Practising pharmacist" },
    { label: "Markets", text: "Self-taught trader; market research" },
    { label: "Education", text: "Responsible financial education" },
    { label: "Connectivity", text: "Affordable internet for underserved communities" },
  ],
  portrait: {
    src: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1400&q=80",
    alt: "Illustrative portrait of a man in a dark turtleneck against a grey background",
    illustrative: true,
  },
};

export const values = [
  { title: "Keep learning", text: "Markets, technology and communities change. We keep studying and share what we learn." },
  { title: "Say what is true", text: "We describe markets and networks as they are, including the risks and the limits of what we offer." },
  { title: "Process before speed", text: "Careful planning and risk management come first, in trading and in the networks we build." },
  { title: "Design for access", text: "We plan around Ugandan realities: cost, power, distance and how people actually use the internet." },
];

export const crypto = {
  services: [
    {
      title: "Market research",
      text: "Structured research on crypto-assets and market conditions: liquidity, volatility, project fundamentals and the wider economic context.",
    },
    {
      title: "Market analysis",
      text: "Technical and on-chain perspectives presented clearly, with the assumptions and uncertainty stated rather than hidden.",
    },
    {
      title: "Trading education",
      text: "Practical sessions on how markets work, order types, position sizing, risk control, record keeping and avoiding scams.",
    },
    {
      title: "Consultancy",
      text: "Guidance for individuals and organisations exploring digital markets: the landscape, tools, security and process.",
    },
  ],
  approach: [
    {
      title: "Capital preservation first",
      text: "Every discussion starts with how much could be lost and whether that loss is affordable. Position size and exit levels are agreed before entry.",
    },
    {
      title: "Written plans, not impulses",
      text: "Trading from a written plan with defined entry, exit and invalidation criteria, reviewed against a journal.",
    },
    {
      title: "Security and custody awareness",
      text: "Wallet security, exchange risk, two-factor authentication and the warning signs of fraud.",
    },
    {
      title: "No guarantees",
      text: "Markets are uncertain. We never promise returns, and we will say so when the right decision is not to trade.",
    },
  ],
  boundaries: [
    "We do not hold, manage or pool client funds.",
    "We do not promise or guarantee returns.",
    "We do not trade on behalf of clients.",
    "Regulated activity will only be offered once the right authorisation is in place.",
  ],
};

export const hotspot = {
  steps: [
    {
      title: "Find a hotspot",
      text: "Look for the YoungAfrican Wi-Fi network at a hosting location such as a trading centre, campus or community space.",
    },
    {
      title: "Get an access voucher",
      text: "Buy a voucher with a short access code for the amount of time or data you need. No contract, no installation at home.",
    },
    {
      title: "Connect and log in",
      text: "Join the network on your phone or laptop. A login page opens; enter your code to start browsing.",
    },
    {
      title: "Browse until it runs out",
      text: "Your session ends when your time or data is used. Buy another voucher whenever you need more.",
    },
  ],
  options: [
    {
      name: "Time-based passes",
      how: "Unlimited browsing for a fixed period, such as an hour, a day or a week.",
      bestFor: "Studying, video calls and longer work sessions.",
    },
    {
      name: "Data-based bundles",
      how: "A fixed amount of data to use at your own pace while connected.",
      bestFor: "Messaging, mobile money checks and occasional browsing.",
    },
    {
      name: "Group and host access",
      how: "Access arranged for a hosting partner’s staff, members or customers.",
      bestFor: "Businesses, schools and community groups hosting a hotspot.",
    },
  ],
  places: ["Trading centres and markets", "Campuses and schools", "Transport stages", "Community centres", "Shops and cafés"],
  hostProvides: ["A suitable, secure location", "Access to reliable power", "A point of contact on site"],
  weProvide: ["Site survey and installation", "Equipment and network setup", "Voucher and access management", "Monitoring and technical support"],
  faqs: [
    {
      q: "Is the service available yet?",
      a: "Not yet. We are preparing our first hotspot locations. Ask about availability and we will tell you honestly whether a hotspot is planned near you.",
    },
    {
      q: "Do I need a contract or a router at home?",
      a: "No. Hotspot access is pay-as-you-go with vouchers. You only need a Wi-Fi enabled phone, tablet or laptop.",
    },
    {
      q: "How will I pay for a voucher?",
      a: "Vouchers are planned to be sold through local agents at hosting locations. Mobile money and online purchase are planned for later and are not available yet.",
    },
    {
      q: "What will it cost?",
      a: "Prices will be published when the first hotspots open. Our aim is to make short, small purchases affordable.",
    },
    {
      q: "Can my business or school host a hotspot?",
      a: "Yes, we want to hear from potential hosts. Hosting terms depend on the location and are agreed individually.",
    },
  ],
};

export const enquiryServices = [
  { value: "hotspot-availability", label: "Wi-Fi hotspot availability near me" },
  { value: "hotspot-hosting", label: "Hosting a hotspot at my business or community space" },
  { value: "hotspot-installation", label: "Hotspot installation for an organisation" },
  { value: "hotspot-support", label: "Hotspot management and technical support" },
  { value: "crypto-education", label: "Trading and market education" },
  { value: "crypto-research", label: "Market research and analysis" },
  { value: "partnership", label: "Partnership or investment enquiry" },
  { value: "other", label: "Something else" },
] as const;

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const photos = {
  phoneOutdoors: {
    src: unsplash("photo-1623299677833-9f077d1a2e92"),
    alt: "A young woman in a pink hat looking at her phone outdoors",
  },
  accessPoint: {
    src: unsplash("photo-1785682117495-d87ff069cdb5"),
    alt: "A Wi-Fi access point mounted on a cable tray",
  },
  marketVendor: {
    src: unsplash("photo-1687422809654-579d81c29d32"),
    alt: "A market vendor checking her phone at a fruit stall",
  },
  streetMarket: {
    src: unsplash("photo-1774132008869-a82b2b7feba3"),
    alt: "People on a sidewalk beside a busy street market",
  },
  shopkeeper: {
    src: unsplash("photo-1687422808311-a776f467a468"),
    alt: "A shopkeeper sitting at the counter of her store",
  },
  kampalaSkyline: {
    src: unsplash("photo-1777887544354-74a7248c8a74"),
    alt: "Kampala skyline with modern buildings among green trees",
  },
  kampalaDay: {
    src: unsplash("photo-1675756261486-09bd1e0f6c8a"),
    alt: "View over Kampala on a bright day with clouds",
  },
  technician: {
    src: unsplash("photo-1785682117029-86171f64c826"),
    alt: "Technician in a high-visibility vest working on network equipment",
  },
  analystLaptop: {
    src: unsplash("photo-1604933762021-54a5858c9832"),
    alt: "A woman with braids working on a laptop at a desk",
  },
  tradingLaptop: {
    src: unsplash("photo-1620266757065-5814239881fd"),
    alt: "Hands on a laptop keyboard with market charts on screen",
  },
  candlesDark: {
    src: unsplash("photo-1611974789855-9c2a0a7236a3"),
    alt: "Candlestick chart on a dark screen",
  },
  studentsPhone: {
    src: unsplash("photo-1758270704663-9d002a4b42a2"),
    alt: "Two students looking at a smartphone together",
  },
};
