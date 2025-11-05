import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  // HOOKS
  
  // Obtener datos del usuario del contexto
  const { user, logout, isAdmin } = useAuth();
  // user: { id, name, email, role }
  // logout: función para cerrar sesión
  // isAdmin: true si user.role === 'admin'
  
  // Obtener la ubicación actual (URL)
  const location = useLocation();
  // FUNCIÓN: Manejar Logout
  const handleLogout = async () => {
    // Mostrar diálogo de confirmación nativo del navegador
    // window.confirm retorna true si acepta, false si cancela
    if (window.confirm('¿Cerrar sesión?')) {
      // Usuario aceptó → Ejecutar logout
      await logout();
      // logout limpia localStorage y redirige a /login
    }
    // Si cancela, no hace nada
  };

  const isActive = (path) => location.pathname === path;
  
  // FUNCIÓN: Estilos dinámicos del lin
  const linkStyle = (path) => ({
    // Estilos base (para todos los links)
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: isActive(path) ? 'bold' : 'normal',
    
    // Fondo diferente si está activo
    backgroundColor: isActive(path) 
      ? 'rgba(255,255,255,0.2)' 
      : 'transparent',
    
    // Transición suave al cambiar
    transition: 'background-color 0.2s'
  });

  // RENDERIZADO
  return (
    <nav style={{
      // ESTILOS DEL NAVBAR
      // Colores
      backgroundColor: '#1976d2',  
      color: 'white',
      
      // Espaciado
      padding: '1rem 2rem',
      
      // Sombra sutil
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      
      // Sticky: Se queda fijo arriba al hacer scroll
      position: 'sticky',
      top: 0,
      zIndex: 1000  // Por encima de otros elementos
    }}>

      {/* CONTENEDOR CENTRADO */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        
        {/* SECCIÓN IZQUIERDA: Logo y Links */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          
          {/* LOGO */}
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginRight: '1rem'
          }}>
            🎮 Videogames
          </Link>
          
          {/* LINK: Dashboard */}
          <Link to="/" style={linkStyle('/')}>
            🏠 Dashboard
          </Link>
          
          {/* LINK: Videojuegos */}
          <Link to="/videojuegos" style={linkStyle('/videojuegos')}>
            🎮 Videojuegos
          </Link>
          
          {/* LINK: Plataformas */}
          <Link to="/plataformas" style={linkStyle('/plataformas')}>
            🕹️ Plataformas
          </Link>
        </div>

        {/* SECCIÓN DERECHA: Usuario y Logout */}        
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
            
          {user && (
            <>
              {/* LINK AL PERFIL */}
              <Link 
                to="/profile" 
                style={{
                  ...linkStyle('/profile'), 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
              >
                {/* NOMBRE DEL USUARIO */}
                <span>👤 {user.name}</span>
                
                {/* BADGE DE ADMIN (condicional) */}
                {isAdmin && (
                  <span style={{
                    backgroundColor: '#ff6b6b',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    ADMIN
                  </span>
                )}
              </Link>
              
              {/* BOTÓN LOGOUT */}
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  
                  transition: 'background-color 0.2s'
                }}
                // Efecto hover: Cambiar color al pasar el mouse
                onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
              >
                🚪 Salir
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;