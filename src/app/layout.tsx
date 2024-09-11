//src/app/layout.tsx

"use client";
import React, { useRef } from "react";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { makeStore, AppStore } from "@/lib/store";
import { ProtectedComponents } from "./components/ProtectedComponents";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore(); 
  }
  const { store, persistor } = storeRef.current!; 
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Box sx={{ display: "flex" }}>
                <ProtectedComponents>{children}</ProtectedComponents>
              </Box>
            </PersistGate>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
