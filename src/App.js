import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './pages/layout'
import Login from './pages/login'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
