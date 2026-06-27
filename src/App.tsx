import React from 'react'
import Header from './components/header/header'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Auth from './components/auth/Auth'
import Info from './components/info/Info'

const AppInner: React.FC = () => {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  return user ? <Info /> : <Auth />
}

function App() {
  return (
    <AuthProvider>
      <Header />
      <AppInner />
    </AuthProvider>
  )
}

export default App
