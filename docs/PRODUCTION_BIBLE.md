# Master Design System v2.0 — Expressive Minimalist 2D Stick Explainer

**Status:** APPROVED DESIGN DIRECTION *(exact voice sample for `VOICE-NARRATOR-001` and finished episode reference sheets to be validated during pilot)*

---

## 1. Creative Identity & Depth-First Storytelling
Original Khmer-language (`ភាសាខ្មែរ`) educational 2D stick-figure animations for **YouTube, Facebook, and TikTok** across four core pillars—crafted with **complete narrative and educational depth** (no arbitrary duration cap; episodes run as long as needed to explore the full story, science/mechanisms, and actionable life solutions):
1. **Education & Learning (`ការអប់រំ និងការសិក្សា`)**
2. **Motivation & Personal Growth (`ការលើកទឹកចិត្ត និងការអភិវឌ្ឍខ្លួន`)**
3. **Personal Financial Management (`ការគ្រប់គ្រងហិរញ្ញវត្ថុផ្ទាល់ខ្លួន`)**
4. **Healthy Living (`ការរស់នៅប្រកបដោយសុខភាពល្អ` — Food, Nutrition, Exercise)**

**Anthology Cast Rule:** Create story-specific casts for each episode; never assume permanent protagonists.

---

## 2. Three-Layer Scene Formula
Every shot is composed of three clean, separated layers:
1. **Layer 1 — CHARACTER (`z-index: 15`):** 1–3 expressive stick characters, consistent in face, proportions, outfit, and color treatment across every shot in the episode.
2. **Layer 2 — ENVIRONMENT (`z-index: 5`):** Minimalist flat 2D locations relevant to the story; limited props, subtle architectural linework or clean neutral anchors, and generous negative space.
3. **Layer 3 — EXPLANATION (`z-index: 25`):** Charts, circular icons, money amounts, segmented progress bars, speech bubbles with speaker tags, and visual metaphors—used **only where useful**, never as random clutter.

---

## 3. Character Design & Episode Character Sheet Standard
- **Anatomy:** Rounded circular or gently oval head (`#FFFFFF` fill, `#171717` smooth outline), thin articulated limbs (`stroke-linecap: round`, `stroke-linejoin: round`), simple expressive eyes, eyebrows, and mouth.
- **Differentiation:** Hairstyles (short part, top bun + glasses, curly crop, side ponytail), minimal clothing blocks (minimalist stick or pill/teardrop torso with collar/vest/jacket/apron), and purposeful accessories differentiate characters without breaking the minimalist signature.
- **Episode Character Sheet Requirement:** Before animating an episode, generate an **Episode Character Sheet** displaying:
  - **3 Angles:** `Front (0°)`, `Three-Quarter (3/4)`, and `Side Profile (90°)`
  - **Core Expressions** from the 15-emotion matrix
  - **Key Episode Poses & Props**

---

## 4. Performance System: 15-Emotion Matrix, Speech & Motion

Emotions must be expressed through **coordinated eye, brow, mouth, head tilt, hand gesture, and body posture**—never mouth changes alone:

| # | Emotion ID | Khmer Label | Eyebrows & Eyes | Mouth Shape | Head & Body Posture |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `neutral` | ធម្មតា | Level brows, calm round eyes | Gentle flat/slight arc | Upright, relaxed arms |
| 2 | `happy` | រីករាយ | Soft arched brows, bright eyes | Open or curved smile | Slight upward tilt, open palms |
| 3 | `sad` | ក្រៀមក្រំ | Inner brows angled up, droopy eyes | Downward arc | Head tilted down, drooping shoulders/arms |
| 4 | `worried` | ព្រួយបារម្ភ | Asymmetrical/angled worried brows | Wavy mouth (`~`) | Slight lean back or hand near chest |
| 5 | `surprised` | ភ្ញាក់ផ្អើល | High raised arched brows, wide eyes | Small oval `'o'` mouth | Slight backward jolt, hands raised |
| 6 | `confused` | ងឿងឆ្ងល់ | One brow raised, one lowered | Asymmetric/tilted line | Head tilted (`8°`), scratching head / chin |
| 7 | `thinking` | កំពុងគិត | Focused/slightly furrowed brows, eyes up-right | Small flat/pursed line | Hand on chin, elbow resting on other arm |
| 8 | `excited` | រំភើប | High happy brows, sparkling/wide eyes | Wide open D-laugh | Arms raised in celebration, energetic bounce |
| 9 | `angry` | ខឹង | Sharp inward V-brows, narrowed eyes | Tense downward/gritted arc | Slight forward lean, hands on hips or clenched |
| 10 | `tired` | ហត់នឿយ | Heavy half-lid eyes, flat low brows | Slight sigh/open droop | Slumped spine, head hanging forward |
| 11 | `embarrassed` | អៀន/ខ្មាស | Soft worried brows, rosy cheek dots | Small nervous smile/wavy | Head turned slightly away, hand behind neck |
| 12 | `proud` | មានមោទនភាព | Confident arched brows, warm eyes | Broad confident smile | Chest upright, hands on hips, chin slightly up |
| 13 | `scared` | ភ័យខ្លាច | High steep worried brows, tiny pupils | Trembling wavy oval | Leaning back, hands defensive in front |
| 14 | `calm` | ស្ងប់ចិត្ត | Soft relaxed brows, gentle closed/serene eyes | Serene smile | Balanced posture, slow breathing cadence |
| 15 | `determined` | ប្តេជ្ញាចិត្ត | Firm angled focused brows, locked gaze | Firm confident line/smile | Upright forward stance, purposeful fist/point |

### Motion Vocabulary
- `idle` (subtle breathing + natural blink every `3.2–4.2s`)
- `walk` (walk in/out with coordinated arm/leg swing)
- `turn` (`front` ↔ `three-quarter` ↔ `side`)
- `sit` / `stand` (at desk, dining table, or park bench)
- `point` (at infographic data or prop)
- `hold-prop` / `use-phone-laptop`
- `nod` (affirmation) / `shake-head` (negation)
- `listen` (natural micro-nods and eye focus while another character speaks)

---

## 5. 12 Reusable Minimalist Locations
1. `home` — Warm exterior/entry silhouette with minimal roof & doorframe
2. `bedroom` — Minimal bed silhouette, lamp, wall window, alarm clock
3. `living-room` — Clean sofa silhouette, small plant, framed wall linework
4. `office` — Foreground desk (`#E6E9EF` + `#FFFFFF` top ledge) with dark slate code laptop (`#1E2638`)
5. `classroom` — Whiteboard/chalkboard frame, student desk, book stack
6. `shop` — Architectural locker/cabinet wall linework (`#C5C9CE`), wooden counter (`#8C6239`), safe (`#5D6472`), display shelf & scale
7. `kitchen` — Countertop silhouette, stove/pot icon, refrigerator linework
8. `dining-room` — Minimalist table with healthy plate proportions & chairs
9. `park` — Ground horizon line, minimal flat trees, park bench
10. `street` — Sidewalk line, minimal building silhouettes, crosswalk/sign
11. `gym` — Minimalist exercise mat, dumbbell rack silhouette, hydration station
12. `whiteboard` — Pure `#FFFFFF` / `#F5F5F3` abstract explainer space with maximum negative space

---

## 6. Controlled Semantic Palette
| Token | Hex | Semantic Meaning & Restraint Rule |
| :--- | :--- | :--- |
| **Warm Off-White** | `#F5F5F3` | Primary ambient canvas / soft room wall |
| **Pure White** | `#FFFFFF` | Character head fill, speech bubbles, clean canvas |
| **Charcoal Ink** | `#171717` | Primary outlines, limbs, typography, high-contrast borders |
| **Neutral Gray** | `#E5E7EB` | Desks, environment silhouettes, ground shadows |
| **Semantic Green** | `#2FAA61` | Positive outcomes, savings, loan payout, health, growth |
| **Semantic Coral** | `#FA604E` | Warnings, debt/loss, calendar header, `នៅសល់តិច` alert |
| **Semantic Blue** | `#5D98E8` | Information, study frameworks, neutral logic, wardrobe accents |
| **Semantic Gold** | `#EABF42` | Attention, speaker name tags (`ចរណា`), chapter ribbons, value |

---

## 7. Filmmaker Episode Structure, Scene Transitions, B-Roll & 3-Stem Sound Design
- **5-Part Filmmaker Episode Structure:**
  1. **`INTRO`:** Cold open question + animated Episode Title Card + episode promise.
  2. **`EXAMPLE STORY`:** Relatable Cambodian character drama (`STORY` / `HYBRID`) illustrating the real-life habit and emotional conflict.
  3. **`B-ROLL & MACRO CUTAWAYS`:** Animated 2D cutaway windows (`.broll-cutaway-card`) triggered mid-shot (`data-broll-window="start,end"`) showing macro prop details, organ/brain/bloodstream processes, or compounding math.
  4. **`MAIN EXPLAINER & HOW-TO PROTOCOL`:** Deep scientific/financial breakdown (`EXPLAINER` / `HYBRID`) + step-by-step actionable guide (`3–4` rules).
  5. **`OUTRO`:** Character transformation payoff + 1-sentence golden takeaway + animated Subscribe/Share Call-to-Action card.
- **Cinematic Scene Transitions & Intra-Shot Camera Zoom/Pan ("គិតមើល" Template System):**
  - **Hand-Drawn Wavy Ink-Line Wipe (`wipe`):** Off-white paper sheet (`#F5F5F3`) led by a vertical hand-drawn `#171717` wavy ink line (`.ink-wipe-svg`) sweeps across the stage with a paper-brush whoosh, alongside `iris` and `dissolve` transitions. The black Director Section Ribbon (`#directorSectionBanner`) is **removed from the stage** — never display it on any shot.
  - **Intra-Shot Camera Beats (`shot.cameraBeats`):** Smooth 60fps cubic-interpolated camera zoom-in (`1.0x → 1.15x`), zoom-out, and horizontal/vertical pan (`panX`, `panY`) during a shot.
  - **Signature "គិតមើល" Info-Box Display Components:**
    1. `.km-key-tracker`: Top-left key/icon progress tracker (`🔑1..7` + yellow active chapter pill).
    2. `.km-dot-pill`: Rounded white pill with colored status dot (`.gold`, `.green`, `.coral`, `.blue`).
    3. `.km-clipped-card`: White paper note card with yellow top-left clip (`#F4C430`).
    4. `.km-counter-card`: White card with tinted inner header pill (`.coral`, `.green`, `.gold`, `.blue`) and rolling counter.
    5. `.km-stamp-badge`: Tilted (`-6deg`) rubber stamp slam badge.
    6. `[data-dock-at]`: In-place "Shrink-to-Corner" card miniaturization so completed cards dock compactly instead of disappearing.
    7. `.km-check-row[data-check-at]`: Dim-to-bold progressive checklist rows that light up with a green `✓` at their spoken timestamp.
    8. `.km-dashed-stream`: Curved dashed SVG particle streams (`---🍬/💵-->`) + progressive wavy meniscus fills on hero props.
- **Aspect Ratio & Voice-Dependent Running Subtitle Rule:** Responsive across `16:9` (`1920×1080` YouTube Master), `9:16` (`1080×1920` TikTok/Reels), and `1:1` (`1080×1080` Facebook), with bottom safe zone reserved for 1–2 lines of high-contrast Khmer subtitles (`#3B3B3B` pill).
  - **Voice-Dependent Running Caption (`#stageCaptionText`):** Only visible while voice sound is actively playing (`.voice-active`) and hidden (`opacity: 0`) when voice playback stops. Runs progressively word-by-word (`.cap-token.spoken`, `.cap-token.active-word`, `.cap-token.upcoming`) synchronized with each `captionBeat`. **No linear progress bar** under the caption.
  - **Character Dialog Box Rule (`.ref-speech-bubble` + `data-speak-window="start,end"` + `actor.speakWindows`):** Character speech bubbles are **only visible during the exact time window when that character speaks (`start <= elapsed <= end` while playing)** and automatically hide (`opacity: 0`) when the character stops speaking or playback stops.
- **Camera Framings:**
  - `WIDE` (`1.0x`): Full body + environment context + spacious infographic placement.
  - `MEDIUM` (`1.35x`): Waist/knees up for two-character conversation (`STORY`) or focused `HYBRID` interaction.
  - `CLOSE-UP` (`1.85x`): Chest/shoulders and head for emotional beats (`worried`, `thinking`, `determined`, `surprised`).
- **3-Stem Audio & Unified Signature Voice (`VOICE-NARRATOR-001`):**
  1. **`VOICE-NARRATOR-001` (`0 dB`):** Our **single unique, custom-designed vocal persona** created via Google AI Studio Voice Design (`gemini-3.8-flash-tts`, `type: "prompted"`, `store: true`) and used across **all shots and all episodes** by default (with situational `[STYLE]` cues for character quotes and emotional beats).
  2. **Continuous Background Music Bed (`BGM` at `-18 dB` with Auto-Ducking):** Procedural lo-fi marimba/Rhodes score (or external `audio/bgm.mp3`) shifting across `curious`, `story`, `investigation`, and `uplifting` moods, automatically ducking under active voice-over.
  3. **Location Ambience & Point SFX (`sfxCues`):** Subtle room/night ambience + synchronized `whoosh_paper`, `pop_soft`, `counter_ticks`, `chime_highlight`, and `alert_coral` cues.
  - `VOICE-CAST-01..03`: Episode-specific character voices for **Multi-Cast Mode** (on request; used by EP02: Vichetr, Dr. Sophea, Pou Samnang). One TTS file per line (`audio/voice/shot_XX/line_NN_<speaker>.wav`); the narrator then only sets scenes, examples, hooks and the CTA. Other episodes keep the single `VOICE-NARRATOR-001` unless the director asks.

---

## 8. Canonical Visual Prompt
> Create a flat expressive minimalist 2D stick-figure educational animation with round-headed thin-limbed characters, smooth charcoal outlines, simple hairstyles and clothing, expressive eyebrows and mouths, readable gestures, natural conversational/listening motion. Add a softly colored minimal 2D environment relevant to the lesson. Use clean supporting infographic elements only where they explain the concept. Restrained off-white/charcoal base with purposeful green/coral/blue/gold highlights. Preserve same designs across shots, keep clear visual hierarchy and bottom subtitle-safe space. No photorealism, 3D, busy detail or illegible text.
