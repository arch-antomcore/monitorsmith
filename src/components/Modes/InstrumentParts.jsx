/** Peças reaproveitadas pelos instrumentos: leitura numérica e cabeçalho. */

export function Readout({ children }) {
  return <div className="msx-readout">{children}</div>;
}

export function Cell({ label, value, hint, phosphor = false }) {
  return (
    <div className="msx-readout__cell">
      <span className="msx-readout__label">{label}</span>
      <span className={`msx-readout__value${phosphor ? ' msx-readout__value--phos' : ''}`}>{value}</span>
      {hint ? <span className="msx-readout__hint">{hint}</span> : null}
    </div>
  );
}

export function ToolHead({ id, title, description, actions }) {
  return (
    <div className="msx-tool-head">
      <div>
        <p className="msx-eyebrow" style={{ margin: 0 }}>{id}</p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="msx-wrap">{actions}</div> : null}
    </div>
  );
}

export function Panel({ title, children, style }) {
  return (
    <section className="msx-panel" style={style}>
      {title ? <h3 className="msx-panel__title">{title}</h3> : null}
      {children}
    </section>
  );
}
