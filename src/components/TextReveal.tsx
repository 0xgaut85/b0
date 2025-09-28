'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TextRevealProps {
  className?: string;
}

export default function TextReveal({ className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Smooth mouse tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  const textContent = [
    {
      text: "BlockZero was founded in 2025 as a collective of forward looking investors and builders. From the very beginning, we have lived by one rule: always be first in the block. We move fast, think sharp and position ourselves ahead of the curve because in our world, being second means being late.",
      type: "paragraph"
    },
    {
      text: "\"Front-run the market or get left behind\"",
      type: "quote"
    },
    {
      text: "At BlockZero we invest in transformative technologies, nurture bold ideas and back founders shaping the decentralized future. We don't just provide capital, we act as strategic partners, bringing sniper-level focus, deep resources and long-term conviction to every venture.",
      type: "paragraph"
    },
    {
      text: "We exist to accelerate innovation while staying true to principles of transparency and trust. BlockZero is where vision meets execution, and where tomorrow's breakthroughs find their first believers.",
      type: "paragraph"
    }
  ];

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        opacity: isHovering ? 1 : 0.1,
        transition: 'opacity 0.3s ease-out'
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8 p-8">
        {textContent.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={
              item.type === 'quote' 
                ? "text-center text-2xl md:text-3xl font-light italic text-white py-6 border-l-2 border-white/20 pl-6 ml-8"
                : "text-lg md:text-xl leading-relaxed text-white font-light"
            }
          >
            {item.text}
          </motion.div>
        ))}
      </div>
      
      {/* Subtle glow effect that follows the cursor */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: smoothMouseX,
          top: smoothMouseY,
          x: '-50%',
          y: '-50%',
          opacity: isHovering ? 0.3 : 0,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        <div className="w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
}
