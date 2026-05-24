export interface Skill {
  name: string
  level: number   // 1-5
  category: 'lang' | 'lib' | 'tool' | 'finance'
  color: string
}

export interface Book {
  title: string
  author: string
  tag: string
}

export interface Interest {
  label: string
  description: string
  icon: string
  image?: string   // place photos in public/interests/ e.g. /interests/running.jpg
}

export const skills: Skill[] = [
  // Languages
  { name: 'Javascript',  level: 4, category: 'lang', color: '#38bdf8' },
  { name: 'Python',  level: 3, category: 'lang', color: '#38bdf8' },
  { name: 'R',       level: 4, category: 'lang', color: '#67e8f9' },
  { name: 'SQL',     level: 4, category: 'lang', color: '#a5f3fc' },
  { name: 'C++',     level: 2, category: 'lang', color: '#818cf8' },
  { name: 'MATLAB',  level: 1, category: 'lang', color: '#a5b4fc' },
  // Libraries
  { name: 'pandas',       level: 5, category: 'lib', color: '#38bdf8' },
  { name: 'NumPy',        level: 5, category: 'lib', color: '#67e8f9' },
 //{ name: 'scikit-learn', level: 4, category: 'lib', color: '#a5f3fc' },
 //{ name: 'statsmodels',  level: 4, category: 'lib', color: '#818cf8' },
 //{ name: 'PyTorch',      level: 3, category: 'lib', color: '#a5b4fc' },
 //{ name: 'cvxpy',        level: 3, category: 'lib', color: '#38bdf8' },
  { name: 'ggplot2',      level: 5, category: 'lib', color: '#67e8f9' },
  { name: 'tidyverse',    level: 4, category: 'lib', color: '#67e8f9' },
  { name: 'dplyr',        level: 4, category: 'lib', color: '#a5f3fc' },
  { name: 'React.js',     level: 4, category: 'lib', color: '#38bdf8' },
  // Tools
  { name: 'Git',       level: 4, category: 'tool', color: '#818cf8' },
  { name: 'Jupyter',   level: 5, category: 'tool', color: '#38bdf8' },
  { name: 'Stata',     level: 4, category: 'tool', color: '#67e8f9' },
  { name: 'Bloomberg', level: 2, category: 'tool', color: '#a5f3fc' },
  { name: 'Power BI',  level: 4, category: 'tool', color: '#f59e0b' },
  { name: 'Excel',     level: 5, category: 'tool', color: '#67e8f9' },
  // Finance concepts
  { name: 'Derivatives',       level: 4, category: 'finance', color: '#38bdf8' },
  { name: 'Time Series',       level: 4, category: 'finance', color: '#67e8f9' },
  { name: 'Fixed Income',      level: 4, category: 'finance', color: '#a5f3fc' },
  { name: 'Bonds',             level: 4, category: 'finance', color: '#a5f3fc' },
  { name: 'Macro/Micro Theory',level: 5, category: 'finance', color: '#818cf8' },
]

export const books: Book[] = [
  { title: 'The Man Who Solved the Market', author: 'Gregory Zuckerman',     tag: 'Quant History' },
  { title: 'Options Volatility & Pricing',  author: 'Sheldon Natenberg',     tag: 'Derivatives'   },
  { title: 'Advances in Financial ML',      author: 'Marcos López de Prado', tag: 'ML × Finance'  },
  { title: 'Thinking in Bets',              author: 'Annie Duke',            tag: 'Decision Theory'},
  { title: 'When Genius Failed',            author: 'Roger Lowenstein',      tag: 'Risk'          },
  { title: 'The Quant',                     author: 'Scott Patterson',       tag: 'Quant History' },
  { title: 'Active Portfolio Management',   author: 'Grinold & Kahn',        tag: 'PM'            },
  { title: 'Fooled by Randomness',          author: 'Nassim Taleb',          tag: 'Risk'          },
]

export const interests: Interest[] = [
  {
    label: 'Running',
    icon: '',
    description: 'Long-distance running is my reset button. No music, no distractions, just the road and whatever problem I was pretending not to think about. Something about sustained physical discomfort at 6am builds the same tolerance you need when a position moves against you.',
    image: '/interests/running.jpg',   // add your photo here
  },
  {
    label: 'Checkers',
    icon: '',
    description: 'Most people learn checkers as children and forget it exists. I discovered it through Assassin\'s Creed IV: Black Flag, went straight to Expert and have refused to play anything lower since. A pirate game accidentally gave me a strategy obsession',
    image: 'https://i.ytimg.com/vi/aRizDiH-cuQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCeXDPefQDkv4uv02vX3oWvQAks0g',
  },
  {
    label: 'Farming · 300 Chickens',
    icon: '',
    description: 'A farmer at heart. Daily feed schedules, mortality risk, supply chain logistics, margin optimization: it is essentially a small enterprise that occasionally tries to escape. Closer to a portfolio management problem than most people would expect.',
    image: '/interests/farm.jpg',      // add your farm photo here
  },
  {
    label: 'My Cats & Dog',
    icon: '',
    description: 'Three cats and one dog each with a completely distinct personality and zero interest in coordinating with each other. Genuinely the most useful behavioral economics case study I have access to - at least their incentives are transparent.',
    image: '/interests/pets.jpg',      // add your pets photo here
  },
  // {
  //   label: 'Market Research',
  //   icon: '📊',
  //   description: 'Follow macro trends, Fed policy, earnings releases, and volatility regime shifts daily. Markets are the world\'s most fascinating real-time experiment in human coordination.',
  // },
  // {
  //   label: 'Competitive Math',
  //   icon: '∑',
  //   description: 'The precision of mathematics is its beauty. From combinatorics to number theory — pure math is the foundation everything else I do stands on.',
  // },
]

export const competitions: { name: string; org: string; detail: string }[] = [
  { name: 'MIT Policy Hackathon',       org: 'Massachusetts Institute of Technology', detail: 'Top Finalist globally — data-driven socio-economic solutions' },
  { name: 'Table Tennis U20 Tournamet', org: 'Waterford Kamhlaba', detail: '3rd place' },

 // { name: 'Citadel Datathon',           org: 'Citadel / Citadel Securities',          detail: 'Quantitative finance & data science challenge' },
 // { name: 'QMSA Case Competition',      org: 'Quant Management Society',              detail: 'Portfolio construction under constraints' },
]
