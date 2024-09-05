import React from 'react';
import Image from 'next/image';

function Hero() {
  return (
    <section className="hero bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4 text-yellow-400">Little Lemon</h1>
          <h2 className="text-2xl mb-4 text-white">Chicago</h2>
          <p className="mb-6 text-white">We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
          <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500">
            Reserve a Table
          </button>
        </div>
        <div className="md:w-1/2">
          <div className="relative w-full h-64 md:h-80">
            <Image 
              src="/hero.jpg" 
              alt="Little Lemon Restaurant" 
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
