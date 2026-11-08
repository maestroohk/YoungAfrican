export const site = {
  name: "YoungAfrican",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Connected communities. Informed markets.",
  description:
    "YoungAfrican is a Ugandan technology company in formation, focused on community internet connectivity and disciplined crypto market research and education.",
  location: "Uganda",
  status: "Company in formation",
  contact: {
    email: "[Business email to be confirmed]",
    phone: "[Business phone to be confirmed]",
    whatsapp: "[WhatsApp number to be confirmed]",
    address: "[Office address to be confirmed], Uganda",
    hours: "[Business hours to be confirmed]",
  },
  social: [
    { label: "LinkedIn", href: "" },
    { label: "X (Twitter)", href: "" },
    { label: "Instagram", href: "" },
  ],
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Crypto & Markets", href: "/crypto-markets" },
  { label: "Internet Solutions", href: "/internet-solutions" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const legalNotice =
  "YoungAfrican is in the process of being established. Registration and any licences required for specific services in Uganda will be confirmed and published before those services are offered. Crypto-assets are highly volatile and you can lose some or all of your money. Nothing on this website is financial advice or an offer to manage funds.";

export const about = {
  intro:
    "YoungAfrican is a Ugandan company in formation built on a simple idea: knowledge, opportunity and access belong together. We help people understand financial markets responsibly, and we work to make internet connectivity more affordable for the communities that need it most.",
  mission:
    "To widen access to knowledge and connectivity: helping people engage with financial markets through honest research and education, and bringing affordable, reliable internet to underserved communities.",
  vision:
    "A connected, digitally confident Africa, where the place you live does not limit how much you can learn, build or take part in.",
  pillars: [
    {
      title: "Knowledge",
      text: "Clear, honest education about how financial markets work, including the risks that are often left out.",
    },
    {
      title: "Opportunity",
      text: "Research and practical skills that help people make their own informed decisions, rather than follow tips or promises.",
    },
    {
      title: "Access",
      text: "Affordable internet for rural and underserved communities, so that information and opportunity can actually reach people.",
    },
  ],
};

export const founder = {
  headline: "Curiosity across disciplines. A commitment to making opportunity more accessible.",
  role: "Founder",
  story: [
    "YoungAfrican’s founder is a practising pharmacist. Pharmacy is a discipline built on careful reading, attention to detail and responsibility towards the people who rely on your advice. Those habits do not stay behind the dispensary counter.",
    "Alongside that work, he taught himself to trade. What proved most valuable was not any single trade but the learning around it: studying how markets move, reading research critically and seeing how much risk people take on when they enter markets without guidance. That experience is the reason YoungAfrican’s market work centres on research and responsible education rather than promises.",
    "The same conviction shapes the company’s connectivity work. Education and information only create opportunity when people can reach them, and in many rural and underserved communities the cost of a reliable connection is still a barrier. Making internet access more affordable is a practical way to widen who can learn, work and take part.",
    "What ties these interests together is a commitment to continuous learning: the belief that curiosity, applied across disciplines and shared openly, can make opportunity more accessible. YoungAfrican is how he is putting that belief into practice.",
  ],
  interests: [
    { label: "Healthcare", text: "Practising pharmacist" },
    { label: "Markets", text: "Self-taught trader with an interest in market research" },
    { label: "Education", text: "Committed to responsible financial education" },
    { label: "Connectivity", text: "Affordable internet for rural and underserved communities" },
  ],
  portrait: {
    src: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1400&q=80",
    alt: "Illustrative portrait of a man in a dark turtleneck against a grey background",
    illustrative: true,
  },
};

export const values = [
  {
    title: "Learning never stops",
    text: "Markets change, technology changes and so do communities. We keep studying, and we share what we learn.",
  },
  {
    title: "Honesty over hype",
    text: "We describe markets and networks as they are, including the risks and the limits of what we can promise.",
  },
  {
    title: "Discipline before opportunity",
    text: "Careful process and risk management come before speed or excitement, in trading and in the networks we build.",
  },
  {
    title: "Access for more people",
    text: "We design for Ugandan realities: cost, power, distance and the way communities actually use the internet.",
  },
];

export const crypto = {
  services: [
    {
      title: "Market research",
      text: "Structured research on crypto-assets and market conditions, covering liquidity, volatility, project fundamentals and broader macro context.",
    },
    {
      title: "Market analysis",
      text: "Technical and on-chain perspectives presented clearly, with the assumptions and uncertainty spelled out rather than hidden.",
    },
    {
      title: "Trading education",
      text: "Practical sessions on how markets work, order types, position sizing, risk control, record keeping and avoiding common scams.",
    },
    {
      title: "Consultancy",
      text: "Guidance for individuals and organisations exploring digital markets: understanding the landscape, tools, security and process.",
    },
  ],
  approach: [
    {
      title: "Capital preservation first",
      text: "Every discussion starts with how much could be lost and whether that loss is affordable. Position sizing and stop levels are agreed before entry, not after.",
    },
    {
      title: "Written plans, not impulses",
      text: "We teach and practise trading from a written plan with defined entry, exit and invalidation criteria, reviewed against a trading journal.",
    },
    {
      title: "Security and custody awareness",
      text: "We cover wallet security, exchange risk, two-factor authentication and the warning signs of fraud and too-good-to-be-true schemes.",
    },
    {
      title: "No guarantees",
      text: "Markets are uncertain. We never promise returns, and we will tell you when the right decision is to not trade at all.",
    },
  ],
  boundaries: [
    "We do not hold, manage or pool client funds.",
    "We do not promise or guarantee returns.",
    "We do not trade on behalf of clients.",
    "Any regulated activity will only be offered once the appropriate authorisation is in place.",
  ],
};

export const connectivity = {
  services: [
    {
      title: "Community internet distribution",
      text: "Shared connections that bring reliable internet to neighbourhoods, trading centres, schools and community spaces.",
    },
    {
      title: "Wi-Fi hotspots",
      text: "Managed public and private hotspots with simple access, fair-use controls and options for vouchers or time-based access.",
    },
    {
      title: "Network installations",
      text: "Site surveys, cabling, access points, point-to-point links and power planning for homes, offices and multi-building sites.",
    },
    {
      title: "Network management",
      text: "Monitoring, user and bandwidth management, security updates and capacity planning so networks stay usable as they grow.",
    },
    {
      title: "Technical support",
      text: "Troubleshooting, maintenance visits and practical help for the people who rely on the network every day.",
    },
  ],
  process: [
    { title: "Enquiry", text: "Tell us about the location, the people who need access and how they will use it." },
    { title: "Site survey", text: "We assess line of sight, power, existing infrastructure and the best way to connect." },
    { title: "Proposal", text: "You receive a clear written plan covering equipment, installation, support and costs." },
    { title: "Install and support", text: "We install, test and hand over, then provide ongoing monitoring and support." },
  ],
  packages: [
    {
      name: "Home & Small Office",
      audience: "Households, shops and small teams",
      features: ["Reliable indoor Wi-Fi", "Professional installation", "Remote support"],
    },
    {
      name: "Community Hotspot",
      audience: "Trading centres, campuses and public spaces",
      features: ["Voucher or time-based access", "Fair-use bandwidth controls", "Usage reporting"],
    },
    {
      name: "Business & Institutions",
      audience: "Organisations, schools and multi-building sites",
      features: ["Site survey and network design", "Managed access points and links", "Priority support"],
    },
  ],
};

export const enquiryServices = [
  { value: "crypto-research", label: "Crypto market research & analysis" },
  { value: "crypto-education", label: "Trading education" },
  { value: "crypto-consultancy", label: "Digital markets consultancy" },
  { value: "connectivity-community", label: "Community internet / Wi-Fi hotspot" },
  { value: "connectivity-installation", label: "Network installation" },
  { value: "connectivity-support", label: "Network management & support" },
  { value: "partnership", label: "Partnership or investment enquiry" },
  { value: "other", label: "Something else" },
] as const;

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const photos = {
  kampalaSunset: {
    src: unsplash("photo-1763220207281-c4d0febb61a8"),
    alt: "City skyline in warm evening light",
  },
  kampalaSkyline: {
    src: unsplash("photo-1777887544354-74a7248c8a74"),
    alt: "Kampala skyline with modern buildings among green trees",
  },
  kampalaDay: {
    src: unsplash("photo-1675756261486-09bd1e0f6c8a"),
    alt: "View over Kampala on a bright day with clouds",
  },
  hillsideCity: {
    src: unsplash("photo-1631797173882-2eb9ae7c3abe"),
    alt: "Hillside neighbourhood of homes and trees",
  },
  technician: {
    src: unsplash("photo-1785682117029-86171f64c826"),
    alt: "Technician in a high-visibility vest working on network equipment",
  },
  fibreSwitch: {
    src: unsplash("photo-1594915440248-1e419eba6611"),
    alt: "Fibre optic cables connected to a network switch",
  },
  patchCables: {
    src: unsplash("photo-1544197150-b99a580bb7a8"),
    alt: "Blue network cables plugged into a patch panel",
  },
  towersDusk: {
    src: unsplash("photo-1533664488202-6af66d26c44a"),
    alt: "Silhouetted telecommunication towers at sunset",
  },
  towerSky: {
    src: unsplash("photo-1602823284936-463177448097"),
    alt: "Telecommunication tower against a blue sky",
  },
  communityLaptops: {
    src: unsplash("photo-1655720348590-c739c860beed"),
    alt: "A group of young people working on laptops outdoors",
  },
  benchLaptop: {
    src: unsplash("photo-1655720348593-8ff1d2086dc8"),
    alt: "A woman working on a laptop on an outdoor bench",
  },
  studentsPhone: {
    src: unsplash("photo-1758270704663-9d002a4b42a2"),
    alt: "Two students looking at a smartphone together",
  },
  analystLaptop: {
    src: unsplash("photo-1604933762021-54a5858c9832"),
    alt: "A woman with braids working on a laptop at a desk",
  },
  tradingLaptop: {
    src: unsplash("photo-1620266757065-5814239881fd"),
    alt: "Hands on a laptop keyboard with market charts on screen",
  },
  marketScreens: {
    src: unsplash("photo-1590283603385-17ffb3a7f29f"),
    alt: "Screen showing a cryptocurrency price chart",
  },
  candlesDark: {
    src: unsplash("photo-1611974789855-9c2a0a7236a3"),
    alt: "Candlestick chart on a dark screen",
  },
};
