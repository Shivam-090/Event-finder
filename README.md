# Event Finder

**Event Finder** is a full-stack web application that allows users to **discover, create, and manage events**.  
It connects event organizers with attendees, enabling smooth registration, search, and event tracking — all in one place.
For Accessing the Admin dashboard use
Email: admin@example.com
Password: Admin090

---

## Features

- Browse and search for events by location, type, or date  
- Create, edit, and delete your own events  
- User authentication and authorization (JWT-based)  
- Real-time API communication between frontend and backend  
- MongoDB database integration  
- Deployed and production-ready  

---

##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/event-finder.git
cd event-finder
```

### 2. Install Dependencies
For both frontend and backend:
```bash
cd frontend
npm install

cd ../backend
npm install
```

---

## How to Run the Project

### Start the Backend
```bash
cd backend
npm start
```

### Start the Frontend
```bash
cd frontend
npm run dev
```

Then open your browser at:
```
Frontend → http://localhost:5173  
Backend  → http://localhost:3000
```

---

## Environment Variables

Both the frontend and backend require `.env` files.  
Use the `.env` file for reference.

### Backend `.env`
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_API_KEY=your_Imagekit_Public_api_key
IMAGEKIT_PRIVATE_KEY=your_Imagekit_private_api_key
IMAGEKIT_URL_ENDPOINT=your_Imagekit_URL_endpoint
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:3000
```

---

## Deployed Links

- **Frontend (Vercel):** [https://event-finder-8uv3.vercel.app/](#)  
- **Backend (Render/Railway):** [https://event-finder-brown.vercel.app/](#)  


---

## API Documentation

### Base URL
```
https://imagekit.io/docs
```


---

## AI Tools Used

AI was used during the development process to **improve productivity, optimize debugging, and document efficiently.**

| Tool | Purpose |
|------|----------|
| **ChatGPT** | Used extensively for debugging backend issues (e.g., MongoDB connection errors, API request handling, and deployment troubleshooting). |
| **GitHub Copilot** | Assisted in writing repetitive code snippets and React component logic. |

---

## Challenges Faced & Solutions

| Challenge | Solution |
|------------|-----------|
| MongoDB connection timeout (`buffering timed out`) | Ensured database connection before handling requests using async/await |
| CORS issues during deployment | Configured `cors` middleware properly in Express |
| State management in React | Used React Context API for global event state |
| Deployment environment mismatch | Created `.env.example` and configured environment variables on Render/Vercel |

---



## Tech Stack

**Frontend:** React.js, Tailwind CSS, Vite  
**Backend:** Node.js, Express.js, MongoDB  
**Database:** MongoDB Atlas  
**Deployment:** Vercel (Frontend), Render/Railway (Backend)  
**AI Tools:** ChatGPT (debugging), GitHub Copilot  

---

## Code Quality Checklist

✅ Clean commit history  
✅ `.env.example` file included  
✅ `package.json` with all dependencies  
✅ Modular code structure (controllers, routes, models)  
✅ Deployed and tested  

---

