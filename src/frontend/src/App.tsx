import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import ContactBookingPage from "./pages/ContactBookingPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import TeamPage from "./pages/TeamPage";
import TreatmentManagementPage from "./pages/TreatmentManagementPage";
import VaccinationPage from "./pages/VaccinationPage";

// Root route with Layout (Navigation + Footer)
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const treatmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/treatments",
  component: TreatmentManagementPage,
});

const vaccinationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vaccination",
  component: VaccinationPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactBookingPage,
});

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/team",
  component: TeamPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  treatmentsRoute,
  vaccinationRoute,
  contactRoute,
  teamRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
