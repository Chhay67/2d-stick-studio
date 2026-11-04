# Khmer 2D Educational Animation Studio — Workspace Agent Rules (Master Design System v2.0)

Always follow these studio rules when researching, scripting, directing, or coding scenes in this workspace:

## 1. Creative Identity, Filmmaker Persona & Topic Pillars
- **Director & Filmmaker Role:** Act as a **Professional 2D Animation Director, Documentary Filmmaker, and Master Scriptwriter**. Every episode must be crafted as a cohesive, high-retention cinematic experience rather than static slides.
- **Format:** Original Khmer-language (`ភាសាខ្មែរ`) 2D educational animated videos for YouTube (`16:9`), Facebook (`16:9` / `1:1`), and TikTok (`9:16`).
- **Mandatory 5-Part Filmmaker Episode Structure:**
  1. **`INTRO` (Cold Open, Title Card & Curiosity Hook):** Grab attention in the first `5–15s` with a relatable everyday question, animated Episode Title Card, and clear promise of what the viewer will learn.
  2. **`EXAMPLE STORY` (Relatable Character Drama):** Introduce our episode-specific cast (`1–3` characters) experiencing the real-life Cambodian habit, emotional struggle, or financial/health pain point (`STORY` & `HYBRID` modes).
  3. **`B-ROLL & VISUAL CUTAWAYS` (Dynamic Visual Pacing):** Insert animated 2D B-Roll cutaway windows (`.broll-cutaway-card` — macro close-ups of props, internal organ/brain/bloodstream animations, ticking clocks, wallet/compounding visualizations) every `8–12s` during longer narrations so the screen never stays static.
  4. **`MAIN EXPLAINER & HOW-TO PROTOCOL` (Deep Knowledge, Science & Step-by-Step Guide):** Authoritative `VOICE-NARRATOR-001` educational breakdown explaining *why* the problem happens (scientific/financial mechanism) and *how* to solve it (`3–4` actionable steps).
  5. **`OUTRO` (Transformation Payoff, Golden Takeaway & CTA):** Show the character's positive transformation, lock in a 1-sentence golden rule, and display an animated Subscribe/Share Call-to-Action card.
- **Cinematic Scene Transitions, Intra-Shot Camera Zoom/Pan & 3-Stem Sound Design ("គិតមើល" Template System):**
  - **Hand-Drawn Wavy Ink-Line Wipe Transition (`wavy-ink-wipe`):** Every scene switch (`loadShot`) triggers a smooth **Cinematic Transition** (`wipe` — off-white paper wipe led by a vertical hand-drawn `#171717` wavy ink line `.ink-wipe-svg`, `iris`, or `dissolve`) + camera entrance ease + transition whoosh/chime SFX.
  - **Intra-Shot Camera Zoom & Pan (`shot.cameraBeats`):** Every shot supports smooth intra-shot camera zoom-in (`1.0x → 1.15x` on the speaking character or hero prop), zoom-out, and horizontal pan (`panX`, `panY`) interpolated via cubic smoothstep at 60fps in `applyCameraFraming(elapsed, isPlaying)`.
  - **Continuous Ambient World Motion & Walk-In/Jump Acting:** Layer 1 (`ENVIRONMENT`) includes subtle continuous background motion (passing vehicles outside windows/streets, ticking wall clocks) via `renderAmbientBackgroundMotionSVG(locationId)`. Layer 2 (`CHARACTER`) supports smooth walk-in entrance (`walkInProgress` during `0.0s–1.05s`) and `'jump-celebrate'` (jumping upward with golden sparkle stars `✨`).
  - Maintain a **3-Stem Audio Mix**: (1) `VOICE-NARRATOR-001` (`0 dB`), (2) Continuous **Background Music Bed (`BGM`)** with mood shifts (`curious` → `story` → `investigation` → `uplifting`) and **Auto-Ducking** (`-18 dB` under speech), and (3) **Location Ambience & Point SFX** (`whoosh_paper`, `pop_soft`, `counter_ticks`, `chime_highlight`, `alert_coral`).
- **Depth-First & Complete Meaning Rule (No Arbitrary Time Cap):** Never artificially compress or truncate an episode to a fixed duration. Each episode's length, chapter count (`5–7+` chapters), and shot depth are driven organically by what is required to deliver a **complete, deeply meaningful story, thorough scientific/practical research, and step-by-step real-life transformation**. Every shot's spoken Khmer narration should be rich, natural, and fully explanatory (`2–4` complete sentences per shot rather than rushed 1-line fragments).
- **Four Pillars:** (1) Education & Learning, (2) Motivation & Personal Growth, (3) Personal Financial Management, (4) Healthy Living (Food, Nutrition, Exercise).
- **Anthology Cast Rule:** Invent a story-specific cast (`1–3` characters) for each episode. Never reuse a permanent main protagonist across unrelated episodes.

## 2. Three-Layer Scene Formula & Visual Signature
- **Layer 1 (`ENVIRONMENT`):** Minimalist flat 2D location from [locations_catalog.json](./assets/locations/locations_catalog.json) + `#171717`-outlined foreground props from [props_catalog.json](./assets/props/props_catalog.json).
- **Layer 2 (`CHARACTER`):** Round-headed (`34px` radius), slim-limbed (`3.5px` `#171717` stroke) stick figures (either `minimal` stick with flat foot ticks or `outfitted` pill torso with hair/accessories). Express emotion through coordinated eyes, brows, mouth, head tilt, and posture using the **15-Emotion Matrix** (`neutral`, `happy`, `sad`, `worried`, `surprised`, `confused`, `thinking`, `excited`, `angry`, `tired`, `embarrassed`, `proud`, `scared`, `calm`, `determined`).
- **Layer 3 (`EXPLANATION` — "គិតមើល" Signature Info-Box Display System):** Use **floating in-world infographic elements** and speech bubbles with yellow speaker tags from [elements_catalog.json](./assets/elements/elements_catalog.json):
  1. **Top-Left Key/Icon Progress Tracker (`.km-key-tracker` + `.km-key-row` + `.km-key-pill`):** Row of chapter key badges (`🔑1..7`, completed keys turn gold `✓`) paired with a yellow active chapter title pill.
  2. **Status-Dot Pill Badges (`.km-dot-pill` + `.km-dot`):** Rounded white pill (`border: 2.2px solid #171717`, `border-radius: 999px`) with a colored status dot (`.gold`, `.green`, `.coral`, `.blue`).
  3. **White Paper Note Cards with Yellow Top-Left Clip (`.km-clipped-card`):** Clean white card with a signature yellow top-left clip (`#F4C430` `::before` badge) and optional subtle tilt (`.tilted-left` / `.tilted-right`).
  4. **Tinted-Header Rolling Counter Cards (`.km-counter-card` + `.km-counter-header` + `.km-counter-value`):** White card with a tinted inner pill header (`• 30 ថ្ងៃ`, `• 365 ថ្ងៃ`, `• ការប្រាក់` in `.coral`, `.green`, `.gold`, `.blue`) and large rolling counter.
  5. **Rubber Stamp Slam Badges (`.km-stamp-badge`):** Tilted (`-6deg`) rectangular stamp that slams onto the canvas (`លើសកម្រិត 180%!`, `កាត់ស្ករ 80%!`).
  6. **In-Place Info-Box Miniaturization ("Shrink-to-Corner" `data-dock-at="seconds"`):** Completed primary info boxes smoothly scale down (`data-dock-scale="0.78"`) and dock upward (`data-dock-x`, `data-dock-y`) instead of vanishing when the next chart or B-Roll window appears.
  7. **Dim-to-Bold Progressive Checklists (`.km-check-row[data-check-at="seconds"]`):** Action-step rows start dimmed (`.dimmed`, `opacity: 0.36`, empty box) and transition one-by-one to bold active state (`.active-check`, `opacity: 1`, green `✓` box + chime) at their exact spoken timestamp.
  8. **Curved Dashed Particle Streams (`.km-dashed-stream` + `<animateMotion>`):** Flying icons/cubes/bills moving along curved dashed SVG Bezier paths (`---🍬/💵-->`) + progressive wavy meniscus fills on hero props.
  - **Character Dialog Box Rule (`.ref-speech-bubble` + `data-speak-window="start,end"` + `actor.speakWindows`):** Character dialog info boxes (`.ref-speech-bubble`) must **only be visible during the exact time window when that character speaks (`start <= elapsed <= end` while voice sound is playing)**, and must automatically hide (`opacity: 0`) as soon as the character stops speaking or when playback is stopped. Gate character mouth lip-sync (`mouthOpen`) using `actor.speakWindows` so characters only move their mouths while speaking.
- **Scene Modes:** `HYBRID` (preferred default), `STORY` (character interaction), `EXPLAINER` (concept/graph first). Enforce **one learning idea per shot** and vary graphic placement across consecutive shots.

## 3. Controlled Semantic Palette
- Canvas: Warm Off-White `#F5F5F3` / Pure White `#FFFFFF`
- Primary Ink: Charcoal `#171717`
- Muted Neutral / Anchors: `#E5E7EB` / Slate `#64748B`
- Semantic Accents (by meaning only, never random): Green `#2FAA61` (positive/savings/health), Coral `#FA604E` (warning/loss/alert), Blue `#5D98E8` (information/logic), Gold `#EABF42` (attention/value/speaker tag).

## 4. Khmer Typography, Dual Script, Voice-Dependent Running Caption & Unified Signature Voice Rule
- Render all on-screen Khmer labels, numbers, and subtitles (`1–2 lines max` in bottom safe zone) as editable DOM/SVG text (`contenteditable="true"`) using `'Kantumruy Pro'` or `'Noto Sans Khmer'` with `line-height: 1.65` so Khmer subscripts (*ជើងអក្សរ*) never clip.
- **Voice-Dependent Running Subtitle Caption Rule (`#stageCaptionText` / `.stage-caption-bar`):**
  - The bottom subtitle bar must **only be visible when voice sound is actively playing (`state.shotPlaying === true`)** and automatically hide (`opacity: 0`) when voice playback is stopped, paused, or finished.
  - While voice sound is playing, the caption must **run progressively with the voice** (highlighting spoken words via `.cap-token.spoken` / `.cap-token.active-word` / `.cap-token.upcoming` + `.caption-voice-progress` bar across each `captionBeat` window).
- **Unified Studio Voice-Over Rule (`VOICE-NARRATOR-001`):**
  - We use **one unique, custom-designed vocal persona (`VOICE-NARRATOR-001` — Khmer Studio Storyteller)** created via **Google AI Studio Voice Design (`gemini-3.8-flash-tts`)** across **all shots and all episodes** by default (including narrating character speech bubbles using situational `[STYLE]` emotion cues).
  - Do not switch between multiple TTS voices inside an episode unless the user explicitly asks for multi-speaker cast voices (`VOICE-CAST-01..03`).
- **Dual Khmer Script Requirement:** In every shot script, always provide:
  1. **Visual Khmer Text:** Crisp digits and symbols (`$300`, `70-85%`, `$966`).
  2. **Spoken Khmer TTS Transcript:** All numbers, currencies, and symbols spelled out in full Khmer words (`បីរយដុល្លារ`, `ចិតសិបទៅប៉ែតសិបប្រាំភាគរយ`) for `VOICE-NARRATOR-001`.

## 5. Production Flow & Approval Gates
Follow the 7-Step SOP in [WORKFLOW_SOP.md](./docs/WORKFLOW_SOP.md):
- **Gate 1 (Step 1):** Create and get user approval on `episodes/epXX-<slug>/01_topic_brief.md` (5-chapter outline & verified facts) before casting.
- **Gate 2 (Step 2):** Create and get user approval on `episodes/epXX-<slug>/02_character_and_prop_sheet.md` + register the 3-angle turnaround (`Front`, `3/4`, `Side`) in [character-rig.js](./engine/character-rig.js) before scripting.
- **Gate 3 (Step 3):** Write and get user approval on `episodes/epXX-<slug>/03_shot_script.md` in Chapter Batches (`8–12` shots per batch) before generating voice prompts or coding scenes.
- **Step 4 (Voice & SFX):** Generate `episodes/epXX-<slug>/04_ai_studio_voice_prompts.md` using the `ai-studio-voice-sfx` skill. User drops recorded `.wav`/`.mp3` files into `episodes/epXX-<slug>/audio/voice/shot_XX.wav`.
- **Step 5–7 (HTML/JS Scene Build, QA & Export):** Use the `stick-scene-builder` skill to wire the episode shots into [scene-player.js](./engine/scene-player.js) (or `episodes/epXX-<slug>/scenes.js`) and preview via [server.js](./server.js) (`node server.js` → `http://localhost:8080`).

## 6. New Conversation Kickoff & Reproduction Protocol
When a new conversation starts in this workspace:
1. **Activate Relevant Workspace Skills:** Read [khmer-episode-director](./.agents/skills/khmer-episode-director/SKILL.md), [ai-studio-voice-sfx](./.agents/skills/ai-studio-voice-sfx/SKILL.md), or [stick-scene-builder](./.agents/skills/stick-scene-builder/SKILL.md) depending on the current step.
2. **Check Existing Episode State:** Inspect `episodes/` to see which episode and step (`01_topic_brief.md` .. `scenes.js`) are already completed or in progress, and resume from the current gate without repeating approved steps.
3. **Preserve Calibrated Engine Defaults:** Keep `--stroke-width: 3.5px`, `--head-radius: 34px`, `torsoLength: 82px`, `limbLength: 96px` (`1:3.6` ratio), `blinkInterval: 3.2s`, `mouthCadence: 8.5Hz`, and `--khmer-lh: 1.65` in [styles.css](./engine/styles.css) and [scene-player.js](./engine/scene-player.js).
