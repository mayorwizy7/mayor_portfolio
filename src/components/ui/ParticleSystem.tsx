import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  particleCount?: number;
  connectionDistance?: number;
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  particleCount = 50,
  connectionDistance = 100,
  className = "absolute inset-0 pointer-events-none" 
}) => {  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const colors = [
      '#6366f1', // primary-500
      '#14b8a6', // secondary-500
      '#ef4444', // accent-500
      '#00f5ff', // neon-blue
      '#ff0080', // neon-pink
      '#39ff14', // neon-green
      '#bf00ff', // neon-purple
    ];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200,
    };
  }, []);

  const updateParticle = (particle: Particle, canvas: HTMLCanvasElement): void => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life++;

    // Fade out as particle ages
    particle.opacity = Math.max(0, 1 - particle.life / particle.maxLife);

    // Wrap around edges
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle): void => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = particle.color;
    
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };  const connectParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]): void => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.save();
          ctx.globalAlpha = (1 - distance / connectionDistance) * 0.3;
          ctx.strokeStyle = particles[i].color;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 5;
          ctx.shadowColor = particles[i].color;
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          
          ctx.restore();
        }
      }
    }
  }, [connectionDistance]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    // Initial resize
    resizeCanvas();
    
    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
    
    // Use ResizeObserver for better parent size detection
    let resizeObserver: ResizeObserver | null = null;
    if (canvas.parentElement && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(canvas.parentElement);
    }

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle(canvas));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.map(particle => {
        updateParticle(particle, canvas);
        
        // Replace dead particles
        if (particle.life >= particle.maxLife) {
          return createParticle(canvas);
        }
        
        drawParticle(ctx, particle);
        return particle;
      });

      // Connect nearby particles
      connectParticles(ctx, particlesRef.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, createParticle, connectParticles]);  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleSystem;
