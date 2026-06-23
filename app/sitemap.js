export default function sitemap() {
  const baseUrl = 'https://aswinsampathkumar.in'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: baseUrl + '/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/work', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/projects', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
