function EmptyState({ icon = '📭', message, actionText, onAction }) {
  return (
    <div className="cyber-card" style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      borderColor: 'var(--cyber-text-dim)',
      background: 'rgba(26, 31, 58, 0.3)'
    }}>
      {/* Icono */}
      <div style={{
        fontSize: '6rem',
        marginBottom: '2rem',
        opacity: 0.5,
        filter: 'grayscale(100%)'
      }}>
        {icon}
      </div>

      {/* Mensaje */}
      <p style={{
        fontSize: '1.3rem',
        color: 'var(--cyber-text-dim)',
        marginBottom: '2rem',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        // {message}
      </p>

      {/* Botón de acción (opcional) */}
      {actionText && onAction && (
        <>
          <div style={{
            width: '100px',
            height: '2px',
            background: 'var(--cyber-cyan)',
            margin: '2rem auto',
            opacity: 0.3
          }} />
          
          <button
            onClick={onAction}
            className="cyber-button"
          >
            {actionText} ▶
          </button>
        </>
      )}
    </div>
  );
}

export default EmptyState;