# Phnom Penh Space

A modern coworking and space booking platform built with Next.js 16. This frontend application connects to the `Phnom-Penh-Spaces-api` backend to provide users with a seamless booking experience and administrators with a powerful dashboard.

## ✨ Features

- **Space Discovery:** Browse available spaces, including podcasts, meeting rooms, galleries, and workshops.
- **Booking System:** Interactive booking flow for selecting time slots and reserving spaces.
- **User Authentication:** Secure login and signup flows for users to manage their profiles and bookings.
- **Admin Dashboard:** A comprehensive dashboard to view occupancy rates, revenue, and upcoming reservations.
- **Responsive Design:** Fully responsive UI built with Tailwind CSS, ensuring a great experience on mobile and desktop.

## 🚀 Getting Started

### Prerequisites

Before running the frontend, ensure you have the [Phnom Penh Spaces API](https://github.com/Nun2024/Phnom-Penh-Spaces-api) running locally. The frontend relies on the API for authentication, fetching spaces, and processing bookings.

### Installation

1. Clone this repository.
2. Install the dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

This project uses the Next.js App Router (`src/app`). Here is a high-level overview of the structure:

- **`src/app/`**: Contains the main application routes.
  - `/spaces` - Browse and view details of specific spaces.
  - `/bookings` - Manage and create new space bookings.
  - `/dashboard` - Admin dashboard for analytics and management.
  - `/login` & `/signup` - Authentication pages.
  - `/profile` - User profile management.
- **`src/components/`**: Reusable UI components (e.g., `Navbar`, `Footer`, `DashboardLayout`).
- **`src/features/`**: Feature-specific components and logic (e.g., home page components).
- **`src/lib/`**: Utility functions and API client configuration (`api.ts`).

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Linting:** ESLint

## 🤝 Contributing

When contributing to this project, please ensure you test your changes locally against the backend API and adhere to the existing code style (run `npm run lint`).
