'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

// Animated heading component that mimics Node Capital's effect
function AnimatedHeading({ text, className = '' }: { text: string; className?: string }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealed) {
            setRevealed(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [revealed]);

  return (
    <h1 ref={ref} className={`section-title ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            animationDelay: revealed ? `${index * 0.15}s` : '0s',
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}

const portfolioCompanies = [
  { name: 'ether.fi', twitter: 'ether_fi' },
  { name: 'Ika', twitter: 'ikadotxyz' },
  { name: 'Tempo', twitter: 'tempohq' },
  { name: 'Superform', twitter: 'superformxyz' },
  { name: 'Forta', twitter: 'FortaNetwork' },
  { name: 'ETHGas', twitter: 'ETHGASofficial' },
  { name: 'Axelar', twitter: 'axelar' },
  { name: 'Tlon', twitter: 'tloncorporation' },
  { name: 'Lava', twitter: 'lavanetxyz' },
  { name: 'Stride', twitter: 'stride_zone' },
  { name: 'Byzantine Finance', twitter: 'Byzantine_Fi' },
  { name: 'Squid', twitter: 'squidrouter' },
  { name: 'Cedar', twitter: 'cedar_money' },
  { name: 'Limitless', twitter: 'trylimitless' },
  { name: 'Eureka Labs', twitter: 'EurekaLabsAI' },
  { name: 'Pendle', twitter: 'pendle_fi', localAvatar: true },
  { name: 'EigenLayer', twitter: 'eigenlayer' },
  { name: 'Berachain', twitter: 'berachain', localAvatar: true },
  { name: 'smlXL', twitter: 'smlXL_' },
  { name: 'Ethena', twitter: 'ethena_labs' },
  { name: 'Subquery', twitter: 'SubQueryNetwork' },
  { name: 'NoLimit', twitter: 'nolimit', localImage: '/logos/nolimit.jpg' }
];

const teamMembers = [
  {
    name: 'Amos Meiri',
    role: 'CO-FOUNDER & MANAGING PARTNER',
  },
  {
    name: 'Ben Rothschild',
    role: 'VENTURE PARTNER',
  },
  {
    name: 'Eyal Elsheich',
    role: 'INFRASTRUCTURE ADVISER',
  },
  {
    name: 'Rotem Lev',
    role: 'CO-FOUNDER, PARTNER & CTO',
  },
  {
    name: 'Arres Navaro',
    role: 'FINANCE & OPS',
  },
  {
    name: 'Or Harel',
    role: 'HEAD OF LIQUID',
  }
];

const blogPosts = [
  { 
    slug: 'money-legos-to-castles', 
    date: 'MAY 26, 2025', 
    title: 'From Money Legos to Castles: The Crypto SuperApp Race Has Begun' 
  },
  { 
    slug: 'sui-suite-innovations', 
    date: 'APRIL 25, 2025', 
    title: 'Move Fast and Build Things: The Sui Suite of Innovations' 
  },
  { 
    slug: 'airdrop-sybil-attacks', 
    date: 'AUGUST 15, 2024', 
    title: 'The Battle Against Airdrop Sybil Attacks: Insights From LayerZero and ether.fi Strategies' 
  },
  { 
    slug: 'liquid-restaking-over', 
    date: 'JUNE 20, 2024', 
    title: 'Abstracadabra: The Liquid Restaking Over' 
  },
  { 
    slug: 'airdropping-truths', 
    date: 'MAY 16, 2024', 
    title: 'Airdropping: Some Truths' 
  }
];

export default function Page() {
  return (
    <main className="page-wrapper">
      {/* Navigation */}
      <div id="navbar" className="navbar">
        <div className="navbar-grid">
          <a href="/" className="logo-link">
            <Image 
              src="/logo.png" 
              alt="Monarch Group Logo" 
              width={80}
              height={80}
              className="logo"
            />
          </a>
          
          <div className="navbar-section-links">
            <div className="menu-block">
              <a href="#thesis" className="menu-link">Thesis</a>
              <a href="#portfolio" className="menu-link">Portfolio</a>
              <a href="#about" className="menu-link">About</a>
            </div>
            <div className="menu-block">
              <a href="#team" className="menu-link">Team</a>
              <a href="#blog" className="menu-link">Blog</a>
            </div>
          </div>

          <a href="mailto:investments@monarchgroup.capital" className="contact-button">
            Contact
          </a>
        </div>
      </div>

      {/* Thesis Section */}
      <section id="thesis" className="thesis section-spacing">
        <div className="grid-12">
          <div className="text-container">
            <div className="section-header">
              <AnimatedHeading text="<Thesis>" className="section-thesis" />
            </div>
            
            <div className="content-grid">
              <p className="large-text">
                Public confidence in slow-moving, high-cost organizations is eroding due to their lack of transparency, inability to course-correct and weak security protocols.
              </p>
              
              <p className="large-text">
                Blockchains, cryptocurrencies and their underlying technologies have the potential to increase trust and improve security across many markets and cut costs and friction. They enable a dynamic new range of applications and business models, which enjoy a decentralized structure based on trust in code and math – ensuring better alignment of incentives between all market participants.
              </p>
              
              <p className="large-text">
                We are now at the early stages of their adoption curve. As they mature, these technologies will solve some of the world's biggest challenges in finance, media, ownership and data access.
              </p>
              
              <p className="large-text">
                At Monarch Group, we believe the market will grow rapidly as these technologies fulfill their promise.
              </p>
              
              <p className="highlight-text">
                OUR GOAL IS TO INVEST IN NOVEL NETWORKS AND INFRASTRUCTURE ENABLING NEW TYPE OF USE-CASES AND NEW ADOPTION CURVES FOR CRYPTO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio section-spacing">
        <div className="grid-12">
          <div className="text-container">
            <div className="section-header-wrapper">
              <AnimatedHeading text="<Portfolio>" className="section-portfolio" />
              <p className="section-subtitle">
                WE PROVIDE PRACTICAL VALUE TO THE PROJECTS IN OUR PORTFOLIO.
              </p>
            </div>
            
            <p className="large-text portfolio-intro">
              From working on the initial technical design, to building the right token economic model, to the bootstrapping stage of a network running the first node, the Monarch Group team are hands-on technical and network design experts.
            </p>
            
            <div className="portfolio-sections">
              {Array.from({ length: Math.ceil(portfolioCompanies.length / 5) }).map((_, sectionIndex) => {
                const companiesInSection = portfolioCompanies.slice(sectionIndex * 5, (sectionIndex + 1) * 5);
                const isEven = sectionIndex % 2 === 0;
                
                // Simple rows of alternating orange-white squares with varying lengths
                // 7-8 rows to fill vertical space
                const rowPatterns = [
                  [15, 8, 22, 12, 18, 6, 20, 14],
                  [10, 18, 7, 24, 11, 16, 13],
                  [20, 9, 16, 13, 25, 8, 18],
                  [12, 20, 8, 18, 10, 22, 15],
                  [18, 11, 25, 7, 15, 19, 9, 22]
                ];
                
                const pattern = rowPatterns[sectionIndex % rowPatterns.length];
                
                return (
                  <div 
                    key={sectionIndex} 
                    className={`portfolio-section-wrapper ${isEven ? 'section-left' : 'section-right'}`}
                  >
                    <div className="portfolio-section">
                      <div className="portfolio-grid-3x3">
                        {companiesInSection.map((company, posIndex) => {
                          const gridSpotMap = [0, 2, 4, 6, 8];
                          const gridSpot = gridSpotMap[posIndex];
                          
                          return (
                            <div 
                              key={company.name} 
                              className="portfolio-item"
                              style={{
                                gridColumn: (gridSpot % 3) + 1,
                                gridRow: Math.floor(gridSpot / 3) + 1
                              }}
                            >
                              <img 
                                src={
                                  company.localImage 
                                    ? company.localImage
                                    : company.localAvatar 
                                      ? `/${company.twitter}-avatar.jpg`
                                      : `https://unavatar.io/x/${company.twitter}`
                                }
                                alt={`${company.name} logo`}
                                width="80"
                                height="80"
                                className="portfolio-logo"
                                loading="eager"
                                onError={(e) => {
                                  const img = e.target as HTMLImageElement;
                                  if (img.src.includes('unavatar.io/x/')) {
                                    img.src = `https://unavatar.io/twitter/${company.twitter}`;
                                  }
                                }}
                              />
                              <span className="portfolio-name">{company.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* Dice "5" pattern - 3 patterns only */}
                    <div className="dice-decoration">
                      {/* Pattern 1 - top */}
                      <div className="dice-pattern">
                        <div className="dice-tile tile-orange" style={{ gridColumn: 1, gridRow: 1 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 3, gridRow: 1 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 2, gridRow: 2 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 1, gridRow: 3 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 3, gridRow: 3 }} />
                      </div>
                      
                      {/* Pattern 2 - middle offset */}
                      <div className="dice-pattern dice-pattern-offset">
                        <div className="dice-tile tile-orange" style={{ gridColumn: 1, gridRow: 1 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 3, gridRow: 1 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 2, gridRow: 2 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 1, gridRow: 3 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 3, gridRow: 3 }} />
                      </div>
                      
                      {/* Pattern 3 - bottom */}
                      <div className="dice-pattern">
                        <div className="dice-tile tile-orange" style={{ gridColumn: 1, gridRow: 1 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 3, gridRow: 1 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 2, gridRow: 2 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 1, gridRow: 3 }} />
                        <div className="dice-tile tile-orange" style={{ gridColumn: 3, gridRow: 3 }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section-spacing">
        <div className="grid-12">
          <div className="text-container">
            <div className="section-header">
              <AnimatedHeading text="<About>" className="section-about" />
            </div>
            
            <div className="content-grid">
              <p className="large-text">
                Monarch Group stands as a dedicated, thesis-driven cryptocurrency fund with a strategic focus on long-term investments in seed or A-stage crypto infrastructure and decentralized protocols.
              </p>
              
              <p className="large-text">
                Beyond providing financial support, we actively contribute as core members to emerging protocols and networks. Our hands-on approach extends to addressing technical challenges and navigating token economics.
              </p>
              
              <p className="large-text">
                Our commitment goes beyond initial funding, as we actively assist our entrepreneurs and networks in their market entry and sustained growth.
              </p>
              
              <p className="large-text">
                We are crypto engineers and innovators immersed in the world of cryptocurrency since 2012, marked by our successful creation of pioneering digital assets protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team section-spacing">
        <div className="grid-12">
          <div className="text-container">
            <div className="section-header">
              <AnimatedHeading text="<Team>" className="section-team" />
            </div>
            
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.name} className="team-member">
                  <h2 className="team-member-name">{member.name}</h2>
                  <p className="team-member-role">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section-spacing">
        <div className="grid-12">
          <div className="stats-container">
            <div className="stat-item">
              <p className="stat-label">ASSETS UNDER MANAGEMENT</p>
              <h1 className="stat-value">$100M+</h1>
            </div>
            <div className="stat-item">
              <p className="stat-label">NUMBER OF NETWORKS</p>
              <h1 className="stat-value">20+</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="blog section-spacing">
        <div className="grid-12">
          <div className="text-container">
            <div className="section-header">
              <AnimatedHeading text="<Blog>" className="section-blog" />
            </div>
            
            <div className="blog-posts">
              {blogPosts.map((post) => (
                <a key={post.slug} href={`/blog/${post.slug}`} className="blog-post">
                  <p className="blog-date">{post.date}</p>
                  <h3 className="blog-title">{post.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="grid-12">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Connect</h4>
              <a href="#">LinkedIn</a>
              <a href="https://x.com/MonarchGroupVC" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
            </div>
            
            <div className="footer-section">
              <h4>Get In Touch</h4>
              <a href="mailto:investments@monarchgroup.capital">investments@monarchgroup.capital</a>
            </div>
            
            <div className="footer-section">
              <h4>Explore</h4>
              <a href="#portfolio">Portfolio</a>
              <a href="#about">About</a>
              <a href="#team">Team</a>
              <a href="#blog">Blog</a>
              <a href="#thesis">Thesis</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>MONARCH GROUP © 2025 — ALL RIGHTS RESERVED</p>
            <p className="footer-thanks">ALL THANKS TO SATOSHI</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
