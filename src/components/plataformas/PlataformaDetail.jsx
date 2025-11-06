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

  // FUNCIÓN: Obtener plataforma
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

  // FUNCIÓN: Eliminar plataforma
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
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Plataforma no encontrada</p>
          <button onClick={() => navigate('/plataformas')}>
            Volver a la lista
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* HEADER: Navegación */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          {/* Botón Volver */}
          <button
            onClick={() => navigate('/plataformas')}
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

          {/* Botones Admin */}
          {isAdmin && (
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => navigate(`/plataformas/${id}/editar`)}
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

        {/* TARJETA PRINCIPAL */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          
          {/* Header de la tarjeta (morado) */}
          <div style={{
            padding: '2rem',
            backgroundColor: '#7b1fa2',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
              🕹️
            </div>
            
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem',
              margin: 0
            }}>
              {plataforma.nombre}
            </h1>
            
            <span style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              🏭 {plataforma.fabricante}
            </span>
          </div>

          {/* Cuerpo de la tarjeta */}
          <div style={{ padding: '2rem' }}>
            
            {/* SECCIÓN: Información General */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Campo: Nombre */}
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
                  🎮 Nombre
                </p>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  {plataforma.nombre}
                </p>
              </div>

              {/* Campo: Fabricante */}
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
                  🏭 Fabricante
                </p>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  {plataforma.fabricante}
                </p>
              </div>

              {/* Campo: Total de videojuegos */}
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
                  🎯 Total de Videojuegos
                </p>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  margin: 0,
                  color: '#7b1fa2'
                }}>
                  {plataforma.videojuegos?.length || 0}
                </p>
              </div>
            </div>

            {/* SECCIÓN: Videojuegos de esta plataforma */}
            {plataforma.videojuegos && plataforma.videojuegos.length > 0 ? (
              <div>
                <h2 style={{
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  🎮 Videojuegos Disponibles
                  <span style={{
                    marginLeft: '0.5rem',
                    fontSize: '1.2rem',
                    color: '#666',
                    fontWeight: 'normal'
                  }}>
                    ({plataforma.videojuegos.length})
                  </span>
                </h2>
                
                {/* Grid de videojuegos */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1rem'
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
                      <div style={{
                        padding: '1.25rem',
                        backgroundColor: '#f3e5f5',
                        borderRadius: '8px',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        border: '2px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e1bee7';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = '#7b1fa2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3e5f5';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                      >
                        {/* Título */}
                        <h3 style={{
                          fontSize: '1.15rem',
                          marginBottom: '0.5rem',
                          color: '#7b1fa2'
                        }}>
                          {videojuego.titulo}
                        </h3>
                        
                        {/* Género y Año */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            backgroundColor: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px'
                          }}>
                            {videojuego.genero}
                          </span>
                          
                          <span style={{
                            fontSize: '0.9rem',
                            color: '#666'
                          }}>
                            {new Date(videojuego.anio_lanzamiento).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              // Mensaje si no tiene videojuegos
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                color: '#666'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  📭
                </div>
                <p style={{ fontSize: '1.2rem', margin: 0 }}>
                  Esta plataforma no tiene videojuegos asociados aún
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Metadatos (opcional) */}
        {plataforma.created_at && (
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
              {new Date(plataforma.created_at).toLocaleDateString('es-ES')}
            </span>
            {plataforma.updated_at && (
              <span>
                <strong>Actualizado:</strong>{' '}
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