import { useEffect, useRef } from 'react';

interface HexagonalBackgroundProps {
  className?: string;
}

export default function HexagonalBackground({ className = '' }: HexagonalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Hexagon parameters
    const hexRadius = 40;
    const hexHeight = Math.sqrt(3) * hexRadius;
    const hexWidth = 2 * hexRadius;
    const vertDist = hexHeight;
    const horizDist = hexWidth * 0.75;

    // Create hexagon grid
    const hexagons: Array<{ x: number; y: number; vertices: Array<{ x: number; y: number }> }> = [];

    const createHexagonVertices = (centerX: number, centerY: number) => {
      const vertices: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        vertices.push({
          x: centerX + hexRadius * Math.cos(angle),
          y: centerY + hexRadius * Math.sin(angle),
        });
      }
      return vertices;
    };

    // Generate hexagon grid
    const cols = Math.ceil(canvas.width / horizDist) + 2;
    const rows = Math.ceil(canvas.height / vertDist) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * horizDist;
        const y = row * vertDist + (col % 2 === 1 ? vertDist / 2 : 0);
        hexagons.push({
          x,
          y,
          vertices: createHexagonVertices(x, y),
        });
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = '#020617'; // Very dark blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      hexagons.forEach((hex) => {
        // Calculate distance from mouse to hexagon center
        const dx = mousePos.current.x - hex.x;
        const dy = mousePos.current.y - hex.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Radius of effect

        // Calculate glow intensity based on distance
        let glowIntensity = 0;
        if (distance < maxDistance) {
          glowIntensity = 1 - distance / maxDistance;
        }

        // Draw hexagon
        ctx.beginPath();
        hex.vertices.forEach((vertex, index) => {
          if (index === 0) {
            ctx.moveTo(vertex.x, vertex.y);
          } else {
            ctx.lineTo(vertex.x, vertex.y);
          }
        });
        ctx.closePath();

        // Base color (darker blue-gray)
        const baseR = 30;
        const baseG = 41;
        const baseB = 59;

        // Glow color (bright cyan-blue)
        const glowR = 56;
        const glowG = 189;
        const glowB = 248;

        // Interpolate colors based on glow intensity
        const r = Math.round(baseR + (glowR - baseR) * glowIntensity);
        const g = Math.round(baseG + (glowG - baseG) * glowIntensity);
        const b = Math.round(baseB + (glowB - baseB) * glowIntensity);

        // Set line style
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.3 + glowIntensity * 0.7})`;
        ctx.lineWidth = 1 + glowIntensity * 2;

        // Add glow effect when near cursor
        if (glowIntensity > 0) {
          ctx.shadowBlur = 10 + glowIntensity * 20;
          ctx.shadowColor = `rgba(${glowR}, ${glowG}, ${glowB}, ${glowIntensity})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.stroke();

        // Draw nodes at vertices with glow
        if (glowIntensity > 0.3) {
          hex.vertices.forEach((vertex) => {
            const vdx = mousePos.current.x - vertex.x;
            const vdy = mousePos.current.y - vertex.y;
            const vdistance = Math.sqrt(vdx * vdx + vdy * vdy);
            
            if (vdistance < maxDistance) {
              const nodeGlow = 1 - vdistance / maxDistance;
              ctx.beginPath();
              ctx.arc(vertex.x, vertex.y, 2 + nodeGlow * 3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${glowR}, ${glowG}, ${glowB}, ${nodeGlow})`;
              ctx.shadowBlur = 5 + nodeGlow * 15;
              ctx.shadowColor = `rgba(${glowR}, ${glowG}, ${glowB}, ${nodeGlow})`;
              ctx.fill();
            }
          });
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
