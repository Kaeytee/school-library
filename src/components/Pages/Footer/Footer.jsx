import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'; // Import Font Awesome icons
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer bg-dark text-center text-white'>
      <div className='container p-4'>
        <section className='mb-4'>
          {/* Social Media Icons */}
          <a href='#!' className='btn btn-outline-light btn-floating m-1'>
            <FaFacebookF /> {/* Facebook Icon */}
          </a>

          <a href='#!' className='btn btn-outline-light btn-floating m-1'>
            <FaTwitter /> {/* Twitter Icon */}
          </a>

          <a href='#!' className='btn btn-outline-light btn-floating m-1'>
            <FaInstagram /> {/* Instagram Icon */}
          </a>

          <a href='#!' className='btn btn-outline-light btn-floating m-1'>
            <FaLinkedinIn /> {/* LinkedIn Icon */}
          </a>

          <a href='#!' className='btn btn-outline-light btn-floating m-1'>
            <FaGithub /> {/* Github Icon */}
          </a>
        </section>

        {/* Footer Text */}
        <section className='mb-4'>
          <p>
            Welcome to our School Library. We provide access to a rich collection of books and resources
            for students and staff. Explore, read, and learn from anywhere!
          </p>
        </section>

        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          &copy; {new Date().getFullYear()} School Library. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
