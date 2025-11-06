import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getValidationErrors } from '../../services/auth';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      console.error('Error en login:', error);
      const validationErrors = getValidationErrors(error);
      setErrors(validationErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Elementos decorativos de fondo */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0,243,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 4s infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,0,110,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'pulse 5s infinite'
      }} />

      {/* Contenedor del formulario */}
      <div className="cyber-card" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '3rem',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeIn 0.5s ease'
      }}>
        
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 20px var(--cyber-cyan))'
          }}>
            ⚡
          </div>
          
          <h1 className="cyber-title" style={{
            fontSize: '2rem',
            marginBottom: '0.5rem'
          }}>
            GAMESHUB
          </h1>
          
          <p style={{
            color: 'var(--cyber-text-dim)',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            // Sistema de Gestión de Videojuegos
          </p>
        </div>

        {/* Divisor */}
        <div className="cyber-divider" style={{ margin: '2rem 0' }} />

        {/* Errores */}
        {errors.length > 0 && (
          <div className="cyber-alert error" style={{ marginBottom: '1.5rem' }}>
            <strong>⚠️ ERROR DE ACCESO:</strong>
            <ul style={{
              margin: '0.5rem 0 0 0',
              paddingLeft: '1.5rem',
              listStyle: 'none'
            }}>
              {errors.map((error, index) => (
                <li key={index} style={{ marginTop: '0.25rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>▸</span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--cyber-cyan)',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              // EMAIL
            </label>
            <input
              type="email"
              name="email"
              placeholder="friki@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="cyber-input"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--cyber-cyan)',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              // PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="cyber-input"
            />
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={loading}
            className="cyber-button"
            style={{
              width: '100%',
              marginBottom: '1.5rem',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <span className="cyber-loading">⟳ ACCEDIENDO...</span>
            ) : (
              '▶ INICIAR SESIÓN'
            )}
          </button>

          {/* Link a Register */}
          <div style={{
            textAlign: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(0, 243, 255, 0.2)'
          }}>
            <p style={{
              color: 'var(--cyber-text-dim)',
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              ¿No tienes acceso al sistema?
            </p>
            <Link
              to="/register"
              style={{
                color: 'var(--cyber-magenta)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.textShadow = '0 0 10px var(--cyber-magenta)';
              }}
              onMouseLeave={(e) => {
                e.target.style.textShadow = 'none';
              }}
            >
              // REGISTRARSE ▶
            </Link>
          </div>
        </form>

        {/* Badges decorativos */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          <span className="cyber-badge" style={{
            borderColor: 'var(--cyber-cyan)',
            color: 'var(--cyber-cyan)',
            fontSize: '0.7rem'
          }}>
            SECURE
          </span>
          <span className="cyber-badge" style={{
            borderColor: 'var(--cyber-green)',
            color: 'var(--cyber-green)',
            fontSize: '0.7rem'
          }}>
            ENCRYPTED
          </span>
          <span className="cyber-badge" style={{
            borderColor: 'var(--cyber-magenta)',
            color: 'var(--cyber-magenta)',
            fontSize: '0.7rem'
          }}>
            VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;