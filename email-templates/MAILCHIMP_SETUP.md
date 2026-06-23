# IPM.Services — Mailchimp Nurture Journey: Manual Setup Guide

## Why this is manual
Mailchimp's **Customer Journeys API only supports `trigger`** — there is **no endpoint to
create or publish a journey**. The legacy "Classic Automations" builder is being retired and
cannot reliably accept a custom multi-email branded drip via API. Therefore the 4-email
sequence must be built **once, by hand**, in the Mailchimp Customer Journey builder. After that
it runs automatically forever — no code involved.

The website already does the automated part: every form submission is added to the correct
audience and tagged, which is what triggers the journey.

---

## What the website already does automatically (live now)
- **Audience:** `IPM - International Property Management` (ID `a090381f0a`)
- **Every lead gets these tags:** `Website Lead`, `IPM Inquiry`, `Property Owner`, `Management Inquiry`
- **Plus, when the form type is known:** `Contact Form`, `Listing Promotion Inquiry`, `Full Management Inquiry`
- **Merge fields captured:** `FNAME`, `LNAME`, `PHONE`, `LOCATION` (LOCATION holds property type/area), `SOURCE`, `SIGNDATE`

---

## STEP 1 — Confirm the audience merge fields
1. Mailchimp → **Audience** → switch to **IPM - International Property Management**.
2. **Settings → Audience fields and *|MERGE|* tags**. Make sure these tags exist
   (create any that are missing — the tag name must match exactly):
   - `FNAME` (First Name) — text
   - `LNAME` (Last Name) — text
   - `PHONE` (Phone) — text
   - `LOCATION` (Property Location) — text
   - `SOURCE` (Form Source) — text
   - `SIGNDATE` (Date Submitted) — text or date
3. For `FNAME`, set a **Default merge tag value** like `there` so emails read
   "Hi there," when no name is provided.

## STEP 2 — Set the sending identity (From / Reply-To)
1. **Account → Settings → Verified domains** → verify **ipm.services**
   (add the DNS records Mailchimp shows you at your domain registrar).
2. You will set each email's **From name** = `International Property Management`,
   **From email** = `notifications@ipm.services`, and **Reply-To** = `support@ipm.services`
   when you build the emails in Step 4.
   - DNS forwarding `support@ipm.services` and `info@ipm.services` → `Kevin@AivaraSolutions.com`
     is already configured at the domain level, so replies land in Kevin's inbox.

## STEP 3 — Save the 4 templates in Mailchimp
For each HTML file in this folder:
1. Mailchimp → **Content → Email templates → Create Template → Code your own → Paste in code**.
2. Paste the full contents of the file and **Save**. Suggested names:
   - `IPM Nurture 1 — Thank You`  → `nurture-1-thank-you.html`
   - `IPM Nurture 2 — More Bookings` → `nurture-2-more-bookings.html`
   - `IPM Nurture 3 — Plans` → `nurture-3-plans.html`
   - `IPM Nurture 4 — Consultation` → `nurture-4-consultation.html`

> The templates already include Mailchimp merge tags (`*|FNAME|*`), the required
> `*|UNSUB|*` unsubscribe link, and `*|HTML:LIST_ADDRESS_HTML|*` for the physical address.

## STEP 4 — Build the Customer Journey
1. Mailchimp → **Automations → Customer Journeys → Create Journey → Start from scratch**.
2. Name it `IPM Website Lead Nurture`. Make sure the journey's audience is
   **IPM - International Property Management**.
3. **Starting point → "Tag added"** → choose tag **`Website Lead`**.
   - To also trigger on `IPM Inquiry`: add a second starting point "Tag added → `IPM Inquiry`".
     (Both tags are applied to every lead, so triggering on `Website Lead` alone is enough —
     a contact only enters the journey once.)
   - In the starting-point rules, enable **"Allow contacts to re-enter"** = OFF so a person
     isn't nurtured twice.
4. Build this exact sequence (click **+** to add each step):

   | Step | Type | Setting | Email template | Subject |
   |------|------|---------|----------------|---------|
   | 1 | **Send email** | immediately | IPM Nurture 1 — Thank You | `Thank You for Contacting IPM` |
   | 2 | **Delay** | **2 days** | — | — |
   | 3 | **Send email** | — | IPM Nurture 2 — More Bookings | `More Bookings. Less Vacancy.` |
   | 4 | **Delay** | **3 days** (Day 5 total) | — | — |
   | 5 | **Send email** | — | IPM Nurture 3 — Plans | `10% Promotion Plan vs. 20% Full Management` |
   | 6 | **Delay** | **2 days** (Day 7 total) | — | — |
   | 7 | **Send email** | — | IPM Nurture 4 — Consultation | `Ready to Maximize Your Property?` |

   > Delays are cumulative: 2 + 3 + 2 = Email 2 on Day 2, Email 3 on Day 5, Email 4 on Day 7.

5. For **each** "Send email" step set:
   - **From name:** `International Property Management`
   - **From email:** `notifications@ipm.services`
   - **Reply-To:** `support@ipm.services`
   - **Subject:** as in the table above
   - **Design:** the matching saved template from Step 3.

## STEP 5 — Test before going live
1. In the journey builder, use **Preview** on each email to confirm branding renders.
2. Add yourself (or `Kevin@AivaraSolutions.com`) to the IPM audience and apply the
   `Website Lead` tag manually to confirm the journey fires.
3. When everything looks right, click **Turn on / Publish** the journey.

## STEP 6 — Go live
- Once the journey is published, every website form submission automatically enters the
  sequence. No further code changes are needed.

---

## ⚠️ Avoid duplicate "thank you" emails
The website **also** sends an instant branded confirmation via Resend
(`notifications@ipm.services`) the moment a form is submitted. That overlaps with
**Journey Email 1 (immediate)**.

Choose ONE of these so leads don't get two thank-you emails:
- **Option A (recommended):** Let Mailchimp own the whole sequence. Ask me to disable the
  Resend customer confirmation (keep the internal admin notification to `support@ipm.services`).
- **Option B:** Keep the Resend confirmation as the instant "thank you" and **delete Journey
  Email 1**, starting the journey with a 2-day delay → Email 2.

Tell me which you prefer and I'll set it up.
