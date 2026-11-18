const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NinhBinhTravelMiniApp/1.0 (edu contest; congvanvu0000@gmail.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function search(q) {
  console.log(`\n=== Searching for: ${q} ===`);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&format=json&srlimit=10`;
  const res = await fetchJson(url);
  const results = res.query?.search || [];
  for (const r of results) {
    console.log(r.title);
  }
  return results;
}

async function getInfo(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  const res = await fetchJson(url);
  const pages = res.query?.pages || {};
  const page = Object.values(pages)[0];
  const info = page?.imageinfo?.[0];
  if (info) {
    console.log(`URL for ${title}: ${info.url}`);
    console.log(`Size: ${info.width}x${info.height}`);
    console.log(`Artist: ${info.extmetadata?.Artist?.value}`);
    console.log(`License: ${info.extmetadata?.LicenseShortName?.value}`);
    return info;
  }
}

async function run() {
  const r1 = await search('Đền Thái Vi');
  if (r1.length > 0) {
    for (const item of r1.slice(0, 5)) {
      await getInfo(item.title);
    }
  }

  const r2 = await search('"Thai Vi" Ninh Binh');
  if (r2.length > 0) {
    for (const item of r2.slice(0, 5)) {
      await getInfo(item.title);
    }
  }
}

run().catch(console.error);
