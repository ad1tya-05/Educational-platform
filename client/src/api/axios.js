// import axios from 'axios';

// // Change this URL to your deployed backend URL later
// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// // Automatically attach token to every request if it exists
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;



const API = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5000/api" 
    : "https://https://my-educational-platform.onrender.com/api", 
});

// Keep your existing interceptor code below...
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;

