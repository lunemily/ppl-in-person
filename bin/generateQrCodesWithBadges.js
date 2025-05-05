import QRCode from 'qrcode'
import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'

async function create(dataForQRcode, center_image, width, cwidth) {
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(
    canvas,
    dataForQRcode,
    {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }
  );

  const ctx = canvas.getContext("2d");
  const img = await loadImage(center_image);
  const center = (width - cwidth) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  return canvas.toDataURL("image/png");
}

async function main(leader) {
  const qrCode = await create(
    `https://paxpokemonleague.net/east/?qr=true&opponentId=${leader.id}&opponentType=leader`,
    `https://toastserv.com:26438/static/badges/${leader.id}.png`,
    225,
    100
  );
  // Remove header if present
  const base64Data = qrCode.replace(/^data:image\/\w+;base64,/, '');

  // Create a buffer from the base64 string
  const buffer = Buffer.from(base64Data, 'base64');

  fs.writeFileSync(`bin/qr/${leader.name.replaceAll("\"", "")}.png`, buffer)
}

async function getLeaderData() {
  const rawLeaderData = await (await fetch('https://toastserv.com:26438/api/v2/allleaderdata')).json()
  const leaderData = Object.keys(rawLeaderData).map((leadrId) => {
    return {
      id: leadrId,
      name: rawLeaderData[leadrId]["name"]
    }
  })
  return leaderData;
}

const leader = {
  id: 'ddf034dfc811',
  name: 'Titania, Fae Queen of Il Mheg'
}

const leaderData = await getLeaderData()
leaderData.map((leader) => {
  main(leader)
})
