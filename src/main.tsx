import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import 'animate.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from '@config/routes.tsx'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
