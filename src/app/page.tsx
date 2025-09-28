'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TextReveal from '@/components/TextReveal';

const PixelWall = dynamic(() => import('@/components/PixelWall'), { ssr: false });

export default function Page() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(70%_40%_at_50%_20%,rgba(255,255,255,0.08),transparent),radial-gradient(60%_50%_at_80%_70%,rgba(255,255,255,0.05),transparent),linear-gradient(160deg,#0b0b0c,#1a1b1f_40%,#0c0d10)]" />
      
      {/* Pixel Wall - base layer */}
      <div className="absolute inset-0 z-10">
        <PixelWall />
      </div>
      
      {/* Text layer - above the wall canvas but styled to appear behind */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 text-white mix-blend-screen font-outfit w-full">
          {/* Opening Statement */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed sm:leading-relaxed md:leading-relaxed font-extralight tracking-wide max-w-6xl mx-auto text-center sm:text-left">
            <span className="font-medium">BlockZero</span> was founded in <span className="font-medium">2025</span> as a collective of forward looking investors and builders. From the very beginning, we have lived by one rule: <span className="font-medium italic">always be first in the block</span>. We move fast, think sharp and position ourselves ahead of the curve because in our world, <span className="font-medium">being second means being late</span>.
          </div>
          
          {/* Quote Section */}
          <div className="flex justify-center my-8 sm:my-12 md:my-16 lg:my-20">
            <div className="relative px-4 sm:px-0">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight italic text-center leading-tight tracking-wider">
                <span className="block sm:inline">&ldquo;Front-run the market</span>
                <br className="hidden sm:block" />
                <span className="block sm:inline">or get left behind&rdquo;</span>
              </div>
              <div className="absolute -left-4 sm:-left-8 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-white/40 via-white/60 to-white/40"></div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
            <div className="space-y-6 sm:space-y-8">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl leading-relaxed font-extralight tracking-wide">
                At <span className="font-medium">BlockZero</span> we invest in transformative technologies, nurture bold ideas and back founders shaping the decentralized future.
              </div>
              <div className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl leading-relaxed font-extralight tracking-wide text-white/90">
                We don&apos;t just provide capital, we act as <span className="font-medium text-white">strategic partners</span>, bringing sniper-level focus, deep resources and long-term conviction to every venture.
              </div>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl leading-relaxed font-extralight tracking-wide">
                We exist to <span className="font-medium">accelerate innovation</span> while staying true to principles of transparency and trust.
              </div>
              <div className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl leading-relaxed font-extralight tracking-wide text-white/90">
                <span className="font-medium text-white">BlockZero</span> is where vision meets execution, and where tomorrow&apos;s breakthroughs find their first believers.
              </div>
            </div>
          </div>
          
          {/* Bottom Accent */}
          <div className="flex justify-center pt-6 sm:pt-8 md:pt-10">
            <div className="w-16 sm:w-20 md:w-24 lg:w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Header with Logo and Twitter */}
      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between p-6 text-white/90">
        {/* Top Header */}
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="pointer-events-auto"
          >
            <Image 
              src="/logo.png" 
              alt="BlockZero Logo" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain"
            />
          </motion.div>
          
          {/* Twitter Follow Button */}
          <motion.div
            initial={{ x: 20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="pointer-events-auto"
          >
            <a
              href="https://x.com/BlockZeroFNF"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow B0
            </a>
          </motion.div>
        </div>
        
      </div>
    </main>
  );
}