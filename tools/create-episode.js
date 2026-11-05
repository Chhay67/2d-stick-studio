const fs = require('node:fs');
const path = require('node:path');
const directory = process.argv[2];
if (!/^ep\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(directory || '')) {
  console.error('Usage: npm run episode:new -- ep03-topic-slug');
  process.exit(1);
}
const target = path.join(__dirname, '..', 'episodes', directory);
if (fs.existsSync(target)) throw new Error('Episode already exists: ' + directory);
fs.mkdirSync(path.join(target, 'audio', 'voice'), { recursive: true });
const documents = {
  '01_topic_brief.md': '# Topic brief — DRAFT\n\nPillar:\nViewer problem:\n\n## Sources and claim → verdict → safe wording\n\n## Chapters and Hook/Catch bridges\n\n## Health safety line (when applicable)\n\nGate 1: pending user approval.\n',
  '02_character_and_prop_sheet.md': '# Cast and visual development — NOT STARTED\n\nBegin after Gate 1 approval. Invent unique cast, props, locations and concept displays.\n\nGate 2: pending.\n',
  '03_shot_script.md': '# Shot script — NOT STARTED\n\nBegin after Gate 2 approval. Include spoken Khmer, visual Khmer, line speaker, beat, acting, concept and Hook/Catch.\n\nGate 3: pending.\n',
  '04_ai_studio_voice_prompts.md': '# Voice prompts — NOT STARTED\n\nGenerate from the approved script after Gate 3.\n',
  'README.md': '# ' + directory + '\n\nStart at Gate 1. See ../../docs/EPISODE_ARCHITECTURE.md for the build contract. Do not clone EP02 content or register an empty episode.\n'
};
for (const [name, content] of Object.entries(documents)) fs.writeFileSync(path.join(target, name), content);
fs.writeFileSync(path.join(target, 'production.json'), JSON.stringify({
  schemaVersion: 1, episodeId: directory, stage: 'research',
  gates: { topic: { status: 'pending' }, cast: { status: 'pending' }, script: { status: 'pending' } },
  audio: 'not-started', visualQa: 'not-started', export: 'not-started'
}, null, 2) + '\n');
console.log('Created ' + directory + '. Prepare topic brief and request Gate 1 approval.');
