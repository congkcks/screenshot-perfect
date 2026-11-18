const fs = require('fs');
const path = require('path');
const { downloadImage, processImage, recordImage, PUBLIC_IMAGES_DIR } = require('./image-utils.cjs');

async function runBatchD() {
  console.log('=== STARTING BATCH D: EXTENDED COLLECTION ===');

  const items = [
    {
      id: 'tam-coc-03-chua-bich-dong',
      file: '/images/03-tam-coc-bich-dong/tam-coc-03-chua-bich-dong.webp',
      subDir: '03-tam-coc-bich-dong',
      filename: 'tam-coc-03-chua-bich-dong.webp',
      place: 'Tam Cốc – Bích Động, Ninh Bình',
      alt: 'Chùa Bích Động cổ kính nép mình bên vách núi rêu phong',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bich_Dong_Pagoda,_Ninh_Binh,_Vietnam,_20240203_1135_5636.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bich_Dong_Pagoda%2C_Ninh_Binh%2C_Vietnam%2C_20240203_1135_5636.jpg',
      author: 'Jakub Hałun',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'tam-coc-05-cheo-thuyen-bang-chan',
      file: '/images/03-tam-coc-bich-dong/tam-coc-05-cheo-thuyen-bang-chan.webp',
      subDir: '03-tam-coc-bich-dong',
      filename: 'tam-coc-05-cheo-thuyen-bang-chan.webp',
      place: 'Tam Cốc, Ninh Bình',
      alt: 'Nghệ thuật chèo đò bằng hai bàn chân độc đáo của người dân Tam Cốc',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woman_rowing_sampan_with_her_feet_in_Ninh_B%C3%ACnh_Province_of_northern_Vietnam.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Woman_rowing_sampan_with_her_feet_in_Ninh_B%C3%ACnh_Province_of_northern_Vietnam.jpg',
      author: 'AndrewDressel',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'hoa-lu-02-den-vua-le',
      file: '/images/06-co-do-hoa-lu/hoa-lu-02-den-vua-le.webp',
      subDir: '06-co-do-hoa-lu',
      filename: 'hoa-lu-02-den-vua-le.webp',
      place: 'Cố đô Hoa Lư, Ninh Bình',
      alt: 'Đền thờ Vua Lê Đại Hành tại quần thể Cố đô Hoa Lư',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Temple_comm%C3%A9moratif_de_Le_Hoan_(Hoa_Lu).jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Temple_comm%C3%A9moratif_de_Le_Hoan_%28Hoa_Lu%29.jpg',
      author: 'Jean-Pierre Dalbéra',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'hoa-lu-03-le-hoi-truong-yen',
      file: '/images/06-co-do-hoa-lu/hoa-lu-03-le-hoi-truong-yen.webp',
      subDir: '06-co-do-hoa-lu',
      filename: 'hoa-lu-03-le-hoi-truong-yen.webp',
      place: 'Cố đô Hoa Lư, Ninh Bình',
      alt: 'Lễ hội truyền thống Cố đô Hoa Lư Trường Yên',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Codohoalu2010k3.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Codohoalu2010k3.jpg',
      author: 'Kien1980v',
      license: 'Public domain',
      licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      attributionRequired: false,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'van-long-02-voc-mong-trang',
      file: '/images/07-thung-nham-van-long/van-long-02-voc-mong-trang.webp',
      subDir: '07-thung-nham-van-long',
      filename: 'van-long-02-voc-mong-trang.webp',
      place: 'Khu bảo tồn thiên nhiên Vân Long, Ninh Bình',
      alt: 'Voọc mông trắng quý hiếm trên vách đá vôi Khu bảo tồn Vân Long',
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Delacour's_langur_(Trachypithecus_delacouri)_Van_Long.jpg",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Delacour%27s_langur_%28Trachypithecus_delacouri%29_Van_Long.jpg",
      author: 'Charles J. Sharp',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      attributionRequired: true,
      illustrative: false,
      verifiedBy: ['category', 'gps', 'visual'],
    },
    {
      id: 'ky-lan-01-nui-ky-lan',
      file: '/images/11-pho-di-bo-chua-vang/ky-lan-01-nui-ky-lan.webp',
      subDir: '11-pho-di-bo-chua-vang',
      filename: 'ky-lan-01-nui-ky-lan.webp',
      place: 'Hồ Kỳ Lân, TP. Ninh Bình',
      alt: 'Núi Kỳ Lân và đền chùa thanh tịnh giữa lòng thành phố Ninh Bình',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_K%E1%BB%B3_L%C3%A2n_3.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Ch%C3%B9a_K%E1%BB%B3_L%C3%A2n_3.jpg',
      author: 'Kien1980v',
      license: 'CC0',
      licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      attributionRequired: false,
      illustrative: false,
      verifiedBy: ['category', 'visual'],
    },
    {
      id: 'am-thuc-06-nem-chua-yen-mac',
      file: '/images/12-dac-san-am-thuc/am-thuc-06-nem-chua-yen-mac.webp',
      subDir: '12-dac-san-am-thuc',
      filename: 'am-thuc-06-nem-chua-yen-mac.webp',
      place: 'Ninh Bình (Minh họa)',
      alt: 'Đặc sản nem chua Yên Mạc ăn kèm lá ổi lá sung nước mắm tỏi ớt',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nem_chua.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Nem_chua.jpg',
      author: 'Stu Spivack',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      attributionRequired: true,
      illustrative: true,
      verifiedBy: ['visual'],
    },
    {
      id: 'am-thuc-04-bun-moc',
      file: '/images/12-dac-san-am-thuc/am-thuc-04-bun-moc.webp',
      subDir: '12-dac-san-am-thuc',
      filename: 'am-thuc-04-bun-moc.webp',
      place: 'Ninh Bình (Minh họa)',
      alt: 'Bát bún mọc sườn viên thơm ngọt nước dùng thanh trong',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bun_Moc_Ha_Noi.jpg',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Bun_Moc_Ha_Noi.jpg',
      author: 'Stu Spivack',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      attributionRequired: true,
      illustrative: true,
      verifiedBy: ['visual'],
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
      await new Promise(r => setTimeout(r, 600));
    } catch (err) {
      console.error(`Error on ${item.id}:`, err.message);
    }
  }

  console.log('=== BATCH D COMPLETED ===');
}

runBatchD().catch(err => {
  console.error('Batch D failed:', err);
  process.exit(1);
});
