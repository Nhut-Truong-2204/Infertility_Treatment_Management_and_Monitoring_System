import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/customer/RegisterPage';
import HomePage from './pages/customer/HomePage';



function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
