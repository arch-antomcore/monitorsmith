import { useCallback, useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Teste de webcam',
    desc: 'A imagem fica só no seu navegador: nenhum quadro é enviado ou gravado em servidor.',
    start: 'Ligar câmera', stop: 'Desligar câmera', mirror: 'Espelhar', snapshot: 'Capturar quadro',
    device: 'Dispositivo', resolution: 'Resolução negociada', fps: 'Taxa de quadros', ratio: 'Proporção',
    denied: 'O navegador bloqueou a câmera. Libere o acesso nas permissões do site e tente de novo.',
    failed: 'Não foi possível abrir a câmera. Verifique o dispositivo e se outro aplicativo está usando-o.',
    pending: 'Cancelar solicitação',
    idle: 'Câmera desligada.',
    note: 'A resolução e o FPS mostrados são o que o driver aceitou entregar ao navegador, e podem ficar abaixo do máximo do sensor quando a luz do ambiente é baixa.',
  },
  en: {
    title: 'Webcam test',
    desc: 'The image stays in your browser: no frame is uploaded or stored on a server.',
    start: 'Start camera', stop: 'Stop camera', mirror: 'Mirror', snapshot: 'Capture frame',
    device: 'Device', resolution: 'Negotiated resolution', fps: 'Frame rate', ratio: 'Aspect ratio',
    denied: 'The browser blocked the camera. Allow it in the site permissions and try again.',
    failed: 'Unable to open the camera. Check the device and whether another application is using it.',
    pending: 'Cancel request',
    idle: 'Camera off.',
    note: 'The resolution and FPS shown are what the driver agreed to deliver to the browser, and can drop below the sensor maximum in low light.',
  },
  es: {
    title: 'Prueba de webcam',
    desc: 'La imagen se queda en tu navegador: ningún fotograma se envía ni se guarda en un servidor.',
    start: 'Encender cámara', stop: 'Apagar cámara', mirror: 'Espejar', snapshot: 'Capturar fotograma',
    device: 'Dispositivo', resolution: 'Resolución negociada', fps: 'Fotogramas por segundo', ratio: 'Relación de aspecto',
    denied: 'El navegador bloqueó la cámara. Permítelo en los ajustes del sitio e inténtalo de nuevo.',
    failed: 'No se pudo abrir la cámara. Comprueba el dispositivo y si otra aplicación la está usando.',
    pending: 'Cancelar solicitud',
    idle: 'Cámara apagada.',
    note: 'La resolución y los FPS mostrados son lo que el controlador aceptó entregar al navegador y pueden bajar del máximo del sensor con poca luz.',
  },
};

export default function WebcamTestMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const requestRef = useRef(0);
  const pendingRef = useRef(false);
  const [active, setActive] = useState(false);
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [mirror, setMirror] = useState(true);
  const [info, setInfo] = useState({ label: '—', width: 0, height: 0, fps: 0 });

  const stop = useCallback(() => {
    requestRef.current += 1;
    pendingRef.current = false;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
    setPending(false);
    setReady(false);
    setInfo({ label: '—', width: 0, height: 0, fps: 0 });
  }, []);

  const start = useCallback(async () => {
    if (pendingRef.current || streamRef.current) return;
    pendingRef.current = true;
    const request = ++requestRef.current;
    setPending(true);
    setError(null);
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
      if (request !== requestRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      if (request !== requestRef.current) return;
      const track = stream.getVideoTracks()[0];
      const settings = track?.getSettings?.() || {};
      setInfo({
        label: track?.label || '—',
        width: settings.width || 0,
        height: settings.height || 0,
        fps: settings.frameRate ? Math.round(settings.frameRate) : 0,
      });
      setActive(true);
      track?.addEventListener('ended', () => {
        if (request === requestRef.current) stop();
      }, { once: true });
    } catch (cause) {
      stream?.getTracks().forEach((track) => track.stop());
      if (request === requestRef.current) {
        stop();
        setError(cause.name === 'NotAllowedError' ? 'denied' : 'failed');
      }
    } finally {
      if (request === requestRef.current) {
        pendingRef.current = false;
        setPending(false);
      }
    }
  }, [stop]);

  useEffect(() => () => {
    requestRef.current += 1;
    pendingRef.current = false;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const snapshot = useCallback(() => {
    const video = videoRef.current;
    if (!video || !active || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (mirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.download = `monitorsmith-webcam-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [active, mirror]);

  const ratio = info.width && info.height
    ? (info.width / info.height).toFixed(2).replace(/\.00$/, '')
    : '—';

  return (
    <DisplayToolShell id="webcam-test" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body">
        <ToolHead
          id="MS-25 / CAM"
          title={s.title}
          description={s.desc}
          actions={(
            <>
              <button type="button" className="msx-btn msx-btn--primary" onClick={active || pending ? stop : start} data-testid="webcam-toggle">
                {pending ? s.pending : active ? s.stop : s.start}
              </button>
              {active ? <button type="button" className="msx-btn" aria-pressed={mirror} onClick={() => setMirror((value) => !value)} data-testid="webcam-mirror">{s.mirror}</button> : null}
              {active ? <button type="button" className="msx-btn" disabled={!ready} onClick={snapshot} data-testid="webcam-snapshot">{s.snapshot}</button> : null}
            </>
          )}
        />

        <div className="msx-stack">
          {error ? <p role="alert" className="msx-note" style={{ borderColor: 'var(--msx-alert)', color: 'var(--msx-alert)' }}>{s[error]}</p> : null}

          <div style={{ position: 'relative', border: '1px solid var(--msx-hair)', background: '#000', aspectRatio: '16 / 9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video
              ref={videoRef}
              playsInline
              muted
              onLoadedData={() => setReady(true)}
              onEmptied={() => setReady(false)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: mirror ? 'scaleX(-1)' : 'none',
                display: active ? 'block' : 'none',
              }}
            />
            {!active ? (
              <span style={{ color: 'var(--msx-ink-3)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.idle}</span>
            ) : null}
          </div>

          <Readout>
            <Cell label={s.device} value={info.label.slice(0, 24)} hint={info.label} />
            <Cell label={s.resolution} value={info.width ? `${info.width} × ${info.height}` : '—'} phosphor />
            <Cell label={s.fps} value={info.fps ? `${info.fps} fps` : '—'} />
            <Cell label={s.ratio} value={ratio === '—' ? '—' : `${ratio}:1`} />
          </Readout>

          <p className="msx-note">{s.note}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
