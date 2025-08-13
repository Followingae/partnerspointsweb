# Partners Points Web - Project Guidelines

## Design Guidelines

### Layout and Spacing
- **ALWAYS respect the website header**: When making layouts that use viewport height (`h-screen`), account for the fixed header at the top of the page. The header takes up space and content should not overlap with it.
- Use appropriate top padding (e.g., `pt-24`) to ensure content starts below the header
- Never use `h-screen` without accounting for header space

### Typography
- Use consistent heading styles: `text-lg font-semibold text-gray-800 mb-6` for section headings
- Maintain proper spacing between sections using `mb-12` for main elements

### Business Calculator
- Business categories should be prominent with large buttons, icons, and positioned at the top
- Use phosphor icons for business categories:
  - Restaurant: `Storefront`
  - Retail Store: `ShoppingBag` 
  - Medical Clinic: `FirstAid`
  - Supermarket: `ShoppingCart`
- Maintain 50/50 layout for input controls and results
- Use bubble backgrounds with brand colors: #6EE7F9, #A78BFA, #10B981, #F59E0B

### Technical Notes
- Uses Next.js 15.4.6 with App Router and TypeScript
- Shadcn UI components throughout
- Tailwind CSS for styling
- Framer Motion for animations