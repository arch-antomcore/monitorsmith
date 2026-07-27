import { useCallback, useEffect, useRef, useState } from 'react';

const join = (...c) => c.filter(Boolean).join(' ');
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

const TRANSITIONS = [
  { id: 'fade', label: 'Fade' },
  { id: 'zoom', label: 'Zoom' },
  { id: 'slide', label: 'Slide' },
  { id: 'none', label: 'Corte' },
];

const BACKGROUNDS = [
  { id: 'oled',   color: '#000000', label: 'Preto OLED' },
  { id: 'dark',   color: '#111113', label: 'Escuro' },
  { id: 'white',  color: '#FFFFFF', label: 'Branco' },
  { id: 'chroma', color: '#00B140', label: 'Chroma Key' },
  { id: 'blue',   color: '#0000FF', label: 'Azul Chroma' },
];

const FIT_MODES = [
  { id: 'contain', label: 'Inteira' },
  { id: 'cover', label: 'Preencher' },
];

const MAX_IMAGES = 20;
const ACCEPTED = 'image/png,image/jpeg,image/webp,image/svg+xml';

export default function SponsorLoopMode({
  ariaLabel = 'Loop de marcas',
  autoFocus = false,
  onExit,
  showControls = true,
}) {
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPanelClosed, setIsPanelClosed] = useState(false);

  const [duration, setDuration] = useState(5);
  const [transition, setTransition] = useState('fade');
  const [transitionSpeed, setTransitionSpeed] = useState(600);
  const [bgColor, setBgColor] = useState('#000000');
  const [customBg, setCustomBg] = useState('#1A1A2E');
  const [fitMode, setFitMode] = useState('contain');
  const [imageScale, setImageScale] = useState(60);
  const [oledShield, setOledShield] = useState(false);
  const [shiftOffset, setShiftOffset] = useState({ x: 0, y: 0 });

  const [progress, setProgress] = useState(0);
  const [transitionClass, setTransitionClass] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const resolvedBg = BACKGROUNDS.find(b => b.color === bgColor) ? bgColor : customBg;
  const hasImages = images.length > 0;

  // --- Autofocus ---
  useEffect(() => {
    if (!autoFocus) return;
    const el = document.activeElement;
    if (el?.matches?.('input, textarea, select, [contenteditable]')) return;
    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  // --- Keyboard ---
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && onExit) { e.preventDefault(); onExit(); return; }
    if (e.key === ' ' && hasImages) { e.preventDefault(); setIsPlaying(p => !p); return; }
    if (e.key === 'ArrowRight' && hasImages) { e.preventDefault(); advance(); return; }
    if (e.key === 'ArrowLeft' && hasImages) { e.preventDefault(); goBack(); return; }
  };

  // --- Navigation ---
  const advance = useCallback(() => {
    setActiveIndex(i => (i + 1) % images.length);
    setProgress(0);
    applyTransition();
    if (oledShield) {
      setShiftOffset({
        x: Math.round((Math.random() - 0.5) * 4),
        y: Math.round((Math.random() - 0.5) * 4),
      });
    }
  }, [images.length, transition, oledShield]);

  const goBack = useCallback(() => {
    setActiveIndex(i => (i - 1 + images.length) % images.length);
    setProgress(0);
    applyTransition();
  }, [images.length, transition]);

  // --- Transition effect ---
  const applyTransition = useCallback(() => {
    if (transition === 'none') return;
    setTransitionClass(`sponsor-loop__slide--enter-${transition}`);
    const timer = setTimeout(() => setTransitionClass(''), transitionSpeed + 50);
    return () => clearTimeout(timer);
  }, [transition, transitionSpeed]);

  // --- Playback timer ---
  useEffect(() => {
    if (!isPlaying || images.length < 2) {
      clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 50;
    const totalTicks = (duration * 1000) / intervalMs;
    let tick = 0;

    timerRef.current = setInterval(() => {
      tick++;
      setProgress((tick / totalTicks) * 100);
      if (tick >= totalTicks) {
        tick = 0;
        setProgress(0);
        advance();
      }
    }, intervalMs);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, duration, images.length, advance]);

  // --- File handling ---
  const processFiles = (fileList) => {
    const incoming = Array.from(fileList)
      .filter(f => f.type.startsWith('image/'))
      .slice(0, MAX_IMAGES - images.length);

    if (!incoming.length) return;

    const readers = incoming.map(file =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, src: reader.result, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` });
        reader.readAsDataURL(file);
      })
    );

    Promise.all(readers).then(results => {
      setImages(prev => [...prev, ...results].slice(0, MAX_IMAGES));
    });
  };

  const handleFileSelect = (e) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const removeImage = (id) => {
    setImages(prev => {
      const next = prev.filter(img => img.id !== id);
      if (activeIndex >= next.length && next.length > 0) {
        setActiveIndex(next.length - 1);
      }
      if (!next.length) {
        setIsPlaying(false);
        setActiveIndex(0);
      }
      return next;
    });
  };

  const clearAll = () => {
    setImages([]);
    setActiveIndex(0);
    setIsPlaying(false);
    setProgress(0);
  };

  // --- Current slide ---
  const currentImage = images[activeIndex] || null;

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className={join('display-mode', 'display-mode--sponsor-loop')}
      data-mode="sponsor-loop"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      {/* Canvas / Background */}
      <div
        aria-hidden="true"
        className="display-mode__canvas display-mode__canvas--sponsor-loop"
        style={{ backgroundColor: resolvedBg }}
      />

      {/* Slide display */}
      <main className="sponsor-loop__stage">
        {currentImage ? (
          <div
            className={join('sponsor-loop__slide', transitionClass)}
            style={{
              '--sponsor-transition-ms': `${transitionSpeed}ms`,
              transform: oledShield
                ? `translate(${shiftOffset.x}px, ${shiftOffset.y}px)`
                : undefined,
              transition: oledShield ? 'transform 1.2s ease' : undefined,
            }}
          >
            <img
              src={currentImage.src}
              alt={currentImage.name}
              draggable="false"
              style={{
                objectFit: fitMode,
                maxWidth: fitMode === 'contain' ? `${imageScale}%` : '100%',
                maxHeight: fitMode === 'contain' ? `${imageScale}%` : '100%',
                width: fitMode === 'cover' ? '100%' : undefined,
                height: fitMode === 'cover' ? '100%' : undefined,
              }}
            />
          </div>
        ) : (
          <div className="sponsor-loop__empty">
            <p className="sponsor-loop__empty-icon">📺</p>
            <p className="sponsor-loop__empty-title">Nenhuma imagem carregada</p>
            <p className="sponsor-loop__empty-hint">
              Arraste logos aqui ou use o painel lateral para importar.
            </p>
          </div>
        )}

        {/* Progress bar */}
        {hasImages && images.length > 1 && (
          <div className="sponsor-loop__progress-bar" aria-hidden="true">
            <div
              ref={progressRef}
              className="sponsor-loop__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Slide counter */}
        {hasImages && images.length > 1 && (
          <div className="sponsor-loop__counter">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* OLED Shield indicator */}
        {oledShield && hasImages && (
          <div className="sponsor-loop__oled-badge" title="Proteção anti burn-in ativa">
            🛡️ OLED Safe
          </div>
        )}
      </main>

      {/* Drag overlay */}
      {isDragOver && (
        <div
          className="sponsor-loop__drop-overlay"
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <p>Solte as imagens aqui</p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED}
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Global drag listener (captures drags from outside the drop zone) */}
      <div
        className="sponsor-loop__drag-catcher"
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        aria-hidden="true"
      />

      {/* Controls panel */}
      {showControls && !isPanelClosed ? (
        <aside
          aria-label="Controles do loop de marcas"
          className="display-mode__controls display-mode__controls--sponsor-loop"
        >
          <div className="display-mode__panel-header">
            <div>
              <p className="display-mode__eyebrow">Signage Studio</p>
              <h2 className="display-mode__title">Loop de Marcas</h2>
            </div>
            <button
              aria-label="Ocultar painel"
              className="display-mode__icon-button"
              onClick={() => setIsPanelClosed(true)}
              type="button"
              title="Minimizar painel"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {/* Upload zone */}
          <div
            className={join('sponsor-loop__upload-zone', isDragOver && 'sponsor-loop__upload-zone--active')}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            role="button"
            tabIndex="0"
            aria-label="Importar imagens"
          >
            <span className="sponsor-loop__upload-icon">+</span>
            <span className="sponsor-loop__upload-text">
              {images.length >= MAX_IMAGES
                ? `Limite de ${MAX_IMAGES} atingido`
                : `Importar logos (${images.length}/${MAX_IMAGES})`}
            </span>
          </div>

          {/* Thumbnails */}
          {hasImages && (
            <div className="sponsor-loop__thumbs" role="list" aria-label="Imagens carregadas">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  role="listitem"
                  className={join('sponsor-loop__thumb', idx === activeIndex && 'sponsor-loop__thumb--active')}
                  onClick={() => { setActiveIndex(idx); setProgress(0); applyTransition(); }}
                >
                  <img src={img.src} alt={img.name} draggable="false" />
                  <button
                    type="button"
                    className="sponsor-loop__thumb-remove"
                    onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                    aria-label={`Remover ${img.name}`}
                    title="Remover"
                  >×</button>
                </div>
              ))}
            </div>
          )}

          {hasImages && (
            <button type="button" className="sponsor-loop__clear-btn" onClick={clearAll}>
              Limpar todas
            </button>
          )}

          {/* Playback */}
          {hasImages && images.length > 1 && (
            <div className="sponsor-loop__playback">
              <button
                type="button"
                className={join('sponsor-loop__play-btn', isPlaying && 'sponsor-loop__play-btn--active')}
                onClick={() => setIsPlaying(p => !p)}
              >
                {isPlaying ? '⏸ Pausar' : '▶ Iniciar'}
              </button>
            </div>
          )}

          {/* Duration */}
          <label className="display-mode__field" htmlFor="sl-duration">
            <span className="display-mode__field-label">
              Tempo por slide <output>{duration}s</output>
            </span>
            <input
              id="sl-duration"
              type="range"
              min="1" max="60" step="1"
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
            />
          </label>

          {/* Transition type */}
          <div className="display-mode__field">
            <span className="display-mode__field-label">Transição</span>
            <div className="display-mode__preset-row" role="group" aria-label="Tipo de transição">
              {TRANSITIONS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className="display-mode__preset-button"
                  aria-pressed={transition === t.id}
                  onClick={() => setTransition(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transition speed */}
          {transition !== 'none' && (
            <label className="display-mode__field" htmlFor="sl-speed">
              <span className="display-mode__field-label">
                Velocidade <output>{transitionSpeed}ms</output>
              </span>
              <input
                id="sl-speed"
                type="range"
                min="200" max="2000" step="100"
                value={transitionSpeed}
                onChange={e => setTransitionSpeed(Number(e.target.value))}
              />
            </label>
          )}

          {/* Fit mode */}
          <div className="display-mode__field">
            <span className="display-mode__field-label">Escala</span>
            <div className="display-mode__preset-row" role="group" aria-label="Modo de ajuste">
              {FIT_MODES.map(f => (
                <button
                  key={f.id}
                  type="button"
                  className="display-mode__preset-button"
                  aria-pressed={fitMode === f.id}
                  onClick={() => setFitMode(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image scale (only for contain) */}
          {fitMode === 'contain' && (
            <label className="display-mode__field" htmlFor="sl-scale">
              <span className="display-mode__field-label">
                Tamanho <output>{imageScale}%</output>
              </span>
              <input
                id="sl-scale"
                type="range"
                min="10" max="100" step="5"
                value={imageScale}
                onChange={e => setImageScale(Number(e.target.value))}
              />
            </label>
          )}

          {/* Background color */}
          <div className="display-mode__field">
            <span className="display-mode__field-label">Fundo</span>
            <div className="sponsor-loop__bg-grid" role="group" aria-label="Cor de fundo">
              {BACKGROUNDS.map(bg => (
                <button
                  key={bg.id}
                  type="button"
                  className={join('sponsor-loop__bg-btn', bgColor === bg.color && 'sponsor-loop__bg-btn--active')}
                  style={{ '--swatch': bg.color }}
                  aria-pressed={bgColor === bg.color}
                  onClick={() => setBgColor(bg.color)}
                  title={bg.label}
                >
                  <span className="sponsor-loop__bg-swatch" />
                  <span className="sponsor-loop__bg-label">{bg.label}</span>
                </button>
              ))}
              <label className={join('sponsor-loop__bg-btn sponsor-loop__bg-btn--custom', !BACKGROUNDS.find(b => b.color === bgColor) && 'sponsor-loop__bg-btn--active')}>
                <input
                  type="color"
                  value={customBg}
                  onChange={e => { setCustomBg(e.target.value); setBgColor(e.target.value); }}
                  className="sponsor-loop__bg-picker"
                />
                <span className="sponsor-loop__bg-swatch" style={{ '--swatch': customBg }} />
                <span className="sponsor-loop__bg-label">Livre</span>
              </label>
            </div>
          </div>

          {/* OLED Shield */}
          <label className="calibration-lab__guide-toggle" style={{ marginTop: '6px' }}>
            <input
              type="checkbox"
              checked={oledShield}
              onChange={e => setOledShield(e.target.checked)}
            />
            <span>Proteção OLED (pixel shift)</span>
          </label>

          <p className="display-mode__hint">
            Arraste logos PNG/SVG transparentes para melhor resultado.
            Tecle Espaço para play/pausa e setas para navegar.
          </p>
        </aside>
      ) : showControls && isPanelClosed ? (
        <button
          type="button"
          className="display-mode__reopen-panel-btn"
          onClick={() => setIsPanelClosed(false)}
          title="Abrir painel do loop"
          aria-label="Abrir painel de controles"
        >
          <span>Controles do loop</span>
        </button>
      ) : null}
    </section>
  );
}
