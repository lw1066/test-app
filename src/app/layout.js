
import Navigation from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from './components/BootstrapClient';
import './globals.css';

import Providers from './providers';
import Footer from './components/Footer';

export default function RootLayout({ children }) {
  
  
  return (
    <html lang="en">
      <head />
      <body>
      <Providers >
          <Navigation />
          {children}
          <Footer />
          <BootstrapClient />
      </Providers>
      </body>
    </html>
  );
}
