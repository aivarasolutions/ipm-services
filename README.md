# Real Estate Sales Page - Installation Guide

## 📁 Files to Add to Your Next.js Project

### 1. Copy Files to Your Project

**Pages:**
- Copy `app/real-estate/page.tsx` → Your project's `app/real-estate/page.tsx`
- Copy `app/real-estate/[slug]/page.tsx` → Your project's `app/real-estate/[slug]/page.tsx`

**API Route:**
- Copy `app/api/real-estate-leads/route.ts` → Your project's `app/api/real-estate-leads/route.ts`

**Components:**
- Copy `components/LeadCaptureForm.tsx` → Your project's `components/LeadCaptureForm.tsx`

**Data:**
- Copy `lib/realEstateData.ts` → Your project's `lib/realEstateData.ts`

**Styles:**
- Add the contents of `real-estate-styles.css` to your existing `app/globals.css` file

### 2. Update Navigation

Add the Real Estate link to your navigation in `components/Header.tsx`:

```tsx
<Link href="/real-estate">Real Estate</Link>
```

### 3. Create Image Directory

Create a new directory in your `public` folder:
```
public/real-estate/
```

Add placeholder images or real property images:
- `tulum-eco-resort.jpg`
- `playa-penthouses.jpg`
- `lake-norman-homes.jpg`
- `cancun-villas.jpg`
- `miami-condos.jpg`
- `puerto-vallarta-suites.jpg`

### 4. Environment Variables (Optional)

For email integration, add to your `.env.local`:
```
RESEND_API_KEY=your_resend_api_key_here
```

### 5. Test the Implementation

1. Start your development server: `npm run dev`
2. Navigate to `/real-estate`
3. Test the lead capture forms
4. Check individual property pages at `/real-estate/[property-slug]`

## 🎯 Features Included

### Lead Generation
- ✅ Advanced lead capture forms
- ✅ Investment budget selection
- ✅ Location preferences
- ✅ Investment goals collection
- ✅ API endpoint for lead processing

### Property Showcase
- ✅ Featured investment properties
- ✅ ROI calculations and projections
- ✅ Pre-sale vs Ready property status
- ✅ Detailed property information
- ✅ Investment metrics (down payment, monthly payment, rental income)

### Business Features
- ✅ Guaranteed ROI messaging (8-12%)
- ✅ Pre-sale discount opportunities
- ✅ Turnkey investment solutions
- ✅ Legal support messaging
- ✅ Investment process explanation

### Technical Features
- ✅ TypeScript for type safety
- ✅ Responsive mobile-first design
- ✅ SEO optimized pages
- ✅ Static generation for performance
- ✅ Form validation and error handling

## 🔧 Customization

### Update Property Data
Edit `lib/realEstateData.ts` to add/modify properties:
- Add new properties to the array
- Update pricing and ROI information
- Modify property features and amenities
- Change investment calculations

### Customize Lead Forms
Edit `components/LeadCaptureForm.tsx` to:
- Add/remove form fields
- Modify investment budget ranges
- Update location options
- Change form styling

### Email Integration
Uncomment and configure the email code in `app/api/real-estate-leads/route.ts`:
- Set up Resend API key
- Configure recipient emails
- Customize email templates

## 📊 Analytics & Tracking

Consider adding:
- Google Analytics events for form submissions
- Lead tracking pixels
- Conversion tracking for property inquiries
- A/B testing for different form variants

## 🚀 Deployment

After adding all files:
1. Test locally: `npm run dev`
2. Build for production: `npm run build`
3. Deploy to your hosting platform
4. Configure environment variables in production

## 📞 Support

The real estate page is designed to:
- Generate qualified investment leads
- Showcase IPM's real estate expertise
- Convert property management clients to real estate buyers
- Provide comprehensive investment information

All forms are ready for CRM integration and email automation.

