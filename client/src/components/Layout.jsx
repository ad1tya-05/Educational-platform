// import { useNavigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// const Layout = ({ children, title, subtitle, showBack = false }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-blue-500/30">
//       <Toaster position="top-right" toastOptions={{ style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' } }} />

//       {/* Top bar (From Portfolio Queue Design) */}
//       <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-gray-900 sticky top-0 z-50">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-black text-blue-400 tracking-tight">
//             {title || 'MERN Platform'}
//           </h1>
//           <p className="text-gray-400 text-sm mt-1">
//             {subtitle || 'Enterprise Resource Management'}
//           </p>
//         </div>
//         <div className="flex gap-3">
//           {token ? (
//             <>
//               <span className="px-3 py-2 text-xs font-semibold rounded bg-gray-800 text-gray-300 border border-gray-700 uppercase tracking-wider">
//                 {role} MODE
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm border border-gray-600 transition-colors"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//              !showBack && (
//               <div className="flex gap-2">
//                  <button onClick={() => navigate('/login')} className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 text-sm">Login</button>
//                  <button onClick={() => navigate('/register')} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm font-semibold">Register</button>
//               </div>
//              )
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;