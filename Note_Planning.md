# MVP
1. Display a list of events for users to browse. 
2. Allow users to sign up for an event. 
3. Allow users to add events to their Google Calendar after signing up. 
4. Enable staff members to sign-in to create and manage events.

# Optional Extension
1. Payment platform integration: Implement payments via Stripe, Google Pay, etc. 
2. Confirmation emails: Automatically send confirmation emails to users who sign up for an event. 
3. Social media integration: Allow users to share events on social platforms. 
4. Cross-platform: Build both a website and a mobile app. 
5. Google/Social login: Allow users to sign up using their Google or social media accounts.

# Spiking
- Clerk - Account Auth ✅
- Cloudinary - Image Hosting ✅

# Test Clerk Accounts
user+clerk_test@example.com
user123

admin+clerk_test@example.com
admin123

# Test Stripe Cards
Success: 4000008260000000
Decline: 4000000000000002


# Backend
Main Tools to use:
- Express
- PSQL
- Jest

# Frontend
Main Tools to use:
- Vite.js
- Tailwind
- React-Icons

# NOTE Cloudinary
- https://api.cloudinary.com/v1_1/:cloudName/upload
- need formData with
    - file (image)
    - upload_preset (preset name) for unsigned upload


# NOTE Stripe
- https://docs.stripe.com/sdks/stripejs-react?locale=en-GB
- https://docs.stripe.com/testing
- https://docs.stripe.com/testing?testing-method=card-numbers#visa
- https://docs.stripe.com/keys
- https://docs.stripe.com/get-started/checklist/website
- https://docs.stripe.com/plan-integration/get-started/server-side-integration
- https://docs.stripe.com/get-started/development-environment
- https://docs.stripe.com/stripe-cli?install-method=linux
- Stripe CLI: https://github.com/stripe/stripe-cli/releases
```
tar -xvzf stripe_1.23.3_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/
```
- `stripe --version`
- `stripe login` or `stripe login --interactive` or `stripe login --api-key <api key here without brackets>`
- `stripe listen --forward-to localhost:port/api/webhook-route`
- `stripe listen --forward-to localhost:9090/api/payment/webhook`
- https://docs.stripe.com/webhooks/quickstart
```
    // webhook payload needs to be a string or buffer not json
    app.use(express.json({
    verify: (req, res, buf) => {
    if (req.originalUrl.startsWith('/api/payment/webhook')) {
        req.rawBody = buf.toString();
    }
    },
    }));
```

```
    const payload = req.rawBody;
    const signature = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
```


# NOTE
- Need to sort out my naming conventions later to be more consistent i.e handleXXX to handle_WhatEverItDoes

# SOME TODO LIST (Optional):
- Create filter in events page
- Add search bar in events page
- Add clickable tags that redirect to the events page with a query parameter search=tag, automatically searching for events that has the same tag.

# 🔴 Urgent TODO
