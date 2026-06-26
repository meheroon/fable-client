# 📚 Fable - Digital Ebook Marketplace (Client)

Fable is a modern digital ebook marketplace where readers can discover and purchase ebooks, writers can publish and manage their books, and admins can manage the entire platform.

## 🌐 Live Website

https://fable-client-ten.vercel.app

---

## 🚀 Features

- Firebase Email & Password Authentication
- Google Sign-In Authentication
- JWT Protected Routes
- Role-based Authentication (Reader, Writer, Admin)
- Responsive Design (Desktop, Tablet & Mobile)
- Browse Featured Ebooks
- Ebook Details Page
- Secure Stripe Payment Integration
- Writer Dashboard
- Admin Dashboard
- Reader Dashboard
- Wishlist / Bookmark System
- Purchase History
- Writer Verification Payment
- Dynamic Dashboard Redirection Based on User Role

---

## 🛠️ Technologies Used

- Next.js 16
- React
- Tailwind CSS
- Firebase Authentication
- Axios
- React Hook Form
- Stripe
- JWT
- Framer Motion

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/meheroon/fable-client.git
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_API_URL=
```

---

## 📂 Project Structure

```
app/
components/
hooks/
provider/
public/
lib/
```

---

## 👤 User Roles

### Reader

- Browse ebooks
- Purchase ebooks
- Wishlist ebooks
- View purchase history

### Writer

- Add Ebook
- Manage Own Ebooks
- View Sales
- Revenue Dashboard

### Admin

- Manage Users
- Manage Ebooks
- View Transactions
- Platform Statistics

---

## 👨‍💻 Developer

Kamrul Ahsan
