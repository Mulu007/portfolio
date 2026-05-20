export type ProjectCategory = 'algo-trading' | 'ml' | 'statistics' | 'finance' | 'economics' | 'software' | 'research'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  metric?: { label: string; value: string }
  equation?: string
  github?: string
  demo?: string
  category: ProjectCategory
  featured?: boolean
  ib?: boolean          // International Baccalaureate work
  piecewiseEquations?: { expr: string; domain: string }[]
  equationSystem?: { label: string; latex: string }[]
  findings?: { label: string; text: string }[]
}

export const projects: Project[] = [
  {
    id: 'piecewise-interpolation-engine',
    title: 'Piecewise Interpolation Engine for Non-Linear Decay Systems',
    description:
      'Global high-order polynomial interpolation on an empirical dataset that frequently suffers from severe ill-conditioning and boundary oscillations (Runge\'s phenomenon). To model the non-linear voltage decay of a lithium-ion battery over time, I developed a Node.js CLI engine implementing Newton\'s forward difference formula and Horner\'s method for numerical precision. Rather than forcing a singular high-order curve, the data was partitioned into 6 distinct temporal subdomains, resulting in a piecewise continuous system of 6 localised equations. I benchmarked the localised finite difference models against global tracking methods, demonstrating that partitioning the domain eliminates edge distortions and achieves an error bound of ε → 0 across all 6 intervals.',
    tags: ['Numerical Methods', 'Piecewise Interpolation', 'Runge\'s Phenomenon', 'Forward Differences', 'JavaScript', 'Node.js'],
    metric: { label: 'Intervals', value: '6' },
    equation: 'V_t = V_0 \\, e^{-\\alpha t}',
    github: 'https://github.com/Mulu007/Newton-Forward-Difference-Interpolation-Formula',
    demo: '/papers/battery-curve-fitting.pdf',
    category: 'statistics',
    featured: true,
    ib: true,
    piecewiseEquations: [
      {
        expr:   String.raw`\tfrac{5}{24}x^4 + \tfrac{5}{4}x^3 - \tfrac{55}{24}x^2 + \tfrac{5}{4}x + 100`,
        domain: String.raw`\forall\, x \in [0,4]`,
      },
      {
        expr:   String.raw`\tfrac{5}{8}x^4 - \tfrac{205}{12}x^3 + \tfrac{1375}{8}x^2 - \tfrac{9065}{12}x + 1320`,
        domain: String.raw`\forall\, x \in [5,9]`,
      },
      {
        expr:   String.raw`-\tfrac{5}{6}x^4 + 40x^3 - \tfrac{2150}{3}x^2 + \tfrac{11355}{2}x - 16685`,
        domain: String.raw`\forall\, x \in [10,14]`,
      },
      {
        expr:   String.raw`-\tfrac{5}{6}x^4 + \tfrac{170}{3}x^3 - \tfrac{4325}{3}x^2 + \tfrac{97565}{6}x - 68520`,
        domain: String.raw`\forall\, x \in [15,19]`,
      },
      {
        expr:   String.raw`-\tfrac{5}{6}x^3 + 56x^2 - \tfrac{7255}{6}x + 8920`,
        domain: String.raw`\forall\, x \in [20,24]`,
      },
      {
        expr:   String.raw`-\tfrac{1}{4}x^5 + \tfrac{275}{8}x^4 - \tfrac{5665}{3}x^3 + \tfrac{414425}{8}x^2 - \tfrac{8516387}{12}x + 3884460`,
        domain: String.raw`\forall\, x \in [25,30]`,
      },
    ],
  },
  {
    id: 'allmovies',
    title: 'AllMovies — Full-Stack Web App',
    description:
      'Collaborative full-stack movie platform built with React and Ruby. Users can browse, add, edit and delete movies, and authenticate via login/signup. Developed in an agile team of four with structured standups, Git-based code reviews, and shared pull request ownership.',
    tags: ['React', 'Ruby', 'Tailwind', 'JSX', 'REST API', 'Auth'],
    metric: { label: 'Team size', value: '4 devs' },
    github: 'https://github.com/Mulu007',
    category: 'software',
    featured: true,
  },
  {
    id: 'dust-solar-pv',
    title: 'The Impact of Dust on Solar PV Efficiency: Experimental Analysis and Temperature-Dependent V₀c Modelling',
    description:
      'Solar PV cell efficiency degrades catastrophically under simultaneous thermal stress and dust accumulation. Benchmarking an 8-year-old polycrystalline module across soil profiles and mass distributions uncovered a 96.13% reduction in absolute efficiency — dropping to a baseline of 0.29%. To isolate irradiance-blocking losses from native thermal degradation, we derived a temperature-dependent voltage model from the transcendental ideal diode equations, recasting the V₀c–T relationship as a first-order linear ODE and solving it in closed form via integrating factor.',
    tags: ['Differential Equations', 'Experimental Physics', 'Solar Energy', 'Data Analysis', 'ODE'],
    metric: { label: 'Efficiency drop', value: '96.13%' },
    demo: '/papers/dust-solar-pv.pdf',
    category: 'research',
    ib: true,
    equationSystem: [
      {
        label: 'Derived-ODE',
        latex: String.raw`\frac{dV_{OC}}{dT} - \frac{1}{T}V_{OC} = \frac{V_{G0}}{T} - \frac{m}{11600}`,
      },
      {
        label: 'Closed-form-solution',
        latex: String.raw`V_{OC}(T) = -V_{G0} - \frac{m}{11600}\,T\ln T + cT`,
      },
    ],
    findings: [
      {
        label: 'Catastrophic dust-induced degradation',
        text:  'Physical dust on aging polycrystalline surfaces drives operational efficiency down to 0.29%–0.33% under heavy mass allocations — a near-total collapse in output.',
      },
      {
        label: 'Decoupling dust vs. temperature',
        text:  'By analytically defining the native rate dV₀c/dT, any additional empirical voltage drop beyond this baseline is cleanly attributed to irradiance-blocking by specific soil compositions.',
      },
      {
        label: 'First-order linear framing',
        text:  'The implicit temperature dependence in I₀ makes the V₀c–T relationship analytically intractable directly; recasting the system as dy/dx + Py = Q unlocks an exact closed-form solution.',
      },
      {
        label: 'Log-linear decay dynamics',
        text:  'The derived solution shows V₀c degrades as −T ln T, meaning high-dust or high-temperature environments drive non-linear accelerated system decay.',
      },
    ],
  },
  {
    id: 'solar-angle-efficiency',
    title: 'Angle of Inclination vs Solar Panel Efficiency',
    description:
      'Physics investigation optimising the angle of a solar panel relative to incident light to maximise electrical output. Collected power output data across angles, identified the optimal inclination, and modelled the relationship — a real-world optimisation problem analogous to parameter tuning in quantitative models.',
    tags: ['Experimental Physics', 'Optimisation', 'Data Collection', 'Energy'],
    metric: { label: 'Type', value: 'Physics IA' },
    demo: '/papers/solar-angle-efficiency.pdf',
    category: 'research',
    ib: true,
  },
  {
    id: 'image-downloader',
    title: 'Automated Image Scraper',
    description:
      'Browser-based JavaScript script that automates batch downloading of sequentially numbered image files from a URL pattern. Uses the Fetch API to retrieve binary blobs and programmatically triggers downloads — demonstrating web automation, binary data handling, and efficient loop design.',
    tags: ['JavaScript', 'Fetch API', 'Automation', 'Browser'],
    metric: { label: 'Images', value: '656 files' },
    github: 'https://github.com/Mulu007',
    category: 'software',
  },
]

export const categoryLabels: Record<ProjectCategory, string> = {
  'algo-trading': 'Algo Trading',
  'ml':           'Machine Learning',
  'statistics':   'Statistics',
  'finance':      'Finance',
  'economics':    'Economics',
  'software':     'Software',
  'research':     'Research',
}

export const tagColorMap: Record<string, string> = {
  Python:        'electric',
  R:             'jade',
  Stata:         'jade',
  NumPy:         'electric',
  pandas:        'electric',
  statsmodels:   'violet',
  XGBoost:       'gold',
  cvxpy:         'violet',
  Streamlit:     'rose',
  Plotly:        'rose',
  JavaScript:    'gold',
  'Node.js':     'jade',
  React:         'electric',
  Ruby:          'rose',
  Tailwind:      'electric',
  'REST API':    'violet',
  Auth:          'violet',
  'Fetch API':   'jade',
  Automation:    'gold',
}
