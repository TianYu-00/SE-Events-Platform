<div align="center">
<h1> SE - Events Platform</h1> 
Project that allows community memebers to view, sign up for and add events to their own personal calender. Staff members have additional functionality to create and manage events.
<br><br>

[![madewithlove](https://img.shields.io/badge/made_with-❤-red?style=for-the-badge&labelColor=orange
)](https://github.com/Tianyu-00)

[Prerequisites](https://github.com/TianYu-00/SE-Events-Platform?tab=readme-ov-file#prerequisites) | [Backend](https://github.com/TianYu-00/SE-Events-Platform?tab=readme-ov-file#backend) | [Frontend](https://github.com/TianYu-00/SE-Events-Platform?tab=readme-ov-file#frontend)

[![Tests](https://github.com/TianYu-00/SE-Events-Platform/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/TianYu-00/SE-Events-Platform/actions/workflows/ci.yml)

![Image](https://github.com/user-attachments/assets/e2e31252-3215-4acb-adc8-5e96ab9557b5)

|                  **Frontend**                  |                     **Backend**                      |      **Database**      |
|:----------------------------------------------:|:----------------------------------------------------:|:----------------------:|
|              _https://vercel.com_              |                 _https://render.com_                 | _https://supabase.com_ |
| _https://se-events-platform-tianyu.vercel.app_ | _https://se-events-platform-tianyu.onrender.com/api_ |       _Private_        |

</div>

# Prerequisites
### These versions are used during development
- **Node.js** v21.7.2: https://nodejs.org/en/download
- **PostgreSQL** v14.15: https://www.postgresql.org/download/
### You need the relevant API and publisher keys (see env for specifics).
- **Clerk Keys**: https://clerk.com/
- **Stripe Keys**: https://stripe.com/
- **Cloudinary Keys**: https://cloudinary.com/

# Backend
```
cd backend
```
```
npm install
```
```
npm start
```
```
npm test
```

# Frontend
```
cd frontend
```
```
npm install
```
```
npm run dev
```

# Environment Variables
### Backend `.env.development`
``` 
# Express
PORT=

# Database
PGDATABASE=

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

### Backend `.env.test`
``` 
# Express
PORT=

# Database
PGDATABASE=

# Clerk
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_TESTING_ADMIN_TOKEN=
CLERK_TESTING_USER_TOKEN=

#Stripe
STRIPE_SECRET_KEY=
```

### Backend `.env.production`
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

### Frontend `.env.production`
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