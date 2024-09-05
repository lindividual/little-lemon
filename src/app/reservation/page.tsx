import React from 'react';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReservationForm from '@/components/ReservationForm';

export default function ReservationPage() {
  return (
    <div className="App">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Make a Reservation</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ReservationForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
