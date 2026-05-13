// mix-img-hero.jsx — Interactive hero block for the A×C variant.
// Instrument toggle (HPLC / GC / MS), hover-reveal modules with live
// spec readouts, continuously animated signal-trace strip.

// ─── Per-instrument data ────────────────────────────────────────────
const HERO_INSTRUMENTS = {
  LC: {
    code: 'LC',
    layout: 'stack',
    badge: 'Plate 01',
    title: 'HPLC · UPLC stack',
    note: 'Stuttgart, DE · Mar 2026 · Waters Acquity H-Class lot',
    height: 77,
    width: 24,
    cx: 32,
    modules: [
      { id: 'tr',  y: 5,  h: 10, name: 'Solvent tray',         pn: 'G7104',  spec: '4× 1 L mobile phase · degas vacuum 0.85 bar · A/B/C/D' },
      { id: 'dg',  y: 15, h: 8,  name: 'Online degasser',      pn: 'G7103',  spec: 'Membrane vacuum · 4-channel · 95% nominal efficiency' },
      { id: 'pm',  y: 23, h: 13, name: 'Binary pump',          pn: 'G7120',  spec: 'Max 1300 bar · 0.001–10 mL/min · pulsation < 0.5%', flag: 'PASS' },
      { id: 'as',  y: 36, h: 11, name: 'Autosampler',          pn: 'G7129',  spec: '108 vials · 0.1–100 μL · carry-over < 0.0005% (BSA test)' },
      { id: 'co',  y: 47, h: 18, name: 'Column compartment',   pn: 'G7116',  spec: '4-column switching · 4–110 °C · ±0.1 °C stability' },
      { id: 'dd',  y: 65, h: 12, name: 'DAD detector',         pn: 'G7117',  spec: '190–640 nm · lamp at 78% rem. on this unit · slit 1/2/4/8 nm', flag: 'COND' },
    ],
    readout: [
      { k: 'COL. PRESSURE',  v: '412 bar',       d: '−0.4% vs spec', ok: 1 },
      { k: 'FLOW',           v: '0.300 mL/min',  d: 'set',           ok: 1 },
      { k: 'DET. LAMP',      v: '78%',           d: 'remaining',     ok: 0 },
      { k: 'COL. TEMP.',     v: '40.02 °C',      d: '±0.02',         ok: 1 },
    ],
    // shape of signal trace (peaks visible)
    traceSeed: 7,
  },
  GC: {
    code: 'GC',
    layout: 'bench',
    badge: 'Plate 01',
    title: 'GC · GC-MS bench',
    note: 'Bonn, DE · Feb 2026 · Agilent 7890B + 5977 MSD',
    dim: '930 MM',
    modules: [
      { id: 'ov', name: 'Column oven',           shortName: 'COL. OVEN',    pn: 'OVN-12', spec: '−86 °C ramp · 4 °C/s · ±0.01 °C · 30m · 0.25 mm · 0.25 μm', flag: 'PASS',
        hit: { x: 8, y: 32, w: 48, h: 44 }, anchor: { x: 14, y: 56 }, labelY: 40 },
      { id: 'cl', name: 'Capillary col. DB-5MS', shortName: 'DB-5MS COL.',  pn: 'DB-5MS', spec: 'Phenyl-methyl 5% · 30 m · max 350 °C · 2400 plates/m',
        hit: { x: 22, y: 45, w: 20, h: 20 }, anchor: { x: 24, y: 50 }, labelY: 52 },
      { id: 'gs', name: 'Carrier gas + EPC',     shortName: 'GAS · EPC',    pn: 'EPC-1',  spec: 'He / H₂ / N₂ · 0–150 psi · electronic press. control',
        hit: { x: 25.5, y: 22, w: 11, h: 10 }, anchor: { x: 31, y: 27 }, labelY: 14 },
      { id: 'in', name: 'Split/splitless inj.',  shortName: 'SSL INJECTOR', pn: 'SSL-A',  spec: '50–450 °C · split 1:1–1:7500 · septa worn this unit', flag: 'COND',
        hit: { x: 37.5, y: 22, w: 8.5, h: 10 }, anchor: { x: 41, y: 27 }, labelY: 22 },
      { id: 'fd', name: 'FID detector',          shortName: 'FID DETECTOR', pn: 'FID-1',  spec: 'H₂/air flame · 400 °C · 5 pg C/s · noise 1·10⁻¹⁴ A',
        hit: { x: 47, y: 18, w: 7, h: 14 }, anchor: { x: 50, y: 22 }, labelY: 30 },
      { id: 'ms', name: '5977 MSD',              shortName: '5977 MSD',     pn: 'MSD-77', spec: 'EI 70 eV · m/z 1.6–1050 · 12 500 amu/s · turbo 67 L/s',
        hit: { x: 54, y: 36, w: 14, h: 34 }, anchor: { x: 61, y: 38 }, labelY: 66 },
    ],
    readout: [
      { k: 'OVEN RAMP',     v: '+0.008 °C/s',  d: 'tracking', ok: 1 },
      { k: 'INLET PRES.',   v: '14.7 psi',     d: 'nominal',  ok: 1 },
      { k: 'SEPTA CYCLES',  v: '8 213',        d: 'replace',  ok: 0 },
      { k: 'FID BASELINE',  v: '0.6 pA',       d: 'clean',    ok: 1 },
    ],
    traceSeed: 13,
  },
  MS: {
    code: 'MS',
    layout: 'bench',
    badge: 'Plate 01',
    title: 'Mass spectrometer',
    note: 'Hong Kong · Jan 2026 · Thermo Q Exactive · EquipNet lot',
    dim: '1310 MM',
    modules: [
      { id: 'sr', name: 'HESI ion source',     shortName: 'HESI SOURCE',  pn: 'HESI-II', spec: 'ESI/APCI · sheath 35 / aux 10 / sweep 0 · ±5 kV',
        hit: { x: 3, y: 36, w: 12, h: 18 }, anchor: { x: 14, y: 42 }, labelY: 14 },
      { id: 'sl', name: 'S-lens · ion funnel', shortName: 'S-LENS',       pn: 'S-LENS',  spec: 'RF amp 90% · transmission 0.92 vs new this unit',
        hit: { x: 15, y: 38, w: 5, h: 14 }, anchor: { x: 19, y: 42 }, labelY: 22 },
      { id: 'q1', name: 'Quadrupole · Q1',     shortName: 'QUAD Q1',      pn: 'Q1-100',  spec: 'm/z 50–2000 · iso. 0.4 amu · 10⁻⁶ mbar', flag: 'PASS',
        hit: { x: 20, y: 38, w: 9, h: 14 }, anchor: { x: 28, y: 42 }, labelY: 30 },
      { id: 'hd', name: 'HCD collision cell',  shortName: 'HCD CELL',     pn: 'HCD-3',   spec: '0–250 eV · N₂ activation gas · 30 ms dwell',
        hit: { x: 29, y: 40, w: 7, h: 10 }, anchor: { x: 35, y: 42 }, labelY: 38 },
      { id: 'or', name: 'Orbitrap · C-trap',   shortName: 'ORBITRAP',     pn: 'ORB-Q',   spec: '140 000 res. @ m/z 200 · ±2 ppm mass accuracy', flag: 'PASS',
        hit: { x: 36, y: 35, w: 17, h: 21 }, anchor: { x: 44, y: 35 }, labelY: 48 },
      { id: 'pm', name: 'Turbo + rough pumps', shortName: 'TURBO + ROUGH', pn: 'TMP-310', spec: '310 L/s · 2× backing scroll · vac log OK',
        hit: { x: 14, y: 62, w: 46, h: 16 }, anchor: { x: 36, y: 64 }, labelY: 72 },
      { id: 'dt', name: 'Electron multiplier', shortName: 'EM DETECTOR',  pn: 'EM-4',    spec: '8 channels · gain 1·10⁵ · noise 0.2 cps',
        hit: { x: 53, y: 40, w: 8, h: 10 }, anchor: { x: 60, y: 42 }, labelY: 58 },
    ],
    readout: [
      { k: 'VACUUM',       v: '1.4·10⁻⁹ mbar',  d: 'analyser',  ok: 1 },
      { k: 'MASS ACC.',    v: '0.8 ppm',        d: 'spec ≤ 2',  ok: 1 },
      { k: 'RESOLUTION',   v: '137 200',        d: '@ m/z 200', ok: 1 },
      { k: 'SOURCE I',     v: '24 μA',          d: 'ESI(+)',    ok: 1 },
    ],
    traceSeed: 21,
  },
};

// ─── Animated trace ────────────────────────────────────────────────
// Two repeated path segments translating left produce a seamless loop.
function LiveTrace({ seed, height = 120, color = 'oklch(0.18 0.02 240)', accent = 'oklch(0.62 0.16 55)', speed = 24 }) {
  const W = 1240;       // width of one tile
  const POINTS = 400;
  const path = React.useMemo(() => {
    let s = (seed >>> 0) || 1;
    const rand = () => { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const ys = [];
    let y = height / 2;
    // baseline noise
    for (let i = 0; i < POINTS; i++) {
      y += (rand() - 0.5) * height * 0.05;
      y = Math.max(height * 0.18, Math.min(height * 0.82, y));
      ys.push(y);
    }
    // place ~6 peaks (chromatogram-style)
    const peakAt = [0.10, 0.22, 0.37, 0.55, 0.72, 0.88];
    for (const p of peakAt) {
      const center = Math.floor(p * POINTS);
      const w = Math.floor(POINTS * (0.012 + rand() * 0.02));
      const amp = height * (0.30 + rand() * 0.45);
      for (let k = -w; k <= w; k++) {
        const idx = center + k;
        if (idx < 0 || idx >= POINTS) continue;
        const env = Math.exp(-(k * k) / (w * w * 0.4));
        ys[idx] = Math.max(height * 0.05, ys[idx] - amp * env);
      }
    }
    return ys.map((yy, i) => `${i === 0 ? 'M' : 'L'}${((i / (POINTS - 1)) * W).toFixed(1)} ${yy.toFixed(1)}`).join(' ');
  }, [seed, height]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height, background: 'oklch(0.94 0.012 78)', border: `1px solid oklch(0.80 0.01 240)` }}>
      {/* fixed grid */}
      <svg width="100%" height={height} viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id={`gd-${seed}`} width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M40 0 H0 V20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.18"/>
          </pattern>
        </defs>
        <rect width={W} height={height} fill={`url(#gd-${seed})`}/>
        <line x1="0" y1={height/2} x2={W} y2={height/2} stroke={color} strokeWidth="0.5" opacity="0.32" strokeDasharray="2 4"/>
      </svg>
      {/* scrolling trace (double-tile) */}
      <div style={{
        position: 'absolute', inset: 0,
        animation: `mixhero-scroll-${seed} ${speed}s linear infinite`,
        width: W * 2, height,
      }}>
        <svg width={W * 2} height={height} viewBox={`0 0 ${W * 2} ${height}`} preserveAspectRatio="none">
          <path d={path} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/>
          <g transform={`translate(${W} 0)`}><path d={path} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round"/></g>
        </svg>
      </div>
      {/* leading-edge cursor */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 24, width: 1.5,
        background: accent, opacity: 0.85,
      }}/>
      <div style={{
        position: 'absolute', top: 6, right: 30,
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: accent,
      }}>● LIVE</div>
      <div style={{
        position: 'absolute', bottom: 6, left: 8,
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color, opacity: 0.6,
      }}>baseline · 0.00 mV</div>
      <style>{`@keyframes mixhero-scroll-${seed} { from { transform: translateX(0); } to { transform: translateX(-${W}px); } }`}</style>
    </div>
  );
}

// ─── Interactive instrument plate ──────────────────────────────────
// Dispatcher: LC uses the vertical-stack rendering; GC and MS use the
// bench rendering (horizontal benchtop with freeform hot-spots).
function InstrumentPlate({ data, active, setActive }) {
  if (data.layout === 'bench') return <BenchPlate data={data} active={active} setActive={setActive}/>;
  return <StackPlate data={data} active={active} setActive={setActive}/>;
}

function StackPlate({ data, active, setActive }) {
  const ink = 'oklch(0.18 0.02 240)';
  const dim = 'oklch(0.50 0.015 240)';
  const amber = 'oklch(0.62 0.16 55)';
  const paper = 'oklch(0.94 0.012 78)';
  const fill  = 'oklch(0.91 0.012 78)';
  const W = data.width, CX = data.cx;
  const x0 = CX - W / 2;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}>
      <defs>
        <pattern id="plate-grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M5 0 H0 V5" fill="none" stroke={ink} strokeWidth="0.08" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#plate-grid)`}/>

      {/* left dim line · height annotation */}
      <g stroke={dim} strokeWidth="0.25" fill="none">
        <line x1="3" y1={data.modules[0].y} x2="3" y2={data.modules[data.modules.length - 1].y + data.modules[data.modules.length - 1].h}/>
        <line x1="1" y1={data.modules[0].y} x2="5" y2={data.modules[0].y}/>
        <line x1="1" y1={data.modules[data.modules.length - 1].y + data.modules[data.modules.length - 1].h} x2="5" y2={data.modules[data.modules.length - 1].y + data.modules[data.modules.length - 1].h}/>
      </g>
      <text x="-1.5" y="50" fontSize="2.2" fill={dim} fontFamily="IBM Plex Mono, monospace"
            textAnchor="middle" transform="rotate(-90 -1.5 50)" letterSpacing="0.2">
        {data.code === 'LC' ? '1820 MM' : data.code === 'GC' ? '1240 MM' : '2010 MM'}
      </text>

      {/* modules */}
      {data.modules.map((m) => {
        const isActive = active === m.id;
        const stroke = isActive ? amber : ink;
        const sw = isActive ? 0.9 : 0.5;
        return (
          <g key={m.id} onMouseEnter={() => setActive(m.id)} onMouseLeave={() => setActive(null)} style={{ cursor: 'pointer' }}>
            {/* invisible hover hit area */}
            <rect x={x0 - 2} y={m.y - 0.4} width={W + 4} height={m.h + 0.8} fill="transparent"/>
            {/* main rect */}
            <rect x={x0} y={m.y} width={W} height={m.h - 0.6} fill={isActive ? paper : fill} stroke={stroke} strokeWidth={sw}/>
            {/* inner frame */}
            <rect x={x0 + 2} y={m.y + 1.5} width={W - 4} height={m.h - 3.6} fill="none" stroke={dim} strokeWidth="0.2"/>
            {/* status pip */}
            <circle cx={x0 + 3} cy={m.y + m.h / 2} r="0.7" fill={m.flag === 'COND' ? amber : isActive ? amber : dim}/>
            {/* mini display */}
            <rect x={x0 + W - 11} y={m.y + m.h / 2 - 1.4} width="9" height="2.8" fill="oklch(0.85 0.01 240)" stroke={dim} strokeWidth="0.2"/>
            <line x1={x0 + W - 10} y1={m.y + m.h / 2 - 0.5} x2={x0 + W - 4} y2={m.y + m.h / 2 - 0.5} stroke={isActive ? amber : ink} strokeWidth="0.3"/>
            <line x1={x0 + W - 10} y1={m.y + m.h / 2 + 0.6} x2={x0 + W - 4} y2={m.y + m.h / 2 + 0.6} stroke={dim} strokeWidth="0.2"/>
            {/* leader line */}
            <line x1={x0 + W} y1={m.y + m.h / 2} x2={x0 + W + 4} y2={m.y + m.h / 2}
                  stroke={isActive ? amber : dim} strokeWidth={isActive ? 0.5 : 0.25}
                  strokeDasharray={isActive ? null : "0.8 0.8"}/>
            {/* label */}
            <text x={x0 + W + 5} y={m.y + m.h / 2 + 0.6} fontSize="2.6"
                  fill={isActive ? amber : ink}
                  fontFamily="IBM Plex Mono, monospace" fontWeight={isActive ? 600 : 500}
                  letterSpacing="0.04em">{m.name.toUpperCase()}</text>
            <text x={x0 + W + 5} y={m.y + m.h / 2 + 3.3} fontSize="1.9"
                  fill={dim} fontFamily="IBM Plex Mono, monospace" letterSpacing="0.06em">{m.pn}</text>
            {/* flag */}
            {m.flag && (
              <g>
                <rect x={x0 - 7.5} y={m.y + m.h / 2 - 1.5} width="6" height="3" fill="none" stroke={m.flag === 'PASS' ? 'oklch(0.45 0.14 145)' : amber} strokeWidth="0.3"/>
                <text x={x0 - 4.5} y={m.y + m.h / 2 + 0.8} fontSize="1.7" fill={m.flag === 'PASS' ? 'oklch(0.45 0.14 145)' : amber}
                      fontFamily="IBM Plex Mono, monospace" textAnchor="middle" letterSpacing="0.06em">{m.flag}</text>
              </g>
            )}
          </g>
        );
      })}

      {/* base */}
      <rect x={x0 - 2.5} y={data.modules[data.modules.length - 1].y + data.modules[data.modules.length - 1].h + 0.5} width={W + 5} height="2" fill={fill} stroke={ink} strokeWidth="0.4"/>
      <line x1={x0 - 1} y1={data.modules[data.modules.length - 1].y + data.modules[data.modules.length - 1].h + 2.5} x2={x0 - 1} y2={data.modules[data.modules.length - 1].y + data.modules[data.modules.length - 1].h + 4} stroke={ink} strokeWidth="0.4"/>
      <line x1={x0 + W + 1} y1={data.modules[data.modules.length - 1].y + data.modules[data.modules.length - 1].h + 2.5} x2={x0 + W + 1} y2={data.modules[data.modules.length - 1].y + data.modules[data.modules.length - 1].h + 4} stroke={ink} strokeWidth="0.4"/>
    </svg>
  );
}

// ─── Bench plate (horizontal benchtop instruments) ─────────────────
const BENCH_C = {
  ink:   'oklch(0.18 0.02 240)',
  dim:   'oklch(0.50 0.015 240)',
  amber: 'oklch(0.62 0.16 55)',
  paper: 'oklch(0.94 0.012 78)',
  fill:  'oklch(0.91 0.012 78)',
  paperLite: 'oklch(0.96 0.010 78)',
  green: 'oklch(0.45 0.14 145)',
  mono: 'IBM Plex Mono, monospace',
};

function BenchPlate({ data, active, setActive }) {
  const c = BENCH_C;
  const Artwork = data.code === 'GC' ? GCArtwork : MSArtwork;
  const TOP_PAD = 30;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }}>
      <defs>
        <pattern id="plate-grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M5 0 H0 V5" fill="none" stroke={c.ink} strokeWidth="0.08" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#plate-grid)"/>

      {/* artwork shifted down so labels fit at top */}
      <g transform={`translate(0 ${TOP_PAD})`}>
        <Artwork c={c}/>
      </g>

      {/* labels + leaders + hit zones */}
      {data.modules.map((m, idx) => (
        <BenchRegion key={m.id} m={m} idx={idx} total={data.modules.length}
          active={active} setActive={setActive} c={c} topPad={TOP_PAD}/>
      ))}
    </svg>
  );
}

function BenchRegion({ m, idx, total, active, setActive, c, topPad }) {
  const isActive = active === m.id;
  // Distribute labels across the full width with even margins.
  const innerL = 4, innerR = 96;
  const colW = (innerR - innerL) / total;
  const cx = innerL + (idx + 0.5) * colW;
  // Single descending staircase: each label one step further right + lower.
  // (Modules are pre-sorted in HERO_INSTRUMENTS to produce the visual order
  // the user asked for.) Total descent ~ (total-1) * step <= TOP_PAD.
  const step = total <= 6 ? 3.0 : 2.6;
  const yOff = idx * step;
  const tagY      = 2.0 + yOff;
  const nameY     = 5.6 + yOff;
  const pnY       = 8.2 + yOff;
  const leaderTop = 9.4 + yOff;
  const hitY = m.hit.y + topPad;
  const aY   = m.anchor.y + topPad;
  const points = `${cx},${leaderTop} ${cx},${Math.min(leaderTop + 1.2, aY - 0.5)} ${m.anchor.x},${aY - 0.5} ${m.anchor.x},${aY}`;
  const lineColor = isActive ? c.amber : c.dim;
  const flagColor = m.flag === 'PASS' ? c.green : c.amber;
  const name = (m.shortName || m.name).toUpperCase();
  const nameFs = total <= 6 ? 2.3 : 2.0;
  return (
    <g onMouseEnter={() => setActive(m.id)} onMouseLeave={() => setActive(null)} style={{ cursor: 'pointer' }}>
      {/* hit area on artwork */}
      <rect x={m.hit.x} y={hitY} width={m.hit.w} height={m.hit.h}
            fill={isActive ? 'oklch(0.74 0.16 60 / 0.14)' : 'transparent'}
            stroke={isActive ? c.amber : 'none'} strokeWidth={isActive ? 0.5 : 0}
            strokeDasharray={isActive ? '1 0.8' : null}/>
      {/* leader */}
      <polyline points={points} fill="none"
                stroke={lineColor} strokeWidth={isActive ? 0.5 : 0.3}
                strokeDasharray={isActive ? null : '0.6 0.6'}/>
      <circle cx={m.anchor.x} cy={aY} r="0.6" fill={lineColor}/>
      {/* tag number — small monospace badge */}
      <text x={cx - colW/2 + 1.2} y={tagY + 1.5} fontSize="1.8"
            fill={isActive ? c.amber : c.dim}
            fontFamily={c.mono} fontWeight="600" letterSpacing="0.1em">
        {String(idx + 1).padStart(2, '0')}
      </text>
      {/* flag chip on the right of the tag */}
      {m.flag && (
        <g>
          <rect x={cx + colW/2 - 6.5} y={tagY - 0.2} width="5.6" height="2.6" fill="none" stroke={flagColor} strokeWidth="0.3"/>
          <text x={cx + colW/2 - 3.7} y={tagY + 1.6} fontSize="1.45" fill={flagColor}
                fontFamily={c.mono} textAnchor="middle" letterSpacing="0.06em">{m.flag}</text>
        </g>
      )}
      {/* name */}
      <text x={cx} y={nameY} fontSize={nameFs}
            fill={isActive ? c.amber : c.ink}
            fontFamily={c.mono} fontWeight={isActive ? 600 : 500}
            textAnchor="middle" letterSpacing="0.04em">{name}</text>
      {/* pn */}
      <text x={cx} y={pnY} fontSize="1.7" fill={c.dim}
            fontFamily={c.mono} textAnchor="middle" letterSpacing="0.06em">{m.pn}</text>
    </g>
  );
}

function GCArtwork({ c }) {
  return (
    <g>
      {/* bench surface line */}
      <line x1="4" y1="80" x2="68" y2="80" stroke={c.ink} strokeWidth="0.5"/>

      {/* ── GC body (oven) ─────────────────────────────────────── */}
      <rect x="8" y="32" width="48" height="44" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      {/* outer door inset */}
      <rect x="10" y="34" width="44" height="36" fill="none" stroke={c.dim} strokeWidth="0.25" strokeDasharray="0.6 0.6"/>
      {/* glass window */}
      <circle cx="32" cy="55" r="11" fill={c.paperLite} stroke={c.ink} strokeWidth="0.5"/>
      {/* coiled capillary column (concentric rings) */}
      {[3, 5, 7, 9].map(r => <circle key={r} cx="32" cy="55" r={r} fill="none" stroke={c.dim} strokeWidth="0.45"/>)}
      {/* door handle */}
      <rect x="49" y="50" width="3" height="10" fill={c.ink}/>
      {/* hinges */}
      <rect x="9" y="36" width="1.5" height="2" fill={c.ink}/>
      <rect x="9" y="68" width="1.5" height="2" fill={c.ink}/>
      {/* front status panel */}
      <rect x="10" y="71.5" width="44" height="4" fill={c.ink}/>
      <rect x="12" y="72.3" width="6.5" height="2.4" fill={c.amber} opacity="0.55"/>
      <rect x="20.5" y="72.6" width="10" height="1.8" fill="oklch(0.86 0.012 80)"/>
      <rect x="32" y="72.6" width="10" height="1.8" fill="oklch(0.86 0.012 80)"/>
      <circle cx="50" cy="73.5" r="0.7" fill={c.amber}/>
      <text x="46" y="74.3" fontSize="1.3" fill={c.paperLite} fontFamily={c.mono}>RUN</text>

      {/* ── Autosampler tower ──────────────────────────────────── */}
      <rect x="11" y="12" width="13" height="20" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      {/* vial tray atop tower */}
      <rect x="10" y="9" width="15" height="3.5" fill={c.paper} stroke={c.ink} strokeWidth="0.4"/>
      {[11.4, 13.5, 15.6, 17.7, 19.8, 21.9, 24].map((x) => (
        <circle key={x} cx={x} cy="10.7" r="0.7" fill="none" stroke={c.dim} strokeWidth="0.25"/>
      ))}
      {/* arm + needle */}
      <rect x="13.5" y="16" width="9" height="2" fill={c.dim} opacity="0.55"/>
      <rect x="17" y="18" width="3" height="3" fill={c.ink}/>
      <line x1="18.5" y1="21" x2="18.5" y2="28" stroke={c.ink} strokeWidth="0.4"/>
      <circle cx="18.5" cy="28" r="0.5" fill={c.amber}/>

      {/* ── EPC (carrier gas + pressure control) ───────────────── */}
      <rect x="26" y="22" width="11" height="10" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      <circle cx="31.5" cy="27" r="2.6" fill={c.paperLite} stroke={c.ink} strokeWidth="0.35"/>
      <line x1="31.5" y1="27" x2="33.2" y2="25.7" stroke={c.ink} strokeWidth="0.4"/>
      <circle cx="31.5" cy="27" r="0.4" fill={c.ink}/>
      {[24.6, 25.7, 27, 28.3, 29.4].map((a, i) => (
        <line key={i} x1={31.5 + Math.cos((a - 27) * 0.8) * 0} y1={a} x2="31.5" y2={a} stroke={c.dim} strokeWidth="0.15"/>
      ))}
      <text x="31.5" y="31.4" fontSize="1.4" fill={c.dim} textAnchor="middle" fontFamily={c.mono}>PSI</text>

      {/* ── SSL injector ───────────────────────────────────────── */}
      <rect x="37.5" y="22" width="8.5" height="10" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      <circle cx="40" cy="23.6" r="1" fill={c.ink}/>
      <circle cx="43.5" cy="23.6" r="1" fill={c.ink}/>
      <line x1="40" y1="26" x2="40" y2="31.5" stroke={c.dim} strokeWidth="0.3"/>
      <line x1="43.5" y1="26" x2="43.5" y2="31.5" stroke={c.dim} strokeWidth="0.3"/>
      <rect x="38.5" y="29" width="6.5" height="1.5" fill="oklch(0.86 0.012 80)"/>

      {/* ── FID detector with chimney ──────────────────────────── */}
      <rect x="47.5" y="22" width="6" height="10" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      <rect x="49" y="18" width="3" height="4" fill={c.fill} stroke={c.ink} strokeWidth="0.35"/>
      <circle cx="50.5" cy="20" r="0.6" fill={c.amber}/>
      <line x1="50.5" y1="22" x2="50.5" y2="32" stroke={c.dim} strokeWidth="0.3"/>

      {/* ── MSD (5977) attached right ──────────────────────────── */}
      <rect x="54" y="36" width="14" height="34" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      {/* transfer line connecting GC oven to MSD */}
      <line x1="56" y1="55" x2="54" y2="55" stroke={c.amber} strokeWidth="0.55"/>
      <line x1="54" y1="55" x2="54" y2="48" stroke={c.dim} strokeWidth="0.3"/>
      {/* top display strip */}
      <rect x="55" y="38" width="12" height="3" fill={c.ink}/>
      <rect x="56" y="38.7" width="10" height="1.8" fill={c.amber} opacity="0.5"/>
      <text x="61" y="40.3" fontSize="1.5" fill={c.paperLite} textAnchor="middle" fontFamily={c.mono}>5977</text>
      {/* vacuum gauge */}
      <circle cx="61" cy="48" r="2.5" fill={c.paperLite} stroke={c.ink} strokeWidth="0.35"/>
      <line x1="61" y1="48" x2="62.5" y2="46.7" stroke={c.ink} strokeWidth="0.35"/>
      <circle cx="61" cy="48" r="0.3" fill={c.ink}/>
      <text x="61" y="52.5" fontSize="1.3" fill={c.dim} textAnchor="middle" fontFamily={c.mono}>mbar</text>
      {/* analyzer chamber outline */}
      <rect x="56" y="54" width="10" height="11" fill="none" stroke={c.dim} strokeWidth="0.3" strokeDasharray="0.5 0.5"/>
      {/* MSD handle */}
      <rect x="57.5" y="66.5" width="7" height="2" fill={c.ink}/>
    </g>
  );
}

function MSArtwork({ c }) {
  return (
    <g>
      {/* bench surface */}
      <line x1="4" y1="80" x2="68" y2="80" stroke={c.ink} strokeWidth="0.5"/>

      {/* ── Main vacuum housing ────────────────────────────────── */}
      <rect x="14" y="34" width="48" height="22" fill={c.fill} stroke={c.ink} strokeWidth="0.55"/>
      {/* model strip */}
      <rect x="14" y="32" width="48" height="2.4" fill={c.ink}/>
      <text x="38" y="33.8" fontSize="1.5" fill={c.paperLite} textAnchor="middle"
            fontFamily={c.mono} letterSpacing="0.3">Q EXACTIVE · ORBITRAP</text>

      {/* ── HESI source (sticks out left) ──────────────────────── */}
      <polygon points="14,38 9,42 9,48 14,52" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      <rect x="5" y="43" width="4" height="4" fill={c.fill} stroke={c.ink} strokeWidth="0.4"/>
      <line x1="5" y1="45" x2="3" y2="45" stroke={c.amber} strokeWidth="0.55"/>
      <circle cx="2.8" cy="45" r="0.5" fill={c.amber}/>
      {/* spray plume */}
      <line x1="5" y1="44" x2="3" y2="42.5" stroke={c.amber} strokeWidth="0.22" strokeDasharray="0.3 0.3"/>
      <line x1="5" y1="46" x2="3" y2="47.5" stroke={c.amber} strokeWidth="0.22" strokeDasharray="0.3 0.3"/>
      {/* nebuliser gas inlet (sheath) */}
      <line x1="9" y1="40" x2="6" y2="38" stroke={c.dim} strokeWidth="0.3"/>
      <text x="3" y="39" fontSize="1.4" fill={c.dim} fontFamily={c.mono}>HV</text>

      {/* ── S-lens / ion funnel ────────────────────────────────── */}
      <rect x="15" y="38" width="4.5" height="14" fill={c.fill} stroke={c.ink} strokeWidth="0.4"/>
      {[40, 42, 44, 46, 48, 50].map((y) => (
        <line key={y} x1="15.6" y1={y} x2="18.9" y2={y} stroke={c.dim} strokeWidth="0.22"/>
      ))}

      {/* ── Q1 quadrupole ──────────────────────────────────────── */}
      <rect x="20" y="38" width="9" height="14" fill={c.fill} stroke={c.ink} strokeWidth="0.4"/>
      {[40, 43, 46, 49].map((y) => (
        <g key={y}>
          <line x1="21" y1={y} x2="28" y2={y} stroke={c.ink} strokeWidth="0.55"/>
          <circle cx="21" cy={y} r="0.55" fill={c.dim}/>
          <circle cx="28" cy={y} r="0.55" fill={c.dim}/>
        </g>
      ))}

      {/* ── HCD collision cell ─────────────────────────────────── */}
      <rect x="29" y="40" width="7" height="10" fill={c.fill} stroke={c.ink} strokeWidth="0.4"/>
      {[42, 44, 46, 48].map((y) => <line key={y} x1="30" y1={y} x2="35" y2={y} stroke={c.dim} strokeWidth="0.3"/>)}
      <text x="32.5" y="51.7" fontSize="1.4" fill={c.dim} textAnchor="middle" fontFamily={c.mono}>HCD</text>

      {/* ── Orbitrap analyzer ──────────────────────────────────── */}
      <rect x="36" y="35" width="17" height="20" fill={c.fill} stroke={c.ink} strokeWidth="0.6"/>
      {/* outer barrel ellipses */}
      <ellipse cx="44.5" cy="45" rx="6.5" ry="7" fill="none" stroke={c.ink} strokeWidth="0.4"/>
      <ellipse cx="44.5" cy="45" rx="4" ry="5.5" fill="none" stroke={c.dim} strokeWidth="0.3"/>
      {/* spindle electrode */}
      <line x1="44.5" y1="38.5" x2="44.5" y2="51.5" stroke={c.ink} strokeWidth="0.8"/>
      <circle cx="44.5" cy="45" r="0.6" fill={c.amber}/>
      {/* resolution note inside */}
      <text x="44.5" y="56.5" fontSize="1.4" fill={c.dim} textAnchor="middle" fontFamily={c.mono}>140K @ m/z 200</text>

      {/* ── Electron multiplier detector ───────────────────────── */}
      <rect x="53" y="40" width="8" height="10" fill={c.fill} stroke={c.ink} strokeWidth="0.4"/>
      {/* dynode angles */}
      {[42, 44, 46, 48].map((y, i) => (
        <line key={i} x1="54" y1={y} x2={54 + 3.4 + i * 0.2} y2={y + 1.2} stroke={c.ink} strokeWidth="0.32"/>
      ))}
      <circle cx="60" cy="49.5" r="0.4" fill={c.amber}/>

      {/* ion beam path (dashed amber) */}
      <line x1="3" y1="45" x2="61" y2="45" stroke={c.amber} strokeWidth="0.25" strokeDasharray="1 0.7" opacity="0.7"/>

      {/* ── Vacuum / pump section ──────────────────────────────── */}
      {/* turbopump 1 */}
      <circle cx="22" cy="70" r="6" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      <circle cx="22" cy="70" r="4.2" fill="none" stroke={c.dim} strokeWidth="0.3"/>
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const r = 4.2, rad = deg * Math.PI / 180;
        return <line key={deg} x1="22" y1="70" x2={22 + Math.cos(rad) * r} y2={70 + Math.sin(rad) * r} stroke={c.ink} strokeWidth="0.4"/>;
      })}
      <circle cx="22" cy="70" r="0.6" fill={c.ink}/>
      {/* turbopump 2 */}
      <circle cx="36" cy="70" r="6" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      <circle cx="36" cy="70" r="4.2" fill="none" stroke={c.dim} strokeWidth="0.3"/>
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const r = 4.2, rad = deg * Math.PI / 180;
        return <line key={deg} x1="36" y1="70" x2={36 + Math.cos(rad) * r} y2={70 + Math.sin(rad) * r} stroke={c.ink} strokeWidth="0.4"/>;
      })}
      <circle cx="36" cy="70" r="0.6" fill={c.ink}/>
      {/* roughing (scroll) pump */}
      <rect x="46" y="64" width="14" height="14" fill={c.fill} stroke={c.ink} strokeWidth="0.5"/>
      <circle cx="50" cy="71" r="3.4" fill={c.paperLite} stroke={c.ink} strokeWidth="0.35"/>
      <circle cx="50" cy="71" r="1.8" fill="none" stroke={c.dim} strokeWidth="0.3"/>
      <circle cx="50" cy="71" r="0.6" fill={c.ink}/>
      <rect x="55" y="66" width="4.5" height="3" fill={c.ink} opacity="0.65"/>
      <rect x="55" y="73" width="4.5" height="3" fill="none" stroke={c.dim} strokeWidth="0.25"/>
      {/* pump → chamber pipes */}
      <line x1="22" y1="64" x2="22" y2="56" stroke={c.dim} strokeWidth="0.45"/>
      <line x1="36" y1="64" x2="36" y2="56" stroke={c.dim} strokeWidth="0.45"/>
      <line x1="52" y1="64" x2="52" y2="56" stroke={c.dim} strokeWidth="0.45"/>
    </g>
  );
}

// ─── Spec readout card ─────────────────────────────────────────────
function SpecCard({ data, active }) {
  const ink = 'oklch(0.18 0.02 240)';
  const dim = 'oklch(0.50 0.015 240)';
  const amber = 'oklch(0.62 0.16 55)';
  const paper = 'oklch(0.97 0.008 85)';
  const rule  = 'oklch(0.80 0.01 240)';
  const red   = 'oklch(0.55 0.20 25)';
  const green = 'oklch(0.45 0.14 145)';
  const mono = "'IBM Plex Mono', ui-monospace, monospace";
  const serif= "'IBM Plex Serif', Georgia, serif";

  const mod = data.modules.find(m => m.id === active);

  return (
    <div style={{
      background: paper, border: `1.5px solid ${ink}`, padding: '18px 20px 20px',
      fontFamily: serif, transform: 'translateZ(0)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: dim }}>
        <span>{mod ? 'Module · selected' : 'Live readout'}</span>
        <span>{mod ? mod.pn : data.code}</span>
      </div>
      {mod ? (
        <>
          <div style={{ marginTop: 12, fontFamily: serif, fontSize: 24, lineHeight: 1.15 }}>{mod.name}</div>
          <div style={{ marginTop: 4, fontFamily: mono, fontSize: 11.5, color: amber, letterSpacing: '0.12em' }}>{mod.pn}</div>
          <hr style={{ border: 0, borderTop: `1px solid ${rule}`, margin: '14px 0' }}/>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim, marginBottom: 6 }}>Specification</div>
          <div style={{ fontFamily: serif, fontSize: 14.5, lineHeight: 1.5, color: ink }}>{mod.spec}</div>
          {mod.flag && (
            <div style={{
              marginTop: 14, display: 'inline-block',
              fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: mod.flag === 'PASS' ? green : amber,
              border: `1.4px solid ${mod.flag === 'PASS' ? green : amber}`,
              padding: '4px 8px', transform: 'rotate(-1.2deg)',
            }}>{mod.flag === 'PASS' ? 'PASS · this unit' : 'CONDITIONAL · this unit'}</div>
          )}
        </>
      ) : (
        <>
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
            {data.readout.map((r, i) => (
              <div key={i}>
                <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.14em', color: dim, textTransform: 'uppercase' }}>{r.k}</div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ fontFamily: mono, fontSize: 15, color: ink }}>{r.v}</span>
                </div>
                <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.08em', color: r.ok ? green : amber, marginTop: 2, textTransform: 'uppercase' }}>{r.d}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${rule}`, fontFamily: serif, fontSize: 13.5, lineHeight: 1.5, fontStyle: 'italic', color: dim }}>
            Hover any module → spec sheet, part number, this-unit status.
          </div>
        </>
      )}
    </div>
  );
}

// ─── The hero block ────────────────────────────────────────────────
function MixHero({ inst, setInst }) {
  const t = window.TOKENS, C = window.CONTENT;
  const W = window.Wordmark, LR = window.LabelRule;
  const [active, setActive] = React.useState(null);
  const data = HERO_INSTRUMENTS[inst];

  const paper  = 'oklch(0.97 0.008 85)';
  const paper2 = 'oklch(0.94 0.012 78)';
  const ink    = 'oklch(0.18 0.02 240)';
  const inkSoft= 'oklch(0.32 0.02 240)';
  const dim    = 'oklch(0.50 0.015 240)';
  const rule   = 'oklch(0.80 0.01 240)';
  const amber  = 'oklch(0.74 0.16 60)';
  const amberDeep = 'oklch(0.62 0.16 55)';

  const meta = (extra) => ({
    fontFamily: t.mono, fontSize: 11, letterSpacing: '0.15em',
    textTransform: 'uppercase', color: dim, ...extra,
  });

  const TogglePill = ({ id, label }) => {
    const on = inst === id;
    return (
      <button
        onClick={() => { setInst(id); setActive(null); }}
        style={{
          flex: '0 0 auto', padding: '10px 18px',
          fontFamily: t.mono, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
          background: on ? ink : 'transparent',
          color: on ? paper : ink,
          border: `1.5px solid ${ink}`,
          borderRight: 'none',
          cursor: 'pointer',
        }}>
        {label}
      </button>
    );
  };

  return (
    <section style={{ padding: '56px 60px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 600px', gap: 60, alignItems: 'flex-start' }}>
        <div>
          <div style={meta()}>Subject of report</div>
          <h1 style={{
            margin: '14px 0 0', fontFamily: t.serif, fontWeight: 400,
            fontSize: 108, lineHeight: 0.96, letterSpacing: '-0.035em', color: ink,
          }}>
            We test<br/>
            the&nbsp;lab&nbsp;<span style={{ fontStyle: 'italic', fontWeight: 300 }}>before</span><br/>
            <span style={{ color: amberDeep }}>you wire</span><br/>
            the&nbsp;money.
          </h1>
          <p style={{
            marginTop: 36, marginBottom: 0, maxWidth: 560,
            fontFamily: t.serif, fontSize: 21, lineHeight: 1.45, color: inkSoft,
          }}>
            Sigma Tech inspects pre-owned laboratory instruments at the seller&apos;s site — auction lots, surplus, direct sale — against the OEM specification, and hands you a signed report before the wire transfer clears.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#brief" style={{
              fontFamily: t.mono, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '17px 26px', background: amberDeep, color: paper, textDecoration: 'none',
            }}>Brief us on a lot &nbsp;→</a>
            <a href="sample-report.html" target="_blank" rel="noopener" style={{
              fontFamily: t.mono, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '17px 26px', border: `1.5px solid ${ink}`, color: ink, textDecoration: 'none',
            }}>Sample report .pdf &nbsp;↓</a>
          </div>

          {/* live read-out moved into SpecCard on the right column */}

          <style>{`@keyframes mixhero-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.25 } }`}</style>
        </div>

        {/* RIGHT — instrument display (now positioned for spec-card overlap) */}
        <div style={{ position: 'relative', minHeight: 0 }}>
          {/* toggle */}
          <div style={{ display: 'flex', marginBottom: 14 }}>
            <TogglePill id="LC" label="HPLC"/>
            <TogglePill id="GC" label="GC"/>
            <button
              onClick={() => { setInst('MS'); setActive(null); }}
              style={{
                flex: '0 0 auto', padding: '10px 18px',
                fontFamily: t.mono, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                background: inst === 'MS' ? ink : 'transparent',
                color: inst === 'MS' ? paper : ink,
                border: `1.5px solid ${ink}`,
                cursor: 'pointer',
              }}>MS</button>
            <div style={{ flex: '1 1 auto' }}/>
            <div style={{
              fontFamily: t.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim,
              alignSelf: 'center',
            }}>{data.badge} · click → hover modules</div>
          </div>

          <div style={{
            position: 'relative', aspectRatio: '4 / 5',
            background: paper2, border: `1.5px solid ${ink}`,
          }}>
            {/* corner ticks */}
            {['tl','tr','bl','br'].map(c => (
              <div key={c} style={{
                position: 'absolute',
                width: 16, height: 16,
                top: c.startsWith('t') ? 6 : 'auto',
                bottom: c.startsWith('b') ? 6 : 'auto',
                left: c.endsWith('l') ? 6 : 'auto',
                right: c.endsWith('r') ? 6 : 'auto',
                borderTop: c.startsWith('t') ? `1.5px solid ${ink}` : 'none',
                borderBottom: c.startsWith('b') ? `1.5px solid ${ink}` : 'none',
                borderLeft: c.endsWith('l') ? `1.5px solid ${ink}` : 'none',
                borderRight: c.endsWith('r') ? `1.5px solid ${ink}` : 'none',
                pointerEvents: 'none', zIndex: 2,
              }}/>
            ))}
            {/* top label strip */}
            <div style={{
              position: 'absolute', top: 16, left: 16, right: 16,
              display: 'flex', justifyContent: 'space-between',
              fontFamily: t.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: dim,
              zIndex: 2,
            }}>
              <span style={{ color: ink, fontWeight: 600 }}>{data.title}</span>
              <span>{data.code} · 1:14 scale</span>
            </div>
            {/* plate — modules pushed left within the frame so labels (which
                extend to the right of each module) have room to render in full. */}
            <div style={{ position: 'absolute', inset: '52px 18px 36px 24px', display: 'flex' }}>
              <InstrumentPlate data={data} active={active} setActive={setActive}/>
            </div>
            {/* bottom note */}
            <div style={{
              position: 'absolute', bottom: 10, left: 16, right: 16,
              display: 'flex', justifyContent: 'space-between',
              fontFamily: t.mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim,
              zIndex: 2,
            }}>
              <span>{data.note}</span>
              <span>{active ? `Sel. ${active.toUpperCase()}` : 'Sel. —'}</span>
            </div>
          </div>

          {/* spec card — only when hovering a module */}
          {active && (
            <div style={{
              position: 'absolute', right: 'calc(100% - 200px)', bottom: -32, width: 300, zIndex: 5,
            }}>
              <SpecCard data={data} active={active}/>
            </div>
          )}
        </div>
      </div>

      {/* full-width live trace */}
      <div style={{ marginTop: 36 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 10,
        }}>
          <span style={{ fontFamily: t.mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: dim }}>
            FIG. 2 · {data.code === 'LC' ? 'DAD detector' : data.code === 'GC' ? 'FID trace' : 'XIC chromatogram'} · this unit · pre-recondition
          </span>
          <span style={{ fontFamily: t.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: amberDeep }}>
            ◀ scroll · 24 s / division
          </span>
        </div>
        <LiveTrace key={data.code} seed={data.traceSeed} height={150} speed={data.code === 'MS' ? 32 : 24}/>
      </div>
    </section>
  );
}

window.MixHero = MixHero;
window.HERO_INSTRUMENTS = HERO_INSTRUMENTS;

// ─── Brief / application form ──────────────────────────────────────
function MixBriefForm() {
  const t = window.TOKENS, C = window.CONTENT;
  const paper  = 'oklch(0.97 0.008 85)';
  const paper2 = 'oklch(0.94 0.012 78)';
  const ink    = 'oklch(0.18 0.02 240)';
  const inkSoft= 'oklch(0.32 0.02 240)';
  const dim    = 'oklch(0.50 0.015 240)';
  const rule   = 'oklch(0.80 0.01 240)';
  const amber  = 'oklch(0.74 0.16 60)';
  const amberDeep = 'oklch(0.62 0.16 55)';
  const green  = 'oklch(0.45 0.14 145)';

  const [form, setForm] = React.useState({
    cls: 'LC', vendor: '', source: 'Bid', listing: '', ask: '',
    date: '', email: '', notes: '',
  });
  const [sent, setSent] = React.useState(false);
  const [ref, setRef] = React.useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const n = String(2600 + Math.floor(Math.random() * 99)).padStart(4, '0');
    setRef('R-' + n);
    setSent(true);
  };

  const labelStyle = {
    fontFamily: t.mono, fontSize: 10, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: dim, display: 'block', marginBottom: 6,
  };
  const fieldStyle = {
    width: '100%', boxSizing: 'border-box',
    fontFamily: t.mono, fontSize: 14, color: ink,
    background: 'transparent', border: 'none', outline: 'none',
    padding: '10px 0 8px',
    borderBottom: `1.5px solid ${ink}`,
  };
  const selectStyle = { ...fieldStyle, appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', paddingRight: 22 };

  if (sent) {
    return (
      <div style={{
        border: `1.5px solid ${ink}`, background: paper, padding: '36px 36px 40px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 26, right: 26,
          fontFamily: t.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: green, border: `1.5px solid ${green}`, padding: '5px 10px', transform: 'rotate(-2deg)',
        }}>BRIEF · RECEIVED</div>
        <div style={{ fontFamily: t.mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: dim }}>
          Acknowledgement
        </div>
        <h3 style={{
          margin: '12px 0 0', fontFamily: t.serif, fontWeight: 400, fontSize: 38, lineHeight: 1.05,
          letterSpacing: '-0.02em', color: ink, maxWidth: 480,
        }}>
          Brief filed as <span style={{ color: amberDeep, fontStyle: 'italic' }}>{ref}</span>. Inspector replies within one HK working day.
        </h3>
        <p style={{ marginTop: 22, fontFamily: t.serif, fontSize: 15.5, lineHeight: 1.55, color: inkSoft, maxWidth: 520 }}>
          Acknowledgement sent to <b style={{ color: ink }}>{form.email || 'your inbox'}</b>. If the lot is time-bound (auction close, broker hold), call the office directly &mdash; brief number {ref} ready to hand.
        </p>
        <div style={{ marginTop: 24, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href={`mailto:${C.legal.email}?subject=Brief%20${ref}`} style={{
            fontFamily: t.mono, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '12px 18px', background: ink, color: paper, textDecoration: 'none',
          }}>Mail the office &nbsp;→</a>
          <button onClick={() => setSent(false)} style={{
            fontFamily: t.mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
            background: 'transparent', color: ink, border: 'none', cursor: 'pointer',
            borderBottom: `1px dashed ${ink}`, padding: '4px 0',
          }}>File another brief</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{
      border: `1.5px solid ${ink}`, background: paper2, padding: '32px 32px 36px',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 14, right: 22,
        fontFamily: t.mono, fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: dim,
      }}>Form ST-01 · Brief intake</div>

      <div style={{
        fontFamily: t.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: dim,
      }}>
        Section A — Subject of inspection
      </div>

      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24 }}>
        <div>
          <label style={labelStyle}>Instrument class</label>
          <div style={{ position: 'relative' }}>
            <select value={form.cls} onChange={set('cls')} style={selectStyle}>
              {C.instruments.map((it) => (
                <option key={it.id} value={it.id}>{it.id} · {it.name}</option>
              ))}
              <option value="OTHER">Other / not listed</option>
            </select>
            <span style={{ position: 'absolute', right: 4, top: 12, color: dim, fontFamily: t.mono, fontSize: 12 }}>▾</span>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Vendor / model</label>
          <input value={form.vendor} onChange={set('vendor')} placeholder="e.g. Waters Acquity H-Class" style={fieldStyle}/>
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24 }}>
        <div>
          <label style={labelStyle}>Source</label>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1.5px solid ${ink}`, marginTop: 4 }}>
            {['Bid', 'EquipNet', 'Surplus', 'Direct', 'Other'].map((opt) => (
              <button type="button" key={opt} onClick={() => setForm((f) => ({ ...f, source: opt }))} style={{
                flex: '1 1 auto', padding: '8px 4px',
                fontFamily: t.mono, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                background: form.source === opt ? ink : 'transparent',
                color: form.source === opt ? paper : ink,
                border: 'none', cursor: 'pointer',
              }}>{opt}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Listing URL / lot number</label>
          <input value={form.listing} onChange={set('listing')} placeholder="https://… or lot #" style={fieldStyle}/>
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <label style={labelStyle}>Asking price (USD)</label>
          <input value={form.ask} onChange={set('ask')} placeholder="$ —" style={fieldStyle}/>
        </div>
        <div>
          <label style={labelStyle}>Target inspection date</label>
          <input value={form.date} onChange={set('date')} placeholder="YYYY-MM-DD or 'asap'" style={fieldStyle}/>
        </div>
      </div>

      <div style={{
        marginTop: 30, fontFamily: t.mono, fontSize: 10, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: dim,
      }}>
        Section B — Buyer of record
      </div>

      <div style={{ marginTop: 18 }}>
        <label style={labelStyle}>Email</label>
        <input value={form.email} onChange={set('email')} placeholder="you@company.com" required style={fieldStyle}/>
      </div>

      <div style={{ marginTop: 22 }}>
        <label style={labelStyle}>Notes for the inspector</label>
        <textarea value={form.notes} onChange={set('notes')} rows={3}
          placeholder="Critical specs, transport constraints, auction close timing…"
          style={{ ...fieldStyle, resize: 'vertical', paddingTop: 8 }}/>
      </div>

      <div style={{
        marginTop: 28, paddingTop: 18, borderTop: `1px dashed ${rule}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: t.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim,
          maxWidth: 420, lineHeight: 1.6,
        }}>
          Submission counts as an intake notice, not a contract. Inspector quotes back fee & schedule.
        </div>
        <button type="submit" style={{
          fontFamily: t.mono, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '16px 28px', background: amberDeep, color: paper,
          border: 'none', cursor: 'pointer',
        }}>File brief &nbsp;→</button>
      </div>
    </form>
  );
}

window.MixBriefForm = MixBriefForm;
