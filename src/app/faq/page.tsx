"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { useMode } from "@/context/mode-context"
import { Building2, Users, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const businessFAQs = [
  {
    question: "How is the fee calculated?",
    answer: "Service Fee = (Monthly Sales × Redemption Rate) × Service Fee Rate. You're only charged on redeemed sales - the portion where customers actually use their points for rewards."
  },
  {
    question: "What counts as redeemed sales?",
    answer: "Only sales transactions where customers use their points for rewards. If customers earn points but never redeem them, you pay nothing on those sales. This protects your margins better than blanket discounts."
  },
  {
    question: "How do I pick an earn-back percentage?",
    answer: "We recommend 5-15% based on your margin structure. Higher percentages drive more engagement but cost more when redeemed. Most businesses start with 10% and adjust based on customer response."
  },
  {
    question: "Can I change my rule later?",
    answer: "Yes, you can adjust your earn-back percentage, minimum spend thresholds, and exclusions anytime through your dashboard. Changes apply to new transactions going forward."
  },
  {
    question: "What's the typical redemption rate?",
    answer: "Most businesses see 30-50% redemption rates, meaning you pay fees on less than half your eligible sales. Redemption rates vary by industry, with restaurants typically seeing higher rates than retail."
  },
  {
    question: "How do points affect margins vs discounts?",
    answer: "Points preserve margins better because: (1) you only pay when they're used, (2) customers often spend more to reach point thresholds, (3) no immediate margin impact like discounts, (4) builds long-term loyalty vs one-time savings."
  },
  {
    question: "What about refunds and chargebacks?",
    answer: "If a customer returns an item that earned points, the points are automatically deducted from their balance. For chargebacks, we reverse any points awarded and adjust your fee calculation accordingly."
  },
  {
    question: "How is my data protected?",
    answer: "We use bank-level encryption and comply with UAE data protection regulations. Customer data is never sold to third parties. You maintain control over your customer relationships and data."
  },
  {
    question: "What industries work best with points?",
    answer: "Points work well for businesses with repeat customers: restaurants, cafés, salons, gyms, retail stores, clinics. Any business where customers visit regularly benefits from loyalty programs."
  },
  {
    question: "How long does setup take?",
    answer: "Most businesses complete onboarding in 5-10 minutes. Once approved (1-2 business days), you can start awarding points immediately. We provide training and support throughout."
  }
]

const customerFAQs = [
  {
    question: "How many points do I earn?",
    answer: "Each Partners Points merchant sets their own earn rate, typically 5-15% back in points. For example, if a restaurant offers 10% back, you'd earn 100 points for every AED 100 spent."
  },
  {
    question: "How do I redeem my points?",
    answer: "Simply show your Partners Points app at participating merchants. You can redeem points for discounts, free items, or special offers - each merchant sets their own redemption options."
  },
  {
    question: "Do points expire?",
    answer: "Point expiration varies by merchant, but most points remain active for 12-24 months from the last earning activity. You'll receive notifications before any points expire."
  },
  {
    question: "Is my personal data safe?",
    answer: "Yes. We use bank-level security and never sell your personal information. You control your data and can delete your account anytime. We only share necessary transaction info with merchants where you shop."
  },
  {
    question: "Are there any fees for customers?",
    answer: "No, the Partners Points app and loyalty program are completely free for customers. You earn points and rewards without any charges or subscription fees."
  },
  {
    question: "Can I use points at any Partners Points merchant?",
    answer: "Points are earned and redeemed separately at each merchant. You can't transfer points between different businesses, but you can collect points from multiple merchants in one app."
  },
  {
    question: "What if I lose my phone?",
    answer: "Your points are safely stored in your account, not on your device. Simply download the app on your new phone and log in with your credentials - all your points will be restored."
  },
  {
    question: "How do I find Partners Points merchants?",
    answer: "Use the 'Find Merchants' feature in the app to discover participating businesses near you. You can also look for the Partners Points logo at local businesses."
  }
]

const generalFAQs = [
  {
    question: "What makes Partners Points different?",
    answer: "Unlike traditional loyalty programs, Partners Points charges businesses only when customers redeem rewards - not when they earn points. This protects business margins while building genuine customer loyalty."
  },
  {
    question: "How does the technology work?",
    answer: "Our cloud-based platform integrates with existing point-of-sale systems. Customers can use a mobile app or physical cards to earn and redeem points seamlessly."
  },
  {
    question: "Is there customer support?",
    answer: "Yes, we provide support for both businesses and customers. Businesses get dedicated account management, while customers can reach support through the mobile app."
  },
  {
    question: "What regions do you serve?",
    answer: "Partners Points currently operates in the UAE, with plans to expand across the GCC region. We focus on providing localized support and compliance in each market."
  }
]

export default function FAQPage() {
  const { mode } = useMode()

  return (
    <div className="min-h-screen bg-frosted-silver py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-shadow-black mb-4">
            <span className="text-primary">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Partners Points
          </p>
        </div>

        {/* FAQ Tabs */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
          <Tabs defaultValue={mode} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="businesses" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                For Businesses
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                For Customers  
              </TabsTrigger>
              <TabsTrigger value="general" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                General
              </TabsTrigger>
            </TabsList>

            {/* Business FAQs */}
            <TabsContent value="businesses">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-shadow-black mb-2">
                    Business Questions
                  </h2>
                  <p className="text-muted-foreground">
                    Learn how Partners Points can benefit your business
                  </p>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {businessFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`business-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            {/* Customer FAQs */}
            <TabsContent value="customers">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-shadow-black mb-2">
                    Customer Questions
                  </h2>
                  <p className="text-muted-foreground">
                    How to earn and redeem points with Partners Points
                  </p>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {customerFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`customer-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            {/* General FAQs */}
            <TabsContent value="general">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-shadow-black mb-2">
                    General Questions
                  </h2>
                  <p className="text-muted-foreground">
                    About Partners Points platform and service
                  </p>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {generalFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`general-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
            <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-shadow-black mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our team is here to help you get started with Partners Points.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-electric-blue hover:bg-electric-blue/90 text-white">
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/calculator">
                  Try Calculator
                </Link>
              </Button>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}