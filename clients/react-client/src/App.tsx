import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import BooksManagement from './pages/BooksManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register_user" element={<RegisterUser />} />
        <Route path="/book_management" element={<BooksManagement />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
