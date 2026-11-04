/**
 * Antigravity Unified Master Engine v2.0 — Character Rig, 15-Emotion Matrix, Character Sheet & 12 Locations
 * Merges:
 * - Reference Visual Art Style (Ref Images 1–5 props, floating graphics, Minimalist & Outfitted actors)
 * - Parametric Anatomy Calibration (Head Radius, Torso Length, Limb Length, Gesture Amplitude, Head Tilt, RMS Mouth Open)
 */

window.CharacterRig = (function () {
  const INK = '#171717';
  const WHITE = '#FFFFFF';
  const NEUTRAL = '#E5E7EB';
  const LINE = '#C5C9CE';

  /**
   * Master Design System v2.0 — 15 Coordinated Emotion Presets
   */
  const EMOTION_PRESETS = {
    neutral:     { brows: 'neutral',   eyes: 'normal',   mouth: 'neutral',      tilt: 0,  postureY: 0,  blush: false, defaultGesture: 'idle' },
    happy:       { brows: 'happy',     eyes: 'normal',   mouth: 'smile',        tilt: 2,  postureY: 0,  blush: false, defaultGesture: 'open-welcome' },
    sad:         { brows: 'sad',       eyes: 'droopy',   mouth: 'frown',        tilt: -6, postureY: 5,  blush: false, defaultGesture: 'sad-droop' },
    worried:     { brows: 'worried',   eyes: 'normal',   mouth: 'wavy-worried', tilt: -3, postureY: 2,  blush: false, defaultGesture: 'sad-droop' },
    surprised:   { brows: 'surprised', eyes: 'wide',     mouth: 'open-o',       tilt: -2, postureY: -3, blush: false, defaultGesture: 'surprised-hands' },
    confused:    { brows: 'confused',  eyes: 'normal',   mouth: 'tilted',       tilt: 8,  postureY: 0,  blush: false, defaultGesture: 'think' },
    thinking:    { brows: 'thinking',  eyes: 'look-up',  mouth: 'small-line',   tilt: 5,  postureY: 0,  blush: false, defaultGesture: 'think' },
    excited:     { brows: 'surprised', eyes: 'wide',     mouth: 'laugh',        tilt: 3,  postureY: -4, blush: true,  defaultGesture: 'celebrate' },
    angry:       { brows: 'angry',     eyes: 'narrow',   mouth: 'grit',         tilt: 4,  postureY: 2,  blush: false, defaultGesture: 'hips-firm' },
    tired:       { brows: 'sad',       eyes: 'half-lid', mouth: 'open-sigh',    tilt: -8, postureY: 8,  blush: false, defaultGesture: 'sad-droop' },
    embarrassed: { brows: 'worried',   eyes: 'normal',   mouth: 'wavy-small',   tilt: -5, postureY: 2,  blush: true,  defaultGesture: 'neck-shy' },
    proud:       { brows: 'happy',     eyes: 'normal',   mouth: 'smile-wide',   tilt: 4,  postureY: -2, blush: false, defaultGesture: 'hips-firm' },
    scared:      { brows: 'scared',    eyes: 'tiny',     mouth: 'wavy-open',    tilt: -5, postureY: 4,  blush: false, defaultGesture: 'stress' },
    calm:        { brows: 'neutral',   eyes: 'serene',   mouth: 'smile',        tilt: 1,  postureY: 0,  blush: false, defaultGesture: 'idle' },
    determined:  { brows: 'focused',   eyes: 'normal',   mouth: 'firm-smile',   tilt: 2,  postureY: -1, blush: false, defaultGesture: 'fist-pump' }
  };

  /**
   * Renders an expressive 2D stick-figure actor with parametric anatomy & coordinated emotion
   */
  function renderActorSVG(config) {
    const x = config.x ?? 245;
    const groundY = config.y ?? 430;
    const r = config.headRadius ?? 34;
    const torsoLen = config.torsoLength ?? 82;
    const limbLen = config.limbLength ?? 96;
    const amp = config.gestureAmplitude ?? 1.0;
    const headTiltOffset = config.headTiltOffset ?? 0;
    const mouthOpen = config.mouthOpen ?? 0; // 0..1 continuous RMS or cadence value
    const phase = config.phase ?? 0;
    const style = config.style ?? 'minimal'; // 'minimal' | 'outfitted'
    const angle = config.angle ?? 'front';   // 'front' | 'three-quarter' | 'side'

    const emotionKey = config.emotion && EMOTION_PRESETS[config.emotion] ? config.emotion : null;
    const preset = emotionKey ? EMOTION_PRESETS[emotionKey] : EMOTION_PRESETS.neutral;

    const activeBrows = config.eyebrows ?? preset.brows;
    const activeEyes = config.eyes ?? preset.eyes;
    const activeMouth = config.mouth ?? preset.mouth;
    const activeGesture = config.gesture ?? preset.defaultGesture;

    // Subtle idle breathing, walk-in entrance & jump-celebrate motion modifiers
    const walkInProg = config.walkInProgress ?? 1;
    const isWalkingIn = walkInProg < 0.99 && !config.behindCounter && activeGesture !== 'sit';
    const isJumping = activeGesture === 'jump-celebrate';
    const jumpOffsetY = isJumping ? -Math.abs(Math.sin(phase * 4.2)) * 22 * amp : 0;
    const breathY = Math.sin(phase * 1.8) * 1.8 + (preset.postureY || 0) + jumpOffsetY;
    const walkShiftX =
      activeGesture === 'walk'
        ? Math.sin(phase * 3.5) * 14 * amp
        : isWalkingIn
          ? -(1 - walkInProg) * 58
          : 0;
    const nodRotate = activeGesture === 'nod' ? Math.sin(phase * 4.5) * 7 * amp : 0;
    const shakeShiftX = activeGesture === 'shake-head' ? Math.sin(phase * 5.0) * 6 * amp : 0;
    const actorX = x + walkShiftX;

    const isSitting = activeGesture === 'sit';
    const hipY = groundY - (config.behindCounter ? 0 : isSitting ? limbLen * 0.7 : limbLen) + jumpOffsetY * 0.85;
    const shoulderY = hipY - torsoLen + (breathY - jumpOffsetY * 0.85);
    const neckTopY = shoulderY - 10;
    const headCenterY = neckTopY - r + 2;

    // Angle & Head Look Shift
    let faceShiftX = shakeShiftX;
    let headRotate = preset.tilt + nodRotate + headTiltOffset;

    if (angle === 'three-quarter') {
      faceShiftX += 8;
    } else if (angle === 'side') {
      faceShiftX += 15;
    } else if (config.headLook === 'right') {
      faceShiftX += 5;
      headRotate += 2.5;
    } else if (config.headLook === 'left') {
      faceShiftX -= 5;
      headRotate -= 2.5;
    } else if (config.headLook === 'tilt-right') {
      faceShiftX += 3;
      headRotate += 6;
    } else if (config.headLook === 'tilt-left') {
      faceShiftX -= 3;
      headRotate -= 6;
    }

    // Arm Articulation Scaled by Limb Length & Gesture Amplitude
    const armScale = limbLen / 96;
    const wave = Math.sin(phase * 3.0) * 6 * amp;
    let leftElbow = { x: actorX - 18 * armScale, y: shoulderY + 38 * armScale };
    let leftHand = { x: actorX - 24 * armScale, y: shoulderY + 76 * armScale };
    let rightElbow = { x: actorX + 18 * armScale, y: shoulderY + 38 * armScale };
    let rightHand = { x: actorX + 24 * armScale, y: shoulderY + 76 * armScale };

    switch (activeGesture) {
      case 'open-welcome':
        leftElbow = { x: actorX - 24 * armScale, y: shoulderY + 34 * armScale };
        leftHand = { x: actorX - (48 + 12 * amp) * armScale, y: shoulderY + 20 * armScale + wave * 0.5 };
        rightElbow = { x: actorX + 24 * armScale, y: shoulderY + 34 * armScale };
        rightHand = { x: actorX + (52 + 14 * amp) * armScale, y: shoulderY + 18 * armScale - wave * 0.5 };
        break;
      case 'sad-droop':
        leftElbow = { x: actorX - 14 * armScale, y: shoulderY + 40 * armScale };
        leftHand = { x: actorX - 20 * armScale, y: shoulderY + 78 * armScale };
        rightElbow = { x: actorX + 14 * armScale, y: shoulderY + 40 * armScale };
        rightHand = { x: actorX + 20 * armScale, y: shoulderY + 78 * armScale };
        break;
      case 'raise-left-hand':
        leftElbow = { x: actorX - 36 * armScale, y: shoulderY + 12 * armScale };
        leftHand = { x: actorX - 48 * armScale, y: shoulderY - 26 * armScale * amp + wave * 0.6 };
        rightElbow = { x: actorX + 12 * armScale, y: shoulderY + 42 * armScale };
        rightHand = { x: actorX + 14 * armScale, y: shoulderY + 78 * armScale };
        break;
      case 'point-right':
        leftElbow = { x: actorX - 18 * armScale, y: shoulderY + 40 * armScale };
        leftHand = { x: actorX - 24 * armScale, y: shoulderY + 76 * armScale };
        rightElbow = { x: actorX + 36 * armScale, y: shoulderY + 12 * armScale };
        rightHand = { x: actorX + (64 + 16 * amp) * armScale, y: shoulderY - 10 * armScale + wave * 0.6 };
        break;
      case 'explain':
        leftElbow = { x: actorX - 30 * armScale, y: shoulderY + 28 * armScale };
        leftHand = { x: actorX - (44 + 12 * amp) * armScale, y: shoulderY + 12 * armScale + wave * 0.6 };
        rightElbow = { x: actorX + 32 * armScale, y: shoulderY + 26 * armScale };
        rightHand = { x: actorX + (48 + 12 * amp) * armScale, y: shoulderY + 8 * armScale - wave * 0.6 };
        break;
      case 'think':
        leftElbow = { x: actorX - 20 * armScale, y: shoulderY + 40 * armScale };
        leftHand = { x: actorX + 8 * armScale, y: shoulderY + 38 * armScale };
        rightElbow = { x: actorX + 30 * armScale, y: shoulderY + 24 * armScale };
        rightHand = { x: actorX + 10 + faceShiftX, y: headCenterY + r - 3 };
        break;
      case 'celebrate':
      case 'jump-celebrate':
        leftElbow = { x: actorX - 34 * armScale, y: shoulderY - 10 * armScale };
        leftHand = { x: actorX - 52 * armScale, y: shoulderY - 48 * armScale * amp + wave };
        rightElbow = { x: actorX + 34 * armScale, y: shoulderY - 10 * armScale };
        rightHand = { x: actorX + 52 * armScale, y: shoulderY - 48 * armScale * amp - wave };
        break;
      case 'surprised-hands':
        leftElbow = { x: actorX - 32 * armScale, y: shoulderY + 16 * armScale };
        leftHand = { x: actorX - 42 * armScale, y: shoulderY - 12 * armScale };
        rightElbow = { x: actorX + 32 * armScale, y: shoulderY + 16 * armScale };
        rightHand = { x: actorX + 42 * armScale, y: shoulderY - 12 * armScale };
        break;
      case 'hips-firm':
        leftElbow = { x: actorX - 34 * armScale, y: shoulderY + 34 * armScale };
        leftHand = { x: actorX - 12, y: hipY - 12 };
        rightElbow = { x: actorX + 34 * armScale, y: shoulderY + 34 * armScale };
        rightHand = { x: actorX + 12, y: hipY - 12 };
        break;
      case 'fist-pump':
        leftElbow = { x: actorX - 24 * armScale, y: shoulderY + 36 * armScale };
        leftHand = { x: actorX - 16, y: hipY - 8 };
        rightElbow = { x: actorX + 36 * armScale, y: shoulderY + 14 * armScale };
        rightHand = { x: actorX + 42 * armScale, y: shoulderY - 22 * armScale + wave * 0.4 };
        break;
      case 'neck-shy':
        leftElbow = { x: actorX - 18 * armScale, y: shoulderY + 40 * armScale };
        leftHand = { x: actorX - 20 * armScale, y: shoulderY + 74 * armScale };
        rightElbow = { x: actorX + 34 * armScale, y: shoulderY + 4 * armScale };
        rightHand = { x: actorX + 14, y: headCenterY + r - 8 };
        break;
      case 'hold-phone':
      case 'hold-coffee':
        leftElbow = { x: actorX - 18 * armScale, y: shoulderY + 40 * armScale };
        leftHand = { x: actorX - 22 * armScale, y: shoulderY + 74 * armScale };
        rightElbow = { x: actorX + 28 * armScale, y: shoulderY + 30 * armScale };
        rightHand = { x: actorX + 44 * armScale, y: shoulderY + 10 * armScale };
        break;
      case 'stress':
        leftElbow = { x: actorX - 38 * armScale, y: shoulderY - 6 * armScale };
        leftHand = { x: actorX - r + 4, y: headCenterY - 6 };
        rightElbow = { x: actorX + 38 * armScale, y: shoulderY - 6 * armScale };
        rightHand = { x: actorX + r - 4, y: headCenterY - 6 };
        break;
      case 'walk':
        const armSwing = Math.sin(phase * 3.5) * 22 * amp;
        leftElbow = { x: actorX - 16 + armSwing * 0.4, y: shoulderY + 36 * armScale };
        leftHand = { x: actorX - 22 + armSwing, y: shoulderY + 70 * armScale };
        rightElbow = { x: actorX + 16 - armSwing * 0.4, y: shoulderY + 36 * armScale };
        rightHand = { x: actorX + 22 - armSwing, y: shoulderY + 70 * armScale };
        break;
      case 'idle':
      case 'counter-idle':
      default:
        leftElbow = { x: actorX - 15 * armScale, y: shoulderY + 38 * armScale };
        leftHand = { x: actorX - 18 * armScale, y: shoulderY + 74 * armScale };
        rightElbow = { x: actorX + 15 * armScale, y: shoulderY + 38 * armScale };
        rightHand = { x: actorX + 18 * armScale, y: shoulderY + 74 * armScale };
        break;
    }

    // Legs & Locomotion
    let legsSVG = '';
    if (!config.behindCounter) {
      if (isSitting) {
        legsSVG = `
          <ellipse cx="${actorX + 10}" cy="${groundY + 5}" rx="36" ry="5.5" fill="${NEUTRAL}" />
          <line x1="${actorX - 14}" y1="${hipY + 4}" x2="${actorX + 14}" y2="${hipY + 4}" stroke="#64748B" stroke-width="4" stroke-linecap="round" />
          <line x1="${actorX}" y1="${hipY + 4}" x2="${actorX}" y2="${groundY}" stroke="#64748B" stroke-width="3.5" />
          <polyline points="${actorX - 4},${hipY} ${actorX + 24},${hipY + 6} ${actorX + 24},${groundY}" class="rig-stroke" />
          <polyline points="${actorX + 4},${hipY} ${actorX + 34},${hipY + 6} ${actorX + 34},${groundY}" class="rig-stroke" />
        `;
      } else {
        const stride =
          activeGesture === 'walk' || isWalkingIn
            ? Math.sin(phase * 4.2) * 20 * amp
            : isJumping
              ? 14
              : 0;
        const footGroundY = groundY + (isJumping ? jumpOffsetY * 0.65 : 0);
        const leftFootX = actorX - 18 - stride;
        const rightFootX = actorX + 18 + stride;
        const shadowRx = isJumping ? 28 : 38;
        if (style === 'minimal') {
          legsSVG = `
            <ellipse cx="${actorX}" cy="${groundY + 5}" rx="${shadowRx}" ry="6" fill="${NEUTRAL}" />
            <line x1="${actorX}" y1="${hipY}" x2="${leftFootX}" y2="${footGroundY}" class="rig-stroke" />
            <line x1="${actorX}" y1="${hipY}" x2="${rightFootX}" y2="${footGroundY}" class="rig-stroke" />
            <line x1="${leftFootX - 9}" y1="${footGroundY}" x2="${leftFootX + 4}" y2="${footGroundY}" class="rig-stroke" />
            <line x1="${rightFootX - 4}" y1="${footGroundY}" x2="${rightFootX + 9}" y2="${footGroundY}" class="rig-stroke" />
          `;
        } else {
          legsSVG = `
            <ellipse cx="${actorX}" cy="${groundY + 5}" rx="${shadowRx - 4}" ry="5.5" fill="rgba(23,23,23,0.12)" />
            <line x1="${actorX - 4}" y1="${hipY}" x2="${leftFootX}" y2="${footGroundY}" class="rig-stroke" />
            <line x1="${actorX + 4}" y1="${hipY}" x2="${rightFootX}" y2="${footGroundY}" class="rig-stroke" />
            <ellipse cx="${leftFootX - 5}" cy="${footGroundY}" rx="9" ry="4" fill="${WHITE}" class="rig-stroke-filled" />
            <ellipse cx="${rightFootX + 5}" cy="${footGroundY}" rx="9" ry="4" fill="${WHITE}" class="rig-stroke-filled" />
          `;
        }
      }
    }

    let propSVG = '';
    if (activeGesture === 'hold-phone') {
      propSVG = `<rect x="${rightHand.x - 4}" y="${rightHand.y - 16}" width="12" height="20" rx="2.5" fill="#1E293B" stroke="${INK}" stroke-width="1.8" transform="rotate(-12, ${rightHand.x}, ${rightHand.y})" />`;
    } else if (activeGesture === 'hold-coffee') {
      const cx = rightHand.x + 2;
      const cy = rightHand.y - 10;
      propSVG = `
        <g transform="translate(${cx}, ${cy})">
          <line x1="0" y1="-16" x2="5" y2="-30" stroke="#2FAA61" stroke-width="2.5" stroke-linecap="round" />
          <path d="M -9 -10 A 9 7 0 0 1 9 -10 Z" fill="#F8FAFC" stroke="${INK}" stroke-width="1.8" />
          <polygon points="-9,-10 9,-10 7,14 -7,14" fill="#7C4D2B" stroke="${INK}" stroke-width="1.8" />
          <polygon points="-7.6,4 7.6,4 7,14 -7,14" fill="#FEF3C7" stroke="${INK}" stroke-width="1.4" />
        </g>
      `;
    }

    // Torso & Outfit Rendering
    let torsoSVG = '';
    const torsoWidthScale = angle === 'side' ? 0.72 : angle === 'three-quarter' ? 0.88 : 1.0;
    const hw = Math.round(13 * torsoWidthScale);

    if (style === 'minimal') {
      torsoSVG = `
        <line x1="${actorX}" y1="${neckTopY}" x2="${actorX}" y2="${hipY}" class="rig-stroke" />
        <polyline points="${actorX},${shoulderY + 4} ${leftElbow.x},${leftElbow.y} ${leftHand.x},${leftHand.y}" class="rig-stroke" />
        <polyline points="${actorX},${shoulderY + 4} ${rightElbow.x},${rightElbow.y} ${rightHand.x},${rightHand.y}" class="rig-stroke" />
        ${propSVG}
      `;
    } else {
      const outfitType = config.outfit ?? 'blue-orange-bag';
      if (outfitType === 'olive-clerk') {
        torsoSVG = `
          <path d="M ${actorX - hw} ${shoulderY} C ${actorX - hw - 4} ${shoulderY + 28}, ${actorX - hw - 2} ${hipY - 8}, ${actorX - 7} ${hipY}
                   L ${actorX + 7} ${hipY} C ${actorX + hw + 2} ${hipY - 8}, ${actorX + hw + 4} ${shoulderY + 28}, ${actorX + hw} ${shoulderY} Z"
                fill="#556B2F" class="rig-stroke-filled" />
          <line x1="${actorX + faceShiftX * 0.3}" y1="${shoulderY}" x2="${actorX + faceShiftX * 0.3}" y2="${hipY}" stroke="${WHITE}" stroke-width="2" />
          <rect x="${actorX - 3 + faceShiftX * 0.3}" y="${shoulderY + 26}" width="6" height="9" rx="1" fill="${WHITE}" />
        `;
      } else if (outfitType === 'teal-health') {
        torsoSVG = `
          <polyline points="${actorX - 6},${shoulderY + 4} ${leftElbow.x},${leftElbow.y} ${leftHand.x},${leftHand.y}" class="rig-stroke" />
          <circle cx="${leftHand.x}" cy="${leftHand.y}" r="4.5" fill="${WHITE}" class="rig-stroke-filled" />
          <path d="M ${actorX - hw} ${shoulderY} C ${actorX - hw - 4} ${shoulderY + 28}, ${actorX - hw - 2} ${hipY - 8}, ${actorX - 7} ${hipY}
                   L ${actorX + 7} ${hipY} C ${actorX + hw + 2} ${hipY - 8}, ${actorX + hw + 4} ${shoulderY + 28}, ${actorX + hw} ${shoulderY} Z"
                fill="#2FAA61" class="rig-stroke-filled" />
          <rect x="${actorX - 4 + faceShiftX * 0.25}" y="${shoulderY + 2}" width="8" height="${hipY - shoulderY - 6}" fill="${WHITE}" />
          <polyline points="${actorX + 8},${shoulderY + 8} ${rightElbow.x},${rightElbow.y} ${rightHand.x},${rightHand.y}" class="rig-stroke" />
          <circle cx="${rightHand.x}" cy="${rightHand.y}" r="4.5" fill="${WHITE}" class="rig-stroke-filled" />
          ${propSVG}
        `;
      } else if (outfitType === 'barista-apron' || outfitType === 'black-vest') {
        const vestColor = outfitType === 'barista-apron' ? '#7C4D2B' : '#1F2421';
        torsoSVG = `
          <path d="M ${actorX - hw} ${shoulderY + 4} C ${actorX - hw - 3} ${shoulderY + 30}, ${actorX - hw - 2} ${hipY - 6}, ${actorX - 7} ${hipY}
                   L ${actorX + 7} ${hipY} C ${actorX + hw + 2} ${hipY - 6}, ${actorX + hw + 3} ${shoulderY + 30}, ${actorX + hw} ${shoulderY + 4} Z"
                fill="${vestColor}" class="rig-stroke-filled" />
          <line x1="${actorX + faceShiftX * 0.3}" y1="${shoulderY + 6}" x2="${actorX + faceShiftX * 0.3}" y2="${hipY}" stroke="${WHITE}" stroke-width="3.5" />
        `;
      } else {
        torsoSVG = `
          <polyline points="${actorX - 6},${shoulderY + 4} ${leftElbow.x},${leftElbow.y} ${leftHand.x},${leftHand.y}" class="rig-stroke" />
          <circle cx="${leftHand.x}" cy="${leftHand.y}" r="4.5" fill="${WHITE}" class="rig-stroke-filled" />
          <path d="M ${actorX - hw} ${shoulderY} C ${actorX - hw - 4} ${shoulderY + 28}, ${actorX - hw - 3} ${hipY - 8}, ${actorX - 6} ${hipY}
                   L ${actorX + 6} ${hipY} C ${actorX + hw + 3} ${hipY - 8}, ${actorX + hw + 4} ${shoulderY + 28}, ${actorX + hw} ${shoulderY} Z"
                fill="#6BA2E6" class="rig-stroke-filled" />
          <rect x="${actorX - 4 + faceShiftX * 0.25}" y="${shoulderY + 2}" width="8" height="${hipY - shoulderY - 6}" fill="#F28C5E" />
          <line x1="${actorX + 6}" y1="${shoulderY + 6}" x2="${actorX - 12}" y2="${hipY - 18}" stroke="#8B5E3C" stroke-width="2.5" />
          <rect x="${actorX - 18}" y="${hipY - 24}" width="13" height="11" rx="4" fill="#A47148" stroke="${INK}" stroke-width="2" />
          <polyline points="${actorX + 8},${shoulderY + 8} ${rightElbow.x},${rightElbow.y} ${rightHand.x},${rightHand.y}" class="rig-stroke" />
          <circle cx="${rightHand.x}" cy="${rightHand.y}" r="4.5" fill="${WHITE}" class="rig-stroke-filled" />
          ${propSVG}
        `;
      }
    }

    // Facial Coordinates
    const eyeY = headCenterY - 2;
    const leftEyeX = angle === 'side' ? actorX + 10 : actorX - 9 + faceShiftX;
    const rightEyeX = angle === 'side' ? actorX + 16 : actorX + 9 + faceShiftX;

    let eyesSVG = '';
    const renderSingleEye = (cx, cy) => {
      if (config.isBlinking) {
        return `<line x1="${cx - 4}" y1="${cy}" x2="${cx + 4}" y2="${cy}" class="rig-stroke" />`;
      }
      switch (activeEyes) {
        case 'wide':
          return `<circle cx="${cx}" cy="${cy}" r="4.3" fill="${INK}" /><circle cx="${cx - 1.2}" cy="${cy - 1.2}" r="1.2" fill="${WHITE}" />`;
        case 'tiny':
          return `<circle cx="${cx}" cy="${cy}" r="2.1" fill="${INK}" />`;
        case 'look-up':
          return `<circle cx="${cx + 1}" cy="${cy - 2}" r="3.2" fill="${INK}" />`;
        case 'narrow':
          return `<line x1="${cx - 4}" y1="${cy}" x2="${cx + 4}" y2="${cy}" class="rig-stroke" /><circle cx="${cx}" cy="${cy + 1}" r="2.2" fill="${INK}" />`;
        case 'half-lid':
        case 'droopy':
          return `
            <path d="M ${cx - 4} ${cy} A 3.4 3.4 0 0 0 ${cx + 4} ${cy} Z" fill="${INK}" />
            <line x1="${cx - 4.5}" y1="${cy}" x2="${cx + 4.5}" y2="${cy}" class="rig-stroke" />
          `;
        case 'serene':
          return `<path d="M ${cx - 4} ${cy + 1} Q ${cx} ${cy - 3} ${cx + 4} ${cy + 1}" class="rig-stroke" />`;
        case 'normal':
        default:
          return `<circle cx="${cx}" cy="${cy}" r="3.2" fill="${INK}" />`;
      }
    };

    eyesSVG =
      angle === 'side'
        ? renderSingleEye(rightEyeX, eyeY)
        : renderSingleEye(leftEyeX, eyeY) + renderSingleEye(rightEyeX, eyeY);

    const blushSVG =
      preset.blush && angle !== 'side'
        ? `
          <ellipse cx="${leftEyeX - 5}" cy="${eyeY + 6.5}" rx="4" ry="2.2" fill="#FA604E" opacity="0.45" />
          <ellipse cx="${rightEyeX + 5}" cy="${eyeY + 6.5}" rx="4" ry="2.2" fill="#FA604E" opacity="0.45" />
        `
        : '';

    const browY = eyeY - 10;
    let browsSVG = '';
    if (angle === 'side') {
      browsSVG = `<line x1="${rightEyeX - 5}" y1="${browY - 1}" x2="${rightEyeX + 4}" y2="${browY + 1}" class="rig-stroke" />`;
    } else {
      switch (activeBrows) {
        case 'worried':
        case 'sad':
          browsSVG = `
            <line x1="${leftEyeX - 6}" y1="${browY + 2}" x2="${leftEyeX + 4}" y2="${browY - 2}" class="rig-stroke" />
            <line x1="${rightEyeX - 4}" y1="${browY - 2}" x2="${rightEyeX + 6}" y2="${browY + 2}" class="rig-stroke" />
          `;
          break;
        case 'scared':
          browsSVG = `
            <line x1="${leftEyeX - 6}" y1="${browY + 1}" x2="${leftEyeX + 4}" y2="${browY - 5}" class="rig-stroke" />
            <line x1="${rightEyeX - 4}" y1="${browY - 5}" x2="${rightEyeX + 6}" y2="${browY + 1}" class="rig-stroke" />
          `;
          break;
        case 'angry':
          browsSVG = `
            <line x1="${leftEyeX - 6}" y1="${browY - 3}" x2="${leftEyeX + 5}" y2="${browY + 3}" class="rig-stroke" />
            <line x1="${rightEyeX - 5}" y1="${browY + 3}" x2="${rightEyeX + 6}" y2="${browY - 3}" class="rig-stroke" />
          `;
          break;
        case 'focused':
        case 'thinking':
          browsSVG = `
            <line x1="${leftEyeX - 5}" y1="${browY - 1}" x2="${leftEyeX + 5}" y2="${browY + 2}" class="rig-stroke" />
            <line x1="${rightEyeX - 5}" y1="${browY + 2}" x2="${rightEyeX + 5}" y2="${browY - 1}" class="rig-stroke" />
          `;
          break;
        case 'confused':
          browsSVG = `
            <line x1="${leftEyeX - 5}" y1="${browY + 2}" x2="${leftEyeX + 5}" y2="${browY + 1}" class="rig-stroke" />
            <path d="M ${rightEyeX - 5} ${browY - 2} Q ${rightEyeX} ${browY - 8} ${rightEyeX + 5} ${browY - 1}" class="rig-stroke" />
          `;
          break;
        case 'surprised':
          browsSVG = `
            <path d="M ${leftEyeX - 5} ${browY - 2} Q ${leftEyeX} ${browY - 7} ${leftEyeX + 5} ${browY - 2}" class="rig-stroke" />
            <path d="M ${rightEyeX - 5} ${browY - 2} Q ${rightEyeX} ${browY - 7} ${rightEyeX + 5} ${browY - 2}" class="rig-stroke" />
          `;
          break;
        case 'curious':
          browsSVG = `
            <path d="M ${leftEyeX - 5} ${browY} Q ${leftEyeX} ${browY - 5} ${leftEyeX + 5} ${browY}" class="rig-stroke" />
            <path d="M ${rightEyeX - 5} ${browY - 2} Q ${rightEyeX} ${browY - 7} ${rightEyeX + 5} ${browY - 1}" class="rig-stroke" />
          `;
          break;
        case 'happy':
          browsSVG = `
            <path d="M ${leftEyeX - 5} ${browY} Q ${leftEyeX} ${browY - 4} ${leftEyeX + 5} ${browY}" class="rig-stroke" />
            <path d="M ${rightEyeX - 5} ${browY} Q ${rightEyeX} ${browY - 4} ${rightEyeX + 5} ${browY}" class="rig-stroke" />
          `;
          break;
        case 'neutral':
        default:
          browsSVG = `
            <line x1="${leftEyeX - 5}" y1="${browY}" x2="${leftEyeX + 4}" y2="${browY}" class="rig-stroke" />
            <line x1="${rightEyeX - 4}" y1="${browY}" x2="${rightEyeX + 5}" y2="${browY}" class="rig-stroke" />
          `;
          break;
      }
    }

    // Mouth Rendering (Supports Continuous WebAudio RMS / Syllable Cadence + 15 Emotion Shapes)
    const mouthX = angle === 'side' ? actorX + 14 : actorX + faceShiftX;
    const mouthY = headCenterY + 11;
    let mouthSVG = '';

    if (mouthOpen > 0.16) {
      const h = 2.5 + mouthOpen * 7.5;
      mouthSVG = `<path d="M ${mouthX - 7} ${mouthY - 1} Q ${mouthX} ${mouthY + h} ${mouthX + 7} ${mouthY - 1} Q ${mouthX} ${mouthY - h * 0.25} ${mouthX - 7} ${mouthY - 1} Z" fill="${INK}" />`;
    } else {
      switch (activeMouth) {
        case 'wavy-worried':
          mouthSVG = `<path d="M ${mouthX - 9} ${mouthY + 1} Q ${mouthX - 4.5} ${mouthY - 4} ${mouthX} ${mouthY + 1} T ${mouthX + 9} ${mouthY + 1}" class="rig-stroke" />`;
          break;
        case 'wavy-small':
          mouthSVG = `<path d="M ${mouthX - 6} ${mouthY + 1} Q ${mouthX - 3} ${mouthY - 3} ${mouthX} ${mouthY + 1} T ${mouthX + 6} ${mouthY + 1}" class="rig-stroke" />`;
          break;
        case 'wavy-open':
          mouthSVG = `<ellipse cx="${mouthX}" cy="${mouthY + 2}" rx="6" ry="4.5" fill="none" class="rig-stroke" />`;
          break;
        case 'frown':
          mouthSVG = `<path d="M ${mouthX - 7} ${mouthY + 3} Q ${mouthX} ${mouthY - 4} ${mouthX + 7} ${mouthY + 3}" class="rig-stroke" />`;
          break;
        case 'grit':
          mouthSVG = `<rect x="${mouthX - 7}" y="${mouthY - 2}" width="14" height="5" rx="2" fill="${WHITE}" class="rig-stroke" />`;
          break;
        case 'tilted':
          mouthSVG = `<line x1="${mouthX - 6}" y1="${mouthY + 2}" x2="${mouthX + 5}" y2="${mouthY - 2}" class="rig-stroke" />`;
          break;
        case 'small-line':
          mouthSVG = `<line x1="${mouthX - 4}" y1="${mouthY + 1}" x2="${mouthX + 4}" y2="${mouthY + 1}" class="rig-stroke" />`;
          break;
        case 'open-o':
        case 'open-sigh':
          mouthSVG = `<circle cx="${mouthX}" cy="${mouthY + 1}" r="3.6" fill="${INK}" />`;
          break;
        case 'laugh':
          mouthSVG = `<path d="M ${mouthX - 8} ${mouthY - 2} Q ${mouthX} ${mouthY + 10} ${mouthX + 8} ${mouthY - 2} Z" fill="${INK}" />`;
          break;
        case 'smile-wide':
        case 'firm-smile':
          mouthSVG = `<path d="M ${mouthX - 9} ${mouthY - 2} Q ${mouthX} ${mouthY + 7} ${mouthX + 9} ${mouthY - 2}" class="rig-stroke" />`;
          break;
        case 'neutral':
          mouthSVG = `<line x1="${mouthX - 6}" y1="${mouthY}" x2="${mouthX + 6}" y2="${mouthY}" class="rig-stroke" />`;
          break;
        case 'smile':
        default:
          mouthSVG = `<path d="M ${mouthX - 7} ${mouthY - 1} Q ${mouthX} ${mouthY + 6} ${mouthX + 7} ${mouthY - 1}" class="rig-stroke" />`;
          break;
      }
    }

    // Hairstyles & Glasses
    let hairSVG = '';
    if (config.hair === 'top-bun-glasses') {
      hairSVG = `
        <circle cx="${actorX - faceShiftX * 0.3}" cy="${headCenterY - r - 6}" r="9" fill="#2A2B2A" stroke="${INK}" stroke-width="2" />
        <path d="M ${actorX - r + 2} ${headCenterY - 6} Q ${actorX} ${headCenterY - r - 8} ${actorX + r - 2} ${headCenterY - 6}
                 Q ${actorX} ${headCenterY - r + 8} ${actorX - r + 2} ${headCenterY - 6} Z" fill="#2A2B2A" />
        ${
          angle === 'side'
            ? `<circle cx="${rightEyeX}" cy="${eyeY}" r="6.5" fill="none" stroke="${INK}" stroke-width="2.2" />`
            : `
              <circle cx="${leftEyeX}" cy="${eyeY}" r="6.5" fill="none" stroke="${INK}" stroke-width="2.2" />
              <circle cx="${rightEyeX}" cy="${eyeY}" r="6.5" fill="none" stroke="${INK}" stroke-width="2.2" />
              <line x1="${leftEyeX + 6.5}" y1="${eyeY}" x2="${rightEyeX - 6.5}" y2="${eyeY}" stroke="${INK}" stroke-width="2.2" />
            `
        }
      `;
    } else if (config.hair === 'curly-clerk') {
      hairSVG = `
        <path d="M ${actorX - r} ${headCenterY - 2}
                 C ${actorX - r - 6} ${headCenterY - 24}, ${actorX - 10} ${headCenterY - r - 12}, ${actorX} ${headCenterY - r - 6}
                 C ${actorX + 14} ${headCenterY - r - 12}, ${actorX + r + 8} ${headCenterY - 18}, ${actorX + r - 2} ${headCenterY + 4}
                 C ${actorX + r - 6} ${headCenterY - 14}, ${actorX - r + 6} ${headCenterY - 16}, ${actorX - r} ${headCenterY - 2} Z"
              fill="#1E1E1E" />
      `;
    } else if (config.hair === 'side-ponytail') {
      hairSVG = `
        <path d="M ${actorX - r + 1} ${headCenterY - 6}
                 Q ${actorX} ${headCenterY - r - 9} ${actorX + r - 1} ${headCenterY - 4}
                 Q ${actorX + 4} ${headCenterY - r + 10} ${actorX - r + 1} ${headCenterY - 6} Z" fill="#181818" />
        <path d="M ${actorX + r - 2} ${headCenterY - 4}
                 Q ${actorX + r + 16} ${headCenterY - 2} ${actorX + r + 12} ${headCenterY + 18}
                 Q ${actorX + r + 2} ${headCenterY + 12} ${actorX + r - 2} ${headCenterY - 4} Z" fill="#181818" />
      `;
    } else if (config.hair === 'short-spiky') {
      hairSVG = `
        <path d="M ${actorX - 16 + faceShiftX * 0.3} ${headCenterY - r + 3}
                 L ${actorX - 8 + faceShiftX * 0.3} ${headCenterY - r - 9}
                 L ${actorX - 1 + faceShiftX * 0.3} ${headCenterY - r - 2}
                 L ${actorX + 7 + faceShiftX * 0.3} ${headCenterY - r - 11}
                 L ${actorX + 14 + faceShiftX * 0.3} ${headCenterY - r + 2} Z" fill="#171717" />
      `;
    }

    let nameTagSVG = '';
    if (config.blackNameTag) {
      const tagY = headCenterY - r - 44;
      nameTagSVG = `
        <g transform="translate(${actorX}, ${tagY})">
          <rect x="-42" y="-18" width="84" height="34" rx="17" fill="${INK}" />
          <polygon points="-7,15 7,15 0,25" fill="${INK}" />
          <text x="0" y="5" text-anchor="middle" fill="${WHITE}" font-family="var(--font-khmer)" font-size="18" font-weight="700">
            ${config.blackNameTag}
          </text>
        </g>
      `;
    }

    const sparkleSVG =
      activeGesture === 'celebrate' || activeGesture === 'jump-celebrate'
        ? `
          <g transform="translate(${actorX}, ${headCenterY})">
            <polygon points="-54,-38 -50,-46 -46,-38 -38,-34 -46,-30 -50,-22 -54,-30 -62,-34" fill="#EABF42" stroke="${INK}" stroke-width="1.4" />
            <polygon points="52,-42 55,-49 58,-42 65,-39 58,-36 55,-29 52,-36 45,-39" fill="#EABF42" stroke="${INK}" stroke-width="1.4" />
            <circle cx="-44" cy="-54" r="3" fill="#2FAA61" />
            <circle cx="46" cy="-56" r="3" fill="#5D98E8" />
          </g>
        `
        : '';

    return `
      <g class="actor-group">
        ${legsSVG}
        ${torsoSVG}
        <g transform="rotate(${headRotate}, ${actorX}, ${headCenterY})">
          <circle cx="${actorX}" cy="${headCenterY}" r="${r}" class="rig-head-circle" />
          ${hairSVG}
          ${blushSVG}
          ${browsSVG}
          ${eyesSVG}
          ${mouthSVG}
        </g>
        ${sparkleSVG}
        ${nameTagSVG}
      </g>
    `;
  }

  function renderOfficeDeskLaptopSVG(x = 285, groundY = 430) {
    const deskW = 225;
    const deskH = 112;
    const deskY = groundY - deskH;
    const topLedgeH = 12;
    const lapW = 116;
    const lapH = 74;
    const lapX = x + (deskW - lapW) / 2;
    const lapY = deskY - lapH - 4;

    return `
      <g class="prop-office-desk">
        <rect x="${x}" y="${deskY}" width="${deskW}" height="${deskH}" fill="#E6E9EF" stroke="${INK}" stroke-width="3" rx="2" />
        <rect x="${x - 10}" y="${deskY - topLedgeH}" width="${deskW + 20}" height="${topLedgeH}" rx="4" fill="${WHITE}" stroke="${INK}" stroke-width="3" />
        <rect x="${lapX}" y="${lapY}" width="${lapW}" height="${lapH}" rx="6" fill="#1E2638" stroke="${INK}" stroke-width="3" />
        <polygon points="${lapX - 12},${deskY - topLedgeH} ${lapX + lapW + 12},${deskY - topLedgeH} ${lapX + lapW + 4},${deskY - topLedgeH - 6} ${lapX - 4},${deskY - topLedgeH - 6}"
                 fill="#E6E9EF" stroke="${INK}" stroke-width="2.5" />
        <line x1="${lapX + 16}" y1="${lapY + 16}" x2="${lapX + 46}" y2="${lapY + 16}" stroke="#2FAA61" stroke-width="3.5" stroke-linecap="round" />
        <line x1="${lapX + 16}" y1="${lapY + 27}" x2="${lapX + 74}" y2="${lapY + 27}" stroke="#5D98E8" stroke-width="3.5" stroke-linecap="round" />
        <line x1="${lapX + 16}" y1="${lapY + 38}" x2="${lapX + 54}" y2="${lapY + 38}" stroke="#EABF42" stroke-width="3.5" stroke-linecap="round" />
        <line x1="${lapX + 16}" y1="${lapY + 49}" x2="${lapX + 78}" y2="${lapY + 49}" stroke="#94A3B8" stroke-width="3.5" stroke-linecap="round" />
        <line x1="${lapX + 16}" y1="${lapY + 60}" x2="${lapX + 62}" y2="${lapY + 60}" stroke="#2FAA61" stroke-width="3.5" stroke-linecap="round" />
      </g>
    `;
  }

  function renderPawnShopEnvironmentSVG(options = {}) {
    const envOpacity = options.envOpacity ?? 1;
    return `
      <g class="env-pawn-shop">
        <rect x="-400" y="-500" width="1800" height="945" fill="#ECEEF0" />
        <rect x="-400" y="445" width="1800" height="600" fill="#DFE2E6" />
        <line x1="-400" y1="445" x2="1400" y2="445" stroke="#B8BDC4" stroke-width="2" />

        <g opacity="${envOpacity}">
          <rect x="85" y="75" width="790" height="370" fill="none" stroke="${LINE}" stroke-width="1.3" />
          <line x1="85" y1="95" x2="875" y2="95" stroke="${LINE}" stroke-width="1.2" />
          <line x1="85" y1="112" x2="875" y2="112" stroke="${LINE}" stroke-width="1.2" />

          <rect x="115" y="155" width="220" height="140" fill="none" stroke="${LINE}" stroke-width="1.3" />
          <g stroke="${LINE}" stroke-width="1.4" fill="none">
            <rect x="135" y="255" width="415" height="175" />
            <line x1="176" y1="255" x2="176" y2="430" />
            <line x1="218" y1="255" x2="218" y2="430" />
            <line x1="260" y1="255" x2="260" y2="430" />
            <line x1="302" y1="255" x2="302" y2="430" />
            <line x1="344" y1="255" x2="344" y2="430" />
            <line x1="386" y1="255" x2="386" y2="430" />
            <line x1="428" y1="255" x2="428" y2="430" />
            <line x1="470" y1="255" x2="470" y2="430" />
            <line x1="512" y1="255" x2="512" y2="430" />
            <circle cx="155" cy="272" r="5" /><circle cx="197" cy="272" r="5" /><circle cx="239" cy="272" r="5" />
            <circle cx="281" cy="272" r="5" /><circle cx="323" cy="272" r="5" /><circle cx="365" cy="272" r="5" />
            <circle cx="407" cy="272" r="5" /><circle cx="449" cy="272" r="5" /><circle cx="491" cy="272" r="5" />
            <circle cx="531" cy="272" r="5" />
          </g>

          <circle cx="760" cy="135" r="24" fill="none" stroke="${LINE}" stroke-width="1.5" />
          <polyline points="760,120 760,135 772,135" fill="none" stroke="${LINE}" stroke-width="1.5" />
          <rect x="655" y="160" width="62" height="90" fill="none" stroke="${LINE}" stroke-width="1.3" />
          <rect x="790" y="205" width="76" height="240" fill="#E2E5E9" stroke="${LINE}" stroke-width="1.4" />
        </g>

        ${
          options.showPawnSign
            ? `
          <rect x="272" y="218" width="160" height="42" rx="5" fill="#D95338" stroke="${INK}" stroke-width="2.2" />
          <text x="352" y="246" text-anchor="middle" fill="#FCE762" font-family="var(--font-khmer)" font-size="22" font-weight="700">
            ទទួលបញ្ចាំ
          </text>
        `
            : ''
        }

        <g transform="translate(618, 405)">
          <rect x="0" y="0" width="74" height="86" rx="4" fill="#5D6472" stroke="${INK}" stroke-width="2.2" />
          <rect x="6" y="6" width="62" height="74" rx="2" fill="#687080" stroke="${INK}" stroke-width="1.5" />
          <circle cx="37" cy="43" r="11" fill="#CBD5E1" stroke="${INK}" stroke-width="1.6" />
          <circle cx="37" cy="43" r="3" fill="#475569" />
        </g>

        <g transform="translate(820, 388)">
          <line x1="0" y1="0" x2="138" y2="0" stroke="#7C5836" stroke-width="4" />
          <line x1="0" y1="62" x2="138" y2="62" stroke="#7C5836" stroke-width="4" />
          <line x1="6" y1="-8" x2="6" y2="115" stroke="#7C5836" stroke-width="3.5" />
          <rect x="20" y="-34" width="40" height="28" rx="3" fill="#475569" stroke="${INK}" stroke-width="1.8" />
          <rect x="52" y="-22" width="12" height="7" fill="#FEF08A" stroke="${INK}" stroke-width="1" />
          <ellipse cx="82" cy="-16" rx="18" ry="12" fill="#F8FAFC" stroke="${INK}" stroke-width="1.6" />
          <rect x="94" y="-20" width="12" height="7" fill="#FEF08A" stroke="${INK}" stroke-width="1" />
          <rect x="22" y="34" width="12" height="22" rx="2" fill="#334155" stroke="${INK}" stroke-width="1.5" />
          <rect x="38" y="34" width="12" height="22" rx="2" fill="#334155" stroke="${INK}" stroke-width="1.5" />
          <rect x="54" y="34" width="12" height="22" rx="2" fill="#334155" stroke="${INK}" stroke-width="1.5" />
          <rect x="60" y="42" width="11" height="6" fill="#FEF08A" stroke="${INK}" stroke-width="1" />
        </g>
      </g>
    `;
  }

  function renderPawnCounterForegroundSVG(showGoldScale = false, scaleValText = '966') {
    return `
      <g class="fg-pawn-counter">
        <rect x="134" y="432" width="418" height="82" rx="3" fill="#8C6239" stroke="${INK}" stroke-width="2.4" />
        <line x1="252" y1="438" x2="252" y2="514" stroke="#734F2C" stroke-width="1.5" />
        <line x1="355" y1="438" x2="355" y2="514" stroke="#734F2C" stroke-width="1.5" />
        <line x1="458" y1="438" x2="458" y2="514" stroke="#734F2C" stroke-width="1.5" />
        <rect x="142" y="425" width="402" height="11" fill="#CBD5E1" stroke="${INK}" stroke-width="2" />

        ${
          showGoldScale
            ? `
          <g transform="translate(446, 326)">
            <ellipse cx="62" cy="18" rx="38" ry="8" fill="#F1F5F9" stroke="${INK}" stroke-width="1.8" />
            <path d="M 32 12 Q 62 28 92 12 Q 78 24 62 26 Q 46 24 32 12 Z" fill="#EABF42" stroke="#B45309" stroke-width="1.5" />
            <polygon points="62,20 57,27 62,33 67,27" fill="#FDE047" stroke="#B45309" stroke-width="1.2" />
            <rect x="52" y="26" width="20" height="10" fill="#CBD5E1" stroke="${INK}" stroke-width="1.8" />
            <rect x="0" y="36" width="124" height="102" rx="12" fill="#CBD5E1" stroke="${INK}" stroke-width="2.2" />
            <rect x="14" y="52" width="96" height="42" rx="6" fill="#1E293B" stroke="${INK}" stroke-width="1.8" />
            <text x="26" y="79" fill="#86EFAC" font-family="'Inter', sans-serif" font-size="15" font-weight="700">$</text>
            <text x="68" y="81" text-anchor="middle" fill="#4ADE80" font-family="'Inter', sans-serif" font-size="25" font-weight="800">${scaleValText}</text>
            <circle cx="22" cy="116" r="5.5" fill="#FA604E" stroke="${INK}" stroke-width="1.5" />
            <text x="62" y="121" text-anchor="middle" fill="${INK}" font-family="var(--font-khmer)" font-size="14" font-weight="700">តម្លៃមាស</text>
            <circle cx="102" cy="116" r="5.5" fill="#2FAA61" stroke="${INK}" stroke-width="1.5" />
          </g>
        `
            : ''
        }
      </g>
    `;
  }

  function renderAmbientBackgroundMotionSVG(locationId) {
    if (locationId === 'office' || locationId === 'home' || locationId === 'living-room') {
      return `
        <g class="ambient-bg-motion" opacity="0.48">
          <!-- Window with passing vehicle silhouette outside ("គិតមើល" ambient world motion) -->
          <g transform="translate(88, 128)">
            <rect x="0" y="0" width="128" height="96" rx="4" fill="#F8FAFC" stroke="${LINE}" stroke-width="1.6" />
            <clipPath id="winClipAmb">
              <rect x="2" y="2" width="124" height="92" />
            </clipPath>
            <g clip-path="url(#winClipAmb)">
              <line x1="0" y1="78" x2="128" y2="78" stroke="#CBD5E1" stroke-width="1.5" />
              <g>
                <rect x="-36" y="64" width="28" height="11" rx="3" fill="#CBD5E1" />
                <circle cx="-29" cy="76" r="3" fill="#94A3B8" />
                <circle cx="-14" cy="76" r="3" fill="#94A3B8" />
                <animateTransform attributeName="transform" type="translate" from="0 0" to="190 0" dur="7.5s" repeatCount="indefinite" />
              </g>
            </g>
            <line x1="64" y1="0" x2="64" y2="96" stroke="${LINE}" stroke-width="1.4" />
            <line x1="0" y1="48" x2="128" y2="48" stroke="${LINE}" stroke-width="1.4" />
          </g>
          <!-- Ticking Wall Clock -->
          <g transform="translate(465, 118)">
            <circle cx="0" cy="0" r="18" fill="${WHITE}" stroke="${LINE}" stroke-width="1.6" />
            <line x1="0" y1="0" x2="0" y2="-10" stroke="#94A3B8" stroke-width="1.6" stroke-linecap="round" />
            <line x1="0" y1="0" x2="8" y2="0" stroke="#64748B" stroke-width="1.6" stroke-linecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite" />
            </line>
          </g>
        </g>
      `;
    }
    if (locationId === 'street' || locationId === 'park') {
      return `
        <g class="ambient-bg-motion" opacity="0.42">
          <g>
            <path d="M -60 418 L -18 418 L -24 405 L -48 405 Z" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1.4" />
            <circle cx="-48" cy="420" r="5" fill="#64748B" />
            <circle cx="-26" cy="420" r="5" fill="#64748B" />
            <animateTransform attributeName="transform" type="translate" from="0 0" to="1080 0" dur="11s" repeatCount="indefinite" />
          </g>
        </g>
      `;
    }
    return '';
  }

  /**
   * Master Design System v2.0 — 12 Reusable Minimalist Locations
   */
  function renderLocationSVG(locationId, options = {}) {
    const envOpacity = options.envOpacity ?? 1;
    const ambSVG = renderAmbientBackgroundMotionSVG(locationId);
    switch (locationId) {
      case 'office':
        return `<rect x="-400" y="-500" width="1800" height="1600" fill="#FFFFFF" /><g opacity="${envOpacity}">${ambSVG}${renderOfficeDeskLaptopSVG(282, 430)}</g>`;
      case 'shop':
        return renderPawnShopEnvironmentSVG(options);
      case 'classroom':
        return `
          <rect x="-400" y="-500" width="1800" height="1600" fill="#F5F5F3" />
          <g opacity="${envOpacity}">
            <line x1="60" y1="435" x2="900" y2="435" stroke="${NEUTRAL}" stroke-width="3" />
            <rect x="105" y="95" width="340" height="190" rx="6" fill="${WHITE}" stroke="${INK}" stroke-width="2.5" />
            <rect x="130" y="285" width="290" height="8" fill="#CBD5E1" stroke="${INK}" stroke-width="2" />
            <line x1="140" y1="140" x2="290" y2="140" stroke="#5D98E8" stroke-width="4" stroke-linecap="round" />
            <line x1="140" y1="170" x2="360" y2="170" stroke="${NEUTRAL}" stroke-width="4" stroke-linecap="round" />
            <line x1="140" y1="200" x2="250" y2="200" stroke="#2FAA61" stroke-width="4" stroke-linecap="round" />
          </g>
        `;
      case 'home':
      case 'living-room':
        return `
          <rect x="-400" y="-500" width="1800" height="1600" fill="#F5F5F3" />
          <g opacity="${envOpacity}">
            ${ambSVG}
            <line x1="60" y1="435" x2="900" y2="435" stroke="#D1D5DB" stroke-width="2.5" />
            <rect x="295" y="345" width="210" height="90" rx="14" fill="#E6E9EF" stroke="${INK}" stroke-width="2.5" />
            <rect x="280" y="365" width="28" height="70" rx="8" fill="#CBD5E1" stroke="${INK}" stroke-width="2.5" />
            <rect x="492" y="365" width="28" height="70" rx="8" fill="#CBD5E1" stroke="${INK}" stroke-width="2.5" />
          </g>
        `;
      case 'bedroom':
        return `
          <rect x="-400" y="-500" width="1800" height="1600" fill="#F5F5F3" />
          <g opacity="${envOpacity}">
            <line x1="60" y1="435" x2="900" y2="435" stroke="#D1D5DB" stroke-width="2.5" />
            <circle cx="430" cy="155" r="24" fill="${WHITE}" stroke="${LINE}" stroke-width="1.8" />
            <polyline points="430,142 430,155 440,160" fill="none" stroke="${LINE}" stroke-width="1.8" />
            <rect x="275" y="355" width="230" height="80" rx="8" fill="${WHITE}" stroke="${INK}" stroke-width="2.5" />
            <rect x="275" y="315" width="18" height="120" rx="4" fill="#CBD5E1" stroke="${INK}" stroke-width="2.5" />
            <rect x="300" y="338" width="52" height="20" rx="6" fill="#E6E9EF" stroke="${INK}" stroke-width="2" />
            <rect x="355" y="355" width="150" height="55" rx="4" fill="#5D98E8" fill-opacity="0.25" stroke="${INK}" stroke-width="2" />
          </g>
        `;
      case 'kitchen':
      case 'dining-room':
        return `
          <rect x="-400" y="-500" width="1800" height="1600" fill="#FFFFFF" />
          <g opacity="${envOpacity}">
            <line x1="60" y1="435" x2="900" y2="435" stroke="${NEUTRAL}" stroke-width="2.5" />
            <rect x="285" y="335" width="220" height="12" rx="4" fill="${WHITE}" stroke="${INK}" stroke-width="2.5" />
            <line x1="310" y1="347" x2="310" y2="435" stroke="${INK}" stroke-width="3" />
            <line x1="480" y1="347" x2="480" y2="435" stroke="${INK}" stroke-width="3" />
            <path d="M 365 315 L 425 315 Q 420 335 395 335 Q 370 335 365 315 Z" fill="#2FAA61" fill-opacity="0.3" stroke="${INK}" stroke-width="2.2" />
          </g>
        `;
      case 'park':
      case 'street':
        return `
          <rect x="-400" y="-500" width="1800" height="1600" fill="#F5F5F3" />
          <g opacity="${envOpacity}">
            ${ambSVG}
            <line x1="40" y1="435" x2="920" y2="435" stroke="#CBD5E1" stroke-width="3" />
            <circle cx="135" cy="265" r="46" fill="#2FAA61" fill-opacity="0.18" stroke="${LINE}" stroke-width="2" />
            <line x1="135" y1="311" x2="135" y2="435" stroke="${LINE}" stroke-width="4" />
            <rect x="310" y="380" width="160" height="12" rx="3" fill="#E6E9EF" stroke="${INK}" stroke-width="2.2" />
            <line x1="335" y1="392" x2="335" y2="435" stroke="${INK}" stroke-width="2.5" />
            <line x1="445" y1="392" x2="445" y2="435" stroke="${INK}" stroke-width="2.5" />
          </g>
        `;
      case 'gym':
        return `
          <rect x="-400" y="-500" width="1800" height="1600" fill="#FFFFFF" />
          <g opacity="${envOpacity}">
            <line x1="60" y1="435" x2="900" y2="435" stroke="${NEUTRAL}" stroke-width="3" />
            <rect x="285" y="424" width="210" height="11" rx="5" fill="#5D98E8" fill-opacity="0.35" stroke="${INK}" stroke-width="2" />
            <g transform="translate(350, 405)">
              <line x1="10" y1="10" x2="50" y2="10" stroke="${INK}" stroke-width="4" />
              <rect x="2" y="0" width="10" height="20" rx="3" fill="#64748B" stroke="${INK}" stroke-width="2" />
              <rect x="48" y="0" width="10" height="20" rx="3" fill="#64748B" stroke="${INK}" stroke-width="2" />
            </g>
          </g>
        `;
      case 'whiteboard':
      default:
        return `<rect x="-400" y="-500" width="1800" height="1600" fill="#FFFFFF" />`;
    }
  }

  /**
   * Episode 01 (ep01-iced-coffee) Anthology Cast Registry
   */
  const EP01_CAST = {
    char_dara: {
      id: 'char_dara',
      nameKhmer: 'តារា',
      nameEn: 'Dara (Office Designer)',
      style: 'minimal',
      hair: 'short-spiky',
      outfit: null,
      voiceId: 'VOICE-CAST-01'
    },
    char_nary: {
      id: 'char_nary',
      nameKhmer: 'ណារី',
      nameEn: 'Dr. Nary (Nutritionist Colleague)',
      style: 'outfitted',
      hair: 'top-bun-glasses',
      outfit: 'teal-health',
      voiceId: 'VOICE-CAST-02'
    },
    char_barista: {
      id: 'char_barista',
      nameKhmer: 'បងសុខ',
      nameEn: 'Bong Sok (Café Barista)',
      style: 'outfitted',
      hair: 'curly-clerk',
      outfit: 'barista-apron',
      voiceId: 'VOICE-CAST-03'
    }
  };

  /**
   * Hero Prop: Giant 650ml Iced Sweet Coffee Cross-Section X-Ray (Layer 1/2 Prop)
   * Includes "គិតមើល" Wavy Liquid Meniscus + Curved Dashed Particle Stream (---🍬-->)
   */
  function renderIcedCoffeeXrayPropSVG(x = 395, groundY = 430) {
    const cupTopY = groundY - 210;
    return `
      <g class="prop-iced-coffee-xray" transform="translate(${x}, ${cupTopY})">
        <!-- Curved Dashed Sugar Particle Stream ("គិតមើល" Flying Particle Arc) -->
        <path d="M 88 -45 C 125 -82, 168 -68, 192 -35" fill="none" stroke="#FA604E" stroke-width="2.5" class="km-dashed-stream" />
        <g>
          <rect x="-7" y="-7" width="14" height="14" rx="3" fill="#FFFFFF" stroke="${INK}" stroke-width="2" />
          <animateMotion dur="1.6s" repeatCount="indefinite" path="M 88 -45 C 125 -82, 168 -68, 192 -35" />
        </g>
        <!-- Straw -->
        <line x1="65" y1="20" x2="88" y2="-48" stroke="#2FAA61" stroke-width="7" stroke-linecap="round" />
        <!-- Plastic Dome Lid -->
        <path d="M 0 18 A 65 44 0 0 1 130 18 Z" fill="#F8FAFC" fill-opacity="0.85" stroke="${INK}" stroke-width="3" />
        <rect x="-6" y="14" width="142" height="10" rx="5" fill="${WHITE}" stroke="${INK}" stroke-width="3" />
        <!-- Top Espresso & Ice Layer -->
        <polygon points="2,24 128,24 118,122 12,122" fill="#7C4D2B" stroke="${INK}" stroke-width="3" />
        <!-- Ice Cubes -->
        <rect x="22" y="38" width="24" height="20" rx="4" fill="#FFFFFF" fill-opacity="0.75" stroke="${INK}" stroke-width="2" transform="rotate(-8, 34, 48)" />
        <rect x="64" y="42" width="26" height="20" rx="4" fill="#FFFFFF" fill-opacity="0.75" stroke="${INK}" stroke-width="2" transform="rotate(10, 77, 52)" />
        <rect x="44" y="68" width="24" height="18" rx="4" fill="#FFFFFF" fill-opacity="0.65" stroke="${INK}" stroke-width="2" />
        <!-- Bottom Condensed Milk + Sugar Syrup Overload Layer (45g / 11 Teaspoons) with Wavy Top Meniscus -->
        <path d="M 12 122 Q 38 115 65 122 T 118 122 L 112 208 L 18 208 Z" fill="#FA604E" fill-opacity="0.90" stroke="${INK}" stroke-width="3" />
        <text x="65" y="147" text-anchor="middle" fill="${WHITE}" font-family="var(--font-khmer)" font-size="10.5" font-weight="700">ទឹកដោះគោខាប់</text>
        <text x="65" y="171" text-anchor="middle" fill="#FEF08A" font-family="'Inter', var(--font-khmer)" font-size="15" font-weight="800">45g ស្ករ</text>
        <text x="65" y="193" text-anchor="middle" fill="${WHITE}" font-family="var(--font-khmer)" font-size="10.5" font-weight="700">(11 ស្លាបព្រា)</text>
      </g>
    `;
  }

  function renderCharacterSheetSVG(charConfig = {}) {
    const daraBase = {
      style: 'minimal',
      hair: 'short-spiky',
      headRadius: 28,
      torsoLength: 64,
      limbLength: 70,
      y: 255
    };

    return `
      <rect x="0" y="0" width="960" height="540" fill="#F5F5F3" />
      <rect x="36" y="54" width="430" height="235" rx="12" fill="#FFFFFF" stroke="#171717" stroke-width="2" />
      <text x="56" y="82" fill="#171717" font-family="'Inter', sans-serif" font-size="13" font-weight="800">1. EP01 PROTAGONIST "តារា" (FRONT • 3/4 • SIDE)</text>
      ${renderActorSVG({ ...daraBase, x: 118, angle: 'front', emotion: 'happy', gesture: 'hold-coffee' })}
      <text x="118" y="276" text-anchor="middle" fill="#64748B" font-size="11" font-weight="700">FRONT (0°)</text>

      ${renderActorSVG({ ...daraBase, x: 252, angle: 'three-quarter', emotion: 'worried', gesture: 'think' })}
      <text x="252" y="276" text-anchor="middle" fill="#64748B" font-size="11" font-weight="700">3/4 VIEW</text>

      ${renderActorSVG({ ...daraBase, x: 386, angle: 'side', emotion: 'determined', gesture: 'walk' })}
      <text x="386" y="276" text-anchor="middle" fill="#64748B" font-size="11" font-weight="700">SIDE (90°)</text>

      <rect x="494" y="54" width="430" height="235" rx="12" fill="#FFFFFF" stroke="#171717" stroke-width="2" />
      <text x="514" y="82" fill="#171717" font-family="'Inter', sans-serif" font-size="13" font-weight="800">2. EP01 CAST & PROP SHEET (ណារី • បងសុខ • COFFEE X-RAY)</text>
      ${renderActorSVG({ ...daraBase, style: 'outfitted', hair: 'top-bun-glasses', outfit: 'teal-health', x: 575, emotion: 'calm', gesture: 'explain' })}
      <text x="575" y="276" text-anchor="middle" fill="#2FAA61" font-size="11" font-weight="700">ណារី (VOICE-CAST-02)</text>

      ${renderActorSVG({ ...daraBase, style: 'outfitted', hair: 'curly-clerk', outfit: 'barista-apron', x: 705, emotion: 'happy', gesture: 'open-welcome' })}
      <text x="705" y="276" text-anchor="middle" fill="#7C4D2B" font-size="11" font-weight="700">បងសុខ (VOICE-CAST-03)</text>

      <g transform="translate(792, 118) scale(0.62)">
        ${renderIcedCoffeeXrayPropSVG(0, 210)}
      </g>
      <text x="835" y="276" text-anchor="middle" fill="#FA604E" font-size="11" font-weight="700">45g SUGAR X-RAY</text>

      <rect x="36" y="306" width="888" height="190" rx="12" fill="#FFFFFF" stroke="#171717" stroke-width="2" />
      <text x="56" y="334" fill="#171717" font-family="'Inter', sans-serif" font-size="13" font-weight="800">3. CORE EMOTION SAMPLES FOR "តារា" (FROM 15-EMOTION MATRIX)</text>
      ${['happy', 'tired', 'worried', 'surprised', 'confused', 'thinking', 'proud']
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

  return {
    EMOTION_PRESETS,
    EP01_CAST,
    renderActorSVG,
    renderOfficeDeskLaptopSVG,
    renderPawnShopEnvironmentSVG,
    renderPawnCounterForegroundSVG,
    renderIcedCoffeeXrayPropSVG,
    renderLocationSVG,
    renderCharacterSheetSVG
  };
})();
