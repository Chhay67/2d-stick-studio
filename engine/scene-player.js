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
    usingExternalAudio: false,
    voiceLoadRequestId: 0,
    voiceLoading: false,
    transitionTimerId: null,
    transitionPending: false,
    assetFilterCategory: 'all',
    assetSearchQuery: '',
    inspectedAssetId: null,
    inspectedCharEmotion: 'happy',
    inspectedCharGesture: 'hold-coffee'
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
        state.autoAdvanceEpisode = false;
        if (state.shotPlaying) stopShotPlayback();
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
      osc.frequency.setValueAtTime(freq, now + 0.08 + idx * 0.12);
      gain.gain.setValueAtTime(0.065, now + 0.08 + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.08 + idx * 0.12 + 0.56);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.08 + idx * 0.12);
      osc.stop(now + 0.08 + idx * 0.12 + 0.58);
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
    state.inspectedAssetId = null;
    const bannerEl = document.getElementById('inspectedAssetBanner');
    if (bannerEl) bannerEl.classList.add('hidden');
    document.querySelectorAll('.asset-card.active').forEach((c) => c.classList.remove('active'));
    if (!state.autoAdvanceEpisode && state.shotPlaying) {
      stopShotPlayback();
    } else if (state.autoAdvanceEpisode) {
      state.shotPlaying = false;
      state.shotElapsed = 0;
      stopCurrentAudioElement();
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
      if (state.autoAdvanceEpisode) {
        applyInfographicTimelineState(0, true);
      } else {
        requestAnimationFrame(() => {
          setTimeout(() => {
            infoContainer.querySelectorAll('.ref-bar-segment').forEach((seg) => {
              seg.style.width = seg.getAttribute('data-target-width');
            });
          }, 50);
        });
      }
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

    renderActiveShotInspector(shot);
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

  function clearTransitionTimer() {
    if (state.transitionTimerId) {
      clearTimeout(state.transitionTimerId);
      state.transitionTimerId = null;
    }
    state.transitionPending = false;
  }

  function stopCurrentAudioElement() {
    if (state.externalAudio) {
      try {
        state.externalAudio.onended = null;
        state.externalAudio.onloadedmetadata = null;
        state.externalAudio.pause();
        state.externalAudio.currentTime = 0;
      } catch (_) {}
    }
  }

  function scheduleAutoPlayAfterTransition(reqId) {
    clearTransitionTimer();
    const delayMs = state.currentShotIndex > 0 ? 640 : 260;
    state.transitionPending = true;
    updatePlaybackButtonsUI();
    state.transitionTimerId = setTimeout(() => {
      state.transitionTimerId = null;
      state.transitionPending = false;
      if (reqId === state.voiceLoadRequestId && state.autoAdvanceEpisode) {
        startShotPlayback();
      }
    }, delayMs);
  }

  function updatePlaybackButtonsUI() {
    const isSingleShotPlaying = state.shotPlaying && !state.autoAdvanceEpisode;
    const isFullEpisodePlaying =
      (state.shotPlaying || state.voiceLoading || state.transitionPending) && state.autoAdvanceEpisode;

    const btnShot = document.getElementById('btnPlayShot8s');
    if (btnShot) {
      if (isSingleShotPlaying) {
        btnShot.textContent = '⏹ Stop Shot';
        btnShot.style.background = '#FA604E';
        btnShot.style.borderColor = '#FA604E';
      } else {
        btnShot.textContent = '▶ Play Shot + Voice';
        btnShot.style.background = '#2FAA61';
        btnShot.style.borderColor = '#2FAA61';
      }
    }

    const btnEp = document.getElementById('btnPlayEpisodeAll');
    if (btnEp) {
      btnEp.textContent = isFullEpisodePlaying ? '⏹ Stop Full Episode' : '🎬 Play Full Episode';
      btnEp.style.background = isFullEpisodePlaying ? '#FA604E' : '';
      btnEp.style.borderColor = isFullEpisodePlaying ? '#FA604E' : '#5D98E8';
      btnEp.style.color = isFullEpisodePlaying ? '#FFFFFF' : '#93C5FD';
    }

    const btnHudEp = document.getElementById('btnHudPlayEpisode');
    if (btnHudEp) {
      btnHudEp.textContent = isFullEpisodePlaying ? '⏹ Stop Full Episode' : '🎬 Play Full Episode';
      btnHudEp.style.background = isFullEpisodePlaying ? '#FA604E' : '#2FAA61';
      btnHudEp.style.borderColor = isFullEpisodePlaying ? '#FA604E' : '#2FAA61';
    }
  }

  async function tryAutoLoadShotVoice(shot, autoPlayAfterLoad = false) {
    const reqId = ++state.voiceLoadRequestId;
    const label = document.getElementById('voiceFileLabel');
    const readoutEl = document.getElementById('timelineReadout');

    stopCurrentAudioElement();
    state.externalAudio = null;
    state.usingExternalAudio = false;
    state.voiceLoading = true;

    state.shotDuration = shot?.defaultDuration || 8.0;
    if (readoutEl) readoutEl.textContent = `0.0s / ${state.shotDuration.toFixed(1)}s`;
    renderScrubberMarkers(shot, state.shotDuration);

    if (!shot || !shot.voiceBase) {
      state.voiceLoading = false;
      if (label) {
        label.textContent = 'Load .WAV/.MP3 (Real RMS Lip-Sync)';
      }
      if (autoPlayAfterLoad || state.autoAdvanceEpisode) {
        scheduleAutoPlayAfterTransition(reqId);
      }
      return;
    }

    for (const ext of ['.wav', '.mp3']) {
      const candidateUrl = `${shot.voiceBase}${ext}`;
      try {
        const res = await fetch(candidateUrl, { method: 'HEAD', cache: 'no-store' });
        if (reqId !== state.voiceLoadRequestId) return;
        if (res.ok) {
          stopCurrentAudioElement();
          const audio = new Audio(candidateUrl);
          audio.crossOrigin = 'anonymous';
          audio.preload = 'auto';

          audio.onloadedmetadata = () => {
            if (state.externalAudio !== audio) return;
            if (audio.duration && isFinite(audio.duration) && audio.duration > 0.5) {
              state.shotDuration = Number(audio.duration.toFixed(1));
              if (readoutEl && !state.shotPlaying) {
                readoutEl.textContent = `0.0s / ${state.shotDuration.toFixed(1)}s`;
              }
              renderScrubberMarkers(shot, state.shotDuration);
            }
          };

          audio.onended = () => {
            if (state.externalAudio !== audio) return;
            if (state.shotPlaying) {
              handleShotPlaybackFinished();
            }
          };

          state.externalAudio = audio;
          state.usingExternalAudio = true;
          state.voiceLoading = false;
          const shortName = candidateUrl.split('/').pop();
          if (label) label.textContent = `🟢 Ready: ${shortName}`;

          if (autoPlayAfterLoad || state.autoAdvanceEpisode) {
            scheduleAutoPlayAfterTransition(reqId);
          }
          return;
        }
      } catch (_) {
        if (reqId !== state.voiceLoadRequestId) return;
      }
    }

    if (reqId !== state.voiceLoadRequestId) return;
    state.voiceLoading = false;
    state.usingExternalAudio = false;
    state.externalAudio = null;
    if (label) {
      const expectedName = `${shot.voiceBase.split('/').pop()}.wav`;
      label.textContent = `📂 Drop ${expectedName} in audio/voice/`;
    }
    if (autoPlayAfterLoad || state.autoAdvanceEpisode) {
      scheduleAutoPlayAfterTransition(reqId);
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
    if (state.inspectedAssetId) {
      loadShot(state.currentShotIndex, false);
    }
    if (state.shotPlaying || state.autoAdvanceEpisode) {
      state.autoAdvanceEpisode = false;
      stopShotPlayback();
    } else {
      state.autoAdvanceEpisode = false;
      startShotPlayback();
    }
  }

  function toggleFullEpisodePlayback() {
    if (state.inspectedAssetId) {
      loadShot(state.currentShotIndex, false);
    }
    if ((state.shotPlaying || state.voiceLoading || state.transitionPending) && state.autoAdvanceEpisode) {
      state.autoAdvanceEpisode = false;
      stopShotPlayback();
      return;
    }
    // Always stop any active single-shot ("Play Shot + Voice") playback first to prevent audio conflict
    if (state.shotPlaying) {
      stopShotPlayback();
    }
    state.autoAdvanceEpisode = true;
    updatePlaybackButtonsUI();

    const shots = getActiveShots();
    const isTheatre = document.body.classList.contains('theatre-capture-mode');
    // If on the Character Sheet tab or starting Full Episode in Theatre Capture mode from another shot, load Shot 01
    if (
      shots[state.currentShotIndex]?.sceneType === 'character-sheet' ||
      (isTheatre && state.currentShotIndex !== 0)
    ) {
      loadShot(0, true);
    } else if (!state.voiceLoading) {
      startShotPlayback();
    }
  }

  function startShotPlayback() {
    ensureAudioContext();
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }

    stopCurrentAudioElement();

    state.shotPlaying = true;
    state.shotStartTime = performance.now();
    state.shotElapsed = 0;
    state.sfxTriggered = { whoosh: false, ticks: false, chime: false };
    state.triggeredCueIndices = new Set();
    state.lipSyncEnabled = true;

    updatePlaybackButtonsUI();

    // Initialize staged infographic elements and bars at t = 0.0s
    applyInfographicTimelineState(0, true);
    startBgmEngine();

    if (state.externalAudio) {
      const activeAudio = state.externalAudio;
      connectExternalAudioAnalyser(activeAudio);
      if (activeAudio.duration && isFinite(activeAudio.duration)) {
        state.shotDuration = Number(activeAudio.duration.toFixed(1));
      }
      activeAudio.onended = () => {
        if (state.externalAudio === activeAudio && state.shotPlaying) {
          handleShotPlaybackFinished();
        }
      };
      activeAudio.currentTime = 0;
      activeAudio.play().catch(() => {});
    }
  }

  function handleShotPlaybackFinished() {
    if (state.autoAdvanceEpisode) {
      const shots = getActiveShots();
      const nextIdx = state.currentShotIndex + 1;
      // Advance across all story/explainer shots (stop before the Character Sheet tab)
      if (nextIdx < shots.length && shots[nextIdx].sceneType !== 'character-sheet') {
        state.shotPlaying = false;
        stopCurrentAudioElement();
        clearTransitionTimer();
        state.transitionPending = true;
        updatePlaybackButtonsUI();
        // Hold a 550ms natural breathing beat at the end of the current shot before wiping to the next scene
        state.transitionTimerId = setTimeout(() => {
          state.transitionTimerId = null;
          if (!state.autoAdvanceEpisode) return;
          state.shotElapsed = 0;
          state.currentShotIndex = nextIdx;
          renderShotTabs();
          loadShot(nextIdx, true);
        }, 550);
        return;
      }
    }
    state.autoAdvanceEpisode = false;
    stopShotPlayback();
  }

  function stopShotPlayback() {
    clearTransitionTimer();
    state.shotPlaying = false;
    state.autoAdvanceEpisode = false;
    stopBgmEngine();
    stopCurrentAudioElement();
    state.scaleCounterText = '966';
    updatePlaybackButtonsUI();

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

    highlightActiveCaptionBeat(shot, elapsed);

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
      if (state.usingExternalAudio && state.externalAudio) {
        state.shotElapsed = state.externalAudio.currentTime || 0;
        if (state.externalAudio.ended) {
          state.shotElapsed = totalDur;
          handleShotPlaybackFinished();
        } else {
          updateShotTimelineEffects(state.shotElapsed);
        }
      } else {
        state.shotElapsed = (now - state.shotStartTime) * 0.001;
        if (state.shotElapsed >= totalDur) {
          state.shotElapsed = totalDur;
          handleShotPlaybackFinished();
        } else {
          updateShotTimelineEffects(state.shotElapsed);
        }
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
      if (shot.sceneType === 'character-sheet' || state.inspectedAssetId) {
        if (shot.sceneType === 'character-sheet' && !state.inspectedAssetId) {
          charSvgGroup.innerHTML = '';
        }
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
          ? Math.max(0, Math.min(1, state.shotElapsed / 1.38))
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

  // =========================================================================
  // 7B. COMPLETE STUDIO ASSET LIBRARY (54 ELEMENTS, PROPS, ITEMS, CAST & LOCATIONS)
  // =========================================================================
  function getStudioAssetsCatalog() {
    const R = window.CharacterRig;
    return [
      // -------------------- 1. FLOATING INFOGRAPHIC ELEMENTS (16) --------------------
      {
        id: 'elem:km_key_tracker',
        category: 'elements',
        nameKm: 'របារតាមដានជំពូក 🔑1..7',
        nameEn: 'Top-Left Key Progress Tracker + Yellow Active Pill',
        thumbHtml: `
          <div style="transform:scale(0.72); transform-origin:center;">
            <div class="km-key-tracker" style="position:static;">
              <div class="km-key-row">
                <div class="km-key-item done">✓</div>
                <div class="km-key-item active">🔑2</div>
                <div class="km-key-item">3</div>
                <div class="km-key-item">4</div>
              </div>
              <div class="km-key-pill">2. ឆ្លុះមើលជាតិស្ករ 45g</div>
            </div>
          </div>`
      },
      {
        id: 'elem:calendar_badge',
        category: 'elements',
        nameKm: 'ស្លាកប្រតិទិន និងម៉ោង (8:00 / ថ្ងៃទី 30)',
        nameEn: 'Calendar & Morning Time Badge (.ref-calendar-badge)',
        thumbHtml: `
          <div style="display:flex; gap:14px; transform:scale(0.68); transform-origin:center;">
            <div class="ref-calendar-badge">
              <div class="ref-calendar-ring left"></div>
              <div class="ref-calendar-ring right"></div>
              <div class="ref-calendar-header" style="background:#5D98E8;">ម៉ោងព្រឹក</div>
              <div class="ref-calendar-day" style="font-size:26px;">8:00</div>
            </div>
            <div class="ref-calendar-badge">
              <div class="ref-calendar-ring left"></div>
              <div class="ref-calendar-ring right"></div>
              <div class="ref-calendar-header">ថ្ងៃទី</div>
              <div class="ref-calendar-day">30</div>
            </div>
          </div>`
      },
      {
        id: 'elem:km_clipped_card',
        category: 'elements',
        nameKm: 'កាតក្រដាសពណ៌សមានដង្កៀបលឿង',
        nameEn: 'White Paper Card with Yellow Top-Left Clip (.km-clipped-card)',
        thumbHtml: `
          <div style="transform:scale(0.76); transform-origin:center;">
            <div class="km-clipped-card tilted-right">
              <div style="font-size:11.5px; color:#64748B; font-weight:700;">កាហ្វេទឹកកក 1 កែវធំ</div>
              <div class="km-dot-pill" style="margin-top:4px; font-size:14px;">
                <span class="km-dot gold"></span>650ml • $1.50
              </div>
            </div>
          </div>`
      },
      {
        id: 'elem:km_dot_pill',
        category: 'elements',
        nameKm: 'ស្លាកគ្រាប់ពណ៌សម្គាល់ស្ថានភាពទាំង 4',
        nameEn: 'Status-Dot Pill Badges (Gold • Green • Coral • Blue)',
        thumbHtml: `
          <div style="display:flex; flex-wrap:wrap; gap:5px; justify-content:center; transform:scale(0.78);">
            <span class="km-dot-pill"><span class="km-dot green"></span>⚡ ថាមពល 100%</span>
            <span class="km-dot-pill"><span class="km-dot coral"></span>⚠️ អាស៊ីតក្រពះ ↑</span>
            <span class="km-dot-pill"><span class="km-dot gold"></span>30 ថ្ងៃ = 1.35 kg</span>
            <span class="km-dot-pill"><span class="km-dot blue"></span>💧 0g Fiber</span>
          </div>`
      },
      {
        id: 'elem:km_counter_card',
        category: 'elements',
        nameKm: 'កាតតួលេខរាប់ឡើងមានក្បាលពណ៌',
        nameEn: 'Tinted-Header Rolling Counter Card (.km-counter-card)',
        thumbHtml: `
          <div style="display:flex; gap:8px; transform:scale(0.72); transform-origin:center;">
            <div class="km-counter-card">
              <div class="km-counter-header gold">• 30 ថ្ងៃ</div>
              <div class="km-counter-value" style="font-size:16px;">ស្ករ 1.35 kg</div>
            </div>
            <div class="km-counter-card">
              <div class="km-counter-header coral">• 365 ថ្ងៃ</div>
              <div class="km-counter-value" style="font-size:16px; color:#FA604E;">ស្ករ 16.4 kg</div>
            </div>
          </div>`
      },
      {
        id: 'elem:km_stamp_badge',
        category: 'elements',
        nameKm: 'ត្រាកៅស៊ូបោះសង្កត់ (Coral & Green)',
        nameEn: 'Tilted Rubber Stamp Slam Badge (.km-stamp-badge)',
        thumbHtml: `
          <div style="display:flex; gap:10px; align-items:center; transform:scale(0.84);">
            <span class="km-stamp-badge">លើសកម្រិត 180%!</span>
            <span class="km-stamp-badge green">កាត់ស្ករ 80%!</span>
          </div>`
      },
      {
        id: 'elem:km_checklist_card',
        category: 'elements',
        nameKm: 'តារាងក្បួនអនុវត្តលោតសញ្ញា ✓',
        nameEn: 'Dim-to-Bold Progressive Checklist Rows (.km-check-row)',
        thumbHtml: `
          <div style="display:flex; flex-direction:column; gap:4px; width:290px; transform:scale(0.74);">
            <div class="km-check-row active-check" style="background:#E6F4EA; border-color:#2FAA61; padding:5px 9px;">
              <div class="km-check-box">✓</div>
              <div style="font-size:11.5px; font-weight:800; color:#1E7E45;">1. ប្តូរទឹកដោះគោស្រស់ ផ្អែម 25%</div>
            </div>
            <div class="km-check-row dimmed" style="padding:5px 9px;">
              <div class="km-check-box"></div>
              <div style="font-size:11.5px; font-weight:800;">2. ផឹកក្រោយអាហារពេលព្រឹក</div>
            </div>
          </div>`
      },
      {
        id: 'elem:speech_bubble_yellow_tag',
        category: 'elements',
        nameKm: 'ប្រអប់សន្ទនាតួអង្គមានស្លាកឈ្មោះលឿង',
        nameEn: 'Story Speech Bubble with Gold Speaker Tag (.ref-speech-bubble)',
        thumbHtml: `
          <div style="transform:scale(0.68); transform-origin:center;">
            <div class="ref-speech-bubble" style="position:relative; width:270px; padding:8px 12px; font-size:12.5px;">
              <div class="ref-speaker-tag">តារា</div>
              <div>បឺតកាហ្វេទឹកកក 1 កែវភ្លាម ស្វាងភ្នែក 100%!</div>
            </div>
          </div>`
      },
      {
        id: 'elem:mint_salary_envelope',
        category: 'elements',
        nameKm: 'ស្រោមសំបុត្រប្រាក់ខែពណ៌បៃតងខ្ចី ($300)',
        nameEn: 'Mint-Green Salary Envelope (.ref-envelope-block)',
        thumbHtml: `
          <div style="transform:scale(0.72); transform-origin:center;">
            <div class="ref-envelope-block">
              <div class="ref-envelope-title" style="font-size:12px;">ប្រាក់ខែ</div>
              <svg width="70" height="44" viewBox="0 0 82 52">
                <rect x="2" y="2" width="78" height="48" rx="5" fill="#B7F0D0" stroke="#171717" stroke-width="2.4" />
                <polyline points="3,3 41,30 79,3" fill="none" stroke="#171717" stroke-width="2.4" stroke-linejoin="round" />
              </svg>
              <div class="ref-envelope-amount" style="font-size:18px;">$300</div>
            </div>
          </div>`
      },
      {
        id: 'elem:segmented_salary_bar',
        category: 'elements',
        nameKm: 'របារភាគរយចំណាយ និងថាមពល (Segmented Bar)',
        nameEn: 'Horizontal Segmented Expense / Energy Progress Bar',
        thumbHtml: `
          <div style="width:270px; transform:scale(0.8);">
            <div class="ref-bar-header" style="font-size:12.5px;">
              <span>ថាមពលនៅម៉ោង 2:00 រសៀល</span>
              <span style="color:#FA604E; font-weight:800;">15%</span>
            </div>
            <div class="ref-bar-track" style="height:22px;">
              <div class="ref-bar-segment" style="width:15%; background:#FA604E;"></div>
              <div class="ref-bar-segment coral-hatch" style="width:85%;"></div>
            </div>
          </div>`
      },
      {
        id: 'elem:pawn_ltv_hatch_bar',
        category: 'elements',
        nameKm: 'របារឆ្នូតបញ្ឆិតតម្លៃបញ្ចាំ 70-85%',
        nameEn: 'Loan-to-Value Diagonal Coral Hatch Bar ($966 -> $650)',
        thumbHtml: `
          <div style="width:270px; transform:scale(0.76);">
            <div style="font-size:12px; font-weight:800; margin-bottom:3px;">គ្រឿងអលង្ការ ≈ 70-85% (តម្លៃ $966)</div>
            <div class="ref-bar-track" style="height:22px;">
              <div class="ref-bar-segment" style="width:76%; background:#2FAA61;"></div>
              <div class="ref-bar-segment coral-hatch" style="width:24%;"></div>
            </div>
          </div>`
      },
      {
        id: 'elem:sugar_comparison_bars',
        category: 'elements',
        nameKm: 'របារប្រៀបធៀបស្ករ WHO ≤25g ទល់នឹង 45g',
        nameEn: 'WHO Safe Sugar Limit vs 1 Cup Iced Sweet Coffee Bars',
        thumbHtml: `
          <div style="width:280px; transform:scale(0.74); display:flex; flex-direction:column; gap:5px;">
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11.5px; font-weight:800;">
                <span>កម្រិត WHO</span><span style="color:#2FAA61;">≤ 25g (6 ស្លាបព្រា)</span>
              </div>
              <div class="ref-bar-track" style="height:14px;"><div class="ref-bar-segment" style="width:55%; background:#2FAA61;"></div></div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; font-size:11.5px; font-weight:800;">
                <span>កាហ្វេទឹកកក 1 កែវ</span><span style="color:#FA604E;">45g (11 ស្លាបព្រា)</span>
              </div>
              <div class="ref-bar-track" style="height:16px;">
                <div class="ref-bar-segment" style="width:55%; background:#FA604E;"></div>
                <div class="ref-bar-segment coral-hatch" style="width:45%;"></div>
              </div>
            </div>
          </div>`
      },
      {
        id: 'elem:glucose_rollercoaster_curve',
        category: 'elements',
        nameKm: 'ក្រាហ្វជាតិស្ករ និងអាំងស៊ុយលីន 120 នាទី',
        nameEn: '120-Minute Blood Sugar Spike & Insulin Wave Graph',
        thumbHtml: `
          <svg width="240" height="86" viewBox="0 0 545 200">
            <line x1="30" y1="135" x2="520" y2="135" stroke="#94A3B8" stroke-width="3" stroke-dasharray="6 4" />
            <line x1="30" y1="20" x2="30" y2="185" stroke="#171717" stroke-width="4" />
            <line x1="30" y1="185" x2="520" y2="185" stroke="#171717" stroke-width="4" />
            <path d="M 30 135 C 85 130, 115 28, 165 28 C 225 28, 285 178, 375 178 C 435 178, 475 160, 510 150" fill="none" stroke="#FA604E" stroke-width="8" stroke-linecap="round" />
            <path d="M 30 155 C 120 155, 195 58, 255 58 C 315 58, 365 145, 510 150" fill="none" stroke="#5D98E8" stroke-width="6" stroke-dasharray="8 6" />
            <circle cx="165" cy="28" r="10" fill="#FA604E" stroke="#171717" stroke-width="3" />
            <circle cx="255" cy="58" r="10" fill="#5D98E8" stroke="#171717" stroke-width="3" />
            <circle cx="375" cy="178" r="10" fill="#FA604E" stroke="#171717" stroke-width="3" />
          </svg>`
      },
      {
        id: 'elem:caffeine_halflife_clock',
        category: 'elements',
        nameKm: 'តារាងអាយុកាលកាហ្វេអ៊ីន 6 ម៉ោង',
        nameEn: '6-Hour Caffeine Half-Life Timeline (100% -> 50% -> 25%)',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:5px; transform:scale(0.68);">
            <div class="km-counter-card" style="padding:5px 8px; align-items:center;">
              <div class="km-counter-header blue">2:00 រសៀល</div>
              <div style="font-size:12px; font-weight:800; color:#2FAA61;">100%</div>
            </div>
            <span style="font-weight:900;">➔</span>
            <div class="km-counter-card" style="padding:5px 8px; align-items:center;">
              <div class="km-counter-header coral">8:00 យប់</div>
              <div style="font-size:12px; font-weight:800; color:#FA604E;">សល់ 50%</div>
            </div>
            <span style="font-weight:900;">➔</span>
            <div class="km-counter-card" style="padding:5px 8px; align-items:center;">
              <div class="km-counter-header gold">2:00 ភ្លឺ</div>
              <div style="font-size:12px; font-weight:800; color:#92400E;">សល់ 25%</div>
            </div>
          </div>`
      },
      {
        id: 'elem:cafe_customization_matrix',
        category: 'elements',
        nameKm: 'តារាងជ្រើសរើសកាហ្វេទាំង 4 កម្រិត',
        nameEn: '4-Tier Cambodian Café Customization Matrix (45g -> 0g)',
        thumbHtml: `
          <div style="display:flex; flex-direction:column; gap:3px; width:280px; transform:scale(0.74);">
            <div style="display:flex; justify-content:space-between; background:#FEE2E2; border:1.8px solid #FA604E; border-radius:6px; padding:3px 8px; font-size:10.5px; font-weight:800;">
              <span>❌ ទឹកដោះគោខាប់ 100%</span><span style="color:#FA604E;">ស្ករ 45g</span>
            </div>
            <div style="display:flex; justify-content:space-between; background:#E6F4EA; border:1.8px solid #2FAA61; border-radius:6px; padding:3px 8px; font-size:10.5px; font-weight:800;">
              <span>✅ ទឹកដោះគោស្រស់ 25%</span><span style="color:#1E7E45;">ស្ករ 6g–8g (-80%)</span>
            </div>
          </div>`
      },
      {
        id: 'elem:director_intro_outro_cards',
        category: 'elements',
        nameKm: 'ផ្ទាំងចំណងជើងបើកឆាក និងផ្ទាំងបញ្ចប់វីដេអូ',
        nameEn: 'Director Episode Intro Card & Outro Subscribe CTA Card',
        thumbHtml: `
          <div style="transform:scale(0.66); width:340px;">
            <div class="director-outro-card" style="position:static; padding:8px 12px;">
              <div>
                <div class="outro-quote" style="font-size:12px;">«កាហ្វេមិនមែនជាបញ្ហាទេ ស្ករទើបជាអន្ទាក់!»</div>
                <div class="outro-sub" style="font-size:10px;">សន្សំលុយ $360–$540 ក្នុង 1 ឆ្នាំ</div>
              </div>
              <div class="outro-cta-pill" style="font-size:10.5px; padding:4px 9px;">🔔 Subscribe</div>
            </div>
          </div>`
      },

      // -------------------- 2. 2D VECTOR PROPS (8) --------------------
      {
        id: 'prop:iced_coffee_cup_hand',
        category: 'props',
        nameKm: 'កែវកាហ្វេទឹកដោះគោទឹកកកកាន់នឹងដៃ',
        nameEn: 'Handheld Iced Sweet Coffee Cup (Dome Lid + Straw + Milk Layer)',
        thumbHtml: `
          <svg width="90" height="90" viewBox="-30 -40 60 66">
            <line x1="0" y1="-16" x2="7" y2="-34" stroke="#2FAA61" stroke-width="3.2" stroke-linecap="round" />
            <path d="M -14 -10 A 14 11 0 0 1 14 -10 Z" fill="#F8FAFC" stroke="#171717" stroke-width="2.2" />
            <polygon points="-14,-10 14,-10 11,20 -11,20" fill="#7C4D2B" stroke="#171717" stroke-width="2.2" />
            <polygon points="-11.8,6 11.8,6 11,20 -11,20" fill="#FEF3C7" stroke="#171717" stroke-width="1.8" />
          </svg>`
      },
      {
        id: 'prop:giant_iced_coffee_xray',
        category: 'props',
        nameKm: 'កែវកាហ្វេឆ្លុះអ៊ិចស្រេ 650ml (ស្ករ 45g)',
        nameEn: 'Giant 650ml Iced Coffee Cross-Section X-Ray + Flying Sugar Cube',
        thumbHtml: `
          <svg width="160" height="96" viewBox="360 155 240 285">
            ${R.renderIcedCoffeeXrayPropSVG(395, 430)}
          </svg>`
      },
      {
        id: 'prop:office_desk_laptop',
        category: 'props',
        nameKm: 'តុធ្វើការការិយាល័យ និងកុំព្យូទ័រយួរដៃ',
        nameEn: 'Minimalist Office Desk & Colored-Code Laptop',
        thumbHtml: `
          <svg width="180" height="92" viewBox="260 220 265 220">
            ${R.renderOfficeDeskLaptopSVG(282, 430)}
          </svg>`
      },
      {
        id: 'prop:pawn_counter_wood',
        category: 'props',
        nameKm: 'បញ្ជរហាងបញ្ចាំឈើ និងកញ្ចក់',
        nameEn: 'Wooden Shop Counter with Glass Top Ledge',
        thumbHtml: `
          <svg width="220" height="84" viewBox="120 410 445 115">
            ${R.renderPawnCounterForegroundSVG(false)}
          </svg>`
      },
      {
        id: 'prop:digital_gold_scale',
        category: 'props',
        nameKm: 'ជញ្ជីងថ្លឹងមាសឌីជីថល $966 + ខ្សែកមាស',
        nameEn: 'Digital Gold Scale ($966 / តម្លៃមាស) + Gold Necklace',
        thumbHtml: `
          <svg width="140" height="94" viewBox="430 315 160 160">
            ${R.renderPawnCounterForegroundSVG(true, '966')}
          </svg>`
      },
      {
        id: 'prop:safe_box',
        category: 'props',
        nameKm: 'ទូដែកសុវត្ថិភាពហាងបញ្ចាំ',
        nameEn: 'Dark Slate Metal Safe Box with Combination Dial',
        thumbHtml: `
          <svg width="90" height="90" viewBox="-10 -8 94 102">
            <rect x="0" y="0" width="74" height="86" rx="4" fill="#5D6472" stroke="#171717" stroke-width="2.4" />
            <rect x="6" y="6" width="62" height="74" rx="2" fill="#687080" stroke="#171717" stroke-width="1.6" />
            <circle cx="37" cy="43" r="11" fill="#CBD5E1" stroke="#171717" stroke-width="1.8" />
            <circle cx="37" cy="43" r="3" fill="#475569" />
          </svg>`
      },
      {
        id: 'prop:tagged_display_shelf',
        category: 'props',
        nameKm: 'ធ្នើរដាក់ទំនិញបញ្ចាំមានស្លាកពណ៌លឿង',
        nameEn: 'Two-Tier Shelf with Yellow-Tagged Items (Tablet, Bowl, Phones)',
        thumbHtml: `
          <svg width="160" height="90" viewBox="-8 -42 155 125">
            <line x1="0" y1="0" x2="138" y2="0" stroke="#7C5836" stroke-width="4" />
            <line x1="0" y1="62" x2="138" y2="62" stroke="#7C5836" stroke-width="4" />
            <line x1="6" y1="-8" x2="6" y2="75" stroke="#7C5836" stroke-width="3.5" />
            <rect x="20" y="-34" width="40" height="28" rx="3" fill="#475569" stroke="#171717" stroke-width="1.8" />
            <rect x="52" y="-22" width="12" height="7" fill="#FEF08A" stroke="#171717" stroke-width="1" />
            <ellipse cx="82" cy="-16" rx="18" ry="12" fill="#F8FAFC" stroke="#171717" stroke-width="1.6" />
            <rect x="94" y="-20" width="12" height="7" fill="#FEF08A" stroke="#171717" stroke-width="1" />
            <rect x="22" y="34" width="12" height="22" rx="2" fill="#334155" stroke="#171717" stroke-width="1.5" />
            <rect x="38" y="34" width="12" height="22" rx="2" fill="#334155" stroke="#171717" stroke-width="1.5" />
            <rect x="54" y="34" width="12" height="22" rx="2" fill="#334155" stroke="#171717" stroke-width="1.5" />
            <rect x="60" y="42" width="11" height="6" fill="#FEF08A" stroke="#171717" stroke-width="1" />
          </svg>`
      },
      {
        id: 'prop:smartphone_hand',
        category: 'props',
        nameKm: 'ទូរស័ព្ទដៃកាន់នឹងដៃ (Smartphone Prop)',
        nameEn: 'Handheld Smartphone Prop (gesture: hold-phone)',
        thumbHtml: `
          <svg width="76" height="86" viewBox="-20 -25 40 50">
            <rect x="-10" y="-18" width="20" height="34" rx="4" fill="#1E293B" stroke="#171717" stroke-width="2.4" transform="rotate(-10)" />
            <rect x="-7" y="-13" width="14" height="24" rx="2" fill="#5D98E8" opacity="0.35" transform="rotate(-10)" />
          </svg>`
      },

      // -------------------- 3. SCENE ITEMS & B-ROLL CUTAWAY ICONS (12) --------------------
      {
        id: 'item:essential_food_plate',
        category: 'items',
        nameKm: 'អាហារប្រចាំថ្ងៃ (Food Plate & Utensils)',
        nameEn: 'Essential Expense Circular Icon: Plate, Spoon & Fork',
        thumbHtml: `
          <div class="ref-circle-icon" style="transform:scale(1.1);">
            <svg width="34" height="34" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="10" fill="#E5E7EB" stroke="#171717" stroke-width="2" />
              <line x1="5" y1="10" x2="5" y2="26" stroke="#171717" stroke-width="2" stroke-linecap="round" />
              <line x1="31" y1="10" x2="31" y2="26" stroke="#171717" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>`
      },
      {
        id: 'item:essential_house',
        category: 'items',
        nameKm: 'ផ្ទះសម្បែង / ឈ្នួលផ្ទះ (House Silhouette)',
        nameEn: 'Essential Expense Circular Icon: Home & Roof',
        thumbHtml: `
          <div class="ref-circle-icon" style="transform:scale(1.1);">
            <svg width="34" height="34" viewBox="0 0 36 36">
              <polygon points="18,7 6,18 30,18" fill="#FA604E" stroke="#171717" stroke-width="2" stroke-linejoin="round" />
              <rect x="10" y="18" width="16" height="12" fill="#FFFFFF" stroke="#171717" stroke-width="2" />
              <rect x="15" y="22" width="6" height="8" fill="#EABF42" stroke="#171717" stroke-width="1.6" />
            </svg>
          </div>`
      },
      {
        id: 'item:essential_blue_scooter',
        category: 'items',
        nameKm: 'ម៉ូតូធ្វើដំណើរពណ៌ខៀវ (Blue Commuter Scooter)',
        nameEn: 'Essential Expense Circular Icon: Blue Scooter / Moto',
        thumbHtml: `
          <div class="ref-circle-icon" style="transform:scale(1.1);">
            <svg width="36" height="36" viewBox="0 0 36 36">
              <circle cx="10" cy="25" r="4" fill="#171717" />
              <circle cx="26" cy="25" r="4" fill="#171717" />
              <path d="M 10 25 L 16 25 L 20 16 L 26 25" fill="none" stroke="#5D98E8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="18" y1="13" x2="23" y2="13" stroke="#171717" stroke-width="2.2" stroke-linecap="round" />
            </svg>
          </div>`
      },
      {
        id: 'item:green_coin_stack',
        category: 'items',
        nameKm: 'គំនរកាក់ប្រាក់សន្សំពណ៌បៃតង + ស្លាកនៅសល់តិច',
        nameEn: 'Coral Alert Pill (នៅសល់តិច) + Green Savings Coin Stack',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="ref-coral-pill" style="font-size:12px;">នៅសល់តិច</span>
            <svg width="36" height="40" viewBox="0 0 32 36">
              <ellipse cx="16" cy="28" rx="12" ry="4.5" fill="#2FAA61" stroke="#171717" stroke-width="2" />
              <ellipse cx="16" cy="22" rx="12" ry="4.5" fill="#4ADE80" stroke="#171717" stroke-width="2" />
              <ellipse cx="16" cy="16" rx="12" ry="4.5" fill="#86EFAC" stroke="#171717" stroke-width="2" />
            </svg>
          </div>`
      },
      {
        id: 'item:gold_necklace_pendant',
        category: 'items',
        nameKm: 'ខ្សែកមាស និងបន្តោងពេជ្រ ($966)',
        nameEn: 'Gold Necklace & Diamond Pendant on Scale Tray',
        thumbHtml: `
          <svg width="110" height="60" viewBox="20 0 84 40">
            <ellipse cx="62" cy="20" rx="38" ry="9" fill="#F1F5F9" stroke="#171717" stroke-width="2" />
            <path d="M 32 14 Q 62 30 92 14 Q 78 26 62 28 Q 46 26 32 14 Z" fill="#EABF42" stroke="#B45309" stroke-width="1.8" />
            <polygon points="62,22 57,29 62,36 67,29" fill="#FDE047" stroke="#B45309" stroke-width="1.4" />
          </svg>`
      },
      {
        id: 'item:broll_stomach_acid',
        category: 'items',
        nameKm: 'B-Roll ក្រពះទទេ និងអាស៊ីតកើនឡើង',
        nameEn: 'B-Roll Macro Card: Empty Stomach & Rising Gastric Acid',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px; background:#FFFFFF; border:2px solid #171717; border-radius:10px; padding:6px 10px; transform:scale(0.84);">
            <svg width="42" height="42" viewBox="0 0 46 46">
              <path d="M16 12 C11 12, 10 22, 14 29 C17 34, 27 36, 31 30 C35 24, 32 15, 25 14 Z" fill="#FEE2E2" stroke="#171717" stroke-width="2.2"/>
              <path d="M15 26 Q23 23 30 26" stroke="#FA604E" stroke-width="2.5" fill="none"/>
              <circle cx="20" cy="29" r="2" fill="#FA604E"/><circle cx="26" cy="28" r="2.2" fill="#FA604E"/>
            </svg>
            <div style="font-size:11.5px; font-weight:800;">ក្រពះទទេ + អាស៊ីត ↑</div>
          </div>`
      },
      {
        id: 'item:broll_low_battery_crash',
        category: 'items',
        nameKm: 'B-Roll ថ្មថាមពលធ្លាក់សល់ 15% (Sugar Crash)',
        nameEn: 'B-Roll Cutaway Icon: Afternoon 15% Low Battery Crash',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px; background:#FFFFFF; border:2px solid #171717; border-radius:10px; padding:6px 10px; transform:scale(0.84);">
            <svg width="42" height="42" viewBox="0 0 46 46">
              <rect x="8" y="14" width="26" height="18" rx="4" fill="#FEE2E2" stroke="#171717" stroke-width="2.2"/>
              <rect x="34" y="19" width="4" height="8" rx="1" fill="#171717"/>
              <rect x="11" y="17" width="6" height="12" rx="2" fill="#FA604E"/>
            </svg>
            <div style="font-size:11.5px; font-weight:800;">ថាមពលសល់ 15%</div>
          </div>`
      },
      {
        id: 'item:broll_blood_vessel_sugar',
        category: 'items',
        nameKm: 'B-Roll សរសៃឈាម និងស្កររាវ 0g Fiber',
        nameEn: 'B-Roll Macro Card: Liquid Glucose Entering Bloodstream',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px; background:#FFFFFF; border:2px solid #171717; border-radius:10px; padding:6px 10px; transform:scale(0.84);">
            <svg width="42" height="42" viewBox="0 0 46 46">
              <rect x="6" y="16" width="34" height="14" rx="7" fill="#FEE2E2" stroke="#171717" stroke-width="2"/>
              <circle cx="15" cy="23" r="3.5" fill="#FA604E"/>
              <circle cx="24" cy="21" r="3" fill="#FFFFFF" stroke="#171717" stroke-width="1.5"/>
              <circle cx="32" cy="24" r="3" fill="#FFFFFF" stroke="#171717" stroke-width="1.5"/>
            </svg>
            <div style="font-size:11.5px; font-weight:800;">ស្កររាវ 0g Fiber</div>
          </div>`
      },
      {
        id: 'item:broll_pancreas_insulin',
        category: 'items',
        nameKm: 'B-Roll លំពែងបញ្ចេញអរម៉ូនអាំងស៊ុយលីន',
        nameEn: 'B-Roll Organ Card: Pancreas Releasing Insulin Surge',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px; background:#FFFFFF; border:2px solid #171717; border-radius:10px; padding:6px 10px; transform:scale(0.84);">
            <svg width="42" height="42" viewBox="0 0 46 46">
              <path d="M10 26 C10 15, 24 14, 35 20 C38 22, 37 31, 28 32 C19 33, 10 31, 10 26 Z" fill="#FEF3C7" stroke="#171717" stroke-width="2.2"/>
              <circle cx="20" cy="24" r="3" fill="#5D98E8"/><circle cx="28" cy="25" r="2.5" fill="#FA604E"/>
            </svg>
            <div style="font-size:11.5px; font-weight:800;">លំពែង + Insulin</div>
          </div>`
      },
      {
        id: 'item:broll_brain_sleep_wave',
        category: 'items',
        nameKm: 'B-Roll រលកខួរក្បាលដំណេកជ្រៅ (Deep Sleep)',
        nameEn: 'B-Roll Brain Wave Card: Slow-Wave Deep Sleep Disruption',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px; background:#FFFFFF; border:2px solid #171717; border-radius:10px; padding:6px 10px; transform:scale(0.84);">
            <svg width="42" height="42" viewBox="0 0 46 46">
              <polyline points="4,24 12,12 18,34 24,15 31,31 37,20 42,24" fill="none" stroke="#5D98E8" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div style="font-size:11.5px; font-weight:800;">រលក Deep Sleep</div>
          </div>`
      },
      {
        id: 'item:broll_skin_collagen_ages',
        category: 'items',
        nameKm: 'B-Roll សរសៃកូឡាជែនស្បែក និងប្រតិកម្ម AGEs',
        nameEn: 'B-Roll Collagen Card: Sugar Glycation AGEs Skin Aging',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px; background:#FFFFFF; border:2px solid #171717; border-radius:10px; padding:6px 10px; transform:scale(0.84);">
            <svg width="42" height="42" viewBox="0 0 46 46">
              <line x1="8" y1="14" x2="38" y2="14" stroke="#2FAA61" stroke-width="2.8"/>
              <polyline points="8,28 18,23 24,33 32,22 38,30" fill="none" stroke="#FA604E" stroke-width="2.8"/>
            </svg>
            <div style="font-size:11.5px; font-weight:800;">កូឡាជែន AGEs</div>
          </div>`
      },
      {
        id: 'item:broll_tongue_taste_buds',
        category: 'items',
        nameKm: 'B-Roll គ្រាប់ពករសជាតិលើអណ្តាត (10–14 ថ្ងៃ)',
        nameEn: 'B-Roll Taste Buds Card: 10–14 Day Sweetness Adaptation',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px; background:#FFFFFF; border:2px solid #171717; border-radius:10px; padding:6px 10px; transform:scale(0.84);">
            <svg width="42" height="42" viewBox="0 0 46 46">
              <path d="M13 18 Q23 38 33 18 Z" fill="#FCA5A5" stroke="#171717" stroke-width="2.2"/>
              <circle cx="20" cy="23" r="2" fill="#2FAA61"/><circle cx="26" cy="23" r="2" fill="#2FAA61"/><circle cx="23" cy="28" r="2" fill="#2FAA61"/>
            </svg>
            <div style="font-size:11.5px; font-weight:800;">រសជាតិ 10–14 ថ្ងៃ</div>
          </div>`
      },

      // -------------------- 4. ANTHOLOGY CAST CHARACTERS (6) --------------------
      {
        id: 'char:dara',
        category: 'characters',
        nameKm: 'តារា (Dara — តួអង្គឯក EP01)',
        nameEn: 'Minimal Stick Rig • Short-Spiky Hair • Hold Iced Coffee Prop',
        actorConfig: { id: 'char_dara', name: 'តារា', style: 'minimal', hair: 'short-spiky', emotion: 'happy', gesture: 'hold-coffee', blackNameTag: 'តារា' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 140 150 310">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'minimal', hair: 'short-spiky', emotion: 'happy', gesture: 'hold-coffee' })}
          </svg>`
      },
      {
        id: 'char:nary',
        category: 'characters',
        nameKm: 'ណារី (Dr. Nary — អ្នកជំនាញអាហារូបត្ថម្ភ EP01)',
        nameEn: 'Outfitted Pill Torso • Teal Blazer (#2FAA61) • Top-Bun & Glasses',
        actorConfig: { id: 'char_nary', name: 'ណារី', style: 'outfitted', hair: 'top-bun-glasses', outfit: 'teal-health', emotion: 'calm', gesture: 'explain', blackNameTag: 'ណារី' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 140 150 310">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'outfitted', hair: 'top-bun-glasses', outfit: 'teal-health', emotion: 'calm', gesture: 'explain' })}
          </svg>`
      },
      {
        id: 'char:barista',
        category: 'characters',
        nameKm: 'បងសុខ (Bong Sok — អ្នកឆុងកាហ្វេ EP01)',
        nameEn: 'Outfitted Pill Torso • Espresso Apron (#7C4D2B) • Curly Hair',
        actorConfig: { id: 'char_barista', name: 'បងសុខ', style: 'outfitted', hair: 'curly-clerk', outfit: 'barista-apron', emotion: 'happy', gesture: 'open-welcome', blackNameTag: 'បងសុខ' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 140 150 310">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'outfitted', hair: 'curly-clerk', outfit: 'barista-apron', emotion: 'happy', gesture: 'open-welcome' })}
          </svg>`
      },
      {
        id: 'char:heng',
        category: 'characters',
        nameKm: 'ហេង (Heng — តួអង្គប្រាក់ខែ $300)',
        nameEn: 'Minimal Stick Rig • Open-Welcome Pose • Black Name Tag',
        actorConfig: { id: 'heng', name: 'ហេង', style: 'minimal', emotion: 'happy', gesture: 'open-welcome', blackNameTag: 'ហេង' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 120 150 330">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'minimal', emotion: 'happy', gesture: 'open-welcome', blackNameTag: 'ហេង' })}
          </svg>`
      },
      {
        id: 'char:chorna',
        category: 'characters',
        nameKm: 'ចរណា (Chorna — អតិថិជនហាងបញ្ចាំ)',
        nameEn: 'Outfitted Pill Torso • Blue Shirt & Crossbody Bag • Side Ponytail',
        actorConfig: { id: 'chorna', name: 'ចរណា', style: 'outfitted', hair: 'side-ponytail', outfit: 'blue-orange-bag', emotion: 'worried', gesture: 'raise-left-hand', blackNameTag: 'ចរណា' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 140 150 310">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'outfitted', hair: 'side-ponytail', outfit: 'blue-orange-bag', emotion: 'worried', gesture: 'raise-left-hand' })}
          </svg>`
      },
      {
        id: 'char:kunthea',
        category: 'characters',
        nameKm: 'គន្ធា (Kunthea — អ្នកវាយតម្លៃមាស)',
        nameEn: 'Outfitted Pill Torso • Olive Clerk Uniform (#556B2F) • Glasses',
        actorConfig: { id: 'kunthea', name: 'គន្ធា', style: 'outfitted', hair: 'top-bun-glasses', outfit: 'olive-clerk', emotion: 'calm', gesture: 'explain', blackNameTag: 'គន្ធា' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 140 150 310">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'outfitted', hair: 'top-bun-glasses', outfit: 'olive-clerk', emotion: 'calm', gesture: 'explain' })}
          </svg>`
      },

      // -------------------- 5. REUSABLE MINIMALIST LOCATIONS (12) --------------------
      ...[
        { locId: 'office', km: '1. ការិយាល័យធ្វើការ (Office + Desk + Window)', en: 'Clean #FFFFFF Canvas + Office Desk & Ambient Window' },
        { locId: 'shop', km: '2. ហាងបញ្ចាំ / ហាងទំនិញ (Shop / Pawn Counter)', en: 'Architectural Linework + Safe + Tagged Shelf' },
        { locId: 'whiteboard', km: '3. ផ្ទាំងពន្យល់ពណ៌ស (Whiteboard Explainer)', en: 'Pure High-Key Explainer Space (#FFFFFF)' },
        { locId: 'bedroom', km: '4. បន្ទប់គេងពេលយប់ (Bedroom + Bed + Clock)', en: 'Minimalist Bed Silhouette & Night Wall Clock' },
        { locId: 'kitchen', km: '5. ផ្ទះបាយ និងតុអាហារ (Kitchen Countertop)', en: 'Countertop Table & Healthy Green Bowl' },
        { locId: 'classroom', km: '6. ថ្នាក់រៀន (Classroom Whiteboard)', en: 'Classroom Board & Diagram Lines' },
        { locId: 'living-room', km: '7. បន្ទប់ទទួលភ្ញៀវ (Living Room Sofa)', en: 'Sofa Silhouette & Ambient Window Motion' },
        { locId: 'dining-room', km: '8. បន្ទប់ញ៉ាំអាហារ (Dining Room Table)', en: 'Dining Table & Healthy Meal Setup' },
        { locId: 'park', km: '9. សួនច្បារសាធារណៈ (Park Tree & Bench)', en: 'Minimalist Tree, Park Bench & Passing Vehicle' },
        { locId: 'street', km: '10. ផ្លូវសាធារណៈ (Street Sidewalk Horizon)', en: 'Sidewalk Horizon & Continuous Street Motion' },
        { locId: 'gym', km: '11. កន្លែងហាត់ប្រាណ (Gym Mat & Dumbbell)', en: 'Exercise Mat & Dumbbell Silhouette' },
        { locId: 'home', km: '12. ក្នុងផ្ទះ (Home Interior)', en: 'Home Interior Sofa & Window' }
      ].map((l) => ({
        id: `loc:${l.locId}`,
        category: 'locations',
        locId: l.locId,
        nameKm: l.km,
        nameEn: l.en,
        thumbHtml: `
          <svg width="210" height="92" viewBox="50 60 860 420">
            ${R.renderLocationSVG(l.locId, { showPawnSign: l.locId === 'shop', envOpacity: 1 })}
          </svg>`
      }))
    ];
  }

  // Map each asset ID to the EP01 shot numbers where it appears
  const ASSET_SHOT_USAGE = {
    'elem:km_key_tracker': [1, 2, 3, 4, 5, 6, 7, 8],
    'elem:calendar_badge': [1, 2],
    'elem:km_clipped_card': [1, 2, 3, 5, 6, 7],
    'elem:km_dot_pill': [1, 2, 3, 4, 5, 7],
    'elem:km_counter_card': [5, 6],
    'elem:km_stamp_badge': [2, 3, 7],
    'elem:km_checklist_card': [8],
    'elem:speech_bubble_yellow_tag': [1, 2, 3, 8],
    'elem:mint_salary_envelope': [],
    'elem:segmented_salary_bar': [1, 2, 3],
    'elem:pawn_ltv_hatch_bar': [2, 3],
    'elem:sugar_comparison_bars': [3],
    'elem:glucose_rollercoaster_curve': [4],
    'elem:caffeine_halflife_clock': [5],
    'elem:cafe_customization_matrix': [7],
    'elem:director_intro_outro_cards': [1, 8],
    'prop:iced_coffee_cup_hand': [1, 8],
    'prop:giant_iced_coffee_xray': [3],
    'prop:office_desk_laptop': [1, 2],
    'prop:pawn_counter_wood': [],
    'prop:digital_gold_scale': [],
    'prop:safe_box': [],
    'prop:tagged_display_shelf': [],
    'prop:smartphone_hand': [],
    'item:essential_food_plate': [],
    'item:essential_house': [],
    'item:essential_blue_scooter': [],
    'item:green_coin_stack': [],
    'item:gold_necklace_pendant': [],
    'item:broll_stomach_acid': [1],
    'item:broll_low_battery_crash': [2],
    'item:broll_blood_vessel_sugar': [3],
    'item:broll_pancreas_insulin': [4],
    'item:broll_brain_sleep_wave': [5],
    'item:broll_skin_collagen_ages': [6],
    'item:broll_tongue_taste_buds': [7],
    'char:dara': [1, 2, 3, 5, 8],
    'char:nary': [4, 6, 7, 8],
    'char:barista': [9],
    'char:heng': [],
    'char:chorna': [],
    'char:kunthea': [],
    'loc:office': [1, 2],
    'loc:whiteboard': [3, 4, 6, 7, 8],
    'loc:bedroom': [5]
  };

  function jumpToShotTimestamp(targetSeconds) {
    const shot = getActiveShots()[state.currentShotIndex];
    if (!shot) return;
    if (state.inspectedAssetId) {
      loadShot(state.currentShotIndex, false);
    }
    const totalDur = Math.max(4.0, state.shotDuration || shot.defaultDuration || 8.0);
    const clamped = Math.max(0, Math.min(totalDur - 0.1, targetSeconds));
    state.shotElapsed = clamped;
    state.shotStartTime = performance.now() - clamped * 1000;

    if (state.externalAudio && isFinite(state.externalAudio.duration)) {
      state.externalAudio.currentTime = Math.min(state.externalAudio.duration - 0.05, clamped);
    }
    applyInfographicTimelineState(clamped, true);
    updateShotTimelineEffects(clamped);
    updateVoiceRunningCaption(shot, clamped, true);
  }

  function highlightActiveCaptionBeat(shot, elapsed) {
    const container = document.getElementById('shotCaptionBeatsList');
    if (!container || !shot || !Array.isArray(shot.captionBeats)) return;
    let activeIdx = 0;
    for (let i = 0; i < shot.captionBeats.length; i++) {
      if (elapsed >= shot.captionBeats[i].at) {
        activeIdx = i;
      }
    }
    container.querySelectorAll('.shot-beat-row').forEach((row, idx) => {
      row.classList.toggle('active-beat', idx === activeIdx);
    });
  }

  function renderActiveShotInspector(shot) {
    const badgeEl = document.getElementById('shotInspectorBadge');
    const summaryEl = document.getElementById('shotSummaryCard');
    const beatsEl = document.getElementById('shotCaptionBeatsList');
    if (!shot) return;

    const shotNum = state.currentShotIndex + 1;
    if (badgeEl) {
      badgeEl.textContent = `Shot 0${shotNum}`;
    }

    if (summaryEl) {
      const usedAssets = Object.entries(ASSET_SHOT_USAGE)
        .filter(([, shots]) => shots.includes(shotNum))
        .map(([id]) => id);

      const dur = (state.shotDuration || shot.defaultDuration || 8.0).toFixed(1);
      const trans = (shot.transitionType || 'wipe').toUpperCase();
      const loc = `loc:${shot.location || 'whiteboard'}`;

      summaryEl.innerHTML = `
        <div style="font-weight:700; color:#FFFFFF; font-size:12.5px;">${shot.title}</div>
        <div class="shot-meta-grid">
          <div class="shot-meta-cell">
            <div class="shot-meta-label">Mode & Transition</div>
            <div class="shot-meta-val">${shot.mode} • ${trans}</div>
          </div>
          <div class="shot-meta-cell">
            <div class="shot-meta-label">Location & Duration</div>
            <div class="shot-meta-val">${shot.location} (${dur}s)</div>
          </div>
        </div>
        <div style="font-size:10px; font-weight:700; color:#9CA3AF; text-transform:uppercase; margin-top:2px;">
          Assets in this Shot (Click to Inspect):
        </div>
        <div class="shot-used-assets-wrap">
          ${(usedAssets.length ? usedAssets : [loc])
            .map((id) => `<button type="button" class="shot-used-pill" data-inspect-id="${id}">${id}</button>`)
            .join('')}
        </div>
      `;

      summaryEl.querySelectorAll('.shot-used-pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          inspectStudioAsset(btn.getAttribute('data-inspect-id'));
        });
      });
    }

    if (beatsEl) {
      const beats =
        Array.isArray(shot.captionBeats) && shot.captionBeats.length > 0
          ? shot.captionBeats
          : shot.captionKhmer
            ? [{ at: 0.0, text: shot.captionKhmer }]
            : [];

      if (beats.length === 0) {
        beatsEl.innerHTML = `<div style="font-size:11.5px; color:#9CA3AF;">No subtitle beats in this tab.</div>`;
      } else {
        beatsEl.innerHTML = beats
          .map(
            (b, idx) => `
            <div class="shot-beat-row ${idx === 0 ? 'active-beat' : ''}" data-beat-at="${b.at}">
              <div class="shot-beat-time">
                <span>⏱️ ${b.at.toFixed(1)}s — Beat ${idx + 1}</span>
                <span style="color:#93C5FD; font-size:9.5px;">Preview Beat ➔</span>
              </div>
              <div class="shot-beat-text">${b.text}</div>
            </div>
          `
          )
          .join('');

        beatsEl.querySelectorAll('.shot-beat-row').forEach((row) => {
          row.addEventListener('click', () => {
            const atSec = parseFloat(row.getAttribute('data-beat-at')) || 0;
            jumpToShotTimestamp(atSec + 0.15);
          });
        });
      }
    }
  }

  function renderAssetLibrary() {
    const listEl = document.getElementById('leftAssetLibraryList');
    const badgeEl = document.getElementById('assetTotalBadge');
    if (!listEl) return;

    const allAssets = getStudioAssetsCatalog();
    const cat = state.assetFilterCategory || 'all';
    const q = (state.assetSearchQuery || '').trim().toLowerCase();

    const filtered = allAssets.filter((item) => {
      if (cat !== 'all' && item.category !== cat) return false;
      if (!q) return true;
      return (
        item.id.toLowerCase().includes(q) ||
        item.nameKm.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q)
      );
    });

    if (badgeEl) {
      badgeEl.textContent = `${filtered.length} / ${allAssets.length} Assets`;
    }

    const groupTitles = {
      elements: '📊 FLOATING INFOGRAPHIC ELEMENTS (16)',
      props: '☕ 2D VECTOR FOREGROUND PROPS (8)',
      items: '🎞️ SCENE ITEMS & B-ROLL ICONS (12)',
      characters: '🧑 ANTHOLOGY CAST CHARACTERS (6)',
      locations: '🏢 MINIMALIST 2D LOCATIONS (12)'
    };

    const categoriesOrder = ['elements', 'props', 'items', 'characters', 'locations'];
    let htmlParts = [];

    categoriesOrder.forEach((groupCat) => {
      const groupItems = filtered.filter((a) => a.category === groupCat);
      if (groupItems.length === 0) return;

      htmlParts.push(`
        <div class="asset-group-header">
          <span>${groupTitles[groupCat]}</span>
          <span>${groupItems.length}</span>
        </div>
      `);

      groupItems.forEach((asset) => {
        const isActive = state.inspectedAssetId === asset.id;
        const usedShots = ASSET_SHOT_USAGE[asset.id] || [];
        const usedBadgesHtml =
          usedShots.length > 0
            ? `<div class="used-shots-row">
                <span style="font-size:9.5px; color:#9CA3AF; align-self:center;">Used in:</span>
                ${usedShots
                  .map((sNum) => `<button type="button" class="used-shot-tag" data-jump-shot="${sNum - 1}">Shot 0${sNum}</button>`)
                  .join('')}
              </div>`
            : '';

        htmlParts.push(`
          <div class="asset-card ${isActive ? 'active' : ''}" data-asset-id="${asset.id}">
            <div class="asset-thumb-box">
              <span class="asset-cat-tag ${asset.category}">${asset.category.toUpperCase()}</span>
              ${asset.thumbHtml}
            </div>
            <div class="asset-card-body">
              <div class="asset-id-row">
                <span class="asset-id-code">${asset.id}</span>
                <button type="button" class="copy-id-btn" data-copy-id="${asset.id}">📋 Copy ID</button>
              </div>
              <div class="asset-name-km">${asset.nameKm}</div>
              <div class="asset-name-en">${asset.nameEn}</div>
              ${usedBadgesHtml}
            </div>
          </div>
        `);
      });
    });

    if (htmlParts.length === 0) {
      htmlParts.push(`
        <div style="padding:24px 12px; text-align:center; color:#9CA3AF; font-size:12px;">
          No elements, props, or items match "${state.assetSearchQuery}".
        </div>
      `);
    }

    listEl.innerHTML = htmlParts.join('');

    listEl.querySelectorAll('.asset-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.copy-id-btn') || e.target.closest('.used-shot-tag')) return;
        const assetId = card.getAttribute('data-asset-id');
        inspectStudioAsset(assetId);
      });
    });

    listEl.querySelectorAll('.copy-id-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idText = btn.getAttribute('data-copy-id');
        navigator.clipboard.writeText(idText);
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
          btn.textContent = '📋 Copy ID';
        }, 1400);
      });
    });

    listEl.querySelectorAll('.used-shot-tag').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-jump-shot'), 10);
        if (state.activeDeck !== 'ep01') {
          state.activeDeck = 'ep01';
          const deckSel = document.getElementById('selectEpisodeDeck');
          if (deckSel) deckSel.value = 'ep01';
          renderShotTabs();
        }
        loadShot(idx, true);
      });
    });
  }

  function inspectStudioAsset(assetId) {
    const allAssets = getStudioAssetsCatalog();
    const asset = allAssets.find((a) => a.id === assetId);
    if (!asset) return;

    if (state.shotPlaying || state.autoAdvanceEpisode) {
      state.autoAdvanceEpisode = false;
      stopShotPlayback();
    }

    state.inspectedAssetId = asset.id;

    document.querySelectorAll('.asset-card').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-asset-id') === asset.id);
    });

    const bannerEl = document.getElementById('inspectedAssetBanner');
    const bannerIdText = document.getElementById('inspectedAssetIdText');
    if (bannerEl && bannerIdText) {
      bannerEl.classList.remove('hidden');
      bannerIdText.textContent = `${asset.id} — ${asset.nameKm}`;
    }

    const dirBanner = document.getElementById('directorSectionBanner');
    if (dirBanner) {
      dirBanner.textContent = `🔍 ASSET INSPECTOR • ${asset.id}`;
    }

    const envSvg = document.getElementById('environmentSvgGroup');
    const charSvg = document.getElementById('characterSvgGroup');
    const infoContainer = document.getElementById('infographicContainer');
    const R = window.CharacterRig;

    if (!envSvg || !charSvg || !infoContainer) return;

    if (asset.category === 'locations') {
      envSvg.innerHTML = R.renderLocationSVG(asset.locId, {
        showPawnSign: asset.locId === 'shop',
        envOpacity: 1
      });
      charSvg.innerHTML =
        asset.locId === 'shop' ? R.renderPawnCounterForegroundSVG(true, '966') : '';
      infoContainer.innerHTML = `
        <div class="km-clipped-card" style="position:absolute; top:20px; left:24px; z-index:35;">
          <div style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#2FAA61;">${asset.id}</div>
          <div class="editable-text-node" contenteditable="true" style="font-size:16px; font-weight:800; color:#171717;">${asset.nameKm}</div>
          <div style="font-size:12px; color:#64748B; font-weight:600;">${asset.nameEn}</div>
        </div>
      `;
    } else if (asset.category === 'characters') {
      const cfg = asset.actorConfig;
      const activeEmo = state.inspectedCharEmotion || cfg.emotion || 'happy';
      const activeGes = state.inspectedCharGesture || cfg.gesture || 'idle';
      const emotions = ['neutral', 'happy', 'sad', 'worried', 'surprised', 'confused', 'thinking', 'excited', 'angry', 'tired', 'embarrassed', 'proud', 'scared', 'calm', 'determined'];
      const gestures = ['idle', 'hold-coffee', 'explain', 'point-right', 'think', 'open-welcome', 'sad-droop', 'jump-celebrate', 'walk'];

      envSvg.innerHTML = `<rect x="-400" y="-500" width="1800" height="1600" fill="#F5F5F3" />`;
      charSvg.innerHTML = `
        <rect x="60" y="138" width="840" height="340" rx="16" fill="#FFFFFF" stroke="#171717" stroke-width="2.5" />
        ${R.renderActorSVG({ ...cfg, emotion: activeEmo, gesture: activeGes, x: 230, y: 425, angle: 'front' })}
        <text x="230" y="456" text-anchor="middle" fill="#171717" font-size="13" font-weight="800">FRONT (0°)</text>
        ${R.renderActorSVG({ ...cfg, emotion: activeEmo, gesture: activeGes, x: 480, y: 425, angle: 'three-quarter', blackNameTag: null })}
        <text x="480" y="456" text-anchor="middle" fill="#171717" font-size="13" font-weight="800">3/4 VIEW</text>
        ${R.renderActorSVG({ ...cfg, emotion: activeEmo, gesture: activeGes, x: 730, y: 425, angle: 'side', blackNameTag: null })}
        <text x="730" y="456" text-anchor="middle" fill="#171717" font-size="13" font-weight="800">SIDE (90°)</text>
      `;
      infoContainer.innerHTML = `
        <div class="km-clipped-card" style="position:absolute; top:14px; left:60px; width:840px; z-index:35; padding:10px 14px;">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div>
              <span style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:#2FAA61;">${asset.id}</span>
              <span class="editable-text-node" contenteditable="true" style="font-size:15px; font-weight:800; color:#171717; margin-left:8px;">${asset.nameKm}</span>
            </div>
            <span style="font-size:11.5px; color:#64748B; font-weight:700;">Test 15 Emotions & Poses:</span>
          </div>
          <div class="stage-char-switcher" id="stageEmoSwitcher">
            ${emotions
              .map((emo) => `<button type="button" class="stage-char-pill ${emo === activeEmo ? 'active' : ''}" data-char-emo="${emo}">${emo}</button>`)
              .join('')}
          </div>
          <div class="stage-char-switcher" id="stageGesSwitcher" style="margin-top:4px;">
            ${gestures
              .map((ges) => `<button type="button" class="stage-char-pill ${ges === activeGes ? 'active' : ''}" data-char-ges="${ges}">✋ ${ges}</button>`)
              .join('')}
          </div>
        </div>
      `;

      infoContainer.querySelectorAll('[data-char-emo]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.inspectedCharEmotion = btn.getAttribute('data-char-emo');
          inspectStudioAsset(asset.id);
        });
      });
      infoContainer.querySelectorAll('[data-char-ges]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.inspectedCharGesture = btn.getAttribute('data-char-ges');
          inspectStudioAsset(asset.id);
        });
      });
    } else {
      envSvg.innerHTML = `<rect x="-400" y="-500" width="1800" height="1600" fill="#F5F5F3" />`;
      charSvg.innerHTML = '';
      infoContainer.innerHTML = `
        <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:18px; padding:24px;">
          <div class="km-clipped-card" style="min-width:420px; max-width:780px; text-align:center;">
            <div style="font-family:var(--font-mono); font-size:13px; font-weight:800; color:#2FAA61; margin-bottom:2px;">${asset.id}</div>
            <div class="editable-text-node" contenteditable="true" style="font-size:18px; font-weight:800; color:#171717;">${asset.nameKm}</div>
            <div style="font-size:12.5px; color:#64748B; font-weight:600;">${asset.nameEn}</div>
          </div>
          <div style="background:#FFFFFF; border:2.5px solid #171717; border-radius:16px; padding:28px 42px; min-width:460px; min-height:240px; display:flex; align-items:center; justify-content:center; box-shadow:0 16px 36px rgba(23,23,23,0.08);">
            <div style="transform:scale(1.45); transform-origin:center; display:flex; align-items:center; justify-content:center;">
              ${asset.thumbHtml}
            </div>
          </div>
        </div>
      `;
    }
  }

  function toggleTheatreCaptureMode(forceEnable) {
    if (state.shotPlaying && !state.autoAdvanceEpisode) {
      stopShotPlayback();
    }
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

    // Left Sidebar Asset Library Search, Category Filter & Back-to-Shot Controls
    const searchInput = document.getElementById('assetSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.assetSearchQuery = e.target.value;
        renderAssetLibrary();
      });
    }

    const filterContainer = document.getElementById('assetFilterTabs');
    if (filterContainer) {
      filterContainer.querySelectorAll('.asset-filter-pill').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.assetFilterCategory = btn.getAttribute('data-cat') || 'all';
          filterContainer.querySelectorAll('.asset-filter-pill').forEach((b) => {
            b.classList.toggle('active', b === btn);
          });
          renderAssetLibrary();
        });
      });
    }

    const btnBackToShot = document.getElementById('btnBackToShot');
    if (btnBackToShot) {
      btnBackToShot.addEventListener('click', () => {
        loadShot(state.currentShotIndex, false);
      });
    }

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


  // =========================================================================
  // 8. DETERMINISTIC HEADLESS CHROMIUM FRAME-STEPPER API & EXPORT MODAL
  // =========================================================================
  function smoothstep(edge0, edge1, x) {
    if (edge1 <= edge0) return x >= edge0 ? 1 : 0;
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  function getExportDeckInfo(deckName) {
    if (deckName) state.activeDeck = deckName;
    const shots = getActiveShots()
      .map((s, idx) => ({
        index: idx,
        id: s.id,
        title: s.title,
        sceneType: s.sceneType,
        location: s.location || 'office',
        bgmMood: s.bgmMood || 'curious',
        transitionType: s.transitionType || 'wipe',
        defaultDuration: s.defaultDuration || 8.0,
        voiceBase: s.voiceBase || null,
        sfxCues: Array.isArray(s.sfxCues) ? s.sfxCues : []
      }))
      .filter((s) => s.sceneType !== 'character-sheet');
    return {
      deck: state.activeDeck,
      shots
    };
  }

  function prepareExportShot(opts = {}) {
    state.isExportMode = true;
    if (opts.deck) {
      state.activeDeck = opts.deck;
    }
    const aspect = opts.aspect || '16:9';
    document.body.classList.add('theatre-capture-mode', 'export-render-mode');

    setAspect(aspect);
    const shotIndex = typeof opts.shotIndex === 'number' ? opts.shotIndex : 0;
    loadShot(shotIndex, false);

    if (opts.duration && opts.duration > 0.5) {
      state.shotDuration = opts.duration;
    }

    // Scale #animationStage to fill exact target export viewport
    const stage = document.getElementById('animationStage');
    if (stage) {
      stage.classList.remove('camera-scene-enter');
      let baseW = 960;
      let baseH = 540;
      if (aspect === '9:16') {
        baseW = 540;
        baseH = 960;
      } else if (aspect === '1:1') {
        baseW = 760;
        baseH = 760;
      }
      const scaleX = window.innerWidth / baseW;
      const scaleY = window.innerHeight / baseH;
      const exactScale = Math.min(scaleX, scaleY);
      stage.style.width = baseW + 'px';
      stage.style.height = baseH + 'px';
      stage.style.transform = 'scale(' + exactScale.toFixed(5) + ')';
    }

    // Pause all SVG SMIL animations so stepExportFrame can drive them deterministically
    document.querySelectorAll('#animationStage svg').forEach((svg) => {
      if (typeof svg.pauseAnimations === 'function') {
        try {
          svg.pauseAnimations();
        } catch (_) {}
      }
    });

    const transOverlay = document.getElementById('sceneTransitionOverlay');
    if (transOverlay) {
      transOverlay.classList.remove('active-wipe', 'active-iris', 'active-dissolve');
    }

    return {
      shotIndex,
      shotId: getActiveShots()[shotIndex]?.id,
      duration: state.shotDuration
    };
  }

  function applyDeterministicTransitionAndInfographics(shot, elapsedSec, includeEntranceTransition) {
    // 1. Deterministic Scene Entrance Transition Overlay (0.0s -> 0.85s)
    const transOverlay = document.getElementById('sceneTransitionOverlay');
    if (transOverlay) {
      transOverlay.classList.remove('active-wipe', 'active-iris', 'active-dissolve');
      const transDur = 0.85;
      if (includeEntranceTransition && elapsedSec < transDur) {
        const p = smoothstep(0, transDur, elapsedSec);
        const tType = shot?.transitionType || 'wipe';
        const wipeLine = transOverlay.querySelector('.ink-wipe-svg');
        if (tType === 'dissolve') {
          transOverlay.style.opacity = String((1 - p).toFixed(3));
          transOverlay.style.clipPath = 'none';
          if (wipeLine) wipeLine.style.opacity = '0';
        } else if (tType === 'iris') {
          transOverlay.style.opacity = String((1 - p * 0.85).toFixed(3));
          transOverlay.style.clipPath = 'circle(' + ((1 - p) * 110).toFixed(1) + '% at 50% 50%)';
          if (wipeLine) wipeLine.style.opacity = '0';
        } else {
          // Hand-drawn wavy ink wipe from left to right
          transOverlay.style.opacity = '1';
          const insetLeft = (p * 100).toFixed(2);
          transOverlay.style.clipPath = 'inset(0 0 0 ' + insetLeft + '%)';
          if (wipeLine) {
            wipeLine.style.opacity = p < 0.96 ? '1' : '0';
            wipeLine.style.left = insetLeft + '%';
          }
        }
      } else {
        transOverlay.style.opacity = '0';
        transOverlay.style.clipPath = 'none';
      }
    }

    // 2. Deterministic Infographic Elements (Zero CSS transition lag)
    const infoContainer = document.getElementById('infographicContainer');
    if (!infoContainer) return;

    infoContainer.querySelectorAll('[data-reveal-at]').forEach((el) => {
      const revealAt = parseFloat(el.getAttribute('data-reveal-at')) || 0;
      const baseScale = parseFloat(el.dataset.aspectScale || '1');
      el.style.transition = 'none';
      if (elapsedSec < revealAt) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px) scale(' + (baseScale * 0.96).toFixed(3) + ')';
      } else {
        const p = smoothstep(revealAt, revealAt + 0.38, elapsedSec);
        const yPx = ((1 - p) * 12).toFixed(2);
        const sc = (baseScale * (0.96 + 0.04 * p)).toFixed(3);
        el.style.opacity = p.toFixed(3);
        el.style.transform = 'translateY(' + yPx + 'px) scale(' + sc + ')';
      }
    });

    infoContainer.querySelectorAll('[data-speak-window]').forEach((el) => {
      const rawWin = (el.getAttribute('data-speak-window') || '0,0').split(',');
      const speakStart = parseFloat(rawWin[0]) || 0;
      const speakEnd = parseFloat(rawWin[1]) || 0;
      const baseScale = parseFloat(el.dataset.aspectScale || '1');
      el.style.transition = 'none';
      if (elapsedSec < speakStart || elapsedSec > speakEnd + 0.22) {
        el.style.opacity = '0';
      } else if (elapsedSec <= speakEnd) {
        const pIn = smoothstep(speakStart, speakStart + 0.28, elapsedSec);
        el.style.opacity = pIn.toFixed(3);
        el.style.transform = 'translateY(' + ((1 - pIn) * 8).toFixed(1) + 'px) scale(' + baseScale + ')';
      } else {
        const pOut = 1 - smoothstep(speakEnd, speakEnd + 0.22, elapsedSec);
        el.style.opacity = pOut.toFixed(3);
      }
    });

    infoContainer.querySelectorAll('[data-broll-window]').forEach((el) => {
      const rawWin = (el.getAttribute('data-broll-window') || '0,0').split(',');
      const winStart = parseFloat(rawWin[0]) || 0;
      const winEnd = parseFloat(rawWin[1]) || 0;
      const baseScale = parseFloat(el.dataset.aspectScale || '1');
      el.style.transition = 'none';
      if (elapsedSec < winStart || elapsedSec > winEnd + 0.26) {
        el.style.opacity = '0';
      } else if (elapsedSec <= winEnd) {
        const pIn = smoothstep(winStart, winStart + 0.36, elapsedSec);
        el.style.opacity = pIn.toFixed(3);
        el.style.transform = 'translateY(' + ((1 - pIn) * 10).toFixed(1) + 'px) scale(' + baseScale + ')';
      } else {
        const pOut = 1 - smoothstep(winEnd, winEnd + 0.26, elapsedSec);
        el.style.opacity = pOut.toFixed(3);
      }
    });

    infoContainer.querySelectorAll('.ref-bar-segment').forEach((seg) => {
      const fillAt = parseFloat(seg.getAttribute('data-fill-at')) || 0.2;
      const targetStr = seg.getAttribute('data-target-width') || '0%';
      const targetNum = parseFloat(targetStr) || 0;
      seg.style.transition = 'none';
      if (elapsedSec < fillAt) {
        seg.style.width = '0%';
      } else {
        const p = smoothstep(fillAt, fillAt + 1.1, elapsedSec);
        seg.style.width = (targetNum * p).toFixed(2) + '%';
      }
    });

    infoContainer.querySelectorAll('[data-dock-at]').forEach((el) => {
      const dockAt = parseFloat(el.getAttribute('data-dock-at')) || 999;
      const baseScale = parseFloat(el.dataset.aspectScale || '1');
      const dockScaleMult = parseFloat(el.getAttribute('data-dock-scale') || '0.68');
      const dockX = parseFloat(el.getAttribute('data-dock-x') || '0');
      const dockY = parseFloat(el.getAttribute('data-dock-y') || '-14');
      el.style.transition = 'none';
      if (elapsedSec >= dockAt) {
        const p = smoothstep(dockAt, dockAt + 0.48, elapsedSec);
        const curX = (dockX * p).toFixed(1);
        const curY = (dockY * p).toFixed(1);
        const curScale = (baseScale * (1 - (1 - dockScaleMult) * p)).toFixed(3);
        el.style.transformOrigin = 'top left';
        el.style.transform = 'translate(' + curX + 'px, ' + curY + 'px) scale(' + curScale + ')';
      }
    });

    infoContainer.querySelectorAll('.km-check-row[data-check-at]').forEach((row) => {
      const checkAt = parseFloat(row.getAttribute('data-check-at')) || 0;
      const box = row.querySelector('.km-check-box');
      if (elapsedSec >= checkAt) {
        row.classList.remove('dimmed');
        row.classList.add('active-check');
        if (box) box.textContent = '✓';
      } else {
        row.classList.add('dimmed');
        row.classList.remove('active-check');
        if (box) box.textContent = '';
      }
    });
  }

  function stepExportFrame(elapsedSec, mouthOpenOverride = null, includeEntranceTransition = true) {
    const shot = getActiveShots()[state.currentShotIndex];
    if (!shot) return;

    state.shotPlaying = false; // prevent rAF loop from racing with deterministic stepper
    state.shotElapsed = elapsedSec;

    // 1. Update running Khmer subtitle caption & rolling counters
    const totalDur = Math.max(4.0, state.shotDuration || shot.defaultDuration || 8.0);
    const isVoiceWindow = elapsedSec <= totalDur;
    updateVoiceRunningCaption(shot, elapsedSec, isVoiceWindow);
    applyCameraFraming(elapsedSec, true);
    applyDeterministicTransitionAndInfographics(shot, elapsedSec, includeEntranceTransition);

    // 2. Update rolling counter numbers
    const counterEl = document.getElementById('domCounterNum');
    if (shot.sceneType === 'ep01-sugar-xray' && counterEl) {
      const rollStart = 9.0;
      const rollEnd = 12.6;
      if (elapsedSec < rollStart) {
        counterEl.textContent = '10g (2 ស្លាបព្រា)';
      } else if (elapsedSec <= rollEnd) {
        const progress = Math.max(0, Math.min(1, (elapsedSec - rollStart) / (rollEnd - rollStart)));
        const val = Math.floor(10 + (45 - 10) * progress);
        const spoons = Math.max(2, Math.round(val / 4));
        counterEl.textContent = val + 'g (' + spoons + ' ស្លាបព្រា)';
      } else {
        counterEl.textContent = '45g (11 ស្លាបព្រា)';
      }
    }

    // 3. Deterministic Blink & Mouth Open
    const blinkCycle = elapsedSec % state.blinkInterval;
    const isBlinking = blinkCycle > (state.blinkInterval - 0.15);
    let primaryMouthOpen = 0;
    if (typeof mouthOpenOverride === 'number') {
      primaryMouthOpen = mouthOpenOverride;
    } else if (isVoiceWindow) {
      const syllableWave =
        Math.sin(elapsedSec * state.mouthCadence * Math.PI) * Math.cos(elapsedSec * 2.3 * Math.PI);
      primaryMouthOpen = Math.max(0, syllableWave);
    }

    // 4. Render Characters at exact elapsedSec
    const charSvgGroup = document.getElementById('characterSvgGroup');
    if (charSvgGroup && shot.sceneType !== 'character-sheet') {
      const behindCounterActors = [];
      const foregroundActors = [];
      const phase = elapsedSec * 2.6;

      let timelineActorBeat = null;
      if (Array.isArray(shot.actorBeats) && shot.actorBeats.length > 0) {
        timelineActorBeat = shot.actorBeats[0];
        for (let i = 0; i < shot.actorBeats.length; i++) {
          if (elapsedSec >= shot.actorBeats[i].at) {
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
        } else if (!isPrimarySpeaker && shot.sceneType === 'ep01-smart-swap' && elapsedSec >= 19.0) {
          beatEmotion = 'proud';
          beatGesture = 'present-right';
        }

        const actorScale = actor.scale ?? 1.0;
        let actorIsSpeaking = false;
        if (isVoiceWindow) {
          if (Array.isArray(actor.speakWindows)) {
            actorIsSpeaking = actor.speakWindows.some(
              (win) => elapsedSec >= win[0] && elapsedSec <= win[1]
            );
          } else {
            actorIsSpeaking = isPrimarySpeaker;
          }
        }

        const walkInProgress = Math.max(0, Math.min(1, elapsedSec / 1.38));

        const svgStr = window.CharacterRig.renderActorSVG({
          ...actor,
          headRadius: Math.round(state.headRadius * actorScale),
          torsoLength: Math.round(state.torsoLength * actorScale),
          limbLength: Math.round(state.limbLength * actorScale),
          gestureAmplitude: state.gestureAmplitude,
          headTiltOffset: isPrimarySpeaker ? state.headTiltOffset : 0,
          emotion: beatEmotion,
          gesture: beatGesture,
          angle: actor.angle || 'front',
          mouthOpen: actorIsSpeaking ? primaryMouthOpen : 0,
          isBlinking,
          walkInProgress,
          phase: phase + idx * 0.9
        });

        if (actor.behindCounter) behindCounterActors.push(svgStr);
        else foregroundActors.push(svgStr);
      });

      const activeLoc = shot.location;
      const counterForegroundSVG =
        activeLoc === 'shop'
          ? window.CharacterRig.renderPawnCounterForegroundSVG(
              shot.sceneType === 'pawn-scale-hybrid',
              state.scaleCounterText
            )
          : '';
      const showXrayCup = shot.sceneType === 'ep01-sugar-xray' && elapsedSec >= 8.5;
      const coffeeXrayPropSVG = showXrayCup
        ? window.CharacterRig.renderIcedCoffeeXrayPropSVG(325, 430)
        : '';

      charSvgGroup.innerHTML =
        behindCounterActors.join('') +
        counterForegroundSVG +
        coffeeXrayPropSVG +
        foregroundActors.join('');
    }

    // 5. Step all SVG SMIL <animateMotion> / <animateTransform> clocks
    document.querySelectorAll('#animationStage svg').forEach((svg) => {
      if (typeof svg.setCurrentTime === 'function') {
        try {
          svg.pauseAnimations();
          svg.setCurrentTime(elapsedSec);
        } catch (_) {}
      }
    });
  }

  function updateExportCliPreview() {
    const scopeEl = document.getElementById('exportScopeSelect');
    const aspectEl = document.getElementById('exportAspectSelect');
    const fpsEl = document.getElementById('exportFpsSelect');
    const codeEl = document.getElementById('exportCliPreviewCode');
    if (!scopeEl || !aspectEl || !fpsEl || !codeEl) return;

    const scope = scopeEl.value;
    const aspect = aspectEl.value;
    const fps = fpsEl.value;
    const shotFlag = scope === 'shot' ? ' --shot ' + (state.currentShotIndex + 1) : '';
    codeEl.textContent =
      'node export-video.js --deck ' + state.activeDeck + shotFlag + ' --aspect ' + aspect + ' --fps ' + fps;
  }

  function bindExportModalControls() {
    const modal = document.getElementById('videoExportModal');
    const btnOpen = document.getElementById('btnOpenExportModal');
    const btnClose = document.getElementById('btnCloseExportModal');
    const btnStart = document.getElementById('btnStartServerExport');
    const scopeEl = document.getElementById('exportScopeSelect');
    const aspectEl = document.getElementById('exportAspectSelect');
    const fpsEl = document.getElementById('exportFpsSelect');

    const openModalFn = () => {
      if (!modal) return;
      if (aspectEl) aspectEl.value = state.aspect;
      updateExportCliPreview();
      modal.classList.remove('hidden');
    };
    ['btnOpenExportModal', 'btnTimelineExportMp4', 'btnHudExportMp4'].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', openModalFn);
    });
    if (btnClose && modal) {
      btnClose.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }
    [scopeEl, aspectEl, fpsEl].forEach((el) => {
      if (el) el.addEventListener('change', updateExportCliPreview);
    });

    if (btnStart) {
      btnStart.addEventListener('click', async () => {
        const progBox = document.getElementById('exportProgressBox');
        const statusTxt = document.getElementById('exportStatusText');
        const pctTxt = document.getElementById('exportPercentText');
        const fillEl = document.getElementById('exportProgressBarFill');
        const resBox = document.getElementById('exportResultActions');
        const fileLbl = document.getElementById('exportOutputFileLabel');
        const dlLink = document.getElementById('exportDownloadLink');

        if (progBox) progBox.classList.remove('hidden');
        if (resBox) resBox.classList.add('hidden');
        btnStart.disabled = true;
        btnStart.textContent = '⏳ Rendering MP4...';

        const payload = {
          deck: state.activeDeck,
          shot: scopeEl?.value === 'shot' ? state.currentShotIndex + 1 : null,
          aspect: aspectEl?.value || state.aspect,
          fps: parseInt(fpsEl?.value || '30', 10)
        };

        try {
          const res = await fetch('/api/export/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (!res.ok || !data.jobId) {
            throw new Error(data.error || 'Failed to start export job');
          }

          const pollTimer = setInterval(async () => {
            try {
              const stRes = await fetch('/api/export/status?jobId=' + encodeURIComponent(data.jobId));
              const st = await stRes.json();
              if (statusTxt) statusTxt.textContent = st.message || 'Rendering...';
              if (pctTxt) pctTxt.textContent = (st.percent || 0) + '%';
              if (fillEl) fillEl.style.width = (st.percent || 0) + '%';

              if (st.status === 'done') {
                clearInterval(pollTimer);
                btnStart.disabled = false;
                btnStart.textContent = '🚀 Start MP4 Render';
                if (statusTxt) statusTxt.textContent = '✅ Export Complete!';
                if (resBox) resBox.classList.remove('hidden');
                if (fileLbl) fileLbl.textContent = st.outputFile;
                if (dlLink) {
                  dlLink.href = '/' + st.outputFile;
                  dlLink.download = st.outputFile.split('/').pop();
                }
              } else if (st.status === 'error') {
                clearInterval(pollTimer);
                btnStart.disabled = false;
                btnStart.textContent = '🚀 Start MP4 Render';
                if (statusTxt) statusTxt.textContent = '❌ Error: ' + (st.error || 'Export failed');
              }
            } catch (_) {}
          }, 600);
        } catch (err) {
          btnStart.disabled = false;
          btnStart.textContent = '🚀 Start MP4 Render';
          if (statusTxt) statusTxt.textContent = '❌ ' + err.message;
        }
      });
    }
  }


  function init() {
    renderShotTabs();
    renderAssetLibrary();
    bindControls();
    bindExportModalControls();
    updateCalibrationReadouts();
    const params = new URLSearchParams(window.location.search);
    if (params.get('exportMode') === '1') {
      state.isExportMode = true;
      document.body.classList.add('theatre-capture-mode', 'export-render-mode');
      return;
    }
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
    playSfxChime,
    getExportDeckInfo,
    prepareExportShot,
    stepExportFrame
  };
})();

window.addEventListener('DOMContentLoaded', () => {
  window.ScenePlayer.init();
});
