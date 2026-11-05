---
name: ai-studio-voice-sfx
description: >-
  Use this skill when designing or using the studio's unique signature voice-over
  (VOICE-NARRATOR-001 via Google AI Studio Voice Design / gemini-3.8-flash-tts),
  generating Khmer TTS prompts across all episodes, converting numbers/currencies/percentages
  into spoken Khmer words, or mapping sound effect (SFX) cues to shot timelines.
---

# Google AI Studio Voice & SFX Production Skill

Use this skill whenever preparing `04_ai_studio_voice_prompts.md`, designing/using our unique studio voice persona, or syncing `.wav`/`.mp3` voice files and SFX into a scene.

## 1. Unified Signature Studio Voice (`VOICE-NARRATOR-001`)

- **Default Rule (One Unique Voice Across All Episodes):**
  - We design and lock **one unique, persistent Studio Signature Voice (`VOICE-NARRATOR-001` — "Khmer 2D Studio Narrator")** in **Google AI Studio Voice Design** (`gemini-3.8-flash-tts`, `type: "prompted"`, `store: true`) and reuse it across **all episodes and all shots** (including narrating character dialogue lines in `STORY` and `HYBRID` shots via situational `[STYLE]` tags).
  - Separate character voices (`VOICE-CAST-01..03`) are **optional** and only used if the user explicitly requests multi-speaker mode. **Multi-Cast Mode (e.g. EP02):** one TTS call per line, saved as `audio/voice/shot_XX/line_NN_<speaker>.wav`; generate prompts per line with `[VOICE ID] / Style / [TRANSCRIPT]`; narrator keeps `VOICE-NARRATOR-001`; see `episodes/ep02-daily-exercise/04_ai_studio_voice_prompts.md` for the template.

### Canonical Voice Design Persona (Create Once in Google AI Studio)
- **Model:** `gemini-3.8-flash-tts` (or `gemini-3.8-flash-lite-tts`)
- **Display Name:** `Khmer 2D Studio Narrator (VOICE-NARRATOR-001)`
- **Language Code:** `km-KH` (`ភាសាខ្មែរ`)
- **Permanent Voice Design Prompt (`prompted.input`):**
  > *"A warm, articulate Cambodian educator and storyteller in his early 30s with a clear, resonant mid-baritone timbre, studio-grade acoustic clarity, and natural Phnom Penh Khmer pronunciation, speaking at a steady, engaging pace (~130 words per minute) with a friendly, trustworthy warmth."*
  *(Optional Female Variant: *"A warm, articulate Cambodian educator and storyteller in her late 20s with a clear, soothing mezzo-soprano timbre, studio-grade acoustic clarity, and natural Phnom Penh Khmer pronunciation, speaking at a steady, engaging pace (~130 words per minute) with a friendly, trustworthy warmth."*)*
- **Situational Emotion Steering (`speech_metadata.style` / `[STYLE]` per Shot):**
  - Keep permanent vocal traits in the Voice Design persona above, and steer shot-by-shot acting using short `[STYLE]` cues:
    - **Hook / Story (`Ch 1`):** `Warm, relatable storytelling tone with gentle curiosity (~130 wpm)`
    - **Character Bubble Line (Single-Voice Mode):** `Expressive, natural conversational storytelling tone`
    - **Hidden Trap / Warning (`Ch 2–3`):** `Eye-opening, empathetic educational reveal`
    - **Mechanism / Logic (`Ch 3`):** `Clear, measured, reassuring analytical delivery`
    - **Smart Swap & 3-Step Summary (`Ch 4–5`):** `Upbeat, motivating, confident takeaway`

## 2. Number & Symbol Phonetic Khmer Conversion Rule
Never leave raw Arabic digits (`300`, `70-85%`, `$966`, `1%`) inside the `[TRANSCRIPT]` block sent to Google AI Studio TTS, or the voice model may switch into English mid-sentence. Always convert:
- `$300` → `បីរយដុល្លារ`
- `$650` → `ប្រាំមួយរយហាសិបដុល្លារ`
- `$966` → `ប្រាំបួនរយហុកសិបប្រាំមួយដុល្លារ`
- `70-85%` → `ចិតសិប ទៅ ប៉ែតសិបប្រាំភាគរយ`
- `50/30/20` → `ហាសិប សាមសិប និងម្ភៃ`
- `1%` → `មួយភាគរយ`

## 3. Breath & Cadence Control in Khmer TTS
- Use a space (` `) or ellipsis (`...`) for a `250–400ms` natural thought pause.
- Use `។` (`ខណ្ឌ`) for a full sentence cadence drop.
- Keep sentences concise (`12–22` words per breath group) so WebAudio RMS lip-sync opens and closes naturally.

## 4. 3-Stem Filmmaker Audio Architecture & SFX Timeline Mapping
Every episode uses a **3-Stem Audio Mix**:
1. **Stem 1 — Main Voice-Over (`VOICE-NARRATOR-001` at `0 dB` / `100%`):**
   - Primary narrative and educational voice across `INTRO`, `EXAMPLE STORY`, `B-ROLL`, `MAIN EXPLAINER`, `HOW-TO`, and `OUTRO`.
2. **Stem 2 — Continuous Background Music Bed (`BGM` at `-18 dB` with Auto-Ducking):**
   - Continuous WebAudio procedural lo-fi marimba/Rhodes score (or external `audio/bgm.mp3`) that shifts mood by section:
     - `curious`: Intro & Hook
     - `story`: Relatable Character Story
     - `investigation`: B-Roll X-Ray & Scientific Mechanism
     - `uplifting`: Smart Swap, How-To Checklist & Outro
   - Automatically ducks down when `VOICE-NARRATOR-001` speaks and swells gently during speech pauses and scene transitions.
3. **Stem 3 — Scene Transitions, Location Ambience & Point SFX (`sfx_catalog.json`):**
   - Reference [sfx_catalog.json](../../../assets/audio/sfx/sfx_catalog.json):
   - **Scene Switch (`0.0s`):** Transition whoosh / chapter chime (`sfx:whoosh_paper` + camera entrance motion).
   - **Element & B-Roll Reveals (`data-reveal-at` / `data-broll-window`):** `sfx:pop_soft` or `sfx:whoosh_paper` when floating infographics or B-Roll cutaway windows enter.
   - **Data & Bar Fills (`data-fill-at`):** `sfx:counter_ticks` when numbers roll up or horizontal bar segments fill.
   - **Takeaways & Warnings:** `sfx:chime_highlight` (for green `#2FAA61` / gold `#EABF42` positive insight) or `sfx:alert_coral` (for coral `#FA604E` warning pill).


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


## Speaker identity and visual handoff

Keep per-line speaker identity, voice file mapping and visual speaker label consistent. Every on-stage character line is displayed close above its actual speaker in every shot across YouTube 16:9, Facebook 1:1 and TikTok 9:16, with a matching portrait/name and a tail aimed at that character. Off-screen/phone lines retain their identity and explicit label with no tail. Preserve line-bound timing and narrator caption behavior; audio production must not substitute a different visual speaker or detach dialogue into a fixed top row.
