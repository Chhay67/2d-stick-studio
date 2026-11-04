---
name: stick-scene-builder
description: >-
  Use this skill when building or modifying HTML/CSS/JS 2D stick-figure animation scenes,
  adding new SVG props to assets/props/, adding floating infographic elements to assets/elements/,
  updating the Left Sidebar 54-Asset Library & Right Sidebar Shot Inspector, or wiring episode shot
  timelines and deterministic MP4 export in engine/scene-player.js, episodes/epXX/, and export-video.js.
---

# 2D Stick-Figure Scene, Asset Library & Deterministic Exporter Skill

Follow these engineering standards whenever creating or updating 2D scenes, props, infographic elements, or episode timelines in Antigravity.

## 1. Three-Layer DOM/SVG Architecture + B-Roll & Scene Transitions
All scenes inside `#animationStage` (`960×540` base coordinate system, responsive across `16:9`, `9:16`, and `1:1`) must separate:
1. **Layer 1 (`.layer-environment` — `z-index: 5`):** SVG location, ambient background world motion (`renderAmbientBackgroundMotionSVG` — passing vehicles outside windows/streets, ticking wall clocks), and background/mid-ground props rendered via `CharacterRig.renderLocationSVG(locationId, options)`.
2. **Layer 2 (`.layer-characters` — `z-index: 15`):** SVG actors rendered at 60fps via `CharacterRig.renderActorSVG(config)` (driven by `shot.actorBeats` keyframes, `walkInProgress` entrance stride during `0.0s–1.38s`, and `'jump-celebrate'` with golden sparkle stars `✨`) + foreground counter/hero props with wavy meniscus fills and curved dashed particle streams (`.km-dashed-stream`).
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
   - Every shot defines `directorSection` (`INTRO`, `STORY`, `B-ROLL`, `EXPLAINER`, `HOW-TO`, `OUTRO`), `transitionType` (`1.18s` `wipe` — off-white paper wipe led by a vertical hand-drawn `#171717` wavy ink line `.ink-wipe-svg`, `1.10s` `iris`, or `1.02s` `dissolve`), `bgmMood` (`curious`, `story`, `investigation`, `uplifting`), and `cameraBeats` (`[{ at, zoom, panX, panY }]`).
   - Hold a `550ms` natural breathing pause at the end of each shot before advancing to the next shot (`handleShotPlaybackFinished`), with a `640ms` transition lead-in (`scheduleAutoPlayAfterTransition`).

## 2. Left Sidebar Visual Asset Library (`54+` Items) & Right Sidebar Shot Inspector
Whenever adding new props, floating infographic elements, B-roll items, or cast characters:
1. **Register in `getStudioAssetsCatalog()` ([engine/scene-player.js](../../../engine/scene-player.js)):**
   - Assign a unique prefixed ID (`elem:...`, `prop:...`, `item:...`, `char:...`, `loc:...`), Khmer & English names, and a live `thumbHtml` preview so it appears in the scrollable Left Sidebar (`#leftAssetLibraryList`) with a 1-click **`📋 Copy ID`** button.
   - Map which shots use the asset in `ASSET_SHOT_USAGE` so clickable **`Shot XX`** jump badges appear on the card and in the Right Sidebar's **Card 1 (`Active Shot & Used Assets`)**.
2. **Preserve Deterministic Frame-Stepping Compatibility ([export-video.js](../../../export-video.js)):**
   - Any new timed DOM attribute or animation added to `applyInfographicTimelineState(elapsed, isPlaying)` must also be mirrored in `applyDeterministicTransitionAndInfographics(shot, elapsedSec, includeEntranceTransition)` inside [engine/scene-player.js](../../../engine/scene-player.js) so Headless Chromium (`prepareExportShot` / `stepExportFrame`) renders every frame identically during `1080p` `.mp4` exports.

## 3. Calibrated Default Tokens
- `--stroke-width: 3.5px` (`stroke-linecap: round`, `stroke-linejoin: round`)
- `--head-radius: 34px` (`torsoLength: 82px`, `limbLength: 96px` → `1:3.6` ratio)
- `--font-khmer: 'Kantumruy Pro', sans-serif` with `--khmer-lh: 1.65` (for *ជើងអក្សរ* subscript clearance)
- Respect the `5%` Action Safe, `10%` Title Safe, and `9:16` TikTok Right Rail / Bottom Marquee dead zones.
