export const site = {
  name: "Young African Internet",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "Connecting Communities. Empowering Generations.",
  description:
    "Young African Internet is an African-founded connectivity initiative working to make internet access more affordable and dependable for communities in Uganda.",
  location: "Uganda",
  status: "Live in Kazo, Kampala",
  contact: {
    email: "younginvestorschoice8@gmail.com",
    phones: [
      { label: "0785 077 821", tel: "+256785077821" },
      { label: "0751 582 202", tel: "+256751582202" },
    ],
  },
};

export const hotspotAccess = {
  network: "youngafrican",
  portal: "wifi.login",
  payments: ["MTN MoMo", "Airtel Money"],
};

export const nav = [
  { label: "Packages", href: "/packages" },
  { label: "Coverage", href: "/coverage" },
  { label: "How to connect", href: "/how-it-works" },
  { label: "Rewards", href: "/rewards" },
  { label: "News", href: "/insights" },
  { label: "About", href: "/about" },
];

export const footerNav = [
  { title: "Internet", links: [["Packages", "/packages"], ["Coverage", "/coverage"], ["How to connect", "/how-it-works"], ["30-day gift cards", "/rewards"]] },
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

export const statusNotice = "Now live in Kazo, Kampala, from UGX 500 for 3 hours. Nabweru, Lugoba and Wakiso are coming soon.";

export const about = {
  intro:
    "Young African Internet was founded with a simple belief: internet access should be more affordable, dependable and accessible to the communities that need it. We are building a community-focused connectivity brand in Uganda, with an ambition to grow responsibly and serve more people over time.",
  mission: "To expand access to affordable, dependable internet and help communities participate in education, communication, business and the digital economy.",
  vision: "A connected Africa where people and businesses can access useful digital opportunities without connectivity being an unnecessary barrier.",
  belief: "Connectivity is more than a signal. It is a bridge to learning, communication, work, trade, entertainment and opportunity.",
};

export const story = {
  title: "Why Young African Internet",
  paragraphs: [
    "Across Uganda, many people already live within reach of a mobile signal and still struggle to stay online. For most, it is the cost of data, not the signal, that keeps them offline, and when a bundle runs out, so does access to school work, business messages, news and family.",
    "Young African Internet started from a simple idea: one good connection, shared well, can bring the cost of getting online down for everyone nearby. So we are building community Wi-Fi that people can afford every day, priced from a few hours to a whole month, sold close to home and supported by people who answer.",
  ],
};

export const promises = [
  { title: "Prices you can see", text: "Every package and price is published before you pay. No hidden charges, no contract." },
  { title: "Pay only for what you need", text: "From UGX 500 for 3 hours to UGX 25,000 for 4 weeks, paid with Mobile Money on your own phone." },
  { title: "Honest about coverage", text: "We only list areas where service is live, and we tell you what is planned near you." },
  { title: "Thanks for staying", text: "A 30-day gift card with a branded reward is coming for customers who visit daily." },
  { title: "People who answer", text: "Every message to our team is read and answered by a person." },
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
    text: "From UGX 500 for 3 hours to UGX 25,000 for 4 weeks, bought on the hotspot sign-in page with MTN MoMo or Airtel Money.",
  },
  {
    title: "Quality standard network",
    text: "A network built for dependable connectivity, with published coverage areas, support hours and notices about maintenance.",
  },
  {
    title: "30-day gift cards",
    text: "Visit the hotspot every day for 30 days and earn a branded bottle, plate and cup, or T-shirt and cap. Coming soon.",
  },
];

export const packages = [
  {
    group: "Hours and days",
    items: [
      { name: "Short", duration: "3 hours", price: 500, devices: 1 },
      { name: "Half day", duration: "12 hours", price: 800, devices: 1 },
      { name: "Daily", duration: "24 hours", price: 1000, devices: 1, highlight: true },
    ],
  },
  {
    group: "Weeks",
    items: [
      { name: "Weekly", duration: "7 days", price: 5000, devices: 1 },
      { name: "Monthly", duration: "4 weeks", price: 25000, devices: 1 },
      { name: "Family network", duration: "4 weeks", price: 45000, devices: 3 },
    ],
  },
];

export const allPackages = packages.flatMap((group) => group.items);

export const ugx = (amount: number) => `UGX ${amount.toLocaleString("en-US")}`;

export const packageDetails = ["Price in Uganda shillings", "How long it lasts", "How many devices", "Where it works", "How to pay", "How to renew"];

export const rewardCards = [
  { amount: 500, reward: "Free bottle", image: "/rewards/bottle-branded.webp", width: 240, height: 354, alt: "Black bottle with the YoungAfrican logo", tone: "blue" },
  { amount: 800, reward: "Free plate and cup", image: "/rewards/plate-cup-branded.webp", width: 384, height: 276, alt: "White plate and mug with the YoungAfrican logo", tone: "night" },
  { amount: 1000, reward: "Free T-shirt and cap", image: "/rewards/shirt-cap-branded.webp", width: 344, height: 346, alt: "Black T-shirt and cap with the YoungAfrican logo", tone: "mango" },
] as const;

export const connectSteps = [
  { title: "Join youngafrican", text: "Turn on Wi-Fi and tap the network called youngafrican." },
  { title: "Open the sign-in page", text: "It opens by itself, or tap the Wi-Fi sign-in notification." },
  { title: "Enter a voucher", text: "Already have a code? Type it in and tap Login." },
  { title: "Or buy a package", text: "Tap BUY and pay with MTN MoMo or Airtel Money." },
  { title: "Get help", text: "Call support on 0785 077 821 or 0751 582 202." },
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
    a: "Turn on Wi-Fi, join the network called youngafrican and wait for the sign-in page. Enter a voucher code and tap Login, or tap BUY next to a package and pay with MTN MoMo or Airtel Money. The step-by-step guide is on the How to connect page.",
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
    a: "A 30-day gift card is coming: visit the hotspot daily for 30 days and earn a branded reward. The full terms will be published on the rewards page before it starts.",
  },
  {
    q: "What if my internet stops working?",
    a: "Check that Wi-Fi is on, reconnect to the youngafrican network and confirm that your package is active. If it still does not work, call support on 0785 077 821 or 0751 582 202.",
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
  options: [
    {
      name: "Short passes",
      how: "3, 12 or 24 hours of browsing, from UGX 500.",
      bestFor: "A study session, a busy day or a quick top-up.",
    },
    {
      name: "Weekly pass",
      how: "7 days of browsing for UGX 5,000.",
      bestFor: "Regular users who are online most days.",
    },
    {
      name: "Monthly plans",
      how: "4 weeks for UGX 25,000, or the Family network for UGX 45,000.",
      bestFor: "Daily users, families and small shops.",
    },
  ],
  hostProvides: ["A suitable, secure location", "Access to reliable power", "A point of contact on site"],
  weProvide: ["Site survey and installation", "Equipment and network setup", "Voucher and access management", "Monitoring and technical support"],
  faqs: [
    {
      q: "Is the service available yet?",
      a: "Yes, in Kazo, Kampala. Nabweru, Lugoba and the whole of Wakiso District are coming next. Ask about your area and we will tell you honestly what is planned near you.",
    },
    {
      q: "Do I need a contract or a router at home?",
      a: "No. Hotspot access is pay-as-you-go with vouchers. You only need a Wi-Fi enabled phone, tablet or laptop.",
    },
    {
      q: "How do I pay?",
      a: "On the youngafrican sign-in page, tap BUY next to a package and pay with MTN MoMo or Airtel Money. You need to be connected to the youngafrican Wi-Fi to see the sign-in page.",
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
