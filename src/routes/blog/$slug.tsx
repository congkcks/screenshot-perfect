import { createFileRoute, Link } from '@tanstack/react-router';
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  BLOG_PILLARS,
  type BlogPost,
  type BlogStorySection,
  type BlogInternalLink,
} from '@/data/blog';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Compass,
  AlertCircle,
  ExternalLink,
  BookOpen,
  Quote,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/blog/$slug')({
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    if (!post) {
      return {
        meta: [{ title: 'Không tìm thấy bài viết | NinhBinhTravel' }],
      };
    }
    return {
      meta: [
        { title: `${post.title} | Tạp chí NinhBinhTravel` },
        { name: 'description', content: post.metaDescription },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.metaDescription },
        { property: 'og:image', content: post.featuredImage },
      ],
    };
  },
  component: BlogPostDetailPage,
});

function BlogPostDetailPage() {
  const { slug } = Route.useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-sm border border-stone-200">
          <AlertCircle className="w-12 h-12 text-[#244B3B] mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-[#244B3B] font-semibold mb-2">
            Không tìm thấy bài viết
          </h1>
          <p className="text-stone-600 text-sm mb-6">
            Bài viết bạn đang tìm có thể đã được chuyển hoặc chưa xuất bản.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#244B3B] text-white text-sm font-medium hover:bg-[#1a382c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Về Tạp chí Ninh Bình
          </Link>
        </div>
      </div>
    );
  }

  return <BlogPostContent post={post} />;
}

function BlogPostContent({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const pillarInfo = BLOG_PILLARS[post.pillar];
  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard unavailable
      }
    }
  };

  return (
    <article className="min-h-screen bg-[#FDFBF7] text-stone-800 pt-28 pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-[#244B3B] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tất cả bài viết</span>
          </Link>

          <div className="flex items-center gap-2">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium text-white shadow-sm"
              style={{ backgroundColor: pillarInfo?.color ?? '#244B3B' }}
            >
              {pillarInfo?.name ?? post.pillarLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 mb-4">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#769477]" />
            Dự kiến: {post.scheduledMonth}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#769477]" />
            {post.readTime}
          </span>
          <span className="hidden sm:inline text-stone-300">•</span>
          <span className="text-[#244B3B] font-medium">
            Tác giả: {post.author.name} ({post.author.role})
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#244B3B] font-semibold tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-light border-l-2 border-[#D6AD72] pl-4 sm:pl-6 my-6 italic bg-[#F5F1E8]/50 py-3 rounded-r-lg">
          {post.metaDescription}
        </p>

        {/* Action bar & Tags */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold inline-flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Thẻ:
            </span>
            {post.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-xs text-stone-600 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#244B3B] px-3 py-1.5 rounded-full border border-stone-200 hover:border-[#244B3B] transition-colors bg-white shadow-2xs"
              title="Sao chép liên kết"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Đã chép link</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <figure className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-stone-200/80 bg-stone-100">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
          <figcaption className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-stone-500 gap-1 sm:gap-4">
            <span className="italic">{post.featuredImageAlt}</span>
            <span className="text-stone-400 shrink-0">
              Nguồn ảnh: {post.featuredImageCredit}
            </span>
          </figcaption>
        </figure>
      </div>

      {/* Main Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 leading-relaxed">
        {/* Khung 2: Mở bài bằng một cảnh hoặc chi tiết cụ thể */}
        <div className="mb-10 text-lg sm:text-xl text-stone-800 leading-relaxed font-serif first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#244B3B] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
          {post.openingScene}
        </div>

        {/* Khung 3: Câu chuyện chính có mốc thời gian, nhân vật, bối cảnh */}
        <div className="space-y-10 my-10">
          {post.mainStory.map((section: BlogStorySection, idx: number) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#244B3B] font-semibold pt-4 border-b border-stone-100 pb-2">
                {section.subheading}
              </h2>
              {section.paragraphs.map((p: string, pIdx: number) => (
                <p key={pIdx} className="text-stone-700 text-base sm:text-lg leading-relaxed">
                  {p}
                </p>
              ))}

              {section.quote && (
                <blockquote className="my-6 p-4 sm:p-6 rounded-xl bg-[#F5F1E8] border-l-4 border-[#244B3B] italic text-stone-700 text-base flex items-start gap-3">
                  <Quote className="w-6 h-6 text-[#769477] shrink-0 mt-1" />
                  <div>{section.quote}</div>
                </blockquote>
              )}

              {section.image && (
                <figure className="my-6 rounded-xl overflow-hidden border border-stone-200">
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    className="w-full h-auto object-cover max-h-96"
                    loading="lazy"
                  />
                  <figcaption className="p-3 bg-stone-50 text-xs text-stone-500 flex justify-between">
                    <span>{section.image.caption}</span>
                    <span className="text-stone-400">Ảnh: {section.image.credit}</span>
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>

        {/* Khung 4: Cẩm nang thực tế - "Đi như thế nào" */}
        <div className="my-12 p-6 sm:p-8 rounded-2xl bg-[#F5F1E8] border border-[#D6AD72]/40 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#244B3B] text-white flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#244B3B] font-semibold">
                Cẩm nang đi thực tế & Ứng xử văn hóa
              </h3>
              <p className="text-xs text-stone-500">
                Thông tin kinh nghiệm thực địa, thời điểm và cách ứng xử văn minh
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/90 p-4 rounded-xl border border-stone-200">
              <span className="text-xs uppercase tracking-wider text-[#244B3B] font-bold block mb-1">
                Thời điểm lý tưởng
              </span>
              <p className="text-sm text-stone-700 font-medium">
                {post.travelGuide.bestTime}
              </p>
            </div>

            <div className="bg-white/90 p-4 rounded-xl border border-stone-200">
              <span className="text-xs uppercase tracking-wider text-[#244B3B] font-bold block mb-1">
                Văn hóa & Ứng xử
              </span>
              <p className="text-sm text-stone-700">
                {post.travelGuide.etiquette}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-600 font-bold mb-2">
              Kinh nghiệm thực địa cần biết
            </h4>
            <ul className="space-y-2">
              {post.travelGuide.tips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                  <span className="text-[#769477] font-bold shrink-0 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50/90 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Lưu ý kiểm tra thông tin:</span>
              <span>{post.travelGuide.note}</span>
            </div>
          </div>
        </div>

        {/* Khung 5: Đọc tiếp - Liên kết nội bộ */}
        {post.internalLinks.length > 0 && (
          <div className="my-10 pt-8 border-t border-stone-200">
            <h3 className="font-serif text-xl text-[#244B3B] font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#769477]" />
              Đọc tiếp trên NinhBinhTravel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {post.internalLinks.map((link: BlogInternalLink, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  className="group block p-4 rounded-xl border border-stone-200 bg-white hover:border-[#244B3B] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-stone-400 font-semibold mb-1">
                    <span className="text-[#769477]">Nội bộ</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:text-[#244B3B] transition-colors" />
                  </div>
                  <div className="text-sm font-serif font-medium text-stone-800 group-hover:text-[#244B3B] transition-colors mb-1">
                    {link.title}
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {link.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Khung 6: Nguồn tham khảo & Minh bạch thông tin */}
        {post.references.length > 0 && (
          <div className="my-8 pt-6 border-t border-stone-200 text-xs text-stone-500">
            <h4 className="font-semibold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#769477]" />
              Tài liệu & Nguồn tham khảo kiểm chứng
            </h4>
            <ul className="space-y-1.5 list-disc list-inside">
              {post.references.map((ref: string, i: number) => (
                <li key={i} className="text-stone-600 leading-relaxed">
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-2xl text-[#244B3B] font-semibold">
                Bài viết cùng chuyên mục
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Tiếp tục hành trình khám phá {pillarInfo?.name.toLowerCase()}
              </p>
            </div>
            <Link
              to="/blog"
              className="text-xs uppercase tracking-wider text-[#244B3B] font-semibold hover:underline"
            >
              Xem tất cả 20 bài →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel: BlogPost) => (
              <Link
                key={rel.slug}
                to="/blog/$slug"
                params={{ slug: rel.slug }}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={rel.featuredImage}
                    alt={rel.featuredImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-stone-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>{rel.scheduledMonth}</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="font-serif text-base text-[#244B3B] font-semibold group-hover:text-[#769477] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="text-xs text-[#244B3B] font-medium mt-4 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span>Đọc tiếp</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
