import { useCallback, useEffect, useRef, useState } from 'react';
import { DisplayToolShell } from './DisplayToolShell';
import { Cell, Panel, Readout, ToolHead } from './InstrumentParts';
import { useI18n } from '../../i18n';

const L = {
  pt: {
    title: 'Teste de controle',
    desc: 'Conecte o controle por cabo ou Bluetooth e aperte qualquer botão para o navegador reconhecê-lo.',
    waiting: 'Aguardando um controle… aperte um botão do dispositivo conectado.',
    device: 'Dispositivo', mapping: 'Mapeamento', buttonsOn: 'Botões pressionados', axesCount: 'Eixos',
    drift: 'Desvio dos analógicos', driftHint: 'Maior desvio dos quatro eixos padrão; solte os analógicos para avaliar',
    buttons: 'Botões', axes: 'Eixos analógicos', rumble: 'Testar vibração',
    driftOk: 'Desvio abaixo de 0,05 nos analógicos padrão.',
    driftMid: 'Desvio entre 0,05 e 0,08. Solte os analógicos e observe.',
    driftBad: 'Desvio acima de 0,08. Se persistir sem toque, investigue calibração ou drift; esta leitura não confirma defeito.',
    unavailable: 'O navegador não disponibilizou acesso ao controle.',
    driftUnknown: 'Este mapeamento não permite identificar os analógicos. Avalie cada eixo individualmente.',
    rumbleFailed: 'Vibração indisponível ou interrompida neste controle/navegador.',
    note: 'Solte totalmente os analógicos ao ler o drift. Alguns controles só aparecem depois do primeiro botão pressionado, por decisão de privacidade do navegador.',
  },
  en: {
    title: 'Gamepad test',
    desc: 'Connect the controller over cable or Bluetooth and press any button so the browser can see it.',
    waiting: 'Waiting for a gamepad… press a button on the connected device.',
    device: 'Device', mapping: 'Mapping', buttonsOn: 'Buttons held', axesCount: 'Axes',
    drift: 'Stick deviation', driftHint: 'Largest deviation of the four standard axes; release sticks to assess',
    buttons: 'Buttons', axes: 'Analog axes', rumble: 'Test rumble',
    driftOk: 'Deviation below 0.05 on the standard sticks.',
    driftMid: 'Deviation from 0.05 to 0.08. Release the sticks and observe.',
    driftBad: 'Deviation above 0.08. If it persists untouched, investigate calibration or drift; this reading does not confirm a fault.',
    unavailable: 'The browser did not provide gamepad access.',
    driftUnknown: 'This mapping does not identify the sticks. Assess each axis individually.',
    rumbleFailed: 'Rumble is unavailable or interrupted on this controller/browser.',
    note: 'Fully release the sticks when reading drift. Some controllers only appear after the first button press, by browser privacy design.',
  },
  es: {
    title: 'Prueba de mando',
    desc: 'Conecta el mando por cable o Bluetooth y pulsa cualquier botón para que el navegador lo detecte.',
    waiting: 'Esperando un mando… pulsa un botón del dispositivo conectado.',
    device: 'Dispositivo', mapping: 'Mapeo', buttonsOn: 'Botones pulsados', axesCount: 'Ejes',
    drift: 'Desvío de los sticks', driftHint: 'Mayor desvío de los cuatro ejes estándar; suelta los sticks para evaluar',
    buttons: 'Botones', axes: 'Ejes analógicos', rumble: 'Probar vibración',
    driftOk: 'Desvío por debajo de 0,05 en los sticks estándar.',
    driftMid: 'Desvío entre 0,05 y 0,08. Suelta los sticks y observa.',
    driftBad: 'Desvío superior a 0,08. Si persiste sin tocar, investiga calibración o drift; esta lectura no confirma un defecto.',
    unavailable: 'El navegador no proporcionó acceso al mando.',
    driftUnknown: 'Este mapeo no identifica los sticks. Evalúa cada eje individualmente.',
    rumbleFailed: 'Vibración no disponible o interrumpida en este mando/navegador.',
    note: 'Suelta por completo los sticks al leer el drift. Algunos mandos solo aparecen tras la primera pulsación, por privacidad del navegador.',
  },
};

export default function GamepadTestMode({ onExit }) {
  const { locale } = useI18n();
  const s = L[locale] || L.pt;
  const [pad, setPad] = useState(null);
  const [unavailable, setUnavailable] = useState(false);
  const [rumbleFailed, setRumbleFailed] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const poll = () => {
      let pads;
      try {
        if (!navigator.getGamepads) throw new Error('unsupported');
        pads = navigator.getGamepads();
      } catch {
        setUnavailable(true);
        return;
      }
      const found = Array.from(pads).find(Boolean);
      if (found) {
        setPad({
          id: found.id,
          mapping: found.mapping || 'unknown',
          index: found.index,
          buttons: found.buttons.map((button) => ({ pressed: button.pressed, value: button.value })),
          axes: Array.from(found.axes),
          canRumble: typeof found.vibrationActuator?.playEffect === 'function',
        });
      } else {
        setPad(null);
      }
      frameRef.current = requestAnimationFrame(poll);
    };
    frameRef.current = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const padIndex = pad?.index;
  const rumble = useCallback(async () => {
    setRumbleFailed(false);
    try {
      const found = navigator.getGamepads?.()[padIndex];
      if (!found?.vibrationActuator?.playEffect) throw new Error('unsupported');
      const result = await found.vibrationActuator.playEffect('dual-rumble', {
        duration: 500,
        strongMagnitude: 0.9,
        weakMagnitude: 0.6,
      });
      if (result === 'preempted') setRumbleFailed(true);
    } catch {
      setRumbleFailed(true);
    }
  }, [padIndex]);

  const drift = pad?.mapping === 'standard' && pad.axes.length >= 4
    ? Math.max(...pad.axes.slice(0, 4).map((axis) => Math.abs(axis))) : null;
  const heldCount = pad ? pad.buttons.filter((button) => button.pressed).length : 0;

  return (
    <DisplayToolShell id="gamepad-test" title={s.title} className="msx-scrollable" visible={false} onExit={onExit}>
      <div className="msx-tool-body">
        <ToolHead
          id="MS-23 / PAD"
          title={s.title}
          description={s.desc}
          actions={pad ? <button type="button" disabled={!pad.canRumble} className="msx-btn msx-btn--primary" onClick={rumble} data-testid="gamepad-rumble">{s.rumble}</button> : null}
        />
        {rumbleFailed ? <p role="status" className="msx-note">{s.rumbleFailed}</p> : null}

        {!pad ? (
          <p className="msx-note" data-testid="gamepad-waiting">{unavailable ? s.unavailable : s.waiting}</p>
        ) : (
          <div className="msx-stack">
            <Readout>
              <Cell label={s.device} value={pad.id.slice(0, 26)} hint={pad.id} />
              <Cell label={s.mapping} value={pad.mapping} />
              <Cell label={s.buttonsOn} value={`${heldCount} / ${pad.buttons.length}`} phosphor />
              <Cell label={s.axesCount} value={String(pad.axes.length)} />
              <Cell label={s.drift} value={drift === null ? '—' : drift.toFixed(3)} hint={s.driftHint} />
            </Readout>

            <Panel title={s.buttons}>
              <div className="msx-wrap">
                {pad.buttons.map((button, index) => (
                  <span
                    key={index}
                    data-testid={`gamepad-btn-${index}`}
                    style={{
                      minWidth: 46,
                      padding: '10px 8px',
                      border: `1px solid ${button.pressed ? 'var(--msx-phos)' : 'var(--msx-hair)'}`,
                      background: button.pressed ? 'var(--msx-phos)' : 'var(--msx-panel-2)',
                      color: button.pressed ? 'var(--msx-phos-ink)' : 'var(--msx-ink-3)',
                      fontFamily: 'var(--msx-font-mono)',
                      fontSize: '0.7rem',
                      textAlign: 'center',
                    }}
                  >
                    {index}
                    {button.value > 0 && button.value < 1 ? <em style={{ display: 'block', fontStyle: 'normal', fontSize: '0.6rem' }}>{button.value.toFixed(2)}</em> : null}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title={s.axes}>
              <div className="msx-stack" style={{ gap: 12 }}>
                {pad.axes.map((axis, index) => (
                  <div key={index}>
                    <p style={{ margin: '0 0 5px', color: 'var(--msx-ink-3)', fontFamily: 'var(--msx-font-mono)', fontSize: '0.66rem' }}>
                      Axis {index}: {axis.toFixed(4)}
                    </p>
                    <div className="msx-bar" style={{ position: 'relative' }}>
                      <i style={{ width: `${Math.abs(axis) * 50}%`, marginLeft: axis < 0 ? `${50 - Math.abs(axis) * 50}%` : '50%' }} />
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ margin: '16px 0 0', color: drift > 0.08 ? 'var(--msx-alert)' : 'var(--msx-signal)', fontSize: '0.84rem' }}>
                {drift === null ? s.driftUnknown : drift > 0.08 ? s.driftBad : drift >= 0.05 ? s.driftMid : s.driftOk}
              </p>
            </Panel>

            <p className="msx-note">{s.note}</p>
          </div>
        )}
      </div>
    </DisplayToolShell>
  );
}
