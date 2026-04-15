"use client";

import { motion } from "framer-motion";
import { Download, Smartphone, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import DownloadBadge from "./DownloadBadge";

// --- Tree Configuration Models ---
type LeafShape = "petal" | "crystal" | "techSquare" | "circle";

interface TreeSkin {
  name: string;
  trunkColor: string;
  leafColor: string;
  leafShape: LeafShape;
  isTechMode: boolean;
}

const TREE_SKINS: TreeSkin[] = [
  { name: "Wealth Oak", trunkColor: "#3E2723", leafColor: "#4CAF50", leafShape: "circle", isTechMode: false },
  { name: "Sakura Bloom", trunkColor: "#5D4037", leafColor: "#FFB7C5", leafShape: "petal", isTechMode: false },
  { name: "Cyber Node", trunkColor: "#455A64", leafColor: "#00E5FF", leafShape: "techSquare", isTechMode: true },
  { name: "Concrete Survivor", trunkColor: "#212121", leafColor: "#D32F2F", leafShape: "crystal", isTechMode: false },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSkinIndex, setActiveSkinIndex] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [growthProgress, setGrowthProgress] = useState(0);
  
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setDownloadCount(data.download_count || 0);
    } catch (e) {
      console.error("Failed to fetch stats", e);
    }
  }, []);

  const handleDownloadClick = async () => {
    try {
      // Optimistic update
      setDownloadCount(prev => prev + 1);
      await fetch("/api/stats", { method: "POST" });
    } catch (e) {
      console.error("Failed to track download", e);
    }
  };

  // Use a ref for the progress so the canvas animation loop can access the latest
  // value without causing heavy React re-renders on every frame.
  const progressRef = useRef(0);
  const skinRef = useRef(TREE_SKINS[0]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    skinRef.current = TREE_SKINS[activeSkinIndex];
  }, [activeSkinIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      progressRef.current = 0;
      setGrowthProgress(0); 
      setActiveSkinIndex((prev) => (prev + 1) % TREE_SKINS.length);
    }, 5000);
    return () => clearInterval(interval);
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
    window.addEventListener('resize', () => {
      const dims = resizeCanvas();
      width = dims.width;
      height = dims.height;
    });

    const drawRoots = (x: number, y: number, progress: number, activeSkin: TreeSkin, time: number) => {
      ctx.strokeStyle = activeSkin.trunkColor;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";

      // Emulate Flutter's Random(42) angles for roots
      const rootAngles = [0.88, 1.45, 2.01, 2.55]; 

      for (let i = 0; i < 4; i++) {
        // Draw roots mirroring both sides
        [-1, 1].forEach((dir) => {
          const angle = rootAngles[i] * dir;
          const rootSway = Math.sin(time * 0.5 + i) * 2; // subtle root breathing
          
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

    const drawLeaf = (x: number, y: number, alpha: number, activeSkin: TreeSkin, leafIndex: number, time: number) => {
      ctx.save();
      ctx.globalAlpha = alpha * 0.85; // Flutter leaf alpha is 0.75-0.85
      ctx.fillStyle = activeSkin.leafColor;
      const size = 7;
      
      ctx.translate(x, y);
      // Independent leaf swaying based on time and its unique index
      ctx.rotate(Math.sin(time * 3 + leafIndex) * 0.2);
      
      ctx.beginPath();
      switch (activeSkin.leafShape) {
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

      // Flutter Highlight Implementation: Add a shine to every 3rd leaf
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

      // Apply Swaying Physics (Tech mode is stiff, normal mode sways in the wind)
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

      // Flutter exact line matching
      if (activeSkin.isTechMode) {
        ctx.moveTo(x, y);
        ctx.lineTo(endX, y); // Orthogonal step 1
        ctx.lineTo(endX, endY); // Orthogonal step 2
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
        drawLeaf(endX, endY, leafAlpha, activeSkin, leafRef.count, time);
      }
    };

    const animate = () => {
      const now = Date.now();
      const time = (now - startTime) / 1000;
      
      // Advance progress smoothly and sync with React state for the UI progress bar
      if (progressRef.current < 1) {
        progressRef.current += 0.005; 
        setGrowthProgress(progressRef.current);
      }

      ctx.clearRect(0, 0, width, height);

      const startX = width / 2;
      // Match Flutter's translate center/bottom orientation
      const startY = height - 20; 
      const initialBranchLength = height * 0.16;
      const activeSkin = skinRef.current;
      const leafTracker = { count: 0 };

      // Draw mobile-accurate model
      drawRoots(startX, startY, Math.min(1, progressRef.current * 2), activeSkin, time);
      drawBranch(startX, startY, -Math.PI / 2, initialBranchLength, 10, 8, progressRef.current, time, activeSkin, leafTracker);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // Empty array ensures we use refs to prevent tearing down the canvas loop

  const activeSkin = TREE_SKINS[activeSkinIndex];

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(27,94,32,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-2">
              <Smartphone size={16} />
              <span>Interactive Mobile Model</span>
            </div>

            <DownloadBadge count={downloadCount} />
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight mt-6">
            Watch Your <br />
            <span className="text-primary italic">Wealth Grow</span>
          </h1>
          
          <p className="text-lg text-foreground mb-10 max-w-lg leading-relaxed">
            RootEXP is an offline-first financial powerhouse. <strong className="text-primary">The living, swaying tree you see here is the exact dynamic model rendering inside the app's budget tracker.</strong> Secured on-device. Managed by you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#download" 
              onClick={handleDownloadClick}
              className="bg-primary text-background px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
            >
              <Download size={20} />
              Get RootEXP APK
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative lg:ml-auto w-full flex justify-center items-center"
        >
          <div className="relative w-full max-w-[600px] aspect-square flex justify-center items-end overflow-visible">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full block drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]" 
            />
            
            <motion.div 
              key={activeSkin.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 right-0 glass-base glass-card p-4 rounded-2xl border-primary/10 shadow-xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: activeSkin.leafColor }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Active Skin</p>
                  <p className="text-sm font-bold" style={{ color: activeSkin.trunkColor }}>{activeSkin.name}</p>
                </div>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-75" 
                  style={{ width: `${growthProgress * 100}%`, backgroundColor: activeSkin.leafColor }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}