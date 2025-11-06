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

  // FUNCIÓN: Obtener videojuego
  const fetchVideojuego = async () => {
    try {
      setLoading(true);
      setError('');
      
      // GET /api/v1/videojuegos/:id
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

  // FUNCIÓN: Eliminar videojuego
  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro de eliminar "${videojuego.titulo}"?`)) {
      return;
    }

    try {
      // DELETE /api/v1/videojuegos/:id
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
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Videojuego no encontrado</p>
          <button onClick={() => navigate('/videojuegos')}>
            Volver a la lista
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* HEADER: Botones de navegación */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          {/* Botón Volver */}
          <button
            onClick={() => navigate('/videojuegos')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ⬅️ Volver a la lista
          </button>

          {/* Botones de Admin (solo si es admin) */}
          {isAdmin && (
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              {/* Botón Editar */}
              <button
                onClick={() => navigate(`/videojuegos/${id}/editar`)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                ✏️ Editar
              </button>
              
              {/* Botón Eliminar */}
              <button
                onClick={handleDelete}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                🗑️ Eliminar
              </button>
            </div>
          )}
        </div>

        {/* TARJETA PRINCIPAL: Detalles del videojuego */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          
          {/* HEADER DE LA TARJETA */}
          <div style={{
            padding: '2rem',
            backgroundColor: '#1976d2',
            color: 'white',
            textAlign: 'center'
          }}>
            {/* Icono grande */}
            <div style={{
              fontSize: '5rem',
              marginBottom: '1rem'
            }}>
              🎮
            </div>
            
            {/* Título del videojuego */}
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem',
              margin: 0
            }}>
              {videojuego.titulo}
            </h1>
            
            {/* Badge de género */}
            <span style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              {videojuego.genero}
            </span>
          </div>

          {/* CUERPO DE LA TARJETA: Información */}
          <div style={{
            padding: '2rem'
          }}>
            
            {/* SECCIÓN: Información General */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              
              {/* Campo: Fecha de Lanzamiento */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <p style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  📅 Fecha de Lanzamiento
                </p>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  {new Date(videojuego.anio_lanzamiento).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Campo: Año */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <p style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  🗓️ Año
                </p>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  {new Date(videojuego.anio_lanzamiento).getFullYear()}
                </p>
              </div>

              {/* Campo: Género */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <p style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  🎯 Género
                </p>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  {videojuego.genero}
                </p>
              </div>
            </div>

            {/* SECCIÓN: Plataformas */}
            {videojuego.plataformas && videojuego.plataformas.length > 0 && (
              <div>
                <h2 style={{
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  🕹️ Plataformas Disponibles
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '1.2rem',
                    color: '#666',
                    fontWeight: 'normal'
                  }}>
                    ({videojuego.plataformas.length})
                  </span>
                </h2>
                
                {/* Grid de plataformas */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  {/* Mapear cada plataforma a una tarjeta */}
                  {videojuego.plataformas.map(plataforma => (
                    <Link
                      key={plataforma.id}
                      to={`/plataformas/${plataforma.id}`}
                      /**
                       * Link a la página de detalle de la plataforma
                       * 
                       * Usuario puede hacer click para ver más info
                       * de esa plataforma específica
                       */
                      style={{
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                    >
                      <div style={{
                        padding: '1rem',
                        backgroundColor: '#e3f2fd',
                        borderRadius: '8px',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        border: '2px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#bbdefb';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = '#1976d2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#e3f2fd';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                      >
                        {/* Nombre de la plataforma */}
                        <h3 style={{
                          fontSize: '1.1rem',
                          marginBottom: '0.5rem',
                          color: '#1976d2'
                        }}>
                          {plataforma.nombre}
                        </h3>
                        
                        {/* Fabricante */}
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#666',
                          margin: 0
                        }}>
                          {plataforma.fabricante}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Mensaje si no tiene plataformas */}
            {(!videojuego.plataformas || videojuego.plataformas.length === 0) && (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                color: '#666'
              }}>
                <p style={{ fontSize: '1.1rem' }}>
                  Este videojuego no tiene plataformas asociadas
                </p>
              </div>
            )}
          </div>
        </div>

        {videojuego.created_at && (
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            fontSize: '0.9rem',
            color: '#666',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <span>
              <strong>Creado:</strong>{' '}
              {new Date(videojuego.created_at).toLocaleDateString('es-ES')}
            </span>
            {videojuego.updated_at && (
              <span>
                <strong>Actualizado:</strong>{' '}
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