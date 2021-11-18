import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

//const HOST = "http://localhost:8000"
const HOST = "https://api.mootda.com"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const profile_id_res = await fetch(`${HOST}/v1/user/profile_ids/`)
  const profile_ids = (await profile_id_res.json()).profile_ids

  const post_id_res = await fetch(`${HOST}/v1/board/post_ids/`)
  const post_ids = (await post_id_res.json()).post_ids

  const fields = []

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
