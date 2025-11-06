import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import api from '../../services/api';
import { getValidationErrors } from '../../services/auth';

function PlataformaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    nombre: '',
    fabricante: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      loadPlataforma();
    }
  }, [id]);

  const loadPlataforma = async () => {
    try {
      setLoading(true);
      
      const response = await api.get(`/plataformas/${id}`);
      const plataforma = response.data.data;
      
      setFormData({
        nombre: plataforma.nombre,
        fabricante: plataforma.fabricante
      });
      
    } catch (error) {
      console.error('Error al cargar plataforma:', error);
      alert('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      if (isEditMode) {
        await api.put(`/plataformas/${id}`, formData);
        alert('✅ Plataforma actualizada exitosamente');
      } else {
        await api.post('/plataformas', formData);
        alert('✅ Plataforma creada exitosamente');
      }
      
      navigate('/plataformas');
      
    } catch (error) {
      console.error('Error al guardar:', error);
      const validationErrors = getValidationErrors(error);
      setErrors(validationErrors);
      
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Cargando datos de la plataforma..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cyber-fade-in" style={{ padding: '2rem' }}>
        
        {/* ENCABEZADO */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 20px var(--cyber-magenta))'
          }}>
            {isEditMode ? '✏️' : '➕'}
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            background: 'linear-gradient(45deg, var(--cyber-magenta), var(--cyber-yellow))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            {isEditMode ? 'EDITAR PLATAFORMA' : 'CREAR PLATAFORMA'}
          </h1>
          
          <p style={{
            color: 'var(--cyber-text-dim)',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            {isEditMode 
              ? '// Modificar Hardware' 
              : '// Agregar Nuevo Hardware'
            }
          </p>

          <div className="cyber-divider" style={{ margin: '2rem auto', maxWidth: '400px' }} />
        </div>

        {/* TARJETA DEL FORMULARIO */}
        <div className="cyber-card" style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '3rem',
          borderColor: 'var(--cyber-magenta)',
          background: 'rgba(26, 31, 58, 0.8)'
        }}>
          
          {errors.length > 0 && (
            <div className="cyber-alert error" style={{ marginBottom: '2rem' }}>
              <strong>⚠️ ERRORES DE VALIDACIÓN:</strong>
              <ul style={{
                margin: '0.5rem 0 0 0',
                paddingLeft: '1.5rem',
                listStyle: 'none'
              }}>
                {errors.map((error, index) => (
                  <li key={index} style={{ marginTop: '0.5rem' }}>
                    <span style={{ marginRight: '0.5rem' }}>▸</span>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* CAMPO: Nombre */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: 'var(--cyber-magenta)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🕹️</span>
                // NOMBRE <span style={{ color: 'var(--cyber-cyan)' }}>*</span>
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="PlayStation 5"
                value={formData.nombre}
                onChange={handleChange}
                required
                maxLength={100}
                disabled={submitting}
                className="cyber-input"
              />
              <small style={{ 
                display: 'block',
                marginTop: '0.5rem',
                color: 'var(--cyber-text-dim)', 
                fontSize: '0.8rem',
                letterSpacing: '1px'
              }}>
                MAX 100 CARACTERES
              </small>
            </div>

            {/* CAMPO: Fabricante */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: 'var(--cyber-magenta)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🏭</span>
                // FABRICANTE <span style={{ color: 'var(--cyber-cyan)' }}>*</span>
              </label>
              <input
                type="text"
                name="fabricante"
                placeholder="Sony"
                value={formData.fabricante}
                onChange={handleChange}
                required
                maxLength={100}
                disabled={submitting}
                className="cyber-input"
              />
              <small style={{ 
                display: 'block',
                marginTop: '0.5rem',
                color: 'var(--cyber-text-dim)', 
                fontSize: '0.8rem',
                letterSpacing: '1px'
              }}>
                MAX 100 CARACTERES
              </small>
            </div>

            <div className="cyber-divider" style={{ margin: '2.5rem 0' }} />

            {/* BOTONES */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                type="button"
                onClick={() => navigate('/plataformas')}
                disabled={submitting}
                className="cyber-button"
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '1rem',
                  borderColor: 'var(--cyber-text-dim)',
                  color: 'var(--cyber-text-dim)',
                  opacity: submitting ? 0.5 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                ❌ CANCELAR
              </button>
              
              <button
                type="submit"
                disabled={submitting}
                className="cyber-button magenta"
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '1rem',
                  opacity: submitting ? 0.6 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? (
                  <span className="cyber-loading">⟳ PROCESANDO...</span>
                ) : (
                  <>
                    {isEditMode ? '💾 ACTUALIZAR' : '✅ CREAR'}
                  </>
                )}
              </button>
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(255, 0, 110, 0.05)',
              border: '1px solid rgba(255, 0, 110, 0.2)',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: 'var(--cyber-text-dim)',
              textAlign: 'center'
            }}>
              <span style={{ color: 'var(--cyber-magenta)' }}>💡</span> Los campos marcados con{' '}
              <span style={{ color: 'var(--cyber-cyan)' }}>*</span> son obligatorios
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default PlataformaForm;