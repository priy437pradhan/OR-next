'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchBox from '../ui/SearchBox';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  return (
    <nav className="OR-navbar navbar navbar-expand-lg" ref={navRef}>
      <div className="container">
        <button
          className={`OR-navbar-toggler ${isOpen ? '' : 'collapsed'}`}
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <div className="OR-navbar-toggler-icon">
            <FontAwesomeIcon icon={faBars} id="menu-open" />
          </div>
        </button>

        <div className={`OR-navbar-collapse collapse navbar-collapse ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
          <ul className="OR-navbar-nav navbar-nav mx-auto">
            <li className="OR-nav-item nav-item">
              <Link className="OR-nav-link active" href="/fashion">
                Fashion
              </Link>
            </li>
            <li className="OR-nav-item nav-item">
              <Link className="OR-nav-link" href="/music">
                Music
              </Link>
            </li>
            <li className="OR-nav-item nav-item">
              <Link className="OR-nav-link" href="/beauty">
                Beauty
              </Link>
            </li>
            <li className="OR-nav-item nav-item dropdown">
              <Link className="OR-nav-link dropdown-toggle" href="/art-culture" id="artDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Art + Culture
              </Link>
              <ul className="OR-dropdown-menu dropdown-menu" aria-labelledby="artDropdown">
                <li>
                  <Link className="OR-dropdown-item dropdown-item" href="/art-culture/exhibitions">
                    Exhibitions
                  </Link>
                </li>
                <li>
                  <Link className="OR-dropdown-item dropdown-item" href="/art-culture/photography">
                    Photography
                  </Link>
                </li>
                <li>
                  <Link className="OR-dropdown-item dropdown-item" href="/art-culture/film">
                    Film
                  </Link>
                </li>
                <li>
                  <Link className="OR-dropdown-item dropdown-item" href="/art-culture/literature">
                    Literature
                  </Link>
                </li>
              </ul>
            </li>
            <li className="OR-nav-item nav-item">
              <Link className="OR-nav-link" href="/society">
                Society
              </Link>
            </li>
          </ul>
          
          <SearchBox />
          
          <FontAwesomeIcon 
            icon={faTimes} 
            className="menucollapse" 
            id="menucollapse" 
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}