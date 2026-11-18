const fs = require('fs');
const path = require('path');
const { downloadImage, processImage, recordImage, PUBLIC_IMAGES_DIR } = require('./image-utils.cjs');

async function runBatchB() {
  console.log('=== STARTING BATCH B: DESTINATION STARS ===');

  const items = [
    {
      id: 'trang-an-01-thuyen-xuyen-hang',
      file: '/images/02-trang-an/trang-an-01-thuyen-xuyen-hang.webp',
      subDir: '02-trang-an',
      filename: 'trang-an-01-thuyen-xuyen-hang.webp',
      place: 'Tràng An, Ninh Bình',
      alt: 'Thuyền nan chở khách đi qua cửa hang đá Tràng An, Ninh Bình',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vietnam,_Ninh_Binh,_Trang_An_Cave.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Vietnam%2C_Ninh_Binh%2C_Trang_An_Cave.jpg',
      author: 'Vyacheslav Argenberg',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'trang-an-02-toan-canh-song-nui',
      file: '/images/02-trang-an/trang-an-02-toan-canh-song-nui.webp',
      subDir: '02-trang-an',
      filename: 'trang-an-02-toan-canh-song-nui.webp',
      place: 'Tràng An, Ninh Bình',
      alt: 'Toàn cảnh thung nước ngọc bích và dãy núi đá vôi Tràng An',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Trang_An_Landscape_Complex,_Ninh_Binh_Province,_20240202_1410_5232.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Trang_An_Landscape_Complex%2C_Ninh_Binh_Province%2C_20240202_1410_5232.jpg',
      author: 'Jakub Hałun',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'gps', 'visual'],
    },
    {
      id: 'tam-coc-01-song-ngo-dong',
      file: '/images/03-tam-coc-bich-dong/tam-coc-01-song-ngo-dong.webp',
      subDir: '03-tam-coc-bich-dong',
      filename: 'tam-coc-01-song-ngo-dong.webp',
      place: 'Tam Cốc – Bích Động, Ninh Bình',
      alt: 'Dòng sông Ngô Đồng uốn lượn giữa hai vách núi đá vôi Tam Cốc',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tam_Coc_by_Tuan_Mai_%22003%22_(8889006364).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Tam_Coc_by_Tuan_Mai_%22003%22_%288889006364%29.jpg',
      author: 'Tuan Mai',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'tam-coc-02-lua-chin-vang',
      file: '/images/03-tam-coc-bich-dong/tam-coc-02-lua-chin-vang.webp',
      subDir: '03-tam-coc-bich-dong',
      filename: 'tam-coc-02-lua-chin-vang.webp',
      place: 'Tam Cốc – Bích Động, Ninh Bình',
      alt: 'Cánh đồng lúa chín vàng óng đôi bờ sông Ngô Đồng, Tam Cốc',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rice_plantation_in_Tam_Coc_-_August_2023.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Rice_plantation_in_Tam_Coc_-_August_2023.jpg',
      author: 'Anass Sedrati',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'hang-mua-01-tuong-rong-dinh-nui',
      file: '/images/04-hang-mua/hang-mua-01-tuong-rong-dinh-nui.webp',
      subDir: '04-hang-mua',
      filename: 'hang-mua-01-tuong-rong-dinh-nui.webp',
      place: 'Hang Múa, Ninh Bình',
      alt: 'Tượng rồng đá uốn lượn trên đỉnh Ngọa Long Sơn, Hang Múa',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dragon_Mountain_(29843112887).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Dragon_Mountain_%2829843112887%29.jpg',
      author: 'Rod Waddington',
      license: 'CC BY-SA 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'hang-mua-02-bac-da-van-ly-truong-thanh',
      file: '/images/04-hang-mua/hang-mua-02-bac-da-van-ly-truong-thanh.webp',
      subDir: '04-hang-mua',
      filename: 'hang-mua-02-bac-da-van-ly-truong-thanh.webp',
      place: 'Hang Múa, Ninh Bình',
      alt: 'Gần 500 bậc đá uốn lượn như Vạn Lý Trường Thành thu nhỏ tại Hang Múa',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:View_from_Hang_Mua.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/View_from_Hang_Mua.jpg',
      author: 'Shyamal',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'bai-dinh-01-bao-thap',
      file: '/images/05-chua-bai-dinh/bai-dinh-01-bao-thap.webp',
      subDir: '05-chua-bai-dinh',
      filename: 'bai-dinh-01-bao-thap.webp',
      place: 'Chùa Bái Đính, Ninh Bình',
      alt: 'Bảo tháp 13 tầng cao 100m uy nghiêm tại Chùa Bái Đính',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bai_Dinh_Pagoda_(36519413585).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Bai_Dinh_Pagoda_%2836519413585%29.jpg',
      author: 'Felix Nagel',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'bai-dinh-02-hanh-lang-la-han',
      file: '/images/05-chua-bai-dinh/bai-dinh-02-hanh-lang-la-han.webp',
      subDir: '05-chua-bai-dinh',
      filename: 'bai-dinh-02-hanh-lang-la-han.webp',
      place: 'Chùa Bái Đính, Ninh Bình',
      alt: 'Hành lang 500 pho tượng La Hán bằng đá nguyên khối dài nhất châu Á tại Chùa Bái Đính',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Temple_B%C3%A1i_%C4%90%C3%ADnh_(1).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Temple_B%C3%A1i_%C4%90%C3%ADnh_%281%29.jpg',
      author: 'Guerinf',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'hoa-lu-01-den-vua-dinh',
      file: '/images/06-co-do-hoa-lu/hoa-lu-01-den-vua-dinh.webp',
      subDir: '06-co-do-hoa-lu',
      filename: 'hoa-lu-01-den-vua-dinh.webp',
      place: 'Cố đô Hoa Lư, Ninh Bình',
      alt: 'Nghi môn ngoại và sân đền thờ Vua Đinh Tiên Hoàng, Cố đô Hoa Lư',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dinh_Bo_Linh_Shrine,_Hoa_L%C6%B0,_Ninh_B%C3%ACnh,_Vietnam,_20240203_1502_5693.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Dinh_Bo_Linh_Shrine%2C_Hoa_L%C6%B0%2C_Ninh_B%C3%ACnh%2C_Vietnam%2C_20240203_1502_5693.jpg',
      author: 'Jakub Hałun',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'gps', 'visual'],
    },
    {
      id: 'van-long-01-thuyen-hoang-hon',
      file: '/images/07-thung-nham-van-long/van-long-01-thuyen-hoang-hon.webp',
      subDir: '07-thung-nham-van-long',
      filename: 'van-long-01-thuyen-hoang-hon.webp',
      place: 'Đầm ngập nước Vân Long, Ninh Bình',
      alt: 'Thuyền nan lướt nhẹ trên đầm Vân Long hoang sơ tĩnh lặng',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Van_Long_Swamp_(24135913297).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Van_Long_Swamp_%2824135913297%29.jpg',
      author: 'Hòa Nguyễn',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'thung-nham-01-dan-chim',
      file: '/images/07-thung-nham-van-long/thung-nham-01-dan-chim.webp',
      subDir: '07-thung-nham-van-long',
      filename: 'thung-nham-01-dan-chim.webp',
      place: 'Vườn chim Thung Nham, Ninh Bình',
      alt: 'Khu bảo tồn sinh thái vườn chim Thung Nham với hồ nước và núi đá',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Thung_Nham_2.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Thung_Nham_2.jpg',
      author: 'Shyamal',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'cuc-phuong-01-duong-rung',
      file: '/images/08-cuc-phuong-thien-ha/cuc-phuong-01-duong-rung.webp',
      subDir: '08-cuc-phuong-thien-ha',
      filename: 'cuc-phuong-01-duong-rung.webp',
      place: 'Vườn quốc gia Cúc Phương, Ninh Bình',
      alt: 'Đường mòn xuyên rừng nguyên sinh rợp bóng cây cổ thụ Vườn quốc gia Cúc Phương',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Forest_in_Cuc_Phuong_National_Park_(15706323528).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Forest_in_Cuc_Phuong_National_Park_%2815706323528%29.jpg',
      author: 'hds',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'phat-diem-01-nha-tho-da',
      file: '/images/09-phat-diem-kim-son/phat-diem-01-nha-tho-da.webp',
      subDir: '09-phat-diem-kim-son',
      filename: 'phat-diem-01-nha-tho-da.webp',
      place: 'Nhà thờ đá Phát Diệm, Kim Sơn, Ninh Bình',
      alt: 'Kiến trúc Phương Đình bằng đá giao thoa Đông Tây độc đáo tại Nhà thờ Phát Diệm',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Phat_Diem_Cathedral_(font).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Phat_Diem_Cathedral_%28font%29.jpg',
      author: 'Hoangvantoanajc',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'chua-vang-01-ve-dem',
      file: '/images/11-pho-di-bo-chua-vang/chua-vang-01-ve-dem.webp',
      subDir: '11-pho-di-bo-chua-vang',
      filename: 'chua-vang-01-ve-dem.webp',
      place: 'Hồ Kỳ Lân, TP. Ninh Bình',
      alt: 'Chùa Vàng soi bóng lung linh trên mặt hồ Kỳ Lân, trung tâm thành phố Ninh Bình',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_K%E1%BB%B3_L%C3%A2n_8a.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Ch%C3%B9a_K%E1%BB%B3_L%C3%A2n_8a.jpg',
      author: 'Kien1980v',
      license: 'CC0',
      licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      attributionRequired: false,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    }
  ];

  for (const item of items) {
    try {
      console.log(`Downloading & Processing: ${item.id}...`);
      const buffer = await downloadImage(item.imageUrl);
      const processed = await processImage(buffer, { isHero: false, targetWidth: 1600, maxKB: 300 });

      const destDir = path.join(PUBLIC_IMAGES_DIR, item.subDir);
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

      const destPath = path.join(destDir, item.filename);
      fs.writeFileSync(destPath, processed.buffer);

      console.log(` -> Saved ${item.filename}: ${processed.width}x${processed.height}, ${processed.sizeKB} KB`);

      const record = {
        id: item.id,
        file: item.file,
        place: item.place,
        alt: item.alt,
        sourceUrl: item.sourceUrl,
        author: item.author,
        license: item.license,
        licenseUrl: item.licenseUrl,
        attributionRequired: item.attributionRequired,
        illustrative: item.illustrative,
        verifiedBy: item.verifiedBy,
        width: processed.width,
        height: processed.height,
        sizeKB: processed.sizeKB,
      };

      recordImage(record);
      // Brief pause between requests to respect Wikimedia servers
      await new Promise(r => setTimeout(r, 600));
    } catch (err) {
      console.error(`Error on ${item.id}:`, err.message);
    }
  }

  console.log('=== BATCH B COMPLETED ===');
}

runBatchB().catch(err => {
  console.error('Batch B failed:', err);
  process.exit(1);
});
