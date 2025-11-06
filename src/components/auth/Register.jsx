import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { getValidationErrors } from '../../services/auth';

function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
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
      await api.post('/auth/register', formData);
      alert('✅ Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('Error en registro:', error);
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
      
      {/* Elementos decorativos */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(255,190,11,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(70px)',
        animation: 'pulse 6s infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(131,56,236,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'pulse 5s infinite'
      }} />

      {/* Contenedor del formulario */}
      <div className="cyber-card" style={{
        width: '100%',
        maxWidth: '500px',
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
            filter: 'drop-shadow(0 0 20px var(--cyber-magenta))'
          }}>
            🔐
          </div>
          
          <h1 className="cyber-title" style={{
            fontSize: '2rem',
            marginBottom: '0.5rem',
            background: 'linear-gradient(45deg, var(--cyber-magenta), var(--cyber-yellow))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            REGISTRO
          </h1>
          
          <p style={{
            color: 'var(--cyber-text-dim)',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            // Solicitar Acceso al Sistema
          </p>
        </div>

        <div className="cyber-divider" style={{ margin: '2rem 0' }} />

        {/* Errores */}
        {errors.length > 0 && (
          <div className="cyber-alert error" style={{ marginBottom: '1.5rem' }}>
            <strong>⚠️ ERRORES DE VALIDACIÓN:</strong>
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
          
          {/* Nombre */}
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
              // NOMBRE
            </label>
            <input
              type="text"
              name="name"
              placeholder="Usuario Friki"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="cyber-input"
            />
          </div>

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

          {/* Confirmar Password */}
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
              // CONFIRMAR PASSWORD
            </label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="••••••••"
              value={formData.password_confirmation}
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
            className="cyber-button magenta"
            style={{
              width: '100%',
              marginBottom: '1.5rem',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <span className="cyber-loading">⟳ PROCESANDO...</span>
            ) : (
              '▶ SOLICITAR ACCESO'
            )}
          </button>

          {/* Link a Login */}
          <div style={{
            textAlign: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 0, 110, 0.2)'
          }}>
            <p style={{
              color: 'var(--cyber-text-dim)',
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              ¿Ya tienes acceso?
            </p>
            <Link
              to="/login"
              style={{
                color: 'var(--cyber-cyan)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.textShadow = '0 0 10px var(--cyber-cyan)';
              }}
              onMouseLeave={(e) => {
                e.target.style.textShadow = 'none';
              }}
            >
              // INICIAR SESIÓN ▶
            </Link>
          </div>
        </form>

        {/* Info de seguridad */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(0, 243, 255, 0.05)',
          border: '1px solid rgba(0, 243, 255, 0.2)',
          clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
          fontSize: '0.8rem',
          color: 'var(--cyber-text-dim)',
          textAlign: 'center'
        }}>
          <span style={{ color: 'var(--cyber-cyan)' }}>🔒</span> Todos los datos están encriptados
        </div>
      </div>
    </div>
  );
}

export default Register;