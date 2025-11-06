import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Loading from '../common/Loading';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getValidationErrors } from '../../services/auth';

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [submittingProfile, setSubmittingProfile] = useState(false);
  const [submittingPassword, setSubmittingPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/profile');
      const userData = response.data.data;
      
      setProfileData({
        name: userData.name,
        email: userData.email
      });
      
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSubmittingProfile(true);

    try {
      await api.put('/profile', profileData);
      alert('✅ Perfil actualizado exitosamente');
      
      // Actualizar usuario en localStorage
      const response = await api.get('/profile');
      localStorage.setItem('user', JSON.stringify(response.data.data));
      
      // Recargar página para actualizar contexto
      window.location.reload();
      
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      const validationErrors = getValidationErrors(error);
      setErrors(validationErrors);
      
    } finally {
      setSubmittingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrors([]);
    setSubmittingPassword(true);

    try {
      await api.put('/profile/password', passwordData);
      alert('✅ Contraseña actualizada exitosamente');
      
      // Limpiar formulario
      setPasswordData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
      
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      const validationErrors = getValidationErrors(error);
      setPasswordErrors(validationErrors);
      
    } finally {
      setSubmittingPassword(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      await logout();
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading message="Cargando perfil..." />
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
            fontSize: '6rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 20px var(--cyber-green))'
          }}>
            👤
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '5px',
            background: 'linear-gradient(45deg, var(--cyber-green), var(--cyber-cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            MI PERFIL
          </h1>
          
          <p style={{
            color: 'var(--cyber-text-dim)',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            // Configuración de Usuario
          </p>

          <div className="cyber-divider" style={{ margin: '2rem auto', maxWidth: '400px' }} />
        </div>

        {/* INFO BÁSICA */}
        <div className="cyber-card" style={{
          maxWidth: '800px',
          margin: '0 auto 2rem',
          padding: '2rem',
          borderColor: 'var(--cyber-green)',
          background: 'rgba(59, 255, 0, 0.05)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            <div style={{
              fontSize: '4rem',
              filter: 'drop-shadow(0 0 15px var(--cyber-green))'
            }}>
              {user?.role === 'admin' ? '👑' : '👤'}
            </div>
            
            <div>
              <h2 style={{
                fontSize: '2rem',
                color: 'var(--cyber-green)',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                {user?.name}
              </h2>
              
              <p style={{
                color: 'var(--cyber-text-dim)',
                fontSize: '1.1rem',
                marginBottom: '0.5rem'
              }}>
                📧 {user?.email}
              </p>
              
              <span className="cyber-badge" style={{
                borderColor: user?.role === 'admin' ? 'var(--cyber-yellow)' : 'var(--cyber-cyan)',
                color: user?.role === 'admin' ? 'var(--cyber-yellow)' : 'var(--cyber-cyan)',
                fontSize: '0.9rem',
                padding: '0.25rem 0.75rem',
                display: 'inline-block'
              }}>
                {user?.role === 'admin' ? '👑 ADMINISTRADOR' : '👤 USUARIO'}
              </span>
            </div>
          </div>
        </div>

        {/* GRID DE FORMULARIOS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto 2rem'
        }}>
          
          {/* FORMULARIO: ACTUALIZAR DATOS */}
          <div className="cyber-card" style={{
            padding: '2rem',
            borderColor: 'var(--cyber-cyan)',
            background: 'rgba(26, 31, 58, 0.8)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: 'var(--cyber-cyan)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 'bold'
            }}>
              ✏️ ACTUALIZAR DATOS
            </h3>

            {errors.length > 0 && (
              <div className="cyber-alert error" style={{ marginBottom: '1.5rem' }}>
                <strong>⚠️ ERRORES:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', listStyle: 'none' }}>
                  {errors.map((error, index) => (
                    <li key={index} style={{ marginTop: '0.5rem' }}>
                      <span style={{ marginRight: '0.5rem' }}>▸</span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleProfileSubmit}>
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
                  👤 NOMBRE <span style={{ color: 'var(--cyber-magenta)' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                  maxLength={255}
                  disabled={submittingProfile}
                  className="cyber-input"
                />
              </div>

              {/* Email */}
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
                  📧 EMAIL <span style={{ color: 'var(--cyber-magenta)' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                  maxLength={255}
                  disabled={submittingProfile}
                  className="cyber-input"
                />
              </div>

              <button
                type="submit"
                disabled={submittingProfile}
                className="cyber-button"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  opacity: submittingProfile ? 0.6 : 1,
                  cursor: submittingProfile ? 'not-allowed' : 'pointer'
                }}
              >
                {submittingProfile ? (
                  <span className="cyber-loading">⟳ GUARDANDO...</span>
                ) : (
                  '💾 GUARDAR CAMBIOS'
                )}
              </button>
            </form>
          </div>

          {/* FORMULARIO: CAMBIAR CONTRASEÑA */}
          <div className="cyber-card" style={{
            padding: '2rem',
            borderColor: 'var(--cyber-magenta)',
            background: 'rgba(26, 31, 58, 0.8)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: 'var(--cyber-magenta)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 'bold'
            }}>
              🔒 CAMBIAR CONTRASEÑA
            </h3>

            {passwordErrors.length > 0 && (
              <div className="cyber-alert error" style={{ marginBottom: '1.5rem' }}>
                <strong>⚠️ ERRORES:</strong>
                <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', listStyle: 'none' }}>
                  {passwordErrors.map((error, index) => (
                    <li key={index} style={{ marginTop: '0.5rem' }}>
                      <span style={{ marginRight: '0.5rem' }}>▸</span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit}>
              {/* Contraseña Actual */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--cyber-magenta)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  🔐 CONTRASEÑA ACTUAL <span style={{ color: 'var(--cyber-cyan)' }}>*</span>
                </label>
                <input
                  type="password"
                  name="current_password"
                  value={passwordData.current_password}
                  onChange={handlePasswordChange}
                  required
                  disabled={submittingPassword}
                  className="cyber-input"
                  placeholder="••••••••"
                />
              </div>

              {/* Nueva Contraseña */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--cyber-magenta)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  🔑 NUEVA CONTRASEÑA <span style={{ color: 'var(--cyber-cyan)' }}>*</span>
                </label>
                <input
                  type="password"
                  name="new_password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  disabled={submittingPassword}
                  className="cyber-input"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              {/* Confirmar Nueva Contraseña */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--cyber-magenta)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  🔑 CONFIRMAR CONTRASEÑA <span style={{ color: 'var(--cyber-cyan)' }}>*</span>
                </label>
                <input
                  type="password"
                  name="new_password_confirmation"
                  value={passwordData.new_password_confirmation}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  disabled={submittingPassword}
                  className="cyber-input"
                  placeholder="Repetir contraseña"
                />
              </div>

              <button
                type="submit"
                disabled={submittingPassword}
                className="cyber-button magenta"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  opacity: submittingPassword ? 0.6 : 1,
                  cursor: submittingPassword ? 'not-allowed' : 'pointer'
                }}
              >
                {submittingPassword ? (
                  <span className="cyber-loading">⟳ ACTUALIZANDO...</span>
                ) : (
                  '🔒 CAMBIAR CONTRASEÑA'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* BOTÓN CERRAR SESIÓN */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <button
            onClick={handleLogout}
            className="cyber-button"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              borderColor: 'var(--cyber-cyan)',
              color: 'var(--cyber-cyan)'
            }}
          >
            🚪 CERRAR SESIÓN
          </button>
        </div>

        {/* FOOTER INFO */}
        <div style={{
          maxWidth: '800px',
          margin: '2rem auto 0',
          padding: '1rem',
          background: 'rgba(10, 14, 39, 0.6)',
          border: '1px solid rgba(0, 243, 255, 0.2)',
          borderRadius: '6px',
          fontSize: '0.85rem',
          color: 'var(--cyber-text-dim)',
          textAlign: 'center'
        }}>
          <span style={{ color: 'var(--cyber-cyan)' }}>💡</span> Los cambios en el perfil se aplicarán inmediatamente. 
          La contraseña debe tener al menos 8 caracteres.
        </div>
      </div>
    </Layout>
  );
}

export default Profile;