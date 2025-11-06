function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '2rem',
      padding: '2rem'
    }}>
      <div className="cyber-card" style={{
        maxWidth: '600px',
        padding: '3rem',
        textAlign: 'center',
        borderColor: 'var(--cyber-magenta)',
        background: 'rgba(255, 0, 110, 0.05)'
      }}>
        {/* Icono de error */}
        <div style={{
          fontSize: '5rem',
          marginBottom: '2rem',
          filter: 'drop-shadow(0 0 20px var(--cyber-magenta))',
          animation: 'pulse 2s infinite'
        }}>
          ⚠️
        </div>

        {/* Mensaje de error */}
        <h2 style={{
          fontSize: '2rem',
          color: 'var(--cyber-magenta)',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '1rem',
          fontWeight: '900'
        }}>
          ERROR DEL SISTEMA
        </h2>

        <div className="cyber-divider" style={{
          background: 'linear-gradient(90deg, transparent, var(--cyber-magenta), transparent)',
          margin: '1.5rem 0'
        }} />

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--cyber-text)',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          {message || 'Ha ocurrido un error inesperado'}
        </p>

        {/* Botón reintentar */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="cyber-button magenta"
          >
            ⟳ REINTENTAR
          </button>
        )}

        {/* Info técnica decorativa */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 0, 110, 0.2)',
          fontSize: '0.75rem',
          color: 'var(--cyber-text-dim)',
          fontFamily: 'monospace',
          textAlign: 'left'
        }}>
          <div>// ERROR CODE: SYS_ERR_001</div>
          <div>// TIMESTAMP: {new Date().toISOString()}</div>
          <div>// STATUS: CONNECTION_FAILED</div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;