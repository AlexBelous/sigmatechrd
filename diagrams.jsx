// diagrams.jsx — schematic technical illustrations used as imagery in the
// image-led variant. Drawn in monochrome ink + a single amber accent, as if
// pulled from a service manual. Each diagram is an <svg> with its own
// viewBox; TechPlate wraps any of them with a frame, plate number and caption.

const D_INK    = 'oklch(0.18 0.02 240)';
const D_DIM    = 'oklch(0.48 0.015 240)';
const D_FILL   = 'oklch(0.93 0.012 78)';
const D_PAPER  = 'oklch(0.96 0.010 80)';
const D_AMBER  = 'oklch(0.62 0.16 55)';
const D_MONO   = "'IBM Plex Mono', ui-monospace, monospace";
const D_SERIF  = "'IBM Plex Serif', serif";

// uppercase mono label
const L = ({ x, y, children, size = 2.4, color = D_DIM, anchor = 'start', weight = 400 }) => (
  <text x={x} y={y} fontSize={size} fontFamily={D_MONO}
        fill={color} textAnchor={anchor}
        letterSpacing="0.18"
        fontWeight={weight}>{children}</text>
);

const DIAGRAMS = {};

// ─── 01 · HPLC stack ───────────────────────────────────────────────────
DIAGRAMS.stack = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  const x0 = 24, x1 = 60, w = x1 - x0;
  const mods = [
    { y: 8,  h: 12, name: 'SOLVENT TRAY',    code: 'G7104' },
    { y: 20, h: 11, name: 'DEGASSER',         code: 'G7103' },
    { y: 31, h: 13, name: 'BINARY PUMP',      code: 'G7120' },
    { y: 44, h: 11, name: 'AUTOSAMPLER',      code: 'G7129', accent: true },
    { y: 55, h: 20, name: 'COL. COMPARTMENT', code: 'G7116' },
    { y: 75, h: 13, name: 'DAD DETECTOR',     code: 'G7117' },
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* left dim line */}
      <g stroke={dim} strokeWidth="0.25" fill="none">
        <line x1="14" y1="8" x2="14" y2="88"/>
        <line x1="12" y1="8" x2="16" y2="8"/>
        <line x1="12" y1="88" x2="16" y2="88"/>
      </g>
      <text x="9" y="50" fontSize="2.4" fill={dim} fontFamily={D_MONO}
            textAnchor="middle" transform="rotate(-90 9 50)" letterSpacing="0.2">1820 MM</text>
      {mods.map((m, i) => (
        <g key={i}>
          <rect x={x0} y={m.y} width={w} height={m.h - 0.6}
                fill={D_FILL} stroke={m.accent ? amber : ink} strokeWidth={m.accent ? 0.7 : 0.5}/>
          <rect x={x0 + 2} y={m.y + 2} width={w - 4} height={m.h - 4.5}
                fill="none" stroke={dim} strokeWidth="0.2"/>
          <circle cx={x0 + 4} cy={m.y + m.h / 2} r="0.55" fill={m.accent ? amber : dim}/>
          <rect x={x0 + w - 12} y={m.y + m.h / 2 - 1.4} width="9" height="2.8"
                fill="oklch(0.85 0.01 240)" stroke={dim} strokeWidth="0.2"/>
          <line x1={x1} y1={m.y + m.h / 2} x2="70" y2={m.y + m.h / 2}
                stroke={dim} strokeWidth="0.25" strokeDasharray="0.8 0.8"/>
          <line x1="70" y1={m.y + m.h / 2} x2="73" y2={m.y + m.h / 2}
                stroke={m.accent ? amber : ink} strokeWidth="0.5"/>
          <L x={74} y={m.y + m.h / 2 + 0.8} color={m.accent ? amber : ink} weight={500}>{m.name}</L>
          <L x={74} y={m.y + m.h / 2 + 3.6} color={dim} size={2}>{m.code}</L>
        </g>
      ))}
      <rect x={x0 - 2.5} y="89" width={w + 5} height="3" fill={D_FILL} stroke={ink} strokeWidth="0.5"/>
      <line x1={x0 - 1} y1="92" x2={x0 - 1} y2="94" stroke={ink} strokeWidth="0.4"/>
      <line x1={x1 + 1} y1="92" x2={x1 + 1} y2="94" stroke={ink} strokeWidth="0.4"/>
    </svg>
  );
};

// ─── 02 · Exploded detector ────────────────────────────────────────────
DIAGRAMS.exploded = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  const parts = [
    { y: 10, w: 36, h: 8,  name: 'COVER',         code: '712-001' },
    { y: 22, w: 42, h: 9,  name: 'DAC BOARD',     code: '712-014', accent: true },
    { y: 35, w: 48, h: 11, name: 'ION SOURCE',    code: '712-020' },
    { y: 50, w: 54, h: 10, name: 'QUAD HOUSING',  code: '712-031' },
    { y: 64, w: 60, h: 12, name: 'TURBOPUMP',     code: '712-038' },
    { y: 80, w: 64, h: 8,  name: 'BASE PLATE',    code: '712-040' },
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <line x1="50" y1="6" x2="50" y2="92" stroke={dim} strokeWidth="0.2" strokeDasharray="0.5 1"/>
      {parts.map((p, i) => (
        <g key={i}>
          <rect x={50 - p.w / 2} y={p.y} width={p.w} height={p.h}
                fill={D_FILL} stroke={p.accent ? amber : ink}
                strokeWidth={p.accent ? 0.7 : 0.5}/>
          {[0.15, 0.5, 0.85].map((f, j) => (
            <circle key={j} cx={50 - p.w / 2 + p.w * f} cy={p.y + p.h / 2}
                    r="0.5" fill="none" stroke={dim} strokeWidth="0.2"/>
          ))}
          <line x1={50 + p.w / 2} y1={p.y + p.h / 2} x2="86" y2={p.y + p.h / 2}
                stroke={dim} strokeWidth="0.25" strokeDasharray="0.8 0.8"/>
          <circle cx="86" cy={p.y + p.h / 2} r="0.6" fill={p.accent ? amber : ink}/>
          <L x="88" y={p.y + p.h / 2 + 0.8} color={ink} weight={500}>{p.name}</L>
          <L x="88" y={p.y + p.h / 2 + 3.4} color={dim} size={2}>PN&nbsp;{p.code}</L>
        </g>
      ))}
    </svg>
  );
};

// ─── 03 · Autosampler tray ─────────────────────────────────────────────
DIAGRAMS.tray = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  const cols = 8, rows = 10;
  const x0 = 22, x1 = 78, y0 = 16, y1 = 84;
  const dx = (x1 - x0) / cols, dy = (y1 - y0) / rows;
  const marks = new Set(['0-2','1-4','2-6','3-1','4-8','5-3','6-7','7-0','1-8','4-2','6-2']);
  const subCol = 3, subRow = 5;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <rect x={x0 - 3} y={y0 - 3} width={x1 - x0 + 6} height={y1 - y0 + 6}
            fill={D_FILL} stroke={ink} strokeWidth="0.5"/>
      {Array.from({ length: cols }).map((_, c) => (
        <L key={c} x={x0 + dx * c + dx / 2} y={y0 - 4.5} color={dim} anchor="middle" size={2}>
          {String.fromCharCode(65 + c)}
        </L>
      ))}
      {Array.from({ length: rows }).map((_, r) => (
        <L key={r} x={x0 - 5.5} y={y0 + dy * r + dy / 2 + 0.6} color={dim} size={1.9}>
          {String(r + 1).padStart(2, '0')}
        </L>
      ))}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const cx = x0 + dx * c + dx / 2;
          const cy = y0 + dy * r + dy / 2;
          const isSub = c === subCol && r === subRow;
          const isMark = marks.has(`${c}-${r}`);
          return (
            <g key={`${c}-${r}`}>
              <circle cx={cx} cy={cy} r={dx * 0.32}
                      fill={isMark || isSub ? D_PAPER : 'transparent'}
                      stroke={isSub ? amber : ink}
                      strokeWidth={isSub ? 0.55 : 0.28}/>
              {isMark && <circle cx={cx} cy={cy} r={dx * 0.13} fill={ink}/>}
              {isSub && (
                <circle cx={cx} cy={cy} r={dx * 0.58} fill="none"
                        stroke={amber} strokeWidth="0.3" strokeDasharray="0.7 0.7"/>
              )}
            </g>
          );
        })
      )}
      {/* subject leader */}
      <line x1={x0 + dx * subCol + dx / 2 + dx * 0.6} y1={y0 + dy * subRow + dy / 2 - dy * 0.5}
            x2="84" y2="11" stroke={amber} strokeWidth="0.3"/>
      <L x="84" y="9.5" color={amber} size={2.2}>SUBJECT · D-06</L>
      <L x={50} y="94" color={dim} anchor="middle" size={2}>TOP VIEW · 80-VIAL TRAY · 1.5 ML</L>
    </svg>
  );
};

// ─── 04 · Signed document ──────────────────────────────────────────────
DIAGRAMS.doc = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <rect x="22" y="6" width="56" height="88" fill="white" stroke={ink} strokeWidth="0.5"/>
      <rect x="22" y="6" width="56" height="5.5" fill={ink}/>
      <text x="25" y="10" fontSize="2.2" fontFamily={D_MONO} fill="white" letterSpacing="0.3">
        SIGMA TECH R&amp;D · REPORT 04/9712
      </text>
      <text x="25" y="17" fontSize="2.6" fontFamily={D_MONO} fill={ink} letterSpacing="0.2" fontWeight="500">
        HPLC-DAD · USED · BUYER REDACTED
      </text>
      <L x="25" y="20.5" color={dim} size={1.9}>FRANKFURT, DE · 12.03.2026</L>
      <line x1="25" y1="22.5" x2="75" y2="22.5" stroke={ink} strokeWidth="0.3"/>
      {[26, 30, 34, 38].map((y, i) => (
        <g key={i}>
          <rect x="25" y={y} width={14} height="2.2" fill={dim} opacity="0.45"/>
          <rect x="41" y={y} width={18} height="2.2" fill={dim} opacity="0.30"/>
          <rect x="61" y={y} width={14} height="2.2" fill={dim} opacity="0.45"/>
        </g>
      ))}
      <line x1="25" y1="46" x2="75" y2="46" stroke={ink} strokeWidth="0.3"/>
      {['LEAK TEST','PUMP PRESS.','OVEN TEMP.','DET. NOISE','S/N RATIO'].map((k, i) => (
        <g key={i}>
          <line x1="25" y1={49 + i * 3.4} x2="75" y2={49 + i * 3.4} stroke={dim} strokeWidth="0.2"/>
          <L x="26" y={48.5 + i * 3.4} color={ink} size={1.8}>{k}</L>
          <L x="60" y={48.5 + i * 3.4} color={i === 3 ? amber : ink} size={1.8} weight={i === 3 ? 600 : 400}>
            {['PASS','PASS','PASS','MARGINAL','PASS'][i]}
          </L>
        </g>
      ))}
      <g transform="translate(27 73) rotate(-8)">
        <rect x="0" y="0" width="22" height="7" fill="none" stroke={amber} strokeWidth="0.7"/>
        <text x="11" y="4.7" fontSize="2.6" fontFamily={D_MONO} fill={amber}
              textAnchor="middle" letterSpacing="0.2" fontWeight="600">CONDITIONAL</text>
      </g>
      <g transform="translate(56 76) rotate(6)">
        <circle cx="6" cy="6" r="6" fill="none" stroke={ink} strokeWidth="0.45"/>
        <circle cx="6" cy="6" r="4.6" fill="none" stroke={ink} strokeWidth="0.3"/>
        <text x="6" y="5.4" fontSize="1.6" fontFamily={D_MONO} fill={ink} textAnchor="middle">INSPECTOR</text>
        <text x="6" y="7.6" fontSize="1.6" fontFamily={D_MONO} fill={ink} textAnchor="middle">SIGMA · 04</text>
      </g>
      <line x1="25" y1="89" x2="50" y2="89" stroke={ink} strokeWidth="0.3"/>
      <text x="28" y="88" fontFamily={D_SERIF} fontStyle="italic" fontSize="4" fill={ink}>S.T.</text>
      <L x="25" y="92" color={dim} size={1.6}>SIGNED · INSPECTOR OF RECORD</L>
    </svg>
  );
};

// ─── 05 · Lab floorplan (wide) ─────────────────────────────────────────
DIAGRAMS.floorplan = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  return (
    <svg viewBox="0 0 210 60" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <rect x="6" y="6" width="198" height="46" fill={D_PAPER} stroke={ink} strokeWidth="0.9"/>
      <line x1="70" y1="6" x2="70" y2="52" stroke={ink} strokeWidth="0.6"/>
      <line x1="140" y1="6" x2="140" y2="52" stroke={ink} strokeWidth="0.6"/>
      <line x1="140" y1="29" x2="204" y2="29" stroke={ink} strokeWidth="0.6"/>
      {/* doorway arcs */}
      <path d="M 70 18 A 6 6 0 0 0 76 24" fill="none" stroke={dim} strokeWidth="0.3"/>
      <path d="M 140 18 A 6 6 0 0 0 146 24" fill="none" stroke={dim} strokeWidth="0.3"/>
      {/* bay A benches */}
      {[[12, 11], [12, 22], [12, 34], [42, 11], [42, 22], [42, 34]].map((b, i) => (
        <g key={i}>
          <rect x={b[0]} y={b[1]} width="24" height="6" fill={D_FILL} stroke={ink} strokeWidth="0.35"/>
          <rect x={b[0] + 2} y={b[1] + 1} width="5" height="4" fill={dim} opacity="0.35"/>
          <rect x={b[0] + 9} y={b[1] + 1} width="7" height="4" fill={dim} opacity="0.35"/>
          <rect x={b[0] + 18} y={b[1] + 1} width="4" height="4" fill={dim} opacity="0.35"/>
        </g>
      ))}
      <L x="10" y="48" color={dim} size={2}>BAY A · ROUTINE TEST</L>
      {/* bay B: inspection zone */}
      <rect x="76" y="11" width="58" height="14" fill={amber} opacity="0.16" stroke={amber} strokeWidth="0.5"/>
      <L x="76" y="9" color={amber} size={2} weight={500}>INSPECTION ZONE</L>
      <rect x="80" y="14" width="14" height="8" fill={D_FILL} stroke={ink} strokeWidth="0.4"/>
      <circle cx="87" cy="18" r="2.5" fill="none" stroke={ink} strokeWidth="0.3"/>
      <rect x="97" y="14" width="14" height="8" fill={D_FILL} stroke={ink} strokeWidth="0.4"/>
      <rect x="99" y="15.5" width="10" height="2" fill={dim} opacity="0.5"/>
      <rect x="114" y="14" width="18" height="8" fill={D_FILL} stroke={ink} strokeWidth="0.4"/>
      <line x1="116" y1="16" x2="130" y2="16" stroke={dim} strokeWidth="0.25"/>
      <line x1="116" y1="20" x2="130" y2="20" stroke={dim} strokeWidth="0.25"/>
      <rect x="76" y="30" width="58" height="18" fill={D_FILL} stroke={ink} strokeWidth="0.35"/>
      <L x="78" y="34" color={dim} size={2}>BAY B · STAGING / SHIPPING</L>
      <rect x="80" y="36" width="20" height="10" fill="none" stroke={dim} strokeWidth="0.3"/>
      <rect x="104" y="36" width="14" height="10" fill="none" stroke={dim} strokeWidth="0.3"/>
      <rect x="122" y="36" width="10" height="10" fill="none" stroke={dim} strokeWidth="0.3"/>
      {/* east rooms */}
      <rect x="146" y="11" width="52" height="14" fill={D_FILL} stroke={ink} strokeWidth="0.35"/>
      <L x="148" y="14" color={dim} size={2}>OFFICE · BUYER</L>
      <rect x="150" y="17" width="10" height="5" fill="none" stroke={dim} strokeWidth="0.25"/>
      <rect x="146" y="32" width="52" height="16" fill={D_FILL} stroke={ink} strokeWidth="0.35"/>
      <L x="148" y="35" color={dim} size={2}>OFFICE · SELLER</L>
      <rect x="150" y="38" width="10" height="5" fill="none" stroke={dim} strokeWidth="0.25"/>
      {/* north arrow */}
      <g transform="translate(196 50)">
        <circle cx="0" cy="0" r="3.5" fill="none" stroke={ink} strokeWidth="0.3"/>
        <path d="M 0 -2.5 L 1.2 1.8 L 0 1 L -1.2 1.8 Z" fill={ink}/>
        <text x="0" y="-4" fontSize="1.8" fontFamily={D_MONO} fill={dim} textAnchor="middle">N</text>
      </g>
      <g stroke={dim} strokeWidth="0.2" fill="none">
        <line x1="6" y1="56" x2="204" y2="56"/>
        <line x1="6" y1="54.5" x2="6" y2="57.5"/>
        <line x1="204" y1="54.5" x2="204" y2="57.5"/>
      </g>
      <L x="105" y="57.5" color={dim} anchor="middle" size={2}>24 800 MM</L>
    </svg>
  );
};

// ─── 06 · Inspector at bench ───────────────────────────────────────────
DIAGRAMS.figure = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <line x1="4" y1="85" x2="96" y2="85" stroke={ink} strokeWidth="0.5"/>
      <line x1="4" y1="22" x2="96" y2="22" stroke={dim} strokeWidth="0.25"/>
      {/* bench */}
      <rect x="34" y="58" width="58" height="3" fill={ink}/>
      <line x1="38" y1="61" x2="38" y2="85" stroke={ink} strokeWidth="0.5"/>
      <line x1="88" y1="61" x2="88" y2="85" stroke={ink} strokeWidth="0.5"/>
      {/* instrument stack on right */}
      <g fill={D_FILL} stroke={ink} strokeWidth="0.5">
        <rect x="68" y="38" width="18" height="6"/>
        <rect x="68" y="44" width="18" height="6"/>
        <rect x="68" y="50" width="18" height="8"/>
      </g>
      <rect x="70" y="40" width="4" height="2" fill="oklch(0.85 0.01 240)"/>
      <rect x="70" y="46" width="4" height="2" fill="oklch(0.85 0.01 240)"/>
      <rect x="70" y="52" width="6" height="3" fill="oklch(0.85 0.01 240)"/>
      <circle cx="83" cy="47" r="0.6" fill={amber}/>
      {/* monitor */}
      <rect x="47" y="42" width="16" height="11" fill="oklch(0.18 0.02 240)" stroke={ink} strokeWidth="0.4"/>
      <polyline points="48,50 50,49.4 52,49 54,46 55,49 56,49.6 58,49.8 60,46.5 61,48.8 62,49.4"
                fill="none" stroke={amber} strokeWidth="0.45"/>
      <rect x="51" y="54" width="8" height="3" fill={D_FILL} stroke={ink} strokeWidth="0.3"/>
      {/* figure */}
      <circle cx="20" cy="40" r="4" fill={D_FILL} stroke={ink} strokeWidth="0.6"/>
      <path d="M 14 50 L 20 46 L 26 50 L 25 64 L 15 64 Z" fill={D_FILL} stroke={ink} strokeWidth="0.6"/>
      <line x1="18" y1="64" x2="16" y2="84" stroke={ink} strokeWidth="0.7"/>
      <line x1="22" y1="64" x2="24" y2="84" stroke={ink} strokeWidth="0.7"/>
      <path d="M 26 52 L 36 56 L 46 56" fill="none" stroke={ink} strokeWidth="0.7"/>
      <circle cx="46" cy="56" r="1.4" fill={D_FILL} stroke={ink} strokeWidth="0.4"/>
      {/* coat pocket detail */}
      <line x1="20" y1="46" x2="20" y2="62" stroke={dim} strokeWidth="0.25"/>
      <rect x="16" y="55" width="3" height="2" fill="none" stroke={dim} strokeWidth="0.2"/>
      {/* callouts */}
      <line x1="55" y1="42" x2="55" y2="30" stroke={dim} strokeWidth="0.25" strokeDasharray="0.6 0.6"/>
      <line x1="77" y1="38" x2="77" y2="28" stroke={dim} strokeWidth="0.25" strokeDasharray="0.6 0.6"/>
      <L x="55" y="28" color={dim} size={1.9} anchor="middle">SCREEN · LIVE</L>
      <L x="77" y="26" color={amber} size={1.9} anchor="middle">DAD · ACTIVE</L>
      <L x="14" y="72" color={dim} size={1.9}>INSPECTOR · 04</L>
    </svg>
  );
};

// ─── 07 · Monitor with trace (works dark or light) ─────────────────────
DIAGRAMS.monitor = ({ dark } = {}) => {
  const baseInk = dark ? 'oklch(0.92 0.01 240)' : D_INK;
  const baseDim = dark ? 'oklch(0.62 0.012 240)' : D_DIM;
  const surface = dark ? 'oklch(0.18 0.015 240)' : D_FILL;
  const screen  = dark ? 'oklch(0.09 0.015 240)' : 'oklch(0.98 0.005 240)';
  const accent  = D_AMBER;
  return (
    <svg viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <rect x="8" y="5" width="84" height="46" rx="1.5"
            fill={surface} stroke={baseInk} strokeWidth="0.6"/>
      <rect x="11" y="8" width="78" height="40" fill={screen} stroke={baseDim} strokeWidth="0.3"/>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={i} x1={11 + i * 9.75} y1="8" x2={11 + i * 9.75} y2="48" stroke={baseDim} strokeWidth="0.13" opacity="0.35"/>
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i} x1="11" y1={8 + i * 8} x2="89" y2={8 + i * 8} stroke={baseDim} strokeWidth="0.13" opacity="0.35"/>
      ))}
      <line x1="11" y1="42" x2="89" y2="42" stroke={baseDim} strokeWidth="0.3"/>
      <path d="M 11 42 L 18 42 L 20 41.4 L 22 40.4 L 24 27 L 26 40 L 28 42 L 36 42 L 38 41.7 L 40 38 L 42 22 L 44 14 L 46 22 L 48 36 L 50 41 L 56 42 L 58 41.8 L 60 38 L 62 28 L 64 38 L 66 42 L 72 42 L 74 41.4 L 76 37 L 78 41.4 L 80 42 L 89 42"
            fill="none" stroke={accent} strokeWidth="0.8"/>
      <circle cx="44" cy="14" r="1.1" fill={accent}/>
      <text x="46" y="12" fontSize="2" fontFamily={D_MONO} fill={accent} letterSpacing="0.2">PK · 04</text>
      <text x="25" y="13" fontSize="2" fontFamily={D_MONO} fill={baseDim} letterSpacing="0.2">PK · 01</text>
      <text x="62" y="22" fontSize="2" fontFamily={D_MONO} fill={baseDim} letterSpacing="0.2">PK · 06</text>
      {['0.0','2.0','4.0','6.0','8.0','MIN'].map((t, i) => (
        <text key={i}
          x={i === 5 ? 89 : 11 + i * 15.6} y="52"
          fontSize="1.9" fontFamily={D_MONO} fill={baseDim}
          textAnchor={i === 5 ? 'end' : 'middle'} letterSpacing="0.2">{t}</text>
      ))}
      <rect x="8" y="54" width="84" height="14" fill={surface} stroke={baseInk} strokeWidth="0.4"/>
      {[16, 28, 40, 52, 64, 76].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="61" r="3" fill="none" stroke={baseDim} strokeWidth="0.3"/>
          <line x1={cx} y1="61" x2={cx + 1.8 * Math.cos((i - 2) * 0.7)}
                y2={61 + 1.8 * Math.sin((i - 2) * 0.7)}
                stroke={i === 2 ? accent : baseInk} strokeWidth="0.35"/>
          <text x={cx} y="67" fontSize="1.5" fontFamily={D_MONO}
                fill={baseDim} textAnchor="middle" letterSpacing="0.15">
            {['λ','GAIN','BW','TRIG','OFFSET','SAVE'][i]}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ─── 08 · CMA Building tower ───────────────────────────────────────────
DIAGRAMS.tower = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  const lit = (r, c) => ((r * 7 + c * 11) % 17) > 13;
  return (
    <svg viewBox="0 0 75 100" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* skyline behind */}
      {[
        { x: 4, w: 6, h: 14 },
        { x: 11, w: 5, h: 11 },
        { x: 17, w: 7, h: 18 },
        { x: 52, w: 8, h: 16 },
        { x: 61, w: 6, h: 22 },
        { x: 68, w: 5, h: 13 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={86 - b.h} width={b.w} height={b.h}
              fill={D_FILL} stroke={dim} strokeWidth="0.3"/>
      ))}
      {/* CMA Building */}
      <rect x="28" y="12" width="20" height="74" fill={D_FILL} stroke={ink} strokeWidth="0.7"/>
      <rect x="30" y="14" width="16" height="2.5" fill={ink} opacity="0.85"/>
      {Array.from({ length: 22 }).map((_, r) => (
        <g key={r}>
          {[30.5, 33.5, 36.5, 39.5, 42.5].map((x, c) => (
            <rect key={c} x={x} y={18 + r * 3} width="2.3" height="2.1"
                  fill={lit(r, c) ? amber : 'oklch(0.86 0.01 240)'} opacity={lit(r, c) ? 0.85 : 0.7}/>
          ))}
        </g>
      ))}
      {/* highlighted 21st floor */}
      <rect x="29" y={18 + 18 * 3 - 0.5} width="18" height="3.2" fill="none" stroke={amber} strokeWidth="0.5"/>
      <line x1="47" y1={18 + 18 * 3 + 1} x2="60" y2="50" stroke={amber} strokeWidth="0.3"/>
      <L x="60" y="49" color={amber} size={2} weight={500}>21/F · OFFICE</L>
      {/* roof spire */}
      <rect x="33" y="8" width="10" height="4" fill={ink}/>
      <line x1="38" y1="2" x2="38" y2="8" stroke={ink} strokeWidth="0.4"/>
      <circle cx="38" cy="1.5" r="0.8" fill={amber}/>
      {/* ground */}
      <line x1="0" y1="86" x2="75" y2="86" stroke={ink} strokeWidth="0.6"/>
      {/* harbor water lines */}
      {[89, 92, 95].map((y, i) => (
        <line key={i} x1="2" y1={y} x2="73" y2={y} stroke={dim} strokeWidth="0.18"
              strokeDasharray={i % 2 ? "1.5 2.5" : "3 2"}/>
      ))}
      <L x={37.5} y="99" color={dim} anchor="middle" size={2}>CMA BUILDING · 64 CONNAUGHT RD CENTRAL</L>
    </svg>
  );
};

// ─── 09 · Crate (logistics) ────────────────────────────────────────────
DIAGRAMS.crate = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  return (
    <svg viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* crate body — isometric-ish */}
      <polygon points="18,18 70,18 82,26 82,64 30,64 18,56" fill={D_FILL} stroke={ink} strokeWidth="0.7"/>
      <polygon points="18,18 70,18 82,26 30,26" fill={D_FILL} stroke={ink} strokeWidth="0.5"/>
      <polygon points="70,18 82,26 82,64 70,56" fill={D_PAPER} stroke={ink} strokeWidth="0.5"/>
      {/* slats */}
      {[26, 36, 46, 56].map((y, i) => (
        <line key={i} x1="30" y1={y} x2="82" y2={y - 0} stroke={dim} strokeWidth="0.25"/>
      ))}
      {[44, 56, 68].map((x, i) => (
        <line key={i} x1={x} y1="26" x2={x - 12} y2="64" stroke={dim} strokeWidth="0.25"/>
      ))}
      {/* fragile label */}
      <rect x="34" y="34" width="22" height="14" fill={D_PAPER} stroke={ink} strokeWidth="0.5"/>
      <text x="45" y="41" fontSize="2.6" fontFamily={D_MONO} fill={amber}
            textAnchor="middle" letterSpacing="0.4" fontWeight="600">FRAGILE</text>
      {/* arrows up */}
      <g stroke={ink} strokeWidth="0.5" fill="none">
        <path d="M 38 46 L 38 43 M 36 44.5 L 38 42 L 40 44.5"/>
        <path d="M 52 46 L 52 43 M 50 44.5 L 52 42 L 54 44.5"/>
      </g>
      <text x="45" y="48" fontSize="1.6" fontFamily={D_MONO} fill={dim}
            textAnchor="middle" letterSpacing="0.3">THIS WAY UP</text>
      {/* shipping marks */}
      <L x="20" y="14" color={dim} size={2}>SHIPMENT · S-2624</L>
      <L x="20" y="71" color={dim} size={1.8}>FRANKFURT DE → HKG HK · 1240 KG</L>
      <line x1="82" y1="64" x2="92" y2="64" stroke={ink} strokeWidth="0.3"/>
      <line x1="92" y1="62" x2="92" y2="66" stroke={ink} strokeWidth="0.3"/>
    </svg>
  );
};

// ─── 10 · Bar chart (asset valuation) ─────────────────────────────────
DIAGRAMS.bars = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  const data = [42, 58, 36, 70, 28, 64, 48, 80];
  const labels = ['LC','GC','MS','NMR','OM','IR','BR','EM'];
  return (
    <svg viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <line x1="10" y1="62" x2="92" y2="62" stroke={ink} strokeWidth="0.5"/>
      <line x1="10" y1="8" x2="10" y2="62" stroke={ink} strokeWidth="0.5"/>
      {[10, 20, 30, 40, 50].map((v, i) => (
        <g key={i}>
          <line x1="10" y1={62 - v} x2="92" y2={62 - v} stroke={dim} strokeWidth="0.15" strokeDasharray="0.5 1"/>
          <L x="8" y={63 - v} color={dim} size={1.6} anchor="end">{`${v}K`}</L>
        </g>
      ))}
      {data.map((d, i) => {
        const bw = 7;
        const x = 14 + i * 10;
        const accent = i === 3;
        return (
          <g key={i}>
            <rect x={x} y={62 - d * 0.55} width={bw} height={d * 0.55}
                  fill={accent ? amber : ink} opacity={accent ? 0.92 : 0.8}/>
            <text x={x + bw / 2} y="67" fontSize="1.9" fontFamily={D_MONO}
                  fill={dim} textAnchor="middle" letterSpacing="0.2">{labels[i]}</text>
            <text x={x + bw / 2} y={60 - d * 0.55} fontSize="1.7" fontFamily={D_MONO}
                  fill={accent ? amber : ink} textAnchor="middle">{(d * 1.4).toFixed(0)}</text>
          </g>
        );
      })}
      <L x="50" y="73" color={dim} anchor="middle" size={2}>VALUATION DELTA · USD K · 12-MO TRAIL</L>
    </svg>
  );
};

// ─── 11 · Signal trace (recommissioning) ───────────────────────────────
DIAGRAMS.signal = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  // before / after pair
  return (
    <svg viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      {/* grid */}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={i} x1={10 + i * 10} y1="10" x2={10 + i * 10} y2="62" stroke={dim} strokeWidth="0.12" opacity="0.3"/>
      ))}
      {[0,1,2,3,4,5].map(i => (
        <line key={i} x1="10" y1={10 + i * 10.4} x2="90" y2={10 + i * 10.4} stroke={dim} strokeWidth="0.12" opacity="0.3"/>
      ))}
      <line x1="10" y1="62" x2="90" y2="62" stroke={ink} strokeWidth="0.4"/>
      <line x1="10" y1="10" x2="10" y2="62" stroke={ink} strokeWidth="0.4"/>
      {/* before — noisy red-ish trace */}
      <path d="M 10 38 L 14 36 L 16 41 L 20 32 L 24 44 L 28 31 L 32 39 L 36 28 L 40 44 L 44 35 L 48 41 L 52 30 L 56 42 L 60 35 L 64 40 L 68 32 L 72 38 L 76 33 L 80 39 L 84 36 L 90 37"
            fill="none" stroke={dim} strokeWidth="0.5" strokeDasharray="1 0.6"/>
      {/* after — clean trace */}
      <path d="M 10 42 L 18 42 L 22 41.6 L 24 36 L 26 41.5 L 32 42 L 40 42 L 42 41 L 44 28 L 46 41 L 52 42 L 60 42 L 62 40 L 64 33 L 66 40 L 70 42 L 80 42 L 82 41 L 84 38 L 86 41.6 L 90 42"
            fill="none" stroke={amber} strokeWidth="0.8"/>
      <L x="14" y="20" color={dim} size={1.9}>PRE · S/N 38</L>
      <L x="14" y="24" color={amber} size={1.9}>POST · S/N 412</L>
      <text x="90" y="68" fontSize="1.9" fontFamily={D_MONO} fill={dim}
            textAnchor="end" letterSpacing="0.2">MIN</text>
      <L x="11" y="9" color={dim} size={1.6}>mV</L>
      <L x="50" y="73" color={dim} anchor="middle" size={2}>BEFORE / AFTER · DETECTOR RECONDITION</L>
    </svg>
  );
};

// ─── 12 · Network (vendor management) ─────────────────────────────────
DIAGRAMS.network = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  const nodes = [
    { x: 50, y: 38, label: 'SIGMA', big: true },
    { x: 18, y: 18, label: 'WATERS' },
    { x: 30, y: 60, label: 'AGILENT' },
    { x: 72, y: 16, label: 'BRUKER' },
    { x: 82, y: 38, label: 'THERMO' },
    { x: 74, y: 60, label: 'SHIMADZU' },
    { x: 16, y: 44, label: 'SCIEX' },
    { x: 50, y: 12, label: 'BUYER · A', accent: true },
    { x: 50, y: 64, label: 'BUYER · B' },
  ];
  return (
    <svg viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      {nodes.slice(1).map((n, i) => (
        <line key={i} x1={50} y1={38} x2={n.x} y2={n.y}
              stroke={n.accent ? amber : dim} strokeWidth={n.accent ? 0.5 : 0.25}
              strokeDasharray={n.accent ? "1.5 0.8" : "0.6 0.6"}/>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.big ? 4 : n.accent ? 2.4 : 1.8}
                  fill={n.big ? ink : n.accent ? amber : D_FILL}
                  stroke={n.big ? ink : n.accent ? amber : ink}
                  strokeWidth="0.4"/>
          {n.big && (
            <text x={n.x} y={n.y + 1.2} fontSize="2.4" fontFamily={D_MONO}
                  fill="white" textAnchor="middle" letterSpacing="0.3" fontWeight="600">Σ</text>
          )}
          <L x={n.x + (n.big ? 5 : n.accent ? 3.4 : 2.8)} y={n.y + 1}
             color={n.accent ? amber : ink} size={n.big ? 2.2 : 1.9}
             weight={n.big || n.accent ? 500 : 400}>{n.label}</L>
        </g>
      ))}
      <L x="50" y="73" color={dim} anchor="middle" size={2}>VENDOR · BUYER NETWORK · 09 NODES SHOWN</L>
    </svg>
  );
};

// ─── 13 · Doc with magnifier (due diligence thumbnail) ─────────────────
DIAGRAMS.diligence = () => {
  const ink = D_INK, dim = D_DIM, amber = D_AMBER;
  return (
    <svg viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <rect x="18" y="8" width="50" height="60" fill="white" stroke={ink} strokeWidth="0.5"/>
      <rect x="18" y="8" width="50" height="4" fill={ink}/>
      {[18, 24, 30, 36, 42, 48, 54, 60].map((y, i) => (
        <rect key={i} x="22" y={y} width={i % 2 ? 38 : 32} height="1.6" fill={dim} opacity="0.35"/>
      ))}
      {/* magnifier */}
      <g transform="translate(56 42)">
        <circle cx="0" cy="0" r="14" fill={D_PAPER} stroke={ink} strokeWidth="0.8" opacity="0.95"/>
        <circle cx="0" cy="0" r="14" fill="none" stroke={amber} strokeWidth="0.4"/>
        <line x1="10" y1="10" x2="20" y2="22" stroke={ink} strokeWidth="1.4"/>
        {/* zoomed content inside */}
        <rect x="-9" y="-7" width="18" height="1.4" fill={dim} opacity="0.7"/>
        <rect x="-9" y="-4" width="14" height="1.4" fill={dim} opacity="0.7"/>
        <rect x="-9" y="-1" width="16" height="1.4" fill={amber} opacity="0.7"/>
        <rect x="-9" y="2" width="12" height="1.4" fill={dim} opacity="0.7"/>
        <rect x="-9" y="5" width="15" height="1.4" fill={dim} opacity="0.7"/>
      </g>
      <L x="50" y="73" color={dim} anchor="middle" size={2}>DESK REVIEW · OEM SPEC vs LISTING</L>
    </svg>
  );
};

// ─── 14 · Generic instrument silhouettes for capability tiles ──────────
function InstShell({ children, label, code }) {
  return (
    <svg viewBox="0 0 100 75" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', width: '100%', height: '100%' }}>
      <g>{children}</g>
      <L x="50" y="71" color={D_DIM} anchor="middle" size={2.2}>{label}</L>
    </svg>
  );
}

DIAGRAMS.inst_rack = () => (
  <InstShell label="HPLC · BENCH STACK">
    <rect x="36" y="14" width="28" height="42" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    {[18, 26, 34, 42].map(y => (
      <line key={y} x1="36" y1={y} x2="64" y2={y} stroke={D_INK} strokeWidth="0.4"/>
    ))}
    {[18, 26, 34, 42].map(y => (
      <rect key={y} x="38" y={y + 2} width="6" height="2.5" fill="oklch(0.85 0.01 240)"/>
    ))}
    <circle cx="60" cy="20" r="0.8" fill={D_AMBER}/>
    <rect x="34" y="56" width="32" height="3" fill={D_INK}/>
    <line x1="36" y1="59" x2="36" y2="62" stroke={D_INK} strokeWidth="0.5"/>
    <line x1="64" y1="59" x2="64" y2="62" stroke={D_INK} strokeWidth="0.5"/>
  </InstShell>
);

DIAGRAMS.inst_gc = () => (
  <InstShell label="GC · OVEN + COLUMN">
    <rect x="22" y="20" width="56" height="38" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    {/* door */}
    <line x1="50" y1="20" x2="50" y2="58" stroke={D_INK} strokeWidth="0.4" strokeDasharray="0.8 0.8"/>
    {/* coil */}
    <g fill="none" stroke={D_INK} strokeWidth="0.5">
      <circle cx="60" cy="38" r="12"/>
      <circle cx="60" cy="38" r="9"/>
      <circle cx="60" cy="38" r="6"/>
      <circle cx="60" cy="38" r="3"/>
    </g>
    <circle cx="44" cy="26" r="0.8" fill={D_AMBER}/>
    <rect x="24" y="24" width="20" height="6" fill="oklch(0.85 0.01 240)" stroke={D_INK} strokeWidth="0.3"/>
  </InstShell>
);

DIAGRAMS.inst_ms = () => (
  <InstShell label="MS · QUADRUPOLE">
    <rect x="14" y="28" width="72" height="20" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    <rect x="14" y="28" width="14" height="20" fill="none" stroke={D_INK} strokeWidth="0.4"/>
    <rect x="58" y="28" width="20" height="20" fill="none" stroke={D_INK} strokeWidth="0.4"/>
    <line x1="28" y1="38" x2="58" y2="38" stroke={D_INK} strokeWidth="0.4"/>
    {/* ion path arrows */}
    <line x1="34" y1="36" x2="54" y2="36" stroke={D_AMBER} strokeWidth="0.5" strokeDasharray="1 0.6"/>
    <path d="M 52 35 L 55 36 L 52 37 Z" fill={D_AMBER}/>
    <circle cx="20" cy="38" r="0.8" fill={D_AMBER}/>
    <rect x="60" y="32" width="14" height="3" fill="oklch(0.85 0.01 240)"/>
  </InstShell>
);

DIAGRAMS.inst_nmr = () => (
  <InstShell label="NMR · SUPERCON MAGNET">
    <rect x="40" y="10" width="20" height="58" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    {[16, 22, 28, 34, 40, 46, 52, 58].map(y => (
      <line key={y} x1="40" y1={y} x2="60" y2={y} stroke={D_DIM} strokeWidth="0.2"/>
    ))}
    <rect x="46" y="6" width="8" height="6" fill={D_INK}/>
    <rect x="44" y="63" width="12" height="5" fill={D_FILL} stroke={D_INK} strokeWidth="0.5"/>
    <line x1="20" y1="22" x2="40" y2="22" stroke={D_AMBER} strokeWidth="0.5"/>
    <L x="18" y="21" color={D_AMBER} size={1.8} anchor="end">SAMPLE↓</L>
  </InstShell>
);

DIAGRAMS.inst_ir = () => (
  <InstShell label="FTIR / RAMAN · BENCHTOP">
    <rect x="20" y="24" width="60" height="30" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    {/* beam path */}
    <line x1="28" y1="40" x2="72" y2="40" stroke={D_AMBER} strokeWidth="0.5"/>
    <rect x="38" y="36" width="8" height="8" fill={D_PAPER} stroke={D_INK} strokeWidth="0.4"/>
    <line x1="38" y1="44" x2="46" y2="36" stroke={D_INK} strokeWidth="0.3"/>
    <circle cx="58" cy="40" r="3" fill="none" stroke={D_INK} strokeWidth="0.4"/>
    <rect x="22" y="26" width="14" height="3" fill="oklch(0.85 0.01 240)"/>
    <circle cx="74" cy="28" r="0.8" fill={D_AMBER}/>
  </InstShell>
);

DIAGRAMS.inst_em = () => (
  <InstShell label="SEM · COLUMN + CHAMBER">
    <rect x="44" y="8" width="12" height="38" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    {[14, 20, 26, 32, 38].map(y => (
      <line key={y} x1="44" y1={y} x2="56" y2={y} stroke={D_DIM} strokeWidth="0.2"/>
    ))}
    <rect x="30" y="46" width="40" height="16" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    <circle cx="50" cy="54" r="4" fill="none" stroke={D_INK} strokeWidth="0.4"/>
    <line x1="50" y1="46" x2="50" y2="50" stroke={D_AMBER} strokeWidth="0.6"/>
    <path d="M 49 50 L 50 52 L 51 50 Z" fill={D_AMBER}/>
    <rect x="58" y="48" width="10" height="3" fill="oklch(0.85 0.01 240)"/>
  </InstShell>
);

DIAGRAMS.inst_om = () => (
  <InstShell label="LIGHT MICROSCOPE">
    <line x1="44" y1="14" x2="44" y2="24" stroke={D_INK} strokeWidth="0.6"/>
    <line x1="50" y1="14" x2="50" y2="24" stroke={D_INK} strokeWidth="0.6"/>
    <rect x="40" y="10" width="14" height="4" fill={D_FILL} stroke={D_INK} strokeWidth="0.5"/>
    <rect x="38" y="24" width="18" height="6" fill={D_FILL} stroke={D_INK} strokeWidth="0.5"/>
    {[26, 28].map(y => (
      <line key={y} x1="38" y1={y} x2="56" y2={y} stroke={D_DIM} strokeWidth="0.2"/>
    ))}
    <line x1="47" y1="30" x2="47" y2="40" stroke={D_INK} strokeWidth="0.8"/>
    <rect x="34" y="40" width="26" height="3" fill={D_FILL} stroke={D_INK} strokeWidth="0.4"/>
    <rect x="30" y="44" width="34" height="12" fill={D_FILL} stroke={D_INK} strokeWidth="0.5"/>
    <circle cx="47" cy="41.5" r="0.7" fill={D_AMBER}/>
    <circle cx="56" cy="33" r="2" fill="none" stroke={D_INK} strokeWidth="0.4"/>
  </InstShell>
);

DIAGRAMS.inst_br = () => (
  <InstShell label="BIOREACTOR · STIRRED">
    <rect x="34" y="16" width="32" height="46" rx="2" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    <line x1="34" y1="22" x2="66" y2="22" stroke={D_INK} strokeWidth="0.4"/>
    {/* liquid */}
    <path d="M 36 36 L 64 36 L 64 60 L 36 60 Z" fill={D_AMBER} opacity="0.18"/>
    <line x1="36" y1="36" x2="64" y2="36" stroke={D_AMBER} strokeWidth="0.4"/>
    {/* impeller shaft */}
    <line x1="50" y1="22" x2="50" y2="52" stroke={D_INK} strokeWidth="0.5"/>
    <line x1="44" y1="48" x2="56" y2="48" stroke={D_INK} strokeWidth="0.6"/>
    <line x1="44" y1="52" x2="56" y2="52" stroke={D_INK} strokeWidth="0.6"/>
    {/* probe */}
    <line x1="40" y1="16" x2="40" y2="44" stroke={D_INK} strokeWidth="0.4"/>
    <circle cx="40" cy="14" r="0.8" fill={D_AMBER}/>
  </InstShell>
);

DIAGRAMS.inst_cf = () => (
  <InstShell label="CENTRIFUGE · FLOOR">
    <rect x="22" y="18" width="56" height="44" rx="2" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    <circle cx="50" cy="38" r="14" fill="none" stroke={D_INK} strokeWidth="0.5"/>
    <circle cx="50" cy="38" r="10" fill="none" stroke={D_DIM} strokeWidth="0.3"/>
    {/* rotor blades */}
    {[0, 60, 120, 180, 240, 300].map(a => {
      const rad = (a * Math.PI) / 180;
      const x = 50 + Math.cos(rad) * 12, y = 38 + Math.sin(rad) * 12;
      return <rect key={a} x={x - 1.4} y={y - 1.4} width="2.8" height="2.8"
                   fill={D_FILL} stroke={D_INK} strokeWidth="0.3"
                   transform={`rotate(${a} ${x} ${y})`}/>;
    })}
    <circle cx="50" cy="38" r="1.4" fill={D_AMBER}/>
    <rect x="26" y="22" width="14" height="3" fill="oklch(0.85 0.01 240)"/>
  </InstShell>
);

DIAGRAMS.inst_cs = () => (
  <InstShell label="-80°C ULT FREEZER">
    <rect x="32" y="10" width="36" height="56" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    {/* doors */}
    <line x1="50" y1="14" x2="50" y2="62" stroke={D_INK} strokeWidth="0.4"/>
    <rect x="34" y="16" width="14" height="44" fill="none" stroke={D_DIM} strokeWidth="0.3"/>
    <rect x="52" y="16" width="14" height="44" fill="none" stroke={D_DIM} strokeWidth="0.3"/>
    {/* handles */}
    <rect x="46" y="32" width="2.5" height="10" fill={D_INK}/>
    <rect x="51.5" y="32" width="2.5" height="10" fill={D_INK}/>
    {/* display */}
    <rect x="38" y="11" width="24" height="3" fill="oklch(0.18 0.02 240)"/>
    <text x="50" y="13.4" fontSize="1.8" fontFamily={D_MONO} fill={D_AMBER}
          textAnchor="middle" letterSpacing="0.3">-80.2 °C</text>
    {/* feet */}
    <rect x="32" y="66" width="6" height="3" fill={D_INK}/>
    <rect x="62" y="66" width="6" height="3" fill={D_INK}/>
  </InstShell>
);

DIAGRAMS.inst_sm = () => (
  <InstShell label="SEMICON METROLOGY">
    <rect x="18" y="26" width="64" height="32" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    <rect x="22" y="34" width="24" height="20" fill={D_PAPER} stroke={D_INK} strokeWidth="0.4"/>
    {/* wafer */}
    <circle cx="34" cy="44" r="8" fill="none" stroke={D_INK} strokeWidth="0.5"/>
    <line x1="28" y1="50" x2="34" y2="50" stroke={D_INK} strokeWidth="0.4"/>
    {/* arm */}
    <rect x="48" y="32" width="28" height="3" fill={D_FILL} stroke={D_INK} strokeWidth="0.4"/>
    <rect x="74" y="32" width="3" height="14" fill={D_FILL} stroke={D_INK} strokeWidth="0.4"/>
    <circle cx="75.5" cy="48" r="2" fill={D_AMBER}/>
    <line x1="75.5" y1="50" x2="75.5" y2="54" stroke={D_AMBER} strokeWidth="0.5"/>
  </InstShell>
);

DIAGRAMS.inst_xr = () => (
  <InstShell label="XRD / XRF · DIFFRACTOMETER">
    <rect x="18" y="26" width="64" height="32" fill={D_FILL} stroke={D_INK} strokeWidth="0.6"/>
    {/* source */}
    <rect x="24" y="34" width="10" height="14" fill={D_FILL} stroke={D_INK} strokeWidth="0.4"/>
    <line x1="34" y1="41" x2="50" y2="41" stroke={D_AMBER} strokeWidth="0.5" strokeDasharray="1 0.6"/>
    {/* sample */}
    <circle cx="50" cy="41" r="2.5" fill={D_PAPER} stroke={D_INK} strokeWidth="0.5"/>
    {/* detector arc */}
    <path d="M 50 41 L 66 36" stroke={D_AMBER} strokeWidth="0.5" strokeDasharray="1 0.6"/>
    <rect x="64" y="34" width="6" height="8" fill={D_FILL} stroke={D_INK} strokeWidth="0.4"
          transform="rotate(-18 67 38)"/>
    {/* goniometer arc */}
    <path d="M 36 41 A 14 14 0 0 1 64 41" fill="none" stroke={D_DIM} strokeWidth="0.3" strokeDasharray="0.5 1"/>
    <text x="74" y="30" fontSize="1.8" fontFamily={D_MONO} fill={D_DIM} letterSpacing="0.2">2θ</text>
  </InstShell>
);

// ─── TechPlate wrapper ─────────────────────────────────────────────────
function TechPlate({ kind, ratio, plate, caption, dark = false, frame = true, accent }) {
  const Diagram = DIAGRAMS[kind] || DIAGRAMS.stack;
  const ink     = dark ? 'oklch(0.85 0.012 240)' : D_INK;
  const dim     = dark ? 'oklch(0.55 0.015 240)' : D_DIM;
  const bg      = dark ? 'oklch(0.12 0.015 240)' : D_PAPER;
  const border  = dark ? 'oklch(0.32 0.015 240)' : 'oklch(0.78 0.012 80)';

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      ...(ratio ? { aspectRatio: ratio } : {}),
      background: bg,
      border: frame ? `1px solid ${border}` : 'none',
      overflow: 'hidden',
    }}>
      {/* corner ticks */}
      {frame && (
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <g stroke={border} strokeWidth="1" fill="none">
            <path d="M 0 14 L 0 0 L 14 0"/>
            <path d="M 0 100% L 0 calc(100% - 14px) M 0 100% L 14 100%"/>
          </g>
        </svg>
      )}
      {/* plate badge */}
      {plate && (
        <div style={{
          position: 'absolute', top: 8, left: 10, zIndex: 2,
          fontFamily: D_MONO, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: dim,
        }}>
          PLATE&nbsp;·&nbsp;<span style={{ color: ink, fontWeight: 500 }}>{plate}</span>
        </div>
      )}
      {/* diagram area */}
      <div style={{ position: 'absolute', inset: 0, padding: '24px 14px 22px' }}>
        <Diagram dark={dark}/>
      </div>
      {/* caption */}
      {caption && (
        <div style={{
          position: 'absolute', bottom: 8, left: 10, right: 10, zIndex: 2,
          fontFamily: D_MONO, fontSize: 9, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: dim, textAlign: 'right',
        }}>{caption}</div>
      )}
    </div>
  );
}

window.TechPlate = TechPlate;
window.DIAGRAMS = DIAGRAMS;
