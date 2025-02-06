import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import Layout from './components/Layout'
import HomePage from './components/HomePage'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import SignIn from './components/SignIn'
import Recipes from './components/Recipes'
import SignUp from './components/SignUp'
import Sample from './components/Sample'
import AddRecipe from './components/AddRecipe'
import NotificationModal from './components/Modals/NotificationModal'

import './assets/styles/Main.css'
import './assets/styles/Recipes.css'
import './assets/styles/Categories.css'
import './assets/styles/DialogBoxes.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Token Expiry Handler Component
const TokenHandler = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000 // Convert to seconds
        if (decoded.exp < currentTime) {
          setIsModalOpen(true) // Show modal
          setTimeout(() => {
            setIsModalOpen(false)
            localStorage.clear()
            navigate('/signin') // Redirect to Sign In
          }, 1500)
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        setIsModalOpen(true)
        setTimeout(() => {
          setIsModalOpen(false)
          localStorage.clear()
          navigate('/signin')
        }, 1500)
      }
    }
  }, [navigate])

  return (
    <>
      <NotificationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        message="Your session has expired. Please log in again."
      />
    </>
  )
}

function App() {
  return (
    <Router>
      <TokenHandler /> {/* Token check at the start */}
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/recipes/sample" element={<Layout><Sample /></Layout>} />
        <Route path="/recipes" element={<Layout><Recipes /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addrecipe" element={<Layout><AddRecipe /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
