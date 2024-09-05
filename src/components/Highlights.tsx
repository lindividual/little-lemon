import React from 'react';

interface SpecialCardProps {
  title: string;
  price: string;
  description: string;
  image: string;
}

function SpecialCard({ title, price, description, image }: SpecialCardProps) {
  return (
    <div className="special-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-black">{title}</h3>
          <p className="text-orange-500 font-bold">{price}</p>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded mt-auto">
          Order a delivery
        </button>
      </div>
    </div>
  );
}

export default function Specials() {
  return (
    <section className="specials bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">This week&apos;s specials!</h2>
          <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded">
            Online Menu
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SpecialCard 
            title="Greek salad" 
            price="$12.99" 
            description="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
            image="/greek-salad.jpg"
          />
          <SpecialCard 
            title="Bruschetta" 
            price="$5.99" 
            description="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
            image="/bruchetta.svg"
          />
          <SpecialCard 
            title="Lemon Dessert" 
            price="$5.00" 
            description="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
            image="/lemont-cake.jpg"
          />
        </div>
      </div>
    </section>
  );
}
