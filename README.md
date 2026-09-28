# Passport-and-Citizenship-Tracking-System

A full-stack web application designed to help applicants track the progress of passport and citizenship applications while allowing authorized staff to create applicant accounts, manage applications, update application stages, and communicate status information to applicants.

The application is built using the MERN stack: MongoDB, Express.js, React, and Node.js.

## Features

Applicant Features
Secure applicant login
Login using application number and password
Temporary password provided when an account is created
Required password change after initial login
View current application status
View application progress through multiple processing stages
Receive status messages for each stage
View action-required notifications
Receive account information by email
Staff/Admin Features
Secure staff authentication
Admin dashboard
Create new applicant accounts
Automatically generate temporary passwords
View all applicants
Search and manage applicant records
Update individual application stages
Change application status
Add messages when applicant action is required
Monitor account and application status
Email Notifications
The application uses Resend to send transactional emails to applicants.

When an applicant account is created, the system can email the applicant:

### Their application number

A temporary password
Login instructions
A link to the applicant portal
Applicants are required to change their temporary password after their first login.

Application Tracking Stages
Applications progress through five primary stages.

Stage 1 — Mission Receives Application
The Mission receives the applicant's application and begins the initial review.

Stage 2 — First Screening Completed
The application passes the first screening and is prepared for submission to the Immigration Office.

Stage 3 — Immigration Office Review
The Immigration Office receives the application and conducts its review.

Stage 4 — Application Approved
After approval, the applicant's document is prepared and dispatched to the Mission.

Stage 5 — Mission Receives Document
The Mission receives the completed document and prepares it for delivery to the applicant.

Each stage can have one of several statuses:

processing
approved
actionRequired
When actionRequired is selected, staff can provide additional instructions to the applicant.

### Technologies Used

Frontend
React
React Router
JavaScript
HTML5
CSS3
Fetch API
Backend
Node.js
Express.js
MongoDB
Mongoose
bcrypt
JSON Web Tokens (JWT)
Resend
dotenv
CORS
Project Structure
passport-citizenship-tracking-system/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── images/
│ │ ├── utils/
│ │ └── App.jsx
│ │
│ └── package.json
│
└── backend/
├── controllers/
├── errors/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── package.json
└── .env

## Installation

1. Clone the Repository
   git clone <your-repository-url>
   Move into the project directory:

cd passport-citizenship-tracking-system
Backend Setup
Navigate to the backend:

cd backend
Install dependencies:

npm install
Create a .env file in the backend root directory:

PORT=5001
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
CLIENT_URL=http://localhost:5173
Never commit the .env file or API keys to GitHub.

Make sure .gitignore contains:

.env
node_modules
Start MongoDB and then start the backend server:

npm run dev
The API will normally run at:

http://localhost:5001
Frontend Setup
Open another terminal and navigate to the frontend:

cd frontend
Install dependencies:

npm install
Start the development server:

npm run dev
The terminal will display the local URL used by the frontend, commonly:

http://localhost:5173
Applicant Creation
Authorized staff can create an applicant by providing information such as:

{
"applicationNumber": "ABC123456",
"firstName": "John",
"lastName": "Brown",
"email": "john@example.com"
}
When the account is created, the backend:

Checks whether the application number already exists.
Generates a temporary password.
Hashes the password using bcrypt.
Creates the applicant in MongoDB.
Sets mustChangePassword to true.
Initializes the application's tracking stages.
Sends account information to the applicant by email.
The plaintext password is not stored in MongoDB.

Applicant Authentication
The applicant signs in using their application number and password.

After successful authentication, the server can return:

{
"token": "jwt-token",
"mustChangePassword": true
}
If:

mustChangePassword = true
the frontend redirects the applicant to the password-change page.

After the applicant successfully creates a permanent password:

mustChangePassword = false
and the applicant can access the tracking portal.

API Endpoints
Applicants
POST /applicants
GET /applicants
Create an applicant or retrieve applicants.

Application Status
PATCH /applicants/:applicantId/steps/:stepNumber
Updates a specific tracking stage for an applicant.

Authentication
Authentication endpoints handle staff and applicant login, JWT creation, and password management.

Additional endpoints may be added as development continues.

Security
The application uses several security practices:

Passwords are hashed with bcrypt before being stored.
JWTs are used for authenticated requests.
Protected routes require authorization.
Environment variables store sensitive configuration.
Resend API keys are kept server-side.
Temporary passwords must be changed after initial login.
Role-based access can restrict staff functionality.
API keys, JWT secrets, passwords, and .env files should never be committed to the repository.

Email Workflow
Staff creates applicant
|
v
Backend generates temporary password
|
v
Password is hashed
|
v
Applicant saved to MongoDB
|
v
Resend sends welcome email
|
v
Applicant opens login page
|
v
Applicant enters temporary password
|
v
Password change required
|
v
Applicant creates permanent password
|
v
Applicant accesses tracking portal
Application Status Workflow
Application Received
|
v
First Screening
|
v
Immigration Office Review
|
v
Application Approved
|
v
Document Sent to Mission
|
v
Document Prepared for Applicant
Staff members update these stages through the administrative portal, while applicants can view the updated information through their tracking portal.

## Future Improvements

Potential future improvements include:

One-time password setup links instead of emailing temporary passwords
Password reset functionality
Email notifications when an application status changes
SMS notifications
Advanced role-based access control
Department-specific dashboards
Application search and filtering
Audit logs for staff actions
Account lockout and login-attempt protection
Two-factor authentication
Document upload functionality
Production deployment and custom domain integration
Purpose
The Passport and Citizenship Tracking System demonstrates the development of a secure, role-based full-stack application that connects administrative workflows with a customer-facing tracking experience.

The project focuses on:

## Full-stack JavaScript development

REST API development
Authentication and authorization
MongoDB database design
React state management
Role-based application functionality
Transactional email integration
Secure password handling
Real-world application status tracking
Author
Kareem Edwards

Full-Stack JavaScript Developer

## Disclaimer

This project is intended as a software development project and demonstration. It is not an official government passport, citizenship, or immigration system unless explicitly deployed and authorized by the appropriate institution.
