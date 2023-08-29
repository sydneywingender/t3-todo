import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "~/components/theme-provider";
import Layout from "~/components/layout";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
type Props = {
  initialSession: Session;
};

const MyApp: AppType<Props> = ({ Component, pageProps }) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </ThemeProvider>
      </SessionContextProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
