import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './components/HomePage'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import RecipePage from './components/RecipePage'


import './assets/styles/Main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={ <Layout> <HomePage /></Layout>} />
        <Route path="/recipes" element={<Layout><RecipePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
      
      </Routes>
    </Router>
  )
}

export default App
