import { describe, it, expect } from 'vitest';
import {
  blogPosts,
  BLOG_POSTS,
  BLOG_PILLARS,
  getBlogPostBySlug,
  getBlogPostsByPillar,
  getRelatedBlogPosts,
  type BlogPillar,
} from '@/data/blog';

describe('Blog Data & Framework Verification', () => {
  it('contains exactly 20 curated blog posts', () => {
    expect(blogPosts).toHaveLength(20);
    expect(BLOG_POSTS).toHaveLength(20);
  });

  it('covers all 5 content pillars', () => {
    const pillars = Object.keys(BLOG_PILLARS) as BlogPillar[];
    expect(pillars).toHaveLength(5);
    expect(pillars).toContain('di-san');
    expect(pillars).toContain('le-hoi');
    expect(pillars).toContain('am-thuc-lang-nghe');
    expect(pillars).toContain('cam-nang');
    expect(pillars).toContain('ninh-binh-moi');

    // Each pillar must have at least one post
    for (const pillar of pillars) {
      const postsInPillar = getBlogPostsByPillar(pillar);
      expect(postsInPillar.length).toBeGreaterThan(0);
    }
  });

  it('ensures each post satisfies the 7-part editorial quality framework', () => {
    const slugs = new Set<string>();

    for (const post of blogPosts) {
      // 1. Unique slug and non-empty title
      expect(post.slug).toBeTruthy();
      expect(slugs.has(post.slug)).toBe(false);
      slugs.add(post.slug);
      expect(post.title.trim().length).toBeGreaterThan(5);

      // 2. Meta description (<= 160 or reasonable length)
      expect(post.metaDescription.trim().length).toBeGreaterThan(20);

      // 3. Opening Scene (narrative, not dry definition)
      expect(post.openingScene.trim().length).toBeGreaterThan(30);

      // 4. Main story sections with historical/cultural depth
      expect(post.mainStory.length).toBeGreaterThanOrEqual(1);
      for (const section of post.mainStory) {
        expect(section.subheading.trim().length).toBeGreaterThan(0);
        expect(section.paragraphs.length).toBeGreaterThanOrEqual(1);
        for (const p of section.paragraphs) {
          expect(p.trim().length).toBeGreaterThan(0);
        }
      }

      // 5. "Đi như thế nào" practical guide with verification notice
      expect(post.travelGuide.bestTime.trim().length).toBeGreaterThan(0);
      expect(post.travelGuide.etiquette.trim().length).toBeGreaterThan(0);
      expect(post.travelGuide.tips.length).toBeGreaterThan(0);
      expect(post.travelGuide.note.trim().length).toBeGreaterThan(0);

      // 6. "Đọc tiếp" internal links to other sections/pages
      expect(post.internalLinks.length).toBeGreaterThan(0);
      for (const link of post.internalLinks) {
        expect(link.title.trim().length).toBeGreaterThan(0);
        expect(link.url.startsWith('/') || link.url.startsWith('#')).toBe(true);
        expect(link.description.trim().length).toBeGreaterThan(0);
      }

      // 7. References and verifiable citations
      expect(post.references.length).toBeGreaterThan(0);
      for (const ref of post.references) {
        expect(ref.trim().length).toBeGreaterThan(0);
      }

      // 8. Image with credit & alt
      expect(post.featuredImage.trim().length).toBeGreaterThan(0);
      expect(post.featuredImageAlt.trim().length).toBeGreaterThan(0);
      expect(post.featuredImageCredit.trim().length).toBeGreaterThan(0);
    }
  });

  it('retrieves posts accurately by slug', () => {
    const post = getBlogPostBySlug('phat-diem-mua-giang-sinh');
    expect(post).toBeDefined();
    expect(post?.title).toContain('Phát Diệm');
    expect(post?.pillar).toBe('di-san');

    const nonExistent = getBlogPostBySlug('bai-viet-khong-ton-tai');
    expect(nonExistent).toBeUndefined();
  });

  it('retrieves related posts excluding current post', () => {
    const slug = 'phat-diem-mua-giang-sinh';
    const related = getRelatedBlogPosts(slug, 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every((p) => p.slug !== slug)).toBe(true);
  });
});
