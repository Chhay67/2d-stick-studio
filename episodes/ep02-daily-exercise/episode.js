window.EpisodeRegistry.register({
  id: 'ep02',
  title: '🏃 EP02: ហាត់ប្រាណប្រចាំថ្ងៃ (Daily Exercise)',
  ...window.EP02_DAILY_EXERCISE,
  ...window.EP02_VISUALS,
  layoutInfographic(shot, aspect, container) {
    container.dataset.topic = shot.sceneType;
    if (aspect === '9:16') {
      const card = container.querySelector('#animCardPrimary');
      if (card) {
        card.firstElementChild?.classList.add('ep02-concept-heading');
        [...card.children].filter((element) => element.style.display === 'grid' && !element.classList.contains('ep02-age-comparison')).forEach((grid) => {
          grid.classList.add('ep02-concept-grid');
          [...grid.children].forEach((panel) => panel.classList.add('ep02-concept-cell'));
        });
      }
    }
    if (shot.sceneType !== 'ep02-two-percent-rule') return false;
    container.dataset.composition = 'time-rule';
    const vertical = aspect === '9:16';
    const left = vertical ? 32 : 42;
    const width = vertical ? 468 : 676;
    const tracker = container.querySelector('.km-key-tracker');
    const card = container.querySelector('#animCardPrimary');
    const bubbles = [...container.querySelectorAll('.ref-speech-bubble')];
    const place = (element, top, x, w) => {
      Object.assign(element.style, { top: top + 'px', left: x + 'px', right: 'auto', width: w + 'px', transformOrigin: 'top left', transform: 'translateY(0px) scale(1)' });
      element.dataset.aspectScale = '1';
    };
    place(tracker, vertical ? 36 : 26, left, vertical ? 432 : width);
    bubbles.forEach((bubble) => place(bubble, 0, left, vertical ? 380 : 460));
    place(card, (vertical ? 36 : 26) + tracker.offsetHeight + (vertical ? 12 : 22), vertical ? 12 : left, width);
    return true;
  },
  anchorDialogue(shot, aspect, container, svg) {
    if (!shot.lines?.length) return;
    const view = svg.viewBox.baseVal;
    const stage = document.getElementById('animationStage');
    const scaleX = stage.offsetWidth / view.width;
    const scaleY = stage.offsetHeight / view.height;
    const card = container.querySelector('#animCardPrimary');
    const cardLeft = parseFloat(card?.dataset.origLeft || card?.style.left) || 468;
    const width = aspect === '9:16' ? 380 : aspect === '1:1' ? 460 : Math.min(432, cardLeft - 44);
    const margin = aspect === '16:9' ? 24 : aspect === '9:16' ? 32 : 42;
    const right = aspect === '16:9' ? cardLeft - 20 : aspect === '9:16' ? 464 : 718;
    let dialogueTop = Infinity;
    container.querySelectorAll('.ref-speech-bubble').forEach((bubble) => {
      const actor = shot.actors.find((actor) => actor.id === bubble.dataset.speakerActor) || { x: shot.actors.reduce((sum, actor) => sum + actor.x, 0) / Math.max(1, shot.actors.length), y: 430, scale: 1 };
      bubble.dataset.aspectScale = '1';
      bubble.style.width = width + 'px';
      const body = bubble.querySelector('.ep02-speaker-dialog-body');
      const portrait = bubble.querySelector('.ep02-speaker-portrait');
      // Let longer wide-format lines use the space below the portrait too.
      body.style.display = aspect === '16:9' ? 'flow-root' : '';
      portrait.style.cssFloat = aspect === '16:9' ? 'left' : '';
      portrait.style.marginRight = aspect === '16:9' ? '10px' : '';
      const x = (actor.x - view.x) * scaleX;
      // Crown position follows the same calibrated proportions and actor scale as the rig.
      const seated = actor.sitOnChair || actor.gesture === 'sit' || actor.gesture === 'sit-type';
      const crown = actor.y - (96 * (seated ? 0.68 : 1) + 82 + 10 + 68 - 2 + 12) * (actor.scale || 1);
      const y = (crown - view.y) * scaleY;
      const text = bubble.querySelector('.ep02-speaker-dialog-text');
      const fitKey = `${aspect}:${width}:${document.fonts.status}`;
      if (bubble.dataset.textFitKey !== fitKey) {
        text.style.fontSize = '';
        if (aspect === '16:9') {
          // Fit once against the stable base framing, not the moving camera.
          const baseViewY = 0;
          const baseCrownY = crown - baseViewY;
          for (let fontSize = 12.5; bubble.offsetHeight > baseCrownY - 92 && fontSize >= 11.5; fontSize -= 0.5) {
            text.style.fontSize = fontSize + 'px';
          }
        }
        bubble.dataset.textFitKey = fitKey;
      }
      const left = Math.max(margin, Math.min(right - width, x - width / 2));
      bubble.style.left = left + 'px';
      const top = Math.max(70, y - bubble.offsetHeight - 18);
      bubble.style.top = top + 'px';
      dialogueTop = Math.min(dialogueTop, top);
      bubble.style.setProperty('--speaker-tail-x', Math.max(20, Math.min(width - 20, x - left)) + 'px');
    });
    if (aspect !== '16:9' && card && Number.isFinite(dialogueTop)) {
      const top = parseFloat(card.style.top) || 86;
      const enlargedTikTokPanel = aspect === '9:16' && container.dataset.composition === 'time-rule';
      let available = dialogueTop - (enlargedTikTokPanel ? 18 : 32) - top;
      let scale = Math.min(1, (stage.offsetWidth - margin * 2) / card.offsetWidth, available / card.offsetHeight);
      if (aspect === '9:16') {
        const targetWidth = stage.offsetWidth * 0.8;
        const secondary = [...container.querySelectorAll('.broll-cutaway-card, .director-outro-card')];
        secondary.forEach((element) => {
          const native = parseFloat(element.dataset.origWidth) || element.offsetWidth;
          const fittedScale = Math.min(1, targetWidth / native);
          element.style.width = (targetWidth / fittedScale) + 'px';
          element.dataset.aspectScale = String(fittedScale);
        });
        if (secondary.length) available -= Math.max(...secondary.map((element) => element.offsetHeight * Number(element.dataset.aspectScale))) + 16;
        const fitKey = document.fonts.status + ':' + targetWidth;
        if (card.dataset.widthFitKey !== fitKey || Math.abs(card.offsetWidth * Number(card.dataset.widthFitScale) - targetWidth) > 1) {
          for (let step = 100; step >= 35; step--) {
            const candidate = step / 100;
            card.style.width = (targetWidth / candidate) + 'px';
            if (card.offsetHeight * candidate <= available || step === 35) { scale = candidate; break; }
          }
          card.dataset.widthFitScale = String(scale);
          card.dataset.widthFitKey = fitKey;
        } else scale = Number(card.dataset.widthFitScale);
        secondary.forEach((element) => { element.style.top = (top + card.offsetHeight * scale + 16) + 'px'; });
        container.querySelectorAll('.ep-intro-hook-card, .broll-cutaway-card, .director-outro-card').forEach((element) => {
          const native = parseFloat(element.dataset.origWidth) || element.offsetWidth;
          const fittedScale = Math.min(1, targetWidth / native);
          element.style.width = (targetWidth / fittedScale) + 'px';
          element.style.left = (stage.offsetWidth * 0.1) + 'px';
          element.dataset.aspectScale = String(fittedScale);
        });
      }
      if (scale > 0) {
        card.dataset.aspectScale = String(scale);
        card.style.left = (aspect === '9:16' ? stage.offsetWidth * 0.1 : (stage.offsetWidth - card.offsetWidth * scale) / 2) + 'px';
        card.style.transform = 'translateY(0px) scale(' + scale + ')';
      }
    }
  },
  getAssetUsage() {
    const usage = {};
    this.SHOTS.forEach((shot, index) => {
      if (shot.sceneType === 'character-sheet') return;
      const ids = new Set([
        ...(shot.assets || []),
        'loc:' + shot.location,
        ...shot.actors.map((actor) => 'char:' + actor.id.replace(/^char_/, ''))
      ]);
      ids.forEach((id) => (usage[id] ||= []).push(index + 1));
    });
    return usage;
  }
});
