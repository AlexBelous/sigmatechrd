// shared.jsx — design tokens, content, logo mark, primitives.
// All exports are hung on window so the variant files can pick them up.

const TOKENS = {
  paper: 'oklch(0.97 0.008 85)',
  paperDeep: 'oklch(0.93 0.012 85)',
  ink: 'oklch(0.18 0.02 240)',
  inkSoft: 'oklch(0.32 0.02 240)',
  inkMute: 'oklch(0.52 0.015 240)',
  rule: 'oklch(0.78 0.01 240)',
  ruleSoft: 'oklch(0.88 0.008 240)',
  amber: 'oklch(0.74 0.16 60)',
  amberDeep: 'oklch(0.62 0.16 55)',
  cyan: 'oklch(0.72 0.13 200)',
  green: 'oklch(0.78 0.18 145)',
  red: 'oklch(0.62 0.21 25)',
  panel: 'oklch(0.16 0.02 240)',
  panelMid: 'oklch(0.22 0.022 235)',
  panelHi: 'oklch(0.30 0.022 235)',
  serif: "'IBM Plex Serif', Georgia, serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
  sans: "'IBM Plex Sans', system-ui, sans-serif",
};

// ─────────────────────────────────────────────────────────────
// CONTENT
// Anonymized but factually plausible. All hard numbers are flagged
// as PLACEHOLDER in the UI itself.
// ─────────────────────────────────────────────────────────────
const CONTENT = {
  legal: {
    name: 'Sigma Tech R&D Solutions Limited',
    short: 'Sigma Tech R&D',
    cr: '79446742',
    br: '79446742-000-12-25-A',
    incorporated: '22 Dec 2025',
    jurisdiction: 'Hong Kong SAR · Private Limited',
    address: '21/F, CMA Building, 64 Connaught Road Central, Central, Hong Kong',
    email: 'info@sigmatechrd.com',
    web: 'sigmatechrd.com',
  },
  tagline: 'Pre-acquisition diagnostics for second-hand laboratory instruments.',
  subline: 'Independent verification, calibration and reporting before the wire transfer clears. Auction lots, surplus, direct sale — we travel, we plug it in, we sign the report.',
  services: [
    {
      id: 'S-01',
      title: 'Pre-purchase inspection',
      detail: 'On-site visit to the seller. Power-on, run reference samples, photograph internals, capture serials and firmware. Same-week turnaround for most jurisdictions.',
    },
    {
      id: 'S-02',
      title: 'Calibration & performance verification',
      detail: 'Against the OEM specification sheet, not a vibe check. Pressure, mass accuracy, thermal stability, signal-to-noise. Deviations expressed as % of spec.',
    },
    {
      id: 'S-03',
      title: 'Auction-lot due diligence',
      detail: 'Bid, EquipNet, Surplus Solutions, GoIndustry — we read the listing, request additional photos, and produce a recommended max-bid with confidence band.',
    },
    {
      id: 'S-04',
      title: 'Documentation review',
      detail: 'Service logs, prior calibration certificates, chain-of-custody, export-control flags (ECCN). Translated and cross-referenced to the manufacturer record.',
    },
    {
      id: 'S-05',
      title: 'Logistics & customs advisory',
      detail: 'Crating spec, lithium-cell declarations, refrigerant compliance, dual-use export licences. We do not ship — we tell you who should and what to ask them.',
    },
    {
      id: 'S-06',
      title: 'Post-arrival re-verification',
      detail: 'Optional. Inspector visits the buyer\u2019s site after delivery to confirm no transit damage and re-run the acceptance protocol.',
    },
  ],
  instruments: [
    { id: 'LC', name: 'HPLC / UPLC',       vendors: 'Waters, Agilent, Shimadzu, Thermo' },
    { id: 'GC', name: 'GC & GC-MS',         vendors: 'Agilent, Shimadzu, PerkinElmer' },
    { id: 'MS', name: 'Mass spectrometry',   vendors: 'Thermo, Sciex, Bruker, Waters' },
    { id: 'NMR',name: 'NMR spectroscopy',    vendors: 'Bruker, JEOL, Oxford Instruments' },
    { id: 'IR', name: 'FTIR / Raman / UV-Vis',vendors: 'Bruker, PerkinElmer, Agilent, Thermo' },
    { id: 'EM', name: 'Electron microscopy', vendors: 'Thermo (FEI), JEOL, Hitachi, Zeiss' },
    { id: 'OM', name: 'Optical microscopy',  vendors: 'Leica, Nikon, Olympus, Zeiss' },
    { id: 'BR', name: 'Bioreactors',         vendors: 'Sartorius, Eppendorf, Applikon' },
    { id: 'CF', name: 'Centrifuges',         vendors: 'Beckman, Eppendorf, Thermo' },
    { id: 'CS', name: 'Cold storage',        vendors: '-80\u00b0C freezers, LN2 dewars' },
    { id: 'SM', name: 'Semicon metrology',   vendors: 'KLA, Onto, Bruker, Park' },
    { id: 'XR', name: 'XRD / XRF',           vendors: 'Bruker, Rigaku, Malvern Panalytical' },
  ],
  cases: [
    {
      id: 'R-2603',
      buyer: 'Pharma R&D, EU',
      lot: 'Agilent 1290 Infinity II UHPLC',
      source: 'Bid auction, US',
      bidAsk: '$84,000',
      verdict: 'PASS · CONDITIONAL',
      note: 'DAD lamp at 71% remaining hours; pump A pulsation 0.47% (spec < 0.5%). Column compartment held ±0.05 °C across 24 h. Recommended bid −8.5K against ask.',
      delta: '−10.1%',
    },
    {
      id: 'R-2611',
      buyer: 'CRO · Bioanalytical, JP',
      lot: 'Shimadzu LCMS-8050',
      source: 'Surplus dealer, JP',
      bidAsk: '$148,500',
      verdict: 'PASS',
      note: 'Triple-quad tune within 0.3 mass units; reserpine S/N 38 000:1 (spec 30 000:1). ESI capillary replaced 4 mo ago. Service log complete.',
      delta: '−1.7%',
    },
    {
      id: 'R-2618',
      buyer: 'Biotech, SG',
      lot: 'Agilent 6460 Triple Quad LC/MS',
      source: 'EquipNet lot',
      bidAsk: '$172,000',
      verdict: 'FAIL',
      note: 'Electron multiplier gain dropped to 41% of nominal; cannot meet baseline noise spec on either MRM channel. Replacement detector quoted at $54K + 6 wk lead. Client walked.',
      delta: 'WALK',
    },
    {
      id: 'R-2624',
      buyer: 'CRO, IN',
      lot: 'Agilent 7890B GC × 3',
      source: 'Direct seller, DE',
      bidAsk: '$72,000',
      verdict: 'PASS · CONDITIONAL',
      note: 'Inlet septa worn on unit 2; flame ionisation OK on all three. Recommended +$1,800 reconditioning budget.',
      delta: '−2.5%',
    },
  ],
  numbers: [
    { v: '142',   u: 'reports filed',           f: '12-mo trailing · placeholder' },
    { v: '23.4%', u: 'mean delta vs ask',       f: 'lots renegotiated · placeholder' },
    { v: '31%',   u: 'fail/walk rate',          f: 'of lots inspected · placeholder' },
    { v: '19',    u: 'jurisdictions worked',    f: 'inspector mileage · placeholder' },
  ],
  workflow: [
    { step: '01', title: 'Brief',         body: 'Buyer sends listing URL, target lot, and budget envelope. We reply within one working day with a fee quote and timeline.' },
    { step: '02', title: 'Travel',        body: 'Inspector dispatched to the seller\u2019s site. Power, solvent, gas, samples arranged ahead of time with the vendor.' },
    { step: '03', title: 'Test',          body: 'Standard protocol per instrument class. Reference samples, calibration runs, internals photographed, firmware captured.' },
    { step: '04', title: 'Report',        body: 'PDF deliverable: spec deviations, photo log, recommended max bid with confidence band, walk-or-buy verdict.' },
    { step: '05', title: 'Hand-off',      body: 'Optional post-arrival re-verification at the buyer\u2019s site. Closes the chain of custody.' },
  ],
};

// ─────────────────────────────────────────────────────────────
// Logo / wordmark
// Σ inside square brackets — a nod to engineering tolerance notation.
// `variant` toggles between paper-ink and dark-panel presentations.
// ─────────────────────────────────────────────────────────────
function Wordmark({ size = 24, color = 'currentColor', accent = 'currentColor', caption = true, layout = 'row', captionColor }) {
  const lineH = size;
  const cap = captionColor ?? color;
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: layout === 'stack' ? 'column' : 'row',
      alignItems: layout === 'stack' ? 'flex-start' : 'center',
      gap: layout === 'stack' ? size * 0.25 : size * 0.55,
      color,
      fontFamily: TOKENS.mono,
      lineHeight: 1,
    }}>
      <svg width={size * 1.55} height={lineH} viewBox="0 0 62 40" style={{ display: 'block', flex: '0 0 auto' }}>
        {/* bracket left */}
        <path d="M8 2 L2 2 L2 38 L8 38" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="square"/>
        {/* bracket right */}
        <path d="M54 2 L60 2 L60 38 L54 38" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="square"/>
        {/* sigma */}
        <path d="M44 8 L18 8 L31 20 L18 32 L44 32" fill="none" stroke={accent} strokeWidth="3.6" strokeLinejoin="miter" strokeLinecap="square"/>
        {/* tick under sigma — measurement reference */}
        <line x1="20" y1="36" x2="42" y2="36" stroke={color} strokeWidth="1" />
        <line x1="20" y1="34.5" x2="20" y2="37.5" stroke={color} strokeWidth="1" />
        <line x1="42" y1="34.5" x2="42" y2="37.5" stroke={color} strokeWidth="1" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: size * 0.12 }}>
        <div style={{
          fontFamily: TOKENS.mono,
          fontWeight: 600,
          letterSpacing: '0.06em',
          fontSize: size * 0.62,
          textTransform: 'uppercase',
        }}>SIGMA&nbsp;TECH</div>
        {caption && (
          <div style={{
            fontFamily: TOKENS.mono,
            fontWeight: 400,
            letterSpacing: '0.18em',
            fontSize: size * 0.36,
            textTransform: 'uppercase',
            color: cap,
            opacity: 0.7,
          }}>R&amp;D&nbsp;SOLUTIONS</div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers — small reusable bits
// ─────────────────────────────────────────────────────────────
function Rule({ color = TOKENS.rule, dashed = false, weight = 1, margin = 0 }) {
  return <div style={{
    height: 0,
    borderTop: `${weight}px ${dashed ? 'dashed' : 'solid'} ${color}`,
    margin: typeof margin === 'number' ? `${margin}px 0` : margin,
  }} />;
}

// labeled hairline for engineering panels:  "—— LABEL ——————————"
function LabelRule({ children, color = TOKENS.ink, fontSize = 11, side = 'left' }) {
  const labelEl = (
    <span style={{
      fontFamily: TOKENS.mono,
      fontSize,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color,
      whiteSpace: 'nowrap',
      flex: '0 0 auto',
    }}>{children}</span>
  );
  const line = <div style={{ flex: '1 1 auto', height: 1, background: color, opacity: 0.45 }} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {side !== 'right' && labelEl}
      {line}
      {side === 'right' && labelEl}
    </div>
  );
}

// Faux signal trace SVG — used in hero of multiple variants.
// Procedurally generated path, deterministic seed for stable render.
function SignalTrace({ width = 800, height = 200, color = TOKENS.ink, fill = 'none', strokeWidth = 1.2, points = 200, seed = 1, baselineLabel }) {
  // Mulberry32 PRNG so we don't need an extra dep.
  const rand = (() => {
    let s = seed >>> 0;
    return () => {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  })();
  const ys = [];
  let y = height / 2;
  for (let i = 0; i < points; i++) {
    y += (rand() - 0.5) * height * 0.06;
    y = Math.max(height * 0.15, Math.min(height * 0.85, y));
    ys.push(y);
  }
  // occasional spike to read as instrument data
  for (let i = 0; i < points / 25; i++) {
    const idx = Math.floor(rand() * points);
    ys[idx] = height * (rand() < 0.5 ? 0.08 : 0.92);
  }
  const d = ys.map((yy, i) => {
    const x = (i / (points - 1)) * width;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${yy.toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {/* grid */}
      <defs>
        <pattern id={`grid-${seed}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke={color} strokeWidth="0.5" opacity="0.18" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#grid-${seed})`} />
      {/* baseline */}
      <line x1="0" y1={height/2} x2={width} y2={height/2} stroke={color} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 4"/>
      <path d={d} fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
      {baselineLabel && (
        <text x="6" y={height/2 - 4} fontFamily="IBM Plex Mono, monospace" fontSize="10" fill={color} opacity="0.6">{baselineLabel}</text>
      )}
    </svg>
  );
}

// PLACEHOLDER chip — for any data the client should later confirm.
function PH({ children = 'placeholder', color = TOKENS.inkMute }) {
  return (
    <span style={{
      fontFamily: TOKENS.mono,
      fontSize: 9,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '2px 5px',
      border: `1px dashed ${color}`,
      color,
      borderRadius: 2,
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
    }}>{children}</span>
  );
}

// Responsive viewport hook — site files use it to switch layouts.
function useViewport() {
  const get = () => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    if (w < 720) return 'mobile';
    if (w < 1080) return 'tablet';
    return 'desktop';
  };
  const [mode, setMode] = React.useState(get);
  React.useEffect(() => {
    const onResize = () => setMode(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return mode;
}

// Export to window so variant files can read these without re-importing.
Object.assign(window, { TOKENS, CONTENT, Wordmark, Rule, LabelRule, SignalTrace, PH, useViewport });
