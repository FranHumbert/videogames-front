import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function PlataformaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const [plataforma, setPlataforma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlataforma();
  }, [id]);

  const fetchPlataforma = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get(`/plataformas/${id}`);
      setPlataforma(response.data.data);
      
    } catch (error) {
      console.error('Error al cargar plataforma:', error);
      
      if (error.response?.status === 404) {
        setError('Plataforma no encontrada');
      } else {
        setError('Error al cargar plataforma');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro de eliminar "${plataforma.nombre}"?`)) {
      return;
    }

    try {
      await api.delete(`/plataformas/${id}`);
      alert('✅ Plataforma eliminada exitosamente');
      navigate('/plataformas');
      
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
        <Loading message="Cargando detalles de la plataforma..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage 
          message={error} 
          onRetry={fetchPlataforma}
        />
      </Layout>
    );
  }

  if (!plataforma) {
    return (
      <Layout>
        <EmptyState
          icon="❓"
          message="Plataforma no encontrada"
          actionText="VOLVER A LA LISTA"
          onAction={() => navigate('/plataformas')}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cyber-fade-in" style={{ padding: '2rem' }}>
        
        {/* HEADER: Navegación */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <button
            onClick={() => navigate('/plataformas')}
            className="cyber-button magenta"
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.9rem'
            }}
          >
            ⬅️ VOLVER
          </button>

          {isAdmin && (
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button
                onClick={() => navigate(`/plataformas/${id}/editar`)}
                className="cyber-button yellow"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem'
                }}
              >
                ✏️ EDITAR
              </button>
              
              <button
                onClick={handleDelete}
                className="cyber-button"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  borderColor: 'var(--cyber-cyan)',
                  color: 'var(--cyber-cyan)'
                }}
              >
                🗑️ ELIMINAR
              </button>
            </div>
          )}
        </div>

        {/* TARJETA PRINCIPAL */}
        <div className="cyber-card" style={{
          borderColor: 'var(--cyber-magenta)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          
          {/* Header con fondo degradado */}
          <div style={{
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2) 0%, rgba(26, 31, 58, 0.8) 100%)',
            borderBottom: '2px solid var(--cyber-magenta)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '15rem',
              opacity: 0.05,
              pointerEvents: 'none'
            }}>
              🕹️
            </div>

            <div style={{
              fontSize: '6rem',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 30px var(--cyber-magenta))',
              position: 'relative',
              zIndex: 1
            }}>
              🕹️
            </div>
            
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: 'var(--cyber-magenta)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '1rem',
              textShadow: '0 0 30px var(--cyber-magenta)',
              position: 'relative',
              zIndex: 1
            }}>
              {plataforma.nombre}
            </h1>
            
            <span className="cyber-badge" style={{
              borderColor: 'var(--cyber-yellow)',
              color: 'var(--cyber-yellow)',
              fontSize: '1.1rem',
              padding: '0.5rem 1.5rem',
              display: 'inline-block'
            }}>
              🏭 {plataforma.fabricante}
            </span>
          </div>

          {/* Cuerpo */}
          <div style={{ padding: '2.5rem' }}>
            
            {/* Grid de información */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              
              <div className="cyber-card" style={{
                padding: '1.5rem',
                background: 'rgba(255, 0, 110, 0.05)',
                borderColor: 'var(--cyber-magenta)'
              }}>
                <p style={{
                  color: 'var(--cyber-text-dim)',
                  fontSize: '0.85rem',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 'bold'
                }}>
                  🎮 // NOMBRE
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--cyber-magenta)',
                  margin: 0,
                  fontFamily: 'Orbitron, sans-serif'
                }}>
                  {plataforma.nombre}
                </p>
              </div>

              <div className="cyber-card" style={{
                padding: '1.5rem',
                background: 'rgba(255, 190, 11, 0.05)',
                borderColor: 'var(--cyber-yellow)'
              }}>
                <p style={{
                  color: 'var(--cyber-text-dim)',
                  fontSize: '0.85rem',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 'bold'
                }}>
                  🏭 // FABRICANTE
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--cyber-yellow)',
                  margin: 0,
                  fontFamily: 'Orbitron, sans-serif'
                }}>
                  {plataforma.fabricante}
                </p>
              </div>

              <div className="cyber-card" style={{
                padding: '1.5rem',
                background: 'rgba(0, 243, 255, 0.05)',
                borderColor: 'var(--cyber-cyan)'
              }}>
                <p style={{
                  color: 'var(--cyber-text-dim)',
                  fontSize: '0.85rem',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 'bold'
                }}>
                  🎯 // TOTAL JUEGOS
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--cyber-cyan)',
                  margin: 0,
                  fontFamily: 'Orbitron, sans-serif'
                }}>
                  {plataforma.videojuegos?.length || 0}
                </p>
              </div>
            </div>

            <div className="cyber-divider" style={{ margin: '3rem 0' }} />

            {/* Sección: Videojuegos */}
            {plataforma.videojuegos && plataforma.videojuegos.length > 0 ? (
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  marginBottom: '2rem',
                  color: 'var(--cyber-magenta)',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: '900'
                }}>
                  🎮 VIDEOJUEGOS DISPONIBLES
                  <span style={{
                    marginLeft: '1rem',
                    fontSize: '1.2rem',
                    color: 'var(--cyber-text-dim)',
                    fontWeight: 'normal'
                  }}>
                    ({plataforma.videojuegos.length})
                  </span>
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {plataforma.videojuegos.map(videojuego => (
                    <Link
                      key={videojuego.id}
                      to={`/videojuegos/${videojuego.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                    >
                      <div className="cyber-card cyber-hover-lift" style={{
                        padding: '1.5rem',
                        background: 'rgba(255, 0, 110, 0.05)',
                        borderColor: 'var(--cyber-magenta)',
                        cursor: 'pointer'
                      }}>
                        <h3 style={{
                          fontSize: '1.2rem',
                          marginBottom: '0.75rem',
                          color: 'var(--cyber-magenta)',
                          fontWeight: 'bold'
                        }}>
                          {videojuego.titulo}
                        </h3>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{
                            fontSize: '0.9rem',
                            color: 'var(--cyber-text-dim)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px'
                          }}>
                            {videojuego.genero}
                          </span>
                          
                          <span style={{
                            fontSize: '0.9rem',
                            color: 'var(--cyber-yellow)'
                          }}>
                            📅 {new Date(videojuego.anio_lanzamiento).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="cyber-card" style={{
                padding: '3rem',
                textAlign: 'center',
                background: 'rgba(26, 31, 58, 0.3)',
                borderColor: 'var(--cyber-text-dim)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>
                  📭
                </div>
                <p style={{ fontSize: '1.1rem', color: 'var(--cyber-text-dim)', margin: 0 }}>
                  // Esta plataforma no tiene videojuegos asociados
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Metadatos */}
        {plataforma.created_at && (
          <div className="cyber-card" style={{
            marginTop: '2rem',
            padding: '1rem 1.5rem',
            background: 'rgba(10, 14, 39, 0.8)',
            borderColor: 'rgba(255, 0, 110, 0.2)',
            fontSize: '0.85rem',
            color: 'var(--cyber-text-dim)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <span>
              <span style={{ color: 'var(--cyber-magenta)' }}>// CREADO:</span>{' '}
              {new Date(plataforma.created_at).toLocaleDateString('es-ES')}
            </span>
            {plataforma.updated_at && (
              <span>
                <span style={{ color: 'var(--cyber-magenta)' }}>// ACTUALIZADO:</span>{' '}
                {new Date(plataforma.updated_at).toLocaleDateString('es-ES')}
              </span>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default PlataformaDetail;