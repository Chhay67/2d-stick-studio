# Episode 01 — Step 7: Final 1080p MP4 Export & Multi-Platform Publish Package (`ep01-iced-coffee`)

**Status:** ✅ **STEP 7 READY FOR MP4 EXPORT & PUBLISH**  
**Total Master Audio Duration:** `259.6 seconds` (`04:20`) across `shot_01.wav` – `shot_08.wav` (+ `550ms` inter-shot transition breathing pauses)  
**Signature Voice-Over:** `VOICE-NARRATOR-001` (Khmer 2D Studio Storyteller)

---

## 1. How to Export the Final 1080p Master MP4 Video (`16:9`, `9:16`, `1:1`)

### Method A — 1-Click Export in Studio UI (`📥 Export MP4`)
1. Open **`http://localhost:8080`** in Chrome or Edge.
2. Click the **`📥 Export MP4`** button in the Top Header, Bottom Timeline Bar, or Theatre HUD.
3. Select:
   - **Target Scope:** `Full Episode (All Story Shots + Transitions)` (or `Current Active Shot Only` for a single shot).
   - **Aspect Ratio & Resolution:** `16:9 (1920 × 1080)`, `9:16 (1080 × 1920)` for TikTok/Reels, or `1:1 (1080 × 1080)` for Facebook.
   - **Frame Rate:** `30 FPS` (fast render) or `60 FPS` (master render).
4. Click **`🚀 Start MP4 Render`**. Once complete, click **`⬇ Download MP4`** (all rendered files are also saved inside the `exports/` folder).

### Method B — Command-Line Deterministic Exporter (`node export-video.js`)
Run any of these commands directly in your terminal:
```powershell
# Export Single Shot (e.g. Shot 01 in 16:9 at 30fps)
node export-video.js --deck ep01 --shot 1 --aspect 16:9 --fps 30

# Export Full Episode 01 Master (1920x1080 60fps H.264 MP4)
node export-video.js --deck ep01 --aspect 16:9 --fps 60

# Export TikTok / Reels Vertical Master (1080x1920 30fps H.264 MP4)
node export-video.js --deck ep01 --aspect 9:16 --fps 30

# Export Facebook Square Master (1080x1080 30fps H.264 MP4)
node export-video.js --deck ep01 --aspect 1:1 --fps 30
```

### Method C — Live Full-Screen Theatre Capture (`🎥 Theatre Capture`)
1. Click **`🎥 Theatre Capture`** in the top studio header to enter clean full-screen mode (`#000000` borderless frame).
2. Hover the top-right corner to reveal the Theatre HUD and click **`🎬 Play Full Episode`** while recording with OBS Studio.

---

## 2. YouTube (`16:9`) & Facebook (`16:9` / `1:1`) Copy-Paste Metadata

### Recommended Video Titles (Khmer)
- **Option A (High-Curiosity Hook):**  
  `តើមានអ្វីកើតឡើងចំពោះរាងកាយ នៅពេលអ្នកផឹកកាហ្វេទឹកកកផ្អែមៗរាល់ថ្ងៃ? (ការពិតនៃស្ករ 11 ស្លាបព្រា)`
- **Option B (Health + Finance Angle):**  
  `ផឹកកាហ្វេទឹកកករាល់ថ្ងៃ៖ ហេតុអ្វីរសៀលម៉ោង 2 ងងុយគេងខ្លាំង? + រូបមន្តប្ដូរទម្លាប់សន្សំលុយ $450/ឆ្នាំ`

### Exact YouTube Chapter Timestamps (Copy & Paste into Description)
*(Calculated directly from your recorded `shot_01.wav` – `shot_08.wav` durations)*

```text
មាតិកាវីដេអូ (Chapters):
00:00 ទម្លាប់កាហ្វេទឹកដោះគោទឹកកកផ្អែមខាប់ពេលព្រឹករបស់តារា (The Morning Hook)
00:31 ថាមពលភ្លាមៗក្នុង 15 នាទីដំបូង (Dopamine & Caffeine Kick)
01:00 អាថ៌កំបាំងក្នុងកែវ៖ ស្ករ 45g (11 ស្លាបព្រា) ទល់នឹងកម្រិតសុវត្ថិភាព WHO 25g
01:30 ហេតុអ្វីម៉ោង 2 រសៀលងងុយគេងខ្លាំង? (Glucose Spike & Sugar Crash)
02:04 អន្ទាក់កាហ្វេអ៊ីនម៉ោង 10 យប់ និងការរំខានដំណេកជ្រៅ (Caffeine Half-Life)
02:40 រូបមន្តប្ដូរទម្លាប់ឆ្លាតវៃ៖ កាហ្វេទឹកដោះគោស្រស់ ផ្អែមត្រឹម 25% (Smart Swap)
03:12 លទ្ធផលពិតក្រោយផ្លាស់ប្ដូរទម្លាប់បាន 2 សប្ដាហ៍ (Before vs. After)
03:44 រូបមន្តសុខភាព និងហិរញ្ញវត្ថុទាំង 3 ជំហាន (សន្សំលុយ $450 ក្នុងមួយឆ្នាំ)
```

### Full YouTube & Facebook Description (Copy & Paste)
```text
តើអ្នកធ្លាប់ឆ្ងល់ទេថា ហេតុអ្វីបានជាផឹកកាហ្វេទឹកដោះគោទឹកកកផ្អែមៗពេលព្រឹកហើយ មានអារម្មណ៍ថាស្វាងភ្លាមៗ ប៉ុន្តែដល់ម៉ោង 2 រសៀល បែរជាងងុយគេង ហត់នឿយ និងពិបាកផ្ដោតអារម្មណ៍ទៅវិញ?

នៅក្នុងវីដេអូគំនូរជីវចលអប់រំ 2D នេះ យើងនឹងតាមដានរឿងរ៉ាវរបស់ «តារា» និងបកស្រាយតាមបែបវិទ្យាសាស្ត្រអំពី៖
✅ កម្រិតស្ករពិតប្រាកដក្នុងកាហ្វេទឹកដោះគោទឹកកក 1 កែវ (45g ឬ 11 ស្លាបព្រាកាហ្វេ) ធៀបនឹងកម្រិតសុវត្ថិភាពរបស់អង្គការសុខភាពពិភពលោក (WHO 25g)
✅ មូលហេតុនៃការហក់ឡើង និងធ្លាក់ចុះគំហុកនៃជាតិស្ករក្នុងឈាម (Glucose Spike & Reactive Hypoglycemia)
✅ អាយុកាលពាក់កណ្ដាលនៃជាតិកាហ្វេអ៊ីន (Caffeine Half-life 5–6 ម៉ោង) ដែលរំខានដំណេកជ្រៅ (Deep Sleep) នៅម៉ោង 10 យប់
✅ រូបមន្តប្ដូរទម្លាប់ឆ្លាតវៃ 3 ជំហាន (100% → 50% → 25%) ដែលជួយទាំងសុខភាព និងសន្សំលុយបានរហូតដល់ $450 ក្នុងមួយឆ្នាំ!

មាតិកាវីដេអូ (Chapters):
00:00 ទម្លាប់កាហ្វេទឹកដោះគោទឹកកកផ្អែមខាប់ពេលព្រឹករបស់តារា
00:31 ថាមពលភ្លាមៗក្នុង 15 នាទីដំបូង
01:00 អាថ៌កំបាំងក្នុងកែវ៖ ស្ករ 45g (11 ស្លាបព្រា) ទល់នឹង WHO 25g
01:30 ហេតុអ្វីម៉ោង 2 រសៀលងងុយគេងខ្លាំង? (Glucose Spike & Crash)
02:04 អន្ទាក់កាហ្វេអ៊ីនម៉ោង 10 យប់ និងការរំខានដំណេកជ្រៅ
02:40 រូបមន្តប្ដូរទម្លាប់ឆ្លាតវៃ៖ កាហ្វេទឹកដោះគោស្រស់ ផ្អែមត្រឹម 25%
03:12 លទ្ធផលពិតក្រោយផ្លាស់ប្ដូរទម្លាប់បាន 2 សប្ដាហ៍
03:44 រូបមន្តសុខភាព និងហិរញ្ញវត្ថុទាំង 3 ជំហាន

#សុខភាព #កាហ្វេទឹកកក #ការអប់រំ #ចំណេះដឹងសុខភាព #ហិរញ្ញវត្ថុផ្ទាល់ខ្លួន #KhmerEducation #HealthyLivingKhmer #KhmerAnimation
```

---

## 3. TikTok / Reels / Shorts (`9:16` Vertical Mode) — 3 Ready-to-Export Highlights

Export individual vertical shots (`--aspect 9:16`) or full vertical episode using `📥 Export MP4` or `node export-video.js`:

| Clip # | Shots to Export | Duration | Vertical Hook Title (Khmer) |
| :--- | :--- | :--- | :--- |
| **Short 1** | `Shot 01` + `Shot 03` | `61.9s` | **«កាហ្វេទឹកកកផ្អែម ១ កែវ មានស្ករដល់ទៅ ១១ ស្លាបព្រា?! 😱☕»** |
| **Short 2** | `Shot 04` + `Shot 05` | `69.8s` | **«ហេតុអ្វីផឹកកាហ្វេហើយ ម៉ោង ២ រសៀលបែរជាងងុយគេងខ្លាំង? 📉😴»** |
| **Short 3** | `Shot 06` + `Shot 08` | `67.4s` | **«រូបមន្តផឹកកាហ្វេមិនឱ្យឡើងគីឡូ ហើយសន្សំលុយបាន $450/ឆ្នាំ! 💡💰»** |

---

## 4. YouTube Thumbnail Brief (`16:9` — `1920×1080`)
- **Source Frame:** Open **`Shot 03 • X-Ray ស្ករ 45g`** in `16:9` mode and capture **Dara (`surprised` emotion) + Giant X-Ray Iced Coffee Cup Prop + `45g (11 ស្លាបព្រា)` Coral Bar**.
- **Big Thumbnail Text (3 Words Max):** `ស្ករ 11 ស្លាបព្រា?!` (Gold `#EABF42` & Coral `#FA604E` badge with `#171717` outline).
