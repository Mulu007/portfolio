import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Awards from './pages/Awards'
import Interests from './pages/Interests'
import Experience from './pages/Experience'

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <Routes location={location}>
        <Route path="/"           element={<Home />} />
        <Route path="/projects"   element={<Projects />} />
        <Route path="/awards"     element={<Awards />} />
        <Route path="/interests"  element={<Interests />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </Layout>
  )
}
