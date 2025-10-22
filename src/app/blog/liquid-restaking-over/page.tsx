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
          <p className="text-sm uppercase tracking-wider mb-4 opacity-70">JUNE 20, 2024</p>
          <h1 className="text-5xl md:text-6xl font-medium mb-8 leading-tight">
            Abstracadabra: The Liquid Restaking Over
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-lg leading-relaxed">
            <p>
              Liquid restaking dominated crypto mindshare in early 2024, with projects like EigenLayer and related liquid restaking tokens (LRTs) capturing billions in TVL. Six months later, the hype has cooled considerably. What happened, and what does it mean for crypto's newest primitive?
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">The Promise of Restaking</h2>
            
            <p>
              The thesis was compelling: Ethereum stakers could secure additional networks and protocols while earning supplementary yields, all without unstaking their original ETH. EigenLayer's innovation was providing this as a generalizable primitive — a marketplace for decentralized security.
            </p>

            <p>
              Liquid restaking tokens took this further by wrapping restaked positions into tradable assets. Users could maintain liquidity while farming multiple layers of yield. On paper, this represented the holy grail of capital efficiency in proof-of-stake systems.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">Reality Checks In</h2>
            
            <p>
              The challenges emerged quickly. First, the "yield" users were earning came primarily from points and token expectations, not actual protocol revenues. When several anticipated launches disappointed or delayed, the speculative premium evaporated.
            </p>

            <p>
              Second, the abstraction layers created complexity that many users didn't fully understand. Restaking introduces slashing risks beyond base Ethereum staking. Liquid restaking adds smart contract risk and potentially reduced exit liquidity. The risk-adjusted returns started looking less attractive once people actually calculated the downside scenarios.
            </p>

            <p>
              Third, and most fundamentally: the demand side didn't materialize as expected. Many actively validated services (AVS) simply didn't need the security budget they could theoretically purchase through restaking. Overpaying for security is poor capital allocation, and sophisticated protocol designers recognized this.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">The Sustainable Path</h2>
            
            <p>
              This doesn't mean restaking failed — it means the market is finding price discovery. The primitive is genuinely valuable for specific use cases where decentralized security is critical and the cost-benefit works out. That's a smaller addressable market than the hype suggested, but still significant.
            </p>

            <p>
              For liquid restaking specifically, the winners will be those that focus on user experience and transparent risk communication rather than yield maximization. The market has matured past chasing points; now it wants sustainable protocols with clear value propositions.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">Monarch Group's View</h2>
            
            <p>
              We remain constructive on restaking as an infrastructure primitive, but selective about implementation. The projects that survive the hype cycle will be those solving real problems for AVS developers rather than optimizing for TVL metrics.
            </p>

            <p>
              This is crypto's pattern: groundbreaking primitives get overhyped, reality disappoints, then sustainable applications emerge. We're now in the "building real things" phase of restaking's journey.
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

