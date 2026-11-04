---
name: khmer-episode-director
description: >-
  Use this skill when researching topics, outlining chapters, designing anthology casts,
  or writing shot-by-shot Khmer scripts for 2D educational episodes across the 4 topic pillars
  (Education, Motivation, Personal Finance, Healthy Living).
---

# Khmer Episode Director & Scriptwriter Skill

Follow this runbook whenever the user asks to start a new episode, research a topic, design an episode cast, or write a shot-by-shot script.

## Step 1: Deep Topic Research & Complete 5-Part Filmmaker Arc (`episodes/epXX-<slug>/01_topic_brief.md`)
1. Identify the **Topic Pillar** (Education, Motivation, Finance, or Healthy Living) and the specific Cambodian everyday pain point.
2. **Deep Research Requirement (No Shallow Summaries):** Research the full scientific, physiological, psychological, or financial mechanisms behind the topic—including immediate effects, short-term cycles, long-term cumulative impact, hidden traps, and practical local solutions. Verify all statistics, ratios, and biological/financial claims.
3. **Mandatory 5-Part Filmmaker Structure & 7-Chapter Arc (No Artificial Time Limit):**
   - **Part I — `INTRO` (Cold Open, Title Card & Curiosity Hook):** Open with a relatable Cambodian everyday moment, pose the central question, display the animated Episode Title Card, and promise the life/financial transformation.
   - **Part II — `EXAMPLE STORY` (Relatable Character Drama — Chapters 1–2):** Follow our anthology protagonist (`តារា`, `ហេង`, `ចរណា`) through the morning/daily habit, emotional high, and unexpected crash or trap (`STORY` + `HYBRID`).
   - **Part III — `B-ROLL & MACRO CUTAWAYS` (Dynamic Visual Pacing — Woven Across Chapters 1–7):** Design specific **Animated 2D B-Roll Cutaways** (`data-broll-window="start,end"`) for every shot—such as macro prop cross-sections, internal organ/brain/bloodstream animations, ticking night clocks, and compounding calculators—so visual pacing shifts every `8–12s`.
   - **Part IV — `MAIN EXPLAINER & HOW-TO PROTOCOL` (Knowledge, Science & Step-by-Step Guide — Chapters 3–6):** Deliver the deep `VOICE-NARRATOR-001` educational breakdown (`EXPLAINER` + `HYBRID`):
     - **Chapter 3:** Immediate Mechanism — Step-by-Step Biological / Financial / Cognitive Chain Reaction
     - **Chapter 4:** The Hidden Ripple Effect — Sleep, Stress, Organ / Debt / Habit Compounding
     - **Chapter 5:** Long-Term Cumulative Impact (`30 Days → 1 Year → 5 Years`)
     - **Chapter 6:** The Smart Turnaround — Real-Life Case Study & Practical Customization (`4-Tier Swap Matrix`)
   - **Part V — `OUTRO` (4-Step Action Protocol, Transformation Payoff & CTA — Chapter 7):** Present the `3–4` step actionable checklist, show the protagonist's happy turnaround, deliver a 1-sentence golden takeaway, and display the animated Subscribe/Share Call-to-Action card.
4. **Pause at Gate 1** for user approval of the research brief and chapter architecture.

## Step 2: Anthology Cast & Visual Asset Sheet (`episodes/epXX-<slug>/02_character_and_prop_sheet.md`)
1. Invent `1–3` episode-specific characters (Khmer name, role, `minimal` vs. `outfitted` torso style, hairstyle, semantic accent color, and unified `VOICE-NARRATOR-001` default).
2. Select locations from [locations_catalog.json](../../../assets/locations/locations_catalog.json) and props from [props_catalog.json](../../../assets/props/props_catalog.json).
3. Register the character turnaround (`Front`, `3/4`, `Side`) in the Episode Character Sheet viewer and **pause at Gate 2** for approval.

## Step 3: Deep Shot-by-Shot Master Script (`episodes/epXX-<slug>/03_shot_script.md`)
Write in **Chapter Batches** with **full, meaningful narrative depth** (every shot's spoken Khmer TTS script must be `2–4` rich, connected sentences that explain *why* and *how*, never rushed 1-line fragments). Every shot row must specify:
- **Shot ID, Director Section, Camera Beats & Transition:** Section tag (`INTRO`, `STORY`, `B-ROLL`, `EXPLAINER`, `HOW-TO`, `OUTRO`), Mode (`HYBRID`, `STORY`, `EXPLAINER`), intra-shot `cameraBeats` (`[{ at, zoom, panX, panY }]` for smooth zoom-in on speaking character or hero prop and horizontal pan), and **Scene Transition** (`wipe` — hand-drawn wavy vertical ink-line wipe, `iris`, `dissolve`).
- **Layer 1 (Environment + Ambient Motion):** Location ID + active props + continuous background world motion (passing vehicle outside window/street, ticking clock) + location ambience cue.
- **Layer 2 (Character + Walk-In / Jump Acting):** Actor ID, angle (`front`/`three-quarter`/`side`), emotion keyframes (`actorBeats` from the **15-Emotion Matrix**), speaking windows (`speakWindows: [[start, end]]`), and gesture (`hold-coffee`, `explain`, `jump-celebrate`).
- **Layer 3 ("គិតមើល" Info-Box Display + Animated B-Roll Cutaway):** Combine `.km-key-tracker` (`🔑1..7`), `.km-clipped-card` (white card with yellow top-left clip), `.km-dot-pill` (`•` status-dot pill), `.km-counter-card` (tinted header rolling counter), `.km-stamp-badge` (rubber stamp slam), `data-dock-at` ("Shrink-to-Corner" card miniaturization), `.km-check-row[data-check-at]` (dim-to-bold checklist), and **Animated 2D B-Roll Cutaway Insert** (`data-broll-window="start,end"`).
- **Visual Khmer Subtitle (`captionBeats`):** Sentence-by-sentence 1–2 line subtitles using standard digits (`$300`, `70-85%`).
- **Spoken Khmer TTS Script:** Full Khmer words for all numbers (`បីរយដុល្លារ`) + breath pause markers (`...`, `។`).
- **3-Stem Audio & SFX Cues:** Tag `bgmMood` (`curious`, `story`, `investigation`, `uplifting`) + point SFX cues from [sfx_catalog.json](../../../assets/audio/sfx/sfx_catalog.json).
