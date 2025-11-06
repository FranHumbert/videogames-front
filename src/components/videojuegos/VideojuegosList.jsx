import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function VideojuegosList() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const [videojuegos, setVideojuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideojuegos();
  }, []);

  const fetchVideojuegos = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/videojuegos');
      setVideojuegos(response.data.data);
      
    } catch (error) {
      console.error('Error al cargar videojuegos:', error);
      setError('Error al cargar videojuegos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, titulo) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${titulo}"?`)) {
      return;
    }

    try {
      await api.delete(`/videojuegos/${id}`);
      setVideojuegos(prev => prev.filter(v => v.id !== id));
      alert('✅ Videojuego eliminado exitosamente');
      
    } catch (error) {
      console.error('Error al eliminar:', error);
      
      if (error.response?.status === 403) {
        alert('❌ No tienes permisos de administrador');
      } else {
        alert('❌ Error al eliminar videojuego');
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Cargando videojuegos..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage 
          message={error} 
          onRetry={fetchVideojuegos}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cyber-fade-in" style={{ padding: '2rem' }}>
        
        {/* ============================================ */}
        {/* ENCABEZADO */}
        {/* ============================================ */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '5px',
              background: 'linear-gradient(45deg, var(--cyber-cyan), var(--cyber-magenta))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              🎮 VIDEOJUEGOS
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span className="cyber-badge" style={{
                borderColor: 'var(--cyber-cyan)',
                color: 'var(--cyber-cyan)',
                fontSize: '1rem'
              }}>
                TOTAL: {videojuegos.length}
              </span>
              
              <div style={{
                width: '2px',
                height: '20px',
                background: 'var(--cyber-cyan)',
                opacity: 0.3
              }} />
              
              <span style={{
                color: 'var(--cyber-text-dim)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                // Base de Datos
              </span>
            </div>
          </div>

          {/* Botón Crear (solo admin) */}
          {isAdmin && (
            <button
              onClick={() => navigate('/videojuegos/crear')}
              className="cyber-button"
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem'
              }}
            >
              ➕ CREAR NUEVO
            </button>
          )}
        </div>

        {/* Línea decorativa */}
        <div className="cyber-divider" style={{ marginBottom: '3rem' }} />

        {/* ============================================ */}
        {/* CONTENIDO: Lista */}
        {/* ============================================ */}
        {videojuegos.length === 0 ? (
          <EmptyState
            icon="🎮"
            message="No hay videojuegos registrados"
            actionText={isAdmin ? "CREAR EL PRIMERO" : undefined}
            onAction={isAdmin ? () => navigate('/videojuegos/crear') : undefined}
          />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {videojuegos.map(game => (
              <div
                key={game.id}
                className="cyber-card cyber-hover-lift"
                style={{
                  borderColor: 'var(--cyber-cyan)',
                  background: 'rgba(26, 31, 58, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decoración de fondo */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  fontSize: '8rem',
                  opacity: 0.05,
                  transform: 'rotate(-15deg)'
                }}>
                  🎮
                </div>

                {/* Contenido */}
                <div style={{ padding: '1.5rem', flex: 1, position: 'relative', zIndex: 1 }}>
                  
                  {/* Header: Título + Badge */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '1rem',
                    gap: '1rem'
                  }}>
                    <h2 style={{
                      fontSize: '1.5rem',
                      color: 'var(--cyber-cyan)',
                      fontWeight: 'bold',
                      flex: 1,
                      lineHeight: '1.3'
                    }}>
                      {game.titulo}
                    </h2>
                    
                    <span className="cyber-badge" style={{
                      borderColor: 'var(--cyber-magenta)',
                      color: 'var(--cyber-magenta)',
                      fontSize: '0.75rem',
                      whiteSpace: 'nowrap'
                    }}>
                      {game.genero}
                    </span>
                  </div>

                  {/* Fecha */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--cyber-text-dim)',
                    fontSize: '0.95rem'
                  }}>
                    <span style={{ color: 'var(--cyber-yellow)' }}>📅</span>
                    <span>
                      {new Date(game.anio_lanzamiento).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>

                  {/* Plataformas */}
                  {game.plataformas && game.plataformas.length > 0 && (
                    <div>
                      <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--cyber-text-dim)',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 'bold'
                      }}>
                        // Plataformas:
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                      }}>
                        {game.plataformas.map(plat => (
                          <span
                            key={plat.id}
                            style={{
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.8rem',
                              background: 'rgba(0, 243, 255, 0.1)',
                              color: 'var(--cyber-cyan)',
                              border: '1px solid rgba(0, 243, 255, 0.3)',
                              clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)'
                            }}
                          >
                            {plat.nombre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer: Botones */}
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(10, 14, 39, 0.8)',
                  borderTop: '1px solid rgba(0, 243, 255, 0.2)',
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  {/* Botón Ver */}
                  <Link
                    to={`/videojuegos/${game.id}`}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'transparent',
                      color: 'var(--cyber-cyan)',
                      textAlign: 'center',
                      textDecoration: 'none',
                      border: '2px solid var(--cyber-cyan)',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      transition: 'all 0.3s ease',
                      clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--cyber-cyan)';
                      e.target.style.color = 'var(--cyber-dark)';
                      e.target.style.boxShadow = '0 0 20px var(--cyber-cyan)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'var(--cyber-cyan)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    👁️ VER
                  </Link>

                  {/* Botones Admin */}
                  {isAdmin && (
                    <>
                      <Link
                        to={`/videojuegos/${game.id}/editar`}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'transparent',
                          color: 'var(--cyber-yellow)',
                          textAlign: 'center',
                          textDecoration: 'none',
                          border: '2px solid var(--cyber-yellow)',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          transition: 'all 0.3s ease',
                          clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'var(--cyber-yellow)';
                          e.target.style.color = 'var(--cyber-dark)';
                          e.target.style.boxShadow = '0 0 20px var(--cyber-yellow)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = 'var(--cyber-yellow)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        ✏️
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(game.id, game.titulo)}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'transparent',
                          color: 'var(--cyber-magenta)',
                          border: '2px solid var(--cyber-magenta)',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'var(--cyber-magenta)';
                          e.target.style.color = 'var(--cyber-dark)';
                          e.target.style.boxShadow = '0 0 20px var(--cyber-magenta)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = 'var(--cyber-magenta)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default VideojuegosList;