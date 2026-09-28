import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";

import { RouteLoader } from "@/components/feedback/RouteLoader";
import { RoutePlaceholder } from "@/components/feedback/RoutePlaceholder";

const HomePage = lazy(() =>
  import("@/pages/home/HomePage").then((module) => ({ default: module.HomePage })),
);

const LoginPage = lazy(() =>
  import("@/pages/login/LoginPage").then((module) => ({ default: module.LoginPage })),
);

const ScanPage = lazy(() =>
  import("@/pages/scan/ScanPage").then((module) => ({ default: module.ScanPage })),
);

const AnalysisPage = lazy(() =>
  import("@/pages/analysis/AnalysisPage").then((module) => ({ default: module.AnalysisPage })),
);

const HistoryPage = lazy(() =>
  import("@/pages/history/HistoryPage").then((module) => ({ default: module.HistoryPage })),
);

function RouteViewport() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToTarget()) return;

    const observer = new MutationObserver(() => {
      if (scrollToTarget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [location.hash, location.pathname]);

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <RouteViewport />,
    children: [
  {
    path: "/",
    element: (
      <Suspense fallback={<RouteLoader label="Preparando acesso" />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<RouteLoader label="Preparando acesso" />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<RouteLoader label="Preparando início" />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/scan",
    element: (
      <Suspense fallback={<RouteLoader label="Preparando captura" />}>
        <ScanPage />
      </Suspense>
    ),
  },
  {
    path: "/analysis",
    element: (
      <Suspense fallback={<RouteLoader label="Preparando resultado" />}>
        <AnalysisPage />
      </Suspense>
    ),
  },
  {
    path: "/history",
    element: (
      <Suspense fallback={<RouteLoader label="Preparando histórico" />}>
        <HistoryPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <RoutePlaceholder
        eyebrow="404"
        title="Página não encontrada"
        description="O endereço informado não faz parte do protótipo QualiScan AI."
      />
    ),
  },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
