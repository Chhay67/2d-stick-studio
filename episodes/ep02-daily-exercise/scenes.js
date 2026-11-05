/**
 * Episode 02: អត្ថប្រយោជន៍នៃការហាត់ប្រាណ ៣០ នាទី ក្នុង ១ ថ្ងៃ (The 30-Minute Daily Exercise Habit)
 * Pillar: Healthy Living (Food, Nutrition, Exercise) — Simple, Relatable & Hook/Catch Driven
 *
 * ZERO EPISODE CLONING ARCHITECTURE:
 * - Custom EP02 Stage Hero Props: Rusty Spinal Chair + Gear (Shot 01), Body Battery Supercharger (Shot 02), Leg Muscle Sponge (Shot 04)
 * - Custom EP02 Hand Props & Gestures: stretch-arms, hold-water, hold-dumbbell, jog-energetic
 * - 8 Topic-Unique Concept Displays (Dual-Dial Rusty/Battery Dashboard, 24h Pie Clock + VS Battle Card,
 *   Dual-Hemisphere Brain Scanner, 2-Path Sugar Pipeline, Moon Sleep + Skin Pore Detox, 3-Organ Armor Shield + Piggy Bank,
 *   2x2 Illustrated $0 Exercise Grid, and 30-Day Trophy Habit Staircase)
 * - Episode-Scoped Dynamic Asset Library (ASSETS & derived usage)
 */

window.EP02_DAILY_EXERCISE = (function () {
  const EPISODE_TRANSITION = 'wipe';

  // ===========================================================================
  // MULTI-VOICE CAST (EP02) — each speaker has their own voice; narrator only sets scenes / examples / hooks
  // ===========================================================================
  const VOICES = {
    N: { voiceId: 'VOICE-NARRATOR-001', slug: 'narrator', label: 'អ្នកនិទាន', actorId: null, base: 'existing studio voice' },
    V: { voiceId: 'VOICE-CAST-01', slug: 'vichetr', label: 'វិចិត្រ', actorId: 'char_vichetr', base: 'Puck' },
    S: { voiceId: 'VOICE-CAST-02', slug: 'sophea', label: 'គ្រូពេទ្យ សុភា', actorId: 'char_sophea', base: 'Aoede' },
    P: { voiceId: 'VOICE-CAST-03', slug: 'samnang', label: 'ពូសំណាង', actorId: 'char_samnang', base: 'Charon' }
  };

  const STYLE_EMOTION = {
    curious: 'thinking', reassuring: 'calm', explaining: 'calm', encouraging: 'happy', warm: 'happy',
    sleepy: 'tired', serious: 'determined', teasing: 'happy', cheerful: 'happy', tired: 'tired',
    surprised: 'surprised', worried: 'worried', happy: 'happy', proud: 'proud', sad: 'sad',
    determined: 'determined', inspiring: 'proud', yawning: 'tired', 'bridge hook': 'thinking'
  };

  /**
   * L(speaker, beat, style, spokenKhmer, opts) → one voice line.
   * opts: text (on-screen Khmer with digits), dur (estimate, s), emo, ges, acts (per-actor reactions)
   */
  function L(spk, beat, style, spoken, opts = {}) {
    const v = VOICES[spk];
    const isChar = !!v.actorId;
    return {
      speaker: spk,
      voiceId: v.voiceId,
      voiceSlug: v.slug,
      speakerLabel: opts.label || v.label,
      actorId: isChar ? v.actorId : null,
      beat,
      style,
      spoken,
      text: opts.text || spoken,
      dur: opts.dur || Math.max(2.2, Number((spoken.length / 15).toFixed(1))),
      emotion: opts.emo || STYLE_EMOTION[style] || 'happy',
      gesture: opts.ges || (isChar ? 'explain' : undefined),
      acts: opts.acts
    };
  }

  const CAM = [
    { at: 0.0, zoom: 1.0, panX: 0, panY: 0 },
    { at: 8.0, zoom: 1.03, panX: -6, panY: -2 },
    { at: 18.0, zoom: 1.0, panX: 0, panY: 0 }
  ];

  function actor(id, name, base, extra) {
    return Object.assign({ id, name, y: 430, speakWindows: [] }, base, extra);
  }
  const A_V = { style: 'minimal', hair: 'short-spiky' };
  const A_S = { style: 'outfitted', hair: 'top-bun-glasses', outfit: 'teal-health' };
  const A_P = { style: 'outfitted', hair: 'curly-clerk', outfit: 'blue-orange-bag' };

  const SHOTS = [
    // =========================================================================
    // CH.1 PROBLEM — Shot 01 • Office 5 PM
    // =========================================================================
    {
      id: 'ep02_shot_01',
      assets: ["elem:ep02_rusty_battery_dashboard","prop:ep02_top_center_header","prop:ep02_rusty_spinal_chair","prop:office_desk_laptop","item:ep02_rusty_gear_icon"],
      title: 'Shot 01 • Ch.1 ម៉ោង 5 ល្ងាច ហត់ទាំងអង្គុយ',
      chapterTitle: 'ជំពូកទី ១៖ បញ្ហា — អង្គុយយូរ ហត់អស់ថ្ម',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'curious',
      mode: 'HYBRID',
      sceneType: 'ep02-rusty-sitting',
      location: 'office',
      voiceDir: 'episodes/ep02-daily-exercise/audio/voice/shot_01',
      cameraBeats: CAM,
      actors: [
        actor('char_vichetr', 'វិចិត្រ (Vichetr)', A_V, {
          x: 210, sitOnChair: true, emotion: 'tired', gesture: 'sit-type', angle: 'front', headLook: 'right'
        })
      ],
      lines: [
        L('N', 'STORY', 'curious', 'ម៉ោងប្រាំល្ងាចហើយ… វិចិត្រអង្គុយធ្វើការអស់ប្រាំបីម៉ោងពេញ ដោយមិនបានលើកអ្វីធ្ងន់សោះ។',
          { text: 'ម៉ោង 5 ល្ងាចហើយ… វិចិត្រអង្គុយធ្វើការអស់ 8 ម៉ោងពេញ ដោយមិនបានលើកអ្វីធ្ងន់សោះ។' }),
        L('V', 'PROBLEM', 'tired', 'អូយ… ឈឺចង្កេះ ចុករោយក ហើយអស់កម្លាំងដូចអស់ថ្ម! ខ្ញុំគ្រាន់តែអង្គុយទេតើ ម៉េចក៏ហត់ម្ល៉េះ?',
          { ges: 'stretch-arms' }),
        L('S', 'DIALOGUE', 'reassuring', 'វិចិត្រ អង្គុយយូរពេក ឈាមរត់យឺត សាច់ដុំរឹង ដូចម៉ូតូទុកចោលយូរ ឆាប់ច្រេះអ៊ីចឹងហើយ។',
          { label: 'គ្រូពេទ្យ សុភា (ទូរស័ព្ទ)', ges: 'explain', acts: { char_vichetr: { emotion: 'worried', gesture: 'stress' } } }),
        L('V', 'DIALOGUE', 'surprised', 'ហា៎? ម៉ូតូទុកចោលមែនទេ? ចុះខ្ញុំត្រូវធ្វើយ៉ាងម៉េច?', { ges: 'stress' }),
        L('S', 'DIALOGUE', 'warm', 'ល្ងាចនេះមកជួបខ្ញុំនៅសួនច្បារ។ ខ្ញុំនឹងបង្ហាញអ្នកថា ចំណាយពេលតិចតួច ក៏អាចសាកថ្មរាងកាយបាន។',
          { label: 'គ្រូពេទ្យ សុភា (ទូរស័ព្ទ)', acts: { char_vichetr: { emotion: 'thinking', gesture: 'think' } } }),
        L('N', 'HOOK', 'bridge hook', 'តើពេលវេលាតិចតួចប៉ុណ្ណា ដែលអាចប្តូរថាមពលរបស់វិចិត្របាន?')
      ]
    },

    // =========================================================================
    // CH.1 MYTH — Shot 02 • Park
    // =========================================================================
    {
      id: 'ep02_shot_02',
      assets: ["elem:ep02_two_percent_clock","prop:ep02_body_battery_charger","prop:ep02_water_bottle_hand"],
      title: 'Shot 02 • Ch.1 «គ្មានពេល» ទល់នឹង 2% នៃថ្ងៃ',
      chapterTitle: 'ជំពូកទី ១៖ លេស «គ្មានពេល» និងរូបមន្ត 2%',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'story',
      mode: 'HYBRID',
      sceneType: 'ep02-two-percent-rule',
      formatCamera: { '9:16': { offsetY: 75 }, '1:1': { offsetY: 65 } },
      location: 'park',
      voiceDir: 'episodes/ep02-daily-exercise/audio/voice/shot_02',
      cameraBeats: CAM,
      actors: [
        actor('char_samnang', 'ពូសំណាង (58yo Runner)', A_P, {
          x: 92, scale: 0.92, emotion: 'excited', gesture: 'jog-energetic', angle: 'three-quarter', headLook: 'right'
        }),
        actor('char_vichetr', 'វិចិត្រ (Vichetr)', A_V, {
          x: 192, scale: 0.94, emotion: 'surprised', gesture: 'idle', angle: 'three-quarter', headLook: 'left'
        }),
        actor('char_sophea', 'គ្រូពេទ្យ សុភា (Dr. Sophea)', A_S, {
          x: 298, scale: 0.95, emotion: 'happy', gesture: 'hold-water', angle: 'front', headLook: 'left'
        })
      ],
      lines: [
        L('N', 'STORY', 'curious', 'នៅសួនច្បារ វិចិត្រឃើញពូសំណាង អាយុហាសិបប្រាំបីឆ្នាំ កំពុងរត់យ៉ាងស្វាហាប់។',
          { text: 'នៅសួនច្បារ វិចិត្រឃើញពូសំណាង អាយុ 58 ឆ្នាំ កំពុងរត់យ៉ាងស្វាហាប់។' }),
        L('V', 'PROBLEM', 'surprised', 'ពូ! ពូអាយុច្រើនជាងខ្ញុំ ម៉េចមានកម្លាំងជាងខ្ញុំ? ខ្ញុំធ្វើការហត់ គ្មានពេលហាត់ទេ!',
          { ges: 'stress', acts: { char_samnang: { emotion: 'happy', gesture: 'jog-energetic' } } }),
        L('P', 'DIALOGUE', 'cheerful', 'ហាហា! ពូក៏ធ្លាប់និយាយបែបអ៊ីចឹងដែរ។ គ្រូពេទ្យសុភាបង្រៀនថា ដើរតែសាមសិបនាទីក៏បានហើយ។',
          { text: 'ហាហា! ពូក៏ធ្លាប់និយាយបែបអ៊ីចឹងដែរ។ គ្រូពេទ្យសុភាបង្រៀនថា ដើរតែ 30 នាទីក៏បានហើយ។', ges: 'celebrate' }),
        L('S', 'EXAMPLE', 'explaining', 'មួយថ្ងៃមានម្ភៃបួនម៉ោង។ សាមសិបនាទី គឺប្រហែលពីរភាគរយប៉ុណ្ណោះ។',
          { text: 'មួយថ្ងៃមាន 24 ម៉ោង។ 30 នាទី គឺប្រហែល 2% ប៉ុណ្ណោះ។', ges: 'point-right' }),
        L('S', 'EXAMPLE', 'explaining', 'អង្គការសុខភាពពិភពលោកណែនាំ មួយរយហាសិប ដល់បីរយនាទីក្នុងមួយសប្តាហ៍ ដែលអាចកាត់បន្ថយហានិភ័យជំងឺបេះដូង និងស្លាប់មុនអាយុ ប្រហែលម្ភៃដល់សាមសិបភាគរយ។',
          { text: 'WHO ណែនាំ 150–300 នាទី/សប្តាហ៍ ជួយបន្ថយហានិភ័យជំងឺបេះដូង និងស្លាប់មុនអាយុ ~20–30%។', ges: 'explain', dur: 11 }),
        L('V', 'DIALOGUE', 'curious', 'ចុះបើខ្ញុំធ្វើមិនបានគ្រប់សាមសិបនាទី?',
          { text: 'ចុះបើខ្ញុំធ្វើមិនបានគ្រប់ 30 នាទី?', ges: 'think' }),
        L('S', 'DIALOGUE', 'encouraging', 'មិនអីទេ! ធ្វើតិចក៏មានប្រយោជន៍ដែរ។ ហើយគ្រាន់តែចាប់ផ្តើមដើរ ខួរក្បាលរបស់យើងផ្លាស់ប្តូរមុនគេ។',
          { ges: 'open-welcome' }),
        L('N', 'HOOK', 'bridge hook', 'តើខួរក្បាលរបស់យើង ផ្លាស់ប្តូរអ្វីខ្លះពេលយើងដើរ?')
      ]
    },

    // =========================================================================
    // CH.2 MIND — Shot 03 • Clinic desk
    // =========================================================================
    {
      id: 'ep02_shot_03',
      assets: ["elem:ep02_dual_brain_scanner","item:ep02_happy_hormones_icon"],
      title: 'Shot 03 • Ch.2 ស្ត្រេស ងងុយ គិតមិនចេញ',
      chapterTitle: 'ជំពូកទី ២៖ ខួរក្បាល — ផ្តោតអារម្មណ៍ និងស្ត្រេស',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'investigation',
      mode: 'HYBRID',
      sceneType: 'ep02-brain-mood',
      location: 'whiteboard',
      voiceDir: 'episodes/ep02-daily-exercise/audio/voice/shot_03',
      cameraBeats: CAM,
      actors: [
        actor('char_vichetr', 'វិចិត្រ (Vichetr)', A_V, {
          x: 130, scale: 0.96, emotion: 'tired', gesture: 'sad-droop', angle: 'three-quarter', headLook: 'right'
        }),
        actor('char_sophea', 'គ្រូពេទ្យ សុភា (Dr. Sophea)', A_S, {
          x: 262, emotion: 'calm', gesture: 'idle', angle: 'three-quarter', headLook: 'left'
        })
      ],
      lines: [
        L('N', 'STORY', 'curious', 'ថ្ងៃបន្ទាប់ វិចិត្រចូលជួបគ្រូពេទ្យសុភា ដោយទឹកមុខអស់កម្លាំង។'),
        L('V', 'PROBLEM', 'tired', 'គ្រូពេទ្យ ខ្ញុំស្ត្រេសការងារ ងងុយ ហើយគិតអ្វីមិនចេញសោះ។', { ges: 'sad-droop' }),
        L('S', 'DIALOGUE', 'explaining', 'ពេលយើងធ្វើចលនា ឈាមរត់លឿន ហើយខួរក្បាលទទួលបានអុកស៊ីសែនកាន់តែច្រើន។ ការហាត់មួយលើក ជួយឱ្យផ្តោតអារម្មណ៍ និងគិតលឿនជាងមុនភ្លាមៗ។',
          { ges: 'point-right', dur: 9.5, acts: { char_vichetr: { emotion: 'thinking', gesture: 'think' } } }),
        L('V', 'DIALOGUE', 'curious', 'ចុះស្ត្រេសវិញ?', { ges: 'think' }),
        L('S', 'DIALOGUE', 'encouraging', 'ហាត់ទៀងទាត់ ជួយបន្ថយអាការៈស្ត្រេស ថប់បារម្ភ និងអារម្មណ៍ស្រពោន។',
          { ges: 'open-welcome', acts: { char_vichetr: { emotion: 'happy', gesture: 'idle' } } }),
        L('N', 'EXAMPLE', 'curious', 'ដូចជាសាកទូរស័ព្ទ… ដើរមួយភ្លែត ខួរក្បាលក៏ភ្លឺឡើងវិញ។ នេះជាឧទាហរណ៍ប៉ុណ្ណោះ។'),
        L('V', 'HOOK', 'yawning', 'ប៉ុន្តែរាល់ថ្ងៃ បាយថ្ងៃត្រង់រួច ខ្ញុំងងុយខ្លាំងណាស់… ហេតុអ្វី?', { ges: 'stress' })
      ]
    },

    // =========================================================================
    // CH.3 FOOD — Shot 04 • Lunch table
    // =========================================================================
    {
      id: 'ep02_shot_04',
      assets: ["elem:ep02_sugar_pipeline","prop:ep02_muscle_sponge_hero","item:ep02_mitochondria_spark"],
      title: 'Shot 04 • Ch.3 ញ៉ាំបាយរួចងងុយ — ដើរក្រោយបាយ',
      chapterTitle: 'ជំពូកទី ៣៖ អាហារ — ដើរក្រោយបាយ ស្ករឡើងតិច',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'story',
      mode: 'HYBRID',
      sceneType: 'ep02-muscle-sponge',
      location: 'kitchen',
      voiceDir: 'episodes/ep02-daily-exercise/audio/voice/shot_04',
      cameraBeats: CAM,
      actors: [
        actor('char_vichetr', 'វិចិត្រ (Vichetr)', A_V, {
          x: 120, scale: 0.96, emotion: 'tired', gesture: 'sad-droop', angle: 'three-quarter', headLook: 'right'
        }),
        actor('char_sophea', 'គ្រូពេទ្យ សុភា (Dr. Sophea)', A_S, {
          x: 232, emotion: 'calm', gesture: 'idle', angle: 'three-quarter', headLook: 'left'
        })
      ],
      lines: [
        L('N', 'STORY', 'curious', 'ម៉ោងដប់ពីរកន្លះ វិចិត្រញ៉ាំបាយចប់ ហើយក្បាលចាប់ផ្តើមយោលដោយងងុយ។'),
        L('V', 'PROBLEM', 'sleepy', 'ញ៉ាំរួចចង់គេង ហើយក្បាលពោះក៏ចេញទៀត!', { ges: 'sad-droop' }),
        L('S', 'EXAMPLE', 'explaining', 'ពេលញ៉ាំបាយ ជាតិស្ករឡើងក្នុងឈាម។ បើអង្គុយស្ងៀម វាឡើងខ្ពស់ ធ្វើឱ្យយើងងងុយ។',
          { ges: 'explain' }),
        L('S', 'EXAMPLE', 'explaining', 'ប៉ុន្តែបើដើរភ្លាមក្រោយបាយ សូម្បីតែដប់នាទី សាច់ដុំជើងដូចអេប៉ុង ស្រូបជាតិស្ករ ធ្វើឱ្យវាឡើងតិចជាងមុន។',
          { text: 'ប៉ុន្តែបើដើរភ្លាមក្រោយបាយ សូម្បីតែ 10 នាទី សាច់ដុំជើងដូចអេប៉ុង ស្រូបជាតិស្ករ ធ្វើឱ្យវាឡើងតិចជាងមុន។',
            ges: 'point-right', dur: 8.5 }),
        L('V', 'DIALOGUE', 'happy', 'ងាយម្ល៉េះ! ដើរដប់នាទីទេតើ!', { text: 'ងាយម្ល៉េះ! ដើរ 10 នាទីទេតើ!', ges: 'fist-pump' }),
        L('S', 'DIALOGUE', 'warm', 'ត្រូវហើយ។ ការស្រាវជ្រាវបង្ហាញថា ដើរក្រោយបាយ ល្អជាងហាត់មុនពេលបាយ។', { ges: 'open-welcome' }),
        L('N', 'HOOK', 'bridge hook', 'ដើរក្រោយបាយ ល្អសម្រាប់ពេលថ្ងៃ… ចុះពេលយប់ វិញ មានអ្វីកើតឡើង?')
      ]
    },

    // =========================================================================
    // CH.4 NIGHT — Shot 05 • Bedroom
    // =========================================================================
    {
      id: 'ep02_shot_05',
      assets: ["elem:ep02_sleep_skin_dial","item:ep02_deep_sleep_moon"],
      title: 'Shot 05 • Ch.4 យប់ — គេងលក់ស្រួលជាងមុន',
      chapterTitle: 'ជំពូកទី ៤៖ ពេលយប់ — គេងលក់ស្រួល',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'story',
      mode: 'HYBRID',
      sceneType: 'ep02-deep-sleep-skin',
      location: 'bedroom',
      voiceDir: 'episodes/ep02-daily-exercise/audio/voice/shot_05',
      cameraBeats: CAM,
      actors: [
        actor('char_vichetr', 'វិចិត្រ (Vichetr)', A_V, {
          x: 190, emotion: 'calm', gesture: 'idle', angle: 'three-quarter', headLook: 'right'
        })
      ],
      lines: [
        L('N', 'STORY', 'curious', 'ពីរសប្តាហ៍ក្រោយ វិចិត្រដើរក្រោយបាយរាល់ថ្ងៃ។ យប់នេះ ទូរស័ព្ទរោទ៍។'),
        L('P', 'DIALOGUE', 'teasing', 'វិចិត្រ! ពូឮថាអ្នកដើររាល់ថ្ងៃ គេងលក់ទេ?', { label: 'ពូសំណាង (ទូរស័ព្ទ)', ges: 'celebrate' }),
        L('V', 'DIALOGUE', 'happy', 'ពូ! ពីមុនខ្ញុំរមៀលយូរទើបលក់ ឥឡូវដាក់ក្បាលលើខ្នើយ ក៏លក់ស្រួលណាស់!', { ges: 'open-welcome' }),
        L('P', 'EXAMPLE', 'cheerful', 'ត្រូវហើយ! ធ្វើចលនាពេលថ្ងៃ ជួយឱ្យលក់ស្រួល និងគេងមានគុណភាពជាងមុន។ តែកុំហាត់ខ្លាំងជិតម៉ោងគេង។',
          { label: 'ពូសំណាង (ទូរស័ព្ទ)', ges: 'explain', dur: 8 }),
        L('N', 'EXAMPLE', 'warm', 'ព្រឹកឡើង ក្រោកមកស្រស់ស្រាយជាងមុន។ ឧទាហរណ៍ មុខក៏មើលទៅស្រស់ជាងមុនដែរ។'),
        L('N', 'HOOK', 'bridge hook', 'បើធ្វើបានរាល់ថ្ងៃយូរៗ តើរាងកាយ និងសុខភាពរបស់យើងផ្លាស់ប្តូរយ៉ាងណា?')
      ]
    },

    // =========================================================================
    // CH.5 LONG RUN — Shot 06 • Clinic
    // =========================================================================
    {
      id: 'ep02_shot_06',
      assets: ["elem:ep02_organ_shield_vault","item:ep02_heart_shield_icon","item:ep02_medical_piggy_bank"],
      title: 'Shot 06 • Ch.5 រយៈពេលវែង — បេះដូង ឆ្អឹង ការបង្ការ',
      chapterTitle: 'ជំពូកទី ៥៖ រយៈពេលវែង — បង្ការជាងព្យាបាល',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'investigation',
      mode: 'HYBRID',
      sceneType: 'ep02-heart-wallet-payoff',
      location: 'whiteboard',
      voiceDir: 'episodes/ep02-daily-exercise/audio/voice/shot_06',
      cameraBeats: CAM,
      actors: [
        actor('char_vichetr', 'វិចិត្រ (Vichetr)', A_V, {
          x: 130, scale: 0.96, emotion: 'worried', gesture: 'think', angle: 'three-quarter', headLook: 'right'
        }),
        actor('char_sophea', 'គ្រូពេទ្យ សុភា (Dr. Sophea)', A_S, {
          x: 262, emotion: 'calm', gesture: 'idle', angle: 'three-quarter', headLook: 'left'
        })
      ],
      lines: [
        L('N', 'STORY', 'curious', 'ឆ្នាំមុន វិចិត្រធ្លាប់ទៅពេទ្យព្រោះឈឺចង្កេះ។ ថ្ងៃនេះគាត់កាន់វិក្កយបត្រចាស់មកជួបគ្រូពេទ្យសុភា។'),
        L('V', 'PROBLEM', 'worried', 'ឆ្នាំមុនខ្ញុំអស់លុយពេទ្យច្រើន ព្រោះឈឺចង្កេះ។ ខ្ញុំខ្លាចឈឺម្តងទៀត។', { ges: 'sad-droop' }),
        L('S', 'EXAMPLE', 'explaining', 'ការហាត់ទៀងទាត់ ជួយបន្ថយហានិភ័យជំងឺបេះដូង និងស្លាប់មុនអាយុ ប្រហែលម្ភៃដល់សាមសិបភាគរយ។',
          { text: 'ការហាត់ទៀងទាត់ ជួយបន្ថយហានិភ័យជំងឺបេះដូង និងស្លាប់មុនអាយុ ប្រហែល 20–30%។', ges: 'point-right' }),
        L('S', 'EXAMPLE', 'explaining', 'បើបន្ថែមហាត់សាច់ដុំពីរថ្ងៃក្នុងមួយសប្តាហ៍ ឆ្អឹង និងសាច់ដុំកាន់តែរឹងមាំ ឡើងជណ្តើរក៏លែងហត់ដែរ។',
          { text: 'បើបន្ថែមហាត់សាច់ដុំ 2 ថ្ងៃ/សប្តាហ៍ ឆ្អឹង និងសាច់ដុំកាន់តែរឹងមាំ ឡើងជណ្តើរក៏លែងហត់ដែរ។', ges: 'explain', dur: 8 }),
        L('V', 'DIALOGUE', 'curious', 'ដូច្នេះ ការបង្ការ ចំណាយតិចជាងការព្យាបាលមែនទេ?', { ges: 'think' }),
        L('S', 'DIALOGUE', 'warm', 'ជាទូទៅ ត្រូវហើយ។ ការបង្ការជំងឺ ជួយកាត់បន្ថយថ្លៃពេទ្យ និងថ្ងៃឈឺ។', { ges: 'open-welcome' }),
        L('N', 'HOOK', 'bridge hook', 'ប៉ុន្តែ បើអត់មានលុយទៅក្លឹបហាត់ប្រាណ តើយើងចាប់ផ្តើមបានទេ?')
      ]
    },

    // =========================================================================
    // CH.6 HOW-TO — Shot 07 • Living room (not a gym)
    // =========================================================================
    {
      id: 'ep02_shot_07',
      assets: ["elem:ep02_zero_dollar_grid","prop:ep02_dumbbell_hand"],
      title: 'Shot 07 • Ch.6 ហាត់ប្រាណមិនបាច់ក្លឹប — 4 កម្រិតឥតគិតថ្លៃ',
      chapterTitle: 'ជំពូកទី ៦៖ វិធីចាប់ផ្តើម — 4 កម្រិត ឥតគិតថ្លៃ',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'uplifting',
      mode: 'HYBRID',
      sceneType: 'ep02-zero-dollar-matrix',
      location: 'living-room',
      voiceDir: 'episodes/ep02-daily-exercise/audio/voice/shot_07',
      cameraBeats: CAM,
      actors: [
        actor('char_vichetr', 'វិចិត្រ (Vichetr)', A_V, {
          x: 82, scale: 0.92, emotion: 'sad', gesture: 'sad-droop', angle: 'three-quarter', headLook: 'right'
        }),
        actor('char_sophea', 'គ្រូពេទ្យ សុភា (Dr. Sophea)', A_S, {
          x: 182, scale: 0.92, emotion: 'calm', gesture: 'idle', angle: 'three-quarter', headLook: 'left'
        }),
        actor('char_samnang', 'ពូសំណាង (58yo Runner)', A_P, {
          x: 282, scale: 0.9, emotion: 'happy', gesture: 'idle', angle: 'three-quarter', headLook: 'left'
        })
      ],
      lines: [
        L('N', 'STORY', 'curious', 'នៅបន្ទប់ទទួលភ្ញៀវ វិចិត្រមើលតម្លៃសំបុត្រក្លឹបហាត់ប្រាណ ហើយទឹកមុខស្រពោន។'),
        L('V', 'PROBLEM', 'sad', 'ក្លឹបថ្លៃពេក! ខ្ញុំអត់មានលុយទេ!', { ges: 'sad-droop' }),
        L('S', 'SOLUTION', 'encouraging', 'មិនបាច់ក្លឹបទេ! កម្រិតទីមួយ ដើរដប់នាទីក្រោយបាយ។ កម្រិតទីពីរ ដើរលឿនសាមសិបនាទី។',
          { text: 'មិនបាច់ក្លឹបទេ! កម្រិត 1 ដើរ 10 នាទីក្រោយបាយ។ កម្រិត 2 ដើរលឿន 30 នាទី។', ges: 'point-right',
            acts: { char_vichetr: { emotion: 'curious', gesture: 'think' } } }),
        L('P', 'SOLUTION', 'cheerful', 'កម្រិតទីបី រត់តិចៗ ជិះកង់ វាយសី ឬរាំតាមភ្លេង! កម្រិតទីបួន ហាត់សាច់ដុំនៅផ្ទះ ដប់ប្រាំនាទី ដូចជាអង្គុយក្រោក ពីរបីថ្ងៃក្នុងមួយសប្តាហ៍។',
          { text: 'កម្រិត 3 រត់តិចៗ ជិះកង់ វាយសី ឬរាំតាមភ្លេង! កម្រិត 4 ហាត់សាច់ដុំនៅផ្ទះ 15 នាទី ដូចជាអង្គុយក្រោក ពីរបីថ្ងៃក្នុងមួយសប្តាហ៍។',
            ges: 'celebrate', dur: 10 }),
        L('S', 'SOLUTION', 'serious', 'ចាប់ផ្តើមថ្នមៗ។ បើឈឺទ្រូង វិលមុខ ឬមានជំងឺរ៉ាំរ៉ៃ សូមសួរគ្រូពេទ្យជាមុន។', { ges: 'explain' }),
        L('V', 'HOOK', 'determined', 'ចុះធ្វើយ៉ាងម៉េច កុំឱ្យខ្ញុំបោះបង់ចោលនៅថ្ងៃទីបី?', { ges: 'fist-pump' })
      ]
    },

    // =========================================================================
    // CH.7 HABIT & PAYOFF — Shot 08 • Park, 30 days later
    // =========================================================================
    {
      id: 'ep02_shot_08',
      assets: ["elem:ep02_habit_trophy_checklist","item:ep02_medical_piggy_bank"],
      title: 'Shot 08 • Ch.7 30 ថ្ងៃក្រោយ — ក្បួន 4 ចំណុច',
      chapterTitle: 'ជំពូកទី ៧៖ ទម្លាប់ — ចាប់ផ្តើមតូច តែទៀងទាត់',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'uplifting',
      mode: 'HYBRID',
      sceneType: 'ep02-habit-outro',
      location: 'park',
      voiceDir: 'episodes/ep02-daily-exercise/audio/voice/shot_08',
      cameraBeats: CAM,
      actors: [
        actor('char_samnang', 'ពូសំណាង (58yo Runner)', A_P, {
          x: 100, scale: 0.92, emotion: 'happy', gesture: 'jog-energetic', angle: 'three-quarter', headLook: 'right'
        }),
        actor('char_vichetr', 'វិចិត្រ (Vichetr — ក្រោយ 30 ថ្ងៃ)', A_V, {
          x: 205, scale: 0.94, emotion: 'excited', gesture: 'jog-energetic', angle: 'front', headLook: 'left'
        }),
        actor('char_sophea', 'គ្រូពេទ្យ សុភា (Dr. Sophea)', A_S, {
          x: 310, scale: 0.94, emotion: 'proud', gesture: 'hold-water', angle: 'three-quarter', headLook: 'left'
        })
      ],
      lines: [
        L('N', 'STORY', 'warm', 'សាមសិបថ្ងៃក្រោយ… វិចិត្រចូលសួនច្បារដោយជំហានស្រាល និងស្នាមញញឹម។',
          { text: '30 ថ្ងៃក្រោយ… វិចិត្រចូលសួនច្បារដោយជំហានស្រាល និងស្នាមញញឹម។' }),
        L('P', 'DIALOGUE', 'cheerful', 'វិចិត្រ! ឥឡូវអ្នករត់ទាន់ពូហើយ! មានសម្ងាត់អ្វី?', { ges: 'celebrate' }),
        L('V', 'SOLUTION', 'proud', 'ខ្ញុំចាប់ផ្តើមតូចៗ! ដើរក្រោយបាយ ក្រោកឈរពីរនាទីរាល់ម៉ោង ធ្វើចលនាប្រហែលសាមសិបនាទីស្ទើរតែរាល់ថ្ងៃ ហើយផឹកទឹក ដេកឱ្យទៀងម៉ោង។',
          { text: 'ខ្ញុំចាប់ផ្តើមតូចៗ! ដើរក្រោយបាយ ក្រោកឈរ 2 នាទីរាល់ម៉ោង ធ្វើចលនាប្រហែល 30 នាទីស្ទើរតែរាល់ថ្ងៃ ហើយផឹកទឹក ដេកឱ្យទៀងម៉ោង។',
            ges: 'jump-celebrate', dur: 10 }),
        L('S', 'DIALOGUE', 'warm', 'ល្អណាស់! ចាប់ផ្តើមតូច តែទៀងទាត់ ល្អជាងខ្លាំងម្តងរួចបោះបង់។ លទ្ធផលរបស់មនុស្សម្នាក់ៗ អាចខុសគ្នា។',
          { ges: 'open-welcome' }),
        L('N', 'HOOK', 'inspiring', 'រាងកាយមិនច្រេះចាប់ព្រោះអាយុទេ តែច្រេះចាប់ព្រោះយើងឈប់កម្រើក។ ល្ងាចនេះ តើអ្នកត្រៀមដើរដប់នាទីហើយឬនៅ?',
          { text: 'រាងកាយមិនច្រេះចាប់ព្រោះអាយុទេ តែច្រេះចាប់ព្រោះយើងឈប់កម្រើក។ ល្ងាចនេះ តើអ្នកត្រៀមដើរ 10 នាទីហើយឬនៅ?', dur: 8 }),
        L('N', 'CTA', 'warm', 'កុំភ្លេចចុច Subscribe និងចែករំលែកវីដេអូនេះទៅមនុស្សជាទីស្រឡាញ់របស់អ្នកផង។')
      ]
    },

    // =========================================================================
    // EP02 CAST & HOOK/CATCH SHEET
    // =========================================================================
    {
      id: 'ep02_shot_09',
      title: '📋 EP02 Cast & Prop Sheet',
      chapterTitle: 'តារាងតួអង្គ និងសំឡេងប្រចាំភាគទី ០២',
      directorSection: '',
      transitionType: EPISODE_TRANSITION,
      bgmMood: 'curious',
      mode: 'EXPLAINER',
      sceneType: 'character-sheet',
      location: 'whiteboard',
      defaultDuration: 8.0,
      actors: [],
      captionKhmer: 'តួអង្គប្រចាំភាគទី ០២៖ វិចិត្រ (Vichetr), គ្រូពេទ្យ សុភា (Dr. Sophea) និងពូសំណាង (58yo Runner)។',
      aiStudioPrompt: `[EP02 MULTI-CAST VOICE SHEET]
VOICE-NARRATOR-001 — Narrator (STORY / EXAMPLE / HOOK / CTA)
VOICE-CAST-01 (Puck) — Vichetr: young male, tired → energetic
VOICE-CAST-02 (Aoede) — Dr. Sophea: calm, kind, confident adult female
VOICE-CAST-03 (Charon) — Pou Samnang: warm, deeper, cheerful older male`
    }
  ];

  // Compile per-line voice prompts for the Inspector (one TTS call per line)
  SHOTS.forEach((shot) => {
    if (!Array.isArray(shot.lines)) return;
    shot.aiStudioPrompt = shot.lines
      .map(
        (ln, i) =>
          `line_${String(i + 1).padStart(2, '0')}_${ln.voiceSlug}.wav  [${ln.voiceId} • ${ln.speakerLabel} • ${ln.beat}]\n[${ln.style}] ${ln.spoken}`
      )
      .join('\n\n');
    shot.captionKhmer = shot.lines.map((ln) => ln.text).join(' ');
  });

  const CARD_LEFT = {
    'ep02-rusty-sitting': 468, 'ep02-two-percent-rule': 485, 'ep02-brain-mood': 365, 'ep02-muscle-sponge': 492,
    'ep02-deep-sleep-skin': 465, 'ep02-heart-wallet-payoff': 365, 'ep02-zero-dollar-matrix': 360, 'ep02-habit-outro': 405
  };

  // Dialogue bubbles: every character line becomes a speech bubble timed to that line's real audio
  function renderDialogueBubbles(shot) {
    if (!Array.isArray(shot.lines)) return '';
    return shot.lines
      .map((ln, i) => {
        if (!ln.actorId) return '';
        const a = shot.actors.find((x) => x.id === ln.actorId);
        const ax = a ? a.x : 200;
        const cardLeft = CARD_LEFT[shot.sceneType] || 468;
        const bw = Math.min(360, cardLeft - 24 - 14);
        const left = Math.max(24, Math.min(cardLeft - 14 - bw, Math.round(ax - bw / 2)));
        const portraitBase = { V: A_V, S: A_S, P: A_P }[ln.speaker];
        const portrait = window.CharacterRig.renderActorSVG({
          ...portraitBase, x: 50, y: 270, emotion: ln.emotion,
          gesture: 'idle', angle: 'front', mouthOpen: 0, phase: 0
        });
        const offscreen = !a;
        const phone = offscreen && ln.speakerLabel.includes('ទូរស័ព្ទ');
        const tailX = Math.max(28, Math.min(bw - 28, ax - left));
        return `
        <div data-speak-line="${i + 1}" data-speaker-actor="${ln.actorId}" data-speaker-presence="${offscreen ? 'offscreen' : 'onstage'}" class="ref-speech-bubble ep02-speaker-dialog" style="top:64px; left:${left}px; width:${bw}px; padding:14px 16px; --speaker-tail-x:${tailX}px; z-index:26; opacity:0; pointer-events:none;">
          <div class="ref-speaker-tag editable-text-node" contenteditable="true">${phone ? '☎ ' : ''}${ln.speakerLabel}${offscreen && !phone ? ' • ក្រៅឆាក' : ''}</div>
          <div class="ep02-speaker-dialog-body">
            <svg class="ep02-speaker-portrait" viewBox="0 0 100 100" role="img" aria-label="${ln.speakerLabel}">${portrait}</svg>
            <div class="editable-text-node ep02-speaker-dialog-text" contenteditable="true">${ln.text}</div>
          </div>
        </div>`;
      })
      .join('');
  }

  // ===========================================================================
  // 8 TOPIC-UNIQUE CONCEPT DISPLAYS FOR EPISODE 02 (ORIGINAL TOPIC VISUALS)
  // ===========================================================================
  function renderKeyTracker(activeChapterNum, pillText) {
    const items = [1, 2, 3, 4, 5, 6, 7].map((n) => {
      if (n < activeChapterNum) return `<div class="km-key-item done">✓</div>`;
      if (n === activeChapterNum) return `<div class="km-key-item active">🏃${n}</div>`;
      return `<div class="km-key-item">${n}</div>`;
    });
    return `
      <div class="km-key-tracker">
        <div class="km-key-row">${items.join('')}</div>
        <div class="km-key-pill editable-text-node" contenteditable="true">${pillText}</div>
      </div>
    `;
  }

  function renderInfographic(shot) {
    return renderInfographicBase(shot) + renderDialogueBubbles(shot);
  }

  function renderInfographicBase(shot) {
    // -------------------------------------------------------------------------
    // SHOT 01: 2-DIAL "RUSTY BODY GEAR VS. 5-CELL BATTERY DRAIN" DASHBOARD
    // -------------------------------------------------------------------------
    if (shot.sceneType === 'ep02-rusty-sitting') {
      return `
        ${renderKeyTracker(1, '1. អង្គុយ 8 ម៉ោង')}

        <!-- Episode 02 Cold-Open Thumbnail Hook Card (0.0s - 4.9s): introduces today's topic, then hands off to the story -->
        <div data-window-lines="1,1" class="ep-intro-hook-card" style="position:absolute; top:88px; left:262px; width:560px; z-index:34; opacity:0; pointer-events:none; background:#FFFFFF; border:3px solid #171717; border-radius:20px; padding:26px 22px 14px; box-shadow:0 18px 38px rgba(23,23,23,0.16), 7px 7px 0 #EABF42;">
          <div style="position:absolute; top:-15px; right:22px; background:#FA604E; color:#FFFFFF; border-radius:999px; padding:3px 14px; font-size:11.5px; font-weight:900; border:2px solid #171717;">🧲 ថ្ងៃនេះអ្នកនឹងដឹង</div>

          <div style="display:flex; align-items:center; gap:18px;">
            <!-- Big drained-battery thumbnail icon -->
            <svg width="104" height="104" viewBox="0 0 104 104" style="flex-shrink:0;">
              <circle cx="52" cy="52" r="48" fill="#FEF2F2" stroke="#171717" stroke-width="3" />
              <rect x="22" y="34" width="52" height="36" rx="7" fill="#FFFFFF" stroke="#171717" stroke-width="3" />
              <rect x="74" y="45" width="6" height="14" rx="2" fill="#171717" />
              <rect x="27" y="39" width="11" height="26" rx="3" fill="#FA604E" />
              <rect x="41" y="39" width="8" height="26" rx="3" fill="#FEE2E2" />
              <rect x="52" y="39" width="8" height="26" rx="3" fill="#FEE2E2" />
              <rect x="63" y="39" width="7" height="26" rx="3" fill="#FEE2E2" />
              <polyline points="46,76 40,88 50,88 44,100" fill="none" stroke="#EABF42" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <text x="52" y="28" text-anchor="middle" fill="#FA604E" font-size="15" font-weight="900">20%</text>
            </svg>
            <div style="flex:1; min-width:0;">
              <div class="editable-text-node" contenteditable="true" style="font-size:26px; font-weight:900; color:#171717; line-height:1.5;">
                អង្គុយពេញថ្ងៃ ហេតុអ្វី<span style="color:#FA604E;">ហត់អស់ថ្ម?</span>
              </div>
              <div class="editable-text-node" contenteditable="true" style="font-size:14px; font-weight:800; color:#1E7E45; margin-top:2px; line-height:1.55;">
                ដំណោះស្រាយ៖ ត្រឹមតែ 30 នាទី = 2% នៃថ្ងៃ ⚡
              </div>
            </div>
          </div>

          <!-- Promise chips + bridge to the story -->
          <div style="display:flex; align-items:center; gap:8px; margin-top:12px; flex-wrap:nowrap;">
            <span style="background:#EFF6FF; border:2px solid #5D98E8; color:#1E40AF; border-radius:999px; padding:3px 11px; font-size:11.5px; font-weight:800; white-space:nowrap; line-height:1.5;">① ហេតុអ្វីអស់ថ្ម</span>
            <span style="background:#FEF3C7; border:2px solid #EABF42; color:#92400E; border-radius:999px; padding:3px 11px; font-size:11.5px; font-weight:800; white-space:nowrap; line-height:1.5;">② រូបមន្ត 2%</span>
            <span style="background:#E6F4EA; border:2px solid #2FAA61; color:#1E7E45; border-radius:999px; padding:3px 11px; font-size:11.5px; font-weight:800; white-space:nowrap; line-height:1.5;">③ ប្រយោជន៍ដល់រាងកាយ</span>
            <span class="editable-text-node" contenteditable="true" style="margin-left:auto; font-size:12px; font-weight:900; color:#171717; white-space:nowrap; line-height:1.5;">មកមើលរឿងវិចិត្រ ➔</span>
          </div>
        </div>

        <!-- Custom Concept Display 1: Dual-Dial "Rusty Gear & Spine Strain vs. 5-Cell Body Battery" Dashboard -->
        <div id="animCardPrimary" data-reveal-line="3" style="position:absolute; top:88px; left:468px; width:460px; background:#FFFFFF; border:2.6px solid #171717; border-radius:16px; padding:14px 18px; box-shadow:0 12px 26px rgba(23,23,23,0.08);">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; border-bottom:2px dashed #E5E7EB; padding-bottom:10px; margin-bottom:12px;">
            <span class="editable-text-node" contenteditable="true" style="font-size:14.5px; font-weight:900; color:#171717; line-height:1.4;">🚨 ផ្ទាំងពិនិត្យរាងកាយពេលអង្គុយស្ងៀម 8 ម៉ោង</span>
            <span class="km-stamp-badge editable-text-node" contenteditable="true" style="font-size:11px; padding:2px 9px; transform:rotate(-2deg); flex-shrink:0;">ឧទាហរណ៍</span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <!-- Left Gauge: Circular Rusty Gear & Spine Strain Meter -->
            <div style="background:#FFFBEB; border:2px solid #EABF42; border-radius:12px; padding:12px 10px; display:flex; flex-direction:column; align-items:center; text-align:center;">
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#92400E; margin-bottom:6px; line-height:1.4;">⚙️ ម៉ាស៊ីនរាងកាយច្រេះចាប់</div>
              <svg width="104" height="96" viewBox="0 0 116 106">
                <circle cx="58" cy="53" r="42" fill="none" stroke="#FDE68A" stroke-width="9" />
                <circle cx="58" cy="53" r="42" fill="none" stroke="#FA604E" stroke-width="9" stroke-dasharray="212 264" stroke-linecap="round" transform="rotate(-90 58 53)" />
                <circle cx="58" cy="53" r="29" fill="#FEF3C7" stroke="#D97706" stroke-width="2" />
                <text x="58" y="49" text-anchor="middle" fill="#FA604E" font-size="14" font-weight="900">ច្រេះ</text>
                <text x="58" y="65" text-anchor="middle" fill="#92400E" font-size="9.5" font-weight="800">ឧទាហរណ៍</text>
              </svg>
              <div class="editable-text-node" contenteditable="true" style="font-size:11.5px; font-weight:700; color:#171717; margin-top:5px; line-height:1.45;">ឈាមរត់យឺត • សាច់ដុំរឹង • ឈឺចង្កេះ</div>
            </div>

            <!-- Right Gauge: 5-Cell Body Battery Meter (1/5 Red Cell = 20%) -->
            <div style="background:#FEF2F2; border:2px solid #FA604E; border-radius:12px; padding:12px 10px; display:flex; flex-direction:column; align-items:center; text-align:center;">
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#B91C1C; margin-bottom:6px; line-height:1.4;">🪫 ថ្មថាមពលម៉ោង 5:00 ល្ងាច</div>
              <svg width="138" height="96" viewBox="0 0 150 96">
                <rect x="8" y="20" width="122" height="56" rx="10" fill="#FFFFFF" stroke="#171717" stroke-width="3" />
                <rect x="130" y="35" width="10" height="26" rx="3" fill="#171717" />
                <!-- 5 Uniform Battery Cells (Only Cell 1 Red Active, Cells 2..5 Empty) -->
                <rect x="16" y="28" width="18" height="40" rx="4" fill="#FA604E" stroke="#171717" stroke-width="1.6" />
                <rect x="38" y="28" width="18" height="40" rx="4" fill="#FEE2E2" stroke="#FCA5A5" stroke-width="1.5" stroke-dasharray="3 2" />
                <rect x="60" y="28" width="18" height="40" rx="4" fill="#FEE2E2" stroke="#FCA5A5" stroke-width="1.5" stroke-dasharray="3 2" />
                <rect x="82" y="28" width="18" height="40" rx="4" fill="#FEE2E2" stroke="#FCA5A5" stroke-width="1.5" stroke-dasharray="3 2" />
                <rect x="104" y="28" width="18" height="40" rx="4" fill="#FEE2E2" stroke="#FCA5A5" stroke-width="1.5" stroke-dasharray="3 2" />
              </svg>
              <div class="editable-text-node" contenteditable="true" style="font-size:13.5px; font-weight:900; color:#FA604E; margin-top:5px; line-height:1.45;">សល់តែ 20% (អស់កម្លាំង!)</div>
            </div>
          </div>

          <!-- Hook Bridge Ribbon -->
          <div data-reveal-line="6" style="margin-top:12px; background:#EFF6FF; border:2px solid #5D98E8; border-radius:10px; padding:8px 14px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
            <span class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#1E40AF; line-height:1.45;">🪝 តើសាកថ្មជីវិតឱ្យពេញ ដោយប្រើពេលតែ 2% នៃថ្ងៃយ៉ាងដូចម្តេច?</span>
            <span style="font-weight:900; color:#5D98E8; flex-shrink:0;">➔</span>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SHOT 02: 24-HOUR PIE CLOCK (30m = 2% SLICE) + AGE-VS-ENERGY VS BATTLE CARD
    // -------------------------------------------------------------------------
    if (shot.sceneType === 'ep02-two-percent-rule') {
      return `
        ${renderKeyTracker(1, '1. រូបមន្ត 2% នៃថ្ងៃ (30 នាទី ≈ 2% នៃថ្ងៃ)')}

        <!-- Custom Concept Display 2: 24-Hour Circular Clock Slice + Age-vs-Energy VS Battle Card -->
        <div id="animCardPrimary" class="ep02-time-concept" data-reveal-line="2" style="position:absolute; top:60px; left:485px; width:445px; background:#FFFFFF; border:2.6px solid #171717; border-radius:16px; padding:14px 16px; box-shadow:0 12px 26px rgba(23,23,23,0.08);">
          <!-- Top: Age vs Energy VS Battle Strip -->
          <div class="ep02-age-comparison" style="display:grid; grid-template-columns:1fr auto 1fr; gap:10px; align-items:center; background:#F8FAFC; border:2px solid #171717; border-radius:12px; padding:10px 12px;">
            <div style="text-align:center;">
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#64748B;">វិចិត្រ • អាយុ 29 ឆ្នាំ</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:14px; font-weight:900; color:#FA604E; margin-top:2px;">🪫 ថ្មទាប (អង្គុយស្ងៀម)</div>
            </div>
            <div style="background:#EABF42; border:2px solid #171717; border-radius:999px; padding:3px 9px; font-size:11px; font-weight:900; color:#171717;">VS</div>
            <div style="text-align:center;">
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#1E7E45;">ពូសំណាង • អាយុ 58 ឆ្នាំ</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:14px; font-weight:900; color:#2FAA61; margin-top:2px;">🔋 ថ្មពេញ (ធ្វើចលនា)</div>
            </div>
          </div>

          <!-- Middle: 24-Hour Circular Clock Pie (Showing 30m = 2% Golden/Green Slice) -->
          <div class="ep02-day-clock" data-reveal-line="4" style="display:flex; align-items:center; gap:14px; margin-top:12px; background:#E6F4EA; border:2.2px solid #2FAA61; border-radius:12px; padding:12px 14px;">
            <svg width="96" height="96" viewBox="0 0 110 110" style="flex-shrink:0;">
              <circle cx="55" cy="55" r="46" fill="#FFFFFF" stroke="#171717" stroke-width="3" />
              <!-- 98% Rest of Day Circle -->
              <circle cx="55" cy="55" r="34" fill="#E2E8F0" />
              <!-- 2% Highlighted Wedge (Magnified visually so viewer clearly sees the 30-min slice) -->
              <path d="M 55 55 L 55 9 A 46 46 0 0 1 88 23 Z" fill="#2FAA61" stroke="#171717" stroke-width="2.2" />
              <circle cx="55" cy="55" r="19" fill="#FEF08A" stroke="#171717" stroke-width="2" />
              <text x="55" y="59" text-anchor="middle" fill="#171717" font-size="13" font-weight="900">2%</text>
            </svg>
            <div>
              <div class="editable-text-node" contenteditable="true" style="font-size:14.5px; font-weight:900; color:#1E7E45;">⏱️ រូបមន្ត 2% នៃថ្ងៃ (30 នាទី)</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:700; color:#171717; margin-top:3px;">1 ថ្ងៃ = 24 ម៉ោង (1,440 នាទី)</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#15803D; margin-top:3px;">✅ ហាត់តែ 30 នាទី = សល់ពេល 98% ទៀត!</div>
            </div>
          </div>

          <!-- WHO guideline card (verified) -->
          <div class="ep02-week-guideline" data-reveal-line="5" style="margin-top:10px; background:#EFF6FF; border:2px solid #5D98E8; border-radius:12px; padding:9px 14px;">
            <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:900; color:#1E40AF; line-height:1.5;">🌍 WHO ណែនាំ 150–300 នាទី/សប្តាហ៍ (ដូចជាដើរលឿន ~30 នាទី × 5 ថ្ងៃ)</div>
            <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:800; color:#171717; margin-top:2px; line-height:1.5;">ហានិភ័យជំងឺបេះដូង និងស្លាប់មុនអាយុ ↓ ប្រហែល 20–30%</div>
          </div>

          <!-- Hook Bridge to Chapter 2 -->
          <div class="ep02-next-hook" data-reveal-line="8" style="margin-top:11px; background:#FEF3C7; border:2px solid #EABF42; border-radius:10px; padding:8px 14px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
            <span class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#92400E; line-height:1.45;">🪝 គ្រាន់តែដើរ 10 នាទីដំបូង តើខួរក្បាលផ្លាស់ប្តូរអ្វីភ្លាមៗ?</span>
            <span style="font-weight:900; color:#92400E; flex-shrink:0;">➔</span>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SHOT 03: DUAL-HEMISPHERE BRAIN SCANNER (STRESS CLOUD VS. EXERCISE FOCUS)
    // -------------------------------------------------------------------------
    if (shot.sceneType === 'ep02-brain-mood') {
      return `
        ${renderKeyTracker(2, '2. ខួរក្បាលស្រស់ថ្លា និងបំបាត់ស្ត្រេស')}

        <!-- Custom Concept Display 3: Dual-Hemisphere Brain Scanner -->
        <div id="animCardPrimary" data-reveal-line="2" style="position:absolute; top:56px; left:365px; width:560px; background:#FFFFFF; border:2.6px solid #171717; border-radius:16px; padding:14px 18px; box-shadow:0 12px 26px rgba(23,23,23,0.08);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div class="editable-text-node" contenteditable="true" style="font-size:16px; font-weight:900; color:#171717;">🧠 ម៉ាស៊ីនស្កេនខួរក្បាល៖ អង្គុយស្ងៀម ទល់នឹង ធ្វើចលនា</div>
            <span class="km-dot-pill"><span class="km-dot blue"></span>ឈាម/អុកស៊ីសែន ↑</span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <!-- Left Hemisphere Card: Sedentary Stress Brain -->
            <div style="background:#FEF2F2; border:2.2px solid #FA604E; border-radius:14px; padding:10px 12px; text-align:center;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#B91C1C;">☁️ ពេលអង្គុយស្ងៀមយូរម៉ោង</div>
              <svg width="150" height="92" viewBox="0 0 160 96" style="margin:4px auto;">
                <!-- Storm Cloud & Stress Brain -->
                <path d="M 45 64 C 28 64, 24 42, 38 34 C 42 20, 68 18, 78 30 C 92 18, 118 22, 120 38 C 134 44, 130 64, 112 64 Z" fill="#FCA5A5" stroke="#171717" stroke-width="2.5" />
                <path d="M 55 44 Q 78 34 102 44" fill="none" stroke="#B91C1C" stroke-width="2.2" />
                <polyline points="72,66 64,80 76,80 68,94" fill="none" stroke="#FA604E" stroke-width="3" />
                <polyline points="96,66 88,80 100,80 92,94" fill="none" stroke="#FA604E" stroke-width="3" />
              </svg>
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#FA604E;">អរម៉ូនស្ត្រេស (Cortisol) ឡើងខ្ពស់</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:11px; font-weight:700; color:#64748B;">ស្ពឹកស្រពន់ • ងងុយគេង • ឆាប់មួម៉ៅ</div>
            </div>

            <!-- Right Hemisphere Card: Exercise Oxygen + Happy Hormones Brain -->
            <div data-reveal-line="3" style="background:#E6F4EA; border:2.4px solid #2FAA61; border-radius:14px; padding:10px 12px; text-align:center;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#1E7E45;">⚡ ពេលធ្វើចលនា</div>
              <svg width="150" height="92" viewBox="0 0 160 96" style="margin:4px auto;">
                <!-- Glowing Green/Blue Active Brain with O2 Bubbles & Sparkles -->
                <path d="M 45 64 C 28 64, 24 42, 38 34 C 42 20, 68 18, 78 30 C 92 18, 118 22, 120 38 C 134 44, 130 64, 112 64 Z" fill="#86EFAC" stroke="#171717" stroke-width="2.5" />
                <circle cx="58" cy="46" r="10" fill="#5D98E8" stroke="#171717" stroke-width="1.8" />
                <text x="58" y="50" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-weight="900">O₂</text>
                <circle cx="96" cy="46" r="10" fill="#EABF42" stroke="#171717" stroke-width="1.8" />
                <text x="96" y="50" text-anchor="middle" fill="#171717" font-size="10" font-weight="900">✨</text>
                <text x="80" y="86" text-anchor="middle" fill="#1E7E45" font-size="12" font-weight="900">Endorphins + Dopamine ↑</text>
              </svg>
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#1E7E45;">ផ្តោតអារម្មណ៍ ↑ • ស្ត្រេស ↓</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:11px; font-weight:700; color:#15803D;">អារម្មណ៍ស្រស់ស្រាយ • គិតរហ័សជាងមុន</div>
            </div>
          </div>

          <!-- Hook Bridge to Chapter 3 -->
          <div data-reveal-line="7" style="margin-top:10px; background:#EFF6FF; border:2px solid #5D98E8; border-radius:10px; padding:6px 12px; display:flex; align-items:center; justify-content:space-between;">
            <span class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#1E40AF;">🪝 ហេតុអ្វីបាយថ្ងៃត្រង់រួច យើងងងុយ?</span>
            <span style="font-weight:900; color:#5D98E8;">➔</span>
          </div>
        </div>

        <!-- B-ROLL EXAMPLE (line 6): phone charging metaphor -->
        <div class="broll-cutaway-card" data-window-lines="6,6" style="top:70px; left:24px; width:320px; opacity:0; pointer-events:none;">
          <svg class="broll-float-svg" width="48" height="48" viewBox="0 0 48 48">
            <rect x="13" y="6" width="22" height="36" rx="5" fill="#FFFFFF" stroke="#171717" stroke-width="2.4" />
            <rect x="17" y="24" width="14" height="14" rx="2" fill="#2FAA61" />
            <polyline points="26,12 20,22 25,22 22,30" fill="none" stroke="#EABF42" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div>
            <div class="broll-title editable-text-node" contenteditable="true">🔌 ដូចសាកទូរស័ព្ទ</div>
            <div class="broll-sub editable-text-node" contenteditable="true">ដើរមួយភ្លែត ខួរក្បាលភ្លឺឡើងវិញ (ឧទាហរណ៍)</div>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SHOT 04: 2-PATH BIOLOGICAL SUGAR PIPELINE (PAIRED WITH STAGE MUSCLE SPONGE PROP)
    // -------------------------------------------------------------------------
    if (shot.sceneType === 'ep02-muscle-sponge') {
      return `
        ${renderKeyTracker(3, '3. ដើរក្រោយបាយ ស្ករឡើងតិច')}

        <!-- Custom Concept Display 4: 2-Path Biological Sugar Pipeline (Right side of Stage Hero Sponge Prop) -->
        <div id="animCardPrimary" data-reveal-line="3" style="position:absolute; top:56px; left:492px; width:438px; background:#FFFFFF; border:2.6px solid #171717; border-radius:16px; padding:12px 16px; box-shadow:0 12px 26px rgba(23,23,23,0.08);">
          <div class="editable-text-node" contenteditable="true" style="font-size:15.5px; font-weight:900; color:#171717; margin-bottom:8px;">
            🍬 ស្ករក្នុងឈាមក្រោយញ៉ាំអាហារ — អង្គុយ ទល់នឹង ដើរ
          </div>

          <!-- Pipeline 1: Sitting Still -> Belly Fat Storage -->
          <div style="background:#FEF2F2; border:2px solid #FA604E; border-radius:12px; padding:9px 12px; margin-bottom:9px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#B91C1C;">❌ អង្គុយស្ងៀមក្រោយបាយ</span>
              <span class="km-dot-pill" style="font-size:11px; padding:1px 8px;"><span class="km-dot coral"></span>ស្ករឡើងខ្ពស់</span>
            </div>
            <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:700; color:#171717; margin-top:4px;">
              ស្ករក្នុងឈាមឡើងខ្ពស់ ➔ <b>ងងុយគេង</b> និងងាយស្តុកខ្លាញ់
            </div>
          </div>

          <!-- Pipeline 2: Walking 30m -> Muscle Sponge Absorbs Sugar (qualitative) -->
          <div data-reveal-line="4" style="background:#E6F4EA; border:2.4px solid #2FAA61; border-radius:12px; padding:10px 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#1E7E45;">✅ ដើរក្រោយបាយ ~10 នាទី (អេប៉ុងសាច់ដុំ)</span>
              <span class="km-dot-pill" style="font-size:11px; padding:1px 8px;"><span class="km-dot green"></span>ស្ករឡើងតិចជាង</span>
            </div>
            <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:700; color:#171717; margin-top:4px;">
              សាច់ដុំជើងបឺតស្ករមកប្រើជាថាមពល ➔ <b>ស្ករឡើងតិចជាងមុន</b>
            </div>
            <div data-reveal-line="4" data-reveal-delay="3.5" style="display:flex; gap:8px; margin-top:8px;">
              <div style="flex:1; background:#FFFFFF; border:1.8px solid #2FAA61; border-radius:8px; padding:5px 8px; text-align:center;">
                <div style="font-size:10.5px; font-weight:700; color:#64748B;">ស្ករក្រោយបាយ</div>
                <div class="editable-text-node" contenteditable="true" style="font-size:15px; font-weight:900; color:#1E7E45;">↓ តិចជាង 🍬</div>
              </div>
              <div style="flex:1; background:#FFFFFF; border:1.8px solid #5D98E8; border-radius:8px; padding:5px 8px; text-align:center;">
                <div style="font-size:10.5px; font-weight:700; color:#64748B;">ថាមពល/ភ្ញាក់ដឹងខ្លួន</div>
                <div class="editable-text-node" contenteditable="true" style="font-size:15px; font-weight:900; color:#1E40AF;">↑ ⚡</div>
              </div>
            </div>
          </div>

          <!-- Hook Bridge to Chapter 4 -->
          <div data-reveal-line="7" style="margin-top:9px; background:#FEF3C7; border:2px solid #EABF42; border-radius:10px; padding:6px 12px; display:flex; align-items:center; justify-content:space-between;">
            <span class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#92400E;">🪝 ពេលដុតថាមពលបានល្អនៅពេលថ្ងៃ តើពេលយប់មានអ្វីកើតឡើង?</span>
            <span style="font-weight:900; color:#92400E;">➔</span>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SHOT 05: NIGHTTIME MOON SLEEP GAUGE (qualitative) + SKIN PORE DETOX DIAGRAM
    // -------------------------------------------------------------------------
    if (shot.sceneType === 'ep02-deep-sleep-skin') {
      return `
        ${renderKeyTracker(4, '4. គេងលក់ស្រួលជាងមុន')}

        <!-- Custom Concept Display 5: Nighttime Moon Sleep Dial + Skin Pore Sweat Detox Diagram -->
        <div id="animCardPrimary" data-reveal-line="3" style="position:absolute; top:56px; left:465px; width:465px; background:#FFFFFF; border:2.6px solid #171717; border-radius:16px; padding:12px 16px; box-shadow:0 12px 26px rgba(23,23,23,0.08);">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <!-- Panel A: Moon & Deep Sleep Wave (qualitative) -->
            <div style="background:#EFF6FF; border:2.2px solid #5D98E8; border-radius:14px; padding:10px; text-align:center;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#1E40AF;">🌙 ដំណេកជ្រៅ (Deep Sleep)</div>
              <svg width="140" height="86" viewBox="0 0 150 90" style="margin:4px auto;">
                <!-- Crescent Moon & Stars -->
                <path d="M 65 18 A 22 22 0 1 0 92 48 A 17 17 0 1 1 65 18 Z" fill="#EABF42" stroke="#171717" stroke-width="2" />
                <text x="108" y="28" font-size="13">✨</text>
                <!-- Smooth Restorative Delta Sleep Wave -->
                <path d="M 12 70 Q 32 46 52 70 T 92 70 T 132 70" fill="none" stroke="#5D98E8" stroke-width="4" stroke-linecap="round" />
              </svg>
              <div class="editable-text-node" contenteditable="true" style="font-size:16px; font-weight:900; color:#1E40AF;">គេងលក់ស្រួលជាងមុន</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:11px; font-weight:700; color:#475569;">ក្រោកព្រឹកស្រស់ស្រាយជាងមុន</div>
            </div>

            <!-- Panel B: Skin Pore Detox & Collagen Glow -->
            <div data-reveal-line="5" style="background:#E6F4EA; border:2.2px solid #2FAA61; border-radius:14px; padding:10px; text-align:center;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:800; color:#1E7E45;">✨ មុខស្រស់ស្រាយជាងមុន (ឧទាហរណ៍)</div>
              <svg width="140" height="86" viewBox="0 0 150 90" style="margin:4px auto;">
                <!-- Skin Layer Cross-Section with Sweat Detox Drops & Micro-Circulation -->
                <rect x="18" y="48" width="114" height="30" rx="8" fill="#BBF7D0" stroke="#171717" stroke-width="2.2" />
                <path d="M 24 62 Q 75 52 126 62" fill="none" stroke="#2FAA61" stroke-width="3" />
                <!-- Upward Sweat Detox Arrows -->
                <circle cx="48" cy="26" r="6" fill="#5D98E8" stroke="#171717" stroke-width="1.6" />
                <circle cx="102" cy="26" r="6" fill="#5D98E8" stroke="#171717" stroke-width="1.6" />
                <text x="75" y="32" text-anchor="middle" font-size="16">✨</text>
              </svg>
              <div class="editable-text-node" contenteditable="true" style="font-size:15px; font-weight:900; color:#1E7E45;">ឈាមរត់ល្អ 💧</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:11px; font-weight:700; color:#15803D;">គេងល្អ • ឈាមរត់ល្អ • មុខស្រស់</div>
            </div>
          </div>

          <!-- Hook Bridge to Shot 06 -->
          <div data-reveal-line="6" style="margin-top:10px; background:#FEF3C7; border:2px solid #EABF42; border-radius:10px; padding:6px 12px; display:flex; align-items:center; justify-content:space-between;">
            <span class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#92400E;">🪝 បើធ្វើបានយូរៗ តើបេះដូង ឆ្អឹង និងសុខភាពយើងផ្លាស់ប្តូរយ៉ាងណា?</span>
            <span style="font-weight:900; color:#92400E;">➔</span>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SHOT 06: 3-ORGAN ARMOR SHIELD (HEART/LUNGS/BONES) + MEDICAL PIGGY-BANK VAULT
    // -------------------------------------------------------------------------
    if (shot.sceneType === 'ep02-heart-wallet-payoff') {
      return `
        ${renderKeyTracker(5, '5. បេះដូង ឆ្អឹង និងការបង្ការជំងឺ')}

        <!-- Custom Concept Display 6: 3-Organ Armor Shield + Medical Savings Vault -->
        <div id="animCardPrimary" data-reveal-line="3" style="position:absolute; top:54px; left:365px; width:560px; background:#FFFFFF; border:2.6px solid #171717; border-radius:16px; padding:12px 16px; box-shadow:0 12px 26px rgba(23,23,23,0.08);">
          <div class="editable-text-node" contenteditable="true" style="font-size:15.5px; font-weight:900; color:#171717; margin-bottom:8px;">
            🛡️ ខែលការពារសរីរាង្គទាំង 3 • បង្ការ ចំណាយតិចជាងព្យាបាល
          </div>

          <!-- 3-Organ Armor Badges -->
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:10px;">
            <div style="background:#FEF2F2; border:2px solid #FA604E; border-radius:12px; padding:8px; text-align:center;">
              <div style="font-size:22px;">❤️</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:800; color:#171717;">បេះដូង & សរសៃឈាម</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:900; color:#2FAA61;">ហានិភ័យ ↓ ~20–30%</div>
            </div>
            <div data-reveal-line="4" style="background:#EFF6FF; border:2px solid #5D98E8; border-radius:12px; padding:8px; text-align:center;">
              <div style="font-size:22px;">🫁</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:800; color:#171717;">សួត & ភាពស៊ាំ</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:900; color:#1E40AF;">ដកដង្ហើមស្រួល</div>
            </div>
            <div data-reveal-line="4" data-reveal-delay="3" style="background:#FFFBEB; border:2px solid #EABF42; border-radius:12px; padding:8px; text-align:center;">
              <div style="font-size:22px;">🦴</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:800; color:#171717;">ឆ្អឹង & សន្លាក់</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:900; color:#92400E;">ហាត់សាច់ដុំ 2 ថ្ងៃ/សប្តាហ៍</div>
            </div>
          </div>

          <!-- Medical Piggy-Bank Savings Vault -->
          <div data-reveal-line="6" style="background:#E6F4EA; border:2.4px solid #2FAA61; border-radius:12px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between;">
            <div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#15803D;">🐷 ការបង្ការជំងឺ ជួយកាត់បន្ថយថ្លៃពេទ្យ និងថ្ងៃឈឺ</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:17px; font-weight:900; color:#1E7E45;">ចំណាយតិចជាងការព្យាបាល</div>
            </div>
            <span class="km-stamp-badge green editable-text-node" contenteditable="true" style="font-size:12px;">ចំណេញទាំងសុខភាព & លុយ!</span>
          </div>

          <!-- Hook Bridge to Chapter 5 -->
          <div data-reveal-line="7" style="margin-top:9px; background:#EFF6FF; border:2px solid #5D98E8; border-radius:10px; padding:6px 12px; display:flex; align-items:center; justify-content:space-between;">
            <span class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#1E40AF;">🪝 បើអត់មានលុយទៅក្លឹប តើយើងចាប់ផ្តើមបានទេ?</span>
            <span style="font-weight:900; color:#5D98E8;">➔</span>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SHOT 07: 2x2 ILLUSTRATED "$0 EXERCISE OPTIONS" CARD GRID
    // -------------------------------------------------------------------------
    if (shot.sceneType === 'ep02-zero-dollar-matrix') {
      return `
        ${renderKeyTracker(6, '6. ចាប់ផ្តើមដោយមិនអស់លុយ')}

        <!-- Custom Concept Display 7: 2x2 Illustrated $0 Exercise Grid -->
        <div id="animCardPrimary" data-reveal-line="3" style="position:absolute; top:54px; left:360px; width:565px; background:#FFFFFF; border:2.6px solid #171717; border-radius:16px; padding:12px 16px; box-shadow:0 12px 26px rgba(23,23,23,0.08);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="editable-text-node" contenteditable="true" style="font-size:15.5px; font-weight:900; color:#171717;">👟 ជម្រើសហាត់ប្រាណទាំង 4 (ឥតគិតថ្លៃ)</span>
            <span class="km-stamp-badge green editable-text-node" contenteditable="true" style="font-size:11.5px; padding:2px 10px;">ឥតគិតថ្លៃ!</span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:9px;">
            <!-- Card 1: 10-Min Post-Meal Walk -->
            <div data-reveal-line="3" data-reveal-delay="0.6" style="background:#EFF6FF; border:2px solid #5D98E8; border-radius:12px; padding:8px 10px;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:900; color:#1E40AF;">🚶 1. ដើរយឺតៗ 10 នាទីក្រោយបាយ</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:11.5px; font-weight:700; color:#171717; margin-top:3px;">ក្រោយបាយថ្ងៃត្រង់ & ល្ងាច ជួយឱ្យ <b>ស្ករឡើងតិចជាងមុន</b></div>
            </div>

            <!-- Card 2: 30-Min Brisk Walk -->
            <div data-reveal-line="3" data-reveal-delay="3.8" style="background:#E6F4EA; border:2.2px solid #2FAA61; border-radius:12px; padding:8px 10px;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:900; color:#1E7E45;">🏃 2. ដើរលឿន (Brisk Walk) 30 នាទី</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:11.5px; font-weight:700; color:#171717; margin-top:3px;">ដើរនៅសួនច្បារ ឬជុំវិញផ្ទះ ដុតខ្លាញ់ក្បាលពោះ</div>
            </div>

            <!-- Card 3: Jogging / Cycling / Badminton -->
            <div data-reveal-line="4" data-reveal-delay="0.2" style="background:#FFFBEB; border:2px solid #EABF42; border-radius:12px; padding:8px 10px;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:900; color:#92400E;">🚴 3. រត់តិចៗ • ជិះកង់ • វាយសី</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:11.5px; font-weight:700; color:#171717; margin-top:3px;">ហាត់ជាមួយមិត្តភក្តិ ឬគ្រួសារ កាន់តែសប្បាយ</div>
            </div>

            <!-- Card 4: 15-Min Home Bodyweight -->
            <div data-reveal-line="4" data-reveal-delay="5.2" style="background:#F8FAFC; border:2px solid #171717; border-radius:12px; padding:8px 10px;">
              <div class="editable-text-node" contenteditable="true" style="font-size:13px; font-weight:900; color:#171717;">💪 4. ហាត់សាច់ដុំនៅផ្ទះ 15 នាទី</div>
              <div class="editable-text-node" contenteditable="true" style="font-size:11.5px; font-weight:700; color:#475569; margin-top:3px;">អាវ៉ង់ • អង្គុយងើប (Squat) • ពត់ខ្លួនបំបាត់ឈឺចង្កេះ</div>
            </div>
          </div>

          <!-- Safety card (line 5) -->
          <div data-reveal-line="5" style="margin-top:9px; background:#FEF2F2; border:2px solid #FA604E; border-radius:10px; padding:7px 12px;">
            <span class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#B91C1C; line-height:1.5;">⚠️ ចាប់ផ្តើមថ្នមៗ • បើឈឺទ្រូង វិលមុខ ឬមានជំងឺរ៉ាំរ៉ៃ សូមសួរគ្រូពេទ្យជាមុន</span>
          </div>

          <!-- Hook Bridge to Shot 08 -->
          <div data-reveal-line="6" style="margin-top:9px; background:#FEF3C7; border:2px solid #EABF42; border-radius:10px; padding:6px 12px; display:flex; align-items:center; justify-content:space-between;">
            <span class="editable-text-node" contenteditable="true" style="font-size:12px; font-weight:800; color:#92400E;">🪝 ធ្វើយ៉ាងណាដើម្បីហាត់បានជាប់លាប់ មិនបោះបង់ចោលនៅថ្ងៃទី 3?</span>
            <span style="font-weight:900; color:#92400E;">➔</span>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------------------
    // SHOT 08: 30-DAY TROPHY TRANSFORMATION + 4-STEP HABIT CHECKLIST + OUTRO CTA
    // -------------------------------------------------------------------------
    if (shot.sceneType === 'ep02-habit-outro') {
      return `
        ${renderKeyTracker(7, '7. ទម្លាប់៖ តូច តែទៀងទាត់')}

        <!-- Custom Concept Display 8: 30-Day Trophy Header + Progressive Habit Checklist -->
        <div id="animCardPrimary" data-reveal-line="3" style="position:absolute; top:46px; left:405px; width:522px; background:#FFFFFF; border:2.6px solid #171717; border-radius:16px; padding:10px 15px; box-shadow:0 12px 26px rgba(23,23,23,0.08);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:7px;">
            <div class="editable-text-node" contenteditable="true" style="font-size:15px; font-weight:900; color:#171717;">
              🏆 ក្បួនបង្កើតទម្លាប់ហាត់ប្រាណមិនបោះបង់ចោល (4 ជំហាន)
            </div>
            <span class="km-dot-pill" style="font-size:11.5px; padding:2px 9px;"><span class="km-dot green"></span>តូច • ទៀងទាត់</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:5px;">
            <div class="km-check-row dimmed" data-check-line="3" data-check-delay="0.6" style="padding:5px 10px;">
              <div class="km-check-box"></div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:800;">1. ចាប់ផ្តើមតូចៗ៖ ដើរក្រោយបាយ ~10 នាទី (កុំបង្ខំខ្លួនខ្លាំងពេក)</div>
            </div>
            <div class="km-check-row dimmed" data-check-line="3" data-check-delay="2.6" style="padding:5px 10px;">
              <div class="km-check-box"></div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:800;">2. ក្រោកឈរ 2 នាទី រាល់ម៉ោងដែលអង្គុយ</div>
            </div>
            <div class="km-check-row dimmed" data-check-line="3" data-check-delay="5.2" style="padding:5px 10px;">
              <div class="km-check-box"></div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:800;">3. ធ្វើចលនាប្រហែល 30 នាទី ស្ទើរតែរាល់ថ្ងៃ</div>
            </div>
            <div class="km-check-row dimmed" data-check-line="3" data-check-delay="7.8" style="padding:5px 10px;">
              <div class="km-check-box"></div>
              <div class="editable-text-node" contenteditable="true" style="font-size:12.5px; font-weight:800;">4. ផឹកទឹក និងដេកឱ្យទៀងម៉ោង</div>
            </div>
          </div>
        </div>

        <!-- Director Outro Golden Takeaway & Subscribe CTA Card -->
        <div data-reveal-line="5" class="director-outro-card" style="top:312px; left:405px; width:522px; opacity:0;">
          <div>
            <div class="outro-quote editable-text-node" contenteditable="true">«រាងកាយមិនច្រេះចាប់ព្រោះអាយុទេ តែច្រេះចាប់ព្រោះយើងឈប់កម្រើក!»</div>
            <div class="outro-sub editable-text-node" contenteditable="true">ចាប់ផ្តើមដើរ 10 នាទីពីល្ងាចនេះ • តូច តែទៀងទាត់</div>
          </div>
          <div class="outro-cta-pill editable-text-node" contenteditable="true">🔔 Subscribe & Share</div>
        </div>
      `;
    }

    return '';
  }

  // ===========================================================================
  // EPISODE 02 DYNAMIC ASSET CATALOG (100% SCOPED TO DAILY EXERCISE TOPIC)
  // ===========================================================================
  function getAssetsCatalog() {
    const R = window.CharacterRig;
    return [
      // -------------------- 1. EP02 CONCEPT DISPLAY ELEMENTS (8) --------------------
      {
        id: 'elem:ep02_rusty_battery_dashboard',
        category: 'elements',
        nameKm: 'ផ្ទាំងវាស់រាងកាយច្រេះចាប់ (ឧទាហរណ៍) និងថ្មជីវិត 20%',
        nameEn: 'Shot 01 Dual-Dial Rusty Gear & 5-Cell Body Battery Dashboard',
        thumbHtml: `
          <div style="display:flex; gap:10px; align-items:center; transform:scale(0.82);">
            <div style="background:#FFFBEB; border:2px solid #EABF42; border-radius:10px; padding:6px 10px; text-align:center;">
              <div style="font-size:11px; font-weight:800; color:#92400E;">⚙️ ដុតខ្លាញ់</div>
              <div style="font-size:16px; font-weight:900; color:#FA604E;">(ឧទាហរណ៍)</div>
            </div>
            <div style="background:#FEF2F2; border:2px solid #FA604E; border-radius:10px; padding:6px 10px; text-align:center;">
              <div style="font-size:11px; font-weight:800; color:#B91C1C;">🪫 ថ្មរាងកាយ</div>
              <div style="font-size:16px; font-weight:900; color:#FA604E;">20%</div>
            </div>
          </div>`
      },
      {
        id: 'elem:ep02_two_percent_clock',
        category: 'elements',
        nameKm: 'នាឡិកា 24 ម៉ោង (រូបមន្ត 30 នាទី = 2% នៃថ្ងៃ)',
        nameEn: 'Shot 02 24-Hour Clock Pie Slice (30m = 2% Daily Rule) + VS Card',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:10px; background:#E6F4EA; border:2px solid #2FAA61; border-radius:10px; padding:6px 12px; transform:scale(0.84);">
            <svg width="46" height="46" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="46" fill="#FFFFFF" stroke="#171717" stroke-width="4" />
              <path d="M 55 55 L 55 9 A 46 46 0 0 1 88 23 Z" fill="#2FAA61" stroke="#171717" stroke-width="3" />
              <circle cx="55" cy="55" r="20" fill="#FEF08A" stroke="#171717" stroke-width="3" />
            </svg>
            <div style="font-size:12px; font-weight:900; color:#1E7E45;">30 នាទី = 2% នៃថ្ងៃ</div>
          </div>`
      },
      {
        id: 'elem:ep02_dual_brain_scanner',
        category: 'elements',
        nameKm: 'ម៉ាស៊ីនស្កេនខួរក្បាល (ស្ត្រេស ☁️ ទល់នឹង អុកស៊ីសែន ↑ ⚡)',
        nameEn: 'Shot 03 Dual-Hemisphere Brain Scanner (Stress vs Exercise O2)',
        thumbHtml: `
          <div style="display:flex; gap:8px; transform:scale(0.82);">
            <span class="km-dot-pill"><span class="km-dot coral"></span>☁️ Cortisol ↑</span>
            <span class="km-dot-pill"><span class="km-dot green"></span>🧠 O₂ ↑ ✨</span>
          </div>`
      },
      {
        id: 'elem:ep02_sugar_pipeline',
        category: 'elements',
        nameKm: 'បំពង់ផ្លូវជាតិស្ករទាំង 2 (ខ្លាញ់ក្បាលពោះ vs អេប៉ុងសាច់ដុំ ↓)',
        nameEn: 'Shot 04 2-Path Biological Sugar Pipeline (↓ Glucose)',
        thumbHtml: `
          <div style="display:flex; flex-direction:column; gap:4px; width:250px; transform:scale(0.8);">
            <div style="background:#FEF2F2; border:1.8px solid #FA604E; border-radius:6px; padding:3px 8px; font-size:11px; font-weight:800;">❌ អង្គុយស្ងៀម ➔ ខ្លាញ់ក្បាលពោះ</div>
            <div style="background:#E6F4EA; border:1.8px solid #2FAA61; border-radius:6px; padding:3px 8px; font-size:11px; font-weight:800;">✅ ដើរ 30m ➔ បឺតស្ករ ↓ ⚡</div>
          </div>`
      },
      {
        id: 'elem:ep02_sleep_skin_dial',
        category: 'elements',
        nameKm: 'ផ្ទាំងដំណេកជ្រៅ ↑ 🌙 និងស្បែកមុខភ្លឺថ្លា ✨',
        nameEn: 'Shot 05 Nighttime Moon Deep-Sleep Gauge & Skin Pore Detox',
        thumbHtml: `
          <div style="display:flex; gap:8px; transform:scale(0.84);">
            <span class="km-dot-pill"><span class="km-dot blue"></span>🌙 គេងស្កប់ ↑</span>
            <span class="km-dot-pill"><span class="km-dot green"></span>✨ ស្បែកភ្លឺថ្លា</span>
          </div>`
      },
      {
        id: 'elem:ep02_organ_shield_vault',
        category: 'elements',
        nameKm: 'ខែលការពារសរីរាង្គទាំង 3 🛡️ និងកូនជ្រូកសន្សំថ្លៃពេទ្យ $1,500',
        nameEn: 'Shot 06 3-Organ Armor Shield (Heart/Lungs/Bones) & Medical Vault',
        thumbHtml: `
          <div style="background:#E6F4EA; border:2px solid #2FAA61; border-radius:10px; padding:6px 12px; text-align:center; transform:scale(0.84);">
            <div style="font-size:11px; font-weight:800; color:#15803D;">❤️ បេះដូង ~20–30% • 🫁 សួត • 🦴 ឆ្អឹង</div>
            <div style="font-size:13px; font-weight:900; color:#1E7E45;">🐷 កាត់បន្ថយបន្ទុកចំណាយពេទ្យ</div>
          </div>`
      },
      {
        id: 'elem:ep02_zero_dollar_grid',
        category: 'elements',
        nameKm: 'តារាងជម្រើសហាត់ប្រាណមិនអស់លុយ $0 ទាំង 4 (2×2 Grid)',
        nameEn: 'Shot 07 2x2 Illustrated $0 Exercise Options Card Grid',
        thumbHtml: `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px; width:240px; transform:scale(0.82);">
            <div style="background:#EFF6FF; border:1.5px solid #5D98E8; border-radius:5px; padding:3px 6px; font-size:10px; font-weight:800;">🚶 ដើរ 10m ក្រោយបាយ</div>
            <div style="background:#E6F4EA; border:1.5px solid #2FAA61; border-radius:5px; padding:3px 6px; font-size:10px; font-weight:800;">🏃 ដើរលឿន 30m</div>
            <div style="background:#FFFBEB; border:1.5px solid #EABF42; border-radius:5px; padding:3px 6px; font-size:10px; font-weight:800;">🚴 រត់ / ជិះកង់</div>
            <div style="background:#F8FAFC; border:1.5px solid #171717; border-radius:5px; padding:3px 6px; font-size:10px; font-weight:800;">💪 ហាត់នៅផ្ទះ 15m</div>
          </div>`
      },
      {
        id: 'elem:ep02_habit_trophy_checklist',
        category: 'elements',
        nameKm: 'ពានរង្វាន់ 30 ថ្ងៃ 🏆 និងក្បួនបង្កើតទម្លាប់ 4 ជំហាន',
        nameEn: 'Shot 08 30-Day Transformation Trophy & 4-Step Habit Checklist',
        thumbHtml: `
          <div style="display:flex; flex-direction:column; gap:4px; width:260px; transform:scale(0.8);">
            <div class="km-check-row active-check" style="background:#E6F4EA; border-color:#2FAA61; padding:4px 8px;">
              <div class="km-check-box">✓</div>
              <div style="font-size:11px; font-weight:800; color:#1E7E45;">1. ដើរ 10 នាទីសិនក្នុងសប្តាហ៍ទី 1</div>
            </div>
            <div class="km-check-row active-check" style="background:#E6F4EA; border-color:#2FAA61; padding:4px 8px;">
              <div class="km-check-box">✓</div>
              <div style="font-size:11px; font-weight:800; color:#1E7E45;">4. ហាត់ 30m × 5 ថ្ងៃ/សប្តាហ៍ 🏆</div>
            </div>
          </div>`
      },

      // -------------------- 2. EP02 TOPIC-SPECIFIC VECTOR PROPS (7) --------------------
      {
        id: 'prop:ep02_top_center_header',
        category: 'props',
        nameKm: 'ស្លាកចំណងជើងកណ្តាល EPISODE 02 • ជីវិតប្រកបដោយសុខភាព',
        nameEn: 'Shot 01 Top-Center Health & Vital-Signs Capsule Prop',
        thumbHtml: `
          <div style="background:#FFFFFF; border:2.2px solid #171717; border-radius:999px; padding:4px 10px; display:flex; align-items:center; gap:7px; transform:scale(0.84);">
            <span style="font-size:14px;">❤️</span>
            <span style="background:#171717; color:#EABF42; border-radius:999px; padding:1px 7px; font-size:9.5px; font-weight:900;">🏃 EPISODE 02 • ជីវិតប្រកបដោយសុខភាព</span>
            <span style="background:#FEF3C7; border:1.5px solid #171717; border-radius:999px; padding:1px 6px; font-size:9px; font-weight:900;">2%</span>
          </div>`
      },
      {
        id: 'prop:ep02_rusty_spinal_chair',
        category: 'props',
        nameKm: 'កៅអីអង្គុយឈឺចង្កេះ ⚡ និងស្ពឺម៉ាស៊ីនច្រេះចាប់ ⚙️',
        nameEn: 'Shot 01 Stage Hero Prop: Rusty Spinal Chair & Back-Pain Lightning',
        thumbHtml: `
          <svg width="150" height="94" viewBox="145 235 130 205">
            ${window.EP02_VISUALS.renderRustySpinalChairPropSVG(235, 430)}
          </svg>`
      },
      {
        id: 'prop:ep02_body_battery_charger',
        category: 'props',
        nameKm: 'ថ្មរាងកាយខ្នាតធំសាកពេញ ពេញ (5-Cell Supercharger)',
        nameEn: 'Shot 02 Stage Hero Prop: Giant 2D Body Battery Supercharger',
        thumbHtml: `
          <svg width="140" height="96" viewBox="320 215 150 220">
            ${window.EP02_VISUALS.renderBodyBatteryChargerPropSVG(345, 430)}
          </svg>`
      },
      {
        id: 'prop:ep02_muscle_sponge_hero',
        category: 'props',
        nameKm: 'អេប៉ុងសាច់ដុំជើងបឺតជាតិស្ករ ↓ (Muscle Sponge Prop)',
        nameEn: 'Shot 04 Stage Hero Prop: Giant Leg Muscle Glucose Sponge',
        thumbHtml: `
          <svg width="160" height="96" viewBox="275 215 200 215">
            ${window.EP02_VISUALS.renderMuscleSpongePropSVG(320, 430)}
          </svg>`
      },
      {
        id: 'prop:ep02_dumbbell_hand',
        category: 'props',
        nameKm: 'ដុំដែកហាត់ប្រាណកាន់នឹងដៃ (Handheld Dumbbell Prop)',
        nameEn: 'Handheld Exercise Dumbbell Prop (gesture: hold-dumbbell)',
        thumbHtml: `
          <svg width="100" height="70" viewBox="-30 -20 60 40">
            <line x1="-20" y1="0" x2="20" y2="0" stroke="#171717" stroke-width="5" stroke-linecap="round" />
            <rect x="-24" y="-12" width="8" height="24" rx="3" fill="#5D98E8" stroke="#171717" stroke-width="2.2" />
            <rect x="16" y="-12" width="8" height="24" rx="3" fill="#5D98E8" stroke="#171717" stroke-width="2.2" />
          </svg>`
      },
      {
        id: 'prop:ep02_water_bottle_hand',
        category: 'props',
        nameKm: 'ដបទឹកកីឡាកាន់នឹងដៃ (Sport Hydration Bottle)',
        nameEn: 'Handheld Sport Water Bottle Prop (gesture: hold-water)',
        thumbHtml: `
          <svg width="80" height="86" viewBox="-20 -26 40 50">
            <rect x="-5" y="-21" width="10" height="6" rx="2" fill="#2FAA61" stroke="#171717" stroke-width="2" />
            <rect x="-10" y="-15" width="20" height="32" rx="5" fill="#E0F2FE" stroke="#171717" stroke-width="2.2" />
            <rect x="-8" y="-3" width="16" height="17" rx="3" fill="#5D98E8" fill-opacity="0.8" />
          </svg>`
      },
      {
        id: 'prop:office_desk_laptop',
        category: 'props',
        nameKm: 'តុធ្វើការការិយាល័យ និងកុំព្យូទ័រ (8-Hour Sitting Desk)',
        nameEn: 'Office Desk & Laptop Prop (Shot 01 Sitting Trap)',
        thumbHtml: `
          <svg width="170" height="90" viewBox="260 220 265 220">
            ${R.renderOfficeDeskLaptopSVG(282, 430)}
          </svg>`
      },

      // -------------------- 3. EP02 B-ROLL & BIOLOGICAL ICONS (6) --------------------
      {
        id: 'item:ep02_rusty_gear_icon',
        category: 'items',
        nameKm: 'ស្ពឺម៉ូតូច្រេះចាប់ vs សន្លាក់រាងកាយ ((ឧទាហរណ៍) Fat Burn)',
        nameEn: 'Metaphor Icon: Rusty Motorbike Gear vs Stiff Joints',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:8px; background:#FFFBEB; border:2px solid #D97706; border-radius:10px; padding:6px 10px;">
            <span style="font-size:20px;">⚙️</span>
            <span style="font-size:12px; font-weight:800; color:#92400E;">ច្រេះចាប់ • ដុតខ្លាញ់ (ឧទាហរណ៍)</span>
          </div>`
      },
      {
        id: 'item:ep02_happy_hormones_icon',
        category: 'items',
        nameKm: 'អរម៉ូនរីករាយ Endorphins & Dopamine បំបាត់ស្ត្រេស',
        nameEn: 'Brain Neurochemistry Icon: Endorphins + Dopamine Sparkles',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:8px; background:#E6F4EA; border:2px solid #2FAA61; border-radius:10px; padding:6px 10px;">
            <span style="font-size:20px;">🧠✨</span>
            <span style="font-size:12px; font-weight:800; color:#1E7E45;">Endorphins • ស្ត្រេស ↓</span>
          </div>`
      },
      {
        id: 'item:ep02_mitochondria_spark',
        category: 'items',
        nameKm: 'ម៉ាស៊ីនថាមពលកោសិកា (Mitochondria ↑ ⚡)',
        nameEn: 'Cellular Energy Spark Icon: ↑ Mitochondrial Output',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:8px; background:#EFF6FF; border:2px solid #5D98E8; border-radius:10px; padding:6px 10px;">
            <span style="font-size:20px;">⚡🔋</span>
            <span style="font-size:12px; font-weight:800; color:#1E40AF;">ថាមពលកោសិកា ↑</span>
          </div>`
      },
      {
        id: 'item:ep02_deep_sleep_moon',
        category: 'items',
        nameKm: 'រលកដំណេកជ្រៅពេលយប់ (Deep Sleep ↑ 🌙)',
        nameEn: 'Nighttime Restorative Delta Sleep Wave (↑)',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:8px; background:#EFF6FF; border:2px solid #5D98E8; border-radius:10px; padding:6px 10px;">
            <span style="font-size:20px;">🌙💤</span>
            <span style="font-size:12px; font-weight:800; color:#1E40AF;">Deep Sleep ↑</span>
          </div>`
      },
      {
        id: 'item:ep02_heart_shield_icon',
        category: 'items',
        nameKm: 'ខែលការពារបេះដូង និងសរសៃឈាម (~20–30% ជំងឺបេះដូង)',
        nameEn: 'Cardiovascular Shield Icon: ~20–30% Heart Disease Risk',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:8px; background:#FEF2F2; border:2px solid #FA604E; border-radius:10px; padding:6px 10px;">
            <span style="font-size:20px;">❤️🛡️</span>
            <span style="font-size:12px; font-weight:800; color:#B91C1C;">ការពារបេះដូង ~20–30%</span>
          </div>`
      },
      {
        id: 'item:ep02_medical_piggy_bank',
        category: 'items',
        nameKm: 'កូនជ្រូកសន្សំលុយថ្លៃពេទ្យ ',
        nameEn: 'Preventive Health Piggy Bank ',
        thumbHtml: `
          <div style="display:flex; align-items:center; gap:8px; background:#E6F4EA; border:2px solid #2FAA61; border-radius:10px; padding:6px 10px;">
            <span style="font-size:20px;">🐷💵</span>
            <span style="font-size:12px; font-weight:800; color:#1E7E45;">កាត់បន្ថយបន្ទុកចំណាយពេទ្យ</span>
          </div>`
      },

      // -------------------- 4. EP02 ANTHOLOGY CAST CHARACTERS (3) --------------------
      {
        id: 'char:vichetr',
        category: 'characters',
        nameKm: 'វិចិត្រ (Vichetr — តួអង្គឯក EP02)',
        nameEn: '29yo Office Worker -> ពេញ Energetic Runner (stretch-arms / hold-dumbbell / jog-energetic)',
        actorConfig: { id: 'char_vichetr', name: 'វិចិត្រ', style: 'minimal', hair: 'short-spiky', emotion: 'excited', gesture: 'jog-energetic', blackNameTag: 'វិចិត្រ' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 140 150 310">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'minimal', hair: 'short-spiky', emotion: 'excited', gesture: 'jog-energetic' })}
          </svg>`
      },
      {
        id: 'char:sophea',
        category: 'characters',
        nameKm: 'គ្រូពេទ្យ សុភា (Dr. Sophea — វេជ្ជបណ្ឌិតសុខភាព EP02)',
        nameEn: 'Preventive Health Doctor • Teal Blazer (#2FAA61) • Sport Water Bottle',
        actorConfig: { id: 'char_sophea', name: 'សុភា', style: 'outfitted', hair: 'top-bun-glasses', outfit: 'teal-health', emotion: 'happy', gesture: 'hold-water', blackNameTag: 'សុភា' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 140 150 310">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'outfitted', hair: 'top-bun-glasses', outfit: 'teal-health', emotion: 'happy', gesture: 'hold-water' })}
          </svg>`
      },
      {
        id: 'char:samnang',
        category: 'characters',
        nameKm: 'ពូសំណាង (Pou Samnang — អ៊ំពូអ្នករត់អាយុ 58 ឆ្នាំ)',
        nameEn: '58yo Energetic Park Runner • ពេញ Body Battery Role Model',
        actorConfig: { id: 'char_samnang', name: 'ពូសំណាង', style: 'outfitted', hair: 'curly-clerk', outfit: 'blue-orange-bag', emotion: 'excited', gesture: 'jog-energetic', blackNameTag: 'ពូសំណាង' },
        thumbHtml: `
          <svg width="110" height="96" viewBox="170 140 150 310">
            ${R.renderActorSVG({ x: 245, y: 430, style: 'outfitted', hair: 'curly-clerk', outfit: 'blue-orange-bag', emotion: 'excited', gesture: 'jog-energetic' })}
          </svg>`
      },

      // -------------------- 5. EP02 LOCATIONS (5) --------------------
      ...[
        { locId: 'office', km: '1. ការិយាល័យអង្គុយធ្វើការ 8 ម៉ោង (Office Desk)', en: 'Shot 01 Sitting Trap Location' },
        { locId: 'park', km: '2. សួនច្បារសាធារណៈ (Park Jogging Track)', en: 'Shot 02 & Shot 08 Morning/Evening Jogging Park' },
        { locId: 'whiteboard', km: '3. ផ្ទាំងពន្យល់វិទ្យាសាស្ត្រ (Science Explainer Board)', en: 'Shot 03, 04 & 06 High-Key Explainer Canvas' },
        { locId: 'bedroom', km: '4. បន្ទប់គេងពេលយប់ (Deep Sleep Bedroom)', en: 'Shot 05 Nighttime Restorative Sleep Bedroom' },
        { locId: 'living-room', km: '5. កន្លែងហាត់ប្រាណនៅផ្ទះ (Home Workout Mat & Dumbbell)', en: 'Shot 07 $0 Home Exercise Space' }
        ,{ locId: 'kitchen', km: 'ផ្ទះបាយ', en: 'Shot 04 Post-meal Conversation' }
      ].map((l) => ({
        id: `loc:${l.locId}`,
        category: 'locations',
        locId: l.locId,
        nameKm: l.km,
        nameEn: l.en,
        thumbHtml: `
          <svg width="210" height="92" viewBox="50 60 860 420">
            ${R.renderLocationSVG(l.locId, { showPawnSign: false, envOpacity: 1 })}
          </svg>`
      }))
    ];
  }



  return {
    EPISODE_ID: 'ep02-daily-exercise',
    EPISODE_TRANSITION,
    SHOTS,
    ASSETS: getAssetsCatalog,
    renderInfographic
  };
})();
