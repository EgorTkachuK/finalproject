import React from 'react'
import { supabase } from '../../lib/supabase'
import GoogleIcon from '../../assets/icons/google.svg?react'

type Props = {
  redirectTo?: string
}

const GoogleAuth: React.FC<Props> = ({ redirectTo }) => {
  const handleGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="googleAuth">
    


      <button type="button" className="googleButton" onClick={handleGoogle}>
        {typeof GoogleIcon === 'string' ? (
          <img src={GoogleIcon} alt="Google" width={18} height={18} />
        ) : (
      
          <GoogleIcon width={18} height={18} aria-hidden="true" />
        )}
        <span className="googleLabel">Google</span>
      </button>
    </div>
  )
}

export default GoogleAuth
