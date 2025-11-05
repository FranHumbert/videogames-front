import api from './api';

export const saveUser = (user, token) => {

  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('access_token', token);
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error al parsear usuario:', error);
    return null;
  }
};


export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return token !== null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export const clearAuth = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

export const getValidationErrors = (error) => {
  if (error.response?.status === 422) {
    const errors = error.response.data.errors;
    
    return Object.values(errors).flat();
  }
  
  return [error.message || 'Error desconocido'];
};
