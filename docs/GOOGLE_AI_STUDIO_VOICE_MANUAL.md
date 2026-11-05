# Google AI Studio — Voice & Sound Effect Production Manual (v2.0)

This manual explains how **Gemini (Writer/Director)** prepares voice & sound effect packages for you under **Master Design System v2.0**, and how you generate and drop those audio files into the **Antigravity HTML/CSS/JS Scene Player**.

---

## 1. Folder & File Naming Convention

For every episode (`episodes/epXX-<slug>/`), store generated audio files in:

```text
episodes/epXX-<slug>/
├── audio/
│   ├── voice/
│   │   ├── shot_01.wav      # Voiceover / dialogue for Shot 01
│   │   ├── shot_02.wav      # Voiceover / dialogue for Shot 02
│   │   └── ...
│   └── sfx/
│       ├── pop_soft.mp3     # Infographic card/bar appearance
│       ├── whoosh_clean.mp3 # Scene or element transition
│       ├── ding_success.mp3 # Green (#2FAA61) positive takeaway
│       ├── alert_soft.mp3   # Coral (#FA604E) warning/mistake beat
│       └── scribble.mp3     # Chart line drawing / number counter
```

---

## 2. Unified Signature Studio Voice (`VOICE-NARRATOR-001` via Voice Design)

Per **Master Design System v2.0**, we design **one unique, persistent vocal persona (`VOICE-NARRATOR-001` — "Khmer 2D Studio Narrator")** and use it across **all shots and all episodes** by default (including reading character speech bubbles in warm storyteller style using situational `[STYLE]` emotion tags).
- **Why One Unique Designed Voice:** Gives the channel an unmistakable signature identity across all 4 Topic Pillars (`Education`, `Motivation`, `Finance`, `Health`) and lets you generate every shot or chapter batch in Google AI Studio without switching voices.
- **Optional Multi-Cast Voices (`VOICE-CAST-01..03`):** Only used if you explicitly request multi-speaker character dialogue for a specific episode.

### Step-by-Step: Create Your Unique Studio Voice Once in Google AI Studio
1. Open **[Google AI Studio → Generate Speech (`Voice Design`)](https://aistudio.google.com/generate-speech)** (powered by `gemini-3.8-flash-tts`).
2. Click **Create / Design a Voice** (`type: "prompted"`, `store: true`), set Display Name to **`Khmer 2D Studio Narrator (VOICE-NARRATOR-001)`**, Language to **`km-KH`**, and paste this permanent **Voice Design Prompt**:
   ```text
   A warm, articulate Cambodian educator and storyteller in his early 30s with a clear, resonant mid-baritone timbre, studio-grade acoustic clarity, and natural Phnom Penh Khmer pronunciation, speaking at a steady, engaging pace (~130 words per minute) with a friendly, trustworthy warmth.
   ```
   *(Or use the Female Educator Persona: `"A warm, articulate Cambodian educator and storyteller in her late 20s with a clear, soothing mezzo-soprano timbre, studio-grade acoustic clarity, and natural Phnom Penh Khmer pronunciation, speaking at a steady, engaging pace (~130 words per minute) with a friendly, trustworthy warmth."`)*
3. Save the generated voice (`voice_...`) in your Google AI Studio project (or select `Kore` as your prebuilt fallback) and use it for every episode!

| Voice ID | Usage Scope | Voice Design / Model | Situational `[STYLE]` Steering (`speech_metadata.style`) |
| :--- | :--- | :--- | :--- |
| **`VOICE-NARRATOR-001`** *(Default for All Shots & Episodes)* | All narration + character quotes across Every Episode | Custom Designed Voice (`gemini-3.8-flash-tts`, `voice_...`) or `Kore` | Steered per shot: `Warm storytelling` (Hook), `Conversational quote` (Speech bubble), `Eye-opening reveal` (Trap), `Measured analytical` (Logic), `Upbeat motivating` (Summary). |
| **`VOICE-CAST-01..03`** *(Optional Only)* | Optional multi-speaker dialogue if requested | `Puck` / `Aoede` / `Charon` | Used only when multi-voice mode is explicitly requested. |

---

## 3. Copy-Paste Prompt Template for Google AI Studio

For each shot (or batch of shots), Gemini outputs a ready-to-copy **AI Studio Voice Prompt Block**:

```text
[VOICE ID: VOICE-NARRATOR-001]
Language: Khmer (ភាសាខ្មែរ)
Speaker: Narrator (Warm, clear, encouraging educational tone, moderate pace, natural pauses at commas and spaces)
Emotion: Curious at first, then confident and reassuring on the final point.

[TRANSCRIPT]
តើអ្នកធ្លាប់ឆ្ងល់ទេថា... ហេតុអ្វីបានជាយើងខំប្រឹងរៀនរាប់ម៉ោង ប៉ុន្តែបែរជាភ្លេចទៅវិញយ៉ាងលឿន?
ការពិតទៅ ខួរក្បាលរបស់យើងត្រូវការ «ការរំលឹកឡើងវិញតាមចន្លោះពេល» ដើម្បីរក្សាទុកចំណេះដឹងឱ្យបានយូរអង្វែង។
```

### Best Practices for Natural Khmer TTS & Review
1. **Use Khmer Space (` `) & Punctuation (`...`, `៖`, `។`) as Breath Control:**
   - Standard spaces or `...` create natural micro-pauses between clauses; `។` creates a full sentence cadence drop.
2. **Spell Out Numbers & Symbols in Khmer Words for the TTS Prompt:**
   - **In the HTML Visual Overlay:** Keep crisp digits (`50%`, `30%`, `20%`, `$300`, `$966`).
   - **In the AI Studio Voice Transcript:** Write out Khmer pronunciation (`ហាសិបភាគរយ`, `បីរយដុល្លារ`, `ប្រាំបួនរយហុកសិបប្រាំមួយដុល្លារ`) so the voice engine never switches awkwardly into English mid-sentence.
3. **Visual Lip-Sync Review:**
   - Khmer lip-sync is driven by open/close and varied mouth shapes (`talk-1`, `talk-2`, `smile`, `open-o`, `wavy-worried`) plus blinking and head/hand motion. Always visually review timing against the recorded `.wav` track.

---

## 4. Understated Sound Effects (SFX) Cue System

| SFX ID | Visual Trigger in HTML/JS Scene | Sound Character |
| :--- | :--- | :--- |
| `sfx:pop_soft` | Infographic badge, calendar icon, or speech bubble pops in | Soft wooden/air pop (`80–120ms`) |
| `sfx:whoosh_clean` | Camera framing change or scene transition | Gentle air brush (`200ms`) |
| `sfx:draw_line` | Progress bar segment fills or connector arrow animates | Subtle pencil/marker stroke (`300ms`) |
| `sfx:ding_green` | Positive habit / green (`#2FAA61`) highlight appears | Warm marimba/bell chime |
| `sfx:alert_coral` | Warning / coral (`#FA604E`) `នៅសល់តិច` or haircut bar triggers | Low soft muted two-tone alert |
| `sfx:gold_spark` | Gold (`#EABF42`) value or takeaway locks in | Crisp subtle harmonic chime |


---
## 5. Multi-Cast Mode (per episode, on request — used by EP02)
- Voices: `VOICE-NARRATOR-001` (scene-setting, examples, hooks, CTA) + `VOICE-CAST-01..03` (one per character; EP02 → Vichetr `Puck`, Dr. Sophea `Aoede`, Pou Samnang `Charon`).
- **One TTS call per line.** Save as `episodes/<ep>/audio/voice/shot_XX/line_NN_<speaker>.wav` (or `.mp3`); the studio plays them back-to-back and derives timing from the real file lengths, so trim silence.
- Prompt per line: `[VOICE ID: <id> — <speaker>]` / `Style: <cue>` / `[TRANSCRIPT]` (Khmer, numbers spelled out). Ready-made prompts: `episodes/ep02-daily-exercise/04_ai_studio_voice_prompts.md`.
- Phone-call lines: add a light phone-EQ note. Keep emotion cues consistent with the beat (`[tired]` for problems, `[reassuring]` for explanations).


## Current package workflow

EP02 is the sole installed episode. Follow [the episode architecture contract](./EPISODE_ARCHITECTURE.md). Scaffold planning files with `npm run episode:new -- ep03-topic-slug`, record real gate evidence in `production.json`, and keep topic visuals in episode-owned modules. Audio uses per-line files for EP02; use the existing multi-cast voice mode. Run validation and all-format QA before final export. Do not treat file existence or missing-audio previews as production approval.
