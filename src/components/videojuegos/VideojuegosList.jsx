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

  // FUNCIÓN: Obtener videojuegos
  const fetchVideojuegos = async () => {
    try {
      setLoading(true);
      setError('');
      
      // GET /api/v1/videojuegos
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
      } else if (error.response?.status === 404) {
        alert('❌ Videojuego no encontrado');
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
      <div>
        {/* ENCABEZADO */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          {/* Título y contador */}
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem'
            }}>
              🎮 Videojuegos
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1.1rem'
            }}>
              Total: <strong>{videojuegos.length}</strong> videojuegos registrados
            </p>
          </div>

          {/* Botón Crear (solo admin) */}
          {isAdmin && (
            <button
              onClick={() => navigate('/videojuegos/crear')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#45a049';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#4CAF50';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              ➕ Crear Nuevo Videojuego
            </button>
          )}
        </div>

        {/* CONTENIDO: Lista vacía o con datos */}
        {videojuegos.length === 0 ? (
          <EmptyState
            icon="🎮"
            message="No hay videojuegos registrados"
            actionText={isAdmin ? "Crear el primero" : undefined}
            onAction={isAdmin ? () => navigate('/videojuegos/crear') : undefined}
          />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* MAPEAR: Cada videojuego a una tarjeta */}
            {videojuegos.map(game => (
              // TARJETA DE VIDEOJUEGO
              <div
                key={game.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                {/* CONTENIDO DE LA TARJETA */}
                <div style={{ padding: '1.5rem', flex: 1 }}>
                  {/* Header: Título + Género */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '1rem'
                  }}>
                    {/* Título */}
                    <h2 style={{
                      fontSize: '1.4rem',
                      margin: 0,
                      flex: 1
                    }}>
                      {game.titulo}
                    </h2>
                    
                    {/* Badge de género */}
                    <span style={{
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      marginLeft: '0.5rem',
                      whiteSpace: 'nowrap'
                    }}>
                      {game.genero}
                    </span>
                  </div>

                  {/* Año de lanzamiento */}
                  <p style={{
                    color: '#666',
                    marginBottom: '1rem'
                  }}>
                    📅 {new Date(game.anio_lanzamiento).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>

                  {/* Plataformas */}
                  {game.plataformas && game.plataformas.length > 0 && (
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold'
                      }}>
                        Plataformas:
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
                              backgroundColor: '#f5f5f5',
                              padding: '0.25rem 0.6rem',
                              borderRadius: '6px',
                              fontSize: '0.8rem',
                              color: '#555'
                            }}
                          >
                            {plat.nombre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ACCIONES (Footer de la tarjeta) */}
                <div style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  gap: '0.5rem',
                  borderTop: '1px solid #eee'
                }}>
                  {/* Botón Ver */}
                  <Link
                    to={`/videojuegos/${game.id}`}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      textAlign: 'center',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#1976d2'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
                  >
                    👁️ Ver
                  </Link>

                  {/* Botones Admin (solo si es admin) */}
                  {isAdmin && (
                    <>
                      {/* Botón Editar */}
                      <Link
                        to={`/videojuegos/${game.id}/editar`}
                        style={{
                          flex: 1,
                          padding: '0.6rem',
                          backgroundColor: '#FF9800',
                          color: 'white',
                          textAlign: 'center',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f57c00'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9800'}
                      >
                        ✏️ Editar
                      </Link>
                      
                      {/* Botón Eliminar */}
                      <button
                        onClick={() => handleDelete(game.id, game.titulo)}
                        style={{
                          flex: 1,
                          padding: '0.6rem',
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
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