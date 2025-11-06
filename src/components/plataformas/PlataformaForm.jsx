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

  // FUNCIÓN: Cargar plataforma (modo editar)
  const loadPlataforma = async () => {
    try {
      setLoading(true);
      
      const response = await api.get(`/plataformas/${id}`);
      const plataforma = response.data.data;
      
      // Poblar formulario
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

  // FUNCIÓN: Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // FUNCIÓN: Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      if (isEditMode) {
        // Actualizar
        await api.put(`/plataformas/${id}`, formData);
        alert('✅ Plataforma actualizada exitosamente');
      } else {
        // Crear
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
      <div>
        {/* Encabezado */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {isEditMode ? '✏️ Editar Plataforma' : '➕ Crear Plataforma'}
            </h1>
            <p style={{ color: '#666' }}>
              {isEditMode 
                ? 'Modifica los datos de la plataforma' 
                : 'Completa el formulario para agregar una nueva plataforma'
              }
            </p>
          </div>
        </div>

        {/* Tarjeta del formulario */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          
          {/* Lista de errores */}
          {errors.length > 0 && (
            <div style={{
              backgroundColor: '#fee',
              color: '#c00',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1.5rem',
              border: '1px solid #fcc'
            }}>
              <strong>⚠️ Errores de validación:</strong>
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

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            
            {/* Campo: Nombre */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Nombre de la Plataforma <span style={{ color: 'red' }}>*</span>
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
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
              <small style={{ color: '#666', fontSize: '0.85rem' }}>
                Máximo 100 caracteres
              </small>
            </div>

            {/* Campo: Fabricante */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Fabricante <span style={{ color: 'red' }}>*</span>
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
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
              <small style={{ color: '#666', fontSize: '0.85rem' }}>
                Máximo 100 caracteres
              </small>
            </div>

            {/* Botones */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              {/* Cancelar */}
              <button
                type="button"
                onClick={() => navigate('/plataformas')}
                disabled={submitting}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.6 : 1
                }}
              >
                ❌ Cancelar
              </button>
              
              {/* Guardar */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#7b1fa2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.6 : 1
                }}
              >
                {submitting 
                  ? '⏳ Guardando...' 
                  : isEditMode 
                    ? '💾 Actualizar' 
                    : '✅ Crear'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default PlataformaForm;