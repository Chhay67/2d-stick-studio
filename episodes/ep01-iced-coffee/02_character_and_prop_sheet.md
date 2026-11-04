# Step 2: Anthology Cast, Locations & Complete Visual Asset Sheet (`02_character_and_prop_sheet.md`)

## 1. Episode 01 Anthology Cast (`ep01-iced-coffee`)

Per our **Anthology Cast Rule** and **Unified Signature Studio Voice Rule (`VOICE-NARRATOR-001`)**:

| Character ID | Khmer Name & Role | Torso Style & Proportions | Hair & Wardrobe / Accent Color | Emotional Arc Across the 7 Chapters | Unified Studio Voice ID (Default) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `char_dara` | **តារា (Dara)**<br/>26yo Office Designer & Daily Iced Coffee Lover | `minimal` stick (`34px` head, `82px` torso, `96px` limbs, `3.5px` `#171717` stroke) | `short-spiky` tuft hair + floating black name tag `តារា` in Intro | Ch 1: `happy`/`excited` at `8:00 AM`, `tired`/`worried` at `2:00 PM` → Ch 2–5: `surprised`/`scared`/`thinking` at sugar, insulin, sleep & aging facts → Ch 6–7: `determined`/`proud` with healthy Fresh Milk Latte | `VOICE-NARRATOR-001` (`Khmer 2D Studio Narrator` via `gemini-3.8-flash-tts`) |
| `char_nary` | **ណារី (Dr. Nary)**<br/>Senior Colleague & Clinical Nutritionist | `outfitted` pill torso (`1:3.6` ratio, `.rig-stroke-filled`) | `top-bun-glasses` + Teal-Green smart blazer (`teal-health`, `#2FAA61` fill) + gold speaker tag `ណារី` | `calm`, `happy`, `thinking`, `worried` (during organ/diabetes warnings), `determined`, `point-right`, `explain`, `open-welcome` | `VOICE-NARRATOR-001` *(or optional `VOICE-CAST-02` `Aoede`)* |
| `char_barista` | **បងសុខ (Bong Sok)**<br/>Neighborhood Café Barista | `outfitted` pill torso (behind café counter) | `curly-clerk` hair + Espresso brown apron (`barista-apron`, `#7C4D2B` fill) + gold speaker tag `បងសុខ` | `happy`, `surprised`, `open-welcome`, `counter-idle` | `VOICE-NARRATOR-001` *(or optional `VOICE-CAST-03` `Charon`)* |
| `narrator` | **អ្នកអត្ថាធិប្បាយ (Studio Signature Narrator)**<br/>Complete Documentary Guide | Single custom-designed vocal persona across all shots & episodes | — | Rich, warm, deeply explanatory Cambodian storyteller (`2–4` complete sentences per shot at `~130 wpm`) | `VOICE-NARRATOR-001` (`gemini-3.8-flash-tts` Voice Design) |

---

## 2. Character Turnaround Specification (`Front 0°`, `3/4 View`, `Side 90°`)

All characters are registered in [character-rig.js](../../engine/character-rig.js) and locked to our calibrated studio defaults:
- **Head Radius:** `34px` (`#FFFFFF` fill, `3.5px` `#171717` outline)
- **Torso Length:** `82px` (`minimal` stick or `.rig-stroke-filled` `outfitted` pill torso)
- **Limb Length:** `96px` (`1:3.6` Head-to-Body ratio; supports per-actor `scale` such as `0.76` when standing beneath multi-line speech bubbles)
- **Three Angles Supported:**
  1. **`front` (`0°`):** Centered facial features (`±9px` eye spacing), full torso width (`1.0x`), used for direct audience hooks and emotional reactions.
  2. **`three-quarter` (`3/4 View`):** `+8px` facial feature shift toward the active infographic or dialogue partner, `0.88x` torso width, used in `HYBRID` and 2-person `STORY` scenes.
  3. **`side` (`90° Profile`):** `+15px` profile eye/mouth placement, `0.72x` torso width, used when walking into the office or ordering at Bong Sok's café counter.

---

## 3. Selected Locations (From `locations_catalog.json`)

Episode 01 uses **4 minimalist locations** from [locations_catalog.json](../../assets/locations/locations_catalog.json) across its 7 chapters:

| Location ID | Chapters Used | Visual Setup & Foreground Anchors |
| :--- | :--- | :--- |
| `office` | **Chapters 1, 3, 6 & 7** | Clean `#FFFFFF` high-key canvas with `#171717`-outlined Office Desk & Colored-Code Laptop (`prop:office_desk_laptop`) + Dara's plastic iced coffee cup on the desk. |
| `whiteboard` | **Chapters 2, 3, 5, 6 & 7** | Pure `#FFFFFF` / `#F5F5F3` explainer space for the Giant Iced Coffee Sugar X-Ray, the 120-Minute Blood Glucose & Insulin Rollercoaster curve, the 30-Day/1-Year Cumulative & Skin Aging breakdown, and the 4-Rule Protocol. |
| `bedroom` | **Chapter 4 (Night Sleep Cycle)** | Minimalist bed silhouette + wall clock (`8:00 PM` → `11:30 PM` → `2:00 AM`) showing how `2:00 PM` caffeine (`50%` left after `6 hours`) blocks Slow-Wave Deep Sleep (`ដំណេកជ្រៅ`). |
| `shop` / `kitchen` | **Chapters 1 & 6 (Café Order & Breakfast Shield)** | Minimalist café counter where Dara switches his order with **បងសុខ** from `កាហ្វេទឹកដោះគោខាប់ 100%` to `កាហ្វេទឹកដោះគោស្រស់ ផ្អែម 25%` after eating breakfast. |

---

## 4. Episode Props & Complete Floating Infographics (Across All 7 Chapters)

### Layer 1 & 2 Foreground Props ([props_catalog.json](../../assets/props/props_catalog.json))
1. **`prop:iced_coffee_cup_hand` (`gesture: 'hold-coffee'`):**
   - Clear takeaway plastic cup with dome lid, green straw, dark espresso top, and condensed-milk / fresh-milk bottom layer held in the actor's hand.
2. **`prop:giant_iced_coffee_xray` (`CharacterRig.renderIcedCoffeeXrayPropSVG`):**
   - Large cross-section diagram of a `650ml` iced sweet coffee cup with properly fitted 3-line stacked bottom label:
     - Top layer: Ice & Espresso (`កាហ្វេ + ទឹកកក` — contains natural antioxidants)
     - Bottom overload layer (`#FA604E` Coral tint): `ទឹកដោះគោខាប់` / `45g ស្ករ` / `(11 ស្លាបព្រា)`.
3. **`prop:office_desk_laptop` (`CharacterRig.renderOfficeDeskLaptopSVG`):**
   - Dara's workstation in Chapters 1, 3, and 6.

### Layer 3 Floating Infographic Elements ([elements_catalog.json](../../assets/elements/elements_catalog.json) & [scenes.js](./scenes.js))
1. **`elem:morning_cortisol_hook` (Chapter 1 — `ep01-morning-hook`):**
   - Morning `8:00 AM` calendar badge + `650ml • $1.50` cup tag + `100%` Borrowed Energy Bar (`ការខ្ចីថាមពលទុកមុន`) + Empty-Stomach Cortisol & Gastric Acid note (`ផឹកទាំងពោះទទេ = អាស៊ីតក្រពះ ↑ + អរម៉ូន Cortisol ↑`).
2. **`elem:afternoon_crash_symptoms` (Chapter 1 — `ep01-afternoon-crash`):**
   - `2:00 PM` clock badge + `15%` Energy Crash Bar (`#FA604E` Coral hatch) + 3 physiological symptom pills (`🥱 ងងុយគេង និងវិលមុខ`, `🍩 ឃ្លានផ្អែមកែវទី 2`, `🧠 ពិបាកផ្ចង់អារម្មណ៍`).
3. **`elem:sugar_comparison_bars` (Chapter 2 — `ep01-sugar-xray`):**
   - Top bar (`#2FAA61` Green): `កម្រិតសុវត្ថិភាពប្រចាំថ្ងៃ (WHO) ≤ 25g (6 ស្លាបព្រា)`
   - Bottom bar (`#FA604E` Coral + Diagonal Hatch): `កាហ្វេទឹកកកផ្អែម 1 កែវ = 45g (11 ស្លាបព្រា • លើស 180%)` + `0g Fiber (ជ្រាបចូលឈាមក្នុង 15 នាទី)`.
4. **`elem:glucose_rollercoaster_curve` (Chapter 3 — `ep01-glucose-curve`):**
   - Animated 120-minute dual curve showing:
     - `នាទីទី 15–30`: Caffeine blocks Adenosine (`អាដេណូស៊ីន`) + Blood sugar spikes (`#FA604E` Coral)
     - `នាទីទី 45–60`: Pancreas (`លំពែង`) floods blood with Insulin (`អាំងស៊ុយលីន` `#5D98E8` Blue) → Liver stores excess as Visceral Belly Fat (`ខ្លាញ់ក្បាលពោះ និងខ្លាញ់រុំថ្លើម`)
     - `នាទីទី 90–120`: Reactive Hypoglycemia crash below baseline (`ងងុយគេង អស់កម្លាំង ម៉ោង 2:00 រសៀល`).
5. **`elem:caffeine_halflife_clock` (Chapter 4 — `ep01-caffeine-sleep`):**
   - 3-stage nighttime timeline: `ផឹកកែវទី 2 ម៉ោង 2:00 រសៀល (100%)` → `ម៉ោង 8:00 យប់ (+6 ម៉ោង នៅសល់ 50%)` → `ម៉ោង 2:00 ភ្លឺ (+12 ម៉ោង នៅសល់ 25%)` → `បំផ្លាញដំណេកជ្រៅ (Deep Sleep) 20%–30%`.
6. **`elem:longterm_compounding_grid` (Chapter 5 — `ep01-longterm-risks`):**
   - Cumulative impact cards across `30 ថ្ងៃ (ស្ករ 1.35 kg)` → `1 ឆ្នាំ (ស្ករ 16.4 kg • ឡើងខ្លាញ់ 4–5 kg)` + 3 biological damage pathways:
     - `1. ខ្លាញ់រុំថ្លើម និងដុះក្បាលពោះ (Visceral & Fatty Liver)`
     - `2. ប្រតិកម្មស្ករ AGEs បំផ្លាញកូឡាជែន (ស្បែកឆាប់ចាស់/ឡើងមុន)`
     - `3. ភាពស៊ាំនឹងអាំងស៊ុយលីន → ជំងឺទឹកនោមផ្អែមប្រភេទទី 2`
7. **`elem:cafe_customization_matrix` (Chapter 6 — `ep01-cafe-matrix`):**
   - 4-Tier Cambodian Café Order Comparison:
     - `ទឹកដោះគោខាប់ 100%` (`45g ស្ករ • 350 kcal` `#FA604E`)
     - `បន្ថយផ្អែម 50%` (`22g ស្ករ • 210 kcal` `#EABF42`)
     - `ទឹកដោះគោស្រស់ ផ្អែម 25%` (`6g–8g ស្ករ • កាត់ស្ករ 80%!` `#2FAA61`)
     - `កាហ្វេខ្មៅ Americano / ឡាតេ 0%` (`0g ស្ករ • សម្បូរសារធាតុប្រឆាំងអុកស៊ីតកម្ម` `#5D98E8`)
     - Plus `10–14 ថ្ងៃ គ្រាប់ពករសជាតិលើអណ្តាតស៊ាំនឹងរសជាតិថ្មី`.
8. **`elem:smart_coffee_protocol` (Chapter 7 — `ep01-smart-swap`):**
   - 4-Rule Actionable Checklist + Dara & Dr. Nary resolution bubble (`កាត់ស្ករ 80% • ថាមពលថេរ 85% ពេញមួយថ្ងៃ • សន្សំបាន $30–$45/ខែ`).
