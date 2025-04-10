// src/app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Providers from "./Providers"; // ✅ Import client wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Campusify",
  description: "All-in-one Campus Utility Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main style={{ padding: "2rem" }}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
