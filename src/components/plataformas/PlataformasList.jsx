import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function PlataformasList() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const [plataformas, setPlataformas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlataformas();
  }, []);

  const fetchPlataformas = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/plataformas');
      setPlataformas(response.data.data);
      
    } catch (error) {
      console.error('Error al cargar plataformas:', error);
      setError('Error al cargar plataformas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${nombre}"?`)) {
      return;
    }

    try {
      await api.delete(`/plataformas/${id}`);
      setPlataformas(prev => prev.filter(p => p.id !== id));
      alert('✅ Plataforma eliminada exitosamente');
      
    } catch (error) {
      console.error('Error al eliminar:', error);
      
      if (error.response?.status === 403) {
        alert('❌ No tienes permisos de administrador');
      } else {
        alert('❌ Error al eliminar plataforma');
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Cargando plataformas..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage 
          message={error} 
          onRetry={fetchPlataformas}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cyber-fade-in" style={{ padding: '2rem' }}>
        
        {/* ENCABEZADO */}
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
              background: 'linear-gradient(45deg, var(--cyber-magenta), var(--cyber-yellow))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.5rem'
            }}>
              🕹️ PLATAFORMAS
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span className="cyber-badge" style={{
                borderColor: 'var(--cyber-magenta)',
                color: 'var(--cyber-magenta)',
                fontSize: '1rem'
              }}>
                TOTAL: {plataformas.length}
              </span>
              
              <div style={{
                width: '2px',
                height: '20px',
                background: 'var(--cyber-magenta)',
                opacity: 0.3
              }} />
              
              <span style={{
                color: 'var(--cyber-text-dim)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                // Hardware Database
              </span>
            </div>
          </div>

          {/* Botón Crear (solo admin) */}
          {isAdmin && (
            <button
              onClick={() => navigate('/plataformas/crear')}
              className="cyber-button magenta"
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem'
              }}
            >
              ➕ CREAR NUEVA
            </button>
          )}
        </div>

        <div className="cyber-divider" style={{ marginBottom: '3rem' }} />

        {/* CONTENIDO */}
        {plataformas.length === 0 ? (
          <EmptyState
            icon="🕹️"
            message="No hay plataformas registradas"
            actionText={isAdmin ? "CREAR LA PRIMERA" : undefined}
            onAction={isAdmin ? () => navigate('/plataformas/crear') : undefined}
          />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {plataformas.map(plataforma => (
              <div
                key={plataforma.id}
                className="cyber-card cyber-hover-lift"
                style={{
                  borderColor: 'var(--cyber-magenta)',
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
                  🕹️
                </div>

                {/* Contenido */}
                <div style={{ padding: '2rem', flex: 1, position: 'relative', zIndex: 1 }}>
                  
                  {/* Icono grande */}
                  <div style={{
                    fontSize: '4rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    filter: 'drop-shadow(0 0 15px var(--cyber-magenta))'
                  }}>
                    🕹️
                  </div>

                  {/* Nombre */}
                  <h2 style={{
                    fontSize: '1.6rem',
                    color: 'var(--cyber-magenta)',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '0.75rem',
                    lineHeight: '1.3'
                  }}>
                    {plataforma.nombre}
                  </h2>

                  {/* Fabricante */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--cyber-text-dim)',
                    fontSize: '1rem'
                  }}>
                    <span style={{ color: 'var(--cyber-yellow)' }}>🏭</span>
                    <span>{plataforma.fabricante}</span>
                  </div>

                  {/* Contador de juegos */}
                  {plataforma.videojuegos_count !== undefined && (
                    <div style={{
                      padding: '1rem',
                      background: 'rgba(255, 0, 110, 0.1)',
                      border: '2px solid var(--cyber-magenta)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                    }}>
                      <div style={{
                        fontSize: '0.85rem',
                        color: 'var(--cyber-text-dim)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Videojuegos Disponibles
                      </div>
                      <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        color: 'var(--cyber-magenta)',
                        fontFamily: 'Orbitron, sans-serif',
                        textShadow: '0 0 15px var(--cyber-magenta)'
                      }}>
                        {plataforma.videojuegos_count}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer: Botones */}
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'rgba(10, 14, 39, 0.8)',
                  borderTop: '1px solid rgba(255, 0, 110, 0.2)',
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  {/* Botón Ver */}
                  <Link
                    to={`/plataformas/${plataforma.id}`}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'transparent',
                      color: 'var(--cyber-magenta)',
                      textAlign: 'center',
                      textDecoration: 'none',
                      border: '2px solid var(--cyber-magenta)',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
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
                    👁️ VER
                  </Link>

                  {/* Botones Admin */}
                  {isAdmin && (
                    <>
                      <Link
                        to={`/plataformas/${plataforma.id}/editar`}
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
                        ✏️ EDIT
                      </Link>
                      
                      <button
                        onClick={() => handleDelete(plataforma.id, plataforma.nombre)}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'transparent',
                          color: 'var(--cyber-cyan)',
                          border: '2px solid var(--cyber-cyan)',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          cursor: 'pointer',
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

export default PlataformasList;
