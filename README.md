# 🎮 Sistema de Gestión de Videojuegos - Frontend

Frontend desarrollado con **React + Vite** para el sistema de gestión de videojuegos.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecutar el Proyecto](#ejecutar-el-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Componentes Principales](#componentes-principales)
- [Estilos](#estilos)
- [API](#api)

---

## 🛠️ Tecnologías

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación
- **Axios** - Peticiones HTTP
- **CSS3** - Estilos (tema Cyberpunk)

---

## 📦 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Backend Laravel** corriendo en `http://127.0.0.1:8000`

---

## 🚀 Instalación
```bash
# 1. Clonar el repositorio (si aplica)
git clone <url-del-repositorio>
cd frontend

# 2. Instalar dependencias
npm install
```

---

## ⚙️ Configuración

### **1. Configurar URL del Backend**

Edita el archivo `src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',  // ← Cambiar si el backend está en otra URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
```

### **2. Variables de Entorno (Opcional)**

Puedes crear un archivo `.env` en la raíz:
```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

Y usar en `api.js`:
```javascript
baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1'
```

---

## 🏃 Ejecutar el Proyecto

### **Modo Desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

### **Build para Producción**
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`

### **Preview del Build**
```bash
npm run preview
```

---

## 📁 Estructura del Proyecto
```
frontend/
├── public/                  # Archivos públicos estáticos
├── src/
│   ├── components/         # Componentes de React
│   │   ├── auth/          # Login, Register, Profile
│   │   ├── common/        # Loading, ErrorMessage, EmptyState, etc.
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── layout/        # Layout, Navbar
│   │   ├── plataformas/   # CRUD de Plataformas
│   │   └── videojuegos/   # CRUD de Videojuegos
│   ├── context/           # Context API (AuthContext)
│   ├── services/          # API y servicios
│   │   ├── api.js        # Configuración de Axios
│   │   └── auth.js       # Funciones de autenticación
│   ├── styles/            # Estilos globales
│   │   └── cyberpunk.css # Tema Cyberpunk
│   ├── App.jsx            # Componente raíz con rutas
│   ├── main.jsx           # Punto de entrada
│   └── App.css            # Estilos base
├── index.html             # HTML principal
├── package.json           # Dependencias
├── vite.config.js         # Configuración de Vite
└── README.md             # Este archivo
```

---

## ✨ Funcionalidades

### **Autenticación**
- ✅ Login de usuarios
- ✅ Registro de nuevos usuarios
- ✅ Gestión de sesión con tokens
- ✅ Perfil de usuario
- ✅ Cambio de contraseña

### **Videojuegos**
- ✅ Listar todos los videojuegos
- ✅ Ver detalles de un videojuego
- ✅ Crear videojuego (solo admin)
- ✅ Editar videojuego (solo admin)
- ✅ Eliminar videojuego (solo admin)
- ✅ Asociar múltiples plataformas

### **Plataformas**
- ✅ Listar todas las plataformas
- ✅ Ver detalles de una plataforma
- ✅ Ver videojuegos por plataforma
- ✅ Crear plataforma (solo admin)
- ✅ Editar plataforma (solo admin)
- ✅ Eliminar plataforma (solo admin)

### **Dashboard**
- ✅ Total de videojuegos y plataformas
- ✅ Últimos 3 videojuegos añadidos
- ✅ Plataforma más popular

### **Diseño**
- ✅ Tema Cyberpunk/Futurista
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Animaciones y efectos visuales
- ✅ Modo oscuro

---

## 🛣️ Rutas de la Aplicación

### **Públicas**
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/login` | Login | Iniciar sesión |
| `/register` | Register | Registrar cuenta |

### **Protegidas (requieren login)**
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Dashboard | Dashboard principal |
| `/profile` | Profile | Perfil del usuario |
| `/videojuegos` | VideojuegosList | Lista de videojuegos |
| `/videojuegos/:id` | VideojuegoDetail | Detalle de videojuego |
| `/plataformas` | PlataformasList | Lista de plataformas |
| `/plataformas/:id` | PlataformaDetail | Detalle de plataforma |

### **Admin (solo administradores)**
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/videojuegos/crear` | VideojuegoForm | Crear videojuego |
| `/videojuegos/:id/editar` | VideojuegoForm | Editar videojuego |
| `/plataformas/crear` | PlataformaForm | Crear plataforma |
| `/plataformas/:id/editar` | PlataformaForm | Editar plataforma |

---

## 🧩 Componentes Principales

### **AuthContext**
Gestiona el estado global de autenticación:
```javascript
const { user, login, logout, isAdmin } = useAuth();
```

### **ProtectedRoute**
Protege rutas que requieren login:
```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### **AdminRoute**
Protege rutas que requieren permisos de admin:
```javascript
<AdminRoute>
  <VideojuegoForm />
</AdminRoute>
```

### **Layout**
Wrapper que incluye Navbar en todas las páginas protegidas.

---

## 🎨 Estilos

### **Tema Cyberpunk**

Paleta de colores:
```css
--cyber-cyan: #00f3ff      /* Videojuegos, acciones primarias */
--cyber-magenta: #ff006e   /* Plataformas, acciones secundarias */
--cyber-yellow: #ffbe0b    /* Destacados, editar */
--cyber-green: #3bff00     /* Usuario, confirmaciones */
--cyber-purple: #8338ec    /* Alternativo */
--cyber-dark: #0a0e27      /* Fondo principal */
--cyber-darker: #050814    /* Fondo más oscuro */
--cyber-card: #1a1f3a      /* Fondo de tarjetas */
```

### **Clases Principales**
```css
.cyber-button        /* Botones con efecto neón */
.cyber-card          /* Tarjetas con bordes cortados */
.cyber-input         /* Inputs con estilo futurista */
.cyber-badge         /* Badges con bordes */
.cyber-alert         /* Alertas de error/éxito */
.cyber-loading       /* Efecto glitch en loading */
.cyber-hover-lift    /* Efecto hover de elevación */
```

---

## 🔌 API

La aplicación se conecta al backend Laravel mediante Axios.

### **Configuración**

El archivo `src/services/api.js` configura:
- Base URL del backend
- Headers por defecto
- Interceptors para tokens
- Manejo de errores 401 (sesión expirada)

### **Autenticación**

Las peticiones incluyen automáticamente el token:
```javascript
Authorization: Bearer {token}
```

El token se guarda en `localStorage`:
```javascript
localStorage.setItem('access_token', token);
localStorage.setItem('user', JSON.stringify(user));
```

---

## 👥 Usuarios de Prueba

Consulta el README del backend para ver los usuarios predefinidos.

Por defecto:
- **Admin**: `admin@example.com` / `password`
- **User**: `user@example.com` / `password`

---

## 📝 Notas Adicionales

### **CORS**
Asegúrate de que el backend Laravel tenga configurado CORS para:
```
http://localhost:5173
```

### **Navegación SPA**
La aplicación es una SPA (Single Page Application), por lo que:
- No hay recargas de página al navegar
- Toda la navegación es manejada por React Router
- El estado se mantiene durante la navegación

### **Persistencia de Sesión**
- El token se guarda en localStorage
- La sesión persiste al recargar la página
- Al hacer logout, se limpia localStorage

---

## 🐛 Solución de Problemas

### **Error: Network Error**
- Verifica que el backend esté corriendo
- Revisa la URL en `src/services/api.js`
- Comprueba que CORS esté configurado

### **Error: 401 Unauthorized**
- El token expiró o es inválido
- Haz logout y login de nuevo
- Verifica que el backend use Passport correctamente

### **La página no carga estilos**
- Recarga con Ctrl+F5 (limpiar caché)
- Verifica que `cyberpunk.css` esté importado en `main.jsx`
- Revisa la consola (F12) por errores

### **Rutas no funcionan**
- Asegúrate de que `BrowserRouter` esté en `App.jsx`
- Verifica el orden de las rutas (específicas antes de dinámicas)

---

## 📄 Licencia

Este proyecto es parte de un ejercicio académico.

---

## 👨‍💻 Autor

Francesc Humbert

---
