import React from 'react'
import AppRoute from './routes/AppRoute'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId='1083390196430-ikv6kj4bj4le7496hrvp9am2esq78sk4.apps.googleusercontent.com'>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <AppRoute />
      </GoogleOAuthProvider>
    </div>
  )
}

export default App