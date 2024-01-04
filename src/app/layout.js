
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
        <div className="app">
          <Navigation />
          <div className="content">
            {children}
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
