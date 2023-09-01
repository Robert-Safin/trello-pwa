"use client";
import "./globals.css";
import store, { persistor } from "@/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="root" className="min-h-screen min-w-full max-h-screen max-w-full bg-primary dark:bg-primaryDark">
        <Provider store={store}>
          <PersistGate persistor={persistor}>{children}</PersistGate>
        </Provider>
      </body>
    </html>
  );
}
