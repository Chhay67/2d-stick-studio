---
name: khmer-episode-director
description: >-
  Use this skill when researching topics, outlining chapters, designing anthology casts,
  inventing topic-specific props and concept displays, or writing shot-by-shot Khmer scripts
  with Hook & Catch bridges for 2D educational episodes across the 4 topic pillars.
---

# Khmer Episode Director & Scriptwriter Skill (Dynamic Topic-Aligned System)

Follow this runbook whenever the user asks to start a new episode, research a topic, design an episode cast/props, or write a shot-by-shot script.

## Step 1: Deep Topic Research, 5-Part Filmmaker Arc & Hook/Catch Bridges (`episodes/epXX-<slug>/01_topic_brief.md`)
1. Identify the **Topic Pillar** (Education, Motivation, Finance, or Healthy Living) and the specific Cambodian everyday pain point.
2. **Simple, Everyday Khmer + Deep Practical Value:** Explain the biological, psychological, or financial mechanisms using **simple, relatable everyday metaphors** (`ងាយយល់សម្រាប់មនុស្សគ្រប់គ្នា`) so any viewer immediately grasps *why* it matters and *how* to apply it.
3. **Mandatory Cold-Open Hook & Chapter-to-Chapter Hook & Catch Bridges (`ស្ពានតភ្ជាប់ Hook & Catch`):**
   - **Shot 01 Cold-Open Hook (`🪝 [HOOK]`):** Open with a relatable everyday question or paradox.
   - **Every Subsequent Shot (`🧲 [CATCH]` ➔ `🪝 [BRIDGE HOOK]`):** Open by answering the curiosity question planted at the end of the previous shot, deliver the core visual lesson, and end by planting a new curiosity hook that pulls the viewer into the next chapter.
4. **Pause at Gate 1** for user approval of the topic brief and Hook/Catch chapter architecture.

## Step 2: Unique Anthology Cast, Custom Topic Props & Custom Concept Displays (`episodes/epXX-<slug>/02_character_and_prop_sheet.md`)
1. **Zero Episode Cloning Rule:** Never reuse or copy-paste the props, concept displays, charts, or B-Roll items from a previous episode! Every episode must have its own **topic-native visual identity**:
   - **Anthology Cast (`1–3` Characters):** Invent story-specific characters (Khmer name, age/role, `minimal` vs. `outfitted` torso style, hairstyle, outfit color).
   - **Custom Layer 1 & 2 Topic Props & Character Actions:** Design episode-specific handheld props (`gesture` tokens like `hold-dumbbell`, `hold-water`, `stretch-arms`, `jog-energetic`, etc.) and stage hero props (e.g., Rusty Spinal Chair, Body Battery Charger, Leg Muscle Sponge for Exercise; or custom props for Finance/Education).
   - **Custom Layer 3 Concept Displays:** For every shot (`Shot 01..08`), design a **distinct, topic-tailored Concept Display** (e.g., 5-Cell Battery Gauge, 24-Hour Circular Pie Dial, Split-Hemisphere Brain Scanner, 2-Path Biological Pipeline, Moon Sleep-Depth Meter, 3-Organ Armor Shield + Piggy Bank, 2×2 Visual Activity Card Grid, 30-Day Trophy Staircase) rather than repeating generic cards or previous episode charts.
   - **Custom B-Roll Cutaway Items:** Design bespoke 2D SVG B-Roll cutaways for each shot.

## Step 3: Deep Shot-by-Shot Master Script (`episodes/epXX-<slug>/03_shot_script.md`)
Every shot specification must include:
- **Shot ID, Director Section, Camera Beats & Unified Episode Transition (`EPISODE_TRANSITION = 'wipe'`):** Reuse one consistent episode transition across the entire episode.
- **Layer 1 & 2 (Environment, Custom Stage Props & Character Acting):** Location ID, custom foreground/stage props, character `actorBeats` (from the **15-Emotion Matrix**), `speakWindows: [[start, end]]`, and topic-specific gestures.
- **Layer 3 (Custom Topic Concept Display + Speech Bubbles + B-Roll):** Specify the unique visual diagram/widget for that shot, timed reveals (`data-reveal-at`, `data-dock-at`, `data-check-at`), character dialog boxes (`data-speak-window`), and B-Roll cutaways (`data-broll-window`).
- **Dual Khmer Script (with Hook & Catch):**
  1. **Visual Khmer Subtitle (`captionBeats`):** Crisp digits and symbols (`30 នាទី`, `2%`, `$500–$1,500`) starting with `🧲 [CATCH]` and ending with `🪝 [ទៅជំពូកបន្ទាប់]`.
  2. **Spoken Khmer TTS Script (`VOICE-NARRATOR-001`):** Full Khmer words for all numbers (`សាមសិបនាទី`, `ពីរភាគរយ`) + natural breathing pauses (`...`, `។`).


## Story-Mix, Fact-Check & Multi-Voice Rules (added after EP02 refactor)
1. **Research before writing:** every topic brief must contain a **claim → verdict → safe wording** table built from real sources (WHO, meta-analyses, official data). Remove or soften any number that can't be sourced; label metaphor gauges "ឧទាហរណ៍". No invented $ savings. Add a safety line for health topics. Re-run this review whenever the director asks "check the topic again".
2. **Never write an all-narrator episode.** Author each shot as `lines[]`, each line tagged `STORY | PROBLEM | DIALOGUE | EXAMPLE | SOLUTION | HOOK | CTA`; ≥ 3 beat types per shot; narrator ≤ 30% of time, character speech ≥ 45%. Open each chapter from a **viewer problem** voiced by a character ("ខ្ញុំអស់លុយក្លឹប!"), answer through a conversation, prove it with an EXAMPLE display, end with a 🪝 hook.
3. **Place scenes in real locations** (office, park, clinic, lunch table, bedroom, living room…) and vary location between chapters; never put a "no gym needed" message in a gym.
4. **Script format (Gate 3):** per shot a table `# | Voice | Beat | Spoken Khmer (numbers in words) | On-screen / action`. Voices: `N` narrator, plus one `VOICE-CAST-0X` per character (Multi-Cast Mode, when the director requests it). Output per-line prompts in `04_ai_studio_voice_prompts.md`.
5. **Gate order:** brief (facts + chapters) → cast/props → full Khmer script → voice prompts → build. Archive replaced drafts as `archive_vN_*`.


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


## Dialogue staging for every shot

For each character line, identify the actual speaker, on-stage or off-screen/phone presence, and seated/standing pose. Plan room close above that speaker for the dialogue bubble in YouTube 16:9, Facebook 1:1 and TikTok 9:16. This applies to every shot and future episode. Do not plan a detached fixed top dialogue row. Keep faces visible, concept panels separate and long Khmer lines readable. EP02's episode manifest anchor hook is the implementation reference; preserve original topic-specific composition.
