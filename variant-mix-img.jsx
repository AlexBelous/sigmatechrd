// variant-mix-img.jsx — A×C · Amber, image-led. Every imagery slot is
// filled with a schematic technical illustration (see diagrams.jsx) —
// a hero stack diagram, a four-frame technical essay, exploded views
// and silhouettes per case + capability tile.

function PlaceholderImage_UNUSED({ width, height, label, hint, dark = false, ratio }) {
  const W = window.TOKENS;
  const stripeA = dark ? 'oklch(0.30 0.02 240)' : 'oklch(0.86 0.012 80)';
  const stripeB = dark ? 'oklch(0.24 0.02 240)' : 'oklch(0.91 0.010 80)';
  const fg      = dark ? 'oklch(0.78 0.012 240)' : 'oklch(0.40 0.02 240)';
  const border  = dark ? 'oklch(0.36 0.02 240)' : 'oklch(0.78 0.012 80)';
  const stripeId = `ph-${Math.round((width||100) + (height||100) + (label?.length||0))}-${dark?'d':'l'}`;
  return (
    <div style={{
      position: 'relative',
      width: width || '100%',
      ...(ratio ? { aspectRatio: ratio } : (height ? { height } : {})),
      border: `1px solid ${border}`,
      overflow: 'hidden',
    }}>
      <svg width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0 }} preserveAspectRatio="none">
        <defs>
          <pattern id={stripeId} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="14" height="14" fill={stripeB}/>
            <rect width="7" height="14" fill={stripeA}/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${stripeId})`} opacity="0.55"/>
      </svg>
      {/* corner ticks */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} preserveAspectRatio="none">
        <g stroke={border} strokeWidth="1" fill="none">
          <path d="M0 14 L0 0 L14 0"/>
          <path d="M100% 14 L100% 0 L calc(100% - 14px) 0" transform="" />
        </g>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 16, gap: 6,
      }}>
        <div style={{
          fontFamily: W.mono, fontSize: 10, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: fg, opacity: 0.7,
        }}>image · placeholder</div>
        {label && (
          <div style={{
            fontFamily: W.mono, fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: fg, fontWeight: 500,
          }}>{label}</div>
        )}
        {hint && (
          <div style={{
            fontFamily: W.serif, fontSize: 12, fontStyle: 'italic',
            color: fg, opacity: 0.8, maxWidth: '85%', lineHeight: 1.35,
          }}>{hint}</div>
        )}
      </div>
    </div>
  );
}

function MixImageLanding() {
  const t = window.TOKENS, C = window.CONTENT;
  const W = window.Wordmark, Rule = window.Rule, LR = window.LabelRule, Trace = window.SignalTrace, PH = window.PH;
  const [inst, setInst] = React.useState('LC');
  const [openCase, setOpenCase] = React.useState(null);
  const [capFilter, setCapFilter] = React.useState('');

  const paper  = 'oklch(0.97 0.008 85)';
  const paper2 = 'oklch(0.94 0.012 78)';
  const ink    = 'oklch(0.18 0.02 240)';
  const inkSoft= 'oklch(0.32 0.02 240)';
  const dim    = 'oklch(0.50 0.015 240)';
  const rule   = 'oklch(0.80 0.01 240)';
  const amber  = 'oklch(0.74 0.16 60)';
  const amberDeep = 'oklch(0.62 0.16 55)';
  const red    = 'oklch(0.55 0.20 25)';
  const green  = 'oklch(0.45 0.14 145)';

  const EdgeMarks = ({ side = 'left' }) => {
    const marks = Array.from({ length: 60 });
    return (
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        [side]: 0, width: 32,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        pointerEvents: 'none',
      }}>
        {marks.map((_, i) => {
          const big = i % 10 === 0;
          const mid = i % 5 === 0;
          return (
            <div key={i} style={{
              height: 1, background: ink,
              opacity: big ? 0.55 : mid ? 0.3 : 0.13,
              width: big ? 22 : mid ? 12 : 6,
              marginLeft: side === 'left' ? 5 : 'auto',
              marginRight: side === 'right' ? 5 : 'auto',
            }}/>
          );
        })}
      </div>
    );
  };

  const meta = (extra) => ({
    fontFamily: t.mono, fontSize: 11, letterSpacing: '0.15em',
    textTransform: 'uppercase', color: dim, ...extra,
  });

  const SectionMark = ({ n }) => (
    <div style={{
      fontFamily: t.serif, fontSize: 64, lineHeight: 0.95,
      color: amberDeep, fontStyle: 'italic', fontWeight: 300,
      letterSpacing: '-0.03em',
    }}>§{n}</div>
  );

  const stamp = (verdict) => {
    const isFail = verdict.startsWith('FAIL') || verdict === 'WALK';
    const isCond = verdict.includes('CONDITIONAL');
    const c = isFail ? red : isCond ? amberDeep : green;
    return (
      <span style={{
        fontFamily: t.mono, fontSize: 11, fontWeight: 600,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        border: `1.5px solid ${c}`, color: c,
        padding: '4px 8px', display: 'inline-block',
        transform: 'rotate(-1.2deg)', borderRadius: 2, whiteSpace: 'nowrap',
      }}>{verdict}</span>
    );
  };

  // photo-essay items
  const essay = [
    { label: 'Inspector on site',  hint: 'wide shot · seller’s lab · power-on bench' },
    { label: 'Detector internals', hint: 'macro · ion source after panel removal' },
    { label: 'Reference sample',   hint: 'sample run · operator hands' },
    { label: 'Signed report',      hint: 'overhead · final PDF on desk' },
  ];

  return (
    <div style={{
      width: 1400, position: 'relative',
      background: paper, color: ink, fontFamily: t.sans,
      overflow: 'hidden',
    }}>
      <EdgeMarks side="left"/>
      <EdgeMarks side="right"/>

      {/* ─── Top document strip ──────────────────────────────── */}
      <div style={{
        padding: '18px 60px 14px',
        borderBottom: `1px solid ${rule}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24, fontFamily: t.mono, fontSize: 11, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: dim,
      }}>
        <div style={{ display:'flex', gap: 28 }}>
          <span>Document&nbsp;·&nbsp;<b style={{ color: ink }}>sigmatechrd.com</b></span>
          <span>Vol. I &nbsp;·&nbsp; Issue 01 / 2026</span>
          <span>Classification&nbsp;·&nbsp;Public</span>
        </div>
        <div style={{ display:'flex', gap: 28 }}>
          <span>Hong Kong SAR</span>
          <span>CR&nbsp;{C.legal.cr}</span>
          <a href={`mailto:${C.legal.email}`} style={{ color: ink, textDecoration: 'none' }}>{C.legal.email}</a>
        </div>
      </div>

      {/* ─── Nav row ────────────────────────────────────────── */}
      <div style={{
        padding: '18px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1.5px solid ${ink}`,
      }}>
        <W size={24} color={ink} accent={amberDeep}/>
        <nav style={{ display:'flex', gap: 30, fontFamily: t.mono, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {['§1 Practice','§2 Field','§3 Protocol','§4 Record','§5 Capability','§6 Office'].map(x => (
            <a key={x} href="#" style={{ color: ink, textDecoration: 'none' }}>{x}</a>
          ))}
        </nav>
        <a href="#" style={{
          fontFamily: t.mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '11px 20px', background: ink, color: paper, textDecoration: 'none',
        }}>Brief us &nbsp;→</a>
      </div>

      {/* ─── HERO — interactive instrument inspection ─────── */}
      <window.MixHero inst={inst} setInst={setInst}/>

      {/* ─── §1 PRACTICE — services with thumbnails ─────────── */}
      <section style={{ padding: '72px 60px 64px', borderTop: `1.5px solid ${ink}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, alignItems: 'flex-start' }}>
          <SectionMark n="1"/>
          <div>
            <div style={meta()}>The practice</div>
            <h2 style={{
              margin: '14px 0 0', fontFamily: t.serif, fontWeight: 400,
              fontSize: 60, lineHeight: 1, letterSpacing: '-0.025em', maxWidth: 980,
            }}>
              Six things, in the order an acquisition usually&nbsp;needs them.
            </h2>
          </div>
        </div>

        <div style={{
          marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px 56px',
        }}>
          {C.services.map((s) => (
            <div key={s.id} style={{
              display: 'grid', gridTemplateColumns: '180px 1fr', gap: 22,
              paddingBottom: 32, borderBottom: `1px solid ${rule}`,
            }}>
              <window.TechPlate
                kind={[
                  'diligence',
                  'figure',
                  'signal',
                  'crate',
                  'bars',
                  'network',
                ][parseInt(s.id.split('-')[1], 10) - 1] || 'diligence'}
                ratio="4 / 3"
                plate={s.id}
                caption={s.title}
              />
              <div>
                <div style={{ fontFamily: t.mono, fontSize: 11, letterSpacing: '0.16em', color: amberDeep }}>{s.id}</div>
                <div style={{ fontFamily: t.serif, fontSize: 24, fontWeight: 400, lineHeight: 1.15, marginTop: 8 }}>{s.title}</div>
                <p style={{ marginTop: 10, marginBottom: 0, fontFamily: t.serif, fontSize: 15, lineHeight: 1.55, color: inkSoft }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── §2 FIELD — photo essay ──────────────────────────── */}
      <section style={{ padding: '72px 60px 80px', borderTop: `1.5px solid ${ink}`, background: paper2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, alignItems: 'flex-start' }}>
          <SectionMark n="2"/>
          <div>
            <div style={meta()}>From the field</div>
            <h2 style={{
              margin: '14px 0 0', fontFamily: t.serif, fontWeight: 400,
              fontSize: 60, lineHeight: 1, letterSpacing: '-0.025em', maxWidth: 1000,
            }}>
              An inspection, in four&nbsp;frames.
            </h2>
            <p style={{ marginTop: 18, maxWidth: 720, fontFamily: t.serif, fontSize: 17, lineHeight: 1.55, color: inkSoft }}>
              A typical visit: hours of preparation, twenty minutes of measurement, a couple of frames worth keeping.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {essay.map((e, i) => (
            <figure key={i} style={{ margin: 0 }}>
              <window.TechPlate
                kind={['figure','exploded','tray','doc'][i]}
                ratio="4 / 5"
                plate={String(i + 2).padStart(2, '0')}
                caption={e.label}
              />
              <figcaption style={{
                marginTop: 10, display: 'flex', justifyContent: 'space-between',
                fontFamily: t.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim,
              }}>
                <span>Plate&nbsp;{String(i+2).padStart(2,'0')}</span>
                <span style={{ color: amberDeep }}>{e.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* one extra wide plate */}
        <figure style={{ margin: '32px 0 0' }}>
          <window.TechPlate kind="floorplan" ratio="21 / 6" plate="06" caption="Lab floorplan · seller site · bay A / B / offices"/>
          <figcaption style={{
            marginTop: 10, display: 'flex', justifyContent: 'space-between',
            fontFamily: t.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim,
          }}>
            <span>Plate 06 &nbsp;·&nbsp; Frankfurt, DE</span>
            <span>03.2026</span>
          </figcaption>
        </figure>
      </section>

      {/* ─── §3 PROTOCOL ─────────────────────────────────────── */}
      <section style={{ padding: '72px 60px 72px', borderTop: `1.5px solid ${ink}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, alignItems: 'flex-start' }}>
          <SectionMark n="3"/>
          <div>
            <div style={meta()}>Protocol</div>
            <h2 style={{
              margin: '14px 0 0', fontFamily: t.serif, fontWeight: 400,
              fontSize: 60, lineHeight: 1, letterSpacing: '-0.025em', maxWidth: 1000,
            }}>
              Five steps. The first is a&nbsp;URL.<br/>
              The last is a&nbsp;<span style={{ fontStyle: 'italic', fontWeight: 300, color: amberDeep }}>handshake.</span>
            </h2>
          </div>
        </div>

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 28, left: '8%', right: '8%', height: 0,
            borderTop: `1.5px dashed ${ink}`, opacity: 0.35,
          }}/>
          {C.workflow.map((w) => (
            <div key={w.step} style={{ paddingRight: 24 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: paper, border: `1.5px solid ${ink}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: t.mono, fontWeight: 600, fontSize: 17,
                position: 'relative', zIndex: 1,
              }}>{w.step}</div>
              <div style={{ fontFamily: t.serif, fontSize: 22, marginTop: 22, fontWeight: 500 }}>{w.title}</div>
              <div style={{ fontFamily: t.serif, fontSize: 14, lineHeight: 1.55, color: inkSoft, marginTop: 10, maxWidth: 240 }}>
                {w.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NUMBERS — inverted plate ───────────────────────── */}
      <section style={{ padding: '80px 60px 80px', borderTop: `1.5px solid ${ink}`, background: ink, color: paper }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 320px', gap: 32, alignItems: 'flex-start', marginBottom: 48 }}>
          <div style={{ fontFamily: t.serif, fontSize: 64, lineHeight: 0.95, color: amber, fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.03em' }}>§4</div>
          <div>
            <div style={{ ...meta(), color: 'oklch(0.7 0.015 240)' }}>The year, totalled</div>
            <h2 style={{
              margin: '14px 0 0', fontFamily: t.serif, fontWeight: 400,
              fontSize: 56, lineHeight: 1, letterSpacing: '-0.025em',
              color: paper, maxWidth: 720,
            }}>
              The numbers, for as long as the numbers&nbsp;matter.
            </h2>
          </div>
          <window.TechPlate dark kind="monitor" ratio="4 / 3" plate="07" caption="Detector output · live trace"/>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid oklch(0.30 0.015 240)` }}>
          {C.numbers.map((n, i) => (
            <div key={i} style={{
              padding: '32px 24px 8px',
              borderRight: i < 3 ? `1px solid oklch(0.30 0.015 240)` : 'none',
            }}>
              <div style={{
                fontFamily: t.serif, fontSize: 96, lineHeight: 0.9, fontWeight: 300,
                letterSpacing: '-0.03em', color: paper,
              }}>{n.v}</div>
              <div style={{ fontFamily: t.mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: amber, marginTop: 16 }}>{n.u}</div>
              <p style={{ marginTop: 10, fontFamily: t.serif, fontSize: 14, lineHeight: 1.55, color: 'oklch(0.78 0.012 240)' }}>
                {[
                  'Field inspections delivered to buyers since trading began.',
                  'Mean reduction we negotiated against listed ask price.',
                  'Lots where we recommended walking away. The strongest case for hiring us.',
                  'Countries where an inspector has put hands on the instrument.',
                ][i]}
              </p>
              <div style={{ marginTop: 12 }}><PH color="oklch(0.62 0.015 240)">{n.f}</PH></div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── §5 RECORD / Cases — with thumb per row ─────────── */}
      <section style={{ padding: '72px 60px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, alignItems: 'flex-start' }}>
          <SectionMark n="5"/>
          <div>
            <div style={meta()}>Record of reports</div>
            <h2 style={{
              margin: '14px 0 0', fontFamily: t.serif, fontWeight: 400,
              fontSize: 60, lineHeight: 1, letterSpacing: '-0.025em', maxWidth: 1000,
            }}>
              Four recent inspections, redacted for the buyer&apos;s&nbsp;privacy.
            </h2>
          </div>
        </div>

        <div style={{ marginTop: 36 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '160px 110px 1fr 130px 110px 130px',
            gap: 18, padding: '10px 0',
            fontFamily: t.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: dim,
            borderBottom: `1.5px solid ${ink}`,
          }}>
            <div>Plate</div><div>Report №</div><div>Lot / note</div>
            <div>Ask</div><div>Δ</div><div>Verdict</div>
          </div>
          {C.cases.map((c) => {
            const open = openCase === c.id;
            const plateKind = ({
              'R-2603': 'inst_rack',
              'R-2611': 'inst_ms',
              'R-2618': 'inst_ms',
              'R-2624': 'inst_gc',
            })[c.id] || 'inst_rack';
            const detail = ({
              'R-2603': {
                ask: 'USD 84,000', bid: 'USD 75,500', recond: 'USD 3,400 (DAD lamp + outlet check valve)',
                visit: '1.5 days · Boston, US', age: '6 yr / 18 400 inj.',
                protocol: [
                  { k: 'Pump A pulsation',  v: '0.47 %',  spec: '< 0.5 %',     ok: 1 },
                  { k: 'DAD lamp hours',    v: '71 %',    spec: '> 50 %',     ok: 1 },
                  { k: 'Col. comp. ΔT 24h', v: '± 0.05 °C', spec: '± 0.1 °C', ok: 1 },
                  { k: 'Carry-over BSA',    v: '0.0004 %', spec: '< 0.0005',   ok: 1 },
                  { k: 'Gradient accuracy', v: '± 0.3 %',  spec: '± 1 %',    ok: 1 },
                ],
                plates: ['inst_rack', 'exploded', 'tray'],
              },
              'R-2611': {
                ask: 'USD 148,500', bid: 'USD 146,000', recond: 'none',
                visit: '2 days · Osaka, JP', age: '5 yr / 14 mo. since CE',
                protocol: [
                  { k: 'Reserpine S/N',     v: '38 000 : 1', spec: '> 30 000', ok: 1 },
                  { k: 'Mass accuracy',     v: '0.3 amu',    spec: '± 0.5',    ok: 1 },
                  { k: 'ESI capillary',     v: 'new · 4 mo', spec: '< 12 mo',  ok: 1 },
                  { k: 'Q1/Q3 resolution',  v: '0.7 / 0.7 amu', spec: '0.7 ± 0.1', ok: 1 },
                  { k: 'Vacuum @ analyser', v: '8.2·10⁻⁶ mbar', spec: '< 1·10⁻⁵', ok: 1 },
                ],
                plates: ['inst_ms', 'doc', 'figure'],
              },
              'R-2618': {
                ask: 'USD 172,000', bid: 'WALK', recond: 'USD 54,000 (detector swap, 6 wk)',
                visit: '1 day · Singapore', age: '8 yr / 41 200 inj.',
                protocol: [
                  { k: 'EM gain vs nominal', v: '41 %',     spec: '> 70 %',    ok: 0 },
                  { k: 'Baseline noise MRM', v: '180 cps',  spec: '< 50 cps',  ok: 0 },
                  { k: 'Source heater',      v: 'OK',       spec: 'within set', ok: 1 },
                  { k: 'Curtain gas flow',   v: 'OK',       spec: 'set',       ok: 1 },
                  { k: 'Q1 tune drift',      v: '0.4 amu',  spec: '± 0.5',     ok: 1 },
                ],
                plates: ['inst_ms', 'exploded', 'doc'],
              },
              'R-2624': {
                ask: 'USD 72,000', bid: 'USD 70,200', recond: 'USD 1,800 (septa, liners)',
                visit: '1.5 days · Karlsruhe, DE', age: '7 yr / 3 units',
                protocol: [
                  { k: 'Inlet septa',  v: 'worn', spec: '< 9 000 cyc.', ok: 0 },
                  { k: 'FID baseline', v: '0.6 pA', spec: '< 1 pA', ok: 1 },
                  { k: 'EPC accuracy', v: '± 0.04 psi', spec: '± 0.1 psi', ok: 1 },
                  { k: 'Oven ramp',    v: '4.1 °C/s', spec: '> 4', ok: 1 },
                ],
                plates: ['inst_gc', 'exploded', 'figure'],
              },
            })[c.id];
            return (
              <div key={c.id} style={{ borderBottom: `1px solid ${rule}` }}>
                <div
                  onClick={() => setOpenCase(open ? null : c.id)}
                  style={{
                    display: 'grid', gridTemplateColumns: '160px 110px 1fr 130px 110px 130px 28px',
                    gap: 18, padding: '20px 0', alignItems: 'start', cursor: 'pointer',
                  }}>
                  <window.TechPlate kind={plateKind} ratio="4 / 3" plate={c.id}/>
                  <div style={{ fontFamily: t.serif, fontStyle: 'italic', fontSize: 22, color: ink, lineHeight: 1, paddingTop: 2 }}>{c.id}</div>
                  <div>
                    <div style={{ fontFamily: t.serif, fontSize: 18, fontWeight: 500 }}>{c.lot}</div>
                    <div style={{ fontFamily: t.serif, fontSize: 14, color: inkSoft, marginTop: 4, lineHeight: 1.5, maxWidth: 560 }}>{c.note}</div>
                    <div style={{ fontFamily: t.mono, fontSize: 10, letterSpacing: '0.12em', color: dim, textTransform: 'uppercase', marginTop: 8 }}>{c.buyer} · {c.source}</div>
                  </div>
                  <div style={{ fontFamily: t.mono, fontSize: 14 }}>{c.bidAsk}</div>
                  <div style={{ fontFamily: t.mono, fontSize: 14, color: c.delta === 'WALK' ? red : amberDeep }}>{c.delta}</div>
                  <div>{stamp(c.verdict)}</div>
                  <div style={{
                    fontFamily: t.mono, fontSize: 18, color: ink, alignSelf: 'center', textAlign: 'right',
                    transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 250ms ease',
                  }}>›</div>
                </div>
                {open && (
                  <div style={{
                    background: paper2, border: `1px solid ${rule}`, borderTop: 'none',
                    padding: '32px 28px 36px', marginBottom: 0,
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32,
                  }}>
                    {/* col 1 — protocol breakdown */}
                    <div>
                      <div style={meta()}>Test protocol · deviation table</div>
                      <div style={{ marginTop: 12, borderTop: `1.5px solid ${ink}` }}>
                        {detail.protocol.map((p, i) => (
                          <div key={i} style={{
                            display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 18px', gap: 10,
                            padding: '10px 0', borderBottom: `1px solid ${rule}`,
                            fontFamily: t.mono, fontSize: 12, lineHeight: 1.3,
                          }}>
                            <span style={{ color: inkSoft }}>{p.k}</span>
                            <span style={{ color: ink, fontWeight: 600 }}>{p.v}</span>
                            <span style={{ color: dim }}>{p.spec}</span>
                            <span style={{ color: p.ok ? 'oklch(0.45 0.14 145)' : red, fontWeight: 700, textAlign: 'center' }}>{p.ok ? '✓' : '✕'}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 14, fontFamily: t.mono, fontSize: 10, color: dim, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                        Visit · {detail.visit} · Unit age {detail.age}
                      </div>
                    </div>
                    {/* col 2 — plates */}
                    <div>
                      <div style={meta()}>Photo plates · selected frames</div>
                      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {detail.plates.map((k, i) => (
                          <window.TechPlate key={i} kind={k} ratio="1 / 1" plate={`${c.id}.${i+1}`}/>
                        ))}
                      </div>
                      <div style={{ marginTop: 18 }}>
                        <Trace width={400} height={56} seed={c.id.charCodeAt(3) + c.id.charCodeAt(4)} color={ink} strokeWidth={1} points={140}/>
                        <div style={{ marginTop: 4, fontFamily: t.mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim }}>Signal capture · reference run</div>
                      </div>
                    </div>
                    {/* col 3 — verdict & bid */}
                    <div>
                      <div style={meta()}>Recommendation</div>
                      <div style={{ marginTop: 12, padding: '20px 22px', background: paper, border: `1.5px solid ${ink}` }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                          <div>
                            <div style={{ fontFamily: t.mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim }}>Listed ask</div>
                            <div style={{ fontFamily: t.mono, fontSize: 18, color: ink, marginTop: 4, textDecoration: detail.bid === 'WALK' ? 'line-through' : 'none' }}>{detail.ask}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily: t.mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim }}>Recommended</div>
                            <div style={{ fontFamily: t.mono, fontSize: 18, color: detail.bid === 'WALK' ? red : amberDeep, marginTop: 4, fontWeight: 600 }}>{detail.bid}</div>
                          </div>
                          <div style={{ gridColumn: '1 / 3' }}>
                            <div style={{ fontFamily: t.mono, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim }}>Recond. budget</div>
                            <div style={{ fontFamily: t.mono, fontSize: 14, color: ink, marginTop: 4 }}>{detail.recond}</div>
                          </div>
                        </div>
                        <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px dashed ${rule}`, fontFamily: t.serif, fontSize: 14.5, lineHeight: 1.55, color: inkSoft, fontStyle: 'italic' }}>
                          {c.note}
                        </div>
                      </div>
                      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: t.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim }}>Full PDF on request</span>
                        <a href="sample-report.html" target="_blank" rel="noopener" style={{
                          fontFamily: t.mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                          padding: '10px 14px', background: ink, color: paper, textDecoration: 'none',
                        }}>View sample · PDF · ↓</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── §6 CAPABILITY — instrument tiles with thumbs ───── */}
      <section style={{ padding: '72px 60px 72px', borderTop: `1.5px solid ${ink}`, background: paper2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, alignItems: 'flex-start' }}>
          <SectionMark n="6"/>
          <div>
            <div style={meta()}>Capability</div>
            <h2 style={{
              margin: '14px 0 0', fontFamily: t.serif, fontWeight: 400,
              fontSize: 60, lineHeight: 1, letterSpacing: '-0.025em', maxWidth: 1000,
            }}>
              Classes of equipment we put hands&nbsp;on.
            </h2>
          </div>
        </div>

        {/* filter / search bar */}
        <div style={{
          marginTop: 28, display: 'flex', alignItems: 'center', gap: 18,
          borderTop: `1.5px solid ${ink}`, borderBottom: `1px solid ${rule}`,
          padding: '14px 0',
        }}>
          <span style={{ fontFamily: t.mono, fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: dim }}>Filter ·</span>
          <input
            value={capFilter}
            onChange={(e) => setCapFilter(e.target.value)}
            placeholder="instrument, vendor, code…"
            style={{
              flex: '1 1 auto', minWidth: 0,
              border: 'none', outline: 'none', background: 'transparent',
              fontFamily: t.mono, fontSize: 15, color: ink, padding: '4px 0',
              borderBottom: `1px dashed ${rule}`,
            }}/>
          <span style={{ fontFamily: t.mono, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: dim }}>
            {(() => {
              const q = capFilter.trim().toLowerCase();
              const n = q ? C.instruments.filter((it) => (it.name + ' ' + it.id + ' ' + it.vendors).toLowerCase().includes(q)).length : C.instruments.length;
              return `${n} / ${C.instruments.length} classes`;
            })()}
          </span>
          {capFilter && (
            <button onClick={() => setCapFilter('')} style={{
              fontFamily: t.mono, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
              background: 'transparent', color: amberDeep, border: 'none', cursor: 'pointer', padding: 4,
            }}>Clear ✕</button>
          )}
        </div>

        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {C.instruments
            .filter((it) => {
              const q = capFilter.trim().toLowerCase();
              if (!q) return true;
              return (it.name + ' ' + it.id + ' ' + it.vendors).toLowerCase().includes(q);
            })
            .map((it) => (
            <div key={it.id} style={{
              border: `1px solid ${rule}`, background: paper, padding: 16,
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <window.TechPlate
                kind={({
                  LC: 'inst_rack', GC: 'inst_gc', MS: 'inst_ms',
                  NMR: 'inst_nmr', IR: 'inst_ir', EM: 'inst_em',
                  OM: 'inst_om', BR: 'inst_br', CF: 'inst_cf',
                  CS: 'inst_cs', SM: 'inst_sm', XR: 'inst_xr',
                })[it.id] || 'inst_rack'}
                ratio="4 / 3"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: t.serif, fontSize: 19, lineHeight: 1.15 }}>{it.name}</div>
                <span style={{ fontFamily: t.mono, fontSize: 11, color: amberDeep, letterSpacing: '0.16em' }}>{it.id}</span>
              </div>
              <div style={{ fontFamily: t.mono, fontSize: 10.5, color: dim, lineHeight: 1.6 }}>{it.vendors}</div>
            </div>
          ))}
          {(() => {
            const q = capFilter.trim().toLowerCase();
            const matches = q ? C.instruments.filter((it) => (it.name + ' ' + it.id + ' ' + it.vendors).toLowerCase().includes(q)) : C.instruments;
            if (matches.length === 0) {
              return (
                <div style={{
                  gridColumn: '1 / -1', padding: '40px 0', textAlign: 'center',
                  fontFamily: t.serif, fontStyle: 'italic', fontSize: 18, color: inkSoft,
                }}>
                  No class matches “{capFilter}”. Send the listing anyway — we travel.
                </div>
              );
            }
            return null;
          })()}
        </div>
      </section>

      {/* ─── §7 BRIEF / Application form ────────────────────── */}
      <section id="brief" style={{ padding: '88px 60px 72px', borderTop: `1.5px solid ${ink}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, alignItems: 'flex-start' }}>
          <SectionMark n="7"/>
          <div>
            <div style={meta()}>Brief us on a lot</div>
            <h2 style={{
              margin: '14px 0 0', fontFamily: t.serif, fontWeight: 400,
              fontSize: 76, lineHeight: 0.96, letterSpacing: '-0.03em', maxWidth: 1000,
            }}>
              Send the listing<br/>
              <span style={{ fontStyle: 'italic', fontWeight: 300 }}>URL.</span> We reply<br/>
              <span style={{ color: amberDeep }}>within one</span> working day.
            </h2>
          </div>
        </div>

        <div style={{
          marginTop: 44, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 36,
        }}>
          {/* FORM */}
          <window.MixBriefForm/>

          {/* ADDRESS + DETAILS */}
          <div>
            <window.TechPlate kind="tower" ratio="3 / 4" plate="08" caption="Office · CMA Building · 21/F"/>
            <div style={{
              marginTop: 14, border: `1.5px solid ${ink}`, padding: '22px 22px 26px',
              fontFamily: t.mono, fontSize: 12, lineHeight: 1.7, color: ink, background: paper,
            }}>
              <div style={{ ...meta(), color: dim, marginBottom: 10 }}>Registered office</div>
              <div style={{ fontFamily: t.serif, fontSize: 18, lineHeight: 1.35 }}>{C.legal.name}</div>
              <div style={{ marginTop: 12, fontSize: 12 }}>{C.legal.address}</div>
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                <span style={{ color: dim }}>CR No.</span><span>{C.legal.cr}</span>
                <span style={{ color: dim }}>BR No.</span><span>{C.legal.br}</span>
                <span style={{ color: dim }}>Incorporated</span><span>{C.legal.incorporated}</span>
                <span style={{ color: dim }}>Jurisdiction</span><span>HK SAR</span>
              </div>
              <div style={{
                marginTop: 20, paddingTop: 14, borderTop: `1px dashed ${rule}`,
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <a href={`mailto:${C.legal.email}`} style={{ color: ink, textDecoration: 'none' }}>
                  <span style={{ color: dim }}>Email&nbsp;·&nbsp;</span>{C.legal.email}
                </a>
                <a href={`https://${C.legal.web}`} style={{ color: ink, textDecoration: 'none' }}>
                  <span style={{ color: dim }}>Web&nbsp;·&nbsp;</span>{C.legal.web}
                </a>
                <div><span style={{ color: dim }}>Hours&nbsp;·&nbsp;</span>09:00–18:00 HKT, Mon–Fri</div>
                <div><span style={{ color: dim }}>Response&nbsp;·&nbsp;</span>≤ 1 working day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <footer style={{ borderTop: `1.5px solid ${ink}`, background: ink, color: paper }}>
        <div style={{
          padding: '64px 60px 32px',
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40,
        }}>
          <div>
            <W size={24} color={paper} accent={amber} captionColor="oklch(0.7 0.015 240)"/>
            <p style={{
              marginTop: 22, marginBottom: 0, maxWidth: 380,
              fontFamily: t.serif, fontSize: 16, lineHeight: 1.55, color: 'oklch(0.78 0.012 240)',
            }}>
              Independent pre-purchase diagnostics for second-hand laboratory instruments. Hong Kong SAR &middot; founded 2025.
            </p>
            <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#brief" style={{
                fontFamily: t.mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '12px 16px', background: amberDeep, color: paper, textDecoration: 'none',
              }}>Brief us &nbsp;→</a>
              <a href="sample-report.html" target="_blank" rel="noopener" style={{
                fontFamily: t.mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '12px 16px', border: `1.5px solid ${paper}`, color: paper, textDecoration: 'none',
              }}>Sample report .pdf &nbsp;↓</a>
            </div>
          </div>

          {[
            { h: 'Sections', links: [
              ['§1 Practice', '#'], ['§2 Field', '#'], ['§3 Protocol', '#'],
              ['§4 Record', '#'], ['§5 Capability', '#'], ['§7 Brief', '#brief'],
            ]},
            { h: 'Services', links: C.services.slice(0, 6).map(s => [s.title, '#']) },
            { h: 'Office', links: [
              [C.legal.email, `mailto:${C.legal.email}`],
              [C.legal.web, `https://${C.legal.web}`],
              ['Hong Kong SAR', '#'],
              [`CR ${C.legal.cr}`, '#'],
              [`BR ${C.legal.br}`, '#'],
            ]},
          ].map((col) => (
            <div key={col.h}>
              <div style={{
                fontFamily: t.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: amber, paddingBottom: 12, borderBottom: `1px solid oklch(0.30 0.015 240)`,
              }}>{col.h}</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} style={{
                    fontFamily: t.serif, fontSize: 14, color: 'oklch(0.82 0.012 240)', textDecoration: 'none',
                    lineHeight: 1.4,
                  }}>{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: '18px 60px 22px', borderTop: `1px solid oklch(0.30 0.015 240)`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          fontFamily: t.mono, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'oklch(0.68 0.015 240)',
        }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            <span>© 2026 {C.legal.name}</span>
            <span>{C.legal.address}</span>
          </div>
          <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
            <span>Document v.1.2 · 2026.05</span>
            <div style={{
              fontFamily: t.serif, fontStyle: 'italic', fontSize: 26,
              color: amber, transform: 'rotate(-3deg)',
            }}>S.T.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

window.MixImageLanding = MixImageLanding;
