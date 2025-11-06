import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import Dashboard from './components/dashboard/Dashboard';
import VideojuegosList from './components/videojuegos/VideojuegosList';
import VideojuegoDetail from './components/videojuegos/VideojuegoDetail';
import VideojuegoForm from './components/videojuegos/VideojuegoForm';
import PlataformasList from './components/plataformas/PlataformasList';
import PlataformaDetail from './components/plataformas/PlataformaDetail';
import PlataformaForm from './components/plataformas/PlataformaForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas Protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          {/* Videojuegos */}
          <Route
            path="/videojuegos"
            element={
              <ProtectedRoute>
                <VideojuegosList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/videojuegos/crear"
            element={
              <AdminRoute>
                <VideojuegoForm />
              </AdminRoute>
            }
          />
          
          <Route
            path="/videojuegos/:id"
            element={
              <ProtectedRoute>
                <VideojuegoDetail />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/videojuegos/:id/editar"
            element={
              <AdminRoute>
                <VideojuegoForm />
              </AdminRoute>
            }
          />
          
          {/* Plataformas */}
          <Route
            path="/plataformas"
            element={
              <ProtectedRoute>
                <PlataformasList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/plataformas/crear"
            element={
              <AdminRoute>
                <PlataformaForm />
              </AdminRoute>
            }
          />
          
          <Route
            path="/plataformas/:id"
            element={
              <ProtectedRoute>
                <PlataformaDetail />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/plataformas/:id/editar"
            element={
              <AdminRoute>
                <PlataformaForm />
              </AdminRoute>
            }
          />
          
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
