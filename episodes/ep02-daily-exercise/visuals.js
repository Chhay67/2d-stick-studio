window.EP02_VISUALS = (function () {
  const INK = '#171717';
  const renderActorSVG = (config) => window.CharacterRig.renderActorSVG(config);
  function renderRustySpinalChairPropSVG(x = 210, groundY = 430) {
    const topY = groundY - 190;
    return `
      <g class="prop-rusty-spinal-chair" transform="translate(${x}, ${topY})">
        <!-- Rolling Ergonomic Chair Backrest & Cushion aligned flush with Seated Actor -->
        <rect x="-34" y="38" width="24" height="86" rx="9" fill="#CBD5E1" stroke="${INK}" stroke-width="2.5" />
        <rect x="-28" y="122" width="62" height="12" rx="5" fill="#94A3B8" stroke="${INK}" stroke-width="2.5" />
        <line x1="2" y1="134" x2="2" y2="184" stroke="${INK}" stroke-width="4" />
        <line x1="-26" y1="184" x2="30" y2="184" stroke="${INK}" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="-24" cy="189" r="5" fill="${INK}" />
        <circle cx="2" cy="189" r="5" fill="${INK}" />
        <circle cx="28" cy="189" r="5" fill="${INK}" />
        <!-- Glowing Coral Back & Neck Strain Lightning Bolts -->
        <g transform="translate(-64, 38)">
          <circle cx="0" cy="16" r="19" fill="#FEE2E2" stroke="#FA604E" stroke-width="2" stroke-dasharray="4 3" />
          <polyline points="-5,4 3,14 -3,16 6,28" fill="none" stroke="#FA604E" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
          <text x="0" y="48" text-anchor="middle" fill="#FA604E" font-family="var(--font-khmer)" font-size="10" font-weight="800">ឈឺចង្កេះ ⚡</text>
        </g>
        <!-- Rusty Motorbike Gear Badge -->
        <g transform="translate(-64, 118)">
          <circle cx="0" cy="15" r="16" fill="#FEF3C7" stroke="#D97706" stroke-width="2.2" />
          <circle cx="0" cy="15" r="6" fill="#92400E" />
          <line x1="-18" y1="15" x2="18" y2="15" stroke="#D97706" stroke-width="2.8" />
          <line x1="0" y1="-3" x2="0" y2="33" stroke="#D97706" stroke-width="2.8" />
          <text x="0" y="45" text-anchor="middle" fill="#92400E" font-family="var(--font-khmer)" font-size="10" font-weight="800">⚙️ ច្រេះចាប់</text>
        </g>
      </g>
    `;
  }

  /**
   * EP02 Stage Hero Prop 2: Giant 2D Body Battery Supercharger (Shot 02)
   */
  function renderBodyBatteryChargerPropSVG(x = 345, groundY = 430) {
    const topY = groundY - 196;
    return `
      <g class="prop-body-battery-charger" transform="translate(${x}, ${topY})">
        <!-- Battery Cap -->
        <rect x="28" y="-12" width="44" height="12" rx="4" fill="#171717" />
        <!-- Battery Outer Shell -->
        <rect x="0" y="0" width="100" height="186" rx="14" fill="#FFFFFF" stroke="${INK}" stroke-width="3.2" />
        <!-- 5 Charging Power Cells (Bottom Red -> Top Glowing Green) -->
        <rect x="10" y="144" width="80" height="30" rx="6" fill="#2FAA61" stroke="${INK}" stroke-width="2" />
        <rect x="10" y="109" width="80" height="30" rx="6" fill="#2FAA61" stroke="${INK}" stroke-width="2" />
        <rect x="10" y="74" width="80" height="30" rx="6" fill="#4ADE80" stroke="${INK}" stroke-width="2" />
        <rect x="10" y="39" width="80" height="30" rx="6" fill="#86EFAC" stroke="${INK}" stroke-width="2" />
        <rect x="10" y="10" width="80" height="24" rx="6" fill="#BBF7D0" stroke="#2FAA61" stroke-width="2" stroke-dasharray="5 3" />
        <!-- Central Lightning Bolt & Percentage -->
        <circle cx="50" cy="95" r="26" fill="#171717" stroke="#EABF42" stroke-width="2.5" />
        <text x="50" y="92" text-anchor="middle" fill="#EABF42" font-family="'Inter', sans-serif" font-size="14" font-weight="900">⚡95%</text>
        <text x="50" y="108" text-anchor="middle" fill="#FFFFFF" font-family="var(--font-khmer)" font-size="9.5" font-weight="700">សាកថ្មជីវិត</text>
        <!-- Flying Energy Spark Stream -->
        <path d="M 50 -14 C 50 -48, 86 -56, 120 -34" fill="none" stroke="#2FAA61" stroke-width="2.5" class="km-dashed-stream" />
      </g>
    `;
  }

  /**
   * EP02 Stage Hero Prop 3: Giant Leg Muscle Glucose Sponge (Shot 04)
   */
  function renderMuscleSpongePropSVG(x = 320, groundY = 430) {
    const topY = groundY - 195;
    return `
      <g class="prop-muscle-sponge" transform="translate(${x}, ${topY})">
        <!-- Curved Dashed Blood-Sugar Absorption Stream (---🍬-->) -->
        <path d="M -36 30 C 4 -18, 52 -18, 78 24" fill="none" stroke="#FA604E" stroke-width="2.8" class="km-dashed-stream" />
        <g>
          <rect x="-7" y="-7" width="14" height="14" rx="3" fill="#FFFFFF" stroke="#FA604E" stroke-width="2.2" />
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M -36 30 C 4 -18, 52 -18, 78 24" />
        </g>
        <!-- Muscle Sponge Body -->
        <rect x="12" y="28" width="136" height="154" rx="22" fill="#FEF08A" stroke="${INK}" stroke-width="3.2" />
        <!-- Sponge Pores Absorbing Sugar -->
        <circle cx="42" cy="60" r="10" fill="#EABF42" stroke="${INK}" stroke-width="1.8" />
        <circle cx="84" cy="54" r="7" fill="#EABF42" stroke="${INK}" stroke-width="1.8" />
        <circle cx="118" cy="68" r="11" fill="#EABF42" stroke="${INK}" stroke-width="1.8" />
        <circle cx="52" cy="100" r="8" fill="#2FAA61" fill-opacity="0.35" stroke="#1E7E45" stroke-width="1.8" />
        <circle cx="108" cy="104" r="9" fill="#2FAA61" fill-opacity="0.35" stroke="#1E7E45" stroke-width="1.8" />
        <!-- Label Banner inside Sponge -->
        <rect x="22" y="122" width="116" height="46" rx="10" fill="#2FAA61" stroke="${INK}" stroke-width="2.2" />
        <text x="80" y="141" text-anchor="middle" fill="#FFFFFF" font-family="var(--font-khmer)" font-size="11" font-weight="800">អេប៉ុងសាច់ដុំជើង</text>
        <text x="80" y="160" text-anchor="middle" fill="#FEF08A" font-family="'Inter', var(--font-khmer)" font-size="12.5" font-weight="900">បឺតស្ករ ⚡</text>
      </g>
    `;
  }


  function renderCharacterSheet() {
    const daraBase = { style: 'minimal', hair: 'short-spiky', headRadius: 28, torsoLength: 64, limbLength: 74, y: 266 };
      return `
        <rect x="0" y="0" width="960" height="540" fill="#F5F5F3" />
        <rect x="36" y="54" width="430" height="235" rx="12" fill="#FFFFFF" stroke="#171717" stroke-width="2" />
        <text x="56" y="82" fill="#171717" font-family="'Inter', sans-serif" font-size="13" font-weight="800">1. EP02 PROTAGONIST "វិចិត្រ" (STRETCH • DUMBBELL • RUNNER)</text>
        ${renderActorSVG({ ...daraBase, x: 118, angle: 'front', emotion: 'tired', gesture: 'stretch-arms' })}
        <text x="118" y="276" text-anchor="middle" fill="#FA604E" font-size="11" font-weight="700">FRONT (20% RUSTY)</text>

        ${renderActorSVG({ ...daraBase, x: 252, angle: 'three-quarter', emotion: 'determined', gesture: 'hold-dumbbell' })}
        <text x="252" y="276" text-anchor="middle" fill="#5D98E8" font-size="11" font-weight="700">3/4 (HOME DUMBBELL)</text>

        ${renderActorSVG({ ...daraBase, x: 386, angle: 'side', emotion: 'excited', gesture: 'jog-energetic' })}
        <text x="386" y="276" text-anchor="middle" fill="#2FAA61" font-size="11" font-weight="700">SIDE (95% JOGGER)</text>

        <rect x="494" y="54" width="430" height="235" rx="12" fill="#FFFFFF" stroke="#171717" stroke-width="2" />
        <text x="514" y="82" fill="#171717" font-family="'Inter', sans-serif" font-size="13" font-weight="800">2. EP02 CAST & HERO PROPS (គ្រូពេទ្យ សុភា • ពូសំណាង • អេប៉ុងសាច់ដុំ)</text>
        ${renderActorSVG({ ...daraBase, style: 'outfitted', hair: 'top-bun-glasses', outfit: 'teal-health', x: 568, emotion: 'calm', gesture: 'hold-water' })}
        <text x="568" y="276" text-anchor="middle" fill="#2FAA61" font-size="11" font-weight="700">គ្រូពេទ្យ សុភា</text>

        ${renderActorSVG({ ...daraBase, style: 'outfitted', hair: 'curly-clerk', outfit: 'blue-orange-bag', x: 695, emotion: 'excited', gesture: 'jog-energetic' })}
        <text x="695" y="276" text-anchor="middle" fill="#5D98E8" font-size="11" font-weight="700">ពូសំណាង (58yo)</text>

        <g transform="translate(775, 118) scale(0.62)">
          ${renderMuscleSpongePropSVG(0, 210)}
        </g>
        <text x="838" y="276" text-anchor="middle" fill="#1E7E45" font-size="11" font-weight="700">MUSCLE SPONGE</text>

        <rect x="36" y="306" width="888" height="190" rx="12" fill="#FFFFFF" stroke="#171717" stroke-width="2" />
        <text x="56" y="334" fill="#171717" font-family="'Inter', sans-serif" font-size="13" font-weight="800">3. CORE EMOTION SAMPLES FOR "វិចិត្រ" (FROM 15-EMOTION MATRIX)</text>
        ${['tired', 'worried', 'surprised', 'thinking', 'determined', 'happy', 'proud']
          .map((emo, i) => {
            const cx = 105 + i * 124;
            return `
              ${renderActorSVG({ ...daraBase, x: cx, y: 472, headRadius: 26, emotion: emo, behindCounter: true })}
              <text x="${cx}" y="482" text-anchor="middle" fill="#171717" font-family="'Inter', sans-serif" font-size="11" font-weight="700">${emo.toUpperCase()}</text>
            `;
          })
          .join('')}
      `;
  }
  function renderHeroProps(shot, elapsed, { aspect } = {}) {
    const renderers = {
      'ep02-rusty-sitting': () => renderRustySpinalChairPropSVG(210, 430),
      'ep02-two-percent-rule': () => renderBodyBatteryChargerPropSVG(332, aspect === '9:16' ? 410 : 430),
      'ep02-muscle-sponge': () => renderMuscleSpongePropSVG(318, 430)
    };
    return renderers[shot.sceneType]?.() || '';
  }
  return { renderHeroProps, renderCharacterSheet, renderRustySpinalChairPropSVG, renderBodyBatteryChargerPropSVG, renderMuscleSpongePropSVG };
})();
