# SE - Events Platform API Endpoints Documentation

## API
- **GET** `/api`  
  - **Description**: Fetch API Endpoints Documentation.
  - **Permission**: All

- **GET** `/api/test`  
  - **Description**: Test API call.
  - **Permission**: All

## Users
- **GET** `/api/users`  
  - **Description**: Fetch all users.
  - **Permission**: Admin

- **POST** `/api/users/update-role`  
  - **Description**: Update user role.
  - **Permission**: Admin

- **GET** `/api/users/:user_id`  
  - **Description**: Fetch a single user by ID.
  - **Permission**: Authenticated

- **POST** `/api/users/initialize`  
  - **Description**: Initialize a user.
  - **Permission**: All

## Events
- **GET** `/api/events`  
  - **Description**: Fetch all events.
  - **Permission**: All
  - **Query Parameters**:
    - `order_created_at` (string, optional): Sort events by creation date.
      - Values: `["asc", "desc"]`
    - `order_start_date` (string, optional): Sort events by start date.
      - Values: `["asc", "desc"]`
    - `is_allow_outdated` (boolean, optional): Filter events to allow or disallow outdated events.
      - Values: `[true, false]`

- **GET** `/api/events/:event_id`  
  - **Description**: Fetch a single event by ID.
  - **Permission**: All

- **POST** `/api/events`  
  - **Description**: Create a new event.
  - **Permission**: Admin

- **DELETE** `/api/events`  
  - **Description**: Delete events.
  - **Permission**: Admin

- **PATCH** `/api/events/:event_id`  
  - **Description**: Edit an event.
  - **Permission**: Admin

## Stripe
- **POST** `/api/stripe/create-payment-intent`  
  - **Description**: Create a payment intent.
  - **Permission**: Authenticated

- **POST** `/api/stripe/verify-payment-intent`  
  - **Description**: Verify a payment intent.
  - **Permission**: Authenticated

- **POST** `/api/stripe/webhook`  
  - **Description**: Handle Stripe webhook events.
  - **Permission**: All

## Purchases
- **GET** `/api/purchases`  
  - **Description**: Fetch all purchases.
  - **Permission**: Authenticated

- **POST** `/api/purchases/free`  
  - **Description**: Create a free purchase.
  - **Permission**: Authenticated

## Clerk
- **POST** `/api/clerk/webhook`  
  - **Description**: Handle Clerk webhook events.
  - **Permission**: All