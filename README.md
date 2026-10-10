<div align="center">
  <h1>Tune Up Tutor (Client)</h1>
  <p>
    A modern, premium music academy learning platform — <strong>React + Vite</strong>, Firebase Auth, Stripe payments, and a sleek animated UI with dark/light mode.
  </p>

  <p>
    <a href="https://tune-up-tutor.web.app/"><img src="https://img.shields.io/badge/Live%20Demo-07C160?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo" /></a>
    <a href="https://github.com/amir2601/tune-up-tutor-client"><img src="https://img.shields.io/badge/Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/Vite-4-646CFF?logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/daisyUI-3-5A0EF8?logo=daisyui&logoColor=white" alt="daisyUI" />
    <img src="https://img.shields.io/badge/Framer%20Motion-10-0055FF?logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Firebase-9-FFCA28?logo=firebase&logoColor=black" alt="Firebase" />
    <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white" alt="Stripe" />
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" />
  </p>
</div>

## ✨ Features

| Feature | Details |
|---|---|
| **🎭 Rich Animations** | Scroll-reveal, marquee, count-up, smooth transitions & micro-interactions powered by `framer-motion`. |
| **🌓 Light & Dark Mode** | Site-wide theme toggle with no-flash boot, persisted in `localStorage` and respects OS preference. |
| **🎸 Course Catalog** | Browse classes, search by name, view instructor info, seats/price, and enroll with Stripe checkout. |
| **👩‍🏫 Instructors Directory** | Find certified instructors with cards, hover effects and smooth reveals. |
| **🏠 Dashboard System** | Role-based dashboards for **Student**, **Instructor**, and **Admin** with tailored tools and stat tiles. |
| **🛒 Shopping Cart UX** | Select classes, view selected/enrolled history, and pay securely via Stripe payment intent. |
| **🔐 Authentication** | Email/password registration + login, Google sign-in, protected routes with loading state. |
| **📱 Responsive Design** | Fully responsive with mobile-first Tailwind CSS, DaisyUI theming and clean layouts. |
| **💬 UX Polish** | Announcement bar, back-to-top, scroll progress, gallery lightbox, testimonials marquee, FAQ, and more. |

## 🧰 Tech Stack

| Category | Libraries |
|---|---|
| **Framework** | [React 18](https://react.dev/), [Vite 4](https://vitejs.dev/) |
| **Routing** | [React Router 6](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/), [DaisyUI 3](https://daisyui.com/) |
| **Animations** | [Framer Motion 10](https://motion.dev/) |
| **Auth** | [Firebase 9](https://firebase.google.com/) (Google + Email/Password) |
| **Payments** | [Stripe](https://stripe.com/) (`@stripe/react-stripe-js`, `@stripe/stripe-js`) |
| **UI Utilities** | [React Icons](https://react-icons.github.io/react-icons/), [React Modal](https://reactcommunity.org/react-modal/), [SweetAlert2](https://sweetalert2.github.io/), [Moment.js](https://momentjs.com/) |

## 📂 Project Structure

```bash
src/
├── assets/              # Static assets (images, icons)
├── components/
│   ├── Shared/
│   │   ├── Animations/  # Reveal, CountUp, Marquee, ScrollProgress, etc.
│   │   ├── Dashboard/   # Reusable dashboard UI (TableSkeleton, StatTile, etc.)
│   │   ├── Footer/      # Site footer with newsletter
│   │   ├── Forms/       # Payment & CheckoutForm (Stripe)
│   │   ├── Navbar/      # Navbar with theme toggle & announcement bar
│   │   ├── SocialLogin/ # Google OAuth login
│   │   └── ThemeToggle/ # Animated theme switch
├── firebase/            # Firebase config
├── Hooks/               # Custom hooks (useTitle, useCheckUser)
├── Layout/              # Main & Dashboard layouts
├── Pages/               # Route pages (Home, Classes, Instructors, Dashboard, Auth, Error)
├── Provider/            # AuthProvider & ThemeProvider
├── Routes/              # App routing (PrivateRoutes)
└── main.jsx             # App entry
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Stripe](https://dashboard.stripe.com/) account (for test/live keys)
- [Firebase](https://console.firebase.google.com/) project (Auth + optional Hosting)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/amir2601/tune-up-tutor-client.git
cd tune-up-tutor-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file at the project root. The code expects the following exact names:

| Variable | Purpose |
|---|---|
| `VITE_APIKEY` | Firebase Web API Key |
| `VITE_AUTHDOMAIN` | Firebase Auth Domain |
| `VITE_PROJECTID` | Firebase Project ID |
| `VITE_STORAGEBUCKET` | Firebase Storage Bucket |
| `VITE_MESSAGINGSENDERID` | Firebase Messaging Sender ID |
| `VITE_APPID` | Firebase App ID |
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:5000/` or deployed URL; **must end with `/`** per current code) |
| `VITE_SRIPE_PUBLIC_KEY` | Stripe publishable key (test/live) — _note: this name is currently misspelled in the code_ |

> ℹ️ The repo has `.gitignore` ignoring `.env*local` files. Do **not** commit real secrets to Git.

4. **Start the dev server**
```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server (HMR, hot reload) |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Preview the production build locally |

## 🔌 API Integration

All fetch calls use `import.meta.env.VITE_API_URL` as the base. Key endpoints consumed by the client (from the server):

| Endpoint | Method | Usage |
|---|---|---|
| `/users` | `GET/POST` | List/add users; Google/email auth registration |
| `/users/:email` | `GET/PATCH` | Fetch/update user role & profile info |
| `/instructors` | `GET` | All instructors |
| `/popular-instructors` | `GET` | Top instructors for home |
| `/classes` | `GET` | All classes |
| `/popular-classes` | `GET` | Top classes (by students) |
| `/add-class` | `POST` | Instructor: add a new class |
| `/my-added-classes/:email` | `GET` | Instructor: classes added by them |
| `/update-classes/:id` | `GET/PATCH` | Get/update class details |
| `/classes/:id` | `GET/PATCH` | Status/selection-related operations |
| `/feedback/:id` | `PATCH` | Admin/instructor feedback |
| `/select-class` | `POST` | Student: select a class |
| `/select-class/:email` | `GET` | Student: selected classes |
| `/select-class/:id` | `DELETE` | Student: remove selected class |
| `/enrolled-classes/:email` | `GET` | Student: enrolled classes |
| `/payment-history/:email` | `GET` | Student: payment history |
| `/create-payment-intent` | `POST` | Stripe: create payment intent |
| `/booking-data` | `POST` | Finalize booking (enroll, update seats/students, delete from selected) |

*See the server README for complete, authoritative API details.*

## 🚢 Deployment

### Build

```bash
npm run build
```

### Firebase Hosting

The project includes `firebase.json` & `.firebaserc` for Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting  # or just deploy if already configured
firebase deploy
```

Live URL: **[https://tune-up-tutor.web.app/](https://tune-up-tutor.web.app/)**

### Environment Notes

- Deploy host must have the same `VITE_*` env vars set at build time (baked into the bundle).
- If switching hosts, update `VITE_API_URL` to point to the deployed server.
- Ensure CORS on the server allows the deployed frontend origin.

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "feat: add something amazing"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## 🧾 License

Released under the **MIT License**. See the repository for details.

## 📬 Contact

- **GitHub**: [@amir2601](https://github.com/amir2601)
- **Live Demo**: [tune-up-tutor.web.app](https://tune-up-tutor.web.app)
- **Server Repo**: [tune-up-tutor-server](https://github.com/amir2601/tune-up-tutor-server)