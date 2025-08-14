# Partners Points Web - Project Guidelines

## Design Guidelines

### Layout and Spacing
- **ALWAYS respect the website header**: When making layouts that use viewport height (`h-screen`), account for the fixed header at the top of the page. The header takes up space and content should not overlap with it.
- Use appropriate top padding (e.g., `pt-24`) to ensure content starts below the header
- Never use `h-screen` without accounting for header space

### Typography
- Use consistent heading styles: `text-lg font-semibold text-gray-800 mb-6` for section headings
- Maintain proper spacing between sections using `mb-12` for main elements

### Pricing Calculator (LOCKED - DO NOT MODIFY)

#### Layout & Visual Design
- **50/50 Split Layout**: Left side for controls, right side for results/empty state
- **Full viewport height**: Uses `h-[calc(100vh-7rem)]` to respect header space
- **Business categories** positioned at top with expanding button animations
- **Right side gradient**: `from-gray-50 to-gray-100` background
- **Results section**: Blue branded bottom (`#0b04d9`) with white text

#### Business Category Configuration (DO NOT CHANGE)
Each business type has specific industry-based parameters:

**Restaurant** (`Storefront` icon):
- Return rate: 25%, Avg repeats: 8/year, Recommended points: 15%
- Expiration rate: 15%, Transaction range: 150-1000 AED (step: 100, default: 200)

**Retail** (`ShoppingBag` icon):
- Return rate: 15%, Avg repeats: 4/year, Recommended points: 10%  
- Expiration rate: 15%, Transaction range: 250-5000 AED (step: 250, default: 750)

**Medical Clinic** (`Heart` icon):
- Return rate: 45%, Avg repeats: 4/year, Recommended points: 5%
- Expiration rate: 20%, Transaction range: 500-15000 AED (step: 500, default: 2000)

**Supermarket** (`ShoppingCart` icon):
- Return rate: 40%, Avg repeats: 12/year, Recommended points: 5%
- Expiration rate: 20%, Transaction range: 50-1000 AED (step: 50, default: 100)

#### Calculator Logic (LOCKED CALCULATION FORMULA)

**Core Calculations:**
1. `monthlyTransactions = salesRevenue / transactionValue`
2. `returningCustomers = monthlyTransactions * (returnRate / 100)`  
3. `additionalVisitsPerMonth = (returningCustomers * avgRepeats) / 12`
4. `grossAdditionalRevenue = additionalVisitsPerMonth * transactionValue`

**Points & Revenue Logic:**
- Points earned ONLY on additional sales: `grossAdditionalRevenue * (pointsRate / 100)`
- Points redeemed: `pointsEarned * ((100 - expirationRate) / 100)`
- Our fee: 2% of original spend when points are redeemed
- Merchant net gain: `grossAdditionalRevenue - pointsCost - ourFees`
- Minimum our fee display: 500 AED, Special pricing above 2000 AED

#### User Interaction States
- **Empty State**: Shows when `!hasUserInteracted` and all values at defaults
- **Results State**: Triggered after any user interaction with controls
- **Interactive Elements**: Business buttons, sliders, points rate buttons
- **Animation Triggers**: `ResultsReveal` component with staggered reveals

#### Critical Business Rules
1. **Revenue is ONLY calculated on additional visits** - not initial transactions
2. **Points expiration reduces redemption liability** (15-20% depending on business)
3. **2% fee structure** on original spend amount when redeemed
4. **Industry-specific defaults** must remain unchanged for accuracy

#### Layout Requirements (LOCKED)
- **Calculator MUST be 100% viewport height** - Uses `h-screen` container with `h-[calc(100vh-6rem)]` card
- **Header spacing**: `pt-24` to account for fixed header
- **No bottom padding** to maximize calculator space
- **Card fills available height**: Calculator takes full remaining viewport after header

### Pricing Calculator - Technical Implementation

#### Components Used
- `ElasticSlider`: Custom slider component for smooth value adjustments
- `ResultsReveal`: Animation wrapper for staggered reveal effects  
- `AnimatedNumber`: Smooth number transitions with customizable formatting
- `Badge`, `Card`, `Button`, `Separator`: Shadcn UI components
- Phosphor Icons: `Storefront`, `ShoppingBag`, `Heart`, `ShoppingCart`, `CheckCircle`, `Plus`, `Crown`

#### State Management
```typescript
const [monthlySalesRevenue, setMonthlySalesRevenue] = useState([50000])
const [avgTransactionValue, setAvgTransactionValue] = useState([150]) 
const [businessType, setBusinessType] = useState("restaurant")
const [pointsRate, setPointsRate] = useState(15)
const [hasUserInteracted, setHasUserInteracted] = useState(false)
```

#### Key Interactive Features
- **Business Category Buttons**: Expanding animations with width transitions
- **Elastic Sliders**: Dynamic min/max/step values based on business type
- **Points Rate Selection**: 5%, 10%, 15%, 20%, 25%, 30% options with crown badge for recommended
- **Empty State**: Animated placeholder with floating elements and pulsing indicators
- **Results Animations**: Staggered reveals with GSAP-powered number counting

#### File Structure
- Main page: `/src/app/pricing/page.tsx`
- ElasticSlider: `/src/components/ui/elastic-slider.tsx`
- ResultsReveal: `/src/components/animate-ui/results-reveal.tsx`
- AnimatedNumber: `/src/components/ui/animated-number.tsx`

### Onboarding Flow (LOCKED - 5-STEP PROCESS)

#### Flow Structure (DO NOT MODIFY)
1. **You & Business**: Full name, business name, phone, email + Industry chips (Retail/Restaurants/Clinics/Supermarkets/Other)
2. **Locations**: City + progressive "Add outlet" rows with + button
3. **RFM Terminal**: Yes/No pill buttons → If yes: reveal model/merchant ID card, If no: "We'll set you up"
4. **Program Preference**: Earn rule quick-picks (5%, 8%, 10%, Custom) + "I'll decide later" option
5. **Review & Go**: Compact summary card, Terms/Privacy checkboxes, primary CTA

#### GSAP Animation System (LOCKED)
- **Step Transitions**: Flip plugin for card morphs, <350ms duration
- **Progress Bar**: Animated stripe with parallax background dots
- **Magnetic Button**: Button leans toward cursor, click ripples
- **Field Validation**: Success checkmark draws, errors wiggle (never scolding)
- **Micro-rewards**: Tasteful confetti burst after steps 2 & 4 (8 particles, 400ms)
- **Success Animation**: Big checkmark draw + "What happens next" timeline

#### UX Features (LOCKED)
- **Autosave & Resume**: Shows "Saved ✓" after field blur, localStorage persistence
- **Smart Defaults**: UAE phone prefix, auto-capitalize business names
- **Progress Copy**: "Step X of 5 · ~Xs left" estimates
- **Sticky Promise**: Right-side note about terminal integration
- **Reduced Motion**: Toggle for accessibility compliance

#### Layout Requirements (CRITICAL)
- **MUST respect website header**: Use `pt-24` to account for fixed header at top
- **Never overlap with header**: All page content must start below header space
- **Container spacing**: `pt-24 pb-12` pattern for consistent spacing

#### Technical Implementation
- **File**: `/src/app/onboarding/page.tsx` - Complete replacement of old multi-component system
- **GSAP Plugins**: Core + Timeline + Flip (registered and implemented)
- **Responsive**: Mobile-first design with md: breakpoints
- **Accessibility**: Focus management, reduced motion support, proper ARIA labels

### Technical Notes
- Uses Next.js 15.4.6 with App Router and TypeScript
- Shadcn UI components throughout
- Tailwind CSS for styling
- GSAP for animations (replacing Framer Motion in onboarding)