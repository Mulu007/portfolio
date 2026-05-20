export type CourseCategory = 'quant' | 'economics' | 'math' | 'cs'

export interface Course {
  code: string
  title: string
  description: string
  category: CourseCategory
  grade?: string
  projectLink?: string
  tools?: string[]
}

export const courses: Course[] = [
  // ── Quantitative / Finance ──────────────────────────────
  {
    code: 'ECON 1710',
    title: 'Financial Economics',
    description: 'Asset pricing theory, Arrow-Debreu markets, CAPM, APT, and the equity premium puzzle.',
    category: 'quant',
    tools: ['Excel', 'R'],
  },
  {
    code: 'ECON 1820',
    title: 'Econometrics',
    description: 'OLS, IV, DiD, panel methods, and time series. Semester project on wage elasticity.',
    category: 'quant',
    tools: ['Stata', 'R'],
  },
  {
    code: 'ECON 1490',
    title: 'Behavioral Economics',
    description: 'Prospect theory, mental accounting, hyperbolic discounting, and market anomalies.',
    category: 'quant',
  },
  // ── Economics ────────────────────────────────────────────
  {
    code: 'ECON 0110',
    title: 'Principles of Economics',
    description: 'Micro and macro foundations: markets, equilibrium, GDP, monetary and fiscal policy.',
    category: 'economics',
  },
  {
    code: 'ECON 1210',
    title: 'Intermediate Microeconomics',
    description: 'Consumer theory, producer theory, game theory, and general equilibrium.',
    category: 'economics',
  },
  {
    code: 'ECON 1220',
    title: 'Intermediate Macroeconomics',
    description: 'IS-LM, Solow growth model, RBC, and New Keynesian frameworks.',
    category: 'economics',
  },
  {
    code: 'ECON 1340',
    title: 'International Trade',
    description: 'Comparative advantage, Heckscher-Ohlin, new trade theory, and trade policy.',
    category: 'economics',
  },
  // ── Mathematics ──────────────────────────────────────────
  {
    code: 'MATH 0100',
    title: 'Calculus II',
    description: 'Integration techniques, sequences, series, and Taylor expansions.',
    category: 'math',
  },
  {
    code: 'MATH 0520',
    title: 'Linear Algebra',
    description: 'Vector spaces, eigendecomposition, SVD, and applications to data analysis.',
    category: 'math',
  },
  {
    code: 'MATH 1010',
    title: 'Analysis I',
    description: 'Real analysis: metric spaces, continuity, differentiation, and Riemann integration.',
    category: 'math',
  },
  {
    code: 'MATH 1530',
    title: 'Probability',
    description: 'Probability spaces, distributions, CLT, LLN, Markov chains, and martingales.',
    category: 'math',
  },
  {
    code: 'MATH 1610',
    title: 'Optimization',
    description: 'Convex analysis, gradient descent, Lagrangian duality, and linear programming.',
    category: 'math',
  },
  // ── Computer Science ─────────────────────────────────────
  {
    code: 'CSCI 0150',
    title: 'Intro to CS',
    description: 'Python fundamentals, algorithms, recursion, and data structures.',
    category: 'cs',
    tools: ['Python'],
  },
  {
    code: 'CSCI 1420',
    title: 'Machine Learning',
    description: 'Supervised/unsupervised learning, neural networks, SVM, PCA, and EM algorithm.',
    category: 'cs',
    tools: ['Python', 'scikit-learn', 'NumPy'],
  },
]

export const categoryMeta: Record<CourseCategory, { label: string; icon: string; color: string }> = {
  quant:     { label: 'Quantitative Methods', icon: '∑', color: 'gold' },
  economics: { label: 'Economics',            icon: '📈', color: 'electric' },
  math:      { label: 'Mathematics',          icon: '∂',  color: 'jade' },
  cs:        { label: 'Computer Science',     icon: '{}', color: 'violet' },
}
