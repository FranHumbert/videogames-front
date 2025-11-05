import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',    
    'Accept': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },

  (error) => {
    console.error('❌ Error antes de enviar petición:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Respuesta recibida:', response.config.url);
    
    return response;
  },
  
  (error) => {
    if (!error.response) {
      console.error('❌ Error de red o timeout');
      alert('Error de conexión. Verifica tu internet.');
      return Promise.reject(error);
    }
    
    const status = error.response.status;
    
    switch (status) {
      case 401:
        console.error('🔒 Token inválido o expirado');
        
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        
        window.location.href = '/login';
        break;
        
      case 403:
        console.error('🚫 Sin permisos de administrador');
        alert('⛔ No tienes permisos para realizar esta acción');
        break;
        
      case 404:
        console.error('❓ Recurso no encontrado');
        break;
        
      case 422:
        console.error('⚠️ Errores de validación');
        break;
        
      case 500:
        console.error('💥 Error interno del servidor');
        alert('Error del servidor. Contacta al administrador.');
        break;
        
      default:
        console.error(`❌ Error ${status}:`, error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;