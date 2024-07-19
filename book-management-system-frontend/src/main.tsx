import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BookManagement } from './pages/BookManage';






const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <BookManagement />,
  }
]

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<RouterProvider router={router}/>)
