// import { useState } from 'react';
// import API from '../api/axios';
// import { useNavigate, Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post('/auth/login', formData);
      
//       // Save data to LocalStorage
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('role', data.role);
      
//       toast.success('Login successful!');
      
//       // Redirect based on role
//       if (data.role === 'academy') navigate('/academy');
//       else navigate('/student');
      
//     } catch (err) {
//       toast.error('Invalid Credentials');
//     }
//   };

//   return (
//     // <div className="flex justify-center items-center h-screen bg-gray-100">
//     //   <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
//     //     <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
//     //     <input 
//     //       type="email" placeholder="Email" required 
//     //       className="w-full p-2 mb-4 border rounded"
//     //       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//     //     />
        
//     //     <input 
//     //       type="password" placeholder="Password" required 
//     //       className="w-full p-2 mb-6 border rounded"
//     //       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//     //     />

//     //     <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
//     //       Login
//     //     </button>
//     //     <p className="mt-4 text-center text-sm">
//     //       New here? <Link to="/register" className="text-green-600">Register</Link>
//     //     </p>
//     //   </form>
//     // </div>

//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//     <div className="w-full max-w-md">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

//         {/* Header */}
//         <h2 className="text-2xl font-semibold text-gray-900 text-center">
//           Welcome back
//         </h2>
//         <p className="text-sm text-gray-500 text-center mt-1">
//           Sign in to continue
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mt-6 space-y-5">

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email address
//             </label>
//             <input
//               type="email"
//               required
//               placeholder="you@example.com"
//               className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               placeholder="••••••••"
//               className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full h-11 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
//           >
//             Sign in
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don’t have an account?{' '}
//           <Link
//             to="/register"
//             className="text-blue-600 font-medium hover:underline"
//           >
//             Create one
//           </Link>
//         </p>

//       </div>
//     </div>
//   </div>

//   );
// };

// export default Login;




import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      toast.success('Login successful');

      if (data.role === 'academy') navigate('/academy');
      else navigate('/student');
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
    <div className="relative w-full max-w-md">
      
      {/* Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-white/20 blur-2xl"></div>

      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-extrabold text-white text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-white/70 text-center mt-2">
          Login to continue learning
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="email"
            required
            placeholder="Email address"
            className="w-full h-12 px-4 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full h-12 px-4 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-white text-indigo-700 font-semibold text-lg hover:scale-[1.02] transition-transform"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80">
          New here?{' '}
          <Link to="/register" className="font-semibold underline">
            Create account
          </Link>
        </p>

      </div>
    </div>
  </div>

  );
};

export default Login;
