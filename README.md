# Education Platform

A MERN stack web application built to help educational institutions manage and distribute curriculum resources. The platform allows administrators (Academy) to upload and tag PDF documents, while students can search, filter, and view these materials through a secure dashboard.

 Live Demo

- **Frontend: https://educational-platform-cyan.vercel.app/login
- **Backend: https://my-educational-platform.onrender.com

 Key Features

Authentication & Security
- Role-based login system separating "Academy" (Admin) and "Student" users.
- Secure session management using JSON Web Tokens (JWT).
- Password hashing for user security.

Academy Dashboard (Admin)
- Secure PDF upload functionality.
- Automatic file handling using memory streams to prevent data corruption.
- Metadata tagging (Subject, Class Level, School Name) for every uploaded resource.

Student Dashboard
- Real-time search and filtering.
- Students can filter documents by Subject, Class, or School using partial text matching.
- Integrated PDF viewer allows students to read documents directly in the browser without downloading.

Tech Stack

Frontend
- React.js (Vite)
- Tailwind CSS for styling
- Axios for API communication

Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Cloudinary for cloud file storage
- Multer for handling file uploads

Environment Variables

To run this project locally, you will need to create a `.env` file in the `server` directory with the following variables:

```text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
