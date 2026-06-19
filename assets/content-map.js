// assets/content-map.js
// Content partition, keyword tagging, and search filter for site sections

const siteConfig = {
  baseUrl: "https://cn-qtscout.com",
  siteName: "球探网",
  defaultLang: "zh-CN"
};

const contentSections = [
  {
    id: "scout-reports",
    title: "球探报告",
    description: "最新球探实地考察与数据分析报告",
    keywords: ["球探", "考察", "数据", "分析", "报告"],
    articles: [
      { title: "华东区域球探考察实录", slug: "east-china-scout", tags: ["实地", "球探"] },
      { title: "球探数据模型更新日志", slug: "scout-model-update", tags: ["数据", "模型"] }
    ]
  },
  {
    id: "player-database",
    title: "球员数据库",
    description: "球员档案、能力评估与成长追踪",
    keywords: ["球员", "数据库", "评估", "档案", "球探"],
    articles: [
      { title: "新星后卫能力评估", slug: "rising-guard-eval", tags: ["球员", "评估"] },
      { title: "球探推荐：潜力前锋TOP10", slug: "top10-forwards", tags: ["球探", "推荐"] }
    ]
  },
  {
    id: "match-analysis",
    title: "赛事分析",
    description: "深度比赛复盘与战术解读",
    keywords: ["赛事", "分析", "复盘", "战术", "球探"],
    articles: [
      { title: "季后赛关键回合拆解", slug: "playoff-key-plays", tags: ["复盘", "战术"] },
      { title: "球探视角：半决赛战术博弈", slug: "semifinal-tactics", tags: ["球探", "分析"] }
    ]
  }
];

const globalKeywords = ["球探", "数据", "分析", "考察", "评估", "报告", "推荐", "战术", "复盘"];

// Simple search filter: returns sections and articles matching a query string
function searchContent(query) {
  if (!query || typeof query !== "string") {
    return { sections: [], articles: [] };
  }
  const q = query.trim().toLowerCase();
  if (q === "") return { sections: [], articles: [] };

  const matchedSections = [];
  const matchedArticles = [];

  for (const section of contentSections) {
    let sectionMatched = false;
    // Check section title, description, and keywords
    if (
      section.title.toLowerCase().includes(q) ||
      section.description.toLowerCase().includes(q) ||
      section.keywords.some(kw => kw.toLowerCase().includes(q))
    ) {
      sectionMatched = true;
    }
    // Check articles in this section
    const sectionArticles = [];
    for (const article of section.articles) {
      if (
        article.title.toLowerCase().includes(q) ||
        article.tags.some(tag => tag.toLowerCase().includes(q)) ||
        article.slug.toLowerCase().includes(q)
      ) {
        sectionArticles.push(article);
      }
    }
    if (sectionMatched || sectionArticles.length > 0) {
      matchedSections.push({
        ...section,
        matchedArticles: sectionArticles
      });
      matchedArticles.push(...sectionArticles);
    }
  }

  return { sections: matchedSections, articles: matchedArticles };
}

// Tag-based filtering: returns articles that have all specified tags
function filterByTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return [];
  const normalizedTags = tags.map(t => t.toLowerCase().trim());
  const results = [];
  for (const section of contentSections) {
    for (const article of section.articles) {
      const articleTags = article.tags.map(t => t.toLowerCase().trim());
      if (normalizedTags.every(nt => articleTags.includes(nt))) {
        results.push({ ...article, section: section.id });
      }
    }
  }
  return results;
}

// Get a full article URL relative to site base
function getArticleUrl(sectionId, articleSlug) {
  return `${siteConfig.baseUrl}/${sectionId}/${articleSlug}`;
}

// List all unique tags across all content
function getAllTags() {
  const tagSet = new Set();
  for (const section of contentSections) {
    for (const article of section.articles) {
      for (const tag of article.tags) {
        tagSet.add(tag);
      }
    }
  }
  return Array.from(tagSet);
}

// Example usage (uncomment to test):
// console.log(searchContent("球探"));
// console.log(filterByTags(["球探", "推荐"]));
// console.log(getAllTags());

export {
  siteConfig,
  contentSections,
  globalKeywords,
  searchContent,
  filterByTags,
  getArticleUrl,
  getAllTags
};