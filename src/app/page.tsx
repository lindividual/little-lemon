import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Highlights />
      <Testimonials />
      <About />
      <Footer />
    </div>
  );
}
