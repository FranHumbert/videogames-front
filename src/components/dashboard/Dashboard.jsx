import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
function Dashboard() {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    videojuegos: 0,
    plataformas: 0
  });
  
  const [recientes, setRecientes] = useState([]);
  
  const [popular, setPopular] = useState(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  // FUNCIÓN: Cargar datos del dashboard
  const loadDashboardData = async () => {
    try {
      // PETICIONES EN PARALELO
      const [
        videojuegosRes,    // Respuesta de GET /videojuegos
        plataformasRes,    // Respuesta de GET /plataformas
        recientesRes,      // Respuesta de GET /videojuegos/recientes
        popularRes         // Respuesta de GET /plataformas/mas-popular
      ] = await Promise.all([
        api.get('/videojuegos'),
        api.get('/plataformas'),
        api.get('/videojuegos/recientes'),
        api.get('/plataformas/mas-popular')
      ]);
      
      setStats({
        videojuegos: videojuegosRes.data.data.length,
        
        plataformas: plataformasRes.data.data.length
      });
      
      // Guardar videojuegos recientes
      setRecientes(recientesRes.data.data);
      // Ya vienen solo 3 del endpoint /recientes
      
      // Guardar plataforma popular
      setPopular(popularRes.data.data);
      
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
      
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Cargando dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* ENCABEZADO: Saludo personalizado */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem'
          }}>
            👋 Bienvenido, {user?.name || 'Usuario'}!
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1.2rem'
          }}>
            Dashboard de Gestión de Videojuegos y Plataformas
          </p>
        </div>

        {/* SECCIÓN: Estadísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* TARJETA: Videojuegos */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '3px solid #e3f2fd',
            // Transición suave al hacer hover
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          // Efecto hover: Elevar tarjeta
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          >
            {/* Icono */}
            <div style={{
              fontSize: '4rem',
              marginBottom: '0.5rem'
            }}>
              🎮
            </div>
            
            {/* Número (estadística) */}
            <h2 style={{
              fontSize: '3rem',
              margin: '0.5rem 0',
              color: '#1976d2'
            }}>
              {stats.videojuegos}
            </h2>
            
            {/* Descripción */}
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              Videojuegos Registrados
            </p>
            
            {/* Botón/Link */}
            <Link
              to="/videojuegos"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#1976d2',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1565c0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1976d2'}
            >
              Ver Todos →
            </Link>
          </div>

          {/* TARJETA: Plataformas */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '3px solid #f3e5f5',
            transition: 'transform 0.2s, box-shadow 0.2s'
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
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
              🕹️
            </div>
            <h2 style={{
              fontSize: '3rem',
              margin: '0.5rem 0',
              color: '#7b1fa2'
            }}>
              {stats.plataformas}
            </h2>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              Plataformas Disponibles
            </p>
            <Link
              to="/plataformas"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#7b1fa2',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6a1b9a'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#7b1fa2'}
            >
              Ver Todas →
            </Link>
          </div>
        </div>

        {/* SECCIÓN: Videojuegos Recientes */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem'
          }}>
            🆕 Últimos Videojuegos Agregados
          </h2>
          
          {/* Grid de tarjetas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {recientes.map(game => (
              <Link
                key={game.id}
                to={`/videojuegos/${game.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  height: '100%'
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
                  {/* Título del juego */}
                  <h3 style={{
                    marginBottom: '0.5rem',
                    fontSize: '1.3rem'
                  }}>
                    {game.titulo}
                  </h3>
                  
                  {/* Género y año */}
                  <p style={{
                    color: '#666',
                    marginBottom: '1rem'
                  }}>
                    <strong>{game.genero}</strong>
                    {' • '}
                    {new Date(game.anio_lanzamiento).getFullYear()}
                  </p>
                  
                  {/* Plataformas (badges) */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {game.plataformas?.slice(0, 3).map(plat => (
                      <span
                        key={plat.id}
                        style={{
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {plat.nombre}
                      </span>
                    ))}
                    
                    {game.plataformas?.length > 3 && (
                      <span style={{
                        color: '#666',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.85rem'
                      }}>
                        +{game.plataformas.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* SECCIÓN: Plataforma Más Popular */}
        {popular && (
          <div style={{
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '3px solid #fff3e0'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1rem',
              color: '#333'
            }}>
              🏆 Plataforma Más Popular
            </h2>
            
            {/* Icono grande */}
            <div style={{
              fontSize: '5rem',
              marginBottom: '1rem'
            }}>
              🕹️
            </div>
            
            {/* Nombre de la plataforma */}
            <h3 style={{
              fontSize: '2.5rem',
              marginBottom: '0.5rem',
              color: '#f57c00'
            }}>
              {popular.nombre}
            </h3>
            
            {/* Fabricante */}
            <p style={{
              color: '#666',
              fontSize: '1.3rem',
              marginBottom: '1rem'
            }}>
              {popular.fabricante}
            </p>
            
            {/* Cantidad de videojuegos */}
            <div style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: '#fff3e0',
              borderRadius: '12px',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#f57c00',
                margin: 0
              }}>
                {popular.videojuegos_count} videojuegos
              </p>
            </div>
            
            {/* Botón para ver detalles */}
            <br />
            <Link
              to={`/plataformas/${popular.id}`}
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: '#ff9800',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f57c00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ff9800'}
            >
              Ver Detalles Completos
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;