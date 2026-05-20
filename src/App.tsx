import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/layout/Layout'
import BlueprintBackground from './components/background/BlueprintBackground'
import IntroScreen from './pages/IntroScreen'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Awards from './pages/Awards'
import Interests from './pages/Interests'
import Experience from './pages/Experience'

export default function App() {
  const location  = useLocation()
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem('portfolio-entered')
  )

  const handleEnter = () => {
    sessionStorage.setItem('portfolio-entered', '1')
    setShowIntro(false)
  }

  return (
    <>
      {/* Grid always visible behind everything */}
      <BlueprintBackground />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen key="intro" onEnter={handleEnter} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Layout>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/"           element={<Home />} />
                  <Route path="/projects"   element={<Projects />} />
                  <Route path="/awards"     element={<Awards />} />
                  <Route path="/interests"  element={<Interests />} />
                  <Route path="/experience" element={<Experience />} />
                </Routes>
              </AnimatePresence>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// import { useState } from 'react'
// import { Routes, Route, useLocation } from 'react-router-dom'
// import { AnimatePresence, motion } from 'framer-motion'
// import Layout from './components/layout/Layout'
// import BlueprintBackground from './components/background/BlueprintBackground'
// import IntroScreen from './pages/IntroScreen'
// import Home from './pages/Home'
// import Projects from './pages/Projects'
// import Awards from './pages/Awards'
// import Interests from './pages/Interests'

// export default function App() {
//   const location  = useLocation() // This will now work perfectly!
//   const [showIntro, setShowIntro] = useState(
//     () => !sessionStorage.getItem('portfolio-entered')
//   )

//   const handleEnter = () => {
//     sessionStorage.setItem('portfolio-entered', '1')
//     setShowIntro(false)
//   }

//   return (
//     <>
//       {/* Grid always visible behind everything */}
//       <BlueprintBackground />

//       <AnimatePresence mode="wait">
//         {showIntro ? (
//           <IntroScreen key="intro" onEnter={handleEnter} />
//         ) : (
//           <motion.div
//             key="app"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Layout>
//               <AnimatePresence mode="wait">
//                 <Routes location={location} key={location.pathname}>
//                   <Route path="/"          element={<Home />} />
//                   <Route path="/projects"  element={<Projects />} />
//                   <Route path="/awards"    element={<Awards />} />
//                   <Route path="/interests" element={<Interests />} />
//                 </Routes>
//               </AnimatePresence>
//             </Layout>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }