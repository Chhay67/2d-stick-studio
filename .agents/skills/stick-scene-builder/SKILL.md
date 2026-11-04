---
name: stick-scene-builder
description: >-
  Use this skill when building or modifying HTML/CSS/JS 2D stick-figure animation scenes,
  adding new SVG props to assets/props/, adding floating infographic elements to assets/elements/,
  or wiring episode shot timelines in engine/scene-player.js and episodes/epXX/.
---

# 2D Stick-Figure Scene & Asset Builder Skill

Follow these engineering standards whenever creating or updating 2D scenes, props, or infographic elements in Antigravity.

## 1. Three-Layer DOM/SVG Architecture + B-Roll & Scene Transitions
All scenes inside `#animationStage` (`960×540` base coordinate system, responsive across `16:9`, `9:16`, and `1:1`) must separate:
1. **Layer 1 (`.layer-environment` — `z-index: 5`):** SVG location, ambient background world motion (`renderAmbientBackgroundMotionSVG` — passing vehicles outside windows/streets, ticking wall clocks), and background/mid-ground props rendered via `CharacterRig.renderLocationSVG(locationId, options)`.
2. **Layer 2 (`.layer-characters` — `z-index: 15`):** SVG actors rendered at 60fps via `CharacterRig.renderActorSVG(config)` (driven by `shot.actorBeats` keyframes, `walkInProgress` entrance stride during `0.0s–1.05s`, and `'jump-celebrate'` with golden sparkle stars `✨`) + foreground counter/hero props with wavy meniscus fills and curved dashed particle streams (`.km-dashed-stream`).
3. **Layer 3 (`.layer-infographics` — `z-index: 25` — "គិតមើល" Info-Box Display System):**
   - **Signature "គិតមើល" Components:**
     - `.km-key-tracker` + `.km-key-row` + `.km-key-pill` (Top-left key/icon chapter progress tracker `🔑1..7` + yellow active chapter pill).
     - `.km-dot-pill` + `.km-dot` (`.gold`, `.green`, `.coral`, `.blue`) (Floating rounded status-dot pill badge).
     - `.km-clipped-card` (White paper note card with yellow top-left `::before` clip and optional `.tilted-left`/`.tilted-right`).
     - `.km-counter-card` + `.km-counter-header` + `.km-counter-value` (Tinted-header rolling counter card).
     - `.km-stamp-badge` (Tilted `-6deg` rubber stamp slam badge).
     - `[data-dock-at="seconds"]` ("Shrink-to-Corner" in-place card miniaturization via `data-dock-scale`, `data-dock-x`, `data-dock-y`).
     - `.km-check-row[data-check-at="seconds"]` (Dim-to-bold progressive checklist rows where upcoming rows stay `.dimmed` and turn `.active-check` with a green `✓` at `checkAt`).
   - **Character Dialog Info Boxes (`.ref-speech-bubble` with `data-speak-window="start,end"`):** Visible **ONLY when the shot is playing AND the character is actively speaking (`start <= elapsed <= end`)**. Must hide (`opacity: 0`) immediately when the character stops speaking or when playback is stopped. Pair with `actor.speakWindows: [[start, end]]` so the character's mouth (`mouthOpen`) only animates during their speaking window.
   - **Animated 2D B-Roll Cutaway Windows (`.broll-cutaway-card` with `data-broll-window="start,end"`):** Picture-in-picture or macro cutaway visual inserts that slide in during mid-shot narration to illustrate internal biological/financial mechanisms.
   - **Intro & Outro Cards (`.director-intro-card` / `.director-outro-card`):** Animated Episode Title Card at the start of `Shot 01` and Transformation + Subscribe CTA Card at the end of the final shot.
   - **Voice-Dependent Running Subtitle Bar (`.stage-caption-bar` — `z-index: 35`):** Visible **ONLY when voice sound is actively playing (`.voice-active`)** and hidden (`opacity: 0`) when voice sound stops. Runs progressively word-by-word (`.cap-token.spoken`, `.cap-token.active-word`, `.cap-token.upcoming` + `.caption-voice-progress`) across each `shot.captionBeats` window.
4. **Cinematic Scene Transitions & Intra-Shot Camera Zoom/Pan (`#sceneTransitionOverlay` + `shot.cameraBeats`):**
   - Every shot defines `directorSection` (`INTRO`, `STORY`, `B-ROLL`, `EXPLAINER`, `HOW-TO`, `OUTRO`), `transitionType` (`wipe` — off-white paper wipe led by a vertical hand-drawn `#171717` wavy ink line `.ink-wipe-svg`, `iris`, or `dissolve`), `bgmMood` (`curious`, `story`, `investigation`, `uplifting`), and `cameraBeats` (`[{ at, zoom, panX, panY }]` for smooth intra-shot camera zoom-in, zoom-out, and pan).

## 2. Adding New Props & Floating Elements
- **New Foreground Props:**
  - Use `#171717` primary stroke (`2.2px–3.0px`), flat semantic/neutral fills (`#E6E9EF`, `#FFFFFF`, `#CBD5E1`, `#8C6239`, `#1E2638`), and register the prop in [props_catalog.json](../../../assets/props/props_catalog.json).
- **New Floating Infographic Elements:**
  - Float elements directly in negative space (like `.ref-calendar-badge`, `.ref-envelope-block`, `.ref-salary-bar-group`, `.ref-speech-bubble`).
  - Mark every Khmer text label and number node with `class="editable-text-node" contenteditable="true"` so post-production editing and the **Clean Plate Toggle** work automatically.
  - Register new elements in [elements_catalog.json](../../../assets/elements/elements_catalog.json).

## 3. Calibrated Default Tokens
- `--stroke-width: 3.5px` (`stroke-linecap: round`, `stroke-linejoin: round`)
- `--head-radius: 34px` (`torsoLength: 82px`, `limbLength: 96px` → `1:3.6` ratio)
- `--font-khmer: 'Kantumruy Pro', sans-serif` with `--khmer-lh: 1.65` (for *ជើងអក្សរ* subscript clearance)
- Respect the `5%` Action Safe, `10%` Title Safe, and `9:16` TikTok Right Rail / Bottom Marquee dead zones.
