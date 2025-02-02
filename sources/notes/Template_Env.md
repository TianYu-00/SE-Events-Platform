# Environment Variables
Need help with finding some of the environment variables? [Click Me](./Environment_Variables_Guide.md)

### Backend `.env.development`
``` 
# Express
PORT=9090

# Database
PGDATABASE=se_events_platform

# Clerk
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_SIGNING_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Backend (Optional) `.env.test`
``` 
# Express
PORT=9090

# Database
PGDATABASE=se_events_platform_test

# Clerk
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_TESTING_ADMIN_TOKEN=
CLERK_TESTING_USER_TOKEN=

#Stripe
STRIPE_SECRET_KEY=
```


### Backend (Optional) `.env.production` 
``` 
# Express
PORT=
FRONTEND_URL=

# Database
DATABASE_URL=

# Clerk
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_SIGNING_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
``` 


### Frontend `.env.local`
```
#Clerk
VITE_CLERK_PUBLISHABLE_KEY=

#Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET_NAME=
VITE_CLOUDINARY_API_KEY=

#Stripe
VITE_STRIPE_PUBLISHABLE_KEY=
```


### Frontend (Optional) `.env.production`
```
#
VITE_BACKEND_URL=

#Clerk
VITE_CLERK_PUBLISHABLE_KEY=

#Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET_NAME=
VITE_CLOUDINARY_API_KEY=

#Stripe
VITE_STRIPE_PUBLISHABLE_KEY=
``` 