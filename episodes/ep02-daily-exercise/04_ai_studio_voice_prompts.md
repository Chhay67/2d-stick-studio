# EP02 — Step 4: Per-Line Voice Prompts (Google AI Studio Voice Design • `gemini-3.8-flash-tts`)

Multi-Cast Mode: **one TTS call per line**. Save each result as `episodes/ep02-daily-exercise/audio/voice/shot_XX/line_NN_<speaker>.wav` (or `.mp3`).
The studio sequences the files automatically (0.35s lead-in, 0.30s between lines) and takes timing from the **real audio length** — so cut files tight (no long silences).

## Voice sheet
| Voice ID | Speaker | Base voice | Design brief (Khmer) |
|---|---|---|---|
| `VOICE-NARRATOR-001` | អ្នកនិទាន Narrator | existing studio voice | Warm Khmer studio storyteller; steady, curious; used for STORY / EXAMPLE / HOOK / CTA |
| `VOICE-CAST-01` | វិចិត្រ Vichetr (29) | `Puck` | Young male; tired & slightly nasal in Shots 01–04 → brighter, energetic in Shots 05–08 |
| `VOICE-CAST-02` | គ្រូពេទ្យ សុភា Dr. Sophea | `Aoede` | Calm, kind, confident adult female; clear explanations; light phone-EQ on "(ទូរស័ព្ទ)" lines |
| `VOICE-CAST-03` | ពូសំណាង Pou Samnang (58) | `Charon` | Warm, deeper, cheerful older male; slightly raspy laugh |

**Prompt template (per line):**
```
[VOICE ID: <id> — <speaker>]  Model: gemini-3.8-flash-tts  Language: Khmer (ភាសាខ្មែរ)
Style: <style cue>
[TRANSCRIPT]
<spoken Khmer, numbers spelled out>
```
Rules: read only the TRANSCRIPT; no sound-effect words; keep natural pace (~15 chars/sec); end each line cleanly (no trailing "…" breath unless marked).

---
## Shot 01 — Ch.1 ម៉ោង 5 ល្ងាច ហត់ទាំងអង្គុយ
Folder: `audio/voice/shot_01/` • estimated undefineds (real length comes from the files)

### `line_01_narrator.wav` — អ្នកនិទាន • STORY
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: curious
[TRANSCRIPT]
ម៉ោងប្រាំល្ងាចហើយ… វិចិត្រអង្គុយធ្វើការអស់ប្រាំបីម៉ោងពេញ ដោយមិនបានលើកអ្វីធ្ងន់សោះ។
```

### `line_02_vichetr.wav` — វិចិត្រ • PROBLEM
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: tired
[TRANSCRIPT]
អូយ… ឈឺចង្កេះ ចុករោយក ហើយអស់កម្លាំងដូចអស់ថ្ម! ខ្ញុំគ្រាន់តែអង្គុយទេតើ ម៉េចក៏ហត់ម្ល៉េះ?
```

### `line_03_sophea.wav` — គ្រូពេទ្យ សុភា (ទូរស័ព្ទ) • DIALOGUE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា (ទូរស័ព្ទ)]
Style: reassuring
[TRANSCRIPT]
វិចិត្រ អង្គុយយូរពេក ឈាមរត់យឺត សាច់ដុំរឹង ដូចម៉ូតូទុកចោលយូរ ឆាប់ច្រេះអ៊ីចឹងហើយ។
```

### `line_04_vichetr.wav` — វិចិត្រ • DIALOGUE
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: surprised
[TRANSCRIPT]
ហា៎? ម៉ូតូទុកចោលមែនទេ? ចុះខ្ញុំត្រូវធ្វើយ៉ាងម៉េច?
```

### `line_05_sophea.wav` — គ្រូពេទ្យ សុភា (ទូរស័ព្ទ) • DIALOGUE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា (ទូរស័ព្ទ)]
Style: warm
[TRANSCRIPT]
ល្ងាចនេះមកជួបខ្ញុំនៅសួនច្បារ។ ខ្ញុំនឹងបង្ហាញអ្នកថា ចំណាយពេលតិចតួច ក៏អាចសាកថ្មរាងកាយបាន។
```

### `line_06_narrator.wav` — អ្នកនិទាន • HOOK
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: bridge hook
[TRANSCRIPT]
តើពេលវេលាតិចតួចប៉ុណ្ណា ដែលអាចប្តូរថាមពលរបស់វិចិត្របាន?
```

---
## Shot 02 — Ch.1 «គ្មានពេល» ទល់នឹង 2% នៃថ្ងៃ
Folder: `audio/voice/shot_02/` • estimated undefineds (real length comes from the files)

### `line_01_narrator.wav` — អ្នកនិទាន • STORY
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: curious
[TRANSCRIPT]
នៅសួនច្បារ វិចិត្រឃើញពូសំណាង អាយុហាសិបប្រាំបីឆ្នាំ កំពុងរត់យ៉ាងស្វាហាប់។
```

### `line_02_vichetr.wav` — វិចិត្រ • PROBLEM
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: surprised
[TRANSCRIPT]
ពូ! ពូអាយុច្រើនជាងខ្ញុំ ម៉េចមានកម្លាំងជាងខ្ញុំ? ខ្ញុំធ្វើការហត់ គ្មានពេលហាត់ទេ!
```

### `line_03_samnang.wav` — ពូសំណាង • DIALOGUE
```
[VOICE ID: VOICE-CAST-03 — ពូសំណាង]
Style: cheerful
[TRANSCRIPT]
ហាហា! ពូក៏ធ្លាប់និយាយបែបអ៊ីចឹងដែរ។ គ្រូពេទ្យសុភាបង្រៀនថា ដើរតែសាមសិបនាទីក៏បានហើយ។
```

### `line_04_sophea.wav` — គ្រូពេទ្យ សុភា • EXAMPLE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: explaining
[TRANSCRIPT]
មួយថ្ងៃមានម្ភៃបួនម៉ោង។ សាមសិបនាទី គឺប្រហែលពីរភាគរយប៉ុណ្ណោះ។
```

### `line_05_sophea.wav` — គ្រូពេទ្យ សុភា • EXAMPLE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: explaining
[TRANSCRIPT]
អង្គការសុខភាពពិភពលោកណែនាំ មួយរយហាសិប ដល់បីរយនាទីក្នុងមួយសប្តាហ៍ ដែលអាចកាត់បន្ថយហានិភ័យជំងឺបេះដូង និងស្លាប់មុនអាយុ ប្រហែលម្ភៃដល់សាមសិបភាគរយ។
```

### `line_06_vichetr.wav` — វិចិត្រ • DIALOGUE
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: curious
[TRANSCRIPT]
ចុះបើខ្ញុំធ្វើមិនបានគ្រប់សាមសិបនាទី?
```

### `line_07_sophea.wav` — គ្រូពេទ្យ សុភា • DIALOGUE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: encouraging
[TRANSCRIPT]
មិនអីទេ! ធ្វើតិចក៏មានប្រយោជន៍ដែរ។ ហើយគ្រាន់តែចាប់ផ្តើមដើរ ខួរក្បាលរបស់យើងផ្លាស់ប្តូរមុនគេ។
```

### `line_08_narrator.wav` — អ្នកនិទាន • HOOK
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: bridge hook
[TRANSCRIPT]
តើខួរក្បាលរបស់យើង ផ្លាស់ប្តូរអ្វីខ្លះពេលយើងដើរ?
```

---
## Shot 03 — Ch.2 ស្ត្រេស ងងុយ គិតមិនចេញ
Folder: `audio/voice/shot_03/` • estimated undefineds (real length comes from the files)

### `line_01_narrator.wav` — អ្នកនិទាន • STORY
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: curious
[TRANSCRIPT]
ថ្ងៃបន្ទាប់ វិចិត្រចូលជួបគ្រូពេទ្យសុភា ដោយទឹកមុខអស់កម្លាំង។
```

### `line_02_vichetr.wav` — វិចិត្រ • PROBLEM
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: tired
[TRANSCRIPT]
គ្រូពេទ្យ ខ្ញុំស្ត្រេសការងារ ងងុយ ហើយគិតអ្វីមិនចេញសោះ។
```

### `line_03_sophea.wav` — គ្រូពេទ្យ សុភា • DIALOGUE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: explaining
[TRANSCRIPT]
ពេលយើងធ្វើចលនា ឈាមរត់លឿន ហើយខួរក្បាលទទួលបានអុកស៊ីសែនកាន់តែច្រើន។ ការហាត់មួយលើក ជួយឱ្យផ្តោតអារម្មណ៍ និងគិតលឿនជាងមុនភ្លាមៗ។
```

### `line_04_vichetr.wav` — វិចិត្រ • DIALOGUE
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: curious
[TRANSCRIPT]
ចុះស្ត្រេសវិញ?
```

### `line_05_sophea.wav` — គ្រូពេទ្យ សុភា • DIALOGUE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: encouraging
[TRANSCRIPT]
ហាត់ទៀងទាត់ ជួយបន្ថយអាការៈស្ត្រេស ថប់បារម្ភ និងអារម្មណ៍ស្រពោន។
```

### `line_06_narrator.wav` — អ្នកនិទាន • EXAMPLE
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: curious
[TRANSCRIPT]
ដូចជាសាកទូរស័ព្ទ… ដើរមួយភ្លែត ខួរក្បាលក៏ភ្លឺឡើងវិញ។ នេះជាឧទាហរណ៍ប៉ុណ្ណោះ។
```

### `line_07_vichetr.wav` — វិចិត្រ • HOOK
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: yawning
[TRANSCRIPT]
ប៉ុន្តែរាល់ថ្ងៃ បាយថ្ងៃត្រង់រួច ខ្ញុំងងុយខ្លាំងណាស់… ហេតុអ្វី?
```

---
## Shot 04 — Ch.3 ញ៉ាំបាយរួចងងុយ — ដើរក្រោយបាយ
Folder: `audio/voice/shot_04/` • estimated undefineds (real length comes from the files)

### `line_01_narrator.wav` — អ្នកនិទាន • STORY
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: curious
[TRANSCRIPT]
ម៉ោងដប់ពីរកន្លះ វិចិត្រញ៉ាំបាយចប់ ហើយក្បាលចាប់ផ្តើមយោលដោយងងុយ។
```

### `line_02_vichetr.wav` — វិចិត្រ • PROBLEM
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: sleepy
[TRANSCRIPT]
ញ៉ាំរួចចង់គេង ហើយក្បាលពោះក៏ចេញទៀត!
```

### `line_03_sophea.wav` — គ្រូពេទ្យ សុភា • EXAMPLE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: explaining
[TRANSCRIPT]
ពេលញ៉ាំបាយ ជាតិស្ករឡើងក្នុងឈាម។ បើអង្គុយស្ងៀម វាឡើងខ្ពស់ ធ្វើឱ្យយើងងងុយ។
```

### `line_04_sophea.wav` — គ្រូពេទ្យ សុភា • EXAMPLE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: explaining
[TRANSCRIPT]
ប៉ុន្តែបើដើរភ្លាមក្រោយបាយ សូម្បីតែដប់នាទី សាច់ដុំជើងដូចអេប៉ុង ស្រូបជាតិស្ករ ធ្វើឱ្យវាឡើងតិចជាងមុន។
```

### `line_05_vichetr.wav` — វិចិត្រ • DIALOGUE
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: happy
[TRANSCRIPT]
ងាយម្ល៉េះ! ដើរដប់នាទីទេតើ!
```

### `line_06_sophea.wav` — គ្រូពេទ្យ សុភា • DIALOGUE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: warm
[TRANSCRIPT]
ត្រូវហើយ។ ការស្រាវជ្រាវបង្ហាញថា ដើរក្រោយបាយ ល្អជាងហាត់មុនពេលបាយ។
```

### `line_07_narrator.wav` — អ្នកនិទាន • HOOK
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: bridge hook
[TRANSCRIPT]
ដើរក្រោយបាយ ល្អសម្រាប់ពេលថ្ងៃ… ចុះពេលយប់ វិញ មានអ្វីកើតឡើង?
```

---
## Shot 05 — Ch.4 យប់ — គេងលក់ស្រួលជាងមុន
Folder: `audio/voice/shot_05/` • estimated undefineds (real length comes from the files)

### `line_01_narrator.wav` — អ្នកនិទាន • STORY
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: curious
[TRANSCRIPT]
ពីរសប្តាហ៍ក្រោយ វិចិត្រដើរក្រោយបាយរាល់ថ្ងៃ។ យប់នេះ ទូរស័ព្ទរោទ៍។
```

### `line_02_samnang.wav` — ពូសំណាង (ទូរស័ព្ទ) • DIALOGUE
```
[VOICE ID: VOICE-CAST-03 — ពូសំណាង (ទូរស័ព្ទ)]
Style: teasing
[TRANSCRIPT]
វិចិត្រ! ពូឮថាអ្នកដើររាល់ថ្ងៃ គេងលក់ទេ?
```

### `line_03_vichetr.wav` — វិចិត្រ • DIALOGUE
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: happy
[TRANSCRIPT]
ពូ! ពីមុនខ្ញុំរមៀលយូរទើបលក់ ឥឡូវដាក់ក្បាលលើខ្នើយ ក៏លក់ស្រួលណាស់!
```

### `line_04_samnang.wav` — ពូសំណាង (ទូរស័ព្ទ) • EXAMPLE
```
[VOICE ID: VOICE-CAST-03 — ពូសំណាង (ទូរស័ព្ទ)]
Style: cheerful
[TRANSCRIPT]
ត្រូវហើយ! ធ្វើចលនាពេលថ្ងៃ ជួយឱ្យលក់ស្រួល និងគេងមានគុណភាពជាងមុន។ តែកុំហាត់ខ្លាំងជិតម៉ោងគេង។
```

### `line_05_narrator.wav` — អ្នកនិទាន • EXAMPLE
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: warm
[TRANSCRIPT]
ព្រឹកឡើង ក្រោកមកស្រស់ស្រាយជាងមុន។ ឧទាហរណ៍ មុខក៏មើលទៅស្រស់ជាងមុនដែរ។
```

### `line_06_narrator.wav` — អ្នកនិទាន • HOOK
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: bridge hook
[TRANSCRIPT]
បើធ្វើបានរាល់ថ្ងៃយូរៗ តើរាងកាយ និងសុខភាពរបស់យើងផ្លាស់ប្តូរយ៉ាងណា?
```

---
## Shot 06 — Ch.5 រយៈពេលវែង — បេះដូង ឆ្អឹង ការបង្ការ
Folder: `audio/voice/shot_06/` • estimated undefineds (real length comes from the files)

### `line_01_narrator.wav` — អ្នកនិទាន • STORY
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: curious
[TRANSCRIPT]
ឆ្នាំមុន វិចិត្រធ្លាប់ទៅពេទ្យព្រោះឈឺចង្កេះ។ ថ្ងៃនេះគាត់កាន់វិក្កយបត្រចាស់មកជួបគ្រូពេទ្យសុភា។
```

### `line_02_vichetr.wav` — វិចិត្រ • PROBLEM
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: worried
[TRANSCRIPT]
ឆ្នាំមុនខ្ញុំអស់លុយពេទ្យច្រើន ព្រោះឈឺចង្កេះ។ ខ្ញុំខ្លាចឈឺម្តងទៀត។
```

### `line_03_sophea.wav` — គ្រូពេទ្យ សុភា • EXAMPLE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: explaining
[TRANSCRIPT]
ការហាត់ទៀងទាត់ ជួយបន្ថយហានិភ័យជំងឺបេះដូង និងស្លាប់មុនអាយុ ប្រហែលម្ភៃដល់សាមសិបភាគរយ។
```

### `line_04_sophea.wav` — គ្រូពេទ្យ សុភា • EXAMPLE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: explaining
[TRANSCRIPT]
បើបន្ថែមហាត់សាច់ដុំពីរថ្ងៃក្នុងមួយសប្តាហ៍ ឆ្អឹង និងសាច់ដុំកាន់តែរឹងមាំ ឡើងជណ្តើរក៏លែងហត់ដែរ។
```

### `line_05_vichetr.wav` — វិចិត្រ • DIALOGUE
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: curious
[TRANSCRIPT]
ដូច្នេះ ការបង្ការ ចំណាយតិចជាងការព្យាបាលមែនទេ?
```

### `line_06_sophea.wav` — គ្រូពេទ្យ សុភា • DIALOGUE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: warm
[TRANSCRIPT]
ជាទូទៅ ត្រូវហើយ។ ការបង្ការជំងឺ ជួយកាត់បន្ថយថ្លៃពេទ្យ និងថ្ងៃឈឺ។
```

### `line_07_narrator.wav` — អ្នកនិទាន • HOOK
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: bridge hook
[TRANSCRIPT]
ប៉ុន្តែ បើអត់មានលុយទៅក្លឹបហាត់ប្រាណ តើយើងចាប់ផ្តើមបានទេ?
```

---
## Shot 07 — Ch.6 ហាត់ប្រាណមិនបាច់ក្លឹប — 4 កម្រិតឥតគិតថ្លៃ
Folder: `audio/voice/shot_07/` • estimated undefineds (real length comes from the files)

### `line_01_narrator.wav` — អ្នកនិទាន • STORY
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: curious
[TRANSCRIPT]
នៅបន្ទប់ទទួលភ្ញៀវ វិចិត្រមើលតម្លៃសំបុត្រក្លឹបហាត់ប្រាណ ហើយទឹកមុខស្រពោន។
```

### `line_02_vichetr.wav` — វិចិត្រ • PROBLEM
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: sad
[TRANSCRIPT]
ក្លឹបថ្លៃពេក! ខ្ញុំអត់មានលុយទេ!
```

### `line_03_sophea.wav` — គ្រូពេទ្យ សុភា • SOLUTION
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: encouraging
[TRANSCRIPT]
មិនបាច់ក្លឹបទេ! កម្រិតទីមួយ ដើរដប់នាទីក្រោយបាយ។ កម្រិតទីពីរ ដើរលឿនសាមសិបនាទី។
```

### `line_04_samnang.wav` — ពូសំណាង • SOLUTION
```
[VOICE ID: VOICE-CAST-03 — ពូសំណាង]
Style: cheerful
[TRANSCRIPT]
កម្រិតទីបី រត់តិចៗ ជិះកង់ វាយសី ឬរាំតាមភ្លេង! កម្រិតទីបួន ហាត់សាច់ដុំនៅផ្ទះ ដប់ប្រាំនាទី ដូចជាអង្គុយក្រោក ពីរបីថ្ងៃក្នុងមួយសប្តាហ៍។
```

### `line_05_sophea.wav` — គ្រូពេទ្យ សុភា • SOLUTION
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: serious
[TRANSCRIPT]
ចាប់ផ្តើមថ្នមៗ។ បើឈឺទ្រូង វិលមុខ ឬមានជំងឺរ៉ាំរ៉ៃ សូមសួរគ្រូពេទ្យជាមុន។
```

### `line_06_vichetr.wav` — វិចិត្រ • HOOK
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: determined
[TRANSCRIPT]
ចុះធ្វើយ៉ាងម៉េច កុំឱ្យខ្ញុំបោះបង់ចោលនៅថ្ងៃទីបី?
```

---
## Shot 08 — Ch.7 30 ថ្ងៃក្រោយ — ក្បួន 4 ចំណុច
Folder: `audio/voice/shot_08/` • estimated undefineds (real length comes from the files)

### `line_01_narrator.wav` — អ្នកនិទាន • STORY
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: warm
[TRANSCRIPT]
សាមសិបថ្ងៃក្រោយ… វិចិត្រចូលសួនច្បារដោយជំហានស្រាល និងស្នាមញញឹម។
```

### `line_02_samnang.wav` — ពូសំណាង • DIALOGUE
```
[VOICE ID: VOICE-CAST-03 — ពូសំណាង]
Style: cheerful
[TRANSCRIPT]
វិចិត្រ! ឥឡូវអ្នករត់ទាន់ពូហើយ! មានសម្ងាត់អ្វី?
```

### `line_03_vichetr.wav` — វិចិត្រ • SOLUTION
```
[VOICE ID: VOICE-CAST-01 — វិចិត្រ]
Style: proud
[TRANSCRIPT]
ខ្ញុំចាប់ផ្តើមតូចៗ! ដើរក្រោយបាយ ក្រោកឈរពីរនាទីរាល់ម៉ោង ធ្វើចលនាប្រហែលសាមសិបនាទីស្ទើរតែរាល់ថ្ងៃ ហើយផឹកទឹក ដេកឱ្យទៀងម៉ោង។
```

### `line_04_sophea.wav` — គ្រូពេទ្យ សុភា • DIALOGUE
```
[VOICE ID: VOICE-CAST-02 — គ្រូពេទ្យ សុភា]
Style: warm
[TRANSCRIPT]
ល្អណាស់! ចាប់ផ្តើមតូច តែទៀងទាត់ ល្អជាងខ្លាំងម្តងរួចបោះបង់។ លទ្ធផលរបស់មនុស្សម្នាក់ៗ អាចខុសគ្នា។
```

### `line_05_narrator.wav` — អ្នកនិទាន • HOOK
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: inspiring
[TRANSCRIPT]
រាងកាយមិនច្រេះចាប់ព្រោះអាយុទេ តែច្រេះចាប់ព្រោះយើងឈប់កម្រើក។ ល្ងាចនេះ តើអ្នកត្រៀមដើរដប់នាទីហើយឬនៅ?
```

### `line_06_narrator.wav` — អ្នកនិទាន • CTA
```
[VOICE ID: VOICE-NARRATOR-001 — អ្នកនិទាន]
Style: warm
[TRANSCRIPT]
កុំភ្លេចចុច Subscribe និងចែករំលែកវីដេអូនេះទៅមនុស្សជាទីស្រឡាញ់របស់អ្នកផង។
```

---
## Totals
- Shots: 8 • Lines: 53 TTS calls
- By voice: narrator 17 • vichetr 15 • sophea 16 • samnang 5
