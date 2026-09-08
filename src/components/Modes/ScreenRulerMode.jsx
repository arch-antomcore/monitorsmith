import { useEffect, useMemo, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Régua de tela calibrada',
    desc: 'Calibre com uma referência conhecida para obter medidas aproximadas. Um cartão no padrão ID-1 tem largura nominal de 85,60 mm; confirme que o seu segue esse padrão.',
    calibrate: 'Calibração pelo cartão', card: 'Largura do cartão na tela',
    orDiagonal: 'Ou informe a diagonal do painel', diagonal: 'Diagonal (pol)',
    ppi: 'Pixels CSS por polegada', dotPitch: 'Tamanho do pixel CSS', cmPerPx: 'Pixels CSS por centímetro',
    ruler: 'Régua', unit: 'Unidade', cm: 'Centímetros', inch: 'Polegadas',
    length: 'Comprimento visível',
    note: 'A calibração manual vale para este monitor e este zoom. Os valores usam pixels CSS, não pixels físicos. A diagonal fornece apenas uma estimativa; confirme com o cartão. Se mudar o zoom ou a tela, calibre de novo.',
  },
  en: {
    title: 'Calibrated screen ruler',
    desc: 'Calibrate with a known reference for approximate measurements. An ID-1 standard card has a nominal width of 85.60 mm; confirm that yours follows that standard.',
    calibrate: 'Card calibration', card: 'Card width on screen',
    orDiagonal: 'Or enter the panel diagonal', diagonal: 'Diagonal (in)',
    ppi: 'CSS pixels per inch', dotPitch: 'CSS pixel size', cmPerPx: 'CSS pixels per centimetre',
    ruler: 'Ruler', unit: 'Unit', cm: 'Centimetres', inch: 'Inches',
    length: 'Visible length',
    note: 'Manual calibration applies to this monitor and zoom. Values use CSS pixels, not physical pixels. Diagonal input is only an estimate; check it against the card. Recalibrate after changing zoom or display.',
  },
  es: {
    title: 'Regla de pantalla calibrada',
    desc: 'Calibra con una referencia conocida para obtener medidas aproximadas. Una tarjeta estándar ID-1 tiene un ancho nominal de 85,60 mm; confirma que la tuya sigue ese estándar.',
    calibrate: 'Calibración con tarjeta', card: 'Ancho de la tarjeta en pantalla',
    orDiagonal: 'O indica la diagonal del panel', diagonal: 'Diagonal (pulg)',
    ppi: 'Píxeles CSS por pulgada', dotPitch: 'Tamaño del píxel CSS', cmPerPx: 'Píxeles CSS por centímetro',
    ruler: 'Regla', unit: 'Unidad', cm: 'Centímetros', inch: 'Pulgadas',
    length: 'Longitud visible',
    note: 'La calibración manual vale para este monitor y zoom. Los valores usan píxeles CSS, no físicos. La diagonal solo ofrece una estimación; compruébala con la tarjeta. Recalibra al cambiar el zoom o la pantalla.',
  },
};

const CARD_WIDTH_MM = 85.6;

export default function ScreenRulerMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [cardPx, setCardPx] = useState(320);
  const [unit, setUnit] = useState('cm');
  const [stripWidth, setStripWidth] = useState(0);
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;
    const measure = () => setStripWidth(strip.clientWidth);
    const observer = new ResizeObserver(measure);
    observer.observe(strip);
    measure();
    return () => observer.disconnect();
  }, []);

  const metrics = useMemo(() => {
    const pxPerMm = cardPx / CARD_WIDTH_MM;
    const ppi = pxPerMm * 25.4;
    return {
      ppi: ppi.toFixed(1),
      dotPitch: (25.4 / ppi).toFixed(4),
      pxPerCm: (pxPerMm * 10).toFixed(2),
      pxPerUnit: unit === 'cm' ? pxPerMm * 10 : ppi,
    };
  }, [cardPx, unit]);

  const setFromDiagonal = (value) => {
    const diagonalIn = Number(value);
    if (!Number.isFinite(diagonalIn) || diagonalIn < 5 || diagonalIn > 120) return;
    const diagonalPx = Math.sqrt(screen.width ** 2 + screen.height ** 2);
    const ppi = diagonalPx / diagonalIn;
    setCardPx(Math.max(1, Math.round((ppi / 25.4) * CARD_WIDTH_MM)));
  };

  const visibleLength = stripWidth / metrics.pxPerUnit;
  const ticks = Math.ceil(visibleLength);

  return (
    <DisplayToolShell id="screen-ruler" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body">
        <ToolHead id="MS-27 / SCALE" title={s.title} description={s.desc} />

        <div className="msx-stack">
          <Panel title={s.calibrate}>
            <div style={{ overflowX: 'auto', marginBottom: 18 }}>
            <div
              aria-hidden="true"
              style={{
                width: `${cardPx}px`,
                height: `${cardPx / 1.586}px`,
                marginBottom: 18,
                border: '1px solid var(--msx-phos)',
                borderRadius: `${cardPx * 0.035}px`,
                background: 'linear-gradient(135deg, var(--msx-panel-3), var(--msx-panel))',
              }}
            />
            </div>
            <div className="msx-field" style={{ marginBottom: 18 }}>
              <label htmlFor="ruler-card">{s.card}: {cardPx} px</label>
              <input id="ruler-card" type="range" min="1" max={Math.max(2000, cardPx)} value={cardPx} onChange={(event) => setCardPx(Number(event.target.value))} style={{ width: '100%' }} data-testid="ruler-card" />
            </div>
            <div className="msx-field" style={{ maxWidth: 260 }}>
              <label htmlFor="ruler-diagonal">{s.orDiagonal} — {s.diagonal}</label>
              <input id="ruler-diagonal" className="msx-input" type="number" min="5" max="120" step="0.1" placeholder="27" onChange={(event) => setFromDiagonal(event.target.value)} data-testid="ruler-diagonal" />
            </div>
          </Panel>

          <Readout>
            <Cell label={s.ppi} value={metrics.ppi} phosphor />
            <Cell label={s.dotPitch} value={`${metrics.dotPitch} mm`} />
            <Cell label={s.cmPerPx} value={metrics.pxPerCm} />
          </Readout>

          <Panel title={s.ruler}>
            <div className="msx-wrap" style={{ marginBottom: 18 }}>
              <button type="button" className="msx-chip" aria-pressed={unit === 'cm'} onClick={() => setUnit('cm')} data-testid="ruler-unit-cm">{s.cm}</button>
              <button type="button" className="msx-chip" aria-pressed={unit === 'inch'} onClick={() => setUnit('inch')} data-testid="ruler-unit-inch">{s.inch}</button>
            </div>
            <div
              ref={stripRef}
              data-testid="ruler-strip"
              style={{
                position: 'relative',
                height: 84,
                borderBottom: '2px solid var(--msx-phos)',
                overflow: 'hidden',
              }}
            >
              {Array.from({ length: ticks * 10 + 1 }, (unused, index) => {
                const isMajor = index % 10 === 0;
                const isMid = index % 5 === 0;
                return (
                  <span
                    key={index}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: `${(index / 10) * metrics.pxPerUnit}px`,
                      width: 1,
                      height: isMajor ? 46 : isMid ? 28 : 16,
                      background: isMajor ? 'var(--msx-phos)' : 'var(--msx-ink-3)',
                    }}
                  >
                    {isMajor ? (
                      <em style={{
                        position: 'absolute',
                        bottom: 50,
                        left: 3,
                        color: 'var(--msx-ink-2)',
                        fontFamily: 'var(--msx-font-mono)',
                        fontSize: '0.66rem',
                        fontStyle: 'normal',
                      }}
                      >
                        {index / 10}
                      </em>
                    ) : null}
                  </span>
                );
              })}
            </div>
            <p style={{ margin: '14px 0 0', color: 'var(--msx-ink-3)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.7rem' }}>
              {s.length}: {visibleLength.toFixed(1)} {unit === 'cm' ? 'cm' : 'in'}
            </p>
          </Panel>

          <p className="msx-note">{s.note}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
