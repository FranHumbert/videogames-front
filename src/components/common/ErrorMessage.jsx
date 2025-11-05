function ErrorMessage({ message, onRetry }) {
    
    return (
      <div style={{
        // ESTILOS: Caja de error llamativa
        
        padding: '3rem',
        textAlign: 'center',
        
        // Colores de error (rojo)
        backgroundColor: '#ffebee',
        border: '2px solid #ef5350',
        
        borderRadius: '12px',
        margin: '2rem auto',
        maxWidth: '600px',
        
        // Sombra sutil
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        
        {/* ICONO DE ERROR */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          
          // Animación de "sacudida" (shake)
          animation: 'shake 0.5s'
        }}>
          ❌
        </div>
        
        {/* TÍTULO */}
        <h2 style={{
          color: '#c62828',
          marginBottom: '1rem',
          fontSize: '1.5rem'
        }}>
          ¡Ups! Algo salió mal
        </h2>
        
        {/* MENSAJE DE ERROR */}
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '1.5rem',
          lineHeight: '1.5'
        }}>
          {message}
        </p>
        
        {/* BOTÓN REINTENTAR (Condicional) */}        
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              
              // Efecto hover (cambio de color al pasar mouse)
              transition: 'background-color 0.2s'
            }}
            // Efecto hover inline (alternativa)
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1976d2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
          >
            🔄 Reintentar
          </button>
        )}
        
        {/* ANIMACIÓN DE SACUDIDA */}
        <style>{`
          @keyframes shake {
            /* Sacudir el icono de izquierda a derecha */
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
        `}</style>
      </div>
    );
  }
  
  export default ErrorMessage;