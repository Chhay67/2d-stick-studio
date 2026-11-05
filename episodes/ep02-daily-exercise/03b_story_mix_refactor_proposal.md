# EP02 — Story-Mix Refactor (APPROVED & IMPLEMENTED — see `03_shot_script.md`, `04_ai_studio_voice_prompts.md`, `scenes.js`)

## 1. Audit: why EP02 feels like "one storyteller"
- Every `captionBeats` line in all 8 shots is **narrator voice-over**. Characters only gesture; speech bubbles just repeat the narration.
- Only Shot 01 has a character complaint; Shots 03–07 have **no character conversation at all** (Dr. Sophea lectures alone at a whiteboard).
- No clear **Problem → Example → Solution** rhythm per shot; every shot is "explain + hook".
- Result: low emotional pull, no relatable scenes (lunch, bedroom, hospital bill, park chat).

## 2. New rule: 5 Beat Types (every shot mixes at least 3)
| Tag | Meaning | Who talks | On screen |
|---|---|---|---|
| `STORY` | A real scene in a real place (office, park, lunch, bedroom, clinic) | Narrator, very short (≤1 sentence) | Characters act, location changes |
| `PROBLEM` | A character *feels* the pain, in first person | Character bubble | Frustrated emotion + red "pain" prop |
| `DIALOGUE` | 2–3 characters talk back-and-forth (question → answer) | Characters (bubbles alternate) | Speaker tag, head turns |
| `EXAMPLE` | Concrete comparison / number / demo | Doctor or narrator | Concept display (pie, brain, sponge…) |
| `SOLUTION` | Simple action the viewer can copy | Doctor / Samnang | Check-list / step card |

**Mix target per shot:** narrator ≤ 30% of time, character dialogue ≥ 45%, concept display ≥ 25%.

### 2.1 Voice depends on the speaker (Multi-Cast Mode — EP02 only)
This episode explicitly switches from the single studio voice to **one voice per speaker** (uses the existing optional `VOICE-CAST-01..03`; other episodes stay on `VOICE-NARRATOR-001` unless you ask).

| Voice ID | Speaker | Voice design (Google AI Studio, Khmer) | Base voice | Style cues |
|---|---|---|---|---|
| `VOICE-NARRATOR-001` | Narrator (STORY / EXAMPLE / hook / golden rule) | Warm Khmer Studio Storyteller, steady, curious | existing | `[curious]` `[warm]` `[bridge hook]` |
| `VOICE-CAST-01` | វិចិត្រ Vichetr (29, office worker → runner) | Young male, a bit tired & nasal at first → bright & energetic in Shots 05–08 | `Puck` | `[tired]` `[worried]` `[surprised]` → `[excited]` `[proud]` |
| `VOICE-CAST-02` | គ្រូពេទ្យ សុភា Dr. Sophea | Calm, kind, confident adult female, clear explanations | `Aoede` | `[reassuring]` `[explaining]` `[encouraging]` |
| `VOICE-CAST-03` | ពូសំណាង Pou Samnang (58, runner) | Deeper warm older male, cheerful, slightly raspy laugh | `Charon` | `[cheerful]` `[proud]` `[teasing]` |

Rules: Khmer numbers/currency spelled in words for every voice; each line is one TTS call so tone matches the character's emotion; phone-call lines (Dr. Sophea in Shot 01) get a light "phone filter" EQ note in the voice prompt.

**Audio file layout (replaces the single `shot_XX.wav`):**
`audio/voice/shot_01/line_01_narrator.wav`, `line_02_vichetr.wav`, `line_03_sophea.wav` …
Line order = beat order. The engine plays them back-to-back (with a 0.25s gap), derives each beat's start/end from the **real audio durations**, and only the **speaking character's mouth** animates (RMS lip-sync); others react (`think`, `surprised`, `nod`). Narrator lines animate no mouth and show the caption bar; character lines show the speaker's bubble.

## 3. Shot-by-shot beat map

| Shot | Place | Beat flow (≈22s) | Character conversation |
|---|---|---|---|
| 01 | Office 5 PM | `STORY` (hook, 3s) → `PROBLEM` Vichetr rubs back, battery 20% (6s) → `EXAMPLE` rusty motorbike / -90% fat burn (7s) → hook | Vichetr alone + **phone call from Dr. Sophea** (voice bubble): "ម៉ោង ៥ ហើយ ហត់ទៀតហើយមែនទេ?" |
| 02 | Park | `STORY` Vichetr meets Pou Samnang (58) jogging → `DIALOGUE` "ពូ! ហេតុអ្វីពូមានកម្លាំងជាងខ្ញុំ?" / "ដើរ ៣០ នាទី!" → `EXAMPLE` 24h pie = 2% (Sophea) | 3-way: Vichetr ↔ Samnang ↔ Sophea |
| 03 | Clinic desk | `PROBLEM` Vichetr: "ខ្ញុំស្ត្រេស ងងុយគេង ធ្វើការមិនរួច" → `DIALOGUE` Sophea asks 2 questions → `EXAMPLE` brain scan stress vs walk | Vichetr ↔ Sophea |
| 04 | Lunch table | `STORY` Vichetr finishes rice, falls asleep at desk → `PROBLEM` "ញ៉ាំហើយងងុយ ក្បាលពោះធំ" → `DIALOGUE` Sophea: "ដើរ ១០ នាទីសិន" → `EXAMPLE` sugar sponge pipeline | Vichetr ↔ Sophea |
| 05 | Bedroom | `STORY` 2 weeks later, Vichetr wakes fresh → `DIALOGUE` Samnang calls: "គេងលក់ទេ?" → `EXAMPLE` moon sleep + skin glow | Vichetr ↔ Samnang (phone) |
| 06 | Clinic / home | `PROBLEM` Vichetr shows old hospital bill: "ឆ្នាំមុនចំណាយ $1,200" → `DIALOGUE` Sophea: "ហាត់ជាប់លាប់ សន្សំបាន $500–$1,500" → `EXAMPLE` organ shields + piggy bank | Vichetr ↔ Sophea |
| 07 | Living room | `PROBLEM` Vichetr: "ខ្ញុំអត់មានលុយទៅក្លឹប!" → `DIALOGUE` Sophea + Samnang list 4 free options in turn → `SOLUTION` 2×2 card grid | 3-way |
| 08 | Park, 30 days later | `STORY` Vichetr jogs in → `DIALOGUE` Samnang: "ឆ្លើយតាមត្រង់ មានថាមពលប៉ុន្មាន?" Vichetr: "៩៥%!" → `SOLUTION` 4-step check-list → narrator golden rule + CTA | Vichetr ↔ Samnang (+ Sophea) |

## 4. Sample rewritten Shot 01 (16:9, 22s)
| Time | Type | Voice line (spoken Khmer drafted at Gate 3) | Visual |
|---|---|---|---|
| 0.0–3.5 | STORY (narrator) | "ម៉ោងប្រាំល្ងាច… វិចិត្រអង្គុយធ្វើការអស់ប្រាំបីម៉ោងហើយ។" | Hook card → Vichetr walks in & sits |
| 3.5–9.5 | PROBLEM (Vichetr) | «ឈឺចង្កេះ ចុករោយក… ថ្មខ្ញុំសល់តែ ២០%!» | Bubble + stress gesture + back-strain bolt |
| 9.5–14 | DIALOGUE (Sophea, phone) | «អង្គុយស្ងៀមយូរ ខ្លួនរាងកាយច្រេះ ដូចម៉ូតូទុកចោលអ៊ីចឹង!» | Phone bubble + rusty-gear dashboard |
| 14–18.5 | EXAMPLE (narrator) | "ការដុតខ្លាញ់ធ្លាក់ចុះរហូតដល់ កៅសិបភាគរយ" | -90% gauge + 20% battery |
| 18.5–22 | HOOK | "តើអាចសាកថ្មឱ្យពេញ ដោយចំណាយពេលតែ ២% នៃថ្ងៃ បានដោយរបៀបណា?" | Sophea reply: "មកជួបពូសំណាងនៅសួនច្បារ!" |

## 5. Engine / build changes (after approval)
1. **Dialogue bubbles driven by script**: each beat gets `speaker`, `voiceId`, `text`; bubbles alternate with speaker tag + tail toward the speaker; narrator beats use the caption bar only.
2. **`beatType` field** on every beat (`STORY|PROBLEM|DIALOGUE|EXAMPLE|SOLUTION`) shown as a small chip in the Inspector (not on stage).
3. **Per-line multi-voice playback**: load `shot_XX/line_YY_<speaker>.wav`, sequence them, auto-compute beat timing from audio length, lip-sync only the active speaker; Inspector Card 3 lists each line with its voice ID, status (🟢/📂) and copy-prompt button. Export (`export-video.js`) mixes the same per-line files with BGM ducking.
4. **Scene-location change** inside the episode: office → park → clinic → lunch table → bedroom → living room (reuse existing `renderLocationSVG` ids: `office`, `park`, `whiteboard`, `kitchen`, `bedroom`, `living-room`).
5. Rewrite EP02 `03_shot_script.md`, `04_ai_studio_voice_prompts.md` (one prompt per line per voice), `scenes.js`; keep concept displays, props, wipe transition, and hook & catch bridges.
6. Update `AGENTS.md`, `ai-studio-voice-sfx` skill and voice manual: Multi-Cast Mode is allowed per episode on request, with the line-file layout above.

## 6. Decisions needed
1. Approve the 5 beat types and the per-shot flow in §3?
2. Approve the 4 voices in §2.1 (narrator + Vichetr + Dr. Sophea + Pou Samnang) and base-voice choices (`Puck` / `Aoede` / `Charon`)?
3. Shot 01: OK to add Dr. Sophea as a **phone-call voice bubble** (no extra on-stage character)?
4. Shot 08 narrator golden rule + CTA stays as the only long narrator beat?
