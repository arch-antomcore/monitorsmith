import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { getSponsorImageDimensionError } from '../../lib/sponsorLoopValidation';
import { loadSponsorImages, saveSponsorImages, clearSponsorImages } from '../../lib/sponsorDB';

const join = (...c) => c.filter(Boolean).join(' ');

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

const MAX_IMAGES = 15;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);
const ACCEPTED = Array.from(ACCEPTED_TYPES).join(',');

function decodeImageFile(file) {
  return new Promise((resolve, reject) => {
    const src = URL.createObjectURL(file);
    const image = new Image();

    image.decoding = 'async';
    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      image.onload = null;
      image.onerror = null;
      resolve({ src, width, height });
    };
    image.onerror = () => {
      image.onload = null;
      image.onerror = null;
      URL.revokeObjectURL(src);
      reject(new Error('decode-failed'));
    };
    image.src = src;
  });
}

export default function SponsorLoopMode({
  ariaLabel = 'Loop de marcas',
  autoFocus = false,  showControls = true,
}) {
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const playbackDeadlineRef = useRef(0);
  const importQueueRef = useRef(Promise.resolve());
  const transitionTimerRef = useRef(null);
  const dragDepthRef = useRef(0);
  const imagesRef = useRef([]);
  const isMountedRef = useRef(false);
  const closePanelButtonRef = useRef(null);
  const reopenPanelButtonRef = useRef(null);
  const pendingFocusTarget = useRef(null);
  const shouldReduceMotion = useReducedMotion();

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

  const [transitionClass, setTransitionClass] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('PNG, JPEG ou WebP; até 5 MB por arquivo e 5 MB no total.');

  const resolvedBg = BACKGROUNDS.find(b => b.color === bgColor) ? bgColor : customBg;
  const hasImages = images.length > 0;
  const resolvedTransition = shouldReduceMotion ? 'none' : transition;

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      imagesRef.current.forEach((image) => URL.revokeObjectURL(image.src));
      window.clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!pendingFocusTarget.current) return;
    const target = pendingFocusTarget.current === 'reopen'
      ? reopenPanelButtonRef.current
      : closePanelButtonRef.current;
    if (!target) return;
    target.focus({ preventScroll: true });
    pendingFocusTarget.current = null;
  }, [isPanelClosed]);

  const closePanel = () => {
    pendingFocusTarget.current = 'reopen';
    setIsPanelClosed(true);
  };

  const openPanel = () => {
    pendingFocusTarget.current = 'close';
    setIsPanelClosed(false);
  };

  // --- Autofocus ---
  useEffect(() => {
    if (!autoFocus) return;
    const el = document.activeElement;
    if (el?.matches?.('input, textarea, select, [contenteditable]')) return;
    containerRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  // --- Keyboard ---
  const handleKeyDown = (e) => {

    if (e.target !== e.currentTarget) return;
    if (e.key === ' ' && hasImages) { e.preventDefault(); setIsPlaying(p => !p); return; }
    if (e.key === 'ArrowRight' && hasImages) { e.preventDefault(); advance(); return; }
    if (e.key === 'ArrowLeft' && hasImages) { e.preventDefault(); goBack(); return; }
  };

  // --- Transition effect ---
  const applyTransition = useCallback(() => {
    window.clearTimeout(transitionTimerRef.current);
    if (resolvedTransition === 'none') {
      setTransitionClass('');
      return;
    }
    setTransitionClass(`sponsor-loop__slide--enter-${resolvedTransition}`);
    transitionTimerRef.current = window.setTimeout(
      () => setTransitionClass(''),
      transitionSpeed + 50,
    );
  }, [resolvedTransition, transitionSpeed]);

  const updateProgress = useCallback((value) => {
    const normalized = Math.max(0, Math.min(100, value)) / 100;
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${normalized})`;
    }
  }, []);

  const restartPlaybackCycle = useCallback(() => {
    playbackDeadlineRef.current = window.performance.now() + (duration * 1000);
    updateProgress(0);
  }, [duration, updateProgress]);

  // --- Navigation ---
  const advance = useCallback(() => {
    if (!images.length) return;
    setActiveIndex(i => (i + 1) % images.length);
    restartPlaybackCycle();
    applyTransition();
    if (oledShield) {
      setShiftOffset({
        x: Math.round((Math.random() - 0.5) * 4),
        y: Math.round((Math.random() - 0.5) * 4),
      });
    }
  }, [applyTransition, images.length, oledShield, restartPlaybackCycle]);

  const goBack = useCallback(() => {
    if (!images.length) return;
    setActiveIndex(i => (i - 1 + images.length) % images.length);
    restartPlaybackCycle();
    applyTransition();
  }, [applyTransition, images.length, restartPlaybackCycle]);

  // --- Playback timer ---
  useEffect(() => {
    if (!isPlaying || images.length < 2) {
      window.clearInterval(timerRef.current);
      if (images.length < 2) updateProgress(0);
      return;
    }

    restartPlaybackCycle();

    timerRef.current = window.setInterval(() => {
      const now = window.performance.now();
      const cycleDuration = duration * 1000;
      const elapsed = cycleDuration - Math.max(0, playbackDeadlineRef.current - now);
      updateProgress((elapsed / cycleDuration) * 100);
      if (now >= playbackDeadlineRef.current) {
        advance();
      }
    }, 100);

    return () => window.clearInterval(timerRef.current);
  }, [advance, duration, images.length, isPlaying, restartPlaybackCycle, updateProgress]);

  // --- File handling ---
  const processFiles = async (fileList) => {
    const candidates = Array.from(fileList);
    const accepted = [];
    const rejected = [];
    const currentImages = imagesRef.current;
    let totalBytes = currentImages.reduce((sum, image) => sum + image.size, 0);
    let availableSlots = MAX_IMAGES - currentImages.length;

    if (candidates.length) {
      setUploadMessage(
        `Validando ${candidates.length} ${candidates.length === 1 ? 'imagem' : 'imagens'}...`,
      );
    }

    for (const file of candidates) {
      if (!isMountedRef.current) {
        accepted.forEach((image) => URL.revokeObjectURL(image.src));
        return;
      }
      if (availableSlots <= 0) {
        rejected.push(`${file.name}: limite de ${MAX_IMAGES} imagens`);
        continue;
      }
      if (!ACCEPTED_TYPES.has(file.type)) {
        rejected.push(`${file.name}: formato não aceito`);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        rejected.push(`${file.name}: excede 5 MB`);
        continue;
      }
      if (totalBytes + file.size > MAX_TOTAL_BYTES) {
        rejected.push(`${file.name}: excede o limite total de 5 MB`);
        continue;
      }

      let decoded;
      try {
        decoded = await decodeImageFile(file);
      } catch {
        rejected.push(`${file.name}: não foi possível decodificar a imagem`);
        continue;
      }

      if (!isMountedRef.current) {
        URL.revokeObjectURL(decoded.src);
        accepted.forEach((image) => URL.revokeObjectURL(image.src));
        return;
      }

      const dimensionError = getSponsorImageDimensionError(decoded.width, decoded.height);
      if (dimensionError) {
        URL.revokeObjectURL(decoded.src);
        rejected.push(`${file.name}: ${dimensionError}`);
        continue;
      }

      accepted.push({
        name: file.name,
        src: decoded.src,
        size: file.size,
        width: decoded.width,
        height: decoded.height,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        file,
      });
      totalBytes += file.size;
      availableSlots -= 1;
    }

    if (!isMountedRef.current) {
      accepted.forEach((image) => URL.revokeObjectURL(image.src));
      return;
    }

    if (accepted.length) {
      const next = [...imagesRef.current, ...accepted];
      imagesRef.current = next;
      setImages(next);
      saveSponsorImages(next);
    }

    const acceptedMessage = accepted.length
      ? `${accepted.length} ${accepted.length === 1 ? 'imagem importada' : 'imagens importadas'}.`
      : '';
    const rejectedMessage = rejected.length
      ? ` ${rejected.length} ${rejected.length === 1 ? 'arquivo recusado' : 'arquivos recusados'}: ${rejected.join('; ')}.`
      : '';
    setUploadMessage(`${acceptedMessage}${rejectedMessage}`.trim() || 'Nenhum arquivo selecionado.');
  };

  const enqueueFiles = (fileList) => {
    const files = Array.from(fileList);
    importQueueRef.current = importQueueRef.current
      .catch(() => undefined)
      .then(() => processFiles(files));
    return importQueueRef.current;
  };

  useEffect(() => {
    let active = true;
    loadSponsorImages().then((saved) => {
      if (!active || !saved.length) return;
      const files = saved.map((s) => s.file).filter(Boolean);
      if (files.length) {
        void enqueueFiles(files);
      }
    });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = (e) => {
    void enqueueFiles(e.target.files);
    e.target.value = '';
  };

  const isFileDrag = (dataTransfer) => (
    Array.from(dataTransfer?.types || []).includes('Files')
  );

  const handleDragEnter = (e) => {
    if (!isFileDrag(e.dataTransfer)) return;
    e.preventDefault();
    dragDepthRef.current += 1;
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    if (!isFileDrag(e.dataTransfer)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (dragDepthRef.current === 0) return;
    e.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setIsDragOver(false);
  };

  const resetDragState = () => {
    dragDepthRef.current = 0;
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    if (!isFileDrag(e.dataTransfer)) {
      resetDragState();
      return;
    }
    e.preventDefault();
    resetDragState();
    if (e.dataTransfer.files.length) void enqueueFiles(e.dataTransfer.files);
  };

  const removeImage = (id) => {
    const removedIndex = images.findIndex((image) => image.id === id);
    if (removedIndex < 0) return;

    const removedImage = images[removedIndex];
    URL.revokeObjectURL(removedImage.src);
    const next = images.filter((image) => image.id !== id);
    imagesRef.current = next;
    setImages(next);
    saveSponsorImages(next);
    setActiveIndex((current) => {
      if (!next.length) return 0;
      const adjusted = removedIndex < current ? current - 1 : current;
      return Math.min(adjusted, next.length - 1);
    });
    if (!next.length) setIsPlaying(false);
    setUploadMessage(
      `${removedImage.name} removida. ${next.length} ${next.length === 1 ? 'imagem restante' : 'imagens restantes'}.`,
    );
  };

  const clearAll = () => {
    images.forEach((image) => URL.revokeObjectURL(image.src));
    setImages([]);
    imagesRef.current = [];
    clearSponsorImages();
    setActiveIndex(0);
    setIsPlaying(false);
    playbackDeadlineRef.current = 0;
    updateProgress(0);
    setUploadMessage('Todas as imagens foram removidas da memória local.');
  };

  // --- Current slide ---
  const currentImage = images[activeIndex] || null;

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      className={join('display-mode', 'display-mode--sponsor-loop')}
      data-mode="sponsor-loop"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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
      <div className="sponsor-loop__stage">
        {currentImage ? (
          <div
            className={join('sponsor-loop__slide', transitionClass)}
            style={{
              '--sponsor-transition-ms': `${transitionSpeed}ms`,
              transform: oledShield
                ? `translate(${shiftOffset.x}px, ${shiftOffset.y}px)`
                : undefined,
              transition: oledShield && !shouldReduceMotion ? 'transform 1.2s ease' : 'none',
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
            />
          </div>
        )}

        {/* Slide counter */}
        {hasImages && images.length > 1 && (
          <div className="sponsor-loop__counter" aria-live="polite" aria-atomic="true">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Optional, subtle position variation for long-running signage. */}
        {oledShield && hasImages && (
          <div className="sponsor-loop__oled-badge" title="Deslocamento visual sutil ativo">
            Deslocamento sutil ativo
          </div>
        )}
      </div>

      {/* Drag overlay */}
      {isDragOver && (
        <div className="sponsor-loop__drop-overlay">
          <p role="status">Solte as imagens aqui</p>
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
              ref={closePanelButtonRef}
              aria-label="Ocultar painel"
              className="display-mode__icon-button"
              onClick={closePanel}
              type="button"
              title="Minimizar painel"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {/* Upload zone */}
          <div
            className={join('sponsor-loop__upload-zone', isDragOver && 'sponsor-loop__upload-zone--active')}
            onClick={() => {
              if (images.length < MAX_IMAGES) fileInputRef.current?.click();
            }}
            onKeyDown={(event) => {
              if (images.length < MAX_IMAGES && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={images.length >= MAX_IMAGES ? -1 : 0}
            aria-label="Importar imagens PNG, JPEG ou WebP"
            aria-disabled={images.length >= MAX_IMAGES}
          >
            <span className="sponsor-loop__upload-icon">+</span>
            <span className="sponsor-loop__upload-text">
              {images.length >= MAX_IMAGES
                ? `Limite de ${MAX_IMAGES} atingido`
                : `Importar logos (${images.length}/${MAX_IMAGES})`}
            </span>
          </div>
          <p className="display-mode__hint" role="status" aria-live="polite">
            {uploadMessage}
          </p>

          {/* Thumbnails */}
          {hasImages && (
            <div className="sponsor-loop__thumbs" role="list" aria-label="Imagens carregadas">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  role="listitem"
                  className={join('sponsor-loop__thumb', idx === activeIndex && 'sponsor-loop__thumb--active')}
                >
                  <button
                    type="button"
                    className="sponsor-loop__thumb-select"
                    aria-label={`Exibir ${img.name}`}
                    aria-pressed={idx === activeIndex}
                    onClick={() => {
                      setActiveIndex(idx);
                      restartPlaybackCycle();
                      applyTransition();
                    }}
                  >
                    <img src={img.src} alt="" draggable="false" />
                  </button>
                  <button
                    type="button"
                    className="sponsor-loop__thumb-remove"
                    onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                    aria-label={`Remover ${img.name}`}
                    title={`Remover ${img.name}`}
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
            <span>Variar posição em até 2 px</span>
          </label>

          <p className="display-mode__hint">
            Os arquivos ficam apenas na memória desta aba e são liberados ao sair. Use PNG, JPEG ou WebP; SVG não é aceito por segurança. Espaço controla a reprodução e as setas navegam quando o palco está focado.
            O deslocamento sutil reduz conteúdo completamente estático, mas não evita nem repara burn-in.
            {shouldReduceMotion ? ' As transições foram removidas pela preferência de movimento reduzido.' : ''}
          </p>
        </aside>
      ) : showControls && isPanelClosed ? (
        <button
          ref={reopenPanelButtonRef}
          type="button"
          className="display-mode__reopen-panel-btn"
          onClick={openPanel}
          title="Abrir painel do loop"
          aria-label="Abrir painel de controles"
        >
          <span>Controles do loop</span>
        </button>
      ) : null}
    </section>
  );
}
