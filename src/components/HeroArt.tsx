export function HeroArt() {
  return <div className="hero-art" aria-hidden="true">
    <div className="art-topline"><span>DESIGN × DEVELOPMENT</span><span>EP / 26</span></div>
    <svg className="orbit-art" viewBox="0 0 500 500" fill="none">
      <defs>
        <linearGradient id="orbit-gradient" x1="100" y1="80" x2="400" y2="450" gradientUnits="userSpaceOnUse"><stop stopColor="#faedff"/><stop offset=".45" stopColor="#e7c6ff"/><stop offset="1" stopColor="#8b65b1"/></linearGradient>
        <radialGradient id="sphere-gradient" cx=".3" cy=".25" r=".8"><stop stopColor="#fff8d4"/><stop offset=".45" stopColor="#fae588"/><stop offset="1" stopColor="#c6a94c"/></radialGradient>
      </defs>
      <circle cx="250" cy="250" r="197" stroke="#ffffff" strokeOpacity=".08"/>
      <path d="M30 250h440M250 30v440" stroke="white" strokeOpacity=".06"/>
      <g className="orbit-motion"><g transform="translate(250 250) rotate(-38)">
        {Array.from({ length: 28 }, (_, index) => <ellipse key={index} rx={160 + Math.sin(index / 27 * Math.PI) * 32} ry={64 + index * 3.4} transform={`rotate(${index * 2.6 - 36})`} stroke="url(#orbit-gradient)" strokeWidth="2.4" opacity={.75 + index / 110} />)}
      </g></g>
      <circle className="hero-sphere" cx="250" cy="250" r="48" fill="url(#sphere-gradient)"/>
      <circle cx="412" cy="154" r="7" fill="#e7c6ff"/>
      <path d="M94 342v28m-14-14h28" stroke="#fae588" strokeWidth="2"/>
    </svg>
    <div className="art-note"><span className="art-bracket">&#123;</span><span>A little curiosity.<br/>A lot of possibility.</span><span className="art-bracket">&#125;</span></div>
    <div className="art-bottomline"><span>CREATIVE BY NATURE.</span><span>BUILT WITH INTENTION.</span></div>
    <span className="art-sticker">Ideas into<br/><strong>experiences.</strong><span>↗</span></span>
  </div>
}
