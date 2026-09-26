import { useCallback, useEffect, useRef, useState } from "react";
import DisplayToolShell from "./DisplayToolShell";

const colorPalette = ["#ff3b30", "#34c759", "#007aff", "#ff9500", "#af52de", "#ff2d55", "#5ac8fa", "#ffcc00", "#ffffff", "#000000"];

export default function TouchTesterMode({ showControls: globalShowControls = true }) {
  const [localControlsVisible, setLocalControlsVisible] = useState(true);
  const showControls = globalShowControls && localControlsVisible;
  const [maxTouches, setMaxTouches] = useState(0);
  const [currentTouches, setCurrentTouches] = useState(0);
  const canvasRef = useRef(null);
  const gridCache = useRef(new Set());
  const gestureRef = useRef(null);
  const CELL_SIZE = 40; // 40px grid

  const activeTouches = useRef(new Map()); // id -> {x, y, color}

  useEffect(() => {
    let animationFrame;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      gridCache.current.clear();
      setMaxTouches(0);
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Fill painted cells
      ctx.fillStyle = "rgba(251, 191, 36, 0.4)"; // Amber tint for tested areas
      for (const key of gridCache.current) {
        const [cx, cy] = key.split(',').map(Number);
        ctx.fillRect(cx * CELL_SIZE, cy * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }

      // Draw grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += CELL_SIZE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += CELL_SIZE) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw active touches
      activeTouches.current.forEach((touch) => {
        ctx.beginPath();
        ctx.arc(touch.x, touch.y, 45, 0, 2 * Math.PI);
        ctx.fillStyle = touch.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      });

      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const updateGrid = (clientX, clientY) => {
    const cx = Math.floor(clientX / CELL_SIZE);
    const cy = Math.floor(clientY / CELL_SIZE);
    const key = `${cx},${cy}`;
    if (!gridCache.current.has(key)) {
      gridCache.current.add(key);
    }
  };

  const handleTouch = useCallback((e) => {
    if (e.target.closest?.('.display-mode__controls, .display-mode__reopen-panel-btn, button, a[href], input, select, textarea')) return;

    const touches = e.touches;
    const currentCount = touches.length;
    const primaryTouch = touches[0];

    if (e.type === 'touchstart' && primaryTouch && !gestureRef.current) {
      gestureRef.current = {
        startX: primaryTouch.clientX,
        startY: primaryTouch.clientY,
        moved: false,
        wasControlsVisible: showControls,
      };
      if (showControls) setLocalControlsVisible(false);
    } else if (e.type === 'touchmove' && primaryTouch && gestureRef.current) {
      const deltaX = primaryTouch.clientX - gestureRef.current.startX;
      const deltaY = primaryTouch.clientY - gestureRef.current.startY;
      if (Math.hypot(deltaX, deltaY) > 12) gestureRef.current.moved = true;
    }

    setCurrentTouches(currentCount);
    
    // Use functional state update to ensure latest value
    setMaxTouches(prev => Math.max(prev, currentCount));

    const currentMap = new Map();
    for (let i = 0; i < touches.length; i++) {
      const t = touches[i];
      const color = colorPalette[t.identifier % colorPalette.length];
      currentMap.set(t.identifier, { x: t.clientX, y: t.clientY, color });
      updateGrid(t.clientX, t.clientY);
    }
    activeTouches.current = currentMap;
  }, [showControls]);

  const handleTouchEnd = useCallback((e) => {
    const touches = e.touches;
    setCurrentTouches(touches.length);
    const currentMap = new Map();
    for (let i = 0; i < touches.length; i++) {
      const t = touches[i];
      const color = colorPalette[t.identifier % colorPalette.length];
      currentMap.set(t.identifier, { x: t.clientX, y: t.clientY, color });
    }
    activeTouches.current = currentMap;

    if (touches.length === 0) {
      const gesture = gestureRef.current;
      gestureRef.current = null;
      if (e.type !== 'touchcancel' && globalShowControls && gesture && !gesture.wasControlsVisible && !gesture.moved) {
        setLocalControlsVisible(true);
      }
    }
  }, [globalShowControls]);

  const handlePointerDown = useCallback((e) => {
    if (e.target.closest?.('.display-mode__controls, .display-mode__reopen-panel-btn, button, a[href], input, select, textarea')) return;
    if (e.pointerType !== 'mouse') return; // let onTouch handle touches
    if (e.buttons !== 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    gestureRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
      wasControlsVisible: showControls,
    };
    if (showControls) setLocalControlsVisible(false);
    updateGrid(e.clientX, e.clientY);
    activeTouches.current.set(e.pointerId, { x: e.clientX, y: e.clientY, color: colorPalette[0] });
    setCurrentTouches(activeTouches.current.size);
    setMaxTouches(prev => Math.max(prev, activeTouches.current.size));
  }, [showControls]);

  const handlePointerMove = useCallback((e) => {
    if (e.pointerType !== 'mouse') return;
    if (e.buttons !== 1) return;
    if (activeTouches.current.has(e.pointerId)) {
      activeTouches.current.set(e.pointerId, { x: e.clientX, y: e.clientY, color: colorPalette[0] });
      updateGrid(e.clientX, e.clientY);
      if (gestureRef.current) {
        const deltaX = e.clientX - gestureRef.current.startX;
        const deltaY = e.clientY - gestureRef.current.startY;
        if (Math.hypot(deltaX, deltaY) > 12) gestureRef.current.moved = true;
      }
    }
  }, []);

  const handlePointerUp = useCallback((e) => {
    if (e.pointerType !== 'mouse') return;
    activeTouches.current.delete(e.pointerId);
    setCurrentTouches(activeTouches.current.size);
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (e.type !== 'pointercancel' && globalShowControls && gesture && !gesture.wasControlsVisible && !gesture.moved) {
      setLocalControlsVisible(true);
    }
  }, [globalShowControls]);

  const clearGrid = () => {
    gridCache.current.clear();
    setMaxTouches(0);
  };

  return (
    <div 
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#000', touchAction: 'none' }}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', touchAction: 'none' }}
      />
      
      <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10, color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.6)', padding: '12px 20px', borderRadius: '12px', fontSize: '15px', fontFamily: 'monospace', pointerEvents: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ marginBottom: '4px' }}><strong style={{ color: '#fbbf24' }}>Máximo de contatos:</strong> {maxTouches}</div>
        <div><strong style={{ color: '#fbbf24' }}>Contatos ativos:</strong> {currentTouches}</div>
      </div>

      <DisplayToolShell
        id="touch-tester"
        visible={showControls}
        title="Teste de Touchscreen"
        subtitle="Registre eventos de toque e simultaneidade"
        instructions={[
          "Deslize os dedos por toda a tela para pintar a grade e repetir áreas que não receberam eventos de toque.",
          "Use vários dedos ao mesmo tempo para observar quantos contatos simultâneos chegam ao navegador.",
          "Para esconder este menu, toque fora dele. Para mostrá-lo novamente, dê um toque rápido na tela."
        ]}
        technicalLimit="O sistema, o navegador e gestos reservados podem interceptar contatos. Uma área não pintada ou um contador menor não confirma, sozinho, defeito nem o limite físico do digitalizador."
        controls={
          <div className="display-mode__control-stack">
            <button
              type="button"
              className="display-mode__action-button"
              onClick={(e) => { e.stopPropagation(); clearGrid(); }}
              style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              Limpar Tela e Reiniciar
            </button>
          </div>
        }
      />
    </div>
  );
}
