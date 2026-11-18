const { searchWikimedia, searchWikimediaCategory } = require('./image-utils.cjs');

async function searchBatchD() {
  console.log('--- 1. Bich Dong Pagoda ---');
  const bd = await searchWikimediaCategory('Category:Bich Dong Pagoda', 10);
  bd.filter(x => x.width >= 1200 && x.width > x.height).forEach(x => {
    console.log('BD Pagoda:', x.title, `${x.width}x${x.height}`, x.license);
  });

  console.log('--- 2. Le Hoan Shrine ---');
  const lh = await searchWikimediaCategory('Category:Le Hoan Shrine', 10);
  lh.filter(x => x.width >= 1200 && x.width > x.height).forEach(x => {
    console.log('Le Hoan:', x.title, `${x.width}x${x.height}`, x.license);
  });

  console.log('--- 3. Hoa Lu Festival ---');
  const fest = await searchWikimediaCategory('Category:Hoa Lu Ancient Capital Festival', 10);
  fest.filter(x => x.width >= 1200 && x.width > x.height).forEach(x => {
    console.log('Festival:', x.title, `${x.width}x${x.height}`, x.license);
  });

  console.log('--- 4. Nem chua ---');
  const nem = await searchWikimedia('nem chua', 5);
  nem.forEach(x => console.log('Nem:', x.title, `${x.width}x${x.height}`, x.license));

  console.log('--- 5. Bun moc ---');
  const bm = await searchWikimedia('bun moc', 5);
  bm.forEach(x => console.log('Bun moc:', x.title, `${x.width}x${x.height}`, x.license));

  console.log('--- 6. Embroidery / Stone carving ---');
  const theu = await searchWikimedia('embroidery craft Vietnam', 5);
  theu.forEach(x => console.log('Theu:', x.title, `${x.width}x${x.height}`, x.license));

  const da = await searchWikimedia('stone carving Vietnam', 5);
  da.forEach(x => console.log('Da:', x.title, `${x.width}x${x.height}`, x.license));
}
searchBatchD();
