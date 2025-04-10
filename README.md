# Campusify

Campusify is a web application with two roles — **Admin** and **Student** — designed for college campuses. It allows users to view upcoming events, post or find lost items, check the mess menu, and share or access study notes.

## 🛠 Tech Stack

- **Frontend:** Next.js
- **Backend:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** NextAuth.js
- **Styling:** CSS

## ✨ Key Features

- 🧑‍🎓 Student and 🛠 Admin modes with role-based access control
- 📅 Upcoming Events section
- 🧾 Lost and Found system
- 🍽 Mess Menu viewer
- 📚 Notes sharing and browsing
- 🔐 Secure authentication using NextAuth.js with bcrypt

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/campusify.git
cd campusify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

✅ Replace the values with your actual secrets and MongoDB connection string.

### 4. Run the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🛡️ Security

- Passwords are never stored in plain text; they are encrypted using **bcrypt**
- Users cannot access routes outside their role scope
- **NextAuth.js** sessions ensure secure, authenticated access

---

## 📁 Folder Structure (Optional)

```bash
.
├── models/             # Mongoose models
├── pages/              # Next.js page routes
├── public/             # Static assets
├── styles/             # CSS files
├── utils/              # Helper functions
└── .env.local          # Environment variables
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

> Made with 💙 by Erin Helga D Silva
