import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  blogPosts,
  BLOG_PILLARS,
  type BlogPillar,
  type BlogPost,
} from "@/data/blog";
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Compass,
  Filter,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Tạp Chí Cẩm Nang & Kể Chuyện Di Sản | NinhBinhTravel" },
      {
        name: "description",
        content:
          "Tuyển tập 20 câu chuyện du lịch, di sản cố đô, lễ hội truyền thống, ẩm thực dê núi và cẩm nang khám phá Ninh Bình bốn mùa của NinhBinhTravel.",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const [selectedPillar, setSelectedPillar] = useState<BlogPillar | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeason, setSelectedSeason] = useState<string>("all");

  // Lọc bài viết theo Pillar, Search Query, và Mùa
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      // Lọc theo Pillar
      if (selectedPillar !== "all" && post.pillar !== selectedPillar) {
        return false;
      }

      // Lọc theo Mùa / Thời điểm
      if (selectedSeason !== "all") {
        if (selectedSeason === "dong" && !post.scheduledMonth.includes("12/") && !post.scheduledMonth.includes("Trước Tết")) {
          return false;
        }
        if (selectedSeason === "xuan" && !post.scheduledMonth.includes("01/") && !post.scheduledMonth.includes("02/") && !post.scheduledMonth.includes("03/") && !post.scheduledMonth.includes("Rằm")) {
          return false;
        }
        if (selectedSeason === "he" && !post.scheduledMonth.includes("04/") && !post.scheduledMonth.includes("05/") && !post.scheduledMonth.includes("06/") && !post.scheduledMonth.includes("07/")) {
          return false;
        }
        if (selectedSeason === "thu" && !post.scheduledMonth.includes("08/") && !post.scheduledMonth.includes("09/") && !post.scheduledMonth.includes("10/")) {
          return false;
        }
      }

      // Lọc theo từ khóa tìm kiếm
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchTags = post.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchExcerpt && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedPillar, searchQuery, selectedSeason]);

  // Bài viết nổi bật (Featured Post)
  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.isFeatured) || blogPosts[0];
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1F2937] font-sans">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#244B3B]/95 text-white border-b border-[#D6AD72]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/90 hover:text-[#D6AD72] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Trang chủ NinhBinhTravel</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#D6AD72] text-[#244B3B] flex items-center justify-center font-bold shadow-sm">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="font-serif font-bold text-base tracking-wide hidden sm:inline">
              Tạp Chí Ninh Bình
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/hdv"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#D6AD72] text-[#244B3B] hover:bg-[#c99f60] transition-colors"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Hỏi Hướng Dẫn Viên</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner Tạp Chí */}
      <section className="relative bg-[#244B3B] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D6AD72_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#D6AD72]/20 text-[#D6AD72] border border-[#D6AD72]/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Cẩm Nang & Câu Chuyện Di Sản</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Góc Nhìn Cố Đô Qua Từng Trang Viết
          </h1>

          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Tuyển tập 20 bài viết chuyên sâu chia theo 5 trụ cột nội dung: Kể chuyện di sản, Lễ hội & phong tục, Ẩm thực & làng nghề, Cẩm nang thực tế và Ninh Bình mới.
          </p>

          {/* Thanh tìm kiếm */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài viết: Tràng An, Phát Diệm, dê núi, lễ hội..."
                className="w-full rounded-full bg-white/95 text-gray-800 pl-11 pr-24 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D6AD72] shadow-xl placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Bộ lọc 5 Trụ cột (Pillars) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#244B3B]/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244B3B]">
              <Filter className="h-4 w-4 text-[#D6AD72]" />
              <span>Chủ đề bài viết</span>
            </div>

            {/* Lọc theo mùa vụ */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 overflow-x-auto no-scrollbar">
              <span className="font-semibold text-gray-400 mr-1 hidden sm:inline">Theo mùa:</span>
              {[
                { id: "all", label: "Cả năm" },
                { id: "dong", label: "Mùa Đông (Tháng 12 – Tết)" },
                { id: "xuan", label: "Mùa Xuân (Tháng 1 – 3)" },
                { id: "he", label: "Mùa Lúa & Sen (Tháng 4 – 7)" },
                { id: "thu", label: "Mùa Thu (Tháng 8 – 10)" },
              ].map((season) => (
                <button
                  key={season.id}
                  onClick={() => setSelectedSeason(season.id)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-colors shrink-0 ${
                    selectedSeason === season.id
                      ? "bg-[#244B3B] text-white font-medium"
                      : "bg-white/80 hover:bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  {season.label}
                </button>
              ))}
            </div>
          </div>

          {/* Các nút Tab Pillar */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedPillar("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedPillar === "all"
                  ? "bg-[#244B3B] text-[#D6AD72] shadow-md"
                  : "bg-white text-gray-600 hover:bg-white/80 border border-gray-200/80"
              }`}
            >
              Tất cả bài viết ({blogPosts.length})
            </button>

            {Object.values(BLOG_PILLARS).map((pillar) => {
              const count = blogPosts.filter((p) => p.pillar === pillar.id).length;
              const isActive = selectedPillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#244B3B] text-[#D6AD72] shadow-md"
                      : "bg-white text-gray-600 hover:bg-white/80 border border-gray-200/80"
                  }`}
                >
                  <span>{pillar.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bài viết Nổi Bật (Featured Story) - Chỉ hiển thị khi đang ở tab "Tất cả" và không tìm kiếm */}
        {selectedPillar === "all" && !searchQuery.trim() && selectedSeason === "all" && featuredPost && (
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-[#244B3B]/10 grid grid-cols-1 lg:grid-cols-12 group hover:border-[#D6AD72]/50 transition-all duration-300">
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
              <img
                src={featuredPost.featuredImage}
                alt={featuredPost.featuredImageAlt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#244B3B] text-[#D6AD72] shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  Bài viết tâm điểm
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-semibold text-[#244B3B]">{featuredPost.pillarLabel}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#D6AD72]" />
                    {featuredPost.publishDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link to="/blog/$slug" params={{ slug: featuredPost.slug }} className="block">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#244B3B] group-hover:text-[#c99f60] transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {featuredPost.tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5F1E8] text-[#244B3B] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  <span>Tác giả: </span>
                  <strong className="text-gray-800">{featuredPost.author.name}</strong>
                </div>

                <Button
                  asChild
                  className="bg-[#244B3B] hover:bg-[#1b382c] text-[#D6AD72] rounded-full text-xs font-semibold px-4"
                >
                  <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                    Đọc tiếp
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Lưới danh sách bài viết (Grid Cards) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Hiển thị <strong>{filteredPosts.length}</strong> bài viết</span>
            {searchQuery && (
              <span>Kết quả tìm kiếm cho: "<strong>{searchQuery}</strong>"</span>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#244B3B]/10 hover:border-[#D6AD72]/40 transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail Image */}
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="relative block h-52 overflow-hidden bg-gray-100">
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#244B3B]/90 text-[#D6AD72] backdrop-blur-sm shadow">
                        {post.pillarLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                        {post.publishDate}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>#{post.id}</span>
                      </div>

                      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
                        <h3 className="font-serif font-bold text-lg text-[#244B3B] group-hover:text-[#c99f60] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((t, i) => (
                          <span key={i} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="font-bold text-[#244B3B] hover:text-[#D6AD72] flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
                      >
                        <span>Chi tiết</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 border border-gray-200">
              <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center font-bold">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-gray-800">
                Không tìm thấy bài viết phù hợp
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Không có bài viết nào khớp với từ khóa "{searchQuery}" trong bộ lọc hiện tại. Bạn vui lòng thử lại bằng từ khóa khác.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedPillar("all");
                  setSelectedSeason("all");
                }}
                className="text-xs rounded-full"
              >
                Đặt lại bộ lọc
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="bg-[#1b382c] text-white/70 py-8 px-4 text-center text-xs border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-serif text-white font-medium text-sm">
            NinhBinhTravel — Tạp chí Du lịch & Cẩm nang Di sản Cố Đô
          </p>
          <p className="text-[11px] text-white/50">
            Nội dung mang tính chất chia sẻ cẩm nang phi thương mại. Mọi thông tin giá vé, thời gian tổ chức lễ hội có thể thay đổi theo quy định của ban quản lý địa phương.
          </p>
        </div>
      </footer>
    </div>
  );
}
