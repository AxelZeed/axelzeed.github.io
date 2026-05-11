"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'PORTFOLIO', href: '/portfolio' },
    { name: 'PRICE', href: '/price' },
    { name: 'TERMS', href: '/terms' },
    { name: 'ZERYUZ', href: '/zeryuz' },
  ];

  return (
    <nav className={`sticky top-0 z-[40] bg-[#05161a]/90 backdrop-blur-md border-b border-neon-cyan/20 ${isAdmin ? 'lg:pl-64' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img src="/Assets/Logo.png" alt="Axel Zeed Logo" className="w-10 h-10 md:w-12 md:h-12" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-neon-cyan"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-dark-teal border-b border-neon-cyan/20 animate-fade-in">
          <div className="flex flex-col items-center py-6 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-bold tracking-widest text-foreground hover:text-neon-cyan transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
