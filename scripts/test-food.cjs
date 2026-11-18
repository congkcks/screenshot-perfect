const { searchWikimedia } = require('./image-utils.cjs');

async function testFood() {
  const q1 = await searchWikimedia('scorched rice', 5);
  q1.forEach(x => console.log('Scorched:', x.title, `${x.width}x${x.height}`, x.license, x.url));

  const q2 = await searchWikimedia('crispy rice', 5);
  q2.forEach(x => console.log('Crispy:', x.title, `${x.width}x${x.height}`, x.license, x.url));

  const q3 = await searchWikimedia('Cơm cháy', 5);
  q3.forEach(x => console.log('Com chay:', x.title, `${x.width}x${x.height}`, x.license, x.url));
}
testFood();
