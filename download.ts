import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

async function downloadFile(url: string, dest: string) {
  console.log(`Downloading ${url} to ${dest}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
  const fileStream = fs.createWriteStream(dest, { flags: 'w' });
  await finished(Readable.fromWeb(res.body as any).pipe(fileStream));
  console.log(`Downloaded ${dest}`);
}

async function main() {
  try {
    await downloadFile('https://drive.google.com/uc?export=download&id=1Z2RnMWGMLjQ9sxf9cn7woEGXMnMgEf2S', 'public/dapp revamp.mp4');
    await downloadFile('https://drive.google.com/uc?export=download&id=1-RXWgFpc1mpOURkP9zRid5d39-OjM8Y1', 'public/mma cubik.mp4');
    await downloadFile('https://drive.google.com/uc?export=download&id=1-DA22ivueJaZiZB_1wQOVkwChlMEXeuR', 'public/Anim.mp4');
  } catch (e) { console.error(e); }
}

main().catch(console.error);
