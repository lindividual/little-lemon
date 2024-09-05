import React from 'react';
import Image from 'next/image';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="footer-logo">
          <Image src="/logo.png" alt="Little Lemon" width={160} height={40} />
        </div>
        <div className="footer-nav">
          <h3 className="text-xl font-semibold mb-4">Doormat Navigation</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-400">About</a></li>
            <li><a href="#menu" className="hover:text-yellow-400">Menu</a></li>
            <li><a href="#reservations" className="hover:text-yellow-400">Reservations</a></li>
            <li><a href="#order-online" className="hover:text-yellow-400">Order Online</a></li>
            <li><a href="#login" className="hover:text-yellow-400">Login</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p>123 Main St, Chicago, IL 60601</p>
          <p>+1 (123) 456-7890</p>
          <p>info@littlelemon.com</p>
        </div>
        <div className="footer-social">
          <h3 className="text-xl font-semibold mb-4">Social Media Links</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400">Facebook</a>
            <a href="#" className="hover:text-yellow-400">Instagram</a>
            <a href="#" className="hover:text-yellow-400">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
