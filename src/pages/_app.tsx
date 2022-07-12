// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import SideNav from "../components/SideNav";
import BottomNav from "../components/BottomNav";
import { NextRouter, useRouter } from "next/router";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router: NextRouter = useRouter();
  return (
    <SessionProvider session={session}>
      <div className="bg-brandBackground w-screen h-screen">
        <div className="flex flex-col sm:flex-row">
          <SideNav currentUrl={router.pathname} />

          <main className="flex-auto container min-h-screen px-5 mx-auto sm:py-12 sm:pl-0 sm:gap-y-8">
            <Component {...pageProps} />
          </main>

          <BottomNav currentUrl={router.pathname} />
        </div>
      </div>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
