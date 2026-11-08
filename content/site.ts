export const site = {
  name: "Young African Internet",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Connecting Communities. Empowering Generations.",
  description:
    "Young African Internet is an African-founded connectivity initiative working to make internet access more affordable and dependable for communities in Uganda.",
  location: "Uganda",
  status: "Preparing first service areas",
  contact: {
    email: "younginvestorschoice8@gmail.com",
  },
};

export const nav = [
  { label: "Packages", href: "/packages" },
  { label: "Coverage", href: "/coverage" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Rewards", href: "/rewards" },
  { label: "News", href: "/insights" },
  { label: "About", href: "/about" },
];

export const footerNav = [
  { title: "Internet", links: [["Packages", "/packages"], ["Coverage", "/coverage"], ["How it works", "/how-it-works"], ["Customer rewards", "/rewards"]] },
  { title: "Help", links: [["Support centre", "/support"], ["Partner with us", "/partners"], ["Contact us", "/contact"]] },
  { title: "Company", links: [["About us", "/about"], ["News and articles", "/insights"], ["Privacy", "/privacy"]] },
];

export const usageGap = {
  figure: 65,
  text: "lived within mobile broadband coverage but were not using mobile internet at the end of 2024.",
  source: "GSMA, The State of Mobile Internet Connectivity 2025",
  href: "https://www.gsma.com/somic/wp-content/uploads/2025/09/The-State-of-Mobile-Internet-Connectivity-2025-Trends-in-Mobile-Internet-Connectivity.pdf",
};

export const legalNotice =
  "Young African Internet is committed to expanding access to affordable and dependable connectivity for communities in Uganda. Service availability, package terms and coverage depend on the location and the active service offering, and services are introduced only once the required approvals are in place. Photographs are illustrative; the people shown are not customers or staff.";

export const statusNotice = "Internet packages start at UGX 500 for 3 hours. We are preparing our first service areas in Uganda.";

export const about = {
  intro:
    "Young African Internet was founded with a simple belief: internet access should be more affordable, dependable and accessible to the communities that need it. We are building a community-focused connectivity brand in Uganda, with an ambition to grow responsibly and serve more people over time.",
  mission: "To expand access to affordable, dependable internet and help communities participate in education, communication, business and the digital economy.",
  vision: "A connected Africa where people and businesses can access useful digital opportunities without connectivity being an unnecessary barrier.",
  belief: "Connectivity is more than a signal. It is a bridge to learning, communication, work, trade, entertainment and opportunity.",
};

export const founders = [
  {
    name: "Mr Henry Kasozi",
    role: "Co-founder",
    text: "Helps lead the company's direction, growth and commitment to serving communities with accessible connectivity.",
  },
  {
    name: "Mr Obadiah Incarnate",
    role: "Co-founder",
    text: "Helps shape the company's vision, development and ambition to build a trusted African connectivity brand.",
  },
];

export const values = [
  { title: "Affordability", text: "Packages designed with everyday budgets in mind." },
  { title: "Reliability", text: "A focus on stable coverage and continuous improvement of the network." },
  { title: "Customer care", text: "A community-focused team that listens and responds." },
  { title: "Transparency", text: "Clear package terms, honest coverage information and service updates." },
  { title: "Community impact", text: "Connectivity that opens doors to learning, work and trade." },
  { title: "Continuous improvement", text: "Better coverage, reliability and support as the network grows." },
];

export const products = [
  {
    title: "Cheap internet",
    text: "From UGX 500 for 3 hours to UGX 25,000 for 30 days, with the price, duration and devices stated clearly for every package.",
  },
  {
    title: "Quality standard network",
    text: "A network built for dependable connectivity, with published coverage areas, support hours and notices about maintenance.",
  },
  {
    title: "Gift cards for consistent clients",
    text: "An appreciation programme planned to reward eligible loyal customers, with clear rules for who qualifies and how to redeem.",
  },
];

export const packages = [
  {
    group: "Short passes",
    items: [
      { name: "3 hours", price: 500, devices: 1 },
      { name: "12 hours", price: 800, devices: 1 },
      { name: "24 hours", price: 1000, devices: 1, highlight: true },
    ],
  },
  {
    group: "Weekend and weekly",
    items: [
      { name: "Weekend", price: 3500, devices: 1 },
      { name: "7 days", price: 5000, devices: 1 },
    ],
  },
  {
    group: "Monthly",
    items: [
      { name: "30 days", price: 25000, devices: 1 },
      { name: "30 days, 3 devices", price: 45000, devices: 3 },
    ],
  },
];

export const ugx = (amount: number) => `UGX ${amount.toLocaleString("en-US")}`;

export const packageDetails = ["Price in Uganda shillings", "How long it lasts", "How many devices", "Where it works", "How to buy a voucher", "How to renew"];

export const connectSteps = [
  { title: "Check coverage", text: "Make sure Young African Internet is available in your area." },
  { title: "Choose a package", text: "Pick an available package and read its price and usage terms." },
  { title: "Pay or get a voucher", text: "Follow the published payment or voucher instructions." },
  { title: "Connect", text: "Join the Young African Wi-Fi network, or arrange an installation." },
  { title: "Get help if needed", text: "Contact support if activation or the connection does not work." },
];

export const reasons = [
  { title: "Affordable options", text: "Packages designed with everyday budgets in mind." },
  { title: "Network quality", text: "A focus on stable coverage and continuous improvement." },
  { title: "Customer appreciation", text: "Rewards planned for eligible consistent customers." },
  { title: "Local support", text: "A community-focused team that listens and responds." },
  { title: "Clear information", text: "Transparent package terms and service updates." },
];

export const partnerTypes = [
  { title: "Hotspot hosts", text: "Shops, cafés and community venues where people already gather." },
  { title: "Landlords and estates", text: "Shared connectivity for tenants and residents." },
  { title: "Schools and institutions", text: "Connectivity for schools, clinics and organisations." },
  { title: "Resellers", text: "Wholesale or resale partnerships, subject to the required approvals and agreements." },
];

export const supportFaqs = [
  {
    q: "How do I connect?",
    a: "Check coverage, choose an available package and follow the official voucher or payment instructions shown on this website.",
  },
  {
    q: "Can I use my own phone?",
    a: "Yes. If your phone supports Wi-Fi, you can connect to an available Young African Internet hotspot within its coverage area.",
  },
  {
    q: "How do I know if my area is covered?",
    a: "Use the coverage page to send your village, zone or nearest landmark, and we will tell you whether service is available or planned.",
  },
  {
    q: "Do you reward loyal customers?",
    a: "We plan to recognise eligible consistent customers through a gift-card appreciation programme. The eligibility and redemption terms will be published on the rewards page before it starts.",
  },
  {
    q: "What if my internet stops working?",
    a: "Check that Wi-Fi is on, reconnect to the correct network and confirm that your package is active. If it still does not work, contact support with your location and a short description of the problem.",
  },
  {
    q: "Can my shop or institution host a hotspot?",
    a: "Yes. Interested venues can contact us to discuss location suitability, equipment, responsibilities and partnership terms.",
  },
];

export const enquiryServices = [
  { value: "coverage", label: "Coverage in my area" },
  { value: "packages", label: "Internet packages and prices" },
  { value: "support", label: "Help with my connection" },
  { value: "rewards", label: "Customer rewards and gift cards" },
  { value: "hotspot-hosting", label: "Hosting a hotspot at my business or venue" },
  { value: "institution", label: "Connectivity for a school, clinic or organisation" },
  { value: "partnership", label: "Partnership or reseller enquiry" },
  { value: "other", label: "Something else" },
] as const;

export const hotspot = {
  steps: [
    {
      title: "Find a hotspot",
      text: "Look for the Young African Wi-Fi network at a hosting location such as a trading centre, campus or community space.",
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
      name: "Short passes",
      how: "3, 12 or 24 hours of browsing, from UGX 500.",
      bestFor: "A study session, a busy day or a quick top-up.",
    },
    {
      name: "Weekend and weekly passes",
      how: "A weekend for UGX 3,500 or 7 days for UGX 5,000.",
      bestFor: "Regular users who are online most days.",
    },
    {
      name: "Monthly plans",
      how: "30 days for UGX 25,000, or UGX 45,000 for 3 devices at once.",
      bestFor: "Daily users, families and small shops.",
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
      a: "Packages start at UGX 500 for 3 hours and UGX 1,000 for 24 hours. Weekly and monthly packages are on the packages page.",
    },
    {
      q: "Can my business or school host a hotspot?",
      a: "Yes, we want to hear from potential hosts. Hosting terms depend on the location and are agreed individually.",
    },
  ],
};

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
  studentsPhone: {
    src: unsplash("photo-1758270704663-9d002a4b42a2"),
    alt: "Two students looking at a smartphone together",
  },
};
