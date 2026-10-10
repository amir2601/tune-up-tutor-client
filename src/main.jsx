import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import ThemeProvider from './Provider/ThemeProvider.jsx';
import FeedbackHost from './lib/feedback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='min-h-screen w-full bg-base-200'>
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <FeedbackHost />
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  </div>,
)
