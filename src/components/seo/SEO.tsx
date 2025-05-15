import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export function SEO({
  title = 'Plataforma Educativa de Matemáticas',
  description = 'Plataforma educativa interactiva para el aprendizaje de matemáticas. Aprende números naturales, geometría, proporcionalidad y más de forma divertida.',
  keywords = 'matemáticas, educación, aprendizaje, números naturales, geometría, proporcionalidad, medidas',
  image = 'https://matematicas-732ff.web.app/og-image.jpg',
  url = 'https://matematicas-732ff.web.app/',
  type = 'website'
}: SEOProps) {
  const siteTitle = title.includes('Elena') ? title : `${title} | Elena`

  return (
    <Helmet>
      {/* Metadatos básicos */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  )
}
