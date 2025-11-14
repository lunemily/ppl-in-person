import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const prod = false;
const port = prod ? 26438 : 26441;
const prodPort = 26438;
const paxEvent = 'unplugged';

function cleanup() {
  fs.rmdirSync('bin/qr', { recursive: true, force: true });
  fs.mkdirSync('bin/qr');
}

async function create(dataForQRcode, center_image, width, cwidth) {
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(canvas, dataForQRcode, {
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });

  const ctx = canvas.getContext('2d');
  const img = await loadImage(center_image);
  const center = (width - cwidth) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  return canvas.toDataURL('image/png');
}

async function main(leader) {
  try {
    const qrCode = await create(
      `https://paxpokemonleague.net/${paxEvent}/?qr=true&opponentId=${leader.id}&opponentType=leader`,
      `https://toastserv.com:${port}/static/badges/${leader.id}.png`,
      225,
      100,
    );
    // Remove header if present
    const base64Data = qrCode.replace(/^data:image\/\w+;base64,/, '');

    // Create a buffer from the base64 string
    const buffer = Buffer.from(base64Data, 'base64');

    fs.writeFileSync(`bin/qr/${leader.name.replaceAll('"', '')}.png`, buffer);
  } catch (err) {
    console.error(`Failed on ${leader.name}: ${err}`);
  }
}

async function getLeaderData() {
  const rawLeaderData = await (await fetch(`https://toastserv.com:${port}/api/v2/allleaderdata`)).json();
  const leaderData = Object.keys(rawLeaderData).map((leadrId) => {
    return {
      id: leadrId,
      name: rawLeaderData[leadrId]['name'],
    };
  });
  return leaderData;
}

cleanup();

const leaderData = await getLeaderData();

// add bingler
// leaderData.push({ id: 'be24de2c8b94', name: 'Lord Bingler, King of the Bingo Hall' });

// add followingler
// leaderData.push({ id: 'cddaba15d491', name: 'Lord Fingler, the Socialite' });

// add artingler
leaderData.push({ id: 'f00c087d1a2c', name: 'Lord Fingler, the Artiste' });

// add Guesler
leaderData.push({ id: 'be24de2c8b94', name: 'Lord Guesler, the Detective' });

console.info(JSON.stringify(leaderData));
leaderData.map((leader) => {
  main(leader);
});
