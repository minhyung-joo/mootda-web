import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const profile_id_res = await fetch('https//api.mootda.com/v1/user/profile_ids/')
  const profile_ids = (await profile_id_res.json()).profile_ids

  const post_id_res = await fetch('https//api.mootda.com/v1/board/post_ids/')
  const post_ids = (await post_id_res.json()).post_ids

  const fields = [
    {
      loc: 'https://example.com', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://example.com/dynamic-path-2', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ]

  profile_ids.forEach((id) => {
      fields.push({
        loc: 'https://mootda.com/profile/' + id, // Absolute url
        lastmod: new Date().toISOString(),
      })
  })

  post_ids.forEach((id) => {
    fields.push({
      loc: 'https://mootda.com/post/' + id, // Absolute url
      lastmod: new Date().toISOString(),
    })
})

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {}
