import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
 
  const navigate = useNavigate();
  
  const { login } = useAuth();
 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Por defecto, los formularios recargan la página al enviar
    // preventDefault() previene eso
    setError('');
    // Si había un error previo, limpiarlo antes de intentar de nuevo
    setLoading(true);
    // Esto deshabilita el formulario y cambia el botón a "Cargando..."

    try {
      await login(formData.email, formData.password);

      navigate('/');
      
    } catch (error) {
      
      // Si el login falla, entra aquí
      console.error('Error en login:', error);
      
      if (error.response?.status === 401) {
        setError('Email o contraseña incorrectos');
      } else if (error.response?.status === 422) {
        setError('Por favor verifica los datos ingresados');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
      
    } finally {
      // finally: Se ejecuta SIEMPRE (haya error o no)
      setLoading(false);
      // Rehabilita el formulario
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      
      {/* TARJETA DEL FORMULARIO */}
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '0.5rem'
          }}>
            🎮
          </div>
          
          {/* Título */}
          <h1 style={{ marginBottom: '0.5rem' }}>
            Videogames API
          </h1>
          
          {/* Subtítulo */}
          <h2 style={{
            color: '#666',
            fontWeight: 'normal',
            fontSize: '1.2rem'
          }}>
            Iniciar Sesión
          </h2>
        </div>

        {/* ALERTA DE ERROR (Condicional) */}
        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c00',
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            border: '1px solid #fcc'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit}>
          
          {/* INPUT: Email */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Email
            </label>
            
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* INPUT: Password */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Contraseña
            </label>
            
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* BOTÓN SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginBottom: '1rem'
            }}
          >
            {loading ? '⏳ Cargando...' : '🚀 Entrar'}
          </button>
          
          {/* LINK A REGISTRO */}
          <p style={{ textAlign: 'center', margin: 0 }}>
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              style={{
                color: '#1976d2',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              Regístrate
            </Link>
          </p>
        </form>

        {/* INFO DE USUARIOS DE PRUEBA */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          <p style={{
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            👤 Usuarios de prueba:
          </p>
          <p style={{ marginBottom: '0.25rem' }}>
            <strong>Admin:</strong> admin@example.com / password
          </p>
          <p style={{ margin: 0 }}>
            <strong>User:</strong> user@example.com / password
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;