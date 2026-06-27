import React, { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  return (
    <div>
      {mode === 'login' ? (
        <Login onSuccess={() => window.location.reload()} onSwitch={() => setMode('signup')} switchLabel="Sign up" />
      ) : (
        <SignUp onSuccess={() => window.location.reload()} onSwitch={() => setMode('login')} switchLabel="Sign in" />
      )}
    </div>
  )
}

export default Auth
