module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mootda.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://mootda.com/server-sitemap.xml', // <==== Add here
    ],
  },
}
