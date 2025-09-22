import {
  Meta,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import axios from "axios";
import { useEffect } from "react";

import "~/app.css";
import { API_URL } from "~/api/urls";

import type { Route } from "./+types/root";
import { useStore } from "~/lib/store/index.store";

import { Toaster } from "~/components/ui/sonner";
import { Logo } from "./components/utils/logo";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    crossOrigin: "anonymous",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,200..900;1,200..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Martian+Mono:wght@100..800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, applyTheme } = useStore((state) => state);

  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme, applyTheme]);

  return (
    <html lang="en" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-hidden">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
      <Toaster richColors position="top-center" />
    </>
  );
}

export function HydrateFallback() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Logo
        text
        className="animate-pulse flex-col justify-center gap-2 text-center"
      />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let stack: string | undefined;
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
