import { useMemo, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Calculadoras de display',
    desc: 'Três contas que resolvem quase toda dúvida de compra: banda do cabo, distância de visão e tamanho físico da tela.',
    bandwidth: 'Banda de vídeo necessária', distance: 'Distância de visão e FOV', size: 'Dimensões por proporção',
    width: 'Largura (px)', height: 'Altura (px)', rate: 'Taxa (Hz)', bpc: 'Bits por canal',
    raw: 'Taxa de pixels', dataRate: 'Banda estimada (+5%)', verdict: 'Referência de link',
    diagonal: 'Diagonal (pol)', ratioLabel: 'Proporção', fov: 'FOV horizontal alvo (graus)',
    idealDistance: 'Distância para o FOV', physicalW: 'Largura física', physicalH: 'Altura física',
    area: 'Área da tela', fovAt: 'FOV a essa distância',
    dsc: 'Com DSC 3:1 (compressão visualmente sem perdas) a exigência cai para cerca de',
    invalid: 'Informe valores dentro dos limites dos campos para calcular.',
    beyond: 'Acima das referências',
    note: 'Estimativa RGB 4:4:4 com margem fixa de 5%; não calcula timings CVT-RB. A referência compara capacidades aproximadas de links e não garante compatibilidade de cabo ou porta. Confirme timings, número de lanes e suporte a DSC em ambos os dispositivos.',
  },
  en: {
    title: 'Display calculators',
    desc: 'Three sums that answer almost every buying question: cable bandwidth, viewing distance and physical screen size.',
    bandwidth: 'Required video bandwidth', distance: 'Viewing distance and FOV', size: 'Dimensions per aspect ratio',
    width: 'Width (px)', height: 'Height (px)', rate: 'Refresh (Hz)', bpc: 'Bits per channel',
    raw: 'Pixel rate', dataRate: 'Estimated bandwidth (+5%)', verdict: 'Link reference',
    diagonal: 'Diagonal (in)', ratioLabel: 'Aspect ratio', fov: 'Target horizontal FOV (degrees)',
    idealDistance: 'Distance for FOV', physicalW: 'Physical width', physicalH: 'Physical height',
    area: 'Screen area', fovAt: 'FOV at that distance',
    dsc: 'With DSC 3:1 (visually lossless compression) the requirement drops to about',
    invalid: 'Enter values within the field limits to calculate.',
    beyond: 'Above listed references',
    note: 'RGB 4:4:4 estimate with a fixed 5% margin; it does not calculate CVT-RB timings. The reference compares approximate link capacities and does not guarantee cable or port compatibility. Verify timings, lane count and DSC support on both devices.',
  },
  es: {
    title: 'Calculadoras de pantalla',
    desc: 'Tres cuentas que resuelven casi cualquier duda de compra: ancho de banda del cable, distancia de visión y tamaño físico.',
    bandwidth: 'Ancho de banda necesario', distance: 'Distancia de visión y FOV', size: 'Dimensiones por relación de aspecto',
    width: 'Ancho (px)', height: 'Alto (px)', rate: 'Tasa (Hz)', bpc: 'Bits por canal',
    raw: 'Tasa de píxeles', dataRate: 'Banda estimada (+5%)', verdict: 'Referencia de enlace',
    diagonal: 'Diagonal (pulg)', ratioLabel: 'Relación de aspecto', fov: 'FOV horizontal objetivo (grados)',
    idealDistance: 'Distancia para el FOV', physicalW: 'Ancho físico', physicalH: 'Alto físico',
    area: 'Área de pantalla', fovAt: 'FOV a esa distancia',
    dsc: 'Con DSC 3:1 (compresión visualmente sin pérdidas) la exigencia baja a unos',
    invalid: 'Introduce valores dentro de los límites de los campos para calcular.',
    beyond: 'Por encima de las referencias',
    note: 'Estimación RGB 4:4:4 con margen fijo del 5%; no calcula timings CVT-RB. La referencia compara capacidades aproximadas y no garantiza compatibilidad de cable o puerto. Comprueba timings, número de lanes y soporte DSC en ambos dispositivos.',
  },
};

const CABLES = [
  { name: 'HDMI 1.4', limit: 8.16 },
  { name: 'HDMI 2.0', limit: 14.4 },
  { name: 'DisplayPort 1.2', limit: 17.28 },
  { name: 'DisplayPort 1.4', limit: 25.92 },
  { name: 'HDMI 2.1 (48G)', limit: 42.6 },
  { name: 'DisplayPort 2.1 (UHBR20)', limit: 77.37 },
];

const RATIOS = [
  { label: '16:9', value: 16 / 9 },
  { label: '16:10', value: 16 / 10 },
  { label: '21:9', value: 21 / 9 },
  { label: '32:9', value: 32 / 9 },
  { label: '4:3', value: 4 / 3 },
];

export default function DisplayCalculatorsMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [width, setWidth] = useState(3840);
  const [height, setHeight] = useState(2160);
  const [rate, setRate] = useState(144);
  const [bpc, setBpc] = useState(10);
  const [diagonal, setDiagonal] = useState(32);
  const [ratio, setRatio] = useState('16:9');
  const [fov, setFov] = useState(40);

  const band = useMemo(() => {
    if (!Number.isInteger(width) || width < 640 || width > 16000 || !Number.isInteger(height) || height < 480 || height > 10000 || !Number.isFinite(rate) || rate < 24 || rate > 1000) return null;
    const pixels = width * height * rate;
    const bits = pixels * bpc * 3;
    const withBlanking = bits * 1.05;
    const gbps = withBlanking / 1e9;
    const cable = CABLES.find((item) => item.limit >= gbps);
    return {
      pixelRate: (pixels / 1e6).toFixed(1),
      gbps: gbps.toFixed(2),
      dsc: (gbps / 3).toFixed(2),
      cable: cable?.name || null,
    };
  }, [bpc, height, rate, width]);

  const geometry = useMemo(() => {
    if (!Number.isFinite(diagonal) || diagonal < 5 || diagonal > 120) return null;
    const aspect = RATIOS.find((item) => item.label === ratio)?.value || 16 / 9;
    const physicalWidth = (diagonal * aspect) / Math.sqrt(aspect * aspect + 1);
    const physicalHeight = physicalWidth / aspect;
    const distanceIn = (physicalWidth / 2) / Math.tan((fov * Math.PI) / 360);
    return {
      widthCm: (physicalWidth * 2.54).toFixed(1),
      heightCm: (physicalHeight * 2.54).toFixed(1),
      areaCm: (physicalWidth * physicalHeight * 6.4516).toFixed(0),
      distanceCm: (distanceIn * 2.54).toFixed(0),
      distanceIn: distanceIn.toFixed(1),
    };
  }, [diagonal, fov, ratio]);

  return (
    <DisplayToolShell id="display-calculators" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body">
        <ToolHead id="MS-26 / CALC" title={s.title} description={s.desc} />

        <div className="msx-stack">
          <Panel title={s.bandwidth}>
            <div className="msx-row" style={{ marginBottom: 18 }}>
              <div className="msx-field">
                <label htmlFor="calc-width">{s.width}</label>
                <input id="calc-width" className="msx-input" type="number" min="640" max="16000" value={width} onChange={(event) => setWidth(Number(event.target.value) || 0)} data-testid="calc-width" />
              </div>
              <div className="msx-field">
                <label htmlFor="calc-height">{s.height}</label>
                <input id="calc-height" className="msx-input" type="number" min="480" max="10000" value={height} onChange={(event) => setHeight(Number(event.target.value) || 0)} data-testid="calc-height" />
              </div>
              <div className="msx-field">
                <label htmlFor="calc-rate">{s.rate}</label>
                <input id="calc-rate" className="msx-input" type="number" min="24" max="1000" value={rate} onChange={(event) => setRate(Number(event.target.value) || 0)} data-testid="calc-rate" />
              </div>
              <div className="msx-field">
                <label htmlFor="calc-bpc">{s.bpc}</label>
                <select id="calc-bpc" className="msx-input" value={bpc} onChange={(event) => setBpc(Number(event.target.value))} data-testid="calc-bpc">
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                  <option value={10}>10</option>
                  <option value={12}>12</option>
                </select>
              </div>
            </div>
            {band ? <Readout>
              <Cell label={s.raw} value={`${band.pixelRate} MP/s`} />
              <Cell label={s.dataRate} value={`${band.gbps} Gbps`} phosphor />
              <Cell label={s.verdict} value={band.cable || s.beyond} />
            </Readout> : <p role="status" className="msx-note">{s.invalid}</p>}
            {band ? <p style={{ margin: '14px 0 0', color: 'var(--msx-ink-3)', fontSize: '0.82rem' }}>{s.dsc} {band.dsc} Gbps.</p> : null}
          </Panel>

          <Panel title={s.distance}>
            <div className="msx-row" style={{ marginBottom: 18 }}>
              <div className="msx-field">
                <label htmlFor="calc-diagonal">{s.diagonal}</label>
                <input id="calc-diagonal" className="msx-input" type="number" min="5" max="120" step="0.1" value={diagonal} onChange={(event) => setDiagonal(Number(event.target.value) || 0)} data-testid="calc-diagonal" />
              </div>
              <div className="msx-field">
                <label htmlFor="calc-ratio">{s.ratioLabel}</label>
                <select id="calc-ratio" className="msx-input" value={ratio} onChange={(event) => setRatio(event.target.value)} data-testid="calc-ratio">
                  {RATIOS.map((item) => <option key={item.label} value={item.label}>{item.label}</option>)}
                </select>
              </div>
              <div className="msx-field">
                <label htmlFor="calc-fov">{s.fov}: {fov}°</label>
                <input id="calc-fov" type="range" min="20" max="70" value={fov} onChange={(event) => setFov(Number(event.target.value))} style={{ width: '100%' }} data-testid="calc-fov" />
              </div>
            </div>
            {geometry ? <Readout>
              <Cell label={s.idealDistance} value={`${geometry.distanceCm} cm`} hint={`${geometry.distanceIn} in`} phosphor />
              <Cell label={s.physicalW} value={`${geometry.widthCm} cm`} />
              <Cell label={s.physicalH} value={`${geometry.heightCm} cm`} />
              <Cell label={s.area} value={`${geometry.areaCm} cm²`} />
            </Readout> : <p role="status" className="msx-note">{s.invalid}</p>}
          </Panel>

          <p className="msx-note">{s.note}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
