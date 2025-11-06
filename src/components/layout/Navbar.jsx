import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    navigate('/login');
  };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav style={{
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.95) 0%, rgba(10, 14, 39, 0.98) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid var(--cyber-cyan)',
      boxShadow: '0 4px 20px rgba(0, 243, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem'
      }}>
        
        {/* LOGO */}
        <Link 
          to="/" 
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <div style={{
            fontSize: '2rem',
            filter: 'drop-shadow(0 0 10px var(--cyber-cyan))'
          }}>
            🎮
          </div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            background: 'linear-gradient(45deg, var(--cyber-cyan), var(--cyber-magenta))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            GAMESHUB
          </span>
        </Link>

        {/* NAVEGACIÓN */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flex: 1
        }}>
          <Link
            to="/"
            style={{
              color: 'var(--cyber-text)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1rem',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--cyber-cyan)';
              e.target.style.background = 'rgba(0, 243, 255, 0.1)';
              e.target.style.textShadow = '0 0 10px var(--cyber-cyan)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--cyber-text)';
              e.target.style.background = 'transparent';
              e.target.style.textShadow = 'none';
            }}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/videojuegos"
            style={{
              color: 'var(--cyber-text)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1rem',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--cyber-cyan)';
              e.target.style.background = 'rgba(0, 243, 255, 0.1)';
              e.target.style.textShadow = '0 0 10px var(--cyber-cyan)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--cyber-text)';
              e.target.style.background = 'transparent';
              e.target.style.textShadow = 'none';
            }}
          >
            🎮 Videojuegos
          </Link>

          <Link
            to="/plataformas"
            style={{
              color: 'var(--cyber-text)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              padding: '0.5rem 1rem',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = 'var(--cyber-magenta)';
              e.target.style.background = 'rgba(255, 0, 110, 0.1)';
              e.target.style.textShadow = '0 0 10px var(--cyber-magenta)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'var(--cyber-text)';
              e.target.style.background = 'transparent';
              e.target.style.textShadow = 'none';
            }}
          >
            🕹️ Plataformas
          </Link>
        </div>

        {/* USUARIO (con menú desplegable AL CLICK) */}
        <div 
          ref={menuRef}
          style={{ 
            position: 'relative',
            cursor: 'pointer'
          }}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(59, 255, 0, 0.1) 0%, rgba(0, 243, 255, 0.1) 100%)',
              border: '2px solid var(--cyber-green)',
              borderRadius: '8px',
              color: 'var(--cyber-green)',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              boxShadow: isMenuOpen ? '0 0 20px var(--cyber-green)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (!isMenuOpen) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 255, 0, 0.2) 0%, rgba(0, 243, 255, 0.2) 100%)';
                e.currentTarget.style.boxShadow = '0 0 15px var(--cyber-green)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMenuOpen) {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 255, 0, 0.1) 0%, rgba(0, 243, 255, 0.1) 100%)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>
              {user?.role === 'admin' ? '👑' : '👤'}
            </span>
            <span>{user?.name?.toUpperCase()}</span>
            <span style={{
              fontSize: '0.8rem',
              transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}>
              ▼
            </span>
          </button>

          {/* MENÚ DESPLEGABLE */}
          {isMenuOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              minWidth: '250px',
              background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.98) 0%, rgba(10, 14, 39, 0.98) 100%)',
              border: '2px solid var(--cyber-green)',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(59, 255, 0, 0.3)',
              padding: '0.5rem',
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              animation: 'fadeIn 0.3s ease',
              zIndex: 1001
            }}>
              {/* Perfil */}
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  color: 'var(--cyber-cyan)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease',
                  borderRadius: '4px',
                  marginBottom: '0.25rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 243, 255, 0.1)';
                  e.currentTarget.style.textShadow = '0 0 10px var(--cyber-cyan)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.textShadow = 'none';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>👤</span>
                <span>Profile</span>
              </Link>

              {/* Divisor */}
              <div style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--cyber-green), transparent)',
                margin: '0.5rem 0',
                opacity: 0.3
              }} />

              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--cyber-magenta)',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: '4px',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 0, 110, 0.1)';
                  e.currentTarget.style.textShadow = '0 0 10px var(--cyber-magenta)';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.textShadow = 'none';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;