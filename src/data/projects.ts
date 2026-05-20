export type ProjectCategory = 'algo-trading' | 'ml' | 'statistics' | 'finance' | 'economics' | 'software' | 'research' | 'data-analytics'

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
    id: 'tea-plantations-ra',
    title: 'Research Assistantship: Tea Plantations & Local Economic Outcomes',
    description:
      'Texas State University — Department of Economics | Spring 2026 – Present.\n Supporting faculty research on the economic impact of tea plantations and factories in Kenya. Addressing fragmented location data, I built a Python pipeline using the Google Geocoding API to convert physical factory addresses into precise GPS coordinates, forming the empirical base for econometric modelling of regional employment, wealth, and infrastructure outcomes.',
    tags: ['Economic Research', 'Python', 'Geospatial Analytics', 'Econometrics', 'API Data Ingestion'],
    metric: { label: 'Status', value: 'Publishing in process' },
    category: 'economics',
    featured: true,
    findings: [
      {
        label: 'Female labour and household welfare channel',
        text: 'Since tea harvesting disproportionately employs women (due to the physical advantage shorter stature offers in plucking), and evidence suggests women allocate a greater share of income toward household welfare than men, the research examines whether proximity to tea factories improves living standards through female labor force participation.',
      },
      {
        label: 'Geocoding Pipeline',
        text: 'Built a Python pipeline that automated address-to-coordinate conversion across the dataset using the Google Geocoding API, eliminating manual lookup and accelerating the research timeline.',
      },
      {
        label: 'Data Consolidation',
        text: 'Consolidating factory-level data with regional macroeconomic variables under strict cleaning protocols ahead of regression analysis.',
      },
    ],
  },
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
    title: 'ALLMOVIES: Crowd-Sourced Movie Curation Platform',
    description:
      'ALLMOVIES is a responsive, full-stack web application designed for movie enthusiasts to crowd-source and manage binge-watch collections. The platform pairs a component-driven React frontend with a Ruby on Rails backend. Despite a 50% reduction in active team headcount mid-sprint, Another teammate and I successfully delivered the application under strict deadlines delivering the best project. The frontend handles full state management for secure user authentication and dynamic content management, ensuring a fluid user experience across all browsing, editing and routing layers.',
    tags: ['React.js', 'Ruby on Rails', 'Tailwind CSS', 'Auth', 'CRUD', 'Agile', 'Git'],
    metric: { label: 'Team', value: '4 → 2 devs' },
    github: 'https://github.com/Mulu007/phase-4-frontend',
    category: 'software',
    featured: true,
    findings: [
      {
        label: 'Active Project Resource Management',
        text: 'Adapted quickly to sudden team downsizing by taking full ownership of the frontend architecture, collaborating closely with one backend partner through daily standups to meet all delivery deadlines.',
      },
      {
        label: 'Full CRUD Interaction Lifecycle',
        text: 'Engineered a seamless interface using React components to let users dynamically create, read, update and delete movie data directly from the view layers.',
      },
      {
        label: 'Secure Client-Side Authentication',
        text: 'Implemented interactive form handling and conditional state logic to process secure user login, registration sessions and custom account creation states.',
      },
      {
        label: 'Cross-Environment Version Patching',
        text: 'Isolated and resolved breaking Git conflicts and configuration errors caused by mismatched local Ruby development environments, enforcing strict peer review requirements for all pull requests.',
      },
    ],
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
    id: 'image-downloader',
    title: 'Asynchronous Media Scraping Engine: Automated Asset Extraction Pipeline',
    description:
      'Manual extraction of paginated digital textbook assets presents a severe operational bottleneck, requiring an estimated 2.7 hours of repetitive manual data entry. To eliminate this friction, I engineered an asynchronous JavaScript asset extraction pipeline that fully automates the process, reducing operational latency to a 30-second execution run. By reverse-engineering the platform\'s CDN URL structure and identifying an incremental string-padding pattern (F01_IB_CHEM_SL_27690-XXX.jpg), the engine concurrently streams all 656 assets as Binary Large Objects (Blobs), programmatically serializing and archiving the complete textbook database on the client side with 100% manual intervention reduction.',
    tags: ['JavaScript', 'Fetch API', 'Async/Await', 'CDN Reverse Engineering', 'Automation', 'Browser'],
    metric: { label: 'Time saved', value: '2.7 hrs → 30 s' },
    github: 'https://github.com/Mulu007/Textbook-Image-Downloader',
    category: 'software',
    findings: [
      {
        label: 'Massive Throughput Acceleration',
        text: 'Replaced manual, single-threaded downloading with a promise-based asynchronous architecture, scaling transmission velocity from a human limit of ≈ 0.06 Hz to an algorithmic throughput of 20+ images per second.',
      },
      {
        label: 'Zero-Friction Asset Serialization',
        text: 'Eradicated 656 distinct manual checkpoints by utilizing automated string padding (.padStart(3, "0")) to enforce absolute uniformity across the downloaded dataset and eliminate naming errors.',
      },
      {
        label: 'Optimized Resource Allocation',
        text: 'Decoupling asset retrieval from user-interface interaction allows compilation of entire educational databases with zero human capital expenditure, demonstrating the power of edge-side scripting.',
      },
    ],
  },
  {
    id: 'globalmart-powerbi',
    title: 'GlobalMart Sales Analysis: Power BI Dashboard & Relational Data Modeling',
    description:
      'Moringa School — Data Analytics.\nDesigned an end-to-end analytics pipeline in Power BI to identify growth opportunities and diagnose profitability challenges across GlobalMart\'s 2022–2024 U.S. retail operations. After cleaning and standardizing a 337-transaction dataset in Excel, I normalized the flat file into a star schema with three dimension tables (Product, Region, Date), authored eight DAX measures including Year-over-Year revenue growth and shipping duration, and built four interactive reports covering executive summary, sales trends, order detail, and regional performance.',
    tags: ['Power BI', 'DAX', 'Star Schema', 'Data Cleaning', 'Business Analytics', 'Excel'],
    metric: { label: 'Transactions', value: '337' },
    demo: '/papers/globalmart-powerbi.pdf',
    category: 'data-analytics',
    findings: [
      {
        label: 'Anomalous Margin Spike',
        text: 'Identified a single December 2023 transaction responsible for a 12,028% profit margin spike that masked an underlying net loss for the year — flagging a structural reporting vulnerability.',
      },
      {
        label: 'Category Concentration Risk',
        text: 'Office Supplies accounts for over 70% of revenue while Technology contributes just 6.07%, despite being the highest unit-value category — signalling a significant revenue diversification gap.',
      },
      {
        label: 'Volume-Value Mismatch in Michigan',
        text: 'Michigan leads in unit volume but aggressive discounting suppresses revenue well below Ohio, which leads in gross revenue while maintaining the lowest average discount rate.',
      },
      {
        label: 'Dual-Path Date Filtering',
        text: 'Configured dual-path date filtering via USERELATIONSHIP to independently track order and shipping timelines, enabling logistics performance analysis alongside sales trends.',
      },
    ],
  },
]

export const categoryLabels: Record<ProjectCategory, string> = {
  'algo-trading':   'Algo Trading',
  'ml':             'Machine Learning',
  'statistics':     'Statistics',
  'finance':        'Finance',
  'economics':      'Economics',
  'software':       'Software',
  'research':       'Research',
  'data-analytics': 'Data Analytics',
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
