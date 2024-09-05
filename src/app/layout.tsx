import React from 'react';
import '@/app/globals.css';
import { ReservationProvider } from '../contexts/ReservationContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReservationProvider>
          {children}
        </ReservationProvider>
      </body>
    </html>
  );
}
