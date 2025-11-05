function Loading({ message = "Cargando..." }) {
    
    return (
      <div style={{
        // ESTILOS: Centrado vertical y horizontal
        
        // Flexbox para centrar contenido
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
        minHeight: '400px',
        
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px'
      }}>
        
        {/* ICONO ANIMADO */}
        
        <div style={{
          fontSize: '4rem',   
          marginBottom: '1rem',   
          
          // Animación de rotación
          animation: 'spin 2s linear infinite'
        }}>
          ⏳
        </div>
        
        {/* MENSAJE */}
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          margin: 0,
          textAlign: 'center'
        }}>
          {message}
        </p>
        
        {/* ANIMACIÓN CSS */}
        <style>{`
          @keyframes spin {
            /* Estado inicial: 0 grados */
            from {
              transform: rotate(0deg);
            }
            /* Estado final: 360 grados (vuelta completa) */
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
  
  export default Loading;
 