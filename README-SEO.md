# Mejoras de SEO en la Plataforma Educativa Elena

Este documento describe las mejoras de SEO implementadas en la aplicación Elena para optimizar su indexación en motores de búsqueda.

## Componentes SEO

Se ha implementado un componente SEO reutilizable que permite agregar metadatos específicos a cada página:

```jsx
// src/components/seo/SEO.tsx
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  keywords: string
  url: string
}

export function SEO({ title, description, keywords, url }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  )
}
```

## Páginas con SEO implementado

Se ha implementado el componente SEO en las siguientes páginas:

1. **Páginas de autenticación**
   - Login
   - Register

2. **Páginas de usuario**
   - Dashboard
   - Perfil
   - Profile

3. **Módulo de Medida**
   - Introducción a la Medida
   - Conversión de Unidades
   - Lista de Actividades
   - Actividades específicas

## Metadatos generales

Se han configurado metadatos generales en el archivo `index.html`:

```html
<meta name="description" content="Plataforma educativa interactiva para el aprendizaje de matemáticas. Aprende números naturales, geometría, proporcionalidad y más de forma divertida." />
<meta name="keywords" content="matemáticas, educación, aprendizaje, números naturales, geometría, proporcionalidad, medidas" />
<meta name="author" content="Elena" />
```

## Sitemap y Robots.txt

Se ha creado un sitemap.xml completo que incluye todas las páginas de la aplicación:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://matematicas-732ff.web.app/</loc>
    <lastmod>2025-05-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Más URLs... -->
</urlset>
```

Y se ha configurado el archivo robots.txt para permitir la indexación:

```
User-agent: *
Allow: /

Sitemap: https://matematicas-732ff.web.app/sitemap.xml
```

## Componente ActivityLayout con SEO

Se ha mejorado el componente ActivityLayout para incluir metadatos SEO opcionales:

```jsx
interface ActivityLayoutProps {
  // ... otras propiedades
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  seoUrl?: string
}
```

## Próximas mejoras

Para continuar mejorando el SEO de la aplicación, se recomienda:

1. Implementar el componente SEO en los módulos restantes
2. Agregar datos estructurados (schema.org) para mejorar los rich snippets
3. Optimizar las imágenes con atributos alt descriptivos
4. Mejorar la accesibilidad general de la aplicación
