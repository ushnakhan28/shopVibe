import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }}>
        <Component {...pageProps} />
        {/* 🔥 Yahan add karo */}
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              backgroundColor: "#7e22ce",
              padding: "8px 10px",
              color: "white",
              width: "500px",
              height: "100px",
              fontSize: "20px",
              marginRight: "20px",
              marginBottom: "10px",
            },
          }}
        />
      </MantineProvider>
    </QueryClientProvider>
  );
}
