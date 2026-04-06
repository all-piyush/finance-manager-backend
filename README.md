# Finance Dashbaord Backend
 A backend system for managing financial transactions with authentication, role-based access, analytics, and rate limiting.

 ## Features
   - JWT Authentication (cookies)
   - Role-Based Access Control (RBAC)
   - Transaction Management (CRUD)
   - Summary & Analytics (monthly, weekly, category-wise)
   - Rate Limiting (security)
   - Filtering (date, category, type)

 ## Roles & Permissions
 - Viewew - read only
 - Analyst - read and analytics
 - Admin- full crud + analytics
 
 ## Authentication
 - Token stored in cookies

 ## Rate Limiting
 - Auth - 5/15min
 - Read APIs - 100/15min
 - Write APIs - 50/15min

 ## Setup
  - ### Install dependencies
    - npm install
  - ### Create .env
    - PORT
    - DATABASE_URL
    - JWT_SECRET
    
  - ### Run server
    - npm run dev

## Folder Structure
  - Controllers/
  - Routes/
  - Config/
  - Middleware/
  - Models/
