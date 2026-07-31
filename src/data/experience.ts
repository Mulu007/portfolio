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
      'Relevant Coursework: Calculus , Principles of Micro and Macro Economics, Advanced Macroeconomics, Business Statistics, Physics (I & II) Financial Accounting, Managerial Accounting,',
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
    role: 'Data Analyst Intern',
    org: 'National Social Security Fund',
    period: 'March 2025 – June 2025',
    location: 'Nairobi, Kenya',
    badge: 'KES 572.8B+ AUM ',
    logo: '/logos/nssf.png',
    details: [
      'Built Power BI dashboards to monitor payment flows and portfolio profitability across the national pension fund portfolio, enabling real time performance tracking',
      'Performed pivot table analysis on financial statements and reports to identify trends in fixed income, equities and real estate assets',
      'Collaborated with backend engineers on schema design and data validation rules for the member registration system',
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
    role: ' World Bank Group Youth Summit 2026',
    org: 'World Bank Group',
    period: 'June 2026',
    location: 'Virtual',
    badge: 'Invited Delegate',
    logo: '/logos/worldbank.png',
    details: [
      'Selected to the 13th World Bank Group Youth Summit — FutureWorks: Designing Jobs for the Digital Age which is a hybrid global forum convening young leaders, policymakers and senior World Bank officials including Ajay Banga, Makhtar Diop and Paschal Donohoe.',
      'Sessions covered the intersection of AI and the future of work, digital and vocational skills development, youth entrepreneurship, sustainable agriculture and financing strategies for emerging economies.',
    ],
  },
  {
    role: 'Dell Summer Series FY27',
    org: 'Dell Technologies',
    period: 'June 2026 - July 2026',
    location: 'Virtual',
    badge: 'Summer Series',
    logo: '/logos/dell.png',
    details: [
      'A virtual program exposing high-potential students to technology strategy, AI-driven solutions and business architecture through sessions with Dell professionals and industry experts.',
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
