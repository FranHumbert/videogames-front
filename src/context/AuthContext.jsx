import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { getCurrentUser, isAuthenticated as checkAuth, saveUser, clearAuth} from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkAuthentication();
  }, []); 

  const checkAuthentication = async () => {
    if (checkAuth()) {
      try {
        const response = await api.get('/profile');
        
        setUser(response.data.user);
        
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        clearAuth();
        setUser(null);
      }
    }
    
    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });    
    const { access_token, user } = response.data;    
    saveUser(user, access_token);   
    setUser(user);

    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Error al hacer logout:', error);
    } finally {
      clearAuth();
      setUser(null);
    }
  };

  const value = {
    user,           
    loading,      
    login,         
    logout,         
    
    
    isAuthenticated: !!user,  
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  return context;
}

export default AuthContext;