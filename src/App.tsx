import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Community from './pages/Community'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { AIChatWidget } from './components/AIChatWidget'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/community" element={<Community />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AIChatWidget />
    </>
  )
}
