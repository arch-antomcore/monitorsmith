import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("MonitorSmith ErrorBoundary capturou um erro:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {}
      window.location.href = window.location.origin + window.location.pathname;
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#07080b',
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '100%',
              padding: '32px',
              borderRadius: '24px',
              background: 'rgba(15, 17, 26, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 100, 100, 0.12)',
                color: '#ff6b6b',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                marginBottom: '16px',
              }}
            >
              ⚠️
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.25rem', fontWeight: 650 }}>
              Recuperação do MonitorSmith
            </h2>
            <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.68)', lineHeight: 1.5 }}>
              Identificamos uma oscilação na renderização. Clique abaixo para restaurar a suíte com segurança.
            </p>

            {this.state.error ? (
              <pre style={{ margin: '0 0 16px', padding: '10px 14px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,100,100,0.2)', borderRadius: '10px', color: '#ff8a8a', fontSize: '0.7rem', textAlign: 'left', overflowX: 'auto', maxHeight: '140px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {this.state.error.toString()}
              </pre>
            ) : null}
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: '12px',
                background: '#d9fbf2',
                color: '#06211b',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Restaurar Ferramentas
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
