# Khmer 2D Educational Animation Studio (`content-ai-studio`)

An end-to-end production studio for creating original, deeply researched **Khmer-language (`ភាសាខ្មែរ`) 2D educational stick-figure animations** (with complete, story-driven depth and no arbitrary time cap) for **YouTube (`16:9`)**, **Facebook (`16:9` / `1:1`)**, and **TikTok (`9:16`)**, powered by **Gemini (Director & Writer)**, **Google AI Studio (`VOICE-NARRATOR-001` Voice Design & SFX)**, and **Antigravity (HTML/CSS/JS 2D Animation Engine + Deterministic 1080p MP4 Exporter)**.

---

## 1. Quick Start, Live Studio Preview & 1080p MP4 Export

### Start the Local Studio Server
```powershell
node server.js
```
Then open **http://localhost:8080** in your browser to launch [index.html](./index.html) (**Unified Master Studio v2.0**), where you can:
- **Browse All `54` Visual Assets (Left Panel):** Vertically scroll and search across `16 Elements`, `8 Props`, `12 Items & B-Roll`, `6 Cast Characters`, and `12 Locations`. Click **`📋 Copy ID`** on any card to copy its asset ID (`prop:iced-coffee-cup`, `elem:km_counter_card`, `char:dara`, etc.) to guide updates directly, or click any **`Shot XX`** badge to jump to that shot.
- **Inspect Characters with 15 Emotions & Poses:** Click any character card in the Left Panel to open their 3-angle stage turnaround (`Front`, `3/4`, `Side`) with interactive **15-Emotion & Pose Switcher Pills**.
- **Active Shot Inspector (Right Panel — 3 Cards):**
  1. **Card 1 (`Active Shot & Used Assets`):** Displays camera framing, transition type, location, duration, and clickable asset pills used in the current shot.
  2. **Card 2 (`Khmer Subtitle Beats`):** Click any timed Khmer subtitle beat (`0.0s`, `6.8s`, etc.) to scrub and preview that exact moment on stage.
  3. **Card 3 (`Voice-Over VOICE-NARRATOR-001`):** Shows audio file status (`shot_01.wav`) and the full spoken Khmer TTS transcript.
- **1-Click Deterministic 1080p MP4 Export (`📥 Export MP4`):** Click **`📥 Export MP4`** in the Top Header, Bottom Timeline Bar, or Theatre HUD (or run `node export-video.js` in terminal) to render zero-dropped-frame H.264 `.mp4` videos (`1920×1080`, `1080×1920`, or `1080×1080` at `30fps` or `60fps`) with a 3-stem master audio mix (`VOICE-NARRATOR-001` + `-18 dB` auto-ducked BGM + point & transition SFX).

### Export MP4 via CLI (`export-video.js`)
```powershell
# Export a single shot for quick QA (e.g. Shot 1 of Episode 1 in 16:9 at 30fps)
node export-video.js --deck ep01 --shot 1 --aspect 16:9 --fps 30

# Export Full Episode 1 in 16:9 (1920x1080) at 60fps
node export-video.js --deck ep01 --aspect 16:9 --fps 60

# Export TikTok / Reels 9:16 vertical version (1080x1920)
node export-video.js --deck ep01 --aspect 9:16 --fps 30
```

---

## 2. Project Directory & Asset Structure

```text
2d-stick-studio/
├── README.md                                  # Master studio guide & quick-start manual (this file)
├── AGENTS.md                                  # Always-on Antigravity Workspace Rules (auto-loaded in every chat)
├── package.json                               # Dependencies (puppeteer-core, ffmpeg-static) & export scripts
├── index.html                                 # Streamlined 3-Column Studio UI & Visual Asset Inspector
├── server.js                                  # Local studio server + /api/export MP4 render endpoints
├── export-video.js                            # Deterministic Headless Chrome + 3-Stem Audio + FFmpeg MP4 exporter
├── exports/                                   # Rendered 1080p H.264 .mp4 output files
│
├── .agents/skills/                            # Auto-Discovered Workspace Agent Skills
│   ├── khmer-episode-director/SKILL.md        # Skill 1: Research, 5-part filmmaker arc, cast & shot-by-shot script
│   ├── ai-studio-voice-sfx/SKILL.md           # Skill 2: Google AI Studio TTS prompts & Khmer phonetic numbers
│   └── stick-scene-builder/SKILL.md           # Skill 3: 3-layer HTML/CSS/SVG scene, asset catalog & frame-stepper
│
├── assets/                                    # Shared Studio Asset Catalogs & Libraries
│   ├── audio/sfx/sfx_catalog.json             # Global reusable SFX (Whoosh, Counter Ticks, Chime, Pop, Alert)
│   ├── props/props_catalog.json               # #171717-outlined props (Iced coffee cup, Laptop desk, Counter, Scale)
│   ├── elements/elements_catalog.json         # Floating "គិតមើល" info-boxes (Key tracker, Clipped card, Counter card)
│   └── locations/locations_catalog.json       # 12 reusable minimalist 2D locations
│
├── engine/                                    # Core 2D Stick-Figure, Timeline & Frame-Stepper Engine
│   ├── character-rig.js                       # Parametric rig, 15 emotions, 3 angles, character sheet, 12 locations
│   ├── scene-player.js                        # 60fps sequencer, 54-asset catalog, shot inspector & deterministic stepper
│   └── styles.css                             # Semantic palette, "គិតមើល" cards, wavy ink wipe & export-render-mode
│
├── episodes/                                  # Per-Episode Production Workspaces
│   ├── ep01-iced-coffee/                      # Episode 01 (Complete 8-Shot Production: Sweet Iced Coffee)
│   │   ├── 01_topic_brief.md                  # (Step 1) Deep topic research & chapter outline
│   │   ├── 02_character_and_prop_sheet.md     # (Step 2) Cast (Dara, Nary, Bong Sok) & hero props
│   │   ├── 03_shot_script.md                  # (Step 3) Master shot-by-shot visual & dual Khmer script
│   │   ├── 04_ai_studio_voice_prompts.md      # (Step 4) Copy-paste voice prompts for Google AI Studio
│   │   ├── 05_step7_export_and_publish_pack.md# (Step 7) MP4 export commands & YouTube/FB/TikTok metadata
│   │   ├── audio/voice/                       # Recorded shot_01.wav .. shot_08.wav files
│   │   └── scenes.js                          # (Step 5) Playable 8-shot episode definitions & infographics
│   └── ep01-pilot/                            # Reference Financial Pilot ($300 Salary & $966 Pawn Scale)
│
├── docs/                                      # Detailed Studio Manuals & SOPs
│   ├── PRODUCTION_BIBLE.md                    # Master Design System v2.0 specification
│   ├── WORKFLOW_SOP.md                        # 7-Step Production Flow & Approval Gates
│   └── GOOGLE_AI_STUDIO_VOICE_MANUAL.md       # Step-by-step Google AI Studio voice & SFX guide
│
└── templates/
    └── episode_brief_template.md              # Standard markdown template for new episodes
```

---

## 3. Master Design System v2.0 — Core Rules Summary

### 3.1 The Four Topic Pillars
1. **Education & Learning (`ការអប់រំ និងការសិក្សា`):** Study techniques, spaced repetition, memory, critical thinking, skill building.
2. **Motivation & Personal Growth (`ការលើកទឹកចិត្ត និងការអភិវឌ្ឍខ្លួន`):** Habits, discipline, mindset, overcoming procrastination, time management.
3. **Personal Financial Management (`ការគ្រប់គ្រងហិរញ្ញវត្ថុផ្ទាល់ខ្លួន`):** Budgeting (`$300` salary), saving (`50/30/20`), debt/pawn awareness (`70-85%` LTV), smart spending.
4. **Healthy Living (`ការរស់នៅប្រកបដោយសុខភាពល្អ`):** Food, nutrition, hydration, sleep, daily 30-minute exercise.

### 3.2 Three-Layer Scene Formula & Scene Modes
Every shot is built from three clean layers and communicates **one learning idea per shot**:
1. **Layer 1 — `ENVIRONMENT` (`z-index: 5`):** Minimalist flat 2D location (from the 12 reusable locations in [locations_catalog.json](./assets/locations/locations_catalog.json)) + continuous ambient world motion + `#171717`-outlined foreground props ([props_catalog.json](./assets/props/props_catalog.json)).
2. **Layer 2 — `CHARACTER` (`z-index: 15`):** `1–3` episode-specific stick-figure characters (no permanent main protagonist across episodes). Uses calibrated defaults (`3.5px` `#171717` stroke, `34px` head radius, `82px` torso, `96px` limbs = `1:3.6` ratio) and the **15-Emotion Matrix** (`neutral`, `happy`, `sad`, `worried`, `surprised`, `confused`, `thinking`, `excited`, `angry`, `tired`, `embarrassed`, `proud`, `scared`, `calm`, `determined`).
3. **Layer 3 — `EXPLANATION` (`z-index: 25`):** **Floating "គិតមើល" in-world infographics** (`.km-key-tracker`, `.km-dot-pill`, `.km-clipped-card`, `.km-counter-card`, `.km-stamp-badge`, `[data-dock-at]` shrink-to-corner cards, `.km-check-row[data-check-at]` progressive checklists, `.broll-cutaway-card` B-roll windows, and `.ref-speech-bubble` gated character speech bubbles from [elements_catalog.json](./assets/elements/elements_catalog.json)).
- **Scene Modes:** `HYBRID` (preferred default: character + in-world infographic), `STORY` (character interaction/emotion first), `EXPLAINER` (graph/concept first).

### 3.3 Controlled Semantic Palette
| Role | Color Name | Hex | Meaning / Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | Warm Off-White / White | `#F5F5F3` / `#FFFFFF` | Clean negative-space background & head fill |
| **Primary Ink** | Charcoal | `#171717` | Character outlines, limbs, prop borders, primary text |
| **Muted Neutral** | Neutral Gray / Slate | `#E5E7EB` / `#64748B` | Desks, architectural wall lines, essential expense bars |
| **Positive** | Semantic Green | `#2FAA61` | Savings, loan payout, healthy habits, positive outcomes |
| **Warning** | Semantic Coral | `#FA604E` | Debt/sugar/loss alerts, `នៅសល់តិច` pill, calendar header, diagonal hatch |
| **Information** | Semantic Blue | `#5D98E8` | Educational frameworks, neutral logic, wardrobe accents |
| **Attention** | Semantic Gold | `#EABF42` | Speaker name tags (`ចរណា`, `តារា`), chapter ribbons, gold value |

### 3.4 Khmer Typography, Dual Script & Unified Signature Voice Rule
- **Fonts & Subscript Clearance:** Uses `'Kantumruy Pro'` or `'Noto Sans Khmer'` with `--khmer-lh: 1.65` so Khmer stacked subscripts (*ជើងអក្សរ*) never clip.
- **Voice-Dependent Running Subtitle Bar (`#stageCaptionText`):** Visible **only while voice audio is actively playing** and highlights words progressively across each `captionBeat`.
- **Unified Studio Voice-Over (`VOICE-NARRATOR-001`):** We design **one unique vocal persona (`VOICE-NARRATOR-001` — Khmer 2D Studio Narrator)** in **Google AI Studio Voice Design (`gemini-3.8-flash-tts`)** and use it across **all shots and all episodes** by default.
- **Dual Khmer Script Rule:** Every shot in `03_shot_script.md` provides two text columns:
  1. **Visual Khmer Overlay & Subtitle:** Crisp digits and symbols (`$300`, `70-85%`, `$966`) inside editable DOM nodes (`contenteditable="true"`).
  2. **Spoken Khmer TTS Transcript:** All numbers and symbols spelled out in full Khmer words (`បីរយដុល្លារ`, `ចិតសិបទៅប៉ែតសិបប្រាំភាគរយ`) so `VOICE-NARRATOR-001` pronounces every number naturally in Khmer.

---

## 4. The 7-Step Episode Production Workflow

See [docs/WORKFLOW_SOP.md](./docs/WORKFLOW_SOP.md) for the full SOP:

| Step | Deliverable File | Approval Gate & Working Rule |
| :--- | :--- | :--- |
| **Step 1: Topic Brief & Research** | `episodes/epXX/01_topic_brief.md` | **Gate 1:** Approve the chapter outline and verified numbers before casting. |
| **Step 2: Cast & Prop Sheet** | `episodes/epXX/02_character_and_prop_sheet.md` | **Gate 2:** Approve the 1–3 episode characters (`Front`, `3/4`, `Side` turnaround), locations, and hero props so designs never drift. |
| **Step 3: Shot-by-Shot Script** | `episodes/epXX/03_shot_script.md` | **Gate 3:** Write and approve in **Chapter Batches (`8–12` shots per batch)** with 1 learning idea per shot and dual Khmer script columns. |
| **Step 4: Voice & SFX Prompts** | `episodes/epXX/04_ai_studio_voice_prompts.md` | **Gate 4:** Copy-paste prompts into Google AI Studio and drop recorded `.wav`/`.mp3` files into `episodes/epXX/audio/voice/shot_XX.wav`. |
| **Step 5: HTML/JS Scene Build** | `episodes/epXX/scenes.js` | **Gate 5:** Build playable HTML/CSS/SVG scenes synced to the voice tracks and register any new assets in the Left Sidebar catalog. |
| **Step 6: Director Visual QA** | Live check at `http://localhost:8080` | Inspect assets via the Left Sidebar (`📋 Copy ID`), verify subtitle beats in the Right Sidebar, and check emotions/lip-sync. |
| **Step 7: Deterministic MP4 Export** | `exports/epXX_full_16x9_60fps.mp4` | Click **`📥 Export MP4`** in the UI (or run `node export-video.js`) to render broadcast-ready `16:9`, `9:16`, and `1:1` H.264 `.mp4` videos. |
