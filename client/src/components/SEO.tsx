import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  keywords,
  image = '/logo.png',
  url,
  type = 'website',
  noindex = false,
}: SEOProps) {
  const { language } = useLanguage();
  
  const siteName = 'IRONHEX - Cybersecurity & IoT Solutions';
  const defaultDescription = 'IRONHEX provides comprehensive cybersecurity and IoT solutions to secure your digital future. Expert services in Tunisia and beyond.';
  const baseUrl = 'https://www.ironhex.com';
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullDescription = description || defaultDescription;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_TN' : language === 'fr' ? 'fr_FR' : 'en_US'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullImage} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="IRONHEX Team" />
      <meta name="copyright" content="© 2025 IRONHEX. All rights reserved." />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${url || '/'}`} />
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}${url || '/'}`} />
      <link rel="alternate" hrefLang="ar" href={`${baseUrl}${url || '/'}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${url || '/'}`} />
    </Helmet>
  );
}
