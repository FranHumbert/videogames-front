function EmptyState({ 
    icon = "📭",    
    message, 
    actionText, 
    onAction 
  }) {
    // Si no hay mensaje, mostrar mensaje por defecto
    if (!message) {
      message = "No hay datos para mostrar";
    }
    
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        
        // Fondo blanco con borde punteado (indica "vacío")
        backgroundColor: 'white',
        border: '2px dashed #ddd',
        borderRadius: '12px',
        
        // Espaciado
        margin: '2rem 0'
      }}>
        
        {/* ICONO/EMOJI */}
        <div style={{
          fontSize: '5rem',
          marginBottom: '1rem',
          
          // Animación de "flotar" suavemente
          animation: 'float 3s ease-in-out infinite'
        }}>
          {icon}
        </div>
        
        {/* MENSAJE */}
        <p style={{
          fontSize: '1.3rem',
          color: '#666',
          marginBottom: '1.5rem',
          fontWeight: '500'
        }}>
          {message}
        </p>
        
        {/* BOTÓN DE ACCIÓN (Condicional) */}
        {actionText && onAction && (
          <button
            onClick={onAction}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              
              // Sombra y transición
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transition: 'all 0.2s'
            }}
            // Efectos hover
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#45a049';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }}
          >
            {actionText}
          </button>
        )}
        
        {/* ANIMACIÓN DE FLOTACIÓN */}
        <style>{`
          @keyframes float {
            /* El icono "flota" suavemente arriba y abajo */
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </div>
    );
  }
  
  export default EmptyState;