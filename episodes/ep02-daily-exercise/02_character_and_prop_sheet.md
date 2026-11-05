# Gate 2: Character & Prop Sheet — Episode 02 (`ep02-daily-exercise`)

## 1. Episode Anthology Cast (`1–3` Characters — Unique Episode Cast) — **Multi-Cast Voice Mode (v2)**

> v2 update: each speaker has their **own voice** (`VOICE-CAST-01..03`) plus `VOICE-NARRATOR-001` for narration. Display numbers use only verified figures (see `01_topic_brief.md` §2). Metaphor gauges (battery, sponge) are labelled "ឧទាហរណ៍".

| Voice ID | Speaker | Base voice | Voice design |
| :--- | :--- | :--- | :--- |
| `VOICE-NARRATOR-001` | Narrator | existing | Warm Khmer studio storyteller (STORY / EXAMPLE / hooks / golden rule) |
| `VOICE-CAST-01` | វិចិត្រ Vichetr | `Puck` | Young male; tired & nasal in Ch1–3 → bright & energetic in Ch4–7 |
| `VOICE-CAST-02` | គ្រូពេទ្យ សុភា Dr. Sophea | `Aoede` | Calm, kind, confident adult female; phone-call lines get a light phone-EQ note |
| `VOICE-CAST-03` | ពូសំណាង Pou Samnang | `Charon` | Warm deeper older male, cheerful, slightly raspy |

| Character ID | Khmer Name | Role & Persona | Rig Style | Hair & Accessories | Outfit & Palette | Signature Gestures | Voice Assignment |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`char_vichetr`** | **វិចិត្រ** (Vichetr) | **Protagonist (29yo Office Worker -> Runner):** Starts sitting 8 hours/day with a sore back, rusty joints, and `20%` body battery; transforms into an energetic `95%` daily walker/runner. | `minimal` (`3.5px` `#171717` stroke, flat foot ticks) | `short-spiky` | Minimal stick rig + black name tag (`វិចិត្រ`) | `stretch-arms`, `hold-dumbbell`, `jog-energetic`, `jump-celebrate` | `VOICE-NARRATOR-001` (with `[Tired]` / `[Excited]` style cues) |
| **`char_sophea`** | **គ្រូពេទ្យ សុភា** (Dr. Sophea) | **Preventive Health & Exercise Doctor:** Warm, encouraging medical guide who explains the `2%` daily rule, brain oxygen boost, and the "muscle sponge" metaphor in simple language. | `outfitted` pill torso | `top-bun-glasses` | `teal-health` (`#2FAA61` health blazer over white top) | `hold-water`, `explain`, `point-right`, `open-welcome` | `VOICE-NARRATOR-001` (with `[Warm, encouraging]` style cues) |
| **`char_samnang`** | **ពូសំណាង** (Pou Samnang) | **58-Year-Old Park Runner (Role Model):** Active older adult in the park whose `95%` energy inspires Vichetr in Chapter 1. | `outfitted` pill torso | `curly-clerk` | `blue-orange-bag` (`#5D98E8` sporty blue top) | `jog-energetic`, `celebrate` | `VOICE-NARRATOR-001` |

---

## 2. 3-Angle Turnaround Calibration (`Front 0°` • `3/4 View` • `Side 90°`)
- **Head Radius:** `34px` (`--head-radius: 34px`)
- **Torso Length:** `82px` (`torsoLength: 82px`)
- **Limb Length:** `96px` (`limbLength: 96px` -> `1:3.6` head-to-body ratio)
- **Stroke Width:** `3.5px` charcoal ink `#171717`
- **Implemented in:** [`visuals.js`](./visuals.js) (episode hero props and cast sheet) and [`scenes.js`](./scenes.js) (cast definitions and catalog), wired by [`episode.js`](./episode.js).

---

## 3. Topic-Unique Props, Gestures, B-Roll Icons & 8 Custom Concept Displays (Zero Episode Cloning)

### A. Layer 1 & Layer 2 Topic-Specific Props & Gestures
- **`prop:ep02_rusty_spinal_chair` (`renderRustySpinalChairPropSVG`):** Rolling ergonomic office chair with glowing coral back/neck pain lightning bolts (`⚡ ឈឺចង្កេះ`) and a rusty motorbike gear (`⚙️ ច្រេះចាប់`) in Shot 01.
- **`prop:ep02_body_battery_charger` (`renderBodyBatteryChargerPropSVG`):** Giant vertical 2D **5-Cell Body Battery Supercharger (`⚡95% សាកថ្មជីវិត`)** in Shot 02.
- **`prop:ep02_muscle_sponge_hero` (`renderMuscleSpongePropSVG`):** Giant 2D **Leg Muscle Glucose Sponge (`អេប៉ុងសាច់ដុំជើង បឺតស្ករ -40%`)** with animated curved dashed sugar absorption stream (`---🍬-->`) in Shot 04.
- **Custom Exercise Gestures & Hand Props:**
  - `stretch-arms`: Overhead back-relief stretch with green dashed relief arc.
  - `hold-dumbbell` (`prop:ep02_dumbbell_hand`): Handheld `#5D98E8` exercise dumbbell curl.
  - `hold-water` (`prop:ep02_water_bottle_hand`): Handheld `#5D98E8` sport water bottle with `#2FAA61` cap.
  - `jog-energetic`: Athletic bent-elbow runner stride with bouncy cadence and green/blue speed lines.

### B. Layer 3 — 8 Bespoke Concept Displays (v2: verified numbers only)
1. **Shot 01 (`elem:ep02_rusty_battery_dashboard`):** Rusty-gear + battery dashboard — gauge labelled **ឧទាហរណ៍**, no fat-burn %.
2. **Shot 02 (`elem:ep02_two_percent_clock`):** 24h pie (**30 នាទី ≈ 2%**) + **WHO 150–300 នាទី/សប្តាហ៍ → ហានិភ័យ ↓ ~20–30%** card.
3. **Shot 03 (`elem:ep02_dual_brain_scanner`):** Brain scan **ផ្តោតអារម្មណ៍ ↑ / ស្ត្រេស ↓** (qualitative, no +25/−40).
4. **Shot 04 (`elem:ep02_sugar_pipeline`):** Sugar-spike curve: sit vs **ដើរ ~10 នាទីក្រោយបាយ** → spike ↓ (no −40%) with the leg-muscle sponge prop.
5. **Shot 05 (`elem:ep02_sleep_skin_dial`):** Moon sleep meter (**លក់ស្រួលជាងមុន**, soft scale) + one-line soft note **មុខស្រស់ស្រាយជាង**.
6. **Shot 06 (`elem:ep02_organ_shield_vault`):** Heart/lung/bone shield (**~20–30%**, **ហាត់សាច់ដុំ 2 ថ្ងៃ/សប្តាហ៍**) + qualitative **ការបង្ការ ចំណាយតិចជាងព្យាបាល** (no $ amount).
7. **Shot 07 (`elem:ep02_zero_dollar_grid`):** 2×2 free-options grid + **safety card** (start gently; see a doctor if chest pain / dizzy / chronic illness).
8. **Shot 08 (`elem:ep02_habit_trophy_checklist`):** 30-day trophy + 4-rule checklist + golden-rule CTA.
