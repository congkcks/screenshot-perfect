import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Compass,
  MapPin,
  Menu,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  destinations,
  itineraries,
  localFoods,
  type DestinationCategory,
} from "@/data/ninh-binh";

const categories: Array<"Tất cả" | DestinationCategory> = [
  "Tất cả",
  "Thiên nhiên",
  "Check-in",
  "Văn hóa",
  "Tâm linh",
  "Sinh thái",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NinhBinhTravel — Khám phá mọi điều thú vị tại Ninh Bình" },
      {
        name: "description",
        content:
          "Tìm điểm đến, thưởng thức đặc sản và lên lịch trình khám phá Ninh Bình theo cách của bạn.",
      },
      { property: "og:title", content: "NinhBinhTravel — Chạm vào vẻ đẹp Ninh Bình" },
      {
        property: "og:description",
        content: "Khám phá danh thắng, đặc sản địa phương và những hành trình đáng nhớ tại Ninh Bình.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function mapSearch(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function Index() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Tất cả");
  const [activeItinerary, setActiveItinerary] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = search.trim().toLocaleLowerCase("vi");
    return destinations.filter((destination) => {
      const matchesCategory = category === "Tất cả" || destination.category === category;
      const matchesSearch =
        !normalizedQuery ||
        `${destination.name} ${destination.area} ${destination.category}`
          .toLocaleLowerCase("vi")
          .includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("diem-den")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main>
      <header className="site-header">
        <a aria-label="NinhBinhTravel — Trang chủ" className="brand" href="#trang-chu">
          <span className="brand-mark"><Compass aria-hidden="true" /></span>
          <span>NinhBinh<span className="brand-light">Travel</span></span>
        </a>
        <nav aria-label="Điều hướng chính" className={mobileMenuOpen ? "main-nav nav-open" : "main-nav"}>
          <a onClick={() => setMobileMenuOpen(false)} href="#diem-den">Khám phá</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#am-thuc">Ẩm thực</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#ban-do">Bản đồ</a>
          <a onClick={() => setMobileMenuOpen(false)} href="#lich-trinh">Lịch trình</a>
        </nav>
        <Button asChild className="header-cta" size="sm">
          <a href="#diem-den">Bắt đầu khám phá <ArrowUpRight aria-hidden="true" /></a>
        </Button>
        <Button
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          className="menu-toggle"
          onClick={() => setMobileMenuOpen((open) => !open)}
          size="icon"
          variant="ghost"
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </header>

      <section aria-labelledby="hero-title" className="hero" id="trang-chu">
        <img alt="Thuyền nhỏ lướt trên sông giữa núi đá vôi Tràng An" className="hero-image" fetchPriority="high" src={destinations[0]?.image} />
        <div className="hero-shade" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> Miền di sản giữa lòng Bắc Bộ</p>
            <h1 id="hero-title">Ninh Bình<br />đợi bạn <em>khám phá.</em></h1>
            <p className="hero-description">Một dòng sông, muôn dãy núi. Cùng tìm những điều khiến bạn muốn trở lại.</p>
            <form className="search-panel" onSubmit={submitSearch}>
              <Search aria-hidden="true" className="search-icon" />
              <label className="sr-only" htmlFor="destination-search">Bạn muốn khám phá nơi nào?</label>
              <input
                id="destination-search"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Bạn muốn khám phá nơi nào?"
                value={search}
              />
              <Button aria-label="Tìm điểm đến" className="search-submit" type="submit">
                Tìm điểm đến <ArrowRight aria-hidden="true" />
              </Button>
            </form>
            <div className="popular-searches"><span>Được yêu thích:</span>{["Tràng An", "Hang Múa", "Cơm cháy"].map((term) => <button key={term} onClick={() => { setSearch(term); document.getElementById(term === "Cơm cháy" ? "am-thuc" : "diem-den")?.scrollIntoView({ behavior: "smooth" }); }} type="button">{term}</button>)}</div>
          </div>
          <div className="hero-caption"><span className="caption-line" /><span>TRÀNG AN</span><span>•</span><span>DI SẢN THẾ GIỚI UNESCO</span></div>
          <a aria-label="Cuộn đến khám phá địa điểm" className="scroll-cue" href="#diem-den"><ArrowDown aria-hidden="true" /></a>
          <div className="hero-index"><span>01</span> / 04</div>
        </div>
      </section>

      <section aria-labelledby="destinations-title" className="section destinations-section" id="diem-den">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Hành trình bắt đầu từ đây</p><h2 id="destinations-title">Đi đâu ở <em>Ninh Bình?</em></h2></div>
          <p className="section-intro">Từ dòng sông lặng đến đỉnh núi cao — chọn điểm đến hợp với nhịp đi của bạn.</p>
        </div>
        <div aria-label="Lọc theo loại điểm đến" className="filter-row">
          <div className="category-filters" role="group">
            {categories.map((item) => <Button aria-pressed={category === item} key={item} onClick={() => setCategory(item)} size="sm" variant={category === item ? "default" : "outline"}>{item}</Button>)}
          </div>
          <p className="result-count">{filteredDestinations.length} điểm đến</p>
        </div>
        {filteredDestinations.length > 0 ? <div className="destination-grid">
          {filteredDestinations.map((destination, index) => <article className={`destination-card destination-card-${index % 3}`} key={destination.name}>
            <a aria-label={`Tìm ${destination.name} trên Google Maps`} className="destination-image-link" href={mapSearch(destination.mapQuery)} rel="noreferrer" target="_blank">
              <img alt={destination.name} height="800" loading="lazy" src={destination.image} width="1200" />
              <span className="card-category">{destination.category}</span><span aria-hidden="true" className="card-arrow"><ArrowUpRight /></span>
            </a>
            <div className="destination-info"><div className="destination-location"><MapPin aria-hidden="true" /> {destination.area}</div><h3>{destination.name}</h3><p>{destination.description}</p><a className="text-link" href={mapSearch(destination.mapQuery)} rel="noreferrer" target="_blank">Xem bản đồ <ArrowRight aria-hidden="true" /></a></div>
          </article>)}
        </div> : <div className="empty-state"><Search aria-hidden="true" /><p>Chưa tìm thấy điểm đến nào. Thử một tên gọi khác nhé.</p><Button onClick={() => { setSearch(""); setCategory("Tất cả"); }} variant="outline">Xóa bộ lọc</Button></div>}
      </section>

      <section aria-labelledby="food-title" className="food-section" id="am-thuc">
        <div className="food-layout">
          <div className="food-lead"><p className="eyebrow"><span /> Một chút hương vị địa phương</p><h2 id="food-title">Đi để nhớ.<br />Ăn để <em>thương.</em></h2><p>Mâm cơm bản địa kể chuyện vùng đất này theo cách riêng — mộc mạc, đậm đà, khó quên.</p><a className="text-link food-map-link" href={mapSearch("quán dê núi cơm cháy Ninh Bình")} rel="noreferrer" target="_blank">Tìm quán gần Ninh Bình <ArrowRight aria-hidden="true" /></a></div>
          <div className="food-grid">{localFoods.map((food, index) => <article className={`food-card food-card-${index}`} key={food.name}><img alt={food.name} height="800" loading="lazy" src={food.image} width="1200" /><div className="food-card-overlay"><span>ĐẶC SẢN ĐỊA PHƯƠNG</span><h3>{food.name}</h3><p>{food.note}</p><a aria-label={`Tìm ${food.name} ở Ninh Bình trên bản đồ`} href={mapSearch(`${food.name} Ninh Bình`)} rel="noreferrer" target="_blank"><ArrowUpRight aria-hidden="true" /></a></div></article>)}</div>
        </div>
        <div className="food-note"><UtensilsCrossed aria-hidden="true" /><span>Thông tin quán, giá và giờ mở cửa luôn cần được kiểm chứng trước chuyến đi.</span></div>
      </section>

      <section aria-labelledby="experience-title" className="experience-section">
        <div className="experience-photo"><img alt="Lối đá leo lên đỉnh Hang Múa nhìn xuống vùng núi và cánh đồng" height="800" loading="lazy" src={destinations[2]?.image} width="1200" /><span className="experience-photo-tag">GÓC NHÌN TỪ HANG MÚA</span></div>
        <div className="experience-copy"><p className="eyebrow"><span /> Không chỉ là điểm đến</p><h2 id="experience-title">Nhịp đi của<br />riêng <em>bạn.</em></h2><p className="experience-intro">Ninh Bình có thể thật chậm rãi, hoặc đầy những khoảnh khắc khiến tim đập nhanh hơn.</p><div className="experience-list"><div><span>01</span><p><strong>Ngồi thuyền giữa Tràng An</strong><br />Qua hang, ngắm núi và nghe mặt nước khẽ động.</p></div><div><span>02</span><p><strong>Chạm mây ở Hang Múa</strong><br />Từng bậc đá dẫn lên tầm nhìn ôm trọn thung lũng.</p></div><div><span>03</span><p><strong>Đạp xe quanh Tam Cốc</strong><br />Thả mình giữa làng nhỏ và những cánh đồng xanh.</p></div></div><a className="text-link" href="#ban-do">Tìm đường đến đây <ArrowRight aria-hidden="true" /></a></div>
      </section>

      <section aria-labelledby="map-title" className="map-section" id="ban-do">
        <div className="map-heading"><div><p className="eyebrow"><span /> Mở bản đồ, mở hành trình</p><h2 id="map-title">Ninh Bình, <em>trong tầm tay.</em></h2></div><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=du+l%E1%BB%8Bch+Ninh+B%C3%ACnh" rel="noreferrer" target="_blank">Mở Google Maps <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="map-frame"><iframe allowFullScreen loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=105.8200%2C20.1200%2C106.1000%2C20.3800&layer=mapnik&marker=20.2500%2C105.9700" title="Bản đồ khám phá Ninh Bình" /><a className="map-pin" href={mapSearch("Tràng An Ninh Bình")} rel="noreferrer" target="_blank"><MapPin aria-hidden="true" /><span><strong>Bắt đầu từ Tràng An</strong><br />Chọn một điểm, mở đường đi</span><ArrowUpRight aria-hidden="true" /></a></div>
        <div className="map-legends"><span><i className="legend-nature" /> Thiên nhiên</span><span><i className="legend-culture" /> Văn hóa</span><span><i className="legend-food" /> Ẩm thực</span><span className="map-tip">Chạm vào địa danh để mở chỉ đường trên bản đồ</span></div>
      </section>

      <section aria-labelledby="itinerary-title" className="itinerary-section" id="lich-trinh">
        <div className="itinerary-heading"><p className="eyebrow"><span /> Gợi ý hành trình</p><h2 id="itinerary-title">Chọn chuyến đi<br /><em>của bạn.</em></h2><p>Những ý tưởng nhỏ để bắt đầu lên kế hoạch.</p></div>
        <div className="itinerary-list">{itineraries.map((itinerary, index) => <article className={activeItinerary === index ? "itinerary-item itinerary-active" : "itinerary-item"} key={itinerary.title}><button aria-expanded={activeItinerary === index} className="itinerary-toggle" onClick={() => setActiveItinerary(activeItinerary === index ? -1 : index)} type="button"><span className="itinerary-number">0{index + 1}</span><span className="itinerary-name">{itinerary.title}</span><span className="itinerary-duration">{itinerary.duration}</span><span className="itinerary-chevron"><ArrowDown aria-hidden="true" /></span></button>{activeItinerary === index && <div className="itinerary-detail"><p>{itinerary.detail}</p><ol>{itinerary.stops.map((stop) => <li key={stop}>{stop}</li>)}</ol><a className="text-link" href={mapSearch(itinerary.stops[0] ?? "Ninh Bình")} rel="noreferrer" target="_blank">Xem điểm dừng trên bản đồ <ArrowUpRight aria-hidden="true" /></a></div>}</article>)}</div>
      </section>

      <footer className="site-footer"><div className="footer-top"><a aria-label="NinhBinhTravel — Trang chủ" className="brand footer-brand" href="#trang-chu"><span className="brand-mark"><Compass aria-hidden="true" /></span><span>NinhBinh<span className="brand-light">Travel</span></span></a><p>Một website — khám phá mọi điều<br />thú vị tại Ninh Bình.</p><a className="footer-backtop" href="#trang-chu">Về đầu trang <ArrowUpRight aria-hidden="true" /></a></div><div className="footer-bottom"><span>© 2026 NinhBinhTravel</span><span>Được tạo nên cho những chuyến đi đáng nhớ.</span><a href="#diem-den">Khám phá Ninh Bình <ArrowRight aria-hidden="true" /></a></div></footer>
    </main>
  );
}
