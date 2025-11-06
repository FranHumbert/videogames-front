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

  // FUNCIÓN: Obtener plataformas
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

  // FUNCIÓN: Eliminar plataforma
  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${nombre}"?`)) {
      return;
    }

    try {
      await api.delete(`/plataformas/${id}`);
      
      // Filtrar del estado local
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
      <div>
        {/* ENCABEZADO */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem'
            }}>
              🕹️ Plataformas
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1.1rem'
            }}>
              Total: <strong>{plataformas.length}</strong> plataformas registradas
            </p>
          </div>

          {/* Botón Crear (solo admin) */}
          {isAdmin && (
            <button
              onClick={() => navigate('/plataformas/crear')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#7b1fa2',
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
                e.target.style.backgroundColor = '#6a1b9a';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#7b1fa2';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              ➕ Crear Nueva Plataforma
            </button>
          )}
        </div>

        {/* CONTENIDO: Lista vacía o con datos */}
        {plataformas.length === 0 ? (
          <EmptyState
            icon="🕹️"
            message="No hay plataformas registradas"
            actionText={isAdmin ? "Crear la primera" : undefined}
            onAction={isAdmin ? () => navigate('/plataformas/crear') : undefined}
          />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Mapear plataformas */}
            {plataformas.map(plataforma => (
              <div
                key={plataforma.id}
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
                {/* Contenido */}
                <div style={{ padding: '1.5rem', flex: 1 }}>
                  {/* Nombre */}
                  <h2 style={{
                    fontSize: '1.4rem',
                    marginBottom: '0.5rem',
                    color: '#7b1fa2'
                  }}>
                    {plataforma.nombre}
                  </h2>
                  
                  {/* Fabricante */}
                  <p style={{
                    color: '#666',
                    marginBottom: '1rem',
                    fontSize: '1.1rem'
                  }}>
                    🏭 {plataforma.fabricante}
                  </p>

                  {/* Cantidad de videojuegos */}
                  {plataforma.videojuegos_count !== undefined && (
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: '#f3e5f5',
                      borderRadius: '6px',
                      textAlign: 'center'
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#666'
                      }}>
                        Videojuegos disponibles
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        color: '#7b1fa2'
                      }}>
                        {plataforma.videojuegos_count}
                      </p>
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  gap: '0.5rem',
                  borderTop: '1px solid #eee'
                }}>
                  {/* Botón Ver */}
                  <Link
                    to={`/plataformas/${plataforma.id}`}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      backgroundColor: '#7b1fa2',
                      color: 'white',
                      textAlign: 'center',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#6a1b9a'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#7b1fa2'}
                  >
                    👁️ Ver
                  </Link>

                  {/* Botones Admin */}
                  {isAdmin && (
                    <>
                      <Link
                        to={`/plataformas/${plataforma.id}/editar`}
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
                      
                      <button
                        onClick={() => handleDelete(plataforma.id, plataforma.nombre)}
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

export default PlataformasList;