const { searchWikimedia } = require('./image-utils.cjs');

async function testSearch() {
  const queries = [
    'Trang An Ninh Binh',
    'Tam Coc Ninh Binh',
    'Hang Mua Ninh Binh',
    'Bai Dinh pagoda',
    'Hoa Lu Ninh Binh',
    'Cuc Phuong National Park',
    'Van Long Ninh Binh',
    'Phat Diem cathedral'
  ];
  for (const q of queries) {
    const items = await searchWikimedia(q, 3);
    console.log(q, '=> found items:', items.length);
    items.forEach(it => {
      console.log('  -', it.title, `(${it.width}x${it.height})`, 'by', it.artist, '|', it.license);
    });
  }
}
testSearch();
