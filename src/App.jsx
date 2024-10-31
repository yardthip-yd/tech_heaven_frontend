import React from 'react'
import AppRoute from './routes/AppRoute'
import { GoogleOAuthProvider } from '@react-oauth/google'


const App = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId='1083390196430-ikv6kj4bj4le7496hrvp9am2esq78sk4.apps.googleusercontent.com'>
      <AppRoute />
      </GoogleOAuthProvider>
    </div>
  )
}

export default App