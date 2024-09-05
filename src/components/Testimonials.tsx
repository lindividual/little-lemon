import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  rating: number;
  name: string;
  photo: string;
  review: string;
}

function TestimonialCard({ rating, name, photo, review }: TestimonialCardProps) {
  return (
    <div className="testimonial-card bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="rating text-yellow-400 text-xl mr-2">{rating} ★</div>
        <Image src={photo} alt={name} width={50} height={50} className="rounded-full" />
        <h3 className="ml-3 font-semibold">{name}</h3>
      </div>
      <p className="text-gray-600">{review}</p>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="testimonials bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TestimonialCard 
            rating={5}
            name="John Doe"
            photo="/profile1.jpg"
            review="Great food and atmosphere!"
          />
          <TestimonialCard 
            rating={4}
            name="Jane Smith"
            photo="/profile2.jpg"
            review="Delicious dishes and friendly staff."
          />
          <TestimonialCard 
            rating={5}
            name="Mike Johnson"
            photo="/profile3.jpg"
            review="The best Italian restaurant in town!"
          />
          <TestimonialCard 
            rating={4}
            name="Emily Brown"
            photo="/profile4.jpg"
            review="Lovely place for a family dinner."
          />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
