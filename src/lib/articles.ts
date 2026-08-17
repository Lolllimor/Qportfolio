import fs from 'node:fs';
import path from 'node:path';

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  description: string;
  mediumUrl: string;
  cover: string;
  coverAlt: string;
  coverCaption?: string;
};

export const articles: ArticleMeta[] = [
  {
    slug: 'the-new-cost-of-learning-and-proficiency-for-creatives-the-impact-on-craftsmanship',
    title:
      'The New Cost of Learning and Proficiency for Creatives: The Impact on Craftsmanship',
    date: '2026-08-04',
    displayDate: 'Aug 2026',
    description:
      'When AI makes results cheap, taste and judgment become the real cost of becoming a creative.',
    mediumUrl:
      'https://medium.com/@quadmor009/the-new-cost-of-learning-and-proficiency-for-creatives-the-impact-on-craftsmanship-21187e8d5963',
    cover:
      '/articles/the-new-cost-of-learning-and-proficiency-for-creatives-the-impact-on-craftsmanship/cover.png',
    coverAlt:
      'The New Cost of Learning and Proficiency for Creatives: The Impact on Craftsmanship',
  },
  {
    slug: 'the-right-way-to-pay-attention-to-detail',
    title: 'The Right Way to Pay Attention to Detail',
    date: '2026-07-08',
    displayDate: 'Jul 2026',
    description:
      'Most advice stops at the phrase itself — here’s what it actually means through typography, spacing, and consistency.',
    mediumUrl:
      'https://medium.com/@quadmor009/the-right-way-to-pay-attention-to-detail-833522cd3565',
    cover: '/articles/the-right-way-to-pay-attention-to-detail/cover.png',
    coverAlt: 'The Right Way to Pay Attention to Detail',
  },
  {
    slug: 'notes-from-a-designers-panel-what-ai-really-means-for-creative-work',
    title:
      'Notes From a Designers’ Panel: What AI Really Means for Creative Work',
    date: '2026-06-07',
    displayDate: 'Jun 2026',
    description:
      'Reflections from an Interswitch design panel on working with AI across research, production, and creative judgment.',
    mediumUrl:
      'https://medium.com/@quadmor009/notes-from-a-designers-panel-what-ai-really-means-for-creative-work-17c424ee3c11',
    cover:
      '/articles/notes-from-a-designers-panel-what-ai-really-means-for-creative-work/cover.png',
    coverAlt:
      'Notes From a Designers’ Panel: What AI Really Means for Creative Work',
  },
  {
    slug: 'the-real-skill-that-separates-designers-who-thrive-with-ai',
    title: 'The Real Skill That Separates Designers Who Thrive With AI',
    date: '2026-04-08',
    displayDate: 'Apr 2026',
    description:
      'What separates the designers AI makes better from the ones it makes lazy.',
    mediumUrl:
      'https://medium.com/@quadmor009/the-real-skill-that-separates-designers-who-thrive-with-ai-db6d232fa8c5',
    cover:
      '/articles/the-real-skill-that-separates-designers-who-thrive-with-ai/cover.png',
    coverAlt: 'The Real Skill That Separates Designers Who Thrive With AI',
    coverCaption: 'Image from Freepik',
  },
  {
    slug: 'design-faster-smarter-with-reference-overlay-figma-plugin',
    title: 'Design Faster & Smarter with Reference Overlay Figma Plugin',
    date: '2026-03-07',
    displayDate: 'Mar 2026',
    description:
      'Upload, compare, and take notes without leaving your Figma canvas.',
    mediumUrl:
      'https://medium.com/@quadmor009/design-faster-smarter-with-reference-overlay-figma-plugin-6e712842fefc',
    cover:
      '/articles/design-faster-smarter-with-reference-overlay-figma-plugin/cover.jpg',
    coverAlt: 'Design Faster & Smarter with Reference Overlay Figma Plugin',
  },
  {
    slug: 'building-a-mind-reading-plugin-and-where-i-went-wrong',
    title: 'Building a Mind-Reading Plugin; and Where I Went Wrong',
    date: '2026-03-03',
    displayDate: 'Mar 2026',
    description:
      'How overengineering nearly derailed a simple idea — and why simplicity won.',
    mediumUrl:
      'https://medium.com/@quadmor009/building-a-mind-reading-plugin-and-where-i-went-wrong-8d61000f2bd9',
    cover:
      '/articles/building-a-mind-reading-plugin-and-where-i-went-wrong/cover.jpg',
    coverAlt: 'Building a Mind-Reading Plugin; and Where I Went Wrong',
  },
  {
    slug: 'some-virtues-of-design-my-modern-take',
    title: 'Some Virtues of Design (My Modern Take)',
    date: '2026-01-19',
    displayDate: 'Jan 2026',
    description:
      'A 1997 essay on the virtues of design, revisited for an era of technological intelligence.',
    mediumUrl:
      'https://medium.com/@quadmor009/some-virtues-of-design-my-modern-take-0e8111a61964',
    cover: '/articles/some-virtues-of-design-my-modern-take/cover.png',
    coverAlt: 'Some Virtues of Design (My Modern Take)',
  },
  {
    slug: 'copywriting-for-designers-how-it-improves-design-results',
    title: 'Copywriting for Designers: How It Improves Design Results',
    date: '2026-01-06',
    displayDate: 'Jan 2026',
    description: 'How learning to write copy changed the way I design.',
    mediumUrl:
      'https://medium.com/@quadmor009/copywriting-for-designers-how-it-improves-design-results-c9b3c6ef4fb1',
    cover:
      '/articles/copywriting-for-designers-how-it-improves-design-results/cover.png',
    coverAlt: 'Copywriting for Designers: How It Improves Design Results',
  },
  {
    slug: 'top-skill-every-ux-designer-should-master-quick-effective-usability-testing',
    title:
      'Top Skill Every UX Designer Should Master: Quick, Effective Usability Testing',
    date: '2025-12-19',
    displayDate: 'Dec 2025',
    description:
      'Why heuristic evaluation is the fast, practical skill more UX designers should use.',
    mediumUrl:
      'https://medium.com/@quadmor009/top-skill-every-ux-designer-should-master-quick-effective-usability-testing-0e6fcc44fece',
    cover:
      '/articles/top-skill-every-ux-designer-should-master-quick-effective-usability-testing/cover.png',
    coverAlt:
      'Top Skill Every UX Designer Should Master: Quick, Effective Usability Testing',
  },
  {
    slug: 'using-the-fibonacci-sequence-in-design',
    title: 'Using the Fibonacci Sequence in Design',
    date: '2025-12-02',
    displayDate: 'Dec 2025',
    description:
      'A practical guide to using the Fibonacci sequence for structure, rhythm, and balance.',
    mediumUrl:
      'https://medium.com/@quadmor009/using-the-fibonacci-sequence-in-design-b3a70a3ca7d2',
    cover: '/articles/using-the-fibonacci-sequence-in-design/cover.png',
    coverAlt: 'Using the Fibonacci Sequence in Design',
  },
  {
    slug: '8-common-ux-research-biases-and-how-to-avoid-them',
    title: '8 Common UX Research Biases (and How to Avoid Them)',
    date: '2025-11-22',
    displayDate: 'Nov 2025',
    description:
      'Eight biases that can distort your research — and how to keep them out of your process.',
    mediumUrl:
      'https://medium.com/@quadmor009/8-common-ux-research-biases-and-how-to-avoid-them-d86664ceb2ef',
    cover:
      '/articles/8-common-ux-research-biases-and-how-to-avoid-them/cover.png',
    coverAlt: '8 Common UX Research Biases (and How to Avoid Them)',
    coverCaption: 'Image from Freepik',
  },
  {
    slug: 'design-system-onboarding-turning-tools-into-team-culture',
    title: 'Design System Onboarding — Turning Tools into Team Culture',
    date: '2025-09-30',
    displayDate: 'Sep 2025',
    description:
      'Why adoption is the hardest design problem nobody talks about.',
    mediumUrl:
      'https://medium.com/design-systems-collective/design-system-onboarding-turning-tools-into-team-culture-dec64b22a2c3',
    cover:
      '/articles/design-system-onboarding-turning-tools-into-team-culture/cover.png',
    coverAlt: 'Design System Onboarding — Turning Tools into Team Culture',
  },
];

const ARTICLES_DIR = path.join(process.cwd(), 'src/content/articles');

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleContent(slug: string) {
  return fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.md`), 'utf8');
}

export function getAdjacentArticles(slug: string) {
  const index = articles.findIndex((article) => article.slug === slug);
  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: articles[index + 1],
    next: articles[index - 1],
  };
}
