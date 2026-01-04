import { createBrowserRouter } from "react-router-dom";
import App from "../app/App";

import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import CourseOpenPage from "../pages/CourseOpen/CourseOpenPage";

import LoginContent from "../pages/Login/sections/LoginContent";
import SignUpContent from "../pages/SignUp/sections/SignUpContent";

import ProtectedRoute from "./ProtectedRoute";
import GuestOnlyRoute from "./GuestOnlyRoute";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import FAQPage from "../pages/FAQ/FAQPage";
import TermsPage from "../pages/Terms/TermsPage";
import PrivacyPage from "../pages/Privacy/PrivacyPage";
import SupportPage from "../pages/Support/SupportPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "courses", element: <CourseOpenPage /> },

      { path: "faq", element: <FAQPage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "support", element: <SupportPage /> },

      // ✅ Guest-only group (authed bo‘lsa login/signup ko‘rinmaydi)
      {
        element: <GuestOnlyRoute />,
        children: [
          { path: "signup", element: <SignUpContent /> },
          { path: "login", element: <LoginContent /> },
        ],
      },

      // ✅ Protected group (login bo‘lmasa dashboardga kiritmaydi)
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", element: <DashboardPage /> }],
      },

      // 404 Not Found
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
