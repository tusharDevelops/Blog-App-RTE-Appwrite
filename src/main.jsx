import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import authStore from "./redux/store/authStore.js"
import Home from "./pages/Home.jsx"
import AuthLayout from './components/AuthLayout.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPost from './pages/AllPost.jsx'
import  EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import VerifiCation from './pages/VerifiCation.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },

      {
        path: '/login',
        element: (<AuthLayout authentication={false}><Login/></AuthLayout>),
      },

      {
        path: "/signup",
        element: (<AuthLayout authentication={false}><SignUp /></AuthLayout>),
      },

     {
        path: "/all-posts",
        element: (<AuthLayout authentication>{" "}<AllPost /></AuthLayout>),
    },

    {
        path: "/add-post",
        element: (<AuthLayout authentication>{" "}<AddPost /></AuthLayout>),
    },

    {
        path: "/edit-post/:slug",
        element: (<AuthLayout authentication>{" "}<EditPost /></AuthLayout>),
    },

    {
        path: "/post/:slug",
        element: <Post />,
    },

    {
      path: "/verify",
      element: <VerifiCation/>
    }

    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
      <Provider store={authStore}> 
      <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>
    
   
  
)
