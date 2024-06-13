import Navigation from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import "./globals.css";

import Providers from "./providers";
import Footer from "./components/Footer";
import Success from "./components/Success";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Providers>
          <div className="app">
            <Navigation />
            <div className="content">
              {children} <Success />
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
          <BootstrapClient />
        </Providers>
      </body>
    </html>
  );
}
