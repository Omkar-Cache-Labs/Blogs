import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import BlogDetails from './BlogDetails'
import Blogs from './blogs'
import BlogDetails2 from './BlogDetails2'
import BlogCard from './BlogsInitial'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/blogs1" element={<BlogCard />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
      </Routes>
    </Router>
  )
}

export default App
