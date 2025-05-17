import { useState, useEffect } from 'react';
import { useAuth } from '../lib/authContext';
import '../styles/MacOSLogin.css';

export default function MacOSLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [googleAuthInProgress, setGoogleAuthInProgress] = useState(false);
  const { signIn, signUp, signInWithGoogle, deviceInfo } = useAuth();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
    } catch (error) {
      setError('Failed to create an account. Email might already be in use.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      setGoogleAuthInProgress(true);
      
      // Show a notification to the user that browser is opening
      await signInWithGoogle();
      
      // The auth process continues in the browser
    } catch (error) {
      setError('Failed to sign in with Google');
      console.error(error);
      setGoogleAuthInProgress(false);
      setLoading(false);
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="macos-login">
      <div className="login-screen">
        <div className="time-display">
          <div className="time">{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>
        
        <div className="login-container">
          {googleAuthInProgress ? (
            <div className="google-auth-message">
              <h2>Google Authentication</h2>
              <p>Please complete authentication in your browser.</p>
              <p>After completing the sign-in process, return to this app.</p>
              <button 
                className="back-button"
                onClick={() => setGoogleAuthInProgress(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="user-avatar">
                <img src="/avatar-placeholder.png" alt="User Avatar" />
              </div>
              <h2>Sign in to {deviceInfo?.deviceName || 'Your Device'}</h2>
              
              <form onSubmit={handleSignIn}>
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="button-group">
                  <button 
                    type="submit" 
                    className="sign-in-button" 
                    disabled={loading}
                  >
                    Sign In
                  </button>
                  <button 
                    type="button" 
                    className="sign-up-button" 
                    onClick={handleSignUp}
                    disabled={loading}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              
              <div className="divider">or</div>
              
              <button 
                className="google-sign-in" 
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                Sign in with Google
              </button>
            </>
          )}
        </div>
        
        <div className="system-info">
          <p>{deviceInfo?.osVersion || 'macOS'}</p>
        </div>
      </div>
    </div>
  );
}
