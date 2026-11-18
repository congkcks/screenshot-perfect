const { searchWikimedia, searchWikimediaCategory } = require('./image-utils.cjs');

async function testBatchB() {
  const tasks = [
    { label: 'Tràng An hang', query: 'Trang An cave Ninh Binh' },
    { label: 'Tràng An toan canh', query: 'Trang An Vyacheslav Argenberg' },
    { label: 'Tam Cốc Tuan Mai', query: 'Tam Coc by Tuan Mai' },
    { label: 'Tam Cốc lúa chín', query: 'Tam Coc rice' },
    { label: 'Hang Múa tượng rồng', query: 'Hang Mua dragon' },
    { label: 'Hang Múa bậc đá', query: 'Hang Mua steps' },
    { label: 'Bái Đính bảo tháp', query: 'Bai Dinh tower' },
    { label: 'Bái Đính La Hán', query: 'Bai Dinh arhat' },
    { label: 'Hoa Lư Đinh Bo Linh', query: 'Dinh Bo Linh' },
    { label: 'Vân Long', query: 'Van Long Nature Reserve' },
    { label: 'Thung Nham', query: 'Thung Nham' },
    { label: 'Cúc Phương rừng', query: 'Cuc Phuong forest' },
    { label: 'Thiên Hà động', query: 'Thien Ha cave' },
    { label: 'Phát Diệm nhà thờ đá', query: 'Phat Diem cathedral' },
    { label: 'Đồi dứa Tam Điệp', query: 'Tam Diep pineapple' },
    { label: 'Chùa Vàng Ninh Bình', query: 'Chua Vang Ninh Binh' }
  ];

  for (const t of tasks) {
    console.log('===', t.label, '===');
    const res = await searchWikimedia(t.query, 3);
    res.forEach(r => {
      console.log(' ', r.title, `${r.width}x${r.height}`, 'by', r.artist, '|', r.license);
      console.log('    URL:', r.url);
    });
  }
}
testBatchB();
