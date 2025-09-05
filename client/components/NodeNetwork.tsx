import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Cluster = {
  cx: number;
  cy: number;
  label: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  room: number;
};

interface NodeNetworkProps {
  className?: string;
  particles?: number;
  speed?: number;
  opacity?: number;
  interactive?: boolean;
  lineAlpha?: number;
  showLabels?: boolean;
}

const labels = ["Living", "Kitchen", "Bedroom", "Study"]; // max 4 clusters used

const NodeNetwork: React.FC<NodeNetworkProps> = ({ className, particles: particlesProp, speed = 0.6, opacity = 1, interactive = false, lineAlpha = 0.18, showLabels = true }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [labelPositions, setLabelPositions] = useState<{ x: number; y: number; label: string }[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    const clusterCount = 3;
    let rooms: Cluster[] = [];
    let particles: Particle[] = [];

    const initScene = () => {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      rooms = Array.from({ length: clusterCount }).map((_, i) => {
        // cluster centers in normalized space, spread nicely
        const cx = (i + 1) / (clusterCount + 1);
        const cy = i % 2 === 0 ? 0.35 : 0.6;
        return { cx, cy, label: labels[i] };
      });

      const totalParticles = Math.max(12, particlesProp ?? 42);
      particles = Array.from({ length: totalParticles }).map((_, i) => {
        const room = i % clusterCount;
        const r = rooms[room];
        const spreadX = width * 0.12;
        const spreadY = height * 0.10;
        const x = r.cx * width + (Math.random() - 0.5) * spreadX;
        const y = r.cy * height + (Math.random() - 0.5) * spreadY;
        const base = Math.max(0.12, Math.min(1.2, speed));
        const vx = (Math.random() - 0.5) * 0.4 * base;
        const vy = (Math.random() - 0.5) * 0.4 * base;
        return { x, y, vx, vy, room };
      });

      setClusters(rooms);
      setLabelPositions(
        rooms.map((r) => ({ x: r.cx * width, y: r.cy * height, label: r.label }))
      );
    };

    initScene();

    const onResize = () => initScene();
    const ro = new ResizeObserver(onResize);
    ro.observe(wrapper);

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };
    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("pointerleave", onPointerLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // subtle room backplates
      rooms.forEach((r) => {
        const cx = r.cx * width;
        const cy = r.cy * height;
        const w = width * 0.28;
        const h = height * 0.2;
        roundedRect(ctx, cx - w / 2, cy - h / 2, w, h, 16);
        ctx.fillStyle = "rgba(66, 16, 52, 0.05)"; // primary/10
        ctx.fill();
        ctx.strokeStyle = "rgba(66, 16, 52, 0.12)";
        ctx.stroke();
      });

      // update + draw particles
      particles.forEach((p) => {
        // move
        p.x += p.vx;
        p.y += p.vy;

        // gentle noise
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
        p.vx *= 0.996;
        p.vy *= 0.996;

        // bounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // mouse interaction
        if (interactive && mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist2 = dx * dx + dy * dy;
          const radius = 120;
          if (dist2 < radius * radius) {
            const f = 1 - dist2 / (radius * radius);
            p.vx += (dx / Math.sqrt(dist2 + 0.0001)) * f * 0.1;
            p.vy += (dy / Math.sqrt(dist2 + 0.0001)) * f * 0.1;
          }
        }
      });

      // draw connections within same room
      const thresh = Math.min(80, Math.max(50, Math.min(width, height) * 0.10));
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (a.room !== b.room) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < thresh) {
            const alpha = 1 - d / thresh;
            ctx.strokeStyle = `rgba(66, 16, 52, ${Math.max(0, Math.min(1, lineAlpha)) * alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw particles on top
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(66, 16, 52, 0.6)";
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    // update label positions on resize
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      setLabelPositions(
        clusters.map((r) => ({ x: r.cx * rect.width, y: r.cy * rect.height, label: r.label }))
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [clusters]);

  return (
    <motion.div
      ref={wrapperRef}
      className={cn(interactive ? "pointer-events-auto" : "pointer-events-none", className)}
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.6 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_60%,rgba(255,255,255,0.85)_100%)]" />
      {showLabels && labelPositions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute px-3 py-1 rounded-full text-xs bg-white/80 backdrop-blur text-primary shadow"
          style={{ left: p.x - 32, top: p.y - 14 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
        >
          {p.label}
        </motion.div>
      ))}
    </motion.div>
  );
};

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default NodeNetwork;
