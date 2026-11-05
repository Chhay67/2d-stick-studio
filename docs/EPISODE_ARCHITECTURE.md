# Episode architecture and production contract

EP02 Daily Exercise is the sole installed episode and reference implementation. EP01, the financial pilot, their recordings and EP01 export have been removed.

## Runtime structure

- `engine/episode-registry.js`: strict episode lookup and selector discovery.
- `engine/timeline.js`: pure line timing shared by browser and Node exporter.
- `engine/character-rig.js`: shared anatomy, acting and environment primitives.
- `engine/scene-player.js`: studio UI, playback, camera, layout and frame stepping.
- `episodes/ep02-daily-exercise/episode.js`: manifest and rendering hooks.
- `episodes/ep02-daily-exercise/scenes.js`: authored shots, Khmer lines, concepts and catalog.
- `episodes/ep02-daily-exercise/visuals.js`: custom hero props and character sheet.
- `episodes/ep02-daily-exercise/production.json`: gate evidence and production status.
- `tools/`: scaffolding, validation and headless layout QA.
- `export-video.js`: PCM mix, browser frames and FFmpeg encoding.

Load registry, shared timeline and rig before episode visuals, scenes and manifest; load the player last.

## Manifest contract

Register through `window.EpisodeRegistry.register()` in the episode's `episode.js`:

- `id`, `title`, `SHOTS`, `EPISODE_TRANSITION`.
- `ASSETS()`: unique asset IDs and thumbnails.
- `getAssetUsage()`: derive badges from shot asset references, actual actors and locations.
- `renderInfographic(shot)`: episode concepts and dialogue bubbles.
- `renderHeroProps(shot, elapsed)`: shared live/export hook; derive animation from elapsed time.
- `renderCharacterSheet()`: episode inspection SVG.
- Optional `layoutInfographic(shot, aspect, container)`: own a topic-specific responsive composition and return `true` to skip generic mobile fitting. Restore wide layout through the player's original-style reset. `shot.formatCamera[aspect].offsetY` can lower the cast in the default wide camera framing for square/vertical compositions.

Add a built episode's visuals, scenes and manifest script tags to `index.html`. The selector is generated from the registry. Never add episode-ID branches to shared selection/export code. Unknown IDs fail explicitly. Character-sheet entries are inspection-only and excluded from exports.

Topic-specific props and composition belong inside the episode. Existing topic-specific gestures and some EP02 camera/layout rules remain in the shared engine as migration work; do not extend this pattern for new episodes.

## Timing and audio

`StudioTimeline.compileLines(lines, measuredDurations)` is pure and shared by preview and export: 0.35s initial offset, 0.30s gap, 0.50s tail. Measured durations override estimates. The player currently applies compiled times to runtime shot objects for compatibility; full authoring/runtime separation is later work.

Author `lines[]` with speaker, beat, spoken Khmer, visual text and duration estimate. Bind visual events to line numbers. Recordings use `audio/voice/shot_XX/line_NN_<speaker>.wav|mp3`. Reordering lines changes filenames; refresh affected prompts and recordings.

## New episode flow

1. `npm run episode:new -- ep03-topic-slug` creates planning documents, pending gates and audio folder without copying content.
2. Research sources, claim/verdict/safe wording, chapter arc and Hook/Catch. Obtain Gate 1 approval.
3. Invent unique cast, props and concepts. Obtain Gate 2 approval before scripting.
4. Write the full dual Khmer script. Obtain Gate 3 approval before voice prompts or scene implementation.
5. Build episode modules and add script tags when a preview exists. Import recordings.
6. Validate every shot, inspect audio timing, run all-format QA, review screenshots and export a test movie.

`production.json` is manually maintained, not an automatic approval system. Never infer approval from file existence. Record explicit evidence; mark affected stages stale after approved content changes. EP02's Gate 1 is evidenced by its brief; later gate approvals remain unverified.

## Verification

```powershell
npm test
npm run validate
node tools/validate-episode.js ep02-daily-exercise --final
npm run qa:layout -- --serve
npm run export:shot
```

Regular validation permits estimated previews and reports missing audio, narrator targets and off-stage speakers. `--final` also fails for missing recordings. The exporter still permits estimated renders. Layout QA writes `exports/qa/layout.json` and screenshots; bounding-box checks do not establish fact accuracy, storytelling, audio quality, font shaping or every visual collision.

## Speaker dialogue implementation

EP02's `renderDialogueBubbles(shot)` in `scenes.js` creates one bubble per character line. The bubble contains a static portrait rendered from that speaker's cast appearance, an editable Khmer name tag and the line's visual Khmer text. Identity comes from `actorId`, `speaker` and `speakerLabel`, including speakers absent from the current shot's actor list.

`data-speaker-actor` records identity, `data-speaker-presence` distinguishes `onstage` and `offscreen`, and `data-speak-line` binds visibility to the compiled audio timeline. On-stage bubbles have a speech tail; off-screen bubbles omit it and show `ក្រៅឆាក`. If an off-screen speaker label contains `ទូរស័ព្ទ`, the tag displays `☎` and that phone label instead. These presence labels describe the current stage cast; they do not infer a story location.

Episode styling lives in `episodes/ep02-daily-exercise/styles.css`, linked from `index.html`. The 38px portrait sits beside the dialogue with a 10px gap; Khmer text uses line-height 1.65. Portraits identify the speaker without becoming animated lip-sync actors. Narrator lines continue using the running caption bar.

Shot 02 keeps its compact concept panel under the tracker in square/vertical layouts. All eight EP02 production shots now place speech boxes directly above their respective speakers in all three formats, rather than in a fixed top dialogue row. The episode manifest’s `anchorDialogue(shot, aspect, container, svg)` hook runs after camera framing: it projects the speaker’s crown and horizontal position through the current SVG viewBox, measures the dialogue height, and places the tail toward that speaker. Square/vertical cast offsets reserve room between concepts and dialogue. The QA audit checks text overflow, header clearance and overlay collisions.

When adding a styled episode, link its stylesheet as well as its scripts. Check representative on-stage, off-stage and phone lines in all formats. The existing audit detects overlay rectangle collisions but does not verify speech-tail alignment or actual voice synchronization; inspect screenshots and recorded audio separately.

## Further migration

### Preview transition readiness

Live playback reserves the longest CSS entrance animation (wipe or camera), then a 640ms lead-in, before starting the shot clock. Manual Play and full-episode auto-advance use the same readiness gate and wait for voice loading too. Stop and shot selection cancel queued starts. The previous shot retains its 550ms breathing pause before switching. `node tools/check-playback.js` (or `npm run qa:playback`) verifies manual playback, auto-advance and cancellation using shortened estimated lines in a temporary browser session.

This readiness gate is for live preview. Deterministic export still uses its separate frame-stepped entrance schedule; matching that schedule to preview is part of the remaining frame-render migration.

Planned, not implemented: production status UI, automatic gate invalidation, generated review scripts/prompts, a fully shared actor/frame renderer and separate playback/audio/camera/UI modules. Migrate one boundary at a time against EP02; preserve calibrated rig and typography defaults.


### Episode-wide speaker anchoring

TikTok info panels use content-led styling rather than a fixed cross-shot grid. Topic metadata scopes responsive typography: headings and badges wrap cleanly, comparison/activity grids use balanced columns, and checklist rows align icons with Khmer text. Each shot retains content-led vertical placement; TikTok primary, intro, cutaway and outro info panels use 10% horizontal margins and 80% displayed stage width. The fit hook keeps panels clear of speaker-anchored dialogue; its width fitting preserves those horizontal margins while adapting typography and height. Cutaway and outro space is reserved to prevent collisions.

The manifest anchor hook runs for every line-based shot. It accounts for seated poses, actor scale and camera framing. Off-screen dialogue remains explicitly labelled and has no tail; its panel sits near the cast rather than inventing an on-stage speaker. Mobile concept cards fit into the area above the dialogue. Wide-format text may wrap beneath its portrait and reduce from 13px to a minimum 11.5px for long lines, preserving Khmer line-height 1.65. Header/text clearance checks and representative screenshots cover all shots.

Text fitting is cached by format, width and font readiness using stable base framing, so camera movement cannot change wrapping mid-line. Bubble entrances fade without scale/translation animation; positions still follow the camera. SVG camera coordinates retain four decimal places to avoid coarse stepping. Run `npm run qa:layout -- --serve --jitter` to sweep each shot in 0.1-second increments and detect mid-line height/font changes or position jumps above two stage pixels, in addition to the regular layout checks. This frame-stepped check does not replace listening to real recordings or reviewing live playback.
