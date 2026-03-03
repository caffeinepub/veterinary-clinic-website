import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TreatmentManagementPage from './pages/TreatmentManagementPage';
import VaccinationPage from './pages/VaccinationPage';
import ContactBookingPage from './pages/ContactBookingPage';

// Root route with Layout (Navigation + Footer)
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const treatmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/treatments',
  component: TreatmentManagementPage,
});

const vaccinationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vaccination',
  component: VaccinationPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactBookingPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  treatmentsRoute,
  vaccinationRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
