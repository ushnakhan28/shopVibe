import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Mantine imports
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }} // you can change to 'dark' if needed
      >
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
