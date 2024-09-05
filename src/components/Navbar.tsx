'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import ReservationDisplay from './ReservationDisplay';
import Link from 'next/link';
import { useReservation } from '@/contexts/ReservationContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { reservation } = useReservation();

  console.log('Navbar: Current reservation:', reservation);
  
  const menuItems = [
    { href: "#home", text: "HOME" },
    { href: "#about", text: "ABOUT" },
    { href: "#menu", text: "MENU" },
    { href: "/reservation", text: "RESERVATIONS" },
    { href: "#order-online", text: "ORDER ONLINE" },
    { href: "#login", text: "LOGIN" }
  ];

  return (
    <>
    <nav className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="logo z-50">
            <Image src="/logo.png" alt="Little Lemon" width={200} height={50} />
          </div>
          <div className="md:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
          <ul className="hidden md:flex md:space-x-6">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-700 hover:text-yellow-500">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-white z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto px-4 py-20 mt-16">
          <ul className="space-y-6">
            {menuItems.map((item, index) => (
              <li 
                key={item.href}
                className={`transform transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Link href={item.href} className="block text-2xl text-gray-700 hover:text-yellow-500">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <ReservationDisplay /> */}
    </nav>
    <ReservationDisplay />
    </>
  );
}

export default Navbar;
