# Khmer 2D Educational Animation Studio

A local Khmer-language animation studio for YouTube (16:9), TikTok (9:16) and Facebook (1:1). EP02 Daily Exercise is the sole installed episode: eight production shots and a separate cast/prop inspection sheet.

## Run and verify

```powershell
npm start
# Open http://localhost:8080
npm test
npm run validate
npm run qa:layout -- --serve
```

Chrome or Edge is required for headless QA and export; set `CHROME_PATH` if discovery fails. QA uses the existing Puppeteer dependency, starts a temporary server on port 8099 and writes evidence to `exports/qa/`.

## Create an episode

```powershell
npm run episode:new -- ep03-topic-slug
```

This creates an empty planning workspace with pending approval gates. Follow research → topic approval → unique cast/visual approval → full Khmer script approval → voice prompts → scenes/audio → QA → export. See [architecture](docs/EPISODE_ARCHITECTURE.md), [workflow](docs/WORKFLOW_SOP.md) and [agent rules](AGENTS.md).

## Structure

- `engine/episode-registry.js`: registered episodes and selector discovery.
- `engine/timeline.js`: shared line timing for preview/export.
- `engine/scene-player.js`: playback, inspector, layout and frame stepping.
- `engine/character-rig.js`: shared character/environment primitives.
- `episodes/ep02-daily-exercise/episode.js`: manifest and rendering hooks.
- `episodes/ep02-daily-exercise/scenes.js`: shots, lines, concepts and asset catalog.
- `episodes/ep02-daily-exercise/visuals.js`: custom props and cast sheet.
- `server.js`: local files and export API.
- `export-video.js`: deterministic frames and FFmpeg encoding.
- `tools/`: scaffolding, validation and browser QA.

## Audio and export

EP02 expects one recording per line under `episodes/ep02-daily-exercise/audio/voice/shot_XX/line_NN_<speaker>.wav` or `.mp3`. Missing files use estimated timing. Check completeness with `node tools/validate-episode.js ep02-daily-exercise --final`; missing recordings do not currently prevent estimated exports.

With the studio server running:

```powershell
npm run export:shot
npm run export:ep02
npm run export:tiktok
node export-video.js --deck ep02 --shot 1 --aspect 1:1 --fps 30
```

MP4s go to `exports/`. Preview/export share line scheduling and hero props; actor rendering still has separate paths. Editable stage text is temporary and is not saved to source files. Production approval records are manual; see the architecture document for remaining migration work.

EP02 dialogue bubbles show the current speaker's matching portrait and Khmer name. On-stage speakers have speech tails; off-screen speakers show an off-screen or phone label without a tail. Narrator lines keep the running caption bar. Bubble timing follows the same line timeline used by preview and export; real voice recordings are still required for audio synchronization sign-off.

All eight EP02 shots anchor speech boxes close above their speakers in YouTube, Facebook and TikTok layouts, including seated characters. This is also the default authoring rule for future episodes; see `AGENTS.md` and the scene-builder skill.
