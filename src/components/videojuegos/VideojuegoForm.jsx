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
        
        const plataformaIds = videojuego.plataformas.map(p => p.id);
        
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePlataformaToggle = (plataformaId) => {
    setFormData(prev => {
      const isSelected = prev.plataformas.includes(plataformaId);
      const newPlataformas = isSelected
        ? prev.plataformas.filter(id => id !== plataformaId)
        : [...prev.plataformas, plataformaId];
      
      return {
        ...prev,
        plataformas: newPlataformas
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      if (isEditMode) {
        await api.put(`/videojuegos/${id}`, formData);
        alert('✅ Videojuego actualizado exitosamente');
      } else {
        await api.post('/videojuegos', formData);
        alert('✅ Videojuego creado exitosamente');
      }
      
      navigate('/videojuegos');
      
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
      <div className="cyber-fade-in" style={{ padding: '2rem' }}>
        
        {/* ============================================ */}
        {/* ENCABEZADO */}
        {/* ============================================ */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 20px var(--cyber-cyan))'
          }}>
            {isEditMode ? '✏️' : '➕'}
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            background: 'linear-gradient(45deg, var(--cyber-cyan), var(--cyber-magenta))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            {isEditMode ? 'EDITAR VIDEOJUEGO' : 'CREAR VIDEOJUEGO'}
          </h1>
          
          <p style={{
            color: 'var(--cyber-text-dim)',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            {isEditMode 
              ? '// Modificar Datos del Registro' 
              : '// Agregar Nuevo al Sistema'
            }
          </p>

          <div className="cyber-divider" style={{ margin: '2rem auto', maxWidth: '400px' }} />
        </div>

        {/* ============================================ */}
        {/* TARJETA DEL FORMULARIO */}
        {/* ============================================ */}
        <div className="cyber-card" style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '3rem',
          borderColor: 'var(--cyber-cyan)',
          background: 'rgba(26, 31, 58, 0.8)'
        }}>
          
          {/* Lista de Errores */}
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

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            
            {/* ============================================ */}
            {/* CAMPO: Título */}
            {/* ============================================ */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: 'var(--cyber-cyan)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🎮</span>
                // TÍTULO <span style={{ color: 'var(--cyber-magenta)' }}>*</span>
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
                className="cyber-input"
              />
              <small style={{ 
                display: 'block',
                marginTop: '0.5rem',
                color: 'var(--cyber-text-dim)', 
                fontSize: '0.8rem',
                letterSpacing: '1px'
              }}>
                MAX 255 CARACTERES
              </small>
            </div>

            {/* ============================================ */}
            {/* CAMPO: Género */}
            {/* ============================================ */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: 'var(--cyber-cyan)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🎯</span>
                // GÉNERO <span style={{ color: 'var(--cyber-magenta)' }}>*</span>
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

            {/* ============================================ */}
            {/* CAMPO: Fecha de Lanzamiento */}
            {/* ============================================ */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: 'var(--cyber-cyan)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>📅</span>
                // FECHA DE LANZAMIENTO <span style={{ color: 'var(--cyber-magenta)' }}>*</span>
              </label>
              <input
                type="date"
                name="anio_lanzamiento"
                value={formData.anio_lanzamiento}
                onChange={handleChange}
                required
                disabled={submitting}
                className="cyber-input"
              />
            </div>

            {/* Divisor */}
            <div className="cyber-divider" style={{ margin: '2.5rem 0' }} />

            {/* ============================================ */}
            {/* CAMPO: Plataformas (Checkboxes) */}
            {/* ============================================ */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '1.5rem',
                color: 'var(--cyber-magenta)',
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                <span style={{ marginRight: '0.5rem' }}>🕹️</span>
                // PLATAFORMAS DISPONIBLES
              </label>
              
              {/* Grid de checkboxes */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1rem',
                padding: '1.5rem',
                background: 'rgba(10, 14, 39, 0.6)',
                border: '1px solid rgba(0, 243, 255, 0.2)',
                borderRadius: '8px'
              }}>
                {plataformas.map(plataforma => {
                  const isSelected = formData.plataformas.includes(plataforma.id);
                  
                  return (
                    <label
                      key={plataforma.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        padding: '1rem',
                        background: isSelected 
                          ? 'rgba(0, 243, 255, 0.1)' 
                          : 'rgba(26, 31, 58, 0.6)',
                        border: isSelected
                          ? '2px solid var(--cyber-cyan)'
                          : '2px solid transparent',
                        borderRadius: '6px',
                        transition: 'all 0.3s ease',
                        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = 'rgba(26, 31, 58, 0.8)';
                          e.currentTarget.style.borderColor = 'rgba(0, 243, 255, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = 'rgba(26, 31, 58, 0.6)';
                          e.currentTarget.style.borderColor = 'transparent';
                        }
                      }}
                    >
                      {/* Checkbox Custom */}
                      <div style={{
                        width: '24px',
                        height: '24px',
                        border: '2px solid var(--cyber-cyan)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isSelected ? 'var(--cyber-cyan)' : 'transparent',
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                      }}>
                        {isSelected && (
                          <span style={{ color: 'var(--cyber-dark)', fontSize: '1rem' }}>
                            ✓
                          </span>
                        )}
                      </div>

                      {/* Input oculto real */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handlePlataformaToggle(plataforma.id)}
                        disabled={submitting}
                        style={{ display: 'none' }}
                      />
                      
                      {/* Texto */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          color: isSelected ? 'var(--cyber-cyan)' : 'var(--cyber-text)',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          marginBottom: '0.25rem'
                        }}>
                          {plataforma.nombre}
                        </div>
                        <div style={{
                          color: 'var(--cyber-text-dim)',
                          fontSize: '0.85rem'
                        }}>
                          {plataforma.fabricante}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
              
              {/* Contador */}
              <div style={{
                marginTop: '1rem',
                textAlign: 'center'
              }}>
                <span className="cyber-badge" style={{
                  borderColor: 'var(--cyber-cyan)',
                  color: 'var(--cyber-cyan)',
                  fontSize: '0.9rem'
                }}>
                  {formData.plataformas.length} SELECCIONADA(S)
                </span>
              </div>
            </div>

            {/* Divisor */}
            <div className="cyber-divider" style={{ margin: '2.5rem 0' }} />

            {/* ============================================ */}
            {/* BOTONES DE ACCIÓN */}
            {/* ============================================ */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {/* Botón Cancelar */}
              <button
                type="button"
                onClick={() => navigate('/videojuegos')}
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
              
              {/* Botón Guardar */}
              <button
                type="submit"
                disabled={submitting}
                className="cyber-button"
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '1rem',
                  opacity: submitting ? 0.6 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
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

            {/* Info de ayuda */}
            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(0, 243, 255, 0.05)',
              border: '1px solid rgba(0, 243, 255, 0.2)',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: 'var(--cyber-text-dim)',
              textAlign: 'center'
            }}>
              <span style={{ color: 'var(--cyber-cyan)' }}>💡</span> Los campos marcados con{' '}
              <span style={{ color: 'var(--cyber-magenta)' }}>*</span> son obligatorios
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default VideojuegoForm;