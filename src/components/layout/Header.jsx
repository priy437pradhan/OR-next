"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 shadow-sm transition-all duration-300">
        <div 
          className="absolute top-[51px] left-0 h-[3px] bg-primary transition-all duration-200 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <div className="OR-logo">
            <Link href="/">
              <Image 
                src={darkMode ? "/images/OR-DARKMODE.svg" : "/images/OR-LIGHTMODE.svg"} 
                alt="ଓଡ଼ିଶା ଖବର" 
                width={150} 
                height={34} 
                className="transition-opacity duration-300"
                priority
              />
            </Link>
          </div>
          <div className="flex items-center">
            <button 
              className="mr-4 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" 
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
               <Sun className="text-xl" />
              ) : (
                <Moon className="text-xl" />
              )}
            </button>
            <button className="border border-primary bg-transparent text-primary hover:bg-primary hover:text-white px-3 py-1 rounded text-sm transition-colors duration-300">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 transition-all duration-300">
        <div className="container mx-auto relative">
          <button 
            className="lg:hidden absolute left-4 top-3 text-gray-700 dark:text-gray-300" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
          </button>
          
          <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent p-5 lg:p-0 shadow-md lg:shadow-none rounded-md lg:rounded-none mt-2 lg:mt-0 relative`}>
            <ul className="flex flex-col lg:flex-row justify-center items-center">
              <li className="OR-nav-item my-2 lg:my-0 lg:mx-4">
                <Link 
                  href="#" 
                  className="uppercase font-medium tracking-wider text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 active:after:w-full"
                >
                  Fashion
                </Link>
              </li>
              <li className="OR-nav-item my-2 lg:my-0 lg:mx-4">
                <Link 
                  href="#"
                  className="uppercase font-medium tracking-wider text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
                >
                  Music
                </Link>
              </li>
              <li className="OR-nav-item my-2 lg:my-0 lg:mx-4">
                <Link 
                  href="#"
                  className="uppercase font-medium tracking-wider text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
                >
                  Beauty
                </Link>
              </li>
              <li className="OR-nav-item my-2 lg:my-0 lg:mx-4 group relative">
                <div className="cursor-pointer uppercase font-medium tracking-wider text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300 flex items-center">
                  Art + Culture
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <ul className="hidden group-hover:block absolute left-0 top-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 shadow-lg min-w-[200px] rounded-md z-10">
                  <li>
                    <Link 
                      href="#"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all duration-300"
                      onClick={closeMenu}
                    >
                      Exhibitions
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all duration-300"
                      onClick={closeMenu}
                    >
                      Photography
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all duration-300"
                      onClick={closeMenu}
                    >
                      Film
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-all duration-300"
                      onClick={closeMenu}
                    >
                      Literature
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="OR-nav-item my-2 lg:my-0 lg:mx-4">
                <Link 
                  href="#"
                  className="uppercase font-medium tracking-wider text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all after:duration-300"
                >
                  Society
                </Link>
              </li>
            </ul>
            <div className="mt-4 lg:absolute lg:right-4 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:mt-0">
              <div className="relative">
                <input 
                  type="text" 
                  className="bg-transparent border-b border-slate-300 dark:border-gray-600 py-2 pl-2 pr-10 focus:outline-none focus:border-primary transition-all w-full lg:w-auto" 
                  placeholder="Search..." 
                />
                <button className="absolute right-2 top-2 text-gray-500 hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <button 
                className="absolute top-2 right-2 lg:hidden text-xl text-gray-700 dark:text-gray-300" 
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;