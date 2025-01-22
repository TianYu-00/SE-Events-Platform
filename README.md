<div align="center">
<h1> SE - Events Platform</h1> 
Project that allows community memebers to view, sign up for and add events to their own personal calender. Staff members have additional functionality to create and manage events.
<br><br>

[![madewithlove](https://img.shields.io/badge/made_with-❤-red?style=for-the-badge&labelColor=orange
)](https://github.com/Tianyu-00)

[Prerequisites](https://github.com/TianYu-00/SE-Events-Platform?tab=readme-ov-file#prerequisites) | [Backend](https://github.com/TianYu-00/SE-Events-Platform?tab=readme-ov-file#backend) | [Frontend](https://github.com/TianYu-00/SE-Events-Platform?tab=readme-ov-file#frontend)

[![Tests](https://github.com/TianYu-00/SE-Events-Platform/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/TianYu-00/SE-Events-Platform/actions/workflows/ci.yml)

![Image](https://github.com/user-attachments/assets/e2e31252-3215-4acb-adc8-5e96ab9557b5)

</div>

# Prerequisites
- **Node.js** v21.7.2
- **PostgreSQL** v14.15
- **Clerk API Keys**
- **Stripe API Keys**

# Backend
```
cd backend
```
```
npm install
```
```
npm test
```
```
npm start
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

#Stripe
STRIPE_SECRET_KEY=
```

### Frontend `.env.local`
```
#Clerk
VITE_CLERK_PUBLISHABLE_KEY=

#Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET_NAME=

#Stripe
VITE_STRIPE_PUBLISHABLE_KEY=
```