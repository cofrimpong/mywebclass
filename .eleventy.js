const htmlMinifier = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  // Passthrough copy for assets folder
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Path prefix for GitHub Pages
  const pathPrefix = process.env.ELEVENTY_ENV === 'production' ? '/IS373_final' : '';

  // Global site data (used in templates)
  if (eleventyConfig.addGlobalData) {
    eleventyConfig.addGlobalData("site", {
      title: "MyWebClass.org",
      description: "A learning site for Web Class about design principles and movements",
      url: process.env.SITE_URL || "https://bsabio.github.io",
      baseUrl: pathPrefix
    });
  }
 
  // Date filters
  eleventyConfig.addFilter("readableDate", function (date) {
    if (!date) return "Date not available";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("dateToISO", function (date) {
    if (!date) return new Date().toISOString();
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  });

  // Utility filters
  eleventyConfig.addFilter("excerpt", function (content) {
    if (!content) return "";
    const excerpt = content.replace(/(<([^>]+)>)/gi, "").substring(0, 200);
    return excerpt + (excerpt.length >= 200 ? "..." : "");
  });

  eleventyConfig.addFilter("limit", function (array, limit) {
    if (!Array.isArray(array)) return [];
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter("currentYear", function () {
    return new Date().getFullYear();
  });

  // Collections for blog posts and gallery submissions
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
  });

  eleventyConfig.addCollection("recentPosts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse().slice(0, 5);
  });

  // Minify HTML in production
  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", async function (content, outputPath) {
      if (outputPath && outputPath.endsWith('.html')) {
        try {
          return await htmlMinifier.minify(content, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
            keepClosingSlash: true
          });
        } catch (e) {
          console.warn('HTML minify failed:', e);
          return content;
        }
      }
      return content;
    });
  }

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "layouts",
      output: "_site"
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    pathPrefix: process.env.ELEVENTY_ENV === 'production' ? '/IS373_final' : ''
  };
};
