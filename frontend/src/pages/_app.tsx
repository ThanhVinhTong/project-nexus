import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { MainNavigation } from "../components/MainNavigation";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Don't show navigation on login page
  const showNavigation = router.pathname !== '/login';

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <MainNavigation />}
      <main className={showNavigation ? "py-8" : ""}>
        <div className={showNavigation ? "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" : ""}>
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
}
