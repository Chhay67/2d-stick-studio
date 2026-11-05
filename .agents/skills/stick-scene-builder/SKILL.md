---
name: stick-scene-builder
description: >-
  Use this skill when building or modifying HTML/CSS/JS 2D stick-figure animation scenes,
  creating episode-specific SVG props, character gestures, custom Layer 3 concept displays,
  and dynamic episode-scoped asset catalogs in engine/character-rig.js, episodes/epXX/scenes.js,
  and engine/scene-player.js.
---

# 2D Stick-Figure Scene, Dynamic Topic Visuals & Deterministic Exporter Skill

Follow these engineering standards whenever creating or updating 2D scenes, props, concept displays, or episode timelines.

## 1. Dynamic Topic-Aligned Three-Layer Architecture (No Episode Cloning!)
Every episode inside `#animationStage` (`960×540` base coordinate system, responsive across `16:9`, `9:16`, and `1:1`) shares our core 2D stick-figure aesthetic and timing engine, but **MUST dynamically define its own topic-specific props, concept displays, and B-Roll items**:
1. **Layer 1 (`.layer-environment` — `z-index: 5`):** SVG location and ambient world motion rendered via `CharacterRig.renderLocationSVG(locationId, options)`.
2. **Layer 2 (`.layer-characters` — `z-index: 15`):**
   - SVG actors rendered at 60fps via `CharacterRig.renderActorSVG(config)` with episode-specific hand props/gestures (shared acting primitives plus original topic-specific gestures).
   - **Episode-Specific Stage Hero Props:** Render custom topic-specific SVG props on stage (e.g., `renderRustySpinalChairPropSVG`, `renderBodyBatteryChargerPropSVG`, and `renderMuscleSpongePropSVG` in EP02) inside `updateActorFrame` and `stepExportFrame`.
3. **Layer 3 (`.layer-infographics` — `z-index: 25` — Dynamic Topic Concept Displays):**
   - **Design Bespoke Concept Displays Per Topic & Per Shot:** Never copy-paste another episode's card arrangement or chart! Build custom SVG/HTML visual metaphors tailored to the shot's exact concept (e.g., multi-cell battery gauges, 24h circular pie/clock dials, split-hemisphere brain scans, 2-path biological pipelines, moon sleep meters, organ armor shields + piggy-bank vaults, 2×2 visual icon grids, and transformation trophy trackers).
   - **Universal Engine Timing Attributes (Supported on Any Custom Element):**
     - `data-reveal-at="seconds"`: Smooth fade/scale-in reveal at exact voice timestamp.
     - `data-dock-at="seconds"` (`data-dock-scale`, `data-dock-x`, `data-dock-y`): In-place "shrink-to-corner" miniaturization.
     - `.ref-bar-segment[data-fill-at="seconds"][data-target-width="%"]`: Progressive bar/gauge fill.
     - `.km-check-row[data-check-at="seconds"]`: Dim-to-bold progressive checklist row.
     - `.ref-speech-bubble[data-speak-window="start,end"]`: Character dialog bubble visible **ONLY** while that character is actively speaking (`actor.speakWindows`).
     - `.broll-cutaway-card[data-broll-window="start,end"]`: Animated 2D B-Roll cutaway window.
4. **Unified Episode Transition (`EPISODE_TRANSITION = 'wipe'`):**
   - Choose **one** suitable transition per episode and reuse it consistently across all shots in that episode.

## 2. Dynamic Episode-Scoped Left Sidebar Asset Library (`episode.ASSETS()`)
Use each registered episode’s own catalog:
1. **Export `ASSETS` and `getAssetUsage()` from `episodes/epXX-<slug>/scenes.js`:**
   - Each episode deck (`episode manifest`, `window.EP02_DAILY_EXERCISE`, etc.) defines its own `ASSETS` array (`elements`, `props`, `items`, `characters`, `locations`) with live `thumbHtml` previews and its own `getAssetUsage()` shot map.
2. **Dynamic Switching in `getStudioAssetsCatalog()` ([engine/scene-player.js](../../../engine/scene-player.js)):**
   - When the user selects an episode deck (registered episode IDs), `getStudioAssetsCatalog()` and `getActiveAssetUsageMap()` dynamically load **that episode's unique Concept Displays (`elem:...`), Custom Props (`prop:...`), Custom B-Roll Items (`item:...`), Cast (`char:...`), and Locations (`loc:...`)** into the Left Sidebar Asset Library and Right Sidebar Shot Inspector!
3. **Preserve Deterministic Frame-Stepping Compatibility ([export-video.js](../../../export-video.js)):**
   - Ensure any stage hero prop rendered in `updateActorFrame` is also rendered in `stepExportFrame` inside [engine/scene-player.js](../../../engine/scene-player.js) so Headless Chromium MP4 exports match live preview 1:1.


## 3. Multi-Voice Line Timeline, Dialogue Bubbles & Layout QA (added after EP02 refactor)
- **Data model:** a shot may define `voiceDir` + `lines[]` (helper `L(speaker, beat, style, spoken, {text, dur, emo, ges, acts})` in `episodes/ep02-*/scenes.js`; `VOICES` maps `N/V/S/P` → `voiceId`, `voiceSlug`, `actorId`). Do **not** hand-write `captionBeats`, `speakWindows` or `sfxCues` for these shots — `buildShotTimeline(shot)` in [scene-player.js](./engine/scene-player.js) derives them from real audio lengths (`line.realDur`) or `line.dur` estimates (start 0.35s, gap 0.30s, tail 0.5s).
- **Audio:** `audio/voice/shot_XX/line_NN_<voiceSlug>.wav|mp3`. Live playback loads each line (`loadLineVoices`), plays it at its start time (`syncLineAudioToTime`) and lip-syncs only the speaking actor. Export (`export-video.js`) decodes the same files, builds per-frame mouth values from the active clip and passes `lineDurs` to `prepareExportShot`.
- **Line-bound attributes** (resolved by `refreshLineBoundAttributes` so reveals follow real audio): `data-reveal-line="N"` (+`data-reveal-delay`), `data-check-line="N"` (+`data-check-delay`), `data-speak-line="N"` (bubbles), `data-window-lines="a,b"` (B-roll / hook cards). Never hard-code seconds in concept displays for line-based shots.
- **Dialogue bubbles:** generated by `renderDialogueBubbles(shot)` for every character line (initial width/left derived from `CARD_LEFT[sceneType]`; final placement follows the episode speaker anchor hook). Character lines hide the caption bar (`captionHidden`); narrator lines show it. Per-line `acts: { actorId: {emotion, gesture} }` make listeners react.
- **Responsive fit:** `fitPrimaryCardAndBubbles()` shrinks `#animCardPrimary` and pushes bubbles below it in `9:16` / `1:1`.
- **Layout QA (required before sign-off):** run a headless audit that renders every shot at several line times in `16:9`, `9:16`, `1:1` and fails on any `OVERFLOW` or `OVERLAP` between `#infographicContainer` children (script pattern: `prepareExportShot` → `stepExportFrame(t)` → compare `getBoundingClientRect()`).
- **Never render** the director-section ribbon; keep sources/verified numbers only on screen.


## Current episode package contract (supersedes older integration examples)

- EP02 Daily Exercise is the only installed episode. Read `docs/EPISODE_ARCHITECTURE.md` before new production or refactoring.
- Scaffold with `npm run episode:new -- epXX-topic-slug`. Preserve topic → cast → script approval gates; record explicit evidence in `production.json`, never infer approval from file existence.
- Register each built episode with `window.EpisodeRegistry.register()` in episode-owned `episode.js`. Add visuals → scenes → manifest script tags before the player. Never add episode-ID branches to selection/export code.
- Custom props and cast sheets belong in episode `visuals.js`; shared rig changes are only for reusable acting/anatomy primitives. Both preview and export call manifest `renderHeroProps(shot, elapsed)` and `renderCharacterSheet()` hooks. This replaces instructions above to duplicate hero-prop rendering in both player paths.
- Declare `shot.assets`; derive `getAssetUsage()` from these plus actual actors and location. Do not author a second usage map.
- `engine/timeline.js` owns pure line scheduling shared by browser/exporter. Do not duplicate constants. Existing runtime shots still receive compiled fields for compatibility.
- EP02 uses per-line multi-cast audio. After changing line order/text, review affected prompts, filenames and gate readiness.
- Run `npm test`, `npm run validate` and `npm run qa:layout -- --serve`; inspect screenshots and actual audio before final sign-off. Final-audio validation uses `--final`.
- Remaining migration: separate actor renderer, production UI, automatic approval invalidation, generated script/prompt documents. These are not implemented. Editable stage text is temporary. Keep existing calibrated engine defaults.

## Speaker identity in dialogue bubbles

- EP02 `renderDialogueBubbles(shot)` in episode `scenes.js` derives speaker identity from each line's `actorId`, `speaker` and `speakerLabel`. Show the matching cast portrait, editable Khmer name and visual dialogue text; never substitute the first actor's identity.
- `data-speaker-actor` records the speaker and `data-speaker-presence` distinguishes `onstage` from `offscreen`. On-stage bubbles have a tail positioned toward their actor. Off-stage bubbles have no tail and show `ក្រៅឆាក`; phone-labelled off-stage lines show `☎` and the phone label instead.
- Bind visibility with `data-speak-line`. Character dialogue hides narrator captions. Static portraits identify speakers but are not additional animated lip-sync actors.
- Style this composition in episode `styles.css` and link it from `index.html`. EP02 uses a 38px portrait, 10px gap and Khmer dialogue line-height 1.65. Account for the portrait when sizing text and fitting responsive bubbles.
- Review on-stage, off-stage and phone lines in 16:9, 9:16 and 1:1. Run `npm run qa:layout -- --serve` and inspect screenshots for portrait clipping, name/text legibility and tail alignment. Overlay rectangle checks do not establish tail-to-actor alignment or actual voice synchronization; missing recordings remain an audio QA limitation.


## Speaker anchoring for every shot and format

- Every on-stage character dialogue box must sit close above its actual speaker in 16:9 YouTube, 1:1 Facebook and 9:16 TikTok. All eight EP02 production shots implement this; use the same rule for new episodes. Do not restrict it to Shot 02 or use a fixed top dialogue row.
- Use the episode manifest's anchorDialogue(shot, aspect, container, svg) hook after camera framing. Project the speaker through the current SVG viewBox, include actor scale and seated pose, measure the bubble height, and keep its tail aimed at that speaker. The shared player calls the hook for preview and frame-stepped export.
- Keep portraits and editable Khmer name tags matched to line identity. Off-screen/phone dialogue has an explicit label and no tail; do not invent an on-stage speaker. Narrator captions and line-bound timing remain unchanged.
- Fit concept cards above the mobile dialogue/cast area instead of moving speech away from characters. Keep Khmer line-height 1.65; wide-format long lines may wrap under the portrait and fit down to 11.5px. Avoid face coverage, tag collisions and clipped text.
- Re-run npm run qa:layout -- --serve for all shots and formats. Inspect representative long-line, seated and off-screen screenshots; bounding-box checks cannot prove face clearance or exact tail alignment. Existing generic CARD_LEFT/generic fitting guidance is only initial placement; final character dialogue placement follows the anchor hook.
