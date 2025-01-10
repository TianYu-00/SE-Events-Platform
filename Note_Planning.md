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