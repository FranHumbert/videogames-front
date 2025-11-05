import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';

function ProtectedRoute({ children }) {
    
  const { user, loading } = useAuth();
  
  // user: Datos del usuario (null si no está logueado)
  // loading: true si estamos verificando autenticación
  
  // CASO 1: Todavía estamos verificando
  if (loading) {
    return <Loading message="Verificando autenticación..." />;
  }

  // CASO 2: Usuario NO está logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // CASO 3: Usuario SÍ está logueado
  return children;
}

export default ProtectedRoute;