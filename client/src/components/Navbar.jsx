import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Get user details from LocalStorage
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Dynamic Styles based on Role
  const isAcademy = role === 'academy';
  const navColor = isAcademy ? 'bg-purple-700' : 'bg-blue-600'; // Purple for Academy, Blue for Student

  return (
    <nav className={`${token ? navColor : 'bg-gray-800'} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            {token ? (isAcademy ? '🎓 Academy Portal' : '📚 Student Library') : '🏫 MERN Education'}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <span className="text-sm bg-black/20 px-3 py-1 rounded-full capitalize">
                  {role} Mode
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-100 transition">
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

