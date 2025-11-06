import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import api from '../../services/api';
import { getValidationErrors } from '../../services/auth';

function VideojuegoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    titulo: '',
    anio_lanzamiento: '',
    genero: '',
    plataformas: []
  });
  
  const [plataformas, setPlataformas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, [id]);
  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      const plataformasRes = await api.get('/plataformas');
      setPlataformas(plataformasRes.data.data);
      
      if (isEditMode) {
        const videojuegoRes = await api.get(`/videojuegos/${id}`);
        const videojuego = videojuegoRes.data.data;
        
        // Extraer solo los IDs de las plataformas
        const plataformaIds = videojuego.plataformas.map(p => p.id);
        
        // Poblar el formulario con datos existentes
        setFormData({
          titulo: videojuego.titulo,
          anio_lanzamiento: videojuego.anio_lanzamiento,
          genero: videojuego.genero,
          plataformas: plataformaIds
        });
      }
      
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
      alert('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  // FUNCIÓN: Manejar cambios en inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
  };

  const handlePlataformaToggle = (plataformaId) => {
    setFormData(prev => {
      
      // Verificar si la plataforma ya está seleccionada
      const isSelected = prev.plataformas.includes(plataformaId);
      
      // Calcular nuevo array de plataformas
      const newPlataformas = isSelected
        ? prev.plataformas.filter(id => id !== plataformaId) // Quitar
        : [...prev.plataformas, plataformaId];               // Agregar
      
      return {
        ...prev,
        plataformas: newPlataformas
      };
    });
  };

  // FUNCIÓN: Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrors([]);
    
    setSubmitting(true);

    try {
      if (isEditMode) {
        // MODO EDITAR: PUT /videojuegos/:id
        await api.put(`/videojuegos/${id}`, formData);
        
        alert('✅ Videojuego actualizado exitosamente');
      } else {
        // MODO CREAR: POST /videojuegos
        await api.post('/videojuegos', formData);
        
        alert('✅ Videojuego creado exitosamente');
      }
      
      navigate('/videojuegos');
      
    } catch (error) {
      console.error('Error al guardar:', error);
      
      // Extraer errores de validación (422)
      const validationErrors = getValidationErrors(error);
      setErrors(validationErrors);
      
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message={
          isEditMode 
            ? "Cargando datos del videojuego..." 
            : "Cargando formulario..."
        } />
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
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {isEditMode ? '✏️ Editar Videojuego' : '➕ Crear Videojuego'}
            </h1>
            <p style={{ color: '#666' }}>
              {isEditMode 
                ? 'Modifica los datos del videojuego' 
                : 'Completa el formulario para agregar un nuevo videojuego'
              }
            </p>
          </div>
        </div>

        {/* TARJETA DEL FORMULARIO */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          
          {/* LISTA DE ERRORES */}
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

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit}>
            
            {/* CAMPO: Título */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Título <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="titulo"
                placeholder="The Legend of Zelda: Breath of the Wild"
                value={formData.titulo}
                onChange={handleChange}
                required
                maxLength={255}
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
                Máximo 255 caracteres
              </small>
            </div>

            {/* CAMPO: Género */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Género <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="genero"
                placeholder="Aventura, RPG, Acción..."
                value={formData.genero}
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

            {/* CAMPO: Fecha de Lanzamiento */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Fecha de Lanzamiento <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="date"
                name="anio_lanzamiento"
                value={formData.anio_lanzamiento}
                onChange={handleChange}
                required
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
            </div>

            {/* CAMPO: Plataformas (Checkboxes) */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '1rem',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                Plataformas
              </label>
              
              {/* Grid de checkboxes */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '6px'
              }}>
                {/* Mapear cada plataforma a un checkbox */}
                {plataformas.map(plataforma => (
                  <label
                    key={plataforma.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      backgroundColor: formData.plataformas.includes(plataforma.id) 
                        ? '#e3f2fd' 
                        : 'transparent',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!formData.plataformas.includes(plataforma.id)) {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!formData.plataformas.includes(plataforma.id)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={formData.plataformas.includes(plataforma.id)}
                      onChange={() => handlePlataformaToggle(plataforma.id)}
                      disabled={submitting}
                      style={{
                        cursor: 'pointer',
                        width: '18px',
                        height: '18px'
                      }}
                    />
                    
                    {/* Texto del checkbox */}
                    <span style={{ flex: 1 }}>
                      <strong>{plataforma.nombre}</strong>
                      <br />
                      <small style={{ color: '#666' }}>
                        {plataforma.fabricante}
                      </small>
                    </span>
                  </label>
                ))}
              </div>
              
              {/* Contador de plataformas seleccionadas */}
              <small style={{
                display: 'block',
                marginTop: '0.5rem',
                color: '#666',
                fontSize: '0.85rem'
              }}>
                {formData.plataformas.length} plataforma(s) seleccionada(s)
              </small>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              {/* Botón Cancelar */}
              <button
                type="button"
                onClick={() => navigate('/videojuegos')}
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
              
              {/* Botón Guardar */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#4CAF50',
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

export default VideojuegoForm;