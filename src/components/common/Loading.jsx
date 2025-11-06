function Loading({ message = 'Cargando...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '2rem'
    }}>
      {/* Spinner Cyberpunk */}
      <div style={{
        width: '80px',
        height: '80px',
        border: '4px solid rgba(0, 243, 255, 0.1)',
        borderTop: '4px solid var(--cyber-cyan)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        boxShadow: '0 0 30px rgba(0, 243, 255, 0.5)'
      }} />
      
      {/* Mensaje con efecto glitch */}
      <p className="cyber-loading" style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '3px'
      }}>
        {message}
      </p>

      {/* Barras de progreso decorativas */}
      <div style={{ width: '300px' }}>
        <div style={{
          height: '3px',
          background: 'rgba(0, 243, 255, 0.2)',
          marginBottom: '0.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '40%',
            background: 'var(--cyber-cyan)',
            boxShadow: '0 0 10px var(--cyber-cyan)',
            animation: 'loading-bar 2s infinite'
          }} />
        </div>

        <div style={{
          height: '3px',
          background: 'rgba(255, 0, 110, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '60%',
            background: 'var(--cyber-magenta)',
            boxShadow: '0 0 10px var(--cyber-magenta)',
            animation: 'loading-bar 2.5s infinite'
          }} />
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          @keyframes loading-bar {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(250%); }
          }
        `}
      </style>
    </div>
  );
}

export default Loading;