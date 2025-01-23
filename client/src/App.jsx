import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './components/HomePage'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import SignIn from './components/SignIn'
import Recipes from './components/Recipes'
import SignUp from './components/SignUp'

import './assets/styles/Main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={ <Layout><HomePage /></Layout>} />
        <Route path="/recipes" element={<Layout><Recipes /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </Router>
  )
}

export default App
