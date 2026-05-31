import {
  ArrowUpRight,
  AudioLines,
  Clapperboard,
  Compass,
  Megaphone,
  Layers3,
  Landmark,
  LineChart,
  MapPin,
  Newspaper,
  RadioTower,
  Waypoints
} from "lucide-react";

export const navItems = ["Journey", "Systems", "Work", "Contact"];

export const credibility = {
  clients: [
    "Hyundai",
    "United Nations",
    "Musiad",
    "Al Baraka Insurance",
    "TBC",
    "Optics",
    "Retail Groups"
  ],
  sectors: [
    "Institutional",
    "Insurance",
    "NGOs",
    "Retail",
    "Electronics",
    "Optics",
    "Construction",
    "Events"
  ],
  metrics: [
    { value: "Tripoli", label: "regional base" },
    { value: "PR", label: "reputation systems" },
    { value: "360", label: "campaign architecture" }
  ]
};

export const divisions = [
  {
    icon: RadioTower,
    eyebrow: "01",
    title: "Strategic Communication",
    signal: "Message architecture",
    copy: "Stakeholder framing, public narratives, launch language, and visibility systems for serious organizations."
  },
  {
    icon: Landmark,
    eyebrow: "02",
    title: "PR & Reputation",
    signal: "Institutional trust",
    copy: "Reputation positioning, media presence, response-ready communication, and long-term public credibility."
  },
  {
    icon: AudioLines,
    eyebrow: "03",
    title: "Social Media Systems",
    signal: "Always-on attention",
    copy: "Platform cadence, content strategy, editorial calendars, community presence, and audience behavior loops."
  },
  {
    icon: Megaphone,
    eyebrow: "04",
    title: "Campaign Strategy",
    signal: "Regional momentum",
    copy: "Campaign ecosystems designed around timing, memory, distribution, cultural context, and measurable recall."
  },
  {
    icon: Clapperboard,
    eyebrow: "05",
    title: "Content Production",
    signal: "Cinematic proof",
    copy: "Campaign films, launch assets, public event coverage, and visual systems built with production discipline."
  },
  {
    icon: Waypoints,
    eyebrow: "06",
    title: "Digital Presence",
    signal: "Public interface",
    copy: "Web, launch, and digital touchpoints that turn strategic positioning into a polished public experience."
  }
];

export const projects = [
  {
    title: "Regional Campaign Launch",
    category: "Visibility System",
    year: "2026",
    metric: "Tripoli to region",
    image: "/images/cinematic-studio.png",
    palette: "from-[#0B1020] via-[#182134] to-[#E7ECF4]",
    challenge: "A brand needed to move beyond local awareness without losing cultural specificity.",
    strategy: "Build one campaign language across message, film, social cadence, and public-facing digital touchpoints.",
    impact: "A launch system designed for recognition, repetition, and regional attention."
  },
  {
    title: "Institutional Communication System",
    category: "Trust Architecture",
    year: "2025",
    metric: "Public clarity",
    image: "/images/cinematic-studio.png",
    palette: "from-[#0171DD] via-[#10213A] to-[#EEF2F7]",
    challenge: "A serious organization needed clearer public language across channels and stakeholder moments.",
    strategy: "Translate complex activity into a calm communication system with hierarchy, proof, and editorial cadence.",
    impact: "Sharper institutional presence across media, events, social, and digital channels."
  },
  {
    title: "Brand Visibility Campaign",
    category: "Perception Strategy",
    year: "2025",
    metric: "Audience attention",
    image: "/images/cinematic-studio.png",
    palette: "from-[#596F62] via-[#151B28] to-[#F5F7FA]",
    challenge: "A market-facing brand needed to become more memorable in a crowded attention environment.",
    strategy: "Create a repeatable content and production system around proof, aspiration, and category authority.",
    impact: "A more coherent public image built through campaign rhythm, social assets, and cinematic production."
  }
];

export const campaignFlow = [
  {
    icon: Compass,
    title: "Insight",
    copy: "Identify the perception gap, audience tension, cultural timing, and public opportunity."
  },
  {
    icon: Landmark,
    title: "Strategy",
    copy: "Define the message, stakeholder logic, channel priorities, and reputation posture."
  },
  {
    icon: Clapperboard,
    title: "Production",
    copy: "Create the campaign assets, films, editorial content, and public-facing visual language."
  },
  {
    icon: Newspaper,
    title: "Distribution",
    copy: "Move through social, media, events, partners, and digital surfaces with coordinated rhythm."
  },
  {
    icon: LineChart,
    title: "Measurement",
    copy: "Read attention, trust signals, performance, and cultural response to sharpen the next wave."
  }
];

export const regionalSignals = [
  { icon: MapPin, title: "Tripoli Base", copy: "Local intelligence, cultural awareness, and relationships that keep strategy grounded." },
  { icon: RadioTower, title: "Regional Signal", copy: "Campaign systems designed to travel across markets without becoming generic." },
  { icon: Layers3, title: "Institutional Fluency", copy: "Communication built for brands, public moments, NGOs, retail groups, and serious organizations." }
];

export const ArrowIcon = ArrowUpRight;
