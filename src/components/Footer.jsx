import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Stores Locator
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Elite
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Influencer Collab
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  BEAUTY-CO X Nike
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Support
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400">
                Email us at:
              </p>
              <a 
                href="mailto:hello@beauty-co.com" 
                className="text-gray-400 hover:text-white transition-colors block"
              >
                hello@beauty-co.com
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Stay Connected
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-neutral-800 text-white text-sm rounded border border-gray-700 focus:outline-none focus:border-gray-500"
              />
              <button className="px-6 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 BEAUTY-CO. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}