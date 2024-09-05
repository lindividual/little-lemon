import React from 'react';
import Image from 'next/image';

function About() {
  return (
    <section className="about bg-white py-16 pb-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4 text-black">Little Lemon</h2>
          <h3 className="text-xl mb-4 text-gray-700">Chicago</h3>
          <p className="mb-6 text-gray-600">
            Little Lemon is a charming neighborhood bistro that serves simple food
            and classic cocktails in a lively but casual environment. The restaurant
            features a locally-sourced menu with daily specials.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-72 h-72 mb-16">
            <Image 
              src="/restaurant.jpg" 
              alt="Restaurant" 
              width={288}
              height={288}
              className="rounded-lg shadow-lg object-cover"
            />
            <div className="absolute -bottom-10 -right-10">
              <Image 
                src="/Mario-and-Adrian.jpg" 
                alt="Mario and Adrian" 
                width={288}
                height={288}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
