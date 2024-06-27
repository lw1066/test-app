import Navigation from "./components/Nav";
import "./styles/custom-bootstrap.scss";
import BootstrapClient from "./components/BootstrapClient";
import "./globals.css";
import { Notosans } from "next/font/google";

import Providers from "./providers";
import Footer from "./components/Footer";
import Success from "./components/Success";

const inter = Notosans({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="app">
            <Navigation />
            <div className="content">
              {children} <Success />
            </div>
            <Footer />
          </div>
          <BootstrapClient />
        </Providers>
      </body>
    </html>
  );
}
