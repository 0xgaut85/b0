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
          <p className="text-sm uppercase tracking-wider mb-4 opacity-70">APRIL 25, 2025</p>
          <h1 className="text-5xl md:text-6xl font-medium mb-8 leading-tight">
            Move Fast and Build Things: The Sui Suite of Innovations
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-lg leading-relaxed">
            <p>
              Sui has emerged as one of the most technically sophisticated Layer 1 blockchains, combining novel consensus mechanisms with a programming model that fundamentally rethinks how we build decentralized applications. After nearly two years of mainnet operation, the ecosystem is hitting its stride.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">The Object-Centric Paradigm</h2>
            
            <p>
              At the heart of Sui's innovation is its object-centric data model. Unlike account-based or UTXO systems, Sui treats every on-chain asset as a programmable object with unique properties and ownership. This seemingly subtle shift unlocks profound improvements in parallelization and composability.
            </p>

            <p>
              Developers accustomed to Ethereum's shared state model often struggle initially with Sui's approach. But once the mental model clicks, the benefits become clear: transactions that don't touch the same objects can be processed in parallel without complex state reconciliation. This is horizontal scaling at the VM level, not just at the consensus layer.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">Performance Meets Developer Experience</h2>
            
            <p>
              Sui's Move programming language, originally developed at Meta for the Diem project, prioritizes safety and expressiveness. Resource-oriented programming prevents common bugs like reentrancy attacks and double-spending at the language level, not through runtime checks.
            </p>

            <p>
              The results speak for themselves: Sui routinely processes over 5,000 transactions per second with sub-second finality, often with hundreds of thousands of daily active addresses. More importantly, these numbers scale without degrading user experience.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">Ecosystem Momentum</h2>
            
            <p>
              What we're seeing across the Sui ecosystem is a maturation beyond simple DeFi forks. Gaming studios are building on Sui to leverage its object model for NFT-based game assets. DeFi protocols are experimenting with novel mechanisms enabled by programmable transactions. Consumer applications are deploying zkLogin for seamless Web2-style onboarding.
            </p>

            <p>
              The technical foundation is there. The developer tooling continues to improve. Now it's about application innovation — finding the use cases where Sui's unique attributes provide genuine advantages over alternatives.
            </p>

            <h2 className="text-3xl font-medium mt-12 mb-6">Looking Ahead</h2>
            
            <p>
              From Monarch Group's perspective, Sui represents a long-term bet on technical excellence translating to ecosystem success. The team has consistently delivered on their technical roadmap while maintaining pragmatic focus on developer adoption.
            </p>

            <p>
              As infrastructure commoditizes across Layer 1s and Layer 2s, differentiation will come from either radical technical advantages or network effects. Sui is pursuing both paths simultaneously — and that's exactly the kind of asymmetric bet we look for.
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

