/**
 * Antigravity Unified Master Studio v2.0 — Scene Player, 8s Timeline Sequencer,
 * Real WebAudio RMS Lip-Sync, Khmer Subscript Calibration & Token Exporter
 */

window.ScenePlayer = (function () {
  const state = {
    activeDeck: window.EpisodeRegistry.defaultId,
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
    sceneReadyAt: 0,
    playbackRequested: false,
    assetFilterCategory: 'all',
    assetSearchQuery: '',
    inspectedAssetId: null,
    inspectedCharEmotion: 'happy',
    inspectedCharGesture: 'hold-coffee',
    episodeTransition: 'wipe'
  };

  function getActiveEpisode() { return window.EpisodeRegistry.get(state.activeDeck); }
  function getEpisodeTransition() { return getActiveEpisode().EPISODE_TRANSITION || 'wipe'; }
  function getActiveShots() { return getActiveEpisode().SHOTS; }

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
      if (dimBadge) dimBadge.textContent = '1080 × 1920 (9:16 TikTok / Shorts)';
    } else if (aspect === '1:1') {
      if (tiktokDz) tiktokDz.classList.remove('active');
      if (dimBadge) dimBadge.textContent = '1080 × 1080 (1:1 Facebook Feed)';
    } else {
      if (tiktokDz) tiktokDz.classList.remove('active');
      if (dimBadge) dimBadge.textContent = '1920 × 1080 (16:9 YouTube Master)';
    }

    applyCameraFraming();
    applyResponsiveInfographicLayout();
    applyInfographicTimelineState(state.shotPlaying ? state.shotElapsed : 999, state.shotPlaying);
    resizeStageToFit();
  }

  function resizeStageToFit() {
    const viewport = document.getElementById('stageViewport');
    const stage = document.getElementById('animationStage');
    if (!viewport || !stage) return;

    const availW = state.isExportMode ? window.innerWidth : viewport.clientWidth - 36;
    const availH = state.isExportMode ? window.innerHeight : viewport.clientHeight - 36;

    let baseW = 960;
    let baseH = 540;
    if (state.aspect === '9:16') {
      baseW = 540;
      baseH = 960;
    } else if (state.aspect === '1:1') {
      baseW = 760;
      baseH = 760;
    }

    const maxScale = state.isExportMode ? Infinity : 1.08;
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
      // Director section ribbon is intentionally hidden on all shots (kept only in metadata / asset inspector)
      dirBanner.textContent = '';
    }

    const transOverlay = document.getElementById('sceneTransitionOverlay');
    const stageEl = document.getElementById('animationStage');
    // Reuse the single chosen episode transition across the entire episode
    const tType = getEpisodeTransition();

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

    // Wait for both the wipe and camera entrance, then the breathing lead-in.
    // Read actual CSS animation lengths so changing the visual timing cannot
    // make playback outrun the transition again.
    const entranceElements = [transOverlay, stageEl?.querySelector('.layer-environment'), stageEl?.querySelector('.layer-characters')];
    let entranceMs = 0;
    entranceElements.filter(Boolean).forEach((element) => {
      const style = getComputedStyle(element);
      const toMs = (value) => parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000) || 0;
      const delays = style.animationDelay.split(',').map(toMs);
      style.animationDuration.split(',').map(toMs).forEach((duration, i) => {
        entranceMs = Math.max(entranceMs, duration + delays[i % delays.length]);
      });
    });
    state.sceneReadyAt = performance.now() + entranceMs + 640;

    if (playSound) {
      playTransitionSfx(tType);
    }
  }

  // =========================================================================
  // 3. FLOATING IN-WORLD INFOGRAPHIC & SPEECH BUBBLE RENDERER (REF 1–5)
  // =========================================================================
  function renderInfographicHTML(shot) { return getActiveEpisode().renderInfographic(shot) || ''; }

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
      let baseVbX = 45;
      if (activeLoc === 'shop') baseVbX = 115;
      else if (shot.sceneType === 'ep02-two-percent-rule') baseVbX = 32;
      else if (shot.sceneType === 'ep02-muscle-sponge') baseVbX = 28;
      else if (shot.sceneType === 'ep02-zero-dollar-matrix' || shot.sceneType === 'ep02-habit-outro') baseVbX = -10;
      else if (activeLoc === 'whiteboard') baseVbX = -15;

      if (state.cameraFraming === 'wide') {
        baseX = baseVbX; baseY = -325 - (shot.formatCamera?.['9:16']?.offsetY || 0); baseW = 540; baseH = 960;
      } else if (state.cameraFraming === 'medium') {
        baseX = baseVbX + 45; baseY = -195; baseW = 432; baseH = 768;
      } else {
        baseX = Math.max(0, focusActor.x - 160); baseY = -65; baseW = 324; baseH = 576;
      }
    } else if (state.aspect === '1:1') {
      // 1:1 Facebook Square (760x760): Place characters + foreground props in lower half (y = 375..655px)
      let baseVbX = -45;
      if (activeLoc === 'shop') baseVbX = 15;
      else if (shot.sceneType === 'ep02-two-percent-rule') baseVbX = -55;
      else if (shot.sceneType === 'ep02-muscle-sponge') baseVbX = -45;
      else if (activeLoc === 'whiteboard') baseVbX = -135;

      if (state.cameraFraming === 'wide') {
        baseX = baseVbX; baseY = -225 - (shot.formatCamera?.['1:1']?.offsetY || 0); baseW = 760; baseH = 760;
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

    const vbStr = `${vbX.toFixed(4)} ${vbY.toFixed(4)} ${vbW.toFixed(4)} ${vbH.toFixed(4)}`;
    envSvg.setAttribute('viewBox', vbStr);
    charSvg.setAttribute('viewBox', vbStr);
    const container = document.getElementById('infographicContainer');
    if (container) getActiveEpisode().anchorDialogue?.(shot, state.aspect, container, charSvg);
  }

  function fitPrimaryCardAndBubbles(shot, limitBottom) {
    if (!shot || !Array.isArray(shot.lines)) return;
    const info = document.getElementById('infographicContainer');
    const card = info && info.querySelector('#animCardPrimary');
    if (!card || card.classList.contains('ref-speech-bubble')) return;
    const top = parseFloat(card.style.top) || 0;
    const h = card.offsetHeight || 0;
    let sc = parseFloat(card.dataset.aspectScale || '1');
    if (h > 0 && top + h * sc > limitBottom) {
      sc = Math.max(0.6, Number(((limitBottom - top) / h).toFixed(3)));
      card.dataset.aspectScale = String(sc);
      card.style.transform = `translateY(0px) scale(${sc})`;
    }
    const bottom = top + h * sc;
    info.querySelectorAll('.ref-speech-bubble').forEach((b) => {
      const bt = parseFloat(b.style.top) || 0;
      b.style.top = `${Math.max(bt, Math.round(bottom + 8))}px`;
    });
  }

  function applyResponsiveInfographicLayout() {
    const infoContainer = document.getElementById('infographicContainer');
    const shot = getActiveShots()[state.currentShotIndex];
    if (!infoContainer || !shot) return;

    const children = Array.from(infoContainer.children);
    infoContainer.dataset.aspect = state.aspect;
    infoContainer.dataset.composition = '';
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
    if (getActiveEpisode().layoutInfographic?.(shot, state.aspect, infoContainer)) return;
    const hasTopCenterProp = !!infoContainer.querySelector('.ep-top-center-prop');
    const hasHookCard = !!infoContainer.querySelector('.ep-intro-hook-card');
    const hasSalaryBar = !!infoContainer.querySelector('.ref-salary-bar-group');
    const hasOutroCard = !!infoContainer.querySelector('.director-outro-card');

    if (state.aspect === '9:16') {
      // 9:16 TikTok (540x960): Safe upper zone x = 32..468px (436px wide, clear of 56px TikTok right rail), y = 40..460px
      children.forEach((el) => {
        el.style.transformOrigin = 'top left';
        if (el.classList.contains('ep-intro-hook-card')) {
          el.style.top = '96px';
          el.style.left = '34px';
          el.style.width = '560px';
          el.dataset.aspectScale = '0.77';
        } else if (el.classList.contains('ep-top-center-prop')) {
          el.style.top = hasTracker ? '82px' : '42px';
          el.style.left = '112px';
          el.style.width = '330px';
          el.dataset.aspectScale = '1';
        } else if (
          el.classList.contains('broll-cutaway-card') ||
          el.classList.contains('director-intro-card') ||
          el.classList.contains('director-outro-card')
        ) {
          const nativeW = parseFloat(el.dataset.origWidth) || 440;
          const sc = nativeW > 432 ? Number((432 / nativeW).toFixed(3)) : 0.88;
          el.style.top = el.classList.contains('director-outro-card') ? '316px' : '372px';
          el.style.left = '34px';
          el.dataset.aspectScale = String(sc);
        } else if (el.classList.contains('ref-speech-bubble') && shot.sceneType !== 'pawn-dialogue') {
          el.style.top = hasOutroCard ? '392px' : hasHookCard ? '404px' : hasTopCenterProp ? '470px' : '384px';
          el.style.left = '42px';
          el.dataset.aspectScale = '0.88';
        } else if (el.classList.contains('ref-chapter-tracker') || el.classList.contains('km-key-tracker')) {
          el.style.top = '36px';
          el.style.left = '34px';
          el.dataset.aspectScale = '0.80';
        } else if (hasSalaryBar && el.id === 'animCardPrimary') {
          el.style.top = '74px';
          el.style.left = '46px';
          el.dataset.aspectScale = '0.86';
        } else if (el.classList.contains('ref-salary-bar-group')) {
          el.style.top = '184px';
          el.style.left = '46px';
          el.style.width = '380px';
          el.dataset.aspectScale = '0.96';
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
          const nativeW = parseFloat(el.dataset.origWidth) || 440;
          const maxSafeW = 432;
          const scale = nativeW > maxSafeW ? Number((maxSafeW / nativeW).toFixed(3)) : 0.94;
          const renderedW = nativeW * scale;
          const leftPx = Math.round(32 + Math.max(0, (maxSafeW - renderedW) / 2));
          const topPx = hasTopCenterProp ? 154 : hasTracker ? 86 : 64;
          el.style.top = `${topPx}px`;
          el.style.left = `${leftPx}px`;
          el.dataset.aspectScale = String(scale);
        }
        el.style.transform = `translateY(0px) scale(${el.dataset.aspectScale || '1'})`;
      });
      fitPrimaryCardAndBubbles(shot, 436);
      return;
    }

    if (state.aspect === '1:1') {
      // 1:1 Facebook Square (760x760): Safe upper zone x = 50..710px (660px wide), y = 26..395px
      children.forEach((el) => {
        el.style.transformOrigin = 'top left';
        if (el.classList.contains('ep-intro-hook-card')) {
          el.style.top = '66px';
          el.style.width = '560px';
          el.style.left = `${Math.round((760 - 560 * 0.88) / 2)}px`;
          el.dataset.aspectScale = '0.88';
        } else if (el.classList.contains('ep-top-center-prop')) {
          el.style.top = hasTracker ? '68px' : '22px';
          el.style.left = `${Math.round((760 - 330 * 0.9) / 2)}px`;
          el.style.width = '330px';
          el.dataset.aspectScale = '0.9';
        } else if (
          el.classList.contains('broll-cutaway-card') ||
          el.classList.contains('director-intro-card') ||
          el.classList.contains('director-outro-card')
        ) {
          const nativeW = parseFloat(el.dataset.origWidth) || 440;
          const sc = el.classList.contains('director-outro-card') ? 0.84 : 0.88;
          const renderedW = nativeW * sc;
          el.style.top = el.classList.contains('director-outro-card') ? '278px' : el.classList.contains('broll-cutaway-card') && Array.isArray(shot.lines) ? '366px' : '298px';
          el.style.left = `${Math.round((760 - renderedW) / 2)}px`;
          el.dataset.aspectScale = String(sc);
        } else if (el.classList.contains('ref-speech-bubble') && shot.sceneType !== 'pawn-dialogue') {
          el.style.top = hasOutroCard ? '342px' : hasHookCard ? '376px' : hasTopCenterProp ? '382px' : '346px';
          el.style.left = '68px';
          el.dataset.aspectScale = '0.84';
        } else if (el.classList.contains('ref-chapter-tracker') || el.classList.contains('km-key-tracker')) {
          el.style.top = '24px';
          el.style.left = '44px';
          el.dataset.aspectScale = '0.84';
        } else if (hasSalaryBar && el.id === 'animCardPrimary') {
          el.style.top = '58px';
          el.style.left = '175px';
          el.dataset.aspectScale = '0.90';
        } else if (el.classList.contains('ref-salary-bar-group')) {
          el.style.top = '162px';
          el.style.left = '190px';
          el.style.width = '380px';
          el.dataset.aspectScale = '0.95';
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
          const nativeW = parseFloat(el.dataset.origWidth) || 440;
          const scale =
            hasOutroCard
              ? 0.80
              : hasTopCenterProp
                ? 0.83
                : nativeW > 520
                  ? 0.85
                  : 0.90;
          const renderedW = nativeW * scale;
          const leftPx = Math.round((760 - renderedW) / 2);
          const topPx = hasTopCenterProp ? 134 : hasOutroCard ? 66 : hasTracker ? 74 : 54;
          el.style.top = `${topPx}px`;
          el.style.left = `${leftPx}px`;
          el.dataset.aspectScale = String(hasTopCenterProp ? 0.76 : scale);
        }
        el.style.transform = `translateY(0px) scale(${el.dataset.aspectScale || '1'})`;
      });
      fitPrimaryCardAndBubbles(shot, 346);
    }
  }

  function renderEnvironmentLayer() {
    const shot = getActiveShots()[state.currentShotIndex];
    const envSvg = document.getElementById('environmentSvgGroup');
    if (!envSvg || !shot) return;

    if (shot.sceneType === 'character-sheet') {
      envSvg.innerHTML = getActiveEpisode().renderCharacterSheet();
    } else {
      const activeLoc =
        state.overrideLocation !== 'auto' ? state.overrideLocation : shot.location;
      envSvg.innerHTML = window.CharacterRig.renderLocationSVG(activeLoc, {
        showPawnSign: shot.sceneType === 'pawn-scale-hybrid',
        envOpacity: Math.min(1, state.envScale / 100)
      });
    }
  }

  // =========================================================================
  // 4A. MULTI-VOICE LINE TIMELINE (STORY / PROBLEM / DIALOGUE / EXAMPLE / SOLUTION / HOOK)
  // Each shot may define `shot.lines[]` (one TTS file per line). The timeline is derived from
  // the real audio durations (or `line.dur` estimates) so captions, bubbles, reveals, lip-sync
  // and gestures stay locked to the actual voice.
  // =========================================================================
  function buildShotTimeline(shot) {
    if (!shot || !Array.isArray(shot.lines) || shot.lines.length === 0) return;
    const timeline = window.StudioTimeline.compileLines(shot.lines);
    const speakMap = {};
    const beats = [];
    shot.lines.forEach((ln, index) => {
      ln.start = timeline.clips[index].start;
      ln.end = timeline.clips[index].end;
      beats.push({
        at: ln.start,
        text: ln.text || '',
        speaker: ln.speakerLabel || '',
        beatType: ln.beat || '',
        captionHidden: !!ln.actorId
      });
      if (ln.actorId) {
        if (!speakMap[ln.actorId]) speakMap[ln.actorId] = [];
        speakMap[ln.actorId].push([ln.start, ln.end]);
      }
    });
    shot.captionBeats = beats;
    shot.actors.forEach((a) => {
      a.speakWindows = speakMap[a.id] || [];
    });
    shot.defaultDuration = timeline.duration;

    // Point SFX derived from the real timeline: whoosh on entry, chime on EXAMPLE/SOLUTION, pop on HOOK/CTA
    const cues = [{ at: 0.4, sfx: 'whoosh' }];
    shot.lines.forEach((ln) => {
      if (ln.beat === 'EXAMPLE' || ln.beat === 'SOLUTION') cues.push({ at: Number((ln.start + 0.25).toFixed(2)), sfx: 'chime' });
      else if (ln.beat === 'HOOK' || ln.beat === 'CTA') cues.push({ at: ln.start, sfx: 'pop' });
      else if (ln.beat === 'PROBLEM') cues.push({ at: ln.start, sfx: 'alert' });
    });
    shot.sfxCues = cues;
  }

  function getActiveLine(shot, elapsed) {
    if (!shot || !Array.isArray(shot.lines) || shot.lines.length === 0) return null;
    let active = shot.lines[0];
    for (let i = 0; i < shot.lines.length; i++) {
      if (typeof shot.lines[i].start === 'number' && elapsed >= shot.lines[i].start) active = shot.lines[i];
    }
    return active;
  }

  function getLineActorAct(shot, actor, elapsed) {
    const ln = getActiveLine(shot, elapsed);
    if (!ln) return null;
    if (ln.acts && ln.acts[actor.id]) return ln.acts[actor.id];
    if (ln.actorId && ln.actorId === actor.id) {
      return { emotion: ln.emotion, gesture: ln.gesture };
    }
    return null;
  }

  function refreshLineBoundAttributes(shot) {
    const info = document.getElementById('infographicContainer');
    if (!info || !shot || !Array.isArray(shot.lines)) return;
    const L = (n) => shot.lines[Math.max(1, Math.min(shot.lines.length, n)) - 1];
    info.querySelectorAll('[data-reveal-line]').forEach((el) => {
      const ln = L(parseInt(el.getAttribute('data-reveal-line'), 10) || 1);
      const delay = parseFloat(el.getAttribute('data-reveal-delay')) || 0;
      el.setAttribute('data-reveal-at', (ln.start + delay).toFixed(2));
    });
    info.querySelectorAll('[data-check-line]').forEach((el) => {
      const ln = L(parseInt(el.getAttribute('data-check-line'), 10) || 1);
      const delay = parseFloat(el.getAttribute('data-check-delay')) || 0;
      el.setAttribute('data-check-at', (ln.start + delay).toFixed(2));
    });
    info.querySelectorAll('[data-speak-line]').forEach((el) => {
      const ln = L(parseInt(el.getAttribute('data-speak-line'), 10) || 1);
      el.setAttribute('data-speak-window', `${ln.start},${ln.end}`);
    });
    info.querySelectorAll('[data-window-lines]').forEach((el) => {
      const parts = (el.getAttribute('data-window-lines') || '1,1').split(',');
      const a = L(parseInt(parts[0], 10) || 1);
      const b = L(parseInt(parts[1], 10) || 1);
      el.setAttribute('data-broll-window', `${Math.max(0, a.start - 0.3).toFixed(2)},${b.end.toFixed(2)}`);
    });
  }

  function stopAllLineAudios() {
    (state.lineAudios || []).forEach((a) => {
      if (!a) return;
      try {
        a.onended = null;
        a.pause();
        a.currentTime = 0;
      } catch (_) {}
    });
    state.lineStarted = [];
  }

  function syncLineAudioToTime(shot, t, playing) {
    if (!shot || !Array.isArray(shot.lines) || !state.lineMode) return;
    shot.lines.forEach((ln, i) => {
      const audio = state.lineAudios && state.lineAudios[i];
      if (!audio) return;
      const within = t >= ln.start && t < ln.end - 0.02;
      if (within && playing) {
        if (!state.lineStarted[i]) {
          state.lineStarted[i] = true;
          try {
            audio.currentTime = Math.max(0, t - ln.start);
            connectExternalAudioAnalyser(audio);
            state.externalAudio = audio;
            state.usingExternalAudio = true;
            audio.play().catch(() => {});
          } catch (_) {}
        }
      } else {
        if (audio && !audio.paused) {
          try { audio.pause(); } catch (_) {}
        }
        if (t < ln.start) state.lineStarted[i] = false;
      }
    });
  }

  async function loadLineVoices(shot, reqId, label, readoutEl, autoPlayAfterLoad) {
    state.lineMode = true;
    state.lineAudios = [];
    state.lineStarted = [];
    if (state.isExportMode) {
      state.voiceLoading = false;
      return;
    }
    shot.lines.forEach((ln) => {
      delete ln.realDur;
    });
    let found = 0;
    for (let i = 0; i < shot.lines.length; i++) {
      const ln = shot.lines[i];
      const base = `${shot.voiceDir}/line_${String(i + 1).padStart(2, '0')}_${ln.voiceSlug}`;
      let audio = null;
      for (const ext of ['.wav', '.mp3']) {
        try {
          const res = await fetch(base + ext, { method: 'HEAD', cache: 'no-store' });
          if (reqId !== state.voiceLoadRequestId) return;
          if (res.ok) {
            const a = new Audio(base + ext);
            a.crossOrigin = 'anonymous';
            a.preload = 'auto';
            await new Promise((resolve) => {
              a.onloadedmetadata = resolve;
              a.onerror = resolve;
              setTimeout(resolve, 2500);
            });
            if (a.duration && isFinite(a.duration) && a.duration > 0.2) {
              ln.realDur = Number(a.duration.toFixed(2));
              audio = a;
            }
            break;
          }
        } catch (_) {}
      }
      if (reqId !== state.voiceLoadRequestId) return;
      state.lineAudios[i] = audio;
      if (audio) found++;
    }
    if (reqId !== state.voiceLoadRequestId) return;

    buildShotTimeline(shot);
    refreshLineBoundAttributes(shot);
    state.shotDuration = shot.defaultDuration;
    state.voiceLoading = false;
    state.usingExternalAudio = found > 0;
    if (readoutEl && !state.shotPlaying) readoutEl.textContent = `0.0s / ${state.shotDuration.toFixed(1)}s`;
    renderScrubberMarkers(shot, state.shotDuration);
    if (label) {
      label.textContent =
        found === shot.lines.length
          ? `🟢 Ready: ${found}/${shot.lines.length} voice lines`
          : `📂 ${found}/${shot.lines.length} lines • drop line_NN_<speaker>.wav in ${shot.voiceDir.split('/').slice(-3).join('/')}/`;
    }
    if (autoPlayAfterLoad || state.autoAdvanceEpisode || state.playbackRequested) {
      scheduleAutoPlayAfterTransition(reqId);
    }
  }

  function loadShot(index, triggerAudio = true) {
    clearTransitionTimer();
    state.playbackRequested = false;
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
    buildShotTimeline(shot);

    const infoContainer = document.getElementById('infographicContainer');
    if (infoContainer) {
      infoContainer.innerHTML = renderInfographicHTML(shot);
      refreshLineBoundAttributes(shot);
      applyResponsiveInfographicLayout();
      if (state.autoAdvanceEpisode) {
        applyInfographicTimelineState(0, true);
      } else {
        applyInfographicTimelineState(999, false);
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

    const beatEntry =
      Array.isArray(shot.captionBeats) && shot.captionBeats.length > 0
        ? shot.captionBeats[Math.max(0, shot.captionBeats.findIndex((b, i, arr) => !(arr[i + 1] && elapsed >= arr[i + 1].at)))]
        : null;
    if (beatEntry && beatEntry.captionHidden) {
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
      captionEl.innerHTML = wordsHtml;
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
    stopAllLineAudios();
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
    const delayMs = Math.max(0, state.sceneReadyAt - performance.now());
    state.transitionPending = true;
    updatePlaybackButtonsUI();
    state.transitionTimerId = setTimeout(() => {
      state.transitionTimerId = null;
      state.transitionPending = false;
      if (reqId === state.voiceLoadRequestId && (state.autoAdvanceEpisode || state.playbackRequested)) {
        startShotPlayback();
      }
    }, delayMs);
  }

  function updatePlaybackButtonsUI() {
    const isSingleShotPlaying = (state.shotPlaying || state.playbackRequested) && !state.autoAdvanceEpisode;
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
  }

  async function tryAutoLoadShotVoice(shot, autoPlayAfterLoad = false) {
    const reqId = ++state.voiceLoadRequestId;
    const label = document.getElementById('voiceFileLabel');
    const readoutEl = document.getElementById('timelineReadout');

    stopCurrentAudioElement();
    state.externalAudio = null;
    state.usingExternalAudio = false;
    state.voiceLoading = true;
    state.lineMode = false;
    state.lineAudios = [];

    state.shotDuration = shot?.defaultDuration || 8.0;
    if (readoutEl) readoutEl.textContent = `0.0s / ${state.shotDuration.toFixed(1)}s`;
    renderScrubberMarkers(shot, state.shotDuration);

    if (shot && Array.isArray(shot.lines) && shot.lines.length > 0 && shot.voiceDir) {
      await loadLineVoices(shot, reqId, label, readoutEl, autoPlayAfterLoad);
      return;
    }

    if (!shot || !shot.voiceBase) {
      state.voiceLoading = false;
      if (label) {
        label.textContent = 'Load .WAV/.MP3 (Real RMS Lip-Sync)';
      }
      if (autoPlayAfterLoad || state.autoAdvanceEpisode || state.playbackRequested) {
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

          if (autoPlayAfterLoad || state.autoAdvanceEpisode || state.playbackRequested) {
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
    if (autoPlayAfterLoad || state.autoAdvanceEpisode || state.playbackRequested) {
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
    if (state.shotPlaying || state.playbackRequested || state.autoAdvanceEpisode) {
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
    // If on the Character Sheet tab, load Shot 01 first
    if (shots[state.currentShotIndex]?.sceneType === 'character-sheet') {
      loadShot(0, true);
    } else if (!state.voiceLoading) {
      startShotPlayback();
    }
  }

  function startShotPlayback() {
    state.playbackRequested = true;
    if (state.voiceLoading) {
      applyInfographicTimelineState(0, true);
      updatePlaybackButtonsUI();
      return;
    }
    if (performance.now() < state.sceneReadyAt) {
      applyInfographicTimelineState(0, true);
      scheduleAutoPlayAfterTransition(state.voiceLoadRequestId);
      return;
    }
    clearTransitionTimer();
    state.playbackRequested = false;
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
    state.lineStarted = [];

    updatePlaybackButtonsUI();

    // Initialize staged infographic elements and bars at t = 0.0s
    applyInfographicTimelineState(0, true);
    startBgmEngine();

    if (state.externalAudio && !state.lineMode) {
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
    state.playbackRequested = false;
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
    {
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

    if (state.lineMode && shot) {
      (state.lineAudios || []).forEach((a) => {
        if (a) { try { a.pause(); } catch (_) {} }
      });
      state.lineStarted = [];
      syncLineAudioToTime(shot, targetSeconds, state.shotPlaying);
    }
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
      if (state.usingExternalAudio && state.externalAudio && !state.lineMode) {
        state.shotElapsed = state.externalAudio.currentTime || 0;
        if (state.externalAudio.ended) {
          state.shotElapsed = totalDur;
          handleShotPlaybackFinished();
        } else {
          updateShotTimelineEffects(state.shotElapsed);
        }
      } else {
        state.shotElapsed = (now - state.shotStartTime) * 0.001;
        if (state.lineMode) syncLineAudioToTime(shot, state.shotElapsed, true);
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

        const lineAct = state.shotPlaying ? getLineActorAct(shot, actor, state.shotElapsed) : null;
        const finalEmotion = lineAct && lineAct.emotion && state.overrideEmotion === 'auto' ? lineAct.emotion : activeEmotion;
        const finalGesture = lineAct && lineAct.gesture && state.overrideGesture === 'auto' ? lineAct.gesture : activeGesture;

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

        const walkDur = actor.sitOnChair ? 1.85 : 1.38;
        const walkInProgress = state.shotPlaying
          ? Math.max(0, Math.min(1, state.shotElapsed / walkDur))
          : 1;

        const svgStr = window.CharacterRig.renderActorSVG({
          ...actor,
          headRadius: Math.round(state.headRadius * actorScale),
          torsoLength: Math.round(state.torsoLength * actorScale),
          limbLength: Math.round(state.limbLength * actorScale),
          gestureAmplitude: state.gestureAmplitude,
          headTiltOffset: isPrimarySpeaker ? state.headTiltOffset : 0,
          emotion: finalEmotion,
          gesture: finalGesture,
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
      const heroProps = getActiveEpisode().renderHeroProps(shot, state.shotElapsed, { aspect: state.aspect });

      charSvgGroup.innerHTML = `
        ${behindCounterActors.join('')}
        ${counterForegroundSVG}
        ${heroProps}
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
  // 7B. DYNAMIC EPISODE-SCOPED ASSET LIBRARY (ELEMENTS, PROPS, ITEMS, CAST & LOCATIONS)
  // =========================================================================
  function getStudioAssetsCatalog() { return getActiveEpisode().ASSETS(); }
  function getActiveAssetUsageMap() { return getActiveEpisode().getAssetUsage(); }

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
      const usageMap = getActiveAssetUsageMap();
      const usedAssets = Object.entries(usageMap)
        .filter(([, shots]) => shots.includes(shotNum))
        .map(([id]) => id);

      const dur = (state.shotDuration || shot.defaultDuration || 8.0).toFixed(1);
      const trans = getEpisodeTransition().toUpperCase();
      const loc = `loc:${shot.location || 'whiteboard'}`;

      summaryEl.innerHTML = `
        <div style="font-weight:700; color:#FFFFFF; font-size:12.5px;">${shot.title}</div>
        <div class="shot-meta-grid">
          <div class="shot-meta-cell">
            <div class="shot-meta-label">Mode & Episode Transition</div>
            <div class="shot-meta-val">${shot.mode} • ${trans} (All Shots)</div>
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

    const catCounts = {
      all: allAssets.length,
      elements: allAssets.filter((a) => a.category === 'elements').length,
      props: allAssets.filter((a) => a.category === 'props').length,
      items: allAssets.filter((a) => a.category === 'items').length,
      characters: allAssets.filter((a) => a.category === 'characters').length,
      locations: allAssets.filter((a) => a.category === 'locations').length
    };

    const filterTabsEl = document.getElementById('assetFilterTabs');
    if (filterTabsEl) {
      const tabLabels = {
        all: `All (${catCounts.all})`,
        elements: `📊 Elements (${catCounts.elements})`,
        props: `🏃 Props (${catCounts.props})`,
        items: `🎞️ Items (${catCounts.items})`,
        characters: `🧑 Cast (${catCounts.characters})`,
        locations: `🏢 Locations (${catCounts.locations})`
      };
      filterTabsEl.querySelectorAll('.asset-filter-pill').forEach((btn) => {
        const c = btn.getAttribute('data-cat');
        if (c && tabLabels[c]) btn.textContent = tabLabels[c];
      });
    }

    const groupTitles = {
      elements: `📊 TOPIC CONCEPT DISPLAYS & ELEMENTS (${catCounts.elements})`,
      props: `🏃 2D VECTOR FOREGROUND & HERO PROPS (${catCounts.props})`,
      items: `🎞️ SCENE ITEMS & B-ROLL ICONS (${catCounts.items})`,
      characters: `🧑 ANTHOLOGY CAST CHARACTERS (${catCounts.characters})`,
      locations: `🏢 MINIMALIST 2D LOCATIONS (${catCounts.locations})`
    };

    const categoriesOrder = ['elements', 'props', 'items', 'characters', 'locations'];
    const usageMap = getActiveAssetUsageMap();
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
        const usedShots = usageMap[asset.id] || [];
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
      const gestures = ['idle', 'jog-energetic', 'hold-dumbbell', 'hold-water', 'stretch-arms', 'hold-coffee', 'explain', 'point-right', 'think', 'open-welcome', 'sad-droop', 'jump-celebrate', 'walk'];

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

  function bindControls() {
    const selectDeck = document.getElementById('selectEpisodeDeck');
    if (selectDeck) {
      selectDeck.addEventListener('change', (e) => {
        state.activeDeck = e.target.value;
        state.currentShotIndex = 0;
        renderShotTabs();
        renderAssetLibrary();
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
    if (deckName) { window.EpisodeRegistry.get(deckName); state.activeDeck = deckName; }
    const epTrans = getEpisodeTransition();
    const shots = getActiveShots()
      .map((s, idx) => ({
        index: idx,
        id: s.id,
        title: s.title,
        sceneType: s.sceneType,
        location: s.location || 'office',
        bgmMood: s.bgmMood || 'curious',
        transitionType: epTrans,
        defaultDuration: s.defaultDuration || 8.0,
        voiceBase: s.voiceBase || null,
        voiceDir: s.voiceDir || null,
        lines: Array.isArray(s.lines)
          ? s.lines.map((ln) => ({ voiceSlug: ln.voiceSlug, dur: ln.dur || 4, actorId: ln.actorId || null }))
          : null,
        sfxCues: Array.isArray(s.sfxCues) ? s.sfxCues : []
      }))
      .filter((s) => s.sceneType !== 'character-sheet');
    return {
      deck: state.activeDeck,
      episodeTransition: epTrans,
      shots
    };
  }

  function prepareExportShot(opts = {}) {
    state.isExportMode = true;
    if (opts.deck) {
      window.EpisodeRegistry.get(opts.deck);
      state.activeDeck = opts.deck;
    }
    const aspect = opts.aspect || '16:9';
    document.body.classList.add('export-render-mode');

    {
      const pre = getActiveShots()[typeof opts.shotIndex === 'number' ? opts.shotIndex : 0];
      if (pre && Array.isArray(pre.lines) && Array.isArray(opts.lineDurs)) {
        pre.lines.forEach((ln, i) => {
          if (opts.lineDurs[i] > 0) ln.realDur = opts.lineDurs[i];
        });
      }
    }
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
        const tType = getEpisodeTransition();
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
        }

        const exportLineAct = getLineActorAct(shot, actor, elapsedSec);
        if (exportLineAct) {
          beatEmotion = exportLineAct.emotion || beatEmotion;
          beatGesture = exportLineAct.gesture || beatGesture;
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

        const walkDur = actor.sitOnChair ? 1.85 : 1.38;
        const walkInProgress = Math.max(0, Math.min(1, elapsedSec / walkDur));

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
      const heroProps = getActiveEpisode().renderHeroProps(shot, elapsedSec, { aspect: state.aspect });

      charSvgGroup.innerHTML =
        behindCounterActors.join('') +
        counterForegroundSVG +
        heroProps +
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
    if (btnOpen) {
      btnOpen.addEventListener('click', openModalFn);
    }
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
    const episodeSelect = document.getElementById('selectEpisodeDeck');
    episodeSelect.replaceChildren(...window.EpisodeRegistry.list().map((episode) => {
      const option = document.createElement('option'); option.value = episode.id; option.textContent = episode.title; return option;
    }));
    episodeSelect.value = state.activeDeck;
    renderShotTabs();
    renderAssetLibrary();
    bindControls();
    bindExportModalControls();
    updateCalibrationReadouts();
    const params = new URLSearchParams(window.location.search);
    if (params.get('exportMode') === '1') {
      state.isExportMode = true;
      document.body.classList.add('export-render-mode');
      return;
    }
    loadShot(0, false);
    resizeStageToFit();
    requestAnimationFrame(updateActorFrame);
  }

  return {
    getPlaybackStatus: () => ({
      shotIndex: state.currentShotIndex, playing: state.shotPlaying,
      pending: state.transitionPending, loading: state.voiceLoading,
      elapsed: state.shotElapsed, readyAt: state.sceneReadyAt, now: performance.now()
    }),
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
