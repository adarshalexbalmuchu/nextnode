<h1 align="center">🚀 NextNode – The Future of Blogging is Here</h1>

<p align="center">
  A sleek, full-stack blog platform built with <strong>React</strong> & <strong>Supabase</strong>, engineered for creators, readers, and builders alike.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Vite-blue" alt="React" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-green" alt="Supabase" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <img src="https://img.shields.io/badge/Status-Active-success" />
</p>

---

## ✨ About NextNode

NextNode is a next-gen blog platform designed for modern content creators and tech storytellers. It combines rich, user-friendly publishing features with powerful backend capabilities, all in a clean, minimal, and fast interface.

🧠 Built with type safety in mind  
🔐 Secure user authentication & role-based access  
📈 Scalable, responsive, and beautifully designed

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|------------|--------------------------------------|
| Frontend   | React, Vite, TailwindCSS, Shadcn/UI  |
| Backend    | Supabase (Auth, DB, Storage, RLS)    |
| Auth       | Supabase Email/Password Login        |
| Styling    | TailwindCSS + Custom Design System   |
| Language   | TypeScript (strict)                  |

---

## 🔥 Features

### 📰 Blog System
- Create, edit, and manage blog posts (admin only)
- Dynamic categories and filtering
- Clean markdown-rendered blog view

### 👥 User Dashboard
- Bookmark articles
- View comment history
- Edit profile information
- Manage reading history

### 🛡️ Admin Dashboard
- Role-based access control via Supabase `profiles.role`
- Post and content management
- Comment moderation (coming soon)

### 📬 Newsletter
- Email subscription with spam protection
- Data stored securely in Supabase
- (Planned) Email campaign integration

### 🧩 Developer Features
- Supabase TypeScript types generated via CLI
- Clean separation of concerns with service layers
- Toast-based feedback system for all interactions

---

## 📂 Project Structure
src/
├── components/ # Shared components (Navbar, Footer, etc.)
├── pages/ # Routes like Home, Blog, Dashboard, etc.
├── services/ # Supabase DB abstraction
├── types/ # Supabase types & custom types
├── contexts/ # Auth and app-level context providers
├── utils/ # Helper functions
supabase/
└── migrations/ # Schema & RLS policies

yaml
Copy
Edit

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextnode-blog.git
cd nextnode-blog
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment
Create a .env file:

env
Copy
Edit
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
4. Run the App
bash
Copy
Edit
npm run dev
💡 Dev Notes
Supabase types are auto-generated and stored in src/types/supabase.ts

Auth context manages user state, role-based access, and loading state

Use toast.success() / toast.error() for all UI feedback (no alert or console.log)

Admin access is now based on Supabase profiles.role === 'admin'

🔐 Supabase Setup
profiles table includes a role column for role-based access.

RLS policies restrict access to each user's own data.

Admins are granted extra access through Supabase rules.

To generate types after schema updates:

bash
Copy
Edit
npx supabase gen types typescript --project-id <your-id> > src/types/supabase.ts
📦 Deployment
This app is ready for deployment on:

Vercel

Netlify

Render

Supabase Edge Functions (if backend logic needed)

🤝 Contribution
Contributions, issues, and feature requests are welcome!
Feel free to open a PR or create an issue.

📄 License
This project is licensed under the MIT License.

🙋‍♂️ Author
Adarsh Alex Balmuchu
🚀 IIM Ranchi | 📸 Tech Creator | 💡 Builder of AuthFlow, NextNode, and more
LinkedIn | Instagram | Portfolio

If you liked this project, consider giving it a ⭐ on GitHub!

yaml
Copy
Edit

---

✅ You can now paste this directly into your `README.md` file.  
Let me know if you'd like to add badges, demo screenshots, or a "Frequently Asked Questio

