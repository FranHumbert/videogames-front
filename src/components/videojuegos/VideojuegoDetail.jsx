import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function VideojuegoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const [videojuego, setVideojuego] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideojuego();
  }, [id]);

  const fetchVideojuego = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get(`/videojuegos/${id}`);
      setVideojuego(response.data.data);
      
    } catch (error) {
      console.error('Error al cargar videojuego:', error);
      
      if (error.response?.status === 404) {
        setError('Videojuego no encontrado');
      } else {
        setError('Error al cargar videojuego');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro de eliminar "${videojuego.titulo}"?`)) {
      return;
    }

    try {
      await api.delete(`/videojuegos/${id}`);
      alert('✅ Videojuego eliminado exitosamente');
      navigate('/videojuegos');
      
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
        <Loading message="Cargando detalles del videojuego..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage 
          message={error} 
          onRetry={fetchVideojuego}
        />
      </Layout>
    );
  }

  if (!videojuego) {
    return (
      <Layout>
        <EmptyState
          icon="❓"
          message="Videojuego no encontrado"
          actionText="VOLVER A LA LISTA"
          onAction={() => navigate('/videojuegos')}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cyber-fade-in" style={{ padding: '2rem' }}>
        
        {/* ============================================ */}
        {/* HEADER: Navegación */}
        {/* ============================================ */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Botón Volver */}
          <button
            onClick={() => navigate('/videojuegos')}
            className="cyber-button"
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.9rem'
            }}
          >
            ⬅️ VOLVER
          </button>

          {/* Botones Admin */}
          {isAdmin && (
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button
                onClick={() => navigate(`/videojuegos/${id}/editar`)}
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
                className="cyber-button magenta"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem'
                }}
              >
                🗑️ ELIMINAR
              </button>
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* TARJETA PRINCIPAL */}
        {/* ============================================ */}
        <div className="cyber-card" style={{
          borderColor: 'var(--cyber-cyan)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          
          {/* Header con fondo degradado */}
          <div style={{
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.2) 0%, rgba(26, 31, 58, 0.8) 100%)',
            borderBottom: '2px solid var(--cyber-cyan)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decoración de fondo */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '15rem',
              opacity: 0.05,
              pointerEvents: 'none'
            }}>
              🎮
            </div>

            {/* Icono */}
            <div style={{
              fontSize: '6rem',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 30px var(--cyber-cyan))',
              position: 'relative',
              zIndex: 1
            }}>
              🎮
            </div>
            
            {/* Título */}
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: 'var(--cyber-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '1rem',
              textShadow: '0 0 30px var(--cyber-cyan)',
              position: 'relative',
              zIndex: 1
            }}>
              {videojuego.titulo}
            </h1>
            
            {/* Badge de género */}
            <span className="cyber-badge" style={{
              borderColor: 'var(--cyber-magenta)',
              color: 'var(--cyber-magenta)',
              fontSize: '1.1rem',
              padding: '0.5rem 1.5rem',
              display: 'inline-block'
            }}>
              {videojuego.genero}
            </span>
          </div>

          {/* Cuerpo de la tarjeta */}
          <div style={{ padding: '2.5rem' }}>
            
            {/* Grid de información */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              
              {/* Fecha de Lanzamiento */}
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
                  📅 // FECHA DE LANZAMIENTO
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--cyber-cyan)',
                  margin: 0,
                  fontFamily: 'Orbitron, sans-serif'
                }}>
                  {new Date(videojuego.anio_lanzamiento).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Año */}
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
                  🗓️ // AÑO
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--cyber-magenta)',
                  margin: 0,
                  fontFamily: 'Orbitron, sans-serif'
                }}>
                  {new Date(videojuego.anio_lanzamiento).getFullYear()}
                </p>
              </div>

              {/* Género */}
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
                  🎯 // GÉNERO
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--cyber-yellow)',
                  margin: 0,
                  fontFamily: 'Orbitron, sans-serif'
                }}>
                  {videojuego.genero}
                </p>
              </div>
            </div>

            {/* Divisor */}
            <div className="cyber-divider" style={{ margin: '3rem 0' }} />

            {/* Sección: Plataformas */}
            {videojuego.plataformas && videojuego.plataformas.length > 0 ? (
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  marginBottom: '2rem',
                  color: 'var(--cyber-cyan)',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: '900'
                }}>
                  🕹️ PLATAFORMAS DISPONIBLES
                  <span style={{
                    marginLeft: '1rem',
                    fontSize: '1.2rem',
                    color: 'var(--cyber-text-dim)',
                    fontWeight: 'normal'
                  }}>
                    ({videojuego.plataformas.length})
                  </span>
                </h2>
                
                {/* Grid de plataformas */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {videojuego.plataformas.map(plataforma => (
                    <Link
                      key={plataforma.id}
                      to={`/plataformas/${plataforma.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                    >
                      <div className="cyber-card cyber-hover-lift" style={{
                        padding: '1.5rem',
                        textAlign: 'center',
                        background: 'rgba(0, 243, 255, 0.05)',
                        borderColor: 'var(--cyber-cyan)',
                        cursor: 'pointer'
                      }}>
                        <h3 style={{
                          fontSize: '1.2rem',
                          marginBottom: '0.5rem',
                          color: 'var(--cyber-cyan)',
                          fontWeight: 'bold'
                        }}>
                          {plataforma.nombre}
                        </h3>
                        
                        <p style={{
                          fontSize: '0.9rem',
                          color: 'var(--cyber-text-dim)',
                          margin: 0
                        }}>
                          🏭 {plataforma.fabricante}
                        </p>
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
                  // Este videojuego no tiene plataformas asociadas
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Metadatos */}
        {videojuego.created_at && (
          <div className="cyber-card" style={{
            marginTop: '2rem',
            padding: '1rem 1.5rem',
            background: 'rgba(10, 14, 39, 0.8)',
            borderColor: 'rgba(0, 243, 255, 0.2)',
            fontSize: '0.85rem',
            color: 'var(--cyber-text-dim)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <span>
              <span style={{ color: 'var(--cyber-cyan)' }}>// CREADO:</span>{' '}
              {new Date(videojuego.created_at).toLocaleDateString('es-ES')}
            </span>
            {videojuego.updated_at && (
              <span>
                <span style={{ color: 'var(--cyber-cyan)' }}>// ACTUALIZADO:</span>{' '}
                {new Date(videojuego.updated_at).toLocaleDateString('es-ES')}
              </span>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default VideojuegoDetail;