import React, { useRef, useEffect } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    margin: '1rem 0',
    width: '100%',
    minWidth: 300,
    maxWidth: 720,
    boxSizing: 'border-box' as const,
  },
  canvas: {
    border: '2px solid #333',
    borderRadius: '8px',
    background: '#fff',
    touchAction: 'none' as const,
    cursor: 'crosshair',
    width: '100%',
    minWidth: 300,
    maxWidth: 720,
    height: 350,
    display: 'block',
    boxSizing: 'border-box' as const,
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.7rem 1.2rem',
    background: '#9333ea',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

const PizarraPaint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ajustar el tamaño del canvas al ancho del contenedor
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        const width = Math.max(Math.min(container.offsetWidth, 600), 300);
        const height = 350;
        // Guardar el dibujo actual
        const ctx = canvas.getContext('2d');
        const image = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = width;
        canvas.height = height;
        if (image) ctx?.putImageData(image, 0, 0);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX = 0, clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    // Ajustar a la escala real del canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    drawing.current = true;
    lastPos.current = getPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !lastPos.current) return;
    const { x, y } = getPos(e);
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPos.current = { x, y };
  };

  const endDraw = () => {
    drawing.current = false;
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <h3 style={{ color: '#111', fontWeight: 'bold', marginBottom: 8, fontSize: 18, textAlign: 'center' }}>
        Pizarra para tus operaciones
      </h3>
      <canvas
        ref={canvasRef}
        width={600}
        height={350}
        style={styles.canvas}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />
      <button style={styles.button} onClick={clearCanvas} type="button">
        Limpiar pizarra
      </button>
    </div>
  );
};

export default PizarraPaint; 