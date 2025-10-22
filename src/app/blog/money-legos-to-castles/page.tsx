'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-white text-[#ff6b00] font-[family-name:var(--font-space-mono)]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="text-sm hover:opacity-70 transition-opacity inline-block mb-12">
          ← Back to Home
        </Link>
        
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-wider mb-4 opacity-70">MAY 26, 2025</p>
          <h1 className="text-5xl md:text-6xl font-medium mb-8 leading-tight">
            From Money Legos to Castles: The Crypto SuperApp Race Has Begun
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-lg leading-relaxed">
            <p>
              The DeFi summer of 2020 introduced us to the concept of "money legos" — composable financial primitives that could be stacked together to create increasingly sophisticated protocols. Five years later, we're witnessing a paradigm shift: the race to build crypto's first true SuperApps.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">The Evolution Beyond Composability</h2>
            
            <p>
              While money legos emphasized composability and interoperability, the SuperApp thesis represents a fundamental rethinking of user experience in crypto. Rather than expecting users to navigate between dozens of specialized protocols, SuperApps aim to be the single interface for all crypto activities.
            </p>

            <p>
              We're seeing this play out across multiple vectors: centralized exchanges evolved into trading platforms with staking, lending, and NFT marketplaces. Wallet providers are integrating swaps, bridges, and on-ramps directly into their interfaces. Even DeFi protocols are expanding horizontally to capture more user touchpoints.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">Why Now?</h2>
            
            <p>
              Three key factors are driving this convergence:
            </p>

            <p className="pl-6 border-l-2 border-[#ff6b00]/30">
              <strong>Infrastructure Maturity:</strong> Layer 2 scaling solutions have finally delivered on their promise. With transaction costs measured in fractions of a cent and near-instant finality, the technical barriers to complex,  multi-step user journeys have largely disappeared.
            </p>

            <p className="pl-6 border-l-2 border-[#ff6b00]/30">
              <strong>Regulatory Clarity:</strong> As regulatory frameworks crystalize globally, established players can confidently build comprehensive product suites without fear of sudden policy shifts disrupting specific features.
            </p>

            <p className="pl-6 border-l-2 border-[#ff6b00]/30">
              <strong>User Sophistication:</strong> The crypto user base has matured. Early adopters tolerated fragmented experiences, but mainstream adoption requires seamless, intuitive interfaces that handle complexity under the hood.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">The Winners Take Most Dynamic</h2>
            
            <p>
              Unlike the money lego era's emphasis on openness and interoperability, the SuperApp race introduces winner-take-most dynamics. Network effects compound rapidly when users consolidate their crypto activities into a single platform: more users mean more liquidity, which attracts more users.
            </p>

            <p>
              This creates an interesting tension with crypto's decentralization ethos. Can SuperApps maintain credible neutrality while  capturing massive value? The answer likely lies in modular architecture — SuperApps as aggregators that route to underlying protocols while owning the user relationship.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">Monarch Group's Perspective</h2>
            
            <p>
              At Monarch Group, we're tracking this evolution closely across our portfolio. We believe the next wave of value creation will accrue to projects that can bridge the gap between specialized protocols and mainstream users — whether through wallet interfaces, aggregation layers, or entirely new primitives.
            </p>

            <p>
              The money lego thesis hasn't disappeared; it's being absorbed into a higher-order structure. The protocols that thrive will be those that serve as reliable building blocks for SuperApps while maintaining their standalone value proposition.
            </p>

            <p>
              The race is on, and the castle builders are just getting started.
            </p>

            <div className="mt-16 pt-8 border-t border-[#ff6b00]/20">
              <p className="text-sm opacity-70">
                <em>This article represents the views of Monarch Group and is intended for informational purposes only.</em>
              </p>
            </div>
          </div>
        </motion.article>
      </div>
    </main>
  );
}

