/**
 * Antigravity Unified Master Studio v2.0 — Scene Player, 8s Timeline Sequencer,
 * Real WebAudio RMS Lip-Sync, Khmer Subscript Calibration & Token Exporter
 */

window.ScenePlayer = (function () {
  const DEMO_SHOTS = [
    {
      id: 'shot_01',
      title: 'Shot 01 • ហេង Intro (Ref 3)',
      mode: 'STORY',
      sceneType: 'heng-intro',
      location: 'office',
      actors: [
        {
          id: 'heng',
          name: 'ហេង (Heng)',
          style: 'minimal',
          x: 245,
          y: 430,
          blackNameTag: 'ហេង',
          emotion: 'happy',
          gesture: 'open-welcome',
          headLook: 'right'
        }
      ],
      captionKhmer: 'គាត់មានការងារប្រចាំថ្ងៃ និងប្រាក់ខែបីរយដុល្លារ។',
      aiStudioPrompt: `[VOICE ID: VOICE-NARRATOR-001]\nLanguage: Khmer (ភាសាខ្មែរ)\nVoice: Kore (Warm, clear educational narrator)\nTone: Friendly introduction, steady pace\n\n[TRANSCRIPT]\nនេះគឺហេង។ គាត់មានការងារប្រចាំថ្ងៃ និងប្រាក់ខែបីរយដុល្លារ។`
    },
    {
      id: 'shot_02',
      title: 'Shot 02 • ហេង $300 HYBRID (Ref 4–5)',
      mode: 'HYBRID',
      sceneType: 'heng-budget',
      location: 'office',
      actors: [
        {
          id: 'heng',
          name: 'ហេង (Heng — Worried)',
          style: 'minimal',
          x: 245,
          y: 430,
          emotion: 'worried',
          gesture: 'sad-droop',
          headLook: 'center'
        }
      ],
      captionKhmer: 'គាត់ខំប្រឹងធ្វើការ ប៉ុន្តែមិនសូវមានលុយសល់ឡើយ។',
      aiStudioPrompt: `[VOICE ID: VOICE-NARRATOR-001]\nLanguage: Khmer (ភាសាខ្មែរ)\nVoice: Kore (Empathetic, clear educational narrator)\nTone: Thoughtful, slight concern on "នៅសល់តិច"\n\n[TRANSCRIPT]\nនៅថ្ងៃទីសាមសិប ពេលបើកប្រាក់ខែបីរយដុល្លារ គាត់ត្រូវចំណាយលើអាហារ ផ្ទះសម្បែង និងការធ្វើដំណើរ... ធ្វើឱ្យគាត់ខំប្រឹងធ្វើការ ប៉ុន្តែមិនសូវមានលុយសល់ឡើយ។`
    },
    {
      id: 'shot_03',
      title: 'Shot 03 • ហាងបញ្ចាំ Dialogue (Ref 1)',
      mode: 'STORY',
      sceneType: 'pawn-dialogue',
      location: 'shop',
      actors: [
        {
          id: 'kunthea',
          name: 'គន្ធា (Kunthea — Appraiser)',
          style: 'outfitted',
          x: 258,
          y: 430,
          behindCounter: true,
          hair: 'top-bun-glasses',
          outfit: 'olive-clerk',
          emotion: 'calm',
          gesture: 'counter-idle',
          headLook: 'right',
          speakWindows: [[4.3, 7.8]]
        },
        {
          id: 'clerk',
          name: 'បុគ្គលិក (Staff)',
          style: 'outfitted',
          x: 422,
          y: 430,
          behindCounter: true,
          hair: 'curly-clerk',
          outfit: 'black-vest',
          emotion: 'excited',
          gesture: 'counter-idle',
          headLook: 'center',
          speakWindows: []
        },
        {
          id: 'chorna',
          name: 'ចរណា (Chorna — Customer)',
          style: 'outfitted',
          x: 582,
          y: 515,
          behindCounter: false,
          hair: 'side-ponytail',
          outfit: 'blue-orange-bag',
          emotion: 'sad',
          gesture: 'raise-left-hand',
          headLook: 'left',
          speakWindows: [[0.2, 4.2]]
        }
      ],
      captionKhmer: '',
      aiStudioPrompt: `[VOICE DIRECTION — MULTI-SPEAKER]\nLanguage: Khmer (ភាសាខ្មែរ)\nVOICE-CAST-01 (ចរណា - Aoede): Urgent, polite, slightly worried\nVOICE-CAST-02 (គន្ធា - Kore): Calm, experienced shopkeeper\n\n[TRANSCRIPT]\nចរណា៖ បង ខ្ញុំត្រូវការលុយប្រាំមួយរយហាសិបដុល្លារ ដើម្បីបង្វិលទិញទំនិញ។\nគន្ធា៖ ដាក់ខ្សែកមកចុះប្អូន។ ខ្ញុំថ្លឹងមើលសិន។`
    },
    {
      id: 'shot_04',
      title: 'Shot 04 • តម្លៃមាស $966 HYBRID (Ref 2)',
      mode: 'HYBRID',
      sceneType: 'pawn-scale-hybrid',
      location: 'shop',
      actors: [
        {
          id: 'kunthea',
          name: 'គន្ធា (Kunthea)',
          style: 'outfitted',
          x: 268,
          y: 430,
          behindCounter: true,
          hair: 'top-bun-glasses',
          outfit: 'olive-clerk',
          emotion: 'calm',
          gesture: 'counter-idle',
          headLook: 'right'
        },
        {
          id: 'clerk',
          name: 'បុគ្គលិក (Staff)',
          style: 'outfitted',
          x: 426,
          y: 430,
          behindCounter: true,
          hair: 'curly-clerk',
          outfit: 'black-vest',
          emotion: 'surprised',
          gesture: 'counter-idle',
          headLook: 'right'
        },
        {
          id: 'chorna',
          name: 'ចរណា (Chorna)',
          style: 'outfitted',
          x: 615,
          y: 515,
          behindCounter: false,
          hair: 'side-ponytail',
          outfit: 'blue-orange-bag',
          emotion: 'sad',
          gesture: 'sad-droop',
          headLook: 'left'
        }
      ],
      captionKhmer: '',
      aiStudioPrompt: `[VOICE ID: VOICE-NARRATOR-001]\nLanguage: Khmer (ភាសាខ្មែរ)\nVoice: Charon / Kore (Clear financial explainer)\nTone: Informative, highlighting the 70-85% loan-to-value ratio\n\n[TRANSCRIPT]\nសម្រាប់គ្រឿងអលង្ការ ហាងបញ្ចាំអាចឱ្យខ្ចីចន្លោះពី ចិតសិប ទៅ ប៉ែតសិបប្រាំភាគរយនៃតម្លៃមាស។ ដូច្នេះខ្សែកតម្លៃ ប្រាំបួនរយហុកសិបប្រាំមួយដុល្លារ អាចខ្ចីបាន ប្រាំមួយរយហាសិបដុល្លារ។`
    },
    {
      id: 'shot_05',
      title: '📋 Character Sheet (v2.0)',
      mode: 'EXPLAINER',
      sceneType: 'character-sheet',
      location: 'whiteboard',
      actors: [],
      captionKhmer: 'តារាងរចនាតួអង្គប្រចាំភាគ៖ មុំទាំង ៣ (មុខត្រង់ • ៣/៤ • ចំហៀង), កាយវិការ និងទឹកមុខទាំង ១៥។',
      aiStudioPrompt: `[CANONICAL VISUAL PROMPT — MASTER DESIGN SYSTEM v2.0]\nCreate a flat expressive minimalist 2D stick-figure educational animation with round-headed thin-limbed characters, smooth charcoal outlines, simple hairstyles and clothing, expressive eyebrows and mouths, readable gestures, natural conversational/listening motion. Add a softly colored minimal 2D environment relevant to the lesson. Use clean supporting infographic elements only where they explain the concept.`
    }
  ];

  // Unified Master Calibration & Runtime State
  const state = {
    activeDeck: 'ep01', // 'ep01' | 'demo'
    currentShotIndex: 0,
    aspect: '16:9', // '16:9' | '9:16' | '1:1'
    showSafeZones: true,
    cleanPlate: false,

    // Parametric Rig Proportions
    strokeWidth: 3.5,
    headRadius: 34,
    torsoLength: 82,
    limbLength: 96,

    // Acting & Interval Rules
    blinkInterval: 3.2,
    gestureAmplitude: 1.0,
    headTiltOffset: 0,
    lipSyncEnabled: true,
    mouthCadence: 8.5,
    envScale: 100,

    // Overrides
    overrideEmotion: 'auto',
    overrideGesture: 'auto',
    overrideAngle: 'auto',
    overrideLocation: 'auto',
    cameraFraming: 'wide',
    sheetCharacter: 'chorna',

    // Khmer Typography & Subscript Calibration
    khmerFont: 'Kantumruy Pro',
    fontScale: 1.0,
    lineHeight: 1.65,

    // Audio-Driven Shot Timeline & Loop State
    isPlaying: true,
    isBlinking: false,
    lastBlinkTime: 0,
    shotPlaying: false,
    autoAdvanceEpisode: false,
    shotDuration: 8.0,
    shotStartTime: 0,
    shotElapsed: 0,
    scaleCounterText: '966',
    salaryCounterText: '$300',
    sfxTriggered: { whoosh: false, ticks: false, chime: false },
    triggeredCueIndices: new Set(),

    // Web Audio API, Continuous BGM/Ambience & External Voice Analyser
    audioCtx: null,
    bgmEnabled: true,
    bgmTimerId: null,
    bgmStep: 0,
    currentMouthOpen: 0,
    externalAudio: null,
    externalAudioConnected: false,
    externalAnalyser: null,
    externalDataArray: null,
    usingExternalAudio: false
  };

  function getActiveShots() {
    if (state.activeDeck === 'ep01' && window.EP01_ICED_COFFEE && window.EP01_ICED_COFFEE.SHOTS) {
      return window.EP01_ICED_COFFEE.SHOTS;
    }
    return DEMO_SHOTS;
  }

  function renderShotTabs() {
    const container = document.getElementById('shotTabsContainer');
    if (!container) return;
    const shots = getActiveShots();
    container.innerHTML = shots
      .map(
        (s, idx) =>
          `<button class="shot-tab-btn ${idx === state.currentShotIndex ? 'active' : ''}" type="button" data-shot-idx="${idx}">${s.title}</button>`
      )
      .join('');
    container.querySelectorAll('.shot-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-shot-idx'), 10);
        loadShot(idx, true);
      });
    });
  }

  // =========================================================================
  // 1. STAGE AUTO-SCALING & ASPECT RATIO SWITCHING (16:9, 9:16, 1:1)
  // =========================================================================
  function setAspect(aspect) {
    state.aspect = aspect;
    ['16:9', '9:16', '1:1'].forEach((r) => {
      const btn = document.getElementById('btn-aspect-' + r.replace(':', '-'));
      if (btn) {
        btn.className = r === aspect ? 'seg-btn active-blue' : 'seg-btn';
      }
    });

    const stage = document.getElementById('animationStage');
    if (stage) {
      stage.classList.toggle('aspect-16-9', aspect === '16:9');
      stage.classList.toggle('aspect-9-16', aspect === '9:16');
      stage.classList.toggle('aspect-1-1', aspect === '1:1');
    }

    const tiktokDz = document.getElementById('tiktokDeadzone');
    const dimBadge = document.getElementById('stageDimensionsBadge');
    if (aspect === '9:16') {
      if (tiktokDz) tiktokDz.classList.add('active');
      if (dimBadge) dimBadge.textContent = '720 × 1280 (9:16 TikTok / Shorts)';
    } else if (aspect === '1:1') {
      if (tiktokDz) tiktokDz.classList.remove('active');
      if (dimBadge) dimBadge.textContent = '1080 × 1080 (1:1 Facebook Feed)';
    } else {
      if (tiktokDz) tiktokDz.classList.remove('active');
      if (dimBadge) dimBadge.textContent = '1920 × 1080 (16:9 YouTube Master)';
    }

    applyCameraFraming();
    applyResponsiveInfographicLayout();
    resizeStageToFit();
  }

  function resizeStageToFit() {
    const viewport = document.getElementById('stageViewport');
    const stage = document.getElementById('animationStage');
    if (!viewport || !stage) return;

    const isTheatre = document.body.classList.contains('theatre-capture-mode');
    const availW = isTheatre ? window.innerWidth : viewport.clientWidth - 36;
    const availH = isTheatre ? window.innerHeight : viewport.clientHeight - 36;

    let baseW = 960;
    let baseH = 540;
    if (state.aspect === '9:16') {
      baseW = 540;
      baseH = 960;
    } else if (state.aspect === '1:1') {
      baseW = 760;
      baseH = 760;
    }

    const maxScale = isTheatre ? 2.2 : 1.08;
    const scale = Math.min(availW / baseW, availH / baseH, maxScale);
    stage.style.width = `${baseW}px`;
    stage.style.height = `${baseH}px`;
    stage.style.transform = `scale(${scale})`;
  }

  window.addEventListener('resize', resizeStageToFit);

  // =========================================================================
  // 2. WEBAUDIO PROCEDURAL SFX SYNTHESIZER (WHOOSH, COUNTER TICKS, CHIME)
  // =========================================================================
  function ensureAudioContext() {
    if (!state.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) state.audioCtx = new AudioContextClass();
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playSfxWhoosh() {
    ensureAudioContext();
    const ctx = state.audioCtx;
    if (!ctx) return;
    const duration = 0.36;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + duration * 0.5);
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.24, ctx.currentTime + duration * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  }

  function playSfxCounterTicks() {
    ensureAudioContext();
    const ctx = state.audioCtx;
    if (!ctx) return;
    for (let i = 0; i < 10; i++) {
      const start = ctx.currentTime + i * 0.085;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520 + i * 45, start);
      gain.gain.setValueAtTime(0.11, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.05);
    }
  }

  function playSfxChime() {
    ensureAudioContext();
    const ctx = state.audioCtx;
    if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 880].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      gain.gain.setValueAtTime(0.16, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.52);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.56);
    });
  }

  function playSfxPop() {
    ensureAudioContext();
    const ctx = state.audioCtx;
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.09);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  function playSfxAlert() {
    ensureAudioContext();
    const ctx = state.audioCtx;
    if (!ctx) return;
    const now = ctx.currentTime;
    [440, 349.23].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);
      gain.gain.setValueAtTime(0.15, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + idx * 0.14 + 0.24);
    });
  }

  function playNamedSfx(sfxName) {
    const validFiles = ['pop_soft', 'whoosh_paper', 'counter_ticks', 'chime_highlight', 'alert_coral'];
    if (validFiles.includes(sfxName)) {
      try {
        const audio = new Audio(`assets/audio/sfx/${sfxName}.wav`);
        audio.volume = 0.34;
        audio.play().catch(() => {
          if (sfxName === 'whoosh_paper') playSfxWhoosh();
          else if (sfxName === 'counter_ticks') playSfxCounterTicks();
          else if (sfxName === 'chime_highlight') playSfxChime();
          else if (sfxName === 'alert_coral') playSfxAlert();
          else playSfxPop();
        });
        return;
      } catch (_) {
        // Fallback to WebAudio synthesizer below
      }
    }
    if (sfxName === 'whoosh_paper') playSfxWhoosh();
    else if (sfxName === 'counter_ticks') playSfxCounterTicks();
    else if (sfxName === 'chime_highlight') playSfxChime();
    else if (sfxName === 'alert_coral') playSfxAlert();
    else playSfxPop();
  }

  // =========================================================================
  // 2B. CONTINUOUS BGM & LOCATION AMBIENCE ENGINE WITH SMART AUTO-DUCKING
  // =========================================================================
  const BGM_PROGRESSIONS = {
    curious: [261.63, 329.63, 392.0, 523.25, 293.66, 349.23, 440.0, 523.25],
    story: [246.94, 293.66, 369.99, 440.0, 220.0, 261.63, 329.63, 392.0],
    investigation: [220.0, 261.63, 329.63, 440.0, 196.0, 246.94, 293.66, 392.0],
    uplifting: [261.63, 329.63, 392.0, 493.88, 293.66, 369.99, 440.0, 587.33]
  };

  function playBgmStepPulse() {
    if (!state.bgmEnabled || !state.shotPlaying) return;
    ensureAudioContext();
    const ctx = state.audioCtx;
    if (!ctx) return;

    const shot = getActiveShots()[state.currentShotIndex];
    if (!shot || shot.sceneType === 'character-sheet') return;

    const mood = shot.bgmMood || 'curious';
    const notes = BGM_PROGRESSIONS[mood] || BGM_PROGRESSIONS.curious;
    const freq = notes[state.bgmStep % notes.length];
    state.bgmStep += 1;

    // Smart Auto-Ducking: lower BGM to ~28% when VOICE-NARRATOR-001 is actively speaking
    const isSpeaking = state.currentMouthOpen > 0.06;
    const baseGain = isSpeaking ? 0.022 : 0.058;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(920, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(baseGain, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.52);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 0.55);
    subOsc.stop(now + 0.55);

    // Subtle Location Ambience Texture every 4th beat
    if (state.bgmStep % 4 === 0) {
      const loc = state.overrideLocation !== 'auto' ? state.overrideLocation : shot.location;
      const ambOsc = ctx.createOscillator();
      const ambGain = ctx.createGain();
      ambOsc.type = 'sine';
      ambOsc.frequency.setValueAtTime(loc === 'shop' ? 659.25 : loc === 'office' ? 523.25 : 587.33, now + 0.12);
      ambGain.gain.setValueAtTime(0.0005, now + 0.12);
      ambGain.gain.linearRampToValueAtTime(baseGain * 0.45, now + 0.18);
      ambGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.68);
      ambOsc.connect(ambGain);
      ambGain.connect(ctx.destination);
      ambOsc.start(now + 0.12);
      ambOsc.stop(now + 0.7);
    }
  }

  function startBgmEngine() {
    stopBgmEngine();
    if (!state.bgmEnabled) return;
    state.bgmStep = 0;
    playBgmStepPulse();
    state.bgmTimerId = setInterval(playBgmStepPulse, 520);
  }

  function stopBgmEngine() {
    if (state.bgmTimerId) {
      clearInterval(state.bgmTimerId);
      state.bgmTimerId = null;
    }
  }

  function playTransitionSfx(transitionType) {
    ensureAudioContext();
    const ctx = state.audioCtx;
    if (!ctx) return;

    // Play cinematic whoosh + warm harmonic transition bell
    playSfxWhoosh();
    const now = ctx.currentTime;
    const notes =
      transitionType === 'iris'
        ? [392.0, 587.33]
        : transitionType === 'dissolve'
          ? [329.63, 493.88]
          : [440.0, 659.25];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.065);
      gain.gain.setValueAtTime(0.065, now + idx * 0.065);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.065 + 0.34);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.065);
      osc.stop(now + idx * 0.065 + 0.36);
    });
  }

  function triggerSceneTransition(shot, playSound = true) {
    const dirBanner = document.getElementById('directorSectionBanner');
    if (dirBanner && shot) {
      dirBanner.textContent = shot.directorSection || `🎬 ${shot.mode} SCENE`;
    }

    const transOverlay = document.getElementById('sceneTransitionOverlay');
    const stageEl = document.getElementById('animationStage');
    const tType = shot?.transitionType || 'wipe';

    if (transOverlay) {
      transOverlay.classList.remove('active-wipe', 'active-iris', 'active-dissolve');
      void transOverlay.offsetWidth; // Reflow to restart CSS animation
      if (tType === 'iris') transOverlay.classList.add('active-iris');
      else if (tType === 'dissolve') transOverlay.classList.add('active-dissolve');
      else transOverlay.classList.add('active-wipe');
    }

    if (stageEl) {
      stageEl.classList.remove('camera-scene-enter');
      void stageEl.offsetWidth;
      stageEl.classList.add('camera-scene-enter');
    }

    if (playSound) {
      playTransitionSfx(tType);
    }
  }

  // =========================================================================
  // 3. FLOATING IN-WORLD INFOGRAPHIC & SPEECH BUBBLE RENDERER (REF 1–5)
  // =========================================================================
  function renderInfographicHTML(shot) {
    if (shot.sceneType === 'heng-intro') {
      return `
        <div id="animCardPrimary" style="position:absolute; top:92px; left:575px; transition:transform 0.3s ease;">
          <div class="ref-calendar-badge">
            <div class="ref-calendar-ring left"></div>
            <div class="ref-calendar-ring right"></div>
            <div class="ref-calendar-header editable-text-node" contenteditable="true">ថ្ងៃទី</div>
            <div id="domCounterNum" class="ref-calendar-day editable-text-node" contenteditable="true">30</div>
          </div>
        </div>
      `;
    }

    if (shot.sceneType === 'heng-budget') {
      return `
        <div id="animCardPrimary" style="position:absolute; top:92px; left:572px; display:flex; align-items:flex-end; gap:125px; transition:transform 0.3s ease;">
          <div class="ref-calendar-badge">
            <div class="ref-calendar-ring left"></div>
            <div class="ref-calendar-ring right"></div>
            <div class="ref-calendar-header editable-text-node" contenteditable="true">ថ្ងៃទី</div>
            <div class="ref-calendar-day editable-text-node" contenteditable="true">30</div>
          </div>

          <div class="ref-envelope-block">
            <div class="ref-envelope-title editable-text-node" contenteditable="true">ប្រាក់ខែ</div>
            <svg width="82" height="52" viewBox="0 0 82 52">
              <rect x="2" y="2" width="78" height="48" rx="5" fill="#B7F0D0" stroke="#171717" stroke-width="2.4" />
              <polyline points="3,3 41,30 79,3" fill="none" stroke="#171717" stroke-width="2.4" stroke-linejoin="round" />
            </svg>
            <div class="ref-envelope-amount editable-text-node" contenteditable="true">$300</div>
          </div>
        </div>

        <div class="ref-salary-bar-group" style="position:absolute; top:214px; left:560px;">
          <div class="ref-bar-header">
            <span class="editable-text-node" contenteditable="true">ប្រាក់ខែ</span>
            <span id="domCounterNum" class="editable-text-node" contenteditable="true" style="color:#1E7E45; font-family:var(--font-ui); font-weight:800;">$300</span>
          </div>
          <div class="ref-bar-track">
            <div class="ref-bar-segment" data-target-width="81%" style="width:0%; background:#64748B;"></div>
            <div class="ref-bar-segment" data-target-width="19%" style="width:0%; background:#2FAA61;"></div>
          </div>

          <div class="ref-expense-icons-row">
            <div class="ref-essential-group">
              <div class="ref-circles-list">
                <div class="ref-circle-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28">
                    <ellipse cx="14" cy="15" rx="8" ry="4" fill="none" stroke="#64748B" stroke-width="1.4" />
                    <circle cx="14" cy="14" r="3" fill="#FA604E" />
                    <line x1="3" y1="11" x2="3" y2="19" stroke="#64748B" stroke-width="1.4" />
                    <line x1="25" y1="11" x2="25" y2="19" stroke="#64748B" stroke-width="1.4" />
                  </svg>
                </div>
                <div class="ref-circle-icon">
                  <svg width="26" height="26" viewBox="0 0 26 26">
                    <polygon points="13,4 4,12 22,12" fill="none" stroke="#171717" stroke-width="1.8" stroke-linejoin="round" />
                    <rect x="6" y="12" width="14" height="10" fill="none" stroke="#171717" stroke-width="1.8" />
                    <rect x="11" y="15" width="4" height="7" fill="#2FAA61" stroke="#171717" stroke-width="1.2" />
                  </svg>
                </div>
                <div class="ref-circle-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28">
                    <circle cx="8" cy="19" r="3" fill="none" stroke="#171717" stroke-width="1.6" />
                    <circle cx="20" cy="19" r="3" fill="none" stroke="#171717" stroke-width="1.6" />
                    <path d="M 8 16 L 16 16 L 19 10 L 16 10" fill="none" stroke="#5D98E8" stroke-width="2.2" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
              <div class="ref-essential-label editable-text-node" contenteditable="true">ចំណាយចាំបាច់</div>
            </div>

            <div id="animHighlightBadge" class="ref-leftover-group">
              <div class="ref-coral-pill editable-text-node" contenteditable="true">នៅសល់តិច</div>
              <svg width="36" height="24" viewBox="0 0 36 24">
                <ellipse cx="18" cy="16" rx="14" ry="5" fill="#2FAA61" stroke="#171717" stroke-width="1.8" />
                <ellipse cx="18" cy="11" rx="14" ry="5" fill="#2FAA61" stroke="#171717" stroke-width="1.8" />
              </svg>
            </div>
          </div>
        </div>
      `;
    }

    if (shot.sceneType === 'pawn-dialogue') {
      return `
        <div id="animCardPrimary" data-speak-window="0.2,4.2" class="ref-speech-bubble" style="top:184px; left:280px; width:324px; z-index:22; opacity:0; pointer-events:none;">
          <div class="ref-speaker-tag editable-text-node" contenteditable="true">ចរណា</div>
          <div class="editable-text-node" contenteditable="true">
            បង ខ្ញុំត្រូវការលុយប្រាំមួយរយហាសិបដុល្លារ<br/>ដើម្បីបង្វិលទិញទំនិញ។
          </div>
          <svg class="ref-bubble-tail" style="right:22px; bottom:-58px; width:30px; height:60px;" viewBox="0 0 30 60">
            <polyline points="2,0 14,58 24,0" fill="#FFFFFF" stroke="#171717" stroke-width="2.2" stroke-linejoin="round" />
          </svg>
        </div>

        <div id="animHighlightBadge" data-speak-window="4.3,7.8" class="ref-speech-bubble" style="top:230px; left:242px; width:232px; z-index:26; padding:11px 16px; font-size:15px; color:#52525B; opacity:0; pointer-events:none;">
          <div class="ref-speaker-tag editable-text-node" contenteditable="true" style="font-size:11px; padding:1px 8px;">គន្ធា</div>
          <div class="editable-text-node" contenteditable="true">
            ដាក់ខ្សែកមកចុះប្អូន។ ខ្ញុំថ្លឹងមើលសិន។
          </div>
          <svg class="ref-bubble-tail" style="left:10px; bottom:-48px; width:26px; height:50px;" viewBox="0 0 26 50">
            <polyline points="2,0 6,48 20,0" fill="#FFFFFF" stroke="#171717" stroke-width="2.2" stroke-linejoin="round" />
          </svg>
        </div>
      `;
    }

    if (shot.sceneType === 'pawn-scale-hybrid') {
      return `
        <div class="ref-chapter-tracker">
          <div class="ref-tracker-slots">
            <div class="ref-tracker-day done">1✓</div>
            <div class="ref-tracker-day done">2✓</div>
            <div class="ref-tracker-day"></div>
            <div class="ref-tracker-day"></div>
            <div class="ref-tracker-day"></div>
          </div>
          <div class="ref-tracker-ribbon editable-text-node" contenteditable="true">2. បើកហាង</div>
        </div>

        <div id="animCardPrimary" style="position:absolute; top:94px; left:536px; width:404px; transition:transform 0.3s ease;">
          <div class="editable-text-node" contenteditable="true" style="text-align:center; font-size:21px; font-weight:800; margin-bottom:4px;">
            គ្រឿងអលង្ការ ≈ 70-85%
          </div>
          <div id="domCounterNum" class="editable-text-node" contenteditable="true" style="text-align:right; font-size:15px; font-weight:800; margin-bottom:5px;">
            តម្លៃ $966
          </div>
          <div class="ref-bar-track" style="height:38px; border-radius:7px;">
            <div class="ref-bar-segment" data-target-width="68%" style="width:0%; background:#6DBB70;"></div>
            <div class="ref-bar-segment coral-hatch" data-target-width="32%" style="width:0%;"></div>
          </div>
          <div id="animHighlightBadge" class="editable-text-node" contenteditable="true" style="margin-top:6px; font-size:15px; font-weight:800; color:#236B38; display:inline-block; transition:transform 0.3s ease;">
            ខ្ចីបាន $650
          </div>
        </div>
      `;
    }

    if (shot.sceneType === 'character-sheet') {
      return `
        <div style="position:absolute; top:12px; left:36px; right:36px; display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:800; font-size:15px; color:#171717;">
            EP01 ANTHOLOGY CAST & PROP SHEET — MASTER DESIGN SYSTEM v2.0
          </div>
          <div style="display:flex; gap:6px;">
            <span class="pal-chip" style="color:#171717; font-weight:700;">តារា (VOICE-CAST-01)</span>
            <span class="pal-chip" style="color:#2FAA61; font-weight:700;">ណារី (VOICE-CAST-02)</span>
            <span class="pal-chip" style="color:#7C4D2B; font-weight:700;">បងសុខ (VOICE-CAST-03)</span>
          </div>
        </div>
      `;
    }

    if (window.EP01_ICED_COFFEE && typeof window.EP01_ICED_COFFEE.renderInfographic === 'function') {
      const ep01Html = window.EP01_ICED_COFFEE.renderInfographic(shot);
      if (ep01Html) return ep01Html;
    }

    return '';
  }

  // =========================================================================
  // 4. CAMERA FRAMING, INTRA-SHOT CAMERA ZOOM/PAN ("គិតមើល" CAMERA BEATS) & SHOT LOADER
  // =========================================================================
  function getInterpolatedCameraBeat(shot, elapsed, isPlaying) {
    if (!isPlaying || !shot || state.cameraFraming !== 'wide') {
      return { zoom: 1.0, panX: 0, panY: 0 };
    }
    const beats = Array.isArray(shot.cameraBeats) && shot.cameraBeats.length > 0
      ? shot.cameraBeats
      : [
          { at: 0.0, zoom: 1.0, panX: 0, panY: 0 },
          { at: 6.0, zoom: 1.05, panX: -12, panY: -6 },
          { at: 16.0, zoom: 1.0, panX: 0, panY: 0 }
        ];

    let idx = 0;
    for (let i = 0; i < beats.length; i++) {
      if (elapsed >= beats[i].at) idx = i;
    }
    const cur = beats[idx];
    const next = beats[idx + 1];
    if (!next || next.at <= cur.at) {
      return {
        zoom: cur.zoom ?? 1.0,
        panX: cur.panX ?? 0,
        panY: cur.panY ?? 0
      };
    }
    const rawT = Math.max(0, Math.min(1, (elapsed - cur.at) / (next.at - cur.at)));
    const smoothT = rawT * rawT * (3 - 2 * rawT); // cubic smoothstep
    return {
      zoom: (cur.zoom ?? 1.0) + ((next.zoom ?? 1.0) - (cur.zoom ?? 1.0)) * smoothT,
      panX: (cur.panX ?? 0) + ((next.panX ?? 0) - (cur.panX ?? 0)) * smoothT,
      panY: (cur.panY ?? 0) + ((next.panY ?? 0) - (cur.panY ?? 0)) * smoothT
    };
  }

  function applyCameraFraming(elapsed = 0, isPlaying = false) {
    const envSvg = document.querySelector('.layer-environment .rig-svg');
    const charSvg = document.querySelector('.layer-characters .rig-svg');
    const shot = getActiveShots()[state.currentShotIndex];
    if (!envSvg || !charSvg || !shot) return;

    if (shot.sceneType === 'character-sheet') {
      envSvg.setAttribute('viewBox', '0 0 960 540');
      charSvg.setAttribute('viewBox', '0 0 960 540');
      return;
    }

    const activeLoc = state.overrideLocation !== 'auto' ? state.overrideLocation : shot.location;
    const focusActor = shot.actors[shot.actors.length - 1] || { x: 245 };
    const camBeat = getInterpolatedCameraBeat(shot, elapsed, isPlaying);

    let baseX = 0;
    let baseY = 0;
    let baseW = 960;
    let baseH = 540;

    if (state.aspect === '9:16') {
      // 9:16 TikTok / Reels Vertical (540x960): Place characters + foreground props in lower half (y = 465..755px)
      let baseVbX = 65;
      if (activeLoc === 'shop') baseVbX = 115;
      else if (activeLoc === 'whiteboard' && shot.sceneType !== 'ep01-sugar-xray') baseVbX = -15;

      if (state.cameraFraming === 'wide') {
        baseX = baseVbX; baseY = -325; baseW = 540; baseH = 960;
      } else if (state.cameraFraming === 'medium') {
        baseX = baseVbX + 45; baseY = -195; baseW = 432; baseH = 768;
      } else {
        baseX = Math.max(0, focusActor.x - 160); baseY = -65; baseW = 324; baseH = 576;
      }
    } else if (state.aspect === '1:1') {
      // 1:1 Facebook Square (760x760): Place characters + foreground props in lower half (y = 375..655px)
      let baseVbX = -35;
      if (activeLoc === 'shop') baseVbX = 15;
      else if (activeLoc === 'whiteboard' && shot.sceneType !== 'ep01-sugar-xray') baseVbX = -135;

      if (state.cameraFraming === 'wide') {
        baseX = baseVbX; baseY = -225; baseW = 760; baseH = 760;
      } else if (state.cameraFraming === 'medium') {
        baseX = baseVbX + 65; baseY = -125; baseW = 608; baseH = 608;
      } else {
        baseX = Math.max(0, focusActor.x - 210); baseY = -20; baseW = 440; baseH = 440;
      }
    } else {
      // Default 16:9 YouTube Master (960x540)
      if (state.cameraFraming === 'wide') {
        baseX = 0; baseY = 0; baseW = 960; baseH = 540;
      } else if (state.cameraFraming === 'medium') {
        baseX = 80; baseY = 120; baseW = 680; baseH = 382;
      } else if (state.cameraFraming === 'closeup') {
        baseX = Math.max(0, focusActor.x - 190); baseY = 145; baseW = 380; baseH = 214;
      }
    }

    // Apply intra-shot camera zoom & pan while keeping framing clean
    const zoom = Math.max(0.85, Math.min(1.45, camBeat.zoom || 1.0));
    const panScale = state.aspect === '16:9' ? 1.0 : 0.45;
    const vbW = baseW / zoom;
    const vbH = baseH / zoom;
    const vbX = baseX + (baseW - vbW) * 0.35 + (camBeat.panX || 0) * panScale;
    const vbY = baseY + (baseH - vbH) * 0.55 + (camBeat.panY || 0) * panScale;

    const vbStr = `${vbX.toFixed(1)} ${vbY.toFixed(1)} ${vbW.toFixed(1)} ${vbH.toFixed(1)}`;
    envSvg.setAttribute('viewBox', vbStr);
    charSvg.setAttribute('viewBox', vbStr);
  }

  function applyResponsiveInfographicLayout() {
    const infoContainer = document.getElementById('infographicContainer');
    const shot = getActiveShots()[state.currentShotIndex];
    if (!infoContainer || !shot) return;

    const children = Array.from(infoContainer.children);
    children.forEach((el) => {
      if (el.dataset.origSaved !== '1') {
        el.dataset.origTop = el.style.top || '';
        el.dataset.origLeft = el.style.left || '';
        el.dataset.origRight = el.style.right || '';
        el.dataset.origWidth = el.style.width || '';
        el.dataset.origSaved = '1';
      }
    });

    if (state.aspect === '16:9') {
      children.forEach((el) => {
        el.style.top = el.dataset.origTop;
        el.style.left = el.dataset.origLeft;
        el.style.right = el.dataset.origRight;
        el.style.width = el.dataset.origWidth;
        el.dataset.aspectScale = '1';
        el.style.transformOrigin = 'top left';
        el.style.transform = 'translateY(0px) scale(1)';
      });
      return;
    }

    if (shot.sceneType === 'character-sheet') {
      children.forEach((el) => {
        el.style.top = '18px';
        el.style.left = '24px';
        el.style.right = '24px';
        el.style.flexWrap = 'wrap';
        el.style.gap = '6px';
        el.dataset.aspectScale = state.aspect === '9:16' ? '0.88' : '0.95';
        el.style.transformOrigin = 'top left';
        el.style.transform = `scale(${el.dataset.aspectScale})`;
      });
      return;
    }

    const hasTracker = !!infoContainer.querySelector('.ref-chapter-tracker, .km-key-tracker');
    const hasSalaryBar = !!infoContainer.querySelector('.ref-salary-bar-group');
    const hasSpeechBubble = !!infoContainer.querySelector('.ref-speech-bubble');

    if (state.aspect === '9:16') {
      // 9:16 TikTok (540x960): Safe upper zone x = 42..464px (422px wide, clear of 56px TikTok right rail), y = 48..450px
      children.forEach((el) => {
        el.style.transformOrigin = 'top left';
        if (
          el.classList.contains('broll-cutaway-card') ||
          el.classList.contains('director-intro-card') ||
          el.classList.contains('director-outro-card')
        ) {
          el.style.top = '368px';
          el.style.left = '44px';
          el.dataset.aspectScale = '0.88';
        } else if (el.classList.contains('ref-speech-bubble') && shot.sceneType !== 'pawn-dialogue') {
          el.style.top = '368px';
          el.style.left = '54px';
          el.dataset.aspectScale = '0.90';
        } else if (el.classList.contains('ref-chapter-tracker') || el.classList.contains('km-key-tracker')) {
          el.style.top = '46px';
          el.style.left = '42px';
          el.dataset.aspectScale = '0.84';
        } else if (hasSalaryBar && el.id === 'animCardPrimary') {
          el.style.top = '74px';
          el.style.left = '46px';
          el.dataset.aspectScale = '0.86';
        } else if (el.classList.contains('ref-salary-bar-group')) {
          el.style.top = '184px';
          el.style.left = '46px';
          el.style.width = '380px';
          el.dataset.aspectScale = '0.96';
        } else if (shot.sceneType === 'ep01-smart-swap') {
          if (el.classList.contains('ref-speech-bubble')) {
            el.style.top = '368px';
            el.style.left = '64px';
            el.dataset.aspectScale = '0.92';
          } else {
            el.style.top = '58px';
            el.style.left = '42px';
            el.dataset.aspectScale = '0.87';
          }
        } else if (shot.sceneType === 'pawn-dialogue') {
          if (el.id === 'animCardPrimary') {
            el.style.top = '155px';
            el.style.left = '54px';
            el.dataset.aspectScale = '0.95';
          } else {
            el.style.top = '295px';
            el.style.left = '84px';
            el.dataset.aspectScale = '0.95';
          }
        } else {
          const nativeW = parseFloat(el.dataset.origWidth) || 405;
          const scale = nativeW > 416 ? Number((416 / nativeW).toFixed(3)) : 0.94;
          const renderedW = nativeW * scale;
          const leftPx = Math.round(42 + Math.max(0, (416 - renderedW) / 2));
          const topPx = hasTracker ? 88 : 68;
          el.style.top = `${topPx}px`;
          el.style.left = `${leftPx}px`;
          el.dataset.aspectScale = String(scale);
        }
        el.style.transform = `translateY(0px) scale(${el.dataset.aspectScale || '1'})`;
      });
      return;
    }

    if (state.aspect === '1:1') {
      // 1:1 Facebook Square (760x760): Safe upper zone x = 76..684px (608px wide), y = 44..360px
      children.forEach((el) => {
        el.style.transformOrigin = 'top left';
        if (
          el.classList.contains('broll-cutaway-card') ||
          el.classList.contains('director-intro-card') ||
          el.classList.contains('director-outro-card')
        ) {
          el.style.top = '298px';
          el.style.left = '175px';
          el.dataset.aspectScale = '0.88';
        } else if (el.classList.contains('ref-speech-bubble') && shot.sceneType !== 'pawn-dialogue') {
          el.style.top = '306px';
          el.style.left = '86px';
          el.dataset.aspectScale = '0.86';
        } else if (el.classList.contains('ref-chapter-tracker') || el.classList.contains('km-key-tracker')) {
          el.style.top = '40px';
          el.style.left = '64px';
          el.dataset.aspectScale = '0.90';
        } else if (hasSalaryBar && el.id === 'animCardPrimary') {
          el.style.top = '58px';
          el.style.left = '175px';
          el.dataset.aspectScale = '0.90';
        } else if (el.classList.contains('ref-salary-bar-group')) {
          el.style.top = '162px';
          el.style.left = '190px';
          el.style.width = '380px';
          el.dataset.aspectScale = '0.95';
        } else if (shot.sceneType === 'ep01-smart-swap') {
          if (el.classList.contains('ref-speech-bubble')) {
            el.style.top = '314px';
            el.style.left = '86px';
            el.dataset.aspectScale = '0.86';
          } else {
            el.style.top = '48px';
            el.style.left = '168px';
            el.dataset.aspectScale = '0.90';
          }
        } else if (shot.sceneType === 'pawn-dialogue') {
          if (el.id === 'animCardPrimary') {
            el.style.top = '115px';
            el.style.left = '215px';
            el.dataset.aspectScale = '0.96';
          } else {
            el.style.top = '235px';
            el.style.left = '165px';
            el.dataset.aspectScale = '0.96';
          }
        } else {
          const nativeW = parseFloat(el.dataset.origWidth) || 405;
          const scale =
            shot.sceneType === 'ep01-glucose-curve'
              ? 0.85
              : nativeW > 520
                ? 0.88
                : 0.92;
          const renderedW = nativeW * scale;
          const leftPx = Math.round((760 - renderedW) / 2);
          const topPx = hasTracker ? 76 : 56;
          el.style.top = `${topPx}px`;
          el.style.left = `${leftPx}px`;
          el.dataset.aspectScale = String(scale);
        }
        el.style.transform = `translateY(0px) scale(${el.dataset.aspectScale || '1'})`;
      });
    }
  }

  function renderEnvironmentLayer() {
    const shot = getActiveShots()[state.currentShotIndex];
    const envSvg = document.getElementById('environmentSvgGroup');
    if (!envSvg || !shot) return;

    if (shot.sceneType === 'character-sheet') {
      envSvg.innerHTML = window.CharacterRig.renderCharacterSheetSVG();
    } else {
      const activeLoc =
        state.overrideLocation !== 'auto' ? state.overrideLocation : shot.location;
      envSvg.innerHTML = window.CharacterRig.renderLocationSVG(activeLoc, {
        showPawnSign: shot.sceneType === 'pawn-scale-hybrid',
        envOpacity: Math.min(1, state.envScale / 100)
      });
    }
  }

  function loadShot(index, triggerAudio = true) {
    if (!state.autoAdvanceEpisode && state.shotPlaying) {
      stopShotPlayback();
    }
    const shots = getActiveShots();
    state.currentShotIndex = Math.max(0, Math.min(index, shots.length - 1));
    state.scaleCounterText = '966';
    const shot = shots[state.currentShotIndex];

    document.querySelectorAll('.shot-tab-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
    });

    const modeBadge = document.getElementById('currentModeBadge');
    if (modeBadge) {
      modeBadge.textContent = `MODE: ${shot.mode}`;
    }

    renderEnvironmentLayer();

    const infoContainer = document.getElementById('infographicContainer');
    if (infoContainer) {
      infoContainer.innerHTML = renderInfographicHTML(shot);
      applyResponsiveInfographicLayout();
      requestAnimationFrame(() => {
        setTimeout(() => {
          infoContainer.querySelectorAll('.ref-bar-segment').forEach((seg) => {
            seg.style.width = seg.getAttribute('data-target-width');
          });
        }, 50);
      });
    }

    const captionEl = document.getElementById('stageCaptionText');
    if (captionEl) {
      captionEl.classList.remove('voice-active');
      captionEl.innerHTML = '';
    }

    const promptBox = document.getElementById('aiStudioPromptBox');
    if (promptBox) promptBox.textContent = shot.aiStudioPrompt;

    const castNameLabel = document.getElementById('activeCastLabel');
    if (castNameLabel) {
      castNameLabel.textContent =
        shot.actors.length > 0
          ? shot.actors.map((a) => a.name.split(' ')[0]).join(' • ')
          : 'Character Sheet';
    }

    applyCameraFraming();
    triggerSceneTransition(shot, triggerAudio);
    tryAutoLoadShotVoice(shot, state.autoAdvanceEpisode);
  }

  function updateVoiceRunningCaption(shot, elapsed, isVoicePlaying) {
    const captionEl = document.getElementById('stageCaptionText');
    if (!captionEl) return;

    if (!isVoicePlaying || !shot || shot.sceneType === 'character-sheet') {
      captionEl.classList.remove('voice-active');
      return;
    }

    const totalDur = Math.max(4.0, state.shotDuration || shot.defaultDuration || 8.0);
    let beatText = shot.captionKhmer || '';
    let beatStart = 0;
    let beatEnd = totalDur;

    if (Array.isArray(shot.captionBeats) && shot.captionBeats.length > 0) {
      let activeIdx = 0;
      for (let i = 0; i < shot.captionBeats.length; i++) {
        if (elapsed >= shot.captionBeats[i].at) {
          activeIdx = i;
        }
      }
      beatText = shot.captionBeats[activeIdx].text || '';
      beatStart = shot.captionBeats[activeIdx].at || 0;
      beatEnd =
        activeIdx + 1 < shot.captionBeats.length
          ? shot.captionBeats[activeIdx + 1].at
          : totalDur;
    }

    if (!beatText.trim()) {
      captionEl.classList.remove('voice-active');
      return;
    }

    captionEl.classList.add('voice-active');
    const beatDur = Math.max(0.4, beatEnd - beatStart);
    const beatProgress = Math.max(0, Math.min(1, (elapsed - beatStart) / beatDur));

    const tokens = beatText.trim().split(/\s+/);
    const activeTokenIdx = Math.min(tokens.length - 1, Math.floor(beatProgress * tokens.length));
    const cacheKey = `${beatText}|${activeTokenIdx}`;

    if (captionEl.dataset.renderKey !== cacheKey) {
      captionEl.dataset.renderKey = cacheKey;
      const wordsHtml = tokens
        .map((w, idx) => {
          const cls =
            idx < activeTokenIdx
              ? 'cap-token spoken'
              : idx === activeTokenIdx
                ? 'cap-token active-word'
                : 'cap-token upcoming';
          return `<span class="${cls}">${w}</span>`;
        })
        .join(' ');
      captionEl.innerHTML = `${wordsHtml}<div id="captionVoiceProgBar" class="caption-voice-progress" style="width:${(beatProgress * 100).toFixed(1)}%"></div>`;
    } else {
      const progBar = document.getElementById('captionVoiceProgBar');
      if (progBar) {
        progBar.style.width = `${(beatProgress * 100).toFixed(1)}%`;
      }
    }
  }

  function connectExternalAudioAnalyser(audio) {
    if (!audio || audio._analyserConnected) return;
    ensureAudioContext();
    if (!state.audioCtx) return;
    try {
      const source = state.audioCtx.createMediaElementSource(audio);
      const analyser = state.audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(state.audioCtx.destination);
      state.externalAnalyser = analyser;
      state.externalDataArray = new Uint8Array(analyser.frequencyBinCount);
      audio._analyserConnected = true;
    } catch (_) {
      // Already connected or unsupported
    }
  }

  function applyInfographicTimelineState(elapsed, isPlaying) {
    const infoContainer = document.getElementById('infographicContainer');
    if (!infoContainer) return;

    infoContainer.querySelectorAll('[data-reveal-at]').forEach((el) => {
      const revealAt = parseFloat(el.getAttribute('data-reveal-at')) || 0;
      const baseScale = parseFloat(el.dataset.aspectScale || '1');
      if (!isPlaying || elapsed >= revealAt) {
        el.style.transition =
          'opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1), transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.opacity = '1';
        el.style.transform = `translateY(0px) scale(${baseScale})`;
        el.style.pointerEvents = 'auto';
      } else {
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.transform = `translateY(12px) scale(${(baseScale * 0.96).toFixed(3)})`;
        el.style.pointerEvents = 'none';
      }
    });

    // Character Dialog Info Boxes (.ref-speech-bubble with data-speak-window="start,end"):
    // Visible ONLY when the shot is playing AND the character is actively speaking!
    infoContainer.querySelectorAll('[data-speak-window]').forEach((el) => {
      const rawWin = (el.getAttribute('data-speak-window') || '0,0').split(',');
      const speakStart = parseFloat(rawWin[0]) || 0;
      const speakEnd = parseFloat(rawWin[1]) || 0;
      const baseScale = parseFloat(el.dataset.aspectScale || '1');
      const isCharacterSpeaking = isPlaying && elapsed >= speakStart && elapsed <= speakEnd;

      if (isCharacterSpeaking) {
        el.style.transition =
          'opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1), transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.opacity = '1';
        el.style.transform = `translateY(0px) scale(${baseScale})`;
        el.style.pointerEvents = 'auto';
        if (el.dataset.speakSfxFired !== '1') {
          el.dataset.speakSfxFired = '1';
          if (elapsed > 0.3) playSfxPop();
        }
      } else {
        el.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        el.style.opacity = '0';
        el.style.transform = `translateY(10px) scale(${(baseScale * 0.95).toFixed(3)})`;
        el.style.pointerEvents = 'none';
        if (!isPlaying || elapsed < speakStart) {
          el.dataset.speakSfxFired = '0';
        }
      }
    });

    // Animated B-Roll Cutaway Windows, Episode Intro Banner & Episode Outro CTA Cards
    infoContainer.querySelectorAll('[data-broll-window]').forEach((el) => {
      const rawWin = (el.getAttribute('data-broll-window') || '0,0').split(',');
      const winStart = parseFloat(rawWin[0]) || 0;
      const winEnd = parseFloat(rawWin[1]) || 0;
      const baseScale = parseFloat(el.dataset.aspectScale || '1');
      const inWindow = isPlaying && elapsed >= winStart && elapsed <= winEnd;

      if (inWindow) {
        el.style.transition =
          'opacity 0.44s cubic-bezier(0.22, 1, 0.36, 1), transform 0.44s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.opacity = '1';
        el.style.transform = `translateY(0px) scale(${baseScale})`;
        el.style.pointerEvents = 'auto';
        if (el.dataset.brollSfxFired !== '1') {
          el.dataset.brollSfxFired = '1';
          if (elapsed > 0.5) playSfxPop();
        }
      } else {
        el.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
        el.style.opacity = '0';
        el.style.transform = `translateY(12px) scale(${(baseScale * 0.95).toFixed(3)})`;
        el.style.pointerEvents = 'none';
        if (!isPlaying || elapsed < winStart) {
          el.dataset.brollSfxFired = '0';
        }
      }
    });

    infoContainer.querySelectorAll('.ref-bar-segment').forEach((seg) => {
      const fillAt = parseFloat(seg.getAttribute('data-fill-at')) || 0.2;
      if (!isPlaying || elapsed >= fillAt) {
        seg.style.transition = 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
        seg.style.width = seg.getAttribute('data-target-width');
      } else {
        seg.style.transition = 'none';
        seg.style.width = '0%';
      }
    });

    // "គិតមើល" In-Place Info-Box Miniaturization ("Shrink-to-Corner" via data-dock-at="seconds")
    infoContainer.querySelectorAll('[data-dock-at]').forEach((el) => {
      const dockAt = parseFloat(el.getAttribute('data-dock-at')) || 999;
      const baseScale = parseFloat(el.dataset.aspectScale || '1');
      const dockScaleMult = parseFloat(el.getAttribute('data-dock-scale') || '0.68');
      const dockX = parseFloat(el.getAttribute('data-dock-x') || '0');
      const dockY = parseFloat(el.getAttribute('data-dock-y') || '-14');

      if (isPlaying && elapsed >= dockAt) {
        el.style.transition = 'transform 0.52s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.42s ease';
        el.style.transformOrigin = 'top left';
        el.style.transform = `translate(${dockX}px, ${dockY}px) scale(${(baseScale * dockScaleMult).toFixed(3)})`;
      } else if (!el.hasAttribute('data-reveal-at') || !isPlaying || elapsed >= (parseFloat(el.getAttribute('data-reveal-at')) || 0)) {
        el.style.transition = 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = `translateY(0px) scale(${baseScale})`;
      }
    });

    // "គិតមើល" Dim-to-Bold Progressive Checklists (.km-check-row[data-check-at="seconds"])
    infoContainer.querySelectorAll('.km-check-row[data-check-at]').forEach((row) => {
      const checkAt = parseFloat(row.getAttribute('data-check-at')) || 0;
      const box = row.querySelector('.km-check-box');
      if (!isPlaying || elapsed >= checkAt) {
        row.classList.remove('dimmed');
        row.classList.add('active-check');
        if (box) box.textContent = '✓';
        if (isPlaying && row.dataset.checkSfxFired !== '1') {
          row.dataset.checkSfxFired = '1';
          if (elapsed > 0.4) playSfxChime();
        }
      } else {
        row.classList.add('dimmed');
        row.classList.remove('active-check');
        if (box) box.textContent = '';
        row.dataset.checkSfxFired = '0';
      }
    });
  }

  function renderScrubberMarkers(shot, totalDur) {
    const labelsEl = document.getElementById('scrubberLabels');
    const ticksEl = document.getElementById('scrubberTicksContainer');
    const dur = Math.max(4.0, totalDur || shot?.defaultDuration || 8.0);
    if (!labelsEl || !ticksEl) return;

    if (shot && Array.isArray(shot.captionBeats) && shot.captionBeats.length > 0) {
      const colors = ['#5D98E8', '#EABF42', '#FA604E', '#2FAA61'];
      const beatSpans = shot.captionBeats.map((b, idx) => {
        const col = colors[idx % colors.length];
        return `<span style="color:${col}">${b.at.toFixed(1)}s: Beat ${idx + 1}</span>`;
      });
      beatSpans.push(`<span>${dur.toFixed(1)}s: End</span>`);
      labelsEl.innerHTML = beatSpans.join('');

      ticksEl.innerHTML = shot.captionBeats
        .slice(1)
        .map((b, idx) => {
          const pct = Math.min(98, Math.max(2, (b.at / dur) * 100));
          const col = colors[(idx + 1) % colors.length];
          return `<div class="scrubber-tick" style="left:${pct.toFixed(1)}%; background:${col};"></div>`;
        })
        .join('');
    } else {
      labelsEl.innerHTML = `
        <span style="color:#5D98E8">0.0s: VO Start</span>
        <span style="color:#EABF42">1.5s: Whoosh</span>
        <span style="color:#FA604E">3.5s: Roll-Up</span>
        <span style="color:#2FAA61">6.0s: Chime</span>
        <span>${dur.toFixed(1)}s: End</span>
      `;
      ticksEl.innerHTML = `
        <div class="scrubber-tick" style="left:18.75%; background:#EABF42;"></div>
        <div class="scrubber-tick" style="left:43.75%; background:#FA604E;"></div>
        <div class="scrubber-tick" style="left:75%; background:#2FAA61;"></div>
      `;
    }
  }

  async function tryAutoLoadShotVoice(shot, autoPlayAfterLoad = false) {
    const label = document.getElementById('voiceFileLabel');
    const readoutEl = document.getElementById('timelineReadout');
    if (state.externalAudio) {
      state.externalAudio.pause();
    }
    state.shotDuration = shot?.defaultDuration || 8.0;
    if (readoutEl) readoutEl.textContent = `0.0s / ${state.shotDuration.toFixed(1)}s`;
    renderScrubberMarkers(shot, state.shotDuration);

    if (!shot || !shot.voiceBase) {
      state.usingExternalAudio = false;
      state.externalAudio = null;
      if (label) {
        label.textContent = 'Load .WAV/.MP3 (Real RMS Lip-Sync)';
      }
      return;
    }

    for (const ext of ['.wav', '.mp3']) {
      const candidateUrl = `${shot.voiceBase}${ext}`;
      try {
        const res = await fetch(candidateUrl, { method: 'HEAD', cache: 'no-store' });
        if (res.ok) {
          const audio = new Audio(candidateUrl);
          audio.crossOrigin = 'anonymous';
          audio.preload = 'metadata';

          audio.addEventListener('loadedmetadata', () => {
            if (audio.duration && isFinite(audio.duration) && audio.duration > 0.5) {
              state.shotDuration = Number(audio.duration.toFixed(1));
              if (readoutEl && !state.shotPlaying) {
                readoutEl.textContent = `0.0s / ${state.shotDuration.toFixed(1)}s`;
              }
              renderScrubberMarkers(shot, state.shotDuration);
            }
          });

          audio.addEventListener('ended', () => {
            if (state.shotPlaying) {
              handleShotPlaybackFinished();
            }
          });

          state.externalAudio = audio;
          state.usingExternalAudio = true;
          const shortName = candidateUrl.split('/').pop();
          if (label) label.textContent = `🟢 Ready: ${shortName}`;

          if (autoPlayAfterLoad) {
            startShotPlayback();
          }
          return;
        }
      } catch (_) {
        // Ignore when file does not exist yet
      }
    }

    state.usingExternalAudio = false;
    state.externalAudio = null;
    if (label) {
      const expectedName = `${shot.voiceBase.split('/').pop()}.wav`;
      label.textContent = `📂 Drop ${expectedName} in audio/voice/`;
    }
  }

  function setSheetCharacter(charKey) {
    state.sheetCharacter = charKey;
    loadShot(state.currentShotIndex, true);
  }

  // =========================================================================
  // 5. AUDIO-DRIVEN SHOT PREVIEW TIMELINE, FULL-EPISODE AUTO-ADVANCE & SCRUBBER
  // =========================================================================
  function toggleShotPlayback() {
    if (state.shotPlaying) {
      state.autoAdvanceEpisode = false;
      stopShotPlayback();
    } else {
      state.autoAdvanceEpisode = false;
      startShotPlayback();
    }
  }

  function toggleFullEpisodePlayback() {
    if (state.shotPlaying && state.autoAdvanceEpisode) {
      state.autoAdvanceEpisode = false;
      stopShotPlayback();
      return;
    }
    state.autoAdvanceEpisode = true;
    const shots = getActiveShots();
    // If currently on the Character Sheet tab, start from Shot 01
    if (shots[state.currentShotIndex]?.sceneType === 'character-sheet') {
      loadShot(0, false);
      setTimeout(() => startShotPlayback(), 180);
    } else {
      startShotPlayback();
    }
  }

  function startShotPlayback() {
    ensureAudioContext();
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }

    state.shotPlaying = true;
    state.shotStartTime = performance.now();
    state.shotElapsed = 0;
    state.sfxTriggered = { whoosh: false, ticks: false, chime: false };
    state.triggeredCueIndices = new Set();
    state.lipSyncEnabled = true;

    const btn = document.getElementById('btnPlayShot8s');
    if (btn) {
      btn.textContent = '⏹ Stop Shot';
      btn.style.background = '#FA604E';
      btn.style.borderColor = '#FA604E';
    }
    const btnEp = document.getElementById('btnPlayEpisodeAll');
    if (btnEp) {
      btnEp.textContent = state.autoAdvanceEpisode ? '⏹ Stop Full Episode' : '🎬 Play Full Episode';
    }

    // Initialize staged infographic elements and bars at t = 0.0s
    applyInfographicTimelineState(0, true);
    startBgmEngine();

    if (state.externalAudio) {
      connectExternalAudioAnalyser(state.externalAudio);
      if (state.externalAudio.duration && isFinite(state.externalAudio.duration)) {
        state.shotDuration = Number(state.externalAudio.duration.toFixed(1));
      }
      state.externalAudio.currentTime = 0;
      state.externalAudio.play().catch(() => {});
    }
  }

  function handleShotPlaybackFinished() {
    if (state.autoAdvanceEpisode) {
      const shots = getActiveShots();
      const nextIdx = state.currentShotIndex + 1;
      // Advance across all story/explainer shots (stop before the Character Sheet tab)
      if (nextIdx < shots.length && shots[nextIdx].sceneType !== 'character-sheet') {
        state.currentShotIndex = nextIdx;
        renderShotTabs();
        loadShot(nextIdx, true);
        return;
      }
    }
    state.autoAdvanceEpisode = false;
    stopShotPlayback();
  }

  function stopShotPlayback() {
    state.shotPlaying = false;
    stopBgmEngine();
    state.scaleCounterText = '966';
    const btn = document.getElementById('btnPlayShot8s');
    if (btn) {
      btn.textContent = '▶ Play Shot + Voice';
      btn.style.background = '#2FAA61';
      btn.style.borderColor = '#2FAA61';
    }
    const btnEp = document.getElementById('btnPlayEpisodeAll');
    if (btnEp) {
      btnEp.textContent = '🎬 Play Full Episode';
    }
    if (state.externalAudio) {
      state.externalAudio.pause();
    }
    // Restore primary infographic cards to visible state when stopped, while hiding speech bubbles & B-roll
    applyInfographicTimelineState(999, false);
    const shot = getActiveShots()[state.currentShotIndex];
    updateVoiceRunningCaption(shot, 0, false);
    applyCameraFraming(0, false);
    const counterEl = document.getElementById('domCounterNum');
    if (counterEl && shot?.sceneType === 'ep01-sugar-xray') {
      counterEl.textContent = '45g (11 ស្លាបព្រា)';
    }
  }

  function updateShotTimelineEffects(elapsed) {
    const shot = getActiveShots()[state.currentShotIndex];
    if (!shot) return;

    const totalDur = Math.max(4.0, state.shotDuration || shot.defaultDuration || 8.0);
    const pct = Math.min(100, (elapsed / totalDur) * 100);
    const fillEl = document.getElementById('timelineProgressFill');
    const readoutEl = document.getElementById('timelineReadout');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (readoutEl) readoutEl.textContent = `${elapsed.toFixed(1)}s / ${totalDur.toFixed(1)}s`;

    // 1. Voice-Dependent Running Khmer Subtitle Captions (visible & running ONLY when voice plays)
    const isVoiceAudioActive =
      state.shotPlaying &&
      (!state.usingExternalAudio || !state.externalAudio || (!state.externalAudio.paused && !state.externalAudio.ended));
    updateVoiceRunningCaption(shot, elapsed, isVoiceAudioActive);

    // 2. Synchronize Staged Infographic Elements, Character Speech Bubbles & Progress Bar Fills
    applyInfographicTimelineState(elapsed, state.shotPlaying);

    // 2B. Synchronize Intra-Shot Camera Zoom & Pan ("គិតមើល" Camera Beats)
    applyCameraFraming(elapsed, state.shotPlaying);

    // 3. Synchronize Exact SFX Cues (shot.sfxCues) or Fallback Demo SFX
    const cardEl = document.getElementById('animCardPrimary');
    const badgeEl = document.getElementById('animHighlightBadge');
    const counterEl = document.getElementById('domCounterNum');

    if (Array.isArray(shot.sfxCues) && shot.sfxCues.length > 0) {
      shot.sfxCues.forEach((cue, idx) => {
        if (elapsed >= cue.at && !state.triggeredCueIndices.has(idx)) {
          state.triggeredCueIndices.add(idx);
          playNamedSfx(cue.sfx);
        }
      });
    } else {
      const tWhoosh = Math.min(1.5, totalDur * 0.12);
      const tTicksStart = totalDur * 0.35;
      const tChime = totalDur * 0.75;

      if (elapsed >= tWhoosh && !state.sfxTriggered.whoosh) {
        state.sfxTriggered.whoosh = true;
        playSfxWhoosh();
        if (cardEl) {
          cardEl.style.transform = 'scale(1.04)';
          setTimeout(() => {
            if (cardEl) cardEl.style.transform = 'scale(1)';
          }, 260);
        }
      }
      if (elapsed >= tTicksStart && !state.sfxTriggered.ticks) {
        state.sfxTriggered.ticks = true;
        playSfxCounterTicks();
      }
      if (elapsed >= tChime && !state.sfxTriggered.chime) {
        state.sfxTriggered.chime = true;
        playSfxChime();
        if (badgeEl) {
          badgeEl.style.transform = 'scale(1.08)';
          setTimeout(() => {
            if (badgeEl) badgeEl.style.transform = 'scale(1)';
          }, 340);
        }
      }
    }

    // 4. Synchronize Number Counter Roll-up
    if (shot.sceneType === 'ep01-sugar-xray' && counterEl) {
      const rollStart = 9.0;
      const rollEnd = 12.6;
      if (elapsed < rollStart) {
        counterEl.textContent = '10g (2 ស្លាបព្រា)';
      } else if (elapsed <= rollEnd) {
        const progress = Math.max(0, Math.min(1, (elapsed - rollStart) / (rollEnd - rollStart)));
        const val = Math.floor(10 + (45 - 10) * progress);
        const spoons = Math.max(2, Math.round(val / 4));
        counterEl.textContent = `${val}g (${spoons} ស្លាបព្រា)`;
      } else {
        counterEl.textContent = '45g (11 ស្លាបព្រា)';
      }
    } else {
      const tTicksStart = totalDur * 0.35;
      const tTicksEnd = totalDur * 0.55;
      if (elapsed >= tTicksStart && elapsed <= tTicksEnd) {
        const progress = Math.max(0, Math.min(1, (elapsed - tTicksStart) / Math.max(0.5, tTicksEnd - tTicksStart)));
        if (shot.sceneType === 'pawn-scale-hybrid') {
          const val = Math.floor(120 + (966 - 120) * progress);
          state.scaleCounterText = String(val);
          if (counterEl) counterEl.textContent = `តម្លៃ $${val}`;
        } else if (shot.sceneType === 'heng-budget') {
          const val = Math.floor(50 + (300 - 50) * progress);
          if (counterEl) counterEl.textContent = `$${val}`;
        }
      } else if (elapsed > tTicksEnd) {
        state.scaleCounterText = '966';
        if (shot.sceneType === 'pawn-scale-hybrid' && counterEl) {
          counterEl.textContent = 'តម្លៃ $966';
        } else if (shot.sceneType === 'heng-budget' && counterEl) {
          counterEl.textContent = '$300';
        }
      }
    }
  }

  function scrubTimeline(event) {
    const shot = getActiveShots()[state.currentShotIndex];
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const totalDur = Math.max(4.0, state.shotDuration || shot?.defaultDuration || 8.0);
    const targetSeconds = ratio * totalDur;
    state.shotStartTime = performance.now() - targetSeconds * 1000;
    state.shotElapsed = targetSeconds;

    if (shot && Array.isArray(shot.sfxCues)) {
      state.triggeredCueIndices = new Set();
      shot.sfxCues.forEach((cue, idx) => {
        if (cue.at < targetSeconds) state.triggeredCueIndices.add(idx);
      });
    }

    if (state.externalAudio && isFinite(state.externalAudio.duration)) {
      state.externalAudio.currentTime = Math.min(state.externalAudio.duration - 0.05, targetSeconds);
    }
    updateShotTimelineEffects(targetSeconds);
  }

  // =========================================================================
  // 6. 60FPS ANIMATION LOOP & REAL WEBAUDIO RMS LIP-SYNC
  // =========================================================================
  function updateActorFrame(now) {
    const t = now * 0.001;
    const shot = getActiveShots()[state.currentShotIndex];
    if (!shot) return;

    // 1. Update Audio-Driven Shot Timeline if active
    if (state.shotPlaying) {
      const totalDur = Math.max(4.0, state.shotDuration || shot.defaultDuration || 8.0);
      if (state.usingExternalAudio && state.externalAudio && !state.externalAudio.paused) {
        state.shotElapsed = state.externalAudio.currentTime;
      } else {
        state.shotElapsed = (now - state.shotStartTime) * 0.001;
      }
      if (state.shotElapsed >= totalDur && (!state.externalAudio || state.externalAudio.paused || state.externalAudio.ended)) {
        state.shotElapsed = totalDur;
        handleShotPlaybackFinished();
      } else {
        updateShotTimelineEffects(state.shotElapsed);
      }
    }

    // 2. Natural Blinking Interval Logic
    if (!state.isBlinking && now - state.lastBlinkTime > state.blinkInterval * 1000) {
      state.isBlinking = true;
      state.lastBlinkTime = now;
    }
    if (state.isBlinking && now - state.lastBlinkTime > 150) {
      state.isBlinking = false;
    }

    // 3. Calculate Mouth Open (0..1) from Real External Audio RMS or Syllable Cadence (ONLY when voice is playing)
    let primaryMouthOpen = 0;
    if (state.usingExternalAudio && state.externalAnalyser && state.externalAudio && !state.externalAudio.paused) {
      state.externalAnalyser.getByteTimeDomainData(state.externalDataArray);
      let sum = 0;
      for (let i = 0; i < state.externalDataArray.length; i++) {
        const v = (state.externalDataArray[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / state.externalDataArray.length);
      primaryMouthOpen = Math.min(1, rms * 4.5);
    } else if (state.shotPlaying && state.lipSyncEnabled) {
      const syllableWave =
        Math.sin(t * state.mouthCadence * Math.PI) * Math.cos(t * 2.3 * Math.PI);
      primaryMouthOpen = Math.max(0, syllableWave);
    }
    state.currentMouthOpen = primaryMouthOpen;

    // 4. Render Characters & Synchronized Actor Beats
    const charSvgGroup = document.getElementById('characterSvgGroup');
    if (charSvgGroup) {
      if (shot.sceneType === 'character-sheet') {
        charSvgGroup.innerHTML = '';
        requestAnimationFrame(updateActorFrame);
        return;
      }

      const behindCounterActors = [];
      const foregroundActors = [];
      const phase = state.isPlaying ? t * 2.6 : 0;

      // Resolve active timeline actorBeat for primary speaker when playing
      let timelineActorBeat = null;
      if (state.shotPlaying && Array.isArray(shot.actorBeats) && shot.actorBeats.length > 0) {
        timelineActorBeat = shot.actorBeats[0];
        for (let i = 0; i < shot.actorBeats.length; i++) {
          if (state.shotElapsed >= shot.actorBeats[i].at) {
            timelineActorBeat = shot.actorBeats[i];
          }
        }
      }

      shot.actors.forEach((actor, idx) => {
        const isPrimarySpeaker = idx === shot.actors.length - 1 || shot.actors.length === 1;
        let beatEmotion = actor.emotion;
        let beatGesture = actor.gesture;

        if (isPrimarySpeaker && timelineActorBeat) {
          beatEmotion = timelineActorBeat.emotion || actor.emotion;
          beatGesture = timelineActorBeat.gesture || actor.gesture;
        } else if (!isPrimarySpeaker && state.shotPlaying && shot.sceneType === 'ep01-smart-swap') {
          // Bong Sok reacts warmly as Dara completes his 25% sweet fresh-milk order
          if (state.shotElapsed >= 19.0) {
            beatEmotion = 'proud';
            beatGesture = 'present-right';
          }
        }

        const activeEmotion =
          state.overrideEmotion !== 'auto' && isPrimarySpeaker
            ? state.overrideEmotion
            : beatEmotion;

        const activeGesture =
          state.overrideGesture !== 'auto' && isPrimarySpeaker
            ? state.overrideGesture
            : beatGesture;

        const activeAngle =
          state.overrideAngle !== 'auto' && isPrimarySpeaker
            ? state.overrideAngle
            : actor.angle || 'front';

        const actorScale = actor.scale ?? 1.0;
        let actorIsSpeaking = false;
        if (state.shotPlaying && state.lipSyncEnabled) {
          if (Array.isArray(actor.speakWindows)) {
            actorIsSpeaking = actor.speakWindows.some(
              (win) => state.shotElapsed >= win[0] && state.shotElapsed <= win[1]
            );
          } else {
            actorIsSpeaking = isPrimarySpeaker;
          }
        }

        const walkInProgress = state.shotPlaying
          ? Math.max(0, Math.min(1, state.shotElapsed / 1.05))
          : 1;

        const svgStr = window.CharacterRig.renderActorSVG({
          ...actor,
          headRadius: Math.round(state.headRadius * actorScale),
          torsoLength: Math.round(state.torsoLength * actorScale),
          limbLength: Math.round(state.limbLength * actorScale),
          gestureAmplitude: state.gestureAmplitude,
          headTiltOffset: isPrimarySpeaker ? state.headTiltOffset : 0,
          emotion: activeEmotion,
          gesture: activeGesture,
          angle: activeAngle,
          mouthOpen: actorIsSpeaking ? primaryMouthOpen : 0,
          isBlinking: state.isBlinking,
          walkInProgress,
          phase: phase + idx * 0.9
        });

        if (actor.behindCounter) {
          behindCounterActors.push(svgStr);
        } else {
          foregroundActors.push(svgStr);
        }
      });

      const activeLoc =
        state.overrideLocation !== 'auto' ? state.overrideLocation : shot.location;
      const isPawnScene = activeLoc === 'shop';
      const counterForegroundSVG = isPawnScene
        ? window.CharacterRig.renderPawnCounterForegroundSVG(
            shot.sceneType === 'pawn-scale-hybrid',
            state.scaleCounterText
          )
        : '';
      // Reveal Giant X-Ray Cup Prop at 8.5s in Shot 03 when narrator mentions the iced coffee cup
      const showXrayCup =
        shot.sceneType === 'ep01-sugar-xray' && (!state.shotPlaying || state.shotElapsed >= 8.5);
      const coffeeXrayPropSVG = showXrayCup
        ? window.CharacterRig.renderIcedCoffeeXrayPropSVG(325, 430)
        : '';

      charSvgGroup.innerHTML = `
        ${behindCounterActors.join('')}
        ${counterForegroundSVG}
        ${coffeeXrayPropSVG}
        ${foregroundActors.join('')}
      `;
    }

    requestAnimationFrame(updateActorFrame);
  }

  // =========================================================================
  // 7. CALIBRATION SLIDERS, TYPOGRAPHY & EXPORT MODAL
  // =========================================================================
  function updateCalibrationReadouts() {
    document.documentElement.style.setProperty('--stroke-width', `${state.strokeWidth}px`);
    document.documentElement.style.setProperty('--khmer-font', `'${state.khmerFont}', sans-serif`);
    document.documentElement.style.setProperty('--khmer-scale', state.fontScale);
    document.documentElement.style.setProperty('--khmer-lh', state.lineHeight);

    const headDiameter = state.headRadius * 2;
    const totalHeight = headDiameter + state.torsoLength + state.limbLength;
    const ratio = (totalHeight / headDiameter).toFixed(1);
    const ratioEl = document.getElementById('ratioReadout');
    if (ratioEl) ratioEl.textContent = `1:${ratio} Ratio`;
  }

  function loadExternalVoiceFile(file) {
    if (!file) return;
    ensureAudioContext();

    const url = URL.createObjectURL(file);
    if (state.externalAudio) {
      state.externalAudio.pause();
    }
    const audio = new Audio(url);
    audio.crossOrigin = 'anonymous';

    const source = state.audioCtx.createMediaElementSource(audio);
    const analyser = state.audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(state.audioCtx.destination);

    state.externalAudio = audio;
    state.externalAnalyser = analyser;
    state.externalDataArray = new Uint8Array(analyser.frequencyBinCount);
    state.usingExternalAudio = true;

    const label = document.getElementById('voiceFileLabel');
    if (label) label.textContent = `🎵 ${file.name.slice(0, 18)}`;
    audio.play();
  }

  function openExportModal() {
    const headDiameter = state.headRadius * 2;
    const totalHeight = headDiameter + state.torsoLength + state.limbLength;
    const ratio = (totalHeight / headDiameter).toFixed(1);
    const shot = getActiveShots()[state.currentShotIndex];

    const payload = `/* =========================================================
 * APPROVED KHMER 2D STICK-FIGURE VISUAL SYSTEM TOKENS (v2.0)
 * Calibrated for Antigravity HTML/CSS/SVG Scene Generation
 * ========================================================= */
:root {
  /* Semantic Palette */
  --canvas-bg: #F5F5F3;
  --card-fill: #FFFFFF;
  --ink-primary: #171717;
  --env-neutral: #E5E7EB;
  --sem-green: #2FAA61;
  --sem-coral: #FA604E;
  --sem-blue: #5D98E8;
  --sem-gold: #EABF42;

  /* Approved Rig Proportions (1:${ratio} Head-to-Body Ratio) */
  --rig-stroke-width: ${state.strokeWidth}px;
  --rig-head-radius: ${state.headRadius}px;
  --rig-torso-length: ${state.torsoLength}px;
  --rig-limb-length: ${state.limbLength}px;

  /* Approved Acting & Timing Intervals */
  --act-blink-interval: ${state.blinkInterval}s;
  --act-gesture-amplitude: ${state.gestureAmplitude}x;
  --act-mouth-cadence: ${state.mouthCadence}Hz;
  --env-anchor-scale: ${state.envScale}%;

  /* Approved Khmer Post-Editable DOM Typography */
  --khmer-font-family: '${state.khmerFont}', sans-serif;
  --khmer-font-scale: ${state.fontScale};
  --khmer-line-height: ${state.lineHeight};
}

/* =========================================================
 * ANTIGRAVITY SCENE PROMPT TEMPLATE (COPY & PASTE)
 * ========================================================= */
Build an interactive 2D educational HTML/CSS/SVG scene (${state.aspect} aspect ratio, ${shot.mode} mode):
- Use Master Design System v2.0 floating in-world infographics & speech bubbles with #171717 (${state.strokeWidth}px) outlines.
- Stick-figure rig: ${state.headRadius}px white-filled head, ${state.torsoLength}px torso, ${state.limbLength}px slim limbs (1:${ratio} ratio).
- Acting: Blink every ${state.blinkInterval}s, syllable lip-sync at ${state.mouthCadence}Hz (or WebAudio RMS), gesture amplitude ${state.gestureAmplitude}x.
- Render all Khmer labels and percentages as native editable DOM text using '${state.khmerFont}' with line-height ${state.lineHeight} inside the 10% title-safe margin.`;

    const pre = document.getElementById('exportCodeBlock');
    if (pre) pre.textContent = payload;
    const modal = document.getElementById('exportModal');
    if (modal) modal.classList.add('open');
  }

  function closeExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) modal.classList.remove('open');
  }

  function copyExportTokens() {
    const pre = document.getElementById('exportCodeBlock');
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent);
    const toast = document.getElementById('copyToast');
    if (toast) {
      toast.style.opacity = '1';
      setTimeout(() => {
        toast.style.opacity = '0';
      }, 2200);
    }
  }

  function toggleTheatreCaptureMode(forceEnable) {
    const isNowTheatre =
      typeof forceEnable === 'boolean'
        ? document.body.classList.toggle('theatre-capture-mode', forceEnable)
        : document.body.classList.toggle('theatre-capture-mode');

    if (isNowTheatre && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (!isNowTheatre && document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    setTimeout(() => resizeStageToFit(), 80);
  }

  function bindControls() {
    const selectDeck = document.getElementById('selectEpisodeDeck');
    if (selectDeck) {
      selectDeck.addEventListener('change', (e) => {
        state.activeDeck = e.target.value;
        state.currentShotIndex = 0;
        renderShotTabs();
        loadShot(0, true);
      });
    }

    // Aspect Ratio Switchers
    ['16:9', '9:16', '1:1'].forEach((r) => {
      const btn = document.getElementById('btn-aspect-' + r.replace(':', '-'));
      if (btn) btn.addEventListener('click', () => setAspect(r));
    });

    // Safe Zones Toggle
    const btnSafe = document.getElementById('btnToggleSafeZones');
    const safeOverlay = document.getElementById('safeZoneOverlay');
    if (btnSafe && safeOverlay) {
      btnSafe.addEventListener('click', () => {
        state.showSafeZones = !state.showSafeZones;
        safeOverlay.classList.toggle('hidden', !state.showSafeZones);
        btnSafe.textContent = state.showSafeZones ? '📐 Safe Zones: ON' : '📐 Safe Zones: OFF';
      });
    }

    // Clean Plate Toggle
    const btnClean = document.getElementById('btnToggleCleanPlate');
    const stageEl = document.getElementById('animationStage');
    if (btnClean && stageEl) {
      btnClean.addEventListener('click', () => {
        state.cleanPlate = stageEl.classList.toggle('clean-plate');
        btnClean.textContent = state.cleanPlate ? '🔤 Clean Plate: ON' : '🔤 Khmer Text: ON';
      });
    }

    // Continuous BGM + Ambience Toggle
    const btnToggleBgm = document.getElementById('btnToggleBgm');
    if (btnToggleBgm) {
      btnToggleBgm.addEventListener('click', () => {
        state.bgmEnabled = !state.bgmEnabled;
        btnToggleBgm.textContent = state.bgmEnabled ? '🎵 BGM: ON' : '🔇 BGM: OFF';
        btnToggleBgm.classList.toggle('active-gold', state.bgmEnabled);
        if (state.bgmEnabled && state.shotPlaying) {
          startBgmEngine();
        } else if (!state.bgmEnabled) {
          stopBgmEngine();
        }
      });
    }

    // Export Modal Buttons & Step 7 Theatre Capture Mode
    const btnTheatreCapture = document.getElementById('btnTheatreCapture');
    if (btnTheatreCapture) {
      btnTheatreCapture.addEventListener('click', () => toggleTheatreCaptureMode(true));
    }
    const btnHudExitTheatre = document.getElementById('btnHudExitTheatre');
    if (btnHudExitTheatre) {
      btnHudExitTheatre.addEventListener('click', () => toggleTheatreCaptureMode(false));
    }
    const btnHudPlayEpisode = document.getElementById('btnHudPlayEpisode');
    if (btnHudPlayEpisode) {
      btnHudPlayEpisode.addEventListener('click', toggleFullEpisodePlayback);
    }
    const btnHudAspect169 = document.getElementById('btnHudAspect169');
    if (btnHudAspect169) {
      btnHudAspect169.addEventListener('click', () => setAspect('16:9'));
    }
    const btnHudAspect916 = document.getElementById('btnHudAspect916');
    if (btnHudAspect916) {
      btnHudAspect916.addEventListener('click', () => setAspect('9:16'));
    }
    const btnHudAspect11 = document.getElementById('btnHudAspect11');
    if (btnHudAspect11) {
      btnHudAspect11.addEventListener('click', () => setAspect('1:1'));
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('theatre-capture-mode')) {
        toggleTheatreCaptureMode(false);
      }
    });

    const btnExport = document.getElementById('btnOpenExport');
    if (btnExport) btnExport.addEventListener('click', openExportModal);
    const btnCloseExport = document.getElementById('btnCloseExport');
    if (btnCloseExport) btnCloseExport.addEventListener('click', closeExportModal);
    const btnCopyExport = document.getElementById('btnCopyExport');
    if (btnCopyExport) btnCopyExport.addEventListener('click', copyExportTokens);

    // Parametric Rig Sliders
    const bindSlider = (id, valId, prop, suffix = '', isFloat = false, cb = null) => {
      const el = document.getElementById(id);
      const valEl = document.getElementById(valId);
      if (!el) return;
      el.addEventListener('input', (e) => {
        state[prop] = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
        if (valEl) valEl.textContent = `${state[prop]}${suffix}`;
        updateCalibrationReadouts();
        if (cb) cb();
      });
    };

    bindSlider('sliderStroke', 'valStroke', 'strokeWidth', 'px', true);
    bindSlider('sliderHead', 'valHead', 'headRadius', 'px', false);
    bindSlider('sliderTorso', 'valTorso', 'torsoLength', 'px', false);
    bindSlider('sliderLimb', 'valLimb', 'limbLength', 'px', false);
    bindSlider('sliderBlink', 'valBlink', 'blinkInterval', 's', true);
    bindSlider('sliderGestureAmp', 'valGestureAmp', 'gestureAmplitude', 'x', true);
    bindSlider('sliderHeadTilt', 'valHeadTilt', 'headTiltOffset', '°', false);
    bindSlider('sliderCadence', 'valCadence', 'mouthCadence', ' Hz', true);
    bindSlider('sliderEnvScale', 'valEnvScale', 'envScale', '%', false, renderEnvironmentLayer);
    bindSlider('sliderFontScale', 'valFontScale', 'fontScale', 'x', true);
    bindSlider('sliderLineHeight', 'valLineHeight', 'lineHeight', '', true);

    // Manual Blink Button
    const btnBlinkNow = document.getElementById('btnBlinkNow');
    if (btnBlinkNow) {
      btnBlinkNow.addEventListener('click', () => {
        state.isBlinking = true;
        state.lastBlinkTime = performance.now();
      });
    }

    // Lip-Sync Toggle
    const btnToggleTalk = document.getElementById('btnToggleTalk');
    if (btnToggleTalk) {
      btnToggleTalk.addEventListener('click', () => {
        state.lipSyncEnabled = !state.lipSyncEnabled;
        btnToggleTalk.textContent = state.lipSyncEnabled ? '🗣️ Lip-Sync: ON' : '🗣️ Lip-Sync: OFF';
      });
    }

    // Emotion, Gesture, Angle, Camera, Location Selectors
    const selectEmotion = document.getElementById('selectEmotion');
    if (selectEmotion) {
      selectEmotion.addEventListener('change', (e) => {
        state.overrideEmotion = e.target.value;
      });
    }

    const selectGesture = document.getElementById('selectGesture');
    if (selectGesture) {
      selectGesture.addEventListener('change', (e) => {
        state.overrideGesture = e.target.value;
      });
    }

    const selectAngle = document.getElementById('selectAngle');
    if (selectAngle) {
      selectAngle.addEventListener('change', (e) => {
        state.overrideAngle = e.target.value;
      });
    }

    const selectCamera = document.getElementById('selectCamera');
    if (selectCamera) {
      selectCamera.addEventListener('change', (e) => {
        state.cameraFraming = e.target.value;
        applyCameraFraming();
      });
    }

    const selectLocation = document.getElementById('selectLocation');
    if (selectLocation) {
      selectLocation.addEventListener('change', (e) => {
        state.overrideLocation = e.target.value;
        renderEnvironmentLayer();
        applyCameraFraming();
      });
    }

    // Khmer Font Family Switcher
    const btnFontK = document.getElementById('btnFontKantumruy');
    const btnFontN = document.getElementById('btnFontNoto');
    if (btnFontK && btnFontN) {
      btnFontK.addEventListener('click', () => {
        state.khmerFont = 'Kantumruy Pro';
        btnFontK.className = 'seg-btn active-blue';
        btnFontN.className = 'seg-btn';
        updateCalibrationReadouts();
      });
      btnFontN.addEventListener('click', () => {
        state.khmerFont = 'Noto Sans Khmer';
        btnFontN.className = 'seg-btn active-blue';
        btnFontK.className = 'seg-btn';
        updateCalibrationReadouts();
      });
    }

    // Audio-Driven Timeline, Full-Episode Auto-Advance & SFX Audition Controls
    const btnPlay8s = document.getElementById('btnPlayShot8s');
    if (btnPlay8s) btnPlay8s.addEventListener('click', toggleShotPlayback);

    const btnPlayEpisodeAll = document.getElementById('btnPlayEpisodeAll');
    if (btnPlayEpisodeAll) btnPlayEpisodeAll.addEventListener('click', toggleFullEpisodePlayback);

    const scrubber = document.getElementById('timelineScrubber');
    if (scrubber) scrubber.addEventListener('click', scrubTimeline);

    const btnWhoosh = document.getElementById('btnSfxWhoosh');
    if (btnWhoosh) btnWhoosh.addEventListener('click', playSfxWhoosh);
    const btnTicks = document.getElementById('btnSfxTicks');
    if (btnTicks) btnTicks.addEventListener('click', playSfxCounterTicks);
    const btnChime = document.getElementById('btnSfxChime');
    if (btnChime) btnChime.addEventListener('click', playSfxChime);

    // Copy AI Studio Prompt
    const btnCopyPrompt = document.getElementById('btnCopyPrompt');
    if (btnCopyPrompt) {
      btnCopyPrompt.addEventListener('click', () => {
        const shot = getActiveShots()[state.currentShotIndex];
        navigator.clipboard.writeText(shot.aiStudioPrompt);
        btnCopyPrompt.textContent = '✓ Copied to Clipboard!';
        setTimeout(() => {
          btnCopyPrompt.textContent = '📋 Copy Prompt for Google AI Studio';
        }, 1800);
      });
    }

    // External Voice File Input (Real WebAudio RMS Lip-Sync)
    const voiceInput = document.getElementById('voiceFileInput');
    if (voiceInput) {
      voiceInput.addEventListener('change', (e) => {
        loadExternalVoiceFile(e.target.files[0]);
      });
    }
  }

  function init() {
    renderShotTabs();
    bindControls();
    updateCalibrationReadouts();
    loadShot(0, false);
    resizeStageToFit();
    requestAnimationFrame(updateActorFrame);
  }

  return {
    init,
    loadShot,
    setSheetCharacter,
    playSfxWhoosh,
    playSfxCounterTicks,
    playSfxChime
  };
})();

window.addEventListener('DOMContentLoaded', () => {
  window.ScenePlayer.init();
});
