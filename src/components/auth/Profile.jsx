import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';

function Profile() {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Navbar />
      
      <div style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        
        {/* TARJETA DE PERFIL */}
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          
          {/* ENCABEZADO */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '5rem',
              marginBottom: '1rem'
            }}>
              👤
            </div>
            <h1 style={{ marginBottom: '0.5rem' }}>
              Mi Perfil
            </h1>
          </div>

          {/* INFORMACIÓN DEL USUARIO */}
          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            
            {/* CAMPO: Nombre */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px'
            }}>
              {/* Label */}
              <p style={{
                color: '#666',
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Nombre
              </p>
              {/* Valor */}
              <p style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                margin: 0
              }}>
                {user.name}
              </p>
            </div>

            {/* CAMPO: Email */}
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
                Email
              </p>
              <p style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                margin: 0
              }}>
                {user.email}
              </p>
            </div>

            {/* CAMPO: Rol */}
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
                Rol
              </p>
              <p style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                margin: 0
              }}>
                {user.role === 'admin' ? (
                  <span style={{
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    display: 'inline-block'
                  }}>
                    👑 ADMINISTRADOR
                  </span>
                ) : (
                  <span style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    display: 'inline-block'
                  }}>
                    👤 USUARIO
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;