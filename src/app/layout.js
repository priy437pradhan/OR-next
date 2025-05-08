import { ThemeProvider } from '../context/ThemeContext';
import './globals.css';

export const metadata = {
  title: 'ଓଡ଼ିଶା ଖବର',
  description: 'Odisha News',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}