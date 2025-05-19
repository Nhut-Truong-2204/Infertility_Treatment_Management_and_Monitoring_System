import CusHomePage from './pages/CusHomePage'
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom';
import CusRegisterPage from './pages/CusRegisterPage';



function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<CusHomePage/>}></Route>
        <Route path="/register" element={<CusRegisterPage/>}></Route>

      </Routes>
    </BrowserRouter> 
  )
}

export default App
