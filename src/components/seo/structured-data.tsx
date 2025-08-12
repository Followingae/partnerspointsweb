export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Partners Points",
    "description": "Business loyalty platform that helps merchants reward customers smarter, not cheaper",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://partnerspoints.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://partnerspoints.com"}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971-4-123-4567",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Level 12, Emirates Financial Towers",
      "addressLocality": "Dubai",
      "addressRegion": "DIFC", 
      "postalCode": "",
      "addressCountry": "AE"
    },
    "sameAs": [
      "https://twitter.com/partnerspoints",
      "https://linkedin.com/company/partnerspoints"
    ],
    "foundingDate": "2023",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "50"
    }
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Partners Points Business Platform",
    "description": "Loyalty program platform for businesses. Only pay fees when customers redeem rewards.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "AED",
      "description": "Free to start, 2% service fee only on redeemed sales"
    },
    "featureList": [
      "Pay-per-redemption pricing",
      "Real-time analytics dashboard", 
      "Customer loyalty tracking",
      "Multi-location support",
      "Mobile app integration"
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is the fee calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Service Fee = (Monthly Sales × Redemption Rate) × Service Fee Rate. You're only charged on redeemed sales - the portion where customers actually use their points for rewards."
        }
      },
      {
        "@type": "Question", 
        "name": "What counts as redeemed sales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Only sales transactions where customers use their points for rewards. If customers earn points but never redeem them, you pay nothing on those sales."
        }
      },
      {
        "@type": "Question",
        "name": "What's the typical redemption rate?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Most businesses see 30-50% redemption rates, meaning you pay fees on less than half your eligible sales."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  )
}