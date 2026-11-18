const { searchWikimedia } = require('./image-utils.cjs');

async function checkDetails() {
  const queries = [
    'Bai Dinh arhat corridor',
    'Bai Dinh La Han',
    'Arhat Bai Dinh',
    'Chua Bai Dinh X',
    'Chùa Kỳ Lân',
    'Thung Nham',
    'Dong Thien Ha',
    'Tam Diep Ninh Binh',
    'Dong Giao Ninh Binh'
  ];

  for (const q of queries) {
    console.log('Query:', q);
    const res = await searchWikimedia(q, 4);
    res.forEach(r => {
      console.log(' -', r.title, `${r.width}x${r.height}`, '|', r.artist, '|', r.license);
      console.log('   URL:', r.url);
    });
  }
}
checkDetails();
