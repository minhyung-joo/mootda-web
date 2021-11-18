module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.mootda.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.mootda.com/server-sitemap.xml', // <==== Add here
    ],
  },
}
