const { searchWikimedia } = require('./image-utils.cjs');

async function testSpecifics() {
  const q1 = await searchWikimedia("Delacour's langur", 4);
  q1.forEach(x => console.log('Langur:', x.title, `${x.width}x${x.height}`, x.license, x.url));

  const q2 = await searchWikimedia('Phat Diem', 5);
  q2.forEach(x => console.log('PD:', x.title, `${x.width}x${x.height}`, x.license, x.url));

  const q3 = await searchWikimedia('butterfly Cuc Phuong', 4);
  q3.forEach(x => console.log('Butterfly:', x.title, `${x.width}x${x.height}`, x.license, x.url));
}
testSpecifics();
