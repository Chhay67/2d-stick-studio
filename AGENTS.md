# Khmer 2D Educational Animation Studio — Workspace Agent Rules (Master Design System v2.0)

Always follow these studio rules when researching, scripting, directing, or coding scenes in this workspace:

## 1. Creative Identity, Filmmaker Persona & Topic Pillars
- **Director & Filmmaker Role:** Act as a **Professional 2D Animation Director, Documentary Filmmaker, and Master Scriptwriter**. Every episode must be crafted as a cohesive, high-retention cinematic experience rather than static slides.
- **Format:** Original Khmer-language (`ភាសាខ្មែរ`) 2D educational animated videos for YouTube (`16:9`), Facebook (`16:9` / `1:1`), and TikTok (`9:16`).
- **Mandatory 5-Part Filmmaker Episode Structure + Chapter-to-Chapter Hook & Catch Bridges:**
  1. **`INTRO` (Cold Open, Title Card & Curiosity Hook):** Grab attention in the first `5–15s` with a relatable everyday question, animated Episode Title Card, and clear promise of what the viewer will learn.
  2. **`EXAMPLE STORY` (Relatable Character Drama):** Introduce our episode-specific cast (`1–3` characters) experiencing the real-life Cambodian habit, emotional struggle, or financial/health pain point (`STORY` & `HYBRID` modes).
  3. **`B-ROLL & VISUAL CUTAWAYS` (Dynamic Visual Pacing):** Insert animated 2D B-Roll cutaway windows (`.broll-cutaway-card` — macro close-ups of props, internal organ/brain/bloodstream animations, ticking clocks, wallet/compounding visualizations) every `8–12s` during longer narrations so the screen never stays static.
  4. **`MAIN EXPLAINER & HOW-TO PROTOCOL` (Deep Knowledge, Science & Step-by-Step Guide):** Authoritative `VOICE-NARRATOR-001` educational breakdown explaining *why* the problem happens (scientific/financial mechanism) and *how* to solve it (`3–4` actionable steps).
  5. **`OUTRO` (Transformation Payoff, Golden Takeaway & CTA):** Show the character's positive transformation, lock in a 1-sentence golden rule, and display an animated Subscribe/Share Call-to-Action card.
  - **Chapter-to-Chapter Hook & Catch Rule (`ស្ពានតភ្ជាប់ Hook & Catch`):** Every shot/chapter must open by **catching** the curiosity question from the previous shot (`🧲 [CATCH]`) and close by planting an intriguing **bridge hook** (`🪝 [HOOK]`) that pulls the viewer into the next chapter.
- **Cinematic Scene Transitions, Intra-Shot Camera Zoom/Pan & 3-Stem Sound Design:**
  - **Unified Episode Transition Rule (`EPISODE_TRANSITION = 'wipe'`):** Choose **one** suitable transition for an episode (defaulting to the signature `1.18s` off-white paper `wipe` led by a vertical hand-drawn `#171717` wavy ink line `.ink-wipe-svg`) and reuse that single transition consistently across the **entire episode** (never mix different transitions from shot to shot inside the same episode). Every scene switch (`loadShot`) pairs the transition with a `1.22s` camera entrance ease + transition whoosh/chime SFX, preceded by a `550ms` natural breathing pause at the end of each shot and a `640ms` transition lead-in before the next voice-over starts.
  - **Mutually Exclusive Playback Rule:** Single-shot preview (`▶ Play Shot + Voice`) and full-episode playback (`🎬 Play Full Episode`) must never overlap (`stopCurrentAudioElement` + `voiceLoadRequestId` guard).
  - **Intra-Shot Camera Zoom & Pan (`shot.cameraBeats`):** Every shot supports smooth intra-shot camera zoom-in (`1.0x → 1.15x` on the speaking character or hero prop), zoom-out, and horizontal pan (`panX`, `panY`) interpolated via cubic smoothstep at 60fps in `applyCameraFraming(elapsed, isPlaying)`.
  - **Continuous Ambient World Motion & Walk-In/Jump Acting:** Layer 1 (`ENVIRONMENT`) includes subtle continuous background motion (passing vehicles outside windows/streets, ticking wall clocks) via `renderAmbientBackgroundMotionSVG(locationId)`. Layer 2 (`CHARACTER`) supports smooth walk-in entrance (`walkInProgress` during `0.0s–1.38s`) and `'jump-celebrate'` (jumping upward with golden sparkle stars `✨`).
  - Maintain a **3-Stem Audio Mix**: (1) `VOICE-NARRATOR-001` (`0 dB`), (2) Continuous **Background Music Bed (`BGM`)** with mood shifts (`curious` → `story` → `investigation` → `uplifting`) and **Auto-Ducking** (`-18 dB` under speech), and (3) **Location Ambience & Point SFX** (`whoosh_paper`, `pop_soft`, `counter_ticks`, `chime_highlight`, `alert_coral`).
- **Depth-First & Complete Meaning Rule (No Arbitrary Time Cap):** Never artificially compress or truncate an episode to a fixed duration. Each episode's length, chapter count (`5–7+` chapters), and shot depth are driven organically by what is required to deliver a **complete, deeply meaningful story, thorough scientific/practical research, and step-by-step real-life transformation**. Every shot's spoken Khmer narration should be rich, natural, and fully explanatory (`2–4` complete sentences per shot rather than rushed 1-line fragments).
- **Four Pillars:** (1) Education & Learning, (2) Motivation & Personal Growth, (3) Personal Financial Management, (4) Healthy Living (Food, Nutrition, Exercise).
- **Anthology Cast Rule:** Invent a story-specific cast (`1–3` characters) for each episode. Never reuse a permanent main protagonist across unrelated episodes.
- **No On-Stage Director Section Ribbon & Clean Layout Rule:** Never display the black `#directorSectionBanner` ribbon (e.g. "2. EXAMPLE STORY & 3. B-ROLL CUTAWAY") on any shot. `directorSection` stays as planning metadata only. Also keep characters, speech bubbles, concept cards, and the top-center prop from overlapping at `16:9`; give cards generous padding (`14–18px`) and Khmer `line-height: 1.45+`.

## 2. Dynamic Topic-Aligned Visual Design Rule (Never Clone Previous Episodes!)
- **Dynamic Concept Display & Asset Rule (Zero Episode Cloning):**
  - **Never rigidly copy-paste the concept displays, card layouts, charts, props, or B-Roll items from a previous episode!** EP02 is the reference implementation, but its exercise metaphors, cast and layouts must not be cloned into unrelated episodes.
  - Every new episode (`episodes/epXX-<slug>/scenes.js`) **MUST dynamically invent its own topic-native visual language** across all 3 layers:
    1. **Layer 1 & 2 Topic-Specific Props & Character Actions:** Design new SVG props, stage hero diagrams, and character gestures (`hold-dumbbell`, `hold-water`, `stretch-arms`, `jog-energetic`, rusty spinal chair, body battery charger, leg-muscle sponge, etc.) that physically embody the episode's subject.
    2. **Layer 3 Bespoke Concept Displays (`renderInfographic`):** Design unique, intuitive visual metaphors for each chapter's concept—such as **5-Cell Body Battery Gauges**, **24-Hour Circular Pie/Clock Dials (`2% slice`)**, **Dual-Hemisphere Brain Scans (`Stress vs. Happy Brain`)**, **2-Path Biological/Financial Pipelines**, **Moon & Sleep-Depth Meters**, **Organ Armor Shields + Piggy-Bank Vaults**, **2×2 Illustrated Activity Card Grids**, and **30-Day Transformation Trophy Trackers**.
    3. **Episode-Scoped Dynamic Asset Library (`episode.ASSETS()` & derived `episode.getAssetUsage()`):** Each episode module exports its own custom `ASSETS` (`elements`, `props`, `items`, `characters`, `locations`) so the Left Sidebar Asset Library dynamically updates to showcase the active episode's unique visual building blocks!
- **Shared Engine Timing & Interaction Primitives (Reusable Across Any Custom Concept Display):**
  - Any custom concept display can use the engine's deterministic timing attributes: `data-reveal-at="seconds"` (staged reveal), `data-dock-at="seconds"` (shrink-to-corner miniaturization), `data-fill-at="seconds"` + `data-target-width="%"` (animated bar/meter fill), `.km-check-row[data-check-at="seconds"]` (progressive checklist), `data-broll-window="start,end"` (animated B-Roll cutaway window), and `.ref-speech-bubble[data-speak-window="start,end"]` (character dialog bubble visible **only** while that character is actively speaking).
- **Scene Modes:** `HYBRID` (preferred default), `STORY` (character interaction), `EXPLAINER` (concept/diagram first). Enforce **one learning idea per shot** and vary visual layout across consecutive shots.

## 3. Controlled Semantic Palette
- Canvas: Warm Off-White `#F5F5F3` / Pure White `#FFFFFF`
- Primary Ink: Charcoal `#171717`
- Muted Neutral / Anchors: `#E5E7EB` / Slate `#64748B`
- Semantic Accents (by meaning only, never random): Green `#2FAA61` (positive/savings/health), Coral `#FA604E` (warning/loss/alert), Blue `#5D98E8` (information/logic), Gold `#EABF42` (attention/value/speaker tag).

## 4. Khmer Typography, Dual Script, Voice-Dependent Running Caption & Unified Signature Voice Rule
- Render all on-screen Khmer labels, numbers, and subtitles (`1–2 lines max` in bottom safe zone) as editable DOM/SVG text (`contenteditable="true"`) using `'Kantumruy Pro'` or `'Noto Sans Khmer'` with `line-height: 1.65` so Khmer subscripts (*ជើងអក្សរ*) never clip.
- **Voice-Dependent Running Subtitle Caption Rule (`#stageCaptionText` / `.stage-caption-bar`):**
  - The bottom subtitle bar must **only be visible when voice sound is actively playing (`state.shotPlaying === true`)** and automatically hide (`opacity: 0`) when voice playback is stopped, paused, or finished.
  - While voice sound is playing, the caption must **run progressively with the voice** (highlighting spoken words via `.cap-token.spoken` / `.cap-token.active-word` / `.cap-token.upcoming`; **no linear progress bar under the caption**).
- **Unified Studio Voice-Over Rule (`VOICE-NARRATOR-001`):**
  - We use **one unique, custom-designed vocal persona (`VOICE-NARRATOR-001` — Khmer Studio Storyteller)** created via **Google AI Studio Voice Design (`gemini-3.8-flash-tts`)** across **all shots and all episodes** by default (including narrating character speech bubbles using situational `[STYLE]` emotion cues).
  - Do not switch between multiple TTS voices inside an episode unless the user explicitly asks for multi-speaker cast voices (`VOICE-CAST-01..03`).
  - **Multi-Cast Voice Mode (per episode, on request — used by EP02):** each speaker gets their own voice (`VOICE-CAST-0X`) and the narrator (`VOICE-NARRATOR-001`) only sets scenes, short examples, hooks and the CTA. Author each shot as `shot.lines[]` (one TTS file per line: `audio/voice/shot_XX/line_NN_<speaker>.wav`). Timing, captions, bubbles, reveals, gestures and lip-sync are derived from the real audio durations (`buildShotTimeline`); only the speaking character's mouth moves.
- **Story-Mix Beat Rule (never an all-narrator episode):** every shot mixes ≥ 3 of `STORY` (real scene), `PROBLEM` (character feels the pain), `DIALOGUE` (character ↔ character), `EXAMPLE` (concrete demo/number), `SOLUTION` (copyable action), `HOOK`. Target per shot: narrator ≤ 30% of time, character speech ≥ 45%, concept display ≥ 25%. Character lines show as speech bubbles (caption bar hidden); narrator lines show the running caption bar.
- **Verified-Facts Rule:** health/finance numbers on screen or in voice must come from a cited source (WHO, meta-analyses, official data). No invented percentages or dollar savings; use qualitative wording or label metaphors "ឧទាហរណ៍" (example). Every health episode carries a safety line (start gently; ask a doctor if chest pain, dizziness or chronic illness). Record sources + a claim→verdict table in `01_topic_brief.md`.
- **Dual Khmer Script Requirement:** In every shot script, always provide:
  1. **Visual Khmer Text:** Crisp digits and symbols (`$300`, `70-85%`, `$966`).
  2. **Spoken Khmer TTS Transcript:** All numbers, currencies, and symbols spelled out in full Khmer words (`បីរយដុល្លារ`, `ចិតសិបទៅប៉ែតសិបប្រាំភាគរយ`) for `VOICE-NARRATOR-001`.

## 5. Studio UI Layout, Dynamic Asset Library Workflow & Deterministic MP4 Video Exporter
- **3-Column Streamlined Studio Workspace ([index.html](./index.html), [scene-player.js](./engine/scene-player.js)):**
  1. **Left Sidebar — Dynamic Episode-Aware Visual Asset Library:** Displays the active episode's unique `Elements (Concept Displays)`, `Props`, `Items & B-Roll`, `Cast Characters`, and `Locations` with live visual thumbnails, `📋 Copy ID` buttons, and clickable `"Used in: Shot XX"` badges. Clicking any character card opens a stage turnaround with interactive **15-Emotion & Pose Switcher Pills**.
  2. **Center Column — Responsive Stage & Audio-Driven Timeline:** Supports `16:9` (`1920×1080`), `9:16` (`1080×1920` TikTok), and `1:1` (`1080×1080` Facebook) with the `#stageDimensionsBadge` (`1920 × 1080 (16:9 YouTube Master)`) displayed in the top header next to `MODE: HYBRID`, plus `▶ Play Shot + Voice`, `🎬 Play Full Episode`, and `📥 Export MP4` (no Theatre Capture button).
  3. **Right Sidebar — Active Shot Inspector (3 Cards):** Card 1 (`Active Shot & Used Assets` with clickable asset pills), Card 2 (`Khmer Subtitle Beats` with click-to-jump timeline), and Card 3 (`Voice-Over VOICE-NARRATOR-001` status & spoken TTS prompt).
- **Deterministic 1080p MP4 Video Exporter ([export-video.js](./export-video.js), [server.js](./server.js)):**
  - Uses Headless Chromium (`puppeteer-core`) + [`ScenePlayer.prepareExportShot`](./engine/scene-player.js) / [`ScenePlayer.stepExportFrame`](./engine/scene-player.js) + 48kHz Stereo 3-Stem Audio Synthesizer (real `.wav` PCM RMS lip-sync + `-18 dB` auto-ducked BGM + point & transition SFX) + `ffmpeg-static` (`H.264 yuv420p`, `CRF 18`, `AAC 256kbps`) to render zero-dropped-frame `.mp4` files into `exports/`.

## 6. Production Flow & Approval Gates
Follow the 7-Step SOP in [WORKFLOW_SOP.md](./docs/WORKFLOW_SOP.md):
- **Gate 1 (Step 1):** Create and get user approval on `episodes/epXX-<slug>/01_topic_brief.md` (chapter outline, Hook & Catch bridges, & verified facts) before casting.
- **Gate 2 (Step 2):** Create and get user approval on `episodes/epXX-<slug>/02_character_and_prop_sheet.md` (unique episode cast, custom topic props, and custom concept displays) + plan episode-owned visuals before scripting. Implement custom props in the episode’s `visuals.js` after Gate 3; shared rig changes are reserved for reusable anatomy/acting primitives.
- **Gate 3 (Step 3):** Write and get user approval on `episodes/epXX-<slug>/03_shot_script.md` before generating voice prompts or coding scenes.
- **Step 4 (Voice & SFX):** Generate `episodes/epXX-<slug>/04_ai_studio_voice_prompts.md` using the `ai-studio-voice-sfx` skill. User drops recorded `.wav`/`.mp3` files into `episodes/epXX-<slug>/audio/voice/shot_XX.wav`.
- **Step 5–7 (HTML/JS Scene Build, QA & MP4 Export):** Use the `stick-scene-builder` skill to build the episode's custom props, custom concept displays, and `EPXX.ASSETS` catalog in `episodes/epXX-<slug>/scenes.js` and [scene-player.js](./engine/scene-player.js), preview at `http://localhost:8080`, and export `1080p` `.mp4` videos.

## 7. New Conversation Kickoff & Reproduction Protocol
When a new conversation starts in this workspace:
1. **Activate Relevant Workspace Skills:** Read [khmer-episode-director](./.agents/skills/khmer-episode-director/SKILL.md), [ai-studio-voice-sfx](./.agents/skills/ai-studio-voice-sfx/SKILL.md), or [stick-scene-builder](./.agents/skills/stick-scene-builder/SKILL.md) depending on the current step.
2. **Check Existing Episode State:** Inspect `episodes/` to see which episode and step (`01_topic_brief.md` .. `scenes.js`) are already completed or in progress, and resume from the current gate without repeating approved steps.
3. **Preserve Calibrated Engine Defaults:** Keep `--stroke-width: 3.5px`, `--head-radius: 34px`, `torsoLength: 82px`, `limbLength: 96px` (`1:3.6` ratio), `blinkInterval: 3.2s`, `mouthCadence: 8.5Hz`, and `--khmer-lh: 1.65` in [styles.css](./engine/styles.css) and [scene-player.js](./engine/scene-player.js).


## 8. Episode package architecture (current implementation)

- EP02 Daily Exercise is the only installed episode. EP01 and the pilot are removed; never restore their runtime branches or defaults.
- Read [EPISODE_ARCHITECTURE.md](./docs/EPISODE_ARCHITECTURE.md) before adding or refactoring episodes. It defines the current module contract and explicitly lists unfinished migration work.
- Use `npm run episode:new -- epXX-topic-slug` for empty planning documents. Preserve the three approval gates; record evidence in `production.json`, never infer approval from files or implementation.
- Register built episodes through `engine/episode-registry.js` using episode-owned `episode.js`, `scenes.js` and `visuals.js`; add their script tags before the player in `index.html`. Selectors populate from the registry. Do not add new episode-ID branches in the engine/exporter.
- Keep custom props and sheets in episode visual modules. Both preview and export call the same manifest rendering hooks. Some existing EP02 layout/gesture specializations remain migration debt.
- Declare explicit `shot.assets`; derive usage badges from these plus actual actors and locations. Never maintain parallel usage maps.
- `engine/timeline.js` owns line start/gap/tail calculation for browser and exporter. Do not duplicate scheduling constants. Bind concepts and bubbles to line numbers.
- Run `npm test`, `npm run validate`, and `npm run qa:layout -- --serve`. Review screenshots and distinguish structural checks, layout checks, actual audio playback and MP4 export verification. `--final` validation fails on missing recordings.
- Editable stage text does not persist. Generated review documents/prompts, production UI, automatic approval invalidation and full actor-render unification are future work; do not claim they exist.

## 9. Speaker identity in dialogue bubbles

- **All-shot, all-format rule:** Every episode's on-stage character dialogue box must sit close above its actual speaker in YouTube 16:9, Facebook 1:1 and TikTok 9:16. This is the default for new episodes, not a Shot 02 exception. Keep the tail aimed toward the speaker as the camera moves; avoid covering any character's face. Do not use a fixed top dialogue row as a substitute.

- EP02 character dialogue must visibly identify the line's speaker: matching cast portrait, editable Khmer name tag and dialogue text. Derive identity from `line.actorId`, `line.speaker` and `line.speakerLabel`; never assume the first actor is speaking.
- On-stage speakers have a speech tail positioned toward their actor. Off-stage speakers retain their portrait and name, show `ក្រៅឆាក`, and have no tail; phone-labelled dialogue shows `☎` and the phone label instead.
- Preserve line-bound timing (`data-speak-line`), narrator captions and speaking-actor lip-sync. Portraits are static identity thumbnails, not additional lip-sync actors.
- Keep dialogue sizing stable during speech: cache text fitting per box/format/font readiness rather than resizing text on every camera frame. Use opacity-only bubble fades, and preserve enough camera-coordinate precision to avoid visible stepping. Run `npm run qa:layout -- --serve --jitter` after changing anchoring or fitting.
- Design TikTok info panels around their content: clear heading/body hierarchy, aligned badges, balanced comparison columns, consistent inner padding and unclipped Khmer text. TikTok info panels use the user-requested 10% left and right margins (80% displayed stage width); keep vertical placement and internal design content-led. Preserve bespoke diagrams and speaker anchoring.
- Implementation belongs in episode `scenes.js` (`renderDialogueBubbles`) and episode `styles.css`, linked in `index.html`. Keep Khmer dialogue line-height at 1.65 and account for portrait width when fitting text.
- When generic mobile fitting crowds speakers, use the episode manifest's `layoutInfographic` hook. Keep concepts separate from character dialogue, and anchor speech boxes close above their actual speakers using the episode’s `anchorDialogue` hook after camera framing. All eight EP02 production shots use this in 16:9, 1:1 and 9:16; account for seated poses and off-screen speakers, and do not replace speaker anchoring with a fixed top dialogue row. Check name tags as well as bubble rectangles for collisions.
- Review on-stage, off-stage and phone dialogue across 16:9, 9:16 and 1:1. The layout audit checks overlay rectangles, not precise tail-to-actor alignment, so inspect screenshots too. Missing voice recordings still prevent real-audio synchronization sign-off.
