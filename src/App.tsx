import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './lib/authContext';
import MacOSLogin from './components/MacOSLogin';
import Dashboard from './components/Dashboard';
import './App.css';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {showLogin ? <MacOSLogin /> : <Dashboard />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
