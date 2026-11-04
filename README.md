# Khmer 2D Educational Animation Studio (`content-ai-studio`)

An end-to-end production studio for creating original, deeply researched **Khmer-language (`ភាសាខ្មែរ`) 2D educational stick-figure animations** (with complete, story-driven depth and no arbitrary time cap) for **YouTube (`16:9`)**, **Facebook (`16:9` / `1:1`)**, and **TikTok (`9:16`)**, powered by **Gemini (Director & Writer)**, **Google AI Studio (`VOICE-NARRATOR-001` Voice Design & SFX)**, and **Antigravity (HTML/CSS/JS 2D Animation Engine)**.

---

## 1. Quick Start & Live Studio Preview

### Start the Local Studio Server
```powershell
node server.js
```
Then open **http://localhost:8080** in your browser to launch [index.html](./index.html) (**Unified Master Studio v2.0**), where you can:
- Preview the **4 Reference Shots** (`ហេង $300 Salary` & `ហាងបញ្ចាំ $966 Gold Scale`) and the **Episode Character Sheet (`v2.0`)**.
- Test the **15-Emotion Matrix**, **13 Motions/Poses**, **3 Turnaround Angles** (`Front`, `3/4`, `Side`), **3 Camera Framings** (`Wide`, `Medium`, `Close-Up`), and **12 Reusable Locations**.
- Scrub the **8-Second Interactive Shot Timeline** and audition built-in WebAudio SFX (`Whoosh`, `Counter Ticks`, `Chime`).
- Upload any `.wav` or `.mp3` voice track generated in Google AI Studio to test **60fps Real-Time WebAudio RMS Lip-Sync**.
- Switch between **`16:9` (YouTube)**, **`9:16` (TikTok with UI Dead-Zone Overlay)**, and **`1:1` (Facebook)**, or toggle **Clean Plate Mode** for post-production editing.

---

## 2. Project Directory & Asset Structure

```text
content-ai-studio/
├── README.md                                  # Master studio guide & quick-start manual (this file)
├── AGENTS.md                                  # Always-on Antigravity Workspace Rules (auto-loaded in every chat)
├── index.html                                 # Unified Master Studio & Visual Calibration Player
├── server.js                                  # Zero-dependency Node.js preview server (http://localhost:8080)
│
├── .agents/skills/                            # Auto-Discovered Workspace Agent Skills
│   ├── khmer-episode-director/SKILL.md        # Skill 1: Research, 5-chapter arc, cast & shot-by-shot script
│   ├── ai-studio-voice-sfx/SKILL.md           # Skill 2: Google AI Studio TTS prompts & Khmer phonetic numbers
│   └── stick-scene-builder/SKILL.md           # Skill 3: 3-layer HTML/CSS/SVG scene, prop & infographic builder
│
├── assets/                                    # Shared Studio Asset Catalogs & Libraries
│   ├── audio/sfx/sfx_catalog.json             # Global reusable SFX (Whoosh, Counter Ticks, Chime, Pop, Alert)
│   ├── props/props_catalog.json               # #171717-outlined props (Laptop desk, Counter, Gold scale, Safe)
│   ├── elements/elements_catalog.json         # Floating in-world graphics (Calendar, Envelope, Bars, Bubbles)
│   └── locations/locations_catalog.json       # 12 reusable minimalist 2D locations
│
├── engine/                                    # Core 2D Stick-Figure & Timeline Engine
│   ├── character-rig.js                       # Parametric rig, 15 emotions, 3 angles, character sheet, 12 locations
│   ├── scene-player.js                        # 8s timeline sequencer, WebAudio RMS lip-sync, token exporter
│   └── styles.css                             # Controlled semantic palette, safe zones, Khmer subscript styling
│
├── episodes/                                  # Per-Episode Production Workspaces
│   └── ep01-pilot/                            # Episode 01 folder
│       ├── README.md                          # Deliverable checklist
│       ├── 01_topic_brief.md                  # (Step 1) Topic research & 5-chapter outline
│       ├── 02_character_and_prop_sheet.md     # (Step 2) Episode cast, turnaround angles & hero props
│       ├── 03_shot_script.md                  # (Step 3) Shot-by-shot visual & dual Khmer script
│       ├── 04_ai_studio_voice_prompts.md      # (Step 4) Copy-paste voice prompts for Google AI Studio
│       ├── audio/voice/                       # Drop generated shot_01.wav, shot_02.wav here
│       └── scenes.js                          # (Step 5) Playable episode shot definitions
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
1. **Layer 1 — `ENVIRONMENT` (`z-index: 5`):** Minimalist flat 2D location (from the 12 reusable locations in [locations_catalog.json](./assets/locations/locations_catalog.json)) + `#171717`-outlined foreground props ([props_catalog.json](./assets/props/props_catalog.json)).
2. **Layer 2 — `CHARACTER` (`z-index: 15`):** `1–3` episode-specific stick-figure characters (no permanent main protagonist across episodes). Uses calibrated defaults (`3.5px` `#171717` stroke, `34px` head radius, `82px` torso, `96px` limbs = `1:3.6` ratio) and the **15-Emotion Matrix** (`neutral`, `happy`, `sad`, `worried`, `surprised`, `confused`, `thinking`, `excited`, `angry`, `tired`, `embarrassed`, `proud`, `scared`, `calm`, `determined`).
3. **Layer 3 — `EXPLANATION` (`z-index: 25`):** **Floating in-world infographics** (calendar icon, mint salary envelope, segmented horizontal bars, circular expense icons, coral alert pills, speech bubbles with yellow speaker tags from [elements_catalog.json](./assets/elements/elements_catalog.json)).
- **Scene Modes:** `HYBRID` (preferred default: character + in-world infographic), `STORY` (character interaction/emotion first), `EXPLAINER` (graph/concept first).

### 3.3 Controlled Semantic Palette
| Role | Color Name | Hex | Meaning / Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | Warm Off-White / White | `#F5F5F3` / `#FFFFFF` | Clean negative-space background & head fill |
| **Primary Ink** | Charcoal | `#171717` | Character outlines, limbs, prop borders, primary text |
| **Muted Neutral** | Neutral Gray / Slate | `#E5E7EB` / `#64748B` | Desks, architectural wall lines, essential expense bars |
| **Positive** | Semantic Green | `#2FAA61` | Savings, loan payout, healthy habits, positive outcomes |
| **Warning** | Semantic Coral | `#FA604E` | Debt/loss alerts, `នៅសល់តិច` pill, calendar header, diagonal hatch |
| **Information** | Semantic Blue | `#5D98E8` | Educational frameworks, neutral logic, wardrobe accents |
| **Attention** | Semantic Gold | `#EABF42` | Speaker name tags (`ចរណា`, `គន្ធា`), chapter ribbons, gold value |

### 3.4 Khmer Typography, Dual Script & Unified Signature Voice Rule
- **Fonts & Subscript Clearance:** Uses `'Kantumruy Pro'` or `'Noto Sans Khmer'` with `--khmer-lh: 1.65` so Khmer stacked subscripts (*ជើងអក្សរ*) never clip.
- **Unified Studio Voice-Over (`VOICE-NARRATOR-001`):** We design **one unique vocal persona (`VOICE-NARRATOR-001` — Khmer 2D Studio Narrator)** in **Google AI Studio Voice Design (`gemini-3.8-flash-tts`)** and use it across **all shots and all episodes** by default (steering emotion per shot via `[STYLE]` tags; `VOICE-CAST-01..03` are optional only if multi-speaker mode is requested).
- **Dual Khmer Script Rule:** Every shot in `03_shot_script.md` provides two text columns:
  1. **Visual Khmer Overlay & Subtitle:** Crisp digits and symbols (`$300`, `70-85%`, `$966`) inside editable DOM nodes (`contenteditable="true"`).
  2. **Spoken Khmer TTS Transcript:** All numbers and symbols spelled out in full Khmer words (`បីរយដុល្លារ`, `ចិតសិបទៅប៉ែតសិបប្រាំភាគរយ`, `ប្រាំបួនរយហុកសិបប្រាំមួយដុល្លារ`) so `VOICE-NARRATOR-001` pronounces every number naturally in Khmer.

---

## 4. The 7-Step Episode Production Workflow

See [docs/WORKFLOW_SOP.md](./docs/WORKFLOW_SOP.md) for the full SOP:

| Step | Deliverable File | Approval Gate & Working Rule |
| :--- | :--- | :--- |
| **Step 1: Topic Brief & Research** | `episodes/epXX/01_topic_brief.md` | **Gate 1:** Approve the 5-chapter outline (Hook → Trap → Concept → Case Study → 3-Step Summary) and verified numbers before casting. |
| **Step 2: Cast & Prop Sheet** | `episodes/epXX/02_character_and_prop_sheet.md` | **Gate 2:** Approve the 1–3 episode characters (`Front`, `3/4`, `Side` turnaround), locations, and hero props so designs never drift. |
| **Step 3: Shot-by-Shot Script** | `episodes/epXX/03_shot_script.md` | **Gate 3:** Write and approve in **Chapter Batches (`8–12` shots per batch)** with 1 learning idea per shot and dual Khmer script columns. |
| **Step 4: Voice & SFX Prompts** | `episodes/epXX/04_ai_studio_voice_prompts.md` | **Gate 4:** Copy-paste prompts into Google AI Studio and drop recorded `.wav`/`.mp3` files into `episodes/epXX/audio/voice/shot_XX.wav`. |
| **Step 5: HTML/JS Scene Build** | `episodes/epXX/scenes.js` | **Gate 5:** Build playable HTML/CSS/SVG scenes in Chapter Batches synced to the voice tracks and WebAudio SFX triggers. |
| **Step 6: Director Visual QA** | Live check at `http://localhost:8080` | Verify coordinated emotion, Khmer subscript clearance, `10%` title-safe margins, and varied `HYBRID` layouts. |
| **Step 7: Multi-Platform Export** | Final `16:9` / `9:16` / `1:1` video capture | Capture with live HTML Khmer overlays or use the **Clean Plate Toggle** for final titling in CapCut / Premiere / DaVinci. |

---

## 5. How to Start or Resume in Any New Conversation

Because [AGENTS.md](./AGENTS.md) and `.agents/skills/` are automatically loaded by Antigravity at the start of every chat in this repository, you never need to re-explain the rules. Simply paste one of these short prompts in a new conversation:

### To Start a New Episode (Step 1 / Gate 1)
```text
Start Episode 01 in episodes/ep01-pilot/ on Topic Pillar 3 (Personal Finance): "Why a $300 monthly salary disappears by Day 30 and the 3-bucket system to fix it." Follow Step 1 (01_topic_brief.md) and stop at Gate 1 for my review.
```

### To Move to the Next Gate (Step 2, Step 3, or Step 4)
```text
Gate 1 is approved for episodes/ep01-pilot/. Proceed to Step 2: create 02_character_and_prop_sheet.md and update the Episode Character Sheet in the studio player.
```

```text
Gate 2 is approved for episodes/ep01-pilot/. Proceed to Step 3: write Chapter 1 (Shots 01–10) in 03_shot_script.md and 04_ai_studio_voice_prompts.md.
```

### To Build Playable HTML/JS Scenes (Step 5)
```text
Chapter 1 script is approved (and voice files are in episodes/ep01-pilot/audio/voice/). Build the playable Chapter 1 scenes using stick-scene-builder and start the preview server.
```
