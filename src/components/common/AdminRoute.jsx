import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';

function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  
  // CASO 1: Todavía estamos verificando
  if (loading) {
    return <Loading message="Verificando permisos..." />;
  }
  
  // CASO 2: Usuario NO está logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // CASO 3: Usuario NO es admin
  if (!isAdmin) {
    alert('⛔ Necesitas permisos de administrador para acceder a esta página');
    
    return <Navigate to="/" replace />;
  }
  
  // CASO 4: Usuario es admin
  // Renderizar el componente hijo (página solo para admin)
  return children;
}

export default AdminRoute;