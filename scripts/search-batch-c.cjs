const { searchWikimedia } = require('./image-utils.cjs');

async function testBatchC() {
  const queries = [
    'dê núi',
    'cơm cháy',
    'cá nướng',
    'grilled snakehead fish',
    'rice Tam Coc golden',
    'Tam Coc harvest'
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
testBatchC();
