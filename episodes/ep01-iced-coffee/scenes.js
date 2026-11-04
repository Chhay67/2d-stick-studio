/**
 * Episode 01 (ep01-iced-coffee) — Complete 7-Chapter Playable HTML/CSS/SVG Shot Definitions & Floating Health Infographics
 * Synchronized second-by-second with episodes/ep01-iced-coffee/audio/voice/shot_01.wav .. shot_08.wav:
 * - Dynamic Multi-Beat Khmer Subtitles (captionBeats)
 * - Staged Infographic Element Reveals (data-reveal-at="seconds")
 * - Dynamic Actor Emotion & Gesture Keyframes (actorBeats)
 * - Exact SFX Cues (sfxCues: pop_soft, whoosh_paper, counter_ticks, chime_highlight, alert_coral)
 */

window.EP01_ICED_COFFEE = (function () {
  const SHOTS = [
    {
      id: 'ep01_shot_01',
      title: 'Shot 01 • INTRO & Ch1A: 8:00 AM Habit',
      directorSection: '🎬 INTRO & EXAMPLE STORY • ទំព័រដើម និងរឿងរ៉ាវរបស់តារា',
      transitionType: 'wipe',
      bgmMood: 'curious',
      mode: 'HYBRID',
      sceneType: 'ep01-morning-hook',
      location: 'office',
      voiceBase: 'episodes/ep01-iced-coffee/audio/voice/shot_01',
      defaultDuration: 31.3,
      actors: [
        {
          id: 'char_dara',
          name: 'តារា (Dara — 8:00 AM)',
          style: 'minimal',
          hair: 'short-spiky',
          x: 235,
          y: 430,
          blackNameTag: 'តារា',
          emotion: 'happy',
          gesture: 'hold-coffee',
          angle: 'front',
          speakWindows: [[11.8, 19.6]]
        }
      ],
      captionKhmer: 'ជារៀងរាល់ម៉ោង 8:00 ព្រឹក តារាតែងតែផឹកកាហ្វេទឹកដោះគោទឹកកក 1 កែវធំ (650ml • $1.50) ទាំងពោះទទេ។',
      captionBeats: [
        { at: 0.0, text: 'ជារៀងរាល់ម៉ោង 8:00 ព្រឹក តារាតែងតែផឹកកាហ្វេទឹកដោះគោទឹកកក 1 កែវធំ (650ml • $1.50) ទាំងពោះទទេ។' },
        { at: 11.6, text: 'គ្រាន់តែបឺតបានពីរបីក្អឹក ភាពងងុយគេងក៏បាត់អស់ ហើយខួរក្បាលមានថាមពលពេញ 100% ភ្លាមៗ!' },
        { at: 20.2, text: 'ប៉ុន្តែការផឹកទាំងពោះទទេនៅពេលព្រឹក ធ្វើឱ្យកើនអាស៊ីតក្រពះ និងអរម៉ូនស្ត្រេស Cortisol យ៉ាងខ្លាំង!' }
      ],
      actorBeats: [
        { at: 0.0, emotion: 'happy', gesture: 'hold-coffee' },
        { at: 11.8, emotion: 'excited', gesture: 'jump-celebrate' },
        { at: 20.4, emotion: 'worried', gesture: 'hold-coffee' }
      ],
      cameraBeats: [
        { at: 0.0, zoom: 1.0, panX: 0, panY: 0 },
        { at: 11.6, zoom: 1.14, panX: -36, panY: -10 },
        { at: 20.2, zoom: 1.0, panX: 0, panY: 0 }
      ],
      sfxCues: [
        { at: 0.3, sfx: 'pop_soft' },
        { at: 4.0, sfx: 'whoosh_paper' },
        { at: 12.0, sfx: 'counter_ticks' },
        { at: 16.4, sfx: 'chime_highlight' },
        { at: 20.6, sfx: 'alert_coral' }
      ],
      aiStudioPrompt: `ជារៀងរាល់ម៉ោងប្រាំបីព្រឹក មុនពេលចាប់ផ្តើមធ្វើការ... តារាតែងតែផឹកកាហ្វេទឹកដោះគោទឹកកកមួយកែវធំ ចំណុះប្រាំមួយរយហាសិបមីលីលីត្រ តម្លៃមួយដុល្លារកន្លះ ទាំងពោះទទេ។ គ្រាន់តែបឺតបានពីរបីក្អឹក ភាពងងុយគេងក៏បាត់អស់ ហើយខួរក្បាលហាក់ដូចជាមានថាមពលពេញមួយរយភាគរយភ្លាមៗ... ប៉ុន្តែការផឹកកាហ្វេផ្អែមទាំងពោះទទេនៅពេលព្រឹក ធ្វើឱ្យអាស៊ីតក្រពះ និងអរម៉ូនស្ត្រេសករទីសុលកើនឡើងខ្ពស់ ហើយវាគ្រាន់តែជាការខ្ចីថាមពលទុកមុនប៉ុណ្ណោះ!`
    },
    {
      id: 'ep01_shot_02',
      title: 'Shot 02 • STORY Ch1B: 2:00 PM Crash (15%)',
      directorSection: '🎭 EXAMPLE STORY • វិបត្តិថាមពលម៉ោង 2:00 រសៀល',
      transitionType: 'dissolve',
      bgmMood: 'story',
      mode: 'HYBRID',
      sceneType: 'ep01-afternoon-crash',
      location: 'office',
      voiceBase: 'episodes/ep01-iced-coffee/audio/voice/shot_02',
      defaultDuration: 28.4,
      actors: [
        {
          id: 'char_dara',
          name: 'តារា (Dara — 2:00 PM Tired)',
          style: 'minimal',
          hair: 'short-spiky',
          x: 235,
          y: 430,
          emotion: 'tired',
          gesture: 'sad-droop',
          angle: 'front',
          speakWindows: [[10.0, 16.8]]
        }
      ],
      captionKhmer: 'ប៉ុន្តែគ្រាន់តែដល់ម៉ោង 2:00 រសៀល ថាមពលដែលធ្លាប់តែពេញ 100% បែរជាធ្លាក់ចុះមកសល់ត្រឹម 15% វិញ!',
      captionBeats: [
        { at: 0.0, text: 'ប៉ុន្តែគ្រាន់តែដល់ម៉ោង 2:00 រសៀល ថាមពលដែលធ្លាប់តែពេញ 100% បែរជាធ្លាក់ចុះមកសល់ត្រឹម 15% វិញ!' },
        { at: 10.0, text: 'វាធ្វើឱ្យតារាទន់ត្របកភ្នែក វិលមុខ ពិបាកផ្ចង់អារម្មណ៍ និងឃ្លានកាហ្វេផ្អែមកែវទី 2 ភ្លាមៗ។' },
        { at: 17.0, text: 'ការពិត កាហ្វេមិនមែនជាពិរុទ្ធជនទេ ប៉ុន្តែជាគ្រាប់បែកស្ករលាក់មុខនៅបាតកែវទៅវិញទេ!' }
      ],
      actorBeats: [
        { at: 0.0, emotion: 'tired', gesture: 'sad-droop' },
        { at: 10.2, emotion: 'worried', gesture: 'stress' },
        { at: 17.3, emotion: 'surprised', gesture: 'think' }
      ],
      cameraBeats: [
        { at: 0.0, zoom: 1.0, panX: 0, panY: 0 },
        { at: 9.8, zoom: 1.15, panX: -38, panY: -8 },
        { at: 17.2, zoom: 1.0, panX: 0, panY: 0 }
      ],
      sfxCues: [
        { at: 0.4, sfx: 'pop_soft' },
        { at: 4.3, sfx: 'counter_ticks' },
        { at: 6.5, sfx: 'alert_coral' },
        { at: 10.2, sfx: 'pop_soft' },
        { at: 17.3, sfx: 'chime_highlight' }
      ],
      aiStudioPrompt: `ប៉ុន្តែ... គ្រាន់តែទ្រនិចនាឡិកាឈានដល់ម៉ោងពីររសៀលភ្លាម ថាមពលដែលធ្លាប់តែពេញមួយរយភាគរយនោះ បែរជាធ្លាក់ចុះគំហុកមកសល់ត្រឹមដប់ប្រាំភាគរយវិញ ធ្វើឱ្យតារាទន់ត្របកភ្នែក វិលមុខ ពិបាកផ្ចង់អារម្មណ៍ និងឃ្លានកាហ្វេផ្អែមកែវទីពីរ។ អ្នកជំនាញអាហារូបត្ថម្ភពន្យល់ថា កាហ្វេខ្លួនវាមិនមែនជាពិរុទ្ធជនទេ ប៉ុន្តែអ្វីដែលកំពុងបំផ្លាញថាមពលរបស់អ្នក គឺគ្រាប់បែកស្ករលាក់មុខនៅបាតកែវទៅវិញទេ!`
    },
    {
      id: 'ep01_shot_03',
      title: 'Shot 03 • B-ROLL X-RAY Ch2: 45g Sugar (180%)',
      directorSection: '🎞️ B-ROLL & X-RAY • ឆ្លុះមើលគ្រាប់បែកស្ករ 45g (11 ស្លាបព្រា)',
      transitionType: 'iris',
      bgmMood: 'investigation',
      mode: 'HYBRID',
      sceneType: 'ep01-sugar-xray',
      location: 'whiteboard',
      voiceBase: 'episodes/ep01-iced-coffee/audio/voice/shot_03',
      defaultDuration: 30.6,
      actors: [
        {
          id: 'char_dara',
          name: 'តារា (Dara — Shocked)',
          style: 'minimal',
          hair: 'short-spiky',
          x: 195,
          y: 430,
          emotion: 'thinking',
          gesture: 'think',
          angle: 'three-quarter',
          speakWindows: [[8.8, 16.5]]
        }
      ],
      captionKhmer: 'អង្គការសុខភាពពិភពលោក (WHO) ណែនាំឱ្យញ៉ាំស្ករបន្ថែមមិនលើសពី 25g (6 ស្លាបព្រាកាហ្វេ) ក្នុង 1 ថ្ងៃ។',
      captionBeats: [
        { at: 0.0, text: 'អង្គការសុខភាពពិភពលោក (WHO) ណែនាំឱ្យញ៉ាំស្ករបន្ថែមមិនលើសពី 25g (6 ស្លាបព្រាកាហ្វេ) ក្នុង 1 ថ្ងៃ។' },
        { at: 8.5, text: 'ប៉ុន្តែកាហ្វេទឹកកកផ្អែម 1 កែវ មានស្កររហូតដល់ 45g (11 ស្លាបព្រា) គឺលើសកម្រិតដល់ទៅ 180%!' },
        { at: 23.3, text: 'ដោយសារវាជាស្កររាវ គ្មានជាតិសរសៃ (0g Fiber) ទើបវាជ្រាបចូលទៅក្នុងចរន្តឈាមត្រឹមតែ 15 នាទីប៉ុណ្ណោះ!' }
      ],
      actorBeats: [
        { at: 0.0, emotion: 'thinking', gesture: 'think' },
        { at: 8.7, emotion: 'surprised', gesture: 'surprised-hands' },
        { at: 23.5, emotion: 'scared', gesture: 'stress' }
      ],
      cameraBeats: [
        { at: 0.0, zoom: 1.0, panX: 0, panY: 0 },
        { at: 8.6, zoom: 1.12, panX: -18, panY: -8 },
        { at: 23.0, zoom: 1.0, panX: 0, panY: 0 }
      ],
      sfxCues: [
        { at: 0.4, sfx: 'chime_highlight' },
        { at: 8.7, sfx: 'whoosh_paper' },
        { at: 14.5, sfx: 'counter_ticks' },
        { at: 18.2, sfx: 'alert_coral' },
        { at: 23.6, sfx: 'pop_soft' }
      ],
      aiStudioPrompt: `អង្គការសុខភាពពិភពលោក ណែនាំថា មនុស្សពេញវ័យមិនគួរញ៉ាំស្ករបន្ថែមលើសពីម្ភៃប្រាំក្រាម ឬប្រាំមួយស្លាបព្រាកាហ្វេក្នុងមួយថ្ងៃនោះទេ។ ប៉ុន្តែនៅក្នុងកាហ្វេទឹកដោះគោទឹកកកផ្អែមមួយកែវ ផ្នែកខាងក្រោមពេញទៅដោយទឹកដោះគោខាប់ ទឹកស្ករ និងម្សៅគ្រីម ដែលមានស្ករសរុបរហូតដល់សែសិបប្រាំក្រាម ស្មើនឹងដប់មួយស្លាបព្រាកាហ្វេ គឺលើសកម្រិតសុវត្ថិភាពដល់ទៅមួយរយប៉ែតសិបភាគរយ! ហើយដោយសារវាជាស្កររាវ គ្មានជាតិសរសៃសូម្បីតែសូន្យក្រាម ទើបវាជ្រាបចូលទៅក្នុងចរន្តឈាមត្រឹមតែដប់ប្រាំនាទីប៉ុណ្ណោះ។`
    },
    {
      id: 'ep01_shot_04',
      title: 'Shot 04 • EXPLAINER Ch3: 120-Min Glucose Curve',
      directorSection: '🧠 MAIN EXPLAINER • យន្តការជាតិស្ករ និងអាំងស៊ុយលីន (120 នាទី)',
      transitionType: 'wipe',
      bgmMood: 'investigation',
      mode: 'EXPLAINER',
      sceneType: 'ep01-glucose-curve',
      location: 'whiteboard',
      voiceBase: 'episodes/ep01-iced-coffee/audio/voice/shot_04',
      defaultDuration: 34.0,
      actors: [
        {
          id: 'char_nary',
          name: 'ណារី (Dr. Nary — Nutritionist)',
          style: 'outfitted',
          hair: 'top-bun-glasses',
          outfit: 'teal-health',
          x: 215,
          y: 430,
          emotion: 'calm',
          gesture: 'point-right',
          angle: 'three-quarter',
          speakWindows: [[0.3, 9.2], [9.8, 22.0], [22.8, 33.6]]
        }
      ],
      captionKhmer: 'នាទីទី 15–30៖ កាហ្វេអ៊ីនបិទទ្វារសញ្ញាងងុយគេង (Adenosine) ឯជាតិស្កររាវស្ទុះឡើងខ្ពស់ភ្លាមៗ!',
      captionBeats: [
        { at: 0.0, text: 'នាទីទី 15–30៖ កាហ្វេអ៊ីនបិទទ្វារសញ្ញាងងុយគេង (Adenosine) ឯជាតិស្កររាវស្ទុះឡើងខ្ពស់ភ្លាមៗ!' },
        { at: 9.5, text: 'នាទីទី 45–60៖ លំពែងបញ្ចេញអាំងស៊ុយលីនយ៉ាងគំហុក ដឹកស្ករលើសទៅស្តុកជាខ្លាញ់ក្បាលពោះ និងខ្លាញ់រុំថ្លើម!' },
        { at: 22.5, text: 'នាទីទី 90–120៖ ជាតិស្ករធ្លាក់ចុះក្រោមកម្រិតធម្មតា ធ្វើឱ្យងងុយគេងខ្លាំងនៅម៉ោង 2:00 រសៀល!' }
      ],
      actorBeats: [
        { at: 0.0, emotion: 'calm', gesture: 'point-right' },
        { at: 9.8, emotion: 'worried', gesture: 'explain' },
        { at: 22.8, emotion: 'determined', gesture: 'point-right' }
      ],
      sfxCues: [
        { at: 0.4, sfx: 'whoosh_paper' },
        { at: 6.2, sfx: 'counter_ticks' },
        { at: 10.0, sfx: 'pop_soft' },
        { at: 17.0, sfx: 'alert_coral' },
        { at: 22.9, sfx: 'alert_coral' }
      ],
      aiStudioPrompt: `នៅនាទីទីដប់ប្រាំដល់សាមសិប កាហ្វេអ៊ីនចូលទៅបិទទ្វារសញ្ញាងងុយគេងអាដេណូស៊ីនក្នុងខួរក្បាល ចំណែកឯជាតិស្កររាវក៏ស្ទុះឡើងខ្ពស់ភ្លាមៗ។ ឈានដល់នាទីទីសែសិបប្រាំដល់ហុកសិប លំពែងចាប់ផ្តើមប្រកាសអាសន្ន ហើយបាញ់បញ្ចេញអរម៉ូនអាំងស៊ុយលីនយ៉ាងគំហុក ដើម្បីដឹកស្ករដែលលើស ទៅបំប្លែងស្តុកទុកជាខ្លាញ់ក្បាលពោះ និងខ្លាញ់រុំថ្លើម។ ដល់នាទីទីកៅសិបទៅមួយរយម្ភៃ ដោយសារអាំងស៊ុយលីនចេញមកច្រើនពេក ជាតិស្ករក្នុងឈាមក៏ធ្លាក់ចុះក្រោមកម្រិតធម្មតា ធ្វើឱ្យខួរក្បាលអស់កម្លាំង និងងងុយគេងខ្លាំងនៅម៉ោងពីររសៀល!`
    },
    {
      id: 'ep01_shot_05',
      title: 'Shot 05 • EXPLAINER Ch4: 6h Caffeine & Sleep',
      directorSection: '🧠 MAIN EXPLAINER • អាយុកាលកាហ្វេអ៊ីន 6 ម៉ោង និងដំណេកជ្រៅ',
      transitionType: 'dissolve',
      bgmMood: 'story',
      mode: 'HYBRID',
      sceneType: 'ep01-caffeine-sleep',
      location: 'bedroom',
      voiceBase: 'episodes/ep01-iced-coffee/audio/voice/shot_05',
      defaultDuration: 35.8,
      actors: [
        {
          id: 'char_dara',
          name: 'តារា (Dara — Sleepless)',
          style: 'minimal',
          hair: 'short-spiky',
          x: 210,
          y: 430,
          emotion: 'thinking',
          gesture: 'think',
          angle: 'front',
          speakWindows: [[11.2, 19.0]]
        }
      ],
      captionKhmer: 'គ្រោះថ្នាក់មួយទៀតគឺដំណេក៖ កាហ្វេអ៊ីនត្រូវការពេល 6 ម៉ោង ទើបរលាយអស់ 50% ពីក្នុងឈាម។',
      captionBeats: [
        { at: 0.0, text: 'គ្រោះថ្នាក់មួយទៀតគឺដំណេក៖ កាហ្វេអ៊ីនត្រូវការពេល 6 ម៉ោង ទើបរលាយអស់ 50% ពីក្នុងឈាម។' },
        { at: 11.1, text: 'បើផឹកកែវទី 2 ម៉ោង 2:00 រសៀល ដល់ម៉ោង 8:00 យប់នៅសល់កាហ្វេអ៊ីន 50% និងម៉ោង 2:00 ភ្លឺសល់ 25%!' },
        { at: 23.5, text: 'វាបំផ្លាញ «ដំណេកជ្រៅ» ធ្វើឱ្យភ្ញាក់ឡើងអស់កម្លាំងនៅព្រឹកបន្ទាប់ ហើយធ្លាក់ក្នុងអន្ទាក់វិលជុំ!' }
      ],
      actorBeats: [
        { at: 0.0, emotion: 'thinking', gesture: 'think' },
        { at: 11.5, emotion: 'worried', gesture: 'stress' },
        { at: 23.8, emotion: 'tired', gesture: 'sad-droop' }
      ],
      sfxCues: [
        { at: 0.4, sfx: 'pop_soft' },
        { at: 11.5, sfx: 'pop_soft' },
        { at: 15.5, sfx: 'counter_ticks' },
        { at: 19.5, sfx: 'alert_coral' },
        { at: 23.9, sfx: 'whoosh_paper' },
        { at: 30.0, sfx: 'alert_coral' }
      ],
      aiStudioPrompt: `គ្រោះថ្នាក់លាក់មុខមួយទៀតគឺដំណេកនៅពេលយប់។ ជាតិកាហ្វេអ៊ីនត្រូវការពេលប្រាំមួយម៉ោង ទើបរលាយអស់ហាសិបភាគរយពីក្នុងឈាម។ ប្រសិនបើអ្នកផឹកកាហ្វេកែវទីពីរនៅម៉ោងពីររសៀល នោះដល់ម៉ោងប្រាំបីយប់ កាហ្វេអ៊ីននៅសល់ហាសិបភាគរយ និងម៉ោងពីរទៀបភ្លឺនៅសល់ម្ភៃប្រាំភាគរយនៅឡើយ... ទោះបីអ្នកបិទភ្នែកគេងលក់ ក៏វារារាំងខួរក្បាលមិនឱ្យចូលដល់ដំណេកជ្រៅបានដែរ ធ្វើឱ្យអ្នកភ្ញាក់ឡើងអស់កម្លាំងនៅព្រឹកបន្ទាប់ ហើយធ្លាក់ក្នុងអន្ទាក់វិលជុំគ្មានទីបញ្ចប់!`
    },
    {
      id: 'ep01_shot_06',
      title: 'Shot 06 • EXPLAINER Ch5: 16.4 kg/Yr & Organs',
      directorSection: '🧠 MAIN EXPLAINER • ផលប៉ះពាល់រយៈពេល 1 ឆ្នាំលើថ្លើម និងស្បែក',
      transitionType: 'wipe',
      bgmMood: 'investigation',
      mode: 'EXPLAINER',
      sceneType: 'ep01-longterm-risks',
      location: 'whiteboard',
      voiceBase: 'episodes/ep01-iced-coffee/audio/voice/shot_06',
      defaultDuration: 31.8,
      actors: [
        {
          id: 'char_nary',
          name: 'ណារី (Dr. Nary)',
          style: 'outfitted',
          hair: 'top-bun-glasses',
          outfit: 'teal-health',
          x: 205,
          y: 430,
          emotion: 'calm',
          gesture: 'point-right',
          angle: 'front',
          speakWindows: [[0.3, 12.6], [13.0, 22.5], [25.1, 31.4]]
        }
      ],
      captionKhmer: 'ផឹក 1 កែវរាល់ថ្ងៃ៖ 30 ថ្ងៃស្មើនឹងស្ករសុទ្ធ 1.35 kg ហើយក្នុង 1 ឆ្នាំស្មើនឹងស្ករសុទ្ធ 16.4 kg!',
      captionBeats: [
        { at: 0.0, text: 'ផឹក 1 កែវរាល់ថ្ងៃ៖ 30 ថ្ងៃស្មើនឹងស្ករសុទ្ធ 1.35 kg ហើយក្នុង 1 ឆ្នាំស្មើនឹងស្ករសុទ្ធ 16.4 kg!' },
        { at: 13.0, text: 'វាបង្កើតជាខ្លាញ់ក្បាលពោះ 4–5 kg ក្នុង 1 ឆ្នាំ និងបង្កជំងឺខ្លាញ់រុំថ្លើមដោយមិនដឹងខ្លួន។' },
        { at: 19.0, text: 'ជាតិស្ករលើសទៅបំផ្លាញសរសៃកូឡាជែន (AGEs) ធ្វើឱ្យស្បែកមុខឆាប់ជ្រួញ និងងាយឡើងមុន។' },
        { at: 25.1, text: 'បើបន្តរាប់ឆ្នាំ កោសិកានឹងស៊ាំនឹងអាំងស៊ុយលីន ដែលនាំទៅរកជំងឺទឹកនោមផ្អែមប្រភេទទី 2!' }
      ],
      actorBeats: [
        { at: 0.0, emotion: 'calm', gesture: 'point-right' },
        { at: 13.0, emotion: 'worried', gesture: 'explain' },
        { at: 25.1, emotion: 'determined', gesture: 'point-right' }
      ],
      sfxCues: [
        { at: 0.4, sfx: 'pop_soft' },
        { at: 8.3, sfx: 'counter_ticks' },
        { at: 13.3, sfx: 'alert_coral' },
        { at: 19.0, sfx: 'pop_soft' },
        { at: 25.3, sfx: 'alert_coral' }
      ],
      aiStudioPrompt: `បើអ្នកផឹកកាហ្វេទឹកកកផ្អែមមួយកែវរាល់ថ្ងៃ រយៈពេលសាមសិបថ្ងៃ អ្នកដាក់ស្ករសុទ្ធចូលខ្លួនអស់មួយគីឡូបីខាំកន្លះ ហើយក្នុងមួយឆ្នាំគឺស្មើនឹងស្ករសុទ្ធដប់ប្រាំមួយគីឡូបួនខាំ ដែលអាចបង្កើតជាខ្លាញ់ក្បាលពោះពីបួនទៅប្រាំគីឡូក្រាម និងបង្កជំងឺខ្លាញ់រុំថ្លើម។ ជាតិស្ករដែលលើសនេះ ក៏ទៅបំផ្លាញសរសៃកូឡាជែនធ្វើឱ្យស្បែកមុខឆាប់ជ្រួញ និងឡើងមុន ហើយបើបន្តរាប់ឆ្នាំ កោសិកានឹងស៊ាំនឹងអាំងស៊ុយលីន នាំទៅរកជំងឺទឹកនោមផ្អែមប្រភេទទីពីរ!`
    },
    {
      id: 'ep01_shot_07',
      title: 'Shot 07 • HOW-TO Ch6: 4-Tier Café Swap Matrix',
      directorSection: '🛠️ HOW-TO GUIDE • វិធីជ្រើសរើសកាហ្វេឆ្លាតវៃទាំង 4 កម្រិត',
      transitionType: 'iris',
      bgmMood: 'uplifting',
      mode: 'HYBRID',
      sceneType: 'ep01-cafe-matrix',
      location: 'whiteboard',
      voiceBase: 'episodes/ep01-iced-coffee/audio/voice/shot_07',
      defaultDuration: 32.1,
      actors: [
        {
          id: 'char_nary',
          name: 'ណារី (Dr. Nary)',
          style: 'outfitted',
          hair: 'top-bun-glasses',
          outfit: 'teal-health',
          x: 205,
          y: 430,
          emotion: 'happy',
          gesture: 'explain',
          angle: 'three-quarter',
          speakWindows: [[0.3, 9.8], [10.3, 22.5], [23.2, 31.8]]
        }
      ],
      captionKhmer: 'ដំណឹងល្អ៖ អ្នកមិនបាច់ផ្តាច់កាហ្វេទេ ព្រោះកាហ្វេធម្មជាតិមានសារធាតុប្រឆាំងអុកស៊ីតកម្មការពារខួរក្បាល និងថ្លើម!',
      captionBeats: [
        { at: 0.0, text: 'ដំណឹងល្អ៖ អ្នកមិនបាច់ផ្តាច់កាហ្វេទេ ព្រោះកាហ្វេធម្មជាតិមានសារធាតុប្រឆាំងអុកស៊ីតកម្មការពារខួរក្បាល និងថ្លើម!' },
        { at: 10.1, text: 'ប្តូរមក «កាហ្វេទឹកដោះគោស្រស់ ផ្អែម 25%» ឬ Americano ជួយកាត់បន្ថយជាតិស្ករបានដល់ 80% ភ្លាមៗ!' },
        { at: 23.0, text: 'គ្រាប់ពករសជាតិលើអណ្តាត ប្រើពេលត្រឹមតែ 10–14 ថ្ងៃប៉ុណ្ណោះ ដើម្បីស៊ាំនឹងរសជាតិផ្អែមតិច!' }
      ],
      actorBeats: [
        { at: 0.0, emotion: 'happy', gesture: 'explain' },
        { at: 10.3, emotion: 'determined', gesture: 'point-right' },
        { at: 23.2, emotion: 'proud', gesture: 'open-welcome' }
      ],
      sfxCues: [
        { at: 0.4, sfx: 'pop_soft' },
        { at: 10.5, sfx: 'chime_highlight' },
        { at: 16.0, sfx: 'counter_ticks' },
        { at: 23.4, sfx: 'chime_highlight' }
      ],
      aiStudioPrompt: `ដំណឹងល្អគឺ អ្នកមិនចាំបាច់ផ្តាច់កាហ្វេនោះទេ ព្រោះគ្រាប់កាហ្វេធម្មជាតិសម្បូរទៅដោយសារធាតុប្រឆាំងអុកស៊ីតកម្ម ដែលជួយការពារខួរក្បាល និងថ្លើម! គ្រាន់តែអ្នកប្តូរពីកាហ្វេទឹកដោះគោខាប់ មកជាកាហ្វេទឹកដោះគោស្រស់ ហើយដាក់ផ្អែមត្រឹមម្ភៃប្រាំភាគរយ ឬកាហ្វេខ្មៅអាមេរិកកាណូ អ្នកនឹងកាត់បន្ថយជាតិស្ករបានដល់ទៅប៉ែតសិបភាគរយភ្លាមៗ។ ហើយគ្រាប់ពករសជាតិលើអណ្តាតរបស់យើង ត្រូវការពេលត្រឹមតែដប់ទៅដប់បួនថ្ងៃប៉ុណ្ណោះ ដើម្បីស៊ាំនឹងរសជាតិផ្អែមតិចយ៉ាងឆ្ងាញ់ធម្មជាតិ!`
    },
    {
      id: 'ep01_shot_08',
      title: 'Shot 08 • HOW-TO & OUTRO: 4 Rules + CTA',
      directorSection: '🏁 HOW-TO & OUTRO • ក្បួនកាហ្វេសុខភាព 4 ចំណុច និងសរុបខ្លឹមសារ',
      transitionType: 'wipe',
      bgmMood: 'uplifting',
      mode: 'HYBRID',
      sceneType: 'ep01-smart-swap',
      location: 'whiteboard',
      voiceBase: 'episodes/ep01-iced-coffee/audio/voice/shot_08',
      defaultDuration: 35.6,
      actors: [
        {
          id: 'char_nary',
          name: 'ណារី (Dr. Nary)',
          style: 'outfitted',
          hair: 'top-bun-glasses',
          outfit: 'teal-health',
          x: 155,
          y: 438,
          scale: 0.76,
          emotion: 'happy',
          gesture: 'open-welcome',
          angle: 'three-quarter',
          speakWindows: [[6.8, 35.2]]
        },
        {
          id: 'char_dara',
          name: 'តារា (Dara — Smart Coffee)',
          style: 'minimal',
          hair: 'short-spiky',
          x: 265,
          y: 438,
          scale: 0.76,
          emotion: 'proud',
          gesture: 'hold-coffee',
          angle: 'front',
          speakWindows: [[0.2, 6.6]]
        }
      ],
      captionKhmer: 'តារា៖ «បងណារី! ចាប់ពីថ្ងៃនេះទៅ ខ្ញុំប្តូរមកកាហ្វេទឹកដោះគោស្រស់ ផ្អែមត្រឹម 25% បានហើយ!»',
      captionBeats: [
        { at: 0.0, text: 'តារា៖ «បងណារី! ចាប់ពីថ្ងៃនេះទៅ ខ្ញុំប្តូរមកកាហ្វេទឹកដោះគោស្រស់ ផ្អែមត្រឹម 25% បានហើយ!»' },
        { at: 10.8, text: 'ក្បួនទី 1៖ ប្តូរមកទឹកដោះគោស្រស់ និងបន្ថយកម្រិតផ្អែមតាមលំដាប់មកត្រឹម 25% (កាត់ស្ករ 80%)។' },
        { at: 16.0, text: 'ក្បួនទី 2 & 3៖ ផឹកក្រោយអាហារពេលព្រឹកមុនម៉ោង 12 ថ្ងៃត្រង់ និងផឹកទឹកឆ្អិន 1 កែវអមជាមួយជានិច្ច។' },
        { at: 23.6, text: 'ក្បួនទី 4៖ ទុកកាហ្វេទឹកដោះគោខាប់ផឹកលេង 1 ដង/សប្តាហ៍ ជួយឱ្យមានថាមពលថេរ និងសន្សំបាន $30–$45/ខែ!' }
      ],
      actorBeats: [
        { at: 0.0, emotion: 'proud', gesture: 'hold-coffee' },
        { at: 11.0, emotion: 'determined', gesture: 'hold-coffee' },
        { at: 28.0, emotion: 'excited', gesture: 'jump-celebrate' }
      ],
      cameraBeats: [
        { at: 0.0, zoom: 1.12, panX: -32, panY: -8 },
        { at: 7.0, zoom: 1.0, panX: 0, panY: 0 },
        { at: 27.8, zoom: 1.08, panX: -18, panY: -6 }
      ],
      sfxCues: [
        { at: 0.3, sfx: 'pop_soft' },
        { at: 7.0, sfx: 'whoosh_paper' },
        { at: 11.2, sfx: 'chime_highlight' },
        { at: 16.1, sfx: 'pop_soft' },
        { at: 20.5, sfx: 'pop_soft' },
        { at: 23.8, sfx: 'counter_ticks' },
        { at: 28.5, sfx: 'chime_highlight' }
      ],
      aiStudioPrompt: `បងណារី! ចាប់ពីថ្ងៃនេះទៅ ខ្ញុំប្តូរមកកាហ្វេទឹកដោះគោស្រស់ ហើយដាក់ផ្អែមត្រឹមម្ភៃប្រាំភាគរយបានហើយ! ... សូមអនុវត្តក្បួនកាហ្វេសុខភាពទាំងបួនចំណុចចាប់ពីថ្ងៃស្អែកទៅ៖ ទីមួយ ប្តូរមកទឹកដោះគោស្រស់ និងបន្ថយផ្អែមមកម្ភៃប្រាំភាគរយ ទីពីរ ផឹកក្រោយអាហារពេលព្រឹក និងឈប់មុនម៉ោងដប់ពីរថ្ងៃត្រង់ ទីបី ផឹកទឹកឆ្អិនមួយកែវអមជាមួយជានិច្ច និងទីបួន ទុកកាហ្វេទឹកដោះគោខាប់សម្រាប់ផឹកលេងតែមួយដងក្នុងមួយសប្តាហ៍។ អ្នកនឹងមានថាមពលថេរពេញមួយថ្ងៃ គេងលក់ស្កប់ និងសន្សំលុយបានសាមសិបទៅសែសិបប្រាំដុល្លារក្នុងមួយខែ!`
    },
    {
      id: 'ep01_shot_09',
      title: '📋 EP01 Cast & Prop Sheet',
      mode: 'EXPLAINER',
      sceneType: 'character-sheet',
      location: 'whiteboard',
      actors: [],
      captionKhmer: 'តារាងតួអង្គ EP01 (តារា • ណារី • បងសុខ) មុំទាំង 3 (Front • 3/4 • Side) និងកែវកាហ្វេ X-Ray 45g។',
      aiStudioPrompt: `[EP01 ANTHOLOGY CAST — MASTER DESIGN SYSTEM v2.0]\nUnified Studio Voice: VOICE-NARRATOR-001 (Custom Designed Voice via gemini-3.8-flash-tts used across all shots & episodes)\n1. តារា (Dara): Minimalist stick rig (34px head, short-spiky hair, hold-coffee prop)\n2. ណារី (Dr. Nary): Outfitted pill torso (teal-health #2FAA61 blazer, top-bun-glasses)\n3. បងសុខ (Bong Sok): Outfitted pill torso (barista-apron #7C4D2B, curly-clerk hair)`
    }
  ];

  function renderInfographic(shot) {
    switch (shot.sceneType) {
      case 'ep01-morning-hook':
        return `
          <div class="km-key-tracker">
            <div class="km-key-row">
              <div class="km-key-item active">🔑1</div>
              <div class="km-key-item">2</div>
              <div class="km-key-item">3</div>
              <div class="km-key-item">4</div>
              <div class="km-key-item">5</div>
              <div class="km-key-item">6</div>
              <div class="km-key-item">7</div>
            </div>
            <div class="km-key-pill editable-text-node" contenteditable="true">1. ទម្លាប់ម៉ោង 8 ព្រឹក</div>
          </div>

          <div class="ref-speech-bubble" data-speak-window="11.8,19.6" style="top:64px; left:88px; width:308px; z-index:26; padding:9px 14px; font-size:13.2px; opacity:0; pointer-events:none;">
            <div class="ref-speaker-tag editable-text-node" contenteditable="true">តារា</div>
            <div class="editable-text-node" contenteditable="true">
              បឺតកាហ្វេទឹកកកផ្អែម 1 កែវភ្លាម ស្វាងភ្នែកមានថាមពល 100% តែម្តង!
            </div>
            <svg class="ref-bubble-tail" style="left:132px; bottom:-34px; width:24px; height:36px;" viewBox="0 0 24 36">
              <polyline points="2,0 12,34 20,0" fill="#FFFFFF" stroke="#171717" stroke-width="2.2" stroke-linejoin="round" />
            </svg>
          </div>

          <div id="animCardPrimary" data-dock-at="20.2" data-dock-scale="0.78" data-dock-x="0" data-dock-y="-12" style="position:absolute; top:72px; left:545px; display:flex; align-items:center; gap:26px; transition:transform 0.3s ease;">
            <div class="ref-calendar-badge" data-reveal-at="0.2">
              <div class="ref-calendar-ring left"></div>
              <div class="ref-calendar-ring right"></div>
              <div class="ref-calendar-header editable-text-node" contenteditable="true" style="background:#5D98E8;">ម៉ោងព្រឹក</div>
              <div class="ref-calendar-day editable-text-node" contenteditable="true" style="font-size:28px;">8:00</div>
            </div>

            <div class="km-clipped-card tilted-right" data-reveal-at="3.9">
              <div class="ref-envelope-title editable-text-node" contenteditable="true" style="font-size:12px; color:#64748B;">កាហ្វេទឹកកក 1 កែវធំ</div>
              <div class="km-dot-pill editable-text-node" contenteditable="true" style="margin-top:4px; font-size:16px;">
                <span class="km-dot gold"></span>650ml • $1.50
              </div>
            </div>
          </div>

          <div class="ref-salary-bar-group" style="position:absolute; top:202px; left:545px; width:380px;">
            <div data-reveal-at="11.8">
              <div class="ref-bar-header">
                <span class="editable-text-node" contenteditable="true">ថាមពលពេលព្រឹក (Caffeine + Sugar)</span>
                <span id="domCounterNum" class="editable-text-node" contenteditable="true" style="color:#2FAA61; font-weight:800;">100%</span>
              </div>
              <div class="ref-bar-track">
                <div class="ref-bar-segment" data-target-width="100%" data-fill-at="12.0" style="width:100%; background:#2FAA61;"></div>
              </div>
            </div>

            <div data-reveal-at="16.2" style="margin-top:10px;" class="km-dot-pill editable-text-node" contenteditable="true">
              <span class="km-dot green"></span>⚡ ស្វាងភ្នែកភ្លាមៗ ប៉ុន្តែជាការខ្ចីថាមពលទុកមុន!
            </div>

            <div id="animHighlightBadge" data-reveal-at="20.5" style="margin-top:8px;" class="km-dot-pill editable-text-node" contenteditable="true">
              <span class="km-dot coral"></span>⚠️ ផឹកទាំងពោះទទេ = អាស៊ីតក្រពះ ↑ + អរម៉ូន Cortisol ↑
            </div>
          </div>

          <div class="director-intro-card" data-broll-window="0.0,3.8" style="top:334px; left:515px; width:410px; opacity:0; pointer-events:none;">
            <div class="intro-kicker">🎬 EPISODE 01 • HEALTHY LIVING SERIES</div>
            <div class="intro-title editable-text-node" contenteditable="true">
              តើមានអ្វីកើតឡើងនៅពេលផឹកកាហ្វេទឹកកកផ្អែមរាល់ថ្ងៃ?
            </div>
          </div>

          <div class="broll-cutaway-card" data-broll-window="20.2,30.8" style="top:334px; left:525px; width:400px; opacity:0; pointer-events:none;">
            <div class="broll-tag">🎞️ B-ROLL MACRO</div>
            <div class="broll-svg-box">
              <svg width="46" height="46" viewBox="0 0 46 46">
                <path d="M16 12 C11 12, 10 22, 14 29 C17 34, 27 36, 31 30 C35 24, 32 15, 25 14 Z" fill="#FEE2E2" stroke="#171717" stroke-width="2.2"/>
                <path d="M15 26 Q23 23 30 26" stroke="#FA604E" stroke-width="2.5" fill="none"/>
                <circle cx="20" cy="29" r="2" fill="#FA604E"/>
                <circle cx="26" cy="28" r="2.2" fill="#FA604E"/>
              </svg>
            </div>
            <div>
              <div class="broll-title editable-text-node" contenteditable="true">ក្រពះទទេ + អាស៊ីតកើនឡើង</div>
              <div class="broll-sub editable-text-node" contenteditable="true">កាហ្វេអ៊ីនជំរុញអរម៉ូនស្ត្រេស Cortisol ឱ្យបេះដូងលោតញាប់</div>
            </div>
          </div>
        `;

      case 'ep01-afternoon-crash':
        return `
          <div class="km-key-tracker">
            <div class="km-key-row">
              <div class="km-key-item done">✓</div>
              <div class="km-key-item active">🔑2</div>
              <div class="km-key-item">3</div>
              <div class="km-key-item">4</div>
              <div class="km-key-item">5</div>
              <div class="km-key-item">6</div>
              <div class="km-key-item">7</div>
            </div>
            <div class="km-key-pill editable-text-node" contenteditable="true">1B. ធ្លាក់ថាមពលម៉ោង 2 រសៀល</div>
          </div>

          <div class="ref-speech-bubble" data-speak-window="10.0,16.8" style="top:64px; left:88px; width:308px; z-index:26; padding:9px 14px; font-size:13.2px; opacity:0; pointer-events:none;">
            <div class="ref-speaker-tag editable-text-node" contenteditable="true">តារា</div>
            <div class="editable-text-node" contenteditable="true">
              ម៉ោង 2 រសៀលទន់ភ្នែកណាស់... ត្រូវរកកាហ្វេផ្អែមកែវទី 2 ទៀតហើយ!
            </div>
            <svg class="ref-bubble-tail" style="left:132px; bottom:-34px; width:24px; height:36px;" viewBox="0 0 24 36">
              <polyline points="2,0 12,34 20,0" fill="#FFFFFF" stroke="#171717" stroke-width="2.2" stroke-linejoin="round" />
            </svg>
          </div>

          <div id="animCardPrimary" data-reveal-at="0.2" data-dock-at="10.0" data-dock-scale="0.80" data-dock-x="0" data-dock-y="-10" style="position:absolute; top:76px; left:545px; display:flex; align-items:center; gap:24px; transition:transform 0.3s ease;">
            <div class="ref-calendar-badge">
              <div class="ref-calendar-ring left"></div>
              <div class="ref-calendar-ring right"></div>
              <div class="ref-calendar-header editable-text-node" contenteditable="true">ពេលរសៀល</div>
              <div class="ref-calendar-day editable-text-node" contenteditable="true" style="font-size:28px;">2:00</div>
            </div>

            <div class="km-clipped-card">
              <div class="editable-text-node" contenteditable="true" style="font-size:15px; font-weight:800; color:#FA604E;">
                ធ្លាក់ជាតិស្ករគំហុក (Reactive Crash)
              </div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; color:#64748B; font-weight:600;">
                កាហ្វេអ៊ីនសាប + អាំងស៊ុយលីនទាញស្ករចុះទាប
              </div>
            </div>
          </div>

          <div class="ref-salary-bar-group" style="position:absolute; top:198px; left:545px; width:380px;">
            <div data-reveal-at="4.2">
              <div class="ref-bar-header">
                <span class="editable-text-node" contenteditable="true">ថាមពលនៅម៉ោង 2:00 រសៀល</span>
                <span id="domCounterNum" class="editable-text-node" contenteditable="true" style="color:#FA604E; font-weight:800;">15%</span>
              </div>
              <div class="ref-bar-track">
                <div class="ref-bar-segment" data-target-width="15%" data-fill-at="4.3" style="width:15%; background:#FA604E;"></div>
                <div class="ref-bar-segment coral-hatch" data-target-width="85%" data-fill-at="4.3" style="width:85%;"></div>
              </div>
            </div>

            <div class="ref-expense-icons-row" style="margin-top:16px;">
              <div class="ref-essential-group" data-reveal-at="10.1">
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <span class="km-dot-pill editable-text-node" contenteditable="true" style="font-size:12px;"><span class="km-dot coral"></span>🥱 ងងុយគេង និងវិលមុខ</span>
                  <span class="km-dot-pill editable-text-node" contenteditable="true" style="font-size:12px;"><span class="km-dot gold"></span>🍩 ឃ្លានផ្អែមកែវទី 2</span>
                </div>
              </div>
              <div id="animHighlightBadge" class="ref-leftover-group" data-reveal-at="17.2">
                <div class="km-stamp-badge editable-text-node" contenteditable="true">ស្ករ = អន្ទាក់!</div>
              </div>
            </div>
          </div>

          <div class="broll-cutaway-card" data-broll-window="10.0,27.5" style="top:334px; left:525px; width:400px; opacity:0; pointer-events:none;">
            <div class="broll-tag">🎞️ B-ROLL CUTAWAY</div>
            <div class="broll-svg-box">
              <svg width="46" height="46" viewBox="0 0 46 46">
                <rect x="8" y="14" width="26" height="18" rx="4" fill="#FEE2E2" stroke="#171717" stroke-width="2.2"/>
                <rect x="34" y="19" width="4" height="8" rx="1" fill="#171717"/>
                <rect x="11" y="17" width="6" height="12" rx="2" fill="#FA604E"/>
              </svg>
            </div>
            <div>
              <div class="broll-title editable-text-node" contenteditable="true">បាតុភូត Afternoon Sugar Crash</div>
              <div class="broll-sub editable-text-node" contenteditable="true">ខួរក្បាលខ្វះគ្លុយកូសភ្លាមៗ បង្ខំឱ្យឃ្លានកាហ្វេផ្អែមកែវទី 2</div>
            </div>
          </div>
        `;

      case 'ep01-sugar-xray':
        return `
          <div class="ref-speech-bubble" data-speak-window="8.8,16.5" style="top:66px; left:68px; width:292px; z-index:26; padding:9px 14px; font-size:13px; opacity:0; pointer-events:none;">
            <div class="ref-speaker-tag editable-text-node" contenteditable="true">តារា</div>
            <div class="editable-text-node" contenteditable="true">
              កាហ្វេ 1 កែវមានស្ករដល់ទៅ 11 ស្លាបព្រា (45g) លើសកម្រិត 180%?!
            </div>
            <svg class="ref-bubble-tail" style="left:118px; bottom:-34px; width:24px; height:36px;" viewBox="0 0 24 36">
              <polyline points="2,0 12,34 20,0" fill="#FFFFFF" stroke="#171717" stroke-width="2.2" stroke-linejoin="round" />
            </svg>
          </div>

          <div class="km-key-tracker">
            <div class="km-key-row">
              <div class="km-key-item done">✓</div>
              <div class="km-key-item active">🔑2</div>
              <div class="km-key-item">3</div>
              <div class="km-key-item">4</div>
              <div class="km-key-item">5</div>
              <div class="km-key-item">6</div>
              <div class="km-key-item">7</div>
            </div>
            <div class="km-key-pill editable-text-node" contenteditable="true">2. ឆ្លុះមើលជាតិស្ករ 45g</div>
          </div>

          <div id="animCardPrimary" class="km-clipped-card" style="position:absolute; top:76px; left:520px; width:405px; transition:transform 0.3s ease;">
            <div style="margin-bottom:14px;" data-reveal-at="0.2">
              <div class="ref-bar-header" style="font-size:14.5px;">
                <span class="editable-text-node" contenteditable="true">កម្រិតសុវត្ថិភាពប្រចាំថ្ងៃ (WHO)</span>
                <span class="editable-text-node" contenteditable="true" style="color:#2FAA61; font-weight:800;">≤ 25g (6 ស្លាបព្រា)</span>
              </div>
              <div class="ref-bar-track" style="height:24px;">
                <div class="ref-bar-segment" data-target-width="55%" data-fill-at="0.4" style="width:55%; background:#2FAA61;"></div>
              </div>
            </div>

            <div data-reveal-at="8.6">
              <div class="ref-bar-header" style="font-size:14.5px;">
                <span class="editable-text-node" contenteditable="true">កាហ្វេទឹកកកផ្អែម 1 កែវ (350 kcal)</span>
                <span id="domCounterNum" class="editable-text-node" contenteditable="true" style="color:#FA604E; font-weight:800;">45g (11 ស្លាបព្រា)</span>
              </div>
              <div class="ref-bar-track" style="height:30px;">
                <div class="ref-bar-segment" data-target-width="55%" data-fill-at="8.8" style="width:55%; background:#FA604E;"></div>
                <div class="ref-bar-segment coral-hatch" data-target-width="45%" data-fill-at="8.8" style="width:45%;"></div>
              </div>
            </div>

            <div id="animHighlightBadge" data-reveal-at="18.0" style="margin-top:12px; display:flex; align-items:center; justify-content:space-between;">
              <span class="km-stamp-badge editable-text-node" contenteditable="true">លើសកម្រិត 180%!</span>
              <span class="km-dot-pill editable-text-node" contenteditable="true">
                <span class="km-dot gold"></span>30 ថ្ងៃ = ស្ករ 1.35 kg
              </span>
            </div>

            <div data-reveal-at="23.5" style="margin-top:10px;" class="km-dot-pill editable-text-node" contenteditable="true">
              <span class="km-dot blue"></span>💧 ស្កររាវ = 0g Fiber (ជ្រាបចូលឈាមក្នុង 15 នាទី!)
            </div>
          </div>

          <div class="broll-cutaway-card" data-broll-window="23.3,30.2" style="top:338px; left:520px; width:405px; opacity:0; pointer-events:none;">
            <div class="broll-tag">🎞️ B-ROLL MACRO</div>
            <div class="broll-svg-box">
              <svg width="46" height="46" viewBox="0 0 46 46">
                <rect x="6" y="16" width="34" height="14" rx="7" fill="#FEE2E2" stroke="#171717" stroke-width="2"/>
                <circle cx="15" cy="23" r="3.5" fill="#FA604E"/>
                <circle cx="24" cy="21" r="3" fill="#FFFFFF" stroke="#171717" stroke-width="1.5"/>
                <circle cx="32" cy="24" r="3" fill="#FFFFFF" stroke="#171717" stroke-width="1.5"/>
              </svg>
            </div>
            <div>
              <div class="broll-title editable-text-node" contenteditable="true">ស្កររាវគ្មានសរសៃ Fiber (0g)</div>
              <div class="broll-sub editable-text-node" contenteditable="true">ជ្រាបចូលសរសៃឈាមលឿនដូចចាក់បញ្ចូលគ្លុយកូសក្នុង 15 នាទី</div>
            </div>
          </div>
        `;

      case 'ep01-glucose-curve':
        return `
          <div class="km-key-tracker">
            <div class="km-key-row">
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item active">🔑3</div>
              <div class="km-key-item">4</div>
              <div class="km-key-item">5</div>
              <div class="km-key-item">6</div>
              <div class="km-key-item">7</div>
            </div>
            <div class="km-key-pill editable-text-node" contenteditable="true">3. រយៈពេល 120 នាទី</div>
          </div>

          <div id="animCardPrimary" style="position:absolute; top:78px; left:365px; width:555px; transition:transform 0.3s ease;">
            <div class="editable-text-node" contenteditable="true" style="font-size:17.5px; font-weight:800; color:#171717; margin-bottom:6px;">
              ក្រាហ្វជាតិស្ករ អាដេណូស៊ីន និងអាំងស៊ុយលីន (120 នាទី)
            </div>

            <svg width="545" height="220" viewBox="0 0 545 220" style="overflow:visible;">
              <!-- Grid & Baseline -->
              <line x1="30" y1="135" x2="520" y2="135" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 4" />
              <text x="525" y="139" fill="#64748B" font-size="11" font-weight="700">កម្រិតធម្មតា</text>
              <line x1="30" y1="25" x2="30" y2="195" stroke="#171717" stroke-width="2.5" />
              <line x1="30" y1="195" x2="520" y2="195" stroke="#171717" stroke-width="2.5" />

              <!-- Blood Sugar Rollercoaster Curve (#FA604E) -->
              <path d="M 30 135 C 85 130, 115 28, 165 28 C 225 28, 285 182, 375 182 C 435 182, 475 165, 510 155"
                    fill="none" stroke="#FA604E" stroke-width="4.5" stroke-linecap="round" />

              <!-- Pancreas Insulin Wave (#5D98E8) -->
              <path data-reveal-at="9.8" d="M 30 155 C 120 155, 195 58, 255 58 C 315 58, 365 145, 510 150"
                    fill="none" stroke="#5D98E8" stroke-width="3.5" class="km-dashed-stream" stroke-linecap="round" />

              <!-- Key Points -->
              <circle cx="165" cy="28" r="7" fill="#FA604E" stroke="#171717" stroke-width="2" />
              <circle data-reveal-at="9.8" cx="255" cy="58" r="7" fill="#5D98E8" stroke="#171717" stroke-width="2" />
              <circle data-reveal-at="22.7" cx="375" cy="182" r="7" fill="#FA604E" stroke="#171717" stroke-width="2" />
            </svg>

            <div data-reveal-at="0.3" class="km-dot-pill editable-text-node" contenteditable="true" style="position:absolute; top:32px; left:105px; font-size:12px;">
              <span class="km-dot coral"></span>នាទីទី 30៖ បិទ Adenosine + ស្ករស្ទុះខ្ពស់
            </div>

            <div data-reveal-at="9.8" class="km-dot-pill editable-text-node" contenteditable="true" style="position:absolute; top:66px; left:245px; font-size:12px;">
              <span class="km-dot blue"></span>នាទីទី 60៖ អាំងស៊ុយលីន → ខ្លាញ់ក្បាលពោះ/ថ្លើម
            </div>

            <div id="animHighlightBadge" data-reveal-at="22.7" class=" editable-text-node" contenteditable="true" style="position:absolute; top:216px; left:255px; background:#FA604E; color:#FFFFFF; border:2px solid #171717; padding:3px 12px; border-radius:999px; font-size:12.5px; font-weight:700;">
              នាទីទី 120៖ ធ្លាក់ស្ករក្រោមបន្ទាត់ធម្មតា (ងងុយគេងម៉ោង 2 រសៀល)
            </div>
          </div>

          <div class="broll-cutaway-card" data-broll-window="9.8,22.2" style="top:334px; left:495px; width:425px; opacity:0; pointer-events:none;">
            <div class="broll-tag">🎞️ B-ROLL ORGAN</div>
            <div class="broll-svg-box">
              <svg width="46" height="46" viewBox="0 0 46 46">
                <path d="M10 26 C10 15, 24 14, 35 20 C38 22, 37 31, 28 32 C19 33, 10 31, 10 26 Z" fill="#FEF3C7" stroke="#171717" stroke-width="2.2"/>
                <circle cx="20" cy="24" r="3" fill="#5D98E8"/>
                <circle cx="28" cy="25" r="2.5" fill="#FA604E"/>
              </svg>
            </div>
            <div>
              <div class="broll-title editable-text-node" contenteditable="true">លំពែងបញ្ចេញអាំងស៊ុយលីនគំហុក</div>
              <div class="broll-sub editable-text-node" contenteditable="true">បម្លែងស្ករលើសក្នុងឈាម ទៅជាខ្លាញ់រុំថ្លើម និងក្បាលពោះ</div>
            </div>
          </div>
        `;

      case 'ep01-caffeine-sleep':
        return `
          <div class="km-key-tracker">
            <div class="km-key-row">
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item active">🔑4</div>
              <div class="km-key-item">5</div>
              <div class="km-key-item">6</div>
              <div class="km-key-item">7</div>
            </div>
            <div class="km-key-pill editable-text-node" contenteditable="true">4. កាហ្វេអ៊ីន 6 ម៉ោង</div>
          </div>

          <div id="animCardPrimary" class="km-clipped-card" style="position:absolute; top:70px; left:500px; width:425px; transition:transform 0.3s ease;">
            <div class="editable-text-node" contenteditable="true" style="font-size:16.5px; font-weight:800; color:#171717; margin-bottom:12px;">
              អាយុកាលកាហ្វេអ៊ីន 6 ម៉ោង (Half-Life 50%) និងដំណេកជ្រៅ
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:12px;">
              <div data-reveal-at="0.3" class="km-counter-card" style="flex:1; align-items:center;">
                <div class="km-counter-header blue editable-text-node" contenteditable="true" style="align-self:center;">• ផឹកកែវទី 2</div>
                <div class="editable-text-node" contenteditable="true" style="font-size:17px; font-weight:800; color:#171717;">2:00 រសៀល</div>
                <div class="editable-text-node" contenteditable="true" style="font-size:11.5px; font-weight:700; color:#2FAA61;">កាហ្វេអ៊ីន 100%</div>
              </div>

              <div data-reveal-at="15.3" style="font-size:18px; font-weight:800; color:#171717;">➔</div>

              <div data-reveal-at="15.3" class="km-counter-card" style="flex:1; align-items:center;">
                <div class="km-counter-header coral editable-text-node" contenteditable="true" style="align-self:center;">• +6 ម៉ោង</div>
                <div class="editable-text-node" contenteditable="true" style="font-size:17px; font-weight:800; color:#171717;">8:00 យប់</div>
                <div id="domCounterNum" class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#FA604E;">នៅសល់ 50%!</div>
              </div>

              <div data-reveal-at="19.3" style="font-size:18px; font-weight:800; color:#171717;">➔</div>

              <div data-reveal-at="19.3" class="km-counter-card" style="flex:1; align-items:center;">
                <div class="km-counter-header gold editable-text-node" contenteditable="true" style="align-self:center;">• +12 ម៉ោង</div>
                <div class="editable-text-node" contenteditable="true" style="font-size:17px; font-weight:800; color:#171717;">2:00 ភ្លឺ</div>
                <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#92400E;">នៅសល់ 25%!</div>
              </div>
            </div>

            <div data-reveal-at="23.8" class="km-dot-pill editable-text-node" contenteditable="true" style="margin-bottom:8px; font-size:12px;">
              <span class="km-dot blue"></span>🧠 កាត់បន្ថយ «ដំណេកជ្រៅ» 20%–30% នៅពេលយប់
            </div>

            <div id="animHighlightBadge" data-reveal-at="29.8" class="ref-coral-pill editable-text-node" contenteditable="true" style="display:inline-block;">
              ⚠️ ភ្ញាក់ឡើងអស់កម្លាំង ➔ ត្រូវពឹងកាហ្វេផ្អែមវិលជុំ!
            </div>
          </div>

          <div class="broll-cutaway-card" data-broll-window="23.6,35.2" style="top:338px; left:500px; width:425px; opacity:0; pointer-events:none;">
            <div class="broll-tag">🎞️ B-ROLL BRAIN WAVE</div>
            <div class="broll-svg-box">
              <svg width="46" height="46" viewBox="0 0 46 46">
                <polyline points="4,24 12,12 18,34 24,15 31,31 37,20 42,24" fill="none" stroke="#5D98E8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <div class="broll-title editable-text-node" contenteditable="true">រំខានរលកខួរក្បាល Deep Sleep 20%–30%</div>
              <div class="broll-sub editable-text-node" contenteditable="true">រាងកាយមិនបានជួសជុលកោសិកាពេញលេញនៅពេលយប់</div>
            </div>
          </div>
        `;

      case 'ep01-longterm-risks':
        return `
          <div class="km-key-tracker">
            <div class="km-key-row">
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item active">🔑5</div>
              <div class="km-key-item">6</div>
              <div class="km-key-item">7</div>
            </div>
            <div class="km-key-pill editable-text-node" contenteditable="true">5. ផលប៉ះពាល់ 1 ឆ្នាំ</div>
          </div>

          <div id="animCardPrimary" style="position:absolute; top:72px; left:380px; width:540px; display:flex; flex-direction:column; gap:10px; transition:transform 0.3s ease;">
            <div style="display:flex; gap:12px;">
              <div data-reveal-at="0.3" class="km-counter-card" style="flex:1;">
                <div class="km-counter-header gold editable-text-node" contenteditable="true">• 30 ថ្ងៃ (1 ខែ)</div>
                <div class="km-counter-value editable-text-node" contenteditable="true">ស្ករសុទ្ធ 1.35 kg</div>
              </div>
              <div data-reveal-at="8.2" class="km-counter-card" style="flex:1;">
                <div class="km-counter-header coral editable-text-node" contenteditable="true">• 365 ថ្ងៃ (1 ឆ្នាំ)</div>
                <div id="domCounterNum" class="km-counter-value editable-text-node" contenteditable="true" style="color:#FA604E;">ស្ករ 16.4 kg (+4–5 kg ខ្លាញ់)</div>
              </div>
            </div>

            <div data-reveal-at="13.2" class="km-clipped-card" style="padding:8px 13px;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13.5px; font-weight:800; color:#991B1B;">
                1. ខ្លាញ់រុំថ្លើម និងដុះក្បាលពោះ (Visceral Fat & Fatty Liver)
              </div>
            </div>

            <div data-reveal-at="18.9" style="background:#FFFFFF; border:2.2px solid #EABF42; border-radius:10px; padding:8px 13px;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13.5px; font-weight:800; color:#92400E;">
                2. ប្រតិកម្មស្ករ AGEs បំផ្លាញសរសៃ Collagen (ស្បែកមុខឆាប់ជ្រួញ និងឡើងមុន)
              </div>
            </div>

            <div id="animHighlightBadge" data-reveal-at="25.2" style="background:#FEE2E2; border:2.2px solid #171717; border-radius:10px; padding:8px 13px; display:flex; justify-content:space-between; align-items:center;">
              <span class="editable-text-node" contenteditable="true" style="font-size:13.5px; font-weight:800; color:#991B1B;">
                3. ស៊ាំនឹងអាំងស៊ុយលីន ➔ ជំងឺទឹកនោមផ្អែមប្រភេទ 2 + ខាតលុយ $540–$1,080/ឆ្នាំ!
              </span>
            </div>
          </div>

          <div class="broll-cutaway-card" data-broll-window="18.8,31.2" style="top:338px; left:490px; width:430px; opacity:0; pointer-events:none;">
            <div class="broll-tag">🎞️ B-ROLL COLLAGEN</div>
            <div class="broll-svg-box">
              <svg width="46" height="46" viewBox="0 0 46 46">
                <line x1="8" y1="14" x2="38" y2="14" stroke="#2FAA61" stroke-width="2.5"/>
                <polyline points="8,28 18,23 24,33 32,22 38,30" fill="none" stroke="#FA604E" stroke-width="2.5"/>
              </svg>
            </div>
            <div>
              <div class="broll-title editable-text-node" contenteditable="true">ប្រតិកម្មស្ករ Glycation (AGEs)</div>
              <div class="broll-sub editable-text-node" contenteditable="true">ម៉ូលេគុលស្ករភ្ជាប់ជាមួយសរសៃកូឡាជែន ធ្វើឱ្យស្បែកបាត់បង់ភាពยืดหยุ่น</div>
            </div>
          </div>
        `;

      case 'ep01-cafe-matrix':
        return `
          <div class="km-key-tracker">
            <div class="km-key-row">
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item active">🔑6</div>
              <div class="km-key-item">7</div>
            </div>
            <div class="km-key-pill editable-text-node" contenteditable="true">6. តារាងកាហ្វេ 4 កម្រិត</div>
          </div>

          <div id="animCardPrimary" class="km-clipped-card" style="position:absolute; top:66px; left:380px; width:540px; display:flex; flex-direction:column; gap:8px; transition:transform 0.3s ease;">
            <div class="editable-text-node" contenteditable="true" style="font-size:16.5px; font-weight:800; color:#171717;">
              តារាងប្រៀបធៀបការកុម្ម៉ង់កាហ្វេទាំង 4 កម្រិត (650ml)
            </div>

            <div data-reveal-at="0.3" style="display:flex; align-items:center; justify-content:space-between; background:#FEE2E2; border:2px solid #FA604E; border-radius:9px; padding:6px 12px;">
              <span class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#991B1B;">❌ កាហ្វេទឹកដោះគោខាប់ 100% (ធម្មតា)</span>
              <span class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#FA604E;">ស្ករ 45g (11 ស្លាបព្រា • 350 kcal)</span>
            </div>

            <div data-reveal-at="4.5" style="display:flex; align-items:center; justify-content:space-between; background:#FEF3C7; border:2px solid #EABF42; border-radius:9px; padding:6px 12px;">
              <span class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#92400E;">⚠️ កាហ្វេទឹកដោះគោខាប់ ផ្អែម 50% (សប្តាហ៍ទី 1)</span>
              <span class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#92400E;">ស្ករ 22g (5.5 ស្លាបព្រា • 210 kcal)</span>
            </div>

            <div data-reveal-at="10.4" style="display:flex; align-items:center; justify-content:space-between; background:#E6F4EA; border:2.4px solid #2FAA61; border-radius:9px; padding:7px 12px;">
              <span class="editable-text-node" contenteditable="true" style="font-size:13.5px; font-weight:800; color:#1E7E45;">✅ កាហ្វេទឹកដោះគោស្រស់ ផ្អែម 25% (សប្តាហ៍ទី 2)</span>
              <span id="domCounterNum" class="km-stamp-badge green editable-text-node" contenteditable="true" style="font-size:12px;">ស្ករ 6g–8g (កាត់ស្ករ 80%!)</span>
            </div>

            <div data-reveal-at="15.8" style="display:flex; align-items:center; justify-content:space-between; background:#DBEAFE; border:2px solid #5D98E8; border-radius:9px; padding:6px 12px;">
              <span class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#1E40AF;">💎 កាហ្វេខ្មៅ Americano / ឡាតេ 0% ស្ករ</span>
              <span class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#1E40AF;">ស្ករ 0g • ការពារថ្លើម និងខួរក្បាល!</span>
            </div>

            <div id="animHighlightBadge" data-reveal-at="23.2" class="km-dot-pill editable-text-node" contenteditable="true" style="align-self:flex-start; font-size:12px;">
              <span class="km-dot gold"></span>👅 គ្រាប់ពករសជាតិលើអណ្តាត ប្រើពេលតែ 10–14 ថ្ងៃដើម្បីស៊ាំនឹងរសជាតិផ្អែមតិច!
            </div>
          </div>

          <div class="broll-cutaway-card" data-broll-window="23.0,31.6" style="top:340px; left:490px; width:430px; opacity:0; pointer-events:none;">
            <div class="broll-tag">🎞️ B-ROLL TASTE BUDS</div>
            <div class="broll-svg-box">
              <svg width="46" height="46" viewBox="0 0 46 46">
                <path d="M13 18 Q23 38 33 18 Z" fill="#FCA5A5" stroke="#171717" stroke-width="2.2"/>
                <circle cx="20" cy="23" r="2" fill="#2FAA61"/>
                <circle cx="26" cy="23" r="2" fill="#2FAA61"/>
                <circle cx="23" cy="28" r="2" fill="#2FAA61"/>
              </svg>
            </div>
            <div>
              <div class="broll-title editable-text-node" contenteditable="true">ការផ្លាស់ប្តូរកោសិការសជាតិ (10–14 ថ្ងៃ)</div>
              <div class="broll-sub editable-text-node" contenteditable="true">អណ្តាតនឹងចាប់ផ្តើមដឹងរសជាតិឈ្ងុយធម្មជាតិនៃគ្រាប់កាហ្វេ និងទឹកដោះគោស្រស់</div>
            </div>
          </div>
        `;

      case 'ep01-smart-swap':
        return `
          <div class="km-key-tracker">
            <div class="km-key-row">
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item done">✓</div>
              <div class="km-key-item active">🔑7</div>
            </div>
            <div class="km-key-pill editable-text-node" contenteditable="true">7. ក្បួនសុខភាព 4 ចំណុច</div>
          </div>

          <div data-speak-window="0.2,6.6" class="ref-speech-bubble" style="top:68px; left:96px; width:318px; z-index:26; padding:9px 14px; font-size:13.5px; opacity:0; pointer-events:none;">
            <div class="ref-speaker-tag editable-text-node" contenteditable="true">តារា</div>
            <div class="editable-text-node" contenteditable="true">
              បងណារី! ឥឡូវខ្ញុំប្តូរមកកាហ្វេទឹកដោះគោស្រស់ ផ្អែមត្រឹម 25% ហើយ!
            </div>
            <svg class="ref-bubble-tail" style="left:156px; bottom:-34px; width:24px; height:36px;" viewBox="0 0 24 36">
              <polyline points="2,0 12,34 20,0" fill="#FFFFFF" stroke="#171717" stroke-width="2.2" stroke-linejoin="round" />
            </svg>
          </div>

          <div id="animCardPrimary" style="position:absolute; top:62px; left:448px; width:465px; display:flex; flex-direction:column; gap:7px; transition:transform 0.3s ease;">
            <div class="editable-text-node" contenteditable="true" style="font-size:16.5px; font-weight:800; color:#171717;">
              ក្បួនកាហ្វេសុខភាព 4 ចំណុច (Smart Coffee Protocol)
            </div>

            <div class="km-check-row active-check" data-check-at="11.0" style="background:#E6F4EA; border-color:#2FAA61;">
              <div class="km-check-box">✓</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.8px; font-weight:800; color:#1E7E45;">
                1. ប្តូរមកទឹកដោះគោស្រស់ + បន្ថយផ្អែម 50% ➔ 25% (កាត់ស្ករ 80%)
              </div>
            </div>

            <div class="km-check-row active-check" data-check-at="16.0" style="background:#DBEAFE; border-color:#5D98E8;">
              <div class="km-check-box">✓</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.8px; font-weight:800; color:#1E40AF;">
                2. កុំផឹកទាំងពោះទទេ! ផឹកក្រោយអាហារពេលព្រឹក និងឈប់មុនម៉ោង 12 ថ្ងៃត្រង់
              </div>
            </div>

            <div class="km-check-row active-check" data-check-at="20.4" style="background:#DBEAFE; border-color:#5D98E8;">
              <div class="km-check-box">✓</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.8px; font-weight:800; color:#1E40AF;">
                3. ផឹកទឹកឆ្អិន 1 កែវ (300ml) អមជាមួយកាហ្វេ 1 កែវជានិច្ច
              </div>
            </div>

            <div id="animHighlightBadge" class="km-check-row active-check" data-check-at="23.7" style="background:#FEF3C7; border-color:#EABF42;">
              <div class="km-check-box">✓</div>
              <span class="editable-text-node" contenteditable="true" style="font-size:12.8px; font-weight:800; color:#92400E;">
                4. ទុកកាហ្វេទឹកដោះគោខាប់ផឹកលេង 1 ដង/សប្តាហ៍ (សន្សំបាន $30–$45/ខែ!)
              </span>
            </div>
          </div>

          <div class="director-outro-card" data-broll-window="26.5,35.6" style="top:328px; left:448px; width:465px; opacity:0; pointer-events:none;">
            <div>
              <div class="outro-quote editable-text-node" contenteditable="true">«កាហ្វេមិនមែនជាបញ្ហាទេ ស្ករទើបជាអន្ទាក់!»</div>
              <div class="outro-sub editable-text-node" contenteditable="true">សុខភាពល្អ + សន្សំលុយ $360–$540 ក្នុង 1 ឆ្នាំ</div>
            </div>
            <div class="outro-cta-pill editable-text-node" contenteditable="true">🔔 Subscribe & Share</div>
          </div>
        `;

      default:
        return '';
    }
  }

  return {
    SHOTS,
    renderInfographic
  };
})();
