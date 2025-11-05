import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {/* NAVBAR (Barra superior) */}
      <Navbar />
      {/* MAIN (Contenido principal) */}
      <main style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* CHILDREN (Contenido de la página) */}
        {children}
      </main>
    </div>
  );
}

export default Layout;