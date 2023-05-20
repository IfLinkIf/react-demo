import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './pages/layout'
import Login from './pages/login'
import AuthComponment from './componments/AuthComponment'
import Dashboard from './pages/dashboard'
import Artical from './pages/artical'
import Cms from './pages/cms'
import { HistoryRouter, history } from '@/utils/history'

function App () {
  return (
    <HistoryRouter history={history}>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<AuthComponment><Main /></AuthComponment>} >
          <Route path='/' index element={<Dashboard />}></Route>
          <Route path='/Admin/Cms' element={<Cms />}></Route>
          <Route path='/Admin/Artical' element={<Artical />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      {/* </BrowserRouter> */}
    </HistoryRouter>
  )
}

export default App
