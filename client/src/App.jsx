import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import config from './config'
import axios from 'axios'

import Layout from './components/Layout'
import HomePage from './components/HomePage'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import SignIn from './components/SignIn'
import Recipes from './components/Recipes'
import SignUp from './components/SignUp'
import ViewCategory from './components/ViewCategory'
import AddRecipe from './components/AddRecipe'
import ViewRecipe from './components/ViewRecipe'
import NotificationModal from './components/Modals/NotificationModal'
import Profile from './components/Profile'
import Chat from './components/Chat'
import NotFound from './components/NotFound'; // Import the NotFound component


import './assets/styles/Main.css'
import './assets/styles/Recipes.css'
import './assets/styles/Categories.css'
import './assets/styles/DialogBoxes.css'
import './assets/styles/NavBar.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Token Expiry Handler Component
const TokenHandler = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const wakeBackend = async () => {
      try {
        await axios.get(`${config.BASE_URL}/ping`);
        // console.log("Backend pinged successfully");
      } catch (error) {
        console.error("Error starting backend:", error);
      }
    };

    wakeBackend();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime) {
          setIsModalOpen(true)
          setTimeout(() => {
            setIsModalOpen(false)
            localStorage.clear()
            navigate('/signin')
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
      <TokenHandler />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/recipes" element={<Layout><Recipes /></Layout>} />
        <Route path="/recipes/:category" element={<Layout><ViewCategory /></Layout>} />
        <Route path="/recipes/addrecipe" element={<Layout><AddRecipe /></Layout>} />
        <Route path="/recipes/view/:id" element={<Layout><ViewRecipe /></Layout>} />
        {/* <Route path="/profile" element={<Layout><Profile /></Layout>} /> */}
        {/* <Route path="/chat" element={<Layout><Chat /></Layout>} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App