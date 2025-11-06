import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { getValidationErrors } from '../../services/auth';

function Register() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  
  const [errors, setErrors] = useState([]);
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validatePasswords = () => {
    if (formData.password !== formData.password_confirmation) {
      setErrors(['Las contraseñas no coinciden']);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrors([]);
    
    if (!validatePasswords()) {
      return;
    }
    
    setLoading(true);

    try {
      await api.post('/register', formData);
      
      alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      
      // Redirigir al login
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
        
        {/* ENCABEZADO */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
            🎮
          </div>
          <h1 style={{ marginBottom: '0.5rem' }}>
            Crear Cuenta
          </h1>
          <h2 style={{
            color: '#666',
            fontWeight: 'normal',
            fontSize: '1.2rem'
          }}>
            Registro
          </h2>
        </div>

        {/* LISTA DE ERRORES (Condicional) */}
        {errors.length > 0 && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c00',
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            border: '1px solid #fcc'
          }}>
            <strong>⚠️ Errores:</strong>
            <ul style={{
              margin: '0.5rem 0 0 0',
              paddingLeft: '1.5rem'
            }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit}>
          
          {/* INPUT: Nombre */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              placeholder="Juan Pérez"
              value={formData.name}
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
              placeholder="email@ejemplo.com"
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

          {/* INPUT: Contraseña */}
          <div style={{ marginBottom: '1rem' }}>
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
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
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

          {/* INPUT: Confirmar Contraseña */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Repite la contraseña"
              value={formData.password_confirmation}
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
            {loading ? '⏳ Registrando...' : '📝 Registrarse'}
          </button>

          {/* LINK A LOGIN */}
          <p style={{ textAlign: 'center', margin: 0 }}>
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              style={{
                color: '#1976d2',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;