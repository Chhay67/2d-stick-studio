const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4'
};

const exportJobs = new Map();

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const safePath = decodeURIComponent(parsedUrl.pathname);

  // 1. API: Start Deterministic MP4 Export Job
  if (req.method === 'POST' && safePath === '/api/export/start') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const opts = JSON.parse(body || '{}');
        const jobId = `job_${Date.now()}`;
        exportJobs.set(jobId, {
          status: 'running',
          percent: 1,
          message: 'Starting export pipeline...',
          outputFile: null,
          error: null
        });

        const { runDeterministicVideoExport } = require('./export-video');
        runDeterministicVideoExport({
          deck: opts.deck || 'ep02',
          shot: opts.shot || null,
          aspect: opts.aspect || '16:9',
          fps: opts.fps || 30,
          port: PORT,
          onProgress: (prog) => {
            const cur = exportJobs.get(jobId);
            if (cur) {
              cur.percent = prog.percent ?? cur.percent;
              cur.message = prog.message || cur.message;
              if (prog.outputFile) cur.outputFile = prog.outputFile;
            }
          }
        })
          .then((result) => {
            exportJobs.set(jobId, {
              status: 'done',
              percent: 100,
              message: 'Export Complete!',
              outputFile: result.outputFile,
              error: null
            });
          })
          .catch((err) => {
            exportJobs.set(jobId, {
              status: 'error',
              percent: 0,
              message: 'Export Failed',
              outputFile: null,
              error: err.message
            });
          });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ jobId }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 2. API: Poll Export Job Status
  if (req.method === 'GET' && safePath === '/api/export/status') {
    const jobId = parsedUrl.searchParams.get('jobId');
    const job = exportJobs.get(jobId);
    if (!job) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Job not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(job));
    return;
  }

  // 3. Static File Server
  const relPath = safePath === '/' ? '/index.html' : safePath;
  const filePath = path.join(ROOT, relPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Khmer 2D Animation Studio running at http://localhost:${PORT}`);
});
