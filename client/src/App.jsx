import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import AcademyHome from './pages/AcademyHome';
import StudentHome from './pages/StudentHome';

function App() {
  return (
    <BrowserRouter>
      {/* Notification Toaster */}
      <Toaster position="top-center" />
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Simple Role-based Routes */}
        <Route path="/academy" element={<AcademyHome />} />
        <Route path="/student" element={<StudentHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;