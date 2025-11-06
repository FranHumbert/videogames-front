import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [stats, setStats] = useState(null);
  const [videojuegosRecientes, setVideojuegosRecientes] = useState([]);
  const [plataformaMasPopular, setPlataformaMasPopular] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // ⭐ CREAR ABORT CONTROLLER para cancelar peticiones
    const abortController = new AbortController();
    
    loadDashboardData(abortController.signal);
    
    // ⭐ CLEANUP: Cancelar peticiones al desmontar
    return () => {
      abortController.abort();
    };
  }, []);

  const loadDashboardData = async (signal) => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Cargando dashboard...');
      
      // ⭐ PASAR signal a las peticiones
      const [videojuegosRes, videojuegosRecientesRes, plataformasRes, plataformaPopularRes] = await Promise.allSettled([
        api.get('/videojuegos', { signal }),
        api.get('/videojuegos/recientes', { signal }),
        api.get('/plataformas', { signal }),
        api.get('/plataformas/mas-popular', { signal })
      ]);
      
      // Si la petición fue cancelada, no hacer nada
      if (signal?.aborted) {
        console.log('⚠️ Peticiones canceladas');
        return;
      }
      
      // Procesar videojuegos
      let todosLosVideojuegos = [];
      if (videojuegosRes.status === 'fulfilled') {
        todosLosVideojuegos = videojuegosRes.value.data.data;
        console.log('✅ Videojuegos cargados:', todosLosVideojuegos.length);
      } else {
        console.error('❌ Error al cargar videojuegos:', videojuegosRes.reason?.message || videojuegosRes.reason);
      }
      
      // Procesar videojuegos recientes
      let videojuegosRecientes = [];
      if (videojuegosRecientesRes.status === 'fulfilled') {
        videojuegosRecientes = videojuegosRecientesRes.value.data.data;
        console.log('✅ Videojuegos recientes cargados:', videojuegosRecientes.length);
      } else {
        console.error('❌ Error al cargar videojuegos recientes:', videojuegosRecientesRes.reason?.message || videojuegosRecientesRes.reason);
      }
      
      // Procesar plataformas
      let todasLasPlataformas = [];
      if (plataformasRes.status === 'fulfilled') {
        todasLasPlataformas = plataformasRes.value.data.data;
        console.log('✅ Plataformas cargadas:', todasLasPlataformas.length);
      } else {
        console.error('❌ Error al cargar plataformas:', plataformasRes.reason?.message || plataformasRes.reason);
      }
      
      // Procesar plataforma popular
      let plataformaPopular = null;
      if (plataformaPopularRes.status === 'fulfilled') {
        plataformaPopular = plataformaPopularRes.value.data.data;
        console.log('✅ Plataforma popular cargada:', plataformaPopular?.nombre);
      } else {
        console.error('❌ Error al cargar plataforma popular:', plataformaPopularRes.reason?.message || plataformaPopularRes.reason);
      }
      
      // Calcular estadísticas
      const statsCalculadas = {
        total_videojuegos: todosLosVideojuegos.length,
        total_plataformas: todasLasPlataformas.length
      };
      
      // Actualizar estados
      setStats(statsCalculadas);
      setVideojuegosRecientes(videojuegosRecientes);
      setPlataformaMasPopular(plataformaPopular);
      
      console.log('✅ Dashboard cargado correctamente');
      
      // Si TODO falló, mostrar error
      if (videojuegosRes.status === 'rejected' && 
          videojuegosRecientesRes.status === 'rejected' && 
          plataformasRes.status === 'rejected' && 
          plataformaPopularRes.status === 'rejected') {
        throw new Error('No se pudo conectar con el servidor');
      }
      
    } catch (error) {
      // ⭐ IGNORAR errores de cancelación
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        console.log('⚠️ Carga cancelada');
        return;
      }
      
      console.error('❌ Error general en loadDashboardData:', error);
      setError('Error al cargar datos del dashboard. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Inicializando sistema..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage message={error} onRetry={() => loadDashboardData()} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cyber-fade-in" style={{ padding: '2rem' }}>
        
        {/* HEADER: Bienvenida */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            background: 'linear-gradient(45deg, var(--cyber-cyan), var(--cyber-magenta), var(--cyber-yellow))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(0, 243, 255, 0.5)',
            marginBottom: '1rem',
            animation: 'fadeIn 0.8s ease'
          }}>
            BIENVENIDO, {user?.name?.toUpperCase()}
          </h1>
          
          <p style={{
            color: 'var(--cyber-text-dim)',
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            animation: 'fadeIn 1s ease'
          }}>
            // Sistema de Gestión de Videojuegos
          </p>

          <div style={{
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--cyber-cyan), transparent)',
            margin: '1.5rem auto',
            boxShadow: '0 0 10px var(--cyber-cyan)'
          }} />
        </div>

        {/* SECCIÓN 1: TOTALES */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          
          {/* Total Videojuegos */}
          <div className="cyber-card cyber-hover-lift" style={{
            padding: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.1) 0%, rgba(26, 31, 58, 0.8) 100%)',
            borderColor: 'var(--cyber-cyan)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              fontSize: '8rem',
              opacity: 0.1,
              filter: 'blur(2px)'
            }}>
              🎮
            </div>
            
            <div style={{
              fontSize: '5rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 10px var(--cyber-cyan))'
            }}>
              🎮
            </div>
            
            <div style={{
              fontSize: '4rem',
              fontWeight: '900',
              color: 'var(--cyber-cyan)',
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 20px var(--cyber-cyan)',
              marginBottom: '0.5rem'
            }}>
              {stats?.total_videojuegos || 0}
            </div>
            
            <div style={{
              color: 'var(--cyber-text)',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 'bold'
            }}>
              // TOTAL VIDEOJUEGOS
            </div>

            <div style={{
              width: '60%',
              height: '3px',
              background: 'var(--cyber-cyan)',
              margin: '1rem auto 0',
              boxShadow: '0 0 10px var(--cyber-cyan)'
            }} />
          </div>

          {/* Total Plataformas */}
          <div className="cyber-card cyber-hover-lift" style={{
            padding: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(26, 31, 58, 0.8) 100%)',
            borderColor: 'var(--cyber-magenta)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              fontSize: '8rem',
              opacity: 0.1,
              filter: 'blur(2px)'
            }}>
              🕹️
            </div>
            
            <div style={{
              fontSize: '5rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 10px var(--cyber-magenta))'
            }}>
              🕹️
            </div>
            
            <div style={{
              fontSize: '4rem',
              fontWeight: '900',
              color: 'var(--cyber-magenta)',
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 20px var(--cyber-magenta)',
              marginBottom: '0.5rem'
            }}>
              {stats?.total_plataformas || 0}
            </div>
            
            <div style={{
              color: 'var(--cyber-text)',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 'bold'
            }}>
              // TOTAL PLATAFORMAS
            </div>

            <div style={{
              width: '60%',
              height: '3px',
              background: 'var(--cyber-magenta)',
              margin: '1rem auto 0',
              boxShadow: '0 0 10px var(--cyber-magenta)'
            }} />
          </div>
        </div>

        <div className="cyber-divider" style={{ margin: '3rem 0' }} />

        {/* SECCIÓN 2: VIDEOJUEGOS RECIENTES */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h2 className="cyber-subtitle">
              🎮 ÚLTIMOS VIDEOJUEGOS AÑADIDOS
            </h2>
            
            <button
              onClick={() => navigate('/videojuegos')}
              className="cyber-button"
              style={{
                padding: '0.5rem 1.5rem',
                fontSize: '0.9rem'
              }}
            >
              VER TODOS ▶
            </button>
          </div>

          {videojuegosRecientes.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {videojuegosRecientes.map(game => (
                <div
                  key={game.id}
                  className="cyber-card cyber-hover-lift"
                  onClick={() => navigate(`/videojuegos/${game.id}`)}
                  style={{
                    cursor: 'pointer',
                    padding: '1.5rem',
                    borderColor: 'var(--cyber-cyan)',
                    background: 'rgba(26, 31, 58, 0.6)'
                  }}
                >
                  <h3 style={{
                    fontSize: '1.3rem',
                    marginBottom: '0.75rem',
                    color: 'var(--cyber-cyan)',
                    fontWeight: 'bold'
                  }}>
                    {game.titulo}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap'
                  }}>
                    <span className="cyber-badge" style={{
                      borderColor: 'var(--cyber-magenta)',
                      color: 'var(--cyber-magenta)'
                    }}>
                      {game.genero}
                    </span>
                    
                    <span style={{
                      color: 'var(--cyber-text-dim)',
                      fontSize: '0.9rem'
                    }}>
                      📅 {new Date(game.anio_lanzamiento).getFullYear()}
                    </span>
                  </div>

                  {game.plataformas && game.plataformas.length > 0 && (
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      {game.plataformas.slice(0, 3).map(plat => (
                        <span
                          key={plat.id}
                          style={{
                            fontSize: '0.8rem',
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(0, 243, 255, 0.1)',
                            color: 'var(--cyber-cyan)',
                            border: '1px solid rgba(0, 243, 255, 0.3)'
                          }}
                        >
                          {plat.nombre}
                        </span>
                      ))}
                      {game.plataformas.length > 3 && (
                        <span style={{
                          fontSize: '0.8rem',
                          color: 'var(--cyber-text-dim)'
                        }}>
                          +{game.plataformas.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="cyber-card" style={{
              padding: '3rem',
              textAlign: 'center',
              borderColor: 'var(--cyber-text-dim)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>
                📭
              </div>
              <p style={{ color: 'var(--cyber-text-dim)', fontSize: '1.1rem' }}>
                No hay videojuegos recientes
              </p>
            </div>
          )}
        </div>

        <div className="cyber-divider" style={{ margin: '3rem 0' }} />

        {/* SECCIÓN 3: PLATAFORMA MÁS POPULAR */}
        <div>
          <h2 className="cyber-subtitle" style={{
            color: 'var(--cyber-yellow)',
            marginBottom: '2rem'
          }}>
            👑 PLATAFORMA MÁS POPULAR
          </h2>

          {plataformaMasPopular ? (
            <div 
              className="cyber-card cyber-hover-lift"
              onClick={() => navigate(`/plataformas/${plataformaMasPopular.id}`)}
              style={{
                padding: '2.5rem',
                background: 'linear-gradient(135deg, rgba(255, 190, 11, 0.1) 0%, rgba(26, 31, 58, 0.8) 100%)',
                borderColor: 'var(--cyber-yellow)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                fontSize: '12rem',
                opacity: 0.05
              }}>
                👑
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '2rem',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                
                <div style={{
                  fontSize: '6rem',
                  filter: 'drop-shadow(0 0 20px var(--cyber-yellow))'
                }}>
                  👑
                </div>

                <div>
                  <h3 style={{
                    fontSize: '2.5rem',
                    color: 'var(--cyber-yellow)',
                    fontWeight: '900',
                    marginBottom: '0.5rem',
                    fontFamily: 'Orbitron, sans-serif',
                    textShadow: '0 0 20px var(--cyber-yellow)'
                  }}>
                    {plataformaMasPopular.nombre}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      color: 'var(--cyber-text-dim)',
                      fontSize: '1.2rem'
                    }}>
                      🏭 {plataformaMasPopular.fabricante}
                    </span>
                  </div>

                  <span className="cyber-badge" style={{
                    borderColor: 'var(--cyber-yellow)',
                    color: 'var(--cyber-yellow)',
                    fontSize: '1rem',
                    padding: '0.5rem 1rem'
                  }}>
                    🎮 {plataformaMasPopular.videojuegos_count || 0} VIDEOJUEGOS DISPONIBLES
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/plataformas/${plataformaMasPopular.id}`);
                  }}
                  className="cyber-button yellow"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  VER DETALLES ▶
                </button>
              </div>
            </div>
          ) : (
            <div className="cyber-card" style={{
              padding: '3rem',
              textAlign: 'center',
              borderColor: 'var(--cyber-text-dim)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>
                📭
              </div>
              <p style={{ color: 'var(--cyber-text-dim)', fontSize: '1.1rem' }}>
                No hay datos de plataforma popular
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;