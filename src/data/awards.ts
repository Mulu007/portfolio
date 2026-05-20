export type AwardCategory = 'academic' | 'competition' | 'recognition' | 'leadership'

export interface Award {
  id: number
  title: string
  org: string
  year: string
  description: string
  category: AwardCategory
  highlight?: string
  image?: string   // place photos in public/awards/ e.g. /awards/mit-hackathon.jpg
}

export const awards: Award[] = [
  {
  id: 1,
    title: "Beta Gamma Sigma",
    org: "Texas State University (TXST)",
    year: "2026",
    description: "Ranked within the top 0.1% of undergraduate students in the McCoy College of Business.",
    category: "recognition",
    highlight: "Top 10% Undergrad",
    // image: '/awards/mit-hackathon.jpg',
  },
  {
    id: 2,
    title: "President's List (2x)",
    org: "Texas State University",
    year: "2025, 2026",
    description: "The highest academic honor at the university, awarded each semester for maintaining a perfect 4.0 GPA.",
    category: "academic",
    highlight: "GPA 4.0",
    // image: '/awards/presidents-list.jpg',
  },
  {
    id: 3,
    title: "Full Scholarship - UWC Davis Scholar",
    org: "Texas State University",
    year: "2025 - 2029",
    description: "A prestigious merit-based scholarship awarded to UWC graduates, covering full tuition and fees for undergraduate studies.",
    category: "academic",
    highlight: "Valued at $160,000",
    // image: '/awards/davis-scholar.jpg',
  },
  {
    id: 4,
    title: "Treasurer",
    org: "International Student Organisation (ISO)",
    year: "2026",
    description: "Oversee financial operations, capital allocation, and budget tracking for a student organization of over 1,500 members, ensuring fiscal accountability for all international community initiatives.",
    category: "leadership",
    highlight: "Treasurer",
    // image: '/awards/davis-scholar.jpg',
  },
  {
    id: 5,
    title: "Full Scholarship - Dare to Dream",
    org: "Waterford Kamhlaba UWC - Eswatini",
    year: "2023 - 2024",
    description: "Highly competitive merit award granted for academic excellence and leadership within the Economics department.",
    category: "academic",
    highlight: "ZAR 600,000 / $70,000",
    // image: '/awards/dare-to-dream.jpg',
  },
  {
    id: 6,
    title: "Full Scholarship - Moringa Coding School",
    org: "Moringa School",
    year: "2024",
    description: "Awarded a full scholarship for intensive software engineering training, focusing on full-stack development and data structures.",
    category: "academic",
    highlight: "Merit-based Award",
    // image: '/awards/moringa.jpg',
  },
  {
    id: 7,
    title: "Bronze Medalist - Table Tennis",
    org: "Eswatini Collegiate Tournament",
    year: "2024",
    description: "Achieved 3rd place in the national collegiate tournament, competing against top-tier players across the region.",
    category: "competition",
    highlight: "National Ranking",
    // image: '/awards/table-tennis.jpg',
  },
  {
    id: 8,
    title: "Finalist - MIT Policy Hackathon",
    org: "Massachusetts Institute of Technology (MIT)",
    year: "2024",
    description: "Ranked as the 2nd best team globally in the policy challenge; focused on data-driven solutions for complex socio-economic issues.",
    category: "competition",
    highlight: "Global 2nd Place",
    // image: '/awards/mit-hackathon.jpg',
  },

]

export const categoryMeta: Record<AwardCategory, { label: string; color: string; tagClass: string }> = {
  academic:    { label: 'Academic',    color: '#38bdf8', tagClass: 'tag-gold' },
  competition: { label: 'Competition', color: '#67e8f9', tagClass: 'tag-navy' },
  recognition: { label: 'Recognition', color: '#818cf8', tagClass: 'tag-rust' },
  leadership:  { label: 'Leadership',  color: '#7dd3fc', tagClass: 'tag-default' },
}
