"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// --- Tree Configuration Models ---
export type LeafShape = "petal" | "crystal" | "techSquare" | "circle";

export interface TreeSkin {
  name: string;
  trunkColor: string;
  leafColor: string;
  leafShape: LeafShape;
  isTechMode: boolean;
}

export const TREE_SKINS: TreeSkin[] = [
  { name: "Wealth Oak", trunkColor: "#3E2723", leafColor: "#4CAF50", leafShape: "circle", isTechMode: false },
  { name: "Sakura Bloom", trunkColor: "#5D4037", leafColor: "#FFB7C5", leafShape: "petal", isTechMode: false },
  { name: "Cyber Node", trunkColor: "#455A64", leafColor: "#00E5FF", leafShape: "techSquare", isTechMode: true },
  { name: "Concrete Survivor", trunkColor: "#212121", leafColor: "#D32F2F", leafShape: "crystal", isTechMode: false },
];

interface FinancialTreeProps {
  onProgressUpdate?: (progress: number) => void;
  onSkinChange?: (index: number) => void;
  className?: string;
}

interface FallingLeaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: LeafShape;
  opacity: number;
}

export default function FinancialTree({ 
  onProgressUpdate, 
  onSkinChange,
  className = "" 
}: FinancialTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSkinIndex, setActiveSkinIndex] = useState(0);
  
  // Use a ref for the progress so the canvas animation loop can access the latest
  // value without causing heavy React re-renders on every frame.
  const progressRef = useRef(0);
  const skinRef = useRef(TREE_SKINS[0]);
  const fallingLeavesRef = useRef<FallingLeaf[]>([]);
  const shakeIntensityRef = useRef(0);
  const leafPositionsRef = useRef<{x: number, y: number}[]>([]);

  // Sync skin index update to ref for loop access
  useEffect(() => {
    skinRef.current = TREE_SKINS[activeSkinIndex];
    onSkinChange?.(activeSkinIndex);
  }, [activeSkinIndex, onSkinChange]);

  // Skin Cycling Interval
  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current = 0;
      setActiveSkinIndex((prev) => (prev + 1) % TREE_SKINS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const spawnLeaves = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Trigger shake effect regardless of growth state
    shakeIntensityRef.current = 10;

    // Only allow leaves to fall if the tree has fully grown
    if (progressRef.current < 1) return;
    
    const skin = skinRef.current;
    const newLeaves: FallingLeaf[] = [];
    const positions = leafPositionsRef.current;
    
    // Spawn a burst of leaves from actual branch tips
    // If no positions are collected yet, fallback to canopy area
    const count = 15;
    for (let i = 0; i < count; i++) {
      let spawnX, spawnY;
      
      if (positions.length > 0) {
        const pos = positions[Math.floor(Math.random() * positions.length)];
        spawnX = pos.x;
        spawnY = pos.y;
      } else {
        const rect = canvas.getBoundingClientRect();
        spawnX = rect.width / 2 + (Math.random() - 0.5) * (rect.width * 0.4);
        spawnY = rect.height * 0.4 + (Math.random() - 0.5) * (rect.height * 0.3);
      }

      newLeaves.push({
        x: spawnX,
        y: spawnY,
        vx: (Math.random() - 0.5) * 2,
        vy: 1 + Math.random() * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color: skin.leafColor,
        shape: skin.leafShape,
        opacity: 1
      });
    }
    
    fallingLeavesRef.current = [...fallingLeavesRef.current, ...newLeaves];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    const startTime = Date.now();

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      return { width: rect.width, height: rect.height };
    };

    let { width, height } = resizeCanvas();
    
    // Handle resize
    const handleResize = () => {
      const dims = resizeCanvas();
      width = dims.width;
      height = dims.height;
    };
    window.addEventListener('resize', handleResize);

    const drawRoots = (x: number, y: number, progress: number, activeSkin: TreeSkin, time: number) => {
      ctx.strokeStyle = activeSkin.trunkColor;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";

      const rootAngles = [0.88, 1.45, 2.01, 2.55]; 

      for (let i = 0; i < 4; i++) {
        [-1, 1].forEach((dir) => {
          const angle = rootAngles[i] * dir;
          const rootSway = Math.sin(time * 0.5 + i) * 2; 
          
          ctx.beginPath();
          ctx.moveTo(x, y - 3);
          ctx.quadraticCurveTo(
            x + Math.cos(angle) * 25,
            y + 8,
            x + Math.cos(angle) * 45 * (1.0 + progress * 0.1) + rootSway,
            y + 18
          );
          ctx.stroke();
        });
      }
      ctx.globalAlpha = 1;
    };

    const drawLeafShape = (shape: LeafShape, size: number) => {
      ctx.beginPath();
      switch (shape) {
        case "petal":
          ctx.moveTo(0, size / 2);
          ctx.bezierCurveTo(-size, -size / 2, -size / 4, -size, 0, -size / 4);
          ctx.bezierCurveTo(size / 4, -size, size, -size / 2, 0, size / 2);
          break;
        case "crystal":
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.8, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size * 0.8, 0);
          break;
        case "techSquare":
          ctx.rect(-size/2, -size/2, size, size);
          break;
        case "circle":
        default:
          ctx.ellipse(0, 0, size * 0.8, size * 0.8, 0, 0, Math.PI * 2);
          break;
      }
      ctx.fill();
    };

    const drawLeaf = (x: number, y: number, alpha: number, activeSkin: TreeSkin, leafIndex: number, time: number) => {
      ctx.save();
      ctx.globalAlpha = alpha * 0.85; 
      ctx.fillStyle = activeSkin.leafColor;
      const size = 7;
      
      ctx.translate(x, y);
      ctx.rotate(Math.sin(time * 3 + leafIndex) * 0.2);
      
      drawLeafShape(activeSkin.leafShape, size);

      if (leafIndex % 3 === 0 && alpha > 0.5) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        if (activeSkin.leafShape === "techSquare") {
          ctx.rect(1, -1, size * 0.4, size * 0.4);
        } else {
          ctx.ellipse(1, -1, size * 0.4, size * 0.2, 0, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      ctx.restore();
    };

    const drawBranch = (
      x: number, y: number, angle: number, length: number, 
      thickness: number, depth: number, currentT: number, 
      time: number, activeSkin: TreeSkin, leafRef: { count: number }
    ) => {
      const maxDepth = 8;
      const startT = ((maxDepth - depth) / maxDepth) * 0.6;
      const segmentT = Math.max(0, Math.min(1, (currentT - startT) * 4));

      if (segmentT <= 0) return;

      const swayMultiplier = activeSkin.isTechMode ? 0.002 : 0.03;
      const timeScale = activeSkin.isTechMode ? 5 : 2;
      const sway = Math.sin(time * timeScale + depth * 0.8) * swayMultiplier * (maxDepth - depth);
      const currentAngle = angle + sway;

      const curLength = length * segmentT;
      const endX = x + Math.cos(currentAngle) * curLength;
      const endY = y + Math.sin(currentAngle) * curLength;

      ctx.beginPath();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = activeSkin.trunkColor;
      ctx.lineCap = activeSkin.isTechMode ? "square" : "round";

      if (activeSkin.isTechMode) {
        ctx.moveTo(x, y);
        ctx.lineTo(endX, y);
        ctx.lineTo(endX, endY);
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
      }
      ctx.stroke();

      if (depth > 0) {
        const spread = 0.45;
        const decay = 0.78;
        drawBranch(endX, endY, currentAngle - spread, length * decay, thickness * 0.7, depth - 1, currentT, time, activeSkin, leafRef);
        drawBranch(endX, endY, currentAngle + spread, length * decay, thickness * 0.7, depth - 1, currentT, time, activeSkin, leafRef);
      } else if (segmentT > 0.6) {
        leafRef.count++;
        const leafAlpha = (segmentT - 0.6) * 2.5;
        // Store position for falling leaves interaction
        leafPositionsRef.current.push({ x: endX, y: endY });
        drawLeaf(endX, endY, leafAlpha, activeSkin, leafRef.count, time);
      }
    };

    const animate = () => {
      const now = Date.now();
      const time = (now - startTime) / 1000;
      
      if (progressRef.current < 1) {
        progressRef.current += 0.005; 
        onProgressUpdate?.(progressRef.current);
      }

      ctx.clearRect(0, 0, width, height);

      // Reset leaf positions each frame
      leafPositionsRef.current = [];

      // Calculate shake offset
      const shakeOffset = Math.sin(time * 60) * shakeIntensityRef.current;
      // Softly decay intensity
      shakeIntensityRef.current *= 0.9;
      if (shakeIntensityRef.current < 0.1) shakeIntensityRef.current = 0;

      const startX = width / 2 + shakeOffset;
      const startY = height - 20; 
      const initialBranchLength = height * 0.16;
      const activeSkin = skinRef.current;
      const leafTracker = { count: 0 };

      // 1. Draw Tree
      drawRoots(startX, startY, Math.min(1, progressRef.current * 2), activeSkin, time);
      drawBranch(startX, startY, -Math.PI / 2, initialBranchLength, 10, 8, progressRef.current, time, activeSkin, leafTracker);

      // 2. Update and Draw Falling Leaves
      const fallingLeaves = fallingLeavesRef.current;
      for (let i = fallingLeaves.length - 1; i >= 0; i--) {
        const leaf = fallingLeaves[i];
        
        // Horizontal oscillation (wind)
        const wind = Math.sin(time * 2 + i) * 0.5;
        leaf.vx += wind * 0.1;
        leaf.vx *= 0.98; // air resistance
        
        leaf.x += leaf.vx;
        leaf.y += leaf.vy;
        leaf.rotation += leaf.rotationSpeed;
        
        // Rendering
        ctx.save();
        ctx.globalAlpha = leaf.opacity;
        ctx.fillStyle = leaf.color;
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        drawLeafShape(leaf.shape, 7);
        ctx.restore();
        
        // Remove if off-screen
        if (leaf.y > height + 20) {
          fallingLeaves.splice(i, 1);
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [onProgressUpdate]);

  return (
    <canvas 
      ref={canvasRef} 
      onClick={spawnLeaves}
      className={`w-full h-full block drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer ${className}`}
    />
  );
}
