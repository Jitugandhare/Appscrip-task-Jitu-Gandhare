import React from 'react';
import Image from 'next/image';
import { Instagram, Linkedin } from 'lucide-react';
import styles from '../styles/Home.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top Section: Subscribe + Contact */}
      <div className={styles.topSection}>
        {/* Subscribe Section */}
        <div className={styles.subscribe}>
          <h4>BE THE FIRST TO KNOW</h4>
          <p>Sign up for updates from mettā muse.</p>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Enter your e-mail..." />
            <button>SUBSCRIBE</button>
          </div>
        </div>

        {/* Contact Section */}
        <div className={styles.contact}>
          <h4>CONTACT US</h4>
          <p>+44 221 133 5360</p>
          <p>customercare@mettamuse.com</p>
          <h4>CURRENCY</h4>
          <p>🇺🇸 USD</p>
          <p className={styles.note}>
            Transactions will be completed in Euros and a currency reference is available on hover.
          </p>
        </div>
      </div>
      
      <hr />

      {/* Bottom Columns */}
      <div className={styles.columns}>
        {/* Column 1: About */}
        <div className={styles.column}>
          <h4>mettā muse</h4>
          <ul>
            {['About Us', 'Stories', 'Artisans', 'Boutiques', 'Contact Us', 'EU Compliances Docs'].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Column 2: Quick Links */}
        <div className={styles.column}>
          <h4>QUICK LINKS</h4>
          <ul>
            {[
              'Orders & Shipping',
              'Join/Login as a Seller',
              'Payment & Pricing',
              'Return & Refunds',
              'FAQs',
              'Privacy Policy',
              'Terms & Conditions',
            ].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Column 3: Socials & Payments */}
        <div className={styles.column}>
          <h4>FOLLOW US</h4>
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={18} color="#fff" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin size={18} color="#fff" />
            </a>
          </div>

          <h4>mettā muse ACCEPTS</h4>
          <div className={styles.payments}>
            {[
              { src: 'https://img.icons8.com/color/48/google-pay.png', alt: 'Google Pay' },
              { src: 'https://img.icons8.com/color/48/mastercard-logo.png', alt: 'Mastercard' },
              { src: 'https://img.icons8.com/color/48/paypal.png', alt: 'PayPal' },
              { src: 'https://img.icons8.com/color/48/amex.png', alt: 'American Express' },
              { src: 'https://img.icons8.com/color/48/apple-pay.png', alt: 'Apple Pay' },
              { src: 'https://img.icons8.com/color/48/visa.png', alt: 'Visa' },
            ].map((icon, idx) => (
              <Image key={idx} src={icon.src} alt={icon.alt} width={48} height={30} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className={styles.bottomLine}>
        <p>Copyright © 2025 mettamuse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
