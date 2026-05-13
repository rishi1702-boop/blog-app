import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import AddArticle from './components/AddArticle'
import AuthorDashboard from './components/AuthorDashboard'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './components/RootLayout'
import Register from './components/Register'
import ArticleDetails from './components/ArticleDetails'
import EditArticle from './components/EditArticle'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './components/Unauthorized'
import ErrorBoundary from './components/ErrorBoundary'
import { Toaster } from 'react-hot-toast'

function App() {
  const routerObj = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'admin-dashboard',
          element: <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        },
        {
          path: 'user-dashboard',
          element: <ProtectedRoute allowedRoles={['USER']}><UserDashboard /></ProtectedRoute>
        },
        {
          path: 'add-article',
          element: <ProtectedRoute allowedRoles={['AUTHOR']}><AddArticle /></ProtectedRoute>
        },
        {
          path: 'author-dashboard',
          element: <ProtectedRoute allowedRoles={['AUTHOR']}><AuthorDashboard /></ProtectedRoute>
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'article/:articleId',
          element: <ArticleDetails />
        },
        {
          path: 'edit-article',
          element: <ProtectedRoute><EditArticle /></ProtectedRoute>
        },
        {
          path: 'unauthorized',
          element: <Unauthorized />
        },
        {
          path: '*',
          element: <ErrorBoundary />
        }
      ]
    }
  ]);

  return (
    <>

      <Toaster position='top-center' reverseOrder={false} />
      <RouterProvider router={routerObj} />
    </>

  );
}

export default App