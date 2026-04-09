/* ============================================================
   TessMaedia — Intro Reel Recorder
   Gebruik: node record-intro.js
   Vereist: server draait op localhost:3001 (npm run dev)
   Output:  intro-reel.mp4 in deze map
   ============================================================ */

const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const path = require('path');

const URL        = 'http://localhost:3001/intro-reel.html';
const OUTPUT     = path.join(__dirname, 'intro-reel.mp4');
const WIDTH      = 1080;
const HEIGHT     = 1920;  // portrait — Instagram/TikTok reel formaat (9:16)
const DURATION_MS = 9500; // één volledige cyclus (~9s) + kleine buffer

async function record() {
  console.log('🎬 TessMaedia intro recorder gestart...');
  console.log(`   Pagina  : ${URL}`);
  console.log(`   Resolutie: ${WIDTH}×${HEIGHT} (portrait 9:16)`);
  console.log(`   Output  : ${OUTPUT}\n`);

  const browser = await puppeteer.launch({
    headless: true,            // geen titelbalk → exacte viewport hoogte
    defaultViewport: { width: WIDTH, height: HEIGHT },
    args: [
      `--window-size=${WIDTH},${HEIGHT}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--force-device-scale-factor=1',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  // Wacht tot fonts geladen zijn
  await page.goto(URL, { waitUntil: 'networkidle0' });

  const recorder = new PuppeteerScreenRecorder(page, {
    followNewTab : false,
    fps          : 60,
    videoFrame   : { width: WIDTH, height: HEIGHT },
    videoCrf     : 18,          // kwaliteit (lager = beter, 18 = visueel lossless)
    videoCodec   : 'libx264',
    videoPreset  : 'ultrafast',
    videoBitrate : 8000,
    autopad      : { color: '#080808' },
  });

  console.log('⏺  Opname gestart...');
  await recorder.start(OUTPUT);

  // Wacht één volledige animatiecyclus
  await new Promise(r => setTimeout(r, DURATION_MS));

  await recorder.stop();
  await browser.close();

  console.log(`\n✅ Klaar! Opgeslagen als: intro-reel.mp4`);
}

record().catch(err => {
  console.error('\n❌ Fout:', err.message);
  console.error('   Controleer of de server draait: npm run dev');
  process.exit(1);
});
