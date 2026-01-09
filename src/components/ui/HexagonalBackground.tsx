import { useEffect, useRef, useState } from 'react';

interface HexagonalBackgroundProps {
  className?: string;
}

interface TouchGlow {
  x: number;
  y: number;
  intensity: number;
  id: number;
}

export default function HexagonalBackground({ className = '' }: HexagonalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const touchGlows = useRef<TouchGlow[]>([]);
  const nextGlowId = useRef(0);

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

    // Touch handlers for mobile glow effect
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      Array.from(e.touches).forEach((touch) => {
        const rect = canvas.getBoundingClientRect();
        touchGlows.current.push({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
          intensity: 1,
          id: nextGlowId.current++,
        });
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      // Update existing touch glows or add new ones
      Array.from(e.touches).forEach((touch, index) => {
        const rect = canvas.getBoundingClientRect();
        if (touchGlows.current[index]) {
          touchGlows.current[index].x = touch.clientX - rect.left;
          touchGlows.current[index].y = touch.clientY - rect.top;
          touchGlows.current[index].intensity = 1;
        } else {
          touchGlows.current.push({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
            intensity: 1,
            id: nextGlowId.current++,
          });
        }
      });
    };

    const handleTouchEnd = () => {
      // Keep glows but start fading them
      touchGlows.current.forEach((glow) => {
        glow.intensity = 0.8;
      });
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchcancel', handleTouchEnd);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = '#020617'; // Very dark blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fade out touch glows
      touchGlows.current = touchGlows.current.filter((glow) => {
        glow.intensity *= 0.95;
        return glow.intensity > 0.01;
      });

      hexagons.forEach((hex) => {
        // Calculate distance from mouse to hexagon center
        const dx = mousePos.current.x - hex.x;
        const dy = mousePos.current.y - hex.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Radius of effect

        // Calculate glow intensity based on distance from mouse
        let glowIntensity = 0;
        if (distance < maxDistance) {
          glowIntensity = 1 - distance / maxDistance;
        }

        // Add touch glow effects
        touchGlows.current.forEach((touchGlow) => {
          const tdx = touchGlow.x - hex.x;
          const tdy = touchGlow.y - hex.y;
          const tdistance = Math.sqrt(tdx * tdx + tdy * tdy);
          const touchMaxDistance = 200;
          
          if (tdistance < touchMaxDistance) {
            const touchIntensity = (1 - tdistance / touchMaxDistance) * touchGlow.intensity;
            glowIntensity = Math.max(glowIntensity, touchIntensity);
          }
        });

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

        // Add glow effect when near cursor or touch
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
            
            let nodeGlow = 0;
            if (vdistance < maxDistance) {
              nodeGlow = 1 - vdistance / maxDistance;
            }

            // Add touch glow to vertices
            touchGlows.current.forEach((touchGlow) => {
              const tvdx = touchGlow.x - vertex.x;
              const tvdy = touchGlow.y - vertex.y;
              const tvdistance = Math.sqrt(tvdx * tvdx + tvdy * tvdy);
              const touchMaxDistance = 200;
              
              if (tvdistance < touchMaxDistance) {
                const touchNodeGlow = (1 - tvdistance / touchMaxDistance) * touchGlow.intensity;
                nodeGlow = Math.max(nodeGlow, touchNodeGlow);
              }
            });

            if (nodeGlow > 0) {
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
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 ${className}`}
      style={{ zIndex: 0, touchAction: 'none' }}
    />
  );
}
