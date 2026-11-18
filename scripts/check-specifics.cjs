const { searchWikimedia, searchWikimediaCategory } = require('./image-utils.cjs');

async function checkSpecifics() {
  console.log('--- Category:Bai Dinh Pagoda ---');
  const bd = await searchWikimediaCategory('Category:Bai Dinh Pagoda', 30);
  bd.filter(x => x.width > x.height).forEach(x => {
    console.log('BD:', x.title, `${x.width}x${x.height}`, '|', x.artist, '|', x.license);
  });

  console.log('--- Category:Dinh Bo Linh Shrine ---');
  const dbl = await searchWikimediaCategory('Category:Dinh Bo Linh Shrine', 20);
  dbl.filter(x => x.width > x.height).forEach(x => {
    console.log('DBL:', x.title, `${x.width}x${x.height}`, '|', x.artist, '|', x.license);
  });

  console.log('--- Galaxy Cave / Thien Ha ---');
  const th = await searchWikimedia('Galaxy cave Ninh Binh', 5);
  th.forEach(x => console.log('TH:', x.title, `${x.width}x${x.height}`));

  console.log('--- Ky Lan / Pagoda on lake ---');
  const kl = await searchWikimedia('Ky Lan Ninh Binh', 5);
  kl.forEach(x => console.log('KL:', x.title, `${x.width}x${x.height}`));
}
checkSpecifics();
