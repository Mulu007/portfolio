export interface Education {
  institution: string
  degree: string
  period: string
  location: string
  details: string[]
  logo?: string
}

export interface WorkExperience {
  role: string
  org: string
  period: string
  location: string
  details: string[]
  badge?: string
  logo?: string
}

export interface Program {
  name: string
  org: string
  period: string
  details: string[]
  pdf?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
  credential?: string
  pdf?: string
  status?: 'in-progress'
}

export const education: Education[] = [
  {
    institution: 'Texas State University',
    degree: 'B.A. Economics (Honors), Minor in Mathematics',
    period: '2025 – Present',
    location: 'San Marcos, TX',
    logo: '/logos/txstate.png',
    details: [
      'Relevant Coursework: Calculus, Advanced Macroeconomics, Business Statistics, Ethics',
    ],
  },
  {
    institution: 'Waterford Kamhlaba United World College',
    degree: 'International Baccalaureate (IB) Diploma',
    period: '2023 – 2024',
    location: 'Mbabane, Eswatini',
    logo: '/logos/uwc.png',
    details: [
      'Higher Level: Math AA, Physics, English: Language and Literature',
      'Lower Level: Swahili A Self-Taught, Psychology, Business Management',
    ],
  },
]

export const workExperience: WorkExperience[] = [
  {
    role: 'Investment Analyst Intern',
    org: 'NSSF Investment Co-operative Society',
    period: 'March 2025 – June 2025',
    location: 'Nairobi, Kenya',
    badge: 'KES 572.8B+ AUM ',
    logo: '/logos/nssf.png',
    details: [
      'Contributed to development of a Power BI-powered KPI dashboard tracking payment flows, portfolio profitability and operational inefficiencies',
      'Performed quantitative valuation on government securities, equities and real estate assets including REITs',
    ],
  },
]

export const relevantExperience: WorkExperience[] = [
  {
    role: 'Research Assistant',
    org: 'Texas State University — Department of Economics',
    period: 'Spring 2026 – Present',
    location: 'San Marcos, TX',
    badge: 'Publishing in process',
    logo: '/logos/txstate.png',
    details: [
      'Supporting faculty research on the economic impact of tea plantations and factories in Kenya',
      'Manually geolocated tea factories by extracting GPS coordinates from online sources, resolving fragmented location data across the dataset',
      'Consolidating factory-level data with regional macroeconomic variables under strict cleaning protocols',
      'Structuring spatial boundaries to support comparisons between factory-adjacent regions and control areas',
    ],
  },
  {
    role: '2026 Possibilities Series — Virtual Program',
    org: 'Goldman Sachs',
    period: 'April 2026 – May 2026',
    location: 'Virtual',
    badge: '4-Day Program',
    logo: '/logos/goldman-sachs.png',
    details: [
      'Selected for Goldman Sachs\' highly selective Possibilities Series, a 4-session virtual program designed for high-potential students. Sessions spanned an introduction to Wall Street and Goldman Sachs culture, an industry trajectory panel, personal branding, and direct resume and recruiting preparation with firm representatives.',
    ],
  },
  {
    role: 'Youth Summit 2026 — Invited Delegate',
    org: 'World Bank Group',
    period: '2026',
    location: 'Virtual',
    badge: 'Invited Delegate',
    logo: '/logos/worldbank.png',
    details: [
      'Selected as an invited delegate to the World Bank Youth Summit 2026, engaging with senior global leaders on international development, finance, and economic policy.',
      'Speakers included Ajay Banga (President, World Bank), Makhtar Diop (Managing Director, IFC), Anne Bjeurde, Paschal Donohoe, Konstantinos Kollias, Hoi Ying So, and Kate Woska.',
    ],
  },
  {
    role: 'Summer Series FY27',
    org: 'Dell Technologies',
    period: '2026',
    location: 'Virtual',
    badge: 'Summer Series',
    logo: '/logos/dell.png',
    details: [
      'Participating in Dell Technologies\' Summer Series, a virtual program exposing high-potential students to technology strategy, AI-driven solutions, and business architecture through sessions with Dell professionals and industry experts.',
    ],
  },
]

export const programs: Program[] = []

export const certifications: Certification[] = [
  { name: 'Data Analytics', issuer: 'Moringa', year: '2025', pdf: '/certificates/moringa-data-analytics.pdf' },
  { name: 'Full Stack Software Engineering', issuer: 'Moringa', year: '2024', pdf: '/certificates/moringa-fullstack.pdf' },
  { name: 'Quantum Quest — Quantum Computing', issuer: 'University of Amsterdam, QuSoft & Ruhr University Bochum', year: '2023', pdf: '/certificates/quantum-quest.pdf' },
  { name: 'Securities Industry Essentials (SIE)', issuer: 'FINRA', year: '2025', status: 'in-progress' },

  // { name: 'Bloomberg Market Concepts', issuer: 'Bloomberg', year: '2024' },
]
