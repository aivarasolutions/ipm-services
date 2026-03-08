# IPM Proposal Page – Customization Guide

Quick reference for updating the proposal page for different properties.

---

## Quick Start (5 Minutes)

### Step 1: Update Property Address
**Search for**: `[EDIT: ADDRESS]`

Replace all instances of:
- `5048 Downhaul Dr` → Your property address
- `Charlotte, NC` → Your city/state
- `Charlotte, NC 28214` → Full address with ZIP

**Locations to update:**
- Hero section subheadline
- Property overview heading
- Address card
- Page title
- Footer

### Step 2: Update City Name
**Search for**: `[EDIT: CITY]`

Replace all instances of:
- `Charlotte` → Your city name

**Locations to update:**
- Hero headline
- Property overview section
- Market opportunity section
- Market statistics (if applicable)

### Step 3: Update Revenue Projections
**Search for**: `[EDIT: PROJECTIONS]`

Update these three scenarios:

#### Conservative Scenario
```
Nightly Rate: $165 → Your rate
Occupancy: 55% → Your %
Booked Nights: 16-17 → Your nights
Monthly Revenue: $2,700-$2,900 → Your range
Annual Revenue: $32K-$35K → Your range
```

#### Strong Performance Scenario
```
Nightly Rate: $210 → Your rate
Occupancy: 65% → Your %
Booked Nights: 19-20 → Your nights
Monthly Revenue: $4,000-$4,300 → Your range
Annual Revenue: $48K-$52K → Your range
```

#### Premium Optimized Scenario
```
Nightly Rate: $265 → Your rate
Occupancy: 72% → Your %
Booked Nights: 21-22 → Your nights
Monthly Revenue: $5,600-$6,000 → Your range
Annual Revenue: $67K-$72K → Your range
```

**Also update:**
- Hero section stats ($67K+, 72%, $265)
- Chart data in JavaScript section

### Step 4: Update Fee Structure
**Search for**: `[EDIT: FEES]`

Replace:
- `$200/mo` → Your monthly platform fee
- `20%` → Your management fee percentage
- `15%` → Your platform commission estimate
- All sample calculation amounts

**Locations to update:**
- Fee structure card
- Earnings table
- Sample calculation section

### Step 5: Connect CTA Links
**Search for**: `[EDIT: CTA_LINKS]`

Replace placeholder URLs with:
- Calendly link for scheduling
- CRM or contact form URL
- Company website URL
- Contact email address

**Locations to update:**
- Navigation "Schedule Consultation" button
- Hero "Schedule Owner Consultation" button
- Revenue Projection link
- CTA section buttons
- Footer website link
- Footer contact email

---

## Detailed Customization

### Images

The page uses two images:

#### 1. Hero Background (`hero-bg.jpg`)
- **Size**: 2500 x 1872 px
- **Purpose**: Hero section background
- **Usage**: Shown at 25% opacity with overlay
- **To replace**: 
  1. Find a luxury Charlotte neighborhood or home image
  2. Save as `hero-bg.jpg`
  3. Place in same directory as `index.html`

#### 2. Supporting Image (`charlotte-home.jpg`)
- **Size**: 1899 x 1268 px
- **Purpose**: Currently unused (reserved for future use)
- **To replace**: 
  1. Find a luxury home or neighborhood image
  2. Save as `charlotte-home.jpg`
  3. Place in same directory as `index.html`

### Colors

To change the color scheme, update CSS variables at the top of the `<style>` section:

```css
:root {
  --navy:       #0E1A2B;      /* Primary dark color */
  --slate:      #232A33;      /* Secondary dark color */
  --ivory:      #F8F7F4;      /* Light background */
  --gold:       #C6A66B;      /* Accent color */
  --gold-light: #D9BC8A;      /* Lighter accent */
  /* ... other variables ... */
}
```

**Common color updates:**
- **Brand Primary**: Change `--navy` and `--slate`
- **Accent**: Change `--gold` and `--gold-light`
- **Text**: Change `--text-dark`, `--text-mid`, `--text-light`
- **Backgrounds**: Change `--ivory` and `--white`

### Typography

To change fonts, update the Google Fonts import:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

Then update the font families in CSS:

```css
h1, h2, h3, h4 {
  font-family: 'Playfair Display', Georgia, serif;  /* Change this */
}

body {
  font-family: 'Inter', sans-serif;  /* Change this */
}
```

**Popular alternatives:**
- **Headings**: Playfair Display, Cormorant, Bodoni Moda, Abril Fatface
- **Body**: Inter, Poppins, Raleway, Lato, Open Sans

### Market Statistics

To update Charlotte-specific market data, find the "Market Opportunity" section:

```html
<div class="market-stat-card">
  <div class="value">57M+</div>
  <div class="desc">Annual passengers through Charlotte Douglas International Airport</div>
</div>
```

Replace with your city's statistics:
- Airport passenger numbers
- Annual visitor spending
- Number of conventions/events
- STR demand growth
- City ranking for STR ROI
- Average occupancy rates

### Charts

#### Chart 1: Nightly Rates by Property Type

Find this section in the JavaScript:

```javascript
new Chart(nightlyCtx, {
  type: 'bar',
  data: {
    labels: ['Studio / 1BR', '2 Bedroom', '3 Bedroom', '4 Bedroom', 'Luxury / 5BR+'],
    datasets: [{
      data: [110, 155, 210, 285, 380],  // Update these values
```

Update the `labels` and `data` arrays to match your market.

#### Chart 2: Annual Revenue Comparison

Find this section in the JavaScript:

```javascript
new Chart(revenueCtx, {
  type: 'bar',
  data: {
    labels: ['Conservative', 'Strong Performance', 'Premium Optimized'],
    datasets: [
      {
        label: 'Annual Revenue Low ($)',
        data: [32000, 48000, 67000],  // Update these values
      },
      {
        label: 'Annual Revenue High ($)',
        data: [35000, 52000, 72000],  // Update these values
      }
```

Update the `data` arrays to match your projections.

### Earnings Table

The earnings table is editable by users, but you can change the default values:

```html
<td contenteditable="true" data-type="currency">$4,200</td>  <!-- Monthly gross revenue -->
<td contenteditable="true" data-type="currency">– $630</td>   <!-- Platform commission -->
<td contenteditable="true" data-type="currency">$3,570</td>   <!-- Net revenue -->
<td contenteditable="true" data-type="currency">– $714</td>   <!-- Management fee -->
<td contenteditable="true" data-type="currency">– $200</td>   <!-- Platform fee -->
<td><strong>$2,656</strong></td>                              <!-- Owner payout -->
```

Update these to reflect your typical scenario.

### Services List

To change the services offered, update the services grid:

```html
<div class="service-card">
  <div class="service-icon">📸</div>
  <h4>Listing Creation & Optimization</h4>
</div>
```

Change the emoji and text to match your services. You can use any emoji or Unicode character.

### Why IPM Advantages

To update competitive advantages, modify the "Why Owners Choose IPM" section:

```html
<div class="why-card">
  <div class="why-card-icon">📈</div>
  <h4>Revenue Optimization Strategy</h4>
  <p>Your description here...</p>
</div>
```

Update the emoji, heading, and description for each advantage.

### Dashboard Features

To update dashboard/reporting features:

```html
<div class="dashboard-feature">
  <div class="icon">📅</div>
  <p>Booking Visibility & Calendar Transparency</p>
</div>
```

Change the emoji and text to match your features.

---

## Advanced Customization

### Add a Logo

To add your company logo, replace the text logo in the navigation:

```html
<!-- Current -->
<div class="nav-logo">IPM<span>.</span></div>

<!-- Replace with -->
<div class="nav-logo">
  <img src="logo.png" alt="IPM Logo" style="height: 32px; width: auto;">
</div>
```

### Change Section Backgrounds

Each section has a background class:
- `.section--white` - White background
- `.section--ivory` - Ivory background
- `.section--dark` - Navy background
- `.section--slate` - Slate background

To change a section's background:

```html
<!-- Current -->
<section class="section section--white">

<!-- Change to -->
<section class="section section--dark">
```

### Add New Sections

To add a new section, copy an existing section and modify:

```html
<section class="section section--white" id="new-section">
  <div class="container">
    <div class="section-header fade-in">
      <div class="section-label">LABEL</div>
      <h2>Your Heading</h2>
      <div class="gold-divider"></div>
      <p>Your description</p>
    </div>
    <!-- Your content here -->
  </div>
</section>
```

### Modify Animations

To change scroll animation speed, update the CSS:

```css
.fade-in {
  transition: opacity 0.7s ease, transform 0.7s ease;  /* Change 0.7s to your duration */
}
```

To disable animations entirely, add to CSS:

```css
.fade-in {
  opacity: 1 !important;
  transform: none !important;
}
```

---

## Testing Checklist

After customization, test:

- [ ] All text is updated correctly
- [ ] Images display properly
- [ ] Links work (especially CTA buttons)
- [ ] Charts display correct data
- [ ] Table is editable
- [ ] Page is responsive on mobile
- [ ] Navigation scroll effect works
- [ ] Scroll animations trigger
- [ ] Colors match your brand
- [ ] No broken links or missing images

---

## Common Issues & Solutions

### Images Not Showing
- **Problem**: Images appear as broken links
- **Solution**: Ensure `hero-bg.jpg` and `charlotte-home.jpg` are in the same directory as `index.html`

### Charts Not Displaying
- **Problem**: Chart.js CDN link is broken
- **Solution**: Check internet connection and verify Chart.js CDN is accessible

### Links Not Working
- **Problem**: CTA buttons don't navigate
- **Solution**: Replace `#` with actual URLs in `[EDIT: CTA_LINKS]` sections

### Mobile Layout Broken
- **Problem**: Page doesn't display correctly on mobile
- **Solution**: Check viewport meta tag is present: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`

### Text Colors Hard to Read
- **Problem**: Low contrast between text and background
- **Solution**: Update color variables in CSS to improve contrast

---

## Performance Tips

1. **Optimize Images**: Compress JPG files to <500KB each
2. **Lazy Load**: Add `loading="lazy"` to images if needed
3. **Minimize CSS**: Remove unused styles if customizing
4. **Cache**: Set browser cache headers on your server
5. **CDN**: Use a CDN for Google Fonts and Chart.js

---

## Version Control

When customizing, consider:
- Creating a backup of the original HTML
- Using version control (Git) to track changes
- Creating variants for different properties
- Documenting all customizations

---

## Support

For help with customization:
1. Check the main README.md for detailed information
2. Review the HTML comments marked `[EDIT: ...]`
3. Test changes in a browser before deploying
4. Use browser developer tools to debug issues

---

**Last Updated**: March 2025  
**For**: IPM – International Property Management
