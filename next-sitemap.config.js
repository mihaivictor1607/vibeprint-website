// next-sitemap configuration
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://vibeprint.ro',
  generateRobotsTxt: true,
  exclude: ['/politica-confidentialitate', '/termeni-si-conditii'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
