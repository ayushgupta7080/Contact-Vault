# Contact Vault – Contact Management App

## Tech Stack
- Frontend: React.js (Vite)
- Backend: Node.js + Express.js
- Database: PostgreSQL (via Render)
- ORM: Drizzle ORM
- Styling: Tailwind CSS
- State Management: React Query + useState

## Features
- Contact form with validation (Name, Email, Phone, Message)
- List contacts without page reload
- Backend REST APIs (GET, POST, DELETE)
- Responsive UI

## Live Demo
🔗 https://contact-vault-dzqi.onrender.com

## Known Issue (Deployment)
While the application works correctly in development, the deployed version on Render currently faces a database connectivity issue affecting:
- Fetching contacts
- Creating new contacts

The backend and frontend are deployed successfully, but the production database connection requires further environment-level tuning.

## Notes
- External references (documentation & Google) were used where required.
- Project focuses on demonstrating full-stack architecture and clean code practices.
