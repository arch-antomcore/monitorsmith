import { useCallback, useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Teste de áudio e microfone',
    desc: 'Tons gerados localmente pela Web Audio API. Comece em volume baixo: tons puros parecem mais altos do que música.',
    speakers: 'Alto-falantes', mic: 'Microfone',
    playLeft: 'Só esquerdo', playRight: 'Só direito', playBoth: 'Ambos', sweep: 'Varredura 20 Hz → 20 kHz',
    stop: 'Parar som', freq: 'Frequência', volume: 'Volume',
    enableMic: 'Ativar microfone', disableMic: 'Desligar microfone',
    level: 'Nível atual', peak: 'Pico', channels: 'Canais captados', rate: 'Taxa de amostragem',
    denied: 'O navegador bloqueou o microfone. Libere o acesso nas permissões do site e tente de novo.',
    pending: 'Cancelar solicitação', failed: 'Não foi possível abrir o microfone. Verifique o dispositivo e se outro aplicativo está usando-o.',
    unavailable: 'A API de áudio não está disponível neste navegador.',
    audioFailed: 'Não foi possível reproduzir o tom neste navegador.',
    micHint: 'Nível RMS relativo à escala digital, sem calibração acústica. O valor depende do ganho e do processamento do microfone; não mede decibéis do ambiente.',
    note: 'A varredura ajuda a comparar ressonâncias aparentes. Audição e resposta do equipamento variam; ausência de som em uma faixa não identifica a causa.',
  },
  en: {
    title: 'Audio and microphone test',
    desc: 'Tones generated locally by the Web Audio API. Start at low volume: pure tones sound louder than music.',
    speakers: 'Speakers', mic: 'Microphone',
    playLeft: 'Left only', playRight: 'Right only', playBoth: 'Both', sweep: 'Sweep 20 Hz → 20 kHz',
    stop: 'Stop sound', freq: 'Frequency', volume: 'Volume',
    enableMic: 'Enable microphone', disableMic: 'Disable microphone',
    level: 'Current level', peak: 'Peak', channels: 'Captured channels', rate: 'Sample rate',
    denied: 'The browser blocked the microphone. Allow it in the site permissions and try again.',
    pending: 'Cancel request', failed: 'Unable to open the microphone. Check the device and whether another application is using it.',
    unavailable: 'The audio API is unavailable in this browser.',
    audioFailed: 'Unable to play the tone in this browser.',
    micHint: 'RMS level relative to digital full scale, without acoustic calibration. It depends on microphone gain and processing; it does not measure ambient decibels.',
    note: 'The sweep helps compare apparent resonances. Hearing and equipment response vary; silence in one range does not identify the cause.',
  },
  es: {
    title: 'Prueba de audio y micrófono',
    desc: 'Tonos generados localmente por la Web Audio API. Empieza con volumen bajo: los tonos puros suenan más fuertes que la música.',
    speakers: 'Altavoces', mic: 'Micrófono',
    playLeft: 'Solo izquierdo', playRight: 'Solo derecho', playBoth: 'Ambos', sweep: 'Barrido 20 Hz → 20 kHz',
    stop: 'Detener sonido', freq: 'Frecuencia', volume: 'Volumen',
    enableMic: 'Activar micrófono', disableMic: 'Desactivar micrófono',
    level: 'Nivel actual', peak: 'Pico', channels: 'Canales captados', rate: 'Frecuencia de muestreo',
    denied: 'El navegador bloqueó el micrófono. Permítelo en los ajustes del sitio e inténtalo de nuevo.',
    pending: 'Cancelar solicitud', failed: 'No se pudo abrir el micrófono. Comprueba el dispositivo y si otra aplicación lo está usando.',
    unavailable: 'La API de audio no está disponible en este navegador.',
    audioFailed: 'No se pudo reproducir el tono en este navegador.',
    micHint: 'Nivel RMS relativo a la escala digital, sin calibración acústica. Depende de la ganancia y el procesamiento del micrófono; no mide decibelios ambientales.',
    note: 'El barrido ayuda a comparar resonancias aparentes. La audición y la respuesta del equipo varían; el silencio en una banda no identifica la causa.',
  },
};

export default function AudioTestMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [freq, setFreq] = useState(440);
  const [volume, setVolume] = useState(0.25);
  const [playing, setPlaying] = useState(null);
  const [micOn, setMicOn] = useState(false);
  const [micError, setMicError] = useState(null);
  const [micPending, setMicPending] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [level, setLevel] = useState(0);
  const [peak, setPeak] = useState(0);
  const [micInfo, setMicInfo] = useState({ channels: 0, rate: 0 });

  const audioRef = useRef({ ctx: null, osc: null, gain: null, panner: null, stream: null, source: null, analyser: null, raf: 0, micRequest: 0, toneRequest: 0, pending: false });

  const getContext = useCallback(() => {
    const state = audioRef.current;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error('unavailable');
    state.ctx = state.ctx || new AudioContext();
    return state.ctx;
  }, []);

  const stopTone = useCallback(() => {
    const state = audioRef.current;
    state.toneRequest += 1;
    state.osc?.stop();
    state.osc?.disconnect();
    state.gain?.disconnect();
    state.panner?.disconnect();
    state.osc = null;
    state.gain = null;
    state.panner = null;
    setPlaying(null);
  }, []);

  const playTone = useCallback(async (mode) => {
    stopTone();
    setAudioError(null);
    const state = audioRef.current;
    const request = state.toneRequest;
    try {
      const ctx = getContext();
      if (ctx.state === 'suspended') await ctx.resume();
      if (request !== state.toneRequest) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner();
      osc.type = 'sine';
      gain.gain.value = volume;
      panner.pan.value = mode === 'left' ? -1 : mode === 'right' ? 1 : 0;

      if (mode === 'sweep') {
        osc.frequency.setValueAtTime(20, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(20000, ctx.currentTime + 12);
      } else {
        osc.frequency.value = freq;
      }

      osc.connect(gain).connect(panner).connect(ctx.destination);
      osc.start();
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
        panner.disconnect();
        if (state.osc !== osc) return;
        state.osc = null;
        state.gain = null;
        state.panner = null;
        setPlaying(null);
      };
      if (mode === 'sweep') osc.stop(ctx.currentTime + 12);
      state.osc = osc;
      state.gain = gain;
      state.panner = panner;
      setPlaying(mode);
    } catch (error) {
      if (request === state.toneRequest) setAudioError(error.message === 'unavailable' ? 'unavailable' : 'audioFailed');
    }
  }, [freq, getContext, stopTone, volume]);

  useEffect(() => {
    const state = audioRef.current;
    if (state.gain) state.gain.gain.value = volume;
  }, [volume]);

  useEffect(() => {
    const state = audioRef.current;
    if (state.osc && playing && playing !== 'sweep') state.osc.frequency.value = freq;
  }, [freq, playing]);

  const stopMic = useCallback(() => {
    const state = audioRef.current;
    state.micRequest += 1;
    state.pending = false;
    cancelAnimationFrame(state.raf);
    state.stream?.getTracks().forEach((track) => track.stop());
    state.stream = null;
    state.source?.disconnect();
    state.source = null;
    state.analyser?.disconnect();
    state.analyser = null;
    setMicPending(false);
    setMicOn(false);
    setLevel(0);
    setMicInfo({ channels: 0, rate: 0 });
  }, []);

  const startMic = useCallback(async () => {
    const state = audioRef.current;
    if (state.pending || state.stream) return;
    const request = ++state.micRequest;
    state.pending = true;
    setMicPending(true);
    setMicError(null);
    let stream;
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('unavailable');
      const ctx = getContext();
      if (ctx.state === 'suspended') await ctx.resume();
      if (request !== state.micRequest) return;
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (request !== state.micRequest) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      state.stream = stream;
      const source = ctx.createMediaStreamSource(stream);
      state.source = source;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      state.analyser = analyser;
      const track = stream.getAudioTracks()[0];
      const settings = track?.getSettings?.() || {};
      setMicInfo({ channels: settings.channelCount || 1, rate: settings.sampleRate || state.ctx.sampleRate });
      setMicOn(true);
      setPeak(0);
      track?.addEventListener('ended', () => {
        if (request === state.micRequest) stopMic();
      }, { once: true });

      const data = new Uint8Array(analyser.fftSize);
      const loop = () => {
        if (request !== state.micRequest) return;
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i += 1) {
          const value = (data[i] - 128) / 128;
          sum += value * value;
        }
        const rms = Math.sqrt(sum / data.length);
        const percent = Math.min(100, rms * 100);
        setLevel(percent);
        setPeak((current) => Math.max(current, percent));
        state.raf = requestAnimationFrame(loop);
      };
      state.raf = requestAnimationFrame(loop);
    } catch (error) {
      stream?.getTracks().forEach((track) => track.stop());
      if (request === state.micRequest) {
        stopMic();
        setMicError(error.name === 'NotAllowedError' ? 'denied' : error.message === 'unavailable' ? 'unavailable' : 'failed');
      }
    } finally {
      if (request === state.micRequest) {
        state.pending = false;
        setMicPending(false);
      }
    }
  }, [getContext, stopMic]);

  useEffect(() => () => {
    const state = audioRef.current;
    state.micRequest += 1;
    state.toneRequest += 1;
    state.pending = false;
    cancelAnimationFrame(state.raf);
    if (state.osc) state.osc.onended = null;
    state.osc?.stop();
    state.osc = null;
    state.source?.disconnect();
    state.stream?.getTracks().forEach((track) => track.stop());
    state.stream = null;
    state.ctx?.close().catch(() => {});
    state.ctx = null;
  }, []);

  return (
    <DisplayToolShell id="audio-test" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body">
        <ToolHead id="MS-24 / SOUND" title={s.title} description={s.desc} />

        <div className="msx-stack">
          <Panel title={s.speakers}>
            {audioError ? <p role="alert" className="msx-note">{s[audioError]}</p> : null}
            <div className="msx-wrap" style={{ marginBottom: 18 }}>
              <button type="button" className="msx-chip" aria-pressed={playing === 'left'} onClick={() => playTone('left')} data-testid="audio-left">{s.playLeft}</button>
              <button type="button" className="msx-chip" aria-pressed={playing === 'right'} onClick={() => playTone('right')} data-testid="audio-right">{s.playRight}</button>
              <button type="button" className="msx-chip" aria-pressed={playing === 'both'} onClick={() => playTone('both')} data-testid="audio-both">{s.playBoth}</button>
              <button type="button" className="msx-chip" aria-pressed={playing === 'sweep'} onClick={() => playTone('sweep')} data-testid="audio-sweep">{s.sweep}</button>
              <button type="button" className="msx-btn" onClick={stopTone} data-testid="audio-stop">{s.stop}</button>
            </div>
            <div className="msx-row">
              <div className="msx-field">
                <label htmlFor="audio-freq">{s.freq}: {freq} Hz</label>
                <input id="audio-freq" type="range" min="20" max="18000" step="10" value={freq} onChange={(event) => setFreq(Number(event.target.value))} style={{ width: '100%' }} />
              </div>
              <div className="msx-field">
                <label htmlFor="audio-volume">{s.volume}: {Math.round(volume * 100)}%</label>
                <input id="audio-volume" type="range" min="0" max="0.8" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ width: '100%' }} />
              </div>
            </div>
          </Panel>

          <Panel title={s.mic}>
            <div className="msx-wrap" style={{ marginBottom: 18 }}>
              <button type="button" className="msx-btn msx-btn--primary" onClick={micOn || micPending ? stopMic : startMic} data-testid="audio-mic-toggle">
                {micPending ? s.pending : micOn ? s.disableMic : s.enableMic}
              </button>
            </div>
            {micError ? <p role="alert" style={{ margin: '0 0 14px', color: 'var(--msx-alert)', fontSize: '0.85rem' }}>{s[micError]}</p> : null}
            <div className="msx-bar" style={{ height: 18, marginBottom: 14 }}>
              <i style={{ width: `${level}%`, background: level > 88 ? 'var(--msx-alert)' : 'var(--msx-signal)' }} />
            </div>
            <Readout>
              <Cell label={s.level} value={`${level.toFixed(0)}%`} phosphor />
              <Cell label={s.peak} value={`${peak.toFixed(0)}%`} />
              <Cell label={s.channels} value={micInfo.channels ? String(micInfo.channels) : '—'} />
              <Cell label={s.rate} value={micInfo.rate ? `${(micInfo.rate / 1000).toFixed(1)} kHz` : '—'} />
            </Readout>
            <p style={{ margin: '14px 0 0', color: 'var(--msx-ink-3)', fontSize: '0.82rem' }}>{s.micHint}</p>
          </Panel>

          <p className="msx-note">{s.note}</p>
        </div>
      </div>
    </DisplayToolShell>
  );
}
