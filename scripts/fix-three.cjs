const { searchWikimedia } = require('./image-utils.cjs');

async function fixThree() {
  const titles = [
    'View from Hang Mua.jpg',
    'Bai Dinh Pagoda (36519413585).jpg',
    'Dinh Bo Linh Shrine, Hoa Lư, Ninh Bình, Vietnam, 20240203 1502 5693.jpg'
  ];
  for (const t of titles) {
    const res = await searchWikimedia(t, 1);
    if (res.length > 0) {
      console.log('Title:', res[0].title);
      console.log('Direct URL:', res[0].url);
      console.log('FilePath:', `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(res[0].title.replace(/^File:/, ''))}`);
    }
  }
}
fixThree();
